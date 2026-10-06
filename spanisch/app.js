const D=window.ES_A1_DATA;
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

const stateKey=A1Profile.namespacedKey('spanischA1DeleState_v1');

function loadState(){return A1Learning.loadState(stateKey,defaultState);}

let state=loadState();

function lessonPct(){return Math.round((state.doneLessons.length/Math.max(lessons.length,1))*100);}
window.A1CourseProgressPercent=lessonPct;

function save(completed=false){if(completed)A1Streak.completeExercise();
  localStorage.setItem(stateKey,JSON.stringify(state));
  A1Profile.saveProgress('spanisch-a1',state,lessonPct());
}

let audioEnabled=localStorage.getItem('esA1AudioEnabled')!=='false';
let currentRoute='home';
const view=document.getElementById('view');
const audioToggle=document.getElementById('audioToggle');
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const rand=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=A1Learning.shuffle;
const normalize=s=>String(s||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[.,;:!?¿¡]/g,'').replace(/\s+/g,' ');
const totalListening=()=>Object.values(D.listening).reduce((s,a)=>s+a.length,0);
const totalReading=()=>Object.values(D.reading).reduce((s,a)=>s+a.length,0);

function speak(text,force=false,rate=.82){
  if((!audioEnabled&&!force)||!('speechSynthesis' in window)||!text)return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang='es-ES';
  u.rate=rate;
  const voices=speechSynthesis.getVoices();
  const v=voices.find(x=>x.lang?.toLowerCase()==='es-es')||voices.find(x=>x.lang?.toLowerCase().startsWith('es'));
  if(v)u.voice=v;
  speechSynthesis.speak(u);
}
function playCorrectAudio(text){if(audioEnabled&&text)setTimeout(()=>speak(text,true,.80),120);}
function speakBtn(text){return `<button class="speak-btn" data-speak="${encodeURIComponent(text)}" aria-label="Aussprache anhören">🔊</button>`;}
function wireSpeakButtons(){document.querySelectorAll('[data-speak]').forEach(b=>b.onclick=()=>speak(decodeURIComponent(b.dataset.speak),true));}
function updateAudioButton(){
  audioToggle.textContent=audioEnabled?'🔊 Auto':'🔇 Auto';
  audioToggle.classList.toggle('audio-off',!audioEnabled);
}

