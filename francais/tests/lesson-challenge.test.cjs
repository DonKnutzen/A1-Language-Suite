const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const repo=path.resolve(__dirname,'../..');
function environment(state={lessonMasteryBest:{1:80}},id=1){
  const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/francais/',runScripts:'outside-only'}),w=dom.window,spoken=[];
  let language='de',audio=null,saves=0,completions=0,cancels=0;
  w.scrollTo=()=>{};w.A1Profile={getUiLang:()=>language};w.speechSynthesis={};w.SpeechSynthesisUtterance=class{};
  w.A1Voice={speak:(text,options)=>spoken.push({text,options}),cancel:()=>cancels++,speakDialogue:(turns,options)=>{audio={turns,options};return true;}};
  for(const f of ['shared/answer-feedback.js','francais/data.js','francais/hard-mode-content.js','francais/lesson-challenge.js','francais/hard-mode.js'])w.eval(fs.readFileSync(path.join(repo,f),'utf8'));
  const view=w.document.querySelector('main'),lesson=w.FR_A1_DATA.lessons.find(l=>l.id===id);
  const render=()=>w.FR_A1_HARD_MODE.render({lesson,view,state,save:done=>{saves++;if(done)completions++;},onBack:()=>view.replaceChildren()});
  const click=selector=>{const el=view.querySelector(selector);assert(el,selector);el.click();};
  const input=(value,selector='#challengeAnswer')=>{const el=view.querySelector(selector);assert(el,selector);el.value=value;el.dispatchEvent(new w.Event('input',{bubbles:true}));};
  const choose=value=>{const el=[...view.querySelectorAll('[name="challenge-answer"]')].find(el=>el.value===value);assert(el,value);el.click();};
  const answer=value=>{if(view.querySelector('[name="challenge-answer"]'))choose(value);else input(value);click('#challengeCheck');};
  const begin=()=>{render();click('#challengeBegin');};
  return {dom,w,view,state,spoken,render,click,input,choose,answer,begin,get attempt(){return state.lessonWork[1].hardMode.challenge.attempt;},get completions(){return completions;},get saves(){return saves;},get cancels(){return cancels;},get audio(){return audio;},language(value){language=value;w.dispatchEvent(new w.Event('a1suite:languagechange'));}};
}
const right=['Bonjour !','Ça va bien, merci.','m’appelle','viens','habitez','Paris','Français'];
function firstSeven(e,wrong=[]){for(let i=0;i<7;i++){e.answer(wrong.includes(i)?(i===0?'Bonsoir !':'faux'):right[i]);e.click('#challengeNext');}}
function writing(e){e.input('Je m’appelle Jo. J’habite à Québec.');e.click('[data-challenge-writing="0"]');e.click('[data-challenge-writing="1"]');e.click('#challengeCheck');e.click('#challengeNext');}

