const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(p,'utf8');
function fixture(){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org',runScripts:'outside-only'}),w=dom.window;w.scrollTo=()=>{};w.A1Profile={getUiLang:()=> 'de'};
 for(const f of ['francais/data.js','francais/mastery-specs.js','francais/mastery.js','shared/exercise-engine.js','shared/grammar-ui.js','shared/lesson-topic-info.js','francais/deepening-content.js','francais/grammar-practice.js','francais/deepening.js'])w.eval(read(f));
 w.esc=s=>s;const app=read('francais/app.js');w.eval(app.slice(app.indexOf('const GRAMMAR_GUIDES='),app.indexOf('function renderGrammarIntro('))+'window.grammarHtml=lessonGrammarHtml;');
 const pools=l=>w.FR_A1_DEEPENING.pools(l,w.FR_A1_DEEPENING.enrich(l,w.grammarHtml(l)));return {dom,w,pools};
}
test('every French grammar topic uses complete solutions and targeted contrasts, with no generic translation fallback',()=>{
 const e=fixture();let topics=0,generated=0;
 for(const l of e.w.FR_A1_DATA.lessons.filter(l=>l.id>1))for(const p of e.pools(l)){
  topics++;assert(p.tasks.length>=3,`L${l.id} ${p.key}: empty coverage`);
  for(const q of p.tasks){assert.equal(q.kind,'form');assert(q.o.includes(q.answer));assert.equal(new Set(q.o).size,q.o.length);if(q.coverage?.startsWith('phrase:'))assert(!/^Wie sagst du „|^Was bedeutet „/.test(q.q));
   if(q.coverage?.startsWith('phrase:')){generated++;if(q.q.includes('___'))assert.equal(q.q.replace('___',q.answer),q.audio,`L${l.id}: ${q.q}`);assert(q.meaning);}
  }
 }
 assert(topics>=70);assert(generated>=150);e.dom.window.close();
});
test('reported lesson-seven tasks compare quantities, cents, price degree and card-payment grammar',()=>{
 const e=fixture(),p=e.pools(e.w.FR_A1_DATA.lessons[6]),quantity=p.find(x=>x.key==='r0'),price=p.find(x=>x.key==='r1');assert.equal(quantity.tasks.length,9);assert.equal(price.tasks.length,7);
 const tomatoes=quantity.tasks.find(q=>q.q==='Bestelle 500 Gramm Tomaten.');assert.equal(tomatoes.answer,'cinq cents grammes de tomates');assert(tomatoes.o.every(o=>o.includes('grammes de')));
 const degree=price.tasks.find(q=>q.q==='C’est ___ cher.');assert.deepEqual(Array.from(degree.o),['trop','très','peu']);const cents=price.tasks.find(q=>q.q==='Ça coûte dix-neuf euros ___.');assert(cents.o.every(o=>!/[0-9]/.test(o)));
 const quiz=e.w.FR_A1_DATA.lessons[6].quiz,size=quiz.find(q=>q.legacyQuestion?.includes('Größe 40'));assert(size.q.includes('quarante'));assert(!/\d/.test(size.q));assert.equal(size.o[size.a],'40');
 const gap=quiz.find(q=>q.legacyQuestion?.includes('ein Kilo Äpfel'));assert.equal(gap.q,'Je voudrais un kilo ___ pommes.');assert.equal(gap.o[gap.a],'de');e.dom.window.close();
});
test('open legacy intro and inline grammar drafts update while graded answers and points stay intact',()=>{
 const e=fixture(),w=e.w,l=w.FR_A1_DATA.lessons[6],view=w.document.querySelector('main'),quiz=w.FR_A1_DATA.lessons[6].quiz;
 const old={type:'choice',q:'Wie sagst du „Haben Sie Größe 40“ auf Französisch?',o:['Vous avez une taille 40 ?','Vous avez une taille 42 ?','Vous avez une taille 30 ?'],a:0,answer:'Vous avez une taille 40 ?',audio:'Vous avez une taille 40 ?'};
 const progress={session:{version:97,ex:[{...old},old],i:1,score:1,response:null}};w.A1ExerciseEngine.run({lesson:l,view,exercises:[],progress,exerciseVersion:97,answerAudioAfterResponse:true,selectionOnly:true,targetLang:'fr',uiLang:'de',playAudio(){},onBack(){},onFinish(){}});assert.equal(progress.session.score,1);assert.equal(progress.session.ex[0].q,old.q);assert(progress.session.ex[1].q.includes('quarante'));assert.equal(progress.session.ex[1].answer,'40');
 const html=w.FR_A1_DEEPENING.enrich(l,w.grammarHtml(l)),oldTask={kind:'vocabulary',q:'Was bedeutet „C’est trop cher.“?',answer:'Das ist zu teuer.',o:['Das ist zu teuer.','Ich nehme dieses hier.','Das kostet 19,50 Euro.'],audio:'C’est trop cher.'};
 const state={lessonWork:{7:{deepening:{r1:{best:5,session:{version:1,questions:[oldTask,oldTask],i:1,score:1,mistakes:[],response:null,order:oldTask.o}}}}}};
 view.innerHTML=html;w.FR_A1_DEEPENING.decorate({root:view,lesson:l,grammarHtml:html,state,save(){},speak(){}});view.querySelector('[data-deepening-practice="r1"] .deepening-start').click();const p=state.lessonWork[7].deepening.r1;assert.equal(p.best,5);assert.equal(p.session.score,1);assert.equal(p.session.questions[0].q,oldTask.q);assert.notEqual(p.session.questions[1].q,oldTask.q);assert(p.previousQuestionSession);e.dom.window.close();
});
test('new authored instructions and meanings have English UI equivalents',()=>{
 const e=fixture();for(const f of ['francais/en.js','francais/i18n.js'])e.w.eval(read(f));for(const id of [7,19,21,22])for(const p of e.pools(e.w.FR_A1_DATA.lessons[id-1]))for(const q of p.tasks){if(/^(Welche|Bestelle|Du |Setze)/.test(q.q))assert.notEqual(e.w.A1FrenchI18n.translate(q.q),q.q,q.q);}e.dom.window.close();
});
test('shorter replacement pools avoid repeats and resuming keeps the current answer order',()=>{
 const e=fixture(),w=e.w,l=w.FR_A1_DATA.lessons[6],view=w.document.querySelector('main'),html=w.FR_A1_DEEPENING.enrich(l,w.grammarHtml(l)),oldTask={kind:'vocabulary',q:'Was bedeutet „C’est trop cher.“?',answer:'Das ist zu teuer.',o:['Das ist zu teuer.','Ich nehme dieses hier.','Das kostet 19,50 Euro.'],audio:'C’est trop cher.'};
 const state={lessonWork:{7:{deepening:{r1:{session:{version:1,questions:Array.from({length:10},()=>({...oldTask})),i:0,score:0,mistakes:[],response:null,order:oldTask.o}}}}}};
 const open=()=>{view.innerHTML=html;w.FR_A1_DEEPENING.decorate({root:view,lesson:l,grammarHtml:html,state,save(){},speak(){}});view.querySelector('[data-deepening-practice="r1"] .deepening-start').click();};
 open();const p=state.lessonWork[7].deepening.r1;assert.equal(p.session.questions.length,7);assert.equal(new Set(p.session.questions.map(q=>JSON.stringify([q.q,q.answer,q.meaning]))).size,7);assert.equal(p.previousQuestionSession.questions.length,10);
 p.session.order=Array.from(p.session.questions[0].o).reverse();const order=JSON.stringify(p.session.order);open();assert.equal(JSON.stringify(p.session.order),order);e.dom.window.close();
});
test('legacy recognition replacements do not duplicate form tasks retained later in the round',()=>{
 const e=fixture(),w=e.w,l=w.FR_A1_DATA.lessons[15],view=w.document.querySelector('main'),html=w.FR_A1_DEEPENING.enrich(l,w.grammarHtml(l)),pool=e.pools(l).find(p=>p.tasks.length>=3),retained=pool.tasks[0],oldTask={kind:'vocabulary',q:`Was bedeutet „${retained.audio}“?`,answer:retained.meaning||'Alt',o:['Alt','Andere','Noch eine'],audio:retained.audio};
 const state={lessonWork:{16:{deepening:{[pool.key]:{session:{version:1,questions:[oldTask,...pool.tasks],i:0,score:0,mistakes:[],response:null,order:null}}}}}};
 view.innerHTML=html;w.FR_A1_DEEPENING.decorate({root:view,lesson:l,grammarHtml:html,state,save(){},speak(){}});view.querySelector(`[data-deepening-practice="${pool.key}"] .deepening-start`).click();const session=state.lessonWork[16].deepening[pool.key].session;assert.equal(session.questions.length,pool.tasks.length);assert.equal(session.questions[0].q,retained.q);assert.equal(new Set(session.questions.map(q=>JSON.stringify([q.q,q.answer,q.meaning]))).size,session.questions.length);e.dom.window.close();
});
