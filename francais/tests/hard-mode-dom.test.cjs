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
  e.click('[data-hard-play="0"]');e.audio.options.onEnd();e.click('[data-hard-play="0"]');e.audio.options.onEnd();assert(!e.view.querySelector('[data-hard-play="0"]').disabled);e.click('[data-hard-play="0"]');assert.equal(e.audio.options.rate,.75);e.audio.options.onEnd();assert(e.view.querySelector('[data-hard-play="0"]').disabled);
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
    e.click('#hardCancelSubmit');e.input('#hardWriting',data.writing.model);e.click('#hardSubmit');e.click('#hardConfirmSubmit');assert(e.view.querySelector('#hardWriting').readOnly);assert(e.view.querySelector('.hard-transcript'));e.click('#hardComplete');assert(e.view.querySelector('#hardValidation').textContent);
    for(const el of e.view.querySelectorAll('[data-hard-rating]')){el.value='2';el.dispatchEvent(new e.w.Event('change'));}
    e.click('#hardComplete');assert(e.view.textContent.includes('100 %'));assert.equal(e.completions,1);const p=e.state.lessonWork[id].hardMode;assert(p.passedAt);assert.equal(p.bestObjective,100);assert.equal(p.attemptsCompleted,1);
    e.click('#hardReview');assert(!e.view.querySelector('input'));assert.equal(e.view.querySelectorAll('.hard-answer.is-correct').length,data.gaps.length);e.page(1);assert.equal(e.view.querySelectorAll('.hard-transcript').length,2);e.page(2);assert(e.view.querySelector('#hardWriting').readOnly);assert([...e.view.querySelectorAll('select')].every(el=>el.disabled));e.click('#hardResult');assert.equal(e.completions,1);
    e.click('#hardRetry');e.click('#hardNew');assert.equal(p.attempt.plays[0],0);assert.equal(p.attempt.text,'');assert.equal(p.bestObjective,100);assert(p.passedAt);assert.equal(p.history.length,1);assert.equal(p.history[0].text,data.writing.model);assert(!e.view.querySelector('.hard-transcript'));e.dom.window.close();
  }
});

test('locked entry is only a button and unlock hint; details appear after unlocking',()=>{
  const e=environment(1,{lessonMasteryBest:{1:79}});e.view.innerHTML=e.w.FR_A1_HARD_MODE.entryHtml(e.lesson,e.state);
  assert.equal(e.view.querySelectorAll('button').length,1);assert(!e.view.querySelector('.hard-entry-info'));assert(!e.view.textContent.includes('Jetzt wird'));
  e.state.lessonMasteryBest[1]=80;e.view.innerHTML=e.w.FR_A1_HARD_MODE.entryHtml(e.lesson,e.state);assert(e.view.querySelector('.hard-entry-info'));assert(!e.view.querySelector('button').disabled);e.dom.window.close();
});
test('audio keeps focus, error refunds only once, language changes keep the active playback',()=>{
  const e=environment();e.begin();e.page(1);const btn=e.view.querySelector('[data-hard-play="0"]');btn.focus();btn.click();assert.equal(e.w.document.activeElement,btn);
  const callback=e.audio.options;e.language('en');assert(e.view.querySelector('[data-hard-play="0"]').disabled);callback.onError();callback.onError();assert.equal(e.state.lessonWork[1].hardMode.attempt.plays[0],0);
  e.click('[data-hard-play="0"]');e.click('[data-hard-stop]');assert.equal(e.state.lessonWork[1].hardMode.attempt.plays[0],1);e.audio.options.onError();assert.equal(e.state.lessonWork[1].hardMode.attempt.plays[0],1);e.dom.window.close();
});
test('unknown versions keep every answer across language changes and archive before restart',()=>{
  const state={lessonMasteryBest:{1:80},lessonWork:{1:{hardMode:{attempt:{version:0,gaps:['ancien'],listening:['écoute'],text:'Mon brouillon.',ratings:[1,2,1,2],phase:'running',page:0}}}}};
  const e=environment(1,state);e.render();assert(e.view.querySelector('.hard-old-draft').textContent.includes('écoute'));e.language('en');assert(e.view.querySelector('#hardUpdatedStart'));assert(!e.view.querySelector('[data-hard-gap]'));
  e.click('#hardUpdatedStart');assert.equal(state.lessonWork[1].hardMode.history[0].text,'Mon brouillon.');assert.equal(state.lessonWork[1].hardMode.attempt.version,4);e.dom.window.close();
});
test('version 1 keeps original tasks, rules and answers when reopening and switching language',()=>{
  const e=environment();const d=e.w.FR_A1_HARD_LEGACY[1];e.state.lessonWork={1:{hardMode:{attempt:{version:1,phase:'running',page:0,gaps:Array(d.gaps.length).fill(''),listening:Array(6).fill(''),plays:[0,0],text:'',ratings:[null,null,null,null]}}}};
  e.render();assert.equal(e.view.querySelectorAll('[data-hard-gap]').length,d.gaps.length);e.language('en');assert.equal(e.view.querySelectorAll('[data-hard-gap]').length,d.gaps.length);assert(e.view.querySelector('#hardCurrentVersion'));e.click('#hardCurrentVersion');assert.equal(e.view.querySelectorAll('[data-hard-gap]').length,e.data.gaps.length);e.dom.window.close();
});
test('blank submission is explicit, solutions stay hidden until confirmation, then inputs freeze',()=>{
  const e=environment();e.begin();e.page(2);e.click('#hardSubmit');assert(!e.view.querySelector('.hard-transcript'));e.click('#hardConfirmSubmit');assert(e.view.querySelector('.hard-transcript'));assert(e.view.querySelector('#hardWriting').readOnly);assert(!e.view.querySelector('[data-hard-char]'));e.input('#hardWriting','changed');assert.equal(e.state.lessonWork[1].hardMode.attempt.text,'');e.dom.window.close();
});
test('option order persists through language changes, reopening and new attempts retain history',()=>{
  const e=environment();e.begin();e.page(1);const order=JSON.stringify(e.state.lessonWork[1].hardMode.attempt.optionOrders);e.language('en');assert.equal(JSON.stringify(e.state.lessonWork[1].hardMode.attempt.optionOrders),order);e.render();assert.equal(JSON.stringify(e.state.lessonWork[1].hardMode.attempt.optionOrders),order);e.dom.window.close();
});

