const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(p,'utf8');
function fixture(course){
 const dom=new JSDOM('<main id="view"></main>',{url:`https://example.org/${course}/`,runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window;
 const NativeObserver=w.MutationObserver,observers=[],close=w.close.bind(w);w.MutationObserver=class extends NativeObserver{constructor(fn){super(fn);observers.push(this);}};w.close=()=>{observers.forEach(o=>o.disconnect());close();};
 w.scrollTo=()=>{};w.ResizeObserver=class{observe(){}disconnect(){}};w.esc=x=>String(x);w.A1Profile={getUiLang:()=>course==='francais'?'de':'fr'};
 for(const f of ['shared/learning.js','shared/grammar-ui.js','shared/lesson-topic-info.js','shared/lesson-foundations.js'])w.eval(read(f));
 let lessons,html,original;
 if(course==='francais'){
  for(const f of ['francais/data.js','francais/mastery-specs.js','francais/lesson1-practice.js','francais/deepening-content.js','francais/grammar-practice.js','francais/deepening.js','francais/comprehension-content.js','shared/comprehension.js'])w.eval(read(f));
  const app=read('francais/app.js');w.eval(app.slice(app.indexOf('const GRAMMAR_GUIDES='),app.indexOf('function renderGrammarIntro('))+'window.refs=lessonGrammarHtml;');
  lessons=w.FR_A1_DATA.lessons;html=l=>w.FR_A1_DEEPENING.enrich(l,w.refs(l));original=l=>l;
 }else{
  for(const f of ['deutsch/lesson-content.js','deutsch/pronouns.js','deutsch/grammar-drills.js','deutsch/deepening-content.js','deutsch/question-content.js','deutsch/applications.js','deutsch/study.js','deutsch/assessments.js','deutsch/comprehension-content.js','shared/comprehension.js'])w.eval(read(f));
  const app=read('deutsch/app.js');w.eval(app.slice(0,app.indexOf('const stateKey'))+'window.testData={lessons,grammarSets,formTasks};');
  w.eval(app.slice(app.indexOf('const GRAMMAR_GUIDES='),app.indexOf('function renderGrammarIntro('))+'window.refs=lessonGrammarReferenceHtml;');
  w.DE_A1_ASSESSMENTS.configure({...w.testData,practiceProgress:{recordGrammar(){}}});
  lessons=w.testData.lessons;html=l=>w.DE_A1_STUDY.grammarHtml(l,w.refs(l.id),()=>'<button>Audio</button>');original=l=>w.A1_COURSE_CONTENT[l.id-1];
 }
 w.eval(read(course+'/lesson-flow.js'));
 const view=w.document.getElementById('view'),state={doneLessons:[24],lessonWork:{},lessonQuizBest:{},lessonMasteryBest:{24:95}};
 const render=l=>w.A1LessonFlow.render({lesson:l,content:original(l),view,state,targetLang:course==='francais'?'fr':'de',uiLang:course==='francais'?'de':'fr',lessonCount:24,grammarHtml:html(l),save(){},speak(){},speakBtn:()=>'<button>Audio</button>',wireSpeakButtons(){},recorderHtml:()=>'',renderLearn(){},renderLesson(){},renderMastery(){}});
 return {dom,w,view,state,lessons,render,html};
}
for(const course of ['francais','deutsch']){
 test(course+': all 24 lessons keep prerequisites at their actual topic, without repeating a full course summary',()=>{
  const f=fixture(course),{w,view}=f,lang=course==='francais'?'fr':'de';let additions=0;
  for(const l of f.lessons){
   const definition=w.A1LessonFoundations.content[lang][l.id],before=f.html(l),holder=w.document.createElement('div');holder.innerHTML=before;
   f.render(l);const primer=view.querySelector('.lesson-foundations.is-intro'),quiz=view.querySelector('#startQuiz');assert(quiz);
   assert.equal(!!primer,definition.intro.length>0);if(primer){assert(!primer.closest('details'));assert(primer.compareDocumentPosition(quiz)&w.Node.DOCUMENT_POSITION_FOLLOWING);assert(primer.textContent.split(/\s+/).length<170);assert(!primer.querySelector('dl,table'));}
   const glossary=view.querySelector('details.lesson-extra-vocabulary');if(glossary){assert(!glossary.open);assert(glossary.querySelector('dl'));assert(!glossary.querySelector('.lesson-foundation-rule'));assert(quiz.compareDocumentPosition(glossary)&w.Node.DOCUMENT_POSITION_FOLLOWING);glossary.querySelector('summary').click();assert(glossary.open);}
   const count=holder.querySelectorAll('details.grammar-detail').length;
   view.querySelector('[data-lesson-step="grammar"]').click();const buttons=[...view.querySelectorAll('[data-grammar-progress]')];assert.equal(buttons.length,count+(course==='francais'&&l.id===1?1:0));
   const seen=new Set();
   for(let i=0;i<buttons.length;i++){
    view.querySelector(`[data-grammar-progress="${i}"]`).click();assert(!view.querySelector('details.lesson-foundations'));assert(!view.querySelector('.lesson-foundations.is-intro'));
    const extra=view.querySelector('[data-foundation-topic]');if(!extra)continue;const title=extra.dataset.foundationTopic;assert(!seen.has(title));seen.add(title);additions++;
    assert.equal(extra.querySelectorAll('.lesson-foundation-rule').length,definition.topics[title].length);
    assert(!extra.querySelector('dl'));const practice=view.querySelector('#lessonGrammarPage .deepening-practice,#lessonGrammarPage .lesson1-grammar-practice');if(practice)assert(extra.compareDocumentPosition(practice)&w.Node.DOCUMENT_POSITION_FOLLOWING,'explain before practising');
    for(const row of extra.querySelectorAll('.lesson-foundation-example'))assert(row.querySelector('strong[lang]')&&row.querySelector('span'));
   }
   assert.deepEqual([...seen].sort(),Object.keys(definition.topics).sort(),`L${l.id}: every supplement has exactly one real destination`);
   assert.equal(f.html(l),before,'view supplements must not change task generation');
  }
  assert(additions>5);assert.deepEqual([...f.state.doneLessons],[24]);assert.equal(f.state.lessonMasteryBest[24],95);f.dom.window.close();
 });
 test(course+': additional words reach the existing lesson decks without copying known word cards',()=>{
  const f=fixture(course),lang=course==='francais'?'fr':'de';for(const file of ['shared/vocabulary-content.js','shared/vocabulary-trainer.js'])f.w.eval(read(file));
  const options={course:lang,lessons:f.lessons,units:course==='francais'?f.w.FR_A1_DEEPENING_CONTENT:f.w.DE_A1_STUDY.content},bank=f.w.A1Vocabulary.buildBank(options),normalize=s=>String(s).normalize('NFC').replace(/[’‘]/g,"'").toLocaleLowerCase().replace(/\s+/g,' ').trim();
  const api=f.w.A1LessonFoundations;delete f.w.A1LessonFoundations;const base=f.w.A1Vocabulary.buildBank(options);f.w.A1LessonFoundations=api;
  for(const entry of base)assert(bank.some(e=>e.id===entry.id),'keep existing vocabulary IDs');
  for(const [id,lesson]of Object.entries(api.content[lang]))for(const[word]of lesson.words){const current=bank.filter(e=>normalize(e.target)===normalize(word)),previous=base.filter(e=>normalize(e.target)===normalize(word));assert.equal(current.length,Math.max(1,previous.length));assert(current.some(e=>e.lessons.includes(Number(id))),`${id}: ${word}`);assert(!/[.!?]/u.test(word),'word lists must not become full sentence decks');}
  f.dom.window.close();
 });
 test(course+': HTML and offline cache use matching clarity assets',()=>{
  const index=read(course+'/index.html'),worker=read(course+'/service-worker.js');for(const asset of ['../shared/lesson-foundations.js?v=vocabulary-pairs-160','lesson-flow.js?v=teaching-placement-157','../shared/lesson-ui.css?v=vocabulary-audio-158','../shared/vocabulary-trainer.js?v=vocabulary-pairs-160'])assert(index.includes(asset)&&worker.includes(asset));assert(index.indexOf('lesson-foundations.js')<index.indexOf('lesson-flow.js'));assert(worker.includes('live-vocabulary-pairs-v160'));
 });
}
test('French L9 explains the purpose and actual transformation of the imperative without a vocabulary dump',()=>{
 const f=fixture('francais');f.render(f.lessons[8]);assert(!f.view.querySelector('.lesson-foundations.is-intro'));f.view.querySelector('[data-lesson-step="grammar"]').click();const page=f.view.querySelector('#lessonGrammarPage');
 assert(page.textContent.includes('Mit dem Imperativ gibst du eine Anweisung'));for(const text of ['vous allez → Allez','vous tournez → Tournez','vous prenez → Prenez'])assert(page.textContent.includes(text));assert(!page.textContent.includes('Tout droit = geradeaus, à gauche = links'));
 const pairs=[];for(const row of page.querySelectorAll('table tbody tr,.deepening-examples .phrase-row,.deepening-form-example')){const cells=row.querySelectorAll('td');let a,b;if(cells.length===2){const c=cells[0].cloneNode(true);c.querySelectorAll('button').forEach(x=>x.remove());a=c.textContent;b=cells[1].textContent;}else{a=row.querySelector('strong')?.textContent;b=row.querySelector('small')?.textContent;}if(a&&b)pairs.push(JSON.stringify([a.trim(),b.trim()]));}assert.equal(new Set(pairs).size,pairs.length);f.dom.window.close();
});
test('French negation and the German irregular forms still precede their relevant practice',()=>{
 const fr=fixture('francais'),de=fixture('deutsch'),text=(f,lang,n,title)=>f.w.A1LessonFoundations.enhance(lang,n,title,'<div class="grammar-detail-body"><div class="deepening-practice"></div></div>');
 for(const[n,title,needle]of [[1,'Grundlagen','Ne … pas'],[4,'Einen Termin vereinbaren & bestätigen','Il n’y a pas de cours.'],[8,'Räume & il y a','il n’y a pas de + Nomen'],[16,'pouvoir','nous voulons'],[22,'Passé composé mit avoir','J’ai pris le bus.']])assert(text(fr,'fr',n,title).includes(needle));
 for(const[n,title,needle]of [[6,'Commander un repas','wir hätten'],[9,'Expliquer un chemin','Nimm'],[11,'Apprendre et demander de l’aide','du liest'],[16,'Lire panneaux et restrictions','ich darf']])assert(text(de,'de',n,title).includes(needle));
 fr.dom.window.close();de.dom.window.close();
});
test('all new French-course explanations, example translations and glossary meanings have English display equivalents',()=>{
 const f=fixture('francais');f.w.eval(read('francais/en.js'));const dictionary=f.w.FR_A1_EN;
 for(const lesson of Object.values(f.w.A1LessonFoundations.content.fr)){
  for(const r of [...lesson.intro,...Object.values(lesson.topics).flat()]){for(const field of [r.title,r.rule])assert(dictionary[field[0]]&&field[1]);for(const[,meaning,en]of r.examples)assert(dictionary[meaning]&&en);}
  for(const[,meaning,en]of lesson.words)assert(dictionary[meaning]&&en);
 }
 for(const file of ['shared/vocabulary-content.js','shared/vocabulary-trainer.js'])f.w.eval(read(file));const el=f.w.document.createElement('div');el.innerHTML=f.w.A1LessonFoundations.vocabularyHtml('fr',9);assert(el.querySelector('dl[data-i18n-ignore] dt[lang="fr"]'));f.dom.window.close();
});
test('emphasised French imperative prose switches languages, and moved examples keep their existing audio button',()=>{
 const f=fixture('francais');f.render(f.lessons[8]);f.view.querySelector('[data-lesson-step="grammar"]').click();f.w.eval(read('francais/en.js'));f.w.eval(read('francais/i18n.js'));f.w.A1Profile.getUiLang=()=> 'en';f.w.dispatchEvent(new f.w.Event('a1suite:languagechange'));
 const english=f.view.querySelector('#lessonGrammarPage').textContent;assert(english.includes('The imperative gives an instruction'));assert(english.includes('Likewise, vous tournez'));assert(!english.includes('Die Bildung der Anweisung'));f.w.A1Profile.getUiLang=()=> 'de';f.w.dispatchEvent(new f.w.Event('a1suite:languagechange'));assert(f.view.querySelector('#lessonGrammarPage').textContent.includes('Mit dem Imperativ gibst du'));
 f.render(f.lessons[9]);f.view.querySelector('[data-lesson-step="grammar"]').click();const rows=[...f.view.querySelectorAll('#lessonGrammarPage .phrase-row')].filter(row=>row.querySelector('strong')?.textContent==='Je dois faire mes devoirs.');assert.equal(rows.length,1);assert(rows[0].querySelector('[data-speak]'));assert(rows[0].closest('.lesson-foundations.is-topic'));f.dom.window.close();
});
test('simplified German audio and writing avoid untaught past tense, preserve facts and archive previous versions',()=>{
 const dom=new JSDOM('',{runScripts:'outside-only'}),w=dom.window;w.eval(read('deutsch/hard-mode-content.js'));
 for(const id of [7,8,13,18,21]){
  const current=w.DE_A1_HARD_CONTENT[id],old=w.DE_A1_HARD_VERSIONS[2][id];assert.equal(current.version,3);assert.equal(old.version,2);assert(current.compatibleVersions.includes(2));
  assert.deepEqual(current.gaps,old.gaps);assert.deepEqual(current.listening.map(b=>b.questions),old.listening.map(b=>b.questions));
  assert.notEqual(JSON.stringify(current.listening),JSON.stringify(old.listening));
  for(const block of current.listening){assert.equal(block.text.replace(/^A: |\n[A-Z]: /g,' ').trim(),block.turns.map(t=>t.text).join(' '));assert(!/\b(?:gefunden|reserviert|gekauft)\b/.test(block.text));}
 }
 assert(!w.DE_A1_HARD_CONTENT[7].writing.model.includes('gesehen'));assert(w.DE_A1_HARD_VERSIONS[2][7].writing.model.includes('gesehen'));dom.window.close();
});
test('changed German recordings migrate running drafts, but submitted work and previous bests keep their original data',()=>{
 const f=fixture('deutsch'),{w,view}=f;w.eval(read('deutsch/hard-mode-content.js'));w.eval(read('deutsch/hard-mode.js'));
 const original=w.DE_A1_HARD_VERSIONS[2][7],count=original.listening.flatMap(b=>b.questions).length;
 for(const phase of ['running','submitted']){
  const attempt={version:2,phase,page:phase==='running'?1:2,gaps:original.gaps.map(g=>g.answers[0]),listening:Array(count).fill('réponse'),plays:[1,2],text:original.writing.model,ratings:[null,null,null,null],startedAt:10,...(phase==='submitted'?{submittedAt:20}:{})},snapshot=JSON.stringify(attempt);
  const progress={attempt,bestObjective:95,bestByVersion:{2:95},passedAt:1,passedVersion:2},state={lessonMasteryBest:{7:88},lessonWork:{7:{hardMode:progress}}};
  w.DE_A1_HARD_MODE.render({lesson:f.lessons[6],view,state,save(){},onBack(){}});
  assert.equal(progress.bestByVersion[2],95);assert.equal(progress.bestObjective,95);assert.equal(progress.passedVersion,2);assert.equal(state.lessonMasteryBest[7],88);
  if(phase==='running'){
   assert.equal(progress.attempt.version,3);assert.equal(JSON.stringify(progress.history[0]),snapshot);assert.deepEqual([...progress.attempt.plays],[1,0]);assert.equal(progress.attempt.text,original.writing.model);assert.equal(progress.contentVersions[2].version,2);
  }else{
   assert.equal(progress.attempt.version,2);assert.equal(progress.attempt.text,original.writing.model);assert(view.querySelector('#hardWriting').readOnly);assert(view.textContent.includes('gesehen'));
  }
 }
 f.dom.window.close();
});