function skillPct(kind){
  if(kind==='Hören')return Math.round(clamp(state.masteredListening.length/Math.max(totalListening(),1)*100,0,100));
  if(kind==='Lesen')return Math.round(clamp(state.masteredReading.length/Math.max(totalReading(),1)*100,0,100));
  if(kind==='Schreiben')return Math.round(clamp(state.writingDone.length/Math.max(D.forms.length+D.writing.length,1)*100,0,100));
  if(kind==='Sprechen')return Math.round(clamp(state.speakingDone.length/Math.max(D.interview.length+D.infoCards.length+D.roleplays.length,1)*100,0,100));
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
      <h2 style="margin-top:12px">Spanisch A1 🇪🇸</h2>
      <p class="muted">${state.doneLessons.length}/${lessons.length} Lektionen abgeschlossen</p>
      <div class="progress"><div style="width:${lessonPct()}%"></div></div>
      <div class="between" style="margin-top:10px"><small>DEUTSCH → SPANISCH · DELE A1</small><strong>${lessonPct()}%</strong></div>
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
      <h2 style="margin-top:12px">Spanisch A1 Kurs</h2>
      <p class="muted">Alltagssprache, A1-Grammatik, Aussprache und gezielte DELE-A1-Vorbereitung.</p>
      <div class="progress"><div style="width:${lessonPct()}%"></div></div>
    </section>
    <div class="list">
      ${lessons.map(l=>`<button class="lesson ${state.doneLessons.includes(l.id)?'done':''}" data-lesson="${l.id}">
        <div><span class="num">${l.id}</span><strong>${esc(l.title)}</strong></div>
        <p class="lesson-goal-preview">${A1LessonGuide.goal(l.id,esc)}</p>
        <div class="lesson-meta">${l.skills.map(s=>`<span class="pill gray">${s}</span>`).join('')}${state.doneLessons.includes(l.id)?'<span class="pill green">✓ fertig</span>':''}</div>
      </button>`).join('')}
    </div>`;
  document.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>renderLesson(+b.dataset.lesson));
}

function renderLesson(id){
  const l=lessons.find(x=>x.id===id), c=window.A1_COURSE_CONTENT.find(x=>x.id===id), parts=A1LessonGuide.parts(id,'de',esc,speakBtn);let qi=0,score=0;const recId=`LessonApply${id}`;
  const model=(c.grammar.examples?.[0]?.[0]||l.phrases[0][0])+' '+l.phrases.slice(1,4).map(p=>p[0]).join(' ');
  function applyHtml(){return `<details class="lesson-application"><summary><strong>Jetzt selbst anwenden</strong></summary><div class="application-block"><h3>🎤 Sprechen</h3><div class="practice-task"><strong>${esc(c.transfer.speaking)}</strong><p class="muted">Sprich die Aufgabe frei ins Mikrofon. Danach kannst du deine Aufnahme und eine mögliche sprachliche Orientierung anhören.</p>${recorderHtml(recId)}<div class="button-row"><button class="soft-btn" id="skipSpeaking">Sprechaufgabe überspringen</button></div><div id="skipFeedback"></div><div id="speakingModel" hidden><div class="solution"><strong>Mögliche Orientierung:</strong><br>${esc(model)}</div><div class="button-row"><button class="soft-btn" data-speak="${encodeURIComponent(model)}">🔊 Beispiel anhören</button></div><p><strong>Wie war deine Antwort?</strong></p><div class="button-row"><button class="secondary-btn self-check" data-good="0">↻ Noch einmal üben</button><button class="primary-btn self-check" data-good="1">✓ Das war gut</button></div></div></div><h3>✍️ Schreiben</h3><div class="practice-task"><strong>${esc(c.transfer.writing)}</strong><textarea class="text-area" id="lessonWriting" placeholder="Schreibe deine Antwort hier…"></textarea><div class="special-char-wrap"><span class="special-char-label">Sonderzeichen</span><div class="special-char-bar"><button type="button" class="special-char-shift" aria-label="Groß-/Kleinschreibung umschalten" aria-pressed="false">⇧</button><button type="button" class="special-char-btn" data-lower="á" data-upper="Á" data-char="á">á</button><button type="button" class="special-char-btn" data-lower="é" data-upper="É" data-char="é">é</button><button type="button" class="special-char-btn" data-lower="í" data-upper="Í" data-char="í">í</button><button type="button" class="special-char-btn" data-lower="ó" data-upper="Ó" data-char="ó">ó</button><button type="button" class="special-char-btn" data-lower="ú" data-upper="Ú" data-char="ú">ú</button><button type="button" class="special-char-btn" data-lower="ü" data-upper="Ü" data-char="ü">ü</button><button type="button" class="special-char-btn" data-lower="ñ" data-upper="Ñ" data-char="ñ">ñ</button><button type="button" class="special-char-btn" data-lower="¿" data-upper="¿" data-char="¿">¿</button><button type="button" class="special-char-btn" data-lower="¡" data-upper="¡" data-char="¡">¡</button></div></div><div class="button-row"><button class="soft-btn" id="showWritingModel">Mit Musterlösung vergleichen</button></div><div id="writingModel"></div></div></div></details>`;}
  function wireApp(){const show=()=>{document.getElementById('speakingModel').hidden=false;wireSpeakButtons();};const completeSkip=()=>{A1Streak.completeExercise();document.getElementById('skipFeedback').innerHTML='<div class="feedback good">✓ Übersprungen · als erledigt markiert.</div>';show();};const ask=m=>{if(confirm(m))completeSkip();};A1Learning.wireRecorder(recId,()=>{A1Streak.completeExercise();show();},{unavailable:'Mikrofon hier nicht verfügbar. Verwende HTTPS und einen unterstützten Browser.',denied:'Mikrofon konnte nicht geöffnet werden. Prüfe HTTPS und die Berechtigung.',recording:'● Aufnahme läuft…',done:'Aufnahme fertig. Höre deine Antwort an.',empty:'Keine Aufnahme gespeichert. Versuche es erneut.'},()=>ask('Das Mikrofon konnte nicht geöffnet werden. Möchtest du diese Sprechaufgabe überspringen und als erledigt markieren?'));skipSpeaking.onclick=()=>ask('Möchtest du diese Sprechaufgabe überspringen? Sie wird dann als erledigt markiert.');document.querySelectorAll('.self-check').forEach(b=>b.onclick=()=>{b.closest('div[id="speakingModel"]').insertAdjacentHTML('beforeend',`<div class="feedback ${b.dataset.good==='1'?'good':'bad'}">${b.dataset.good==='1'?'✓ Gut – weiter so.':'↻ Höre das Beispiel noch einmal und versuche es erneut.'}</div>`);});const shift=document.querySelector('.special-char-shift');const charBtns=[...document.querySelectorAll('.special-char-btn')];if(shift)shift.onclick=()=>{const upper=shift.getAttribute('aria-pressed')!=='true';shift.setAttribute('aria-pressed',String(upper));shift.classList.toggle('active',upper);charBtns.forEach(b=>{const ch=upper?b.dataset.upper:b.dataset.lower;b.dataset.char=ch;b.textContent=ch;});document.getElementById('lessonWriting')?.focus();};charBtns.forEach(b=>b.onclick=()=>{const t=document.getElementById('lessonWriting');const ch=b.dataset.char;const a=t.selectionStart??t.value.length,z=t.selectionEnd??a;t.value=t.value.slice(0,a)+ch+t.value.slice(z);t.focus();t.setSelectionRange(a+ch.length,a+ch.length);});showWritingModel.onclick=()=>{const t=lessonWriting.value.trim();writingModel.innerHTML=t?`<div class="solution"><strong>Deine Antwort:</strong><br>${esc(t).replace(/\n/g,'<br>')}</div><div class="solution"><strong>Mögliche sprachliche Orientierung:</strong><br>${esc(model)}</div><div class="button-row"><button class="primary-btn" id="writingGood">✓ Passt gut</button></div><div id="writingSelfFeedback"></div>`:'<div class="feedback bad">Bearbeite zuerst die Schreibaufgabe.</div>';if(t)writingGood.onclick=()=>{A1Streak.completeExercise();writingSelfFeedback.innerHTML='<div class="feedback good">✓ Als selbst geprüft markiert.</div>';};};}
  function drawLesson(){view.innerHTML=`<div class="between"><button class="tiny-btn" id="backLearn">← Lektionen</button><span class="pill">${esc(l.topic)}</span></div><section class="card" style="margin-top:12px"><h2>${l.id}. ${esc(l.title)}</h2>${A1LessonGuide.intro(l.id,'de',esc,speakBtn)}<p class="muted">Höre die spanischen Ausdrücke an und sprich sie laut nach.</p>${l.phrases.map(([es,de])=>`<div class="phrase-row"><div><strong>${esc(es)}</strong><small>${esc(de)}</small></div>${speakBtn(es)}</div>`).join('')}${parts.pronunciation}<div class="spacer"></div><button class="primary-btn" id="startQuiz">${l.quiz.length}-Fragen-Übung starten</button><div class="spacer"></div>${parts.dialogue}${applyHtml()}</section>`;backLearn.onclick=renderLearn;startQuiz.onclick=()=>{qi=0;score=0;drawQuiz();};wireSpeakButtons();wireApp();}
  function drawQuiz(){const q=l.quiz[qi];view.innerHTML=`<div class="between"><button class="tiny-btn" id="backLesson">← Lektion</button><span class="pill">${qi+1}/${l.quiz.length}</span></div><section class="card" style="margin-top:12px"><div class="quiz-q">${esc(q.q)}</div><div class="options">${q.o.map((o,i)=>`<button class="option-btn" data-o="${i}">${esc(o)}</button>`).join('')}</div><div id="quizFeedback"></div></section>`;backLesson.onclick=drawLesson;document.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{const chosen=+b.dataset.o,ok=chosen===q.a;if(ok)score++;playCorrectAudio(q.audio||q.o[q.a]);document.querySelectorAll('[data-o]').forEach((x,i)=>{x.disabled=true;if(i===q.a)x.classList.add('correct');else if(i===chosen)x.classList.add('wrong');});quizFeedback.innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?'✓ Richtig · Spanisch wird abgespielt':'✗ Richtig ist: '+esc(q.o[q.a])}</div><div class="spacer"></div><button class="primary-btn" id="nextQuiz">${qi<l.quiz.length-1?'Weiter':'Ergebnis'}</button>`;nextQuiz.onclick=()=>{qi++;qi<l.quiz.length?drawQuiz():finishQuiz();};});}
  function finishQuiz(){const pct=Math.round(score/l.quiz.length*100);state.lessonQuizBest[l.id]=Math.max(state.lessonQuizBest[l.id]||0,pct);if(pct>=70&&!state.doneLessons.includes(l.id))state.doneLessons.push(l.id);save(true);view.innerHTML=`<section class="card center"><span class="pill ${pct>=70?'green':'amber'}">${pct>=70?'LEKTION BESTANDEN':'NOCH EINMAL'}</span><div class="score">${pct}%</div><h2>${score}/${l.quiz.length}</h2><div class="button-row"><button class="secondary-btn" id="repeatLesson">Zurück zur Lektion</button><button class="primary-btn" id="nextLesson">${id<lessons.length?'Nächste Lektion':'Lektionen'}</button></div></section>`;repeatLesson.onclick=drawLesson;nextLesson.onclick=()=>id<lessons.length?renderLesson(id+1):renderLearn();}drawLesson();}

