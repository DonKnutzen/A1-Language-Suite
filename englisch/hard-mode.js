/* A saved exam-style attempt, separate from normal lesson completion. */
(() => {
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const AUDIO_PLAYS=3;
  const en=()=>false;
  const t=(de,english)=>en()?english:de;
  const words=text=>(String(text).match(/[\p{L}\p{N}]+(?:[’'’-][\p{L}\p{N}]+)*/gu)||[]).length;
  function normalize(value,strictAccents=false){
    let text=String(value??'').normalize('NFC').trim().toLocaleLowerCase('en').replace(/[’‘]/g,"'").replace(/[.,;!?]+$/g,'').replace(/\s+/g,' ').replace(/\s*'\s*/g,"'").replace(/[‐‑–]/g,'-');
    return strictAccents?text:text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/œ/g,'oe');
  }
  // Preserve the original scoring of saved v1 attempts, including its formatting rules.
  function legacyMatches(value,answers){
    const got=normalize(value);if(!got)return false;
    return answers.some(answer=>{
      const expected=normalize(answer);
      // Telephone groups and decimal commas are formatting, not different numbers.
      if(/^\d[\d\s]*$/.test(expected)){
        if(expected.replace(/\s/g,'').length>=6&&/^\d[\d\s.-]*\d$/.test(got))return got.replace(/[\s.-]/g,'')===expected.replace(/\s/g,'');
        return got.replace(/\s/g,'')===expected.replace(/\s/g,'');
      }
      if(/^\d+[,.]\d+$/.test(expected))return got.replace(',','.')===expected.replace(',','.');
      if(/^\d{1,2}[:h]\d{2}$/.test(expected)){
        const actualTime=got.replace(/\s/g,'').match(/^(\d{1,2})[:h](\d{2})?$/),expectedTime=expected.match(/^(\d{1,2})[:h](\d{2})$/);
        if(actualTime)return Number(actualTime[1])===Number(expectedTime[1])&&Number(actualTime[2]||0)===Number(expectedTime[2]);
      }
      return got===expected;
    });
  }
  function matches(value,answers,policy={}){
    const raw=String(value??'').trim();if(!raw)return false;
    if(policy.format==='email')return answers.some(a=>raw.normalize('NFC').toLowerCase()===String(a).normalize('NFC').toLowerCase());
    const got=normalize(raw,policy.strictAccents);
    return answers.some(answer=>{
      const expected=normalize(answer,policy.strictAccents);
      if(policy.format==='code')return got.replace(/\s/g,'')===expected.replace(/\s/g,'');
      if(policy.format==='phone'){
        const phone=s=>{if(!/^\+?[\d(][\d\s().-]*\d$/.test(s))return null;let n=s.replace(/[\s().-]/g,'');if(n.startsWith('+33'))n='0'+n.slice(3);else if(n.startsWith('0033'))n='0'+n.slice(4);return n;};
        return phone(raw)!==null&&phone(raw)===phone(String(answer));
      }
      if(policy.format==='number'){
        const number=s=>/^\d+(?:[,.]\d{1,2})?$/.test(s)?Number(s.replace(',','.')):null;
        return number(got)!==null&&number(got)===number(expected);
      }
      if(policy.format==='time'){
        const time=s=>{const m=s.replace(/^a\s*/,'').replace(/\s/g,'').match(/^(\d{1,2})(?:[:h](\d{2})?)?$/);if(!m)return null;const h=Number(m[1]),min=Number(m[2]||0);return h<24&&min<60?h*60+min:null;};
        // Explicit word variants can still be authored; arbitrary strings never partially match.
        return got===expected||(time(got)!==null&&time(got)===time(expected));
      }
      if(policy.numberWords)return got.replace(/-/g,' ')===expected.replace(/-/g,' ');
      return got===expected;
    });
  }
  const answerMatches=(data,q,value)=>data.version===1?legacyMatches(value,q.answers):matches(value,q.answers,q);
  const shuffle=values=>{const out=[...values];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
  const unlocked=(state,id)=>Number(state.lessonMasteryBest?.[id]||0)>=80;
  const questions=data=>data.listening.flatMap(block=>block.questions);
  function objective(data,attempt){
    const gap=data.gaps.filter((q,i)=>answerMatches(data,q,attempt.gaps[i])).length;
    const listening=questions(data).filter((q,i)=>answerMatches(data,q,attempt.listening[i])).length;
    const total=data.gaps.length+questions(data).length;
    return {gap,listening,correct:gap+listening,total,pct:Math.round((gap+listening)/total*(data.version===1?100:1000))/(data.version===1?1:10)};
  }
  function writingPassed(attempt){
    return Array.isArray(attempt.ratings)&&attempt.ratings.length===4&&attempt.ratings.every(n=>Number.isInteger(n)&&n>=1&&n<=2)&&attempt.ratings.reduce((a,b)=>a+b,0)>=6;
  }
  function passed(data,attempt){
    const score=objective(data,attempt);
    const objectivePassed=data.version===1?score.pct>=80&&score.gap/data.gaps.length>=.5&&score.listening/questions(data).length>=.5:score.gap*5>=data.gaps.length*4&&score.listening*5>=questions(data).length*4;
    return objectivePassed&&words(attempt.text)>=data.writing.minWords&&writingPassed(attempt);
  }
  // Award a completed, passed attempt using raw counts, never a rounded display score.
  function achievedResult(attempt){
    const r=attempt?.result;
    return attempt?.phase==='reviewed'&&!!attempt.completedAt&&r?.passed===true&&Number.isInteger(r.correct)&&Number.isInteger(r.total)&&r.total>0&&r.correct>=0&&r.correct<=r.total&&r.correct*100>=r.total*85;
  }
  function achievement(state,id){
    const progress=state.lessonWork?.[id]?.hardMode;
    return [progress?.attempt,...(progress?.history||[])].filter(achievedResult).sort((a,b)=>b.result.correct/b.result.total-a.result.correct/a.result.total)[0]||null;
  }
  const goldResult=attempt=>achievedResult(attempt)&&attempt.result.correct*100>=attempt.result.total*95;
  const achievementClass=attempt=>achievedResult(attempt)?'is-hard-achieved '+(goldResult(attempt)?'is-hard-gold':'is-hard-tricolour'):'';
  const achievementBadge=attempt=>badgeMarkup(goldResult(attempt));
  function badgeMarkup(gold){
    return `<span class="hard-achievement-badge" data-hard-achievement-badge data-gold="${gold}" data-i18n-ignore title="${esc(gold?t('Gold erreicht · 95–100 % · Schreiben selbst geprüft','Gold earned · 95–100% · writing self-assessed'):t('Auszeichnung ab 85 % · Schreiben selbst geprüft','Award earned · at least 85% · writing self-assessed'))}"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 3h8v6a4 4 0 0 1-8 0V3Zm0 2H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4M12 13v5m-4 3h8m-7-3h6v3H9z"/></svg>Hard Mode · ${gold?'Gold · 95–100 %':'85 % +'}</span>`;
  }
  let redraw=null,redrawEntry=null,checkDetached=null;
  window.addEventListener('a1suite:languagechange',()=>{redraw?.();redrawEntry?.();document.querySelectorAll('[data-hard-achievement-badge]').forEach(el=>{el.outerHTML=badgeMarkup(el.dataset.gold==='true');});});
  function entryHtml(lesson,state){
    const open=unlocked(state,lesson.id),p=state.lessonWork?.[lesson.id]?.hardMode,data=window.EN_A1_HARD_CONTENT[lesson.id];
    const done=!!p?.passedAt&&(p.passedVersion===data.version||data.compatibleVersions?.includes(p.passedVersion));
    const lock=`<svg class="hard-lock-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0${open?'':'v3'}"/><path d="M12 14v3"/></svg>`;
    const label=open?(p?.attempt?(p.attempt.phase==='reviewed'?t('Ansehen','Review'):t('Fortsetzen','Resume')):t('Starten','Start')):t('Gesperrt','Locked');
    return `<section class="hard-entry ${open?'is-unlocked':'is-locked'}" data-i18n-ignore aria-label="Hard Mode">
      <button type="button" class="hard-entry-button" data-hard-start ${open?'':'disabled'} aria-describedby="hardEntryHint-${lesson.id}">${lock}<strong>Hard Mode</strong><span>${label}${open?' →':''}</span></button>
      ${open?`<div class="hard-entry-info"><div class="hard-entry-meta"><span>3 ${t('Teile','parts')}</span><span>${data.taskCount||data.gaps.length+questions(data).length+1} ${t('Aufgaben','tasks')}</span><span>≈ ${(data.minutes||[25,35]).join('–')} Min.</span></div><p id="hardEntryHint-${lesson.id}">${t('Lückentext · Hörverstehen · Eigene Nachricht','Cloze text · Listening · Your own message')}</p><small>${done?t('✓ Trainingsziel erreicht · Schreiben selbst geprüft','✓ Practice target met · writing self-assessed'):p?.passedAt?t('Neue Aufgaben verfügbar · frühere Ergebnisse bleiben gespeichert','Updated tasks available · previous results are saved'):t('Freigeschaltet · Fortschritt wird gespeichert.','Unlocked · Progress is saved.')}</small></div>`:`<small id="hardEntryHint-${lesson.id}" class="hard-entry-hint">${t('Ab 80 % im Lektionscheck','Unlocks at 80% in the lesson check')}</small>`}
    </section>`;
  }
  function renderEntry({lesson,view,state,onStart}){
    const host=document.createElement('div');view.appendChild(host);
    function update(){host.innerHTML=entryHtml(lesson,state);host.querySelector('[data-hard-start]').onclick=onStart;}
    redrawEntry=()=>{if(host.isConnected)update();};update();
  }
  function render({lesson,view,state,save,onBack}){
    const latestData=window.EN_A1_HARD_CONTENT[lesson.id];
    if(!latestData)return onBack();
    if(!unlocked(state,lesson.id)){
      view.innerHTML=`<section class="card" data-i18n-ignore><h2>🔒 Hard Mode</h2><p>${t('Bestehe zuerst den Lektionscheck mit mindestens 80 %.','Pass the lesson check with at least 80% first.')}</p><button class="secondary-btn" id="hardLockedBack">${t('Zur Lektion','Back to lesson')}</button></section>`;
      view.querySelector('button').onclick=onBack;return;
    }
    const work=(state.lessonWork||={})[lesson.id]||={};
    const progress=work.hardMode||={};
    progress.contentVersions||={};progress.history||=[];progress.bestByVersion||={};
    let data=latestData,allQuestions=[],a=progress.attempt,root=null,playing=null,error='',focusTarget=null,focusHeading=true,storageError='',audioRun=0,audioTimer=null;
    if(progress.bestObjective!==undefined&&!Object.keys(progress.bestByVersion).length)progress.bestByVersion[a?.version||1]=progress.bestObjective;
    if(progress.passedAt&&!progress.passedVersion)progress.passedVersion=a?.version||1;
    function bindDataset(){
      const version=a?.version??latestData.version;
      const candidate=progress.contentVersions[version]||(version===latestData.version?latestData:window.EN_A1_HARD_VERSIONS?.[version]?.[lesson.id]||window.EN_A1_HARD_LEGACY?.[lesson.id]);
      data=candidate?.version===version?candidate:null;
      allQuestions=data?questions(data):[];
      if(data){progress.contentVersions[version]||=JSON.parse(JSON.stringify(data));
        if(a&&data.version>=2&&!Array.isArray(a.optionOrders)&&!(a.phase==='running'&&data.version<latestData.version))a.optionOrders=allQuestions.map(q=>q.options?shuffle(q.options):null);
      }
    }
    bindDataset();
    // An unfinished saved attempt must not keep serving superseded, leading questions.
    // Archive it intact, then carry only responses whose task and marking policy still match.
    function updateDraft(){
      if(!a||a.phase!=='running'||!data||data.version>=latestData.version)return false;
      const previous=a,old=data;
      const key=(q,gap=false)=>JSON.stringify({q:gap?q.hint:q.q,answers:[...q.answers].sort(),options:q.options?[...q.options].sort():null,format:q.format||'',strictAccents:!!q.strictAccents,numberWords:!!q.numberWords});
      const orders=[],answers=[],plays=[];let offset=0;
      latestData.listening.forEach((block,b)=>{
        const before=old.listening[b],used=new Set();
        block.questions.forEach(q=>{
          const index=before?.questions.findIndex((candidate,i)=>!used.has(i)&&key(candidate)===key(q))??-1;
          if(index>=0)used.add(index);
          answers.push(index>=0?previous.listening?.[offset+index]||'':'');
          const saved=index>=0?previous.optionOrders?.[offset+index]:null;
          orders.push(q.options?(Array.isArray(saved)&&saved.length===q.options.length&&new Set(saved).size===q.options.length&&saved.every(o=>q.options.includes(o))?[...saved]:shuffle(q.options)):null);
        });
        const sameRecording=before?.text===block.text&&before.questions.length===block.questions.length&&before.questions.every((q,i)=>key(q)===key(block.questions[i]));
        plays.push(sameRecording?Math.max(0,Math.min(AUDIO_PLAYS,Number(previous.plays?.[b])||0)):0);
        offset+=before?.questions.length||0;
      });
      progress.history.push(JSON.parse(JSON.stringify(previous)));
      a=progress.attempt={...previous,version:latestData.version,
        gaps:latestData.gaps.map((q,i)=>old.gaps[i]&&key(old.gaps[i],true)===key(q,true)?previous.gaps?.[i]||'':''),
        listening:answers,optionOrders:orders,plays,ratings:[null,null,null,null],
        updatedFromVersion:previous.version,updatedAt:Date.now()};
      delete a.result;delete a.submittedAt;delete a.completedAt;
      bindDataset();return true;
    }
    if(updateDraft())persist();
    function persist(completed=false){
      try{save(completed);storageError='';}
      catch{storageError=t('Speichern fehlgeschlagen. Lass diese Seite offen und kopiere deinen Text.','Saving failed. Keep this page open and copy your text.');}
      const status=root?.querySelector('#hardSaveStatus');if(status)status.textContent=storageError||t('Zwischenstand gespeichert','Progress saved');
      return !storageError;
    }
    function fresh(){
      cancelAudio();if(progress.attempt)progress.history.push(JSON.parse(JSON.stringify(progress.attempt)));
      data=latestData;allQuestions=questions(data);
      a=progress.attempt={version:data.version,phase:'running',page:0,gaps:Array(data.gaps.length).fill(''),listening:Array(allQuestions.length).fill(''),plays:Array(data.listening.length).fill(0),text:'',ratings:[null,null,null,null],optionOrders:allQuestions.map(q=>q.options?shuffle(q.options):null),startedAt:Date.now()};
      bindDataset();focusHeading=true;persist();draw();
    }
    function cancelAudio(){audioRun++;if(audioTimer)window.clearTimeout(audioTimer);audioTimer=null;playing=null;window.A1Voice?.cancel();}
    function leave(){cancelAudio();redraw=null;checkDetached=null;onBack();}
    function mount(html){
      view.innerHTML=`<div class="hard-mode" data-i18n-ignore data-bug-lesson="${lesson.id}">${html}</div>`;
      root=view.firstElementChild;
      checkDetached=()=>{if(!root?.isConnected&&playing!==null)cancelAudio();};
      redraw=()=>{if(root?.isConnected){
        const active=document.activeElement,selector=active?.id?'#'+active.id:active?.dataset?.hardGap!==undefined?`[data-hard-gap="${active.dataset.hardGap}"]`:active?.dataset?.hardListen!==undefined?`[data-hard-listen="${active.dataset.hardListen}"]`:null;
        const start=active?.selectionStart,end=active?.selectionEnd;
        a?draw():intro();if(selector){const restored=root.querySelector(selector);restored?.focus({preventScroll:true});if(restored?.setSelectionRange&&typeof start==='number')restored.setSelectionRange(start,end);}
      }};
      window.A1BugReports?.setContext({lessonId:lesson.id,step:'hard-mode'});
      root.querySelector('#hardBack')?.addEventListener('click',leave);
      root.querySelector('#hardCurrentVersion')?.addEventListener('click',fresh);
      root.querySelector('#hardHistory')?.addEventListener('click',showHistory);
      root.querySelector('#hardPreviousDraft')?.addEventListener('click',showHistory);
      if(focusHeading){root.querySelector('#hardHeading')?.focus({preventScroll:true});focusHeading=false;}
    }
    function heading(){
      return `<div class="between"><button class="tiny-btn" id="hardBack">← ${t('Zur Lektion','Back to lesson')}</button><span class="hard-eyebrow">HARD MODE</span></div><h2 id="hardHeading" tabindex="-1">${lesson.id}. ${esc(en()?window.A1FrenchI18n?.translate(lesson.title)||lesson.title:lesson.title)}</h2>${a?`<p class="hard-save-status" id="hardSaveStatus" role="status">${esc(storageError)||t('Zwischenstand gespeichert','Progress saved')}</p>`:''}${a?.updatedFromVersion?`<p class="hard-version-note">${t('Hörfragen aktualisiert. Passende Eingaben übernommen; alter Entwurf im Verlauf.','Listening questions updated. Matching responses retained; the previous draft is in history.')} <button class="tiny-btn" id="hardPreviousDraft">${t('Alter Entwurf','Previous draft')}</button></p>`:''}${a&&data&&data.version!==latestData.version?`<p class="hard-version-note">${t(`Gespeicherter Versuch · Version ${data.version}. Aktuell ist Version ${latestData.version}. Dieser Versuch behält seine bisherigen Fragen. Die überarbeiteten Fragen erhältst du mit einem neuen Versuch; dieser Entwurf bleibt im Verlauf gespeichert.`,`Saved attempt · version ${data.version}. Current version: ${latestData.version}. This attempt keeps its original questions. Start a new attempt for the revised questions; this draft will be saved in your history.`)} <button class="tiny-btn" id="hardCurrentVersion">${t('Aktuelle Aufgaben starten','Start current tasks')}</button></p>`:''}`;
    }
    function intro(){
      mount(`${heading()}<section class="card hard-intro"><span class="hard-eyebrow">${t('DEINE LEKTION IM PRÜFUNGSMODUS','YOUR LESSON IN EXAM MODE')}</span><h3>${t('Drei Teile. Dein Wissen.','Three parts. Your knowledge.')}</h3><ol><li><strong>${t('Lückentext','Cloze text')}</strong> · ${data.gaps.length} ${t('Wörter oder Wortgruppen selbst einsetzen','words or phrases to type')}</li><li><strong>${t('Hörverstehen','Listening')}</strong> · ${allQuestions.length} ${t('Fragen, dreimal pro Text hören · Tempo 75 %','questions, three plays per recording · 75% speed')}</li><li><strong>${t('Freie Nachricht','Free writing')}</strong> · ${t(`drei Inhaltspunkte, ungefähr ${data.writing.targetWords||'30'} Wörter`,`three content points, about ${data.writing.targetWords||'30'} words`)}</li></ol><p>${t(`Orientierung: etwa ${(data.minutes||[25,35]).join('–')} Minuten, ohne Zeitlimit. Du kannst pausieren und Antworten ändern. Lösungen und Transkripte erscheinen erst nach der Abgabe.`,`Indicative time: about ${(data.minutes||[25,35]).join('–')} minutes, with no time limit. You can pause and edit answers. Answers and transcripts appear only after submission.`)}</p><p>${rules()}</p><p class="muted">${t('Eigene A1-Aufgaben für Alltagssituationen. Das Audio nutzt die englische Browserstimme. Freitext wird anhand eines Beispiels selbst geprüft.','Original A1 exercises for everyday situations. Audio uses the English browser voice. Free writing is self-assessed against an example.')}</p>${window.A1LessonFoundations?.preparationHtml('en',lesson.id,'hard')||''}${window.A1LessonFoundations?.hardInstructionsHtml('en',data)||''}<button class="hard-start" id="hardBegin">${t('Prüfung starten','Start the test')} →</button></section>`);
      root.querySelector('#hardBegin').onclick=fresh;
    }
    function unknownVersion(){
      mount(`${heading()}<section class="card"><h3>${t('Alter Versuch sicher aufbewahrt','Previous attempt preserved')}</h3><p>${t('Der zugehörige Aufgabenstand ist nicht verfügbar. Deine Antworten werden nicht gegen andere Aufgaben bewertet.','The original task version is unavailable. Your answers will not be marked against different tasks.')}</p><pre class="hard-old-draft">${esc(JSON.stringify({version:a.version,gaps:a.gaps,listening:a.listening,text:a.text,ratings:a.ratings,result:a.result},null,2))}</pre><button class="hard-start" id="hardUpdatedStart">${t('Aktuelle Aufgaben starten · alten Versuch behalten','Start current tasks · keep previous attempt')}</button></section>`);
      root.querySelector('#hardUpdatedStart').onclick=fresh;
    }
    function showHistory(){
      cancelAudio();
      mount(`${heading()}<section class="card"><h3>${t('Gespeicherte Versuche','Saved attempts')}</h3><div class="hard-history-list">${progress.history.map((item,i)=>`<button class="secondary-btn" data-hard-history="${i}">${t('Version','Version')} ${item.version} · ${new Date(item.startedAt||item.submittedAt||0).toLocaleDateString(en()?'en-CA':'de-DE')} · ${item.completedAt?t('Ergebnis ansehen','View result'):item.submittedAt?t('Selbstprüfung fortsetzen','Continue self-assessment'):item.version<latestData.version?t('Entwurf ansehen','View draft'):t('Entwurf fortsetzen','Resume draft')}</button>`).join('')}</div><button class="tiny-btn" id="hardHistoryBack">← ${t('Zum aktuellen Versuch','Current attempt')}</button></section>`);
      root.querySelector('#hardHistoryBack').onclick=draw;
      root.querySelectorAll('[data-hard-history]').forEach(btn=>btn.onclick=()=>{
        const item=progress.history[Number(btn.dataset.hardHistory)];
        if(item.phase==='running'&&item.version<latestData.version){showDraft(item);return;}
        const chosen=progress.history.splice(Number(btn.dataset.hardHistory),1)[0];if(progress.attempt)progress.history.push(progress.attempt);
        a=progress.attempt=chosen;bindDataset();persist();focusHeading=true;draw();
      });
    }
    function showDraft(item){
      const snapshot=progress.contentVersions[item.version]||window.EN_A1_HARD_VERSIONS?.[item.version]?.[lesson.id];
      const list=(values,tasks)=>`<ol>${(values||[]).map((value,i)=>`<li><strong>${esc(tasks?.[i]?.q||tasks?.[i]?.hint||String(i+1))}</strong><p>${esc(value)||'—'}</p></li>`).join('')}</ol>`;
      mount(`${heading()}<section class="card"><h3>${t('Alter Entwurf · nur ansehen','Previous draft · read only')}</h3><p>${t('Deine damaligen Eingaben bleiben erhalten. Weiterarbeiten kannst du mit den aktualisierten Fragen.','Your original responses are preserved. Continue working with the updated questions.')}</p><h4>${t('Lückentext','Cloze text')}</h4>${list(item.gaps,snapshot?.gaps)}<h4>${t('Hörverstehen','Listening')}</h4>${list(item.listening,snapshot?questions(snapshot):null)}<h4>${t('Eigene Nachricht','Your message')}</h4><pre class="hard-old-draft">${esc(item.text||'—')}</pre><button class="primary-btn" id="hardDraftBack">${t('Zum aktuellen Versuch','Current attempt')}</button></section>`);
      root.querySelector('#hardDraftBack').onclick=draw;
    }
    function isSubmitted(){return a.phase!=='running';}
    function rules(){return data.version===1?t('Trainingsziel (Version 1): 80 % insgesamt, mindestens 50 % je automatisch korrigiertem Teil. Schreiben: Mindestwortzahl, 6/8 selbst bewertete Punkte, kein Kriterium mit 0.','Practice target (version 1): 80% overall, at least 50% in each automatically marked section. Writing: minimum word count, 6/8 self-assessed points, no criterion scored 0.'):t('Trainingsziel: mindestens 80 % im Lückentext und mindestens 80 % im Hörverstehen, ohne Aufrunden. Schreiben: Mindestwortzahl, 6/8 selbst bewertete Punkte, kein Kriterium mit 0.','Practice target: at least 80% in cloze and at least 80% in listening, without rounding up. Writing: minimum word count, 6/8 self-assessed points, no criterion scored 0.');}
    function counts(){return [a.gaps.filter(s=>s.trim()).length+'/'+data.gaps.length,a.listening.filter(s=>s.trim()).length+'/'+allQuestions.length,words(a.text)+' '+t('Wörter','words')];}
    function nav(){
      const labels=[t('Lückentext','Cloze text'),t('Hörverstehen','Listening'),t('Schreiben','Writing')];
      return `<nav class="hard-nav" aria-label="${t('Prüfungsteile','Test sections')}">${labels.map((label,i)=>`<button type="button" data-hard-page="${i}" ${a.page===i?'aria-current="step"':''}><span>${i+1}</span>${label}<small data-hard-count="${i}">${counts()[i]}</small></button>`).join('')}</nav>`;
    }
    function accents(){return ''; }
    function answerFeedback(q,value){
      const ok=answerMatches(data,q,value);
      return `<div class="hard-answer ${ok?'is-correct':'is-wrong'}"><strong>${ok?'✓':'×'} ${t('Deine Antwort','Your answer')}:</strong> ${esc(value)||'—'}${!ok?`<br><strong>${t('Mögliche Lösung','Possible answer')}:</strong> ${esc(q.answers[0])}`:''}${ok&&normalize(value)!==String(value).trim().toLocaleLowerCase('en')?`<small>${t('Schreibweise der Vorlage','Model spelling')}: ${esc(q.answers[0])}</small>`:''}</div>`;
    }
    function cloze(){
      const text=data.text.replace(/\{\{(\d+)\}\}/g,(_,n)=>{
        const q=data.gaps[n];
        if(isSubmitted())return `<span class="hard-solution-word ${answerMatches(data,q,a.gaps[n])?'is-correct':'is-wrong'}">${esc(q.answers[0])}</span>`;
        return `<label class="hard-gap"><span class="hard-gap-hint">${Number(n)+1}. ${esc(q.hint)}</span><input type="text" data-hard-gap="${n}" aria-label="${t('Lücke','Gap')} ${Number(n)+1}: ${esc(q.hint)}" value="${esc(a.gaps[n])}" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="120" lang="en" style="width:${14}ch"></label>`;
      });
      return `<section class="card"><span class="hard-eyebrow">01 · ${data.gaps.length} ${t('LÜCKEN','GAPS')}</span><h3>${t('Ergänze die Nachricht.','Complete the message.')}</h3><p class="muted">${t('Tippe die fehlenden Wörter oder Wortgruppen. Die Hinweise zeigen die Grundform oder die Bedeutung.','Type the missing words or phrases. Hints give the infinitive or meaning.')}</p>${isSubmitted()?'':accents()}<div class="hard-cloze" lang="en">${text}</div>${isSubmitted()?data.gaps.map((q,i)=>`<div class="hard-review-item"><small>${i+1}. ${esc(q.hint)}</small>${answerFeedback(q,a.gaps[i])}</div>`).join(''):''}</section>`;
    }
    function listening(){
      let index=0;
      return `<section class="card"><span class="hard-eyebrow">02 · ${allQuestions.length} ${t('FRAGEN','QUESTIONS')}</span><h3>${t('Höre genau hin.','Listen carefully.')}</h3><p class="muted">${t('Lies zuerst die Fragen. Jeder Text ist dreimal abspielbar, mit Tempo 75 %. Tippe kurze Antworten; bei der Auswahl stehen vollständige Sätze.','Read the questions first. Each recording can be played three times, at 75% speed. Type short answers; multiple-choice options are complete sentences.')}</p>${isSubmitted()?'':accents()}<p class="hard-error" id="hardAudioError" role="status">${esc(error)}</p><button class="tiny-btn" type="button" data-hard-stop ${playing===null?'hidden':''}>${t('Wiedergabe stoppen · zählt als Anhören','Stop playback · counts as a play')}</button>${data.listening.map((block,b)=>`<section class="hard-recording"><div class="between"><h4>${t('Hörtext','Recording')} ${b+1}${block.kind?' · '+(block.kind==='dialogue'?t('Gespräch','Dialogue'):t('Nachricht / Ansage','Message / announcement')):''}</h4><button class="secondary-btn" data-hard-play="${b}" ${!isSubmitted()&&(a.plays[b]>=AUDIO_PLAYS||playing!==null)?'disabled':''}>▶ ${t('Anhören','Listen')} ${isSubmitted()?'':`(${a.plays[b]}/${AUDIO_PLAYS})`}</button></div>${block.questions.map(q=>{
        const i=index++;
        return `<fieldset class="hard-question"><legend>${data.gaps.length+i+1}. ${esc(q.q)}</legend>${isSubmitted()?answerFeedback(q,a.listening[i]):q.options?(a.optionOrders?.[i]||q.options).map((o,j)=>`<label class="hard-option"><input type="radio" name="hard-q-${i}" value="${esc(o)}" data-hard-listen="${i}" ${a.listening[i]===o?'checked':''}><span>${esc(o)}</span></label>`).join(''):`<input type="text" inputmode="${q.format==='number'?'decimal':q.format==='phone'?'tel':q.format==='email'?'email':'text'}" data-hard-listen="${i}" value="${esc(a.listening[i])}" aria-label="${esc(q.q)}" maxlength="160" autocomplete="off" autocapitalize="off" spellcheck="false" lang="en">`}</fieldset>`;
      }).join('')}${isSubmitted()?`<div class="hard-transcript" lang="en"><strong>${t('Transkript','Transcript')}</strong><p>${esc(block.text)}</p></div>`:''}</section>`).join('')}</section>`;
    }
    function writing(){
      const w=data.writing;
      return `<section class="card"><span class="hard-eyebrow">03 · ${t('FREIE NACHRICHT','FREE WRITING')}</span><h3>${t('Schreibe deine eigene Nachricht.','Write your own message.')}</h3><p lang="en">${esc(w.situation)}</p><ol lang="en">${w.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ol><p class="muted">${t(`Ziel: ungefähr ${w.targetWords||'30'} Wörter, mindestens`,`Aim for about ${w.targetWords||'30'} words, at least`)} ${w.minWords}. ${t('Schreibe einfache Sätze passend zur Aufgabe. Bei einer Nachricht gehören Anrede und Schluss dazu.','Use simple sentences with a greeting and a closing.')}</p>${isSubmitted()?'':accents()}<label for="hardWriting">${t('Deine Nachricht auf Englisch','Your message in English')}</label><textarea id="hardWriting" lang="en" rows="9" maxlength="6000" ${isSubmitted()?'readonly':''} autocomplete="off" spellcheck="false">${esc(a.text)}</textarea><p class="muted" id="hardWordCount" aria-live="polite">${words(a.text)} ${t('Wörter','words')}</p>${isSubmitted()?writingReview():''}</section>`;
    }
    function writingReview(){
      const w=data.writing;
      return `<div class="hard-transcript"><strong>${t('Eine mögliche Antwort','One possible answer')}</strong><p lang="en">${esc(w.model)}</p></div><p>${t('Vergleiche Inhalt und Verständlichkeit. Andere passende Formulierungen sind richtig. Kleine Fehler sind auf A1 erlaubt, wenn die Nachricht verständlich bleibt. Deine Sprache wird nicht automatisch korrigiert.','Compare content and clarity. Other suitable wording is valid. Small errors are acceptable at A1 if the message remains understandable. Your language is not automatically corrected.')}</p><div class="hard-rubric">${[...w.points,t('Aufgabengerechte Form und verständliche Sätze','Greeting, closing and understandable sentences')].map((label,i)=>`<label>${i+1}. ${esc(label)}<select data-hard-rating="${i}" ${a.completedAt?'disabled':''}><option value="">${t('Bitte selbst bewerten','Assess your answer')}</option>${[0,1,2].map(n=>`<option value="${n}" ${a.ratings[i]===n?'selected':''}>${n} · ${n===2?t('erfüllt und verständlich','fulfilled and understandable'):n===1?t('teilweise erfüllt / verständlich','partly fulfilled / understandable'):t('fehlt oder unverständlich','missing or unclear')}</option>`).join('')}</select></label>`).join('')}</div><p class="muted">${t('Dieses Raster ist eine Selbstbewertung für dein Training.','This rubric is a self-assessment for your practice.')}</p>${!a.completedAt?`<button class="hard-start" id="hardComplete">${t('Selbstbewertung speichern & Ergebnis','Save self-assessment & view result')} →</button>`:''}`;
    }
    function footer(){
      return `<div class="hard-footer">${a.page>0?`<button class="secondary-btn" data-hard-page="${a.page-1}">← ${t('Zurück','Back')}</button>`:''}${a.page<2?`<button class="primary-btn" data-hard-page="${a.page+1}">${t('Weiter','Next')} →</button>`:isSubmitted()?'':`<button class="hard-start" id="hardSubmit">${t('Alle drei Teile abgeben','Submit all three parts')}</button>`}${a.completedAt?`<button class="secondary-btn" id="hardResult">${t('Ergebnis','Result')}</button>`:''}</div><p class="hard-error" id="hardValidation" role="alert"></p>${progress.history.length?`<button class="tiny-btn" id="hardHistory">${t('Frühere Versuche','Previous attempts')} (${progress.history.length})</button>`:''}`;
    }
    function draw(){
      if(!data)return unknownVersion();
      if(a.phase==='reviewed'&&a.page===3)return result();
      mount(`${heading()}${nav()}${[cloze,listening,writing][a.page]?.()||writing()}${footer()}`);
      const rememberInput=el=>{
        if(isSubmitted())return;
        if(el.hasAttribute('data-hard-gap'))a.gaps[Number(el.dataset.hardGap)]=el.value;
        else if(el.hasAttribute('data-hard-listen'))a.listening[Number(el.dataset.hardListen)]=el.value;
        else if(el.id==='hardWriting'){a.text=el.value;root.querySelector('#hardWordCount').textContent=`${words(a.text)} ${t('Wörter','words')}`;}
        root.querySelectorAll('[data-hard-count]').forEach(el=>el.textContent=counts()[Number(el.dataset.hardCount)]);persist();
      };
      root.querySelectorAll('input[type="text"],textarea:not([readonly])').forEach(el=>{el.oninput=()=>rememberInput(el);el.onfocus=()=>focusTarget=el;});
      root.querySelectorAll('input[type="radio"]').forEach(el=>el.onchange=()=>rememberInput(el));
      root.querySelectorAll('[data-hard-char]').forEach(btn=>{
        btn.onmousedown=e=>e.preventDefault();
        btn.onclick=()=>{if(isSubmitted()||!focusTarget?.isConnected||focusTarget.readOnly)return;const start=focusTarget.selectionStart??focusTarget.value.length,end=focusTarget.selectionEnd??start;
          focusTarget.setRangeText(btn.dataset.hardChar,start,end,'end');focusTarget.focus();rememberInput(focusTarget);
        };
      });
      root.querySelectorAll('[data-hard-page]').forEach(btn=>btn.onclick=()=>{cancelAudio();error='';a.page=Number(btn.dataset.hardPage);focusHeading=true;persist();draw();window.scrollTo({top:0,behavior:'instant'});});
      root.querySelectorAll('[data-hard-play]').forEach(btn=>btn.onclick=()=>play(Number(btn.dataset.hardPlay)));
      root.querySelector('[data-hard-stop]')?.addEventListener('click',()=>{cancelAudio();updateAudio();});
      root.querySelectorAll('[data-hard-rating]').forEach(el=>el.onchange=()=>{if(a.completedAt)return;a.ratings[Number(el.dataset.hardRating)]=el.value===''?null:Number(el.value);persist();});
      root.querySelector('#hardResult')?.addEventListener('click',()=>{cancelAudio();a.page=3;persist();result();});
      root.querySelector('#hardSubmit')?.addEventListener('click',()=>{
        const missing=a.gaps.filter(s=>!s.trim()).length+a.listening.filter(s=>!s.trim()).length,short=words(a.text)<data.writing.minWords;
        root.querySelector('#hardValidation').innerHTML=`${esc(t(`Verbindlich abgeben? ${missing} offene Antworten; ${words(a.text)} Wörter (mindestens ${data.writing.minWords}). Leere Antworten zählen als falsch.${short?' Die Mindestwortzahl ist noch nicht erreicht.':''} Danach sind keine Änderungen möglich.`,`Submit now? ${missing} unanswered items; ${words(a.text)} words (minimum ${data.writing.minWords}). Empty answers count as incorrect.${short?' The minimum word count has not been reached.':''} Answers cannot be edited afterwards.`))}<div class="button-row"><button class="secondary-btn" id="hardCancelSubmit">${t('Weiter bearbeiten','Keep editing')}</button><button class="hard-start" id="hardConfirmSubmit">${t('Jetzt abgeben','Submit now')}</button></div>`;
        root.querySelector('#hardCancelSubmit').onclick=()=>root.querySelector('#hardValidation').replaceChildren();
        root.querySelector('#hardConfirmSubmit').onclick=()=>{cancelAudio();a.phase='submitted';a.submittedAt=Date.now();window.EN_A1_REVIEW?.captureHard(state,lesson.id,data,a);a.page=2;focusHeading=true;persist();draw();};
        root.querySelector('#hardConfirmSubmit').focus();
      });
      root.querySelector('#hardComplete')?.addEventListener('click',()=>{
        if(!a.ratings.every(n=>Number.isInteger(n)&&n>=0&&n<=2)){
          root.querySelector('#hardValidation').textContent=t('Bewerte bitte alle vier Kriterien mit 0, 1 oder 2 Punkten.','Please assess all four criteria with 0, 1 or 2 points.');return;
        }
        if(!a.completedAt){a.completedAt=Date.now();progress.attemptsCompleted=(progress.attemptsCompleted||0)+1;const score=objective(data,a);a.result={...score,passed:passed(data,a),writingPoints:a.ratings.reduce((sum,n)=>sum+n,0)};progress.bestByVersion[data.version]=Math.max(progress.bestByVersion[data.version]||0,score.pct);progress.bestObjective=Math.max(progress.bestObjective||0,score.pct);if(a.result.passed&&(data.version===latestData.version||!progress.passedAt)){progress.passedAt=Date.now();progress.passedVersion=data.version;}}
        a.phase='reviewed';a.page=3;persist(true);focusHeading=true;result();
      });
      updateAudio();
    }
    function updateAudio(){
      if(!root?.isConnected)return;
      const status=root.querySelector('#hardAudioError');if(status)status.textContent=error|| (playing!==null?t('Audio läuft …','Audio playing …'):'');
      root.querySelectorAll('[data-hard-play]').forEach(btn=>{const b=Number(btn.dataset.hardPlay);btn.disabled=playing!==null||(!isSubmitted()&&a.plays[b]>=AUDIO_PLAYS);btn.textContent=`▶ ${t('Anhören','Listen')}${isSubmitted()?'':` (${a.plays[b]}/${AUDIO_PLAYS})`}`;});
      const stop=root.querySelector('[data-hard-stop]');if(stop)stop.hidden=playing===null;
    }
    function play(b){
      if(playing!==null||(!isSubmitted()&&a.plays[b]>=AUDIO_PLAYS))return;
      if(!window.speechSynthesis||typeof window.SpeechSynthesisUtterance==='undefined'||!window.A1Voice?.speakDialogue){
        error=t('Audio ist in diesem Browser nicht verfügbar. Nutze einen Browser mit englischer Sprachausgabe.','Audio is unavailable in this browser. Use a browser with English speech synthesis.');updateAudio();return;
      }
      const reviewed=isSubmitted(),currentAttempt=a,run=++audioRun;let finished=false;
      if(!reviewed){a.plays[b]++;persist();}playing=b;error='';updateAudio();
      const finish=failed=>{
        if(finished||run!==audioRun||currentAttempt!==progress.attempt)return;finished=true;
        if(audioTimer)window.clearTimeout(audioTimer);audioTimer=null;
        if(failed&&!reviewed){currentAttempt.plays[b]=Math.max(0,currentAttempt.plays[b]-1);persist();}
        playing=null;if(failed)error=t('Audio konnte nicht abgespielt werden. Der Versuch zählt nicht. Bitte erneut versuchen.','Audio could not play. This play does not count. Please try again.');updateAudio();
      };
      audioTimer=window.setTimeout(()=>{finish(true);window.A1Voice?.cancel();},240000);
      try{const block=data.listening[b],started=window.A1Voice.speakDialogue(window.EN_A1_HARD_AUDIO.turns(lesson.id,data,b),{lang:'en-GB',rate:.75,onEnd:()=>finish(false),onError:()=>finish(true)});if(started===false)finish(true);}catch{finish(true);}
    }
    function result(){
      const score=a.result||objective(data,a),success=a.result?.passed??passed(data,a),writingPoints=a.ratings.reduce((sum,n)=>sum+(n||0),0);
      const missed=new Set([...data.gaps,...allQuestions].flatMap((q,i)=>answerMatches(data,q,i<data.gaps.length?a.gaps[i]:a.listening[i-data.gaps.length])?[]:q.skills||[]));
      mount(`${heading()}<section class="card hard-result ${achievementClass(a)}">${achievedResult(a)?achievementBadge(a):''}<span class="hard-eyebrow">${success?t('✓ TRAININGSZIEL ERREICHT','✓ PRACTICE TARGET MET'):t('HARD MODE AUSGEWERTET','HARD MODE REVIEWED')}</span><div class="score">${score.pct} %</div><h3>${t('Automatisch korrigierte Aufgaben','Automatically marked tasks')}</h3><div class="hard-result-grid"><div><strong>${score.gap}/${data.gaps.length}</strong><span>${t('Lückentext','Cloze text')} · ${Math.round(score.gap/data.gaps.length*1000)/10} %</span></div><div><strong>${score.listening}/${allQuestions.length}</strong><span>${t('Hörverstehen','Listening')} · ${Math.round(score.listening/allQuestions.length*1000)/10} %</span></div><div><strong>${writingPoints}/8</strong><span>${t('Schreiben · Selbstbewertung','Writing · self-assessment')}</span></div></div><p>${rules()}</p><p class="muted">${t('Die Prozentzahl bewertet nur Lückentext und Hörverstehen. Die Schreibaufgabe hast du selbst geprüft. Das ist kein automatisch bestätigter Sprachnachweis.','The percentage covers only cloze and listening. You assessed your writing yourself. This is not automatically certified language proficiency.')}</p>${missed.size?`<p>${t('Gezielt wiederholen','Review these topics')}: ${[...missed].map(key=>esc(data.objectives?.[key]?.label||key)).join(' · ')}</p>`:''}<div class="button-row"><button class="secondary-btn" id="hardReview">${t('Alle Antworten ansehen','Review all answers')}</button><button class="hard-start" id="hardRetry">${t('Neuer Versuch','New attempt')}</button></div>${progress.history.length?`<button class="tiny-btn" id="hardHistory">${t('Frühere Versuche','Previous attempts')} (${progress.history.length})</button>`:''}</section>`);
      root.querySelector('#hardHistory')?.addEventListener('click',showHistory);
      root.querySelector('#hardPreviousDraft')?.addEventListener('click',showHistory);
      root.querySelector('#hardReview').onclick=()=>{a.page=0;persist();focusHeading=true;draw();};
      root.querySelector('#hardRetry').onclick=()=>{
        root.querySelector('#hardRetry').outerHTML=`<div class="hard-retry-confirm"><p>${t('Ein neuer Versuch startet die aktuellen Aufgaben. Deine bisherigen Antworten, Ergebnisse und Bestwerte bleiben gespeichert.','A new attempt starts the current tasks. Previous answers, results and best scores are preserved.')}</p><button class="secondary-btn" id="hardKeep">${t('Ergebnis behalten','Keep result')}</button><button class="hard-start" id="hardNew">${t('Neuen Versuch starten','Start a new attempt')}</button></div>`;
        root.querySelector('#hardKeep').onclick=result;root.querySelector('#hardNew').onclick=fresh;
      };
    }
    if(a)draw();else intro();
  }
  // Cancel speech if navigation removes the test without calling its back button.
  new MutationObserver(()=>checkDetached?.()).observe(document.getElementById('view')||document.body,{childList:true});
  window.EN_A1_HARD_MODE={unlocked,entryHtml,renderEntry,render,normalize,matches,words,objective,passed,achievedResult,goldResult,achievement,achievementClass,achievementBadge};
})();
