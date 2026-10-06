const D=window.FR_A1_DATA;
const lessons=D.lessons;
const defaultState={
  doneLessons:[],
  lessonQuizBest:{},
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
function overallCompletionPct(){
  const lessonDone=(state.doneLessons||[]).length;
  const grammarDone=Object.values(state.grammarBest||{}).filter(v=>Number(v)>0).length;
  const done=lessonDone+grammarDone+state.masteredListening.length+state.masteredReading.length+state.writingDone.length+new Set(state.speakingDone).size;
  const total=lessons.length+D.grammarSets.length+totalListening()+totalReading()+D.forms.length+D.writing.length+D.interview.length+D.infoCards.length+D.roleplays.length;
  return Math.round(clamp(done/Math.max(total,1)*100,0,100));
}

function speak(text,force=false,rate=.82){
  if((!audioEnabled&&!force)||!('speechSynthesis' in window)||!text)return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang='fr-FR';
  u.rate=rate;
  const voices=speechSynthesis.getVoices();
  const v=voices.find(x=>x.lang?.toLowerCase().startsWith('fr-fr'))||voices.find(x=>x.lang?.toLowerCase().startsWith('fr'));
  if(v)u.voice=v;
  speechSynthesis.speak(u);
}
function playCorrectAudio(text){
  if(!audioEnabled||!text)return;
  setTimeout(()=>speak(text,true,.80),120);
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
    <section class="card hero" data-streak-anchor>
      <div class="eyebrow">KURSFORTSCHRITT</div>
      <h2 style="margin-top:12px">Französisch A1 🇫🇷</h2>
      <p class="muted">${state.doneLessons.length}/${lessons.length} Lektionen abgeschlossen</p>
      <div class="progress"><div style="width:${lessonPct()}%"></div></div>
      <div class="between" style="margin-top:10px"><small>DEUTSCH → FRANZÖSISCH · DELF A1</small><strong>${lessonPct()}%</strong></div>
    ${A1Streak.render('de')}</section>
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
      <span class="pill">${lessons.length} LEKTIONEN · JE 10 FRAGEN</span>
      <h2 style="margin-top:12px">Französisch A1 Kurs</h2>
      <p class="muted">Alltagssprache, Grammatik, Aussprache und prüfungsrelevanter Wortschatz.</p>
      <div class="progress"><div style="width:${lessonPct()}%"></div></div>
    </section>
    <div class="list">
      ${lessons.map(l=>`<button class="lesson ${state.doneLessons.includes(l.id)?'done':''}" data-lesson="${l.id}">
        <div><span class="num">${l.id}</span><strong>${esc(l.title)}</strong></div>
        <div class="lesson-meta">${l.skills.map(s=>`<span class="pill gray">${s}</span>`).join('')}${state.doneLessons.includes(l.id)?'<span class="pill green">✓ fertig</span>':''}</div>
      </button>`).join('')}
    </div>`;
  document.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>renderLesson(+b.dataset.lesson));
}

const LESSON_APPLICATIONS={1:{speakModel:"Bonjour, je m’appelle Léa. J’habite à Halifax. Je parle allemand et un peu français. Comment vous appelez-vous ? Vous habitez où ?",writeModel:"Je m’appelle Léa.\\nJ’habite à Halifax.\\nJe parle allemand et un peu français.",placeholder:"Écris trois phrases simples…"},2:{speakModel:"Je m’appelle Léa Martin. L-E-A, M-A-R-T-I-N. Pouvez-vous parler plus lentement, s’il vous plaît ?",writeModel:"Léa Martin",placeholder:"Écris le nom que tu entends…"},3:{speakModel:"J’ai trente ans. Mon numéro de téléphone est le 902 555 0142.",writeModel:"Nom : Léa Martin\\nÂge : 30 ans\\nTéléphone : 902 555 0142\\nE-mail : lea@example.com",placeholder:"Complète le mini-formulaire…"},4:{speakModel:"Vous êtes disponible mardi à quinze heures ? Rendez-vous devant la bibliothèque.",writeModel:"Rendez-vous mardi à 15 h devant la bibliothèque.",placeholder:"Écris une confirmation de rendez-vous…"},5:{speakModel:"Ma sœur s’appelle Emma. Elle a vingt-six ans et elle est sympa. Mon père s’appelle Marc. Il a cinquante-huit ans et il est calme.",writeModel:"Ma sœur s’appelle Emma. Elle a 26 ans et elle est sympa.\\nMon père s’appelle Marc. Il a 58 ans et il est calme.",placeholder:"Écris quatre phrases sur une famille…"},6:{speakModel:"Bonjour, je voudrais un café et un croissant, s’il vous plaît. C’est combien ? Merci.",writeModel:"Bonjour, je voudrais un café et un croissant, s’il vous plaît. Merci !",placeholder:"Écris ta commande…"},7:{speakModel:"Je voudrais un kilo de pommes et deux bouteilles d’eau, s’il vous plaît. C’est combien au total ?",writeModel:"1 kg de pommes\\n2 bouteilles d’eau\\n500 g de tomates\\n1 litre de lait",placeholder:"Écris une liste avec quatre quantités…"},8:{speakModel:"Dans mon appartement, il y a un salon et une chambre. La lampe est sur la table.",writeModel:"Dans mon appartement, il y a un salon, une chambre et une cuisine. La lampe est sur la table.",placeholder:"Décris un logement avec il y a…"},9:{speakModel:"Excusez-moi, où est la gare ? Allez tout droit, puis tournez à gauche.",writeModel:"Allez tout droit. Puis tournez à gauche. Le café est à droite.",placeholder:"Écris deux indications…"},10:{speakModel:"Quel est votre métier ? Où travaillez-vous ? Vous travaillez quels jours ?",writeModel:"Je suis développeur. Je travaille à Halifax. Je travaille du lundi au vendredi. J’aime mon travail.",placeholder:"Écris quatre phrases sur le travail ou les études…"},11:{speakModel:"Le matin, je me lève à sept heures. Je prends le petit-déjeuner à sept heures et demie, puis je vais au travail à huit heures.",writeModel:"Je me lève à 7 h. Je prends le petit-déjeuner, puis je me douche. Je vais au travail à 8 h et je commence à 9 h.",placeholder:"Écris cinq phrases sur ta journée…"},12:{speakModel:"J’ai mal à la tête et j’ai de la fièvre. Pouvez-vous m’aider ? Pardon, pouvez-vous répéter ?",writeModel:"Bonjour, je suis malade et je ne peux pas venir aujourd’hui. Je suis désolé. À demain.",placeholder:"Écris un message pour dire que tu es malade…"},13:{speakModel:"Bonjour, je cherche cette chemise en bleu, taille M, s’il vous plaît.",writeModel:"Aujourd’hui, il fait froid et il pleut. Je porte un manteau et des chaussures fermées.",placeholder:"Décris la météo et les vêtements…"},14:{speakModel:"Qu’est-ce que tu fais le week-end ? Tu aimes le sport ? Moi, j’aime jouer au football.",writeModel:"Le week-end, je joue au football et je cuisine. J’aime aussi regarder des films. Le dimanche, je me repose.",placeholder:"Écris quatre phrases sur ton week-end…"},15:{speakModel:"Bonjour, je voudrais réserver une chambre pour deux personnes, pour deux nuits. Le petit-déjeuner est inclus ? C’est combien ?",writeModel:"Bonjour, je voudrais réserver une chambre pour deux personnes du 10 au 12 juillet. Merci de confirmer la disponibilité et le prix.",placeholder:"Écris une demande de réservation…"},16:{speakModel:"Tu veux venir au cinéma samedi à vingt heures ? Oui, avec plaisir ! / Désolé, je ne peux pas, je travaille.",writeModel:"Salut ! Tu veux venir chez moi samedi à 19 h ? À bientôt !",placeholder:"Écris une invitation ou une réponse…"},17:{speakModel:"Excusez-moi, que dois-je écrire ici ? Mon adresse est 10, rue du Port.",writeModel:"Nom : Léa Martin\\nAdresse : 10, rue du Port\\nTéléphone : 902 555 0142\\n\\nBonjour, je voudrais des informations sur votre cours de français. Je suis disponible le soir et je voudrais connaître les horaires et le prix. Merci beaucoup pour votre réponse.",placeholder:"Complète le formulaire puis écris au moins 40 mots…"},18:{speakModel:"Pardon, pouvez-vous répéter, s’il vous plaît ? Pouvez-vous parler plus lentement, s’il vous plaît ?",writeModel:"Bonjour, je voudrais des informations sur votre cours de français : les horaires, le prix et la date de début. Merci d’avance.",placeholder:"Écris une demande polie d’informations…"},19:{speakModel:"C’est un livre. C’est une tasse. Ce sont des clés. Ce sont des stylos. C’est une table.",writeModel:"C’est un ordinateur. C’est une tasse. Ce sont des livres.",placeholder:"Décris trois objets avec c’est / ce sont…"},20:{speakModel:"Aujourd’hui, je travaille et je cuisine. Je ne fais pas de sport et je ne regarde pas la télévision.",writeModel:"Je travaille aujourd’hui. Je cuisine ce soir. Je parle français.\\nJe ne travaille pas demain. Je ne joue pas au tennis. Je ne regarde pas la télévision.",placeholder:"Écris trois phrases positives et trois négatives…"},21:{speakModel:"Comment tu t’appelles ? Où habites-tu ? Quel est ton métier ? Quand commence le cours ? Pourquoi apprends-tu le français ?",writeModel:"Comment vous appelez-vous ? Où habitez-vous ? Quel est votre métier ? Quelles langues parlez-vous ?",placeholder:"Écris quatre questions…"},22:{speakModel:"Hier, j’ai travaillé. Aujourd’hui, je suis à la maison. Demain, je vais voir des amis.",writeModel:"Hier, j’ai travaillé. Aujourd’hui, je suis à la maison. Demain, je vais voir des amis.",placeholder:"Écris un message avec hier, aujourd’hui et demain…"},23:{speakModel:"Il faut deux œufs et 200 grammes de farine. Combien de lait faut-il ?",writeModel:"2 œufs\\n200 g de farine\\n250 ml de lait\\nMélangez les ingrédients. Puis faites cuire la préparation.",placeholder:"Écris les ingrédients et deux étapes…"},24:{speakModel:"Je voudrais aller en France en juillet. Je vais à Paris en train et je reste trois jours.",writeModel:"Bonjour ! En juillet, je vais à Paris avec un ami. Nous partons en train et nous restons trois jours. Nous voulons visiter la ville, manger au restaurant et voir un musée. À bientôt !",placeholder:"Écris au moins 40 mots sur un voyage…"}};

function renderLesson(id){
  const l=lessons.find(x=>x.id===id);
  let qi=0,score=0;
  const app=LESSON_APPLICATIONS[id];
  const recId=`LessonApply${id}`;

  function applicationHtml(){
    return `<details class="lesson-application"><summary><strong>Jetzt selbst anwenden</strong></summary>
      <div class="application-block">
        <h3>🎤 Sprechen</h3>
        <div class="practice-task">
          <strong>${esc(l.transfer.speaking)}</strong>
          <p class="muted">Sprich die Aufgabe frei ins Mikrofon. Danach kannst du deine Aufnahme und eine mögliche Musterantwort anhören.</p>
          ${recorderHtml(recId)}
          <div class="button-row"><button class="soft-btn lesson-skip-speaking" id="skipSpeaking">Sprechaufgabe überspringen</button></div>
          <div id="skipFeedback"></div>
          <div class="lesson-model" id="speakingModel" hidden>
            <div class="solution"><strong>Mögliche Antwort:</strong><br>${esc(app.speakModel)}</div>
            <div class="button-row"><button class="soft-btn" data-speak="${encodeURIComponent(app.speakModel)}">🔊 Beispiel anhören</button></div>
            <p><strong>Wie war deine Antwort?</strong></p>
            <div class="button-row"><button class="secondary-btn self-check" data-good="0">↻ Noch einmal üben</button><button class="primary-btn self-check" data-good="1">✓ Das war gut</button></div>
          </div>
        </div>
        <h3>✍️ Schreiben</h3>
        <div class="practice-task">
          <strong>${esc(l.transfer.writing)}</strong>
          <textarea class="text-area lesson-writing" id="lessonWriting" placeholder="${esc(app.placeholder)}"></textarea>
          <div class="special-char-wrap"><span class="special-char-label">Sonderzeichen</span><div class="special-char-bar"><button type="button" class="special-char-shift" aria-label="Groß-/Kleinschreibung umschalten" aria-pressed="false">⇧</button><button type="button" class="special-char-btn" data-lower="à" data-upper="À" data-char="à">à</button><button type="button" class="special-char-btn" data-lower="â" data-upper="Â" data-char="â">â</button><button type="button" class="special-char-btn" data-lower="æ" data-upper="Æ" data-char="æ">æ</button><button type="button" class="special-char-btn" data-lower="ç" data-upper="Ç" data-char="ç">ç</button><button type="button" class="special-char-btn" data-lower="é" data-upper="É" data-char="é">é</button><button type="button" class="special-char-btn" data-lower="è" data-upper="È" data-char="è">è</button><button type="button" class="special-char-btn" data-lower="ê" data-upper="Ê" data-char="ê">ê</button><button type="button" class="special-char-btn" data-lower="ë" data-upper="Ë" data-char="ë">ë</button><button type="button" class="special-char-btn" data-lower="î" data-upper="Î" data-char="î">î</button><button type="button" class="special-char-btn" data-lower="ï" data-upper="Ï" data-char="ï">ï</button><button type="button" class="special-char-btn" data-lower="ô" data-upper="Ô" data-char="ô">ô</button><button type="button" class="special-char-btn" data-lower="œ" data-upper="Œ" data-char="œ">œ</button><button type="button" class="special-char-btn" data-lower="ù" data-upper="Ù" data-char="ù">ù</button><button type="button" class="special-char-btn" data-lower="û" data-upper="Û" data-char="û">û</button><button type="button" class="special-char-btn" data-lower="ü" data-upper="Ü" data-char="ü">ü</button><button type="button" class="special-char-btn" data-lower="ÿ" data-upper="Ÿ" data-char="ÿ">ÿ</button></div></div>
          <div class="button-row"><button class="soft-btn" id="showWritingModel">Mit Musterlösung vergleichen</button></div>
          <div id="writingModel"></div>
        </div>
      </div>
    </details>`;
  }

  function drawLesson(){
    view.innerHTML=`
      <div class="between"><button class="tiny-btn" id="backLearn">← Lektionen</button><span class="pill">${esc(l.topic)}</span></div>
      <section class="card" style="margin-top:12px">
        <h2>${l.id}. ${esc(l.title)}</h2>
        <div class="notice"><strong>Das kann ich nach dieser Lektion</strong><p>${esc(l.canDo[0])}</p></div>
        <details open><summary><strong>${esc(l.grammar.title)}</strong></summary><p class="muted">${esc(l.grammar.explanation)}</p></details>
        <p class="muted">Höre jede französische Phrase mehrfach und sprich sie laut nach.</p>
        ${l.phrases.map(([fr,de])=>`<div class="phrase-row"><div><strong>${esc(fr)}</strong><small>${esc(de)}</small></div>${speakBtn(fr)}</div>`).join('')}
        <details><summary><strong>Aussprache · ${esc(l.pronunciation.focus)}</strong></summary><p class="muted">${esc(l.pronunciation.explanation)}</p>${speakBtn(l.pronunciation.focus)}</details>
        <div class="spacer"></div><button class="primary-btn" id="startQuiz">10-Fragen-Übung starten</button><div class="spacer"></div>
        <details><summary><strong>Alltagsdialog</strong></summary>${l.dialogue.map((line,i)=>`<div class="phrase-row"><div><small>${i%2?'Person B':'Person A'}</small><strong>${esc(line)}</strong></div>${speakBtn(line)}</div>`).join('')}</details>
        ${applicationHtml()}
      </section>`;
    document.getElementById('backLearn').onclick=renderLearn;
    document.getElementById('startQuiz').onclick=()=>{qi=0;score=0;drawQuiz();};
    wireSpeakButtons();
    wireApplication();
  }

  function wireApplication(){
    function completeSkip(){
      A1Streak.completeExercise();
      document.getElementById('skipFeedback').innerHTML='<div class="feedback good">✓ Übersprungen · als erledigt markiert.</div>';
      document.getElementById('speakingModel').hidden=false;wireSpeakButtons();
    }
    function askSkip(message){if(confirm(message))completeSkip();}
    A1Learning.wireRecorder(recId,()=>{A1Streak.completeExercise();document.getElementById('speakingModel').hidden=false;wireSpeakButtons();},{"unavailable":"Mikrofon hier nicht verfügbar. Verwende HTTPS und einen unterstützten Browser.","denied":"Mikrofon konnte nicht geöffnet werden. Prüfe HTTPS und die Berechtigung.","recording":"● Aufnahme läuft…","done":"Aufnahme fertig. Höre deine Antwort an.","empty":"Keine Aufnahme gespeichert. Versuche es erneut."},()=>askSkip('Das Mikrofon konnte nicht geöffnet werden. Möchtest du diese Sprechaufgabe überspringen und als erledigt markieren?'));
    document.getElementById('skipSpeaking').onclick=()=>askSkip('Möchtest du diese Sprechaufgabe überspringen? Sie wird dann als erledigt markiert.');
    document.querySelectorAll('.self-check').forEach(b=>b.onclick=()=>{
      const good=b.dataset.good==='1',box=b.closest('.lesson-model');let msg=box.querySelector('.self-check-feedback');
      if(!msg){msg=document.createElement('div');msg.className='self-check-feedback';box.appendChild(msg);}
      msg.className=`feedback ${good?'good':'bad'} self-check-feedback`;
      msg.textContent=good?'✓ Gut – weiter so.':'↻ Höre das Beispiel noch einmal und nimm dich erneut auf.';
    });
    const shift=document.querySelector('.special-char-shift');const charBtns=[...document.querySelectorAll('.special-char-btn')];if(shift)shift.onclick=()=>{const upper=shift.getAttribute('aria-pressed')!=='true';shift.setAttribute('aria-pressed',String(upper));shift.classList.toggle('active',upper);charBtns.forEach(b=>{const ch=upper?b.dataset.upper:b.dataset.lower;b.dataset.char=ch;b.textContent=ch;});document.getElementById('lessonWriting')?.focus();};charBtns.forEach(b=>b.onclick=()=>{const t=document.getElementById('lessonWriting');const ch=b.dataset.char;const a=t.selectionStart??t.value.length,z=t.selectionEnd??a;t.value=t.value.slice(0,a)+ch+t.value.slice(z);t.focus();t.setSelectionRange(a+ch.length,a+ch.length);});
    document.getElementById('showWritingModel').onclick=()=>{
      const text=document.getElementById('lessonWriting').value.trim(),target=document.getElementById('writingModel');
      target.innerHTML=`${text?`<div class="solution"><strong>Deine Antwort:</strong><br>${esc(text).replace(/\n/g,'<br>')}</div>`:'<div class="feedback bad">Bearbeite zuerst die Schreibaufgabe.</div>'}
      ${text?`<div class="solution"><strong>Mögliche Musterlösung:</strong><br>${esc(app.writeModel).replace(/\n/g,'<br>')}</div><p><strong>Passt deine Antwort zur Aufgabe?</strong></p><div class="button-row"><button class="secondary-btn" id="writingAgain">↻ Noch einmal bearbeiten</button><button class="primary-btn" id="writingGood">✓ Passt gut</button></div><div id="writingSelfFeedback"></div>`:''}`;
      if(text){
        document.getElementById('writingAgain').onclick=()=>document.getElementById('lessonWriting').focus();
        document.getElementById('writingGood').onclick=()=>{A1Streak.completeExercise();document.getElementById('writingSelfFeedback').innerHTML='<div class="feedback good">✓ Als selbst geprüft markiert.</div>';};
      }
    };
  }

  function drawQuiz(){
    const q=l.quiz[qi];
    view.innerHTML=`<div class="between"><button class="tiny-btn" id="backLesson">← Lektion</button><span class="pill">${qi+1}/${l.quiz.length}</span></div><section class="card" style="margin-top:12px"><div class="quiz-q">${esc(q.q)}</div><div class="options">${q.o.map((o,i)=>`<button class="option-btn" data-o="${i}">${esc(o)}</button>`).join('')}</div><div id="quizFeedback"></div></section>`;
    document.getElementById('backLesson').onclick=drawLesson;
    document.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{
      const chosen=+b.dataset.o,ok=chosen===q.a;if(ok)score++;playCorrectAudio(q.audio||q.o[q.a]);
      document.querySelectorAll('[data-o]').forEach((x,i)=>{x.disabled=true;if(i===q.a)x.classList.add('correct');else if(i===chosen)x.classList.add('wrong');});
      document.getElementById('quizFeedback').innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?'✓ Richtig · Aussprache wird abgespielt':'✗ Richtig ist: '+esc(q.o[q.a])}${q.explanation?'<p>'+esc(q.explanation)+'</p>':''}</div><div class="spacer"></div><button class="primary-btn" id="nextQuiz">${qi<l.quiz.length-1?'Weiter':'Ergebnis'}</button>`;
      document.getElementById('nextQuiz').onclick=()=>{qi++;if(qi<l.quiz.length)drawQuiz();else finishQuiz();};
    });
  }
  function finishQuiz(){
    const pct=Math.round(score/l.quiz.length*100);state.lessonQuizBest[l.id]=Math.max(state.lessonQuizBest[l.id]||0,pct);if(!state.doneLessons.includes(l.id))state.doneLessons.push(l.id);save(true);
    view.innerHTML=`<section class="card center"><span class="pill green">LEKTION ABGESCHLOSSEN</span><h2>${score}/${l.quiz.length} richtig</h2><p class="muted">Bester Wert: ${state.lessonQuizBest[l.id]}%</p><div class="button-row"><button class="secondary-btn" id="repeatLesson">Zurück zur Lektion</button><button class="primary-btn" id="nextLesson">${id<lessons.length?'Nächste Lektion':'Lektionen'}</button></div></section>`;
    document.getElementById('repeatLesson').onclick=drawLesson;document.getElementById('nextLesson').onclick=()=>id<lessons.length?renderLesson(id+1):renderLearn();
  }
  drawLesson();
}