function renderPractice(){
  view.innerHTML=`
    <section class="card hero"><h2>Üben</h2><p class="muted">Alle Kernbereiche des Spanisch-A1-Kurses mit Audio und zufälligen Aufgaben.</p></section>
    <div class="grid">
      <button class="practice-card" id="pVocab"><span class="icon">🧠</span><strong>Vokabeln</strong><small>${lessons.reduce((s,l)=>s+l.phrases.length,0)} Kernphrasen mit Audio</small></button>
      <button class="practice-card" id="pGrammar"><span class="icon">🧩</span><strong>Grammatik & Wortschatz</strong><small>${D.grammarSets.length} Sets · ${D.grammarSets.reduce((s,x)=>s+x.questions.length,0)} Fragen</small></button>
      <button class="practice-card" id="pListen"><span class="icon">🎧</span><strong>Hören</strong><small>${totalListening()} Audioaufgaben · DELE-nahe Formate</small></button>
      <button class="practice-card" id="pRead"><span class="icon">📖</span><strong>Lesen</strong><small>${totalReading()} Aufgaben · vier DELE-Aufgabentypen</small></button>
      <button class="practice-card" id="pWrite"><span class="icon">✍️</span><strong>Schreiben</strong><small>${D.forms.length} Formulare + ${D.writing.length} Texte</small></button>
      <button class="practice-card" id="pSpeak"><span class="icon">🎤</span><strong>Sprechen</strong><small>Präsentation · Thema · Gespräch</small></button>
    </div>`;
  document.getElementById('pVocab').onclick=renderVocab;
  document.getElementById('pGrammar').onclick=renderGrammarMenu;
  document.getElementById('pListen').onclick=renderListeningMenu;
  document.getElementById('pRead').onclick=renderReadingMenu;
  document.getElementById('pWrite').onclick=renderWritingMenu;
  document.getElementById('pSpeak').onclick=renderSpeakingMenu;
}

function renderVocab(){
  const cards=lessons.flatMap(l=>l.phrases.map(([es,de])=>({es,de,lesson:l.id})));
  const key=A1Profile.namespacedKey('esA1VocabIndex');
  let idx=+localStorage.getItem(key)||0,reveal=false;
  function draw(){
    const c=cards[idx%cards.length];
    view.innerHTML=`<div class="between"><button class="tiny-btn" id="backPractice">← Üben</button><span class="pill">${idx%cards.length+1}/${cards.length}</span></div><section class="card center" style="margin-top:12px"><div class="eyebrow">LEKTION ${c.lesson}</div><div style="display:flex;justify-content:center;align-items:center;gap:12px;margin:25px 0 8px"><div style="font-size:31px;font-weight:900">${esc(c.es)}</div>${speakBtn(c.es)}</div>${reveal?`<div style="font-size:19px;margin-bottom:18px">${esc(c.de)}</div>`:'<p class="muted">Was bedeutet das auf Deutsch?</p>'}${!reveal?'<button class="primary-btn" id="reveal">Antwort zeigen</button>':'<div class="button-row"><button class="secondary-btn" id="again">Noch üben</button><button class="primary-btn" id="known">Gewusst ✓</button></div>'}</section>`;
    wireSpeakButtons();
    document.getElementById('backPractice').onclick=renderPractice;
    if(!reveal)document.getElementById('reveal').onclick=()=>{reveal=true;draw();};
    else{const next=()=>{A1Streak.completeExercise();idx=(idx+1)%cards.length;reveal=false;localStorage.setItem(key,idx);draw();};document.getElementById('again').onclick=next;document.getElementById('known').onclick=next;}
    if(audioEnabled)setTimeout(()=>speak(c.es),180);
  }
  draw();
}