test('save failure is visible and cannot claim the latest changes were saved',()=>{
  const e=environment();e.w.FR_A1_HARD_MODE.render({lesson:e.lesson,view:e.view,state:e.state,save:()=>{throw new Error('quota');},onBack:()=>{}});e.click('#hardBegin');e.input('[data-hard-gap="0"]','brouillon');assert(e.view.querySelector('#hardSaveStatus').textContent.includes('Speichern fehlgeschlagen'));e.dom.window.close();
});
test('old-version success cannot replace an already achieved current-version status',()=>{
  const e=environment(),d=e.w.FR_A1_HARD_LEGACY[1];e.state.lessonWork={1:{hardMode:{passedAt:123,passedVersion:2,bestObjective:100,attempt:{version:1,phase:'submitted',page:2,gaps:d.gaps.map(q=>q.answers[0]),listening:d.listening.flatMap(b=>b.questions).map(q=>q.answers[0]),plays:[0,0],text:d.writing.model,ratings:[2,2,2,2]}}}};e.render();e.click('#hardComplete');assert.equal(e.state.lessonWork[1].hardMode.passedVersion,2);assert.equal(e.state.lessonWork[1].hardMode.passedAt,123);e.dom.window.close();
});

test('v2 attempts keep their original questions while receiving three slow plays',()=>{
 const e=environment(),d=e.w.FR_A1_HARD_VERSIONS[2][1];e.state.lessonWork={1:{hardMode:{attempt:{version:2,phase:'running',page:1,gaps:Array(d.gaps.length).fill('ancien'),listening:Array(d.listening.flatMap(b=>b.questions).length).fill(''),plays:[2,0],text:'',ratings:[null,null,null,null]}}}};e.state.lessonWork[1].hardMode.passedAt=123;e.state.lessonWork[1].hardMode.passedVersion=2;assert(e.w.FR_A1_HARD_MODE.entryHtml(e.lesson,e.state).includes('Neue Aufgaben verfügbar'));assert.equal(e.state.lessonWork[1].hardMode.passedVersion,2);e.render();assert(!e.view.querySelector('[data-hard-play="0"]').disabled);e.click('[data-hard-play="0"]');assert.equal(e.audio.options.rate,.75);e.audio.options.onEnd();assert(e.view.querySelector('[data-hard-play="0"]').disabled);e.language('en');assert.equal(e.state.lessonWork[1].hardMode.attempt.version,2);e.page(0);assert.equal(e.view.querySelector('[data-hard-gap="0"]').value,'ancien');e.dom.window.close();
});
