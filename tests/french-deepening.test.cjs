function openExtra(view,key){view.querySelector('[data-lesson-step="check"]').click();view.querySelector(`[data-lesson-step="${key}"]`).click();}
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM}=require('jsdom');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
function appEnvironment(){
  const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/francais/',runScripts:'outside-only'}),w=dom.window;
  w.scrollTo=()=>{};w.ResizeObserver=class{observe(){}disconnect(){}};
  for(const file of ['francais/data.js','shared/pronunciation.js','francais/mastery-specs.js','shared/grammar-ui.js','shared/lesson-topic-info.js','francais/lesson1-practice.js','francais/deepening-content.js','francais/deepening.js','francais/comprehension-content.js','shared/comprehension.js','francais/lesson-flow.js'])w.eval(read(file));
  const app=read('francais/app.js');
  w.esc=s=>{const span=w.document.createElement('span');span.textContent=s;return span.innerHTML;};
  w.eval(app.slice(app.indexOf('const GRAMMAR_GUIDES='),app.indexOf('function renderGrammarIntro('))+'window.grammarHtml=lessonGrammarHtml;');
  w.eval(app.slice(app.indexOf('const LESSON_APPLICATIONS='),app.indexOf('function renderLesson('))+'window.models=LESSON_APPLICATIONS;');
  const view=w.document.getElementById('view');
  return {dom,w,view};
}
const lesson=(w,id)=>w.FR_A1_DATA.lessons.find(l=>l.id===id);
function render(w,view,id,state,audio=[],saves=[],flowOptions={}){
  const l=lesson(w,id),app=w.models[id];
  w.A1LessonFlow.render({lesson:l,content:l,view,state,targetLang:'fr',uiLang:'de',lessonCount:24,grammarHtml:w.FR_A1_DEEPENING.enrich(l,w.grammarHtml(l)),pronunciationHtml:w.A1Pronunciation.render(l,'fr','de'),model:app.speakModel,writingModel:app.writeModel,save:x=>saves.push(x),speak:(t,force)=>audio.push({text:t,force}),speakBtn:t=>`<button data-speak="${encodeURIComponent(t)}">🔊</button>`,wireSpeakButtons:()=>{},renderMastery:()=>{},recorderHtml:()=>'',renderLearn:()=>{},renderLesson:()=>{},...flowOptions});
}
test('all 23 later lessons teach and directly rehearse every existing final-check pattern',()=>{
  const {dom,w}=appEnvironment();
  for(let id=2;id<=24;id++){
    const l=lesson(w,id),original=w.grammarHtml(l),html=w.FR_A1_DEEPENING.enrich(l,original),pools=w.FR_A1_DEEPENING.pools(l,html);
    assert(pools.length>=2,`lesson ${id}: preparation topics`);
    assert.equal(new Set(pools.map(p=>p.key)).size,pools.length);
    const before=w.document.createElement('div'),after=w.document.createElement('div');before.innerHTML=original;after.innerHTML=html;
    for(const table of before.querySelectorAll('table'))assert([...after.querySelectorAll('table')].some(t=>t.textContent===table.textContent),`lesson ${id}: existing reference preserved`);
    for(const pool of pools){
      assert(pool.tasks.length>=3,`lesson ${id} ${pool.key}: short practice pool`);
      for(const q of pool.tasks){assert(q.audio&&!q.audio.includes('___'));assert.equal(new Set(q.o).size,q.o.length);assert(q.o.includes(q.answer));assert(q.o.length>=3);}
    }
    const specs=w.FR_A1_MASTERY_SPECS[id].tasks;
    for(let i=0;i<specs.length;i++){
      const t=specs[i],pool=pools.find(p=>p.key===w.FR_A1_DEEPENING.routes[id][i]);
      assert(pool.tasks.some(q=>q.q===(t.prompt||t.q)),`lesson ${id}: ${t.prompt||t.q}`);
      if(t.prompt)assert(after.querySelector(`[data-deepening-key="${pool.key}"]`).textContent.includes(t.prompt.replace('___',t.answer)),`lesson ${id}: explanation before test`);
    }
  }
  dom.window.close();
});
test('lesson 4 teaches all weekdays, all months, clock distinctions and a complete appointment',()=>{
  const {dom,w}=appEnvironment(),l=lesson(w,4),html=w.FR_A1_DEEPENING.enrich(l,w.grammarHtml(l)),pools=w.FR_A1_DEEPENING.pools(l,html);
  assert.equal(pools.length,4);
  const texts=pools.flatMap(p=>p.tasks.map(q=>q.q+' '+q.answer)).join(' ');
  for(const word of ['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche','janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'])assert(texts.includes(word),word);
  for(const text of ['4:30','4:15','8:45','15:30','devant la bibliothèque','à partir de'])assert(html.includes(text),text);
  assert(!pools.flatMap(p=>p.tasks).some(q=>q.audio==='halb'||q.audio==='Viertel vor'));
  dom.window.close();
});
test('every lesson renders working topic practice without an empty introduction page',()=>{
  const {dom,w,view}=appEnvironment();
  const state={doneLessons:[1],lessonQuizBest:{1:100},lessonWork:{},lessonMasteryBest:{1:90}};
  for(let id=2;id<=24;id++){
    render(w,view,id,state);view.querySelector('[data-lesson-step="grammar"]').click();
    const keys=[...view.querySelectorAll('[data-grammar-progress]')].map(b=>b.dataset.grammarProgress);
    for(const key of keys){view.querySelector(`[data-grammar-progress="${key}"]`).click();assert(view.querySelector('.deepening-start'),`lesson ${id} topic ${key}`);assert(view.querySelector('#lessonGrammarPage').textContent.trim().length>80);}
  }
  assert.deepEqual([...state.doneLessons],[1]);assert.equal(state.lessonMasteryBest[1],90);
  dom.window.close();
});
test('inline answers always play the correct French audio and completion updates the right progress segment',()=>{
  const {dom,w,view}=appEnvironment(),state={doneLessons:[],lessonQuizBest:{},lessonWork:{}},audio=[],saves=[];
  render(w,view,4,state,audio,saves);view.querySelector('[data-lesson-step="grammar"]').click();
  assert(!view.querySelector('[data-grammar-progress="0"]').classList.contains('done'));
  view.querySelector('.deepening-start').click();let count=0;
  while(view.querySelector('.deepening-next')||view.querySelector('.deepening-stage .option-btn')){
    const options=[...view.querySelectorAll('.deepening-stage .option-btn')];if(options.length&&!options[0].disabled){const l=lesson(w,4),pools=w.FR_A1_DEEPENING.pools(l,w.FR_A1_DEEPENING.enrich(l,w.grammarHtml(l))),q=pools.find(p=>p.key==='u0').tasks.find(t=>t.q===view.querySelector('.quiz-q').textContent);const button=options.find(b=>count%2?b.textContent===q.answer:b.textContent!==q.answer);button.click();count++;assert.equal(audio.at(-1).text,q.audio);assert.equal(audio.length,count);assert.equal(audio.at(-1).force,true);assert(view.querySelector('.option-btn.correct'));const correct=view.querySelector('.option-btn.correct').textContent;assert(view.querySelector('.deepening-feedback').textContent.includes(correct)||view.querySelector('.deepening-feedback').textContent.includes('Richtig'));view.querySelector('.deepening-next').click();}
    else break;
  }
  assert.equal(count,6);assert(saves.length);assert(state.lessonWork[4].deepening.u0.done);assert(view.querySelector('[data-grammar-progress="0"]').classList.contains('done'));assert(!view.querySelector('[data-grammar-progress="1"]').classList.contains('done'));assert.equal(state.doneLessons.length,0);
  view.querySelector('[data-grammar-progress="1"]').click();view.querySelector('[data-grammar-progress="0"]').click();assert(view.querySelector('.deepening-start').textContent.includes('Übung wiederholen'));
  dom.window.close();
});
test('writing and speaking models meet the actual requested length and task points',()=>{
  const {dom,w}=appEnvironment();const model=id=>w.models[id].writeModel.replace(/\\n/g,'\n');
  for(const id of [17,24]){
    const message=id===17?model(id).split(/\n\n/).at(-1):model(id);
    assert(message.trim().split(/\s+/).length>=40,`lesson ${id}: 40-word model`);
  }
  assert.equal(model(11).split(/[.!?]+/).filter(s=>s.trim()).length,5);
  assert.equal(model(13).split(/[.!?]+/).filter(s=>s.trim()).length,3);
  assert.equal(model(20).split(/[.!?]+/).filter(s=>s.trim()).length,6);
  assert.equal(model(21).split('?').filter(s=>s.trim()).length,4);
  assert(w.models[22].speakModel.includes('Demain'));
  assert(model(23).includes('Ajoutez'));assert(model(23).includes('Mélangez'));
  assert(w.models[19].speakModel.includes('des livres'));assert(w.models[19].speakModel.includes('des clés'));
  dom.window.close();
});
test('lesson 1 content and established conjugation drills stay intact',()=>{
  const {dom,w}=appEnvironment(),l=lesson(w,1),html=w.grammarHtml(l);
  assert.equal(w.FR_A1_DEEPENING.enrich(l,html),html);
  for(const group of Object.values(w.FR_A1_LESSON1.GROUPS))assert.equal(group.tasks.length,12);
  dom.window.close();
});

