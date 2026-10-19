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
