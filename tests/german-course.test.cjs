function openExtra(view,key){view.querySelector('[data-lesson-step="check"]').click();view.querySelector(`[data-lesson-step="${key}"]`).click();}
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
function environment(){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/deutsch/',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window;
 w.scrollTo=()=>{};w.ResizeObserver=class{observe(){}disconnect(){}};w.Math.random=()=>.99;
 w.A1Learning={shuffle:a=>[...a],countWords:s=>s.trim().split(/\s+/).filter(Boolean).length,wireRecorder:()=>{}};
 for(const f of ['deutsch/lesson-content.js','shared/lesson-guide.js','shared/grammar-ui.js','shared/lesson-topic-info.js','shared/pronunciation.js','shared/exercise-review.js','deutsch/pronouns.js','deutsch/answer-audio.js','shared/exercise-engine.js','deutsch/grammar-drills.js','deutsch/deepening-content.js','deutsch/question-content.js','deutsch/applications.js','deutsch/study.js','deutsch/assessments.js','deutsch/pronunciation.js','deutsch/comprehension-content.js','shared/comprehension.js','deutsch/lesson-flow.js'])w.eval(read(f));
 const app=read('deutsch/app.js');w.eval(app.slice(0,app.indexOf('const stateKey'))+';window.testData={lessons,grammarSets,formTasks};');
 w.eval(app.slice(app.indexOf('const GRAMMAR_GUIDES='),app.indexOf('function renderGrammarIntro('))+'window.testRefs=lessonGrammarReferenceHtml;');
 w.DE_A1_ASSESSMENTS.configure({...w.testData,practiceProgress:{recordGrammar:()=>{}}});
 const view=w.document.getElementById('view');return {dom,w,view};
}
function state(){return {doneLessons:[],lessonWork:{},lessonQuizBest:{}};}
function render(env,id,s,audio=[],options={}){const {w,view}=env,l=w.testData.lessons[id-1],app=w.DE_A1_APPLICATIONS[id],original=w.A1_COURSE_CONTENT[id-1],c={...original,transfer:{...original.transfer,writing:app.writingTask||original.transfer.writing}};
 w.A1LessonFlow.render({lesson:l,content:c,view,state:s,save:()=>{},lessonCount:24,targetLang:'de',uiLang:'fr',grammarHtml:w.DE_A1_STUDY.grammarHtml(l,w.testRefs(id),text=>`<button data-speak="${text}">🔊</button>`),goalsHtml:'<div class="lesson-goals">Objectifs</div>',pronunciationHtml:w.DE_A1_PRONUNCIATION.render(c),dialogueHtml:w.A1LessonGuide.parts(id,'fr',s=>s,()=>'<button>🔊</button>').dialogue,model:app.speakModel,writingModel:app.writeModel,writingHints:app.hints,writingFields:app.fields,minWords:app.minWords,recorderHtml:()=>'',speakBtn:t=>`<button data-speak="${t}">🔊</button>`,wireSpeakButtons:()=>{},wirePronunciation:()=>{},speak:t=>audio.push(t),renderLearn:()=>{},renderLesson:()=>{},renderMastery:({onBack,onResult})=>w.DE_A1_ASSESSMENTS.renderLessonTest({lesson:l,view,state:s,save:()=>{},speak:t=>audio.push(t),onBack,onResult}),renderGrammarCheck:({onBack})=>w.DE_A1_ASSESSMENTS.renderGrammarCheck({view,state:s,save:()=>{},speak:t=>audio.push(t),onBack}),...options});
}
function answerCurrent(w,view,session){const q=session.ex[session.i];if(q.type==='gap'){const input=view.querySelector('#mixedInput');input.value=q.answer;input.dispatchEvent(new w.Event('input'));view.querySelector('#mixedCheck').click();}else view.querySelector(`[data-o="${q.a}"]`).click();}
test('all 24 lessons teach the opening phrases and checks use valid independent transfer tasks',()=>{
 const env=environment(),{w}=env;
 assert.equal(w.testData.lessons.length,24);
 for(const l of w.testData.lessons){
  const html=w.DE_A1_STUDY.grammarHtml(l,w.testRefs(l.id),()=>'<button>🔊</button>'),panel=w.document.createElement('div');panel.innerHTML=html;
  assert(panel.querySelectorAll('strong').length>=8);assert(!html.includes('**'));assert(!panel.querySelector('details:empty'));
  const quiz=w.DE_A1_STUDY.lessonExercises(l);assert.equal(quiz.length,10);assert(quiz.every(q=>['choice','listening'].includes(q.type)));assert(w.DE_A1_ASSESSMENTS.makeLessonTest(l).length>=12&&w.DE_A1_ASSESSMENTS.makeLessonTest(l).length<=16);
  for(const q of [...quiz,...w.DE_A1_ASSESSMENTS.makeLessonTest(l)]){
   assert(q.audio&&!q.audio.includes('|')&&!q.audio.includes('___'));if(q.skill!=='transfer'&&!q.q?.startsWith('Lies den Dialog:'))assert(panel.textContent.includes(q.audio),`${l.id}: ${q.audio} must be taught`);
   if(q.type!=='gap'){assert.equal(q.o.length,3);assert.equal(new Set(q.o).size,3);assert.equal(q.o[q.a],q.answer);}else assert(q.context&&q.prompt.includes('___'));
  }
  for(const unit of w.DE_A1_STUDY.content[l.id]){assert.equal(w.DE_A1_STUDY.unitTasks(unit).length,unit.practiceCount);const tasks=w.DE_A1_STUDY.unitTasks(unit);assert.equal(new Set(tasks.map(q=>q.q)).size,tasks.length);}
 }
 env.dom.window.close();
});
test('every grammar drill has a topic-sized set of distinct questions and unambiguous answer indices',()=>{
 const {dom,w}=environment();for(const drill of Object.values(w.DE_A1_GRAMMAR_DRILLS.topics)){assert(drill.tasks.length>=6);assert.equal(new Set(drill.tasks.map(q=>q.q)).size,drill.tasks.length);for(const q of drill.tasks){assert(q.audio);if(q.type!=='gap'){assert.equal(q.o.length,3);assert(q.o[q.a]);assert.equal(new Set(q.o).size,3);}}}dom.window.close();
});
test('all lessons render separate learning steps with practice after each prepared topic',()=>{
 const env=environment(),{w,view}=env;
 for(let id=1;id<=24;id++){
  render(env,id,state());assert(!view.querySelector('.pronunciation-panel'),'pronunciation belongs in deepening');assert.equal(view.querySelectorAll('[data-core-row]:not([hidden])').length,Math.ceil(w.testData.lessons[id-1].phrases.length/Math.ceil(w.testData.lessons[id-1].phrases.length/6)));
  view.querySelector('[data-lesson-step="grammar"]').click();const count=view.querySelectorAll('[data-grammar-progress]').length;assert(count>=2);
  for(let page=0;page<count;page++){if(page)view.querySelector(`[data-grammar-progress="${page}"]`).click();assert(view.querySelector('#lessonGrammarPage').textContent.trim().length>50);assert(!view.querySelector('#lessonGrammarPage details'));if(page<2)assert(view.querySelector('#topicPracticeStart'));}
  openExtra(view,'speak');assert(view.querySelector('#speechHelp').hidden);
  openExtra(view,'write');assert(view.querySelector('#writingHelp').hidden);
 }
 env.dom.window.close();
});
test('topic mini-tests resume, play the correct German answer and mark only their own progress',()=>{
 const env=environment(),{w,view}=env,s=state(),audio=[];render(env,4,s,audio);view.querySelector('[data-lesson-step="grammar"]').click();view.querySelector('#topicPracticeStart').click();
 const p=s.lessonGrammarPractice[4]['study-4-0'];answerCurrent(w,view,p.session);assert.equal(p.session.score,1);assert.equal(audio.at(-1),p.session.ex[0].audio);
 render(env,4,s,audio);view.querySelector('[data-lesson-step="grammar"]').click();view.querySelector('#topicPracticeStart').click();assert.equal(p.session.score,1);assert(view.querySelector('#mixedNext'));
 while(p.session){view.querySelector('#mixedNext')?.click();if(p.session&&!p.session.response)answerCurrent(w,view,p.session);}
 assert.equal(p.done,true);assert.equal(p.last,p.total);assert(view.querySelector('[data-grammar-progress="0"]').classList.contains('done'));assert(!view.querySelector('[data-grammar-progress="1"]').classList.contains('done'));env.dom.window.close();
});
test('lesson exercises and final tests retain answers after leaving without double scoring',()=>{
 const env=environment(),{w,view}=env,s=state();render(env,7,s);view.querySelector('#startQuiz').click();const p=s.lessonWork[7];answerCurrent(w,view,p.session);assert.equal(p.session.score,1);
 render(env,7,s);view.querySelector('#startQuiz').click();assert.equal(p.session.score,1);assert(view.querySelector('#mixedNext'));
 while(p.session){if(!p.session.response)answerCurrent(w,view,p.session);if(p.session.i===9)assert.equal(view.querySelector('#mixedNext').textContent,'Continuer : approfondir');view.querySelector('#mixedNext').click();}
 assert(view.querySelector('#lessonGrammarPage'));
 const run=()=>{w.DE_A1_ASSESSMENTS.renderLessonTest({lesson:w.testData.lessons[6],view,state:s,save:()=>{},speak:()=>{},onBack:()=>{}});view.querySelector('#masteryStart').click();};
 run();const check=s.lessonCheckProgress[7];answerCurrent(w,view,check.session);run();assert.equal(check.session.score,1);assert(view.querySelector('#mixedNext'));view.querySelector('#mixedNext').click();assert.equal(check.session.i,1);env.dom.window.close();
});
test('form tasks use fictional German source texts, real fields, saved drafts and locked comparison',()=>{
 const env=environment(),{w,view}=env;
 for(const id of [3,5,23]){
  const s=state();render(env,id,s);openExtra(view,'write');const fields=[...view.querySelectorAll('[data-writing-field]')];assert.equal(fields.length,w.DE_A1_APPLICATIONS[id].fields.length);assert(view.querySelector('#lessonWriting').hidden);
  view.querySelector('#showWritingModel').click();assert(view.querySelector('#writingModel').textContent.includes('Remplis'));
  fields.forEach((f,i)=>{f.value='Valeur '+i;f.dispatchEvent(new w.Event('input'));});view.querySelector('#showWritingModel').click();assert(fields.every(f=>f.readOnly));assert(view.querySelector('.mixed-char-wrap').hidden);
  view.querySelector('#editWriting').click();assert(fields.every(f=>!f.readOnly));render(env,id,s);openExtra(view,'write');assert.equal(view.querySelector('[data-writing-field]').value,'Valeur 0');
 }
 env.dom.window.close();
});
test('speaking completion turns the same control into continue and special characters lock after writing comparison',()=>{
 const env=environment(),{w,view}=env,s=state();render(env,1,s);openExtra(view,'speak');view.querySelector('#showSpeakingModel').click();view.querySelector('#oralGood').click();assert(view.querySelector('#oralGood').textContent.includes('Continuer'));view.querySelector('#oralGood').click();
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
 while(view.querySelector('#mixedInput')){view.querySelector('#mixedInput').value='einen';view.querySelector('#mixedCheck').click();view.querySelector('#mixedNext').click();}
 const context=w.A1BugReports.context();assert.equal(context.lessonId,6);assert.equal(context.step,'check');const question=w.document.createElement('div');question.innerHTML=w.A1ExerciseReview.question(context.question);assert.equal(question.textContent,view.querySelector('.quiz-q').textContent);assert.equal(context.options.length,3);
 w.A1BugReports.open();w.document.querySelector('[data-bug-category="answers"]').click();assert(w.document.querySelector('[data-bug-reason="too-obvious"]'));dom.window.close();
});
test('German continue restores the exact grammar page and an already checked mini-test answer',()=>{
 const env=environment(),{w,view}=env,s=state();render(env,5,s,[],{resume:true});view.querySelector('[data-lesson-step="grammar"]').click();view.querySelector('[data-grammar-progress="1"]').click();
 assert.equal(s.lastLessonId,5);assert.equal(s.lessonWork[5].resume.grammarIndex,1);const title=s.lessonWork[5].resume.topicTitle;
 view.querySelector('#topicPracticeStart').click();view.querySelector('[data-o]').click();const key=s.lessonWork[5].resume.practiceKey,session=s.lessonGrammarPractice[5][key].session,score=session.score;
 assert.equal(s.lessonWork[5].resume.mode,'exercise');render(env,5,s,[],{resume:true});assert.equal(s.lessonWork[5].resume.topicTitle,title);assert(view.querySelector('[data-grammar-progress="1"][aria-current="step"]'));assert(view.querySelector('[data-o]:disabled'));assert.equal(s.lessonGrammarPractice[5][key].session.score,score);assert.equal(s.lessonGrammarPractice[5][key].session.i,session.i);env.dom.window.close();
});
test('German continue restores an initial vocabulary question and its feedback without double scoring',()=>{
 const env=environment(),{w,view}=env,s=state();render(env,3,s,[],{resume:true});view.querySelector('#startQuiz').click();view.querySelector('[data-o]').click();const session=s.lessonWork[3].session,score=session.score;
 assert.equal(s.lessonWork[3].resume.mode,'exercise');render(env,3,s,[],{resume:true});assert(view.querySelector('[data-o]:disabled'));assert.equal(s.lessonWork[3].session.i,session.i);assert.equal(s.lessonWork[3].session.score,score);env.dom.window.close();
});
test('German home continuation honors saved review, old progress and completion without changing lesson results',()=>{
 const {dom,w}=environment(),lessons=w.testData.lessons,s=state();s.lessonQuizBest[2]=90;s.lastLessonId=2;
 assert.equal(w.A1LessonFlow.continuation(lessons,s).id,2);assert.equal(w.A1LessonFlow.resumePosition(lessons[1],s).step,'grammar');
 s.doneLessons=[1,2];s.lessonWork[2]={resume:{step:'grammar',grammarIndex:1}};assert.equal(w.A1LessonFlow.continuation(lessons,s).id,2);
 s.lessonWork[2].resume={step:'check'};assert.equal(w.A1LessonFlow.continuation(lessons,s).id,3);assert.deepEqual(s.doneLessons,[1,2]);assert.equal(s.lessonQuizBest[2],90);dom.window.close();
});

