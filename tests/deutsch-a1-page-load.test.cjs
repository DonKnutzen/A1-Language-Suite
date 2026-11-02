const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
// Page load of the German deepening as learners see it: a short read, then the first exercise.
// Targets (deutsch/VERTIEFUNG-SEITENLAST.md): before "Commencer le mini-test" at most ~80 words
// in lessons 1–3 (limit 90) and 120 words later, one open table and six open example rows;
// word series such as weekdays or months are one grid and are not counted as example rows.
const LIMITS={early:90,later:120,tables:1,examples:6};
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
function measure(page,w){
 const start=page.querySelector('.page-check button,#topicPracticeStart'),before=el=>!!(el.compareDocumentPosition(start)&w.Node.DOCUMENT_POSITION_FOLLOWING);
 const walker=w.document.createTreeWalker(page,w.NodeFilter.SHOW_TEXT);let words=0,n;
 while((n=walker.nextNode())){if(!before(n))break;if(visible(n,page)&&!n.parentElement.closest('button'))words+=countWords(n.textContent);}
 const open=sel=>[...page.querySelectorAll(sel)].filter(el=>visible(el,page)&&before(el));
 return {words,tables:open('table').length,examples:open('.phrase-row,.lesson-foundation-example,.pronoun-example').filter(el=>!el.closest('.deepening-vocabulary')).length};
}
test('every German deepening page reaches its first exercise after a short read',()=>{
 const env=environment(),{w,view}=env,problems=[],lessons=new Set();let pages=0;
 for(let id=1;id<=24;id++){
  render(env,id);view.querySelector('[data-lesson-step="grammar"]').click();
  for(let topic=1;;topic++){
   const page=view.querySelector('#lessonGrammarPage');w.DE_A1_DEEPENING_TIDY.tidy(page);
   const where=`L${id} T${topic}`;
   if(!page.querySelector('#topicPracticeStart'))problems.push(`${where}: no practice button`);
   else{
    const m=measure(page,w),limit=id<=3?LIMITS.early:LIMITS.later;pages++;lessons.add(id);
    if(m.words>limit)problems.push(`${where}: ${m.words} words before practice (max ${limit})`);
    if(m.tables>LIMITS.tables)problems.push(`${where}: ${m.tables} open tables before practice`);
    if(m.examples>LIMITS.examples)problems.push(`${where}: ${m.examples} open example rows before practice`);
   }
   for(const detail of page.querySelectorAll('details.deepening-more')){
    const summary=detail.querySelector(':scope>summary');
    if(detail.open||!summary?.textContent.trim()||!countWords([...detail.childNodes].filter(c=>c!==summary).map(c=>c.textContent).join(' ')))problems.push(`${where}: empty or open folded block "${summary?.textContent.trim()}"`);
   }
   if(page.innerHTML.includes('**'))problems.push(`${where}: unrendered ** in HTML`);
   const next=view.querySelector('#nextGrammarTopic');if(!next)break;next.click();
  }
 }
 assert.equal(lessons.size,24,'all 24 lessons measured');assert(pages>=48,`only ${pages} pages measured`);
 assert.deepEqual(problems,[]);
});
