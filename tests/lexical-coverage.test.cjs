const{test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),crypto=require('crypto'),{fixture}=require('./helpers/a1-fixture.cjs'),{collect}=require('./helpers/lesson-language-corpus.cjs');
const read=p=>fs.readFileSync(p,'utf8');
function words(f){for(const file of ['shared/lesson-vocabulary-plan.js','shared/lesson-lexicon.js','shared/vocabulary-content.js','shared/vocabulary-trainer.js'])f.w.eval(read(file));}
for(const[course,code]of [['francais','fr'],['deutsch','de']]){
 test(course+': every reviewed lexical occurrence is available in its lesson, and existing cards keep their IDs',()=>{
  const f=fixture(course);words(f);const options={course:code,lessons:f.lessons,units:code==='fr'?f.w.FR_A1_DEEPENING_CONTENT:f.w.DE_A1_STUDY.content},api=f.w.A1LessonLexicon;
  delete f.w.A1LessonLexicon;const baseline=f.w.A1Vocabulary.buildBank(options);f.w.A1LessonLexicon=api;const bank=f.w.A1Vocabulary.buildBank(options);
  for(const old of baseline){const current=bank.find(e=>e.id===old.id);assert(current,old.target);assert.equal(current.meaning,old.meaning);for(const id of old.lessons)assert(current.lessons.includes(id));}
  for(const[target,usedIn,forms]of api.entries[code])for(const id of usedIn){const entry=bank.find(e=>e.target===target&&e.lessons.includes(id));assert(entry,`${id}: ${target}`);for(const form of forms)assert(entry.searchForms.includes(form));}
  assert(bank.every(e=>e.kind==='word'));f.dom.window.close();
 });
 test(course+': the overview includes all regular words of this lesson while Hard Mode additions remain separate',()=>{
  const f=fixture(course);words(f);for(const l of f.lessons){
   const html=f.w.A1LessonFoundations.vocabularyHtml(code,l.id),el=f.w.document.createElement('div');el.innerHTML=html;
   const bank=f.w.A1Vocabulary.buildBank({course:code,lessons:f.lessons,units:code==='fr'?f.w.FR_A1_DEEPENING_CONTENT:f.w.DE_A1_STUDY.content});
   const labels=[...el.querySelectorAll('dt')].map(e=>e.textContent);
   const regular=f.w.A1LessonVocabularyPlan[code][l.id].regular;
   const expected=[...new Set(bank.filter(e=>e.lessons.includes(l.id)&&regular.includes(e.target)).map(e=>e.target))];
   assert.deepEqual([...labels].sort(),expected.map(t=>f.w.A1Vocabulary.displayText(code,t)).sort(),`L${l.id}: complete regular overview`);
   for(const target of labels){const row=[...el.querySelectorAll('dl>div')].find(row=>row.querySelector('dt').textContent===target);for(const word of bank.filter(e=>f.w.A1Vocabulary.displayText(code,e.target.normalize('NFC'))===target&&e.lessons.includes(l.id)))assert(row.querySelector('dd').textContent.includes(f.w.A1Vocabulary.displayText(code,word.meaning)));}
   if(labels.length){assert(!el.querySelector('details').open);assert(el.textContent.includes(code==='fr'?'Wortliste der Lektion':'Liste de mots de la leçon'));}else assert.equal(html,'');


  }
  f.render(f.lessons[10]);f.view.querySelector('[data-lesson-step="comprehension"]').click();assert.equal(!!f.view.querySelector('[data-vocabulary-stage="comprehension"]'),f.w.A1LessonVocabularyPlan[code][11].stages.comprehension.length>0);assert(f.view.querySelector('#dialoguePlay'));f.dom.window.close();
 });
 test(course+': lexical aliases can be looked up with a copied pronoun without affecting stored grades',()=>{
  const f=fixture(course);words(f);const state={doneLessons:[1],vocabularyTrainer:{version:2,items:{},lessonItems:{},lessonDecksImported:true,settings:{},session:null}},view=f.view;
  const open=()=>f.w.A1Vocabulary.render({view,state,lessons:f.lessons,course:code,save(){},speak(){}});open();
  for(const[query,target]of code==='fr'?[['nous nous levons','se lever'],['je me lève','se lever'],['signez','signer'],['ligne','la ligne']]:[['ihr habt','haben'],['du liest','lesen'],['Telefonnummer','die Telefonnummer']]){
   const input=view.querySelector('#vtSearch');input.value=query;input.dispatchEvent(new f.w.Event('input'));assert([...view.querySelectorAll('.vt-entry strong')].some(e=>e.textContent===target),query);
  }
  assert.deepEqual(JSON.parse(JSON.stringify(state.vocabularyTrainer.items)),{});assert.deepEqual(JSON.parse(JSON.stringify(state.vocabularyTrainer.lessonItems)),{});f.dom.window.close();
 });
 test(course+': new lexical data is loaded before both consumers and is cached offline',()=>{
  const html=read(course+'/index.html'),sw=read(course+'/service-worker.js');assert(html.includes('../shared/lesson-lexicon.js?v=lexical-153'));assert(sw.includes('../shared/lesson-lexicon.js?v=lexical-153'));assert(html.indexOf('lesson-lexicon.js')<html.indexOf('vocabulary-trainer.js'));assert(sw.includes('live-vocabulary-notes-v159'));
 });
}
test('reviewed source fingerprints cover all question variants, models and actual recordings in all 48 lessons',()=>{
 const courses=collect(),f=fixture('francais');f.w.eval(read('shared/lesson-lexicon.js'));let lessons=0;
 for(const[code,course]of Object.entries(courses))for(const l of course.lessons){const texts=[...new Set(l.segments.map(s=>s.text.replace(/\\n/g,'\n').normalize('NFC').replace(/\s+/g,' ').trim()))].sort(),hash=crypto.createHash('sha256').update(JSON.stringify(texts)).digest('hex');assert.equal(hash,f.w.A1LessonLexicon.reviewedCorpus[code][l.id],`${code} L${l.id}: target text changed; review vocabulary/prerequisites before updating the inventory`);lessons++;}
 assert.equal(lessons,48);f.dom.window.close();
});
test('semantic guards avoid assigning words through incidental phrase components',()=>{
 const f=fixture('francais');f.w.eval(read('shared/lesson-lexicon.js'));const fr=f.w.A1LessonLexicon.entries.fr,de=f.w.A1LessonLexicon.entries.de;
 for(const target of ['la clé','bon marché','appeler'])assert(!fr.find(e=>e[0]===target)?.[1].includes(1),target);
 assert(!de.find(e=>e[0]==='es regnet')?.[1].includes(1));assert(!de.find(e=>e[0]==='gerade etwas getan haben / kommen aus')?.[1].includes(1));
 assert(fr.find(e=>e[0]==='s’appeler')[1].includes(1));assert(fr.find(e=>e[0]==='pouvoir')[1].includes(2));assert(fr.find(e=>e[0]==='dans')[1].includes(2));assert(de.find(e=>e[0]==='gehören')[1].includes(3));f.dom.window.close();
});
