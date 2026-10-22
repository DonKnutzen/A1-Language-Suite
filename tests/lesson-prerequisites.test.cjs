const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(p,'utf8');
function fixture(course){
 const dom=new JSDOM('<main id="view"></main>',{url:`https://example.org/${course}/`,runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window;
 const NativeObserver=w.MutationObserver,observers=[],close=w.close.bind(w);w.MutationObserver=class extends NativeObserver{constructor(fn){super(fn);observers.push(this);}};w.close=()=>{observers.forEach(o=>o.disconnect());close();};
 w.scrollTo=()=>{};w.ResizeObserver=class{observe(){}disconnect(){}};w.esc=x=>String(x);w.A1Profile={getUiLang:()=>course==='francais'?'de':'fr'};
 for(const f of ['shared/learning.js','shared/grammar-ui.js','shared/lesson-topic-info.js','shared/lesson-foundations.js'])w.eval(read(f));
 let lessons,html,original;
 if(course==='francais'){
  for(const f of ['francais/data.js','francais/mastery-specs.js','francais/lesson1-practice.js','francais/deepening-content.js','francais/grammar-practice.js','francais/deepening.js','francais/comprehension-content.js','shared/comprehension.js'])w.eval(read(f));
  const app=read('francais/app.js');w.eval(app.slice(app.indexOf('const GRAMMAR_GUIDES='),app.indexOf('function renderGrammarIntro('))+'window.refs=lessonGrammarHtml;');
  lessons=w.FR_A1_DATA.lessons;html=l=>w.FR_A1_DEEPENING.enrich(l,w.refs(l));original=l=>l;
 }else{
  for(const f of ['deutsch/lesson-content.js','deutsch/pronouns.js','deutsch/grammar-drills.js','deutsch/deepening-content.js','deutsch/question-content.js','deutsch/applications.js','deutsch/study.js','deutsch/assessments.js','deutsch/comprehension-content.js','shared/comprehension.js'])w.eval(read(f));
  const app=read('deutsch/app.js');w.eval(app.slice(0,app.indexOf('const stateKey'))+'window.testData={lessons,grammarSets,formTasks};');
  w.eval(app.slice(app.indexOf('const GRAMMAR_GUIDES='),app.indexOf('function renderGrammarIntro('))+'window.refs=lessonGrammarReferenceHtml;');
  w.DE_A1_ASSESSMENTS.configure({...w.testData,practiceProgress:{recordGrammar(){}}});
  lessons=w.testData.lessons;html=l=>w.DE_A1_STUDY.grammarHtml(l,w.refs(l.id),()=>'<button>Audio</button>');original=l=>w.A1_COURSE_CONTENT[l.id-1];
 }
 w.eval(read(course+'/lesson-flow.js'));
 const view=w.document.getElementById('view'),state={doneLessons:[24],lessonWork:{},lessonQuizBest:{},lessonMasteryBest:{24:95}};
 const render=l=>w.A1LessonFlow.render({lesson:l,content:original(l),view,state,targetLang:course==='francais'?'fr':'de',uiLang:course==='francais'?'de':'fr',lessonCount:24,grammarHtml:html(l),save(){},speak(){},speakBtn:()=>'<button>Audio</button>',wireSpeakButtons(){},recorderHtml:()=>'',renderLearn(){},renderLesson(){},renderMastery(){}});
 return {dom,w,view,state,lessons,render,html};
}
for(const course of ['francais','deutsch']){
 test(course+': all 24 lessons present prerequisites before the first quiz and retain topic/progress identities',()=>{
  const f=fixture(course),{w,view}=f;let topicCount=0;
  for(const l of f.lessons){
   const before=f.html(l),oldDetails=w.document.createElement('div');oldDetails.innerHTML=before;
   f.render(l);const primer=view.querySelector('.lesson-foundations:not(.is-review)'),quiz=view.querySelector('#startQuiz');
   assert(primer,`lesson ${l.id}`);assert(quiz);assert(primer.compareDocumentPosition(quiz)&w.Node.DOCUMENT_POSITION_FOLLOWING);
   assert(!primer.closest('details'),'new explanations must be visible, not hidden in a closed panel');
   assert(primer.querySelectorAll('.lesson-foundation-rule').length>=1);assert(!primer.querySelector('table,button,input'));
   const count=oldDetails.querySelectorAll('details.grammar-detail').length;
   view.querySelector('[data-lesson-step="grammar"]').click();const buttons=[...view.querySelectorAll('[data-grammar-progress]')];assert.equal(buttons.length,count+(course==='francais'&&l.id===1?1:0));
   for(let i=0;i<buttons.length;i++){
    view.querySelector(`[data-grammar-progress="${i}"]`).click();const review=view.querySelector('.lesson-foundations.is-review');assert(review);assert(!review.open);assert(review.querySelector('summary'));assert(!review.matches('.grammar-detail'));
   }
   assert.equal(f.html(l),before,'supplementary explanations must not create or change generated question pools');topicCount+=count;
  }
  assert(topicCount>50);assert.deepEqual([...f.state.doneLessons],[24]);assert.equal(f.state.lessonMasteryBest[24],95);f.dom.window.close();
 });
 test(course+': deployed HTML and offline cache load the same prerequisites before the lesson flow',()=>{
  const index=read(course+'/index.html'),worker=read(course+'/service-worker.js');
  for(const asset of ['../shared/lesson-foundations.js?v=prerequisites-151','lesson-flow.js?v=prerequisites-151','../shared/lesson-ui.css?v=prerequisites-151'])assert(index.includes(asset)&&worker.includes(asset));
  assert(index.indexOf('lesson-foundations.js')<index.indexOf('lesson-flow.js'));assert(worker.includes('live-prerequisites-v151'));
 });
}
test('French negation is introduced before early distractors, then pas de before L4 and again before L8',()=>{
 const f=fixture('francais'),api=f.w.A1LessonFoundations;
 const text=n=>{const el=f.w.document.createElement('div');el.innerHTML=api.render('fr',n);return el.textContent;};
 assert(text(1).includes('Ne … pas'));for(const n of [4,8])assert.match(text(n),/Il n’y a pas de/);assert(text(4).includes('Nach être bleibt der Artikel'));assert(text(8).includes('aus un/une/des wird de'));
 for(const [n,words]of [[3,['tu as','avril','mai']],[6,['nous prenons','vous prenez']],[13,['Il va y avoir','vert/verte/verts/vertes']],[16,['nous voulons']],[19,['un prix → des prix']],[22,['pris','fait','Elles sont arrivées']]])for(const word of words)assert(text(n).includes(word),`L${n}: ${word}`);
 f.dom.window.close();
});
test('German prerequisites explicitly show early haben, wish forms, irregular reading, transport and instructions',()=>{
 const f=fixture('deutsch'),text=n=>f.w.A1LessonFoundations.render('de',n);
 for(const[n,words]of [[1,['ihr habt','du sprichst','wir sind']],[4,['keine Zeit','nicht']],[6,['wir hätten','du möchtest','bezahlen']],[8,['keinen Balkon','Mit zwei Zimmern']],[9,['Nimm','fährt','mit dem Bus']],[11,['du liest','seit drei Monaten']],[16,['ich darf','Nicht dürfen']],[23,['mich anmelden','Füllen Sie']]])for(const word of words)assert(text(n).includes(word),`L${n}: ${word}`);
 f.dom.window.close();
});
test('every new German explanation in the French course has English display text without translating target forms',()=>{
 const f=fixture('francais');f.w.eval(read('francais/en.js'));
 for(const facts of Object.values(f.w.A1LessonFoundations.content.fr))for(const [title,rule,forms,enTitle,enRule]of facts){assert(enTitle&&enRule);assert.equal(f.w.FR_A1_EN[title],enTitle);assert.equal(f.w.FR_A1_EN[rule],enRule);assert(forms);}
 const panel=f.w.document.createElement('div');panel.innerHTML=f.w.A1LessonFoundations.render('fr',8);assert(panel.querySelector('[lang="fr"][data-i18n-ignore]'));f.dom.window.close();
});
test('simplified German audio and writing avoid untaught past tense, preserve facts and archive previous versions',()=>{
 const dom=new JSDOM('',{runScripts:'outside-only'}),w=dom.window;w.eval(read('deutsch/hard-mode-content.js'));
 for(const id of [7,8,13,18,21]){
  const current=w.DE_A1_HARD_CONTENT[id],old=w.DE_A1_HARD_VERSIONS[2][id];assert.equal(current.version,3);assert.equal(old.version,2);assert(current.compatibleVersions.includes(2));
  assert.deepEqual(current.gaps,old.gaps);assert.deepEqual(current.listening.map(b=>b.questions),old.listening.map(b=>b.questions));
  assert.notEqual(JSON.stringify(current.listening),JSON.stringify(old.listening));
  for(const block of current.listening){assert.equal(block.text.replace(/^A: |\n[A-Z]: /g,' ').trim(),block.turns.map(t=>t.text).join(' '));assert(!/\b(?:gefunden|reserviert|gekauft)\b/.test(block.text));}
 }
 assert(!w.DE_A1_HARD_CONTENT[7].writing.model.includes('gesehen'));assert(w.DE_A1_HARD_VERSIONS[2][7].writing.model.includes('gesehen'));dom.window.close();
});
test('changed German recordings migrate running drafts, but submitted work and previous bests keep their original data',()=>{
 const f=fixture('deutsch'),{w,view}=f;w.eval(read('deutsch/hard-mode-content.js'));w.eval(read('deutsch/hard-mode.js'));
 const original=w.DE_A1_HARD_VERSIONS[2][7],count=original.listening.flatMap(b=>b.questions).length;
 for(const phase of ['running','submitted']){
  const attempt={version:2,phase,page:phase==='running'?1:2,gaps:original.gaps.map(g=>g.answers[0]),listening:Array(count).fill('réponse'),plays:[1,2],text:original.writing.model,ratings:[null,null,null,null],startedAt:10,...(phase==='submitted'?{submittedAt:20}:{})},snapshot=JSON.stringify(attempt);
  const progress={attempt,bestObjective:95,bestByVersion:{2:95},passedAt:1,passedVersion:2},state={lessonMasteryBest:{7:88},lessonWork:{7:{hardMode:progress}}};
  w.DE_A1_HARD_MODE.render({lesson:f.lessons[6],view,state,save(){},onBack(){}});
  assert.equal(progress.bestByVersion[2],95);assert.equal(progress.bestObjective,95);assert.equal(progress.passedVersion,2);assert.equal(state.lessonMasteryBest[7],88);
  if(phase==='running'){
   assert.equal(progress.attempt.version,3);assert.equal(JSON.stringify(progress.history[0]),snapshot);assert.deepEqual([...progress.attempt.plays],[1,0]);assert.equal(progress.attempt.text,original.writing.model);assert.equal(progress.contentVersions[2].version,2);
  }else{
   assert.equal(progress.attempt.version,2);assert.equal(progress.attempt.text,original.writing.model);assert(view.querySelector('#hardWriting').readOnly);assert(view.textContent.includes('gesehen'));
  }
 }
 f.dom.window.close();
});
