const D=window.ES_A1_DATA;
const lessons=D.lessons;

const defaultState={
  doneLessons:[],lessonWork:{},
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
  if((!audioEnabled&&!force)||!text)return;
  A1Voice.speak(text,{lang:'es-ES',rate});
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
  const l=lessons.find(x=>x.id===id),c=window.A1_COURSE_CONTENT.find(x=>x.id===id);
  const introHtml=A1LessonGuide.intro(id,'de',esc,speakBtn,{referencesHtml:lessonGrammarReferenceHtml(id)});
  const dialogueHtml=A1LessonGuide.parts(id,'de',esc,speakBtn).dialogue;
  const model=(c.grammar.examples?.[0]?.[0]||l.phrases[0][0])+' '+l.phrases.slice(1,4).map(p=>p[0]).join(' ');
  A1LessonFlow.render({
    lesson:l,content:c,view,state,save,lessonCount:lessons.length,targetLang:'es',uiLang:'de',
    introHtml,dialogueHtml,pronunciationHtml:A1Pronunciation.render(c,'es','de'),
    model,recorderHtml:recorderHtml,
    repeatHint:'Höre die Beispiele an und sprich sie laut nach.',speak,speakBtn,wireSpeakButtons,playFeedbackAudio:playCorrectAudio,renderLesson,renderLearn
  });
}

