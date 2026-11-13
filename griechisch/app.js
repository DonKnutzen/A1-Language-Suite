(() => {
  'use strict';
  const D=window.EL_A1_DATA,C=window.EL_A1,view=document.getElementById('view');
  const base='griechischA1State_v1',course='griechisch-a1';
  const defaults={doneLessons:[],lessonMasteryBest:{},lessonCheckLast:{},lessonQuizBest:{},lessonWork:{},reviewPractice:{},writingDrafts:{},alphabetBest:{},courseMasteryBest:{},lastLessonId:0};
  const key=()=>A1Profile.namespacedKey(base);
  let state=A1Learning.loadState(key(),defaults),route='home',activeLesson=1,activeStep=0,session=null,cloudPending=false;
  let homeCleanup=null,activeAlphabetGroup=0,alphabetReturn=null;
  C.migrate(state);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const button=(label,attrs='')=>`<button type="button" class="secondary-btn el-secondary" ${attrs}>${label}</button>`;
  const primary=(label,attrs='')=>`<button type="button" class="primary-btn el-primary" ${attrs}>${label}</button>`;
  const audio=t=>`<button type="button" class="speak-btn" data-audio="${esc(t)}" aria-label="Aussprache anhören">🔊</button>`;
  const shuffle=a=>A1Learning.shuffle(a);
  const card=(title,body)=>`<section class="card el-card"><h2>${esc(title)}</h2>${body}</section>`;
  function save(completed=false){
    C.completion(state);
    try{localStorage.setItem(key(),JSON.stringify(state));}catch{status('Dein Fortschritt konnte auf diesem Gerät nicht gespeichert werden. Prüfe den Browserspeicher.');}
    A1Profile.saveProgress(course,state,C.completion(state));
    if(completed)window.A1Streak?.completeExercise();
  }
  window.A1CourseProgressPercent=()=>C.completion(state);
  window.A1ApplyCloudProgress=()=>{cloudPending=true;if(!session&&route==='home'){reloadCloud();home();}};
  function reloadCloud(){if(cloudPending){state=A1Learning.loadState(key(),defaults);C.migrate(state);cloudPending=false;}}
  function status(message){let el=document.getElementById('audioStatus');if(!el){el=document.createElement('p');el.id='audioStatus';el.setAttribute('role','status');view.prepend(el);}el.textContent=message;}
  function hasVoice(){return Boolean(window.speechSynthesis?.getVoices().some(v=>/^el(?:-|$)/i.test(v.lang)));}
  function speak(t){
    if(!hasVoice()){status('Keine griechische Stimme verfügbar. Aktiviere in den Geräte- oder Browsereinstellungen eine griechische Stimme und lade die Stimmen neu. Hörfragen kannst du überspringen; sie werden dann nicht als richtig gewertet.');return false;}
    A1Voice.speak(t,{lang:'el-GR',rate:.8});return true;
  }
  function wireAudio(){view.querySelectorAll('[data-audio]').forEach(b=>b.onclick=()=>speak(b.dataset.audio));}
  function shell(html){homeCleanup?.();homeCleanup=null;view.innerHTML=html;wireAudio();window.scrollTo?.({top:0,behavior:'smooth'});}
  function navigate(next){
    if(next==='alphabet')alphabetReturn=route==='lesson'?{id:activeLesson,step:activeStep}:null;
    window.A1Voice?.cancel();reloadCloud();session=null;route=next;
    document.querySelectorAll('[data-route]').forEach(b=>b.classList.toggle('active',b.dataset.route===route));
    ({home,learn,alphabet,review,exam}[next]||home)();
  }
  document.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>navigate(b.dataset.route));
  A1Voice.mount({lang:'el-GR',uiLang:'de'});
  function home(){
    const pct=C.completion(state),last=D.lessons.find(l=>l.id===state.lastLessonId&&!state.doneLessons.includes(l.id)),next=last||D.lessons.find(l=>!state.doneLessons.includes(l.id))||D.lessons[23];
    shell(`<section class="card home-continue-card" aria-labelledby="continueTitle"><div class="between"><span class="eyebrow">WEITERLERNEN</span><span class="pill">Lektion ${next.id}</span></div><h2 id="continueTitle">${esc(next.title)}</h2><div class="home-learning-goal"><span class="home-detail-label">Dein Lernziel</span><p>${esc(next.goal)}</p></div><button type="button" class="primary-btn home-continue-btn" id="continue"><span>Fortsetzen</span><span class="home-continue-arrow" aria-hidden="true">→</span></button></section>
      <div class="el-grid">${card('Schrift entdecken','<p class="muted">Sechs Buchstaben auf einmal. Hören, erkennen und passende Antworten antippen.</p>'+button('Zum Schriftlabor','id="startAlphabet"'))}${card('Deine Wiederholung','<p class="muted">Festige Wendungen und wiederhole schwierige Aufgaben in deinem Tempo.</p>'+button('Wiederholen','id="homeReview"'))}</div>
      <section class="card course-progress-card" data-streak-anchor><h2>Dein Baum</h2><p class="course-progress-caption">Wächst mit jeder abgeschlossenen Lektion.</p>${window.A1LearningOak?.render({percent:pct,lang:'de',course})||`<progress class="el-meter" max="100" value="${pct}">${pct}%</progress>`}${window.A1Streak?.render?.('de',{showEmpty:true})||''}<p class="muted">${state.doneLessons.length} von 24 Lektionen abgeschlossen · ${pct} %</p></section>
      <details class="card el-course-info"><summary>So lernst du Griechisch</summary><p>Beginne mit ersten Wendungen und lerne die Schrift parallel in kleinen Gruppen. Jede Lektion zeigt einen Lernschritt nach dem anderen. Gehe in deinem Tempo weiter oder kehre zu einem früheren Schritt zurück.</p><p>Die Audioausgabe braucht eine griechische Geräte- oder Browserstimme. Du lernst mit Hörbeispielen und Auswahlaufgaben, ohne Schreibpflicht. Ein Wissenscheck ersetzt keine offizielle A1-Prüfung.</p><a href="LEHRPLAN-A1.md">Lehrplan, Quellen und Qualitätsstand</a></details>`);
    document.getElementById('continue').onclick=()=>lesson(next.id,Math.min(6,Math.max(0,Number(state.lessonWork[next.id]?.step)||0)));
    document.getElementById('startAlphabet').onclick=()=>navigate('alphabet');
    document.getElementById('homeReview').onclick=()=>navigate('review');
    const oak=view.querySelector('[data-learning-oak]');if(oak)homeCleanup=window.A1LearningOak?.mount(oak);
  }
  function learn(){
    shell(`<section class="card hero"><span class="pill">24 LEKTIONEN · VON DER SCHRIFT ZUM ALLTAG</span><h2>Griechisch A1 Kurs</h2><p class="muted">Schrift und Alltag wachsen zusammen. Folge als Anfänger der Reihenfolge.</p><div class="progress"><div style="width:${C.completion(state)}%"></div></div></section><div class="list">${D.lessons.map(l=>{const work=state.lessonWork[l.id]||{};return `<button type="button" class="lesson ${state.doneLessons.includes(l.id)?'done':''}" data-lesson="${l.id}"><div><span class="num">${l.id}</span><strong>${esc(l.title)}</strong></div><p class="lesson-meta">${esc(l.goal)}</p><div class="lesson-list-progress"><span class="lesson-list-step"><small>Wissenscheck</small><strong>${state.lessonMasteryBest[l.id]||0} %</strong></span><span class="lesson-list-step"><small>Training</small><strong>${state.lessonQuizBest[l.id]||0} %</strong></span><span class="lesson-list-step"><small>Hörübung</small><strong>${work.listening===undefined?'—':work.listening+' %'}</strong></span></div></button>`;}).join('')}</div>`);
    view.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>lesson(Number(b.dataset.lesson),0));
  }
  const steps=['Einstieg','Wendungen','Grammatik','Dialog','Training','Lesen & Hören','Wissenscheck'];
  function lesson(id,step=0){
    reloadCloud();session=null;route='lesson';activeLesson=id;activeStep=step;state.lastLessonId=id;(state.lessonWork[id]||={}).step=step;save();
    const l=D.lessons.find(x=>x.id===id);
    shell(`<div class="lesson-back-row"><button type="button" class="tiny-btn lesson-back-link" id="allLessons">← Lektionen</button></div><header class="lesson-step-header"><span class="eyebrow">LEKTION ${id} VON 24</span><h2>${id}. ${esc(l.title)}</h2><div class="el-position"><strong>${esc(steps[step])}</strong><small>Schritt ${step+1} von ${steps.length}</small></div><progress class="el-meter" max="${steps.length}" value="${step+1}" aria-label="Position in der Lektion">${step+1} / ${steps.length}</progress></header><div id="lessonContent" class="lesson-step-content"></div><footer class="lesson-step-footer">${step>0?button('← Zurück','id="prevStep"'):''}${step<steps.length-1?primary(`Weiter: ${esc(steps[step+1])} →`,'id="nextStep"'):''}</footer>`);
    document.getElementById('allLessons').onclick=()=>navigate('learn');
    document.getElementById('prevStep')?.addEventListener('click',()=>lesson(id,step-1));
    document.getElementById('nextStep')?.addEventListener('click',()=>lesson(id,step+1));
    const area=document.getElementById('lessonContent');
    if(step===0){
      area.innerHTML=card('Heute kannst du …',`<p>${esc(l.goal)}</p><p>Höre die erste Wendung, sprich sie nach und beobachte die betonte Silbe.</p><p class="el-greek" lang="el">${esc(l.phrases[0].el)}</p><p>${esc(l.phrases[0].de)}</p>${audio(l.phrases[0].el)}${id<=3?'<p>Öffne zusätzlich den Schrifttrainer. Du musst nicht alle Buchstaben beherrschen, bevor du erste Wendungen sprichst.</p>':''}`);
      if(id===2){area.insertAdjacentHTML('beforeend',primary('Mit den ersten sechs Buchstaben beginnen','id="lessonAlphabet"'));document.getElementById('lessonAlphabet').onclick=()=>navigate('alphabet');}
    }else if(step===1){
      area.innerHTML=card('Hörbeispiele & Nachsprechen',`${l.phrases.some(p=>p.hint)?'<label class="el-reading-aid"><input id="readingAid" type="checkbox" checked> Ungefähre Lesehilfe anzeigen</label>':''}<div class="lesson-audio-rows">${l.phrases.map((p,i)=>`<div class="phrase-row lesson-core-phrase" data-phrase-page="${Math.floor(i/4)}"><div><strong lang="el">${esc(p.el)}</strong><small>${esc(p.de)}</small>${p.hint?`<small data-hint>${esc(p.hint)}</small>`:''}</div>${audio(p.el)}</div>`).join('')}</div><div class="lesson-audio-pager"><button type="button" class="primary-btn lesson-audio-switch" id="phrasePager"></button></div>`);
      document.getElementById('readingAid')?.addEventListener('change',e=>area.querySelectorAll('[data-hint]').forEach(el=>el.hidden=!e.target.checked));
      let page=Math.min(1,Math.max(0,Number(state.lessonWork[id].phrasePage)||0));
      const showPage=()=>{area.querySelectorAll('[data-phrase-page]').forEach(row=>row.hidden=Number(row.dataset.phrasePage)!==page);document.getElementById('phrasePager').textContent=page?'← Hörbeispiele · Seite 1':'Hörbeispiele · Seite 2 →';};
      document.getElementById('phrasePager').onclick=()=>{page=page?0:1;state.lessonWork[id].phrasePage=page;save();showPage();};showPage();
    }else if(step===2){
      area.innerHTML=card('Verstehen statt raten',`<p>${esc(l.rule)}</p><h3>Im Satz beobachten</h3>${l.phrases.slice(0,3).map(p=>`<p lang="el" class="el-greek">${esc(p.el)} ${audio(p.el)}</p><p>${esc(p.de)}</p>`).join('')}<p class="el-muted">Lies die Regel erneut und suche im Beispiel die beschriebene Form. Die Übungen erklären anschließend jede Lösung.</p>`);
    }else if(step===3){
      area.innerHTML=card('Ein Gespräch, zwei Rollen',`<p>Lies zuerst Rolle A, dann Rolle B. Verdecke anschließend einzelne Zeilen und antworte aus dem Gedächtnis.</p>${l.dialogue.map((s,i)=>`<div class="el-dialogue"><strong>Rolle ${i%2?'B':'A'}</strong><p class="el-greek" lang="el">${esc(s)}</p>${audio(s)}<details><summary>Bedeutung zeigen</summary><p>${esc(l.dialogueDe[i])}</p></details></div>`).join('')}<p>Ändere Namen, Orte oder Wünsche so, dass ein neues Gespräch entsteht.</p>`);
    }else if(step===4){
      area.innerHTML=card('Gemischtes Training',`<p>Wendungen erkennen, Regeln anwenden, Informationen verstehen. Jede Antwort erhält eine Erklärung. Auch im Wissenscheck wählst du Antworten durch Antippen aus.</p>${primary('Training starten','id="startPractice"')}`);
      document.getElementById('startPractice').onclick=()=>start(C.tasks(l),{mode:'practice',lessonId:id,title:l.title});
    }else if(step===5){
      area.innerHTML=card('Lesen',`<p class="el-greek el-question-source" lang="el">${esc(l.reading.body)}</p>${primary('Leseaufgaben starten','id="readTasks"')}`)+card('Hören',`<p>Höre ohne Transkript. Achte auf Personen, Zahlen, Zeiten und Orte.</p>${audio(l.listening.body)}<div class="el-actions">${primary('Höraufgaben starten','id="listenTasks"')}</div><details><summary>Transkript zur Nacharbeit</summary><p lang="el" class="el-greek">${esc(l.listening.body)}</p><p>Wenn du den Text gelesen hast, nutze die Fragen als Leseübung. Für echtes Hörtraining starte später erneut ohne Transkript.</p></details>`);
      document.getElementById('readTasks').onclick=()=>start(C.tasks(l).filter(t=>t.kind==='reading'),{mode:'reading',lessonId:id,title:'Leseverstehen'});
      document.getElementById('listenTasks').onclick=()=>start(C.tasks(l).filter(t=>t.kind==='listening'),{mode:'listening',lessonId:id,title:'Hörverstehen'});
    }else{
      area.innerHTML=card('Dein Lektionscheck',`<p>Alle ${l.phrases.length} Kernwendungen zum Antippen, ${l.grammar.length} Grammatikfragen, ${l.transfer.length} neue Transferfragen sowie je ${l.reading.questions.length} Lese- und ${l.listening.questions.length} Hörfragen. Alle acht Kernwendungen sind enthalten; Grammatik und Verstehen werden stichprobenartig geprüft. Bestehensgrenze: 80 %. Du wählst passende Antworten aus; Griechisch tippen musst du nicht.</p><p class="el-muted">Du kannst alle Beispiele und Übungen in deinem Tempo wiederholen. Ab 80 % ist die Lektion abgeschlossen; zusätzliche Schreib- oder Sprechbestätigungen sind nicht nötig.</p>${primary('Wissenscheck beginnen','id="startCheck"')}`);
      document.getElementById('startCheck').onclick=()=>start(C.tasks(l,'check'),{mode:'check',lessonId:id,title:`Wissenscheck ${id}`});
    }
    if(step===6&&state.lessonCheckLast[id]?.skippedAudio>0)area.insertAdjacentHTML('beforeend','<p class="el-feedback wrong">Beim letzten Wissenscheck blieb der Hörteil offen. Der Gesamtwert bestätigt kein Hörverstehen.</p>');
    wireAudio();
  }
  function keyboard(input){
    const help=document.createElement('details');help.className='el-input-help';const summary=document.createElement('summary');summary.textContent='Griechische Tastatur öffnen';help.append(summary);
    const el=document.createElement('div');el.className='el-keyboard';el.setAttribute('role','group');el.setAttribute('aria-label','Griechische Eingabehilfe');
    let uppercase=false;const shift=document.createElement('button');shift.type='button';shift.className='mixed-shift';shift.textContent='⇧';shift.setAttribute('aria-label','Großbuchstaben umschalten');shift.setAttribute('aria-pressed','false');el.append(shift);
    for(const char of 'αβγδεζηθικλμνξοπρσςτυφχψωάέήίόύώϊϋΐΰΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩΆΈΉΊΌΎΏ ;'){
      const b=document.createElement('button');b.type='button';b.textContent=char===' '?'␣':char;b.setAttribute('aria-label',char===' '?'Leerzeichen':char);b.dataset.letterCase=/\p{Lu}/u.test(char)?'upper':/\p{Ll}/u.test(char)?'lower':'both';b.hidden=b.dataset.letterCase==='upper';b.onclick=()=>{const s=input.selectionStart??input.value.length,e=input.selectionEnd??s;input.value=input.value.slice(0,s)+char+input.value.slice(e);input.focus();input.setSelectionRange(s+char.length,s+char.length);input.dispatchEvent(new Event('input',{bubbles:true}));};el.append(b);
    }
    shift.onclick=()=>{uppercase=!uppercase;shift.setAttribute('aria-pressed',String(uppercase));el.querySelectorAll('[data-letter-case]').forEach(b=>b.hidden=b.dataset.letterCase!=='both'&&b.dataset.letterCase!==(uppercase?'upper':'lower'));};
    help.append(el);input.insertAdjacentElement('afterend',help);
  }
  function alphabet(group=activeAlphabetGroup){
    activeAlphabetGroup=Math.min(3,Math.max(0,Number(group)||0));group=activeAlphabetGroup;
    const names=['1 · Erste Formen','2 · Lesen & Endsigma','3 · Neue Laute','4 · Weitere Vokale & Zeichen'];
    shell(`${alphabetReturn?'<div class="lesson-back-row"><button type="button" class="tiny-btn lesson-back-link" id="alphabetBack">← Zur Lektion</button></div>':''}<header class="lesson-step-header"><span class="eyebrow">SCHRIFT & AUSSPRACHE</span><h2>Dein Schriftlabor · Α → Ω</h2><div class="el-position"><strong>${names[group]}</strong><small>Gruppe ${group+1} von 4</small></div><progress class="el-meter" max="4" value="${group+1}" aria-label="Position im Schriftlabor"></progress></header>
      <section class="card lesson-step-content"><h3>Sechs Buchstaben für diesen Schritt</h3><p class="muted">Höre den Namen und das Beispiel, sprich nach, wenn du möchtest, und erkenne es in den Übungen wieder. Die nächste Gruppe folgt anschließend.</p><div class="el-alphabet">${D.alphabet.filter(b=>b.group===group).map(b=>`<article class="alphabet-letter el-letter-card"><strong class="el-letter" lang="el">${b.upper} ${b.lower}</strong><span lang="el">${b.name}</span><small>${esc(b.sound)}</small><p><strong lang="el">${b.word}</strong><small>${esc(b.meaning)}</small></p>${audio(`${b.name}. ${b.word}`)}</article>`).join('')}</div><p class="muted">Bester Check dieser Gruppe: ${state.alphabetBest[group]||0} %</p>${primary('Diese sechs Buchstaben üben',`data-group="${group}"`)}</section>
      <footer class="lesson-step-footer">${group?button('← Vorherige Gruppe','id="alphabetPrev"'):''}${primary(group<3?'Weiter: nächste sechs Buchstaben →':'Weiter: Laute & Nachfragen →','id="alphabetNext"')}</footer>
      <details class="card el-contents"><summary>Alle Schriftgruppen</summary><ol>${names.map((name,i)=>`<li><button type="button" data-open-group="${i}" ${i===group?'aria-current="step"':''}>${name}</button></li>`).join('')}</ol></details>
      <details class="card el-letter-reference"><summary>Buchstabenkombinationen nachschlagen</summary><p>Zwei Zeichen können gemeinsam einen Laut bilden. Bei αυ/ευ ist die folgende Lautumgebung entscheidend: vor stimmlosen Lauten /af, ef/, sonst /av, ev/.</p>${D.combinations.map(([s,sound,word])=>`<div class="phrase-row"><div><strong lang="el">${s} · ${word}</strong><small>${esc(sound)}</small></div>${audio(word.replace(/ \/ /g,', '))}</div>`).join('')}</details>
      <details class="card el-letter-reference"><summary>Tonos, Trema & Satzzeichen üben</summary><p>Der Tonos markiert die betonte Silbe: νερό. Das Trema trennt Vokale: μαϊμού. Griechisches Fragezeichen: ;. Im Wort steht σ, am Wortende ς.</p><p>Lies laut: το νερό · ο φίλος · το βιβλίο. Erkenne sie anschließend in den Auswahlaufgaben wieder.</p>${primary('Laute & Schreibweise üben','id="orthography"')}</details>`);
    document.getElementById('alphabetBack')?.addEventListener('click',()=>lesson(alphabetReturn.id,alphabetReturn.step));
    document.getElementById('alphabetPrev')?.addEventListener('click',()=>alphabet(group-1));
    document.getElementById('alphabetNext').onclick=()=>group<3?alphabet(group+1):lesson(3,0);
    view.querySelectorAll('[data-open-group]').forEach(b=>b.onclick=()=>alphabet(Number(b.dataset.openGroup)));
    view.querySelectorAll('[data-group]').forEach(b=>b.onclick=()=>start(C.alphabetTasks(Number(b.dataset.group)),{mode:'alphabet',group:Number(b.dataset.group),title:'Schriftcheck'}));
    document.getElementById('orthography').onclick=()=>start(D.orthography,{mode:'alphabet',group:'sounds',title:'Laute & Schreibweise'});
  }
  function start(tasks,options){
    if(options.mode==='review')tasks=tasks.map(C.currentTask).filter(Boolean);
    if(!tasks.length){navigate('review');status('Diese Aufgaben wurden überarbeitet. Wähle eine aktuelle Lektion.');return;}
    window.A1Voice?.cancel();session={...options,tasks:shuffle(tasks),index:0,correct:0,answered:false,missed:[],played:false,skippedAudio:0};showQuestion();
  }
  function showQuestion(){
    const s=session;if(!s)return;if(s.index>=s.tasks.length){finish();return;}
    const t=s.tasks[s.index];s.answered=false;s.played=false;
    const isListen=t.kind==='listening';
    shell(`<p class="el-tag">${esc(s.title)} · ${s.index+1} / ${s.tasks.length}</p><progress class="el-meter" max="${s.tasks.length}" value="${s.index}"></progress><section class="card el-card">${t.source?(isListen?'<p>Höre den Text und beantworte die Frage ohne Transkript.</p><div class="el-actions">'+button('🔊 Hörtext abspielen','id="playSource"')+button('Ohne Audio überspringen','id="skipAudio"')+'</div>':`<p class="el-greek el-question-source" lang="el">${esc(t.source)}</p>`):''}<h2 class="el-prompt">${esc(t.prompt)}</h2>${t.options?`<div class="el-options">${shuffle(t.options).map(o=>`<button type="button" class="option-btn el-option" data-answer="${esc(o)}" ${isListen?'disabled':''}>${esc(o)}</button>`).join('')}</div>`:`<form id="typedForm"><label for="typedAnswer">Deine Antwort</label><input id="typedAnswer" type="text" autocomplete="off" autocapitalize="off" lang="el" spellcheck="false"><div class="el-actions"><button type="submit" id="checkTyped" class="primary-btn el-primary">Prüfen</button>${button('Lösung zeigen','id="reveal"')}</div></form>`}<div id="feedback" class="el-feedback" role="status" aria-live="polite"></div><div class="el-actions">${primary('Nächste Aufgabe','id="nextQuestion" hidden')}</div></section><div class="el-actions">${button('Übung verlassen','id="leaveSession"')}</div>`);
    view.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>answer(b.dataset.answer));
    const field=document.getElementById('typedAnswer');if(field){keyboard(field);document.getElementById('typedForm').onsubmit=e=>{e.preventDefault();answer(field.value);};document.getElementById('reveal').onclick=()=>answer('',true);field.focus();}
    if(isListen){
      document.getElementById('playSource').onclick=()=>{
        if(!hasVoice()){speak(t.source);return;}
        s.played=false;view.querySelectorAll('[data-answer]').forEach(b=>b.disabled=true);
        const current=()=>session===s&&s.tasks[s.index]===t&&!s.answered;
        const failed=()=>{if(!current())return;s.played=false;view.querySelectorAll('[data-answer]').forEach(b=>b.disabled=true);status('Der griechische Hörtext konnte nicht vollständig abgespielt werden. Versuche es erneut oder überspringe die Frage ohne Punkt.');};
        status('Hörtext läuft. Die Antworten werden nach dem vollständigen Abspielen freigegeben.');
        const started=A1Voice.speakDialogue([{speaker:'A',text:t.source}],{lang:'el-GR',rate:.8,
          onEnd(){if(!current())return;s.played=true;view.querySelectorAll('[data-answer]').forEach(b=>b.disabled=false);status('Hörtext abgespielt. Du kannst jetzt antworten.');},onError:failed});
        if(!started)failed();
      };
      document.getElementById('skipAudio').onclick=()=>answer('',true);
    }
    document.getElementById('nextQuestion').onclick=()=>{if(!s.answered)return;s.index++;showQuestion();};
    document.getElementById('leaveSession').onclick=()=>{session=null;returnFrom(s);};
  }
  function answer(value,reveal=false){
    const s=session;if(!s||s.answered)return;const t=s.tasks[s.index],feedback=document.getElementById('feedback');
    if(t.kind==='listening'&&!s.played&&!reveal)return;
    const grade=reveal?'wrong':t.options?(C.normalize(value)===C.normalize(t.answer)?'correct':'wrong'):C.grade(value,t.answer,t.accepted);
    if(grade==='accent'){feedback.className='el-feedback wrong';feedback.textContent='Die Buchstaben stimmen. Prüfe den Tonos (Betonungsakzent) und korrigiere deine Eingabe. Noch kein Punkt; du darfst erneut versuchen.';return;}
    s.answered=true;const correct=grade==='correct';if(correct)s.correct++;else s.missed.push(t);
    if(reveal&&t.kind==='listening')s.skippedAudio++;
    // Keep the retry in the review queue even when the learner later gets it right.
    const old=state.reviewPractice[t.id]||{};
    if(!correct)state.reviewPractice[t.id]={task:t,wrong:(old.wrong||0)+1,due:Date.now(),streak:0};
    else if(old.task){const streak=(old.streak||0)+1;state.reviewPractice[t.id]={...old,task:t,streak,due:Date.now()+Math.min(30,2**streak)*86400000};}
    save();
    view.querySelectorAll('[data-answer],#checkTyped,#reveal,#skipAudio').forEach(b=>b.disabled=true);
    document.getElementById('typedAnswer')?.setAttribute('readonly','');
    feedback.className=`el-feedback${correct?'':' wrong'}`;
    feedback.innerHTML=`<strong>${correct?'Richtig.':'Noch einmal ansehen:'}</strong><p>${esc(t.answer)}</p><p>${esc(t.explanation)}</p>${t.kind==='listening'?`<details><summary>Transkript nach der Antwort</summary><p lang="el">${esc(t.source)}</p></details>`:''}${/[\u0370-\u03ff]/.test(t.answer)?audio(t.answer):''}`;
    document.getElementById('nextQuestion').hidden=false;wireAudio();
  }
  function finish(){
    const s=session,pct=Math.round(s.correct/s.tasks.length*100);session=null;reloadCloud();
    if(s.mode==='check'){state.lessonMasteryBest[s.lessonId]=Math.max(state.lessonMasteryBest[s.lessonId]||0,pct);state.lessonCheckLast[s.lessonId]={percent:pct,skippedAudio:s.skippedAudio,lastAt:Date.now()};}
    else if(s.mode==='practice'){state.lessonQuizBest[s.lessonId]=Math.max(state.lessonQuizBest[s.lessonId]||0,pct);}
    else if(s.mode==='alphabet'){state.alphabetBest[s.group]=Math.max(state.alphabetBest[s.group]||0,pct);}
    else if(s.mode==='exam'){state.courseMasteryBest[s.block]=Math.max(state.courseMasteryBest[s.block]||0,pct);}
    if(s.lessonId&&['reading','listening'].includes(s.mode)){(state.lessonWork[s.lessonId]||={})[s.mode]=Math.max(state.lessonWork[s.lessonId][s.mode]||0,pct);}
    save(true);
    shell(card('Dein Ergebnis',`<p class="el-greek">${s.correct} / ${s.tasks.length} · ${pct} %</p><p>${s.skippedAudio?'Hörteil offen: Nicht alle Hörfragen wurden mit Audio bearbeitet. Auch ein hoher Gesamtwert bestätigt hier kein Hörverstehen.':pct>=80?'Gut gefestigt.':'Wiederhole die schwierigen Stellen und versuche es später erneut.'}</p>${s.mode==='check'?`<p>${state.doneLessons.includes(s.lessonId)?'✓ Wissenscheck bestanden. Lektion abgeschlossen.':'Ab 80 % im Wissenscheck ist die Lektion abgeschlossen.'}</p>`:''}<p>Fehler findest du unter „Wiederholen“. Ausgelassene Hörfragen zählen als falsch. Du kannst alle Aufgaben in Ruhe wiederholen.</p><div class="el-actions">${button('Zurück','id="resultBack"')}${s.missed.length?primary('Fehler jetzt üben','id="retryMistakes"'):''}</div>`));
    document.getElementById('resultBack').onclick=()=>returnFrom(s);
    document.getElementById('retryMistakes')?.addEventListener('click',()=>start(s.missed,{mode:'review',title:'Fehler festigen',lessonId:s.lessonId}));
  }
  function returnFrom(s){if(s.mode==='alphabet')alphabet(typeof s.group==='number'?s.group:activeAlphabetGroup);else if(s.mode==='exam')navigate('exam');else if(s.lessonId)lesson(s.lessonId,Math.min(activeStep,6));else navigate('review');}
  function review(){
    const items=Object.values(state.reviewPractice).map(x=>({...x,task:C.currentTask(x.task)})).filter(x=>x.task),due=items.filter(x=>x.due<=Date.now());
    shell(card('Wiederholen mit Abstand',`<p>${due.length} Aufgaben sind fällig. Nach einer richtigen Wiederholung wächst der Abstand von zwei auf vier, acht und später bis zu dreißig Tage. Fehler kommen sofort zurück.</p><div class="el-actions">${due.length?primary('Fällige Fehler üben','id="dueReview"'):''}${items.length?button('Alle gespeicherten Fehler üben','id="allReview"'):''}</div><p class="el-muted">${items.length?'Auch bereits richtig wiederholte Aufgaben bleiben für spätere Wiederholungen erhalten.':'Noch keine Fehler gespeichert. Beginne mit einer Lektion.'}</p>`)+card('Wendungen in Ruhe wiederholen',`<label for="reviewLesson">Lektion wählen</label><select id="reviewLesson">${D.lessons.map(l=>`<option value="${l.id}">${l.id}. ${esc(l.title)}</option>`).join('')}</select><div class="el-actions">${button('Wendungen erkennen','id="freePractice"')}</div>`));
    document.getElementById('dueReview')?.addEventListener('click',()=>start(due.map(x=>x.task),{mode:'review',title:'Fällige Wiederholung'}));
    document.getElementById('allReview')?.addEventListener('click',()=>start(items.map(x=>x.task),{mode:'review',title:'Fehler wiederholen'}));
    document.getElementById('freePractice').onclick=()=>{const l=D.lessons.find(x=>x.id===Number(document.getElementById('reviewLesson').value));start(C.tasks(l,'check').filter(t=>t.id.includes(':phrase')),{mode:'review',title:'Aktiver Wortschatz'});};
  }
  function exam(){
    shell(`<h2>A1-Lernstand kontrollieren</h2><p>Vier kumulative Blöcke prüfen den Kursstoff. Jeder enthält aus jeder zugehörigen Lektion eine aktive Wendung, eine Grammatik-, eine Lese- und eine Hörfrage. Das ist ein App-Check und keine vollständige offizielle Modellprüfung.</p><div class="el-grid">${[0,1,2,3].map(b=>card(`Block ${b+1} · Lektionen ${b*6+1}–${b*6+6}`,`<p>24 Aufgaben · Bestehensziel 80 % · Bester Wert: ${state.courseMasteryBest[b]||0} %</p>${button('Block beginnen',`data-block="${b}"`)}`)).join('')}</div>`);
    view.querySelectorAll('[data-block]').forEach(b=>b.onclick=()=>{const block=Number(b.dataset.block),tasks=D.lessons.slice(block*6,block*6+6).flatMap(l=>{const pool=C.tasks(l,'check');return [pool[0],pool.find(t=>t.id.includes(':grammar')),pool.find(t=>t.kind==='reading'),pool.find(t=>t.kind==='listening')];});start(tasks,{mode:'exam',block,title:`A1-Block ${block+1}`});});
  }
  if('serviceWorker' in navigator)navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
  navigate('home');
})();