test('listening contains only examples and the lesson quiz; alphabet tools move to the first deepening topic',()=>{
  const {dom,w,view}=appEnvironment(),state={doneLessons:[],lessonQuizBest:{},lessonWork:{}};
  for(let id=1;id<=24;id++){
    render(w,view,id,state);
    assert(view.querySelector('#startQuiz'));
    assert(!view.querySelector('.pronunciation-panel'));
  }
  render(w,view,2,state);
  view.querySelector('[data-lesson-step="grammar"]').click();
  assert(view.querySelector('#spellOwnName'));
  assert.equal(view.querySelectorAll('.alphabet-letter').length,26);
  assert(view.querySelector('.lesson-pronunciation-bonus .pronunciation-alphabet .alphabet-grid'));
  assert(view.textContent.includes('Akzente'));
  assert(!view.textContent.includes('Akzente mitnennen'));
  view.querySelector('[data-grammar-progress="1"]').click();
  assert(view.textContent.includes('unregelmäßig'));
  assert.equal(view.querySelectorAll('.grammar-table tbody tr').length,6);
  assert.equal(view.querySelectorAll('.grammar-table .speak-btn[data-speak]').length,6);
  const sounds=[...view.querySelectorAll('.grammar-table [data-speak]')].map(b=>decodeURIComponent(b.dataset.speak));
  assert.deepEqual(sounds,['je peux','tu peux','il peut','nous pouvons','vous pouvez','ils peuvent']);
  view.querySelector('[data-grammar-progress="2"]').click();
  assert([...view.querySelectorAll('#lessonGrammarPage [data-speak]')].every(b=>b.classList.contains('speak-btn')));
  assert(!view.textContent.includes('Comment ça s’écrit'));
  assert(lesson(w,2).transfer.writing.includes('einzelnen Buchstaben'));
  dom.window.close();
});
test('number formation is explained in five compact blocks',()=>{
  const {dom,w}=appEnvironment(),l=lesson(w,3),html=w.FR_A1_DEEPENING.enrich(l,w.grammarHtml(l));
  const root=w.document.createElement('div');root.innerHTML=html;
  assert.equal(root.querySelectorAll('.deepening-rule-blocks > div').length,5);
  for(const formula of ['10 + 7','60 + 10','4 × 20','80 + 10'])assert(root.textContent.includes(formula));
  dom.window.close();
});
test('lesson 3 writing uses five French fields with fictional data, preserves drafts and locks fields during comparison',()=>{
  const {dom,w,view}=appEnvironment(),state={doneLessons:[],lessonQuizBest:{},lessonWork:{}};
  w.A1Learning={wireRecorder:()=>{},countWords:s=>s.trim().split(/\s+/).filter(Boolean).length};
  w.A1ExerciseEngine={charBar:()=>'<div class="mixed-char-wrap"></div>',wireChars:()=>{}};
  render(w,view,3,state);openExtra(view,'write');
  const fields=[...view.querySelectorAll('[data-writing-field]')];
  assert.equal(fields.length,5);assert(view.querySelector('#lessonWriting').hidden);
  view.querySelector('#showWritingModel').click();assert(view.querySelector('#writingModel').textContent.includes('alle Felder'));
  ['Martin','Léa','30','9025550142','lea@example.com'].forEach((value,i)=>{fields[i].value=value;fields[i].dispatchEvent(new w.Event('input'));});
  view.querySelector('#showWritingModel').click();assert(fields.every(f=>f.readOnly));
  view.querySelector('#editWriting').click();assert(fields.every(f=>!f.readOnly));
  view.querySelector('[data-lesson-step="grammar"]').click();openExtra(view,'write');
  assert.equal(view.querySelector('[data-writing-field="name"]').value,'Martin');
  assert(view.querySelector('.mixed-char-wrap').hidden);
  dom.window.close();
});
test('all preparation rules emphasize their key ideas without changing the explanation text',()=>{
  const {dom,w}=appEnvironment();
  for(let id=2;id<=24;id++){
    for(const unit of w.FR_A1_DEEPENING_CONTENT[id]){
      assert(unit.emphasis.length>0);
      const texts=unit.blocks?.map(b=>b[1])||[unit.rule];
      for(const text of texts){
        const panel=w.document.createElement('div');panel.innerHTML=w.FR_A1_DEEPENING.formatRule(text,unit.emphasis);
        assert.equal(panel.textContent,text);
        assert(panel.querySelector('strong'),`${id}: ${unit.title}`);
      }
    }
  }
  assert.equal(w.FR_A1_DEEPENING.formatRule('<script>',[]),'&lt;script&gt;');
  assert.equal(w.FR_A1_DEEPENING.formatRule('demain de',['de']),'demain <strong>de</strong>');
  dom.window.close();
});
test('reported alphabet questions have natural prompts and task-specific feedback',()=>{
  const {dom,w}=appEnvironment(),l=lesson(w,2),pools=w.FR_A1_DEEPENING.pools(l,w.FR_A1_DEEPENING.enrich(l,w.grammarHtml(l)));
  const tasks=pools.flatMap(p=>p.tasks);
  assert(!tasks.some(q=>q.q.includes('Wie sagst du „So schreibt')||q.q.includes('Wie sagst du „Das schreibt')));
  const question=tasks.find(q=>q.q==='Du möchtest wissen, wie ein Name geschrieben wird. Was fragst du?');
  assert.equal(question.answer,'Comment ça s’écrit ?');
  const family=tasks.find(q=>q.q==='Mon ___ est Dupont.');
  assert(family.explanation.includes('Nom de famille bedeutet Nachname'));
  assert(!family.explanation.includes('Akzent'));
  for(const task of w.FR_A1_MASTERY_SPECS[2].tasks)assert(task.explanation);
  assert(!JSON.stringify(l).includes('Das schreibt man'));
  dom.window.close();
});
test('surname dictation and writing solution use the same name and ordered French letter audio',()=>{
  const {dom,w,view}=appEnvironment(),state={doneLessons:[],lessonQuizBest:{},lessonWork:{}},sequences=[];
  w.A1Learning={wireRecorder:()=>{},countWords:s=>s.trim().split(/\s+/).filter(Boolean).length};
  w.A1ExerciseEngine={charBar:()=>'<div class="mixed-char-wrap"></div>',wireChars:()=>{}};
  w.A1Voice={cancel:()=>{},speakSequence:(parts,options)=>sequences.push({parts,options})};
  render(w,view,2,state);openExtra(view,'write');
  const button=view.querySelector('[data-pron-spell]');
  assert.equal(button.dataset.pronSpell,w.models[2].writeModel.toUpperCase());
  button.click();assert.equal(sequences.length,1);assert.equal(sequences[0].options.lang,'fr-FR');
  assert.deepEqual([...sequences[0].parts],['emme','a','erre','té','i','enne']);
  dom.window.close();
});
test('Sabine’s appointment task explicitly requests a dialogue, both roles and optional help',()=>{
  const {dom,w}=appEnvironment(),task=lesson(w,4).transfer.speaking;
  for(const phrase of ['Dialog zwischen zwei Personen','Sprich beide Rollen','Tag und einer Uhrzeit','Treffpunkt','bestätigt','Hilfestellung'])assert(task.includes(phrase));
  assert(w.models[4].speakModel.includes('A :'));assert(w.models[4].speakModel.includes('B :'));
  dom.window.close();
});
test('reported preparation tasks use close alternatives and test form labels instead of copied digits',()=>{
 const {dom,w}=appEnvironment();
 for(const id of [3,4]){
  const pools=w.FR_A1_DEEPENING.pools(w.FR_A1_DATA.lessons[id-1],w.grammarHtml(w.FR_A1_DATA.lessons[id-1]));
  const tasks=pools.flatMap(p=>p.tasks);
  if(id===3){
   const phone=tasks.find(t=>t.answer==='Téléphone');assert(phone);assert(phone.o.every(o=>!/[0-9]/.test(o)));
   const question=tasks.find(t=>t.answer==='Vous avez quel âge ?');assert(question.o.every(o=>o.endsWith('?')));
   assert(tasks.some(t=>t.q==='Elle a ___ ans.'&&t.answer==='trente'));
  }else{
   const date=tasks.find(t=>t.answer==='Nous sommes le cinq octobre.');assert(date.o.every(o=>o.startsWith('Nous sommes le')));
   const later=tasks.find(t=>t.answer==='Je viens plus tard.');assert(later.o.every(o=>o.startsWith('Je viens')));
   const day=tasks.find(t=>t.answer==='On se voit vendredi soir.');assert(day.o.every(o=>o.startsWith('On se voit')));
  }
 }
 dom.window.close();
});
test('continue restores the same deepening topic and graded mini-test without duplicate points or audio',()=>{
 const {dom,w,view}=appEnvironment(),state={doneLessons:[],lessonQuizBest:{4:100},lessonWork:{}},audio=[];
 render(w,view,4,state,audio,[],{resume:true});view.querySelector('[data-lesson-step="grammar"]').click();view.querySelector('[data-grammar-progress="2"]').click();view.querySelector('.deepening-start').click();
 const key=view.querySelector('[data-deepening-practice]').dataset.deepeningPractice,progress=state.lessonWork[4].deepening[key];let session=progress.session;
 [...view.querySelectorAll('.option-btn')].find(b=>b.textContent===session.questions[0].answer).click();assert.equal(progress.session.score,1);const heard=audio.length,question=view.querySelector('.quiz-q').textContent;
 render(w,view,4,state,audio,[],{resume:true});assert.equal(state.lastLessonId,4);assert.equal(view.querySelector('[data-grammar-progress="2"]').getAttribute('aria-current'),'step');assert.equal(view.querySelector('.quiz-q').textContent,question);assert(view.querySelector('.deepening-next'));assert.equal(progress.session.score,1);assert.equal(audio.length,heard);
 view.querySelector('.deepening-next').click();assert.equal(progress.session.i,1);assert.equal(progress.session.score,1);assert.equal(state.doneLessons.length,0);dom.window.close();
});
test('continue restores the first lesson’s conjugation drill, including checked feedback',()=>{
 const {dom,w,view}=appEnvironment(),state={doneLessons:[],lessonQuizBest:{},lessonWork:{}},audio=[];
 render(w,view,1,state,audio,[],{resume:true});view.querySelector('[data-lesson-step="grammar"]').click();view.querySelector('[data-grammar-progress="1"]').click();view.querySelector('.lesson1-drill-start').click();
 const p=state.lessonGrammarPractice[1].etre;[...view.querySelectorAll('[data-l1-answer]')].find(b=>b.dataset.l1Answer===p.session.tasks[0].a).click();const question=view.querySelector('.quiz-q').textContent,heard=audio.length;
 render(w,view,1,state,audio,[],{resume:true});assert.equal(view.querySelector('.quiz-q').textContent,question);assert(view.querySelector('.lesson1-drill-next'));assert.equal(p.session.score,1);assert.equal(audio.length,heard);view.querySelector('.lesson1-drill-next').click();assert.equal(p.session.i,1);dom.window.close();
});
test('continue opens an unfinished introductory quiz at its saved question and feedback',()=>{
 const {dom,w,view}=appEnvironment(),state={doneLessons:[],lessonQuizBest:{},lessonWork:{}};
 w.A1Learning={shuffle:a=>[...a]};for(const f of ['francais/intro-listening.js','shared/exercise-engine.js'])w.eval(read(f));
 render(w,view,4,state,[],[],{resume:true});view.querySelector('#startQuiz').click();const p=state.lessonWork[4],q=p.session.ex[0],index=q.a??q.o.indexOf(q.answer);view.querySelector(`[data-o="${index}"]`).click();const question=view.querySelector('.quiz-q').textContent;
 render(w,view,4,state,[],[],{resume:true});assert.equal(view.querySelector('.quiz-q').textContent,question);assert(view.querySelector('#mixedNext'));assert.equal(p.session.score,1);view.querySelector('#mixedNext').click();assert.equal(p.session.i,1);dom.window.close();
});
test('continue resumes the grammar check at a checked answer instead of its start screen',()=>{
 const {dom,w,view}=appEnvironment(),state={doneLessons:[],lessonQuizBest:{},lessonWork:{}};
 const options={resume:true,renderGrammarCheck:({onBack})=>w.FR_A1_LESSON1.renderGrammarCheck({view,state,save:()=>{},speak:()=>{},onBack})};
 render(w,view,1,state,[],[],options);view.querySelector('[data-lesson-step="grammar-check"]').click();view.querySelector('#startGrammarCheck').click();view.querySelector('#l1GrammarStart').click();const p=state.lessonGrammarCheckProgress[1];[...view.querySelectorAll('[data-l1-check]')].find(b=>b.dataset.l1Check===p.session.tasks[0].a).click();const question=view.querySelector('.quiz-q').textContent;
 render(w,view,1,state,[],[],options);assert.equal(view.querySelector('.quiz-q').textContent,question);assert(view.querySelector('#l1GrammarNext'));assert.equal(p.session.score,1);view.querySelector('#l1GrammarNext').click();assert.equal(p.session.i,1);dom.window.close();
});
test('continue restores an unfinished lesson check without resetting or counting its answer twice',()=>{
 const {dom,w,view}=appEnvironment(),state={doneLessons:[4],lessonQuizBest:{},lessonWork:{}};w.eval(read('francais/mastery.js'));
 const options={resume:true,renderMastery:({onBack,onResult})=>w.FR_A1_MASTERY.renderLessonTest({lesson:lesson(w,4),view,state,save:()=>{},speak:()=>{},onBack,onResult})};
 render(w,view,4,state,[],[],options);view.querySelector('[data-lesson-step="check"]').click();view.querySelector('#startMasteryOverview').click();view.querySelector('#masteryStart').click();const p=state.lessonCheckProgress[4],q=p.session.ex[0];
 if(q.type==='choice')[...view.querySelectorAll('[data-mastery-o]')].find(b=>b.textContent===q.answer).click();else{view.querySelector('#masteryInput').value=q.answer;view.querySelector('#masteryCheck').click();}
 const question=view.querySelector('.quiz-q').textContent;
 render(w,view,4,state,[],[],options);assert.equal(view.querySelector('.quiz-q').textContent,question);assert(view.querySelector('#masteryNext'));assert.equal(p.session.score,1);view.querySelector('#masteryNext').click();assert.equal(p.session.i,1);dom.window.close();
});
test('home continuation prefers the last unfinished lesson, then advances after a passed final check',()=>{
 const {dom,w}=appEnvironment(),lessons=w.FR_A1_DATA.lessons,state={lastLessonId:8,doneLessons:[1,2],lessonWork:{8:{resume:{step:'grammar',grammarIndex:2}}}};
 assert.equal(w.A1LessonFlow.continuation(lessons,state).id,8);state.doneLessons.push(8);state.lessonWork[8].resume.step='check';assert.equal(w.A1LessonFlow.continuation(lessons,state).id,3);
 state.lessonCheckProgress={8:{session:{i:2}}};assert.equal(w.A1LessonFlow.continuation(lessons,state).id,8);state.lastLessonId=999;assert.equal(w.A1LessonFlow.continuation(lessons,state).id,3);dom.window.close();
});
