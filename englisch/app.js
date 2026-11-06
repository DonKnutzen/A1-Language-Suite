(() => {
  'use strict';
  // B1-only adapter: keep the shared player, but snapshot tasks and randomise new choices.
  const comprehensionRender=A1Comprehension.render;
  A1Comprehension.render=options=>{
    const latest=options.data;
    if(!latest)return comprehensionRender(options);
    const work=options.work,previous=work.comprehension;
    const p=work.comprehension=previous&&typeof previous==='object'&&!Array.isArray(previous)?previous:{};
    if(!p.contentSnapshot){
      const existing=p.graded||p.answers?.some(Boolean);
      const source=existing?(latest.legacyContent||latest):latest;
      const snapshot={version:source.version||1,title:source.title,turns:source.turns,
        fields:source.fields.map(f=>({...f,options:existing?[...f.options]:A1Learning.shuffle(f.options)}))};
      p.contentSnapshot=JSON.parse(JSON.stringify(snapshot));options.save();
    }
    comprehensionRender({...options,data:p.contentSnapshot});
    const retry=options.root.querySelector('#dialogueRetry');
    if(retry)retry.onclick=()=>{
      A1Voice.cancel();
      (p.history||=[]).push(JSON.parse(JSON.stringify({content:p.contentSnapshot,answers:p.answers,graded:p.graded,score:p.score})));
      p.answers=[];p.graded=false;delete p.contentSnapshot;
      A1Comprehension.render(options);options.save();
    };
  };
  const lessons=EN_A1_DATA.lessons,view=document.getElementById('view');
  const baseKey='englischB1State_v1',stateKey=A1Profile.namespacedKey(baseKey);
  const defaults={lastLessonId:0,doneLessons:[],lessonWork:{},lessonQuizBest:{},lessonMasteryBest:{},lessonMasteryLast:{},courseMasteryBest:{},lessonCheckProgress:{},courseCheckProgress:{},grammarBest:{},reviewPractice:{},vocabularyTrainer:{version:2,items:{},settings:{},session:null},training:{},masteredListening:[],masteredReading:[],writingDone:[],speakingDone:[],bestMock:0,examScores:{}};
  let state=A1Learning.loadState(stateKey,defaults),route='home',homeCleanup=[],audioEnabled=localStorage.getItem('enB1AudioEnabled')==='true';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const percent=()=>Math.round(state.doneLessons.length/lessons.length*100);
  function save(completed=false){
    EN_A1_MASTERY.completePassedLessons(state,lessons);
    localStorage.setItem(stateKey,JSON.stringify(state));
    A1Profile.saveProgress('englisch-b1',state,percent());
    if(completed)A1Streak.completeExercise();
  }
  function speak(text,force=false,rate=.82){if(text&&(force||audioEnabled))A1Voice.speak(text,{lang:'en-GB',rate});}
  function speakBtn(text){return `<button type="button" class="speak-btn" data-speak="${encodeURIComponent(text)}" aria-label="Englische Aussprache anhören">🔊</button>`;}
  function wireSpeakButtons(){view.querySelectorAll('[data-speak]').forEach(b=>b.onclick=()=>speak(decodeURIComponent(b.dataset.speak),true));}
  function cleanup(){homeCleanup.forEach(f=>f?.());homeCleanup=[];A1Voice.cancel();}
  function setRoute(next){
    cleanup();route=next;document.querySelectorAll('[data-route]').forEach(b=>b.classList.toggle('active',b.dataset.route===next));
    ({home:renderHome,learn:renderLearn,practice:renderVocab,exam:renderExam}[next]||renderHome)();
    window.scrollTo({top:0,behavior:'instant'});
  }
  const recording=id=>`<div class="recorder"><button class="secondary-btn" id="startRec${id}">● Aufnehmen</button><button class="soft-btn" id="stopRec${id}" disabled>■ Stopp</button></div><div class="record-status" id="recStatus${id}"></div><div class="playback" id="playback${id}"></div>`;
  function renderHome(){
    const next=A1LessonFlow.continuation(lessons,state),stats=EN_A1_REVIEW.statistics(state);
    view.innerHTML=`<section class="hero-card en-course-hero"><div class="between"><span class="pill">DE → EN · B1</span>${A1Streak.render('de',{showEmpty:true})}</div><h2>Mehr ausdrücken. Sicherer kommunizieren.</h2><p>24 Lektionen für Lernende mit A2-Grundlagen: Erfahrungen austauschen, Meinungen begründen und zusammenhängend kommunizieren.</p><div class="progress"><div style="width:${percent()}%"></div></div><p>${state.doneLessons.length} von 24 Lektionen abgeschlossen</p><button class="primary-btn home-continue-btn en-action-current" id="continueLesson"><span class="en-home-continue-copy"><span>${state.lastLessonId?'Fortsetzen':'Mit Lektion 1 beginnen'}</span><small>${next.id}. ${esc(next.title)}</small></span><span class="home-continue-arrow" aria-hidden="true">→</span></button></section>${A1DailyReview.html(state,{lang:'de',available:state.doneLessons.length>0||stats.open>0,mistakes:stats.open})}<section class="card en-course-summary">${A1LearningOak.render({percent:percent(),lang:'de',course:'englisch-b1'})}<div><h3>Dein Lernbaum</h3><p>Mit jeder bestandenen Lektion wächst dein Baum.</p></div></section><section class="card"><h3>So lernst du</h3><p>Höre und verstehe die Beispiele. Lies die passenden Grammatikregeln und übe sie. Danach folgen Hörverstehen und ein eigener Lektionscheck. Sprechen und Schreiben kannst du mit Musterantworten selbst prüfen.</p><p class="muted">Finale &amp; Arcade wird ab 80 % im Lektionscheck frei. Bestanden ab 80 % in jedem objektiven Teil plus selbst geprüftem Schreiben. Gold gibt es ab 95 % bei bestandenem Gesamtversuch. Die Arcade-Spiele sind zusätzliches Training.</p><details><summary>Über diesen Kurs und die Quellen</summary><p>Ein eigenständiger B1-Kurs mit A2 als Voraussetzung. Die Themen orientieren sich am bereitgestellten English Unlimited B1 (2010). Ergänzende Fertigkeiten und Aufgaben orientieren sich am aktuellen Cambridge B1 Preliminary. Alle Kurstexte sind neu formuliert. Dieser Kurs vergibt kein Sprachzertifikat.</p><p>Cambridge prüft Lesen, Schreiben, Hören und Sprechen zu gleichen Anteilen. Die App bietet Sprachtraining und Aufgabenformate; Browserstimmen, Selbstbewertung und verkürzte Trainingssets ersetzen keine vollständige Prüfung.</p><p><a href="https://www.cambridgeenglish.org/exams-and-tests/qualifications/preliminary/format/" target="_blank" rel="noopener">Offizielles Prüfungsformat</a> · <a href="LEHRPLAN-B1.md">Lehrplan und Abdeckungsprüfung</a></p></details></section>`;
    view.querySelector('#continueLesson').onclick=()=>renderLesson(next.id);
    view.querySelector('#homeReview')?.addEventListener('click',()=>openReview('mixed'));
    view.querySelector('#homeMistakes')?.addEventListener('click',()=>openReview('mistakes'));
    homeCleanup=[A1LearningOak.mount(view.querySelector('[data-learning-oak]')),A1DailyReview.mount(view.querySelector('[data-daily-review]'),{onDayChange:renderHome})];
  }
  function openReview(initialMode){cleanup();EN_A1_REVIEW.render({view,lessons,state,save,onBack:()=>setRoute('home'),speak,grammarHtml:EN_A1_DEEPENING.grammarHtml,initialMode});}
  function renderLearn(){
    view.innerHTML=`<div class="between"><h2>Dein Englisch-B1-Kurs</h2><span class="pill">${percent()} %</span></div><p class="muted">Wähle eine Lektion. Dein Zwischenstand bleibt gespeichert.</p><div class="lesson-grid">${lessons.map(l=>{const award=EN_A1_HARD_MODE.achievement(state,l.id),done=state.doneLessons.includes(l.id);return `<button class="card lesson-card ${done?'done':''} ${EN_A1_HARD_MODE.achievementClass(award)}" data-lesson="${l.id}"><span class="lesson-number">${l.id}</span><h3>${esc(l.title)}</h3><p>${esc(l.goals[0])}</p>${A1LessonFlow.listProgress(l,state,'de')}${award?EN_A1_HARD_MODE.achievementBadge(award):''}</button>`;}).join('')}</div>`;
    view.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>renderLesson(+b.dataset.lesson));
  }
  function renderLesson(id,position){
    cleanup();const l=lessons.find(l=>l.id===Number(id));if(!l)return renderLearn();
    if(position){const p=(state.lessonWork[l.id]||={});p.resume=position;}
    state.lastLessonId=l.id;save();
    const goalsHtml=`<div class="notice lesson-goals"><strong>Das kannst du nach dieser Lektion</strong><ul>${l.goals.map(g=>`<li>${esc(g)}</li>`).join('')}</ul></div>`;
    A1LessonFlow.render({lesson:l,content:l,view,state,save,resume:true,lessonCount:24,targetLang:'en',uiLang:'de',
      goalsHtml,grammarHtml:EN_A1_DEEPENING.grammarHtml(l),masteryHtml:EN_A1_MASTERY.introHtml(l,state),masteryCount:EN_A1_MASTERY.testCount(l.id),
      renderVocabulary:()=>renderVocab(l.id,()=>renderLesson(l.id)),vocabularyLabel:'Wortschatz dieser Lektion',
      renderMastery:({onBack,onResult})=>EN_A1_MASTERY.renderLessonTest({lesson:l,view,state,save,onBack,speak,onResult}),
      renderHardMode:({onBack})=>EN_A1_HARD_MODE.render({lesson:l,view,state,save,onBack}),
      model:l.speakingModel,writingModel:l.model,writingHints:l.topics.flatMap(t=>t.examples).slice(0,4),fullModel:true,
      dialogueHtml:`<details><summary>Sprachliche Hilfe</summary>${l.phrases.slice(0,4).map(([t,m])=>`<div class="phrase-row"><div><strong>${esc(t)}</strong><small>${esc(m)}</small></div>${speakBtn(t)}</div>`).join('')}</details>`,
      recorderHtml:recording,speak,speakBtn,wireSpeakButtons,playFeedbackAudio:t=>speak(t,true),renderLesson,renderLearn,
      pronunciationHtml:pronunciation(l.id)
    });
  }
  function pronunciation(id){return `<details><summary>Aussprache und flüssiges Sprechen</summary><p>Sprich die Beispiele in sinnvollen Wortgruppen nach. Betone wichtige Inhaltswörter; verbinde anschließend zwei Aussagen mit einem passenden Grund oder Gegensatz.</p><p>In Fragen verändert die Betonung die Absicht. Nimm dich auf und prüfe Verständlichkeit, Satzrhythmus und Endungen. Die Browserstimme ist eine Übungshilfe, keine automatische Aussprachebewertung.</p></details>`;}
  function renderVocab(initialLesson,onBack){cleanup();A1Vocabulary.render({view,state,save,lessons,speak,course:'en',initialLesson:typeof initialLesson==='number'?initialLesson:undefined,onBack,onExercises:renderTraining});}
  function renderExam(){
    cleanup();view.innerHTML=`<h2>B1-Abschluss & Training</h2><section class="card"><h3>Cambridge-orientierte Aufgabenformate</h3><p>Lesen, Schreiben, Hören und Sprechen gezielt üben. Mit gespeicherten Entwürfen und transparenter Selbstbewertung.</p><button class="primary-btn" id="b1ExamFormats">Prüfungstraining öffnen</button></section><section class="card"><h3>Kurs in vier Etappen</h3><p>Je sechs Lektionen gemeinsam wiederholen. Aufgaben und Zwischenstände bleiben gespeichert.</p><button class="primary-btn" id="courseChecks">Modulchecks öffnen</button></section><section class="card"><h3>Fertigkeiten gezielt üben</h3><p>Grammatik, Hören, Lesen, Sprechen und Schreiben mit Themenauswahl.</p><button class="secondary-btn" id="skillTraining">Training öffnen</button></section><section class="card"><h3>Gemischter B1-Abschluss</h3><p>32 Aufgaben aus allen 24 Lektionen: Grammatik, Situationen, Hören und Lesen. Kein Zeitlimit. Freies Sprechen und Schreiben prüfst du separat mit den Musterantworten.</p><p class="muted">Deine Aufgaben bleiben beim Pausieren gleich. Bestwert: ${state.bestMock} %.</p><button class="primary-btn" id="finalMock">${state.training.final?.session?'Abschlussübung fortsetzen':'Abschlussübung starten'}</button></section>`;
    view.querySelector('#b1ExamFormats').onclick=()=>EN_B1_PRACTICE.render({view,state,save,onBack:renderExam,speak});
    view.querySelector('#courseChecks').onclick=()=>EN_A1_MASTERY.renderCourseMenu({view,state,save,onBack:renderExam,speak});
    view.querySelector('#skillTraining').onclick=renderTraining;
    view.querySelector('#finalMock').onclick=()=>{
      const grammar=lessons.map(l=>{const t=l.topics[(l.id-1)%2];return {...t.transfer[(l.id-1)%t.transfer.length],lessonId:l.id,tag:`L${l.id}`};});
      const reading=A1Learning.shuffle(EN_A1_READING).slice(0,4).map(r=>{const f=r.fields[0];return{type:'choice',q:r.text+'\n\n'+f.q,answer:f.answer,o:f.o,a:0};});
      const listening=A1Learning.shuffle(lessons.filter(l=>l.id>=7)).slice(0,4).map(l=>{const d=A1_COMPREHENSION_CONTENT[l.id],f=d.fields[0];return{type:'listening',q:f.label,answer:f.answer,o:f.options,a:0,audio:d.turns.map(t=>t.text).join(' '),speech:d.turns.map(t=>t.text).join(' '),turns:d.turns};});
      runRound('final','Gemischter B1-Abschluss',A1Learning.shuffle([...grammar,...reading,...listening]),renderExam);
    };
  }
  function renderTraining(){
    cleanup();view.innerHTML=`<div class="between"><h2>Fertigkeiten trainieren</h2><button class="tiny-btn" id="trainingBack">← Start</button></div><section class="card"><label for="trainingLesson">Thema</label><select id="trainingLesson">${lessons.map(l=>`<option value="${l.id}">${l.id}. ${esc(l.title)}</option>`).join('')}</select><div class="en-skill-grid">${[['grammar','Grammatik'],['listening','Hören'],['reading','Lesen'],['speaking','Sprechen'],['writing','Schreiben']].map(([key,label])=>`<button class="secondary-btn" data-skill="${key}">${label}</button>`).join('')}</div></section>`;
    view.querySelector('#trainingBack').onclick=()=>setRoute('home');
    view.querySelector('#trainingLesson').value=String(state.lastLessonId||1);
    view.querySelectorAll('[data-skill]').forEach(b=>b.onclick=()=>{
      const id=+view.querySelector('#trainingLesson').value,l=lessons[id-1];
      if(b.dataset.skill==='grammar')return renderLesson(id,{step:'grammar'});
      if(b.dataset.skill==='speaking'||b.dataset.skill==='writing')return renderLesson(id,{step:b.dataset.skill==='speaking'?'speak':'write'});
      if(b.dataset.skill==='form')return renderForm();
      if(b.dataset.skill==='listening'){
        const d=A1_COMPREHENSION_CONTENT[id];
        return runRound('listen-'+id,'Hören · '+l.title,d.fields.map(f=>({type:'listening',q:f.label,answer:f.answer,o:f.options,a:0,audio:d.turns.map(t=>t.text).join(' '),speech:d.turns.map(t=>t.text).join(' '),turns:d.turns})),renderTraining);
      }
      const r=EN_A1_READING[id-1];
      runRound('read-'+id,'Lesen · '+l.title,r.fields.map(f=>({type:'choice',q:r.text+'\n\n'+f.q,answer:f.answer,o:f.o,a:0})),renderTraining);
    });
  }
  function runRound(key,title,tasks,onBack){
    cleanup();const p=(state.training[key]||={});
    for(const q of p.session?.ex||[])if(q.type==='listening'&&!q.turns){const d=Object.values(A1_COMPREHENSION_CONTENT).find(d=>d.turns.map(t=>t.text).join(' ')===q.audio);if(d)q.turns=d.turns;}
    A1ExerciseEngine.run({lesson:{id:0,title},view,exercises:tasks.map(q=>{const o=A1Learning.shuffle(q.o);return {...q,o,a:o.indexOf(q.answer)};}),progress:p,exerciseVersion:1001,selectionOnly:true,targetLang:'en',uiLang:'de',review:true,answerAudioAfterResponse:true,
      saveProgress:()=>save(),playDialogue:turns=>A1Voice.speakDialogue(turns,{lang:'en-GB',rate:.82}),playAudio:t=>speak(t,true),playFeedbackAudio:t=>speak(t,true),onBack,
      onFinish:(score,total)=>{const pct=Math.round(score/total*100);p.best=Math.max(p.best||0,pct);if(key==='final')state.bestMock=Math.max(state.bestMock,pct);save(true);view.innerHTML=`<section class="card center"><h2>${esc(title)}</h2><div class="score">${pct} %</div><p>${score} von ${total} richtig</p><button class="primary-btn" id="roundBack">Zur Auswahl</button></section>`;view.querySelector('button').onclick=onBack;}
    });
  }
  function renderForm(){
    const p=(state.training.form||={draft:{}}),fields=[['firstName','First name','Vorname','Anna'],['surname','Surname','Nachname','Hill'],['address','Address','Adresse','12 Green Street'],['postcode','Postcode','Postleitzahl','B3J 2K9'],['phone','Phone number','Telefonnummer','555 0148']];
    view.innerHTML=`<section class="card"><button class="tiny-btn" id="formBack">← Training</button><h2>Ein Anmeldeformular ausfüllen</h2><p>Nutze erfundene Angaben. Ordne die englischen Feldnamen zu und prüfe danach selbst.</p>${fields.map(([key,en,de])=>`<label class="en-form-field">${en}<input data-form-field="${key}" value="${esc(p.draft[key]||'')}" autocomplete="off" ${p.checked?'readonly':''}></label>`).join('')}<button class="primary-btn" id="formCheck">${p.checked?'Noch einmal':'Mit Beispiel vergleichen'}</button><div id="formModel" ${p.checked?'':'hidden'}>${fields.map(([,en,de,example])=>`<p><strong>${en}</strong> = ${de}<br>${example}</p>`).join('')}<p>Prüfe Feldzuordnung und Vollständigkeit. Die persönlichen Angaben haben keine feste Musterlösung.</p></div></section>`;
    view.querySelector('#formBack').onclick=renderTraining;
    view.querySelectorAll('[data-form-field]').forEach(input=>input.oninput=()=>{p.draft[input.dataset.formField]=input.value;save();});
    view.querySelector('#formCheck').onclick=()=>{if(p.checked){p.checked=false;save();return renderForm();}if(fields.some(([key])=>!p.draft[key]?.trim())){view.querySelector('#formModel').hidden=false;return;}p.checked=true;save(true);renderForm();};
  }
  document.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>setRoute(b.dataset.route));
  const audioToggle=document.getElementById('audioToggle');
  function audioLabel(){audioToggle.textContent=audioEnabled?'🔊 Auto':'🔇 Auto';audioToggle.setAttribute('aria-pressed',String(audioEnabled));}
  audioToggle.onclick=()=>{audioEnabled=!audioEnabled;localStorage.setItem('enB1AudioEnabled',String(audioEnabled));audioLabel();if(!audioEnabled)A1Voice.cancel();};
  A1Voice.mount({lang:'en-GB',uiLang:'de'});audioLabel();
  window.EN_A1_OPEN_LESSON=renderLesson;
  window.A1CourseProgressPercent=percent;
  window.A1ResetCourseProgress=async()=>{const fresh=JSON.parse(JSON.stringify(defaults));await A1Profile.resetProgress('englisch-b1',fresh);state=fresh;setRoute('home');};
  window.EN_A1_APP={save,get state(){return state;},renderLesson,renderLearn,renderTraining,renderExam,setRoute};
  setRoute('home');
  if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
})();
