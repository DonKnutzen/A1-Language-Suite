const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'../..',p),'utf8');
function environment(){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/deutsch/',runScripts:'outside-only'}),w=dom.window;
 w.scrollTo=()=>{};w.ResizeObserver=class{observe(){}disconnect(){}};w.A1Profile={getUiLang:()=> 'fr'};
 for(const f of ['shared/learning.js','shared/exercise-review.js','shared/exercise-engine.js','deutsch/answer-audio.js','deutsch/pronouns.js','deutsch/grammar-drills.js','deutsch/deepening-content.js','deutsch/question-content.js','deutsch/applications.js','deutsch/study.js','deutsch/assessments.js','deutsch/hard-mode-content.js','deutsch/hard-mode.js','deutsch/review-practice.js'])w.eval(read(f));
 const app=read('deutsch/app.js');w.eval(app.slice(0,app.indexOf('const stateKey'))+'window.data={lessons,grammarSets};');w.DE_A1_ASSESSMENTS.configure(w.data);
 const view=w.document.querySelector('main'),state={doneLessons:[],lessonMasteryBest:{},lessonMasteryLast:{}};
 const open=id=>{w.DE_A1_ASSESSMENTS.renderLessonTest({lesson:w.data.lessons[id-1],view,state,save(){},speak(){},onBack(){}});view.querySelector('#masteryStart').click();};
 return {dom,w,view,state,open};
}
test('24 independent checks cover labelled objectives, with 12–16 questions and at least six typed transfers',()=>{
 const e=environment();let total=0;
 for(const l of e.w.data.lessons){
  const tasks=e.w.DE_A1_ASSESSMENTS.makeLessonTest(l),practice=e.w.DE_A1_STUDY.content[l.id].flatMap(u=>e.w.DE_A1_STUDY.unitTasks(u)),intro=e.w.DE_A1_STUDY.lessonExercises(l);
  assert(tasks.length>=12&&tasks.length<=16);assert(tasks.filter(q=>q.type==='gap').length>=6);assert.equal(new Set(tasks.map(q=>q.focus)).size,tasks.length);
  for(const q of tasks){assert(q.focus&&q.qualityRevision===149);assert(![...practice,...intro].some(p=>p.q===q.q));assert(!q.audio.includes('___'));assert(!/\b(?:Je |Nous |personne|français|euros, charges)\b/.test(q.audio));if(q.type==='choice'){assert.equal(q.o.length,3);assert.equal(new Set(q.o).size,3);assert.equal(q.o[q.a],q.answer);if(q.answerLang==='fr')assert.notEqual(q.audio,q.answer);}else assert(e.w.DE_A1_QUESTIONS.matchesAnswer(q.answer,q));}
  total+=tasks.length;
 }
 assert.equal(total,338);e.dom.window.close();
});
test('50 study topics retain typed reference forms, add distinct focused applications and cover all twelve months',()=>{
 const e=environment(),units=Object.values(e.w.DE_A1_STUDY.content).flat();assert.equal(units.length,50);
 for(const u of units){const tasks=e.w.DE_A1_STUDY.unitTasks(u);assert(tasks.length>=10);assert.equal(new Set(tasks.map(q=>q.q)).size,tasks.length);assert(!tasks.some(q=>q.skill==='recognition'));assert.equal(tasks.filter(q=>q.type==='gap').length,4);for(const q of tasks){assert.equal(new Set(q.o).size,3);assert.equal(q.o[q.a],q.answer);}}
 const months=e.w.DE_A1_STUDY.unitTasks(e.w.DE_A1_STUDY.content[4][2]);for(const [word]of e.w.DE_A1_STUDY.content[4][2].vocabulary)assert(months.some(q=>q.answer===word),word);
 const targets={7:['kostet','kosten','Wie viele'],13:['ab','an','fährt','kommt'],22:['zurück','zurückrufen','mich']};
 for(const[id,answers]of Object.entries(targets)){const tasks=e.w.DE_A1_STUDY.content[id].flatMap(u=>e.w.DE_A1_STUDY.unitTasks(u));for(const answer of answers)assert(tasks.some(q=>q.answer===answer),`${id}: ${answer}`);}
 e.dom.window.close();
});
test('conjugation keeps both verbs in the wir form and adds, rather than overwrites, formal Sie',()=>{
 const e=environment();for(const[title,verbs]of [['Verbes réguliers au présent',['wohnen','arbeiten']],['heißen et sprechen – conjugaison',['heißen','sprechen']]]){const t=e.w.DE_A1_GRAMMAR_DRILLS.topics[title].tasks;assert.equal(t.length,13);for(const verb of verbs)assert(t.some(q=>/Wir ___/.test(q.q)&&q.o[q.a]===verb),title+': '+verb);assert(t.some(q=>q.pronounRole==='formal'));}e.dom.window.close();
});
test('all seven possessive stems are tested in three genders, with explicit owner contexts',()=>{const e=environment(),tasks=e.w.DE_A1_GRAMMAR_DRILLS.topics['Possessifs utiles'].tasks;assert.equal(tasks.length,27);for(const stem of ['mein','dein','sein','ihr','unser','euer','Ihr'])for(const noun of ['Vater','Mutter','Kind'])assert(tasks.some(q=>q.q.includes('___ '+noun)&&q.o[q.a]=== (noun==='Mutter'?{mein:'meine',dein:'deine',sein:'seine',ihr:'ihre',unser:'unsere',euer:'eure',Ihr:'Ihre'}[stem]:stem)),stem+': '+noun);e.dom.window.close();});
test('German grammar distinguishes umlauts and accepts NFC, keyboard digraphs, spaces and explicit alternatives',()=>{
 const e=environment(),m=e.w.DE_A1_QUESTIONS.matchesAnswer,q=answer=>({answer});
 for(const[a,b]of [['können','konnen'],['könnte','konnte'],['hätte','hatte'],['schön','schon'],['März','Marz']]){assert(m(a,q(a)));assert(!m(b,q(a)));}
 assert(m(' koennen ',q('können')));assert(m('KO\u0308NNEN',q('können')));assert(m('heisse',q('heiße')));assert(m('Viele   Grüße!',q('Viele Grüße')));assert(m('offen',{answer:'geöffnet',accept:['offen']}));assert(!m('um',q('am')));assert(!m('Sie',{answer:'sie',marking:{caseSensitive:true}}));e.dom.window.close();
});
test('actual exercise engine rejects missing umlaut, accepts keyboard spelling, and freezes special characters after checking',()=>{
 const e=environment(),task={type:'gap',q:'Wir ___ helfen.',prompt:'Wir ___ helfen.',context:'Nous pouvons aider.',answer:'können',qualityRevision:149};
 function run(value){const progress={};e.w.A1ExerciseEngine.run({lesson:{id:2,title:'Modal'},view:e.view,targetLang:'de',uiLang:'fr',exercises:[task],progress,exerciseVersion:102,saveProgress(){},playAudio(){},onBack(){},onFinish(){},matchesAnswer:e.w.DE_A1_QUESTIONS.matchesAnswer});const input=e.view.querySelector('#mixedInput');input.value=value;e.view.querySelector('#mixedCheck').click();const before=input.value;e.view.querySelector('.mixed-char').click();assert.equal(input.value,before);return progress.session;}
 assert.equal(run('konnen').score,0);assert.equal(run('koennen').score,1);e.dom.window.close();
});
test('new checks grade every answer correctly, resume drafts, finish all 24 and keep previous bests',()=>{
 const e=environment();for(let id=1;id<=24;id++){
  e.state.lessonMasteryBest[id]=100;e.open(id);let firstGap=true;
  while(e.state.lessonCheckProgress[id].session){const s=e.state.lessonCheckProgress[id].session,q=s.ex[s.i];if(q.type==='gap'){let input=e.view.querySelector('#mixedInput');input.value=q.answer;input.dispatchEvent(new e.w.Event('input'));if(firstGap){e.open(id);input=e.view.querySelector('#mixedInput');assert.equal(input.value,q.answer);firstGap=false;}e.view.querySelector('#mixedCheck').click();}else e.view.querySelector(`[data-o="${q.a}"]`).click();assert.equal(e.state.lessonCheckProgress[id].session.response.status,'ok',`${id}: ${q.q}`);e.view.querySelector('#mixedNext').click();}
  assert.equal(e.state.lessonMasteryLast[id],100);assert.equal(e.state.lessonMasteryBest[id],100);assert.equal(e.view.querySelector('.score').textContent,'100%');
 }e.dom.window.close();
});
test('old check snapshot is unchanged on resume; explicit restart archives it and retains best and completion',()=>{
 const e=environment(),old={version:102,ex:[{type:'gap',q:'Ancien ___',prompt:'Ancien ___',answer:'hätte'}],i:0,score:0,draft:'hatte',response:null};
 e.state.doneLessons=[6];e.state.lessonMasteryBest[6]=95;e.state.lessonCheckProgress={6:{contentRevision:118,session:JSON.parse(JSON.stringify(old))}};e.open(6);assert.deepEqual(JSON.parse(JSON.stringify(e.state.lessonCheckProgress[6].session)),{...old,orderPicked:[]});assert.equal(e.view.querySelector('#mixedInput').value,'hatte');e.view.querySelector('#mixedBack').click();assert(e.view.querySelector('[role="status"]').textContent.includes('ancien'));e.view.querySelector('#masteryRestart').click();const p=e.state.lessonCheckProgress[6];assert.equal(p.session.ex.length,14);assert.equal(p.previousDrafts[0].draft,'hatte');assert.equal(e.state.lessonMasteryBest[6],95);assert.deepEqual(e.state.doneLessons,[6]);e.dom.window.close();
});
test('grammar migration keeps checked feedback and scores while replacing only pending obsolete questions',()=>{
 const e=environment(),tasks=e.w.DE_A1_STUDY.unitTasks(e.w.DE_A1_STUDY.content[8][0]),checked={q:'Already graded',type:'choice',answer:'gut',o:['gut','schlecht','später'],a:0},p={best:9,done:true,session:{ex:[checked,{q:'Old neighbour recognition',answer:'chambre'}],i:0,score:1,response:{status:'ok'},draft:'old'}};
 e.w.DE_A1_STUDY.refreshSession(p,tasks,149);assert.equal(p.session.ex[0],checked);assert.equal(p.session.response.status,'ok');assert.equal(p.session.score,1);assert.equal(p.best,9);assert(p.done);assert(p.session.ex[1].qualityRevision===149);assert.equal(p.previousDrafts.length,1);e.w.DE_A1_STUDY.refreshSession(p,tasks,149);assert.equal(p.previousDrafts.length,1);e.dom.window.close();
});
test('review keeps productive gaps typed and uses the same umlaut policy as grammar and checks',()=>{
 const e=environment(),source=e.w.DE_A1_STUDY.unitTasks(e.w.DE_A1_STUDY.content[2][1]).find(q=>q.type==='gap'),q=e.w.DE_A1_REVIEW.task(2,'grammar:study-2-1','Modal',source);assert.equal(q.kind,'gap');assert(!q.o);assert(e.w.DE_A1_REVIEW.accepted(q,q.answer));const other=e.w.DE_A1_REVIEW.task(2,'grammar:modal','Modal',{type:'gap',q:'Wir ___ sprechen.',answer:'können',qualityRevision:149});assert(!e.w.DE_A1_REVIEW.accepted(other,'konnen'));assert(e.w.DE_A1_REVIEW.accepted(other,'koennen'));e.dom.window.close();
});
test('obsolete review questions retire without inventing an error for a different learning objective',()=>{
 const e=environment(),api=e.w.DE_A1_REVIEW,old=api.task(8,'grammar:study-8-0','Logement',{q:'Old topic recognition',answer:'un balcon',o:['un balcon','deux pièces','une cuisine'],audio:'Die Wohnung hat einen Balkon.'});api.record(e.state,old,false);
 e.state.reviewPractice.session={tasks:[old],answers:[],index:0,draft:'un balcon',mode:'mistakes'};const grammarHtml=l=>e.w.DE_A1_STUDY.grammarHtml(l,'',()=> '');api.refreshQuestions(e.state,e.w.data.lessons,grammarHtml,[]);assert(e.state.reviewPractice.items[old.id].retired);assert.equal(api.pending(e.state).length,0);assert.equal(e.state.reviewPractice.items[old.id].wrong,1);assert.equal(e.state.reviewPractice.previousQuestionRound.draft,'un balcon');assert(!e.state.reviewPractice.session);e.dom.window.close();
});
test('DE cache loads the question bank before its consumers and shared marking remains opt-in',()=>{
 const index=read('deutsch/index.html'),sw=read('deutsch/service-worker.js');assert(index.indexOf('question-content.js')<index.indexOf('study.js'));assert(index.includes('question-content.js?v=teaching-placement-157'));assert(sw.includes('./question-content.js?v=teaching-placement-157'));assert(sw.includes('deutsch-a1-live-vocabulary-audio-v158'));assert(read('shared/exercise-engine.js').includes('opts.matchesAnswer?.(input.value,q)??'));
});
