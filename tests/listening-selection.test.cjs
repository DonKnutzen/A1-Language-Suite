const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {fixture}=require('./helpers/a1-fixture.cjs');
const read=p=>fs.readFileSync(p,'utf8');
for(const course of ['francais','deutsch']){
 const prefix=course==='francais'?'FR':'DE';
 function setup(){const e=fixture(course);for(const p of [course+'/hard-mode-content.js',course+'/hard-mode.js'])e.w.eval(read(p));return {...e,mode:e.w[prefix+'_A1_HARD_MODE'],data:e.w[prefix+'_A1_HARD_CONTENT'],versions:e.w[prefix+'_A1_HARD_VERSIONS']};}
 test(course+': all 24 listening sections keep every fact and require only selections, including spelled names',()=>{
  const e=setup();let questions=0;
  for(const lesson of e.lessons){
   const d=e.data[lesson.id],old=e.versions[course==='francais'?4:[7,8,13,18,21].includes(lesson.id)?3:2][lesson.id];
   assert.equal(d.taskCount,old.taskCount);assert.equal(d.gaps.length,old.gaps.length);assert.equal(JSON.stringify(d.writing),JSON.stringify(old.writing));
   d.listening.forEach((b,i)=>{assert.equal(b.text,old.listening[i].text);assert.equal(b.questions.length,old.listening[i].questions.length);for(const q of b.questions){assert.equal(new Set(q.options).size,3);assert.equal(q.options.filter(o=>e.mode.matches(o,q.answers,q)).length,1,q.q);assert(!/Écris|Réponds|Saisis|Choisis la bonne réponse\./.test(q.q),q.q);}});
   e.state.lessonMasteryBest[lesson.id]=80;
   const render=()=>e.mode.render({lesson,view:e.view,state:e.state,save(){},onBack(){}});
   render();e.view.querySelector('#hardBegin').click();e.view.querySelector('[data-hard-page="1"]').click();
   const qs=d.listening.flatMap(b=>b.questions);questions+=qs.length;
   assert.equal(e.view.querySelectorAll('input:not([type=radio]),textarea,select,[data-hard-char]').length,0);
   assert.equal(e.view.querySelectorAll('.hard-question').length,qs.length);assert.equal(e.view.querySelectorAll('input[type=radio]').length,qs.length*3);
   const radio=[...e.view.querySelectorAll('[data-hard-listen="0"]')].find(el=>el.value===qs[0].options[1]);radio.click();radio.focus();
   e.w.A1Profile.getUiLang=()=> 'en';e.w.dispatchEvent(new e.w.Event('a1suite:languagechange'));
   assert.equal(e.w.document.activeElement.value,radio.value);render();assert.equal(e.view.querySelector('[data-hard-listen="0"]:checked').value,radio.value);
   e.w.A1Profile.getUiLang=()=>course==='francais'?'de':'fr';
  }
  assert(questions>=144);e.dom.window.close();
 });
 test(course+': unfinished typed answers migrate to actual choices while sealed results and history stay intact',()=>{
  const e=setup(),lesson=e.lessons[0],old=e.versions[course==='francais'?4:2][1];
  const draft={version:old.version,phase:'running',page:1,gaps:old.gaps.map(q=>q.answers[0]),listening:old.listening.flatMap(b=>b.questions).map((q,i)=>i===1?'unmapped draft':q.answers[0]),plays:[3,3],text:'Mon brouillon / mein Entwurf',ratings:[null,null,null,null]};
  const original=JSON.stringify(draft),p={attempt:draft,passedAt:123,passedVersion:old.version,bestObjective:100};e.state.lessonWork[1]={hardMode:p};e.state.lessonMasteryBest[1]=80;
  const render=()=>e.mode.render({lesson,view:e.view,state:e.state,save(){},onBack(){}});
  render();assert.equal(p.attempt.version,e.data[1].version);assert.equal(JSON.stringify(p.history[0]),original);assert.equal(p.attempt.text,draft.text);assert.equal(p.attempt.gaps[0],draft.gaps[0]);assert.equal(p.bestObjective,100);assert.equal(p.passedAt,123);
  assert.equal(e.view.querySelector('[data-hard-listen="0"]:checked').value,draft.listening[0]);assert(!e.view.querySelector('[data-hard-listen="1"]:checked'));assert(!e.view.querySelector('input[type=text]'));
  assert(e.mode.entryHtml(lesson,e.state).includes('is-unlocked'));assert(!e.mode.entryHtml(lesson,e.state).includes('is-locked'));
  p.attempt=JSON.parse(original);p.attempt.phase='submitted';const sealed=JSON.stringify(p.attempt);render();assert.equal(JSON.stringify(p.attempt),sealed);assert(e.view.querySelector('.hard-transcript'));e.dom.window.close();
 });
 test(course+': only a passed lesson check gets a green repeat button; the percent badge is a single unit',()=>{
  const e=setup(),lesson=e.lessons[3];
  for(const [best,last]of [[0,0],[69,69],[79,79],[80,80],[81,81],[95,70]]){
   e.state.lessonMasteryBest[lesson.id]=best;e.state.lessonMasteryLast={[lesson.id]:last};e.render(lesson);e.view.querySelector('[data-lesson-step="check"]').click();
   const button=e.view.querySelector('#startMasteryOverview');assert.equal(button.classList.contains('is-completed'),best>=80);assert.equal(button.classList.contains('is-retry'),best<80);assert(!button.disabled);
   if(best<80)assert(button.querySelector('small').textContent.includes('80 %'));
   let api=e.w.DE_A1_ASSESSMENTS;if(course==='francais'){e.w.eval(read('francais/mastery.js'));api=e.w.FR_A1_MASTERY;}
   e.view.innerHTML=api.introHtml(lesson,e.state);const badge=e.view.querySelector('.lesson-check-score');assert.equal(badge.textContent,best+' %');assert.equal(badge.classList.contains('green'),best>=80);
   api.renderLessonTest({lesson,view:e.view,state:e.state,save(){},onBack(){},speak(){}});assert.equal(e.view.querySelector('#masteryStart').classList.contains('is-completed'),best>=80);
  }
  for(const score of [79,80]){e.state.lessonMasteryBest[lesson.id]=score;e.view.innerHTML=e.mode.entryHtml(lesson,e.state);assert(e.view.querySelector('.hard-entry-optional').textContent.includes(course==='francais'?'Lektionsabschluss':'terminer la leçon'));}
  e.dom.window.close();
 });
}

test('linked spelling questions do not disclose the punctuation or surname through all answer options',()=>{
 const f=fixture('francais'),d=fixture('deutsch');
 f.w.eval(read('francais/hard-mode-content.js'));d.w.eval(read('deutsch/hard-mode-content.js'));
 const email=f.w.FR_A1_HARD_CONTENT[17].listening[1].questions[1];
 assert(!email.options.every(o=>o.includes('martin')));assert.equal(email.options.filter(o=>o.includes('martin')).length,2);
 const name=d.w.DE_A1_HARD_CONTENT[2].listening[1].questions[0];assert(name.options.every(o=>!o.includes('-')));
 f.dom.window.close();d.dom.window.close();
});
