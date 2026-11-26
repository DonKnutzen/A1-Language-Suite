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
  const baseKey='anglaisB1State_v1',stateKey=A1Profile.namespacedKey(baseKey);
  const defaults={lastLessonId:0,doneLessons:[],lessonWork:{},lessonQuizBest:{},lessonMasteryBest:{},lessonMasteryLast:{},courseMasteryBest:{},lessonCheckProgress:{},courseCheckProgress:{},grammarBest:{},reviewPractice:{},vocabularyTrainer:{version:2,items:{},settings:{},session:null},training:{},masteredListening:[],masteredReading:[],writingDone:[],speakingDone:[],bestMock:0,examScores:{}};
  let state=A1Learning.loadState(stateKey,defaults),route='home',homeCleanup=[],audioEnabled=localStorage.getItem('anglaisB1AudioEnabled')==='true';
  let cloudStatePending=false;
  window.A1ApplyCloudProgress=()=>{cloudStatePending=true;if(route==='home'){cleanup();state=A1Learning.loadState(stateKey,defaults);cloudStatePending=false;renderHome();}};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const percent=()=>Math.round(state.doneLessons.length/lessons.length*100);
  function save(completed=false){
    EN_A1_MASTERY.completePassedLessons(state,lessons);
    localStorage.setItem(stateKey,JSON.stringify(state));
    A1Profile.saveProgress('anglais-b1',state,percent());
    if(completed)A1Streak.completeExercise();
  }
  function speak(text,force=false,rate=.82){if(text&&(force||audioEnabled))A1Voice.speak(text,{lang:'en-GB',rate});}
  function speakBtn(text){return `<button type="button" class="speak-btn" data-speak="${encodeURIComponent(text)}" aria-label="Écouter la prononciation anglaise">🔊</button>`;}
  function wireSpeakButtons(){view.querySelectorAll('[data-speak]').forEach(b=>b.onclick=()=>speak(decodeURIComponent(b.dataset.speak),true));}
  function cleanup(){homeCleanup.forEach(f=>f?.());homeCleanup=[];A1Voice.cancel();}
  function setRoute(next){
    if(cloudStatePending){state=A1Learning.loadState(stateKey,defaults);cloudStatePending=false;}
    cleanup();route=next;document.querySelectorAll('[data-route]').forEach(b=>b.classList.toggle('active',b.dataset.route===next));
    ({home:renderHome,learn:renderLearn,practice:renderVocab,exam:renderExam}[next]||renderHome)();
    window.scrollTo({top:0,behavior:'instant'});
  }
  const recording=id=>`<div class="recorder"><button class="secondary-btn" id="startRec${id}">● Enregistrer</button><button class="soft-btn" id="stopRec${id}" disabled>■ Stop</button></div><div class="record-status" id="recStatus${id}"></div><div class="playback" id="playback${id}"></div>`;
  function renderHome(){
    const next=A1LessonFlow.continuation(lessons,state),stats=EN_A1_REVIEW.statistics(state);
    view.innerHTML=`<section class="hero-card en-course-hero"><div class="between"><span class="pill">FR → EN · B1</span>${A1Streak.render('fr',{showEmpty:true})}</div><h2>En dire plus. Communiquer avec assurance.</h2><p>24 leçons pour les personnes qui ont déjà le niveau A2 : partager des expériences, justifier son opinion et communiquer de façon suivie.</p><div class="progress"><div style="width:${percent()}%"></div></div><p>${state.doneLessons.length} leçons terminées sur 24</p><button class="primary-btn home-continue-btn en-action-current" id="continueLesson"><span class="en-home-continue-copy"><span>${state.lastLessonId?'Continuer':'Commencer la leçon 1'}</span><small>${next.id}. ${esc(next.title)}</small></span><span class="home-continue-arrow" aria-hidden="true">→</span></button></section>${A1DailyReview.html(state,{lang:'fr',available:state.doneLessons.length>0||stats.open>0,mistakes:stats.open})}<section class="card en-course-summary">${A1LearningOak.render({percent:percent(),lang:'fr',course:'anglais-b1'})}<div><h3>Ton arbre</h3><p>Ton arbre grandit à chaque leçon réussie.</p></div></section><section class="card"><h3>Comment tu apprends</h3><p>Écoute et comprends les exemples. Lis les règles de grammaire correspondantes et entraîne-toi. Ensuite viennent la compréhension orale et un test de leçon. Pour l’oral et l’écrit, tu te corriges toi-même avec des réponses modèles.</p><p class="muted">Finale &amp; Arcade se débloque à partir de 80 % au test de leçon. C’est réussi avec au moins 80 % dans chaque partie objective et un écrit autocorrigé. L’or s’obtient à partir de 95 % si la tentative est réussie. Les jeux d’arcade sont un entraînement en plus.</p><details><summary>À propos de ce cours et des sources</summary><p>Un cours B1 indépendant, avec le niveau A2 comme prérequis et des explications en français. Les thèmes s’inspirent de English Unlimited B1 (2010). Les compétences et les exercices complémentaires s’inspirent du Cambridge B1 Preliminary actuel. Tous les textes du cours sont rédigés spécialement. Ce cours ne délivre pas de certificat.</p><p>Cambridge évalue la lecture, l’écrit, l’écoute et l’oral à parts égales. L’application propose un entraînement linguistique et des formats d’exercices ; les voix du navigateur, l’autoévaluation et les séries raccourcies ne remplacent pas un examen complet.</p><p><a href="https://www.cambridgeenglish.org/exams-and-tests/qualifications/preliminary/format/" target="_blank" rel="noopener">Format officiel de l’examen</a> · <a href="LEHRPLAN-B1.md">Programme et couverture (en allemand)</a></p></details></section>`;
    view.querySelector('#continueLesson').onclick=()=>renderLesson(next.id);
    view.querySelector('#homeReview')?.addEventListener('click',()=>openReview('mixed'));
    view.querySelector('#homeMistakes')?.addEventListener('click',()=>openReview('mistakes'));
    homeCleanup=[A1LearningOak.mount(view.querySelector('[data-learning-oak]')),A1DailyReview.mount(view.querySelector('[data-daily-review]'),{onDayChange:renderHome})];
  }
  function openReview(initialMode){cleanup();EN_A1_REVIEW.render({view,lessons,state,save,onBack:()=>setRoute('home'),speak,grammarHtml:EN_A1_DEEPENING.grammarHtml,initialMode});}
  function renderLearn(){
    view.innerHTML=`<div class="between"><h2>Ton cours d’anglais B1</h2><span class="pill">${percent()} %</span></div><p class="muted">Choisis une leçon. Ta progression reste enregistrée.</p><div class="lesson-grid">${lessons.map(l=>{const award=EN_A1_HARD_MODE.achievement(state,l.id),done=state.doneLessons.includes(l.id);return `<button class="card lesson-card ${done?'done':''} ${EN_A1_HARD_MODE.achievementClass(award)}" data-lesson="${l.id}"><span class="lesson-number">${l.id}</span><h3>${esc(l.title)}</h3><p>${esc(l.goals[0])}</p>${A1LessonFlow.listProgress(l,state,'fr')}${award?EN_A1_HARD_MODE.achievementBadge(award):''}</button>`;}).join('')}</div>`;
    view.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>renderLesson(+b.dataset.lesson));
  }
  function renderLesson(id,position){
    cleanup();const l=lessons.find(l=>l.id===Number(id));if(!l)return renderLearn();
    if(position){const p=(state.lessonWork[l.id]||={});p.resume=position;}
    state.lastLessonId=l.id;save();
    const goalsHtml=`<div class="notice lesson-goals"><strong>Après cette leçon, tu sais</strong><ul>${l.goals.map(g=>`<li>${esc(g)}</li>`).join('')}</ul></div>`;
    A1LessonFlow.render({lesson:l,content:l,view,state,save,resume:true,lessonCount:24,targetLang:'en',uiLang:'fr',
      goalsHtml,grammarHtml:EN_A1_DEEPENING.grammarHtml(l),masteryHtml:EN_A1_MASTERY.introHtml(l,state),masteryCount:EN_A1_MASTERY.testCount(l.id),
      renderVocabulary:()=>renderVocab(l.id,()=>renderLesson(l.id)),vocabularyLabel:'Vocabulaire de cette leçon',
      renderMastery:({onBack,onResult})=>EN_A1_MASTERY.renderLessonTest({lesson:l,view,state,save,onBack,speak,onResult}),
      renderHardMode:({onBack})=>EN_A1_HARD_MODE.render({lesson:l,view,state,save,onBack}),
      model:l.speakingModel,writingModel:l.model,writingHints:l.topics.flatMap(t=>t.examples).slice(0,4),fullModel:true,
      dialogueHtml:`<details><summary>Aide pour la langue</summary>${l.phrases.slice(0,4).map(([t,m])=>`<div class="phrase-row"><div><strong>${esc(t)}</strong><small>${esc(m)}</small></div>${speakBtn(t)}</div>`).join('')}</details>`,
      recorderHtml:recording,speak,speakBtn,wireSpeakButtons,playFeedbackAudio:t=>speak(t,true),renderLesson,renderLearn,
      pronunciationHtml:pronunciation(l.id)
    });
  }
  function pronunciation(id){return `<details><summary>Prononciation et aisance à l’oral</summary><p>Répète les exemples par groupes de mots logiques. Accentue les mots importants : contrairement au français, l’anglais a un rythme accentué, avec des syllabes fortes et faibles. Relie ensuite deux phrases avec une raison ou une opposition adaptée.</p><p>Dans les questions, l’intonation change l’intention. Enregistre-toi et vérifie la clarté, le rythme et les terminaisons (par ex. le -s et le -ed, qui se prononcent). La voix du navigateur est une aide à l’entraînement, pas une évaluation automatique de ta prononciation.</p></details>`;}
  function renderVocab(initialLesson,onBack){cleanup();A1Vocabulary.render({view,state,save,lessons,speak,course:'en',initialLesson:typeof initialLesson==='number'?initialLesson:undefined,onBack,onExercises:renderTraining});}
  function renderExam(){
    cleanup();view.innerHTML=`<h2>Bilan B1 et entraînement</h2><section class="card"><h3>Formats d’exercices inspirés de Cambridge</h3><p>Entraîne-toi de façon ciblée en lecture, à l’écrit, à l’écoute et à l’oral. Avec brouillons enregistrés et autoévaluation transparente.</p><button class="primary-btn" id="b1ExamFormats">Ouvrir l’entraînement à l’examen</button></section><section class="card"><h3>Le cours en quatre étapes</h3><p>Révise six leçons à la fois. Les exercices et ta progression restent enregistrés.</p><button class="primary-btn" id="courseChecks">Ouvrir les tests de module</button></section><section class="card"><h3>S’entraîner par compétence</h3><p>Grammaire, écoute, lecture, oral et écrit, avec choix du thème.</p><button class="secondary-btn" id="skillTraining">Ouvrir l’entraînement</button></section><section class="card"><h3>Bilan B1 mixte</h3><p>32 exercices tirés des 24 leçons : grammaire, situations, écoute et lecture. Pas de limite de temps. L’oral et l’écrit libres se vérifient à part, avec les réponses modèles.</p><p class="muted">Tes exercices restent les mêmes quand tu fais une pause. Meilleur score : ${state.bestMock} %.</p><button class="primary-btn" id="finalMock">${state.training.final?.session?'Reprendre le bilan':'Commencer le bilan'}</button></section>`;
    view.querySelector('#b1ExamFormats').onclick=()=>EN_B1_PRACTICE.render({view,state,save,onBack:renderExam,speak});
    view.querySelector('#courseChecks').onclick=()=>EN_A1_MASTERY.renderCourseMenu({view,state,save,onBack:renderExam,speak});
    view.querySelector('#skillTraining').onclick=renderTraining;
    view.querySelector('#finalMock').onclick=()=>{
      const grammar=lessons.map(l=>{const t=l.topics[(l.id-1)%2];return {...t.transfer[(l.id-1)%t.transfer.length],lessonId:l.id,tag:`L${l.id}`};});
      const reading=A1Learning.shuffle(EN_A1_READING).slice(0,4).map(r=>{const f=r.fields[0];return{type:'choice',q:r.text+'\n\n'+f.q,answer:f.answer,o:f.o,a:0};});
      const listening=A1Learning.shuffle(lessons.filter(l=>l.id>=7)).slice(0,4).map(l=>{const d=A1_COMPREHENSION_CONTENT[l.id],f=d.fields[0];return{type:'listening',q:f.label,answer:f.answer,o:f.options,a:0,audio:d.turns.map(t=>t.text).join(' '),speech:d.turns.map(t=>t.text).join(' '),turns:d.turns};});
      runRound('final','Bilan B1 mixte',A1Learning.shuffle([...grammar,...reading,...listening]),renderExam);
    };
  }
  function renderTraining(){
    cleanup();view.innerHTML=`<div class="between"><h2>S’entraîner par compétence</h2><button class="tiny-btn" id="trainingBack">← Accueil</button></div><section class="card"><label for="trainingLesson">Thème</label><select id="trainingLesson">${lessons.map(l=>`<option value="${l.id}">${l.id}. ${esc(l.title)}</option>`).join('')}</select><div class="en-skill-grid">${[['grammar','Grammaire'],['listening','Écoute'],['reading','Lecture'],['speaking','Oral'],['writing','Écrit']].map(([key,label])=>`<button class="secondary-btn" data-skill="${key}">${label}</button>`).join('')}</div></section>`;
    view.querySelector('#trainingBack').onclick=()=>setRoute('home');
    view.querySelector('#trainingLesson').value=String(state.lastLessonId||1);
    view.querySelectorAll('[data-skill]').forEach(b=>b.onclick=()=>{
      const id=+view.querySelector('#trainingLesson').value,l=lessons[id-1];
      if(b.dataset.skill==='grammar')return renderLesson(id,{step:'grammar'});
      if(b.dataset.skill==='speaking'||b.dataset.skill==='writing')return renderLesson(id,{step:b.dataset.skill==='speaking'?'speak':'write'});
      if(b.dataset.skill==='form')return renderForm();
      if(b.dataset.skill==='listening'){
        const d=A1_COMPREHENSION_CONTENT[id];
        return runRound('listen-'+id,'Écoute · '+l.title,d.fields.map(f=>({type:'listening',q:f.label,answer:f.answer,o:f.options,a:0,audio:d.turns.map(t=>t.text).join(' '),speech:d.turns.map(t=>t.text).join(' '),turns:d.turns})),renderTraining);
      }
      const r=EN_A1_READING[id-1];
      runRound('read-'+id,'Lecture · '+l.title,r.fields.map(f=>({type:'choice',q:r.text+'\n\n'+f.q,answer:f.answer,o:f.o,a:0})),renderTraining);
    });
  }
  function runRound(key,title,tasks,onBack){
    cleanup();const p=(state.training[key]||={});
    for(const q of p.session?.ex||[])if(q.type==='listening'&&!q.turns){const d=Object.values(A1_COMPREHENSION_CONTENT).find(d=>d.turns.map(t=>t.text).join(' ')===q.audio);if(d)q.turns=d.turns;}
    A1ExerciseEngine.run({lesson:{id:0,title},view,exercises:tasks.map(q=>{const o=A1Learning.shuffle(q.o);return {...q,o,a:o.indexOf(q.answer)};}),progress:p,exerciseVersion:1001,selectionOnly:true,targetLang:'en',uiLang:'fr',review:true,answerAudioAfterResponse:true,
      saveProgress:()=>save(),playDialogue:turns=>A1Voice.speakDialogue(turns,{lang:'en-GB',rate:.82}),playAudio:t=>speak(t,true),playFeedbackAudio:t=>speak(t,true),onBack,
      onFinish:(score,total)=>{const pct=Math.round(score/total*100);p.best=Math.max(p.best||0,pct);if(key==='final')state.bestMock=Math.max(state.bestMock,pct);save(true);view.innerHTML=`<section class="card center"><h2>${esc(title)}</h2><div class="score">${pct} %</div><p>${score} bonnes réponses sur ${total}</p><button class="primary-btn" id="roundBack">Retour au choix</button></section>`;view.querySelector('button').onclick=onBack;}
    });
  }
  function renderForm(){
    const p=(state.training.form||={draft:{}}),fields=[['firstName','First name','Prénom','Anna'],['surname','Surname','Nom de famille','Hill'],['address','Address','Adresse','12 Green Street'],['postcode','Postcode','Code postal','B3J 2K9'],['phone','Phone number','Numéro de téléphone','555 0148']];
    view.innerHTML=`<section class="card"><button class="tiny-btn" id="formBack">← Entraînement</button><h2>Remplir un formulaire d’inscription</h2><p>Utilise des informations inventées. Associe les noms de champs anglais, puis vérifie toi-même.</p>${fields.map(([key,en,de])=>`<label class="en-form-field">${en}<input data-form-field="${key}" value="${esc(p.draft[key]||'')}" autocomplete="off" ${p.checked?'readonly':''}></label>`).join('')}<button class="primary-btn" id="formCheck">${p.checked?'Recommencer':'Comparer avec l’exemple'}</button><div id="formModel" ${p.checked?'':'hidden'}>${fields.map(([,en,de,example])=>`<p><strong>${en}</strong> = ${de}<br>${example}</p>`).join('')}<p>Vérifie que chaque champ est bien rempli et complet. Les informations personnelles n’ont pas de solution modèle fixe.</p></div></section>`;
    view.querySelector('#formBack').onclick=renderTraining;
    view.querySelectorAll('[data-form-field]').forEach(input=>input.oninput=()=>{p.draft[input.dataset.formField]=input.value;save();});
    view.querySelector('#formCheck').onclick=()=>{if(p.checked){p.checked=false;save();return renderForm();}if(fields.some(([key])=>!p.draft[key]?.trim())){view.querySelector('#formModel').hidden=false;return;}p.checked=true;save(true);renderForm();};
  }
  document.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>setRoute(b.dataset.route));
  const audioToggle=document.getElementById('audioToggle');
  function audioLabel(){audioToggle.textContent=audioEnabled?'🔊 Auto':'🔇 Auto';audioToggle.setAttribute('aria-pressed',String(audioEnabled));}
  audioToggle.onclick=()=>{audioEnabled=!audioEnabled;localStorage.setItem('anglaisB1AudioEnabled',String(audioEnabled));audioLabel();if(!audioEnabled)A1Voice.cancel();};
  A1Voice.mount({lang:'en-GB',uiLang:'fr'});audioLabel();
  window.EN_A1_OPEN_LESSON=renderLesson;
  window.A1CourseProgressPercent=percent;
  window.A1ResetCourseProgress=async()=>{const fresh=JSON.parse(JSON.stringify(defaults));await A1Profile.resetProgress('anglais-b1',fresh);state=fresh;setRoute('home');};
  window.EN_A1_APP={save,get state(){return state;},renderLesson,renderLearn,renderTraining,renderExam,setRoute};
  setRoute('home');
  if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
})();
