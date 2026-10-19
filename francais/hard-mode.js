/* A saved exam-style attempt, separate from normal lesson completion. */
(() => {
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const en=()=>window.A1Profile?.getUiLang()==='en';
  const t=(de,english)=>en()?english:de;
  const words=text=>(String(text).match(/[\p{L}\p{N}]+(?:[’'’-][\p{L}\p{N}]+)*/gu)||[]).length;
  function normalize(value){
    return String(value??'').normalize('NFC').trim().toLocaleLowerCase('fr').replace(/[’‘]/g,"'").normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[.,;!?]$/g,'').replace(/\s+/g,' ').replace(/\s*'\s*/g,"'").replace(/[‐‑–]/g,'-');
  }
  function matches(value,answers){
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
  const unlocked=(state,id)=>Number(state.lessonMasteryBest?.[id]||0)>=80;
  const questions=data=>data.listening.flatMap(block=>block.questions);
  function objective(data,attempt){
    const gap=data.gaps.filter((q,i)=>matches(attempt.gaps[i],q.answers)).length;
    const listening=questions(data).filter((q,i)=>matches(attempt.listening[i],q.answers)).length;
    const total=data.gaps.length+questions(data).length;
    return {gap,listening,correct:gap+listening,total,pct:Math.round((gap+listening)/total*100)};
  }
  function writingPassed(attempt){
    return Array.isArray(attempt.ratings)&&attempt.ratings.length===4&&attempt.ratings.every(n=>Number.isInteger(n)&&n>=1&&n<=2)&&attempt.ratings.reduce((a,b)=>a+b,0)>=6;
  }
  function passed(data,attempt){
    const score=objective(data,attempt);
    return score.pct>=80&&score.gap/data.gaps.length>=.5&&score.listening/questions(data).length>=.5&&words(attempt.text)>=data.writing.minWords&&writingPassed(attempt);
  }
  let redraw=null,redrawEntry=null,checkDetached=null;
  window.addEventListener('a1suite:languagechange',()=>{redraw?.();redrawEntry?.();});
  function entryHtml(lesson,state){
    const open=unlocked(state,lesson.id),p=state.lessonWork?.[lesson.id]?.hardMode;
    const done=!!p?.passedAt;
    return `<section class="card hard-entry ${open?'is-unlocked':'is-locked'}" data-i18n-ignore>
      <div class="hard-entry-top"><span class="hard-eyebrow">${open?'✦':'🔒'} HARD MODE</span><span class="hard-status">${done?t('✓ Bestanden · selbst geprüft','✓ Passed · self-assessed'):open?t('Freigeschaltet','Unlocked'):t('Noch gesperrt','Locked')}</span></div>
      <h3>${t('Jetzt wird’s ernst.','Put your skills to the test.')}</h3>
      <p>${t('Lückentext, Hörverstehen und eine eigene Nachricht. Wende die ganze Lektion selbstständig an.','A cloze text, listening comprehension and your own message. Apply the whole lesson independently.')}</p>
      <div class="hard-entry-meta"><span>3 ${t('Teile','parts')}</span><span>${window.FR_A1_HARD_CONTENT[lesson.id].gaps.length+questions(window.FR_A1_HARD_CONTENT[lesson.id]).length+1} ${t('Aufgaben','tasks')}</span><span>≈ 25–35 ${t('Minuten','minutes')}</span></div>
      <button type="button" class="hard-start" data-hard-start ${open?'':'disabled'}>${open?(p?.attempt?t('Hard Mode fortsetzen / ansehen','Resume / review Hard Mode'):t('Hard Mode starten','Start Hard Mode')):t('Nach bestandenem Lektionscheck','Pass the lesson check to unlock')} <span aria-hidden="true">${open?'→':'🔒'}</span></button>
      ${!open?`<small>${t('Freischaltung ab 80 % im Lektionscheck.','Unlocks at 80% in the lesson check.')}</small>`:''}
    </section>`;
  }
  function renderEntry({lesson,view,state,onStart}){
    const host=document.createElement('div');view.appendChild(host);
    function update(){host.innerHTML=entryHtml(lesson,state);host.querySelector('[data-hard-start]').onclick=onStart;}
    redrawEntry=()=>{if(host.isConnected)update();};update();
  }
  function render({lesson,view,state,save,onBack}){
    const data=window.FR_A1_HARD_CONTENT[lesson.id];
    if(!data)return onBack();
    if(!unlocked(state,lesson.id)){
      view.innerHTML=`<section class="card" data-i18n-ignore><h2>🔒 Hard Mode</h2><p>${t('Bestehe zuerst den Lektionscheck mit mindestens 80 %.','Pass the lesson check with at least 80% first.')}</p><button class="secondary-btn" id="hardLockedBack">${t('Zur Lektion','Back to lesson')}</button></section>`;
      view.querySelector('button').onclick=onBack;return;
    }
    const work=(state.lessonWork||={})[lesson.id]||={};
    const progress=work.hardMode||={version:data.version};
    const allQuestions=questions(data);
    let a=progress.attempt,root=null,playing=null,error='',focusTarget=null;
    function persist(){save();}
    function fresh(){
      a=progress.attempt={version:data.version,phase:'running',page:0,gaps:Array(data.gaps.length).fill(''),listening:Array(allQuestions.length).fill(''),plays:Array(data.listening.length).fill(0),text:'',ratings:[null,null,null,null],startedAt:Date.now()};
      persist();draw();
    }
    function cancelAudio(){playing=null;window.A1Voice?.cancel();}
    function leave(){cancelAudio();redraw=null;checkDetached=null;onBack();}
    function mount(html){
      view.innerHTML=`<div class="hard-mode" data-i18n-ignore data-bug-lesson="${lesson.id}">${html}</div>`;
      root=view.firstElementChild;
      checkDetached=()=>{if(!root?.isConnected&&playing!==null)cancelAudio();};
      redraw=()=>{if(root?.isConnected){cancelAudio();a?draw():intro();}};
      window.A1BugReports?.setContext({lessonId:lesson.id,step:'hard-mode'});
      root.querySelector('#hardBack')?.addEventListener('click',leave);
      root.querySelector('#hardHeading')?.focus({preventScroll:true});
    }
    function heading(){
      return `<div class="between"><button class="tiny-btn" id="hardBack">← ${t('Zur Lektion · gespeichert','Back to lesson · saved')}</button><span class="hard-eyebrow">✦ HARD MODE</span></div><h2 id="hardHeading" tabindex="-1">${lesson.id}. ${esc(en()?window.A1FrenchI18n?.translate(lesson.title)||lesson.title:lesson.title)}</h2>`;
    }
    function intro(){
      mount(`${heading()}<section class="card hard-intro"><span class="hard-eyebrow">${t('DEINE LEKTION IM PRÜFUNGSMODUS','YOUR LESSON IN EXAM MODE')}</span><h3>${t('Drei Teile. Dein Wissen.','Three parts. Your knowledge.')}</h3><ol><li><strong>${t('Lückentext','Cloze text')}</strong> · ${data.gaps.length} ${t('Wörter oder Wortgruppen selbst einsetzen','words or phrases to type')}</li><li><strong>${t('Hörverstehen','Listening')}</strong> · ${allQuestions.length} ${t('Fragen, höchstens zweimal pro Text hören','questions, up to two plays per recording')}</li><li><strong>${t('Freie Nachricht','Free writing')}</strong> · ${t('drei Inhaltspunkte, ungefähr 30 Wörter','three content points, about 30 words')}</li></ol><p>${t('Plane etwa 25–35 Minuten ein. Du kannst zurückgehen, Antworten ändern und später fortsetzen. Lösungen und Transkripte erscheinen erst nach der Abgabe.','Allow about 25–35 minutes. You can go back, edit answers and resume later. Answers and transcripts appear only after submission.')}</p><p>${t('Trainingsziel: mindestens 80 % bei den automatisch korrigierten Aufgaben; beim Schreiben mindestens 6/8 selbst bewertete Punkte und kein Kriterium mit 0.','Practice target: at least 80% on automatically marked tasks; at least 6/8 self-assessed writing points, with no criterion scored 0.')}</p><p class="muted">${t('Eigene Aufgaben in Anlehnung an das TELC-A1-Beispiel. Das Audio nutzt die französische Browserstimme. Freitext wird anhand eines Beispiels selbst geprüft.','Original exercises informed by the TELC A1 sample. Audio uses the French browser voice. Free writing is self-assessed against an example.')}</p><button class="hard-start" id="hardBegin">${t('Prüfung starten','Start the test')} →</button></section>`);
      root.querySelector('#hardBegin').onclick=fresh;
    }
    function isSubmitted(){return a.phase!=='running';}
    function nav(){
      const labels=[t('Lückentext','Cloze text'),t('Hörverstehen','Listening'),t('Schreiben','Writing')];
      return `<nav class="hard-nav" aria-label="${t('Prüfungsteile','Test sections')}">${labels.map((label,i)=>`<button type="button" data-hard-page="${i}" ${a.page===i?'aria-current="step"':''}><span>${i+1}</span>${label}</button>`).join('')}</nav>`;
    }
    function accents(){return `<div class="hard-accents" aria-label="${t('Französische Sonderzeichen','French characters')}">${['à','â','ç','é','è','ê','ë','î','ï','ô','ù','û','ü','œ','’'].map(c=>`<button type="button" data-hard-char="${c}" aria-label="${t('Einfügen','Insert')} ${c}">${c}</button>`).join('')}</div>`;}
    function answerFeedback(q,value){
      const ok=matches(value,q.answers);
      return `<div class="hard-answer ${ok?'is-correct':'is-wrong'}"><strong>${ok?'✓':'×'} ${t('Deine Antwort','Your answer')}:</strong> ${esc(value)||'—'}${!ok?`<br><strong>${t('Mögliche Lösung','Possible answer')}:</strong> ${esc(q.answers[0])}`:''}${ok&&normalize(value)!==String(value).trim().toLocaleLowerCase('fr')?`<small>${t('Schreibweise der Vorlage','Model spelling')}: ${esc(q.answers[0])}</small>`:''}</div>`;
    }
    function cloze(){
      const text=data.text.replace(/\{\{(\d+)\}\}/g,(_,n)=>{
        const q=data.gaps[n];
        if(isSubmitted())return `<span class="hard-solution-word ${matches(a.gaps[n],q.answers)?'is-correct':'is-wrong'}">${esc(q.answers[0])}</span>`;
        return `<label class="hard-gap"><span class="hard-gap-hint">${Number(n)+1}. ${esc(q.hint)}</span><input type="text" data-hard-gap="${n}" aria-label="${t('Lücke','Gap')} ${Number(n)+1}: ${esc(q.hint)}" value="${esc(a.gaps[n])}" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="120" lang="fr" style="width:${Math.max(7,Math.min(17,q.answers[0].length+2))}ch"></label>`;
      });
      return `<section class="card"><span class="hard-eyebrow">01 · ${data.gaps.length} ${t('LÜCKEN','GAPS')}</span><h3>${t('Ergänze die Nachricht.','Complete the message.')}</h3><p class="muted">${t('Tippe die fehlenden Wörter oder Wortgruppen. Die Hinweise zeigen die Grundform oder die Bedeutung.','Type the missing words or phrases. Hints give the infinitive or meaning.')}</p>${isSubmitted()?'':accents()}<div class="hard-cloze" lang="fr">${text}</div>${isSubmitted()?data.gaps.map((q,i)=>`<div class="hard-review-item"><small>${i+1}. ${esc(q.hint)}</small>${answerFeedback(q,a.gaps[i])}</div>`).join(''):''}</section>`;
    }
    function listening(){
      let index=0;
      return `<section class="card"><span class="hard-eyebrow">02 · ${allQuestions.length} ${t('FRAGEN','QUESTIONS')}</span><h3>${t('Höre genau hin.','Listen carefully.')}</h3><p class="muted">${t('Lies zuerst die Fragen. Jeder Text ist höchstens zweimal abspielbar. Tippe kurze Antworten; bei der Auswahl stehen vollständige Sätze.','Read the questions first. Each recording can be played at most twice. Type short answers; multiple-choice options are complete sentences.')}</p>${isSubmitted()?'':accents()}<p class="hard-error" id="hardAudioError" role="status">${esc(error)}</p>${data.listening.map((block,b)=>`<section class="hard-recording"><div class="between"><h4>${t('Hörtext','Recording')} ${b+1}</h4><button class="secondary-btn" data-hard-play="${b}" ${!isSubmitted()&&(a.plays[b]>=2||playing!==null)?'disabled':''}>▶ ${t('Anhören','Listen')} ${isSubmitted()?'':`(${a.plays[b]}/2)`}</button></div>${block.questions.map(q=>{
        const i=index++;
        return `<fieldset class="hard-question"><legend>${data.gaps.length+i+1}. ${esc(q.q)}</legend>${isSubmitted()?answerFeedback(q,a.listening[i]):q.options?q.options.map((o,j)=>`<label class="hard-option"><input type="radio" name="hard-q-${i}" value="${esc(o)}" data-hard-listen="${i}" ${a.listening[i]===o?'checked':''}><span>${esc(o)}</span></label>`).join(''):`<input type="text" data-hard-listen="${i}" value="${esc(a.listening[i])}" aria-label="${esc(q.q)}" maxlength="160" autocomplete="off" autocapitalize="off" spellcheck="false" lang="fr">`}</fieldset>`;
      }).join('')}${isSubmitted()?`<div class="hard-transcript" lang="fr"><strong>${t('Transkript','Transcript')}</strong><p>${esc(block.text)}</p></div>`:''}</section>`).join('')}</section>`;
    }
    function writing(){
      const w=data.writing;
      return `<section class="card"><span class="hard-eyebrow">03 · ${t('FREIE NACHRICHT','FREE WRITING')}</span><h3>${t('Schreibe deine eigene Nachricht.','Write your own message.')}</h3><p lang="fr">${esc(w.situation)}</p><ol lang="fr">${w.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ol><p class="muted">${t('Ziel: ungefähr 30 Wörter, mindestens','Aim for about 30 words, at least')} ${w.minWords}. ${t('Schreibe einfache Sätze mit Anrede und Schluss.','Use simple sentences with a greeting and a closing.')}</p>${isSubmitted()?'':accents()}<label for="hardWriting">${t('Deine Nachricht auf Französisch','Your message in French')}</label><textarea id="hardWriting" lang="fr" rows="9" maxlength="6000" ${isSubmitted()?'readonly':''} autocomplete="off" spellcheck="false">${esc(a.text)}</textarea><p class="muted" id="hardWordCount" aria-live="polite">${words(a.text)} ${t('Wörter','words')}</p>${isSubmitted()?writingReview():''}</section>`;
    }
    function writingReview(){
      const w=data.writing;
      return `<div class="hard-transcript"><strong>${t('Eine mögliche Antwort','One possible answer')}</strong><p lang="fr">${esc(w.model)}</p></div><p>${t('Vergleiche Inhalt und Verständlichkeit. Andere passende Formulierungen sind richtig. Kleine Fehler sind auf A1 erlaubt, wenn die Nachricht verständlich bleibt. Deine Sprache wird nicht automatisch korrigiert.','Compare content and clarity. Other suitable wording is valid. Small errors are acceptable at A1 if the message remains understandable. Your language is not automatically corrected.')}</p><div class="hard-rubric">${[...w.points,t('Anrede, Schluss und verständliche Sätze','Greeting, closing and understandable sentences')].map((label,i)=>`<label>${i+1}. ${esc(label)}<select data-hard-rating="${i}" ${a.completedAt?'disabled':''}><option value="">${t('Bitte selbst bewerten','Assess your answer')}</option>${[0,1,2].map(n=>`<option value="${n}" ${a.ratings[i]===n?'selected':''}>${n} · ${n===2?t('erfüllt und verständlich','fulfilled and understandable'):n===1?t('teilweise erfüllt / verständlich','partly fulfilled / understandable'):t('fehlt oder unverständlich','missing or unclear')}</option>`).join('')}</select></label>`).join('')}</div><p class="muted">${t('Dieses Raster ist eine Selbstbewertung für dein Training.','This rubric is a self-assessment for your practice.')}</p>${!a.completedAt?`<button class="hard-start" id="hardComplete">${t('Selbstbewertung speichern & Ergebnis','Save self-assessment & view result')} →</button>`:''}`;
    }
    function ready(){return a.gaps.every(s=>s.trim())&&a.listening.every(s=>s.trim())&&words(a.text)>=data.writing.minWords;}
    function footer(){
      return `<div class="hard-footer">${a.page>0?`<button class="secondary-btn" data-hard-page="${a.page-1}">← ${t('Zurück','Back')}</button>`:''}${a.page<2?`<button class="primary-btn" data-hard-page="${a.page+1}">${t('Weiter','Next')} →</button>`:isSubmitted()?'':`<button class="hard-start" id="hardSubmit">${t('Alle drei Teile abgeben','Submit all three parts')}</button>`}${a.completedAt?`<button class="secondary-btn" id="hardResult">${t('Ergebnis','Result')}</button>`:''}</div><p class="hard-error" id="hardValidation" role="alert"></p>`;
    }
    function draw(){
      if(a.phase==='reviewed'&&a.page===3)return result();
      mount(`${heading()}${nav()}${[cloze,listening,writing][a.page]?.()||writing()}${footer()}`);
      const rememberInput=el=>{
        if(el.hasAttribute('data-hard-gap'))a.gaps[Number(el.dataset.hardGap)]=el.value;
        else if(el.hasAttribute('data-hard-listen'))a.listening[Number(el.dataset.hardListen)]=el.value;
        else if(el.id==='hardWriting'){a.text=el.value;root.querySelector('#hardWordCount').textContent=`${words(a.text)} ${t('Wörter','words')}`;}
        persist();
      };
      root.querySelectorAll('input[type="text"],textarea:not([readonly])').forEach(el=>{
        el.oninput=()=>rememberInput(el);el.onfocus=()=>focusTarget=el;
      });
      root.querySelectorAll('input[type="radio"]').forEach(el=>el.onchange=()=>rememberInput(el));
      root.querySelectorAll('[data-hard-char]').forEach(btn=>{
        btn.onmousedown=e=>e.preventDefault();
        btn.onclick=()=>{if(!focusTarget?.isConnected)return;const start=focusTarget.selectionStart??focusTarget.value.length,end=focusTarget.selectionEnd??start;
          focusTarget.setRangeText(btn.dataset.hardChar,start,end,'end');focusTarget.focus();rememberInput(focusTarget);
        };
      });
      root.querySelectorAll('[data-hard-page]').forEach(btn=>btn.onclick=()=>{cancelAudio();error='';a.page=Number(btn.dataset.hardPage);persist();draw();window.scrollTo({top:0,behavior:'instant'});});
      root.querySelectorAll('[data-hard-play]').forEach(btn=>btn.onclick=()=>play(Number(btn.dataset.hardPlay)));
      root.querySelectorAll('[data-hard-rating]').forEach(el=>el.onchange=()=>{a.ratings[Number(el.dataset.hardRating)]=el.value===''?null:Number(el.value);persist();});
      root.querySelector('#hardResult')?.addEventListener('click',()=>{cancelAudio();a.page=3;persist();result();});
      root.querySelector('#hardSubmit')?.addEventListener('click',()=>{
        if(!ready()){
          const missingGaps=a.gaps.filter(s=>!s.trim()).length,missingListen=a.listening.filter(s=>!s.trim()).length;
          root.querySelector('#hardValidation').textContent=t(`Noch offen: ${missingGaps} Lücken, ${missingListen} Hörantworten. Dein Text hat ${words(a.text)} Wörter (mindestens ${data.writing.minWords}).`,`Still needed: ${missingGaps} gaps, ${missingListen} listening answers. Your text has ${words(a.text)} words (minimum ${data.writing.minWords}).`);return;
        }
        cancelAudio();a.phase='submitted';a.submittedAt=Date.now();a.page=2;persist();draw();
      });
      root.querySelector('#hardComplete')?.addEventListener('click',()=>{
        if(!a.ratings.every(n=>Number.isInteger(n)&&n>=0&&n<=2)){
          root.querySelector('#hardValidation').textContent=t('Bewerte bitte alle vier Kriterien mit 0, 1 oder 2 Punkten.','Please assess all four criteria with 0, 1 or 2 points.');return;
        }
        if(!a.completedAt){a.completedAt=Date.now();progress.attemptsCompleted=(progress.attemptsCompleted||0)+1;progress.bestObjective=Math.max(progress.bestObjective||0,objective(data,a).pct);if(passed(data,a))progress.passedAt=Date.now();}
        a.phase='reviewed';a.page=3;save(true);result();
      });
    }
    function play(b){
      if(playing!==null||(!isSubmitted()&&a.plays[b]>=2))return;
      if(!window.speechSynthesis||typeof window.SpeechSynthesisUtterance==='undefined'||!window.A1Voice?.speakDialogue){
        error=t('Audio ist in diesem Browser nicht verfügbar. Dein Fortschritt bleibt gespeichert. Nutze einen Browser mit Sprachausgabe.','Audio is unavailable in this browser. Your progress is saved. Use a browser with speech synthesis.');draw();return;
      }
      const reviewed=isSubmitted(),currentAttempt=a;
      if(!reviewed){a.plays[b]++;persist();}
      playing=b;error='';draw();
      const finish=failed=>{
        if(currentAttempt!==progress.attempt)return;
        if(failed&&!reviewed){currentAttempt.plays[b]=Math.max(0,currentAttempt.plays[b]-1);persist();}
        playing=null;
        if(failed)error=t('Audio konnte nicht abgespielt werden. Der Versuch zählt nicht. Bitte erneut versuchen.','Audio could not play. This play does not count. Please try again.');
        if(root?.isConnected&&a.page===1){
          root.querySelector('#hardAudioError').textContent=error;
          root.querySelectorAll('[data-hard-play]').forEach(btn=>btn.disabled=!isSubmitted()&&a.plays[Number(btn.dataset.hardPlay)]>=2);
        }
      };
      const started=window.A1Voice.speakDialogue([{speaker:'A',text:data.listening[b].text}],{lang:'fr-FR',rate:.85,onEnd:()=>finish(false),onError:()=>finish(true)});
      if(started===false)finish(true);
    }
    function result(){
      const score=objective(data,a),success=passed(data,a),writingPoints=a.ratings.reduce((sum,n)=>sum+(n||0),0);
      mount(`${heading()}<section class="card hard-result"><span class="hard-eyebrow">${success?t('✓ HARD MODE BESTANDEN','✓ HARD MODE PASSED'):t('HARD MODE AUSGEWERTET','HARD MODE REVIEWED')}</span><div class="score">${score.pct} %</div><h3>${t('Automatisch korrigierte Aufgaben','Automatically marked tasks')}</h3><div class="hard-result-grid"><div><strong>${score.gap}/${data.gaps.length}</strong><span>${t('Lückentext','Cloze text')}</span></div><div><strong>${score.listening}/${allQuestions.length}</strong><span>${t('Hörverstehen','Listening')}</span></div><div><strong>${writingPoints}/8</strong><span>${t('Schreiben · Selbstbewertung','Writing · self-assessment')}</span></div></div><p>${success?t('Trainingsziel erreicht. Den Schreibteil hast du anhand des Rasters selbst bewertet.','Practice target achieved. You assessed your writing using the rubric.'):t('Das Trainingsziel ist noch offen: 80 % bei Lückentext und Hören zusammen, mindestens die Hälfte pro Teil; beim Schreiben 6/8 Punkte und kein Kriterium mit 0.','The practice target is still open: 80% across cloze and listening, at least half in each; writing needs 6/8 points and no criterion scored 0.')}</p><p class="muted">${t('Die Prozentzahl bewertet nur Lückentext und Hörverstehen. Sie ist keine automatische Bewertung deines freien Textes.','The percentage covers only cloze and listening. It is not an automatic assessment of your free writing.')}</p><div class="button-row"><button class="secondary-btn" id="hardReview">${t('Alle Antworten ansehen','Review all answers')}</button><button class="hard-start" id="hardRetry">${t('Neuer Versuch','New attempt')}</button></div></section>`);
      root.querySelector('#hardReview').onclick=()=>{a.page=0;persist();draw();};
      root.querySelector('#hardRetry').onclick=()=>{
        root.querySelector('#hardRetry').outerHTML=`<div class="hard-retry-confirm"><p>${t('Ein neuer Versuch ersetzt die aktuellen Antworten. Dein Bestwert bleibt gespeichert.','A new attempt replaces your current answers. Your best score is saved.')}</p><button class="secondary-btn" id="hardKeep">${t('Ergebnis behalten','Keep result')}</button><button class="hard-start" id="hardNew">${t('Neuen Versuch starten','Start a new attempt')}</button></div>`;
        root.querySelector('#hardKeep').onclick=result;root.querySelector('#hardNew').onclick=fresh;
      };
    }
    if(a){
      // Published content changes never silently grade old drafts against new answers.
      if(a.version!==data.version){mount(`${heading()}<section class="card"><p>${t('Diese Aufgaben wurden überarbeitet. Dein bisheriger Text bleibt hier erhalten. Starte danach einen neuen Versuch.','These tasks have been updated. Your previous text is preserved here. Then start a new attempt.')}</p><pre class="hard-old-draft">${esc(a.text)}</pre><button class="hard-start" id="hardBegin">${t('Neue Aufgaben starten','Start updated tasks')}</button></section>`);root.querySelector('#hardBegin').onclick=fresh;}
      else draw();
    }else intro();
  }
  // Cancel speech if navigation removes the test without calling its back button.
  new MutationObserver(()=>checkDetached?.()).observe(document.getElementById('view')||document.body,{childList:true});
  window.FR_A1_HARD_MODE={unlocked,entryHtml,renderEntry,render,normalize,matches,words,objective,passed};
})();
