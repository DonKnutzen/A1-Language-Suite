const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{JSDOM}=require('jsdom');
for(const [folder,prefix,lang] of [['francais','FR','de'],['deutsch','DE','fr']]){
 function environment(){
  const dom=new JSDOM('<main id="view"></main>',{runScripts:'outside-only'}),w=dom.window;let language=lang;
  w.A1Profile={getUiLang:()=>language};w.scrollTo=()=>{};w.A1Voice={cancel(){}};
  for(const f of ['hard-mode-content.js','hard-mode.js'])w.eval(fs.readFileSync(`${folder}/${f}`,'utf8'));
  return {dom,w,api:w[prefix+'_A1_HARD_MODE'],data:w[prefix+'_A1_HARD_CONTENT'][1],language(value){language=value;w.dispatchEvent(new w.Event('a1suite:languagechange'));}};
 }
 const attempt=(correct=17,total=20,passed=true)=>({phase:'reviewed',completedAt:123,result:{correct,total,passed,pct:Math.round(correct/total*100)}});
 test(folder+': grades D to A+ require completion, a pass and exact raw thresholds',()=>{
  const e=environment(),gold=e.api.achievedResult;
  assert(gold(attempt()));assert(!e.api.goldResult(attempt()));assert(e.api.goldResult(attempt(20)));assert(e.api.goldResult(attempt(18)));assert(e.api.goldResult(attempt(1800,2000)));assert(!e.api.goldResult(attempt(1799,2000)));assert(gold(attempt(20)));assert(gold(attempt(10)));assert(!gold(attempt(9)));assert(!gold(attempt(999,2000)));assert(!gold(attempt(20,20,false)));assert.deepEqual([18,17,16,15,14,13,12,11,10,9].map(n=>e.api.grade(attempt(n))),['A+','A','A','B','B','C','C','D','D',null]);
  for(const patch of [{phase:'submitted'},{completedAt:null},{result:{correct:18,total:0,passed:true}},{result:{correct:21,total:20,passed:true}},{result:{correct:17,total:20,passed:'true'}}])assert(!gold({...attempt(),...patch}));
  e.dom.window.close();
 });
 test(folder+': no combining best score with another passed attempt; archive, reload and reset remain correct',()=>{
  const e=environment(),p={attempt:attempt(9),history:[attempt(20,20,false)],bestObjective:100,passedAt:123},state={lessonWork:{1:{hardMode:p}}};
  assert.equal(e.api.achievement(state,1),null);p.history.push(attempt());assert(e.api.achievement(state,1));p.history.push(attempt(20));assert(e.api.goldResult(e.api.achievement(state,1)));
  p.attempt={phase:'running'};assert(e.api.achievement(JSON.parse(JSON.stringify(state)),1));assert.equal(e.api.achievement(state,2),null);assert.equal(e.api.achievement({lessonWork:{}},1),null);e.dom.window.close();
 });
 test(folder+': a passed result between 80 and 90 % gets grade A on the course flag, not Gold',()=>{
  const e=environment(),d=e.data,w=e.w,view=w.document.querySelector('main'),state={lessonMasteryBest:{1:80},lessonWork:{}};
  const render=()=>e.api.render({lesson:{id:1,title:'Test'},view,state,save(){},onBack(){}});
  render();view.querySelector('#hardBegin').click();const a=state.lessonWork[1].hardMode.attempt;
  Object.assign(a,{phase:'submitted',page:2,gaps:d.gaps.map(q=>q.answers[0]),listening:d.listening.flatMap(b=>b.questions).map(q=>q.answers[0]),text:d.writing.model,ratings:[2,2,2,2]});
  const total=a.gaps.length+a.listening.length;for(let i=0,k=Math.floor(total/10)+1;i<k;i++){if(i%2)a.listening[i>>1]='wrong';else a.gaps[i>>1]='wrong';}render();view.querySelector('#hardComplete').click();assert(a.result.passed);assert(a.result.pct>=80&&a.result.pct<90,String(a.result.pct));assert.equal(view.querySelector('.hard-grade').textContent,'A');
  assert(view.querySelector('.hard-result.is-hard-achieved'));assert(view.querySelector(folder==='francais'?'.is-hard-tricolour':'.is-hard-flag-de'));assert(!view.querySelector('.is-hard-gold'));e.dom.window.close();
 });
 test(folder+': actual grading, result screen, retry, failed result and language labels',()=>{
  const e=environment(),d=e.data,w=e.w,view=w.document.querySelector('main'),state={lessonMasteryBest:{1:80},lessonWork:{}};
  const render=()=>e.api.render({lesson:{id:1,title:'Test'},view,state,save(){},onBack(){}});
  render();view.querySelector('#hardBegin').click();let a=state.lessonWork[1].hardMode.attempt;
  Object.assign(a,{phase:'submitted',page:2,gaps:d.gaps.map(q=>q.answers[0]),listening:d.listening.flatMap(b=>b.questions).map(q=>q.answers[0]),text:d.writing.model,ratings:[2,2,2,2]});
  render();view.querySelector('#hardComplete').click();assert(a.result.passed);assert(view.querySelector('.hard-result.is-hard-gold'));assert(e.api.achievement(state,1));assert(view.textContent.includes('self-assessed')||view.textContent.includes('selbst')||view.textContent.includes('auto-évaluation'));
  e.language('en');assert(view.querySelector('[data-hard-achievement-badge]').title.includes('Gold · 90% or more'));assert.equal(view.querySelector('.hard-grade').textContent,'A+');
  view.querySelector('#hardRetry').click();view.querySelector('#hardNew').click();assert(e.api.achievement(state,1));assert(!view.querySelector('.hard-result'));
  a=state.lessonWork[1].hardMode.attempt;Object.assign(a,{phase:'submitted',page:2,gaps:d.gaps.map(q=>q.answers[0]),listening:d.listening.flatMap(b=>b.questions).map(q=>q.answers[0]),text:d.writing.model,ratings:[0,0,0,0]});
  render();view.querySelector('#hardComplete').click();assert.equal(a.result.passed,false);assert(!view.querySelector('.hard-result.is-hard-gold'));assert(e.api.achievement(state,1));e.dom.window.close();
 });
}
