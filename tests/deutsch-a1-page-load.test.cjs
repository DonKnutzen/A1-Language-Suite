const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
// Page load of the German deepening as learners see it (deutsch/VERTIEFUNG-SEITENLAST.md): each topic
// is shown in short parts (explanation + its check, each note + its check, then the mini-test) and
// nothing is folded. Before the check of a part: at most 100 words in lessons 1–3 and 120 later, one
// table and six example rows; word series such as weekdays or months are one grid, not example rows.
const LIMITS={early:100,later:120,tables:1,examples:6};
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
// Words a learner reads in the shown part before its check (or the mini-test) starts.
function measure(page,w){
 const start=[...page.querySelectorAll('.page-check button,#topicPracticeStart')].find(b=>visible(b,page));
 const before=el=>!start||!!(el.compareDocumentPosition(start)&w.Node.DOCUMENT_POSITION_FOLLOWING);
 const walker=w.document.createTreeWalker(page,w.NodeFilter.SHOW_TEXT);let words=0,n;
 while((n=walker.nextNode())){if(!before(n))break;if(visible(n,page)&&!n.parentElement.closest('button'))words+=countWords(n.textContent);}
 const open=sel=>[...page.querySelectorAll(sel)].filter(el=>visible(el,page)&&before(el));
 return {words,tables:open('table').length,examples:open('.phrase-row,.lesson-foundation-example,.pronoun-example').filter(el=>!el.closest('.deepening-vocabulary')).length};
}
test('every German deepening topic is split into short, open parts that end in a check',()=>{
 const env=environment(),{w,view}=env,problems=[],lessons=new Set();let pages=0,parts=0;
 for(let id=1;id<=24;id++){
  render(env,id);view.querySelector('[data-lesson-step="grammar"]').click();
  for(let topic=1;;topic++){
   const page=view.querySelector('#lessonGrammarPage');w.DE_A1_DEEPENING_TIDY.tidy(page);
   const where=`L${id} T${topic}`,count=Number(page.dataset.deepeningParts);pages++;lessons.add(id);
   if(page.querySelector('details'))problems.push(`${where}: folded block`);
   if(!page.querySelector('#topicPracticeStart'))problems.push(`${where}: no practice button`);
   if(page.innerHTML.includes('**'))problems.push(`${where}: unrendered ** in HTML`);
   for(let part=0;part<count;part++){
    if(part)view.querySelector('#nextGrammarPart').click();parts++;
    const m=measure(page,w),limit=id<=3?LIMITS.early:LIMITS.later,at=`${where} P${part+1}`;
    const shown=[...page.querySelectorAll('[data-deepening-part]')].filter(b=>!b.hidden);
    if(!shown.length)problems.push(`${at}: empty part`);
    if(shown.some(b=>Number(b.dataset.deepeningPart)!==part))problems.push(`${at}: blocks of another part are visible`);
    // The word list is its own part: a list to look up, not reading before an exercise.
    const wordList=shown.every(b=>b.matches('.lesson-vocabulary-preparation')||b.querySelector('.lesson-vocabulary-preparation'));
    if(wordList){if(part)problems.push(`${at}: word list after the explanation`);continue;}
    // Listen-and-repeat pronunciation may stand without a check; every explanation has one.
    if(part<count-1&&!shown.some(b=>b.matches('.page-check,.lesson-pronunciation-bonus')||b.querySelector('.page-check')))problems.push(`${at}: part without its check`);
    if(m.words>limit)problems.push(`${at}: ${m.words} words before its check (max ${limit})`);
    if(m.tables>LIMITS.tables)problems.push(`${at}: ${m.tables} tables before its check`);
    if(m.examples>LIMITS.examples)problems.push(`${at}: ${m.examples} example rows before its check`);
   }
   if(view.querySelector('#nextGrammarPart'))problems.push(`${where}: continue button on the last part`);
   if(count>1&&!page.querySelector('#topicPracticeStart')?.closest('[data-deepening-part]:not([hidden])'))problems.push(`${where}: mini-test not in the last part`);
   const next=view.querySelector('#nextGrammarTopic');if(!next)break;next.click();
  }
 }
 assert.equal(lessons.size,24,'all 24 lessons measured');assert(pages>=48,`only ${pages} pages measured`);assert(parts>pages);
 assert.deepEqual(problems,[]);
});
test('back and continue move between the parts of a topic, then to the neighbouring topic',()=>{
 const env=environment(),{view}=env;render(env,1);view.querySelector('[data-lesson-step="grammar"]').click();
 view.querySelector('[data-grammar-progress="1"]').click();
 const page=()=>view.querySelector('#lessonGrammarPage'),count=Number(page().dataset.deepeningParts);
 assert(count>=3);assert.equal(page().querySelector('.deepening-part-label').textContent,`Partie 1 sur ${count}`);
 view.querySelector('#nextGrammarPart').click();assert.equal(page().dataset.deepeningPart,'1');
 view.querySelector('#previousGrammarPart').click();assert.equal(page().dataset.deepeningPart,'0');
 view.querySelector('#previousGrammarTopic').click();
 assert.equal(view.querySelector('[data-grammar-progress="0"]').getAttribute('aria-current'),'step');
 assert.equal(page().dataset.deepeningPart,String(Number(page().dataset.deepeningParts)-1),'back from a topic opens the last part of the previous one');
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
 assert(repeats<rows/3,`${repeats} of ${rows} examples repeat listening`);
});
