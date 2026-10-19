const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const {JSDOM}=require('jsdom');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
function environment(id=1,state={lessonMasteryBest:{1:80}}){
  const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/francais/',runScripts:'outside-only'}),w=dom.window;
  let lang='de',saves=0,completions=0,back=0,audio=null;
  w.scrollTo=()=>{};w.A1Profile={getUiLang:()=>lang};w.speechSynthesis={};w.SpeechSynthesisUtterance=class{};
  w.A1Voice={cancel(){},speakDialogue(turns,options){audio={turns,options};return true;}};
  for(const file of ['data.js','hard-mode-content.js','hard-mode.js'])w.eval(read(file));
  const view=w.document.querySelector('main'),lesson=w.FR_A1_DATA.lessons.find(l=>l.id===id),data=w.FR_A1_HARD_CONTENT[id];
  const render=()=>w.FR_A1_HARD_MODE.render({lesson,view,state,save:done=>{saves++;if(done)completions++;},onBack:()=>back++});
  const click=s=>{assert(view.querySelector(s),s);view.querySelector(s).click();};
  const input=(s,value)=>{const el=view.querySelector(s);assert(el,s);el.value=value;el.dispatchEvent(new w.Event('input',{bubbles:true}));};
  const page=i=>click(`[data-hard-page="${i}"]`);
  const begin=()=>{render();click('#hardBegin');};
  return {dom,w,view,state,lesson,data,render,click,input,page,begin,get audio(){return audio;},get saves(){return saves;},get completions(){return completions;},get back(){return back;},language(value){lang=value;w.dispatchEvent(new w.Event('a1suite:languagechange'));}};
}
test('locked entry and direct route require 80%, not an old completion flag',()=>{
  const e=environment(1,{doneLessons:[1],lessonMasteryBest:{1:79}});e.view.innerHTML=e.w.FR_A1_HARD_MODE.entryHtml(e.lesson,e.state);
  assert(e.view.querySelector('[data-hard-start]').disabled);e.render();assert(!e.view.querySelector('#hardBegin'));assert(!e.state.lessonWork);e.dom.window.close();
});
test('draft, position and play counts survive reopening; errors do not consume a play',()=>{
  const e=environment();e.begin();e.input('[data-hard-gap="0"]','m’app');e.page(1);e.input('[data-hard-listen="0"]','Lu');
  e.click('[data-hard-play="0"]');assert.equal(e.state.lessonWork[1].hardMode.attempt.plays[0],1);e.audio.options.onError();assert.equal(e.state.lessonWork[1].hardMode.attempt.plays[0],0);
  e.click('[data-hard-play="0"]');e.audio.options.onEnd();e.click('[data-hard-play="0"]');e.audio.options.onEnd();assert(e.view.querySelector('[data-hard-play="0"]').disabled);
  const saved=JSON.parse(JSON.stringify(e.state));e.dom.window.close();const restored=environment(1,saved);restored.render();
  assert.equal(restored.view.querySelector('[data-hard-listen="0"]').value,'Lu');assert(restored.view.querySelector('[data-hard-play="0"]').disabled);assert(!restored.view.querySelector('.hard-transcript'));
  restored.page(0);assert.equal(restored.view.querySelector('[data-hard-gap="0"]').value,'m’app');restored.dom.window.close();
});
test('language changes preserve input and locked or unlocked entry behavior',()=>{
  const e=environment();e.w.FR_A1_HARD_MODE.renderEntry({lesson:e.lesson,view:e.view,state:e.state,onStart:e.render});e.language('en');assert(e.view.textContent.includes('Unlocked'));e.click('[data-hard-start]');e.click('#hardBegin');
  e.input('[data-hard-gap="0"]','m’appelle');e.language('de');assert.equal(e.view.querySelector('[data-hard-gap="0"]').value,'m’appelle');assert(e.view.textContent.includes('Ergänze die Nachricht.'));e.page(2);e.input('#hardWriting','Bonjour, mon brouillon.');e.language('en');assert.equal(e.view.querySelector('#hardWriting').value,'Bonjour, mon brouillon.');assert(!e.view.querySelector('.hard-transcript'));e.dom.window.close();
});
test('all 24 tests submit, freeze answers, review, score once and preserve achievements on retry',()=>{
  for(let id=1;id<=24;id++){
    const e=environment(id,{lessonMasteryBest:{[id]:80}});e.begin();const {data}=e;
    data.gaps.forEach((q,i)=>e.input(`[data-hard-gap="${i}"]`,q.answers[0]));e.page(1);
    data.listening.flatMap(b=>b.questions).forEach((q,i)=>{
      if(q.options){const el=[...e.view.querySelectorAll(`[data-hard-listen="${i}"]`)].find(el=>el.value===q.answers[0]);assert(el);el.click();}
      else e.input(`[data-hard-listen="${i}"]`,q.answers[0]);
    });
    e.page(2);e.click('#hardSubmit');assert(e.view.querySelector('#hardValidation').textContent);assert(!e.view.querySelector('.hard-transcript'));
    e.input('#hardWriting',data.writing.model);e.click('#hardSubmit');assert(e.view.querySelector('#hardWriting').readOnly);assert(e.view.querySelector('.hard-transcript'));e.click('#hardComplete');assert(e.view.querySelector('#hardValidation').textContent);
    for(const el of e.view.querySelectorAll('[data-hard-rating]')){el.value='2';el.dispatchEvent(new e.w.Event('change'));}
    e.click('#hardComplete');assert(e.view.textContent.includes('100 %'));assert.equal(e.completions,1);const p=e.state.lessonWork[id].hardMode;assert(p.passedAt);assert.equal(p.bestObjective,100);assert.equal(p.attemptsCompleted,1);
    e.click('#hardReview');assert(!e.view.querySelector('input'));assert.equal(e.view.querySelectorAll('.hard-answer.is-correct').length,data.gaps.length);e.page(1);assert.equal(e.view.querySelectorAll('.hard-transcript').length,2);e.page(2);assert(e.view.querySelector('#hardWriting').readOnly);assert([...e.view.querySelectorAll('select')].every(el=>el.disabled));e.click('#hardResult');assert.equal(e.completions,1);
    e.click('#hardRetry');e.click('#hardNew');assert.equal(p.attempt.plays[0],0);assert.equal(p.attempt.text,'');assert.equal(p.bestObjective,100);assert(p.passedAt);assert(!e.view.querySelector('.hard-transcript'));e.dom.window.close();
  }
});
