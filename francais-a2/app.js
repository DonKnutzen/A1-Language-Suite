const D=window.FR_A1_DATA;
const COURSE_ID=window.A1_APP_META.course;
const lessons=D.lessons;
const defaultState={
  lastLessonId:0,
  reviewPractice:{},vocabularyTrainer:{version:1,items:{},settings:{},session:null},
  doneLessons:[],lessonWork:{},
  lessonQuizBest:{},
  lessonMasteryBest:{},
  lessonMasteryLast:{},
  courseMasteryBest:{},
  grammarBest:{},
  masteredListening:[],
  masteredReading:[],
  writingDone:[],
  speakingDone:[],
  bestMock:0,
  examScores:{}
};
const stateKey=A1Profile.namespacedKey(window.A1_APP_META.stateBaseKey);

function loadState(){
  const loaded=A1Learning.loadState(stateKey,defaultState);
  if(FR_A1_MASTERY.completePassedLessons(loaded,lessons)){
    A1Profile.saveProgress(COURSE_ID,loaded,Math.round(loaded.doneLessons.length/lessons.length*100));
  }
  return loaded;
}

let state=loadState();

function save(completed=false){if(completed)A1Streak.completeExercise();
  FR_A1_MASTERY.completePassedLessons(state,lessons);
  localStorage.setItem(stateKey,JSON.stringify(state));
  A1Profile.saveProgress(COURSE_ID,state,lessonPct());
}

let audioEnabled=localStorage.getItem('frA2AudioEnabled')!=='false';
let currentRoute='home';
const view=document.getElementById('view');
const audioToggle=document.getElementById('audioToggle');
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const rand=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=A1Learning.shuffle;
function randomizedChoices(task){
  const correct=task.o[task.a],o=shuffle([...task.o]);
  return {...task,o,a:o.indexOf(correct)};
}
const normalize=s=>String(s||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[.,;:!?]/g,'').replace(/\s+/g,' ');
const totalListening=()=>Object.values(D.listening).reduce((s,a)=>s+a.length,0);
const totalReading=()=>Object.values(D.reading).reduce((s,a)=>s+a.length,0);
const practiceProgress=window.A1PracticeProgress?.create({
  lang:'de',lessons,grammarSets:D.grammarSets,listening:D.listening,reading:D.reading,forms:D.forms,writing:D.writing,
  speaking:{
    interview:D.interview.map(x=>'int-'+x.q),
    info:D.infoCards.map(x=>'info-'+x.theme+'-'+x.cue),
    roleplays:D.roleplays.map(x=>'role-'+x.cue)
  },
  bindings:{
    '#pVocab':'vocab','#pGrammar':'grammar','#pListen':'listening','#pRead':'reading','#pWrite':'writing','#pSpeak':'speaking',
    '[data-lp="1"]':'listening:1','[data-lp="2"]':'listening:2','[data-lp="3"]':'listening:3','[data-lp="4"]':'listening:4',
    '[data-rp="1"]':'reading:1','[data-rp="2"]':'reading:2','[data-rp="3"]':'reading:3','[data-rp="4"]':'reading:4',
    '#formPractice':'forms','#msgPractice':'messages',
    '#sp1':'speaking:interview','#sp2':'speaking:info','#sp3':'speaking:roleplays'
  },
  getState:()=>state,save,view:()=>view
});
function overallCompletionPct(){
  const lessonDone=(state.doneLessons||[]).length;
  const grammarDone=Object.values(state.grammarBest||{}).filter(v=>Number(v)>0).length;
  const done=lessonDone+grammarDone+state.masteredListening.length+state.masteredReading.length+state.writingDone.length+new Set(state.speakingDone).size;
  const total=lessons.length+D.grammarSets.length+totalListening()+totalReading()+D.forms.length+D.writing.length+D.interview.length+D.infoCards.length+D.roleplays.length;
  return Math.round(clamp(done/Math.max(total,1)*100,0,100));
}

function speak(text,force=false,rate=.82){
  if((!audioEnabled&&!force)||!text)return;
  A1Voice.speak(text,{lang:'fr-FR',rate});
}
function playCorrectAudio(text,force=false){
  if((!audioEnabled&&!force)||!text)return;
  speak(text,true,.80);
}
function speakBtn(text){
  return `<button class="speak-btn" data-speak="${encodeURIComponent(text)}" aria-label="Aussprache anhören">🔊</button>`;
}
function wireSpeakButtons(){
  document.querySelectorAll('[data-speak]').forEach(b=>b.onclick=()=>speak(decodeURIComponent(b.dataset.speak),true));
}
function updateAudioButton(){
  audioToggle.textContent=audioEnabled?'🔊 Auto':'🔇 Auto';
  audioToggle.classList.toggle('audio-off',!audioEnabled);
}
function lessonPct(){return Math.round(state.doneLessons.length/lessons.length*100);}
window.A1CourseProgressPercent=lessonPct;
function skillPct(kind){
  if(kind==='Hören')return Math.round(clamp(state.masteredListening.length/totalListening()*100,0,100));
  if(kind==='Lesen')return Math.round(clamp(state.masteredReading.length/totalReading()*100,0,100));
  if(kind==='Schreiben')return Math.round(clamp(state.writingDone.length/(D.forms.length+D.writing.length)*100,0,100));
  if(kind==='Sprechen')return Math.round(clamp(new Set(state.speakingDone).size/(D.interview.length+D.infoCards.length+D.roleplays.length)*100,0,100));
  return 0;
}
function skillBar(name){
  const p=skillPct(name);
  return `<div class="skill-row"><strong>${name}</strong><div class="progress"><div style="width:${p}%"></div></div><span>${p}%</span></div>`;
}
function setRoute(route){
  stopHomeMotion();
  currentRoute=route;
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.route===route));
  ({home:renderHome,learn:renderLearn,practice:renderVocab,exam:renderExam}[route]||renderHome)();
  window.scrollTo({top:0,behavior:'smooth'});
}

document.querySelectorAll('.nav-item').forEach(b=>b.onclick=()=>setRoute(b.dataset.route));

let homeOakCleanup=null,homeDailyCleanup=null;
function stopHomeMotion(){
  homeOakCleanup?.();homeOakCleanup=null;
  homeDailyCleanup?.();homeDailyCleanup=null;
}
function renderHome(){
  stopHomeMotion();
  if(!state.reviewPractice?.imported){FR_A1_REVIEW.seed(state);save();}
  const next=A1LessonFlow.continuation(lessons,state);
  const completed=lessons.filter(l=>state.doneLessons.includes(l.id));
  const allDone=completed.length===lessons.length;
  view.innerHTML=`

    <section class="card home-continue-card" aria-labelledby="continueTitle">
      <div class="between"><span class="eyebrow">${allDone?'WIEDERHOLEN':'WEITERLERNEN'}</span><span class="pill">Lektion ${next.id}</span></div>
      <h2 id="continueTitle">${esc(next.title)}</h2>
      <div class="home-learning-goal"><span class="home-detail-label">Dein Lernziel</span><p>${esc(next.canDo[0])}</p></div>

      <button class="primary-btn home-continue-btn" id="continueLesson"><span>${allDone?'Weiter üben':'Fortsetzen'}</span><span class="home-continue-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></span></button>
    </section>
    ${A1DailyReview.html(state,{lang:A1Profile.getUiLang()==='en'?'en':'de',available:completed.length>0||FR_A1_REVIEW.pending(state).length>0,mistakes:FR_A1_REVIEW.pending(state).length})}
    <section class="card course-progress-card" data-streak-anchor>
      <h2>Dein Baum</h2>
      <p class="course-progress-caption oak-explanation">Wächst mit jeder abgeschlossenen Lektion.</p>
      ${A1LearningOak.render({percent:lessonPct(),lang:'de',course:COURSE_ID})}
      ${A1Streak.render('de',{showEmpty:true})}
    </section>
`;
  document.getElementById('continueLesson').onclick=()=>renderLesson(next.id);
  const openReview=initialMode=>{stopHomeMotion();FR_A1_REVIEW.render({view,lessons,state,save,onBack:renderHome,speak,grammarHtml:lessonGrammarHtml,initialMode});};
  document.getElementById('homeReview')?.addEventListener('click',()=>openReview(completed.length?'mixed':'mistakes'));
  document.getElementById('homeMistakes')?.addEventListener('click',()=>openReview('mistakes'));
  homeOakCleanup=A1LearningOak.mount(view.querySelector('[data-learning-oak]'));
  homeDailyCleanup=A1DailyReview.mount(view.querySelector('[data-daily-review]'),{onDayChange:renderHome});
}