test('German opening rounds only test heard phrases, without reverse duplicates or typing',()=>{
 const {dom,w}=environment();w.Math.random=Math.random;
 for(const l of w.testData.lessons)for(let round=0;round<15;round++){
  const tasks=w.DE_A1_STUDY.lessonExercises(l);assert.equal(tasks.length,10);assert.equal(new Set(tasks.map(q=>q.audio)).size,10,`lesson ${l.id}: repeated phrase`);
  assert.equal(tasks.filter(q=>q.type==='listening').length,2);
  for(const q of tasks){assert(l.phrases.some(p=>p[0]===q.audio||p[0].split(', ').includes(q.audio)),`${l.id}: unheard expression`);assert(['choice','listening'].includes(q.type));assert.equal(q.o.length,3);assert.equal(new Set(q.o).size,3);assert.equal(q.o[q.a],q.answer);}
 }
 dom.window.close();
});
test('German final checks use an independent 12–16 question bank instead of repeating the opening or grammar pools',()=>{
 const {dom,w}=environment();w.Math.random=Math.random;
 for(const l of w.testData.lessons){
  const intro=w.DE_A1_STUDY.lessonExercises(l),tasks=w.DE_A1_ASSESSMENTS.makeLessonTest(l);
  assert(tasks.length>=12&&tasks.length<=16);assert(tasks.every(t=>t.skill==='transfer'));assert.equal(new Set(tasks.map(t=>t.q)).size,tasks.length);
  const practice=w.DE_A1_STUDY.content[l.id].flatMap(u=>w.DE_A1_STUDY.unitTasks(u));assert(!tasks.some(t=>practice.some(q=>q.q===t.q)),`lesson ${l.id}: copied grammar question`);
  assert(!tasks.some(t=>intro.some(q=>q.q===t.q)),`lesson ${l.id}: copied opening question`);
  const review=w.DE_A1_APPLICATIONS[l.id].review;assert.equal(review.fields.length,3);assert.equal(new Set(review.fields.map(f=>f.q)).size,3);
  for(const f of review.fields){assert.equal(f.o.length,3);assert.equal(new Set(f.o).size,3);assert(f.o.includes(f.answer));}
 }
 for(const set of w.testData.grammarSets)assert.equal(new Set(set.questions.map(q=>q.q.trim().toLowerCase().replace(/\s+/g,' '))).size,set.questions.length,set.id);
 dom.window.close();
});
test('reviewed German alternatives avoid impossible time phrases and target the same detail',()=>{
 const {dom,w}=environment();w.Math.random=Math.random;
 for(const units of Object.values(w.DE_A1_STUDY.content))for(const unit of units)for(let round=0;round<4;round++){
  const tasks=w.DE_A1_STUDY.unitTasks(unit);assert.equal(tasks.length,unit.practiceCount);assert.equal(new Set(tasks.map(q=>q.q)).size,tasks.length);
  for(const t of tasks){assert(t.answer);assert.equal(t.o.length,3);assert.equal(new Set(t.o).size,3);assert(!/seit morgen|seit übermorgen|am heute|am morgen|Ich heiße Kanada/.test(t.o.join(' ')));}
 }
 const first=w.DE_A1_STUDY.content[1][0],tasks=w.DE_A1_STUDY.unitTasks(first);assert(tasks.every(q=>q.skill==='application'));assert(tasks.some(q=>q.prompt==='Ich ___ Claire.'&&q.answer==='heiße'));assert(tasks.some(q=>q.q.includes('Ich ___ aus Deutschland.')&&q.o.includes('komme')));
 dom.window.close();
});
test('German question updates retain earned points and checked feedback while upgrading pending items',()=>{
 const {dom,w}=environment(),tasks=w.DE_A1_STUDY.lessonExercises(w.testData.lessons[0]);
 const checked={type:'choice',q:'Old checked question',audio:'Hallo',answer:'Bonjour',o:['Bonjour','Merci','Au revoir'],a:0};
 const progress={done:true,best:90,session:{version:102,ex:[checked,...Array.from({length:9},()=>({...checked,q:'Old repeated question'}))],i:0,score:1,response:{status:'ok',answer:'Bonjour'},draft:'',choicePicked:0}};
 w.DE_A1_STUDY.refreshSession(progress,tasks);assert.equal(progress.session.score,1);assert.equal(progress.best,90);assert(progress.done);assert.equal(progress.session.ex[0],checked);assert.equal(progress.session.response.status,'ok');assert(!progress.session.ex.slice(1).some(q=>q.q==='Old repeated question'));assert.equal(progress.session.contentRevision,118);
 dom.window.close();
});

