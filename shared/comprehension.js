/* A short dialogue followed by three selected facts; no keyboard required. */
(() => {
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const words={
    de:{title:'Hörverstehen',intro:'Höre das Gespräch und wähle die drei passenden Informationen aus.',play:'Gespräch anhören',stop:'Stopp',choose:'Bitte auswählen',check:'Antworten prüfen',next:'Weiter zum Lektionscheck →',retry:'Noch einmal üben',help:'Gespräch mitlesen',unavailable:'Audio ist gerade nicht verfügbar. Du kannst das Gespräch unten mitlesen.',correct:'Richtig',solution:'Richtige Antwort',result:'richtig',speaker:'Person'},
    fr:{title:'Compréhension orale',intro:'Écoute le dialogue et choisis les trois bonnes informations.',play:'Écouter le dialogue',stop:'Arrêter',choose:'Choisir une réponse',check:'Vérifier les réponses',next:'Continuer : bilan de la leçon →',retry:'Réessayer',help:'Lire le dialogue',unavailable:'Audio indisponible. Tu peux lire le dialogue ci-dessous.',correct:'Correct',solution:'Bonne réponse',result:'réponses correctes',speaker:'Personne'},
    en:{title:'Listening comprehension',intro:'Listen to the dialogue and select the three correct pieces of information.',play:'Play dialogue',stop:'Stop',choose:'Select an answer',check:'Check answers',next:'Continue to lesson check →',retry:'Try again',help:'Read the dialogue',unavailable:'Audio is unavailable. You can read the dialogue below.',correct:'Correct',solution:'Correct answer',result:'correct',speaker:'Person'}
  };
  function render({root,data,work,lessonId,targetLang,uiLang,save,onUpdate,onContinue}){
    const L=words[uiLang]||words.de;
    if(!data||!root)return;
    const valid=work.comprehension;
    const p=work.comprehension=valid&&typeof valid==='object'&&!Array.isArray(valid)?valid:{};
    if(!Array.isArray(p.answers))p.answers=[];
    p.answers=data.fields.map((f,i)=>f.options.includes(p.answers[i])?p.answers[i]:'');
    if(!p.answers.every(Boolean))p.graded=false;
    let playing=false;
    root.innerHTML=`<section class="card lesson-comprehension" data-bug-task="comprehension-${lessonId}" aria-label="${esc(L.title)}" data-bug-step="comprehension" data-bug-question="${esc(data.fields.map(f=>f.label).join(' · '))}"><p class="muted">${esc(L.intro)}</p><div class="comprehension-player"><button type="button" class="soft-btn" id="dialoguePlay" data-bug-audio="${esc(data.turns.map(t=>t.speaker+': '+t.text).join('\n'))}">🔊 ${esc(L.play)}</button><span class="pill comprehension-tempo">0,75×<span id="dialogueSpeaker" aria-hidden="true"></span></span></div><p id="dialogueStatus" class="muted" role="status" hidden></p><div class="comprehension-fields">${data.fields.map((f,i)=>`<div class="comprehension-field"><label for="dialogueField${i}" data-comprehension-label>${esc(f.label)}</label><select id="dialogueField${i}" data-comprehension-field="${i}" ${p.graded?'disabled':''}><option value="">${esc(L.choose)}</option>${f.options.map(o=>`<option value="${esc(o)}" ${p.answers[i]===o?'selected':''}>${esc(o)}</option>`).join('')}</select><small data-comprehension-feedback="${i}" ${p.graded?'':'hidden'}></small></div>`).join('')}</div><div id="dialogueResult" class="comprehension-result" role="status"></div><div class="comprehension-actions"><button class="primary-btn" id="dialogueCheck"></button><button class="tiny-btn" id="dialogueRetry" ${p.graded?'':'hidden'}>${esc(L.retry)}</button></div><details class="comprehension-transcript"><summary>${esc(L.help)}</summary>${data.turns.map(t=>`<p><strong>${esc(t.speaker)}:</strong> <span data-i18n-ignore>${esc(t.text)}</span></p>`).join('')}</details></section>`;
    const button=root.querySelector('#dialogueCheck'),play=root.querySelector('#dialoguePlay'),speaker=root.querySelector('#dialogueSpeaker');
    const selects=[...root.querySelectorAll('[data-comprehension-field]')];
    const update=()=>{
      button.textContent=p.graded?L.next:L.check;button.disabled=!p.graded&&!p.answers.every(Boolean);
      root.querySelector('#dialogueRetry').hidden=!p.graded;
      selects.forEach((select,i)=>{
        select.disabled=!!p.graded;
        const correct=p.answers[i]===data.fields[i].answer,feedback=root.querySelector(`[data-comprehension-feedback="${i}"]`);
        select.classList.toggle('is-correct',!!p.graded&&correct);select.classList.toggle('is-wrong',!!p.graded&&!correct);
        feedback.hidden=!p.graded;feedback.textContent=correct?'✓ '+L.correct:L.solution+': '+data.fields[i].answer;
      });
      root.querySelector('#dialogueResult').textContent=p.graded?`${p.score} / ${data.fields.length} ${L.result}`:'';
    };
    selects.forEach((select,i)=>select.onchange=()=>{p.answers[i]=select.value;save();update();});
    button.onclick=()=>{
      if(p.graded){window.A1Voice?.cancel();onContinue();return;}
      if(!p.answers.every(Boolean))return;
      p.score=data.fields.filter((f,i)=>f.answer===p.answers[i]).length;p.best=Math.max(p.best||0,p.score);p.done=true;p.graded=true;
      save(true);update();onUpdate?.();
    };
    root.querySelector('#dialogueRetry').onclick=()=>{p.answers=data.fields.map(()=>'');p.graded=false;selects.forEach(s=>s.value='');save();update();};
    const stopped=()=>{playing=false;play.textContent='🔊 '+L.play;speaker.textContent='';};
    play.onclick=()=>{
      if(playing){window.A1Voice?.cancel();stopped();return;}
      playing=true;play.textContent='■ '+L.stop;root.querySelector('#dialogueStatus').hidden=true;
      const unavailable=()=>{stopped();const status=root.querySelector('#dialogueStatus');status.hidden=false;status.textContent=L.unavailable;};
      const started=window.A1Voice?.speakDialogue(data.turns,{lang:targetLang==='de'?'de-DE':'fr-FR',rate:.75,onTurn:s=>{speaker.textContent=' · '+s;},onEnd:stopped,onError:unavailable});
      if(!started)unavailable();
    };
    update();
  }
  window.A1Comprehension={render};
})();
