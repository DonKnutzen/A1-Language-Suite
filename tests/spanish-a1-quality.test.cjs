const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('fs');
const path=require('path');
const vm=require('vm');

const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
function data(){const window={};vm.runInNewContext(read('spanisch/data.js'),{window});return window.ES_A1_DATA;}
function content(){const window={};vm.runInNewContext(read('spanisch/lesson-content.js'),{window});return window.A1_COURSE_CONTENT;}

test('every Spanish lesson quiz question explains the decisive contrast',()=>{
  for(const lesson of data().lessons){
    assert.equal(lesson.quiz.length,10,'lesson '+lesson.id);
    for(const q of lesson.quiz){
      assert(q.explanation?.trim().length>=30,`L${lesson.id}: missing explanation for ${q.q}`);
      assert.notEqual(q.explanation.trim(),q.o[q.a].trim(),`L${lesson.id}: explanation only repeats the answer`);
    }
  }
});

test('Spanish quiz distractors come from the lesson topic, not random sentences of other lessons',()=>{
  const D=data();
  const owners=new Map();
  for(const l of D.lessons)for(const pair of l.phrases)for(const text of pair){
    const key=text.toLowerCase();if(!owners.has(key))owners.set(key,new Set());owners.get(key).add(l.id);
  }
  const foreign=[];
  for(const l of D.lessons)for(const q of l.quiz)q.o.forEach((option,i)=>{
    if(i===q.a)return;
    const from=owners.get(option.toLowerCase());
    if(from&&!from.has(l.id))foreign.push(`L${l.id}: ${option}`);
  });
  // A few deliberate contrasts remain (e.g. „Wie heißt du?“ against „Wie schreibt man das?“).
  assert(foreign.length<=6,'Unrelated borrowed distractors:\n'+foreign.join('\n'));
});

test('Spanish lesson deepening has an explanation and no contradictory duration rule',()=>{
  for(const c of content()){
    assert(c.grammar.explanation.trim().length>=40,'empty grammar explanation in lesson '+c.id);
    assert(c.tip.trim(),'empty tip in lesson '+c.id);
  }
  const lesson15=content().find(c=>c.id===15).grammar.explanation;
  assert(lesson15.includes('para dos noches')&&lesson15.includes('por dos noches'));
  const lesson5=content().find(c=>c.id===5).pronunciation.explanation;
  assert(!lesson5.includes('zwischen Vokalen'),'hermano has no r between vowels');
  const plan=read('spanisch/LEHRPLAN-A1.md');
  for(const c of content())assert(plan.includes(c.grammar.explanation),'LEHRPLAN out of sync for lesson '+c.id);
});

test('Spanish spelled names are read with Spanish letter names',()=>{
  const window={};window.window=window;
  vm.runInNewContext(read('shared/pronunciation.js'),window);
  assert.equal(window.A1Pronunciation.spellParts('MULLER','es').join(', '),'eme, u, ele, ele, e, erre');
  assert.equal(window.A1Pronunciation.spellParts('ANA','es').join(', '),'a, ene, a');
  assert.equal(window.A1Pronunciation.spellParts('MULLER','fr')[0],'emme');
});

test('Spanish reading back button navigates and open form answers are compared with a model',()=>{
  const ui=read('spanisch/app.js');
  assert(ui.includes("examMode?renderExam():renderReadingMenu();"));
  assert(ui.includes('f.free?A1Learning.countWords(raw)'));
  const forms=data().forms;
  const people=forms.find(f=>f.id==='f1').fields.find(f=>f.label.startsWith('Personas que quieres conocer'));
  assert.equal(people.free,true);
  assert.equal(people.minWords,10);
  for(const f of forms)for(const field of f.fields)assert(field.answers.length>=1,f.id+' '+field.label);
});

function practice(){
  const window={};window.window=window;
  for(const f of ['deepening-content.js','check-content.js','lesson-practice.js'])vm.runInNewContext(read('spanisch/'+f),window);
  return window.ES_A1_PRACTICE;
}

test('every Spanish lesson has two deepening topics and a twelve-task lesson check like French A1',()=>{
  const P=practice();
  for(let id=1;id<=24;id++){
    const topics=P.deepeningTopics(id);
    assert.equal(topics.length,2,'topics in lesson '+id);
    for(const t of topics){
      assert(t.rule.length>=60&&t.pairs.length>=3,`L${id} ${t.title}: rule/examples`);
      assert.equal(t.tasks.length,5,`L${id} ${t.title}`);
      for(const q of t.tasks){assert.equal(new Set(q.options).size,3,q.id);assert(q.why&&q.audio,q.id);}
    }
    const check=P.checkTasks(id),kinds={};
    for(const q of check){
      kinds[q.kind]=(kinds[q.kind]||0)+1;assert(q.why,q.id);
      if(q.kind==='type')assert(q.sentence.includes('___')&&q.answers.length,q.id);
      else assert.equal(new Set(q.options).size,3,q.id);
      if(q.kind==='listen')assert(q.audio,q.id);
    }
    assert.deepEqual(JSON.parse(JSON.stringify(kinds)),{choice:5,listen:2,type:5},'check mix in lesson '+id);
  }
});

test('lesson check tasks are new material, not copies of quiz questions',()=>{
  const P=practice(),quiz=new Set(data().lessons.flatMap(l=>l.quiz.map(q=>q.q)));
  for(let id=1;id<=24;id++)for(const q of P.checkTasks(id))assert(!quiz.has(q.q),'copied quiz question '+q.q);
});

test('typed check answers tolerate case and missing accents only where the accent does not change the word',()=>{
  const P=practice();
  const {plain,noAccent}=P._grade;
  assert.equal(plain('¿Dónde?'),'dónde');
  assert.equal(noAccent('dieciséis'),'dieciseis');
  assert.notEqual(noAccent('eñe'),noAccent('ene'),'ñ must stay distinct from n');
  const strict=P.checkTasks(4).find(t=>t.answer==='está');
  assert.equal(strict.strict,true,'está/esta must be graded strictly');
});

test('Spanish lessons require the lesson check before completion and offline cache covers the new files',()=>{
  const flow=read('shared/lesson-flow.js');
  assert(flow.includes('passed()&&checkOk()&&p.speakingDone===true'));
  assert(read('spanisch/app.js').includes('practice:window.ES_A1_PRACTICE'));
  const html=read('spanisch/index.html'),sw=read('spanisch/service-worker.js');
  const assets=[...html.matchAll(/(?:src|href)="([^"]+\.(?:js|css)[^"]*)"/g)].map(m=>m[1]);
  const cached=JSON.parse(sw.match(/const ASSETS=(\[.*?\]);/)[1]).map(a=>a.replace(/^\.\//,''));
  for(const a of assets)assert(cached.includes(a),'not precached: '+a);
  for(const f of ['deepening-content.js','check-content.js','lesson-practice.js'])assert(assets.some(a=>a.startsWith(f)),f);
});

test('Spanish lessons are split into four steps like Français A1',()=>{
  const flow=read('shared/lesson-flow.js');
  assert(flow.includes("const STEPS=[['listen','Hören & Verstehen'],['grammar','Vertiefung'],['check','Lektions-Check'],['apply','Sprechen & Schreiben']]"));
  assert(flow.includes('function drawOverview(){if(practice)drawSteps();else drawClassicOverview();}'));
  assert(flow.includes('PHRASES_PER_PAGE=5'),'audio examples are paged');
  const css=read('spanisch/styles.css');
  for(const c of ['.lesson-step-nav','.lesson-grammar-progress','.es-apply-tabs','.lesson-audio-pager'])assert(css.includes(c),c);
});