test('German session revision is applied once and does not erase a draft for an unchanged question',()=>{
 const {dom,w}=environment(),tasks=w.DE_A1_STUDY.unitTasks(w.DE_A1_STUDY.content[1][0]),q=tasks.find(t=>t.type==='gap');
 const progress={session:{version:102,ex:[q],i:0,score:0,draft:'hei',choicePicked:null}};
 w.DE_A1_STUDY.refreshSession(progress,[q]);assert.equal(progress.session.draft,'hei');assert.equal(progress.contentRevision,118);
 delete progress.session.contentRevision;const current=progress.session.ex;
 w.DE_A1_STUDY.refreshSession(progress,[{...q,q:'another question'}]);assert.equal(progress.session.ex,current);assert.equal(progress.session.draft,'hei');dom.window.close();
});

test('German lessons distinguish female, plural and polite Sie and keep all three in conjugation practice',()=>{
 const {dom,w}=environment(),pronouns=w.DE_A1_PRONOUNS;
 assert.equal(pronouns.role({audio:'Sie ist hier.',context:'Elle est ici.'}),'female');
 assert.equal(pronouns.role({audio:'Sie sind hier.',context:'Ils sont ici.'}),'plural');
 assert.equal(pronouns.role({audio:'Sie sind hier.',context:'Vous êtes ici (politesse).'}),'formal');
 assert.equal(pronouns.role({audio:'Ihr seid hier.',context:'Vous êtes ici, entre amis.'}),'familiar');
 assert.equal(pronouns.role({audio:'Wie ist Ihr Name?'}),'');
 assert.equal(pronouns.role({audio:'Sie liest ein Buch.'}),'female');
 assert.equal(pronouns.role({audio:'Ich nehme Sie mit.',context:'Je vous accompagne.'}),'formal');
 for(const title of ['sein – conjugaison','haben – conjugaison','Verbes réguliers au présent','heißen et sprechen – conjugaison','Pronoms personnels']){
  const tasks=w.DE_A1_GRAMMAR_DRILLS.topics[title].tasks;for(const role of ['female','plural','formal'])assert(tasks.some(q=>q.pronounRole===role),`${title}: ${role}`);
 }
 const unit=w.DE_A1_STUDY.content[2][1],tasks=w.DE_A1_STUDY.unitTasks(unit);for(const role of ['female','plural','formal'])assert(tasks.some(q=>q.pronounRole===role));
 assert.equal(tasks.length,17);assert.equal(unit.table.length,6);assert(unit.table.some(row=>row[0]==='sie / Sie'));
 const html=w.DE_A1_STUDY.grammarHtml(w.testData.lessons[0],w.testRefs(1),s=>`<button data-speak="${s}">🔊</button>`),panel=w.document.createElement('div');panel.innerHTML=html;
 assert(panel.querySelector('.pronoun-guide'));assert(panel.querySelector('.pronoun-guide').textContent.includes('En début de phrase'));
 assert([...panel.querySelectorAll('td,th')].some(cell=>/^sie\s*\/\s*Sie$/.test(cell.textContent)));assert(!panel.firstElementChild.firstElementChild.querySelector('.pronoun-guide'));assert(!panel.querySelector('.deepening-background'));
 for(const l of w.testData.lessons){const ref=w.document.createElement('div');ref.innerHTML=w.testRefs(l.id);assert([...ref.querySelectorAll('[data-speak]')].every(b=>!/(?:elle|ils|politesse|vous)\b/.test(b.dataset.speak)));}
 assert.equal(panel.querySelector('.pronoun-guide').querySelectorAll('[data-speak]').length,3);dom.window.close();
});
test('German mini-test length follows the topic while opening and final checks retain their distinct purpose',()=>{
 const {dom,w}=environment(),lengths=new Set();
 for(const l of w.testData.lessons)for(const unit of w.DE_A1_STUDY.content[l.id]){
  const tasks=w.DE_A1_STUDY.unitTasks(unit);lengths.add(tasks.length);assert.equal(tasks.length,unit.practiceCount);assert.equal(new Set(tasks.map(q=>q.q)).size,tasks.length);
  assert(w.DE_A1_STUDY.unitTasks(unit,{full:true}).length>=10);
 }
 assert.deepEqual([...lengths].sort((a,b)=>a-b),[10,15,17]);
 assert.equal(w.DE_A1_STUDY.unitTasks(w.DE_A1_STUDY.content[2][0]).length,10);
 assert.equal(w.DE_A1_STUDY.unitTasks(w.DE_A1_STUDY.content[2][1]).length,17);
 dom.window.close();
});
