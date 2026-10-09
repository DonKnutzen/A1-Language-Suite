const D=window.FR_A1_DATA;
const lessons=D.lessons;
const defaultState={
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
const stateKey=A1Profile.namespacedKey('francaisA1DelfState_v1');

function loadState(){return A1Learning.loadState(stateKey,defaultState);}

let state=loadState();

function save(completed=false){if(completed)A1Streak.completeExercise();
  localStorage.setItem(stateKey,JSON.stringify(state));
  A1Profile.saveProgress('francais-a1',state,lessonPct());
}

let audioEnabled=localStorage.getItem('frA1AudioEnabled')!=='false';
let currentRoute='home';
const view=document.getElementById('view');
const audioToggle=document.getElementById('audioToggle');
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const rand=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=A1Learning.shuffle;
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
  currentRoute=route;
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.route===route));
  ({home:renderHome,learn:renderLearn,practice:renderPractice,exam:renderExam}[route]||renderHome)();
  window.scrollTo({top:0,behavior:'smooth'});
}

document.querySelectorAll('.nav-item').forEach(b=>b.onclick=()=>setRoute(b.dataset.route));

function renderHome(){
  const next=lessons.find(l=>!state.doneLessons.includes(l.id))||lessons[lessons.length-1];
  view.innerHTML=`
    <section class="card course-progress-card" data-streak-anchor>
      <h2>Kursfortschritt</h2>
      <p class="course-progress-caption">Deutsch → Französisch · DELF A1</p>
      <div class="course-progress-meter"><strong>${lessonPct()}<small>%</small></strong><div class="progress" role="progressbar" aria-label="Kursfortschritt" aria-valuenow="${lessonPct()}" aria-valuemin="0" aria-valuemax="100"><div style="width:${lessonPct()}%"></div></div></div>
      <div class="course-progress-stats"><div><strong>${state.doneLessons.length}<small> / ${lessons.length}</small></strong><span>Lektionen bearbeitet</span></div><div><strong>${FR_A1_MASTERY.passedCount(state)}<small> / ${lessons.length}</small></strong><span>Lektions-Checks</span></div></div>
      ${A1Streak.render('de')}
    </section>
    <section class="card">
      <div class="between"><div><div class="eyebrow">WEITERLERNEN</div><h3>${esc(next.title)}</h3></div><span class="pill gray">Lektion ${next.id}</span></div>
      <p class="muted">${esc(next.topic)} · ${next.skills.join(' · ')}</p>
      <button class="primary-btn" id="continueLesson">Fortsetzen</button>
    </section>
    <section class="card">
      <div class="between"><h3>Prüfungsreife</h3><span class="pill gray">${state.bestMock}% bester Schnelltest</span></div>
      ${['Hören','Lesen','Schreiben','Sprechen'].map(skillBar).join('')}
    </section>`;
  document.getElementById('continueLesson').onclick=()=>renderLesson(next.id);
}

function renderLearn(){
  view.innerHTML=`
    <section class="card hero">
      <span class="pill">${lessons.length} LEKTIONEN · TRAINING + ABSCHLUSSTEST</span>
      <h2 style="margin-top:12px">Französisch A1 Kurs</h2>
      <p class="muted">Dieser Kurs bereitet dich gezielt auf die DELF-A1-Prüfung vor. ${FR_A1_MASTERY.passedCount(state)}/${lessons.length} Lektions-Checks durchgeführt.</p>
      <div class="progress"><div style="width:${lessonPct()}%"></div></div>
    </section>
    <div class="list">
      ${lessons.map(l=>`<button class="lesson ${state.doneLessons.includes(l.id)?'done':''}" data-lesson="${l.id}">
        <div><span class="num">${l.id}</span><strong>${esc(l.title)}</strong></div>
        <div class="lesson-meta lesson-progress-meta">${A1LessonFlow.listProgress(l,state,'de')}</div>
      </button>`).join('')}
    </div>`;
  document.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>renderLesson(+b.dataset.lesson));
}

