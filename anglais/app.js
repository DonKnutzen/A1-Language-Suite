(() => {
  'use strict';
  const lessons=EN_A1_DATA.lessons,view=document.getElementById('view');
  const baseKey='anglaisA1State_v1',stateKey=A1Profile.namespacedKey(baseKey);
  const defaults={lastLessonId:0,doneLessons:[],lessonWork:{},lessonQuizBest:{},lessonMasteryBest:{},lessonMasteryLast:{},courseMasteryBest:{},lessonCheckProgress:{},courseCheckProgress:{},grammarBest:{},reviewPractice:{},vocabularyTrainer:{version:2,items:{},settings:{},session:null},training:{},masteredListening:[],masteredReading:[],writingDone:[],speakingDone:[],bestMock:0,examScores:{}};
  let state=A1Learning.loadState(stateKey,defaults),route='home',homeCleanup=[],audioEnabled=localStorage.getItem('anglaisA1AudioEnabled')==='true';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const percent=()=>Math.round(state.doneLessons.length/lessons.length*100);
  function save(completed=false){
    EN_A1_MASTERY.completePassedLessons(state,lessons);
    localStorage.setItem(stateKey,JSON.stringify(state));
    A1Profile.saveProgress('anglais-a1',state,percent());
    if(completed)A1Streak.completeExercise();
  }
  function speak(text,force=false,rate=.82){if(text&&(force||audioEnabled))A1Voice.speak(text,{lang:'en-GB',rate});}
  function speakBtn(text){return `<button type="button" class="speak-btn" data-speak="${encodeURIComponent(text)}" aria-label="Écouter la prononciation anglaise">🔊</button>`;}
  function wireSpeakButtons(){view.querySelectorAll('[data-speak]').forEach(b=>b.onclick=()=>speak(decodeURIComponent(b.dataset.speak),true));}
  function cleanup(){homeCleanup.forEach(f=>f?.());homeCleanup=[];A1Voice.cancel();}
  function setRoute(next){
    cleanup();route=next;document.querySelectorAll('[data-route]').forEach(b=>b.classList.toggle('active',b.dataset.route===next));
    ({home:renderHome,learn:renderLearn,practice:renderVocab,exam:renderExam}[next]||renderHome)();
    window.scrollTo({top:0,behavior:'instant'});
  }
  const recording=id=>`<div class="recorder"><button class="secondary-btn" id="startRec${id}">● Enregistrer</button><button class="soft-btn" id="stopRec${id}" disabled>■ Stop</button></div><div class="record-status" id="recStatus${id}"></div><div class="playback" id="playback${id}"></div>`;
  function renderHome(){
    const next=A1LessonFlow.continuation(lessons,state),stats=EN_A1_REVIEW.statistics(state);
    view.innerHTML=`<section class="hero-card en-course-hero"><div class="between"><span class="pill">FR → EN · A1</span>${A1Streak.render('fr',{showEmpty:true})}</div><h2>L’anglais pour ton quotidien</h2><p>Pas à pas, de la première phrase à de courtes conversations, des messages et des situations de tous les jours.</p><div class="progress"><div style="width:${percent()}%"></div></div><p>${state.doneLessons.length} leçons terminées sur 24</p><button class="primary-btn home-continue-btn en-action-current" id="continueLesson"><span class="en-home-continue-copy"><span>${state.lastLessonId?'Continuer':'Commencer la leçon 1'}</span><small>${next.id}. ${esc(next.title)}</small></span><span class="home-continue-arrow" aria-hidden="true">→</span></button></section>${A1DailyReview.html(state,{lang:'fr',available:state.doneLessons.length>0||stats.open>0,mistakes:stats.open})}<section class="card en-course-summary">${A1LearningOak.render({percent:percent(),lang:'fr',course:'anglais-a1'})}<div><h3>Ton arbre</h3><p>Ton arbre grandit à chaque leçon réussie.</p></div></section><section class="card"><h3>Comment tu apprends</h3><p>Écoute et comprends les exemples. Lis les règles de grammaire correspondantes et entraîne-toi. Ensuite viennent la compréhension orale et un test de leçon. Pour l’oral et l’écrit, tu te corriges toi-même avec des réponses modèles.</p><p class="muted">Finale &amp; Arcade se débloque à partir de 80 % au test de leçon. À partir de 50 %, c’est réussi et tu reçois une note : A (dès 80 %), B (dès 70 %), C (dès 60 %), D (dès 50 %) ; à partir de 90 %, tu obtiens un A+ en or.</p><details><summary>À propos de ce cours et des sources</summary><p>Un cours A1 indépendant pour adultes, centré sur la vie quotidienne, avec des explications en français. Le vocabulaire, les structures et les types d’exercices s’inspirent des documents Cambridge Pre A1 Starters et A1 Movers ainsi que des descripteurs A1 du CECRL. Les exercices et les textes sont rédigés spécialement pour ce cours. Ce n’est pas un simulateur officiel d’examen Cambridge et il ne délivre pas de certificat.</p><p>Les contenus de niveau A2 Flyers, comme le present perfect et les formes détaillées du futur, ne font pas partie de ce cours.</p></details></section>`;
    view.querySelector('#continueLesson').onclick=()=>renderLesson(next.id);
    view.querySelector('#homeReview')?.addEventListener('click',()=>openReview('mixed'));
    view.querySelector('#homeMistakes')?.addEventListener('click',()=>openReview('mistakes'));
    homeCleanup=[A1LearningOak.mount(view.querySelector('[data-learning-oak]')),A1DailyReview.mount(view.querySelector('[data-daily-review]'),{onDayChange:renderHome})];
  }
  function openReview(initialMode){cleanup();EN_A1_REVIEW.render({view,lessons,state,save,onBack:()=>setRoute('home'),speak,grammarHtml:EN_A1_DEEPENING.grammarHtml,initialMode});}
  function renderLearn(){
    view.innerHTML=`<div class="between"><h2>Ton cours d’anglais A1</h2><span class="pill">${percent()} %</span></div><p class="muted">Choisis une leçon. Ta progression reste enregistrée.</p><div class="lesson-grid">${lessons.map(l=>{const award=EN_A1_HARD_MODE.achievement(state,l.id),done=state.doneLessons.includes(l.id);return `<button class="card lesson-card ${done?'done':''} ${EN_A1_HARD_MODE.achievementClass(award)}" data-lesson="${l.id}"><span class="lesson-number">${l.id}</span><h3>${esc(l.title)}</h3><p>${esc(l.goals[0])}</p>${A1LessonFlow.listProgress(l,state,'fr')}${award?EN_A1_HARD_MODE.achievementBadge(award):''}</button>`;}).join('')}</div>`;
    view.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>renderLesson(+b.dataset.lesson));
  }
  function renderLesson(id,position){
    cleanup();const l=lessons.find(l=>l.id===Number(id));if(!l)return renderLearn();
    if(position){const p=(state.lessonWork[l.id]||={});p.resume=position;}
    state.lastLessonId=l.id;save();
    const goalsHtml=`<div class="notice lesson-goals"><strong>Après cette leçon, tu sais</strong><ul>${l.goals.map(g=>`<li>${esc(g)}</li>`).join('')}</ul></div>`;
    A1LessonFlow.render({lesson:l,content:l,view,state,save,resume:true,lessonCount:24,targetLang:'en',uiLang:'fr',
      goalsHtml,grammarHtml:EN_A1_DEEPENING.grammarHtml(l),masteryHtml:EN_A1_MASTERY.introHtml(l,state),masteryCount:16,
      renderVocabulary:()=>renderVocab(l.id,()=>renderLesson(l.id)),vocabularyLabel:'Vocabulaire de cette leçon',
      renderMastery:({onBack,onResult})=>EN_A1_MASTERY.renderLessonTest({lesson:l,view,state,save,onBack,speak,onResult}),
      renderHardMode:({onBack})=>EN_A1_HARD_MODE.render({lesson:l,view,state,save,onBack}),
      model:l.model,writingModel:l.model,writingHints:l.topics.flatMap(t=>t.examples).slice(0,4),fullModel:true,
      dialogueHtml:`<details><summary>Aide pour la langue</summary>${l.phrases.slice(0,4).map(([t,m])=>`<div class="phrase-row"><div><strong>${esc(t)}</strong><small>${esc(m)}</small></div>${speakBtn(t)}</div>`).join('')}</details>`,
      recorderHtml:recording,speak,speakBtn,wireSpeakButtons,playFeedbackAudio:t=>speak(t,true),renderLesson,renderLearn,
      pronunciationHtml:pronunciation(l.id)
    });
  }
  function pronunciation(id){
    if(id===2){
      const alphabet=[['A','/eɪ/'],['B','/biː/'],['C','/siː/'],['D','/diː/'],['E','/iː/'],['F','/ef/'],['G','/dʒiː/'],['H','/eɪtʃ/'],['I','/aɪ/'],['J','/dʒeɪ/'],['K','/keɪ/'],['L','/el/'],['M','/em/'],['N','/en/'],['O','/əʊ/'],['P','/piː/'],['Q','/kjuː/'],['R','/ɑː/'],['S','/es/'],['T','/tiː/'],['U','/juː/'],['V','/viː/'],['W','/ˈdʌbəljuː/'],['X','/eks/'],['Y','/waɪ/'],['Z','/zed/']];
      return `<details class="en-alphabet"><summary>L’alphabet anglais</summary><p>Écoute les lettres une par une. En anglais britannique, Z se dit « zed », en anglais américain « zee ». Les signes entre barres obliques montrent la prononciation.</p><div class="en-letter-grid">${alphabet.map(([letter,ipa])=>`<div><strong>${letter}</strong><small>${ipa}</small>${speakBtn(letter)}</div>`).join('')}</div><p>Pièges pour les francophones : E se prononce comme le « i » français, I comme « aï », A comme « eï ». G et J sont inversés par rapport au français : G = « dji », J = « djeï ».</p></details>`;
    }
    if(id===3){const groups=[['one','two','three','four','five','six','seven','eight','nine'],['ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety','one hundred'],['eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'],['twenty-one','twenty-two','twenty-three','twenty-four','twenty-five','twenty-six','twenty-seven','twenty-eight','twenty-nine']];return `<details><summary>Écouter et distinguer les nombres</summary><p>D’abord les unités, puis les dizaines, puis onze à dix-neuf. À partir de 21, on relie les dizaines et les unités : twenty-one. Fais attention à thirteen/thirty et fifteen/fifty.</p>${groups.map(g=>`<div class="phrase-row"><strong>${g.join(', ')}</strong>${speakBtn(g.join(', '))}</div>`).join('')}</details>`;}
    return '';
  }
  function renderVocab(initialLesson,onBack){cleanup();A1Vocabulary.render({view,state,save,lessons,speak,course:'en',initialLesson:typeof initialLesson==='number'?initialLesson:undefined,onBack,onExercises:renderTraining});}
  function renderExam(){
    cleanup();view.innerHTML=`<h2>Bilan A1 et entraînement</h2><section class="card"><h3>Le cours en quatre étapes</h3><p>Révise six leçons à la fois. Les exercices et ta progression restent enregistrés.</p><button class="primary-btn" id="courseChecks">Ouvrir les tests de module</button></section><section class="card"><h3>S’entraîner par compétence</h3><p>Grammaire, écoute, lecture, oral et écrit, avec choix du thème.</p><button class="secondary-btn" id="skillTraining">Ouvrir l’entraînement</button></section><section class="card"><h3>Bilan A1 mixte</h3><p>32 exercices tirés des 24 leçons : grammaire, situations, écoute et lecture. Pas de limite de temps. L’oral et l’écrit libres se vérifient à part, avec les réponses modèles.</p><p class="muted">Tes exercices restent les mêmes quand tu fais une pause. Meilleur score : ${state.bestMock} %.</p><button class="primary-btn" id="finalMock">${state.training.final?.session?'Reprendre le bilan':'Commencer le bilan'}</button></section>`;
    view.querySelector('#courseChecks').onclick=()=>EN_A1_MASTERY.renderCourseMenu({view,state,save,onBack:renderExam,speak});
    view.querySelector('#skillTraining').onclick=renderTraining;
    view.querySelector('#finalMock').onclick=()=>{
      const grammar=lessons.map(l=>{const t=l.topics[(l.id-1)%2];return {...t.transfer[(l.id-1)%t.transfer.length],lessonId:l.id,tag:`L${l.id}`};});
      const reading=A1Learning.shuffle(EN_A1_READING).slice(0,4).map(r=>{const f=r.fields[0];return{type:'choice',q:r.text+'\n\n'+f.q,answer:f.answer,o:f.o,a:0};});
      const listening=A1Learning.shuffle(lessons.filter(l=>l.id>=7)).slice(0,4).map(l=>{const d=A1_COMPREHENSION_CONTENT[l.id],f=d.fields[0];return{type:'listening',q:f.label,answer:f.answer,o:f.options,a:0,audio:d.turns.map(t=>t.text).join(' '),speech:d.turns.map(t=>t.text).join(' '),turns:d.turns};});
      runRound('final','Bilan A1 mixte',A1Learning.shuffle([...grammar,...reading,...listening]),renderExam);
    };
  }
  function renderTraining(){
    cleanup();view.innerHTML=`<div class="between"><h2>S’entraîner par compétence</h2><button class="tiny-btn" id="trainingBack">← Accueil</button></div><section class="card"><label for="trainingLesson">Thème</label><select id="trainingLesson">${lessons.map(l=>`<option value="${l.id}">${l.id}. ${esc(l.title)}</option>`).join('')}</select><div class="en-skill-grid">${[['grammar','Grammaire'],['listening','Écoute'],['reading','Lecture'],['speaking','Oral'],['writing','Écrit'],['form','Remplir un formulaire']].map(([key,label])=>`<button class="secondary-btn" data-skill="${key}">${label}</button>`).join('')}</div></section>`;
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
    A1ExerciseEngine.run({lesson:{id:0,title},view,exercises:tasks.map(q=>{const o=A1Learning.shuffle(q.o);return {...q,o,a:o.indexOf(q.answer)};}),progress:p,exerciseVersion:162,selectionOnly:true,targetLang:'en',uiLang:'fr',review:true,answerAudioAfterResponse:true,
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
  audioToggle.onclick=()=>{audioEnabled=!audioEnabled;localStorage.setItem('anglaisA1AudioEnabled',String(audioEnabled));audioLabel();if(!audioEnabled)A1Voice.cancel();};
  A1Voice.mount({lang:'en-GB',uiLang:'fr'});audioLabel();
  window.EN_A1_OPEN_LESSON=renderLesson;
  window.A1CourseProgressPercent=percent;
  window.A1ResetCourseProgress=async()=>{const fresh=JSON.parse(JSON.stringify(defaults));await A1Profile.resetProgress('anglais-a1',fresh);state=fresh;setRoute('home');};
  window.EN_A1_APP={get state(){return state;},renderLesson,renderLearn,renderTraining,renderExam,setRoute};
  setRoute('home');
  if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
})();