function renderLearn(){
  view.innerHTML=`
    <section class="card hero">
      <span class="pill">${lessons.length} LEKTIONEN · TRAINING + ABSCHLUSSTEST</span>
      <h2 style="margin-top:12px">Französisch A2 Kurs</h2>
      <p class="muted">Dieser Kurs bereitet dich auf die Prüfung telc Français A2 vor. ${FR_A1_MASTERY.passedCount(state)}/${lessons.length} Lektions-Checks durchgeführt.</p>
      <div class="progress"><div style="width:${lessonPct()}%"></div></div>
    </section>
    <div class="list">
      ${lessons.map(l=>`<button class="lesson ${state.doneLessons.includes(l.id)?'done':''} ${window.FR_A1_HARD_MODE.achievementClass(window.FR_A1_HARD_MODE.achievement(state,l.id))}" data-lesson="${l.id}">
        <div><span class="num">${l.id}</span><strong>${esc(l.title)}</strong></div>${window.FR_A1_HARD_MODE.achievement(state,l.id)?window.FR_A1_HARD_MODE.achievementBadge(window.FR_A1_HARD_MODE.achievement(state,l.id)):''}
        <div class="lesson-meta lesson-progress-meta">${A1LessonFlow.listProgress(l,state,'de')}</div>
      </button>`).join('')}
    </div>`;
  document.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>renderLesson(+b.dataset.lesson));
}

const LESSON_APPLICATIONS=D.applications||{};

const LESSON_WRITING_HINTS = {};

function renderPlannedLesson(l){
  stopHomeMotion();
  view.innerHTML=`<div class="between"><button class="tiny-btn" id="backPlanned">← Kurs-Übersicht</button><span class="pill">Lektion ${l.id}</span></div>
    <section class="card" style="margin-top:12px"><span class="pill amber">IN VORBEREITUNG</span><h2 style="margin-top:12px">${esc(l.title)}</h2><p class="muted">${esc(l.topic)} · ${l.skills.map(esc).join(' · ')}</p>
    <div class="notice lesson-goals"><strong>Das kann ich nach dieser Lektion</strong><ul>${l.canDo.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
    <h3>${esc(l.grammar.title)}</h3><p>${esc(l.grammar.explanation)}</p>
    <h3>Bezug zur Prüfung telc Français A2</h3><ul>${l.telc.map(x=>`<li lang="fr">${esc(x)}</li>`).join('')}</ul>
    <p class="muted">Einführung, Hören, Vertiefung, Verstehen, Lektionscheck, Vokabeln und Hard Mode dieser Lektion werden gerade erstellt.</p></section>`;
  document.getElementById('backPlanned').onclick=renderLearn;
}

function renderLesson(id){
  const planned=lessons.find(x=>x.id===id);if(planned?.status==='planned')return renderPlannedLesson(planned);
  stopHomeMotion();
  const l=lessons.find(x=>x.id===id),c=l,app=LESSON_APPLICATIONS[id]||{};
  const goalsHtml=`<div class="notice lesson-goals"><strong>Das kann ich nach dieser Lektion</strong><ul>${l.canDo.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`;
  const grammarHtml=FR_A1_DEEPENING.enrich(l,lessonGrammarHtml(l));
  const masteryHtml=FR_A1_MASTERY.introHtml(l,state);
  const dialogueHtml=`<details><summary><strong>Alltagsdialog</strong></summary>${l.dialogue.map((line,i)=>`<div class="phrase-row"><div><small aria-label="Person ${i%2?'B':'A'}">${i%2?'B':'A'}</small><strong>${esc(line)}</strong></div>${speakBtn(line)}</div>`).join('')}</details>`;
  A1LessonFlow.render({
    renderVocabulary:()=>renderVocab(id,()=>renderLesson(id)),vocabularyLabel:A1Vocabulary.label('fr','lessonLink'),
    lesson:l,content:c,view,state,save,resume:true,lessonCount:lessons.length,targetLang:'fr',uiLang:'de',
    goalsHtml,grammarHtml,masteryHtml,masteryCount:FR_A1_MASTERY.testCount(id),dialogueHtml,pronunciationHtml:A1Pronunciation.render(c,'fr','de'),
    renderMastery:({onBack,onResult})=>FR_A1_MASTERY.renderLessonTest({lesson:l,view,state,save,onBack,speak,onResult}),
    renderHardMode:({onBack})=>FR_A1_HARD_MODE.render({lesson:l,view,state,save,onBack}),
    renderGrammarCheck:false?({onBack})=>FR_A1_LESSON1.renderGrammarCheck({view,state,save,onBack,speak}):null,
    model:app.speakModel,writingModel:app.writeModel,placeholder:app.placeholder,writingHints:app.writingHints||LESSON_WRITING_HINTS[id],writingHelpText:app.writingHelpText,fullModel:true,recorderHtml:id=>recorderHtml(id,true),
    repeatHint:'Höre die Beispiele an und sprich sie laut nach.',speak,speakBtn,wireSpeakButtons,playFeedbackAudio:t=>playCorrectAudio(t,true),renderLesson,renderLearn
  });
}

function renderPractice(){
  const sets=D.telc.length,ctx={view,state,save,speak};
  view.innerHTML=`
    <section class="card hero"><h2>Üben</h2><p class="muted">Vokabeln und Grammatik aus den Lektionen sowie jeder Prüfungsteil im Format telc Français A2.</p></section>
    <div class="grid">
      <button class="practice-card" id="pVocab"><span class="icon">🧠</span><strong>Vokabeln</strong><small>${lessons.reduce((s,l)=>s+l.phrases.length,0)} Kernphrasen mit Audio</small></button>
      <button class="practice-card" id="pGrammar"><span class="icon">🧩</span><strong>Grammatik</strong><small>${D.grammarSets.length} Sets · ${D.grammarSets.reduce((s,x)=>s+x.questions.length,0)} Fragen</small></button>
      <button class="practice-card" id="pEl"><span class="icon">🔤</span><strong>Sprachbausteine</strong><small>Éléments langagiers · ${sets} Modelltests</small></button>
      <button class="practice-card" id="pListen"><span class="icon">🎧</span><strong>Hören</strong><small>3 Teile · 12 Aufgaben je Test</small></button>
      <button class="practice-card" id="pRead"><span class="icon">📖</span><strong>Lesen</strong><small>3 Teile · 12 Aufgaben je Test</small></button>
      <button class="practice-card" id="pWrite"><span class="icon">✍️</span><strong>Schreiben</strong><small>Brief · 3 von 6 Punkten</small></button>
      <button class="practice-card" id="pSpeak"><span class="icon">🎤</span><strong>Sprechen</strong><small>Vorstellen · Austauschen · Sich einigen</small></button>
    </div>`;
  document.getElementById("pVocab").onclick=renderVocab;
  document.getElementById("pGrammar").onclick=renderGrammarMenu;
  for(const [id,part] of [["pEl","el"],["pListen","co"],["pRead","ce"],["pWrite","ee"],["pSpeak","oral"]])document.getElementById(id).onclick=()=>FR_A2_TELC.renderPart(ctx,part,D.telc[Math.floor(Math.random()*sets)].id);
  practiceProgress?.decorate();
}

function renderVocab(initialLesson=null,onBack=null){
  stopHomeMotion();window.A1Voice?.cancel();
  A1Vocabulary.render({view,state,save,lessons,speak,course:'fr',units:window.FR_A1_DEEPENING_CONTENT,initialLesson,onBack,onExercises:renderPractice});
}

