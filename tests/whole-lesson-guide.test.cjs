const {test}=require('node:test'),assert=require('node:assert/strict'),{coursePage}=require('./helpers/course-guide-page.cjs');
for(const course of ['francais','francais-a2','deutsch'])test(course+': one guide contains every grammar page, pronunciation and the single listening pass in all 24 lessons',()=>{
 const e=coursePage(course),{w,view}=e;try{
  assert.deepEqual(e.errors,[]);const api=course==='deutsch'?w.DE_A1_GUIDED_AUDIO:w.FR_A1_GUIDED_AUDIO,original=api.mount;let captured;api.mount=options=>{captured=options;original(options);};
  let total=0;
  for(let id=1;id<=24;id++){
   w.renderLesson(id);assert(captured,'guide mounted in '+id);assert.equal(view.querySelectorAll('.guided-audio').length,1);assert(captured.grammarPages.length>0);
   const plan=api.plan(captured);total+=plan.length;
   for(const [i,page]of captured.grammarPages.entries())assert(plan.some(p=>p.chapterTitle?.includes((i+1)+': '+page.title)),course+' '+id+' '+page.title);
   const listened=plan.filter(p=>p.listening);assert.equal(listened.length>0,true);assert(listened.every(p=>p.round===1));
   assert(plan.some(p=>p.chapterTitle=== (course==='deutsch'?'La suite':'Dein nächster Schritt')));
   assert.equal(plan.filter(p=>p.phraseEnd).length,captured.lesson.phrases.length);
   assert(plan.every(p=>p.lang==='fr-FR'||p.lang==='de-DE'));assert(plan.every(p=>p.text.trim()&&p.pauseAfter<=650));
   const after=JSON.stringify(Object.fromEntries(Object.keys(w.localStorage).map(k=>[k,w.localStorage.getItem(k)])));api.plan(captured);assert.equal(JSON.stringify(Object.fromEntries(Object.keys(w.localStorage).map(k=>[k,w.localStorage.getItem(k)]))),after,'planning must not alter progress');
  }
  assert(total>1000);assert.deepEqual(e.errors,[]);
 }finally{e.close();}
});
