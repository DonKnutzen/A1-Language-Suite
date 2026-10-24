const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const {JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(p,'utf8');
function fixture(course='fr'){
 const dom=new JSDOM('<main id="view"></main>',{runScripts:'outside-only'}),w=dom.window;
 w.A1Profile={getUiLang:()=>course==='fr'?'de':'fr'};w.eval(read('shared/vocabulary-content.js'));w.eval(read('shared/vocabulary-trainer.js'));
 let lessons,units;
 if(course==='fr'){w.eval(read('francais/data.js'));w.eval(read('francais/deepening-content.js'));lessons=w.FR_A1_DATA.lessons;units=w.FR_A1_DEEPENING_CONTENT;}
 else{const app=read('deutsch/app.js');lessons=w.eval(app.slice(0,app.indexOf('const grammarSets'))+'lessons;');w.eval(read('deutsch/deepening-content.js'));units=w.DE_A1_STUDY_CONTENT;}
 const state={doneLessons:[1],vocabularyTrainer:{version:1,items:{},settings:{},session:null}},spoken=[],saves=[];
 const options={view:w.document.getElementById('view'),state,lessons,units,course,save:done=>saves.push(done),speak:(...x)=>spoken.push(x)};
 const open=extra=>w.A1Vocabulary.render({...options,...extra});open();
 return {w,dom,state,spoken,saves,options,open,bank:w.A1Vocabulary.buildBank({course,lessons,units}),$:s=>w.document.querySelector(s),$$:s=>[...w.document.querySelectorAll(s)]};
}
for(const course of ['fr','de']){
 test(course+': every lesson has authored lexical cards without imported lesson sentences',()=>{
  const f=fixture(course);assert(f.bank.filter(e=>e.kind==='word').length>=500);
  for(const l of f.options.lessons)assert(f.bank.filter(e=>e.kind==='word'&&e.lessons.includes(l.id)).length>=10,'lesson '+l.id);assert(f.bank.every(e=>e.kind==='word'));assert(!f.bank.some(e=>/^(?:Je m[’']appelle|Ich heiße) /.test(e.target)));
  assert.equal(new Set(f.bank.map(e=>e.id)).size,f.bank.length);assert(f.bank.every(e=>e.target&&!e.target.includes('|')&&e.meaning));f.dom.window.close();
 });
 test(course+': search both languages, accents, lesson and no-results disable training',()=>{
  const f=fixture(course),input=f.$('#vtSearch');input.value='ecole';input.dispatchEvent(new f.w.Event('input'));assert(f.$$('.vt-entry').some(e=>e.textContent.includes('Schule')));
  input.value='notaword-000';input.dispatchEvent(new f.w.Event('input'));assert(f.$('#vtStart').disabled);assert.equal(f.$$('.vt-entry').length,0);
  f.open({initialLesson:2});assert.equal(f.$('#vtLesson').value,'2');assert(f.$$('.vt-entry').every(e=>e.querySelector('.vt-meta').textContent.match(/2/)));
  f.dom.window.close();
 });
 test(course+': active typed draft and revealed answer survive a fresh render without double rating',()=>{
  const f=fixture(course);f.$('#vtStart').click();const snapshot=JSON.stringify(f.state.vocabularyTrainer.session.cards);f.$('#vtInput').value='réponse ä ß';f.$('#vtInput').dispatchEvent(new f.w.Event('input'));
  f.open();f.$('#vtResume').click();assert.equal(f.$('#vtInput').value,'réponse ä ß');assert.equal(JSON.stringify(f.state.vocabularyTrainer.session.cards),snapshot);
  f.$('#vtReveal').click();assert(f.$('#vtInput').readOnly);f.open();f.$('#vtResume').click();assert(f.$('#vtYes'));const button=f.$('#vtYes');button.click();button.click();assert.equal(f.state.vocabularyTrainer.session.index,1);assert.equal(f.state.vocabularyTrainer.session.ratings.length,1);
  const card=f.state.vocabularyTrainer.session.cards[0];assert.equal(f.state.vocabularyTrainer.items[card.id].streak,1);assert(f.saves.includes(true));f.dom.window.close();
 });
 test(course+': reverse direction never leaks target in audio before revealing; short pools stay short',()=>{
  const f=fixture(course);const input=f.$('#vtSearch');input.value=course==='fr'?'la majuscule':'Großbuchstabe';input.dispatchEvent(new f.w.Event('input'));const direction=f.$('#vtDirection');direction.value='reverse';direction.dispatchEvent(new f.w.Event('change'));f.$('#vtStart').click();assert.equal(f.state.vocabularyTrainer.session.cards.length,1);assert.equal(f.$('[data-vt-audio]'),null);f.$('#vtReveal').click();f.$('[data-vt-audio]').click();assert(f.spoken[0][0].includes(course==='fr'?'majuscule':'Großbuchstabe'));f.$('#vtAgain').click();assert(f.$('#vtBack'));assert.equal(Object.values(f.state.vocabularyTrainer.items)[0].streak,0);f.dom.window.close();
 });
 test(course+': learned filter excludes future-only words and two correct ratings are required',()=>{
  const f=fixture(course),s=f.state.vocabularyTrainer;s.items[f.bank[0].id]={streak:1};const lesson=f.$('#vtLesson');lesson.value='learned';lesson.dispatchEvent(new f.w.Event('change'));assert(f.$$('.vt-entry').length>0);assert(f.$$('.vt-entry').every(e=>e.querySelector('.vt-meta').textContent.match(/(?:Lektion|Leçon) 1(?:,| ·)/)));
  const status=f.$('#vtStatus');status.value='known';status.dispatchEvent(new f.w.Event('change'));assert.equal(f.$$('.vt-entry').length,0);f.dom.window.close();
 });
 test(course+': service worker includes all new assets and bottom nav routes to trainer',()=>{
  const folder=course==='fr'?'francais':'deutsch',html=read(folder+'/index.html'),sw=read(folder+'/service-worker.js');for(const name of ['vocabulary-content.js','vocabulary-trainer.js','vocabulary-trainer.css']){const revision=name==='vocabulary-content.js'?'vocab-decks-150':name==='vocabulary-trainer.js'?'didactic-161':'vocabulary-pairs-160';assert(html.includes(name+'?v='+revision));assert(sw.includes(name+'?v='+revision));}assert(read(folder+'/app.js').includes(course==='fr'?'practice:renderVocab':"if(route==='practice')renderVocab()"));assert(html.includes(course==='fr'?'<small>Vokabeln</small>':'<small>Vocabulaire</small>'));
 });
}
test('language changes preserve drafts, order and self-assessment; profile states stay separate',()=>{
 const f=fixture(),other=fixture();f.$('#vtStart').click();f.$('#vtInput').value='Une réponse';f.$('#vtInput').dispatchEvent(new f.w.Event('input'));const ids=JSON.stringify(f.state.vocabularyTrainer.session.cards);f.w.A1Profile.getUiLang=()=> 'en';f.w.dispatchEvent(new f.w.Event('a1suite:languagechange'));assert.equal(f.$('#vtInput').value,'Une réponse');assert.equal(f.$('#vtReveal').textContent,'Show answer');assert.equal(JSON.stringify(f.state.vocabularyTrainer.session.cards),ids);assert.equal(other.state.vocabularyTrainer.session,null);f.dom.window.close();other.dom.window.close();
});
test('old sentence cards remain archived without becoming word learning grades',()=>{
 const f=fixture(),word=f.bank[0],example={id:JSON.stringify(['example','Je suis Nora.','Ich bin Nora.']),target:'Je suis Nora.',meaning:'Ich bin Nora.',kind:'example',lessons:[1]};
 f.state.vocabularyTrainer.session={version:1,cards:[example,word],index:1,ratings:[false],draft:'réponse',revealed:false,direction:'reverse'};f.open();const root=f.state.vocabularyTrainer;assert.equal(root.previousSession.cards.length,2);assert.equal(root.session.cards.length,1);assert.equal(root.session.cards[0].id,word.id);assert.equal(root.session.draft,'réponse');assert.deepEqual(Array.from(root.session.ratings),[]);assert.equal(root.session.index,0);assert(!root.items[example.id]);f.dom.window.close();
});
test('two correct rounds mark a word confident; a later error returns it to practice',()=>{
 const f=fixture();const input=f.$('#vtSearch');input.value='la majuscule';input.dispatchEvent(new f.w.Event('input'));
 for(let i=0;i<2;i++){f.$('#vtStart').click();f.$('#vtReveal').click();f.$('#vtYes').click();f.$('#vtBack').click();}
 assert.equal(Object.values(f.state.vocabularyTrainer.items)[0].streak,2);f.$('#vtStatus').value='known';f.$('#vtStatus').dispatchEvent(new f.w.Event('change'));assert.equal(f.$$('.vt-entry').length,1);f.$('#vtStart').click();f.$('#vtReveal').click();f.$('#vtAgain').click();f.$('#vtBack').click();assert.equal(f.$$('.vt-entry').length,0);f.dom.window.close();
});


for(const course of ['fr','de']){
 test(course+': entering from a lesson shows words only, even after an old all-content filter',()=>{
  const f=fixture(course);f.state.vocabularyTrainer.settings.kind='both';f.open({initialLesson:6});assert(!f.$('#vtKind'));assert.equal(f.state.vocabularyTrainer.settings.kind,'word');assert.equal(f.$('#vtLesson').value,'6');assert(f.$$('.vt-entry').length>=10);f.$('#vtStart').click();assert(f.state.vocabularyTrainer.session.cards.every(e=>e.kind==='word'&&e.lessonId===6));f.dom.window.close();
 });
 test(course+': a failed word is saved in the displayed lesson and produces an accessible deck',()=>{
  const f=fixture(course);f.open({initialLesson:1});f.$('#vtStart').click();const card=f.state.vocabularyTrainer.session.cards[0];f.$('#vtReveal').click();const again=f.$('#vtAgain');again.click();again.click();const root=f.state.vocabularyTrainer;assert.equal(root.lessonItems[1][card.id].wrong,1);assert.equal(root.session.ratings.length,1);assert(f.$('[role="status"]').textContent.includes(course==='fr'?'Fehlerstapel':'pile'));f.$('#vtBack').click();f.$('#vtMistakes').click();assert.equal(f.$$('.vt-deck').length,1);assert(!f.$('#vtResume'));assert(f.$('.vt-deck-count').textContent.includes(course==='fr'?'1 Eintrag':'1 entrée'));assert.equal(f.$('[data-vt-deck]').dataset.vtDeck,'1');f.$('[data-vt-deck]').click();assert.equal(f.$$('.vt-entry').length,1);assert(f.w.A1Vocabulary.displayPairs(course,card).every(p=>f.$('.vt-entry').textContent.includes(p.target)));f.dom.window.close();
 });
 test(course+': two real correct reviews clear only that lesson; first correct and later failure are distinguished',()=>{
  const f=fixture(course),api=f.w.A1Vocabulary,root=f.state.vocabularyTrainer,e=f.bank.find(x=>x.lessons.length>1),[one,two]=e.lessons;
  api.rate(root,{...e,lessonId:one},false);api.rate(root,{...e,lessonId:two},false);f.open();f.$('#vtMistakes').click();assert.equal(f.$$('.vt-deck').length,2);f.$(`[data-vt-deck="${one}"]`).click();
  for(let n=0;n<2;n++){f.$('#vtStart').click();assert.equal(root.session.cards.length,1);assert.equal(root.session.cards[0].lessonId,one);f.$('#vtReveal').click();f.$('#vtYes').click();f.$('#vtBack').click();}
  assert.equal(root.lessonItems[one][e.id].streak,2);assert.equal(root.lessonItems[two][e.id].streak,0);assert.deepEqual(Array.from(api.mistakeDecks(root,f.bank),d=>d.lessonId),[two]);
  api.rate(root,{...e,lessonId:one},false);assert.equal(api.mistakeDecks(root,f.bank).length,2);f.dom.window.close();
 });
 test(course+': unseen and once-correct words are never invented as mistakes',()=>{
  const f=fixture(course),api=f.w.A1Vocabulary,root=f.state.vocabularyTrainer,e=f.bank[0];api.rate(root,{...e,lessonId:e.lessons[0]},true);assert.equal(api.mistakeDecks(root,f.bank).length,0);f.open();f.$('#vtMistakes').click();assert.equal(f.$$('.vt-deck').length,0);assert(f.$('#vtStart').disabled);assert(f.$('#vtCount').textContent.includes(course==='fr'?'Keine':'Aucune'));f.dom.window.close();
 });
 test(course+': old mistakes are imported once, and ambiguous lesson provenance is labelled honestly',()=>{
  const f=fixture(course),api=f.w.A1Vocabulary,root=f.state.vocabularyTrainer,single=f.bank.find(e=>e.lessons.length===1),multi=f.bank.find(e=>e.lessons.length>1);delete root.lessonDecksImported;root.items[single.id]={streak:0,reviews:3,last:12};root.items[multi.id]={streak:0,reviews:1,last:13};api.prepareState(f.state,f.bank);assert(root.lessonItems[single.lessons[0]][single.id]);assert(root.lessonItems[0][multi.id]);api.rate(root,{...single,lessonId:single.lessons[0]},true);api.prepareState(f.state,f.bank);assert.equal(root.lessonItems[single.lessons[0]][single.id].streak,1);f.open();f.$('#vtMistakes').click();assert(f.$('[data-vt-deck="0"]'));f.dom.window.close();
 });
 test(course+': the wrong-word round cannot pull in other words, examples, or lessons',()=>{
  const f=fixture(course),api=f.w.A1Vocabulary,root=f.state.vocabularyTrainer,e=f.bank.find(x=>x.lessons.includes(7));api.rate(root,{...e,lessonId:7},false);f.open();f.$('#vtMistakes').click();f.$('[data-vt-deck="7"]').click();f.$('#vtStart').click();assert.equal(root.session.mode,'mistakes');assert.equal(root.session.cards.length,1);assert.equal(root.session.cards[0].id,e.id);assert.equal(root.session.cards[0].lessonId,7);assert.equal(root.session.cards[0].kind,'word');f.dom.window.close();
 });
 test(course+': deck progress and drafts survive serialization and reloading without a second grade',()=>{
  const f=fixture(course);f.open({initialLesson:4});f.$('#vtStart').click();f.$('#vtInput').value='test é ä';f.$('#vtInput').dispatchEvent(new f.w.Event('input'));const saved=JSON.stringify(f.state),g=fixture(course);Object.assign(g.state,JSON.parse(saved));g.open();g.$('#vtResume').click();assert.equal(g.$('#vtInput').value,'test é ä');g.$('#vtReveal').click();g.$('#vtAgain').click();const e=g.state.vocabularyTrainer.session.cards[0];const again=JSON.parse(JSON.stringify(g.state));Object.assign(g.state,again);g.open();g.$('#vtResume').click();assert.equal(g.state.vocabularyTrainer.lessonItems[4][e.id].wrong,1);f.dom.window.close();g.dom.window.close();
 });
}
test('legacy mixed rounds keep earned word ratings and clear only a removed current sentence draft',()=>{
 const f=fixture(),[a,b]=f.bank,example={id:'old-example',target:'Un exemple.',meaning:'Ein Beispiel.',kind:'example',lessons:[1]};f.state.vocabularyTrainer.session={version:1,cards:[a,example,b],index:1,ratings:[true],draft:'old sentence',revealed:true,direction:'forward'};f.open();const s=f.state.vocabularyTrainer.session;assert.equal(s.version,2);assert.equal(s.cards.length,2);assert.equal(s.index,1);assert.equal(s.ratings[0],true);assert.equal(s.draft,'');assert.equal(s.revealed,false);f.dom.window.close();
});
test('switching UI language preserves lesson deck association and revealed self-assessment',()=>{
 const f=fixture();f.open({initialLesson:1});f.$('#vtStart').click();f.$('#vtReveal').click();const before=JSON.stringify(f.state.vocabularyTrainer.session);f.w.A1Profile.getUiLang=()=> 'en';f.w.dispatchEvent(new f.w.Event('a1suite:languagechange'));assert.equal(JSON.stringify(f.state.vocabularyTrainer.session),before);assert.equal(f.$('#vtAgain').textContent,'I didn’t know it');f.$('#vtAgain').click();assert.equal(f.state.vocabularyTrainer.session.notice.lessonId,1);f.dom.window.close();
});
