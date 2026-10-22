const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{JSDOM}=require('jsdom');
function fixture(){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/francais/',runScripts:'outside-only'}),w=dom.window;w.scrollTo=()=>{};w.esc=s=>String(s);w.A1Profile={getUiLang:()=> 'de'};
 for(const f of ['data','mastery-specs','mastery','deepening-content','grammar-practice','deepening'])w.eval(fs.readFileSync('francais/'+f+'.js','utf8'));
 for(const f of ['shared/grammar-ui.js','shared/lesson-topic-info.js','shared/exercise-engine.js','francais/review-practice.js'])w.eval(fs.readFileSync(f,'utf8'));
 const app=fs.readFileSync('francais/app.js','utf8');w.eval(app.slice(app.indexOf('const GRAMMAR_GUIDES='),app.indexOf('function renderGrammarIntro('))+'window.grammarHtml=lessonGrammarHtml;');
 const lessons=w.FR_A1_DATA.lessons,mode=w.FR_A1_MASTERY,pools=id=>{const l=lessons[id-1];return w.FR_A1_DEEPENING.pools(l,w.FR_A1_DEEPENING.enrich(l,w.grammarHtml(l)));};
 return {dom,w,lessons,mode,pools,view:w.document.querySelector('main')};
}
test('each check has at least twelve tasks and retains every planned focus without borrowing practice cards',()=>{
 const e=fixture(),expected=[12,12,14,14,16,14,14,14,14,14,16,14,16,14,14,14,14,14,16,16,16,16,16,16];
 for(const l of e.lessons){
  const s=e.mode.spec(l.id),practiced=new Set([...l.quiz.map(t=>t.q),...s.tasks.map(t=>t.prompt||t.q),...e.pools(l.id).flatMap(p=>p.tasks.map(t=>t.q))]);
  for(const t of [...s.checkTasks,...s.checkTransfers])assert(!practiced.has(t.prompt||t.q),`L${l.id} repeats practice: ${t.prompt||t.q}`);
  for(const t of s.checkTransfers)assert(!t.prompt.includes('('+t.answer+')'),`L${l.id}: answer already printed as an infinitive hint`);
  const focuses=[...new Set(s.checkTransfers.map(t=>t.family))].sort();
  for(let n=0;n<20;n++){const tasks=e.mode.makeLessonTest(l);assert.equal(tasks.length,expected[l.id-1]);assert(tasks.length>=12);assert.deepEqual(Array.from(tasks.filter(t=>t.type==='gap').map(t=>t.family)).sort(),focuses);assert.equal(new Set(tasks.map(t=>t.checkKey)).size,tasks.length);}
  assert(!e.mode.practiceTasks(l).some(t=>t.checkKey),`L${l.id}: check tasks leaked into practice`);
 }
 e.dom.window.close();
});
test('typed checks distinguish grammar forms but accept legitimate formatting and alternatives',()=>{
 const e=fixture(),find=(id,focus)=>e.mode.spec(id).checkTransfers.find(t=>t.family==='transfer:'+focus),yes=(q,a)=>assert(e.mode.accepted(q,a),a),no=(q,a)=>assert(!e.mode.accepted(q,a),a);
 yes(find(10,'profession'),'Je suis médecin.');yes(find(10,'profession'),'Je suis un médecin.');no(find(10,'profession'),'J’ai médecin.');
 const past=find(22,'participe');yes(past,'mangé');no(past,'mange');no(past,'manger');
 const present=e.mode.spec(10).checkTransfers.find(t=>t.answer==='travaille');yes(present,'travaille');no(present,'travaillé');
 const cedilla=find(10,'cedille');yes(cedilla,'commençons');no(cedilla,'commencons');
 const phone=find(3,'telephone');yes(phone,'06 70 14 80 91');yes(phone,'(06) 70-14-80-91');yes(phone,'+33 6 70 14 80 91');no(phone,'06 70 14 80 19');no(phone,'tel 06 70 14 80 91');
 const postal=find(3,'postal');yes(postal,'b2c3d4');no(postal,'B2C 4D3');
 const number=find(3,'nombre');yes(number,'quatre vingt douze');yes(number,'quatre-vingt-douze');no(number,'quatre-vingt-deux');
 yes(find(2,'identite'),'nom');yes(find(9,'sequence'),'ensuite');yes(find(6,'eau'),"de l'");no(find(6,'eau'),'de l');yes(find(7,'elision'),"d'");no(find(7,'elision'),'d');yes(find(19,'voici'),'Voilà');
 e.dom.window.close();
});
test('saved check errors use the same marking policy and English context in targeted review',()=>{
 const e=fixture();for(const [id,focus,right,wrong]of [[22,'participe','mangé','mange'],[3,'telephone','06 70 14 80 91','06 70 14 80 19'],[3,'postal','b2c3d4','b2c4d3']]){
  const source=e.mode.spec(id).checkTransfers.find(t=>t.family==='transfer:'+focus),q=e.w.FR_A1_REVIEW.task(id,'check','Lektionscheck',source);assert(q.contextEn);assert(e.w.FR_A1_REVIEW.accepted(q,right));assert(!e.w.FR_A1_REVIEW.accepted(q,wrong));
 }e.dom.window.close();
});
test('an old check can resume intact or start the revised bank while archiving its complete draft',()=>{
 const e=fixture(),l=e.lessons[3],old={version:101,contentVersion:2,ex:[{type:'gap',prompt:'Ancien ___',answer:'test',checkKey:'old'}],i:0,score:0,draft:'ancien',response:null},state={lessonMasteryBest:{4:92},lessonCheckProgress:{4:{session:JSON.parse(JSON.stringify(old))}}};
 const render=()=>e.mode.renderLessonTest({lesson:l,view:e.view,state,save(){},onBack(){}});render();assert(e.view.querySelector('#masteryNewCheck'));e.view.querySelector('#masteryStart').click();assert.equal(e.view.querySelector('#masteryInput').value,'ancien');assert.equal(state.lessonCheckProgress[4].session.contentVersion,2);e.view.querySelector('#masteryBack').click();e.view.querySelector('#masteryNewCheck').click();const p=state.lessonCheckProgress[4];assert.equal(p.session.contentVersion,3);assert.equal(p.session.ex.length,14);assert.equal(JSON.stringify(p.previousDrafts[0]),JSON.stringify(old));assert.equal(state.lessonMasteryBest[4],92);e.dom.window.close();
});
test('revised drills exercise the named construction instead of a generic auxiliary',()=>{
 const e=fixture(),tasks=(id,key)=>e.pools(id).find(p=>p.key===key).tasks;
 const current=tasks(11,'r1');assert(current.some(t=>t.q==='Je suis en train de ___.'&&t.o.includes('travaillé')));assert(current.some(t=>t.answer==='d’'));assert(!current.some(t=>t.q==='Je ___ en train de travailler.'));
 const questions=tasks(21,'r2');assert(questions.every(t=>t.answer==='Qui est-ce'||t.answer==='Qu’est-ce que c’est'));assert(!questions.some(t=>t.answer==='est'));
 const negative=tasks(23,'r2');assert(negative.every(t=>['de','d’'].includes(t.answer)));assert(negative.some(t=>t.o.includes('de l’')));
 const past=tasks(22,'r2');assert(past.some(t=>t.answer==='parties'));assert(past.some(t=>t.answer==='partis'));assert(!past.some(t=>t.answer==='au'));
 const recent=tasks(22,'r3');assert(recent.some(t=>t.answer==='de'));assert(recent.some(t=>t.answer==='d’'));assert(recent.some(t=>t.answer==='manger'));
 const form=tasks(17,'u1');assert(form.some(t=>t.answer==='Quels'));assert(form.some(t=>t.answer==='Quelle'));
 e.dom.window.close();
});
test('new English instructions preserve French answers and match changed examples',()=>{
 const e=fixture();e.w.A1Profile.getUiLang=()=> 'en';for(const f of ['en','i18n'])e.w.eval(fs.readFileSync('francais/'+f+'.js','utf8'));
 for(const l of e.lessons)for(const q of e.mode.spec(l.id).checkTransfers){assert.equal(e.w.A1FrenchI18n.translate(q.context),q.contextEn);assert(!q.audio.includes('___'));}
 const early=e.mode.spec(2).checkTasks.find(t=>t.family==='signes');assert(!e.w.A1FrenchI18n.translate(early.q).includes('« Zoé »'));
 const getup=e.mode.spec(11).checkTasks.find(t=>t.family==='lever');assert.equal(e.w.A1FrenchI18n.translate(getup.o[0]),'6:30.');
 const student=e.mode.spec(10).checkTasks.find(t=>t.family==='metier');assert(e.w.A1FrenchI18n.translate(student.o[1]).includes('every day'));
 e.dom.window.close();
});