const LESSON_APPLICATIONS={
  "1": {
    "speakModel": "Bonjour, je m’appelle Léa. J’habite à Halifax. Je parle allemand et un peu français. Comment vous appelez-vous ? Vous habitez où ?",
    "writeModel": "Je m’appelle Léa.\\nJ’habite à Halifax.\\nJe parle allemand et un peu français.",
    "placeholder": "Schreibe drei einfache Sätze …",
    "writingHelpText": "Nutze genau diese drei Satzmuster und ersetze nur die persönlichen Angaben.",
    "writingHints": [
      [
        "Je m’appelle …",
        "Ich heiße …"
      ],
      [
        "J’habite à …",
        "Ich wohne in …"
      ],
      [
        "Je parle …",
        "Ich spreche …"
      ]
    ]
  },
  "2": {
    "speakModel": "Je m’appelle Léa Martin. L-E-A, M-A-R-T-I-N. Pouvez-vous parler plus lentement, s’il vous plaît ?",
    "writeModel": "Léa Martin",
    "placeholder": "Schreibe den gehörten Namen …",
    "writingHelpText": "Höre die Buchstaben in Reihenfolge und setze sie zu einem Namen zusammen.",
    "writingHints": [
      [
        "L – É – A → Léa",
        "Beispiel: Buchstaben zu einem Namen zusammensetzen"
      ]
    ]
  },
  "3": {
    "speakModel": "J’ai trente ans. Mon numéro de téléphone est le 902 555 0142.",
    "writeModel": "Nom : Léa Martin\\nÂge : 30 ans\\nTéléphone : 902 555 0142\\nE-mail : lea@example.com",
    "placeholder": "Fülle das Mini-Formular aus …",
    "writingHelpText": "Übertrage die Angaben in die passenden Felder des Mini-Formulars.",
    "writingHints": [
      [
        "Nom : …",
        "Name"
      ],
      [
        "Âge : …",
        "Alter"
      ],
      [
        "Téléphone : …",
        "Telefonnummer"
      ],
      [
        "E-mail : …",
        "E-Mail"
      ]
    ]
  },
  "4": {
    "speakModel": "Vous êtes disponible mardi à quinze heures ? Rendez-vous devant la bibliothèque.",
    "writeModel": "Rendez-vous mardi à 15 h devant la bibliothèque.",
    "placeholder": "Schreibe eine kurze Terminbestätigung …",
    "writingHelpText": "Für die Bestätigung brauchst du Tag und Uhrzeit in einem kurzen Satz.",
    "writingHints": [
      [
        "Le rendez-vous est … à …",
        "Der Termin ist … um …"
      ],
      [
        "D’accord, à …",
        "In Ordnung, bis …"
      ]
    ]
  },
  "5": {
    "speakModel": "Ma sœur s’appelle Emma. Elle a vingt-six ans et elle est sympa. Mon père s’appelle Marc. Il a cinquante-huit ans et il est calme.",
    "writeModel": "Ma sœur s’appelle Emma. Elle a 26 ans et elle est sympa.\\nMon père s’appelle Marc. Il a 58 ans et il est calme.",
    "placeholder": "Schreibe vier Sätze über eine Familie …",
    "writingHelpText": "Baue vier kurze Sätze mit Familienmitglied, Name, Alter oder Eigenschaft.",
    "writingHints": [
      [
        "Ma sœur / Mon frère s’appelle …",
        "Meine Schwester / Mein Bruder heißt …"
      ],
      [
        "Elle / Il a … ans.",
        "Sie / Er ist … Jahre alt."
      ],
      [
        "Elle / Il est …",
        "Sie / Er ist …"
      ]
    ]
  },
  "6": {
    "speakModel": "Bonjour, je voudrais un café et un croissant, s’il vous plaît. C’est combien ? Merci.",
    "writeModel": "Bonjour, je voudrais un café et un croissant, s’il vous plaît. Merci !",
    "placeholder": "Schreibe deine Bestellung …",
    "writingHelpText": "Beginne höflich, nenne deine Bestellung und schließe mit einem Dank.",
    "writingHints": [
      [
        "Bonjour, je voudrais …, s’il vous plaît.",
        "Guten Tag, ich hätte gern …, bitte."
      ],
      [
        "Merci !",
        "Danke!"
      ]
    ]
  },
  "7": {
    "speakModel": "Je voudrais un kilo de pommes et deux bouteilles d’eau, s’il vous plaît. C’est combien au total ?",
    "writeModel": "1 kg de pommes\\n2 bouteilles d’eau\\n500 g de tomates\\n1 litre de lait",
    "placeholder": "Schreibe eine Liste mit vier Mengenangaben …"
  },
  "8": {
    "speakModel": "Dans mon appartement, il y a un salon et une chambre. La lampe est sur la table.",
    "writeModel": "Dans mon appartement, il y a un salon, une chambre et une cuisine. La lampe est sur la table.",
    "placeholder": "Beschreibe eine Wohnung mit „il y a“ …"
  },
  "9": {
    "speakModel": "Excusez-moi, où est la gare ? Allez tout droit, puis tournez à gauche.",
    "writeModel": "Allez tout droit. Puis tournez à gauche. Le café est à droite.",
    "placeholder": "Schreibe zwei Wegangaben …"
  },
  "10": {
    "speakModel": "Quel est votre métier ? Où travaillez-vous ? Vous travaillez quels jours ?",
    "writeModel": "Je suis développeur. Je travaille à Halifax. Je travaille du lundi au vendredi. J’aime mon travail.",
    "placeholder": "Schreibe vier Sätze über Arbeit oder Studium …"
  },
  "11": {
    "speakModel": "Le matin, je me lève à sept heures. Maintenant, je suis en train de prendre le petit-déjeuner, puis je vais au travail.",
    "writeModel": "Je me lève à 7 h. Je prends le petit-déjeuner, puis je me douche. À 8 h, je vais au travail. Maintenant, je suis en train de travailler.",
    "placeholder": "Schreibe fünf Sätze über deinen Tagesablauf …"
  },
  "12": {
    "speakModel": "J’ai mal à la tête et j’ai de la fièvre. Pouvez-vous m’aider ? Pardon, pouvez-vous répéter ?",
    "writeModel": "Bonjour, je suis malade et je ne peux pas venir aujourd’hui. Je suis désolé. À demain.",
    "placeholder": "Schreibe eine kurze Krankmeldung …"
  },
  "13": {
    "speakModel": "En hiver, il fait froid. Demain, il va faire dix degrés. Je cherche une petite veste bleue, taille M.",
    "writeModel": "En hiver, il fait froid et il pleut souvent. Demain, il va faire dix degrés. Je porte une petite veste bleue et des chaussures fermées.",
    "placeholder": "Beschreibe Wetter und Kleidung …"
  },
  "14": {
    "speakModel": "Qu’est-ce que tu fais le week-end ? Tu aimes le sport ? Moi, j’aime jouer au football.",
    "writeModel": "Le week-end, je joue au football et je cuisine. J’aime aussi regarder des films. Le dimanche, je me repose.",
    "placeholder": "Schreibe vier Sätze über dein Wochenende …"
  },
  "15": {
    "speakModel": "Bonjour, je voudrais réserver une chambre pour deux personnes, pour deux nuits. Le petit-déjeuner est inclus ? C’est combien ?",
    "writeModel": "Bonjour, je voudrais réserver une chambre pour deux personnes du 10 au 12 juillet. Merci de confirmer la disponibilité et le prix.",
    "placeholder": "Schreibe eine Reservierungsanfrage …"
  },
  "16": {
    "speakModel": "Tu veux venir au cinéma samedi à vingt heures ? Oui, avec plaisir ! Si ce n’est pas possible, on peut reporter le rendez-vous à dimanche. Bon anniversaire !",
    "writeModel": "Salut ! Tu veux venir chez moi samedi à 19 h ? Si tu ne peux pas, on peut reporter le rendez-vous à dimanche. À bientôt !",
    "placeholder": "Schreibe eine Einladung oder Antwort …"
  },
  "17": {
    "speakModel": "Excusez-moi, que dois-je écrire ici ? Mon adresse est 10, rue du Port.",
    "writeModel": "Nom : Léa Martin\\nAdresse : 10, rue du Port\\nTéléphone : 902 555 0142\\n\\nBonjour, je voudrais des informations sur votre cours de français. Je suis disponible le soir et je voudrais connaître les horaires et le prix. Merci beaucoup pour votre réponse.",
    "placeholder": "Fülle das Formular aus und schreibe mindestens 40 Wörter …"
  },
  "18": {
    "speakModel": "Pardon, pourriez-vous répéter, s’il vous plaît ? Pourriez-vous parler plus lentement ? J’aimerais des informations sur le cours.",
    "writeModel": "Bonjour, j’aimerais des informations sur votre cours de français : les horaires, le prix et la date de début. Pourriez-vous me répondre, s’il vous plaît ? Merci d’avance.",
    "placeholder": "Schreibe eine höfliche Informationsanfrage …"
  },
  "19": {
    "speakModel": "C’est un livre. Ce sont des clés. Voici mon passeport. Voilà la gare.",
    "writeModel": "C’est un ordinateur. Ce sont des livres. Voici mon passeport. Voilà mes clés.",
    "placeholder": "Beschreibe drei Gegenstände …"
  },
  "20": {
    "speakModel": "Aujourd’hui, je travaille et je cuisine. Je ne regarde jamais la télévision. Ici, il ne faut pas fumer.",
    "writeModel": "Je travaille aujourd’hui. Je ne travaille pas demain. Je ne regarde jamais la télévision. Dans cette salle, il ne faut pas fumer.",
    "placeholder": "Schreibe drei positive und drei negative Sätze …"
  },
  "21": {
    "speakModel": "Qui est-ce ? C’est Marie. Qu’est-ce que c’est ? C’est un livre. Moi, j’habite à Halifax. Et toi ? Où habites-tu ?",
    "writeModel": "Qui est-ce ? Qu’est-ce que c’est ? Où habitez-vous ? Quel est votre métier ? Moi, j’habite à Halifax. Et vous ?",
    "placeholder": "Schreibe vier Fragen …"
  },
  "22": {
    "speakModel": "Hier, je suis allé(e) au cinéma. Je viens de rentrer. J’habite ici depuis deux ans et je pars dans deux jours.",
    "writeModel": "Hier, je suis allé(e) au cinéma. Je suis arrivé(e) ici il y a trois jours. Aujourd’hui, je viens de visiter un musée. Je pars dans deux jours. Demain, je vais voir des amis.",
    "placeholder": "Schreibe eine Nachricht mit gestern, heute und morgen …"
  },
  "23": {
    "speakModel": "Il faut deux œufs, 200 grammes de farine et un peu de lait. J’utilise un couteau pour couper les légumes. Il ne faut pas ajouter trop de sel.",
    "writeModel": "2 œufs\n200 g de farine\nun peu de lait\nJ’utilise un couteau pour couper les légumes.\nIl ne faut pas ajouter trop de sel.",
    "placeholder": "Schreibe die Zutaten und zwei Schritte …"
  },
  "24": {
    "speakModel": "Je voudrais aller en France en juillet. Je vais à Paris en train et je reste trois jours.",
    "writeModel": "Bonjour ! En juillet, je vais à Paris avec un ami. Nous partons en train et nous restons trois jours. Nous voulons visiter la ville, manger au restaurant et voir un musée. À bientôt !",
    "placeholder": "Schreibe mindestens 40 Wörter über eine Reise …"
  }
};