const GRAMMAR_GUIDES={};

const LESSON_GRAMMAR_REFS={};

function lessonExplanationHtml(text){
  if(!text)return '';
  const protectedText=String(text)
    .replaceAll('z. B.','z§B§')
    .replaceAll('z.B.','z§B§')
    .replaceAll('d. h.','d§h§')
    .replaceAll('bzw.','bzw§')
    .replaceAll('etc.','etc§');
  const parts=protectedText
    .replace(/([.!?])\s+(?=[A-ZÀ-ÖØ-ÞÄÖÜİÇÉÈÊÂÎÔÛ«„“¿¡])/g,'$1\n')
    .split('\n')
    .map(x=>x.replaceAll('z§B§','z. B.').replaceAll('d§h§','d. h.').replaceAll('bzw§','bzw.').replaceAll('etc§','etc.').trim())
    .filter(Boolean);
  return parts.length?`<ul class="lesson-deepening-points">${parts.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'';
}

function lessonGrammarHtml(l){
  if(false){
    const forms=[['je','peux','kann'],['tu','peux','kannst'],['il / elle / on','peut','kann'],['nous','pouvons','können'],['vous','pouvez','könnt / können'],['ils / elles','peuvent','können']];
    return `<details class="lesson-explanation lesson-deepening"><summary><strong>Vertiefung</strong></summary><details class="grammar-detail"><summary>pouvoir – können</summary><div class="grammar-detail-body"><p><strong>pouvoir</strong> bedeutet „können“ und ist <strong>unregelmäßig</strong>. Lerne die Formen passend zur Person.</p><div class="grammar-table-wrap"><table class="grammar-table"><thead><tr><th>Person</th><th>pouvoir</th><th>Deutsch</th></tr></thead><tbody>${forms.map(([person,form,de])=>`<tr><td>${person}</td><td>${form}<button type="button" class="speak-btn" data-speak="${encodeURIComponent(person.split(' / ')[0]+' '+form)}" aria-label="${person.split(' / ')[0]} ${form} anhören">🔊</button></td><td>${de}</td></tr>`).join('')}</tbody></table></div><p>Danach steht ein zweites Verb in der <strong>Grundform</strong>: <strong>Vous pouvez épeler.</strong> = Sie können buchstabieren.</p></div></details><details class="grammar-detail"><summary>Buchstabieren lassen & nachfragen</summary><div class="grammar-detail-body"><div class="phrase-row"><div><strong>épeler</strong><small>buchstabieren</small></div><button type="button" class="speak-btn" aria-label="épeler anhören" data-speak="épeler">🔊</button></div><div class="phrase-row"><div><strong>répéter</strong><small>wiederholen</small></div><button type="button" class="speak-btn" aria-label="répéter anhören" data-speak="répéter">🔊</button></div><div class="phrase-row"><div><strong>parler plus lentement</strong><small>langsamer sprechen</small></div><button type="button" class="speak-btn" aria-label="parler plus lentement anhören" data-speak="parler%20plus%20lentement">🔊</button></div></div></details></details>`;
  }
  const ref=LESSON_GRAMMAR_REFS[l.id]||{};
  const refs=A1GrammarUI.pickDetails(GRAMMAR_GUIDES,ref.refs||[]);
  const topicInfo=A1LessonTopicInfo.render(COURSE_ID,l.id);
  const primer=false&&window.FR_A1_LESSON1?FR_A1_LESSON1.pronounPrimerHtml():'';
  return `<details class="lesson-explanation lesson-deepening"><summary><strong>Vertiefung: Grammatik & Satzmuster</strong></summary><div class="lesson-deepening-title">${esc(ref.title||l.grammar.title)}</div>${primer?'':lessonExplanationHtml(l.grammar.explanation)}${primer}${refs}${topicInfo}</details>`;
}

function renderGrammarIntro(id){
  const set=D.grammarSets.find(x=>x.id===id);
  if(!set)return renderGrammarMenu();
  view.innerHTML=`<div class="between"><button class="tiny-btn" id="backGrammarIntro">← Grammatik</button><span class="pill">${esc(set.title)}</span></div><section class="card" style="margin-top:12px"><h2>${esc(set.title)}</h2><p class="muted">${esc(set.subtitle)}</p><hr class="soft">${A1GrammarUI.reorderGuide(GRAMMAR_GUIDES[id]||'')}<div class="grammar-study-hint">💡 Klappe die Übersichten auf, wenn du eine Form nachschlagen möchtest. Alles, was du für die folgenden Aufgaben brauchst, findest du auf dieser Seite.</div><div class="spacer"></div><button class="primary-btn" id="startGrammarPractice">10 Fragen üben</button></section>`;
  document.getElementById('backGrammarIntro').onclick=renderGrammarMenu;
  document.getElementById('startGrammarPractice').onclick=()=>startGrammarSet(id);
}

function renderGrammarMenu(){
  view.innerHTML=`
    <div class="between"><button class="tiny-btn" id="backP">← Üben</button><span class="pill">GRAMMATIK & SPRACHBAUSTEINE</span></div>
    <section class="card" style="margin-top:12px"><h2>A2 Grammatik & Sprachbausteine</h2><p class="muted">Je Set 10 Fragen. Die Themen decken typische A1-Strukturen aus Einstufungs- und Prüfungsaufgaben ab.</p></section>
    <div class="list">${D.grammarSets.map(s=>`<button class="practice-card" data-gset="${esc(s.id)}"><strong>${esc(s.title)}</strong><small>${esc(s.subtitle)} · Bestwert ${state.grammarBest[s.id]||0}%</small></button>`).join('')}</div>`;
  document.getElementById('backP').onclick=renderPractice;
  document.querySelectorAll('[data-gset]').forEach(b=>b.onclick=()=>renderGrammarIntro(b.dataset.gset));
  practiceProgress?.decorate();
}

function startGrammarSet(id){
  const set=D.grammarSets.find(x=>x.id===id);
  const qs=shuffle(set.questions).slice(0,10).map(randomizedChoices);
  let i=0,score=0;
  function draw(){
    if(i>=qs.length){
      const pct=Math.round(score/qs.length*100);
      state.grammarBest[id]=Math.max(state.grammarBest[id]||0,pct);
      save(true);
      view.innerHTML=`<section class="card center"><span class="pill ${pct>=70?'green':'amber'}">${esc(set.title)}</span><div class="score">${pct}%</div><h2>${score}/${qs.length}</h2><p class="muted">Audio wird nur abgespielt, wenn es eindeutig zur französischen Aufgabe gehört.</p><div class="button-row"><button class="secondary-btn" id="againGrammar">Noch einmal</button><button class="primary-btn" id="backGrammar">Alle Sets</button></div></section>`;
      document.getElementById('againGrammar').onclick=()=>startGrammarSet(id);
      document.getElementById('backGrammar').onclick=renderGrammarMenu;
      return;
    }
    const q=qs[i];
    view.innerHTML=`
      <div class="between"><button class="tiny-btn" id="backGrammar">← Grammatik</button><span class="pill">${i+1}/${qs.length}</span></div>
      <section class="card" style="margin-top:12px">
        <div class="eyebrow">${esc(set.title)}</div>
        <div class="quiz-q">${esc(q.q)}</div>
        <div class="options">${q.o.map((o,j)=>`<button class="option-btn" data-o="${j}">${esc(o)}</button>`).join('')}</div>
        <div id="grammarFeedback"></div>
      </section>`;
    document.getElementById('backGrammar').onclick=renderGrammarMenu;
    document.querySelectorAll('[data-o]').forEach(btn=>btn.onclick=()=>{
      const chosen=+btn.dataset.o,ok=chosen===q.a;
      FR_A1_REVIEW.record(state,FR_A1_REVIEW.task(0,"extra-grammar:"+id,set.title,q),ok);save();
      practiceProgress?.recordGrammar(set,q);
      if(ok)score++;playCorrectAudio(q.audio,true);
      document.querySelectorAll('[data-o]').forEach((b,j)=>{
        b.disabled=true;
        if(j===q.a)b.classList.add('correct');
        else if(j===chosen)b.classList.add('wrong');
      });
      document.getElementById('grammarFeedback').innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?'✓ Richtig':'✗ Richtig ist: '+esc(q.o[q.a])}${q.explanation?'<p>'+esc(q.explanation)+'</p>':''}</div><div class="spacer"></div><button class="primary-btn" id="nextGrammar">${i<qs.length-1?'Weiter':'Ergebnis'}</button>`;
      window.FR_A1_ANSWER_AUDIO?.mount(document.querySelector('#grammarFeedback .feedback'),{task:q,playAudio:text=>playCorrectAudio(text,true)});
      document.getElementById('nextGrammar').onclick=()=>{i++;draw();};
    });
  }
  draw();
}