test('revised grammar topics update only unanswered forms and keep graded answers and best scores',()=>{
 const e=fixture(),l=e.lessons[21],html=e.w.FR_A1_DEEPENING.enrich(l,e.w.grammarHtml(l)),old={kind:'form',q:'Je suis allé ___ cinéma.',answer:'au',o:['au','à','aux'],audio:'Je suis allé au cinéma.',meaning:'Ich bin ins Kino gegangen.'},state={lessonWork:{22:{deepening:{r2:{best:8,session:{version:1,questions:[old,old],i:1,score:1,response:null,mistakes:[],order:old.o}}}}}};
 e.view.innerHTML=html;e.w.FR_A1_DEEPENING.decorate({root:e.view,lesson:l,grammarHtml:html,state,save(){},speak(){}});e.view.querySelector('[data-deepening-practice="r2"] .deepening-start').click();const p=state.lessonWork[22].deepening.r2;assert.equal(p.best,8);assert.equal(p.session.score,1);assert.equal(p.session.questions[0].q,old.q);assert.notEqual(p.session.questions[1].q,old.q);assert.equal(p.previousQuestionSession.questions[1].q,old.q);e.dom.window.close();
});

test('report batch six targets price questions, quantity grammar and the corrected complete order',()=>{
 const e=fixture(),price=e.pools(7).find(p=>p.key==='r1').tasks,checks=e.mode.spec(7).checkTasks;
 assert(!price.some(t=>t.q==='Ça coûte ___ euros cinquante.'));const ask=price.find(t=>t.legacyTask?.q==='Ça coûte ___ euros cinquante.');assert.equal(ask.q,'___ ça coûte ?');assert.equal(ask.answer,'Combien');assert(ask.o.every(o=>!/[0-9]/.test(o)));
 const demand=checks.find(t=>t.family==='demande');assert(demand.q.includes('grammatisch'));assert(demand.o.every(o=>o.startsWith('Combien ça coût')));
 const change=checks.find(t=>t.family==='changer');assert(change.q.includes('grammatisch'));assert(change.o.every(o=>o.startsWith('Deux cents grammes ')&&o.endsWith('pommes, s’il vous plaît.')));
 const order=checks.find(t=>t.family==='commande');assert(order.q.includes('Non'));assert.equal(order.answer,'1 kg Äpfel und 2 kg Tomaten.');assert(order.o.every(o=>o.includes('Äpfel')&&o.includes('Tomaten')));assert.equal(e.mode.makeLessonTest(e.lessons[6]).length,14);e.dom.window.close();
});
test('reported check corrections preserve graded work, archive old options and keep their new order on reload',()=>{
 const e=fixture(),l=e.lessons[6],updates=e.mode.spec(7).checkTasks.filter(t=>t.qualityRevision===148),old=t=>({...t,q:t.legacyTask.q,answer:t.legacyTask.answer,o:[t.legacyTask.answer,'old option A','old option B']}),checked=old(updates.find(t=>t.family==='commande')),demand=old(updates.find(t=>t.family==='demande')),change=old(updates.find(t=>t.family==='changer'));
 const session={version:101,contentVersion:3,ex:[checked,demand,change],i:1,score:1,draft:'',response:null},snapshot=JSON.stringify(session),state={lessonMasteryBest:{7:96},lessonCheckProgress:{7:{session}}},open=()=>{e.mode.renderLessonTest({lesson:l,view:e.view,state,save(){},onBack(){}});e.view.querySelector('#masteryStart').click();};open();const p=state.lessonCheckProgress[7];assert.equal(p.session.ex[0].q,checked.q);assert.equal(p.session.score,1);assert.equal(state.lessonMasteryBest[7],96);assert.equal(JSON.stringify(p.previousDrafts[0]),snapshot);assert(p.session.ex[1].q.includes('grammatisch'));assert(p.session.ex[2].o.every(o=>o.includes('grammes')));const current=JSON.stringify(p.session.ex);open();assert.equal(JSON.stringify(p.session.ex),current);assert.equal(p.previousDrafts.length,1);
 p.session.response={ok:false,chosen:1};p.session.ex[1]=demand;open();assert.equal(p.session.ex[1].q,demand.q);assert.equal(p.session.response.ok,false);e.dom.window.close();
});
test('the reported price-form drill replaces its open number card with the intended question word',()=>{
 const e=fixture(),l=e.lessons[6],html=e.w.FR_A1_DEEPENING.enrich(l,e.w.grammarHtml(l)),old={kind:'form',q:'Ça coûte ___ euros cinquante.',answer:'dix-neuf',o:['dix-neuf','neuf','quatre-vingt-dix'],audio:'Ça coûte dix-neuf euros cinquante.'},state={lessonWork:{7:{deepening:{r1:{best:7,session:{version:1,questions:[old],i:0,score:0,mistakes:[],response:null,order:old.o}}}}}};
 e.view.innerHTML=html;e.w.FR_A1_DEEPENING.decorate({root:e.view,lesson:l,grammarHtml:html,state,save(){},speak(){}});e.view.querySelector('[data-deepening-practice="r1"] .deepening-start').click();const p=state.lessonWork[7].deepening.r1;assert.equal(p.session.questions[0].answer,'Combien');assert.equal(p.previousQuestionSession.questions[0].answer,'dix-neuf');assert.equal(p.best,7);e.dom.window.close();
});
test('reported tasks refresh in mistake rounds without inventing failures for a different focus',()=>{
 const e=fixture();e.w.eval(fs.readFileSync('shared/learning.js','utf8'));const api=e.w.FR_A1_REVIEW,sources=e.mode.spec(7).checkTasks.filter(t=>t.qualityRevision===148),oldChecks=sources.map(t=>api.task(7,'check','Lektionscheck',{q:t.legacyTask.q,answer:t.legacyTask.answer,o:[t.legacyTask.answer,'old A','old B']})),numeric=api.task(7,'grammar:r1','Preis',{q:'Ça coûte ___ euros cinquante.',answer:'dix-neuf',o:['dix-neuf','neuf','quatre-vingt-dix']}),[order,change,demand]=oldChecks,state={doneLessons:[7],lessonWork:{},lessonMasteryBest:{7:92}};
 for(const q of [...oldChecks,numeric])api.record(state,q,false);
 state.reviewPractice.imported=true;state.reviewPractice.session={version:1,tasks:[order,numeric,change,demand],index:1,answers:[{value:'old A',ok:false}],draft:'old A',mode:'mistakes'};const snapshot=JSON.stringify(state.reviewPractice.session);
 api.render({view:e.view,lessons:e.lessons,state,save(){},onBack(){},speak(){},grammarHtml:e.w.grammarHtml,initialMode:'mistakes'});
 const p=state.reviewPractice,s=p.session;assert.equal(s.tasks[0].id,order.id);assert.equal(s.answers[0].ok,false);assert.equal(s.tasks[1].answer,'Combien');assert(s.tasks[2].o.every(o=>o.includes('grammes')));assert(s.tasks[3].o.every(o=>o.startsWith('Combien ça coût')));assert.equal(JSON.stringify(p.previousQuestionRound),snapshot);assert.equal(state.lessonMasteryBest[7],92);assert(p.items[numeric.id].retired);assert.equal(p.items[numeric.id].wrong,1);assert(!p.items[s.tasks[1].id]);api.record(state,s.tasks[1],false);assert.equal(p.items[s.tasks[1].id].wrong,1);e.dom.window.close();
});
