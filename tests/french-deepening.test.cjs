const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM}=require('jsdom');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
function appEnvironment(){
  const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/francais/',runScripts:'outside-only'}),w=dom.window;
  w.scrollTo=()=>{};w.ResizeObserver=class{observe(){}disconnect(){}};
  for(const file of ['francais/data.js','shared/pronunciation.js','francais/mastery-specs.js','shared/grammar-ui.js','shared/lesson-topic-info.js','francais/lesson1-practice.js','francais/deepening-content.js','francais/deepening.js','francais/lesson-flow.js'])w.eval(read(file));
  const app=read('francais/app.js');
  w.esc=s=>{const span=w.document.createElement('span');span.textContent=s;return span.innerHTML;};
  w.eval(app.slice(app.indexOf('const GRAMMAR_GUIDES='),app.indexOf('function renderGrammarIntro('))+'window.grammarHtml=lessonGrammarHtml;');
  w.eval(app.slice(app.indexOf('const LESSON_APPLICATIONS='),app.indexOf('function renderLesson('))+'window.models=LESSON_APPLICATIONS;');
  const view=w.document.getElementById('view');
  return {dom,w,view};
}
const lesson=(w,id)=>w.FR_A1_DATA.lessons.find(l=>l.id===id);
function render(w,view,id,state,audio=[],saves=[]){
  const l=lesson(w,id),app=w.models[id];
  w.A1LessonFlow.render({lesson:l,content:l,view,state,targetLang:'fr',uiLang:'de',lessonCount:24,grammarHtml:w.FR_A1_DEEPENING.enrich(l,w.grammarHtml(l)),pronunciationHtml:w.A1Pronunciation.render(l,'fr','de'),model:app.speakModel,writingModel:app.writeModel,save:x=>saves.push(x),speak:(t,force)=>audio.push({text:t,force}),speakBtn:t=>`<button data-speak="${encodeURIComponent(t)}">🔊</button>`,wireSpeakButtons:()=>{},recorderHtml:()=>'',renderLearn:()=>{},renderLesson:()=>{}});
}
test('all 23 later lessons teach and directly rehearse every existing final-check pattern',()=>{
  const {dom,w}=appEnvironment();
  for(let id=2;id<=24;id++){
    const l=lesson(w,id),original=w.grammarHtml(l),html=w.FR_A1_DEEPENING.enrich(l,original),pools=w.FR_A1_DEEPENING.pools(l,html);
    assert(pools.length>=2,`lesson ${id}: preparation topics`);
    assert.equal(new Set(pools.map(p=>p.key)).size,pools.length);
    const before=w.document.createElement('div'),after=w.document.createElement('div');before.innerHTML=original;after.innerHTML=html;
    for(const table of before.querySelectorAll('table'))assert([...after.querySelectorAll('table')].some(t=>t.textContent===table.textContent),`lesson ${id}: existing reference preserved`);
    for(const pool of pools){
      assert(pool.tasks.length>=3,`lesson ${id} ${pool.key}: short practice pool`);
      for(const q of pool.tasks){assert(q.audio&&!q.audio.includes('___'));assert.equal(new Set(q.o).size,q.o.length);assert(q.o.includes(q.answer));assert(q.o.length>=3);}
    }
    const specs=w.FR_A1_MASTERY_SPECS[id].tasks;
    for(let i=0;i<specs.length;i++){
      const t=specs[i],pool=pools.find(p=>p.key===w.FR_A1_DEEPENING.routes[id][i]);
      assert(pool.tasks.some(q=>q.q===(t.prompt||t.q)),`lesson ${id}: ${t.prompt||t.q}`);
      if(t.prompt)assert(after.querySelector(`[data-deepening-key="${pool.key}"]`).textContent.includes(t.prompt.replace('___',t.answer)),`lesson ${id}: explanation before test`);
    }
  }
  dom.window.close();
});
test('lesson 4 teaches all weekdays, all months, clock distinctions and a complete appointment',()=>{
  const {dom,w}=appEnvironment(),l=lesson(w,4),html=w.FR_A1_DEEPENING.enrich(l,w.grammarHtml(l)),pools=w.FR_A1_DEEPENING.pools(l,html);
  assert.equal(pools.length,4);
  const texts=pools.flatMap(p=>p.tasks.map(q=>q.q+' '+q.answer)).join(' ');
  for(const word of ['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche','janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'])assert(texts.includes(word),word);
  for(const text of ['4:30','4:15','8:45','15:30','devant la bibliothèque','à partir de'])assert(html.includes(text),text);
  assert(!pools.flatMap(p=>p.tasks).some(q=>q.audio==='halb'||q.audio==='Viertel vor'));
  dom.window.close();
});
test('every lesson renders working topic practice without an empty introduction page',()=>{
  const {dom,w,view}=appEnvironment();
  const state={doneLessons:[1],lessonQuizBest:{1:100},lessonWork:{},lessonMasteryBest:{1:90}};
  for(let id=2;id<=24;id++){
    render(w,view,id,state);view.querySelector('[data-lesson-step="grammar"]').click();
    const keys=[...view.querySelectorAll('[data-grammar-progress]')].map(b=>b.dataset.grammarProgress);
    for(const key of keys){view.querySelector(`[data-grammar-progress="${key}"]`).click();assert(view.querySelector('.deepening-start'),`lesson ${id} topic ${key}`);assert(view.querySelector('#lessonGrammarPage').textContent.trim().length>80);}
  }
  assert.deepEqual([...state.doneLessons],[1]);assert.equal(state.lessonMasteryBest[1],90);
  dom.window.close();
});
test('inline answers always play the correct French audio and completion updates the right progress segment',()=>{
  const {dom,w,view}=appEnvironment(),state={doneLessons:[],lessonQuizBest:{},lessonWork:{}},audio=[],saves=[];
  render(w,view,4,state,audio,saves);view.querySelector('[data-lesson-step="grammar"]').click();
  assert(!view.querySelector('[data-grammar-progress="0"]').classList.contains('done'));
  view.querySelector('.deepening-start').click();let count=0;
  while(view.querySelector('.deepening-next')||view.querySelector('.deepening-stage .option-btn')){
    const options=[...view.querySelectorAll('.deepening-stage .option-btn')];if(options.length&&!options[0].disabled){const l=lesson(w,4),pools=w.FR_A1_DEEPENING.pools(l,w.FR_A1_DEEPENING.enrich(l,w.grammarHtml(l))),q=pools.find(p=>p.key==='u0').tasks.find(t=>t.q===view.querySelector('.quiz-q').textContent);const button=options.find(b=>count%2?b.textContent===q.answer:b.textContent!==q.answer);button.click();count++;assert.equal(audio.at(-1).text,q.audio);assert.equal(audio.length,count);assert.equal(audio.at(-1).force,true);assert(view.querySelector('.option-btn.correct'));const correct=view.querySelector('.option-btn.correct').textContent;assert(view.querySelector('.deepening-feedback').textContent.includes(correct)||view.querySelector('.deepening-feedback').textContent.includes('Richtig'));view.querySelector('.deepening-next').click();}
    else break;
  }
  assert.equal(count,6);assert(saves.length);assert(state.lessonWork[4].deepening.u0.done);assert(view.querySelector('[data-grammar-progress="0"]').classList.contains('done'));assert(!view.querySelector('[data-grammar-progress="1"]').classList.contains('done'));assert.equal(state.doneLessons.length,0);
  view.querySelector('[data-grammar-progress="1"]').click();view.querySelector('[data-grammar-progress="0"]').click();assert(view.querySelector('.deepening-start').textContent.includes('Noch einmal'));
  dom.window.close();
});
test('writing and speaking models meet the actual requested length and task points',()=>{
  const {dom,w}=appEnvironment();const model=id=>w.models[id].writeModel.replace(/\\n/g,'\n');
  for(const id of [17,24]){
    const message=id===17?model(id).split(/\n\n/).at(-1):model(id);
    assert(message.trim().split(/\s+/).length>=40,`lesson ${id}: 40-word model`);
  }
  assert.equal(model(11).split(/[.!?]+/).filter(s=>s.trim()).length,5);
  assert.equal(model(13).split(/[.!?]+/).filter(s=>s.trim()).length,3);
  assert.equal(model(20).split(/[.!?]+/).filter(s=>s.trim()).length,6);
  assert.equal(model(21).split('?').filter(s=>s.trim()).length,4);
  assert(w.models[22].speakModel.includes('Demain'));
  assert(model(23).includes('Ajoutez'));assert(model(23).includes('Mélangez'));
  assert(w.models[19].speakModel.includes('des livres'));assert(w.models[19].speakModel.includes('des clés'));
  dom.window.close();
});
test('lesson 1 content and established conjugation drills stay intact',()=>{
  const {dom,w}=appEnvironment(),l=lesson(w,1),html=w.grammarHtml(l);
  assert.equal(w.FR_A1_DEEPENING.enrich(l,html),html);
  for(const group of Object.values(w.FR_A1_LESSON1.GROUPS))assert.equal(group.tasks.length,12);
  dom.window.close();
});

