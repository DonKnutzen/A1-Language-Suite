const{test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),{JSDOM}=require('jsdom');
for(const[folder,code,ui]of [['francais','FR','de'],['deutsch','DE','fr']]){
 function fixture(state={doneLessons:[],lessonWork:{},reviewPractice:{imported:true,items:{}}}){
  const dom=new JSDOM('<main></main>',{runScripts:'outside-only',url:'https://example.org'}),w=dom.window,view=w.document.querySelector('main');
  w.scrollTo=()=>{};w.A1Profile={getUiLang:()=>ui};w.A1Voice={cancel(){}};w.A1Learning={shuffle:a=>[...a]};w.FR_A1_MASTERY={accepted:(q,v)=>v===q.answer};w.DE_A1_ASSESSMENTS={accepted:(q,v)=>v===q.answer};w.FR_A1_DEEPENING={};w.DE_A1_STUDY={};
  w.eval(fs.readFileSync(folder+'/review-practice.js','utf8'));const api=w[code+'_A1_REVIEW'];
  const q=api.task(1,'grammar:history','Test',{q:'Tu ___ ici.',answer:code==='FR'?'es':'bist',o:code==='FR'?['es','est','êtes']:['bist','bin','ist']});
  const render=()=>api.render({view,lessons:[],state,save(){},onBack(){},speak(){},grammarHtml:()=>'',initialMode:'mistakes'});
  const choose=value=>{const el=view.querySelector('#reviewMistakeScope');el.value=value;el.dispatchEvent(new w.Event('change'));};
  return{dom,w,view,state,api,q,render,choose};
 }
 test(folder+': clearing reduces the open count, preserves repeat-error history across reloads, and a new failure reopens it',()=>{
  const e=fixture();e.api.record(e.state,e.q,false);e.api.record(e.state,e.q,false);e.api.record(e.state,e.q,true,true);assert.equal(e.api.pending(e.state).length,1);e.api.record(e.state,e.q,true,true);assert.equal(e.api.pending(e.state).length,0);
  const restored=fixture(JSON.parse(JSON.stringify(e.state)));assert.equal(restored.api.history(restored.state,'resolved').length,1);assert.equal(restored.api.statistics(restored.state).top[0].wrong,2);
  restored.render();assert(restored.view.querySelector('#reviewStart').disabled);restored.choose('resolved');assert(!restored.view.querySelector('#reviewStart').disabled);restored.view.querySelector('#reviewStart').click();
  const s=restored.state.reviewPractice.session;assert.equal(s.tasks[0].id,e.q.id);assert.equal(s.mode,'mistakes');
  restored.view.querySelector('[data-review-option="1"]').click();restored.view.querySelector('#reviewCheck').click();assert.equal(restored.api.pending(restored.state).length,1);assert.equal(restored.api.statistics(restored.state).top[0].wrong,3);
  assert(restored.view.querySelector('.review-mistake-progress').textContent.includes('1'));restored.view.querySelector('#reviewCheck').click();assert.equal(restored.api.statistics(restored.state).top[0].wrong,3);e.dom.window.close();restored.dom.window.close();
 });
 test(folder+': real correct reviews visibly clear a task, past replay stays available, and feedback rerender cannot grade twice',()=>{
  const e=fixture();e.api.record(e.state,e.q,false);e.api.record(e.state,e.q,true,true);e.render();e.view.querySelector('#reviewStart').click();e.view.querySelector('[data-review-option="0"]').click();e.view.querySelector('#reviewCheck').click();assert.equal(e.api.pending(e.state).length,0);assert(e.view.querySelector('.review-mistake-progress').textContent.includes('0'));assert.equal(e.state.reviewPractice.items[e.q.id].right,2);
  e.render();assert.equal(e.state.reviewPractice.items[e.q.id].right,2);e.view.querySelector('#reviewPause')?.click();e.choose('all');e.render();assert.equal(e.state.reviewPractice.settings.mistakeScope,'all');assert(!e.view.querySelector('#reviewStart').disabled);e.dom.window.close();
 });
 test(folder+': frequent list excludes one-off and retired tasks, ranks by recorded failures, and escapes prompts',()=>{
  const e=fixture();for(let n=1;n<=7;n++){const q=e.api.task(n,'grammar:stats','<b>Test</b>',{q:'<img src=x> '+n,answer:'ok'});for(let i=0;i<n;i++)e.api.record(e.state,q,false);if(n===7)e.state.reviewPractice.items[q.id].retired=true;}
  const stats=e.api.statistics(e.state);assert.deepEqual(Array.from(stats.top,x=>x.wrong),[6,5,4,3,2]);assert.equal(stats.total,6);e.render();assert.equal(e.view.querySelectorAll('.review-error-stats li').length,5);assert(!e.view.querySelector('.review-error-stats img'));assert(!e.view.querySelector('.review-error-stats b'));assert(!e.view.querySelector('.review-error-stats').open);e.dom.window.close();
 });
}
