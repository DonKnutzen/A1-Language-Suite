/* Short dialogues with visible answer choices; no keyboard or dropdown required. */
(() => {
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const words={
    de:{title:'Hörverstehen',intro:'Höre das Gespräch und ordne die Informationen zu.',play:'Gespräch anhören',stop:'Stopp',answered:'Angaben ausgewählt',check:'Antworten prüfen',next:'Weiter zum Lektionscheck →',retry:'Noch einmal üben',help:'Gespräch mitlesen',unavailable:'Audio ist gerade nicht verfügbar. Du kannst das Gespräch unten mitlesen.',correct:'Richtig',solution:'Richtige Antwort',result:'richtig',tempo:'Sprechgeschwindigkeit',normal:'Normales Tempo',slower:'Langsameres Tempo'},
    fr:{title:'Compréhension orale',intro:'Écoute le dialogue et choisis les bonnes informations.',play:'Écouter le dialogue',stop:'Arrêter',answered:'réponses choisies',check:'Vérifier les réponses',next:'Continuer : bilan de la leçon →',retry:'Réessayer',help:'Lire le dialogue',unavailable:'Audio indisponible. Tu peux lire le dialogue ci-dessous.',correct:'Correct',solution:'Bonne réponse',result:'réponses correctes',tempo:'Vitesse de lecture',normal:'Vitesse normale',slower:'Vitesse réduite'},
    en:{title:'Listening comprehension',intro:'Listen to the dialogue and match the information.',play:'Play dialogue',stop:'Stop',answered:'answers selected',check:'Check answers',next:'Continue to lesson check →',retry:'Try again',help:'Read the dialogue',unavailable:'Audio is unavailable. You can read the dialogue below.',correct:'Correct',solution:'Correct answer',result:'correct',tempo:'Playback speed',normal:'Normal speed',slower:'Slower speed'}
  };
  function render({root,data,work,lessonId,targetLang,uiLang,save,onUpdate,onContinue}){
    const L=words[uiLang]||words.de;
    if(!data||!root)return;
    const valid=work.comprehension;
    const p=work.comprehension=valid&&typeof valid==='object'&&!Array.isArray(valid)?valid:{};
    if(!Array.isArray(p.answers))p.answers=[];
    // Keep previous answers and completion when a dialogue gains another question.
    p.answers=data.fields.map((f,i)=>f.options.includes(p.answers[i])?p.answers[i]:'');
    if(!p.answers.every(Boolean))p.graded=false;
    p.rate=p.rate===.75 ? .75 : 1;
    let playing=false;
    const fieldHtml=data.fields.map((f,i)=>`<fieldset class="comprehension-field" data-comprehension-field="${i}"><legend><span class="comprehension-question-number" aria-hidden="true">${i+1}</span><span data-comprehension-label>${esc(f.label)}</span></legend><div class="comprehension-choices ${f.options.some(o=>o.length>18)?'has-long-options':''}">${f.options.map(o=>`<label class="comprehension-choice"><input type="radio" name="dialogue-${lessonId}-${i}" data-comprehension-answer="${i}" value="${esc(o)}" ${p.answers[i]===o?'checked':''} ${p.graded?'disabled':''}><span data-comprehension-option data-i18n-ignore>${esc(o)}</span></label>`).join('')}</div><small data-comprehension-feedback="${i}" ${p.graded?'':'hidden'}></small></fieldset>`).join('');
    root.innerHTML=`<section class="card lesson-comprehension" data-bug-task="comprehension-${lessonId}" aria-label="${esc(L.title)}" data-bug-step="comprehension" data-bug-question="${esc(data.fields.map(f=>f.label).join(' · '))}"><p class="muted">${esc(L.intro)}</p><div class="comprehension-player"><button type="button" class="soft-btn" id="dialoguePlay" data-bug-audio="${esc(data.turns.map(t=>t.speaker+': '+t.text).join('\n'))}">🔊 ${esc(L.play)}</button><div class="comprehension-speed" role="group" aria-label="${esc(L.tempo)}"><button type="button" data-dialogue-rate="0.75" aria-label="${esc(L.slower)}" aria-pressed="${p.rate===.75}">0,75×</button><button type="button" data-dialogue-rate="1" aria-label="${esc(L.normal)}" aria-pressed="${p.rate===1}">1×</button></div><span id="dialogueSpeaker" class="comprehension-speaker" aria-hidden="true"></span></div><p id="dialogueStatus" class="muted" role="status" hidden></p><div class="comprehension-fields">${fieldHtml}</div><small class="comprehension-progress" role="status"><span id="dialogueAnswered"></span> <span>${esc(L.answered)}</span></small><div id="dialogueResult" class="comprehension-result" role="status"></div><div class="comprehension-actions"><button class="primary-btn" id="dialogueCheck"></button><button class="tiny-btn" id="dialogueRetry" ${p.graded?'':'hidden'}>${esc(L.retry)}</button></div><details class="comprehension-transcript"><summary>${esc(L.help)}</summary>${data.turns.map(t=>`<p><strong>${esc(t.speaker)}:</strong> <span data-i18n-ignore>${esc(t.text)}</span></p>`).join('')}</details></section>`;
    const button=root.querySelector('#dialogueCheck'),play=root.querySelector('#dialoguePlay'),speaker=root.querySelector('#dialogueSpeaker');
    const inputs=[...root.querySelectorAll('[data-comprehension-answer]')];
    const update=()=>{
      button.textContent=p.graded?L.next:L.check;button.classList.toggle('lesson-next-ready',!!p.graded);button.disabled=!p.graded&&!p.answers.every(Boolean);
      root.querySelector('#dialogueRetry').hidden=!p.graded;
      root.querySelector('#dialogueAnswered').textContent=`${p.answers.filter(Boolean).length} / ${data.fields.length}`;
      inputs.forEach(input=>{
        const i=Number(input.dataset.comprehensionAnswer),body=input.nextElementSibling;
        input.disabled=!!p.graded;input.checked=p.answers[i]===input.value;
        body.classList.toggle('is-correct',!!p.graded&&input.value===data.fields[i].answer);
        body.classList.toggle('is-wrong',!!p.graded&&input.checked&&input.value!==data.fields[i].answer);
      });
      data.fields.forEach((f,i)=>{
        const correct=p.answers[i]===f.answer,feedback=root.querySelector(`[data-comprehension-feedback="${i}"]`);
        feedback.hidden=!p.graded;feedback.innerHTML=correct?'✓ '+esc(L.correct):esc(L.solution)+': <span data-i18n-ignore>'+esc(f.answer)+'</span>';
      });
      root.querySelector('#dialogueResult').textContent=p.graded?`${p.score} / ${data.fields.length} ${L.result}`:'';
    };
    inputs.forEach(input=>{
      const focusQuestion=()=>{root.querySelector('[data-bug-task]').dataset.bugQuestion=data.fields[Number(input.dataset.comprehensionAnswer)].label;};
      input.onfocus=focusQuestion;
      input.onchange=()=>{if(p.graded||!input.checked)return;const i=Number(input.dataset.comprehensionAnswer);p.answers[i]=input.value;focusQuestion();save();update();};
    });
    button.onclick=()=>{
      if(p.graded){window.A1Voice?.cancel();onContinue();return;}
      if(!p.answers.every(Boolean))return;
      p.score=data.fields.filter((f,i)=>f.answer===p.answers[i]).length;p.best=Math.max(p.best||0,p.score);p.done=true;p.graded=true;
      save(true);update();inputs.filter(input=>input.checked&&input.value===data.fields[Number(input.dataset.comprehensionAnswer)].answer).forEach(input=>input.nextElementSibling.classList.add('answer-success'));onUpdate?.();
    };
    root.querySelector('#dialogueRetry').onclick=()=>{p.answers=data.fields.map(()=>'');p.graded=false;save();update();};
    const stopped=()=>{playing=false;play.textContent='🔊 '+L.play;speaker.textContent='';};
    root.querySelectorAll('[data-dialogue-rate]').forEach(button=>button.onclick=()=>{
      const rate=Number(button.dataset.dialogueRate);if(p.rate===rate)return;
      p.rate=rate;save();
      root.querySelectorAll('[data-dialogue-rate]').forEach(control=>control.setAttribute('aria-pressed',String(Number(control.dataset.dialogueRate)===p.rate)));
      if(playing){window.A1Voice?.cancel();stopped();}
    });
    play.onclick=()=>{
      if(playing){window.A1Voice?.cancel();stopped();return;}
      playing=true;play.textContent='■ '+L.stop;root.querySelector('#dialogueStatus').hidden=true;
      const unavailable=()=>{stopped();const status=root.querySelector('#dialogueStatus');status.hidden=false;status.textContent=L.unavailable;};
      const started=window.A1Voice?.speakDialogue(data.turns,{lang:targetLang==='de'?'de-DE':'fr-FR',rate:p.rate,onTurn:s=>{speaker.textContent=' · '+s;},onEnd:stopped,onError:unavailable});
      if(!started)unavailable();
    };
    update();
  }
  window.A1Comprehension={render};
})();