test('only lesson 1 routes to the eight-task challenge; unlocking still requires 80%',()=>{
  const e=environment();e.render();assert(e.view.textContent.includes('6–10'));assert(e.view.textContent.includes('Acht kleine Schritte'));assert(!e.view.querySelector('#hardBegin'));
  assert(e.w.FR_A1_HARD_MODE.entryHtml({id:1},e.state).includes('Lektions-Challenge'));
  assert(e.w.FR_A1_HARD_MODE.entryHtml({id:2},{lessonMasteryBest:{2:80}}).includes('3 Teile'));
  e.dom.window.close();
  const locked=environment({lessonMasteryBest:{1:79}});locked.render();assert(!locked.view.querySelector('#challengeBegin'));assert(!locked.state.lessonWork);locked.dom.window.close();
  const other=environment({lessonMasteryBest:{2:80}},2);other.render();assert(other.view.querySelector('#hardBegin'));assert(!other.view.querySelector('#challengeBegin'));other.dom.window.close();
});
test('a complete round gives accurate first-check results, a completion and an award; reopening is silent',()=>{
  const e=environment();e.begin();assert.equal(e.attempt.queue.length,8);firstSeven(e);writing(e);
  assert.equal(e.attempt.phase,'completed');assert.equal(e.completions,1);assert.equal(e.attempt.result.correct,7);assert.equal(e.attempt.result.total,7);assert(e.view.textContent.includes('CHALLENGE ABGESCHLOSSEN'));assert(e.view.textContent.includes('Besonders sicher'));
  assert(e.w.FR_A1_HARD_MODE.goldResult(e.w.FR_A1_HARD_MODE.achievement(e.state,1)));
  const count=e.spoken.length;e.render();assert.equal(e.completions,1);assert.equal(e.spoken.length,count);e.click('#challengeReview');assert(e.view.textContent.includes('Québec'));e.click('#challengeReturn');assert.equal(e.completions,1);
  e.click('#challengeNew');e.click('#challengeConfirmNew');assert.equal(e.state.lessonWork[1].hardMode.challenge.history.length,1);assert(e.w.FR_A1_HARD_MODE.achievement(e.state,1));assert.equal(e.attempt.answers[0],'');e.dom.window.close();
});
test('wrong answers reappear alone; correcting them never changes the first-check score',()=>{
  const e=environment();e.begin();firstSeven(e,[0,3]);writing(e);assert.equal(e.attempt.phase,'round-end');assert.equal(e.attempt.solved.filter(Boolean).length,6);assert.equal(e.completions,0);
  e.click('#challengePractise');assert.deepEqual(Array.from(e.attempt.queue),[0,3]);e.answer(right[0]);e.click('#challengeNext');e.answer(right[3]);e.click('#challengeNext');
  assert.equal(e.attempt.phase,'completed');assert.equal(e.attempt.result.correct,5);assert.equal(e.attempt.firstAnswers[3],'faux');assert.equal(e.attempt.answers[3],'viens');assert(!e.view.textContent.includes('Besonders sicher'));assert.equal(e.completions,1);e.dom.window.close();
});
test('every newly checked non-listening answer speaks once, including wrong ones; redraw and replay behave separately',()=>{
  const e=environment();e.begin();assert.equal(e.spoken.length,0);e.answer('Bonsoir !');assert.equal(e.spoken.length,1);assert.equal(e.spoken[0].text,'Bonjour !');assert.equal(e.spoken[0].options.lang,'fr-FR');
  e.language('en');e.render();assert.equal(e.spoken.length,1);e.click('[data-correct-answer-audio]');assert.equal(e.spoken.length,2);e.click('#challengeNext');e.answer(right[1]);assert.equal(e.spoken.length,3);
  for(let i=2;i<5;i++){e.click('#challengeNext');e.answer(right[i]);}const before=e.spoken.length;
  for(let i=5;i<7;i++){e.click('#challengeNext');e.answer(right[i]);assert(!e.view.querySelector('[data-correct-answer-audio]'));}assert.equal(e.spoken.length,before);
  e.click('#challengeNext');writing(e);assert.equal(e.spoken.length,before+1);assert.equal(e.spoken.at(-1).text,'Je m’appelle Anna. J’habite à Halifax.');e.dom.window.close();
});
test('hints and word choices preserve first-check credit and never submit an answer',()=>{
  const e=environment();e.begin();for(let i=0;i<2;i++){e.answer(right[i]);e.click('#challengeNext');}e.click('#challengeHint');assert(e.view.querySelector('.challenge-hint'));assert(!e.view.querySelector('[data-challenge-word]'));e.click('#challengeHint');assert.equal(e.view.querySelectorAll('[data-challenge-word]').length,3);assert.equal(e.attempt.firstCorrect[2],null);
  e.click('[data-challenge-word="m’appelle"]');assert.equal(e.view.querySelector('#challengeAnswer').value,'m’appelle');e.click('#challengeCheck');assert.equal(e.attempt.firstCorrect[2],true);
  for(let i=3;i<7;i++){e.click('#challengeNext');e.answer(right[i]);}e.click('#challengeNext');writing(e);assert.equal(e.attempt.result.correct,7);assert.equal(e.attempt.result.pct,100);assert(!e.view.textContent.includes('Besonders sicher'));assert(!e.w.FR_A1_HARD_MODE.goldResult(e.attempt));e.dom.window.close();
});
test('listening is unlimited, speed is selectable, transcripts follow checking and errors allow another play',()=>{
  const e=environment();e.begin();for(let i=0;i<5;i++){e.answer(right[i]);e.click('#challengeNext');}assert(!e.view.querySelector('.challenge-transcript'));
  for(let i=0;i<5;i++){e.click('#challengeListen');assert.equal(e.audio.options.rate,.75);assert.equal(e.audio.turns[0].gender,'male');e.audio.options.onEnd();}
  assert(!e.view.querySelector('#challengeListen').disabled);const select=e.view.querySelector('#challengeRate');select.value='1';select.dispatchEvent(new e.w.Event('change'));e.click('#challengeListen');assert.equal(e.audio.options.rate,1);e.audio.options.onError();assert(e.view.querySelector('#challengeAudioError').textContent);assert(!e.view.querySelector('#challengeListen').disabled);
  e.answer('Paris');assert(e.view.querySelector('.challenge-transcript'));assert(!e.view.querySelector('.challenge-transcript').open);assert.equal(e.spoken.length,5);e.dom.window.close();
});
test('a saved draft retains typed text, option order, hints, cursor, speed and writing checks',()=>{
  const e=environment();e.begin();e.answer(right[0]);e.click('#challengeNext');const order=JSON.stringify(e.attempt.orders);e.choose(right[1]);e.click('#challengeHint');const state=JSON.parse(JSON.stringify(e.state));e.dom.window.close();
  const r=environment(state);r.render();assert.equal(r.attempt.cursor,1);assert.equal(JSON.stringify(r.attempt.orders),order);assert(r.view.querySelector('.challenge-hint'));assert.equal(r.view.querySelector('input:checked').value,right[1]);assert.equal(r.spoken.length,0);r.language('en');assert(r.view.textContent.includes('Keep the conversation'));r.dom.window.close();
});
test('writing requires the learner to compare both content points and accepts their own wording',()=>{
  const e=environment();e.begin();firstSeven(e);e.click('#challengeCheck');assert(e.view.querySelector('#challengeNotice').textContent);assert.equal(e.attempt.firstCorrect[7],null);
  e.input('Moi, c’est Jo. Je vis à Québec.');e.click('#challengeCheck');assert.equal(e.attempt.firstCorrect[7],null);assert(!e.view.querySelector('#challengeFeedback'));e.click('#challengeHint');assert(e.view.textContent.includes('Je m’appelle'));
  e.click('[data-challenge-writing="0"]');e.click('[data-challenge-writing="1"]');e.click('#challengeCheck');assert(e.view.textContent.includes('Selbst geprüft'));assert(e.view.querySelector('textarea').readOnly);assert.equal(e.attempt.answers[7],'Moi, c’est Jo. Je vis à Québec.');e.click('#challengeNext');assert.equal(e.attempt.phase,'completed');e.dom.window.close();
});
test('old saved Hard Mode attempts and awards stay intact and remain accessible',()=>{
  const e=environment(),d=e.w.FR_A1_HARD_CONTENT[1],old={version:4,phase:'reviewed',page:3,gaps:d.gaps.map(q=>q.answers[0]),listening:d.listening.flatMap(b=>b.questions).map(q=>q.answers[0]),text:d.writing.model,ratings:[2,2,2,2],completedAt:123,result:{correct:23,total:23,pct:100,passed:true}};
  old.optionOrders=d.listening.flatMap(b=>b.questions).map(q=>q.options?[...q.options]:null);e.state.lessonWork={1:{hardMode:{attempt:old,passedAt:123,bestObjective:100}}};const before=JSON.stringify(old);e.render();e.click('[data-challenge-legacy]');assert(e.view.querySelector('#hardReview'));assert.equal(JSON.stringify(old),before);
  e.render();e.click('#challengeBegin');assert.equal(JSON.stringify(old),before);assert(e.w.FR_A1_HARD_MODE.achievement(e.state,1));assert.equal(e.state.lessonWork[1].hardMode.passedAt,123);e.dom.window.close();
});
test('audio cancellation ignores stale callbacks and language changes keep ongoing playback state',()=>{
  const e=environment();e.begin();for(let i=0;i<5;i++){e.answer(right[i]);e.click('#challengeNext');}e.click('#challengeListen');const old=e.audio;e.language('en');assert(e.view.querySelector('#challengeListen').disabled);e.click('#challengeStop');assert(!e.view.querySelector('#challengeListen').disabled);e.click('#challengeListen');old.options.onEnd();assert(e.view.querySelector('#challengeListen').disabled);e.audio.options.onEnd();assert(!e.view.querySelector('#challengeListen').disabled);e.dom.window.close();
});
test('all new browser assets are versioned and precached, and the helper loads before the router',()=>{
  const html=fs.readFileSync(path.join(repo,'francais/index.html'),'utf8'),sw=fs.readFileSync(path.join(repo,'francais/service-worker.js'),'utf8');
  for(const name of ['lesson-challenge.js','lesson-challenge.css','hard-mode.js']){const url=html.match(new RegExp('(?:src|href)="('+name.replace('.','\\.')+'\\?[^\"]+)"'))?.[1];assert(url,name);assert(sw.includes(JSON.stringify('./'+url)),url);}
  assert(html.indexOf('lesson-challenge.js')<html.indexOf('src="hard-mode.js'));assert(sw.includes('grouped-hardmode-v189'));
});
test('hints can be collapsed and reopened, and text answers can be checked with Enter',()=>{
  const e=environment();e.begin();for(let i=0;i<2;i++){e.answer(right[i]);e.click('#challengeNext');}
  e.click('#challengeHint');e.click('#challengeHint');e.click('#challengeHint');assert(!e.view.querySelector('.challenge-hint'));assert(!e.view.querySelector('[data-challenge-word]'));assert.equal(e.attempt.hints[2],2);
  e.click('#challengeHint');assert.equal(e.view.querySelectorAll('[data-challenge-word]').length,3);e.input('m\'appelle');e.view.querySelector('#challengeAnswer').dispatchEvent(new e.w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.equal(e.attempt.solved[2],true);assert(e.view.querySelector('#challengeFeedback'));e.dom.window.close();
});
test('save failures remain visible instead of claiming progress was saved',()=>{
  const e=environment();e.w.FR_A1_HARD_MODE.render({lesson:e.w.FR_A1_DATA.lessons[0],view:e.view,state:e.state,save:()=>{throw new Error('quota');},onBack(){}});e.click('#challengeBegin');assert(e.view.querySelector('#challengeSave').textContent.includes('Speichern fehlgeschlagen'));e.answer(right[0]);assert(e.view.querySelector('#challengeSave').textContent.includes('Speichern fehlgeschlagen'));e.dom.window.close();
});
