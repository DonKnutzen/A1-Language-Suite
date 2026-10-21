const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=f=>fs.readFileSync(path.join(__dirname,'..','..',f),'utf8');
function environment(){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/francais/',runScripts:'outside-only'}),w=dom.window;w.scrollTo=()=>{};
 for(const f of ['francais/data.js','francais/mastery-specs.js','shared/grammar-ui.js','shared/lesson-topic-info.js','francais/deepening-content.js','francais/grammar-practice.js','francais/deepening.js'])w.eval(read(f));
 w.esc=s=>{const el=w.document.createElement('span');el.textContent=s;return el.innerHTML;};const app=read('francais/app.js');w.eval(app.slice(app.indexOf('const GRAMMAR_GUIDES='),app.indexOf('function renderGrammarIntro('))+'window.grammarHtml=lessonGrammarHtml;');
 return {dom,w,view:w.document.querySelector('main')};
}
test('both possessive topics cover all eighteen cells plus vowel and leur/leurs transfers',()=>{
 const e=environment();for(const id of [5,21]){
  const lesson=e.w.FR_A1_DATA.lessons.find(l=>l.id===id),html=e.w.FR_A1_DEEPENING.enrich(lesson,e.w.grammarHtml(lesson)),pool=e.w.FR_A1_DEEPENING.pools(lesson,html).find(p=>p.tasks.some(t=>t.coverage==='je:0'));
  assert(pool);assert.equal(pool.tasks.length,24);for(const owner of ['je','tu','il/elle','nous','vous','ils/elles'])for(let c=0;c<3;c++)assert(pool.tasks.some(t=>t.coverage===owner+':'+c));
  const selected=e.w.FR_A1_GRAMMAR_PRACTICE.select(pool.tasks,a=>a);assert.equal(selected.length,24);assert.equal(new Set(selected.map(t=>t.coverage)).size,24);
  for(const answer of ['mon','ton','son'])assert(selected.some(t=>t.q==='C’est ___ amie.'&&t.answer===answer));assert(selected.some(t=>t.answer==='leurs'));assert(selected.some(t=>t.answer==='leur'));
 }e.dom.window.close();
});
test('grammar pools across all lessons have distinct options, valid solutions and full form coverage',()=>{
 const e=environment();let pools=0;
 for(const lesson of e.w.FR_A1_DATA.lessons.filter(l=>l.id>1)){
  const html=e.w.FR_A1_DEEPENING.enrich(lesson,e.w.grammarHtml(lesson));
  for(const pool of e.w.FR_A1_DEEPENING.pools(lesson,html)){
   pools++;for(const task of pool.tasks){assert.equal(new Set(task.o).size,task.o.length,`L${lesson.id} ${pool.key}: ${task.q}`);assert(task.o.length>=3,`L${lesson.id} ${task.q}`);assert(task.o.includes(task.answer));assert(task.audio&&!task.audio.includes('___'));assert(!/maskulin|feminin|Konsonant|Nomen|Geschlecht|Grundform|Verwendung|regelmäßig/i.test(task.audio),`L${lesson.id} ${pool.key}: ${task.audio}`);}
   const selected=e.w.FR_A1_GRAMMAR_PRACTICE.select(pool.tasks,a=>a),expected=new Set(pool.tasks.filter(t=>t.kind==='form').map(t=>t.coverage||t.audio||t.q));assert.equal(selected.filter(t=>t.kind==='form').length,expected.size);
  }
 }assert(pools>70);e.dom.window.close();
});
test('24-question possessive drill saves, resumes, marks once and keeps earlier best results',()=>{
 const e=environment(),lesson=e.w.FR_A1_DATA.lessons[4],html=e.w.FR_A1_DEEPENING.enrich(lesson,e.w.grammarHtml(lesson)),state={lessonWork:{5:{}}};let completions=0;const save=done=>{if(done)completions++;};
 const render=()=>{e.view.innerHTML=html;e.w.FR_A1_DEEPENING.decorate({root:e.view,lesson,grammarHtml:html,state,save,speak(){},onUpdate(){}});e.view.querySelector('[data-deepening-practice="r0"] .deepening-start').click();};
 render();for(let i=0;i<24;i++){
  const p=state.lessonWork[5].deepening.r0,q=p.session.questions[i];assert.equal(p.session.questions.length,24);const button=[...e.view.querySelectorAll('.option-btn')].find(b=>b.textContent===q.answer);button.click();
  if(i===4){render();assert.equal(state.lessonWork[5].deepening.r0.session.score,5);}
  e.view.querySelector('.deepening-next').click();
 }assert.equal(completions,1);assert.equal(state.lessonWork[5].deepening.r0.last,24);assert.equal(state.lessonWork[5].deepening.r0.total,24);assert(!state.lessonWork[5].deepening.r0.session);e.dom.window.close();
});
test('table-derived choices test verb forms instead of repeating the subject in each option',()=>{
 const e=environment(),lesson=e.w.FR_A1_DATA.lessons[0],pools=e.w.FR_A1_DEEPENING.pools(lesson,e.w.grammarHtml(lesson));
 const regular=pools.find(p=>p.key==='r1').tasks,q=regular.find(t=>t.q==='Vous ___ à Lyon.');
 assert(q);assert.equal(q.answer,'habitez');assert.deepEqual([...q.o],['habitez','habite','habites']);assert(!q.o.some(o=>/\b(?:je|tu|nous|vous|ils|elles)\b/i.test(o)));assert.equal(q.audio,'Vous habitez à Lyon.');
 const speaking=regular.find(t=>t.q==='Vous ___ français.');assert.equal(speaking.answer,'parlez');assert(speaking.o.every(o=>o.startsWith('parl')));
 const reflex=pools.find(p=>p.key==='r3').tasks.find(t=>t.q==='Vous vous ___ comment ?');assert.equal(reflex.answer,'appelez');assert(reflex.o.every(o=>o.startsWith('appel')));assert.equal(reflex.audio,'Vous vous appelez comment ?');e.dom.window.close();
});
test('all contextual table tasks have three stable nearby choices and no literal table matching',()=>{
 const e=environment();let count=0;
 for(const lesson of e.w.FR_A1_DATA.lessons){const first=e.w.FR_A1_DEEPENING.pools(lesson,e.w.grammarHtml(lesson)).flatMap(p=>p.tasks).filter(t=>/^Welche (?:Form passt in der Übersicht|Verbform passt zu)/.test(t.legacyTask?.q||'')),second=e.w.FR_A1_DEEPENING.pools(lesson,e.w.grammarHtml(lesson)).flatMap(p=>p.tasks).filter(t=>/^Welche (?:Form passt in der Übersicht|Verbform passt zu)/.test(t.legacyTask?.q||''));
  for(const t of first){count++;assert(t.q.includes('___')||!t.legacyTask.q.startsWith('Welche Form passt'));assert(!/^Welche (?:Form|Verbform) passt/.test(t.q));assert.equal(t.o.length,3);assert(!t.o.some(o=>/^(?:je |j’|tu |nous |vous |ils |elles )/i.test(o)));assert(!t.audio.includes(' / '));assert(!/\b(?:il il|elle elle|ils ils|elles elles)\b/.test(t.audio));const again=second.find(q=>q.q===t.q&&q.answer===t.answer);assert.deepEqual([...again.o],[...t.o]);}
 }
 assert(count>=70);e.dom.window.close();
});
test('prepositions and determiners keep the same noun in the prompt; ambiguous name synonyms are absent',()=>{
 const e=environment();const tasks=id=>{const l=e.w.FR_A1_DATA.lessons[id-1];return e.w.FR_A1_DEEPENING.pools(l,e.w.grammarHtml(l)).flatMap(p=>p.tasks);};
 for(const [id,prompt,answer,options]of [[8,'Je suis ___ musée.','au',['au','aux','à la']],[13,'Je voudrais ___ robe.','cette',['cette','cet','ce']],[24,'Je viens ___ Canada.','du',['du','de','d’']]]){const t=tasks(id).find(t=>t.q===prompt);assert(t);assert.equal(t.answer,answer);assert.deepEqual([...t.o],options);}
 const name=tasks(2).find(t=>t.answer==='nom de famille');assert(!name.o.includes('nom'));assert(name.o.includes('prénom'));
 const family=tasks(5).find(t=>t.q==='Ce ___ mes parents.');assert.equal(family.answer,'sont');assert.deepEqual([...family.o],['sont','est','sommes']);
 const polite=tasks(18).find(t=>t.answer==='Pourriez-vous répéter ?');assert(polite.q.includes('könnten Sie'));assert(polite.o.every(o=>/vous|Vous/.test(o)));e.dom.window.close();
});
test('resuming an inline grammar drill upgrades only the open table question and keeps graded work',()=>{
 const e=environment(),lesson=e.w.FR_A1_DATA.lessons[7],html=e.w.FR_A1_DEEPENING.enrich(lesson,e.w.grammarHtml(lesson));
 const old={kind:'form',q:'Welche Form passt in der Übersicht zu „à la“ (Beispiel)?',answer:'à la gare',o:['à la gare','au musée','aux toilettes'],audio:'à la gare'},graded={kind:'form',q:'___ y a une cuisine.',answer:'Il',o:['Il','Ce','Elle'],audio:'Il y a une cuisine.'};
 const state={lessonWork:{8:{deepening:{r1:{best:2,session:{version:1,questions:[graded,old],i:1,score:1,mistakes:[],response:null,order:['aux toilettes','à la gare','au musée']}}}}}};let completions=0;
 const render=()=>{e.view.innerHTML=html;e.w.FR_A1_DEEPENING.decorate({root:e.view,lesson,grammarHtml:html,state,save:done=>{if(done)completions++;},speak(){}});e.view.querySelector('[data-deepening-practice="r1"] .deepening-start').click();};
 render();let p=state.lessonWork[8].deepening.r1;assert.equal(p.session.score,1);assert.equal(p.session.questions[0].q,graded.q);assert.equal(p.session.questions[1].q,'Je suis ___ gare.');assert.equal(p.previousQuestionSession.questions[1].q,old.q);assert.equal(p.session.questions[1].answer,'à la');
 const stage=e.view.querySelector('[data-deepening-practice="r1"]');[...stage.querySelectorAll('.option-btn')].find(b=>b.textContent==='à la').click();assert.equal(p.session.score,2);render();assert.equal(p.session.score,2);assert(e.view.querySelector('[data-deepening-practice="r1"] .deepening-next'));assert.equal(completions,0);e.dom.window.close();
});
