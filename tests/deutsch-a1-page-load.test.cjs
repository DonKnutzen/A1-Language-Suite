const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
// Page load of the German deepening as learners see it (deutsch/VERTIEFUNG-SEITENLAST.md): like the
// French course, each topic is one open page (rule, table, examples, "Bon à savoir", exercise words)
// that ends in one practice block. No folds, no short checks in between, no sub-pages.
const LIMITS={words:280,tables:1,examples:8,exercises:16};
function environment(){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/deutsch/',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window;
 w.scrollTo=()=>{};w.ResizeObserver=class{observe(){}disconnect(){}};w.Math.random=()=>.99;
 w.A1Learning={shuffle:a=>[...a],countWords:s=>s.trim().split(/\s+/).filter(Boolean).length,wireRecorder:()=>{}};
 for(const f of ['deutsch/lesson-content.js','shared/lesson-guide.js','shared/lesson-topic-info.js','shared/grammar-ui.js','shared/pronunciation.js','shared/exercise-review.js','deutsch/pronouns.js','deutsch/answer-audio.js','shared/exercise-engine.js','deutsch/grammar-drills.js','deutsch/deepening-content.js','deutsch/question-content.js','deutsch/applications.js','deutsch/study.js','deutsch/deepening-tidy.js','deutsch/page-checks.js','deutsch/assessments.js','deutsch/pronunciation.js','deutsch/comprehension-content.js','shared/comprehension.js','shared/lesson-vocabulary-plan.js','shared/lesson-foundations.js','deutsch/lesson-flow.js','shared/lesson-lexicon.js','shared/vocabulary-content.js','shared/vocabulary-trainer.js'])w.eval(read(f));
 const app=read('deutsch/app.js');w.eval(app.slice(0,app.indexOf('const stateKey'))+';window.testData={lessons,grammarSets,formTasks};');
 w.eval(app.slice(app.indexOf('const GRAMMAR_GUIDES='),app.indexOf('function renderGrammarIntro('))+'window.testRefs=lessonGrammarReferenceHtml;');
 w.DE_A1_ASSESSMENTS.configure({...w.testData,practiceProgress:{recordGrammar:()=>{}}});
 return {w,view:w.document.getElementById('view')};
}
function render({w,view},id){
 const l=w.testData.lessons[id-1],app=w.DE_A1_APPLICATIONS[id],original=w.A1_COURSE_CONTENT[id-1],c={...original,transfer:{...original.transfer,writing:app.writingTask||original.transfer.writing}},speakBtn=t=>`<button data-speak="${t}">🔊</button>`;
 w.A1LessonFlow.render({lesson:l,content:c,view,state:{doneLessons:[],lessonWork:{},lessonQuizBest:{}},save:()=>{},lessonCount:24,targetLang:'de',uiLang:'fr',grammarHtml:w.DE_A1_STUDY.grammarHtml(l,w.testRefs(id),speakBtn),goalsHtml:'',pronunciationHtml:w.DE_A1_PRONUNCIATION.render(c),dialogueHtml:w.A1LessonGuide.parts(id,'fr',s=>s,()=>'<button>🔊</button>').dialogue,model:app.speakModel,writingModel:app.writeModel,writingHints:app.hints,writingFields:app.fields,minWords:app.minWords,recorderHtml:()=>'',speakBtn,wireSpeakButtons:()=>{},wirePronunciation:()=>{},speak:()=>{},renderLearn:()=>{},renderLesson:()=>{},renderMastery:()=>{},renderGrammarCheck:()=>{}});
}
const countWords=t=>(t.match(/[\p{L}\p{N}][\p{L}\p{N}’'\-]*/gu)||[]).length;
// Text inside a closed <details> (other than its summary) is not visible.
function visible(node,page){
 for(let el=node.nodeType===1?node:node.parentElement;el&&el!==page.parentElement;el=el.parentElement){
  if(el.hidden)return false;
  if(el.parentElement?.tagName==='DETAILS'&&!el.parentElement.open&&el.tagName!=='SUMMARY')return false;
 }
 return true;
}
// Words a learner reads before the practice starts.
function measure(page,w){
 const start=page.querySelector('#topicPracticeStart');
 const before=el=>!start||!!(el.compareDocumentPosition(start)&w.Node.DOCUMENT_POSITION_FOLLOWING);
 const walker=w.document.createTreeWalker(page,w.NodeFilter.SHOW_TEXT);let words=0,n;
 while((n=walker.nextNode())){if(!before(n))break;if(visible(n,page)&&!n.parentElement.closest('button'))words+=countWords(n.textContent);}
 const open=sel=>[...page.querySelectorAll(sel)].filter(el=>visible(el,page)&&before(el));
 return {words,tables:open('table').length,examples:open('.phrase-row,.lesson-foundation-example,.pronoun-example').filter(el=>!el.closest('.deepening-vocabulary')).length};
}
test('every German deepening topic is one open page that ends in one practice block',()=>{
 const env=environment(),{w,view}=env,problems=[],lessons=new Set();let pages=0;
 for(let id=1;id<=24;id++){
  render(env,id);view.querySelector('[data-lesson-step="grammar"]').click();
  for(let topic=1;;topic++){
   const page=view.querySelector('#lessonGrammarPage');w.DE_A1_DEEPENING_TIDY.tidy(page);
   const where=`L${id} T${topic}`;pages++;lessons.add(id);
   if(page.querySelector('details'))problems.push(`${where}: folded block`);
   if(page.querySelector('.page-check'))problems.push(`${where}: short check inside the page`);
   if(page.querySelector('[hidden]:not(.exercise-start-btn)')||view.querySelector('#nextGrammarPart,#previousGrammarPart'))problems.push(`${where}: hidden sub-page`);
   if(page.querySelector('.deepening-reference'))problems.push(`${where}: reference box`);
   if(page.innerHTML.includes('**'))problems.push(`${where}: unrendered ** in HTML`);
   const practices=page.querySelectorAll('.deepening-practice');
   if(practices.length!==1||!page.querySelector('#topicPracticeStart'))problems.push(`${where}: ${practices.length} practice blocks`);
   else if(page.lastElementChild!==practices[0])problems.push(`${where}: content after the practice`);
   const exercises=Number(practices[0]?.querySelector('small')?.textContent.match(/\d+/)?.[0]);
   if(!(exercises>=8&&exercises<=LIMITS.exercises))problems.push(`${where}: ${exercises} exercises`);
   const m=measure(page,w);
   if(m.words>LIMITS.words)problems.push(`${where}: ${m.words} words before the practice (max ${LIMITS.words})`);
   if(m.tables>LIMITS.tables)problems.push(`${where}: ${m.tables} tables`);
   if(m.examples>LIMITS.examples)problems.push(`${where}: ${m.examples} example rows`);
   const notes=page.querySelectorAll('.deepening-notes');if(notes.length>1)problems.push(`${where}: ${notes.length} note groups`);
   const next=view.querySelector('#nextGrammarTopic');if(!next)break;next.click();
  }
 }
 assert.equal(lessons.size,24,'all 24 lessons measured');assert(pages>=48,`only ${pages} pages measured`);
 assert.deepEqual(problems,[]);
});
test('the former short checks are part of the topic practice',()=>{
 const env=environment(),{w,view}=env;render(env,2);view.querySelector('[data-lesson-step="grammar"]').click();
 view.querySelector('[data-grammar-progress="1"]').click();
 const key=w.DE_A1_STUDY.content[2][1].key,inline=Object.values(w.DE_A1_PAGE_CHECKS.inline(2,key)).flat();
 assert(inline.length>=3);
 const count=Number(view.querySelector('#lessonGrammarPage .deepening-practice small').textContent.match(/\d+/)[0]);
 assert(count>=inline.length+4,`${count} exercises`);
 assert.equal(view.querySelector('#previousGrammarTopic')?.textContent,'← Retour');
 view.querySelector('#previousGrammarTopic').click();
 assert.equal(view.querySelector('[data-grammar-progress="0"]').getAttribute('aria-current'),'step');
});
test('deepening examples do not repeat the sentences of the listening step',()=>{
 const env=environment(),{view,w}=env;let repeats=0,rows=0;
 for(let id=1;id<=24;id++){
  const heard=new Set(w.testData.lessons[id-1].phrases.map(p=>p[0]));render(env,id);view.querySelector('[data-lesson-step="grammar"]').click();
  const count=view.querySelectorAll('[data-grammar-progress]').length;
  for(let topic=0;topic<count;topic++){
   if(topic)view.querySelector(`[data-grammar-progress="${topic}"]`).click();
   for(const list of view.querySelectorAll('#lessonGrammarPage .deepening-examples,#lessonGrammarPage .deepening-background,#lessonGrammarPage .lesson-foundation-examples')){
    const texts=[...list.querySelectorAll('.phrase-row strong,.lesson-foundation-example strong')].map(e=>e.textContent.trim()),again=texts.filter(t=>heard.has(t));
    rows+=texts.length;repeats+=again.length;
    // A list keeps a heard sentence only so that a rule is not left without any example.
    if(again.length)assert(texts.length<=2&&!list.matches('.deepening-background'),`L${id}: repeated ${again.join(' / ')}`);
   }
  }
 }
 assert(rows>100&&repeats<rows*.6,`${repeats} of ${rows} examples repeat listening`);
});