function renderLesson(id){
  const l=lessons.find(x=>x.id===id),c=l,app=LESSON_APPLICATIONS[id];
  const goalsHtml=`<div class="notice lesson-goals"><strong>Das kann ich nach dieser Lektion</strong><ul>${l.canDo.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`;
  const grammarHtml=lessonGrammarHtml(l);
  const masteryHtml=FR_A1_MASTERY.introHtml(l,state);
  const dialogueHtml=`<details><summary><strong>Alltagsdialog</strong></summary>${l.dialogue.map((line,i)=>`<div class="phrase-row"><div><small aria-label="Person ${i%2?'B':'A'}">${i%2?'B':'A'}</small><strong>${esc(line)}</strong></div>${speakBtn(line)}</div>`).join('')}</details>`;
  A1LessonFlow.render({
    lesson:l,content:c,view,state,save,lessonCount:lessons.length,targetLang:'fr',uiLang:'de',
    goalsHtml,grammarHtml,masteryHtml,masteryCount:FR_A1_MASTERY.testCount(id),dialogueHtml,pronunciationHtml:A1Pronunciation.render(c,'fr','de'),
    renderMastery:({onBack})=>FR_A1_MASTERY.renderLessonTest({lesson:l,view,state,save,onBack,speak}),
    renderGrammarCheck:id===1?({onBack})=>FR_A1_LESSON1.renderGrammarCheck({view,state,save,onBack,speak}):null,
    model:app.speakModel,writingModel:id===2?'Martin':app.writeModel,placeholder:app.placeholder,writingHints:app.writingHints,writingHelpText:app.writingHelpText,fullModel:true,recorderHtml:id=>recorderHtml(id,true),
    repeatHint:'Höre die Beispiele an und sprich sie laut nach.',speak,speakBtn,wireSpeakButtons,playFeedbackAudio:playCorrectAudio,renderLesson,renderLearn
  });
}

function renderPractice(){
  view.innerHTML=`
    <section class="card hero"><h2>Üben</h2><p class="muted">Die Kernübungen bestehen jetzt aus ungefähr 10 Fragen pro Runde.</p></section>
    <div class="grid">
      <button class="practice-card" id="pVocab"><span class="icon">🧠</span><strong>Vokabeln</strong><small>${lessons.reduce((s,l)=>s+l.phrases.length,0)} Kernphrasen mit Audio</small></button>
      <button class="practice-card" id="pGrammar"><span class="icon">🧩</span><strong>Grammatik & Sprachbausteine</strong><small>${D.grammarSets.length} Sets · ${D.grammarSets.reduce((s,x)=>s+x.questions.length,0)} Fragen</small></button>
      <button class="practice-card" id="pListen"><span class="icon">🎧</span><strong>Hören</strong><small>${totalListening()} Audioaufgaben · 10 pro Runde</small></button>
      <button class="practice-card" id="pRead"><span class="icon">📖</span><strong>Lesen</strong><small>${totalReading()} Aufgaben · 10 pro Runde</small></button>
      <button class="practice-card" id="pWrite"><span class="icon">✍️</span><strong>Schreiben</strong><small>${D.forms.length} Formulare à 10 Felder + ${D.writing.length} Texte</small></button>
      <button class="practice-card" id="pSpeak"><span class="icon">🎤</span><strong>Sprechen</strong><small>${D.interview.length} Fragen · ${D.infoCards.length} Karten · ${D.roleplays.length} Rollenspiele</small></button>
    </div>`;
  document.getElementById('pVocab').onclick=renderVocab;
  document.getElementById('pGrammar').onclick=renderGrammarMenu;
  document.getElementById('pListen').onclick=renderListeningMenu;
  document.getElementById('pRead').onclick=renderReadingMenu;
  document.getElementById('pWrite').onclick=renderWritingMenu;
  document.getElementById('pSpeak').onclick=renderSpeakingMenu;
  practiceProgress?.decorate();
}

function renderVocab(){
  const cards=lessons.flatMap(l=>l.phrases.map(([fr,de])=>({fr,de,lesson:l.id})));
  const key=A1Profile.namespacedKey('frA1VocabIndex');
  let idx=+localStorage.getItem(key)||0,reveal=false;
  function draw(){
    const c=cards[idx%cards.length];
    view.innerHTML=`
      <div class="between"><button class="tiny-btn" id="backPractice">← Üben</button><span class="pill">${idx%cards.length+1}/${cards.length}</span></div>
      <section class="card center" style="margin-top:12px">
        <div class="eyebrow">LEKTION ${c.lesson}</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:12px;margin:25px 0 8px"><div style="font-size:31px;font-weight:900">${esc(c.fr)}</div>${speakBtn(c.fr)}</div>
        ${reveal?`<div style="font-size:19px;margin-bottom:18px">${esc(c.de)}</div>`:'<p class="muted">Was bedeutet das auf Deutsch?</p>'}
        ${!reveal?'<button class="primary-btn" id="reveal">Antwort zeigen</button>':'<div class="button-row"><button class="secondary-btn" id="again">Noch üben</button><button class="primary-btn" id="known">Gewusst ✓</button></div>'}
      </section>`;
    wireSpeakButtons();
    document.getElementById('backPractice').onclick=renderPractice;
    if(!reveal)document.getElementById('reveal').onclick=()=>{reveal=true;draw();};
    else{
      const next=()=>{A1Streak.completeExercise();idx=(idx+1)%cards.length;reveal=false;localStorage.setItem(key,idx);draw();};
      document.getElementById('again').onclick=()=>{practiceProgress?.markVocab(c.lesson,c.fr,c.de,false);next();};
      document.getElementById('known').onclick=()=>{practiceProgress?.markVocab(c.lesson,c.fr,c.de,true);next();};
    }
    if(audioEnabled)setTimeout(()=>speak(c.fr),180);
  }
  draw();
}

