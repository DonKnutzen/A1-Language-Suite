const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
function environment(){
  const context={window:null,document:{getElementById:()=>({}),body:{}},MutationObserver:class{observe(){}},addEventListener(){}};
  context.window=context;vm.createContext(context);
  for(const file of ['data.js','hard-mode-content.js','hard-mode.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
  return {data:context.FR_A1_HARD_CONTENT,lessons:context.FR_A1_DATA.lessons,mode:context.FR_A1_HARD_MODE};
}
test('every course lesson has a complete, independent exam with valid model answers',()=>{
  const {data,lessons,mode}=environment();assert.equal(Object.keys(data).length,lessons.length);
  const texts=new Set();
  for(const lesson of lessons){
    const d=data[lesson.id],qs=d.listening.flatMap(b=>b.questions);
    assert(d,`lesson ${lesson.id}`);assert(d.gaps.length>=8);assert.equal(d.listening.length,2);assert.equal(qs.length,6);
    assert(d.gaps.length+qs.length+1>=15);assert.equal(d.writing.points.length,3);assert(mode.words(d.writing.model)>=d.writing.minWords,`lesson ${lesson.id}: model too short`);
    assert.equal(qs.filter(q=>!q.options).length,4);assert.equal(qs.filter(q=>q.options).length,2);
    assert.equal((d.text.match(/\{\{\d+\}\}/g)||[]).length,d.gaps.length);
    for(const q of [...d.gaps,...qs]){assert(q.answers.every(a=>a.trim()));assert(mode.matches(q.answers[0],q.answers));if(q.options){assert.equal(new Set(q.options).size,3);assert.equal(q.options.filter(o=>mode.matches(o,q.answers)).length,1);assert(q.options.every(o=>mode.words(o)>=3&&/[.!?]$/.test(o)));}}
    for(const b of d.listening){assert(!texts.has(b.text));texts.add(b.text);assert(b.text.length>110);}
    const attempt={gaps:d.gaps.map(q=>q.answers[0]),listening:qs.map(q=>q.answers[0]),text:d.writing.model,ratings:[2,2,2,2]};
    assert.equal(mode.objective(d,attempt).pct,100);assert(mode.passed(d,attempt));
  }
});
test('unlock depends on a passed lesson check, including existing passes, never legacy completion',()=>{
  const {mode}=environment();
  assert(!mode.unlocked({doneLessons:[1]},1));assert(!mode.unlocked({lessonMasteryBest:{1:79}},1));
  assert(mode.unlocked({lessonMasteryBest:{1:80}},1));assert(mode.unlocked({lessonMasteryBest:{1:100}},1));assert(!mode.unlocked({lessonMasteryBest:{1:100}},2));
});
test('answer formatting accepts accents, apostrophe styles, phone grouping and decimal commas without substring matches',()=>{
  const {mode}=environment();
  assert(mode.matches(" DE L' ",['de l’']));assert(mode.matches('Francois',['François']));
  assert(mode.matches('06 12 40 58 73',['0612405873']));assert(mode.matches('29.90',['29,90']));
  assert(mode.matches('06.12.40.58.73',['0612405873']));assert(mode.matches('8 h 45',['08:45']));assert(mode.matches('13h00',['13:00']));
  assert(!mode.matches('-29',['29']));assert(!mode.matches('2.9',['29']));
  assert(!mode.matches('29.09',['29,90']));assert(!mode.matches('pas Paris',['Paris']));assert(!mode.matches('129',['29']));assert(!mode.matches('',['']));
});
test('writing self-assessment and section minimums cannot be bypassed by a high objective score',()=>{
  const {mode,data}=environment(),d=data[1];
  const a={gaps:d.gaps.map(q=>q.answers[0]),listening:d.listening.flatMap(b=>b.questions).map(q=>q.answers[0]),text:d.writing.model,ratings:[null,null,null,null]};
  assert(!mode.passed(d,a));a.ratings=[2,2,2,0];assert(!mode.passed(d,a));a.ratings=[2,2,1,1];assert(mode.passed(d,a));
  a.text='Bonjour !';assert(!mode.passed(d,a));a.text=d.writing.model;a.ratings=[2,2,2,2];a.listening=Array(6).fill('faux');assert(!mode.passed(d,a));
});
