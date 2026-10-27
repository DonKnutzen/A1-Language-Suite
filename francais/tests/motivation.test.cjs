const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

function api(language='de'){
  const window={A1Profile:{getUiLang:()=>language}};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..','motivation.js'),'utf8'),{window});
  return window.FR_A1_MOTIVATION;
}

test('first lesson uses one consistent situation across the mission and free application',()=>{
  const m=api();
  assert.match(m.choiceHtml('neighbour'),/value="neighbour" checked/);
  assert.match(m.prompt('speak','neighbour'),/Nachbarschaft/);
  assert.match(m.prompt('write','neighbour'),/Nachbarschaft/);
  assert.match(m.sceneHtml(1,'comprehension'),/Marc/);
  assert.equal(m.sceneHtml(2,'comprehension'),'');
});

test('repair is a new first-lesson answer and never changes later lesson tasks',()=>{
  const m=api();
  assert.deepEqual({...m.repairFor(1,{answer:'Je m’appelle Paul.'})},{prompt:'Wie sagst du: „Ich heiße Nora“?',answer:'Je m’appelle Nora.',hint:'Für den Namen verwendest du s’appeler.'});
  assert.equal(m.repairFor(2,{answer:'Je m’appelle Paul.'}),null);
  assert.equal(m.repairFor(1,{answer:'Guten Tag!'}),null);
});

test('result states a real learning goal without claiming an automatic grade for free text',()=>{
  const m=api('en'),goal='I can greet someone and say my name.';
  const passed=m.resultHtml({canDo:[goal]},true);
  assert.match(passed,/Optional mini self-check/);
  assert.match(passed,/app gives no points/);
  assert.match(passed,/I can greet someone/);
  assert.doesNotMatch(m.resultHtml({canDo:[goal]},false),/Optional mini self-check/);
  assert.match(m.resultHtml({canDo:['<unsafe>']},true),/&lt;unsafe&gt;/);
});

test('a deliberate pause resumes the same lesson and application step',()=>{
  const window={};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..','lesson-flow.js'),'utf8'),{window});
  const flow=window.A1LessonFlow,lesson={id:1},next={id:2};
  const state={lastLessonId:1,doneLessons:[1],lessonWork:{1:{resume:{step:'write'},motivationPaused:true}}};
  assert.equal(flow.continuation([lesson,next],state).id,1);
  assert.equal(flow.resumePosition(lesson,state).step,'write');
  state.lessonWork[1].motivationPaused=false;
  assert.equal(flow.resumePosition(lesson,state).step,'check');
});