const GRAMMAR_GUIDES={"g1":"<p>Hier lernst du die wichtigsten Grundformen, um dich vorzustellen und einfache persönliche Informationen zu geben.</p><ul class=\"grammar-points\"><li><strong>être</strong> = sein, <strong>avoir</strong> = haben.</li><li><strong>habiter</strong> beschreibt den Wohnort, <strong>venir</strong> die Herkunft, <strong>parler</strong> die Sprache.</li><li>Das Verb verändert sich passend zur Person. Die benötigten Formen kannst du unten aufklappen.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>Je suis allemand.</strong><small>Ich bin Deutscher.</small></div></div><div class=\"phrase-row\"><div><strong>Tu as vingt ans.</strong><small>Du bist zwanzig Jahre alt.</small></div></div><div class=\"phrase-row\"><div><strong>Nous parlons français.</strong><small>Wir sprechen Französisch.</small></div></div><details class=\"grammar-detail\"><summary>être – Konjugation anzeigen</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Person</th><th>Form</th><th>Deutsch</th></tr></thead><tbody><tr><td>je</td><td>suis</td><td>bin</td></tr><tr><td>tu</td><td>es</td><td>bist</td></tr><tr><td>il / elle / on</td><td>est</td><td>ist</td></tr><tr><td>nous</td><td>sommes</td><td>sind</td></tr><tr><td>vous</td><td>êtes</td><td>seid / sind</td></tr><tr><td>ils / elles</td><td>sont</td><td>sind</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>avoir – Konjugation anzeigen</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Person</th><th>Form</th><th>Deutsch</th></tr></thead><tbody><tr><td>j’</td><td>ai</td><td>habe</td></tr><tr><td>tu</td><td>as</td><td>hast</td></tr><tr><td>il / elle / on</td><td>a</td><td>hat</td></tr><tr><td>nous</td><td>avons</td><td>haben</td></tr><tr><td>vous</td><td>avez</td><td>habt / haben</td></tr><tr><td>ils / elles</td><td>ont</td><td>haben</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>habiter & parler – regelmäßige -er-Verben</summary><div class=\"grammar-detail-body\"><p>Bei regelmäßigen <strong>-er-Verben</strong> fällt <em>-er</em> weg. Die Endungen sind <strong>-e, -es, -e, -ons, -ez, -ent</strong>.</p><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Person</th><th>habiter</th><th>parler</th></tr></thead><tbody><tr><td>je</td><td>j’habite</td><td>je parle</td></tr><tr><td>tu</td><td>tu habites</td><td>tu parles</td></tr><tr><td>il / elle</td><td>il habite</td><td>elle parle</td></tr><tr><td>nous</td><td>nous habitons</td><td>nous parlons</td></tr><tr><td>vous</td><td>vous habitez</td><td>vous parlez</td></tr><tr><td>ils / elles</td><td>ils habitent</td><td>elles parlent</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>venir – Herkunft ausdrücken</summary><div class=\"grammar-detail-body\"><p><strong>venir de</strong> bedeutet „aus … kommen“. Vor Vokal wird <strong>de → d’</strong>.</p><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Person</th><th>venir</th></tr></thead><tbody><tr><td>je</td><td>viens</td></tr><tr><td>tu</td><td>viens</td></tr><tr><td>il / elle</td><td>vient</td></tr><tr><td>nous</td><td>venons</td></tr><tr><td>vous</td><td>venez</td></tr><tr><td>ils / elles</td><td>viennent</td></tr></tbody></table></div><p><strong>Je viens d’Allemagne.</strong> · <strong>Elle vient de Belgique.</strong></p></div></details><details class=\"grammar-detail\"><summary>s’appeler – den Namen sagen</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Person</th><th>Form</th></tr></thead><tbody><tr><td>je</td><td>m’appelle</td></tr><tr><td>tu</td><td>t’appelles</td></tr><tr><td>il / elle</td><td>s’appelle</td></tr><tr><td>nous</td><td>nous appelons</td></tr><tr><td>vous</td><td>vous appelez</td></tr><tr><td>ils / elles</td><td>s’appellent</td></tr></tbody></table></div><p><strong>Comment vous vous appelez ? — Je m’appelle Nora.</strong></p></div></details>","g2":"<p>Französische Nomen haben ein grammatisches Geschlecht und stehen meist mit einem Artikel. Im Plural ändern sich Artikel und häufig auch das Nomen.</p><ul class=\"grammar-points\"><li><strong>un / le</strong> stehen bei maskulinen, <strong>une / la</strong> bei femininen Nomen.</li><li>Vor Vokal oder stummem h wird <strong>le/la → l’</strong>.</li><li>Im Plural werden <strong>un/une → des</strong> und <strong>le/la/l’ → les</strong>.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>un café → des cafés</strong><small>ein Kaffee → Kaffees</small></div></div><div class=\"phrase-row\"><div><strong>une maison → des maisons</strong><small>ein Haus → Häuser</small></div></div><div class=\"phrase-row\"><div><strong>le livre → les livres</strong><small>das Buch → die Bücher</small></div></div><details class=\"grammar-detail\"><summary>Artikelübersicht</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th></th><th>maskulin</th><th>feminin</th><th>Plural</th></tr></thead><tbody><tr><td>unbestimmt</td><td>un</td><td>une</td><td>des</td></tr><tr><td>bestimmt</td><td>le / l’</td><td>la / l’</td><td>les</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>Pluralregeln</summary><div class=\"grammar-detail-body\"><p>Der regelmäßige Plural bekommt meist <strong>-s</strong>: <em>ami → amis, baguette → baguettes</em>. Wörter auf <strong>-s, -x, -z</strong> bleiben häufig unverändert. Einige Wörter auf <strong>-eau/-au/-eu</strong> bekommen <strong>-x</strong>.</p><p>Das Plural-<strong>s</strong> wird meistens nicht ausgesprochen.</p></div></details><details class=\"grammar-detail\"><summary>Genus richtig lernen</summary><div class=\"grammar-detail-body\"><p>Das Geschlecht ist nicht immer am Wort erkennbar. Lerne neue Nomen deshalb möglichst <strong>mit Artikel</strong>: <em>le musée, la gare, la voiture, l’hôtel</em>.</p></div></details>","g3":"<p>Fragen und Verneinungen helfen dir, Informationen zu bekommen und einfache Aussagen zu verneinen.</p><ul class=\"grammar-points\"><li>Mit <strong>est-ce que</strong> bildest du einfach eine Ja/Nein-Frage.</li><li><strong>qu’est-ce que</strong> bedeutet „was …?“; Fragewörter fragen gezielt nach Ort, Zeit, Grund oder Menge.</li><li>Die einfache Verneinung umschließt das konjugierte Verb mit <strong>ne … pas</strong>.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>Est-ce que tu habites ici ?</strong><small>Wohnst du hier?</small></div></div><div class=\"phrase-row\"><div><strong>Qu’est-ce que tu fais ?</strong><small>Was machst du?</small></div></div><div class=\"phrase-row\"><div><strong>Je n’aime pas le café.</strong><small>Ich mag keinen Kaffee.</small></div></div><details class=\"grammar-detail\"><summary>Wichtige Fragewörter</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Französisch</th><th>Deutsch</th></tr></thead><tbody><tr><td>où</td><td>wo</td></tr><tr><td>quand</td><td>wann</td></tr><tr><td>comment</td><td>wie</td></tr><tr><td>pourquoi</td><td>warum</td></tr><tr><td>combien</td><td>wie viel / wie viele</td></tr><tr><td>depuis quand</td><td>seit wann</td></tr><tr><td>quel / quelle</td><td>welcher / welche</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>est-ce que und qu’est-ce que</summary><div class=\"grammar-detail-body\"><p><strong>Est-ce que + Aussage:</strong> <em>Tu travailles. → Est-ce que tu travailles ?</em></p><p><strong>Qu’est-ce que + Subjekt + Verb:</strong> <em>Qu’est-ce que tu fais ?</em></p></div></details><details class=\"grammar-detail\"><summary>ne … pas und „de“ nach Verneinung</summary><div class=\"grammar-detail-body\"><p><strong>ne</strong> steht vor dem Verb, <strong>pas</strong> danach. Vor Vokal wird <strong>ne → n’</strong>.</p><p>Unbestimmte und Teilungsartikel werden nach einer Verneinung mit <strong>avoir</strong> meist zu <strong>de / d’</strong>: <em>J’ai des enfants. → Je n’ai pas d’enfants.</em></p></div></details><details class=\"grammar-detail\"><summary>Höflich nachfragen</summary><div class=\"grammar-detail-body\"><p><strong>Vous pouvez répéter, s’il vous plaît ?</strong> = Können Sie bitte wiederholen?</p><p><strong>Excusez-moi …</strong> kann eine höfliche Frage einleiten.</p></div></details><details class=\"grammar-detail\"><summary>Qui est-ce ? / Qu’est-ce que c’est ?</summary><div class=\"grammar-detail-body\"><p><strong>Qui est-ce ?</strong> fragt nach einer Person: <em>Qui est-ce ? — C’est Marie.</em></p><p><strong>Qu’est-ce que c’est ?</strong> fragt nach einer Sache: <em>Qu’est-ce que c’est ? — C’est un livre.</em></p></div></details><details class=\"grammar-detail\"><summary>ne … jamais</summary><div class=\"grammar-detail-body\"><p><strong>ne … jamais</strong> bedeutet „nie“: <em>Je ne regarde jamais la télévision.</em> Vor Vokal wird <em>ne</em> zu <em>n’</em>.</p></div></details>","g4":"<p>Bei Familie und Besitz brauchst du Familienwörter und Possessivbegleiter wie <strong>mon, ma, mes</strong>.</p><ul class=\"grammar-points\"><li>Der Possessivbegleiter richtet sich nach dem <strong>französischen Nomen</strong>, nicht nach dem Geschlecht des Besitzers.</li><li>Im Plural gibt es nur eine Form: z. B. <strong>mes, tes, ses</strong>.</li><li>Vor einem femininen Wort mit Vokal verwendet man <strong>mon/ton/son</strong>: <em>mon amie</em>.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>C’est mon frère.</strong><small>Das ist mein Bruder.</small></div></div><div class=\"phrase-row\"><div><strong>C’est ma sœur.</strong><small>Das ist meine Schwester.</small></div></div><div class=\"phrase-row\"><div><strong>Ce sont mes parents.</strong><small>Das sind meine Eltern.</small></div></div><details class=\"grammar-detail\"><summary>Possessivbegleiter – Übersicht</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Besitzer</th><th>maskulin</th><th>feminin</th><th>Plural</th></tr></thead><tbody><tr><td>ich</td><td>mon</td><td>ma</td><td>mes</td></tr><tr><td>du</td><td>ton</td><td>ta</td><td>tes</td></tr><tr><td>er / sie</td><td>son</td><td>sa</td><td>ses</td></tr><tr><td>wir</td><td>notre</td><td>notre</td><td>nos</td></tr><tr><td>ihr / Sie</td><td>votre</td><td>votre</td><td>vos</td></tr><tr><td>sie</td><td>leur</td><td>leur</td><td>leurs</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>C’est / Ce sont</summary><div class=\"grammar-detail-body\"><p><strong>C’est</strong> wird vor Singular verwendet: <em>C’est mon frère.</em></p><p><strong>Ce sont</strong> steht vor Plural: <em>Ce sont mes parents.</em></p></div></details><details class=\"grammar-detail\"><summary>Familienwortschatz</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Französisch</th><th>Deutsch</th></tr></thead><tbody><tr><td>père</td><td>Vater</td></tr><tr><td>mère</td><td>Mutter</td></tr><tr><td>frère</td><td>Bruder</td></tr><tr><td>sœur</td><td>Schwester</td></tr><tr><td>parents</td><td>Eltern</td></tr><tr><td>enfants</td><td>Kinder</td></tr></tbody></table></div></div></details>","g5":"<p>Beim Einkaufen kombinierst du Teilungsartikel, Mengenangaben, Preise und höfliche Wünsche.</p><ul class=\"grammar-points\"><li><strong>du / de la / de l’ / des</strong> stehen oft bei nicht genau gezählten Mengen.</li><li>Nach einer konkreten Menge steht normalerweise <strong>de / d’</strong>: <em>un kilo de pommes</em>.</li><li><strong>Je voudrais …</strong> ist eine zentrale höfliche Bestellform.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>Je voudrais du pain.</strong><small>Ich hätte gern Brot.</small></div></div><div class=\"phrase-row\"><div><strong>un kilo de pommes</strong><small>ein Kilo Äpfel</small></div></div><div class=\"phrase-row\"><div><strong>Je paie par carte.</strong><small>Ich zahle mit Karte.</small></div></div><details class=\"grammar-detail\"><summary>Teilungsartikel</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Form</th><th>Verwendung</th><th>Beispiel</th></tr></thead><tbody><tr><td>du</td><td>maskulin</td><td>du pain</td></tr><tr><td>de la</td><td>feminin</td><td>de la soupe</td></tr><tr><td>de l’</td><td>vor Vokal / stummem h</td><td>de l’eau</td></tr><tr><td>des</td><td>Plural</td><td>des pommes</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>Mengen + de</summary><div class=\"grammar-detail-body\"><p>Nach Mengen steht <strong>de / d’</strong> ohne Artikel: <em>un kilo de tomates, beaucoup de légumes, un litre d’eau</em>.</p></div></details><details class=\"grammar-detail\"><summary>Verneinung bei Mengen</summary><div class=\"grammar-detail-body\"><p>Nach <strong>ne … pas</strong> werden Teilungsartikel und unbestimmte Artikel meistens zu <strong>de / d’</strong>: <em>J’ai du sucre. → Je n’ai pas de sucre.</em></p></div></details><details class=\"grammar-detail\"><summary>Nach Preis fragen & bezahlen</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Französisch</th><th>Deutsch</th></tr></thead><tbody><tr><td>Combien ça coûte ?</td><td>Wie viel kostet das?</td></tr><tr><td>L’addition, s’il vous plaît.</td><td>Die Rechnung, bitte.</td></tr><tr><td>Je paie par carte.</td><td>Ich zahle mit Karte.</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>un peu de und weitere Mengen</summary><div class=\"grammar-detail-body\"><p>Nach Mengen steht <strong>de / d’</strong>: <em>un peu de lait, beaucoup de légumes, un litre d’eau</em>.</p></div></details><details class=\"grammar-detail\"><summary>pour + Infinitiv / il faut</summary><div class=\"grammar-detail-body\"><p><strong>pour + Infinitiv</strong> nennt einen Zweck: <em>un couteau pour couper les légumes</em>. <strong>Il faut + Infinitiv</strong> = „man muss/soll“, <strong>il ne faut pas + Infinitiv</strong> = „man darf/soll nicht“.</p></div></details>","g6":"<p>Hier unterscheidest du einfache Zeitbezüge: heute, morgen und einen ersten Einstieg in Vergangenheit und nahe Zukunft.</p><ul class=\"grammar-points\"><li><strong>aujourd’hui</strong> = heute, <strong>demain</strong> = morgen, <strong>hier</strong> = gestern.</li><li>Für nahe Pläne: <strong>aller + Infinitiv</strong>.</li><li>Für viele vergangene Handlungen: <strong>avoir + participe passé</strong>.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>Aujourd’hui, je travaille.</strong><small>Heute arbeite ich.</small></div></div><div class=\"phrase-row\"><div><strong>Demain, je vais travailler.</strong><small>Morgen werde ich arbeiten.</small></div></div><div class=\"phrase-row\"><div><strong>Hier, j’ai travaillé.</strong><small>Gestern habe ich gearbeitet.</small></div></div><details class=\"grammar-detail\"><summary>aller – für die nahe Zukunft</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Person</th><th>aller</th></tr></thead><tbody><tr><td>je</td><td>vais</td></tr><tr><td>tu</td><td>vas</td></tr><tr><td>il / elle</td><td>va</td></tr><tr><td>nous</td><td>allons</td></tr><tr><td>vous</td><td>allez</td></tr><tr><td>ils / elles</td><td>vont</td></tr></tbody></table></div><p><strong>aller + Infinitiv:</strong> <em>Nous allons visiter Paris.</em></p></div></details><details class=\"grammar-detail\"><summary>Passé composé mit avoir</summary><div class=\"grammar-detail-body\"><p>Grundmuster: <strong>avoir im Präsens + Partizip</strong>. Bei regelmäßigen <strong>-er-Verben</strong> endet das Partizip auf <strong>-é</strong>: <em>manger → mangé, travailler → travaillé, regarder → regardé</em>.</p><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Person</th><th>avoir</th></tr></thead><tbody><tr><td>j’</td><td>ai</td></tr><tr><td>tu</td><td>as</td></tr><tr><td>il / elle</td><td>a</td></tr><tr><td>nous</td><td>avons</td></tr><tr><td>vous</td><td>avez</td></tr><tr><td>ils / elles</td><td>ont</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>Zeit- und Reihenfolgewörter</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Französisch</th><th>Deutsch</th></tr></thead><tbody><tr><td>matin</td><td>Morgen</td></tr><tr><td>après-midi</td><td>Nachmittag</td></tr><tr><td>soir</td><td>Abend</td></tr><tr><td>d’abord</td><td>zuerst</td></tr><tr><td>puis</td><td>dann</td></tr><tr><td>enfin</td><td>schließlich</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>Passé composé mit être</summary><div class=\"grammar-detail-body\"><p>Einige häufige Bewegungsverben bilden das passé composé mit <strong>être</strong>: <em>je suis allé(e), elle est arrivée, nous sommes partis</em>. Das Partizip richtet sich in diesen Grundbeispielen nach dem Subjekt.</p></div></details><details class=\"grammar-detail\"><summary>Passé récent: venir de + Infinitiv</summary><div class=\"grammar-detail-body\"><p><strong>venir de + Infinitiv</strong> bedeutet „gerade etwas getan haben“: <em>Je viens de manger.</em></p></div></details><details class=\"grammar-detail\"><summary>il y a / dans / depuis</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><tbody><tr><td><strong>il y a trois jours</strong></td><td>vor drei Tagen</td></tr><tr><td><strong>dans deux jours</strong></td><td>in zwei Tagen</td></tr><tr><td><strong>depuis deux ans</strong></td><td>seit zwei Jahren</td></tr></tbody></table></div></div></details>","g7":"<p>Für Orte und Wege brauchst du Ortspräpositionen, Richtungsangaben und Verkehrsmittel.</p><ul class=\"grammar-points\"><li>Städte stehen normalerweise mit <strong>à</strong>.</li><li>Länder verwenden je nach Form <strong>en, au oder aux</strong>.</li><li>Verkehrsmittel stehen oft mit <strong>en</strong>; einige feste Formen verwenden <strong>à</strong>.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>Je vais à Paris.</strong><small>Ich fahre nach Paris.</small></div></div><div class=\"phrase-row\"><div><strong>Tournez à gauche.</strong><small>Biegen Sie links ab.</small></div></div><div class=\"phrase-row\"><div><strong>Je prends le bus.</strong><small>Ich nehme den Bus.</small></div></div><details class=\"grammar-detail\"><summary>Städte und Länder</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Ziel</th><th>Regel</th><th>Beispiel</th></tr></thead><tbody><tr><td>Stadt</td><td>à</td><td>à Paris</td></tr><tr><td>feminines Land / Vokal</td><td>en</td><td>en France, en Allemagne</td></tr><tr><td>maskulines Land</td><td>au</td><td>au Canada</td></tr><tr><td>Plural-Land</td><td>aux</td><td>aux États-Unis</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>Verkehrsmittel</summary><div class=\"grammar-detail-body\"><p>Meist <strong>en</strong>: <em>en bus, en train, en voiture, en avion</em>.<br>Häufige feste Formen mit <strong>à</strong>: <em>à pied, à vélo</em>.</p></div></details><details class=\"grammar-detail\"><summary>Wegbeschreibung & Imperativ</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Französisch</th><th>Deutsch</th></tr></thead><tbody><tr><td>Allez tout droit.</td><td>Gehen Sie geradeaus.</td></tr><tr><td>Tournez à droite / à gauche.</td><td>Biegen Sie rechts / links ab.</td></tr><tr><td>Prenez la ligne 4.</td><td>Nehmen Sie Linie 4.</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>Orte erfragen</summary><div class=\"grammar-detail-body\"><p><strong>Où est … ?</strong> fragt nach einem Ort. Beispiel: <em>Où est l’office de tourisme ?</em></p></div></details>","g8":"<p>Du lernst Vorlieben auszudrücken, Dinge einfach zu beschreiben und höflich zu reagieren.</p><ul class=\"grammar-points\"><li><strong>aimer / préférer</strong> stehen bei Vorlieben; nach <em>aimer</em> kann ein Nomen oder Infinitiv folgen.</li><li>Adjektive passen sich häufig an Geschlecht und Zahl an.</li><li><strong>s’il vous plaît, excusez-moi, merci, de rien</strong> sind zentrale Höflichkeitsformeln.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>J’aime jouer au tennis.</strong><small>Ich spiele gern Tennis.</small></div></div><div class=\"phrase-row\"><div><strong>La veste est petite.</strong><small>Die Jacke ist klein.</small></div></div><div class=\"phrase-row\"><div><strong>Je voudrais de l’eau, s’il vous plaît.</strong><small>Ich hätte gern Wasser, bitte.</small></div></div><details class=\"grammar-detail\"><summary>aimer, préférer und vouloir</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Verb</th><th>ich</th><th>du</th><th>wir</th></tr></thead><tbody><tr><td>aimer</td><td>j’aime</td><td>tu aimes</td><td>nous aimons</td></tr><tr><td>préférer</td><td>je préfère</td><td>tu préfères</td><td>nous préférons</td></tr><tr><td>vouloir</td><td>je veux</td><td>tu veux</td><td>nous voulons</td></tr></tbody></table></div><p><em>Tu veux venir ?</em> = Willst du kommen?</p></div></details><details class=\"grammar-detail\"><summary>Adjektive – Grundidee</summary><div class=\"grammar-detail-body\"><p>Viele Adjektive erhalten im Femininum <strong>-e</strong>: <em>petit → petite</em>. Im Plural kommt häufig <strong>-s</strong> hinzu: <em>petites</em>.</p></div></details><details class=\"grammar-detail\"><summary>Artikel & Vorlieben</summary><div class=\"grammar-detail-body\"><p>Nach <strong>aimer / préférer</strong> steht bei allgemeinen Vorlieben häufig der bestimmte Artikel: <em>J’aime le café. Je préfère le thé.</em></p></div></details><details class=\"grammar-detail\"><summary>Höfliche Standardreaktionen</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Französisch</th><th>Deutsch</th></tr></thead><tbody><tr><td>Excusez-moi.</td><td>Entschuldigen Sie.</td></tr><tr><td>S’il vous plaît.</td><td>Bitte.</td></tr><tr><td>Merci.</td><td>Danke.</td></tr><tr><td>De rien.</td><td>Gern geschehen.</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>Mini-Wiederholung: Artikel &amp; Besitz</summary><div class=\"grammar-detail-body\"><p><strong>un / une</strong> = ein/eine. Für „meine“ gilt: <strong>mon</strong> vor maskulin, <strong>ma</strong> vor feminin, <strong>mes</strong> vor Plural: <em>Ce sont mes chaussures.</em></p></div></details><details class=\"grammar-detail\"><summary>Höflicher Conditionnel</summary><div class=\"grammar-detail-body\"><p>Einige sehr häufige höfliche Formen werden auf A1 als feste Wendungen gelernt: <em>je voudrais</em>, <em>j’aimerais</em>, <em>pourriez-vous… ?</em> und <em>on pourrait… ?</em>.</p></div></details>","g9":"<p>Aussage, Negation und Frage sind drei Grundmuster, die du im Alltag ständig brauchst.</p><ul class=\"grammar-points\"><li>Im Aussagesatz steht das konjugierte Verb normalerweise nach dem Subjekt.</li><li><strong>ne … pas</strong> verneint eine Aussage.</li><li>Fragen können mit <strong>est-ce que</strong> oder einem Fragewort gebildet werden.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>Tu travailles ici.</strong><small>Du arbeitest hier.</small></div></div><div class=\"phrase-row\"><div><strong>Tu ne travailles pas ici.</strong><small>Du arbeitest nicht hier.</small></div></div><div class=\"phrase-row\"><div><strong>Où est-ce que tu travailles ?</strong><small>Wo arbeitest du?</small></div></div><details class=\"grammar-detail\"><summary>Grundmuster der Satzstellung</summary><div class=\"grammar-detail-body\"><p><strong>Aussage:</strong> Subjekt + Verb + Ergänzung.<br><em>Vous habitez à Lyon.</em></p><p><strong>Ja/Nein-Frage:</strong> <em>Est-ce que vous habitez à Lyon ?</em></p></div></details><details class=\"grammar-detail\"><summary>Fragewörter für dieses Set</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Wort</th><th>Bedeutung</th></tr></thead><tbody><tr><td>où</td><td>wo</td></tr><tr><td>quand</td><td>wann</td></tr><tr><td>combien</td><td>wie viel</td></tr><tr><td>quel / quelle</td><td>welcher / welche</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>Negation</summary><div class=\"grammar-detail-body\"><p><strong>ne / n’ + Verb + pas</strong>: <em>Je parle espagnol. → Je ne parle pas espagnol.</em></p></div></details><details class=\"grammar-detail\"><summary>ne … jamais</summary><div class=\"grammar-detail-body\"><p><strong>ne … jamais</strong> umschließt wie <em>ne … pas</em> das konjugierte Verb: <em>Je ne travaille jamais le dimanche.</em></p></div></details><details class=\"grammar-detail\"><summary>Betonte Personalpronomen</summary><div class=\"grammar-detail-body\"><p><strong>moi, toi, lui, elle, nous, vous, eux, elles</strong> stehen zur Hervorhebung oder nach einer Ergänzung: <em>Moi, j’habite ici. Et toi ?</em></p></div></details>","g10":"<p>Hier festigst du Ortsangaben, Länder, Herkunft und einfache Lagewörter.</p><ul class=\"grammar-points\"><li>Ziel: <strong>à</strong> bei Städten, <strong>en/au/aux</strong> bei Ländern.</li><li>Herkunft verwendet <strong>de / d’ / du / des</strong>.</li><li>Für Positionen brauchst du Wörter wie <strong>sur</strong> = auf.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>J’habite à Montréal.</strong><small>Ich wohne in Montréal.</small></div></div><div class=\"phrase-row\"><div><strong>Je vais au Canada.</strong><small>Ich fahre nach Kanada.</small></div></div><div class=\"phrase-row\"><div><strong>Je viens d’Allemagne.</strong><small>Ich komme aus Deutschland.</small></div></div><details class=\"grammar-detail\"><summary>Ziel: à / en / au / aux</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Ort</th><th>Form</th><th>Beispiel</th></tr></thead><tbody><tr><td>Stadt</td><td>à</td><td>à Montréal</td></tr><tr><td>feminines Land / Vokal</td><td>en</td><td>en France</td></tr><tr><td>maskulines Land</td><td>au</td><td>au Canada</td></tr><tr><td>Plural</td><td>aux</td><td>aux États-Unis</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>Herkunft: de / d’ / du / des</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Form</th><th>Beispiel</th></tr></thead><tbody><tr><td>de</td><td>Je viens de France.</td></tr><tr><td>d’</td><td>Je viens d’Allemagne.</td></tr><tr><td>du</td><td>Je viens du Canada.</td></tr><tr><td>des</td><td>Je viens des États-Unis.</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>Einfache Lagewörter</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Französisch</th><th>Deutsch</th></tr></thead><tbody><tr><td>sur</td><td>auf</td></tr><tr><td>sous</td><td>unter</td></tr><tr><td>devant</td><td>vor</td></tr><tr><td>derrière</td><td>hinter</td></tr><tr><td>dans</td><td>in</td></tr></tbody></table></div><p><strong>La tasse est sur la table.</strong></p></div></details><details class=\"grammar-detail\"><summary>à + Artikel bei konkreten Orten</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Form</th><th>Beispiel</th></tr></thead><tbody><tr><td>à la</td><td>à la gare</td></tr><tr><td>à + le → au</td><td>au musée</td></tr><tr><td>à + les → aux</td><td>aux toilettes</td></tr></tbody></table></div></div></details>","g11":"<p>Für Pläne, Bitten und Alltagssituationen helfen dir einige sehr häufige Verben und Reflexivformen.</p><ul class=\"grammar-points\"><li><strong>aller + Infinitiv</strong> drückt einen nahen Plan aus.</li><li><strong>pouvoir</strong> = können, <strong>devoir</strong> = müssen/sollen.</li><li>Reflexivverben verwenden <strong>me/te/se/nous/vous/se</strong>.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>Je vais appeler Marie.</strong><small>Ich werde Marie anrufen.</small></div></div><div class=\"phrase-row\"><div><strong>Vous pouvez répéter ?</strong><small>Können Sie wiederholen?</small></div></div><div class=\"phrase-row\"><div><strong>Je dois partir maintenant.</strong><small>Ich muss jetzt gehen.</small></div></div><details class=\"grammar-detail\"><summary>aller – nahe Zukunft</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>je</th><th>tu</th><th>il/elle</th><th>nous</th><th>vous</th><th>ils/elles</th></tr></thead><tbody><tr><td>vais</td><td>vas</td><td>va</td><td>allons</td><td>allez</td><td>vont</td></tr></tbody></table></div><p><em>Nous allons visiter Paris.</em></p></div></details><details class=\"grammar-detail\"><summary>pouvoir – können</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>je</th><th>tu</th><th>il/elle</th><th>nous</th><th>vous</th><th>ils/elles</th></tr></thead><tbody><tr><td>peux</td><td>peux</td><td>peut</td><td>pouvons</td><td>pouvez</td><td>peuvent</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>devoir – müssen / sollen</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>je</th><th>tu</th><th>il/elle</th><th>nous</th><th>vous</th><th>ils/elles</th></tr></thead><tbody><tr><td>dois</td><td>dois</td><td>doit</td><td>devons</td><td>devez</td><td>doivent</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>Reflexivverb se lever</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Person</th><th>Form</th></tr></thead><tbody><tr><td>je</td><td>me lève</td></tr><tr><td>tu</td><td>te lèves</td></tr><tr><td>il / elle</td><td>se lève</td></tr><tr><td>nous</td><td>nous levons</td></tr><tr><td>vous</td><td>vous levez</td></tr><tr><td>ils / elles</td><td>se lèvent</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>prendre – nehmen</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>je</th><th>tu</th><th>il/elle</th><th>nous</th><th>vous</th><th>ils/elles</th></tr></thead><tbody><tr><td>prends</td><td>prends</td><td>prend</td><td>prenons</td><td>prenez</td><td>prennent</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>être en train de + Infinitiv</summary><div class=\"grammar-detail-body\"><p>Damit sagst du, was <strong>gerade jetzt</strong> passiert: <em>Je suis en train de travailler.</em> Das Verb <em>être</em> wird konjugiert; der Infinitiv bleibt unverändert.</p></div></details><details class=\"grammar-detail\"><summary>il faut / il ne faut pas</summary><div class=\"grammar-detail-body\"><p><strong>Il faut réserver.</strong> = Man muss/soll reservieren. <strong>Il ne faut pas fumer ici.</strong> = Hier darf/soll man nicht rauchen.</p></div></details>","g12":"<p>Zum Beschreiben kombinierst du Artikel, Besitzwörter, Demonstrativbegleiter, Mengen und einfache Adjektive.</p><ul class=\"grammar-points\"><li><strong>ce / cet / cette / ces</strong> bedeutet je nach Nomen „dieser/diese/dieses/diese“.</li><li>Possessivbegleiter richten sich nach dem französischen Nomen.</li><li>Viele Adjektive erhalten in der femininen Form ein zusätzliches <strong>-e</strong>.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>C’est mon amie.</strong><small>Das ist meine Freundin.</small></div></div><div class=\"phrase-row\"><div><strong>Une robe bleue.</strong><small>Ein blaues Kleid.</small></div></div><div class=\"phrase-row\"><div><strong>Je voudrais ces chaussures.</strong><small>Ich hätte gern diese Schuhe.</small></div></div><details class=\"grammar-detail\"><summary>ce / cet / cette / ces</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Form</th><th>Verwendung</th><th>Beispiel</th></tr></thead><tbody><tr><td>ce</td><td>maskulin vor Konsonant</td><td>ce livre</td></tr><tr><td>cet</td><td>maskulin vor Vokal / stummem h</td><td>cet hôtel</td></tr><tr><td>cette</td><td>feminin</td><td>cette robe</td></tr><tr><td>ces</td><td>Plural</td><td>ces chaussures</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>Possessiv: Sonderfall vor Vokal</summary><div class=\"grammar-detail-body\"><p>Vor einem femininen Nomen, das mit Vokal oder stummem h beginnt, verwendet man <strong>mon/ton/son</strong>: <em>mon amie</em>, nicht <em>ma amie</em>.</p></div></details><details class=\"grammar-detail\"><summary>Adjektiv-Kongruenz</summary><div class=\"grammar-detail-body\"><p>Viele Adjektive: maskulin <em>bleu</em> → feminin <strong>bleue</strong>; Plural häufig zusätzlich <strong>-s</strong>.</p></div></details><details class=\"grammar-detail\"><summary>Mengen und Verneinung</summary><div class=\"grammar-detail-body\"><p>Nach Mengen steht <strong>de</strong>: <em>un litre de lait</em>. Nach einer Verneinung wird ein unbestimmter/Teilungsartikel meist zu <strong>de</strong>: <em>Je n’ai pas de pain.</em></p></div></details><details class=\"grammar-detail\"><summary>C’est / Ce sont</summary><div class=\"grammar-detail-body\"><p><strong>C’est</strong> + Singular; <strong>Ce sont</strong> + Plural: <em>Ce sont mes parents.</em></p></div></details><details class=\"grammar-detail\"><summary>Adjektivstellung</summary><div class=\"grammar-detail-body\"><p>Viele beschreibende Adjektive stehen <strong>nach</strong> dem Nomen, besonders Farben: <em>une veste bleue</em>. Einige sehr häufige kurze Adjektive stehen oft <strong>davor</strong>: <em>une petite veste</em>. Kombination: <em>une petite veste bleue</em>.</p></div></details><details class=\"grammar-detail\"><summary>Voici / voilà</summary><div class=\"grammar-detail-body\"><p><strong>Voici</strong> = „hier ist/sind“, <strong>voilà</strong> = „da ist/sind“: <em>Voici mon passeport. Voilà la gare.</em></p></div></details>"};