function renderPractice(){
  view.innerHTML=`
    <section class="card hero"><h2>Üben</h2><p class="muted">Die Kernübungen bestehen jetzt aus ungefähr 10 Fragen pro Runde.</p></section>
    <div class="grid">
      <button class="practice-card" id="pVocab"><span class="icon">🧠</span><strong>Vokabeln</strong><small>${lessons.reduce((s,l)=>s+l.phrases.length,0)} Kernphrasen mit Audio</small></button>
      <button class="practice-card" id="pGrammar"><span class="icon">🧩</span><strong>Grammatik & Wortschatz</strong><small>${D.grammarSets.length} Sets · ${D.grammarSets.reduce((s,x)=>s+x.questions.length,0)} Fragen</small></button>
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
      document.getElementById('again').onclick=next;
      document.getElementById('known').onclick=next;
    }
    if(audioEnabled)setTimeout(()=>speak(c.fr),180);
  }
  draw();
}

function renderGrammarMenu(){
  view.innerHTML=`
    <div class="between"><button class="tiny-btn" id="backP">← Üben</button><span class="pill">GRAMMAIRE & VOCABULAIRE</span></div>
    <section class="card" style="margin-top:12px"><h2>A1 Grammatik & Wortschatz</h2><p class="muted">Je Set 10 Fragen. Die Themen decken typische A1-Strukturen aus Einstufungs- und Prüfungsaufgaben ab.</p></section>
    <div class="list">${D.grammarSets.map(s=>`<button class="practice-card" data-gset="${esc(s.id)}"><strong>${esc(s.title)}</strong><small>${esc(s.subtitle)} · Bestwert ${state.grammarBest[s.id]||0}%</small></button>`).join('')}</div>`;
  document.getElementById('backP').onclick=renderPractice;
  document.querySelectorAll('[data-gset]').forEach(b=>b.onclick=()=>startGrammarSet(b.dataset.gset));
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
      view.innerHTML=`<section class="card center"><span class="pill ${pct>=70?'green':'amber'}">${esc(set.title)}</span><div class="score">${pct}%</div><h2>${score}/${qs.length}</h2><p class="muted">Richtige Antworten wurden automatisch auf Französisch vorgelesen.</p><div class="button-row"><button class="secondary-btn" id="againGrammar">Noch einmal</button><button class="primary-btn" id="backGrammar">Alle Sets</button></div></section>`;
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
      if(ok)score++;playCorrectAudio(q.audio||q.o[q.a]);
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
    if(ok){
      if(!state.masteredListening.includes(task.id)){state.masteredListening.push(task.id);save();}
      playCorrectAudio(task.audio||task.speech);
    }
    document.querySelectorAll('[data-o]').forEach((b,j)=>{
      b.disabled=true;
      if(j===correct)b.classList.add('correct');
      else if(j===chosen)b.classList.add('wrong');
    });
    document.getElementById('hearFeedback').innerHTML=`
      <div class="feedback ${ok?'good':'bad'}">${ok?'✓ Richtig · Antwort wird kurz vorgelesen':'✗ Falsch'}</div>
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
    if(ok){
      if(!state.masteredReading.includes(task.id)){state.masteredReading.push(task.id);save();}
      playCorrectAudio(task.audio);
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
      <textarea class="text-area" id="messageText" placeholder="Écris ton message ici…"></textarea>
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

function recorderHtml(id){
  return `<div class="recorder"><button class="secondary-btn" id="startRec${id}">● Aufnehmen</button><button class="soft-btn" id="stopRec${id}" disabled>■ Stop</button></div><div class="record-status" id="recStatus${id}">Sprich deine Antwort laut.</div><div class="playback" id="playback${id}"></div>`;
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
    <section class="card quick-test-card"><div class="between"><h3>Schnelltest</h3><span class="pill gray">Bestwert ${state.bestMock}%</span></div><p class="muted">32 zufällige Hören-/Lesen-Aufgaben für eine schnelle Standortbestimmung.</p><button class="primary-btn" id="quickMock">Schnelltest starten</button></section>`;
  document.getElementById('examListen').onclick=startListeningExam;
  document.getElementById('examRead').onclick=startReadingExam;
  document.getElementById('examWrite').onclick=startWritingExam;
  document.getElementById('examSpeak').onclick=startSpeakingExam;
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

audioToggle.onclick=()=>{
  audioEnabled=!audioEnabled;
  localStorage.setItem('frA1AudioEnabled',String(audioEnabled));
  updateAudioButton();
  if(audioEnabled)speak('Bonjour ! La lecture automatique est activée.',true);
  else if('speechSynthesis' in window)speechSynthesis.cancel();
};
document.getElementById('resetBtn').onclick=()=>{
  if(confirm('Fortschritt für Französisch A1 in diesem Profil zurücksetzen?')){
    localStorage.removeItem(stateKey);state=loadState();save();setRoute(currentRoute);
  }
};
updateAudioButton();
setRoute('home');
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
