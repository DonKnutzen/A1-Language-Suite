const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{JSDOM}=require('jsdom');
for(const [folder,prefix,lang] of [['francais','FR','de'],['deutsch','DE','fr']]){
 function environment(){
  const dom=new JSDOM('<main id="view"></main>',{runScripts:'outside-only'}),w=dom.window;let language=lang;
  w.A1Profile={getUiLang:()=>language};w.scrollTo=()=>{};w.A1Voice={cancel(){}};
  for(const f of ['hard-mode-content.js','hard-mode.js'])w.eval(fs.readFileSync(`${folder}/${f}`,'utf8'));
  return {dom,w,api:w[prefix+'_A1_HARD_MODE'],data:w[prefix+'_A1_HARD_CONTENT'][1],language(value){language=value;w.dispatchEvent(new w.Event('a1suite:languagechange'));}};
 }
 const attempt=(correct=17,total=20,passed=true)=>({phase:'reviewed',completedAt:123,result:{correct,total,passed,pct:Math.round(correct/total*100)}});
 test(folder+': two award tiers require completion, a pass and exact raw thresholds',()=>{
  const e=environment(),gold=e.api.achievedResult;
  assert(gold(attempt()));assert(!e.api.goldResult(attempt()));assert(e.api.goldResult(attempt(19)));assert(e.api.goldResult(attempt(20)));assert(e.api.goldResult(attempt(1999,2000)));assert(!e.api.goldResult(attempt(1899,2000)));assert(!e.api.goldResult(attempt(19,20,false)));assert(gold(attempt(20)));assert(!gold(attempt(16)));assert(!gold(attempt(1699,2000)));assert(!gold(attempt(20,20,false)));
  for(const patch of [{phase:'submitted'},{completedAt:null},{result:{correct:18,total:0,passed:true}},{result:{correct:21,total:20,passed:true}},{result:{correct:17,total:20,passed:'true'}}])assert(!gold({...attempt(),...patch}));
  e.dom.window.close();
 });
 test(folder+': no combining best score with another passed attempt; archive, reload and reset remain correct',()=>{
  const e=environment(),p={attempt:attempt(16),history:[attempt(20,20,false)],bestObjective:100,passedAt:123},state={lessonWork:{1:{hardMode:p}}};
  assert.equal(e.api.achievement(state,1),null);p.history.push(attempt());assert(e.api.achievement(state,1));p.history.push(attempt(19));assert(e.api.goldResult(e.api.achievement(state,1)));
  p.attempt={phase:'running'};assert(e.api.achievement(JSON.parse(JSON.stringify(state)),1));assert.equal(e.api.achievement(state,2),null);assert.equal(e.api.achievement({lessonWork:{}},1),null);e.dom.window.close();
 });
 test(folder+': a passed result from 85% to below 95% gets the first tier, not Gold',()=>{
  const e=environment(),d=e.data,w=e.w,view=w.document.querySelector('main'),state={lessonMasteryBest:{1:80},lessonWork:{}};
  const render=()=>e.api.render({lesson:{id:1,title:'Test'},view,state,save(){},onBack(){}});
  render();view.querySelector('#hardBegin').click();const a=state.lessonWork[1].hardMode.attempt;
  Object.assign(a,{phase:'submitted',page:2,gaps:d.gaps.map(q=>q.answers[0]),listening:d.listening.flatMap(b=>b.questions).map(q=>q.answers[0]),text:d.writing.model,ratings:[2,2,2,2]});
  a.gaps[0]='wrong';a.listening[0]='wrong';render();view.querySelector('#hardComplete').click();assert(a.result.passed);assert(a.result.pct>=85&&a.result.pct<95);
  assert(view.querySelector('.hard-result.is-hard-achieved'));assert(view.querySelector(folder==='francais'?'.is-hard-tricolour':'.is-hard-green'));assert(!view.querySelector('.is-hard-gold'));e.dom.window.close();
 });
 test(folder+': actual grading, result screen, retry, failed result and language labels',()=>{
  const e=environment(),d=e.data,w=e.w,view=w.document.querySelector('main'),state={lessonMasteryBest:{1:80},lessonWork:{}};
  const render=()=>e.api.render({lesson:{id:1,title:'Test'},view,state,save(){},onBack(){}});
  render();view.querySelector('#hardBegin').click();let a=state.lessonWork[1].hardMode.attempt;
  Object.assign(a,{phase:'submitted',page:2,gaps:d.gaps.map(q=>q.answers[0]),listening:d.listening.flatMap(b=>b.questions).map(q=>q.answers[0]),text:d.writing.model,ratings:[2,2,2,2]});
  render();view.querySelector('#hardComplete').click();assert(a.result.passed);assert(view.querySelector('.hard-result.is-hard-gold'));assert(e.api.achievement(state,1));assert(view.textContent.includes('self-assessed')||view.textContent.includes('selbst')||view.textContent.includes('auto-évaluation'));
  e.language('en');const badge=view.querySelector('[data-hard-achievement-badge]');assert(badge.title.includes('writing self-assessed'));assert(badge.title.includes('at least 95%'));assert(badge.textContent.includes('95–100 %'));assert(!badge.textContent.includes('Gold · 100 %'));
  view.querySelector('#hardRetry').click();view.querySelector('#hardNew').click();assert(e.api.achievement(state,1));assert(!view.querySelector('.hard-result'));
  a=state.lessonWork[1].hardMode.attempt;Object.assign(a,{phase:'submitted',page:2,gaps:d.gaps.map(q=>q.answers[0]),listening:d.listening.flatMap(b=>b.questions).map(q=>q.answers[0]),text:d.writing.model,ratings:[0,0,0,0]});
  render();view.querySelector('#hardComplete').click();assert.equal(a.result.passed,false);assert(!view.querySelector('.hard-result.is-hard-gold'));assert(e.api.achievement(state,1));e.dom.window.close();
 });
 test(folder+': every lesson grades a near-perfect result with the 95% Gold threshold',()=>{
  const e=environment(),w=e.w,view=w.document.querySelector('main');let newGold=0,belowGold=0;
  for(const[id,d]of Object.entries(w[prefix+'_A1_HARD_CONTENT'])){
   const state={lessonMasteryBest:{[id]:80},lessonWork:{}},render=()=>e.api.render({lesson:{id:Number(id),title:'Test'},view,state,save(){},onBack(){}});
   render();view.querySelector('#hardBegin').click();const a=state.lessonWork[id].hardMode.attempt;
   Object.assign(a,{phase:'submitted',page:2,gaps:d.gaps.map(q=>q.answers[0]),listening:d.listening.flatMap(b=>b.questions).map(q=>q.answers[0]),text:d.writing.model,ratings:[2,2,2,2]});
   a.gaps[0]='wrong';render();view.querySelector('#hardComplete').click();assert(a.result.passed,`L${id}`);
   const expected=a.result.correct*100>=a.result.total*95;
   assert.equal(!!view.querySelector('.hard-result.is-hard-gold'),expected,`L${id}: result`);
   const snapshot=JSON.stringify(state),reloaded=JSON.parse(snapshot),earned=e.api.achievement(reloaded,id);
   assert.equal(e.api.goldResult(earned),expected,`L${id}: saved lesson award`);
   assert.equal(e.api.achievementClass(earned).includes('is-hard-gold'),expected);
   assert.equal(e.api.achievementBadge(earned).includes('Gold · 95–100 %'),expected);
   assert.equal(JSON.stringify(reloaded),snapshot,'award display does not rewrite a saved result');
   expected?newGold++:belowGold++;
  }
  assert(newGold>0&&belowGold>0);e.dom.window.close();
 });
 test(folder+': earlier 95% achievements apply to all lesson cards after reload',()=>{
  const e=environment(),state={lessonWork:{}};
  for(let id=1;id<=24;id++)state.lessonWork[id]={hardMode:{attempt:{phase:'running'},history:[attempt(19)],bestObjective:95}};
  const reloaded=JSON.parse(JSON.stringify(state)),snapshot=JSON.stringify(reloaded);
  for(let id=1;id<=24;id++){const earned=e.api.achievement(reloaded,id);assert(e.api.goldResult(earned));assert(e.api.achievementClass(earned).includes('is-hard-gold'));assert(e.api.achievementBadge(earned).includes('Gold · 95–100 %'));}
  assert.equal(JSON.stringify(reloaded),snapshot);e.dom.window.close();
 });

}