function renderGrammarMenu(){
  view.innerHTML=`<div class="between"><button class="tiny-btn" id="backP">← Üben</button><span class="pill">GRAMÁTICA & VOCABULARIO</span></div><section class="card" style="margin-top:12px"><h2>A1 Grammatik & Wortschatz</h2><p class="muted">Je Set 10 Fragen zu zentralen spanischen A1-Strukturen.</p></section><div class="list">${D.grammarSets.map(s=>`<button class="practice-card" data-gset="${esc(s.id)}"><strong>${esc(s.title)}</strong><small>${esc(s.subtitle)} · Bestwert ${state.grammarBest[s.id]||0}%</small></button>`).join('')}</div>`;
  document.getElementById('backP').onclick=renderPractice;
  document.querySelectorAll('[data-gset]').forEach(b=>b.onclick=()=>startGrammarSet(b.dataset.gset));
}
function startGrammarSet(id){
  const set=D.grammarSets.find(x=>x.id===id),qs=shuffle(set.questions).slice(0,10);let i=0,score=0;
  function draw(){
    if(i>=qs.length){const pct=Math.round(score/qs.length*100);state.grammarBest[id]=Math.max(state.grammarBest[id]||0,pct);save(true);view.innerHTML=`<section class="card center"><span class="pill ${pct>=70?'green':'amber'}">${esc(set.title)}</span><div class="score">${pct}%</div><h2>${score}/${qs.length}</h2><p class="muted">Richtige Antworten werden auf Spanisch vorgelesen.</p><div class="button-row"><button class="secondary-btn" id="againGrammar">Noch einmal</button><button class="primary-btn" id="backGrammar">Alle Sets</button></div></section>`;document.getElementById('againGrammar').onclick=()=>startGrammarSet(id);document.getElementById('backGrammar').onclick=renderGrammarMenu;return;}
    const q=qs[i];view.innerHTML=`<div class="between"><button class="tiny-btn" id="backGrammar">← Grammatik</button><span class="pill">${i+1}/${qs.length}</span></div><section class="card" style="margin-top:12px"><div class="eyebrow">${esc(set.title)}</div><div class="quiz-q">${esc(q.q)}</div><div class="options">${q.o.map((o,j)=>`<button class="option-btn" data-o="${j}">${esc(o)}</button>`).join('')}</div><div id="grammarFeedback"></div></section>`;
    document.getElementById('backGrammar').onclick=renderGrammarMenu;
    document.querySelectorAll('[data-o]').forEach(btn=>btn.onclick=()=>{const chosen=+btn.dataset.o,ok=chosen===q.a;if(ok)score++;playCorrectAudio(q.audio||q.o[q.a]);document.querySelectorAll('[data-o]').forEach((b,j)=>{b.disabled=true;if(j===q.a)b.classList.add('correct');else if(j===chosen)b.classList.add('wrong');});document.getElementById('grammarFeedback').innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?'✓ Richtig':'✗ Richtig ist: '+esc(q.o[q.a])}</div><div class="spacer"></div><button class="primary-btn" id="nextGrammar">${i<qs.length-1?'Weiter':'Ergebnis'}</button>`;document.getElementById('nextGrammar').onclick=()=>{i++;draw();};});
  }
  draw();
}

function renderListeningMenu(){
  view.innerHTML=`<div class="between"><button class="tiny-btn" id="backP">← Üben</button><span class="pill">COMPRENSIÓN AUDITIVA</span></div><section class="card" style="margin-top:12px"><h2>Hörverstehen</h2><p class="muted">Trainiere die vier Aufgabentypen des DELE A1. Im Prüfungsmodus darf jeder Text höchstens zweimal abgespielt werden.</p></section><div class="list">
  <button class="practice-card" data-lp="1"><strong>Tarea 1 · Kurze Gespräche</strong><small>Alltagssituationen · Pool ${D.listening.part1.length}</small></button>
  <button class="practice-card" data-lp="2"><strong>Tarea 2 · Kurze Mitteilungen</strong><small>Ort/Situation erkennen · Pool ${D.listening.part2.length}</small></button>
  <button class="practice-card" data-lp="3"><strong>Tarea 3 · Personen zuordnen</strong><small>Informationen über Personen · Pool ${D.listening.part3.length}</small></button>
  <button class="practice-card" data-lp="4"><strong>Tarea 4 · Gespräch ergänzen</strong><small>Schlüsselinfos verstehen · Pool ${D.listening.part4.length}</small></button></div>`;
  document.getElementById('backP').onclick=renderPractice;
  document.querySelectorAll('[data-lp]').forEach(b=>b.onclick=()=>startListeningPractice(+b.dataset.lp));
}
function startListeningPractice(part){
  const tasks=shuffle(D.listening['part'+part]).slice(0,10);let i=0,score=0;
  function next(ok){if(typeof ok==='boolean'){if(ok)score++;i++;}if(i>=tasks.length){A1Streak.completeExercise();const pct=Math.round(score/tasks.length*100);view.innerHTML=`<section class="card center"><span class="pill ${pct>=70?'green':'amber'}">HÖREN · TAREA ${part}</span><div class="score">${pct}%</div><h2>${score}/${tasks.length}</h2><p class="muted">Neue Runde = neue Auswahl aus dem Aufgabenpool.</p><div class="button-row"><button class="secondary-btn" id="againHear">Noch einmal</button><button class="primary-btn" id="backHearMenu">Hören</button></div></section>`;document.getElementById('againHear').onclick=()=>startListeningPractice(part);document.getElementById('backHearMenu').onclick=renderListeningMenu;return;}renderListeningTask(part,false,next,tasks[i],`${i+1}/${tasks.length}`);}
  next();
}
function renderListeningTask(part,examMode=false,onDone=null,forced=null,progressLabel='',timerText=''){
  const task=forced||rand(D.listening['part'+part]);let plays=0,answered=false;const maxPlays=examMode?2:99;
  view.innerHTML=`${timerText?`<div class="notice" style="margin-bottom:10px">⏱ ${esc(timerText)}</div>`:''}<div class="between"><button class="tiny-btn" id="backListen">← ${examMode?'Prüfung':'Hören'}</button><span class="pill">${progressLabel||'Tarea '+part}</span></div><section class="card" style="margin-top:12px"><div class="audio-panel"><button class="speak-btn large" id="playAudio">▶️</button><div><strong>Audio abspielen</strong></div><div class="play-count" id="playCount">${examMode?`0/${maxPlays} Wiedergaben`:'Training · beliebig oft'}</div></div><div class="quiz-q">${esc(task.q)}</div><div class="options">${task.o.map((x,j)=>`<button class="option-btn" data-o="${j}">${esc(x)}</button>`).join('')}</div><div id="hearFeedback"></div></section>`;
  document.getElementById('backListen').onclick=()=>examMode?renderExam():renderListeningMenu();
  document.getElementById('playAudio').onclick=()=>{if(plays>=maxPlays)return;plays++;speak(task.speech,true,.76);document.getElementById('playCount').textContent=examMode?`${plays}/${maxPlays} Wiedergaben`:'Training · beliebig oft';if(plays>=maxPlays)document.getElementById('playAudio').disabled=true;};
  document.querySelectorAll('[data-o]').forEach(btn=>btn.onclick=()=>{if(answered)return;answered=true;const chosen=+btn.dataset.o,ok=chosen===task.a;if(ok){if(!state.masteredListening.includes(task.id)){state.masteredListening.push(task.id);save();}}playCorrectAudio(task.audio||task.speech);document.querySelectorAll('[data-o]').forEach((b,j)=>{b.disabled=true;if(j===task.a)b.classList.add('correct');else if(j===chosen)b.classList.add('wrong');});document.getElementById('hearFeedback').innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?'✓ Richtig':'✗ Richtig ist: '+esc(task.o[task.a])}</div>${examMode?'':`<div class="transcript"><strong>Transkript:</strong><br>${esc(task.speech)}</div>`}<div class="spacer"></div><button class="primary-btn" id="nextHear">${onDone?'Weiter':'Neue Aufgabe'}</button>`;document.getElementById('nextHear').onclick=()=>onDone?onDone(ok):renderListeningTask(part,false);});
}

