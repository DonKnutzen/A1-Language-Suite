const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
function environment(seed=1){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/francais/',runScripts:'outside-only'}),w=dom.window;w.scrollTo=()=>{};
 w.Math.random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 for(const file of ['data.js','mastery-specs.js','mastery.js'])w.eval(fs.readFileSync(path.join(__dirname,'..',file),'utf8'));
 return {dom,w,view:w.document.querySelector('main'),lessons:w.FR_A1_DATA.lessons,mode:w.FR_A1_MASTERY};
}
test('all 24 checks use dedicated contextual choices, distinct answers and spaced productive patterns',()=>{
 for(const seed of [1,42,732,2001,123456]){
  const e=environment(seed);
  for(const lesson of e.lessons){
   const tasks=e.mode.makeLessonTest(lesson),contexts=tasks.filter(t=>t.checkKey?.includes('-context-')),gaps=tasks.filter(t=>t.type==='gap');
   assert.equal(contexts.length,8);assert(gaps.length>=2);assert.equal(new Set(tasks.map(t=>t.checkKey)).size,tasks.length);assert.equal(tasks[0].type,'choice');
   for(const t of contexts){assert(!lesson.quiz.some(q=>q.q===t.q));assert.equal(t.o.length,3);assert.equal(new Set(t.o).size,3);assert.equal(t.o.filter(o=>o===t.answer).length,1);assert(t.explanation);}
   const groups={};for(const t of gaps){groups[t.family]=(groups[t.family]||0)+1;assert(groups[t.family]<=(lesson.id===1?1:2));}
   for(let i=1;i<tasks.length;i++){assert.notEqual(tasks[i].answer,tasks[i-1].answer,`L${lesson.id}: consecutive answer`);assert.notEqual(tasks[i].family,tasks[i-1].family,`L${lesson.id}: consecutive pattern`);}
  }e.dom.window.close();
 }
});
test('runtime keeps the planned order, saves choice positions and completes every lesson exactly once',()=>{
 const e=environment(73);
 for(const lesson of e.lessons){
  const state={},audio=[];let completions=0;
  const render=()=>e.mode.renderLessonTest({lesson,view:e.view,state,save:done=>{if(done)completions++;},onBack:()=>{},speak:value=>audio.push(value)});
  render();e.view.querySelector('#masteryStart').click();const progress=state.lessonCheckProgress[lesson.id],sequence=JSON.parse(JSON.stringify(progress.session.ex));
  for(let i=0;i<sequence.length;i++){
   assert.equal(progress.session.ex[i].checkKey,sequence[i].checkKey);
   const q=progress.session.ex[i];if(i>0){assert.notEqual(q.family,progress.session.ex[i-1].family);assert.notEqual(q.answer,progress.session.ex[i-1].answer);}
   if(q.type==='choice')e.view.querySelector(`[data-mastery-o="${q.o.indexOf(q.answer)}"]`).click();
   else{const field=e.view.querySelector('#masteryInput');field.value=q.answer;field.dispatchEvent(new e.w.Event('input'));e.view.querySelector('#masteryCheck').click();}
   if(i===2){const score=progress.session.score,positions=JSON.stringify(progress.session.ex);render();e.view.querySelector('#masteryStart').click();assert.equal(progress.session.score,score);assert.equal(JSON.stringify(progress.session.ex),positions);}
   e.view.querySelector('#masteryNext').click();
  }
  assert.equal(completions,1);assert.equal(state.lessonMasteryBest[lesson.id],100);assert(!progress.session);assert.equal(e.view.querySelector('.score').textContent,'100%');
 }e.dom.window.close();
});
test('new attempts vary both the opening situation and sampled grammar, without changing counts',()=>{
 const e=environment(341);for(const lesson of e.lessons){const openings=new Set(),samples=new Set(),counts=new Set();for(let i=0;i<20;i++){const tasks=e.mode.makeLessonTest(lesson);openings.add(tasks[0].checkKey);samples.add(tasks.filter(t=>t.type==='gap').map(t=>t.checkKey).sort().join('|'));counts.add(tasks.length);}assert(openings.size>1);assert.equal(counts.size,1);const groups={};for(const t of e.mode.spec(lesson.id).tasks.filter(t=>t.type==='gap')){(groups[t.tag]||=new Set()).add(t.answer);}if(Object.values(groups).some(g=>g.size>(lesson.id===1?1:2)))assert(samples.size>1,`L${lesson.id}: grammar variation`);}e.dom.window.close();
});

test('accent-sensitive choices have exactly one correct option, including when restoring feedback',()=>{
 const e=environment(97),lesson=e.lessons[1],state={};
 const start=()=>{e.mode.renderLessonTest({lesson,view:e.view,state,save:()=>{},onBack:()=>{}});e.view.querySelector('#masteryStart').click();};
 start();const session=state.lessonCheckProgress[2].session,q=e.mode.spec(2).checkTasks.find(t=>t.family==='signes');session.ex=[{...q,o:['Zoè','Zoé','Zoê']}];session.i=0;session.score=0;session.response=null;start();e.view.querySelector('[data-mastery-o="0"]').click();assert.equal(state.lessonCheckProgress[2].session.score,0);assert.equal(e.view.querySelectorAll('.option-btn.correct').length,1);assert.equal(e.view.querySelector('.option-btn.correct').textContent,'Zoé');start();assert.equal(e.view.querySelectorAll('.option-btn.correct').length,1);assert.equal(state.lessonCheckProgress[2].session.score,0);e.dom.window.close();
});
test('English display covers every new question and explanation without changing saved choices',()=>{
 const e=environment(11);e.w.A1Profile={getUiLang:()=> 'en'};for(const f of ['en.js','i18n.js'])e.w.eval(fs.readFileSync(path.join(__dirname,'..',f),'utf8'));
 for(const lesson of e.lessons){
  for(const q of e.mode.spec(lesson.id).checkTasks){const before=JSON.stringify(q);const translated=e.w.A1FrenchI18n.translate(q.q);assert.notEqual(translated,q.q,`${lesson.id}: ${q.q}`);assert.notEqual(e.w.A1FrenchI18n.translate(q.explanation),q.explanation);assert.equal(JSON.stringify(q),before);}
 }
 e.dom.window.close();
});
