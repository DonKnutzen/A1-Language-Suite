const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {fixture}=require('./helpers/a1-fixture.cjs');
function setup(){
  const f=fixture('deutsch');
  for(const file of ['shared/lesson-vocabulary-plan.js','shared/lesson-lexicon.js','shared/vocabulary-content.js','shared/vocabulary-trainer.js'])f.w.eval(fs.readFileSync(file,'utf8'));
  return f;
}
test('all authored reductions leave the identical phrase in listening and every new example in deepening',()=>{
  const f=setup();let reduced=0;
  for(const lesson of f.lessons){
    const html=f.w.document.createElement('div');html.innerHTML=f.html(lesson);
    for(const unit of f.w.DE_A1_STUDY.content[lesson.id]){
      const examples=[...unit.rows,...unit.extra],shown=f.w.DE_A1_STUDY.studyExamples(lesson,unit);
      assert.equal(new Set(unit.exampleIndices).size,unit.exampleIndices.length);
      for(const index of unit.exampleIndices)assert(examples[index],`${lesson.id}: invalid authored example index ${index}`);
      for(const pair of examples){
        const text=pair[0].replace(/\|/g,'');
        if(!shown.includes(pair)){assert(lesson.phrases.some(p=>p[0]===text),`${lesson.id}: lost ${text}`);reduced++;}
        else assert(html.textContent.includes(text),`${lesson.id}: missing retained example ${text}`);
      }
      // Each inflection remains in a task, even if its lexical variant is no
      // longer another audio row on the explanation page.
      for(const [marked] of unit.rows){const form=marked.match(/\|([^|]+)\|/)[1];assert(f.w.DE_A1_STUDY.unitTasks(unit).some(q=>q.answer===form));}
    }
  }
  assert(reduced>50);f.dom.window.close();
});
test('all 60 pages keep their keys, exercise words, open explanations and usable reference disclosures',()=>{
  const f=setup();let total=0;
  for(const lesson of f.lessons){
    f.render(lesson);f.view.querySelector('[data-lesson-step="grammar"]').click();
    const count=f.view.querySelectorAll('[data-grammar-progress]').length;total+=count;
    assert.equal(count,Object.keys(f.w.A1LessonVocabularyPlan.de[lesson.id].titles).length);
    for(let i=0;i<count;i++){
      f.view.querySelector(`[data-grammar-progress="${i}"]`).click();const root=f.view.querySelector('#lessonGrammarPage');
      assert(root.querySelector('h3'));assert(!root.querySelector('details.grammar-detail'));
      for(const list of root.querySelectorAll('[data-vocabulary-stage]')){assert.equal(list.tagName,'DETAILS');assert(!list.open);assert(list.querySelector('summary'));assert(list.querySelector('dt'));}
      const ref=root.querySelector('.deepening-reference');
      if(ref){assert(!ref.open);ref.open=true;assert(ref.querySelector('[data-speak],button'));assert(!ref.textContent.includes('undefined'));const practice=root.querySelector('.deepening-practice');if(practice)assert(practice.compareDocumentPosition(ref)&f.w.Node.DOCUMENT_POSITION_FOLLOWING);}
      if(i<2)assert(root.querySelector('#topicPracticeStart'));
    }
  }
  assert.equal(total,60);assert.equal(f.state.lessonMasteryBest[24],95);f.dom.window.close();
});
test('können keeps six complete forms and six original audio targets without repeating six full sentences',()=>{
  const f=setup(),lesson=f.lessons[1],root=f.w.document.createElement('div');root.innerHTML=f.w.DE_A1_STUDY.grammarHtml(lesson,f.w.refs(2),text=>`<button data-speak="${encodeURIComponent(text)}">Écouter</button>`);
  const table=root.querySelector('.study-conjugation');
  assert.deepEqual([...table.querySelectorAll('th')].map(el=>el.textContent),['ich','du','er / sie / es','wir','ihr','sie / Sie']);
  assert.deepEqual([...table.querySelectorAll('[data-speak]')].map(el=>decodeURIComponent(el.dataset.speak)),['ich kann','du kannst','er kann','wir können','ihr könnt','sie können']);
  assert(!table.querySelector('.conjugation-example'));assert(root.textContent.includes('sie kann'));assert(root.textContent.includes('Sie können'));
  f.dom.window.close();
});
test('reference paradigms preserve audio controls, person headers and complete comparison tables',()=>{
  const f=setup();
  for(const id of [1,5,8,10,20,24]){
    const root=f.w.document.createElement('div');root.innerHTML=f.html(f.lessons[id-1]);
    for(const table of root.querySelectorAll('.grammar-table')){
      for(const th of table.querySelectorAll('th'))assert(['row','col'].includes(th.scope));
      if(table.classList.contains('study-conjugation')){assert.equal(table.querySelectorAll('tbody tr').length,6);assert(!table.querySelector('thead'));}
      for(const button of table.querySelectorAll('[data-grammar-speak]'))assert(decodeURIComponent(button.dataset.grammarSpeak).trim());
    }
  }
  f.dom.window.close();
});
test('repeated glossary targets share one audio button while every French meaning survives',()=>{
  const f=setup();let merged=0;
  for(const lesson of f.lessons){
    f.render(lesson);f.view.querySelector('[data-lesson-step="grammar"]').click();const n=f.view.querySelectorAll('[data-grammar-progress]').length;
    for(let i=0;i<n;i++){
      const raw=f.w.document.createElement('div');raw.innerHTML=f.w.A1LessonFoundations.preparationHtml('de',lesson.id,'grammar:'+i);
      f.view.querySelector(`[data-grammar-progress="${i}"]`).click();const shown=[...f.view.querySelectorAll('#lessonGrammarPage [data-vocabulary-stage] dl>div')];
      const targets=shown.map(row=>row.querySelector('dt').textContent);
      assert.equal(new Set(targets).size,targets.length);
      for(const original of raw.querySelectorAll('dl>div')){
        const target=original.querySelector('dt').textContent,meaning=original.querySelector('dd').textContent;
        assert(shown.some(row=>row.querySelector('dt').textContent===target&&row.querySelector('dd').textContent.split(' ; ').includes(meaning)),`${lesson.id}: ${target} → ${meaning}`);
      }
      merged+=raw.querySelectorAll('dt').length-targets.length;
    }
  }
  assert(merged>0);f.dom.window.close();
});
