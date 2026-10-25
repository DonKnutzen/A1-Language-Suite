(() => {
  'use strict';
  const lessons=EN_A1_DATA.lessons,view=document.getElementById('view');
  const baseKey='englischA1State_v1',stateKey=A1Profile.namespacedKey(baseKey);
  const defaults={lastLessonId:0,doneLessons:[],lessonWork:{},lessonQuizBest:{},lessonMasteryBest:{},lessonMasteryLast:{},courseMasteryBest:{},lessonCheckProgress:{},courseCheckProgress:{},grammarBest:{},reviewPractice:{},vocabularyTrainer:{version:2,items:{},settings:{},session:null},training:{},masteredListening:[],masteredReading:[],writingDone:[],speakingDone:[],bestMock:0,examScores:{}};
  let state=A1Learning.loadState(stateKey,defaults),route='home',homeCleanup=[],audioEnabled=localStorage.getItem('enA1AudioEnabled')==='true';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const percent=()=>Math.round(state.doneLessons.length/lessons.length*100);
  function save(completed=false){
    EN_A1_MASTERY.completePassedLessons(state,lessons);
    localStorage.setItem(stateKey,JSON.stringify(state));
    A1Profile.saveProgress('englisch-a1',state,percent());
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
    view.innerHTML=`<section class="hero-card en-course-hero"><div class="between"><span class="pill">DE → EN · A1</span>${A1Streak.render('de',{showEmpty:true})}</div><h2>Englisch für deinen Alltag</h2><p>Schritt für Schritt vom ersten Satz zu kurzen Gesprächen, Nachrichten und Alltagssituationen.</p><div class="progress"><div style="width:${percent()}%"></div></div><p>${state.doneLessons.length} von 24 Lektionen abgeschlossen</p><button class="primary-btn continue-btn" id="continueLesson">${state.lastLessonId?'Fortsetzen':'Mit Lektion 1 beginnen'} → <small>${next.id}. ${esc(next.title)}</small></button></section>${A1DailyReview.html(state,{lang:'de',available:state.doneLessons.length>0||stats.open>0,mistakes:stats.open})}<section class="card en-course-summary">${A1LearningOak.render({percent:percent(),lang:'de',course:'englisch-a1'})}<div><h3>Dein A1-Kurs</h3><p>24 Lektionen · deutsche Erklärungen · englische Hörbeispiele</p><button class="secondary-btn" id="allLessons">Kursübersicht</button><button class="tiny-btn" id="allTraining">Fertigkeiten trainieren →</button></div></section><section class="card"><h3>So lernst du</h3><p>Höre und verstehe die Beispiele. Lies die passenden Grammatikregeln und übe sie. Danach folgen Hörverstehen und ein eigener Lektionscheck. Sprechen und Schreiben kannst du mit Musterantworten selbst prüfen.</p><p class="muted">Hard Mode wird ab 80 % im Lektionscheck frei. Eine bestandene Leistung ab 85 % erhält eine Auszeichnung; ab 95 % erhältst du Gold.</p><details><summary>Über diesen Kurs und die Quellen</summary><p>Ein eigenständiger A1-Alltagskurs für Erwachsene. Wortschatz, Strukturen und Aufgabenformate orientieren sich an den bereitgestellten Cambridge-Unterlagen zu Pre A1 Starters und A1 Movers sowie den A1-Beschreibungen des GER. Aufgaben und Texte sind neu formuliert. Dieser Kurs ist kein offizieller Cambridge-Prüfungssimulator und vergibt kein Sprachzertifikat.</p><p>A2-Flyers-Inhalte wie Present Perfect und ausführliche Zukunftsformen gehören nicht zu diesem Kurs.</p></details></section>`;
    view.querySelector('#continueLesson').onclick=()=>renderLesson(next.id);
    view.querySelector('#allLessons').onclick=()=>setRoute('learn');
    view.querySelector('#allTraining').onclick=renderTraining;
    view.querySelector('#homeReview')?.addEventListener('click',()=>openReview('mixed'));
    view.querySelector('#homeMistakes')?.addEventListener('click',()=>openReview('mistakes'));
    homeCleanup=[A1LearningOak.mount(view.querySelector('[data-learning-oak]')),A1DailyReview.mount(view.querySelector('[data-daily-review]'),{onDayChange:renderHome})];
  }
  function openReview(initialMode){cleanup();EN_A1_REVIEW.render({view,lessons,state,save,onBack:()=>setRoute('home'),speak,grammarHtml:EN_A1_DEEPENING.grammarHtml,initialMode});}
  function renderLearn(){
    view.innerHTML=`<div class="between"><h2>Dein Englisch-A1-Kurs</h2><span class="pill">${percent()} %</span></div><p class="muted">Wähle eine Lektion. Dein Zwischenstand bleibt gespeichert.</p><div class="lesson-grid">${lessons.map(l=>{const award=EN_A1_HARD_MODE.achievement(state,l.id),done=state.doneLessons.includes(l.id);return `<button class="card lesson-card ${done?'done':''} ${EN_A1_HARD_MODE.achievementClass(award)}" data-lesson="${l.id}"><span class="lesson-number">${l.id}</span><h3>${esc(l.title)}</h3><p>${esc(l.goals[0])}</p>${A1LessonFlow.listProgress(l,state,'de')}${award?EN_A1_HARD_MODE.achievementBadge(award):''}</button>`;}).join('')}</div>`;
    view.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>renderLesson(+b.dataset.lesson));
  }
  function renderLesson(id,position){
    cleanup();const l=lessons.find(l=>l.id===Number(id));if(!l)return renderLearn();
    if(position){const p=(state.lessonWork[l.id]||={});p.resume=position;}
    state.lastLessonId=l.id;save();
    const goalsHtml=`<div class="notice lesson-goals"><strong>Das kannst du nach dieser Lektion</strong><ul>${l.goals.map(g=>`<li>${esc(g)}</li>`).join('')}</ul></div>`;
    A1LessonFlow.render({lesson:l,content:l,view,state,save,resume:true,lessonCount:24,targetLang:'en',uiLang:'de',
      goalsHtml,grammarHtml:EN_A1_DEEPENING.grammarHtml(l),masteryHtml:EN_A1_MASTERY.introHtml(l,state),masteryCount:16,
      renderVocabulary:()=>renderVocab(l.id,()=>renderLesson(l.id)),vocabularyLabel:'Wortschatz dieser Lektion',
      renderMastery:({onBack,onResult})=>EN_A1_MASTERY.renderLessonTest({lesson:l,view,state,save,onBack,speak,onResult}),
      renderHardMode:({onBack})=>EN_A1_HARD_MODE.render({lesson:l,view,state,save,onBack}),
      model:l.model,writingModel:l.model,writingHints:l.topics.flatMap(t=>t.examples).slice(0,4),fullModel:true,
      dialogueHtml:`<details><summary>Sprachliche Hilfe</summary>${l.phrases.slice(0,4).map(([t,m])=>`<div class="phrase-row"><div><strong>${esc(t)}</strong><small>${esc(m)}</small></div>${speakBtn(t)}</div>`).join('')}</details>`,
      recorderHtml:recording,speak,speakBtn,wireSpeakButtons,playFeedbackAudio:t=>speak(t,false),renderLesson,renderLearn,
      pronunciationHtml:pronunciation(l.id)
    });
  }
  function pronunciation(id){
    if(id===2){
      const alphabet=[['A','/eɪ/'],['B','/biː/'],['C','/siː/'],['D','/diː/'],['E','/iː/'],['F','/ef/'],['G','/dʒiː/'],['H','/eɪtʃ/'],['I','/aɪ/'],['J','/dʒeɪ/'],['K','/keɪ/'],['L','/el/'],['M','/em/'],['N','/en/'],['O','/əʊ/'],['P','/piː/'],['Q','/kjuː/'],['R','/ɑː/'],['S','/es/'],['T','/tiː/'],['U','/juː/'],['V','/viː/'],['W','/ˈdʌbəljuː/'],['X','/eks/'],['Y','/waɪ/'],['Z','/zed/']];
      return `<details class="en-alphabet"><summary>Englisches Alphabet</summary><p>Höre die Buchstaben einzeln an. Im britischen Englisch heißt Z „zed“, im amerikanischen Englisch „zee“. Die Zeichen zwischen Schrägstrichen zeigen die Aussprache.</p><div class="en-letter-grid">${alphabet.map(([letter,ipa])=>`<div><strong>${letter}</strong><small>${ipa}</small>${speakBtn(letter)}</div>`).join('')}</div><p>Wichtige Unterschiede: E klingt wie deutsches „i“, I wie „ai“, G und J klingen verschieden.</p></details>`;
    }
    if(id===3){const groups=[['one','two','three','four','five','six','seven','eight','nine'],['ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety','one hundred'],['eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'],['twenty-one','twenty-two','twenty-three','twenty-four','twenty-five','twenty-six','twenty-seven','twenty-eight','twenty-nine']];return `<details><summary>Zahlen hören und unterscheiden</summary><p>Erst die Grundzahlen, dann die Zehner, dann elf bis neunzehn. Ab 21 verbindet man Zehner und Einer: twenty-one. Achte auf thirteen/thirty und fifteen/fifty.</p>${groups.map(g=>`<div class="phrase-row"><strong>${g.join(', ')}</strong>${speakBtn(g.join(', '))}</div>`).join('')}</details>`;}
    return '';
  }
  function renderVocab(initialLesson,onBack){cleanup();A1Vocabulary.render({view,state,save,lessons,speak,course:'en',initialLesson:typeof initialLesson==='number'?initialLesson:undefined,onBack,onExercises:renderTraining});}
  function renderExam(){
    cleanup();view.innerHTML=`<h2>A1-Abschluss & Training</h2><section class="card"><h3>Kurs in vier Etappen</h3><p>Je sechs Lektionen gemeinsam wiederholen. Aufgaben und Zwischenstände bleiben gespeichert.</p><button class="primary-btn" id="courseChecks">Modulchecks öffnen</button></section><section class="card"><h3>Fertigkeiten gezielt üben</h3><p>Grammatik, Hören, Lesen, Sprechen und Schreiben mit Themenauswahl.</p><button class="secondary-btn" id="skillTraining">Training öffnen</button></section><section class="card"><h3>Gemischter A1-Abschluss</h3><p>32 Aufgaben aus allen 24 Lektionen: Grammatik, Situationen, Hören und Lesen. Kein Zeitlimit. Freies Sprechen und Schreiben prüfst du separat mit den Musterantworten.</p><p class="muted">Deine Aufgaben bleiben beim Pausieren gleich. Bestwert: ${state.bestMock} %.</p><button class="primary-btn" id="finalMock">${state.training.final?.session?'Abschlussübung fortsetzen':'Abschlussübung starten'}</button></section>`;
    view.querySelector('#courseChecks').onclick=()=>EN_A1_MASTERY.renderCourseMenu({view,state,save,onBack:renderExam,speak});
    view.querySelector('#skillTraining').onclick=renderTraining;
    view.querySelector('#finalMock').onclick=()=>{
      const grammar=lessons.map(l=>{const t=l.topics[(l.id-1)%2];return {...t.transfer[(l.id-1)%t.transfer.length],lessonId:l.id,tag:`L${l.id}`};});
      const reading=A1Learning.shuffle(EN_A1_READING).slice(0,4).map(r=>{const f=r.fields[0];return{type:'choice',q:r.text+'\n\n'+f.q,answer:f.answer,o:f.o,a:0};});
      const listening=A1Learning.shuffle(lessons.filter(l=>l.id>=7)).slice(0,4).map(l=>{const d=A1_COMPREHENSION_CONTENT[l.id],f=d.fields[0];return{type:'listening',q:f.label,answer:f.answer,o:f.options,a:0,audio:d.turns.map(t=>t.text).join(' '),speech:d.turns.map(t=>t.text).join(' ')};});
      runRound('final','Gemischter A1-Abschluss',A1Learning.shuffle([...grammar,...reading,...listening]),renderExam);
    };
  }
  function renderTraining(){
    cleanup();view.innerHTML=`<div class="between"><h2>Fertigkeiten trainieren</h2><button class="tiny-btn" id="trainingBack">← Start</button></div><section class="card"><label for="trainingLesson">Thema</label><select id="trainingLesson">${lessons.map(l=>`<option value="${l.id}">${l.id}. ${esc(l.title)}</option>`).join('')}</select><div class="en-skill-grid">${[['grammar','Grammatik'],['listening','Hören'],['reading','Lesen'],['speaking','Sprechen'],['writing','Schreiben'],['form','Formular ausfüllen']].map(([key,label])=>`<button class="secondary-btn" data-skill="${key}">${label}</button>`).join('')}</div></section>`;
    view.querySelector('#trainingBack').onclick=()=>setRoute('home');
    view.querySelector('#trainingLesson').value=String(state.lastLessonId||1);
    view.querySelectorAll('[data-skill]').forEach(b=>b.onclick=()=>{
      const id=+view.querySelector('#trainingLesson').value,l=lessons[id-1];
      if(b.dataset.skill==='grammar')return renderLesson(id,{step:'grammar'});
      if(b.dataset.skill==='speaking'||b.dataset.skill==='writing')return renderLesson(id,{step:b.dataset.skill==='speaking'?'speak':'write'});
      if(b.dataset.skill==='form')return renderForm();
      if(b.dataset.skill==='listening'){
        const d=A1_COMPREHENSION_CONTENT[id];
        return runRound('listen-'+id,'Hören · '+l.title,d.fields.map(f=>({type:'listening',q:f.label,answer:f.answer,o:f.options,a:0,audio:d.turns.map(t=>t.text).join(' '),speech:d.turns.map(t=>t.text).join(' ')})),renderTraining);
      }
      const r=EN_A1_READING[id-1];
      runRound('read-'+id,'Lesen · '+l.title,r.fields.map(f=>({type:'choice',q:r.text+'\n\n'+f.q,answer:f.answer,o:f.o,a:0})),renderTraining);
    });
  }
  function runRound(key,title,tasks,onBack){
    cleanup();const p=(state.training[key]||={});
    A1ExerciseEngine.run({lesson:{id:0,title},view,exercises:tasks.map(q=>{const o=A1Learning.shuffle(q.o);return {...q,o,a:o.indexOf(q.answer)};}),progress:p,exerciseVersion:162,targetLang:'en',uiLang:'de',review:true,answerAudioAfterResponse:true,
      saveProgress:()=>save(),playAudio:t=>speak(t,true),playFeedbackAudio:t=>speak(t,false),onBack,
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
  audioToggle.onclick=()=>{audioEnabled=!audioEnabled;localStorage.setItem('enA1AudioEnabled',String(audioEnabled));audioLabel();if(!audioEnabled)A1Voice.cancel();};
  A1Voice.mount({lang:'en-GB',uiLang:'de'});audioLabel();
  window.EN_A1_OPEN_LESSON=renderLesson;
  window.A1CourseProgressPercent=percent;
  window.A1ResetCourseProgress=async()=>{const fresh=JSON.parse(JSON.stringify(defaults));await A1Profile.resetProgress('englisch-a1',fresh);state=fresh;setRoute('home');};
  window.EN_A1_APP={get state(){return state;},renderLesson,renderLearn,renderTraining,renderExam,setRoute};
  setRoute('home');
  if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
})();