function renderPractice(){
  view.innerHTML=`
    <section class="card hero"><h2>Üben</h2><p class="muted">Alle Kernbereiche des Spanisch-A1-Kurses mit Audio und zufälligen Aufgaben.</p></section>
    <div class="grid">
      <button class="practice-card" id="pVocab"><span class="icon">🧠</span><strong>Vokabeln</strong><small>${lessons.reduce((s,l)=>s+l.phrases.length,0)} Kernphrasen mit Audio</small></button>
      <button class="practice-card" id="pGrammar"><span class="icon">🧩</span><strong>Grammatik & Sprachbausteine</strong><small>${D.grammarSets.length} Sets · ${D.grammarSets.reduce((s,x)=>s+x.questions.length,0)} Fragen</small></button>
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

const GRAMMAR_GUIDES={"g1":"<p><strong>ser</strong>, <strong>estar</strong> und <strong>hay</strong> können im Deutschen alle mit „sein/es gibt“ zusammenhängen, werden im Spanischen aber unterschiedlich verwendet.</p><ul class=\"grammar-points\"><li><strong>ser</strong>: Identität, Herkunft, Beruf und eher dauerhafte Eigenschaften.</li><li><strong>estar</strong>: Ort, Zustand und vorübergehende Eigenschaften.</li><li><strong>hay</strong>: „es gibt / es befindet sich“ bei einer noch nicht bestimmten Sache; die Form bleibt unverändert.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>Yo soy estudiante.</strong><small>Ich bin Student/in.</small></div></div><div class=\"phrase-row\"><div><strong>Madrid está en España.</strong><small>Madrid liegt in Spanien.</small></div></div><div class=\"phrase-row\"><div><strong>Hay un supermercado cerca.</strong><small>Es gibt einen Supermarkt in der Nähe.</small></div></div><details class=\"grammar-detail\"><summary>ser – Präsens</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>yo</th><th>tú</th><th>él/ella/usted</th><th>nosotros/as</th><th>vosotros/as</th><th>ellos/ellas/ustedes</th></tr></thead><tbody><tr><td>soy</td><td>eres</td><td>es</td><td>somos</td><td>sois</td><td>son</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>estar – Präsens</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>yo</th><th>tú</th><th>él/ella/usted</th><th>nosotros/as</th><th>vosotros/as</th><th>ellos/ellas/ustedes</th></tr></thead><tbody><tr><td>estoy</td><td>estás</td><td>está</td><td>estamos</td><td>estáis</td><td>están</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>hay – wann benutze ich es?</summary><div class=\"grammar-detail-body\"><p><strong>hay</strong> bedeutet „es gibt“. Es ändert sich nicht: <em>Hay un banco. Hay dos bancos. No hay bancos aquí.</em></p><p>Für den Ort einer bestimmten Sache benutzt du dagegen <strong>estar</strong>: <em>El banco está aquí.</em></p></div></details>","g2":"<p>Spanische Nomen haben ein grammatisches Geschlecht. Artikel und Adjektive passen sich meist an Geschlecht und Zahl an.</p><ul class=\"grammar-points\"><li><strong>el / un</strong> meist maskulin, <strong>la / una</strong> meist feminin.</li><li>Im Plural: <strong>los/las</strong> und <strong>unos/unas</strong>.</li><li>Adjektive auf <strong>-o</strong> wechseln oft zu <strong>-a</strong>; im Plural kommt <strong>-s</strong> hinzu.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>la casa blanca</strong><small>das weiße Haus</small></div></div><div class=\"phrase-row\"><div><strong>los coches rojos</strong><small>die roten Autos</small></div></div><div class=\"phrase-row\"><div><strong>las ciudades</strong><small>die Städte</small></div></div><details class=\"grammar-detail\"><summary>Artikelübersicht</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th></th><th>maskulin</th><th>feminin</th></tr></thead><tbody><tr><td>bestimmt Singular</td><td>el</td><td>la</td></tr><tr><td>unbestimmt Singular</td><td>un</td><td>una</td></tr><tr><td>bestimmt Plural</td><td>los</td><td>las</td></tr><tr><td>unbestimmt Plural</td><td>unos</td><td>unas</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>Pluralbildung</summary><div class=\"grammar-detail-body\"><p>Nach Vokal meist <strong>-s</strong>: <em>hotel → hoteles</em> (hier Konsonant, daher -es); nach Konsonant meist <strong>-es</strong>: <em>ciudad → ciudades</em>.</p></div></details><details class=\"grammar-detail\"><summary>Adjektive anpassen</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Singular</th><th>Plural</th></tr></thead><tbody><tr><td>casa pequeña</td><td>casas pequeñas</td></tr><tr><td>coche rojo</td><td>coches rojos</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>Wichtige Genus-Ausnahmen</summary><div class=\"grammar-detail-body\"><p>Nicht nur auf die Endung verlassen: <strong>el problema</strong> ist maskulin, <strong>la mano</strong> feminin. Lerne Nomen am besten mit Artikel.</p></div></details>","g3":"<p>Regelmäßige Verben werden nach ihrer Infinitivendung in <strong>-ar, -er, -ir</strong> eingeteilt. Du entfernst die Endung und setzt die Personenendung ein.</p><ul class=\"grammar-points\"><li>Die Person ist oft schon an der Verbendung erkennbar.</li><li>Die Endungen für <strong>nosotros</strong> und <strong>vosotros</strong> sind besonders markant.</li><li>Diese Tabelle deckt alle Formen ab, die im Quiz vorkommen.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>Yo hablo español.</strong><small>Ich spreche Spanisch.</small></div></div><div class=\"phrase-row\"><div><strong>Nosotros comemos en casa.</strong><small>Wir essen zu Hause.</small></div></div><div class=\"phrase-row\"><div><strong>Ellas viven en Madrid.</strong><small>Sie wohnen in Madrid.</small></div></div><details class=\"grammar-detail\"><summary>Endungen im Präsens</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Person</th><th>-ar: hablar</th><th>-er: comer</th><th>-ir: vivir</th></tr></thead><tbody><tr><td>yo</td><td>hablo</td><td>como</td><td>vivo</td></tr><tr><td>tú</td><td>hablas</td><td>comes</td><td>vives</td></tr><tr><td>él/ella/usted</td><td>habla</td><td>come</td><td>vive</td></tr><tr><td>nosotros/as</td><td>hablamos</td><td>comemos</td><td>vivimos</td></tr><tr><td>vosotros/as</td><td>habláis</td><td>coméis</td><td>vivís</td></tr><tr><td>ellos/ellas/ustedes</td><td>hablan</td><td>comen</td><td>viven</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>Weitere Verben aus den Übungen</summary><div class=\"grammar-detail-body\"><p><strong>trabajar</strong> wie hablar · <strong>estudiar</strong> wie hablar · <strong>tomar</strong> wie hablar · <strong>beber</strong> wie comer · <strong>escribir</strong> und <strong>abrir</strong> wie vivir.</p></div></details>","g4":"<p>Diese vier sehr häufigen Verben sind unregelmäßig und sollten als Formen gelernt werden.</p><ul class=\"grammar-points\"><li><strong>tener</strong> = haben; Alter wird mit tener ausgedrückt.</li><li><strong>ir</strong> = gehen/fahren; <strong>hacer</strong> = machen; <strong>poder</strong> = können.</li><li>Bei <strong>poder</strong> verändert sich der Stamm in mehreren Formen: o → ue.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>Tengo treinta años.</strong><small>Ich bin 30 Jahre alt.</small></div></div><div class=\"phrase-row\"><div><strong>Vamos al centro.</strong><small>Wir fahren ins Zentrum.</small></div></div><div class=\"phrase-row\"><div><strong>¿Puedo pagar con tarjeta?</strong><small>Kann ich mit Karte bezahlen?</small></div></div><details class=\"grammar-detail\"><summary>tener – Präsens</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>yo</th><th>tú</th><th>él/ella</th><th>nosotros</th><th>vosotros</th><th>ellos</th></tr></thead><tbody><tr><td>tengo</td><td>tienes</td><td>tiene</td><td>tenemos</td><td>tenéis</td><td>tienen</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>ir – Präsens</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>yo</th><th>tú</th><th>él/ella</th><th>nosotros</th><th>vosotros</th><th>ellos</th></tr></thead><tbody><tr><td>voy</td><td>vas</td><td>va</td><td>vamos</td><td>vais</td><td>van</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>hacer – Präsens</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>yo</th><th>tú</th><th>él/ella</th><th>nosotros</th><th>vosotros</th><th>ellos</th></tr></thead><tbody><tr><td>hago</td><td>haces</td><td>hace</td><td>hacemos</td><td>hacéis</td><td>hacen</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>poder – Präsens</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>yo</th><th>tú</th><th>él/ella</th><th>nosotros</th><th>vosotros</th><th>ellos</th></tr></thead><tbody><tr><td>puedo</td><td>puedes</td><td>puede</td><td>podemos</td><td>podéis</td><td>pueden</td></tr></tbody></table></div></div></details>","g5":"<p><strong>gustar</strong> funktioniert anders als das deutsche „mögen“: Grammatisch ist die gemochte Sache das Subjekt.</p><ul class=\"grammar-points\"><li><strong>gusta</strong> vor einem Singular oder Infinitiv.</li><li><strong>gustan</strong> vor einem Plural.</li><li>Davor stehen Pronomen wie <strong>me, te, le, nos, os, les</strong>.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>Me gusta el café.</strong><small>Ich mag Kaffee.</small></div></div><div class=\"phrase-row\"><div><strong>Me gustan las películas.</strong><small>Ich mag Filme.</small></div></div><div class=\"phrase-row\"><div><strong>Nos gusta viajar.</strong><small>Wir reisen gern.</small></div></div><details class=\"grammar-detail\"><summary>Pronomen bei gustar</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Person</th><th>Pronomen</th><th>Beispiel</th></tr></thead><tbody><tr><td>ich</td><td>me</td><td>Me gusta.</td></tr><tr><td>du</td><td>te</td><td>Te gusta.</td></tr><tr><td>er/sie/Sie</td><td>le</td><td>Le gusta.</td></tr><tr><td>wir</td><td>nos</td><td>Nos gusta.</td></tr><tr><td>ihr</td><td>os</td><td>Os gusta.</td></tr><tr><td>sie/Sie</td><td>les</td><td>Les gusta.</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>gusta oder gustan?</summary><div class=\"grammar-detail-body\"><p><strong>gusta</strong> + Singular/Infinitiv: <em>Me gusta la carne. Nos gusta viajar.</em><br><strong>gustan</strong> + Plural: <em>Te gustan los deportes.</em></p></div></details><details class=\"grammar-detail\"><summary>preferir – bevorzugen</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>yo</th><th>tú</th><th>él/ella</th><th>nosotros</th><th>vosotros</th><th>ellos</th></tr></thead><tbody><tr><td>prefiero</td><td>prefieres</td><td>prefiere</td><td>preferimos</td><td>preferís</td><td>prefieren</td></tr></tbody></table></div><p><em>Preferimos el tren.</em></p></div></details><details class=\"grammar-detail\"><summary>Zustimmen und vergleichen</summary><div class=\"grammar-detail-body\"><p><strong>A mí también.</strong> = Mir auch.<br><strong>más … que</strong> = mehr … als: <em>Me gusta más el té que el café.</em></p></div></details>","g6":"<p>Fragewörter stehen im Spanischen mit Akzent, wenn sie als Frage verwendet werden. Sie leiten direkte Informationsfragen ein.</p><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>¿Dónde vives?</strong><small>Wo wohnst du?</small></div></div><div class=\"phrase-row\"><div><strong>¿Cuánto cuesta?</strong><small>Wie viel kostet es?</small></div></div><div class=\"phrase-row\"><div><strong>¿Por qué estudias español?</strong><small>Warum lernst du Spanisch?</small></div></div><details class=\"grammar-detail\"><summary>Fragewörter – Übersicht</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Spanisch</th><th>Deutsch</th></tr></thead><tbody><tr><td>qué</td><td>was</td></tr><tr><td>quién / quiénes</td><td>wer</td></tr><tr><td>dónde</td><td>wo</td></tr><tr><td>cuándo</td><td>wann</td></tr><tr><td>cómo</td><td>wie</td></tr><tr><td>cuánto/a/os/as</td><td>wie viel / wie viele</td></tr><tr><td>por qué</td><td>warum</td></tr><tr><td>cuál / cuáles</td><td>welcher / welche</td></tr><tr><td>con quién</td><td>mit wem</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>Cuánto passt sich an</summary><div class=\"grammar-detail-body\"><p>Vor einem Nomen passt sich <strong>cuánto</strong> an Geschlecht und Zahl an: <em>¿Cuántos años tienes?</em></p></div></details><details class=\"grammar-detail\"><summary>Fragezeichen</summary><div class=\"grammar-detail-body\"><p>Direkte Fragen werden mit <strong>¿</strong> geöffnet und mit <strong>?</strong> geschlossen: <em>¿Cómo te llamas?</em></p></div></details>","g7":"<p>Präpositionen zeigen Ziel, Herkunft, Ort und Lage. Einige Verbindungen werden im Spanischen zusammengezogen.</p><ul class=\"grammar-points\"><li><strong>a</strong> = zu/nach, <strong>de</strong> = von/aus, <strong>en</strong> = in/an/mit (Verkehrsmittel).</li><li><strong>a + el = al</strong> und <strong>de + el = del</strong>.</li><li>Lageausdrücke wie <strong>al lado de</strong>, <strong>delante de</strong> und <strong>cerca de</strong> werden als feste Blöcke gelernt.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>Voy a Madrid.</strong><small>Ich fahre nach Madrid.</small></div></div><div class=\"phrase-row\"><div><strong>Vengo de Alemania.</strong><small>Ich komme aus Deutschland.</small></div></div><div class=\"phrase-row\"><div><strong>Voy en autobús.</strong><small>Ich fahre mit dem Bus.</small></div></div><details class=\"grammar-detail\"><summary>a / de / en</summary><div class=\"grammar-detail-body\"><div class=\"grammar-table-wrap\"><table class=\"grammar-table\"><thead><tr><th>Präposition</th><th>Funktion</th><th>Beispiel</th></tr></thead><tbody><tr><td>a</td><td>Ziel</td><td>Voy a Madrid.</td></tr><tr><td>de</td><td>Herkunft / Ausgangspunkt</td><td>Vengo de Alemania. / Salgo de casa.</td></tr><tr><td>en</td><td>Ort / Verkehrsmittel</td><td>Trabajo en una oficina. / Voy en autobús.</td></tr></tbody></table></div></div></details><details class=\"grammar-detail\"><summary>al und del</summary><div class=\"grammar-detail-body\"><p><strong>a + el = al</strong>: <em>Vamos al cine.</em><br><strong>de + el = del</strong>: <em>al lado del hotel.</em></p></div></details><details class=\"grammar-detail\"><summary>Lagewörter</summary><div class=\"grammar-detail-body\"><p><strong>al lado de</strong> neben · <strong>delante de</strong> vor · <strong>sobre</strong> auf · <strong>cerca de</strong> in der Nähe von</p></div></details>","g8":"<p>Hier lernst du kurze feste Wendungen, die in typischen A1-Situationen und in Prüfungsaufgaben häufig vorkommen.</p><ul class=\"grammar-points\"><li>Lerne diese Wendungen am besten als komplette Sprachbausteine.</li><li>Achte auf Höflichkeitsformen wie <strong>por favor</strong> und <strong>perdón</strong>.</li><li>Für Prüfungsanweisungen reicht es, zentrale Verben wie <strong>marque</strong> zu erkennen.</li></ul><h3>Beispiele</h3><div class=\"phrase-row\"><div><strong>La cuenta, por favor.</strong><small>Die Rechnung, bitte.</small></div></div><div class=\"phrase-row\"><div><strong>¿Puede repetirlo?</strong><small>Können Sie das wiederholen?</small></div></div><div class=\"phrase-row\"><div><strong>¿Cómo llego a la estación?</strong><small>Wie komme ich zum Bahnhof?</small></div></div><details class=\"grammar-detail\"><summary>Restaurant & Einkaufen</summary><div class=\"grammar-detail-body\"><p><strong>La cuenta, por favor.</strong> Die Rechnung, bitte.<br><strong>Quiero comprar esto.</strong> Ich möchte das kaufen.</p></div></details><details class=\"grammar-detail\"><summary>Verstehen & Weg fragen</summary><div class=\"grammar-detail-body\"><p><strong>¿Puede repetirlo?</strong> Können Sie das wiederholen?<br><strong>¿Cómo llego a la estación?</strong> Wie komme ich zum Bahnhof?</p></div></details><details class=\"grammar-detail\"><summary>Termin, Verspätung & Höflichkeit</summary><div class=\"grammar-detail-body\"><p><strong>Necesito una cita.</strong> Ich brauche einen Termin.<br><strong>Llego un poco tarde.</strong> Ich komme etwas später.<br><strong>Por favor.</strong> Bitte. · <strong>Perdón.</strong> Entschuldigung. · <strong>De nada.</strong> Gern geschehen.</p></div></details><details class=\"grammar-detail\"><summary>Typische Prüfungsanweisung</summary><div class=\"grammar-detail-body\"><p><strong>Marque la opción correcta.</strong> = Markieren Sie die richtige Antwort.</p></div></details>"};

const LESSON_GRAMMAR_REFS={
  1:[['g1',[0]],['g3',[0]]],
  2:[['g6',[0]],['g4',[3]]],
  3:[],
  4:[['g1',[0,1,2]]],
  5:[['g4',[0]]],
  6:[['g3',[0]]],
  7:[],
  8:[['g5',[0,1]],['g8',[0]]],
  9:[['g6',[1]]],
  10:[['g1',[1,2]]],
  11:[['g7',[0,1,2]]],
  12:[['g3',[0,1]]],
  13:[['g5',[0,1]],['g4',[1]]],
  14:[['g4',[2]],['g2',[2]]],
  15:[['g4',[1]],['g8',[0]]],
  16:[['g4',[0]]],
  17:[['g4',[3]]],
  18:[['g3',[0]],['g8',[0]]],
  19:[['g3',[0,1]]],
  20:[['g4',[0,1,2,3]]],
  21:[['g2',[0,1,2,3]]],
  22:[['g6',[0,1,2]],['g7',[1]]],
  23:[],
  24:[['g3',[0]],['g6',[0]]]
};
function lessonGrammarReferenceHtml(id){
  return A1GrammarUI.pickDetails(GRAMMAR_GUIDES,LESSON_GRAMMAR_REFS[id]||[])+A1LessonTopicInfo.render('spanisch',id);
}

function renderGrammarIntro(id){
  const set=D.grammarSets.find(x=>x.id===id);
  if(!set)return renderGrammarMenu();
  view.innerHTML=`<div class="between"><button class="tiny-btn" id="backGrammarIntro">← Grammatik</button><span class="pill">${esc(set.title)}</span></div><section class="card" style="margin-top:12px"><h2>${esc(set.title)}</h2><p class="muted">${esc(set.subtitle)}</p><hr class="soft">${A1GrammarUI.reorderGuide(GRAMMAR_GUIDES[id]||'')}<div class="grammar-study-hint">💡 Klappe die Übersichten auf, wenn du eine Form nachschlagen möchtest. Alles, was du für die folgenden Aufgaben brauchst, findest du auf dieser Seite.</div><div class="spacer"></div><button class="primary-btn" id="startGrammarPractice">10 Fragen üben</button></section>`;
  document.getElementById('backGrammarIntro').onclick=renderGrammarMenu;
  document.getElementById('startGrammarPractice').onclick=()=>startGrammarSet(id);
}

function renderGrammarMenu(){
  view.innerHTML=`<div class="between"><button class="tiny-btn" id="backP">← Üben</button><span class="pill">GRAMMATIK & SPRACHBAUSTEINE</span></div><section class="card" style="margin-top:12px"><h2>A1 Grammatik & Sprachbausteine</h2><p class="muted">Je Set 10 Fragen zu zentralen spanischen A1-Strukturen.</p></section><div class="list">${D.grammarSets.map(s=>`<button class="practice-card" data-gset="${esc(s.id)}"><strong>${esc(s.title)}</strong><small>${esc(s.subtitle)} · Bestwert ${state.grammarBest[s.id]||0}%</small></button>`).join('')}</div>`;
  document.getElementById('backP').onclick=renderPractice;
  document.querySelectorAll('[data-gset]').forEach(b=>b.onclick=()=>renderGrammarIntro(b.dataset.gset));
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

A1Voice.mount({lang:'es-ES',uiLang:'de'});
audioToggle.onclick=()=>{audioEnabled=!audioEnabled;localStorage.setItem('esA1AudioEnabled',String(audioEnabled));updateAudioButton();if(audioEnabled)speak('¡Hola! La lectura automática está activada.',true);else A1Voice.cancel();};
document.getElementById('resetBtn').onclick=()=>{if(confirm('Fortschritt für Spanisch A1 in diesem Profil zurücksetzen?')){localStorage.removeItem(stateKey);state=loadState();save();setRoute(currentRoute);}};
updateAudioButton();
setRoute('home');
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js', {updateViaCache:'none'}).then(registration=>registration.update()).catch(()=>{}));