test('listening contains only examples and the lesson quiz; alphabet tools move to the first deepening topic',()=>{
  const {dom,w,view}=appEnvironment(),state={doneLessons:[],lessonQuizBest:{},lessonWork:{}};
  for(let id=1;id<=24;id++){
    render(w,view,id,state);
    assert(view.querySelector('#startQuiz'));
    assert(!view.querySelector('.pronunciation-panel'));
  }
  render(w,view,2,state);
  view.querySelector('[data-lesson-step="grammar"]').click();
  assert(view.querySelector('#spellOwnName'));
  assert.equal(view.querySelectorAll('.alphabet-letter').length,26);
  assert(view.querySelector('.lesson-pronunciation-bonus .pronunciation-alphabet .alphabet-grid'));
  assert(view.textContent.includes('Akzente'));
  assert(!view.textContent.includes('Akzente mitnennen'));
  view.querySelector('[data-grammar-progress="1"]').click();
  assert(view.textContent.includes('unregelmäßig'));
  assert.equal(view.querySelectorAll('.grammar-table tbody tr').length,6);
  assert.equal(view.querySelectorAll('.grammar-table .speak-btn[data-speak]').length,6);
  const sounds=[...view.querySelectorAll('.grammar-table [data-speak]')].map(b=>decodeURIComponent(b.dataset.speak));
  assert.deepEqual(sounds,['je peux','tu peux','il peut','nous pouvons','vous pouvez','ils peuvent']);
  view.querySelector('[data-grammar-progress="2"]').click();
  assert([...view.querySelectorAll('#lessonGrammarPage [data-speak]')].every(b=>b.classList.contains('speak-btn')));
  assert(!view.textContent.includes('Comment ça s’écrit'));
  assert(lesson(w,2).transfer.writing.includes('einzelnen Buchstaben'));
  dom.window.close();
});
test('number formation is explained in five compact blocks',()=>{
  const {dom,w}=appEnvironment(),l=lesson(w,3),html=w.FR_A1_DEEPENING.enrich(l,w.grammarHtml(l));
  const root=w.document.createElement('div');root.innerHTML=html;
  assert.equal(root.querySelectorAll('.deepening-rule-blocks > div').length,5);
  for(const formula of ['10 + 7','60 + 10','4 × 20','80 + 10'])assert(root.textContent.includes(formula));
  dom.window.close();
});
test('lesson 3 writing uses four French fields, preserves drafts and locks fields during comparison',()=>{
  const {dom,w,view}=appEnvironment(),state={doneLessons:[],lessonQuizBest:{},lessonWork:{}};
  w.A1Learning={wireRecorder:()=>{},countWords:s=>s.trim().split(/\s+/).filter(Boolean).length};
  w.A1ExerciseEngine={charBar:()=>'<div class="mixed-char-wrap"></div>',wireChars:()=>{}};
  render(w,view,3,state);view.querySelector('[data-lesson-step="write"]').click();
  const fields=[...view.querySelectorAll('[data-writing-field]')];
  assert.equal(fields.length,4);assert(view.querySelector('#lessonWriting').hidden);
  view.querySelector('#showWritingModel').click();assert(view.querySelector('#writingModel').textContent.includes('vier Felder'));
  ['Martin','30','0612345678','martin@example.fr'].forEach((value,i)=>{fields[i].value=value;fields[i].dispatchEvent(new w.Event('input'));});
  view.querySelector('#showWritingModel').click();assert(fields.every(f=>f.readOnly));
  view.querySelector('#editWriting').click();assert(fields.every(f=>!f.readOnly));
  view.querySelector('[data-lesson-step="grammar"]').click();view.querySelector('[data-lesson-step="write"]').click();
  assert.equal(view.querySelector('[data-writing-field="name"]').value,'Martin');
  assert(view.querySelector('.mixed-char-wrap').hidden);
  dom.window.close();
});
test('all preparation rules emphasize their key ideas without changing the explanation text',()=>{
  const {dom,w}=appEnvironment();
  for(let id=2;id<=24;id++){
    for(const unit of w.FR_A1_DEEPENING_CONTENT[id]){
      assert(unit.emphasis.length>0);
      const texts=unit.blocks?.map(b=>b[1])||[unit.rule];
      for(const text of texts){
        const panel=w.document.createElement('div');panel.innerHTML=w.FR_A1_DEEPENING.formatRule(text,unit.emphasis);
        assert.equal(panel.textContent,text);
        assert(panel.querySelector('strong'),`${id}: ${unit.title}`);
      }
    }
  }
  assert.equal(w.FR_A1_DEEPENING.formatRule('<script>',[]),'&lt;script&gt;');
  assert.equal(w.FR_A1_DEEPENING.formatRule('demain de',['de']),'demain <strong>de</strong>');
  dom.window.close();
});
