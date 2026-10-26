const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM}=require('jsdom');

function environment(id=1,saved){
  const dom=new JSDOM('<main id="view"></main>',{url:'https://example.test/deutsch/',runScripts:'outside-only'}),w=dom.window;
  w.scrollTo=()=>{};w.A1Profile={getUiLang:()=> 'fr'};w.A1Voice={cancel(){}};
  for(const file of ['deutsch/hard-mode-content.js','deutsch/hard-mode.js'])w.eval(fs.readFileSync(file,'utf8'));
  const state=saved||{lessonMasteryBest:{[id]:80},lessonWork:{}},view=w.document.querySelector('main');
  const render=()=>w.DE_A1_HARD_MODE.render({lesson:{id,title:'Test'},view,state,save(){},onBack(){}});
  const click=s=>{assert(view.querySelector(s),s);view.querySelector(s).click();};
  return {dom,w,state,view,render,click,data:w.DE_A1_HARD_CONTENT[id]};
}

test('all 148 German hard listening questions have three unique options and exactly one accepted answer',()=>{
  const e=environment();let count=0;
  for(const [id,data]of Object.entries(e.w.DE_A1_HARD_CONTENT)){
    assert.equal(data.version,4);
    for(const block of data.listening)for(const q of block.questions){
      const label=`L${id}: ${q.q}`;
      assert.equal(q.options.length,3,label);assert.equal(new Set(q.options).size,3,label);
      assert(q.options.every(o=>typeof o==='string'&&o.trim()),label);
      assert.equal(q.options.filter(o=>e.w.DE_A1_HARD_MODE.matches(o,q.answers,q)).length,1,label);
      count++;
    }
  }
  assert.equal(count,148);e.dom.window.close();
});

test('new option vocabulary has French meanings before Hard Mode, and offline assets match the page',()=>{
  const {fixture}=require('../../tests/helpers/a1-fixture.cjs'),f=fixture('deutsch');
  for(const file of ['shared/lesson-vocabulary-plan.js','shared/lesson-lexicon.js','shared/vocabulary-content.js','shared/vocabulary-trainer.js'])f.w.eval(fs.readFileSync(file,'utf8'));
  for(const [id,target,meaning]of [[1,'Basketball','le basket-ball'],[1,'Fußball','le football'],[7,'kurz','court'],[12,'Saft','le jus'],[19,'Arztpraxis','le cabinet médical'],[20,'Pullover','le pull']]){
    const html=f.w.A1LessonFoundations.preparationHtml('de',id,'hard');assert(html.includes(target),`${id}: ${target}`);assert(html.includes(meaning),`${id}: ${meaning}`);
  }
  const page=fs.readFileSync('deutsch/index.html','utf8'),worker=fs.readFileSync('deutsch/service-worker.js','utf8');
  for(const asset of ['voice-selection.js?v=dialogue-168','dialogue-voices.js?v=dialogue-168','hard-mode-content.js?v=listening-choices-168','hard-mode.js?v=listening-choices-168'])assert(page.includes(asset)&&worker.includes(asset),asset);
  assert(worker.includes('deutsch-a1-live-listening-v168'));f.dom.window.close();
});

test('every German hard mode offers only radio choices in listening; cloze and writing stay editable',()=>{
  for(let id=1;id<=24;id++){
    const e=environment(id);e.render();e.click('#hardBegin');
    assert.equal(e.view.querySelectorAll('input[type="text"][data-hard-gap]').length,e.data.gaps.length);
    e.click('[data-hard-page="1"]');
    assert(!e.view.querySelector('input[type="text"],textarea,[data-hard-char]'));
    assert(!e.view.querySelector('.hard-transcript,.hard-answer'));
    const questions=e.data.listening.flatMap(b=>b.questions);
    assert.equal(e.view.querySelectorAll('.hard-question').length,questions.length);
    questions.forEach((q,i)=>{
      const inputs=[...e.view.querySelectorAll(`[data-hard-listen="${i}"]`)];
      assert.equal(inputs.length,3);assert(inputs.every(el=>el.type==='radio'));
      inputs.find(el=>el.value!==q.answers[0]).click();
      inputs.find(el=>el.value===q.answers[0]).click();
    });
    const a=e.state.lessonWork[id].hardMode.attempt,orders=JSON.stringify(a.optionOrders);
    assert.deepEqual([...a.listening],Array.from(questions,q=>q.answers[0]));
    e.render();assert.equal(JSON.stringify(a.optionOrders),orders);
    assert.equal(e.view.querySelectorAll('input:checked').length,questions.length);
    e.w.A1Profile.getUiLang=()=> 'en';e.w.dispatchEvent(new e.w.Event('a1suite:languagechange'));
    assert(e.view.textContent.includes('Choose one of the three options'));
    assert.equal(e.view.querySelectorAll('input:checked').length,questions.length);
    e.click('[data-hard-page="2"]');assert(!e.view.querySelector('#hardWriting').readOnly);
    e.dom.window.close();
  }
});

