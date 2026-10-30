/* A short, supported first-lesson challenge; old Hard Mode attempts stay separate. */
(() => {
  'use strict';
  const VERSION=1;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const en=()=>window.A1Profile?.getUiLang()==='en';
  const t=(de,english)=>en()?english:de;
  const tasks=[
    {type:'choice',title:['Ein guter Anfang','A good start'],prompt:['Du begrüßt tagsüber eine Person, die du noch nicht kennst. Was passt?','You greet someone you have not met before during the day. Which phrase fits?'],options:['Bonjour !','Bonsoir !','Au revoir !'],answers:['Bonjour !'],audio:'Bonjour !',hint:['Bonjour ist die Begrüßung für den Tag.','Bonjour is a daytime greeting.'],explanation:['Bonjour begrüßt jemanden tagsüber. Bonsoir passt am Abend; Au revoir ist zum Abschied.','Bonjour greets someone during the day. Bonsoir is for the evening; Au revoir is for saying goodbye.']},
    {type:'choice',title:['Im Gespräch bleiben','Keep the conversation going'],prompt:['Jemand fragt: „Comment allez-vous ?“ Dir geht es gut. Wie antwortest du?','Someone asks: “Comment allez-vous ?” You are well. How do you reply?'],options:['Ça va bien, merci.','Je m’appelle Léa.','J’habite à Lyon.'],answers:['Ça va bien, merci.'],audio:'Ça va bien, merci.',hint:['Die Frage bedeutet „Wie geht es Ihnen?“.','The question means “How are you?”'],explanation:['Ça va bien, merci bedeutet „Mir geht es gut, danke“.','Ça va bien, merci means “I’m well, thank you”.']},
    {type:'text',title:['Den Namen nennen','Give a name'],prompt:['Stelle dich als Paul vor. Ergänze den Satz.','Introduce yourself as Paul. Complete the sentence.'],sentence:'Bonjour ! Je ___ Paul.',answers:['m’appelle'],audio:'Bonjour ! Je m’appelle Paul.',hint:['Das Verb ist s’appeler. Bei je steht m’ vor der Verbform.','Use s’appeler. With je, put m’ before the verb form.'],bank:['m’appelle','habite','viens'],explanation:['Je m’appelle + Name: So stellst du dich vor.','Je m’appelle + a name: this is how you introduce yourself.']},
    {type:'text',title:['Herkunft und Wohnort','Origin and home'],prompt:['Du kommst aus Berlin und wohnst jetzt in Lyon. Ergänze die Herkunft.','You are from Berlin and live in Lyon. Complete the part about your origin.'],sentence:'Je ___ de Berlin et j’habite à Lyon.',answers:['viens'],audio:'Je viens de Berlin et j’habite à Lyon.',hint:['Venir de bedeutet „kommen aus“, habiter à bedeutet „wohnen in“. Hier wird nach der Herkunft gefragt.','Venir de means “come from”; habiter à means “live in”. This gap is about your origin.'],bank:['viens','habite','parle'],explanation:['Je viens de nennt die Herkunft; j’habite à nennt den Wohnort.','Je viens de gives your origin; j’habite à gives your home town.']},
    {type:'text',title:['Selbst eine Frage stellen','Ask a question'],prompt:['Du möchtest höflich nach dem Wohnort fragen. Ergänze das Verb.','You want to ask politely where someone lives. Complete the verb.'],sentence:'Vous ___ où ?',answers:['habitez'],audio:'Vous habitez où ?',hint:['Bei vous bekommen regelmäßige Verben auf -er die Endung -ez.','With vous, regular -er verbs take the ending -ez.'],bank:['habite','habitez','habites'],explanation:['Vous habitez où ? bedeutet „Wo wohnen Sie?“.','Vous habitez où ? means “Where do you live?” in the polite form.']},
    {type:'listening',title:['Genau hinhören: Herkunft','Listen for the origin'],prompt:['Woher kommt Luc? Achte auf die Herkunft, nicht auf den Wohnort.','Where is Luc from? Listen for his origin, rather than where he lives.'],recording:'Bonjour ! Je m’appelle Luc. Je viens de Paris. J’habite à Berlin. Au revoir !',gender:'male',options:['Paris','Berlin','Lyon'],answers:['Paris'],hint:['Achte auf die Wörter direkt nach „Je viens de“.','Listen for the words just after “Je viens de”.'],explanation:['Luc sagt „Je viens de Paris“. Berlin ist sein Wohnort.','Luc says “Je viens de Paris”. Berlin is where he lives.']},
    {type:'listening',title:['Genau hinhören: Sprachen','Listen for the languages'],prompt:['Welche Sprache spricht Léa ein bisschen?','Which language does Léa speak a little?'],recording:'Bonjour ! Je m’appelle Léa. J’habite à Lyon. Je parle allemand et un peu français.',gender:'female',options:['Français','Allemand'],answers:['Français'],hint:['Achte auf die Sprache nach „un peu“.','Listen for the language after “un peu”.'],explanation:['„Un peu français“ heißt „ein bisschen Französisch“.','“Un peu français” means “a little French”.']},
    {type:'writing',title:['Deine kleine Vorstellung','Your own short introduction'],prompt:['Du stellst dich im Französischkurs vor. Schreibe zwei kurze Sätze: deinen Namen und deinen Wohnort.','Introduce yourself in your French class. Write two short sentences giving your name and where you live.'],hint:['Satzanfänge: Je m’appelle … / J’habite à …','Sentence starters: Je m’appelle … / J’habite à …'],model:'Je m’appelle Anna. J’habite à Halifax.',explanation:['Vergleiche mit dem Beispiel. Dein eigener Name und Wohnort sind natürlich genauso richtig.','Compare your answer with the example. Your own name and home town are valid too.']}
  ];
  const text=pair=>pair[en()?1:0];
  const shuffle=xs=>{const a=[...xs];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const supports=id=>Number(id)===1;
  const completed=a=>a?.kind==='lesson-challenge'&&a.phase==='completed'&&!!a.completedAt;
  let redraw=null,detach=null;
  window.addEventListener('a1suite:languagechange',()=>redraw?.());
  new MutationObserver(()=>detach?.()).observe(document.getElementById('view')||document.body,{childList:true});

  function entryHtml(lesson,state){
    const open=window.FR_A1_HARD_MODE.unlocked(state,lesson.id),p=state.lessonWork?.[lesson.id]?.hardMode?.challenge;
    const done=completed(p?.attempt)||p?.history?.some(completed);
    return `<section class="hard-entry ${open?'is-unlocked':'is-locked'}" data-i18n-ignore aria-label="${t('Lektions-Challenge','Lesson challenge')}"><button type="button" class="hard-entry-button" data-hard-start ${open?'':'disabled'} aria-describedby="hardEntryHint-${lesson.id}"><strong>${t('Lektions-Challenge','Lesson challenge')}</strong><span>${open?(p?.attempt?(completed(p.attempt)?t('Ansehen','Review'):t('Fortsetzen','Resume')):t('Starten','Start'))+' →':t('Gesperrt','Locked')}</span></button>${open?`<div class="hard-entry-info"><div class="hard-entry-meta"><span>8 ${t('Aufgaben','tasks')}</span><span>≈ 6–10 Min.</span><span>${t('Hilfen verfügbar','Hints available')}</span></div><p id="hardEntryHint-${lesson.id}">${t('Begrüßen, vorstellen und Bekanntes selbst anwenden.','Greet people, introduce yourself and use what you have learned.')}</p><small>${done?t('✓ Challenge abgeschlossen · Schreiben selbst geprüft','✓ Challenge completed · writing self-assessed'):t('Kurze Runde · schwierige Antworten anschließend noch einmal üben','Short round · practise difficult answers again afterwards')}</small></div>`:`<small class="hard-entry-hint" id="hardEntryHint-${lesson.id}">${t('Ab 80 % im Lektionscheck','Unlocks at 80% in the lesson check')}</small>`}</section>`;
  }
  function render({lesson,view,state,save,onBack,onLegacy}){
    const hard=((state.lessonWork||={})[lesson.id]||={}).hardMode||={};
    const progress=hard.challenge||={history:[]};progress.history||=[];
    let a=progress.attempt,root=null,storageError='',playing=false,audioRun=0,audioTimer=null,audioError='',notice='';
    function persist(done=false){
      try{save(done);storageError='';}catch{storageError=t('Speichern fehlgeschlagen. Lass die Seite offen und kopiere deinen Text.','Saving failed. Keep this page open and copy your text.');}
      const el=root?.querySelector('#challengeSave');if(el)el.textContent=storageError||t('Zwischenstand gespeichert','Progress saved');
    }
    function cancelAudio(){audioRun++;if(audioTimer)clearTimeout(audioTimer);audioTimer=null;playing=false;window.A1Voice?.cancel();}
    function leave(){cancelAudio();redraw=null;detach=null;onBack();}
    function legacy(){cancelAudio();redraw=null;detach=null;onLegacy();}
    function mount(body){
      view.innerHTML=`<div class="hard-mode lesson-challenge" data-i18n-ignore data-bug-lesson="1"><div class="between"><button class="tiny-btn" id="challengeBack">← ${t('Zur Lektion','Back to lesson')}</button><span class="hard-eyebrow">HARD MODE · 1</span></div><h2 id="challengeHeading" tabindex="-1">${t('Lektions-Challenge','Lesson challenge')}</h2>${a?`<p class="hard-save-status" id="challengeSave" role="status">${esc(storageError)||t('Zwischenstand gespeichert','Progress saved')}</p>`:''}${body}</div>`;
      root=view.firstElementChild;root.querySelector('#challengeBack').onclick=leave;
      root.querySelectorAll('[data-challenge-legacy]').forEach(el=>el.onclick=legacy);
      root.querySelectorAll('[data-challenge-history]').forEach(el=>el.onclick=history);
      window.A1BugReports?.setContext({lessonId:1,step:'hard-mode'});
      detach=()=>{if(!root.isConnected){cancelAudio();redraw=null;detach=null;}};
      redraw=()=>{if(!root.isConnected)return;const active=document.activeElement,id=active?.id,start=active?.selectionStart,end=active?.selectionEnd;draw();if(id){const el=root.querySelector('#'+id);el?.focus({preventScroll:true});if(typeof start==='number'&&el?.setSelectionRange)el.setSelectionRange(start,end);}};
    }
    const legacyButton=()=>hard.attempt||hard.history?.length?`<button class="tiny-btn" data-challenge-legacy>${t('Bisherigen Hard Mode ansehen','View previous Hard Mode')}</button>`:'';
    const historyButton=()=>progress.history.length?`<button class="tiny-btn" data-challenge-history>${t('Frühere Runden','Previous rounds')} (${progress.history.length})</button>`:'';
    function intro(){
      mount(`<section class="card hard-intro"><span class="hard-eyebrow">${t('BEGRÜSSEN & VORSTELLEN','GREET & INTRODUCE YOURSELF')}</span><h3>${t('Acht kleine Schritte. Das kannst du schon.','Eight small steps. You have learned all of this.')}</h3><p>${t('Wende die wichtigsten Sätze aus Lektion 1 in kleinen Alltagssituationen an.','Use the key phrases from lesson 1 in short everyday situations.')}</p><ul class="challenge-intro-list"><li>${t('2 Aufgaben zum Reinkommen, 3 zum Anwenden','2 warm-up tasks, 3 application tasks')}</li><li>${t('2 kurze Hörfragen, 1 Vorstellung mit zwei Sätzen','2 short listening tasks, 1 two-sentence introduction')}</li><li>${t('Etwa 6–10 Minuten, ohne Zeitlimit','About 6–10 minutes, with no time limit')}</li></ul><p>${t('Hinweise und Wortauswahl helfen dir bei Bedarf. Du kannst so oft hören, wie du möchtest. Nach jeder Antwort bekommst du eine Erklärung.','Use hints and word choices whenever you need them. Listen as often as you like. Each answer comes with an explanation.')}</p><p class="muted">${t('Hilfen kosten keine Punkte. Am Ende übst du nur die noch schwierigen Aufgaben erneut. Deine zwei eigenen Sätze prüfst du selbst mit einem Beispiel.','Hints do not cost points. At the end, practise only the tasks you still find difficult. Check your own two sentences against an example.')}</p><button class="hard-start" id="challengeBegin">${t('Challenge starten','Start challenge')} →</button></section>${legacyButton()}${historyButton()}`);
      root.querySelector('#challengeBegin').onclick=fresh;
    }
    function fresh(){
      cancelAudio();if(a)progress.history.push(JSON.parse(JSON.stringify(a)));
      a=progress.attempt={version:VERSION,kind:'lesson-challenge',phase:'running',queue:tasks.map((_,i)=>i),cursor:0,answers:tasks.map(()=>''),checked:tasks.map(()=>false),solved:tasks.map(()=>false),firstCorrect:tasks.map(()=>null),firstAnswers:tasks.map(()=>null),hints:tasks.map(()=>0),helpOpen:tasks.map(()=>false),orders:tasks.map(q=>q.options?shuffle(q.options):null),plays:tasks.map(()=>0),writingChecks:[false,false],rate:.75,bonus:'',startedAt:Date.now()};
      notice='';persist();draw();focusHeading();
    }
    const focusHeading=()=>{root.querySelector('#challengeHeading')?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});};
    function progressHtml(){return `<div class="challenge-progress"><span>${a.solved.filter(Boolean).length}/8 ${t('korrekt','correct')}</span><div role="progressbar" aria-label="${t('Korrekte Antworten','Correct answers')}" aria-valuenow="${a.solved.filter(Boolean).length}" aria-valuemin="0" aria-valuemax="8">${a.solved.map(ok=>`<i class="${ok?'is-done':''}"></i>`).join('')}</div></div>`;}
    function hintsHtml(q,i){
      if(a.checked[i])return '';
      const open=a.helpOpen?.[i]??a.hints[i]>0;
      return `<div class="challenge-help"><button type="button" class="tiny-btn" id="challengeHint" aria-expanded="${open}">${!open?t(a.hints[i]?'Hinweise anzeigen':'Hinweis anzeigen','Show a hint'):q.bank&&a.hints[i]===1?t('Wortauswahl anzeigen','Show word choices'):t('Hinweise ausblenden','Hide hints')}</button>${open?`<p class="challenge-hint">${esc(text(q.hint))}</p>`:''}${open&&q.bank&&a.hints[i]>1?`<div class="challenge-word-bank" aria-label="${t('Wortauswahl','Word choices')}">${q.bank.map(word=>`<button type="button" data-challenge-word="${esc(word)}" lang="fr">${esc(word)}</button>`).join('')}</div>`:''}</div>`;
    }
    function answerHtml(q,i){
      const checked=a.checked[i];
      if(q.options)return `<fieldset class="challenge-options" ${checked?'disabled':''}><legend class="challenge-sr">${t('Deine Antwort','Your answer')}</legend>${a.orders[i].map((value,j)=>`<label class="hard-option"><input type="radio" name="challenge-answer" id="challengeOption${j}" value="${esc(value)}" ${a.answers[i]===value?'checked':''}><span lang="fr">${esc(value)}</span></label>`).join('')}</fieldset>`;
      if(q.type==='writing')return `<label for="challengeAnswer">${t('Deine zwei Sätze auf Französisch','Your two sentences in French')}</label><textarea id="challengeAnswer" lang="fr" rows="4" maxlength="1200" ${checked?'readonly':''}>${esc(a.answers[i])}</textarea><div class="challenge-writing-checks"><p>${t('Prüfe selbst:','Check your answer:')}</p>${[t('Ich nenne meinen Namen.','I give my name.'),t('Ich nenne meinen Wohnort.','I say where I live.')].map((label,j)=>`<label><input type="checkbox" data-challenge-writing="${j}" ${a.writingChecks[j]?'checked':''} ${checked?'disabled':''}>${label}</label>`).join('')}</div><p class="muted">${t('Deine Formulierungen werden hier nicht automatisch bewertet.','Your wording is not assessed automatically here.')}</p>`;
      return `<p class="challenge-sentence" lang="fr">${esc(q.sentence)}</p><label for="challengeAnswer">${t('Das fehlende Wort oder die Wortgruppe','The missing word or phrase')}</label><input type="text" id="challengeAnswer" lang="fr" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="100" value="${esc(a.answers[i])}" ${checked?'readonly':''}><div class="hard-accents" ${checked?'hidden':''}>${['é','à','ç','’'].map(c=>`<button type="button" data-challenge-char="${c}" aria-label="${t('Einfügen','Insert')} ${c}">${c}</button>`).join('')}</div>`;
    }
    function audioHtml(q){return `<div class="challenge-audio"><button type="button" class="secondary-btn" id="challengeListen" ${playing?'disabled':''}>▶ ${t('Anhören','Listen')}</button><label>${t('Tempo','Speed')}<select id="challengeRate"><option value="0.75" ${a.rate===.75?'selected':''}>75 %</option><option value="1" ${a.rate===1?'selected':''}>100 %</option></select></label><button type="button" class="tiny-btn" id="challengeStop" ${playing?'':'hidden'}>${t('Stoppen','Stop')}</button></div><p class="muted">${t('Du kannst den Text beliebig oft anhören.','Listen as often as you like.')}</p><p class="hard-error" id="challengeAudioError" role="status">${esc(audioError)}</p>`;}
    function feedbackHtml(q,i){
      if(!a.checked[i])return '';
      return `<div class="challenge-feedback ${a.solved[i]?'is-correct':'is-practice'}" id="challengeFeedback" role="status" tabindex="-1"><strong>${q.type==='writing'?t('✓ Selbst geprüft','✓ Self-assessed'):a.solved[i]?t('✓ Das passt!','✓ That fits!'):t('Das üben wir gleich noch einmal.','We will practise this again shortly.')}</strong><p>${esc(text(q.explanation))}</p><p lang="fr">${q.type==='writing'?esc(q.model):esc(q.audio||q.answers[0])}</p>${q.type==='writing'?`<small>${t('Eine mögliche Vorstellung','One possible introduction')}</small>`:''}</div>${q.type==='listening'?`<details class="challenge-transcript"><summary>${t('Hörtext aufdecken','Show the recording text')}</summary><p lang="fr">${esc(q.recording)}</p></details>`:''}`;
    }
    function taskPage(){
      const i=a.queue[a.cursor],q=tasks[i];
      mount(`${progressHtml()}<section class="card challenge-task"><span class="hard-eyebrow">${a.round?t('ZWEITE CHANCE','ANOTHER TRY'):t('AUFGABE','TASK')} ${i+1} / 8</span><h3>${esc(text(q.title))}</h3><p>${esc(text(q.prompt))}</p>${q.type==='listening'?audioHtml(q):''}${answerHtml(q,i)}${hintsHtml(q,i)}${feedbackHtml(q,i)}<p class="hard-error" id="challengeNotice" role="alert">${esc(notice)}</p><div class="challenge-actions">${a.cursor>0?`<button type="button" class="secondary-btn" id="challengePrevious">← ${t('Zurück','Back')}</button>`:''}<button type="button" class="hard-start" id="${a.checked[i]?'challengeNext':'challengeCheck'}">${a.checked[i]?(a.cursor===a.queue.length-1?t('Runde ansehen','View round'):t('Weiter','Next')):q.type==='writing'?t('Mit Beispiel vergleichen','Compare with an example'):t('Antwort prüfen','Check answer')} →</button></div></section>`);
      const input=root.querySelector('#challengeAnswer');
      if(input&&!a.checked[i]){input.oninput=()=>{a.answers[i]=input.value;persist();};if(q.type==='text')input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();grade(i);}};}
      root.querySelectorAll('input[name="challenge-answer"]').forEach(el=>el.onchange=()=>{if(!a.checked[i]){a.answers[i]=el.value;persist();}});
      root.querySelectorAll('[data-challenge-writing]').forEach(el=>el.onchange=()=>{if(!a.checked[i]){a.writingChecks[Number(el.dataset.challengeWriting)]=el.checked;persist();}});
      root.querySelectorAll('[data-challenge-char]').forEach(el=>{el.onmousedown=e=>e.preventDefault();el.onclick=()=>{if(a.checked[i])return;input.setRangeText(el.dataset.challengeChar,input.selectionStart??input.value.length,input.selectionEnd??input.value.length,'end');input.focus();a.answers[i]=input.value;persist();};});
      root.querySelector('#challengeHint')?.addEventListener('click',()=>{a.helpOpen||=tasks.map((_,n)=>a.hints[n]>0);const open=a.helpOpen[i];a.helpOpen[i]=!(open&&a.hints[i]>=(q.bank?2:1));if(a.helpOpen[i]&&(a.hints[i]===0||open))a.hints[i]=Math.min(q.bank?2:1,a.hints[i]+1);persist();draw();root.querySelector('#challengeHint')?.focus({preventScroll:true});});
      root.querySelectorAll('[data-challenge-word]').forEach(el=>el.onclick=()=>{a.answers[i]=el.dataset.challengeWord;input.value=a.answers[i];input.focus();persist();});
      root.querySelector('#challengeCheck')?.addEventListener('click',()=>grade(i));
      root.querySelector('#challengeNext')?.addEventListener('click',()=>advance(1));
      root.querySelector('#challengePrevious')?.addEventListener('click',()=>advance(-1));
      root.querySelector('#challengeListen')?.addEventListener('click',()=>play(i));
      root.querySelector('#challengeStop')?.addEventListener('click',()=>{cancelAudio();updateAudio();});
      root.querySelector('#challengeRate')?.addEventListener('change',e=>{a.rate=Number(e.target.value);persist();});
      mountFeedback(q,false);
    }
    function mountFeedback(q,autoplay){if(q.type!=='listening'&&root.querySelector('#challengeFeedback')){window.A1AnswerFeedback?.mount(root.querySelector('#challengeFeedback'),{text:q.audio||q.model,lang:'fr',uiLang:en()?'en':'de',autoplay:false});if(autoplay)window.A1AnswerFeedback?.play(q.audio||q.model,'fr');}}
    function grade(i){
      if(a.checked[i])return;
      const q=tasks[i];notice='';
      if(!a.answers[i].trim())notice=t('Wähle oder schreibe zuerst eine Antwort.','Choose or write an answer first.');
      else if(q.type==='writing'&&!a.writingChecks.every(Boolean))notice=t('Prüfe deine zwei Sätze und hake beide Aussagen an. Du kannst sie vorher noch verbessern.','Check your two sentences and tick both statements. You can improve your text first.');
      if(notice){root.querySelector('#challengeNotice').textContent=notice;return;}
      const ok=q.type==='writing'||window.FR_A1_HARD_MODE.matches(a.answers[i],q.answers);
      if(a.firstCorrect[i]===null){a.firstCorrect[i]=ok;a.firstAnswers[i]=a.answers[i];}
      a.checked[i]=true;a.solved[i]=ok;cancelAudio();persist();draw();mountFeedback(q,true);root.querySelector('#challengeFeedback')?.focus({preventScroll:true});
    }
    function advance(direction){
      cancelAudio();notice='';audioError='';
      if(a.cursor+direction>=a.queue.length){a.phase='round-end';if(a.solved.every(Boolean))complete();else persist();}
      else{a.cursor=Math.max(0,a.cursor+direction);persist();}
      draw();focusHeading();
    }
    function complete(){
      if(a.completedAt)return;
      const correct=a.firstCorrect.slice(0,7).filter(Boolean).length;
      a.phase='completed';a.completedAt=Date.now();a.hintsUsed=a.hints.reduce((s,n)=>s+n,0);a.result={correct,total:7,pct:Math.round(correct/7*100),passed:true};
      progress.completedAt=a.completedAt;progress.attemptsCompleted=(progress.attemptsCompleted||0)+1;progress.bestFirstTry=Math.max(progress.bestFirstTry||0,a.result.pct);persist(true);
    }
    function roundEnd(){
      const missed=tasks.map((_,i)=>i).filter(i=>!a.solved[i]),done=completed(a),correct=a.firstCorrect.slice(0,7).filter(Boolean).length;
      mount(`${progressHtml()}<section class="card challenge-result"><span class="challenge-complete">${done?t('✓ CHALLENGE ABGESCHLOSSEN','✓ CHALLENGE COMPLETED'):t('DEINE ERSTE RUNDE IST GESCHAFFT','YOUR ROUND IS COMPLETE')}</span><h3>${done?t('Du kannst dich vorstellen.','You can introduce yourself.'):t('Noch ein paar kleine Schritte.','A few small steps to go.')}</h3><p>${done?t('Du hast alle acht Aufgaben bearbeitet und die schwierigen Antworten noch einmal geübt.','You have worked through all eight tasks and practised any difficult answers again.'):t(`${8-missed.length} von 8 Aufgaben geschafft. Jetzt kommen nur die ${missed.length} noch schwierigen Aufgaben.`,`${8-missed.length} of 8 tasks completed. Now revisit only the ${missed.length} tasks you still find difficult.`)}</p><p class="muted">${t(`${correct} von 7 Wissensfragen beim ersten Prüfen richtig. Schreiben selbst geprüft. Hilfen ändern diese Zählung nicht.`,`${correct} of 7 knowledge questions correct on the first check. Writing self-assessed. Hints do not change this count.`)}</p>${done&&correct===7&&!a.hintsUsed?`<p class="challenge-extra">★ ${t('Besonders sicher · alle Wissensfragen beim ersten Prüfen ohne Hilfen gelöst','Extra confidence · all knowledge questions correct on the first check without hints')}</p>`:''}${!done?`<button class="hard-start" id="challengePractise">${missed.length===1?t('Eine Aufgabe nochmal üben','Practise one task again'):t(`${missed.length} Aufgaben nochmal üben`,`Practise ${missed.length} tasks again`)} →</button>`:`<p>${t('Name nennen · Herkunft und Wohnort unterscheiden · höflich nachfragen','Give your name · distinguish origin and home · ask politely')}</p><details class="challenge-bonus"><summary>${t('Lust auf mehr? Freiwilliger Zusatz','Want more? An optional extra')}</summary><p>${t('Ergänze deine Vorstellung um eine Begrüßung und die Sprachen, die du sprichst.','Add a greeting and the languages you speak to your introduction.')}</p><label for="challengeBonus">${t('Deine längere Vorstellung','Your longer introduction')}</label><textarea id="challengeBonus" lang="fr" rows="4" maxlength="2000">${esc(a.bonus)}</textarea><details><summary>${t('Beispiel ansehen','Show an example')}</summary><p lang="fr">Bonjour ! Je m’appelle Anna. J’habite à Halifax. Je parle allemand et un peu français.</p></details></details><button class="secondary-btn" id="challengeNew">${t('Neue Runde starten','Start a new round')}</button>`}<button class="tiny-btn" id="challengeReview">${t('Meine Antworten ansehen','View my answers')}</button></section>${legacyButton()}${historyButton()}`);
      root.querySelector('#challengePractise')?.addEventListener('click',()=>{a.queue=missed;a.cursor=0;a.round=(a.round||0)+1;a.phase='running';for(const i of missed){a.checked[i]=false;a.answers[i]='';}persist();draw();focusHeading();});
      root.querySelector('#challengeNew')?.addEventListener('click',()=>{root.querySelector('#challengeNew').outerHTML=`<div class="challenge-new"><p>${t('Diese Runde bleibt im Verlauf gespeichert.','This round will remain in your history.')}</p><button class="hard-start" id="challengeConfirmNew">${t('Neue Runde beginnen','Begin a new round')}</button></div>`;root.querySelector('#challengeConfirmNew').onclick=fresh;});
      root.querySelector('#challengeReview').onclick=()=>review(a);
      root.querySelector('#challengeBonus')?.addEventListener('input',e=>{a.bonus=e.target.value;persist();});
    }
    function review(attempt){
      mount(`<section class="card"><h3>${t('Deine Antworten','Your answers')}</h3><p class="muted">${t('Die Wissensfragen wurden automatisch geprüft; deine Vorstellung hast du selbst geprüft.','The knowledge questions were checked automatically; you assessed your introduction yourself.')}</p>${tasks.map((q,i)=>`<div class="hard-review-item"><strong>${i+1}. ${esc(text(q.title))}</strong><p lang="fr">${esc(attempt.answers[i])||'—'}</p>${attempt.firstAnswers[i]!==attempt.answers[i]?`<small>${t('Erster Versuch','First attempt')}: ${esc(attempt.firstAnswers[i])||'—'}</small>`:''}<p>${t('Mögliche Lösung','Possible answer')}: <span lang="fr">${esc(q.audio||q.answers?.[0]||q.model)}</span></p></div>`).join('')}<button class="secondary-btn" id="challengeReturn">${t('Zur aktuellen Runde','Back to current round')}</button></section>`);root.querySelector('#challengeReturn').onclick=draw;
    }
    function history(){
      mount(`<section class="card"><h3>${t('Frühere Runden','Previous rounds')}</h3>${progress.history.map((item,i)=>`<p><button class="secondary-btn" data-challenge-old="${i}">${t('Runde','Round')} ${i+1} · ${item.result?item.result.correct+'/7':t('Entwurf','Draft')}</button></p>`).join('')}<button class="secondary-btn" id="challengeReturn">${t('Zur aktuellen Runde','Back to current round')}</button></section>`);root.querySelectorAll('[data-challenge-old]').forEach(el=>el.onclick=()=>review(progress.history[Number(el.dataset.challengeOld)]));root.querySelector('#challengeReturn').onclick=draw;
    }
    function updateAudio(){
      if(!root?.isConnected)return;const btn=root.querySelector('#challengeListen');if(btn)btn.disabled=playing;const stop=root.querySelector('#challengeStop');if(stop)stop.hidden=!playing;const error=root.querySelector('#challengeAudioError');if(error)error.textContent=audioError||(playing?t('Audio läuft …','Audio playing …'):'');
    }
    function play(i){
      if(playing)return;
      if(!window.A1Voice?.speakDialogue||!window.speechSynthesis||typeof window.SpeechSynthesisUtterance==='undefined'){audioError=t('Audio ist hier nicht verfügbar. Nutze einen Browser mit französischer Sprachausgabe.','Audio is unavailable here. Use a browser with French speech synthesis.');updateAudio();return;}
      const run=++audioRun;playing=true;audioError='';a.plays[i]++;persist();updateAudio();let finished=false;
      const finish=failed=>{if(finished||run!==audioRun)return;finished=true;if(audioTimer)clearTimeout(audioTimer);audioTimer=null;playing=false;if(failed)audioError=t('Audio konnte nicht abgespielt werden. Bitte erneut versuchen.','Audio could not play. Please try again.');updateAudio();};
      audioTimer=setTimeout(()=>{finish(true);window.A1Voice?.cancel();},240000);
      try{if(window.A1Voice.speakDialogue([{speaker:'A',text:tasks[i].recording,gender:tasks[i].gender}],{lang:'fr-FR',rate:a.rate,onEnd:()=>finish(false),onError:()=>finish(true)})===false)finish(true);}catch{finish(true);}
    }
    function draw(){if(!a)return intro();if(a.version!==VERSION){mount(`<section class="card"><p>${t('Deine frühere Runde bleibt gespeichert. Starte die aktuelle Challenge.','Your earlier round remains saved. Start the current challenge.')}</p><button class="hard-start" id="challengeBegin">${t('Aktuelle Challenge starten','Start current challenge')}</button></section>`);root.querySelector('#challengeBegin').onclick=fresh;return;}if(a.phase==='running')taskPage();else roundEnd();}
    draw();
  }
  window.FR_A1_LESSON_CHALLENGE={supports,entryHtml,render};
})();