const LESSON_GRAMMAR_REFS={
  1:{title:'Personalpronomen & Verbformen',refs:[['g1',[0,2,3,4]]]},
  2:{title:'Buchstabieren & höflich nachfragen',refs:[['g11',[1]],['g3',[3]]]},
  3:{title:'Alter & Zahlen verstehen',refs:[['g1',[1]]]},
  4:{title:'Uhrzeit & Termine',refs:[]},
  5:{title:'Familie & Personen beschreiben',refs:[['g4',[0,1]]]},
  6:{title:'Höflich bestellen & Teilungsartikel',refs:[['g5',[0]]]},
  7:{title:'Mengen & Preise',refs:[['g5',[1,3]]]},
  8:{title:'Wohnen: il y a & Ortsangaben',refs:[['g10',[2,3]]]},
  9:{title:'Nach dem Weg fragen & Weg erklären',refs:[['g7',[2,3]]]},
  10:{title:'Beruf & regelmäßige -er-Verben',refs:[]},
  11:{title:'Tagesablauf: reflexive Verben & gerade laufende Handlungen',refs:[['g11',[3,5]],['g6',[2]]]},
  12:{title:'Beschwerden nennen & um Hilfe bitten',refs:[['g3',[3]]]},
  13:{title:'Wetter, Kleidung & Adjektive',refs:[['g12',[0,2,5]]]},
  14:{title:'Freizeit & Vorlieben ausdrücken',refs:[]},
  15:{title:'Reisepläne mit aller + Infinitiv',refs:[['g11',[0]]]},
  16:{title:'Einladen, zusagen & absagen',refs:[['g11',[1]]]},
  17:{title:'Formulare & kurze Nachrichten',refs:[]},
  18:{title:'Verständnisprobleme & höfliche Bitten',refs:[['g3',[2,3]],['g8',[5]]]},
  19:{title:'Artikel, Geschlecht, Plural & Zeigewörter',refs:[['g2',[0,1,2]],['g12',[6]]]},
  20:{title:'Präsens, Verneinung & einfache Regeln',refs:[['g9',[0,2,3]],['g11',[6]]]},
  21:{title:'Fragen, Identifizieren & betonte Pronomen',refs:[['g3',[0,1,4]],['g4',[0]],['g9',[4]]]},
  22:{title:'Vergangenheit, passé récent & Zeitangaben',refs:[['g6',[1,2,3,4,5]]]},
  23:{title:'Mengen, Zweck & einfache Anweisungen',refs:[['g5',[0,1,2,4,5]]]},
  24:{title:'Länder, Herkunft & Reisepläne',refs:[['g10',[0,1]],['g11',[2]]]}
};
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
  const ref=LESSON_GRAMMAR_REFS[l.id]||{};
  const refs=A1GrammarUI.pickDetails(GRAMMAR_GUIDES,ref.refs||[]);
  const topicInfo=A1LessonTopicInfo.render('francais',l.id);
  const primer=l.id===1&&window.FR_A1_LESSON1?FR_A1_LESSON1.pronounPrimerHtml():'';
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
    <section class="card" style="margin-top:12px"><h2>A1 Grammatik & Sprachbausteine</h2><p class="muted">Je Set 10 Fragen. Die Themen decken typische A1-Strukturen aus Einstufungs- und Prüfungsaufgaben ab.</p></section>
    <div class="list">${D.grammarSets.map(s=>`<button class="practice-card" data-gset="${esc(s.id)}"><strong>${esc(s.title)}</strong><small>${esc(s.subtitle)} · Bestwert ${state.grammarBest[s.id]||0}%</small></button>`).join('')}</div>`;
  document.getElementById('backP').onclick=renderPractice;
  document.querySelectorAll('[data-gset]').forEach(b=>b.onclick=()=>renderGrammarIntro(b.dataset.gset));
  practiceProgress?.decorate();
}

function startGrammarSet(id){
  const set=D.grammarSets.find(x=>x.id===id);
  const qs=shuffle(set.questions).slice(0,10);
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
      practiceProgress?.recordGrammar(set,q);
      if(ok)score++;playCorrectAudio(q.audio,true);
      document.querySelectorAll('[data-o]').forEach((b,j)=>{
        b.disabled=true;
        if(j===q.a)b.classList.add('correct');
        else if(j===chosen)b.classList.add('wrong');
      });
      document.getElementById('grammarFeedback').innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?'✓ Richtig':'✗ Richtig ist: '+esc(q.o[q.a])}${q.explanation?'<p>'+esc(q.explanation)+'</p>':''}</div><div class="spacer"></div><button class="primary-btn" id="nextGrammar">${i<qs.length-1?'Weiter':'Ergebnis'}</button>`;
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
  const arr=D.listening['part'+part],task=forced||rand(arr);
  let plays=0,answered=false;
  const maxPlays=examMode?2:99;
  const options=part===2?['Richtig','Falsch']:task.o;
  view.innerHTML=`
    <div class="between"><button class="tiny-btn" id="backListen">← ${examMode?'Prüfung':'Hören'}</button><span class="pill">${progressLabel||'Teil '+part}</span></div>
    <section class="card" style="margin-top:12px">
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
      <div class="feedback ${ok?'good':'bad'}">${ok?'✓ Richtig':'✗ Falsch'}</div>
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
  const task=forced||rand(D.reading['part'+part]);
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
  localStorage.setItem('frA1AudioEnabled',String(audioEnabled));
  updateAudioButton();
  if(audioEnabled)speak('Bonjour ! La lecture automatique est activée.',true);
  else A1Voice.cancel();
};
window.A1ResetCourseProgress=async()=>{
  const fresh=JSON.parse(JSON.stringify(defaultState));
  await A1Profile.resetProgress('francais-a1',fresh);
  A1Voice.cancel();state=fresh;setRoute('home');
};
updateAudioButton();
setRoute('home');
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));