test('old running v2/v3 drafts migrate once to choices and retain cloze, writing and their original snapshot',()=>{
  const e=environment();
  for(const [id,data]of Object.entries(e.w.DE_A1_HARD_CONTENT)){
    const previous=e.w.DE_A1_HARD_VERSIONS[[7,8,13,18,21].includes(+id)?3:2][id];
    const attempt={version:previous.version,phase:'running',page:1,gaps:previous.gaps.map(q=>q.answers[0]),listening:previous.listening.flatMap(b=>b.questions).map(q=>q.answers[0]),plays:[1,2],text:previous.writing.model,ratings:[null,null,null,null],startedAt:1};
    const original=JSON.stringify(attempt),state={lessonMasteryBest:{[id]:80},lessonWork:{[id]:{hardMode:{attempt,bestObjective:97,passedAt:2,passedVersion:previous.version}}}};
    const r=environment(+id,state);r.render();const p=state.lessonWork[id].hardMode;
    assert.equal(p.attempt.version,4);assert.equal(JSON.stringify(p.history[0]),original);
    assert.equal(p.attempt.text,previous.writing.model);assert.deepEqual([...p.attempt.gaps],[...attempt.gaps]);
    assert.equal(p.contentVersions[previous.version].version,previous.version);assert.equal(p.bestObjective,97);
    assert(!r.view.querySelector('input[type="text"],textarea'));assert.equal(r.view.querySelectorAll('input[type="radio"]').length,data.listening.flatMap(b=>b.questions).length*3);
    r.render();assert.equal(p.history.length,1);r.dom.window.close();
  }
  e.dom.window.close();
});

test('choice order and selection survive a reload; corrupt stored option rows cannot hide the answer',()=>{
  const e=environment();e.render();e.click('#hardBegin');e.click('[data-hard-page="1"]');
  const chosen=e.view.querySelector('[data-hard-listen="0"]');chosen.click();
  const saved=JSON.parse(JSON.stringify(e.state)),value=chosen.value,orders=JSON.stringify(saved.lessonWork[1].hardMode.attempt.optionOrders);e.dom.window.close();
  const r=environment(1,saved);r.render();
  assert.equal(r.view.querySelector('input:checked').value,value);assert.equal(JSON.stringify(saved.lessonWork[1].hardMode.attempt.optionOrders),orders);
  saved.lessonWork[1].hardMode.attempt.optionOrders[1]=['old','old','old'];r.render();
  assert.deepEqual([...r.view.querySelectorAll('[data-hard-listen="1"]')].map(el=>el.value).sort(),[...r.data.listening[0].questions[1].options].sort());r.dom.window.close();
});

test('submitted v2/v3 attempts retain their original questions, marking and result',()=>{
  const e=environment();
  for(const [version,lessons]of Object.entries(e.w.DE_A1_HARD_VERSIONS))for(const [id,old]of Object.entries(lessons)){
    const attempt={version:+version,phase:'reviewed',page:1,gaps:old.gaps.map(q=>q.answers[0]),listening:old.listening.flatMap(b=>b.questions).map(q=>q.answers[0]),plays:[3,3],text:old.writing.model,ratings:[2,2,2,2],completedAt:10,result:{passed:true,pct:100}};
    const original=JSON.stringify(attempt),state={lessonMasteryBest:{[id]:80},lessonWork:{[id]:{hardMode:{attempt}}}},r=environment(+id,state);r.render();
    const {optionOrders,...retained}=attempt;
    assert.equal(attempt.version,+version);assert.equal(JSON.stringify(retained),original);
    assert.deepEqual(attempt.result,{passed:true,pct:100});assert(r.view.querySelector('.hard-transcript'));
    assert(!r.view.querySelector('[data-hard-listen]'));assert.equal(r.view.querySelectorAll('.hard-answer.is-correct').length,attempt.listening.length);r.dom.window.close();
  }
  e.dom.window.close();
});
