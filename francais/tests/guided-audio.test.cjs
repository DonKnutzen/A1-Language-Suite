const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'../..',p),'utf8');
function environment(){
 const dom=new JSDOM('<main><header class="lesson-step-header"></header><section class="lesson-step-content"><p>Erklärung</p></section></main><button id="away">Weiter</button>',{runScripts:'outside-only'}),w=dom.window,spoken=[];
 w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};w.speechSynthesis={};w.A1Voice={select:lang=>({lang}),cancel(){},playUtterance:u=>spoken.push(u)};
 w.eval(read('francais/data.js'));w.eval(read('francais/guided-audio.js'));
 const view=w.document.querySelector('main'),options={view,lesson:w.FR_A1_DATA.lessons[0],step:'listen',title:'Hören & Verstehen',root:view.querySelector('section')};
 return {dom,w,view,spoken,options,mount(){w.FR_A1_GUIDED_AUDIO.mount(options);},play(){view.querySelector('[data-guided-play]').click();}};
}
test('all 24 lessons narrate every phrase in French followed by German before the exercise handoff',()=>{
 const e=environment();for(const lesson of e.w.FR_A1_DATA.lessons){const parts=e.w.FR_A1_GUIDED_AUDIO.plan({...e.options,lesson});const fr=parts.filter(p=>p.phrase!==undefined);assert.equal(fr.length,lesson.phrases.length);for(let i=0;i<fr.length;i++){assert.equal(fr[i].text,lesson.phrases[i][0]);assert.equal(fr[i].lang,'fr-FR');const translation=parts[parts.indexOf(fr[i])+1];assert.equal(translation.text,lesson.phrases[i][1]);assert.equal(translation.lang,'de-DE');}assert.match(parts.at(-1).text,/Jetzt bist du dran.*Zehn Fragen/);}e.dom.window.close();
});
test('explanations preserve marked French examples and omit controls, hidden answers and exercises',()=>{
 const e=environment(),root=e.w.document.createElement('div');root.innerHTML='<p>Deutsch erklärt.</p><div class="phrase-row"><strong>Bonjour</strong><small>Guten Tag</small><button data-speak="Bonjour">Lautsprecher</button></div><p lang="fr">Je parle français.</p><p hidden>Geheim</p><div class="deepening-practice">Lösung</div>';
 const parts=e.w.FR_A1_GUIDED_AUDIO.readContent(root);assert(parts.some(p=>p.lang==='fr-FR'&&p.text.includes('Bonjour')));assert(parts.some(p=>p.lang==='de-DE'&&p.text.includes('Guten Tag')));assert(!JSON.stringify(parts).match(/Geheim|Lösung|Lautsprecher/));e.dom.window.close();
});
test('play is explicit; pause resumes the same segment; stale callbacks cannot advance or mark heard',()=>{
 const e=environment(),heard=[];e.options.onPhraseEnd=i=>heard.push(i);e.mount();assert.equal(e.spoken.length,0);e.play();let intro=e.spoken.at(-1);e.play();intro.onend();assert.equal(e.spoken.length,1);e.play();assert.equal(e.spoken.at(-1).text,intro.text);e.spoken.at(-1).onend();e.spoken.at(-1).onend();const french=e.spoken.at(-1);assert.equal(french.lang,'fr-FR');assert.equal(heard.length,0);french.onend();assert.deepEqual(heard,[0]);assert.equal(e.spoken.at(-1).lang,'de-DE');e.w.document.querySelector('#away').click();const count=e.spoken.length;e.spoken.at(-1).onend();assert.equal(e.spoken.length,count);e.dom.window.close();
});
test('navigation disposes playback; errors and missing synthesis show usable states',async()=>{
 const e=environment();e.mount();e.play();e.spoken[0].onerror();assert.match(e.view.querySelector('[data-guided-status]').textContent,/unterbrochen/);e.play();const old=e.spoken.at(-1);e.view.innerHTML='<header class="lesson-step-header"></header>';await Promise.resolve();const count=e.spoken.length;old.onend();assert.equal(e.spoken.length,count);delete e.w.speechSynthesis;e.mount();assert.equal(e.view.querySelector('[data-guided-play]').disabled,true);e.dom.window.close();
});
test('listening comprehension never narrates its transcript or answers',()=>{
 const e=environment();e.options.root.innerHTML='<p>Geheime Lösung und Hörtranskript</p>';const plan=e.w.FR_A1_GUIDED_AUDIO.plan({...e.options,step:'comprehension'});assert(!JSON.stringify(plan).includes('Geheime'));e.dom.window.close();
});
test('the lesson flow mounts the tour in all 24 lessons and records only completed French audio',()=>{
 const e=environment(),{w,view}=e;w.scrollTo=()=>{};w.ResizeObserver=class{observe(){}disconnect(){}};
 for(const file of ['shared/pronunciation.js','francais/mastery-specs.js','shared/grammar-ui.js','shared/lesson-topic-info.js','francais/lesson1-practice.js','francais/deepening-content.js','francais/deepening.js','shared/lesson-vocabulary-plan.js','shared/lesson-foundations.js','francais/lesson-flow.js'])w.eval(read(file));
 w.esc=s=>{const el=w.document.createElement('span');el.textContent=s;return el.innerHTML;};const app=read('francais/app.js');w.eval(app.slice(app.indexOf('const GRAMMAR_GUIDES='),app.indexOf('function renderGrammarIntro('))+'window.grammarHtml=lessonGrammarHtml;');
 const state={doneLessons:[],lessonWork:{},lessonQuizBest:{}};
 for(const lesson of w.FR_A1_DATA.lessons){
  w.A1LessonFlow.render({view,lesson,content:lesson,state,targetLang:'fr',uiLang:'de',lessonCount:24,grammarHtml:w.FR_A1_DEEPENING.enrich(lesson,w.grammarHtml(lesson)),model:'Bonjour',writingModel:'Bonjour',save(){},speak(){},speakBtn:t=>`<button data-speak="${encodeURIComponent(t)}">Audio</button>`,wireSpeakButtons(){},recorderHtml:()=>'',renderLearn(){},renderLesson(){}});
  assert(view.querySelector('[data-guided-play]'));e.play();let count=0;
  while(view.querySelector('[data-guided-play]').textContent==='Ⅱ Pause'){
   assert(count++<1000);const u=e.spoken.at(-1);assert(['fr-FR','de-DE'].includes(u.lang));u.onend();
  }
  assert.equal(state.lessonWork[lesson.id].heardPhrases.length,new Set(lesson.phrases.map(p=>p[0])).size);
  assert.equal(view.querySelectorAll('[data-core-row]:not([hidden])').length>0,true);
  assert.equal(state.lessonWork[lesson.id].quizDone,undefined);
  view.querySelector('[data-lesson-step="grammar"]').click();assert.equal(view.querySelectorAll('.guided-audio').length,1);e.play();assert.match(e.spoken.at(-1).text,/Vertiefung/);
 }
 // Dispose the last player before closing the simulated document.
 w.document.querySelector('#away').click();view.innerHTML='';
 return Promise.resolve().then(()=>e.dom.window.close());
});
