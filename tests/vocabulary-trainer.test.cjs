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
 test(course+': every lesson has authored words and all paired reference phrases are preserved',()=>{
  const f=fixture(course);assert(f.bank.filter(e=>e.kind==='word').length>=500);
  for(const l of f.options.lessons){assert(f.bank.filter(e=>e.kind==='word'&&e.lessons.includes(l.id)).length>=10,'lesson '+l.id);for(const p of l.phrases)assert(f.bank.some(e=>e.lessons.includes(l.id)&&e.target===p[0].replace(/\|/g,'').trim()&&e.meaning===p[1].replace(/\|/g,'').trim()),p[0]);}
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
  const folder=course==='fr'?'francais':'deutsch',html=read(folder+'/index.html'),sw=read(folder+'/service-worker.js');for(const name of ['vocabulary-content.js','vocabulary-trainer.js','vocabulary-trainer.css']){assert(html.includes(name+'?v=vocab-138'));assert(sw.includes(name+'?v=vocab-138'));}assert(read(folder+'/app.js').includes(course==='fr'?'practice:renderVocab':"if(route==='practice')renderVocab()"));assert(html.includes(course==='fr'?'<small>Vokabeln</small>':'<small>Vocabulaire</small>'));
 });
}
test('language changes preserve drafts, order and self-assessment; profile states stay separate',()=>{
 const f=fixture(),other=fixture();f.$('#vtStart').click();f.$('#vtInput').value='Une réponse';f.$('#vtInput').dispatchEvent(new f.w.Event('input'));const ids=JSON.stringify(f.state.vocabularyTrainer.session.cards);f.w.A1Profile.getUiLang=()=> 'en';f.w.dispatchEvent(new f.w.Event('a1suite:languagechange'));assert.equal(f.$('#vtInput').value,'Une réponse');assert.equal(f.$('#vtReveal').textContent,'Show answer');assert.equal(JSON.stringify(f.state.vocabularyTrainer.session.cards),ids);assert.equal(other.state.vocabularyTrainer.session,null);f.dom.window.close();other.dom.window.close();
});
test('legacy known sentence cards are imported once and require another correct review',()=>{
 const f=fixture();delete f.state.vocabularyTrainer.legacyImported;const e=f.bank.find(e=>e.kind==='example');f.state.vocabKnown=[JSON.stringify([e.lessons[0],e.target,e.meaning]),'broken'];f.open();assert.equal(f.state.vocabularyTrainer.items[e.id].streak,1);f.state.vocabularyTrainer.items[e.id].streak=0;f.open();assert.equal(f.state.vocabularyTrainer.items[e.id].streak,0);f.dom.window.close();
});
test('two correct rounds mark a word confident; a later error returns it to practice',()=>{
 const f=fixture();const input=f.$('#vtSearch');input.value='la majuscule';input.dispatchEvent(new f.w.Event('input'));
 for(let i=0;i<2;i++){f.$('#vtStart').click();f.$('#vtReveal').click();f.$('#vtYes').click();f.$('#vtBack').click();}
 assert.equal(Object.values(f.state.vocabularyTrainer.items)[0].streak,2);f.$('#vtStatus').value='known';f.$('#vtStatus').dispatchEvent(new f.w.Event('change'));assert.equal(f.$$('.vt-entry').length,1);f.$('#vtStart').click();f.$('#vtReveal').click();f.$('#vtAgain').click();f.$('#vtBack').click();assert.equal(f.$$('.vt-entry').length,0);f.dom.window.close();
});
