const{test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),{fixture}=require('./helpers/a1-fixture.cjs');
const read=p=>fs.readFileSync(p,'utf8');
function shown(f,code,targets){const bank=f.w.A1Vocabulary.buildBank({course:code,lessons:f.lessons,units:code==='fr'?f.w.FR_A1_DEEPENING_CONTENT:f.w.DE_A1_STUDY.content});return [...new Map(bank.filter(e=>targets.includes(e.target)).flatMap(e=>f.w.A1Vocabulary.displayPairs(code,e)).map(p=>[JSON.stringify([p.target,p.meaning]),p.target])).values()];}
function load(f){for(const file of ['shared/lesson-vocabulary-plan.js','shared/lesson-lexicon.js','shared/vocabulary-content.js','shared/vocabulary-trainer.js'])f.w.eval(read(file));}
for(const[course,code]of [['francais','fr'],['deutsch','de']]){
 test(course+': all 24 lesson sequences put their supplementary words at the intended activity, with a quiet complete overview',()=>{
  const f=fixture(course);load(f);const plan=f.w.A1LessonVocabularyPlan[code],seen=new Set();
  for(const l of f.lessons){
   const p=plan[l.id];assert(p);f.render(l);const overview=f.view.querySelector('details.lesson-extra-vocabulary');assert(overview&&!overview.open);assert(!overview.querySelector('.lesson-extra-count'));
   assert.deepEqual([...f.view.querySelectorAll('[data-vocabulary-stage="listen"] dt')].map(x=>x.textContent).sort(),shown(f,code,p.stages.listen).sort());
   f.view.querySelector('[data-lesson-step="grammar"]').click();const buttons=[...f.view.querySelectorAll('[data-grammar-progress]')];assert.equal(buttons.length,Object.keys(p.titles).length);
   const added=new Set(p.stages.listen);for(let i=0;i<buttons.length;i++){
    f.view.querySelector(`[data-grammar-progress="${i}"]`).click();const page=f.view.querySelector('#lessonGrammarPage'),stage='grammar:'+i,expected=p.stages[stage],actual=[...page.querySelectorAll('[data-vocabulary-stage] dt')].map(x=>x.textContent);const displayed=shown(f,code,expected);assert.deepEqual(actual.sort(),(code==='de'?[...new Set(displayed)]:displayed).sort(),`${l.id} ${p.titles[stage]}`);
    for(const word of expected){assert(!added.has(word),`${l.id}: repeated new word ${word}`);added.add(word);assert(p.regular.includes(word));}
    const prep=page.querySelector('[data-vocabulary-stage]'),practice=page.querySelector('.deepening-practice,.lesson1-grammar-practice,.grammar-topic-practice');if(prep&&practice)assert(prep.compareDocumentPosition(practice)&f.w.Node.DOCUMENT_POSITION_FOLLOWING);
    assert(!prep?.querySelector('.lesson-foundation-rule'));
   }
   f.view.querySelector('[data-lesson-step="comprehension"]').click();assert(f.view.querySelector('#dialoguePlay'));const prep=f.view.querySelector('[data-vocabulary-stage="comprehension"]');assert.equal(!!prep,p.stages.comprehension.length>0);if(prep)assert(prep.compareDocumentPosition(f.view.querySelector('#dialoguePlay'))&f.w.Node.DOCUMENT_POSITION_FOLLOWING);
   p.regular.forEach(t=>seen.add(t));for(const word of p.hard)assert(!seen.has(word),`${l.id}: Hard Mode preparation repeats regular word ${word}`);
   const bank=f.w.A1Vocabulary.buildBank({course:code,lessons:f.lessons,units:code==='fr'?f.w.FR_A1_DEEPENING_CONTENT:f.w.DE_A1_STUDY.content});for(const word of [...p.regular,...p.hardOnly])assert(bank.some(e=>e.target===word&&e.studyLessons.includes(l.id)),word);
  }
  assert.equal(f.state.lessonMasteryBest[24],95);f.dom.window.close();
 });
 test(course+': additional Hard Mode words appear before starting and never alongside running questions',()=>{
  const f=fixture(course);load(f);f.w.A1Voice={cancel(){}};for(const file of [course+'/hard-mode-content.js',course+'/hard-mode.js'])f.w.eval(read(file));const api=f.w[code==='fr'?'FR_A1_HARD_MODE':'DE_A1_HARD_MODE'];
  for(const l of f.lessons){f.state.lessonMasteryBest[l.id]=90;api.render({lesson:l,view:f.view,state:f.state,save(){},onBack(){}});const begin=f.view.querySelector('#hardBegin');assert(begin,l.id);const prep=f.view.querySelector('[data-vocabulary-stage="hard"]'),words=f.w.A1LessonVocabularyPlan[code][l.id].hard;assert.equal(!!prep,words.length>0);if(prep){assert(prep.compareDocumentPosition(begin)&f.w.Node.DOCUMENT_POSITION_FOLLOWING);assert.deepEqual([...prep.querySelectorAll('dt')].map(n=>n.textContent).sort(),shown(f,code,words).sort());assert(!prep.querySelector('input,textarea,.hard-transcript'));}begin.click();assert(!f.view.querySelector('[data-vocabulary-stage="hard"],[data-hard-instructions]'));}
  f.dom.window.close();
 });
}
test('German introductions do not preteach later verb paradigms; early tasks test the introduced patterns',()=>{
 const f=fixture('deutsch');load(f);f.render(f.lessons[0]);f.view.querySelector('[data-lesson-step="grammar"]').click();const page=f.view.querySelector('#lessonGrammarPage');for(const text of ['Haben est irrégulier','Les verbes réguliers','Le changement de voyelle','ihr habt'])assert(!page.textContent.includes(text),text);
 const first=f.w.DE_A1_STUDY.unitTasks(f.w.DE_A1_STUDY.content[1][0]);assert(!first.some(q=>/\b(?:Du|Wir|Anna) ___/.test(q.prompt||q.q)));
 const pronouns=f.w.DE_A1_GRAMMAR_DRILLS.topics['Pronoms personnels'].tasks;assert.equal(pronouns.length,10);assert(pronouns.every(q=>q.audio===q.o[q.a]));for(const q of pronouns){const graded={...q,answer:q.o[q.a]};assert(f.w.DE_A1_QUESTIONS.matchesAnswer(graded.answer,graded));for(const wrong of q.o.filter(o=>o!==graded.answer))assert(!f.w.DE_A1_QUESTIONS.matchesAnswer(wrong,graded));}assert(!pronouns.some(q=>/haben|können|helfen|spricht/i.test(q.q)));
 f.view.querySelector('[data-grammar-progress="5"]').click();assert(f.view.textContent.includes('sprichst'));assert(f.view.textContent.includes('spricht'));
 const checks=f.w.DE_A1_ASSESSMENTS.makeLessonTest(f.lessons[0]);assert(!checks.some(q=>q.answer==='habt'));
 f.render(f.lessons[9]);f.view.querySelector('[data-lesson-step="grammar"]').click();assert(!f.view.textContent.includes('Les terminaisons de arbeiten'));f.view.querySelector('[data-grammar-progress="2"]').click();assert(f.view.textContent.includes('Les terminaisons de arbeiten'));f.dom.window.close();
});
test('FR instruction help explains commands without giving names, places or answers from the recording',()=>{
 const f=fixture('francais');load(f);const html=f.w.A1LessonFoundations.hardInstructionsHtml('fr',{listening:[{questions:[{q:'Écris le prénom. Quelle phrase est correcte ? Réponds en chiffres.'}]}]});assert(html.includes('Schreibe'));assert(html.includes('Antworte mit Ziffern'));assert(!/Luc|Marie|Berlin/.test(html));assert.equal(f.w.A1LessonFoundations.hardInstructionsHtml('de',{}),'');f.dom.window.close();
});
test('German corrected introductory drafts archive pending old questions without resetting earned points, history or bests',()=>{
 const f=fixture('deutsch');load(f);const unit=f.w.DE_A1_STUDY.content[1][0],current=f.w.DE_A1_STUDY.unitTasks(unit),old={q:'Du ___ aus Kanada.',answer:'kommst',o:['kommst','komme','kommen'],audio:'Du kommst aus Kanada.'};
 const p={contentRevision:149,best:8,session:{ex:[current[0],old],i:1,score:1,draft:'kommst',orderPicked:[1]}};f.w.DE_A1_STUDY.refreshSession(p,current,157);assert.equal(p.best,8);assert.equal(p.session.score,1);assert.equal(p.session.ex[0].q,current[0].q);assert.notEqual(p.session.ex[1].q,old.q);assert.equal(p.session.draft,'');assert.equal(p.previousDrafts[0].ex[1].q,old.q);
 const checked={contentRevision:149,best:8,session:{ex:[old],i:0,score:1,response:{ok:true},draft:'kommst'}};f.w.DE_A1_STUDY.refreshSession(checked,current,157);assert.equal(checked.session.ex[0].q,old.q);assert(checked.session.response.ok);
 f.w.eval(read('deutsch/review-practice.js'));const api=f.w.DE_A1_REVIEW,state={doneLessons:[],lessonWork:{},reviewPractice:{imported:true,items:{}}},q=api.task(1,'grammar:study-1-0','Se présenter',old);api.record(state,q,false);api.refreshQuestions(state,f.lessons,l=>f.html(l));assert(state.reviewPractice.items[q.id].retired);assert.equal(state.reviewPractice.items[q.id].wrong,1);assert.equal(api.pending(state).length,0);f.dom.window.close();
});
test('complete-course vocabulary practice still rates a preserved older card without a current teaching placement',()=>{
 const f=fixture('francais');load(f);delete f.w.A1LessonFoundations;delete f.w.A1LessonLexicon;f.w.A1_VOCABULARY_CONTENT=[{fr:'ancien',de:'früher',frLessons:[1],deLessons:[1]}];f.w.A1LessonVocabularyPlan={fr:{1:{regular:[],hardOnly:[]}}};const state={doneLessons:[]};
 f.w.A1Vocabulary.render({view:f.view,state,lessons:[{id:1,title:'Test'}],course:'fr',save(){},speak(){}});f.view.querySelector('#vtStart').click();const card=state.vocabularyTrainer.session.cards[0];assert.equal(card.lessonId,1);f.view.querySelector('#vtReveal').click();f.view.querySelector('#vtAgain').click();assert.equal(state.vocabularyTrainer.lessonItems[1][card.id].wrong,1);f.dom.window.close();
});
