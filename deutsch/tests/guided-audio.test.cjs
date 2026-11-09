const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'../..',p),'utf8');
function environment(){
 const dom=new JSDOM('<main><header class="lesson-step-header"></header><section class="lesson-step-content"><p>Erklärung</p></section></main><button id="away">Weiter</button>',{runScripts:'outside-only'}),w=dom.window,spoken=[];
 w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};w.speechSynthesis={};w.A1Voice={select:lang=>({lang}),cancel(){},playUtterance:u=>spoken.push(u)};
 const app=read('deutsch/app.js');w.eval(app.slice(0,app.indexOf('const listening'))+';window.germanLessons=lessons;');w.eval(read('deutsch/guided-audio.js'));
 const view=w.document.querySelector('main'),options={view,lesson:w.germanLessons[0],step:'listen',title:'Écouter & comprendre',root:view.querySelector('section')};
 return {dom,w,view,spoken,options,mount(){w.DE_A1_GUIDED_AUDIO.mount(options);},play(){view.querySelector('[data-guided-play]').click();}};
}
test('all 24 lessons narrate every phrase in German followed by French before the exercise handoff',()=>{
 const e=environment();for(const lesson of e.w.germanLessons){const parts=e.w.DE_A1_GUIDED_AUDIO.plan({...e.options,lesson});const fr=parts.filter(p=>p.phrase!==undefined);assert.equal(fr.length,lesson.phrases.length);for(let i=0;i<fr.length;i++){assert.equal(fr[i].text,lesson.phrases[i][0]);assert.equal(fr[i].lang,'de-DE');const translation=parts[parts.indexOf(fr[i])+1];assert.equal(translation.text,lesson.phrases[i][1]);assert.equal(translation.lang,'fr-FR');}assert.match(parts.at(-1).text,/À toi de jouer.*Dix questions/);}e.dom.window.close();
});
test('explanations preserve marked German examples and omit controls, hidden answers and exercises',()=>{
 const e=environment(),root=e.w.document.createElement('div');root.innerHTML='<p>Deutsch erklärt.</p><div class="phrase-row"><strong>Guten Tag</strong><small>Bonjour</small><button data-speak="Guten Tag">Lautsprecher</button></div><p lang="de">Ich spreche Deutsch.</p><p hidden>Geheim</p><div class="deepening-practice">Lösung</div>';
 const parts=e.w.DE_A1_GUIDED_AUDIO.readContent(root);assert(parts.some(p=>p.lang==='de-DE'&&p.text.includes('Guten Tag')));assert(parts.some(p=>p.lang==='fr-FR'&&p.text.includes('Bonjour')));assert(!JSON.stringify(parts).match(/Geheim|Lösung|Lautsprecher/));e.dom.window.close();
});
test('play is explicit; pause resumes the same segment; stale callbacks cannot advance or mark heard',()=>{
 const e=environment(),heard=[];e.options.onPhraseEnd=i=>heard.push(i);e.mount();assert.equal(e.spoken.length,0);e.play();let intro=e.spoken.at(-1);e.play();intro.onend();assert.equal(e.spoken.length,1);e.play();assert.equal(e.spoken.at(-1).text,intro.text);e.spoken.at(-1).onend();e.spoken.at(-1).onend();const french=e.spoken.at(-1);assert.equal(french.lang,'de-DE');assert.equal(heard.length,0);french.onend();assert.deepEqual(heard,[0]);assert.equal(e.spoken.at(-1).lang,'fr-FR');e.w.document.querySelector('#away').click();const count=e.spoken.length;e.spoken.at(-1).onend();assert.equal(e.spoken.length,count);e.dom.window.close();
});
test('navigation disposes playback; errors and missing synthesis show usable states',async()=>{
 const e=environment();e.mount();e.play();e.spoken[0].onerror();assert.match(e.view.querySelector('[data-guided-status]').textContent,/interrompue/);e.play();const old=e.spoken.at(-1);e.view.innerHTML='<header class="lesson-step-header"></header>';await Promise.resolve();const count=e.spoken.length;old.onend();assert.equal(e.spoken.length,count);delete e.w.speechSynthesis;e.mount();assert.equal(e.view.querySelector('[data-guided-play]').disabled,true);e.dom.window.close();
});
test('listening comprehension never narrates its transcript or answers',()=>{
 const e=environment();e.options.root.innerHTML='<p>Geheime Lösung und Hörtranskript</p>';const plan=e.w.DE_A1_GUIDED_AUDIO.plan({...e.options,step:'comprehension'});assert(!JSON.stringify(plan).includes('Geheime'));e.dom.window.close();
});