function renderListeningMenu(){
  view.innerHTML=`
    <div class="between"><button class="tiny-btn" id="backP">← Üben</button><span class="pill">COMPRÉHENSION DE L’ORAL</span></div>
    <section class="card" style="margin-top:12px"><h2>Hörverstehen</h2><p class="muted">Jede Trainingsrunde enthält 10 Aufgaben. Im Prüfungsmodus hörst du jeden Text höchstens zweimal.</p></section>
    <div class="list">
      <button class="practice-card" data-lp="1"><strong>Übung 1 · Details verstehen</strong><small>Preise, Uhrzeiten, Gleise, Zimmer · Pool ${D.listening.part1.length}</small></button>
      <button class="practice-card" data-lp="2"><strong>Übung 2 · Ansagen</strong><small>Richtig/Falsch · Pool ${D.listening.part2.length}</small></button>
      <button class="practice-card" data-lp="3"><strong>Übung 3 · Nachrichten</strong><small>Telefon- und Alltagsnachrichten · Pool ${D.listening.part3.length}</small></button>
      <button class="practice-card" data-lp="4"><strong>Übung 4 · Situationen erkennen</strong><small>Ort, Wunsch oder Handlung erkennen · Pool ${D.listening.part4.length}</small></button>
    </div>`;
  document.getElementById('backP').onclick=renderPractice;
  document.querySelectorAll('[data-lp]').forEach(b=>b.onclick=()=>startListeningPractice(+b.dataset.lp));
  practiceProgress?.decorate();
}

function startListeningPractice(part){
  const tasks=shuffle(D.listening['part'+part]).slice(0,10);
  let i=0,score=0;
  function next(ok){
    if(typeof ok==='boolean'){if(ok)score++;i++;}
    if(i>=tasks.length){A1Streak.completeExercise();
      const pct=Math.round(score/tasks.length*100);
      view.innerHTML=`<section class="card center"><span class="pill ${pct>=70?'green':'amber'}">HÖREN · ÜBUNG ${part}</span><div class="score">${pct}%</div><h2>${score}/${tasks.length}</h2><p class="muted">Starte die Runde erneut, um andere Aufgaben aus dem Pool zu bekommen.</p><div class="button-row"><button class="secondary-btn" id="againHear">Noch einmal</button><button class="primary-btn" id="backHearMenu">Hören</button></div></section>`;
      document.getElementById('againHear').onclick=()=>startListeningPractice(part);
      document.getElementById('backHearMenu').onclick=renderListeningMenu;
      return;
    }
    renderListeningTask(part,false,next,tasks[i],`${i+1}/${tasks.length}`);
  }
  next();
}

function renderListeningTask(part,examMode=false,onDone=null,forced=null,progressLabel=''){
  const arr=D.listening['part'+part],original=forced||rand(arr),task=part===2?original:randomizedChoices(original);
  let plays=0,answered=false;
  const maxPlays=examMode?2:99;
  const options=part===2?['Richtig','Falsch']:task.o;
  view.innerHTML=`
    <div class="between"><button class="tiny-btn" id="backListen">← ${examMode?'Prüfung':'Hören'}</button><span class="pill">${progressLabel||'Teil '+part}</span></div>
    <section class="card" data-bug-audio="${esc(task.speech)}" style="margin-top:12px">
      <div class="audio-panel"><button class="speak-btn large" id="playAudio">▶️</button><div><strong>Audio abspielen</strong></div><div class="play-count" id="playCount">${examMode?`0/${maxPlays} Wiedergaben`:'Training · beliebig oft'}</div></div>
      <div class="quiz-q">${esc(part===2?task.statement:task.q)}</div>
      <div class="options">${options.map((x,j)=>`<button class="option-btn" data-o="${j}">${esc(x)}</button>`).join('')}</div>
      <div id="hearFeedback"></div>
    </section>`;
  document.getElementById('backListen').onclick=()=>examMode?renderExam():renderListeningMenu();
  document.getElementById('playAudio').onclick=()=>{
    if(plays>=maxPlays)return;
    plays++;speak(task.speech,true,.76);
    document.getElementById('playCount').textContent=examMode?`${plays}/${maxPlays} Wiedergaben`:'Training · beliebig oft';
    if(plays>=maxPlays)document.getElementById('playAudio').disabled=true;
  };
  document.querySelectorAll('[data-o]').forEach(btn=>btn.onclick=()=>{
    if(answered)return;
    answered=true;
    const chosen=+btn.dataset.o,correct=part===2?(task.a?0:1):task.a,ok=chosen===correct;
    FR_A1_REVIEW.record(state,FR_A1_REVIEW.task(0,'extra-listening:'+part,'Hörtraining',{q:part===2?task.statement:task.q,answer:options[correct],o:options,speech:task.speech}),ok);save();
    practiceProgress?.record('listening',task.id);
    if(ok){
      if(!state.masteredListening.includes(task.id)){state.masteredListening.push(task.id);save();}
    }
    document.querySelectorAll('[data-o]').forEach((b,j)=>{
      b.disabled=true;
      if(j===correct)b.classList.add('correct');
      else if(j===chosen)b.classList.add('wrong');
    });
    document.getElementById('hearFeedback').innerHTML=`
      <div class="feedback ${ok?'good':'bad'}" data-explain-source="${esc(task.speech||'')}">${ok?'✓ Richtig':'✗ Falsch'}</div>
      ${examMode?'':`<div class="transcript"><strong>Transkript:</strong><br>${esc(task.speech)}</div>`}
      <div class="spacer"></div><button class="primary-btn" id="nextHear">${onDone?'Weiter':'Neue Aufgabe'}</button>`;
    document.getElementById('nextHear').onclick=()=>onDone?onDone(ok):renderListeningTask(part,false);
  });
}

function renderReadingMenu(){
  view.innerHTML=`
    <div class="between"><button class="tiny-btn" id="backP">← Üben</button><span class="pill">COMPRÉHENSION DES ÉCRITS</span></div>
    <section class="card" style="margin-top:12px"><h2>Leseverstehen</h2><p class="muted">Jede Trainingsrunde enthält 10 Aufgaben aus Alltagstexten, Anzeigen, Hinweisen und Tabellen.</p></section>
    <div class="list">
      <button class="practice-card" data-rp="1"><strong>Übung 1 · Kurze Nachrichten</strong><small>Richtig/Falsch · Pool ${D.reading.part1.length}</small></button>
      <button class="practice-card" data-rp="2"><strong>Übung 2 · Informationen finden</strong><small>Zwei Anzeigen vergleichen · Pool ${D.reading.part2.length}</small></button>
      <button class="practice-card" data-rp="3"><strong>Übung 3 · Schilder & Hinweise</strong><small>Richtig/Falsch · Pool ${D.reading.part3.length}</small></button>
      <button class="practice-card" data-rp="4"><strong>Übung 4 · Programme & Fahrpläne</strong><small>Uhrzeiten, Preise und praktische Daten · Pool ${D.reading.part4.length}</small></button>
    </div>`;
  document.getElementById('backP').onclick=renderPractice;
  document.querySelectorAll('[data-rp]').forEach(b=>b.onclick=()=>startReadingPractice(+b.dataset.rp));
  practiceProgress?.decorate();
}

