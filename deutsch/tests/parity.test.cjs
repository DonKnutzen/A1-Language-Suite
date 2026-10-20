const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'../..',p),'utf8');
function environment(state={doneLessons:[],lessonWork:{},lessonQuizBest:{},lessonMasteryBest:{}}){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/deutsch/',runScripts:'outside-only'}),w=dom.window;let saves=0,completed=0,audio;
 w.scrollTo=()=>{};w.ResizeObserver=class{observe(){}disconnect(){}};w.A1Profile={getUiLang:()=> 'fr'};
 w.A1Voice={speak(){},cancel(){},speakDialogue(turns,options){audio={turns,options};return true;}};w.speechSynthesis={};w.SpeechSynthesisUtterance=class{};
 for(const f of ['shared/learning.js','deutsch/lesson-content.js','shared/lesson-guide.js','shared/grammar-ui.js','shared/lesson-topic-info.js','shared/pronunciation.js','shared/exercise-review.js','deutsch/pronouns.js','deutsch/answer-audio.js','shared/exercise-engine.js','deutsch/grammar-drills.js','deutsch/deepening-content.js','deutsch/applications.js','deutsch/study.js','deutsch/assessments.js','deutsch/comprehension-content.js','shared/comprehension.js','deutsch/hard-mode-content.js','deutsch/hard-mode.js','deutsch/review-practice.js','deutsch/lesson-flow.js'])w.eval(read(f));
 const app=read('deutsch/app.js');w.eval(app.slice(0,app.indexOf('const stateKey'))+'window.testData={lessons,grammarSets};');
 w.eval(app.slice(app.indexOf('const GRAMMAR_GUIDES='),app.indexOf('function renderGrammarIntro('))+'window.testRefs=lessonGrammarReferenceHtml;');
 w.DE_A1_ASSESSMENTS.configure(w.testData);const view=w.document.querySelector('main'),save=done=>{saves++;if(done)completed++;};
 const grammarHtml=l=>w.DE_A1_STUDY.grammarHtml(l,w.testRefs(l.id),()=> '');
 const hard=id=>w.DE_A1_HARD_MODE.render({lesson:w.testData.lessons[id-1],view,state,save,onBack(){}});
 const review=options=>w.DE_A1_REVIEW.render({view,lessons:w.testData.lessons,state,save,onBack(){},speak(){},grammarHtml,...options});
 const click=s=>{assert(view.querySelector(s),s);view.querySelector(s).click();};
 const input=(s,v)=>{const el=view.querySelector(s);assert(el,s);el.value=v;el.dispatchEvent(new w.Event('input',{bubbles:true}));};
 return {dom,w,state,view,save,hard,review,grammarHtml,click,input,get audio(){return audio;},get saves(){return saves;},get completed(){return completed;}};
}
test('all 24 German hard modes have valid gaps, explicit voice roles, complete models and independent snapshots',()=>{
 const e=environment();assert.equal(Object.keys(e.w.DE_A1_HARD_CONTENT).length,24);
 for(let id=1;id<=24;id++){
  const d=e.w.DE_A1_HARD_CONTENT[id];assert.equal(d.version,2);assert(d.gaps.length>=8);assert.equal((d.text.match(/\{\{\d+\}\}/g)||[]).length,d.gaps.length);assert.equal(d.listening.length,2);assert.equal(d.writing.points.length,3);assert(e.w.DE_A1_HARD_MODE.words(d.writing.model)>=d.writing.minWords,`model L${id}`);
  for(const [i,g]of d.gaps.entries()){assert(d.text.includes('{{'+i+'}}'));assert(g.answers.every(Boolean));assert(g.hint);assert(e.w.DE_A1_HARD_MODE.matches(g.answers[0],g.answers,g));}
  for(const b of d.listening){assert(b.turns.length>0);assert(b.questions.length>=3);assert(b.turns.every(t=>['male','female'].includes(t.gender)));for(const q of b.questions){assert(q.answers.length);if(q.options)assert.equal(q.options.filter(o=>q.answers.includes(o)).length,1);assert(e.w.DE_A1_HARD_MODE.matches(q.answers[0],q.answers,q));}}
 }e.dom.window.close();
});
test('every German hard mode unlocks only at 80, submits, freezes, self-assesses and preserves best results',()=>{
 const e=environment();
 for(let id=1;id<=24;id++){
  const d=e.w.DE_A1_HARD_CONTENT[id];e.state.lessonMasteryBest[id]=79;e.hard(id);assert(!e.view.querySelector('#hardBegin'));
  e.state.lessonMasteryBest[id]=80;e.hard(id);e.click('#hardBegin');
  d.gaps.forEach((g,i)=>e.input(`[data-hard-gap="${i}"]`,g.answers[0]));e.click('[data-hard-page="1"]');
  for(const [i,q]of d.listening.flatMap(b=>b.questions).entries()){
   const inputs=[...e.view.querySelectorAll(`[data-hard-listen="${i}"]`)];if(inputs[0].type==='radio'){const el=inputs.find(el=>el.value===q.answers[0]);el.checked=true;el.dispatchEvent(new e.w.Event('change',{bubbles:true}));}else e.input(`[data-hard-listen="${i}"]`,q.answers[0]);
  }
  e.click('[data-hard-page="2"]');e.input('#hardWriting',d.writing.model);e.click('#hardSubmit');assert(!e.view.querySelector('.hard-transcript'));e.click('#hardConfirmSubmit');assert(e.view.querySelector('#hardWriting').readOnly);assert(!e.view.querySelector('[data-hard-char]'));
  for(const select of e.view.querySelectorAll('[data-hard-rating]')){select.value='2';select.dispatchEvent(new e.w.Event('change',{bubbles:true}));}e.click('#hardComplete');
  const p=e.state.lessonWork[id].hardMode;assert(p.attempt.result.passed,`L${id}`);assert.equal(p.bestObjective,100);assert(p.passedAt);assert.equal(e.state.lessonMasteryBest[id],80);
 }e.dom.window.close();
});
test('German spelling is strict for grammar, phone formats and clock variants stay fair',()=>{
 const e=environment(),m=e.w.DE_A1_HARD_MODE.matches;assert(m('schön',['schön']));assert(!m('schon',['schön']));assert(!m('konnen',['können']));assert(m(' +49 30 21 34 56 ',['030 21 34 56'],{format:'phone'}));assert(!m('030 21 34 567',['030 21 34 56'],{format:'phone'}));assert(m('um 16.30 Uhr',['16:30'],{format:'time'}));assert(m('16 Uhr 30',['16:30'],{format:'time'}));assert(m('16h30',['16:30'],{format:'time'}));assert(!m('25:10',['01:10'],{format:'time'}));assert(m('20,00 €',['20'],{format:'money'}));assert(!m('200 €',['20'],{format:'money'}));e.dom.window.close();
});
test('German hard listening is paced at 75%, allows three plays and refunds playback errors exactly once',()=>{
 const e=environment({doneLessons:[],lessonWork:{},lessonQuizBest:{},lessonMasteryBest:{1:80}});e.hard(1);e.click('#hardBegin');e.click('[data-hard-page="1"]');
 e.click('[data-hard-play="0"]');assert.equal(e.audio.options.lang,'de-DE');assert.equal(e.audio.options.rate,.75);e.audio.options.onError();e.audio.options.onError();assert.equal(e.state.lessonWork[1].hardMode.attempt.plays[0],0);
 for(let n=0;n<3;n++){e.click('[data-hard-play="0"]');e.audio.options.onEnd();}assert(e.view.querySelector('[data-hard-play="0"]').disabled);
 const s=JSON.parse(JSON.stringify(e.state));e.dom.window.close();const r=environment(s);r.hard(1);assert(r.view.querySelector('[data-hard-play="0"]').disabled);r.dom.window.close();
});
test('German review uses concrete topics only, all distinct taught forms, and only completed lessons',()=>{
 const e=environment();assert.equal(e.w.DE_A1_REVIEW.buildBank(e.w.testData.lessons,e.state,e.grammarHtml).length,0);
 for(let id=1;id<=24;id++){
  e.state.doneLessons=[id];const bank=e.w.DE_A1_REVIEW.buildBank(e.w.testData.lessons,e.state,e.grammarHtml);assert(bank.length>0,`L${id}`);assert(bank.every(t=>t.lessonId===id&&t.topic.startsWith('grammar:')&&!t.speech&&!t.turns));
  for(const q of bank)assert(e.w.DE_A1_REVIEW.accepted(q,q.answer));const round=e.w.DE_A1_REVIEW.choose(bank,20);assert(round.length>0&&round.length<=20);
  for(const u of e.w.DE_A1_STUDY.content[id]){const tasks=e.w.DE_A1_STUDY.unitTasks(u);for(const [marked]of u.rows){const answer=marked.match(/\|([^|]+)\|/)[1];assert(tasks.some(t=>t.answer===answer),`${id}: ${answer}`);}}
 }e.dom.window.close();
});
test('German mistake memory, settings, frozen responses and draft position survive reopening',()=>{
 const e=environment({doneLessons:[1],lessonWork:{},lessonMasteryBest:{1:88},lessonQuizBest:{}}),api=e.w.DE_A1_REVIEW,q=api.task(1,'grammar:sein','sein',{q:'Ich ___ zu Hause.',o:['bin','bist','ist'],answer:'bin'});
 api.record(e.state,q,false);e.review({initialMode:'mistakes'});e.click('#reviewStart');e.click(`[data-review-option="${e.state.reviewPractice.session.order.indexOf('bin')}"]`);assert(e.view.querySelector('#reviewNext'));assert.equal(api.pending(e.state).length,1);
 const s=JSON.parse(JSON.stringify(e.state));e.dom.window.close();const r=environment(s);r.review({initialMode:'mistakes'});r.click('#reviewResume');assert(r.view.querySelector('#reviewNext'));assert(r.view.querySelector('[data-review-option]').disabled);r.click('#reviewNext');assert.equal(r.state.lessonMasteryBest[1],88);
 r.click('#reviewSetup');r.click('#reviewStart');r.click(`[data-review-option="${r.state.reviewPractice.session.order.indexOf('bin')}"]`);r.click('#reviewNext');assert.equal(r.w.DE_A1_REVIEW.pending(r.state).length,0);r.dom.window.close();
});
test('German assessment records wrong answers once and preserves ordinary check progress',()=>{
 const e=environment();e.w.DE_A1_ASSESSMENTS.renderLessonTest({lesson:e.w.testData.lessons[0],view:e.view,state:e.state,save:e.save,speak(){},onBack(){}});e.click('#masteryStart');
 const s=e.state.lessonCheckProgress[1].session,q=s.ex[s.i];if(q.type==='gap'){e.input('#mixedInput','falsch');e.click('#mixedCheck');}else e.click(`[data-o="${q.o.findIndex(o=>o!==q.answer)}"]`);
 assert.equal(e.w.DE_A1_REVIEW.pending(e.state).length,1);const n=e.w.DE_A1_REVIEW.pending(e.state)[0].wrong;
 e.w.DE_A1_ASSESSMENTS.renderLessonTest({lesson:e.w.testData.lessons[0],view:e.view,state:e.state,save:e.save,speak(){},onBack(){}});e.click('#masteryStart');assert.equal(e.w.DE_A1_REVIEW.pending(e.state)[0].wrong,n);e.dom.window.close();
});
