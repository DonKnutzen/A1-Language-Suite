require('./b1-content-regressions.test.cjs');
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const {fixture,root}=require('./b1-fixture.cjs');
const fixtures=[];const open=s=>{const f=fixture(s);fixtures.push(f);return f;};
test.afterEach(()=>{for(const f of fixtures.splice(0)){f.close();assert.deepEqual(f.errors,[]);}});
test('24 complete B1 lessons have distinct practice, transfer, independent listening, valid answers and writing models',()=>{
 const {w}=open();assert.equal(w.EN_A1_DATA.lessons.length,24);
 for(const l of w.EN_A1_DATA.lessons){
  assert.equal(l.topics.length,2);assert.equal(l.phrases.length,6);assert(l.vocabulary.length>=20);
  const drills=new Set();for(const t of l.topics){assert(t.rule.length>300);assert.equal(t.practice.length,6);assert.equal(t.transfer.length,4);for(const q of [...t.practice,...t.transfer]){assert.equal(new Set(q.o).size,3);assert(q.o.includes(q.answer));assert(q.context);assert(q.prompt.includes('___'));}for(const q of t.practice)drills.add(q.prompt);}
  const check=w.EN_A1_MASTERY.makeLessonTest(l);assert.equal(check.length,11);assert.equal(check.filter(q=>q.type==='gap').length,8);for(const q of check)assert(!drills.has(q.prompt));
  const h=w.EN_A1_HARD_CONTENT[l.id];assert.equal(h.gaps.length,8);assert.equal(h.listening.length,2);assert.equal(h.listening.flatMap(b=>b.questions).length,8);
  assert.equal(new Set([w.A1_COMPREHENSION_CONTENT[l.id].turns.map(t=>t.text).join(' '),...h.listening.map(b=>b.text)]).size,3);
  assert(w.EN_A1_HARD_MODE.words(h.writing.model)>=100);assert.equal(h.writing.targetWords,100);
  for(const q of h.gaps)assert(w.EN_A1_HARD_MODE.matches(q.answers[0],q.answers,q));
  for(const b of h.listening)for(const q of b.questions){assert(w.EN_A1_HARD_MODE.matches(q.answers[0],q.answers,q));if(q.options)assert.equal(new Set(q.options).size,3);}
 }
 assert.equal(w.EN_A1_READING.length,24);assert.equal(w.A1_VOCABULARY_CONTENT.length,430);
});
test('all lesson steps, grammar practices, reading and listening training render',()=>{
 const {w,view}=open();
 for(const l of w.EN_A1_DATA.lessons){
  w.EN_A1_APP.renderLesson(l.id,{step:'listen'});assert.equal(view.querySelectorAll('[data-core-row]').length,6);assert(view.querySelector('.en-glossary'));
  for(let i=0;i<2;i++){w.EN_A1_APP.renderLesson(l.id,{step:'grammar',grammarIndex:i});assert(view.querySelector('.en-rule'));view.querySelector('[data-grammar-start]').click();assert.equal(view.querySelectorAll('[data-o]').length,3);assert(view.querySelector('.mixed-context'));}
  w.EN_A1_APP.renderLesson(l.id,{step:'comprehension'});assert.equal(view.querySelectorAll('.comprehension-field').length,4);
  w.EN_A1_APP.renderLesson(l.id,{step:'write'});assert(view.querySelector('#lessonWriting'));
  w.EN_A1_APP.renderLesson(l.id,{step:'speak'});assert(view.querySelector('#showSpeakingModel'));
 }
});
test('every lesson check accepts authored free answers, saves results and unlocks the correct hard mode',()=>{
 const {w,view}=open(),s=w.EN_A1_APP.state;
 for(const l of w.EN_A1_DATA.lessons){
  assert(!w.EN_A1_HARD_MODE.unlocked(s,l.id));
  w.EN_A1_MASTERY.renderLessonTest({lesson:l,view,state:s,save:w.EN_A1_APP.save,onBack:()=>{},speak:()=>{}});view.querySelector('#masteryStart').click();
  while(s.lessonCheckProgress[l.id].session){const session=s.lessonCheckProgress[l.id].session,q=session.ex[session.i];
   if(q.type==='choice')view.querySelector(`[data-mastery-o="${q.o.indexOf(q.answer)}"]`).click();
   else{const input=view.querySelector('#masteryInput');input.value=q.answer;input.dispatchEvent(new w.Event('input'));view.querySelector('#masteryCheck').click();}
   view.querySelector('#masteryNext').click();
  }
  assert.equal(s.lessonMasteryBest[l.id],100);assert(w.EN_A1_HARD_MODE.unlocked(s,l.id));
 }
 assert.equal(s.doneLessons.length,24);assert(w.A1CourseProgressPercent()===100);
});
test('all hard modes submit, preserve history and grade each section without rounding',()=>{
 const {w,view}=open(),s=w.EN_A1_APP.state,click=sel=>{assert(view.querySelector(sel),sel);view.querySelector(sel).click();},input=(sel,val)=>{const e=view.querySelector(sel);e.value=val;e.dispatchEvent(new w.Event('input',{bubbles:true}));};
 for(const l of w.EN_A1_DATA.lessons){
  s.lessonMasteryBest[l.id]=80;const h=w.EN_A1_HARD_CONTENT[l.id];
  w.EN_A1_HARD_MODE.render({lesson:l,view,state:s,save:w.EN_A1_APP.save,onBack:()=>{}});click('#hardBegin');assert(!view.querySelector('.hard-transcript'));
  h.gaps.forEach((g,i)=>input(`[data-hard-gap="${i}"]`,g.answers[0]));click('[data-hard-page="1"]');
  h.listening.flatMap(b=>b.questions).forEach((q,i)=>{if(q.options)[...view.querySelectorAll(`[data-hard-listen="${i}"]`)].find(e=>e.value===q.answers[0]).click();else input(`[data-hard-listen="${i}"]`,q.answers[0]);});
  click('[data-hard-page="2"]');input('#hardWriting',h.writing.model);click('#hardSubmit');click('#hardConfirmSubmit');assert(view.querySelector('#hardWriting').readOnly);
  view.querySelectorAll('[data-hard-rating]').forEach(e=>{e.value='2';e.dispatchEvent(new w.Event('change'));});click('#hardComplete');
  const p=s.lessonWork[l.id].hardMode;assert.equal(p.attempt.result.correct,16);assert(p.attempt.result.passed);assert(w.EN_A1_HARD_MODE.goldResult(p.attempt));
  const a=JSON.parse(JSON.stringify(p.attempt));a.gaps[0]='wrong';a.gaps[1]='wrong';assert(!w.EN_A1_HARD_MODE.passed(h,a),'75% in cloze must fail despite high total');
  click('#hardRetry');click('#hardNew');assert.equal(p.history.length,1);
 }
});
test('A1 progress is not loaded as B1; B1 drafts resume with identical questions and answers',()=>{
 const old={'englischA1State_v1::profile:test':JSON.stringify({doneLessons:[1,2],lessonMasteryBest:{1:100}})},f=open(old),{w,view}=f;
 assert.equal(w.EN_A1_APP.state.doneLessons.length,0);w.EN_A1_APP.renderExam();view.querySelector('#b1ExamFormats').click();view.querySelector('[data-pack="r1"]').click();
 const radio=view.querySelector('[data-answer="0"]');radio.checked=true;radio.dispatchEvent(new w.Event('input'));
 const before=JSON.stringify(w.EN_A1_APP.state.b1Formats.attempts.r1);const f2=open(f.snapshot());f2.w.EN_A1_APP.renderExam();f2.view.querySelector('#b1ExamFormats').click();f2.view.querySelector('[data-pack="r1"]').click();
 assert.equal(JSON.stringify(f2.w.EN_A1_APP.state.b1Formats.attempts.r1),before);assert(f.saved.every(x=>x[0]==='englisch-b1'));assert.equal(f2.w.localStorage.getItem('englischA1State_v1::profile:test'),old['englischA1State_v1::profile:test']);
});
test('six reading parts and four listening parts grade complete attempts and lock submitted answers',()=>{
 const {w,view}=open();assert.deepEqual([...w.EN_B1_EXAM.packs.slice(0,6)].map(p=>p.questions.length),[5,5,5,5,6,6]);assert.equal(w.EN_B1_EXAM.packs.slice(6).reduce((n,p)=>n+p.questions.length,0),25);
 for(const p of w.EN_B1_EXAM.packs){
  w.EN_A1_APP.renderExam();view.querySelector('#b1ExamFormats').click();view.querySelector(`[data-pack="${p.id}"]`).click();const a=w.EN_A1_APP.state.b1Formats.attempts[p.id];
  assert(!view.textContent.includes('Lösung:'));a.questions.forEach((q,i)=>{const inputs=[...view.querySelectorAll(`[data-answer="${i}"]`)];const e=q.options?inputs.find(e=>q.options[Number(e.value)]===q.answer):inputs[0];if(q.options)e.checked=true;else e.value=q.answer;e.dispatchEvent(new w.Event('input'));});
  view.querySelector('#packSubmit').click();view.querySelector('#packConfirmSubmit').click();assert.equal(a.result.percent,100);assert([...view.querySelectorAll('[data-answer]')].every(e=>e.disabled||e.readOnly));
  view.querySelector('#packNew').click();assert.equal(w.EN_A1_APP.state.b1Formats.attempts[p.id].history.length,1);
 }
});
test('all arcade games use only English B1 lesson pools and expose four playable modes',()=>{
 const {w,view}=open();for(const l of w.EN_A1_DATA.lessons){const content=w.EN_B1_ARCADE_ENGINE.lessonContent('en',l.id);assert.equal(content.voice,'en-GB');assert(content.PHRASES.length>=15);for(const p of content.PHRASES)assert(l.vocabulary.some(v=>v[0]===p[0]));for(let i=0;i<10;i++){const r=content.formRound();assert(l.topics.some(t=>t.rows.some(row=>row[0].replace('___',row[1]).replace(/ \([^)]*\)$/u,'')===r.sentence)));}assert.equal(w.EN_B1_ARCADE_ENGINE.lessonGames('en',l.id).length,4);}
 w.EN_A1_APP.state.lessonMasteryBest[1]=80;w.EN_A1_APP.renderLesson(1,{step:'check'});assert(view.querySelector('.b1-arcade-entry'));view.querySelector('.b1-arcade-entry').click();assert.equal(view.querySelectorAll('[data-b1-game]').length,4);
});
test('writing stays self-assessed, draft edits persist and recording unavailability is handled',()=>{
 const {w,view}=open();w.EN_A1_APP.renderExam();view.querySelector('#b1ExamFormats').click();view.querySelector('[data-writing="email"]').click();assert(!view.querySelector('details'));const box=view.querySelector('#b1Draft');box.value='My own message.';box.dispatchEvent(new w.Event('input'));view.querySelector('#writingSubmit').click();assert(view.querySelector('details'));assert(view.querySelector('#b1Draft').readOnly);view.querySelector('#writingRevise').click();assert.equal(view.querySelector('#b1Draft').value,'My own message.');assert.equal(w.EN_A1_APP.state.b1Formats.writing.email.history.length,1);
 view.querySelector('#writeBack').click();view.querySelector('#formatSpeaking').click();view.querySelector('#startRecB1Format').click();assert(view.querySelector('#recStatusB1Format').textContent.length>0);
});
test('free answer equivalents preserve meaning and arcade templates retain their context',()=>{
 const {w}=open(),find=(id,part)=>w.EN_A1_MASTERY_SPECS[id].checkTasks.find(q=>q.prompt?.includes(part));
 for(const [id,part,answer]of [[5,'borrow my pen','may'],[11,'if it ___ quieter','was'],[15,"unwell since yesterday",'been'],[16,'museum is open today','if'],[19,'neighbours often help','one another'],[21,'time for the start','on']])assert(w.EN_A1_MASTERY.accepted(find(id,part),answer),part);
 assert(!w.EN_A1_MASTERY.accepted(find(19,'neighbours often help'),'themselves'));
 for(const l of w.EN_A1_DATA.lessons){
  const generated=w.A1_QUIZ_SHOW.generate('en',l.id);assert.equal(generated.length,20);
  for(const q of generated){assert(q.context);assert.equal(new Set(q.o).size,3);assert(!q.h[0].startsWith(q.q[0].replace('___',q.o[0])));}
  const c=w.EN_B1_ARCADE_ENGINE.lessonContent('en',l.id);assert(c.formRound().context);
  for(const set of c.SORTS)for(const card of set.cards)assert(card[3]);
 }
});
test('format attempts retain the source text and audio when current content changes',()=>{
 const {w,view}=open();w.EN_A1_APP.renderExam();view.querySelector('#b1ExamFormats').click();view.querySelector('[data-pack="r3"]').click();
 const a=w.EN_A1_APP.state.b1Formats.attempts.r3,pack=w.EN_B1_EXAM.packs.find(p=>p.id==='r3'),original=a.text;
 pack.text='New text for new attempts.';view.querySelector('#packBack').click();view.querySelector('[data-pack="r3"]').click();
 assert.equal(view.querySelector('.b1-reading').textContent,original);assert.equal(a.audio.length,0);
 a.questions.forEach((q,i)=>a.answers[i]=q.answer);view.querySelector('#packSubmit').click();view.querySelector('#packConfirmSubmit').click();view.querySelector('#packNew').click();assert.equal(view.querySelector('.b1-reading').textContent,'New text for new attempts.');
});
test('entry assets exist, new offline cache is complete and B1 cloud mapping is separate',()=>{
 const html=fs.readFileSync(path.join(root,'englisch/index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'englisch/service-worker.js'),'utf8');
 for(const [,asset]of html.matchAll(/(?:src|href)="([^"#]+\.(?:css|js)(?:\?[^"]*)?)"/g)){assert(fs.existsSync(path.resolve(root,'englisch',asset.split('?')[0])),asset);assert(sw.includes(asset),asset+' not cached');}
 assert(sw.includes('images/speaking-garden.png'));assert(sw.includes("const PREFIX='englisch-'"));const profile=fs.readFileSync(path.join(root,'shared/profile.js'),'utf8');assert(profile.includes("course === 'englisch-b1') return 'en-b1'"));
});
test('listening shuffles fresh choices and keeps their order across reloads',()=>{
 const f=open(),{w,view}=f;w.A1Learning.shuffle=xs=>[...xs].reverse();
 w.EN_A1_APP.renderLesson(7,{step:'comprehension'});
 const p=w.EN_A1_APP.state.lessonWork[7].comprehension;
 assert.equal(p.contentSnapshot.version,2);
 assert(p.contentSnapshot.fields.every(q=>q.options[2]===q.answer));
 assert(view.textContent.includes('What might happen after lunch?'));
 const snapshot=JSON.stringify(p.contentSnapshot),reloaded=open(f.snapshot());
 reloaded.w.EN_A1_APP.renderLesson(7,{step:'comprehension'});
 assert.equal(JSON.stringify(reloaded.w.EN_A1_APP.state.lessonWork[7].comprehension.contentSnapshot),snapshot);
});
test('legacy listening selections and scores survive distractor changes; retry uses the new tasks',()=>{
 const {w,view}=open(),s=w.EN_A1_APP.state,legacy=w.A1_COMPREHENSION_CONTENT[7].legacyContent;
 s.lessonWork[7]={comprehension:{answers:legacy.fields.map((f,i)=>i===1?f.options[1]:f.answer),graded:true,score:3,best:4,done:true}};
 w.EN_A1_APP.renderLesson(7,{step:'comprehension'});
 const p=s.lessonWork[7].comprehension;
 assert.equal(p.contentSnapshot.version,1);assert.equal(p.answers[1],"The river's location");
 assert.equal(p.score,3);assert(p.graded);assert(p.done);assert(view.textContent.includes('What is uncertain?'));
 view.querySelector('#dialogueRetry').click();
 assert.equal(p.contentSnapshot.version,2);assert.equal(p.history.length,1);assert.equal(p.history[0].answers[1],"The river's location");
 assert.equal(p.best,4);assert(p.done);assert(!p.graded);assert(view.textContent.includes('What might happen after lunch?'));
});
test('English balloon spelling uses reviewed errors rather than valid inflections or French endings',()=>{
 const {w}=open(),spell=w.EN_B1_ARCADE_ENGINE.content.misspell;
 assert.deepEqual([...spell('challenge','en')],[]);
 assert.deepEqual([...spell('career','en')],[]);
 assert.deepEqual([...spell('experience','en')],['experiance']);
 assert.deepEqual([...spell('accommodation','en')],['accomodation']);
 assert.deepEqual([...spell('be interested in','en')],['be intrested in']);
 const all=new Set(w.A1_VOCABULARY_CONTENT.map(v=>v.en.toLowerCase()));
 for(const word of all)for(const wrong of spell(word,'en'))assert(!all.has(wrong.toLowerCase()),wrong);
});
