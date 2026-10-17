const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
function environment(){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/deutsch/',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window;
 w.scrollTo=()=>{};w.ResizeObserver=class{observe(){}disconnect(){}};w.Math.random=()=>.99;
 w.A1Learning={shuffle:a=>[...a],countWords:s=>s.trim().split(/\s+/).filter(Boolean).length,wireRecorder:()=>{}};
 for(const f of ['deutsch/lesson-content.js','shared/lesson-guide.js','shared/grammar-ui.js','shared/lesson-topic-info.js','shared/pronunciation.js','shared/exercise-review.js','shared/exercise-engine.js','deutsch/grammar-drills.js','deutsch/deepening-content.js','deutsch/applications.js','deutsch/study.js','deutsch/assessments.js','deutsch/pronunciation.js','deutsch/lesson-flow.js'])w.eval(read(f));
 const app=read('deutsch/app.js');w.eval(app.slice(0,app.indexOf('const stateKey'))+';window.testData={lessons,grammarSets,formTasks};');
 w.eval(app.slice(app.indexOf('const GRAMMAR_GUIDES='),app.indexOf('function renderGrammarIntro('))+'window.testRefs=lessonGrammarReferenceHtml;');
 w.DE_A1_ASSESSMENTS.configure({...w.testData,practiceProgress:{recordGrammar:()=>{}}});
 const view=w.document.getElementById('view');return {dom,w,view};
}
function state(){return {doneLessons:[],lessonWork:{},lessonQuizBest:{}};}
function render(env,id,s,audio=[]){const {w,view}=env,l=w.testData.lessons[id-1],app=w.DE_A1_APPLICATIONS[id],original=w.A1_COURSE_CONTENT[id-1],c={...original,transfer:{...original.transfer,writing:app.writingTask||original.transfer.writing}};
 w.A1LessonFlow.render({lesson:l,content:c,view,state:s,save:()=>{},lessonCount:24,targetLang:'de',uiLang:'fr',grammarHtml:w.DE_A1_STUDY.grammarHtml(l,w.testRefs(id),text=>`<button data-speak="${text}">🔊</button>`),goalsHtml:'<div class="lesson-goals">Objectifs</div>',pronunciationHtml:w.DE_A1_PRONUNCIATION.render(c),dialogueHtml:w.A1LessonGuide.parts(id,'fr',s=>s,()=>'<button>🔊</button>').dialogue,model:app.speakModel,writingModel:app.writeModel,writingHints:app.hints,writingFields:app.fields,minWords:app.minWords,recorderHtml:()=>'',speakBtn:t=>`<button data-speak="${t}">🔊</button>`,wireSpeakButtons:()=>{},wirePronunciation:()=>{},speak:t=>audio.push(t),renderLearn:()=>{},renderLesson:()=>{},renderMastery:({onBack})=>w.DE_A1_ASSESSMENTS.renderLessonTest({lesson:l,view,state:s,save:()=>{},speak:t=>audio.push(t),onBack}),renderGrammarCheck:({onBack})=>w.DE_A1_ASSESSMENTS.renderGrammarCheck({view,state:s,save:()=>{},speak:t=>audio.push(t),onBack})});
}
function answerCurrent(w,view,session){const q=session.ex[session.i];if(q.type==='gap'){const input=view.querySelector('#mixedInput');input.value=q.answer;input.dispatchEvent(new w.Event('input'));view.querySelector('#mixedCheck').click();}else view.querySelector(`[data-o="${q.a}"]`).click();}
test('all 24 lessons teach the exact vocabulary and patterns used in lesson checks',()=>{
 const env=environment(),{w}=env;
 assert.equal(w.testData.lessons.length,24);
 for(const l of w.testData.lessons){
  const html=w.DE_A1_STUDY.grammarHtml(l,w.testRefs(l.id),()=>'<button>🔊</button>'),panel=w.document.createElement('div');panel.innerHTML=html;
  assert(panel.querySelectorAll('strong').length>=8);assert(!html.includes('**'));assert(!panel.querySelector('details:empty'));
  const quiz=w.DE_A1_STUDY.lessonExercises(l);assert.equal(quiz.length,10);assert(quiz.every(q=>['choice','listening'].includes(q.type)));assert.equal(w.DE_A1_ASSESSMENTS.makeLessonTest(l).length,12);
  for(const q of [...quiz,...w.DE_A1_ASSESSMENTS.makeLessonTest(l)]){
   assert(q.audio&&!q.audio.includes('|')&&!q.audio.includes('___'));if(!q.q?.startsWith('Lies den Dialog:'))assert(panel.textContent.includes(q.audio),`${l.id}: ${q.audio} must be taught`);
   if(q.type!=='gap'){assert.equal(q.o.length,3);assert.equal(new Set(q.o).size,3);assert.equal(q.o[q.a],q.answer);}else assert(q.context&&q.prompt.includes('___'));
  }
  for(const unit of w.DE_A1_STUDY.content[l.id]){assert.equal(w.DE_A1_STUDY.unitTasks(unit).length,10);const tasks=w.DE_A1_STUDY.unitTasks(unit);assert.equal(new Set(tasks.map(q=>q.q)).size,10);}
 }
 env.dom.window.close();
});
test('every grammar drill has ten distinct grammatical questions and unambiguous answer indices',()=>{
 const {dom,w}=environment();for(const drill of Object.values(w.DE_A1_GRAMMAR_DRILLS.topics)){assert.equal(drill.tasks.length,10);assert.equal(new Set(drill.tasks.map(q=>q.q)).size,10);for(const q of drill.tasks){assert(q.audio);if(q.type!=='gap'){assert.equal(q.o.length,3);assert(q.o[q.a]);assert.equal(new Set(q.o).size,3);}}}dom.window.close();
});
test('all lessons render separate learning steps with practice after each prepared topic',()=>{
 const env=environment(),{w,view}=env;
 for(let id=1;id<=24;id++){
  render(env,id,state());assert(!view.querySelector('.pronunciation-panel'),'pronunciation belongs in deepening');assert.equal(view.querySelectorAll('[data-core-row]:not([hidden])').length,Math.ceil(w.testData.lessons[id-1].phrases.length/Math.ceil(w.testData.lessons[id-1].phrases.length/6)));
  view.querySelector('[data-lesson-step="grammar"]').click();const count=view.querySelectorAll('[data-grammar-progress]').length;assert(count>=2);
  for(let page=0;page<count;page++){if(page)view.querySelector(`[data-grammar-progress="${page}"]`).click();assert(view.querySelector('#lessonGrammarPage').textContent.trim().length>50);assert(!view.querySelector('#lessonGrammarPage details'));if(page<2)assert(view.querySelector('#topicPracticeStart'));}
  view.querySelector('[data-lesson-step="speak"]').click();assert(view.querySelector('#speechHelp').hidden);
  view.querySelector('[data-lesson-step="write"]').click();assert(view.querySelector('#writingHelp').hidden);
 }
 env.dom.window.close();
});
test('topic mini-tests resume, play the correct German answer and mark only their own progress',()=>{
 const env=environment(),{w,view}=env,s=state(),audio=[];render(env,4,s,audio);view.querySelector('[data-lesson-step="grammar"]').click();view.querySelector('#topicPracticeStart').click();
 const p=s.lessonGrammarPractice[4]['study-4-0'];answerCurrent(w,view,p.session);assert.equal(p.session.score,1);assert.equal(audio.at(-1),p.session.ex[0].audio);
 render(env,4,s,audio);view.querySelector('[data-lesson-step="grammar"]').click();view.querySelector('#topicPracticeStart').click();assert.equal(p.session.score,1);assert(view.querySelector('#mixedNext'));
 while(p.session){view.querySelector('#mixedNext')?.click();if(p.session&&!p.session.response)answerCurrent(w,view,p.session);}
 assert.equal(p.done,true);assert.equal(p.last,10);assert(view.querySelector('[data-grammar-progress="0"]').classList.contains('done'));assert(!view.querySelector('[data-grammar-progress="1"]').classList.contains('done'));env.dom.window.close();
});
test('lesson exercises and final tests retain answers after leaving without double scoring',()=>{
 const env=environment(),{w,view}=env,s=state();render(env,7,s);view.querySelector('#startQuiz').click();const p=s.lessonWork[7];answerCurrent(w,view,p.session);assert.equal(p.session.score,1);
 render(env,7,s);view.querySelector('#startQuiz').click();assert.equal(p.session.score,1);assert(view.querySelector('#mixedNext'));
 const run=()=>{w.DE_A1_ASSESSMENTS.renderLessonTest({lesson:w.testData.lessons[6],view,state:s,save:()=>{},speak:()=>{},onBack:()=>{}});view.querySelector('#masteryStart').click();};
 run();const check=s.lessonCheckProgress[7];answerCurrent(w,view,check.session);run();assert.equal(check.session.score,1);assert(view.querySelector('#mixedNext'));view.querySelector('#mixedNext').click();assert.equal(check.session.i,1);env.dom.window.close();
});
test('form tasks use fictional German source texts, real fields, saved drafts and locked comparison',()=>{
 const env=environment(),{w,view}=env;
 for(const id of [3,5,23]){
  const s=state();render(env,id,s);view.querySelector('[data-lesson-step="write"]').click();const fields=[...view.querySelectorAll('[data-writing-field]')];assert.equal(fields.length,w.DE_A1_APPLICATIONS[id].fields.length);assert(view.querySelector('#lessonWriting').hidden);
  view.querySelector('#showWritingModel').click();assert(view.querySelector('#writingModel').textContent.includes('Remplis'));
  fields.forEach((f,i)=>{f.value='Valeur '+i;f.dispatchEvent(new w.Event('input'));});view.querySelector('#showWritingModel').click();assert(fields.every(f=>f.readOnly));assert(view.querySelector('.mixed-char-wrap').hidden);
  view.querySelector('#editWriting').click();assert(fields.every(f=>!f.readOnly));render(env,id,s);view.querySelector('[data-lesson-step="write"]').click();assert.equal(view.querySelector('[data-writing-field]').value,'Valeur 0');
 }
 env.dom.window.close();
});
test('speaking completion turns the same control into continue and special characters lock after writing comparison',()=>{
 const env=environment(),{w,view}=env,s=state();render(env,1,s);view.querySelector('[data-lesson-step="speak"]').click();view.querySelector('#showSpeakingModel').click();view.querySelector('#oralGood').click();assert(view.querySelector('#oralGood').textContent.includes('Continuer'));view.querySelector('#oralGood').click();
 const input=view.querySelector('#lessonWriting');input.value='Ich heiße Claire. Ich wohne in Halifax.';input.dispatchEvent(new w.Event('input'));view.querySelector('#showWritingModel').click();assert(input.readOnly);const before=input.value;view.querySelector('.mixed-char').click();assert.equal(input.value,before);env.dom.window.close();
});
test('finishing the lesson check updates course progress, while old completions remain intact',()=>{
 const {dom,w,view}=environment(),s=state();s.doneLessons=[2];w.DE_A1_ASSESSMENTS.renderLessonTest({lesson:w.testData.lessons[0],view,state:s,save:()=>w.DE_A1_ASSESSMENTS.completePassedLessons(s),speak:()=>{},onBack:()=>{}});view.querySelector('#masteryStart').click();const p=s.lessonCheckProgress[1];while(p.session){answerCurrent(w,view,p.session);view.querySelector('#mixedNext').click();}assert.equal(s.lessonMasteryBest[1],100);assert(s.doneLessons.includes(1)&&s.doneLessons.includes(2));dom.window.close();
});
test('German lesson-check reports include the actual task, choices and nested quick categories',async()=>{
 const {dom,w,view}=environment();if(w.document.readyState!=='complete')await new Promise(r=>w.addEventListener('load',r));
 w.A1Profile={getCurrent:()=>({profileKey:'QA'}),getUiLang:()=> 'fr'};
 w.HTMLDialogElement.prototype.show=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.eval(read('shared/bug-reports.js'));
 w.DE_A1_ASSESSMENTS.renderLessonTest({lesson:w.testData.lessons[5],view,state:state(),save:()=>{},speak:()=>{},onBack:()=>{}});view.querySelector('#masteryStart').click();
 const context=w.A1BugReports.context();assert.equal(context.lessonId,6);assert.equal(context.step,'check');assert.equal(context.question,view.querySelector('.quiz-q').textContent);assert.equal(context.options.length,3);
 w.A1BugReports.open();w.document.querySelector('[data-bug-category="answers"]').click();assert(w.document.querySelector('[data-bug-reason="too-obvious"]'));dom.window.close();
});
