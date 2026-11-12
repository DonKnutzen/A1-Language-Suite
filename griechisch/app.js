(() => {
  'use strict';
  const D=window.EL_A1_DATA,C=window.EL_A1,view=document.getElementById('view');
  const base='griechischA1State_v1',course='griechisch-a1';
  const defaults={doneLessons:[],lessonMasteryBest:{},lessonQuizBest:{},lessonWork:{},reviewPractice:{},writingDrafts:{},alphabetBest:{},courseMasteryBest:{},lastLessonId:0};
  const key=()=>A1Profile.namespacedKey(base);
  let state=A1Learning.loadState(key(),defaults),route='home',activeLesson=1,activeStep=0,session=null,cloudPending=false;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const button=(label,attrs='')=>`<button type="button" class="el-secondary" ${attrs}>${label}</button>`;
  const primary=(label,attrs='')=>`<button type="button" class="el-primary" ${attrs}>${label}</button>`;
  const audio=t=>button('🔊 Anhören',`data-audio="${esc(t)}"`);
  const shuffle=a=>A1Learning.shuffle(a);
  const card=(title,body)=>`<section class="el-card"><h2>${esc(title)}</h2>${body}</section>`;
  function save(completed=false){
    C.completion(state);
    try{localStorage.setItem(key(),JSON.stringify(state));}catch{status('Dein Fortschritt konnte auf diesem Gerät nicht gespeichert werden. Prüfe den Browserspeicher.');}
    A1Profile.saveProgress(course,state,C.completion(state));
    if(completed)window.A1Streak?.completeExercise();
  }
  window.A1CourseProgressPercent=()=>C.completion(state);
  window.A1ApplyCloudProgress=()=>{cloudPending=true;if(!session&&route==='home'){reloadCloud();home();}};
  function reloadCloud(){if(cloudPending){state=A1Learning.loadState(key(),defaults);cloudPending=false;}}
  function status(message){let el=document.getElementById('audioStatus');if(!el){el=document.createElement('p');el.id='audioStatus';el.setAttribute('role','status');view.prepend(el);}el.textContent=message;}
  function hasVoice(){return Boolean(window.speechSynthesis?.getVoices().some(v=>/^el(?:-|$)/i.test(v.lang)));}
  function speak(t){
    if(!hasVoice()){status('Keine griechische Stimme verfügbar. Aktiviere in den Geräte- oder Browsereinstellungen eine griechische Stimme und lade die Stimmen neu. Hörfragen kannst du überspringen; sie werden dann nicht als richtig gewertet.');return false;}
    A1Voice.speak(t,{lang:'el-GR',rate:.8});return true;
  }
  function wireAudio(){view.querySelectorAll('[data-audio]').forEach(b=>b.onclick=()=>speak(b.dataset.audio));}
  function shell(html){view.innerHTML=html;wireAudio();window.scrollTo?.({top:0,behavior:'smooth'});}
  function navigate(next){
    window.A1Voice?.cancel();reloadCloud();session=null;route=next;
    document.querySelectorAll('[data-route]').forEach(b=>b.classList.toggle('active',b.dataset.route===route));
    ({home,learn,alphabet,review,exam}[next]||home)();
  }
  document.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>navigate(b.dataset.route));
  A1Voice.mount({lang:'el-GR',uiLang:'de'});
  function home(){
    const pct=C.completion(state),last=D.lessons.find(l=>l.id===state.lastLessonId&&!state.doneLessons.includes(l.id)),next=last||D.lessons.find(l=>!state.doneLessons.includes(l.id))||D.lessons[23];
    shell(`<section class="el-hero"><span class="el-tag">Griechisch für den ersten Schritt</span><h2>Καλημέρα! Dein A1-Kurs.</h2><p>Starte ohne Vorkenntnisse. Lerne erste Gespräche, entdecke die Schrift und baue Schritt für Schritt deinen Alltag auf Griechisch auf.</p><span class="el-badge">24 Lektionen · 4 Fertigkeiten · Schrifttrainer</span></section>
      ${card('Dein Lernweg',`<p>${state.doneLessons.length} von 24 Lektionen abgeschlossen · ${pct} %</p><progress class="el-meter" max="100" value="${pct}">${pct}%</progress><p>Weiter mit ${next.id}. ${esc(next.title)}</p><div class="el-actions">${primary('Weiterlernen','id="continue"')}${button('Schrift entdecken','id="startAlphabet"')}</div><p class="el-muted">Eine Lektion gilt als abgeschlossen, wenn du im Wissenscheck mindestens 80 % erreichst und die Sprech- und Schreibaufgabe anhand der Kriterien selbst geprüft hast.</p>`)}
      <div class="el-grid">${card('So lernst du', '<p>Beginne mit Begrüßungen. Übe danach die Buchstaben in vier kleinen Gruppen. Jede Lektion führt von Beispielen über Regeln und Dialoge zum eigenen Sprechen und Schreiben. Wiederhole Fehler mit zeitlichem Abstand.</p>')}${card('Hören & Aussprache','<p>Die Audioausgabe nutzt eine griechische Geräte- oder Browserstimme. Unter „Stimme & Tempo“ kannst du sie auswählen. Ohne passende Stimme bleiben alle Texte lesbar; Hörverstehen wird dabei nicht bescheinigt.</p>')}</div>
      ${card('Eigene Inhalte, klare Orientierung','<p>Der Lernpfad orientiert sich an NEOHEL, die Aufgabenvielfalt an ΚΛΙΚ und die vier Fertigkeiten an den A1-Modellprüfungen des Zentrums für griechische Sprache. Alle App-Texte und Aufgaben sind eigene Inhalte. Der A1-Check ist eine Lernstandskontrolle ohne Zertifizierung.</p><a href="LEHRPLAN-A1.md">Lehrplan, Quellen und Grenzen</a>')}`);
    document.getElementById('continue').onclick=()=>lesson(next.id,Math.min(7,Math.max(0,Number(state.lessonWork[next.id]?.step)||0)));
    document.getElementById('startAlphabet').onclick=()=>navigate('alphabet');
  }
  function learn(){
    shell(`<h2>Dein Kurs von Anfang an</h2><p>Schrift und Alltag wachsen zusammen. Alle Lektionen sind frei zugänglich. Folge als Anfänger der Reihenfolge.</p><div class="el-grid">${D.lessons.map(l=>`<section class="el-card"><span class="el-tag">Lektion ${l.id}${l.id<=3?' · Einstieg':''}</span><h3>${esc(l.title)}</h3><p>${esc(l.goal)}</p><p class="el-muted">Wissenscheck: ${state.lessonMasteryBest[l.id]||0} % ${state.doneLessons.includes(l.id)?'· ✓ abgeschlossen':''}</p>${button('Lektion öffnen',`data-lesson="${l.id}"`)}</section>`).join('')}</div>`);
    view.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>lesson(Number(b.dataset.lesson),0));
  }
  const steps=['Einstieg','Wendungen','Grammatik','Dialog','Training','Lesen & Hören','Selbst anwenden','Wissenscheck'];
  function lesson(id,step=0){
    reloadCloud();session=null;route='lesson';activeLesson=id;activeStep=step;state.lastLessonId=id;(state.lessonWork[id]||={}).step=step;save();
    const l=D.lessons.find(x=>x.id===id);
    shell(`<div class="el-actions">${button('← Alle Lektionen','id="allLessons"')}</div><span class="el-tag">Lektion ${id} / 24</span><h2>${esc(l.title)}</h2><p>${esc(l.goal)}</p><nav class="el-steps" aria-label="Lektionsschritte">${steps.map((s,i)=>`<button type="button" data-step="${i}" ${i===step?'aria-current="step"':''}>${i+1}. ${s}</button>`).join('')}</nav><div id="lessonContent"></div><div class="el-actions">${step>0?button('← Zurück','id="prevStep"'):''}${step<7?primary('Weiter →','id="nextStep"'):''}</div>`);
    document.getElementById('allLessons').onclick=()=>navigate('learn');
    view.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>lesson(id,Number(b.dataset.step)));
    document.getElementById('prevStep')?.addEventListener('click',()=>lesson(id,step-1));
    document.getElementById('nextStep')?.addEventListener('click',()=>lesson(id,step+1));
    const area=document.getElementById('lessonContent');
    if(step===0){
      area.innerHTML=card('Heute kannst du …',`<p>${esc(l.goal)}</p><p>Höre die erste Wendung, sprich sie nach und beobachte die betonte Silbe.</p><p class="el-greek" lang="el">${esc(l.phrases[0].el)}</p><p>${esc(l.phrases[0].de)}</p>${audio(l.phrases[0].el)}${id<=3?'<p>Öffne zusätzlich den Schrifttrainer. Du musst nicht alle Buchstaben beherrschen, bevor du erste Wendungen sprichst.</p>':''}`);
    }else if(step===1){
      area.innerHTML=card('Hören, lesen, nachsprechen',`${l.phrases.some(p=>p.hint)?'<label><input id="readingAid" type="checkbox" checked> Ungefähre Lesehilfe anzeigen</label><p class="el-muted">Die Lesehilfe ersetzt die griechische Aussprache nicht. Der Akzent markiert die betonte Silbe. Blende sie nach dem ersten Durchgang aus.</p>':''}${l.phrases.map(p=>`<div class="el-phrase"><div><p class="el-greek" lang="el">${esc(p.el)}</p><p>${esc(p.de)}</p>${p.hint?`<small data-hint>${esc(p.hint)}</small>`:''}</div><div>${audio(p.el)}</div></div>`).join('')}`);
      document.getElementById('readingAid')?.addEventListener('change',e=>area.querySelectorAll('[data-hint]').forEach(el=>el.hidden=!e.target.checked));
    }else if(step===2){
      area.innerHTML=card('Verstehen statt raten',`<p>${esc(l.rule)}</p><h3>Im Satz beobachten</h3>${l.phrases.slice(0,3).map(p=>`<p lang="el" class="el-greek">${esc(p.el)} ${audio(p.el)}</p><p>${esc(p.de)}</p>`).join('')}<p class="el-muted">Lies die Regel erneut und suche im Beispiel die beschriebene Form. Die Übungen erklären anschließend jede Lösung.</p>`);
    }else if(step===3){
      area.innerHTML=card('Ein Gespräch, zwei Rollen',`<p>Lies zuerst Rolle A, dann Rolle B. Verdecke anschließend einzelne Zeilen und antworte aus dem Gedächtnis.</p>${l.dialogue.map((s,i)=>`<div class="el-dialogue"><strong>Rolle ${i%2?'B':'A'}</strong><p class="el-greek" lang="el">${esc(s)}</p>${audio(s)}<details><summary>Bedeutung zeigen</summary><p>${esc(l.dialogueDe[i])}</p></details></div>`).join('')}<p>Ändere Namen, Orte oder Wünsche so, dass ein neues Gespräch entsteht.</p>`);
    }else if(step===4){
      area.innerHTML=card('Gemischtes Training',`<p>Wendungen erkennen, Regeln anwenden, Informationen verstehen. Jede Antwort erhält eine Erklärung. Der Wissenscheck verlangt später auch eigene Eingaben.</p>${primary('Training starten','id="startPractice"')}`);
      document.getElementById('startPractice').onclick=()=>start(C.tasks(l),{mode:'practice',lessonId:id,title:l.title});
    }else if(step===5){
      area.innerHTML=card('Lesen',`<p class="el-greek el-question-source" lang="el">${esc(l.reading.body)}</p>${primary('Leseaufgaben starten','id="readTasks"')}`)+card('Hören',`<p>Höre ohne Transkript. Achte auf Personen, Zahlen, Zeiten und Orte.</p>${audio(l.listening.body)}<div class="el-actions">${primary('Höraufgaben starten','id="listenTasks"')}</div><details><summary>Transkript zur Nacharbeit</summary><p lang="el" class="el-greek">${esc(l.listening.body)}</p><p>Wenn du den Text gelesen hast, nutze die Fragen als Leseübung. Für echtes Hörtraining starte später erneut ohne Transkript.</p></details>`);
      document.getElementById('readTasks').onclick=()=>start(C.tasks(l).filter(t=>t.kind==='reading'),{mode:'reading',lessonId:id,title:'Leseverstehen'});
      document.getElementById('listenTasks').onclick=()=>start(C.tasks(l).filter(t=>t.kind==='listening'),{mode:'listening',lessonId:id,title:'Hörverstehen'});
    }else if(step===6){production(l,area);}
    else{
      area.innerHTML=card('Dein Lektionscheck',`<p>Alle ${l.phrases.length} Kernwendungen als Eingabe, ${l.grammar.length} Grammatikfragen, ${l.transfer.length} neue Transferfragen sowie je ${l.reading.questions.length} Lese- und ${l.listening.questions.length} Hörfragen. Kein Kernpunkt wird zufällig ausgelassen. Bestehensgrenze: 80 %. Betonungsfehler erhalten einen Hinweis und brauchen eine Korrektur.</p><p class="el-muted">Sprechen und Schreiben prüfst du zusätzlich selbst. Ein bestandener Wissenscheck allein schließt die Lektion noch nicht ab.</p>${primary('Wissenscheck beginnen','id="startCheck"')}`);
      document.getElementById('startCheck').onclick=()=>start(C.tasks(l,'check'),{mode:'check',lessonId:id,title:`Wissenscheck ${id}`});
    }
    wireAudio();
  }
  function keyboard(input){
    const el=document.createElement('div');el.className='el-keyboard';el.setAttribute('role','group');el.setAttribute('aria-label','Griechische Eingabehilfe');
    for(const char of 'αβγδεζηθικλμνξοπρσςτυφχψωάέήίόύώϊϋΐΰΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩΆΈΉΊΌΎΏ ;'){
      const b=document.createElement('button');b.type='button';b.textContent=char===' '?'␣':char;b.setAttribute('aria-label',char===' '?'Leerzeichen':char);b.onclick=()=>{const s=input.selectionStart??input.value.length,e=input.selectionEnd??s;input.value=input.value.slice(0,s)+char+input.value.slice(e);input.focus();input.setSelectionRange(s+char.length,s+char.length);input.dispatchEvent(new Event('input',{bubbles:true}));};el.append(b);
    }
    input.insertAdjacentElement('afterend',el);
  }
  function production(l,area){
    const work=state.lessonWork[l.id]||{};
    area.innerHTML=card('Schreiben: selbst formulieren',`<p>${esc(l.writing)}</p><label for="writingDraft">Dein Text auf Griechisch</label><textarea id="writingDraft" lang="el" spellcheck="false"></textarea><p id="draftStatus" role="status"></p><details><summary>Beispiel erst nach deinem Versuch ansehen</summary><p lang="el" class="el-greek">${esc(l.model)}</p><p>Das ist eine mögliche Lösung. Dein eigener Text darf anders lauten.</p></details><div class="el-checklist"><label><input type="checkbox" id="wTask"> Ich habe alle Angaben der Aufgabe genannt.</label><label><input type="checkbox" id="wForms"> Ich habe Formen und Betonungszeichen mit der Lektion verglichen.</label><label><input type="checkbox" id="wMeaning"> Mein Text ist ohne deutsche Hilfswörter verständlich.</label></div>${button(work.writing?'✓ Schreiben selbst geprüft':'Schreiben als selbst geprüft speichern','id="saveWriting"')}`)+
      card('Sprechen: ohne Vorlage',`<p>${esc(l.speaking)}</p><p><strong>Selbstcheck:</strong> Habe ich alle Sprachhandlungen ausgeführt? Sind die Schlüsselwörter verständlich? Habe ich auf der richtigen Silbe betont?</p><div class="el-actions"><button id="startRecEl" type="button" class="el-secondary">Aufnehmen</button><button id="stopRecEl" type="button" class="el-secondary" disabled>Stoppen</button></div><p id="recStatusEl" role="status"></p><div id="playbackEl"></div><p class="el-muted">Aufnahme optional, nur auf diesem Gerät während der Sitzung. Keine automatische Aussprachebewertung. Du kannst auch ohne Mikrofon laut sprechen und dich selbst prüfen.</p><label><input type="checkbox" id="spoken"> Ich habe frei gesprochen und die drei Kriterien geprüft.</label><div class="el-actions">${button(work.speaking?'✓ Sprechen selbst geprüft':'Sprechen als selbst geprüft speichern','id="saveSpeaking"')}</div>`);
    const draft=document.getElementById('writingDraft');draft.value=state.writingDrafts[l.id]||'';keyboard(draft);
    let timer;draft.oninput=()=>{clearTimeout(timer);timer=setTimeout(()=>{state.writingDrafts[l.id]=draft.value;save();document.getElementById('draftStatus')?.replaceChildren(document.createTextNode('Entwurf gespeichert.'));},350);};
    document.getElementById('saveWriting').onclick=()=>{
      if(!/[\u0370-\u03ff]/.test(draft.value)||!['wTask','wForms','wMeaning'].every(id=>document.getElementById(id).checked)){document.getElementById('draftStatus').textContent='Schreibe zuerst einen griechischen Text und prüfe die drei Kriterien.';return;}
      (state.lessonWork[l.id]||={}).writing=true;state.writingDrafts[l.id]=draft.value;save(true);document.getElementById('saveWriting').textContent='✓ Schreiben selbst geprüft';
    };
    document.getElementById('saveSpeaking').onclick=()=>{if(!document.getElementById('spoken').checked){document.getElementById('recStatusEl').textContent='Sprich zuerst frei und bestätige deinen Selbstcheck.';return;}(state.lessonWork[l.id]||={}).speaking=true;save(true);document.getElementById('saveSpeaking').textContent='✓ Sprechen selbst geprüft';};
    A1Learning.wireRecorder('El',null,{unavailable:'Aufnahme hier nicht verfügbar. Sprich laut und nutze den Selbstcheck.',recording:'Aufnahme läuft …',done:'Aufnahme bereit. Höre sie an und prüfe die Kriterien.',denied:'Mikrofonzugriff nicht möglich. Du kannst ohne Aufnahme weiterüben.',empty:'Die Aufnahme ist leer. Sprich laut und versuche es erneut.'});
  }
  function alphabet(){
    const names=['1 · Erste Formen','2 · Lesen & Endsigma','3 · Neue Laute','4 · Weitere Vokale & Zeichen'];
    shell(`<h2>Dein Schriftlabor · Α → Ω</h2><p>Lerne pro Durchgang sechs Buchstaben. Höre den Namen und das Beispiel, sprich nach und schreibe es ab. Die Reihenfolge ist für den Einstieg gruppiert.</p>${D.alphabet.filter((a,i)=>i%6===0).map(a=>`<section class="el-card"><h3>${names[a.group]}</h3><div class="el-alphabet">${D.alphabet.filter(b=>b.group===a.group).map(b=>`<div class="el-card"><span class="el-letter" lang="el">${b.upper} ${b.lower}</span><strong lang="el">${b.name}</strong><p>${esc(b.sound)}</p><p lang="el">${b.word} · ${esc(b.meaning)}</p>${audio(`${b.name}. ${b.word}`)}</div>`).join('')}</div><p>Bester Check: ${state.alphabetBest[a.group]||0} %</p>${button('Diese Gruppe üben',`data-group="${a.group}"`)}</section>`).join('')}
      ${card('Buchstabenkombinationen',`<p>Zwei Zeichen können gemeinsam einen Laut bilden. Bei αυ/ευ ist die folgende Lautumgebung entscheidend: vor stimmlosen Lauten /af, ef/, sonst /av, ev/.</p>${D.combinations.map(([s,sound,word])=>`<p><strong lang="el">${s}</strong> → ${esc(sound)} · <span lang="el">${word}</span> ${audio(word.replace(/ \/ /g,', '))}</p>`).join('')}`)}
      ${card('Tonos, Trema & Satzzeichen','<p>Der Tonos markiert die betonte Silbe: νερό. Mehrsilbige Wörter bekommen gewöhnlich einen Akzent. Das Trema trennt Vokale: μαϊμού. Fragezeichen: ; · Punkt: . · σ im Wort, ς am Wortende. Ein abschließendes σ und ein ς sind dieselbe Buchstabenfamilie, aber unterschiedliche Schreibformen.</p><p>Lies laut: το νερό · ο φίλος · το βιβλίο. Schreibe sie dann ohne Vorlage.</p><button type="button" class="el-primary" id="orthography">Laute & Schreibweise üben</button>')}`);
    view.querySelectorAll('[data-group]').forEach(b=>b.onclick=()=>start(C.alphabetTasks(Number(b.dataset.group)),{mode:'alphabet',group:Number(b.dataset.group),title:'Schriftcheck'}));
    document.getElementById('orthography').onclick=()=>start(D.orthography,{mode:'alphabet',group:'sounds',title:'Laute & Schreibweise'});
  }
  function start(tasks,options){
    window.A1Voice?.cancel();session={...options,tasks:shuffle(tasks),index:0,correct:0,answered:false,missed:[],played:false};showQuestion();
  }
  function showQuestion(){
    const s=session;if(!s)return;if(s.index>=s.tasks.length){finish();return;}
    const t=s.tasks[s.index];s.answered=false;s.played=false;
    const isListen=t.kind==='listening';
    shell(`<p class="el-tag">${esc(s.title)} · ${s.index+1} / ${s.tasks.length}</p><progress class="el-meter" max="${s.tasks.length}" value="${s.index}"></progress><section class="el-card">${t.source?(isListen?'<p>Höre den Text und beantworte die Frage ohne Transkript.</p><div class="el-actions">'+button('🔊 Hörtext abspielen','id="playSource"')+button('Ohne Audio überspringen','id="skipAudio"')+'</div>':`<p class="el-greek el-question-source" lang="el">${esc(t.source)}</p>`):''}<h2 class="el-prompt">${esc(t.prompt)}</h2>${t.options?`<div class="el-options">${shuffle(t.options).map(o=>`<button type="button" class="el-option" data-answer="${esc(o)}" ${isListen?'disabled':''}>${esc(o)}</button>`).join('')}</div>`:`<form id="typedForm"><label for="typedAnswer">Deine Antwort</label><input id="typedAnswer" type="text" autocomplete="off" autocapitalize="off" lang="el" spellcheck="false"><div class="el-actions"><button type="submit" id="checkTyped" class="el-primary">Prüfen</button>${button('Lösung zeigen','id="reveal"')}</div></form>`}<div id="feedback" class="el-feedback" role="status" aria-live="polite"></div><div class="el-actions">${primary('Nächste Aufgabe','id="nextQuestion" hidden')}</div></section><div class="el-actions">${button('Übung verlassen','id="leaveSession"')}</div>`);
    view.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>answer(b.dataset.answer));
    const field=document.getElementById('typedAnswer');if(field){keyboard(field);document.getElementById('typedForm').onsubmit=e=>{e.preventDefault();answer(field.value);};document.getElementById('reveal').onclick=()=>answer('',true);field.focus();}
    if(isListen){document.getElementById('playSource').onclick=()=>{if(speak(t.source)){s.played=true;view.querySelectorAll('[data-answer]').forEach(b=>b.disabled=false);}};document.getElementById('skipAudio').onclick=()=>answer('',true);}
    document.getElementById('nextQuestion').onclick=()=>{if(!s.answered)return;s.index++;showQuestion();};
    document.getElementById('leaveSession').onclick=()=>{session=null;returnFrom(s);};
  }
  function answer(value,reveal=false){
    const s=session;if(!s||s.answered)return;const t=s.tasks[s.index],feedback=document.getElementById('feedback');
    if(t.kind==='listening'&&!s.played&&!reveal)return;
    const grade=reveal?'wrong':C.grade(value,t.answer);
    if(grade==='accent'){feedback.className='el-feedback wrong';feedback.textContent='Die Buchstaben stimmen. Prüfe den Tonos (Betonungsakzent) und korrigiere deine Eingabe. Noch kein Punkt; du darfst erneut versuchen.';return;}
    s.answered=true;const correct=grade==='correct';if(correct)s.correct++;else s.missed.push(t);
    // Keep the retry in the review queue even when the learner later gets it right.
    const old=state.reviewPractice[t.id]||{};
    if(!correct)state.reviewPractice[t.id]={task:t,wrong:(old.wrong||0)+1,due:Date.now(),streak:0};
    else if(old.task){const streak=(old.streak||0)+1;state.reviewPractice[t.id]={...old,streak,due:Date.now()+Math.min(30,2**streak)*86400000};}
    save();
    view.querySelectorAll('[data-answer],#checkTyped,#reveal,#skipAudio').forEach(b=>b.disabled=true);
    document.getElementById('typedAnswer')?.setAttribute('readonly','');
    feedback.className=`el-feedback${correct?'':' wrong'}`;
    feedback.innerHTML=`<strong>${correct?'Richtig.':'Noch einmal ansehen:'}</strong><p>${esc(t.answer)}</p><p>${esc(t.explanation)}</p>${t.kind==='listening'?`<details><summary>Transkript nach der Antwort</summary><p lang="el">${esc(t.source)}</p></details>`:''}${/[\u0370-\u03ff]/.test(t.answer)?audio(t.answer):''}`;
    document.getElementById('nextQuestion').hidden=false;wireAudio();
  }
  function finish(){
    const s=session,pct=Math.round(s.correct/s.tasks.length*100);session=null;reloadCloud();
    if(s.mode==='check'){state.lessonMasteryBest[s.lessonId]=Math.max(state.lessonMasteryBest[s.lessonId]||0,pct);}
    else if(s.mode==='practice'){state.lessonQuizBest[s.lessonId]=Math.max(state.lessonQuizBest[s.lessonId]||0,pct);}
    else if(s.mode==='alphabet'){state.alphabetBest[s.group]=Math.max(state.alphabetBest[s.group]||0,pct);}
    else if(s.mode==='exam'){state.courseMasteryBest[s.block]=Math.max(state.courseMasteryBest[s.block]||0,pct);}
    if(s.lessonId&&['reading','listening'].includes(s.mode)){(state.lessonWork[s.lessonId]||={})[s.mode]=Math.max(state.lessonWork[s.lessonId][s.mode]||0,pct);}
    save(true);
    shell(card('Dein Ergebnis',`<p class="el-greek">${s.correct} / ${s.tasks.length} · ${pct} %</p><p>${pct>=80?'Gut gefestigt.':'Wiederhole die schwierigen Stellen und versuche es später erneut.'}</p>${s.mode==='check'?`<p>${state.doneLessons.includes(s.lessonId)?'✓ Lektion abgeschlossen.':'Zum Lektionsabschluss gehören zusätzlich der Sprech- und Schreibselbstcheck.'}</p>`:''}<p>Fehler findest du unter „Wiederholen“. Ausgelassene Hörfragen zählen als falsch. Sprechen und Schreiben werden nicht automatisch bewertet.</p><div class="el-actions">${button('Zurück','id="resultBack"')}${s.missed.length?primary('Fehler jetzt üben','id="retryMistakes"'):''}</div>`));
    document.getElementById('resultBack').onclick=()=>returnFrom(s);
    document.getElementById('retryMistakes')?.addEventListener('click',()=>start(s.missed,{mode:'review',title:'Fehler festigen',lessonId:s.lessonId}));
  }
  function returnFrom(s){if(s.mode==='alphabet')navigate('alphabet');else if(s.mode==='exam')navigate('exam');else if(s.lessonId)lesson(s.lessonId,Math.min(activeStep,7));else navigate('review');}
  function review(){
    const items=Object.values(state.reviewPractice).filter(x=>x.task),due=items.filter(x=>x.due<=Date.now());
    shell(card('Wiederholen mit Abstand',`<p>${due.length} Aufgaben sind fällig. Nach einer richtigen Wiederholung wächst der Abstand von zwei auf vier, acht und später bis zu dreißig Tage. Fehler kommen sofort zurück.</p><div class="el-actions">${due.length?primary('Fällige Fehler üben','id="dueReview"'):''}${items.length?button('Alle gespeicherten Fehler üben','id="allReview"'):''}</div><p class="el-muted">${items.length?'Auch bereits richtig wiederholte Aufgaben bleiben für spätere Wiederholungen erhalten.':'Noch keine Fehler gespeichert. Beginne mit einer Lektion.'}</p>`)+card('Wendungen frei schreiben',`<label for="reviewLesson">Lektion wählen</label><select id="reviewLesson">${D.lessons.map(l=>`<option value="${l.id}">${l.id}. ${esc(l.title)}</option>`).join('')}</select><div class="el-actions">${button('Ohne Auswahlhilfen üben','id="freePractice"')}</div>`));
    document.getElementById('dueReview')?.addEventListener('click',()=>start(due.map(x=>x.task),{mode:'review',title:'Fällige Wiederholung'}));
    document.getElementById('allReview')?.addEventListener('click',()=>start(items.map(x=>x.task),{mode:'review',title:'Fehler wiederholen'}));
    document.getElementById('freePractice').onclick=()=>{const l=D.lessons.find(x=>x.id===Number(document.getElementById('reviewLesson').value));start(C.tasks(l,'check').filter(t=>t.id.includes(':phrase')),{mode:'review',title:'Aktiver Wortschatz'});};
  }
  function exam(){
    shell(`<h2>A1-Lernstand kontrollieren</h2><p>Vier kumulative Blöcke prüfen den Kursstoff. Jeder enthält aus jeder zugehörigen Lektion eine aktive Wendung, eine Grammatik-, eine Lese- und eine Hörfrage. Das ist ein App-Check und keine vollständige offizielle Modellprüfung.</p><div class="el-grid">${[0,1,2,3].map(b=>card(`Block ${b+1} · Lektionen ${b*6+1}–${b*6+6}`,`<p>24 Aufgaben · Bestehensziel 80 % · Bester Wert: ${state.courseMasteryBest[b]||0} %</p>${button('Block beginnen',`data-block="${b}"`)}`)).join('')}</div>${card('Schreiben & Sprechen im Zusammenhang','<p>Schreiben: Antworte einem neuen Bekannten. Stelle dich vor, beschreibe deinen Alltag und vereinbare einen Treffpunkt mit Uhrzeit. Orientiere dich für diese freie Übung an etwa 30–50 Wörtern.</p><p>Sprechen: Stelle dich vor, bestelle etwas im Café, frage nach dem Weg und verabrede dich. Bitte einmal um Wiederholung.</p><p>Prüfe: alle Angaben erfüllt, verständliche Sätze, passende Verbformen, Betonung und Endungen. Diese Leistungen werden hier selbst eingeschätzt. Für eine externe Niveaukontrolle nutze die offiziellen Beispiele oder eine Lehrkraft.</p><a href="https://www.greek-language.gr/certification/node/137.html" target="_blank" rel="noopener">Offizielle A1-Modellprüfungen für Jugendliche und Erwachsene</a>')}`);
    view.querySelectorAll('[data-block]').forEach(b=>b.onclick=()=>{const block=Number(b.dataset.block),tasks=D.lessons.slice(block*6,block*6+6).flatMap(l=>{const pool=C.tasks(l,'check');return [pool[0],pool.find(t=>t.id.includes(':grammar')),pool.find(t=>t.kind==='reading'),pool.find(t=>t.kind==='listening')];});start(tasks,{mode:'exam',block,title:`A1-Block ${block+1}`});});
  }
  if('serviceWorker' in navigator)navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
  navigate('home');
})();
