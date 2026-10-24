const fs=require('node:fs'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(p,'utf8');
function fixture(course){
 const dom=new JSDOM('<main id="view"></main>',{url:`https://example.org/${course}/`,runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window;
 const NativeObserver=w.MutationObserver,observers=[],close=w.close.bind(w);w.MutationObserver=class extends NativeObserver{constructor(fn){super(fn);observers.push(this);}};w.close=()=>{observers.forEach(o=>o.disconnect());close();};
 w.Math.random=()=>.99;w.scrollTo=()=>{};w.ResizeObserver=class{observe(){}disconnect(){}};w.esc=x=>String(x);w.A1Profile={getUiLang:()=>course==='francais'?'de':'fr'};
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

module.exports={fixture};