function renderReadingMenu(){
  view.innerHTML=`<div class="between"><button class="tiny-btn" id="backP">← Üben</button><span class="pill">COMPRENSIÓN DE LECTURA</span></div><section class="card" style="margin-top:12px"><h2>Leseverstehen</h2><p class="muted">Vier Aufgabentypen nach dem DELE-A1-Modell: E-Mails, Mitteilungen, Anzeigen und praktische Informationen.</p></section><div class="list">
  <button class="practice-card" data-rp="1"><strong>Tarea 1 · E-Mails & Nachrichten</strong><small>Text verstehen · Pool ${D.reading.part1.length}</small></button>
  <button class="practice-card" data-rp="2"><strong>Tarea 2 · Kurze Hinweise</strong><small>Mitteilungen und Schilder · Pool ${D.reading.part2.length}</small></button>
  <button class="practice-card" data-rp="3"><strong>Tarea 3 · Anzeigen</strong><small>Wohnung, Arbeit, Services · Pool ${D.reading.part3.length}</small></button>
  <button class="practice-card" data-rp="4"><strong>Tarea 4 · Agenda & praktische Daten</strong><small>Zeiten, Preise, Programme · Pool ${D.reading.part4.length}</small></button></div>`;
  document.getElementById('backP').onclick=renderPractice;
  document.querySelectorAll('[data-rp]').forEach(b=>b.onclick=()=>startReadingPractice(+b.dataset.rp));
}
function startReadingPractice(part){
  const tasks=shuffle(D.reading['part'+part]).slice(0,10);let i=0,score=0;
  function next(ok){if(typeof ok==='boolean'){if(ok)score++;i++;}if(i>=tasks.length){A1Streak.completeExercise();const pct=Math.round(score/tasks.length*100);view.innerHTML=`<section class="card center"><span class="pill ${pct>=70?'green':'amber'}">LESEN · TAREA ${part}</span><div class="score">${pct}%</div><h2>${score}/${tasks.length}</h2><p class="muted">Neue Runde = neue Auswahl aus dem Aufgabenpool.</p><div class="button-row"><button class="secondary-btn" id="againRead">Noch einmal</button><button class="primary-btn" id="backReadMenu">Lesen</button></div></section>`;document.getElementById('againRead').onclick=()=>startReadingPractice(part);document.getElementById('backReadMenu').onclick=renderReadingMenu;return;}renderReadingTask(part,next,tasks[i],`${i+1}/${tasks.length}`);}
  next();
}
function renderReadingTask(part,onDone=null,forced=null,progressLabel='',examMode=false,timerText=''){
  const task=forced||rand(D.reading['part'+part]);
  view.innerHTML=`${timerText?`<div class="notice" style="margin-bottom:10px">⏱ ${esc(timerText)}</div>`:''}<div class="between"><button class="tiny-btn" id="backRead">← ${examMode?'Prüfung':'Lesen'}</button><span class="pill">${progressLabel||'Tarea '+part}</span></div><section class="card" style="margin-top:12px"><div class="reading-text">${esc(task.text).replace(/\n/g,'<br>')}</div><div class="quiz-q">${esc(task.q)}</div><div class="options">${task.o.map((o,i)=>`<button class="option-btn" data-o="${i}">${esc(o)}</button>`).join('')}</div><div id="readFeedback"></div></section>`;
  document.getElementById('backRead').onclick=()=>examMode?renderExam():renderReadingMenu;
  document.querySelectorAll('[data-o]').forEach(btn=>btn.onclick=()=>{const chosen=+btn.dataset.o,ok=chosen===task.a;if(ok){if(!state.masteredReading.includes(task.id)){state.masteredReading.push(task.id);save();}}playCorrectAudio(task.audio);document.querySelectorAll('[data-o]').forEach((b,j)=>{b.disabled=true;if(j===task.a)b.classList.add('correct');else if(j===chosen)b.classList.add('wrong');});document.getElementById('readFeedback').innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?'✓ Richtig':'✗ Richtige Antwort: '+esc(task.o[task.a])}</div><div class="spacer"></div><button class="primary-btn" id="nextRead">${onDone?'Weiter':'Neue Aufgabe'}</button>`;document.getElementById('nextRead').onclick=()=>onDone?onDone(ok):renderReadingTask(part);});
}

function renderWritingMenu(){
  view.innerHTML=`<div class="between"><button class="tiny-btn" id="backP">← Üben</button><span class="pill">PRUEBA 3 · EXPRESIÓN ESCRITA</span></div><section class="card" style="margin-top:12px"><h2>Schreiben</h2><p class="muted">DELE A1: Aufgabe 1 ist ein Formular mit persönlichen Angaben und kurzen Antworten. Aufgabe 2 ist ein kurzer Text mit empfohlenen 30–40 Wörtern.</p></section><div class="grid"><button class="practice-card" id="formPractice"><span class="icon">📝</span><strong>Formulare</strong><small>${D.forms.length} Szenarien</small></button><button class="practice-card" id="msgPractice"><span class="icon">✉️</span><strong>Kurze Texte</strong><small>${D.writing.length} Themen · Ziel 30–40 Wörter</small></button></div>`;
  document.getElementById('backP').onclick=renderPractice;document.getElementById('formPractice').onclick=()=>renderFormTask();document.getElementById('msgPractice').onclick=()=>renderMessageTask();
}
function renderFormTask(onDone=null,forced=null,timerText=''){
  const task=forced||rand(D.forms);
  view.innerHTML=`${timerText?`<div class="notice" style="margin-bottom:10px">⏱ ${esc(timerText)}</div>`:''}<div class="between"><button class="tiny-btn" id="backWrite">← Schreiben</button><span class="pill">TAREA 1 · FORMULAR</span></div><section class="card" style="margin-top:12px"><h3>Situation</h3><p>${esc(task.context)}</p><div class="form-grid">${task.fields.map((f,i)=>`<div class="field"><label>${esc(f.label)}</label><input class="text-input" id="field${i}"></div>`).join('')}</div><div class="spacer"></div><button class="primary-btn" id="checkForm">Überprüfen</button><div id="formFeedback"></div></section>`;
  document.getElementById('backWrite').onclick=renderWritingMenu;
  document.getElementById('checkForm').onclick=()=>{if(task.fields.every((_,i)=>document.getElementById('field'+i).value.trim()))A1Streak.completeExercise();let correct=0;const details=task.fields.map((f,i)=>{const val=normalize(document.getElementById('field'+i).value);const ok=f.answers.some(a=>normalize(a)===val);if(ok)correct++;return `<div>${ok?'✓':'✗'} <strong>${esc(f.label)}:</strong> ${ok?'passt':esc(f.answers[0])}</div>`;}).join('');const passed=correct>=Math.ceil(task.fields.length*.7);if(passed&&!state.writingDone.includes(task.id)){state.writingDone.push(task.id);save();}document.getElementById('formFeedback').innerHTML=`<div class="feedback ${passed?'good':'bad'}"><strong>${correct}/${task.fields.length}</strong><div style="margin-top:8px;line-height:1.7">${details}</div></div><p class="muted">Hinweis: Bei der echten Prüfung werden freie Antworten von Prüfern bewertet; diese Kontrolle ist nur Training.</p><div class="spacer"></div><button class="primary-btn" id="nextForm">${onDone?'Weiter':'Neues Formular'}</button>`;document.getElementById('nextForm').onclick=()=>onDone?onDone(correct):renderFormTask();};
}
function rubricSelect(label,max,description){let options='';for(let v=0;v<=max;v++)options+=`<option value="${v}">${v}</option>`;return `<div class="field"><label>${esc(label)} · max. ${max}</label><select class="select-input" data-rubric>${options}</select><small class="muted">${esc(description)}</small></div>`;}
function renderMessageTask(onDone=null,forced=null,timerText=''){
  const task=forced||rand(D.writing);
  view.innerHTML=`${timerText?`<div class="notice" style="margin-bottom:10px">⏱ ${esc(timerText)}</div>`:''}<div class="between"><button class="tiny-btn" id="backWrite">← Schreiben</button><span class="pill">TAREA 2 · 30–40 WÖRTER</span></div><section class="card" style="margin-top:12px"><h3>Aufgabe</h3><p>${esc(task.prompt)}</p><textarea class="text-area" id="messageText" placeholder="Escribe tu texto aquí…"></textarea><div class="word-count" id="wordCount">0 Wörter</div><div class="spacer"></div><button class="primary-btn" id="openRubric">Selbstkontrolle öffnen</button><div id="messageFeedback"></div></section>`;
  const ta=document.getElementById('messageText'),wc=document.getElementById('wordCount');const count=()=>A1Learning.countWords(ta.value);ta.oninput=()=>{wc.textContent=`${count()} Wörter`;document.getElementById('messageFeedback').replaceChildren();};document.getElementById('backWrite').onclick=renderWritingMenu;
  document.getElementById('openRubric').onclick=()=>{const words=count(),inRange=words>=30&&words<=40;document.getElementById('messageFeedback').innerHTML=`<hr class="soft"><h3>DELE-orientierte Selbstkontrolle</h3><p class="muted">Keine offizielle Bewertung. Prüfe, ob du die verlangten Inhalte einfach und verständlich ausdrückst.</p><div class="form-grid">${rubricSelect('Aufgabenbezug',3,'Alle geforderten Punkte enthalten.')}${rubricSelect('Verständlichkeit',3,'Einfache, klare Sätze.')}${rubricSelect('Wortschatz',3,'Passender A1-Wortschatz.')}${rubricSelect('Grammatik',3,'Grundstrukturen überwiegend verständlich.')}${rubricSelect('Verknüpfung',3,'Einfache Verbindungen wie y, pero, porque.')}</div><div class="notice ${inRange?'success':'warning'}" style="margin-top:12px">Du hast <strong>${words} Wörter</strong> geschrieben. Empfohlen: <strong>30–40 Wörter</strong>.</div><div class="spacer"></div><button class="secondary-btn" id="calcWrite">Punkte berechnen</button><div id="writeScore"></div><div class="spacer"></div><button class="soft-btn" id="showModel">Beispielantwort zeigen</button><div id="modelAnswer"></div>`;
    document.getElementById('calcWrite').onclick=()=>{const words=count();if(words>=30)A1Streak.completeExercise();const pts=[...document.querySelectorAll('[data-rubric]')].reduce((s,c)=>s+(+c.value||0),0);if(pts>=10&&words>=30&&!state.writingDone.includes(task.id)){state.writingDone.push(task.id);save();}document.getElementById('writeScore').innerHTML=`<div class="feedback ${pts>=10&&words>=30?'good':'bad'}"><strong>${pts}/15</strong> · Selbstbewertung</div>${onDone?'<div class="spacer"></div><button class="primary-btn" id="continueWrite">Weiter</button>':'<div class="spacer"></div><button class="primary-btn" id="nextMsg">Neues Thema</button>'}`;document.getElementById(onDone?'continueWrite':'nextMsg').onclick=()=>onDone?onDone(pts):renderMessageTask();};
    document.getElementById('showModel').onclick=()=>document.getElementById('modelAnswer').innerHTML=`<div class="solution"><strong>Beispiel:</strong><br>${esc(task.model).replace(/\n/g,'<br>')}</div>`;
  };
}

function recorderHtml(id){return `<div class="recorder"><button class="secondary-btn" id="startRec${id}">● Aufnehmen</button><button class="soft-btn" id="stopRec${id}" disabled>■ Stop</button></div><div class="record-status" id="recStatus${id}">Sprich deine Antwort laut.</div><div class="playback" id="playback${id}"></div>`;}
function wireRecorder(id,onRecorded){return A1Learning.wireRecorder(id,()=>{A1Streak.completeExercise();if(onRecorded)onRecorded();},{"unavailable": "Mikrofon hier nicht verfügbar. Verwende HTTPS und einen unterstützten Browser.", "denied": "Mikrofon konnte nicht geöffnet werden. Prüfe HTTPS und die Berechtigung.", "recording": "● Aufnahme läuft…", "done": "Aufnahme fertig. Höre deine Antwort an.", "empty": "Keine Aufnahme gespeichert. Versuche es erneut."});}

function renderSpeakingMenu(){
  view.innerHTML=`<div class="between"><button class="tiny-btn" id="backP">← Üben</button><span class="pill">EXPRESIÓN E INTERACCIÓN ORALES</span></div><section class="card" style="margin-top:12px"><h2>Sprechen</h2><p class="muted">DELE A1: persönliche Präsentation, kurzer Themenmonolog und Gespräch mit dem Prüfer. Zusätzlich kannst du typische Alltagssituationen trainieren.</p></section><div class="list"><button class="practice-card" id="sp1"><strong>1 · Persönliche Präsentation</strong><small>Name, Alter, Nationalität, Wohnort, Beruf/Studium, Persönlichkeit, Sprachen</small></button><button class="practice-card" id="sp2"><strong>2 · Thema vorstellen</strong><small>Wähle 3 von 5 Aspekten und sprich 2–3 Minuten</small></button><button class="practice-card" id="sp3"><strong>3 · Gespräch</strong><small>Fragen beantworten und selbst zwei Fragen stellen</small></button><button class="practice-card" id="sp4"><strong>Alltag · Rollenspiele</strong><small>${D.roleplays.length} Situationen mit Modellantwort und Aufnahme</small></button></div>`;
  document.getElementById('backP').onclick=renderPractice;document.getElementById('sp1').onclick=startInterviewSession;document.getElementById('sp2').onclick=startInfoSession;document.getElementById('sp3').onclick=renderRoleplay;document.getElementById('sp4').onclick=renderEverydayRoleplay;
}
function startInterviewSession(){
  const cards=shuffle(D.interview).slice(0,10);let i=0;
  function draw(){if(i>=cards.length){view.innerHTML=`<section class="card center"><span class="pill green">10 FRAGEN GESCHAFFT</span><h2>Persönliche Präsentation</h2><p class="muted">Nutze die Fragen, um eine zusammenhängende Vorstellung von 1–2 Minuten vorzubereiten.</p><div class="button-row"><button class="secondary-btn" id="againInt">Neue Fragen</button><button class="primary-btn" id="backSpeak">Sprechen</button></div></section>`;document.getElementById('againInt').onclick=startInterviewSession;document.getElementById('backSpeak').onclick=renderSpeakingMenu;return;}const card=cards[i];view.innerHTML=`<div class="between"><button class="tiny-btn" id="backSpeak">← Sprechen</button><span class="pill">${i+1}/${cards.length}</span></div><section class="card" style="margin-top:12px"><div class="speaking-card"><div class="theme">Prüferfrage</div><div class="cue" style="font-size:24px">${esc(card.q)}</div>${speakBtn(card.q)}<p class="muted">Antworte in einfachen vollständigen Sätzen.</p>${recorderHtml('Int')}<div class="spacer"></div><button class="soft-btn" id="showExample">Beispiel anzeigen</button><div id="intExample"></div><div class="spacer"></div><button class="primary-btn" id="nextInt">Weiter</button></div></section>`;document.getElementById('backSpeak').onclick=renderSpeakingMenu;document.getElementById('showExample').onclick=()=>{document.getElementById('intExample').innerHTML=`<div class="solution">${esc(card.a)} ${speakBtn(card.a)}</div>`;wireSpeakButtons();};document.getElementById('nextInt').onclick=()=>{i++;draw();};wireSpeakButtons();wireRecorder('Int',()=>{const id='int-'+card.q;if(!state.speakingDone.includes(id)){state.speakingDone.push(id);save();}});if(audioEnabled)setTimeout(()=>speak(card.q),180);}
  draw();
}
function startInfoSession(){
  const topic=rand(D.oralTopics);const cards=shuffle(D.infoCards.filter(x=>x.theme===topic.aspects[0]||topic.aspects.includes(x.theme))).slice(0,5);
  view.innerHTML=`<div class="between"><button class="tiny-btn" id="backSpeak">← Sprechen</button><span class="pill">TAREA 2</span></div><section class="card" style="margin-top:12px"><h2>${esc(topic.title)}</h2><p class="muted">Wähle <strong>drei</strong> der fünf Aspekte und sprich ungefähr 2–3 Minuten. Notizen sind als Stichpunkte gedacht, nicht zum Ablesen.</p><div class="grid">${topic.aspects.map(a=>`<div class="speaking-card"><div class="cue" style="font-size:18px">${esc(a)}</div></div>`).join('')}</div>${recorderHtml('Topic')}<div class="spacer"></div><button class="soft-btn" id="showQuestions">Mögliche Prüferfragen</button><div id="topicQuestions"></div></section>`;
  document.getElementById('backSpeak').onclick=renderSpeakingMenu;document.getElementById('showQuestions').onclick=()=>{document.getElementById('topicQuestions').innerHTML=`<div class="solution">${topic.questions.map(q=>`• ${esc(q)}`).join('<br>')}</div>`;};wireRecorder('Topic',()=>{const id='topic-'+topic.id;if(!state.speakingDone.includes(id)){state.speakingDone.push(id);save();}});
}
function renderRoleplay(){
  const topic=rand(D.oralTopics),questions=shuffle(topic.questions).slice(0,4);
  view.innerHTML=`<div class="between"><button class="tiny-btn" id="backSpeak">← Sprechen</button><span class="pill">TAREA 3</span></div><section class="card" style="margin-top:12px"><h2>Gespräch: ${esc(topic.title)}</h2><p class="muted">Beantworte die Prüferfragen spontan. Stelle danach selbst <strong>zwei Fragen</strong> zum gleichen Thema.</p>${questions.map(q=>`<div class="phrase-row"><div><strong>${esc(q)}</strong></div>${speakBtn(q)}</div>`).join('')}${recorderHtml('Conv')}<div class="spacer"></div><button class="soft-btn" id="showConvHelp">Fragehilfe anzeigen</button><div id="convHelp"></div><div class="spacer"></div><button class="primary-btn" id="nextRole">Neues Thema</button></section>`;
  document.getElementById('backSpeak').onclick=renderSpeakingMenu;document.getElementById('showConvHelp').onclick=()=>{document.getElementById('convHelp').innerHTML=`<div class="solution"><strong>Eigene Fragen, z. B.:</strong><br>¿Y usted?<br>¿Qué hace normalmente?<br>¿Cuándo / dónde / con quién…?</div>`;};document.getElementById('nextRole').onclick=renderRoleplay;wireSpeakButtons();wireRecorder('Conv',()=>{const id='conv-'+topic.id;if(!state.speakingDone.includes(id)){state.speakingDone.push(id);save();}});
}

function renderEverydayRoleplay(){
  const card=rand(D.roleplays);
  view.innerHTML=`<div class="between"><button class="tiny-btn" id="backSpeak">← Sprechen</button><span class="pill">ALLTAGSTRAINING</span></div><section class="card" style="margin-top:12px"><div class="speaking-card"><div class="theme">${esc(card.cue)}</div><div class="cue" style="font-size:20px">${esc(card.prompt)}</div><p class="muted">Sprich frei und versuche, die Situation vollständig zu lösen.</p>${recorderHtml('Everyday')}<div class="spacer"></div><button class="soft-btn" id="showEverydayModel">Beispieldialog anzeigen</button><div id="everydayModel"></div><div class="spacer"></div><button class="primary-btn" id="nextEveryday">Neue Situation</button></div></section>`;
  document.getElementById('backSpeak').onclick=renderSpeakingMenu;
  document.getElementById('showEverydayModel').onclick=()=>{document.getElementById('everydayModel').innerHTML=`<div class="solution"><strong>Du:</strong> ${esc(card.request)} ${speakBtn(card.request)}<br><br><strong>Antwort:</strong> ${esc(card.response)} ${speakBtn(card.response)}</div>`;wireSpeakButtons();};
  document.getElementById('nextEveryday').onclick=renderEverydayRoleplay;
  wireRecorder('Everyday',()=>{const id='role-'+card.cue;if(!state.speakingDone.includes(id)){state.speakingDone.push(id);save();}});
}

function minsLeft(start,minutes){return Math.max(0,minutes-Math.floor((Date.now()-start)/60000));}
function renderExam(){
  view.innerHTML=`<section class="card hero"><span class="pill">DELE A1 · MODELO 2020</span><h2 style="margin-top:12px">Prüfungstraining</h2><p class="muted">Die Simulation folgt Aufbau und Zeitrahmen des bereitgestellten offiziellen DELE-A1-Modells. Die Aufgaben sind neu erstellt und keine Kopie des Modelltests.</p></section><section class="card"><h3>Offizielle Struktur</h3><div class="exam-structure"><div class="exam-line"><strong>Lesen</strong><small>4 tareas · 25 Fragen · 45 Min.</small><span>/25</span></div><div class="exam-line"><strong>Hören</strong><small>4 tareas · 25 Fragen · 25 Min. · Texte 2×</small><span>/25</span></div><div class="exam-line"><strong>Schreiben</strong><small>2 tareas · 25 Min. · Formular + 30–40 Wörter</small><span>2 Aufgaben</span></div><div class="exam-line"><strong>Sprechen</strong><small>3 tareas · 10 Min. Vorbereitung für 1 & 2</small><span>3 tareas</span></div></div></section><div class="grid"><button class="practice-card" id="examRead"><span class="icon">📖</span><strong>Lesen Simulation</strong><small>25 Fragen · 45 Min.</small></button><button class="practice-card" id="examListen"><span class="icon">🎧</span><strong>Hören Simulation</strong><small>25 Fragen · 25 Min. · max. 2×</small></button><button class="practice-card" id="examWrite"><span class="icon">✍️</span><strong>Schreiben Simulation</strong><small>Formular + 30–40 Wörter · 25 Min.</small></button><button class="practice-card" id="examSpeak"><span class="icon">🎤</span><strong>Sprechen Simulation</strong><small>Präsentation · Thema · Gespräch</small></button></div><section class="card quick-test-card"><div class="between"><h3>Schnelltest</h3><span class="pill gray">Bestwert ${state.bestMock}%</span></div><p class="muted">32 zufällige Hören-/Lesen-Aufgaben für eine schnelle Standortbestimmung.</p><button class="primary-btn" id="quickMock">Schnelltest starten</button></section>`;
  document.getElementById('examRead').onclick=startReadingExam;document.getElementById('examListen').onclick=startListeningExam;document.getElementById('examWrite').onclick=startWritingExam;document.getElementById('examSpeak').onclick=startSpeakingExam;document.getElementById('quickMock').onclick=startQuickMock;
}
function startListeningExam(){
  const counts=[5,5,8,7],tasks=[];counts.forEach((n,idx)=>shuffle(D.listening['part'+(idx+1)]).slice(0,n).forEach(t=>tasks.push([idx+1,t])));let i=0,score=0,start=Date.now();
  function next(){if(i>=tasks.length){const pct=Math.round(score/tasks.length*100);state.examScores.listening=Math.max(state.examScores.listening||0,pct);save(true);return examResult('Hören',score,tasks.length,pct);}const [p,t]=tasks[i++];renderListeningTask(p,true,ok=>{if(ok)score++;next();},t,`${i}/${tasks.length}`,`DELE Hören · ca. ${minsLeft(start,25)} Min. verbleibend`);}
  next();
}
function startReadingExam(){
  const counts=[5,6,6,8],tasks=[];counts.forEach((n,idx)=>shuffle(D.reading['part'+(idx+1)]).slice(0,n).forEach(t=>tasks.push([idx+1,t])));let i=0,score=0,start=Date.now();
  function next(){if(i>=tasks.length){const pct=Math.round(score/tasks.length*100);state.examScores.reading=Math.max(state.examScores.reading||0,pct);save(true);return examResult('Lesen',score,tasks.length,pct);}const [p,t]=tasks[i++];renderReadingTask(p,ok=>{if(ok)score++;next();},t,`${i}/${tasks.length}`,true,`DELE Lesen · ca. ${minsLeft(start,45)} Min. verbleibend`);}
  next();
}
function startWritingExam(){
  const form=D.forms[0],msg=rand(D.writing),start=Date.now();
  renderFormTask((formScore)=>renderMessageTask((textScore)=>{const trainingScore=Math.round((formScore/form.fields.length*10+textScore)/25*100);state.examScores.writing=Math.max(state.examScores.writing||0,trainingScore);save();view.innerHTML=`<section class="card center"><span class="pill green">SCHREIBEN ABGESCHLOSSEN</span><h2>Simulation beendet</h2><p class="muted">Du hast beide DELE-A1-Schreibaufgaben bearbeitet. Trainingswert: ${trainingScore} %. Der Textanteil beruht auf Selbstbewertung. Die echte Prüfung wird von Prüfern bewertet.</p><button class="primary-btn" id="backExam">Zur Prüfung</button></section>`;document.getElementById('backExam').onclick=renderExam;},msg,`DELE Schreiben · ca. ${minsLeft(start,25)} Min. verbleibend`),form,`DELE Schreiben · ca. ${minsLeft(start,25)} Min. verbleibend`);
}
function startSpeakingExam(){
  const topic=rand(D.oralTopics);let stage=0;
  function next(){stage++;
    if(stage===1){view.innerHTML=`<section class="card"><span class="pill">VORBEREITUNG · 10 MIN.</span><h2>Tarea 1 · Presentación personal</h2><p class="muted">Bereite eine persönliche Vorstellung von ungefähr 1–2 Minuten vor. Sprich über alle Punkte.</p><div class="grid">${['Nombre','Edad','Nacionalidad','Lugar donde vive','Profesión o estudios','Carácter / personalidad','Lenguas que habla'].map(x=>`<div class="speaking-card"><div class="cue" style="font-size:18px">${x}</div></div>`).join('')}</div>${recorderHtml('Exam1')}<div class="spacer"></div><button class="primary-btn" id="spNext">Weiter zu Tarea 2</button></section>`;wireRecorder('Exam1');document.getElementById('spNext').onclick=next;
    }else if(stage===2){view.innerHTML=`<section class="card"><span class="pill">TAREA 2 · 2–3 MIN.</span><h2>${esc(topic.title)}</h2><p class="muted">Wähle drei der fünf Aspekte. Du darfst deine Vorbereitungsnotizen ansehen, aber nicht ablesen.</p><div class="grid">${topic.aspects.map(x=>`<div class="speaking-card"><div class="cue" style="font-size:18px">${esc(x)}</div></div>`).join('')}</div>${recorderHtml('Exam2')}<div class="spacer"></div><button class="primary-btn" id="spNext">Weiter zu Tarea 3</button></section>`;wireRecorder('Exam2');document.getElementById('spNext').onclick=next;
    }else if(stage===3){view.innerHTML=`<section class="card"><span class="pill">TAREA 3 · 3–4 MIN.</span><h2>Conversación con el entrevistador</h2><p class="muted">Beantworte Fragen zum Thema <strong>${esc(topic.title)}</strong>. Stelle dem Prüfer anschließend selbst zwei Fragen zum gleichen Thema.</p>${shuffle(topic.questions).slice(0,5).map(q=>`<div class="phrase-row"><div><strong>${esc(q)}</strong></div>${speakBtn(q)}</div>`).join('')}${recorderHtml('Exam3')}<div class="spacer"></div><button class="primary-btn" id="spNext">Simulation beenden</button></section>`;wireSpeakButtons();wireRecorder('Exam3');document.getElementById('spNext').onclick=next;
    }else{state.speakingSimulationCompleted=true;save();view.innerHTML=`<section class="card center"><span class="pill green">SPRECHEN ABGESCHLOSSEN</span><h2>Simulation beendet</h2><p class="muted">Kontrolliere Verständlichkeit, einfache vollständige Aussagen und ob du in Tarea 3 selbst zwei Fragen gestellt hast. Die Aufnahme wird nicht automatisch bewertet; das Abschließen allein ergibt keine Punktzahl.</p><button class="primary-btn" id="backExam">Zur Prüfung</button></section>`;document.getElementById('backExam').onclick=renderExam;}
  }
  next();
}
function examResult(name,score,total,pct){
  view.innerHTML=`<section class="card center"><span class="pill ${pct>=60?'green':'amber'}">${esc(name.toUpperCase())}</span><div class="score">${pct}%</div><h2>${score}/${total}</h2><p class="muted">Trainingswert für diese Simulation. Die echte DELE-Bewertung folgt den offiziellen Bewertungskriterien.</p><div class="button-row"><button class="secondary-btn" id="againExam">Noch einmal</button><button class="primary-btn" id="backExam">Prüfung</button></div></section>`;
  document.getElementById('againExam').onclick=()=>name==='Hören'?startListeningExam():startReadingExam();document.getElementById('backExam').onclick=renderExam;
}
function startQuickMock(){
  const qs=[];for(let p=1;p<=4;p++)shuffle(D.listening['part'+p]).slice(0,4).forEach(t=>qs.push({kind:'l',part:p,t}));for(let p=1;p<=4;p++)shuffle(D.reading['part'+p]).slice(0,4).forEach(t=>qs.push({kind:'r',part:p,t}));let i=0,score=0;
  function next(){if(i>=qs.length){const pct=Math.round(score/qs.length*100);state.bestMock=Math.max(state.bestMock,pct);save(true);view.innerHTML=`<section class="card center"><span class="pill ${pct>=60?'green':'amber'}">SCHNELLTEST</span><div class="score">${pct}%</div><h2>${score}/${qs.length}</h2><p class="muted">Hören + Lesen. Für vollständige DELE-A1-Vorbereitung zusätzlich Schreiben und Sprechen trainieren.</p><div class="button-row"><button class="secondary-btn" id="againMock">Noch einmal</button><button class="primary-btn" id="backExam">Prüfung</button></div></section>`;document.getElementById('againMock').onclick=startQuickMock;document.getElementById('backExam').onclick=renderExam;return;}const q=qs[i++];if(q.kind==='l')renderListeningTask(q.part,true,ok=>{if(ok)score++;next();},q.t,`${i}/${qs.length}`);else renderReadingTask(q.part,ok=>{if(ok)score++;next();},q.t,`${i}/${qs.length}`,true);}
  next();
}

audioToggle.onclick=()=>{audioEnabled=!audioEnabled;localStorage.setItem('esA1AudioEnabled',String(audioEnabled));updateAudioButton();if(audioEnabled)speak('¡Hola! La lectura automática está activada.',true);else if('speechSynthesis' in window)speechSynthesis.cancel();};
document.getElementById('resetBtn').onclick=()=>{if(confirm('Fortschritt für Spanisch A1 in diesem Profil zurücksetzen?')){localStorage.removeItem(stateKey);state=loadState();save();setRoute(currentRoute);}};
updateAudioButton();
setRoute('home');
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js', {updateViaCache:'none'}).then(registration=>registration.update()).catch(()=>{}));