function courseEnvironment(){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/deutsch/',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window;
 w.scrollTo=()=>{};w.ResizeObserver=class{observe(){}disconnect(){}};w.Math.random=()=>.99;
 w.A1Learning={shuffle:a=>[...a],countWords:s=>s.trim().split(/\s+/).filter(Boolean).length,wireRecorder:()=>{}};
 for(const f of ['deutsch/lesson-content.js','shared/lesson-guide.js','shared/grammar-ui.js','shared/lesson-topic-info.js','shared/pronunciation.js','shared/exercise-review.js','deutsch/pronouns.js','deutsch/answer-audio.js','shared/exercise-engine.js','deutsch/grammar-drills.js','deutsch/deepening-content.js','deutsch/question-content.js','deutsch/applications.js','deutsch/study.js','deutsch/page-checks.js','deutsch/assessments.js','deutsch/pronunciation.js','deutsch/comprehension-content.js','shared/comprehension.js','deutsch/lesson-flow.js'])w.eval(read(f));
 const app=read('deutsch/app.js');w.eval(app.slice(0,app.indexOf('const stateKey'))+';window.testData={lessons,grammarSets,formTasks};');
 w.eval(app.slice(app.indexOf('const GRAMMAR_GUIDES='),app.indexOf('function renderGrammarIntro('))+'window.testRefs=lessonGrammarReferenceHtml;');
 w.DE_A1_ASSESSMENTS.configure({...w.testData,practiceProgress:{recordGrammar:()=>{}}});
 const view=w.document.getElementById('view');return {dom,w,view};
}
function courseState(){return {doneLessons:[],lessonWork:{},lessonQuizBest:{}};}
function renderCourse(env,id,s,audio=[],options={}){const {w,view}=env,l=w.testData.lessons[id-1],app=w.DE_A1_APPLICATIONS[id],original=w.A1_COURSE_CONTENT[id-1],c={...original,transfer:{...original.transfer,writing:app.writingTask||original.transfer.writing}};
 w.A1LessonFlow.render({lesson:l,content:c,view,state:s,save:()=>{},lessonCount:24,targetLang:'de',uiLang:'fr',grammarHtml:w.DE_A1_STUDY.grammarHtml(l,w.testRefs(id),text=>`<button data-speak="${text}">🔊</button>`),goalsHtml:'<div class="lesson-goals">Objectifs</div>',pronunciationHtml:w.DE_A1_PRONUNCIATION.render(c),dialogueHtml:w.A1LessonGuide.parts(id,'fr',s=>s,()=>'<button>🔊</button>').dialogue,model:app.speakModel,writingModel:app.writeModel,writingHints:app.hints,writingFields:app.fields,minWords:app.minWords,recorderHtml:()=>'',speakBtn:t=>`<button data-speak="${t}">🔊</button>`,wireSpeakButtons:()=>{},wirePronunciation:()=>{},speak:t=>audio.push(t),renderLearn:()=>{},renderLesson:()=>{},renderMastery:({onBack,onResult})=>w.DE_A1_ASSESSMENTS.renderLessonTest({lesson:l,view,state:s,save:()=>{},speak:t=>audio.push(t),onBack,onResult}),renderGrammarCheck:({onBack})=>w.DE_A1_ASSESSMENTS.renderGrammarCheck({view,state:s,save:()=>{},speak:t=>audio.push(t),onBack}),...options});
}

test('all 24 German lessons render bilingual tours, track heard audio and preserve exercise progress',async()=>{
 const env=courseEnvironment(),{w,view}=env,spoken=[];w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};w.speechSynthesis={};w.A1Voice={select:lang=>({lang}),cancel(){},playUtterance:u=>spoken.push(u)};
 for(const file of ['shared/lesson-vocabulary-plan.js','shared/lesson-foundations.js','deutsch/guided-audio.js'])w.eval(read(file));
 const state=courseState();
 for(const lesson of w.testData.lessons){
  renderCourse(env,lesson.id,state);assert.equal(view.querySelectorAll('.guided-audio').length,1);view.querySelector('[data-guided-play]').click();let count=0;
  while(view.querySelector('[data-guided-play]').textContent==='Ⅱ Pause'){assert(count++<1000);spoken.at(-1).onend();}
  assert.equal(state.lessonWork[lesson.id].heardPhrases.length,new Set(lesson.phrases.map(p=>p[0])).size);assert.equal(state.lessonWork[lesson.id].quizDone,undefined);
  view.querySelector('[data-lesson-step="grammar"]').click();assert.equal(view.querySelectorAll('.guided-audio').length,1);view.querySelector('[data-guided-play]').click();assert.match(spoken.at(-1).text,/Approfondir/);
  const page=view.querySelector('#lessonGrammarPage'),plan=w.DE_A1_GUIDED_AUDIO.readContent(page);assert(plan.some(p=>p.lang==='de-DE'));assert(plan.some(p=>p.lang==='fr-FR'));
 }
 view.innerHTML='';await Promise.resolve();env.dom.window.close();
});
test('German conjugation tables and French translations retain the right language',()=>{
 const e=environment(),root=e.w.document.createElement('div');root.innerHTML='<table class="study-conjugation"><tbody><tr><th>ich</th><td>bin<button data-speak="ich bin">Audio</button></td></tr></tbody></table><p lang="fr">Je suis</p>';
 const plan=e.w.DE_A1_GUIDED_AUDIO.readContent(root);assert(plan.some(p=>p.lang==='de-DE'&&p.text.includes('bin')));assert(plan.some(p=>p.lang==='fr-FR'&&p.text.includes('Je suis')));e.dom.window.close();
});
