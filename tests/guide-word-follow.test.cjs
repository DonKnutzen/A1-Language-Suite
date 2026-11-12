const {test}=require('node:test'),assert=require('node:assert/strict'),{environment}=require('./helpers/lesson-guide.cjs'),{coursePage}=require('./helpers/course-guide-page.cjs');
function until(e,text){let n=0;while(e.spoken.at(-1).text!==text){e.advance();assert(++n<200);}}
test('speech boundaries mark just the current word across inline elements and restore original content',()=>{
 const e=environment('francais');try{
  const section=e.w.document.createElement('section');section.className='lesson-step-content';section.innerHTML='<p>Eine <strong>wichtige</strong> Erklärung.</p>';e.view.append(section);const paragraph=section.firstChild,strong=paragraph.querySelector('strong'),before=paragraph.innerHTML;
  e.mount();e.play();until(e,'Eine wichtige Erklärung.');const u=e.spoken.at(-1);
  u.onboundary({name:'word',charIndex:5,charLength:8});assert.equal(paragraph.querySelector('mark').textContent,'wichtige');assert.equal(paragraph.textContent,'Eine wichtige Erklärung.');assert.equal(paragraph.querySelector('strong'),strong);
  u.onboundary({name:'word',charIndex:14,charLength:9});assert.equal(paragraph.querySelectorAll('mark').length,1);assert.equal(paragraph.querySelector('mark').textContent,'Erklärung');
  e.play();assert.equal(paragraph.querySelectorAll('mark').length,0);u.onboundary({name:'word',charIndex:0});assert.equal(paragraph.querySelectorAll('mark').length,0);
  e.view.querySelector('[data-guided-stop]').click();assert.equal(paragraph.innerHTML,before);assert.equal(e.view.querySelectorAll('.guide-source-current').length,0);
 }finally{e.dom.window.close();}
});
test('repeated sentences match the spoken occurrence; stale boundaries and hidden answers are ignored',()=>{
 const e=environment('francais');try{
  const section=e.w.document.createElement('section');section.className='lesson-step-content';section.innerHTML='<p>Eine wichtige Erklärung.</p><div class="deepening-practice"><p>Eine wichtige Erklärung.</p></div>';e.view.append(section);e.mount();e.play();until(e,'Eine wichtige Erklärung.');const old=e.spoken.at(-1);old.onboundary({name:'word',charIndex:5});assert.equal(section.querySelectorAll('mark').length,1);e.advance();old.onboundary({name:'word',charIndex:0});assert.equal(section.querySelectorAll('mark').length,0);assert.equal(section.querySelector('.deepening-practice mark'),null);
 }finally{e.dom.window.close();}
});
test('current-part scope reads only the selected learning page and mounts no player in assessments',()=>{
 const e=environment('francais');try{
  const section=e.w.document.createElement('section');section.innerHTML='<p>Nur dieses Thema.</p>';e.options={...e.options,step:'grammar',root:section,title:'Dieses Thema'};e.api.mount(e.options);assert.equal(e.view.querySelector('[data-guide-scope]').value,'part');const plan=e.api.plan({...e.options,scope:'part'});assert.equal(plan.map(p=>p.text).join(' '),'Nur dieses Thema.');assert(!plan.some(p=>p.phrase!==undefined));
  for(const step of ['comprehension','check','hard','grammar-check','speak','write']){e.api.mount({...e.options,step});assert.equal(e.view.querySelector('.guided-audio'),null,step);}
 }finally{e.dom.window.close();}
});
for(const course of ['francais','francais-a2','deutsch'])test(course+': whole guide follows real grammar pages without a second transcript or grading',()=>{
 const e=coursePage(course);try{
  e.w.renderLesson(1);const w=e.w,view=e.view,api=course==='deutsch'?w.DE_A1_GUIDED_AUDIO:w.FR_A1_GUIDED_AUDIO;
  const time=require('./helpers/lesson-guide.cjs').clock(w);const before=e.state();view.querySelector('[data-guided-play]').click();let count=0;
  while(!view.querySelector('#lessonGrammarPage')){e.spoken.at(-1).onend();time.next();assert(++count<400);}
  assert.equal(view.querySelectorAll('.guided-audio').length,1);assert.equal(view.querySelector('[data-guided-play]').textContent,'Ⅱ Pause');assert.equal(view.querySelector('[data-guide-scope]').value,'lesson');
  let found=false;for(let i=0;i<30;i++){const u=e.spoken.at(-1);u.onboundary({name:'word',charIndex:0});if(view.querySelector('mark')){found=true;break;}u.onend();time.next();}assert(found,'a grammar word is marked in its original page');
  view.querySelector('[data-guided-stop]').click();assert.equal(view.querySelectorAll('mark,.guide-source-current').length,0);
  for(const [id,work]of Object.entries(e.state().lessonWork||{})){assert.equal(work.quizDone,before.lessonWork?.[id]?.quizDone);assert.equal(work.masteryBest,before.lessonWork?.[id]?.masteryBest);}
  view.querySelector('[data-lesson-step="comprehension"]').click();assert.equal(view.querySelector('.guided-audio'),null);assert.deepEqual(e.errors,[]);
 }finally{e.close();}
});