function startReadingPractice(part){
  const tasks=shuffle(D.reading['part'+part]).slice(0,10);
  let i=0,score=0;
  function next(ok){
    if(typeof ok==='boolean'){if(ok)score++;i++;}
    if(i>=tasks.length){A1Streak.completeExercise();
      const pct=Math.round(score/tasks.length*100);
      view.innerHTML=`<section class="card center"><span class="pill ${pct>=70?'green':'amber'}">LESEN · ÜBUNG ${part}</span><div class="score">${pct}%</div><h2>${score}/${tasks.length}</h2><p class="muted">Neue Runde = neue Auswahl aus dem Aufgabenpool.</p><div class="button-row"><button class="secondary-btn" id="againRead">Noch einmal</button><button class="primary-btn" id="backReadMenu">Lesen</button></div></section>`;
      document.getElementById('againRead').onclick=()=>startReadingPractice(part);
      document.getElementById('backReadMenu').onclick=renderReadingMenu;
      return;
    }
    renderReadingTask(part,next,tasks[i],`${i+1}/${tasks.length}`);
  }
  next();
}

function renderReadingTask(part,onDone=null,forced=null,progressLabel=''){
  const original=forced||rand(D.reading['part'+part]),task=part===4?randomizedChoices(original):original;
  let body='',options=[],correct=0;
  if(part===1){
    body=`<div class="reading-text">${esc(task.text).replace(/\n/g,'<br>')}</div><div class="quiz-q">${esc(task.statement)}</div>`;
    options=['Richtig','Falsch'];correct=task.a?0:1;
  }
  if(part===2){
    body=`<div class="quiz-q">${esc(task.q)}</div><div class="ad-grid"><div class="ad-box"><strong>A</strong>${esc(task.aText).replace(/\n/g,'<br>')}</div><div class="ad-box"><strong>B</strong>${esc(task.bText).replace(/\n/g,'<br>')}</div></div>`;
    options=['A','B'];correct=task.a;
  }
  if(part===3){
    body=`<div class="muted">${esc(task.where)}</div><div class="sign" style="margin-top:10px">${esc(task.sign).replace(/\n/g,'<br>')}</div><div class="quiz-q">${esc(task.statement)}</div>`;
    options=['Richtig','Falsch'];correct=task.a?0:1;
  }
  if(part===4){
    body=`<div class="reading-text">${esc(task.text).replace(/\n/g,'<br>')}</div><div class="quiz-q">${esc(task.q)}</div>`;
    options=task.o;correct=task.a;
  }
  view.innerHTML=`
    <div class="between"><button class="tiny-btn" id="backRead">← Lesen</button><span class="pill">${progressLabel||'Teil '+part}</span></div>
    <section class="card" style="margin-top:12px">${body}<div class="options">${options.map((o,i)=>`<button class="option-btn" data-o="${i}">${esc(o)}</button>`).join('')}</div><div id="readFeedback"></div></section>`;
  document.getElementById('backRead').onclick=renderReadingMenu;
  document.querySelectorAll('[data-o]').forEach(btn=>btn.onclick=()=>{
    const chosen=+btn.dataset.o,ok=chosen===correct;
    FR_A1_REVIEW.record(state,FR_A1_REVIEW.task(0,'extra-reading:'+part,'Lesetraining',{q:task.q||task.statement,answer:options[correct],o:options,context:part===2?'A: '+task.aText+'\n\nB: '+task.bText:task.text||[task.where,task.sign].filter(Boolean).join('\n')}),ok);save();
    practiceProgress?.record('reading',task.id);
    if(ok){
      if(!state.masteredReading.includes(task.id)){state.masteredReading.push(task.id);save();}
      
    }
    document.querySelectorAll('[data-o]').forEach((b,j)=>{
      b.disabled=true;
      if(j===correct)b.classList.add('correct');
      else if(j===chosen)b.classList.add('wrong');
    });
    document.getElementById('readFeedback').innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?'✓ Richtig · Französisch wird abgespielt':'✗ Richtige Antwort: '+esc(options[correct])}</div><div class="spacer"></div><button class="primary-btn" id="nextRead">${onDone?'Weiter':'Neue Aufgabe'}</button>`;
    window.A1AnswerFeedback?.mount(document.querySelector('#readFeedback .feedback'),{text:part===2?(correct===0?task.aText:task.bText):part===4?options[correct]:(task.a?'Vrai. '+task.statement:'Faux. '+(task.text||task.sign)),lang:'fr'});
    document.getElementById('nextRead').onclick=()=>onDone?onDone(ok):renderReadingTask(part);
  });
}

function renderWritingMenu(){
  view.innerHTML=`
    <div class="between"><button class="tiny-btn" id="backP">← Üben</button><span class="pill">PRODUCTION ÉCRITE</span></div>
    <section class="card" style="margin-top:12px"><h2>Schreiben</h2><p class="muted">DELF A1: Formular ausfüllen und einen einfachen Alltagstext schreiben. Die Beispielprüfung arbeitet mit 10 Formularangaben und mindestens 40 Wörtern.</p></section>
    <div class="grid">
      <button class="practice-card" id="formPractice"><span class="icon">📝</span><strong>Formulare</strong><small>${D.forms.length} Szenarien · je 10 Felder</small></button>
      <button class="practice-card" id="msgPractice"><span class="icon">✉️</span><strong>Nachrichten</strong><small>${D.writing.length} Themen · Ziel mindestens 40 Wörter</small></button>
    </div>`;
  document.getElementById('backP').onclick=renderPractice;
  document.getElementById('formPractice').onclick=()=>renderFormTask();
  document.getElementById('msgPractice').onclick=()=>renderMessageTask();
  practiceProgress?.decorate();
}

function renderFormTask(onDone=null,forced=null){
  const task=forced||rand(D.forms);
  view.innerHTML=`
    <div class="between"><button class="tiny-btn" id="backWrite">← Schreiben</button><span class="pill">${task.fields.length} FELDER</span></div>
    <section class="card" style="margin-top:12px">
      <h3>Situation</h3><p>${esc(task.context)}</p>
      <div class="form-grid">${task.fields.map((f,i)=>`<div class="field"><label>${esc(f.label)}</label><input class="text-input" id="field${i}"></div>`).join('')}</div>
      <div class="spacer"></div><button class="primary-btn" id="checkForm">Überprüfen</button><div id="formFeedback"></div>
    </section>`;
  document.getElementById('backWrite').onclick=renderWritingMenu;
  document.getElementById('checkForm').onclick=()=>{if(task.fields.every((_,i)=>document.getElementById('field'+i).value.trim()))A1Streak.completeExercise();
    let correct=0;
    const details=task.fields.map((f,i)=>{
      const val=normalize(document.getElementById('field'+i).value);
      const ok=f.answers.some(a=>normalize(a)===val);
      if(ok)correct++;
      return `<div>${ok?'✓':'✗'} <strong>${esc(f.label)}:</strong> ${ok?'richtig':esc(f.answers[0])}</div>`;
    }).join('');
    const passed=correct>=Math.ceil(task.fields.length*.7);
    if(passed&&!state.writingDone.includes(task.id)){state.writingDone.push(task.id);save();}
    document.getElementById('formFeedback').innerHTML=`
      <div class="feedback ${passed?'good':'bad'}"><strong>${correct}/${task.fields.length}</strong><div style="margin-top:8px;line-height:1.7">${details}</div></div>
      <div class="spacer"></div><button class="primary-btn" id="nextForm">${onDone?'Weiter':'Neues Formular'}</button>`;
    window.A1AnswerFeedback?.mount(document.querySelector('#formFeedback .feedback'),{text:task.fields.map(f=>f.answers[0]).join('. '),lang:'fr'});
    document.getElementById('nextForm').onclick=()=>onDone?onDone(correct):renderFormTask();
  };
}

function rubricSelect(label,max,description){
  let options='';
  for(let v=0;v<=max+.001;v+=.5){
    const val=Number(v.toFixed(1));
    options+=`<option value="${val}">${val}</option>`;
  }
  return `<div class="field"><label>${esc(label)} · max. ${max}</label><select class="select-input" data-rubric>${options}</select><small class="muted">${esc(description)}</small></div>`;
}

function renderMessageTask(onDone=null,forced=null){
  const task=forced||rand(D.writing);
  view.innerHTML=`
    <div class="between"><button class="tiny-btn" id="backWrite">← Schreiben</button><span class="pill">ZIEL MINDESTENS 40 WÖRTER</span></div>
    <section class="card" style="margin-top:12px">
      <h3>Aufgabe</h3><p>${esc(task.prompt)}</p>
      <textarea class="text-area" id="messageText" placeholder="Schreibe deine Nachricht hier…"></textarea>
      <div class="word-count" id="wordCount">0 Wörter</div>
      <div class="spacer"></div><button class="primary-btn" id="openRubric">Mit Trainingsraster selbst bewerten</button>
      <div id="messageFeedback"></div>
    </section>`;
  const ta=document.getElementById('messageText'),wc=document.getElementById('wordCount');
  const count=()=>A1Learning.countWords(ta.value);
  ta.oninput=()=>{wc.textContent=`${count()} Wörter`;document.getElementById('messageFeedback').replaceChildren();};
  document.getElementById('backWrite').onclick=renderWritingMenu;
  document.getElementById('openRubric').onclick=()=>{
    const words=count();
    const inRange=words>=40;
    document.getElementById('messageFeedback').innerHTML=`
      <hr class="soft"><h3>Selbstkontrolle für das Training · /15</h3>
      <p class="muted">Wähle für jede Kategorie eine Punktzahl. Dieses vereinfachte Trainingsraster ist keine offizielle Prüfungsbewertung. Mindestens 40 Wörter; mehr als 50 Wörter sind erlaubt.</p>
      <div class="form-grid">
        ${rubricSelect('Aufgabenbezug',2,'Situation und geforderte Länge beachten.')}
        ${rubricSelect('Soziolinguistik',2,'Begrüßung, Verabschiedung und tu/vous passend.')}
        ${rubricSelect('Informieren / Beschreiben',4,'Einfache Informationen über sich und Aktivitäten geben.')}
        ${rubricSelect('Wortschatz / Rechtschreibung',3,'Elementarer, passender Wortschatz.')}
        ${rubricSelect('Grammatik',3,'Einfache Strukturen verständlich verwenden.')}
        ${rubricSelect('Kohärenz',1,'Sehr einfache Verknüpfungen wie et, alors.')}
      </div>
      <div class="notice ${inRange?'success':'warning'}" style="margin-top:12px">Du hast <strong>${words} Wörter</strong> geschrieben. Zielbereich dieser Prüfungsvorlage: <strong>mindestens 40 Wörter</strong>.</div>
      <div class="spacer"></div><button class="secondary-btn" id="calcWrite">Punkte berechnen</button>
      <div id="writeScore"></div>
      <div class="spacer"></div><button class="soft-btn" id="showModel">Beispielantwort zeigen</button>
      <div id="modelAnswer"></div>`;
    document.getElementById('calcWrite').onclick=()=>{
      const words=count();if(words>=40)A1Streak.completeExercise();
      const pts=[...document.querySelectorAll('[data-rubric]')].reduce((s,c)=>s+(+c.value||0),0);
      if(pts>=10&&words>=40&&!state.writingDone.includes(task.id)){state.writingDone.push(task.id);save();}
      document.getElementById('writeScore').innerHTML=`
        <div class="feedback ${pts>=10&&words>=40?'good':'bad'}"><strong>${pts}/15</strong> · Selbstbewertung</div>
        ${onDone?'<div class="spacer"></div><button class="primary-btn" id="continueWrite">Weiter</button>':'<div class="spacer"></div><button class="primary-btn" id="nextMsg">Neues Thema</button>'}`;
      const b=document.getElementById(onDone?'continueWrite':'nextMsg');
      b.onclick=()=>onDone?onDone(pts):renderMessageTask();
    };
    document.getElementById('showModel').onclick=()=>document.getElementById('modelAnswer').innerHTML=`<div class="solution"><strong>Beispiel:</strong><br>${esc(task.model).replace(/\n/g,'<br>')}</div>`;
  };
}

function recorderHtml(id,quiet=false){
  return `<div class="recorder"><button class="secondary-btn" id="startRec${id}">● Aufnehmen</button><button class="soft-btn" id="stopRec${id}" disabled>■ Stopp</button></div><div class="record-status" id="recStatus${id}">${quiet?'':'Sprich deine Antwort laut.'}</div><div class="playback" id="playback${id}"></div>`;
}
function wireRecorder(id,onRecorded){return A1Learning.wireRecorder(id,()=>{A1Streak.completeExercise();if(onRecorded)onRecorded();},{"unavailable": "Mikrofon hier nicht verfügbar. Verwende HTTPS und einen unterstützten Browser.", "denied": "Mikrofon konnte nicht geöffnet werden. Prüfe HTTPS und die Berechtigung.", "recording": "● Aufnahme läuft…", "done": "Aufnahme fertig. Höre deine Antwort an.", "empty": "Keine Aufnahme gespeichert. Versuche es erneut."});}

function renderSpeakingMenu(){
  view.innerHTML=`
    <div class="between"><button class="tiny-btn" id="backP">← Üben</button><span class="pill">PRODUCTION ORALE</span></div>
    <section class="card" style="margin-top:12px"><h2>Sprechen</h2><p class="muted">DELF A1: entretien dirigé, échange d’informations und dialogue simulé. Die ersten beiden Trainingsrunden enthalten je 10 Fragen/Karten.</p></section>
    <div class="list">
      <button class="practice-card" id="sp1"><strong>1 · Entretien dirigé</strong><small>10 persönliche Fragen pro Runde · Pool ${D.interview.length}</small></button>
      <button class="practice-card" id="sp2"><strong>2 · Échange d’informations</strong><small>10 Stichwortkarten pro Runde · Pool ${D.infoCards.length}</small></button>
      <button class="practice-card" id="sp3"><strong>3 · Dialogue simulé</strong><small>${D.roleplays.length} Einkauf-/Reservierungssituationen</small></button>
    </div>`;
  document.getElementById('backP').onclick=renderPractice;
  document.getElementById('sp1').onclick=startInterviewSession;
  document.getElementById('sp2').onclick=startInfoSession;
  document.getElementById('sp3').onclick=renderRoleplay;
  practiceProgress?.decorate();
}

function startInterviewSession(){
  const cards=shuffle(D.interview).slice(0,10);
  let i=0;
  function draw(){
    if(i>=cards.length){
      view.innerHTML=`<section class="card center"><span class="pill green">10 FRAGEN GESCHAFFT</span><h2>Entretien dirigé</h2><p class="muted">Höre deine Aufnahmen an und achte besonders auf Verständlichkeit und einfache vollständige Antworten.</p><div class="button-row"><button class="secondary-btn" id="againInt">Neue 10 Fragen</button><button class="primary-btn" id="backSpeak">Sprechen</button></div></section>`;
      document.getElementById('againInt').onclick=startInterviewSession;
      document.getElementById('backSpeak').onclick=renderSpeakingMenu;
      return;
    }
    const card=cards[i];
    view.innerHTML=`
      <div class="between"><button class="tiny-btn" id="backSpeak">← Sprechen</button><span class="pill">${i+1}/${cards.length}</span></div>
      <section class="card" style="margin-top:12px">
        <div class="speaking-card"><div class="theme">Prüferfrage</div><div class="cue" style="font-size:24px">${esc(card.q)}</div>${speakBtn(card.q)}
        <p class="muted">Antworte in einem oder zwei einfachen Sätzen.</p>${recorderHtml('Int')}
        <div class="spacer"></div><button class="soft-btn" id="showExample">Beispiel anzeigen</button><div id="intExample"></div>
        <div class="spacer"></div><button class="primary-btn" id="nextInt">Weiter</button></div>
      </section>`;
    document.getElementById('backSpeak').onclick=renderSpeakingMenu;
    document.getElementById('showExample').onclick=()=>{document.getElementById('intExample').innerHTML=`<div class="solution">${esc(card.a)} ${speakBtn(card.a)}</div>`;wireSpeakButtons();};
    document.getElementById('nextInt').onclick=()=>{i++;draw();};
    wireSpeakButtons();
    wireRecorder('Int',()=>{const id='int-'+card.q;if(!state.speakingDone.includes(id)){state.speakingDone.push(id);save();}});
    if(audioEnabled)setTimeout(()=>speak(card.q),180);
  }
  draw();
}

function startInfoSession(){
  const cards=shuffle(D.infoCards).slice(0,10);
  let i=0;
  function draw(){
    if(i>=cards.length){
      view.innerHTML=`<section class="card center"><span class="pill green">10 KARTEN GESCHAFFT</span><h2>Échange d’informations</h2><p class="muted">Ziel: aus einem einfachen Stichwort schnell eine verständliche Frage bilden.</p><div class="button-row"><button class="secondary-btn" id="againInfo">Neue 10 Karten</button><button class="primary-btn" id="backSpeak">Sprechen</button></div></section>`;
      document.getElementById('againInfo').onclick=startInfoSession;
      document.getElementById('backSpeak').onclick=renderSpeakingMenu;
      return;
    }
    const card=cards[i];
    view.innerHTML=`
      <div class="between"><button class="tiny-btn" id="backSpeak">← Sprechen</button><span class="pill">${i+1}/${cards.length}</span></div>
      <section class="card" style="margin-top:12px">
        <div class="speaking-card"><div class="theme">Thema: ${esc(card.theme)}</div><div class="cue">${esc(card.cue)}</div>
        <p class="muted">Formuliere damit eine einfache Frage an den Prüfer.</p>${recorderHtml('Info')}
        <div class="spacer"></div><button class="soft-btn" id="showInfoModel">Beispielfrage + Antwort</button><div id="infoModel"></div>
        <div class="spacer"></div><button class="primary-btn" id="nextInfo">Weiter</button></div>
      </section>`;
    document.getElementById('backSpeak').onclick=renderSpeakingMenu;
    document.getElementById('showInfoModel').onclick=()=>{document.getElementById('infoModel').innerHTML=`<div class="solution"><strong>Frage:</strong> ${esc(card.q)} ${speakBtn(card.q)}<br><br><strong>Antwort:</strong> ${esc(card.a)} ${speakBtn(card.a)}</div>`;wireSpeakButtons();};
    document.getElementById('nextInfo').onclick=()=>{i++;draw();};
    wireRecorder('Info',()=>{const id='info-'+card.theme+'-'+card.cue;if(!state.speakingDone.includes(id)){state.speakingDone.push(id);save();}});
  }
  draw();
}

function renderRoleplay(){
  const card=rand(D.roleplays);
  view.innerHTML=`
    <div class="between"><button class="tiny-btn" id="backSpeak">← Sprechen</button><span class="pill">DIALOGUE SIMULÉ</span></div>
    <section class="card" style="margin-top:12px">
      <div class="speaking-card"><div class="theme">${esc(card.cue)}</div><div class="cue" style="font-size:20px">${esc(card.prompt)}</div>
      <p class="muted">Begrüße, frage nach Informationen, bestelle/kaufe und verabschiede dich höflich.</p>${recorderHtml('Role')}
      <div class="spacer"></div><button class="soft-btn" id="showRoleModel">Beispieldialog</button><div id="roleModel"></div>
      <div class="spacer"></div><button class="primary-btn" id="nextRole">Neue Situation</button></div>
    </section>`;
  document.getElementById('backSpeak').onclick=renderSpeakingMenu;
  document.getElementById('showRoleModel').onclick=()=>{
    document.getElementById('roleModel').innerHTML=`<div class="solution"><strong>Du:</strong> ${esc(card.request)} ${speakBtn(card.request)}<br><br><strong>Prüfer:</strong> ${esc(card.response)} ${speakBtn(card.response)}</div>`;
    wireSpeakButtons();
  };
  document.getElementById('nextRole').onclick=renderRoleplay;
  wireRecorder('Role',()=>{const id='role-'+card.cue;if(!state.speakingDone.includes(id)){state.speakingDone.push(id);save();}});
}

function renderExam(){
  FR_A2_TELC.renderExam({view,state,save,speak});
}

function renderExamDelf(){
  view.innerHTML=`
    <section class="card hero"><span class="pill">DELF A1</span><h2 style="margin-top:12px">Prüfungstraining</h2><p class="muted">4 Kompetenzen à 25 Punkte. Ziel: mindestens 50/100 insgesamt und mindestens 5/25 je Teil.</p></section>
    <section class="card"><h3>DELF A1 · Aufbau und Training</h3><p class="muted">Eigene Übungsaufgaben nach GER-A1-Lernzielen. Hören und Lesen sind verkürzte Trainingssimulationen; Sprachsynthese ersetzt die offiziellen Prüfungsaufnahmen. Schreiben und Sprechen benötigen menschliche Bewertung.</p><div class="exam-structure">
      <div class="exam-line"><strong>Hören</strong><small>ca. 20 Min. · sehr kurze Alltagsaufnahmen · 2× hören</small><span>/25</span></div>
      <div class="exam-line"><strong>Lesen</strong><small>30 Min. · mehrere Alltagstexte</small><span>/25</span></div>
      <div class="exam-line"><strong>Schreiben</strong><small>30 Min. · Formular + kurzer Text</small><span>/25</span></div>
      <div class="exam-line"><strong>Sprechen</strong><small>5–7 Min. · 10 Min. Vorbereitung</small><span>/25</span></div>
    </div></section>
    <div class="grid">
      <button class="practice-card" id="examListen"><span class="icon">🎧</span><strong>Hören Simulation</strong><small>16 Aufgaben · max. 2×</small></button>
      <button class="practice-card" id="examRead"><span class="icon">📖</span><strong>Lesen Simulation</strong><small>16 Aufgaben · 30 Min.</small></button>
      <button class="practice-card" id="examWrite"><span class="icon">✍️</span><strong>Schreiben Simulation</strong><small>10-Felder-Formular + mindestens 40 Wörter</small></button>
      <button class="practice-card" id="examSpeak"><span class="icon">🎤</span><strong>Sprechen Simulation</strong><small>3 Prüfungsteile</small></button>
    </div>
    <section class="card"><div class="between"><div><div class="eyebrow">WISSENSABDECKUNG</div><h3>A1-Abschlusscheck</h3></div><span class="pill ${FR_A1_MASTERY.passedCount(state)===lessons.length?'green':'gray'}">${FR_A1_MASTERY.passedCount(state)}/${lessons.length} Lektionen</span></div><p class="muted">Die Lektions-Checks mischen die wichtigsten Inhalte jeder Lektion. Zusätzlich gibt es vier kumulative Kursblöcke à 30 Aufgaben.</p><button class="primary-btn" id="courseMastery">Kursweiten Abschlusscheck öffnen</button></section>
    <section class="card quick-test-card"><div class="between"><h3>Schnelltest</h3><span class="pill gray">Bestwert ${state.bestMock}%</span></div><p class="muted">32 zufällige Hören-/Lesen-Aufgaben für eine schnelle Standortbestimmung.</p><button class="primary-btn" id="quickMock">Schnelltest starten</button></section>`;
  document.getElementById('examListen').onclick=startListeningExam;
  document.getElementById('examRead').onclick=startReadingExam;
  document.getElementById('examWrite').onclick=startWritingExam;
  document.getElementById('examSpeak').onclick=startSpeakingExam;
  document.getElementById('courseMastery').onclick=()=>FR_A1_MASTERY.renderCourseMenu({view,state,save,onBack:renderExam,speak});
  document.getElementById('quickMock').onclick=startQuickMock;
}

function startListeningExam(){
  const tasks=[];
  for(let p=1;p<=4;p++)shuffle(D.listening['part'+p]).slice(0,4).forEach(t=>tasks.push([p,t]));
  let i=0,score=0;
  function next(){
    if(i>=tasks.length){
      const pct=Math.round(score/tasks.length*100);
      state.examScores.listening=Math.max(state.examScores.listening||0,pct);save(true);
      return examResult('Hören',score,tasks.length,pct);
    }
    const [p,t]=tasks[i++];
    renderListeningTask(p,true,ok=>{if(ok)score++;next();},t,`${i}/${tasks.length}`);
  }
  next();
}

function startReadingExam(){
  const tasks=[];
  for(let p=1;p<=4;p++)shuffle(D.reading['part'+p]).slice(0,4).forEach(t=>tasks.push([p,t]));
  let i=0,score=0,start=Date.now();
  function next(){
    if(i>=tasks.length){
      const pct=Math.round(score/tasks.length*100);
      state.examScores.reading=Math.max(state.examScores.reading||0,pct);save(true);
      return examResult('Lesen',score,tasks.length,pct);
    }
    const [p,t]=tasks[i++];
    renderReadingTask(p,ok=>{if(ok)score++;next();},t,`${i}/${tasks.length}`);
    const rem=document.createElement('div');
    rem.className='notice';rem.style.marginBottom='10px';
    rem.innerHTML=`⏱ Prüfungsmodus · ${Math.max(0,30-Math.floor((Date.now()-start)/60000))} Min. verbleibend`;
    view.prepend(rem);
  }
  next();
}

function startWritingExam(){
  const form=rand(D.forms),msg=rand(D.writing);
  renderFormTask((formScore)=>{
    renderMessageTask((messageScore)=>{
      const trainingScore=Math.round((formScore/form.fields.length*10+messageScore)/25*100);
      state.examScores.writing=Math.max(state.examScores.writing||0,trainingScore);save();
      view.innerHTML=`<section class="card center"><span class="pill green">SCHREIBEN ABGESCHLOSSEN</span><h2 style="margin-top:12px">Simulation beendet</h2><p class="muted">Formular und Text wurden bearbeitet. Trainingswert: ${trainingScore} %. Der Textanteil beruht auf deiner Selbstbewertung; das ist keine offizielle DELF-Punktzahl.</p><button class="primary-btn" id="backExam">Zur Prüfung</button></section>`;
      document.getElementById('backExam').onclick=renderExam;
    },msg);
  },form);
}

function startSpeakingExam(){
  let stage=0;
  function next(){
    stage++;
    if(stage===1){
      const q=shuffle(D.interview).slice(0,6);
      view.innerHTML=`<section class="card"><span class="pill">TEIL 1 · ca. 1 Minute</span><h2>Entretien dirigé</h2><p class="muted">Beantworte nacheinander diese Fragen laut.</p>${q.map(x=>`<div class="phrase-row"><div><strong>${esc(x.q)}</strong></div>${speakBtn(x.q)}</div>`).join('')}${recorderHtml('Exam1')}<div class="spacer"></div><button class="primary-btn" id="spNext">Teil 2</button></section>`;
      wireSpeakButtons();wireRecorder('Exam1');document.getElementById('spNext').onclick=next;
    }else if(stage===2){
      const cards=shuffle(D.infoCards).slice(0,8);
      view.innerHTML=`<section class="card"><span class="pill">TEIL 2 · ca. 2 Minuten</span><h2>Échange d’informations</h2><p class="muted">Formuliere zu jeder Karte eine Frage an den Prüfer.</p><div class="grid three">${cards.map(c=>`<div class="speaking-card"><div class="theme">${esc(c.theme)}</div><div class="cue" style="font-size:20px">${esc(c.cue)}</div></div>`).join('')}</div>${recorderHtml('Exam2')}<div class="spacer"></div><button class="primary-btn" id="spNext">Teil 3</button></section>`;
      wireRecorder('Exam2');document.getElementById('spNext').onclick=next;
    }else if(stage===3){
      const r=rand(D.roleplays);
      view.innerHTML=`<section class="card"><span class="pill">TEIL 3 · ca. 2 Minuten</span><h2>Dialogue simulé</h2><div class="speaking-card"><div class="theme">${esc(r.cue)}</div><div class="cue" style="font-size:20px">${esc(r.prompt)}</div></div>${recorderHtml('Exam3')}<div class="spacer"></div><button class="primary-btn" id="spNext">Simulation beenden</button></section>`;
      wireRecorder('Exam3');document.getElementById('spNext').onclick=next;
    }else{
      state.speakingSimulationCompleted=true;save();
      view.innerHTML=`<section class="card center"><span class="pill green">SPRECHEN ABGESCHLOSSEN</span><h2>Gut gemacht</h2><p class="muted">Prüfe: verständliche persönliche Antworten, einfache Fragen, erfolgreiche Alltagssituation, elementare Höflichkeit und verständliche Aussprache. Die Aufnahme wird nicht automatisch bewertet; das Abschließen allein ergibt keine Punktzahl.</p><button class="primary-btn" id="backExam">Zur Prüfung</button></section>`;
      document.getElementById('backExam').onclick=renderExam;
    }
  }
  next();
}

function examResult(name,score,total,pct){
  view.innerHTML=`<section class="card center"><span class="pill ${pct>=50?'green':'amber'}">${esc(name.toUpperCase())}</span><div class="score">${pct}%</div><h2>${score}/${total}</h2><p class="muted">Trainingswert. Die echte DELF-Bewertung erfolgt auf 25 Punkte je Kompetenz.</p><div class="button-row"><button class="secondary-btn" id="againExam">Noch einmal</button><button class="primary-btn" id="backExam">Prüfung</button></div></section>`;
  document.getElementById('againExam').onclick=()=>name==='Hören'?startListeningExam():startReadingExam();
  document.getElementById('backExam').onclick=renderExam;
}

function startQuickMock(){
  const qs=[];
  for(let p=1;p<=4;p++)shuffle(D.listening['part'+p]).slice(0,4).forEach(t=>qs.push({kind:'l',part:p,t}));
  for(let p=1;p<=4;p++)shuffle(D.reading['part'+p]).slice(0,4).forEach(t=>qs.push({kind:'r',part:p,t}));
  let i=0,score=0;
  function next(){
    if(i>=qs.length){
      const pct=Math.round(score/qs.length*100);
      state.bestMock=Math.max(state.bestMock,pct);save(true);
      view.innerHTML=`<section class="card center"><span class="pill ${pct>=60?'green':'amber'}">SCHNELLTEST</span><div class="score">${pct}%</div><h2>${score}/${qs.length}</h2><p class="muted">Hören + Lesen. Für vollständige Vorbereitung zusätzlich Schreiben und Sprechen trainieren.</p><div class="button-row"><button class="secondary-btn" id="againMock">Noch einmal</button><button class="primary-btn" id="backExam">Prüfung</button></div></section>`;
      document.getElementById('againMock').onclick=startQuickMock;
      document.getElementById('backExam').onclick=renderExam;
      return;
    }
    const q=qs[i++];
    if(q.kind==='l')renderListeningTask(q.part,true,ok=>{if(ok)score++;next();},q.t,`${i}/${qs.length}`);
    else renderReadingTask(q.part,ok=>{if(ok)score++;next();},q.t,`${i}/${qs.length}`);
  }
  next();
}

A1Voice.mount({lang:'fr-FR',uiLang:'de'});
audioToggle.onclick=()=>{
  audioEnabled=!audioEnabled;
  localStorage.setItem('frA2AudioEnabled',String(audioEnabled));
  updateAudioButton();
  if(audioEnabled)speak('Bonjour ! La lecture automatique est activée.',true);
  else A1Voice.cancel();
};
window.A1ResetCourseProgress=async()=>{
  const fresh=JSON.parse(JSON.stringify(defaultState));
  await A1Profile.resetProgress(COURSE_ID,fresh);
  A1Voice.cancel();state=fresh;setRoute('home');
};
updateAudioButton();
setRoute('home');
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));


