const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs');
const {fixture}=require('./helpers/a1-fixture.cjs'),{collect}=require('./helpers/lesson-language-corpus.cjs');
const read=p=>fs.readFileSync(p,'utf8'),corpus=collect();
function setup(course){const e=fixture(course);for(const p of ['shared/lesson-vocabulary-plan.js','shared/lesson-lexicon.js','shared/vocabulary-content.js','shared/vocabulary-trainer.js'])e.w.eval(read(p));return e;}
for(const [course,code]of [['francais','fr'],['deutsch','de']]){
 test(course+': reference displays in all 24 lessons do not add unrelated books, streets or trains',()=>{
  const e=setup(course),patterns=code==='de'?[/\bB(?:uch|ücher)\b/iu,/\bStraß(?:e|en)\b/iu,/\bZ(?:ug|üge)\b/iu]:[/\blivres?\b/iu,/\brues?\b/iu,/\btrains?\b/iu];let rows=0;
  for(const l of e.lessons){
   const normal=corpus[code].lessons.find(x=>x.id===l.id).segments.filter(s=>!s.source.startsWith('hard.')).map(s=>s.text).join('\n');
   const html=e.w.A1LessonFoundations.vocabularyHtml(code,l.id),host=e.w.document.createElement('div');host.innerHTML=html;
   for(const dt of host.querySelectorAll('dt')){rows++;for(const pattern of patterns)if(pattern.test(dt.textContent))assert(pattern.test(normal),l.id+': unsupported reference '+dt.textContent);}
   const plan=e.w.A1LessonVocabularyPlan[code][l.id];for(const stage of Object.keys(plan.stages)){
    host.innerHTML=e.w.A1LessonFoundations.preparationHtml(code,l.id,stage);for(const dt of host.querySelectorAll('dt'))for(const pattern of patterns)if(pattern.test(dt.textContent))assert(pattern.test(normal),l.id+' '+stage+': '+dt.textContent);
   }
  }
  assert(rows>700);e.dom.window.close();
 });
 test(course+': the entry page has one reference list, a concise learning note and no duplicate top link',()=>{
  const e=setup(course),l=e.lessons[0];e.w.A1LessonFlow.render({lesson:l,content:course==='francais'?l:e.w.A1_COURSE_CONTENT[0],view:e.view,state:e.state,targetLang:code,uiLang:code==='fr'?'de':'fr',lessonCount:24,grammarHtml:e.html(l),save(){},speak(){},speakBtn:()=>'<button>Audio</button>',wireSpeakButtons(){},recorderHtml:()=>'',renderLearn(){},renderLesson(){},renderMastery(){},renderVocabulary(){},vocabularyLabel:'Vocabulary link'});
  assert(!e.view.querySelector('#lessonVocabulary,.vt-lesson-link'));assert.equal(e.view.querySelectorAll('details[data-foundation-words]').length,1);assert(e.view.querySelectorAll('.lesson-core-phrase').length>0);
  const overview=e.view.querySelector('details[data-foundation-words]');assert(!overview.open);const note=overview.querySelector('p').textContent;
  assert(note.includes(code==='de'?'au fil de la leçon':'nach und nach in der Lektion'));assert(note.includes(code==='de'?'onglet « Vocabulaire »':'Reiter „Vokabeln“'));
  assert(!/\bBuch\b|Bücher|Straße|\bZug\b|\blivre\b|\brue\b|\btrain\b/.test([...overview.querySelectorAll('dt')].map(x=>x.textContent).join(' ')));e.dom.window.close();
 });
}
test('German lesson 1 uses its actual phrases; later genuine book and transport vocabulary remains',()=>{
 const e=setup('deutsch');const holder=e.w.document.createElement('div');holder.innerHTML=e.w.A1LessonFoundations.vocabularyHtml('de',1);
 assert(holder.textContent.includes('Welche Sprachen?'));assert(holder.textContent.includes('Quelles langues ?'));assert(holder.textContent.includes('mein Name'));assert(holder.textContent.includes('mon nom'));assert(holder.textContent.includes('guten Morgen'));assert(holder.textContent.includes('bonjour (le matin)'));
 const normal=corpus.de.lessons[0].segments.filter(s=>!s.source.startsWith('hard.')).map(s=>s.text).join('\n');assert(normal.includes('Welche Sprachen sprechen Sie?'));assert(normal.includes('Mein Name ist'));
 holder.innerHTML=e.w.A1LessonFoundations.vocabularyHtml('de',5);assert(holder.textContent.includes('das Buch'));
 holder.innerHTML=e.w.A1LessonFoundations.vocabularyHtml('de',9);assert(holder.textContent.includes('der Zug'));assert(holder.textContent.includes('die Straße'));
 const state={doneLessons:[],vocabularyTrainer:{version:2,items:{},lessonItems:{},lessonDecksImported:true,settings:{query:'welcher',lesson:'1',direction:'forward'}}};
 const bank=e.w.A1Vocabulary.buildBank({course:'de',lessons:e.lessons,units:e.w.DE_A1_STUDY.content}),card=bank.find(x=>x.target==='welcher / welche / welches');state.vocabularyTrainer.items[card.id]={streak:1,reviews:2};
 e.w.A1Vocabulary.render({view:e.view,state,course:'de',lessons:e.lessons,units:e.w.DE_A1_STUDY.content,save(){},speak(){}});assert(e.view.textContent.includes('Welche Sprachen?'));e.view.querySelector('#vtStart').click();assert.equal(state.vocabularyTrainer.session.cards[0].id,card.id);assert.equal(e.view.querySelector('.vt-prompt').textContent,'Welche Sprachen?');assert.equal(state.vocabularyTrainer.items[card.id].reviews,2);e.dom.window.close();
});
test('six false bilingual/phrase matches are absent while explained and inflected words remain',()=>{
 const e=setup('deutsch'),f=setup('francais'),plan=e.w.A1LessonVocabularyPlan;
 for(const [id,word]of [[1,'gut'],[1,'morgen'],[14,'hier'],[24,'die Information']])assert(!plan.de[id].regular.includes(word));
 for(const [id,word]of [[3,'du'],[6,'le restaurant']])assert(!f.w.A1LessonVocabularyPlan.fr[id].regular.includes(word));
 for(const [id,word]of [[2,'das Alphabet'],[11,'es'],[13,'ankommen'],[23,'übertragen']])assert(plan.de[id].regular.includes(word));
 assert(f.w.A1LessonVocabularyPlan.fr[22].regular.includes('venir de'));e.dom.window.close();f.dom.window.close();
});
