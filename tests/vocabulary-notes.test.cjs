const{test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(p,'utf8');
function fixture(course='de'){
 const dom=new JSDOM('<main></main>',{runScripts:'outside-only',url:'https://example.org'}),w=dom.window,view=w.document.querySelector('main'),calls=[];
 w.A1Profile={getUiLang:()=>course==='de'?'fr':'de'};w.A1Voice={speak:(text,options)=>calls.push({text,...options})};
 for(const p of ['shared/vocabulary-content.js','shared/lesson-lexicon.js','shared/lesson-foundations.js','shared/vocabulary-trainer.js'])w.eval(read(p));
 const lessons=Array.from({length:24},(_,i)=>({id:i+1,title:'Test '+(i+1)}));
 const bank=w.A1Vocabulary.buildBank({course,lessons}),api=w.A1Vocabulary,state={doneLessons:[]};
 const render=()=>api.render({view,state,course,lessons,save(){},speak:text=>calls.push({text})});
 return{dom,w,view,calls,bank,api,state,render};
}
test('all 17 German parenthetical explanations in curated, lexical and foundation vocabulary have short French display equivalents',()=>{
 const e=fixture(),raw=[...e.w.A1_VOCABULARY_CONTENT.map(x=>x.de),...e.w.A1LessonLexicon.entries.de.map(x=>x[0]),...Object.values(e.w.A1LessonFoundations.content.de).flatMap(x=>x.words.map(w=>w[0]))];
 const notes=[...new Set(raw.flatMap(s=>[...s.matchAll(/\(([^)]+)\)/g)].map(m=>m[1])))];assert.equal(notes.length,17);
 const expected={'höflich':'poli','vertraut':'familier','Einzahl':'singulier','Mehrzahl':'pluriel','Besitz, Einzahl':'un possesseur','Besitz, Mehrzahl':'plusieurs possesseurs','Kleidung':'vêtements','Rachen':'gorge','bestimmter Artikel':'article défini','je nach Kontext':'selon le contexte','aus einer Auswahl':'parmi plusieurs','zeitlich':'temps','Kochen':'cuisine','Anrede':'civilité','je nach Stellung':'selon la position','Medikamente':'médicaments','hinweisend':'démonstratif'};
 for(const n of notes)assert.equal(e.api.displayText('de','Wort ('+n+')'),'Wort ('+expected[n]+')');assert.equal(e.api.displayText('de','das Wort (m.)'),'das Wort (m.)');e.dom.window.close();
});
test('nationality cards distinguish adjective, man and woman with matching French forms',()=>{
 const e=fixture();assert.equal(e.api.displayText('de','deutsch / Deutscher / Deutsche'),'deutsch (adj.) / ein Deutscher (m.) / eine Deutsche (f.)');
 assert.equal(e.api.displayText('de','allemand / allemande'),'allemand / allemande (adj.) ; un Allemand (m.) ; une Allemande (f.)');
 assert.equal(e.api.displayText('de','französisch / Franzose / Französin'),'französisch (adj.) / ein Franzose (m.) / eine Französin (f.)');assert(e.api.displayText('de','français / française').includes('un Français (m.) ; une Française (f.)'));e.dom.window.close();
});
test('paired professions and distinct meanings get compact corresponding forms rather than a missing translation',()=>{
 const e=fixture();for(const[raw,expected]of [['le professeur','le professeur / la professeure'],['le médecin','le médecin / la médecin'],['l’expéditeur (m.)','l’expéditeur / l’expéditrice'],['le destinataire','le destinataire / la destinataire'],['le propriétaire','le propriétaire / la propriétaire'],['le menu','la carte / le menu'],['le fruit','les fruits / un fruit']])assert.equal(e.api.displayText('de',raw),expected);
 assert.equal(e.api.displayText('de','le temps'),'le temps (météo) / le temps (durée)');assert.equal(e.api.displayText('de','son / sa / ses'),'son / sa / ses','do not introduce an incorrect absolute gender rule for son amie');e.dom.window.close();
});
test('trainer list, reverse practice and lesson overview use the same short display while stored cards keep their original IDs',()=>{
 const e=fixture(),card=e.bank.find(x=>x.target==='deutsch / Deutscher / Deutsche'),id=card.id;assert(id);e.state.vocabularyTrainer={version:2,items:{[id]:{streak:1,reviews:2,last:5}},lessonItems:{},lessonDecksImported:true,settings:{query:'Deutscher',direction:'reverse',lesson:'all'}};
 e.render();assert(e.view.textContent.includes('ein Deutscher'));assert(e.view.textContent.includes('un Allemand'));e.view.querySelector('#vtStart').click();assert.equal(e.state.vocabularyTrainer.session.cards[0].id,id);assert(e.view.querySelector('.vt-prompt').textContent.includes('un Allemand'));e.view.querySelector('#vtReveal').click();assert(e.view.querySelector('.vt-answer').textContent.includes('eine Deutsche'));assert.equal(e.state.vocabularyTrainer.items[id].streak,1);
 const holder=e.w.document.createElement('div');holder.innerHTML=e.w.A1LessonFoundations.vocabularyHtml('de',1);assert(holder.textContent.includes('ein Deutscher'));assert(holder.textContent.includes('bitte (poli)'));const button=[...holder.querySelectorAll('[data-vocabulary-audio]')].find(b=>b.getAttribute('aria-label').includes('Deutscher'));assert.equal(button.dataset.vocabularyAudio,'ein Deutscher');assert.equal(card.target,'deutsch / Deutscher / Deutsche');e.dom.window.close();
});
test('French search finds the translated note and clicking audio never speaks an explanatory parenthesis',()=>{
 const e=fixture();e.render();const search=e.view.querySelector('#vtSearch');search.value='poli';search.dispatchEvent(new e.w.Event('input'));assert([...e.view.querySelectorAll('.vt-entry strong')].some(x=>x.textContent==='bitte (poli)'));
 const row=[...e.view.querySelectorAll('.vt-entry')].find(x=>x.querySelector('strong').textContent==='bitte (poli)');row.querySelector('button').click();assert.equal(e.calls.at(-1).text,'bitte');e.w.A1Profile.getUiLang=()=> 'en';e.render();assert(e.view.textContent.includes('bitte (poli)'));e.dom.window.close();
});
test('French course keeps German explanatory notes and shows feminine profession forms without rewriting stored cards',()=>{
 const e=fixture('fr');assert.equal(e.api.displayText('fr','bitte (höflich)'),'bitte (höflich)');assert(e.api.displayText('fr','allemand / allemande').includes('(Adjektiv)'));assert.equal(e.api.displayText('fr','le professeur'),'le professeur / la professeure');e.dom.window.close();
});
test('gehen/fahren and gut show their short French contexts instead of bare interchangeable translations',()=>{
 const e=fixture();assert.equal(e.api.displayText('de','gehen / fahren'),'gehen (à pied) / fahren (en véhicule)');assert.equal(e.api.displayText('de','aller'),'aller à pied / aller en véhicule');assert.equal(e.api.displayText('de','bon / bonne'),'bon / bonne (qualité)');assert.equal(e.api.displayText('de','bien'),'bien (manière / état)');
 const holder=e.w.document.createElement('div');holder.innerHTML=e.w.A1LessonFoundations.vocabularyHtml('de',1);const gut=[...holder.querySelectorAll('dt')].find(n=>n.textContent==='gut (qualité)');assert(gut);const meaning=gut.nextElementSibling.textContent;assert(meaning.includes('bon'));assert(holder.textContent.includes('bonne'));assert(holder.textContent.includes('bien (manière / état)'));assert.equal(gut.querySelector('button').dataset.vocabularyAudio,'gut');e.dom.window.close();
});
test('forward gut cards provide the intended sense before asking for the French translation',()=>{
 const e=fixture();e.state.vocabularyTrainer={version:2,items:{},lessonItems:{},lessonDecksImported:true,settings:{query:'qualité',direction:'forward',lesson:'all'}};e.render();e.view.querySelector('#vtStart').click();assert.equal(e.state.vocabularyTrainer.session.cards[0].target,'gut');assert.equal(e.view.querySelector('.vt-prompt').textContent,'gut (qualité)');
 for(const card of e.bank.filter(x=>x.target==='gut'))assert.equal(e.api.displayTarget('de',card),card.meaning==='bien'?'gut (manière / état)':'gut (qualité)');e.dom.window.close();
});
test('question words use no arbitrary noun examples; lesson 1 uses its actual language question',()=>{
 for(const course of ['de','fr']){const e=fixture(course),raw=e.bank.find(x=>course==='de'?x.target==='welcher / welche / welches':x.meaning==='welcher / welche / welches');assert(raw);
 const rows=e.api.displayPairs(course,raw);assert.equal(rows.length,1);assert(!/Zug|Straße|Buch|train|rue|livre/.test(JSON.stringify(rows)));
 if(course==='de')assert.deepEqual(JSON.parse(JSON.stringify(e.api.displayPairs(course,raw,{lessonId:1}))),[{target:'Welche Sprachen?',meaning:'Quelles langues ?'}]);
 e.state.vocabularyTrainer={version:2,items:{},lessonItems:{},lessonDecksImported:true,settings:{query:'welches',direction:'forward',lesson:'all'}};e.render();assert(!e.view.querySelector('.vt-entry').textContent.includes('Buch'));e.dom.window.close();}
});
test('article and possessive references explain form families without inventing noun content or equating genders',()=>{
 const e=fixture(),groups=[['der / die / das (bestimmter Artikel)','le / la / les'],['dieser / diese / dieses (hinweisend)','ce / cet / cette / ces'],['mein / meine','mon / ma / mes'],['nächster / nächste / nächstes','prochain / prochaine']];
 for(const[target,meaning]of groups){const rows=e.api.displayPairs('de',{target,meaning});assert(rows.length);assert(!/Buch|Bücher|Straße|Zug|Hotel/.test(JSON.stringify(rows)));}
 const owners=e.api.displayPairs('de',{target:'sein / ihr (Besitz, Einzahl)',meaning:'son / sa / ses'});assert.equal(owners.length,2);assert(owners[0].meaning.includes('à lui'));assert(owners[1].meaning.includes('à elle'));e.dom.window.close();
});
test('different senses and masculine/feminine forms remain paired instead of accidental slash-to-slash matches',()=>{
 const e=fixture();for(const[target,meaning,pairs]of [
 ['warm / heiß','chaud / chaude',[['warm','chaud / chaude (température agréable)'],['heiß','chaud / chaude (température élevée)']]],
 ['die Tochter / das Mädchen','la fille',[['die Tochter','la fille (lien familial)'],['das Mädchen','la fille (jeune fille)']]],
 ['der Arzt / die Ärztin','le médecin',[['der Arzt','le médecin'],['die Ärztin','la médecin']]],
 ['deutsch / Deutscher / Deutsche','allemand / allemande',[['deutsch (adj. m.)','allemand (adj. m.)'],['deutsch (adj. f.)','allemande (adj. f.)'],['ein Deutscher','un Allemand'],['eine Deutsche','une Allemande']]]
 ])assert.deepEqual(JSON.parse(JSON.stringify(e.api.displayPairs('de',{target,meaning}))),pairs.map(([target,meaning])=>({target,meaning})));e.dom.window.close();
});
