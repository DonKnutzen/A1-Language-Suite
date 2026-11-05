/* Selbst geschriebene Sätze: ein Extra nach Finale & Arcade, zählt nicht zur Note.
   Geprüft wird regelbasiert: Jeder Satz muss die Zielstruktur der Lektion enthalten (need)
   und darf typische Fehler nicht zeigen (avoid). Fortschritt: lessonWork[id].sentenceWriting. */
(() => {
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const unaccent=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').normalize('NFC');
  // Worte mit einem Leerzeichen davor und danach; nach einem Apostroph beginnt ein neues Wort (j' ai).
  const tokens=value=>' '+String(value??'').normalize('NFC').toLocaleLowerCase('fr').replace(/[’‘`´ʼ]/g,"'").replace(/œ/g,'oe').replace(/(\d)([€%])/g,'$1 $2').replace(/'\s*/g,"' ").replace(/[^\p{L}\p{N}'€% ]+/gu,' ').replace(/\s+/g,' ').trim()+' ';
  const wordCount=value=>tokens(value).trim().split(' ').filter(w=>/[\p{L}\p{N}]/u.test(w)).length;
  const source=pattern=>String(pattern).replace(/'/g,"' ").replace(/' (?=\||\)|$)/g,"'").replace(/-/g,' ').replace(/~/g,'(?:\\S+ ){0,6}');
  const has=(pattern,text)=>new RegExp(` (?:${source(pattern)})(?= )`).test(text);
  const hasPlain=(pattern,text)=>new RegExp(` (?:${unaccent(source(pattern))})(?= )`).test(unaccent(text));
  function check(task,value){
    const text=tokens(value),issues=[];
    if(wordCount(value)<(task.min||4))issues.push('Schreib einen ganzen Satz.');
    for(const [pattern,hint] of task.avoid||[])if(has(pattern,text))issues.push(hint);
    for(const [pattern,hint] of task.need||[])if(!has(pattern,text))issues.push(hasPlain(pattern,text)?`Achte auf die Akzente. ${hint}`:hint);
    return {ok:!issues.length,issues:[...new Set(issues)]};
  }
  const tasksOf=id=>window.FR_A2_SENTENCE_CONTENT?.[id]||[];
  const unlocked=(state,id)=>!!window.FR_A1_HARD_MODE?.achievement(state,id);
  const progress=(state,id)=>state.lessonWork?.[id]?.sentenceWriting||null;
  const store=(state,id)=>{const w=(((state.lessonWork||={})[id]||={}).sentenceWriting||={});w.drafts||={};w.correct||={};w.tries||={};return w;};
  const doneCount=(w,tasks)=>tasks.filter(t=>w?.correct?.[t.id]===true).length;
  function entryHtml(lesson,state){
    const tasks=tasksOf(lesson.id);if(!tasks.length)return '';
    const open=unlocked(state,lesson.id),w=progress(state,lesson.id),done=doneCount(w,tasks);
    const label=!open?'Gesperrt':w?.passedAt?'✓ Geschafft':done?`${done} von ${tasks.length} →`:'Schreiben →';
    return `<section class="sw-entry-card ${open?'is-unlocked':'is-locked'} ${w?.passedAt?'is-passed':''}" data-i18n-ignore aria-label="Selbst schreiben">
      <button type="button" class="sw-entry-button" data-sw-start ${open?'':'disabled'}><strong>✍️ Selbst schreiben<small>${tasks.length} eigene Sätze · beliebig oft wiederholen</small></strong><span>${esc(label)}</span></button>
      ${open?'':'<small class="sw-entry-hint">Wird mit bestandenem Finale freigeschaltet</small>'}
    </section>`;
  }
  function renderEntry({lesson,view,state,save,onOpen,onBack}){
    if(view.querySelector('.sw-entry-card'))return;
    const html=entryHtml(lesson,state);if(!html)return;
    const host=document.createElement('div');host.innerHTML=html;view.appendChild(host);
    const button=host.querySelector('[data-sw-start]');
    button.onclick=()=>{if(!unlocked(state,lesson.id))return;onOpen?.();render({lesson,view,state,save,onBack});};
  }
  function render({lesson,view,state,save,onBack}){
    const id=lesson.id,tasks=tasksOf(id),w=store(state,id);
    if(!tasks.length||!unlocked(state,id))return onBack();
    const allDone=()=>tasks.every(t=>w.correct[t.id]===true);
    function card(task,i){
      const right=w.correct[task.id]===true,value=w.drafts[task.id]||'';
      return `<section class="card sw-task ${right?'is-right':''}" data-sw-task="${esc(task.id)}">
        <div class="sw-task-head"><span class="sw-number">${right?'✓':i+1}</span><div><strong>${esc(task.de)}</strong>${task.goal?`<small>Lernziel: ${esc(task.goal)}</small>`:''}</div></div>
        <textarea class="text-input sw-input" rows="2" lang="fr" autocapitalize="sentences" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="Auf Französisch schreiben …" aria-label="Satz ${i+1}" ${right?'readonly':''}>${esc(value)}</textarea>
        <div class="sw-feedback" aria-live="polite"></div>
      </section>`;
    }
    function feedback(el,task,result){
      const tries=w.tries[task.id]||0;
      if(result.ok){el.innerHTML='<p class="sw-good">Richtig!</p>';return;}
      el.innerHTML=`<ul class="sw-issues">${result.issues.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${tries>=2?`<details class="sw-model"><summary>Beispiel ansehen</summary><p data-i18n-ignore>${esc(task.model)}</p></details>`:''}`;
    }
    function drawResult(){
      const box=view.querySelector('[data-sw-result]'),count=doneCount(w,tasks);
      view.querySelector('[data-sw-status]').textContent=`${count} von ${tasks.length} richtig`;
      view.querySelector('[data-sw-check]').hidden=allDone();
      if(view.querySelector('.mixed-char-wrap'))view.querySelector('.mixed-char-wrap').hidden=allDone();
      box.hidden=!allDone();
      if(allDone())box.innerHTML=`<h3>🎉 Geschafft!</h3><p>Alle ${tasks.length} Sätze stimmen. Deine Struktur sitzt.</p><div class="sw-models"><strong>So geht es zum Beispiel auch:</strong>${tasks.map(t=>`<p data-i18n-ignore>${esc(t.model)}</p>`).join('')}</div><div class="sw-actions"><button type="button" class="secondary-btn" data-sw-again>Nochmal schreiben</button><button type="button" class="primary-btn" data-sw-close>Zur Lektion</button></div>`;
      box.querySelector('[data-sw-again]')?.addEventListener('click',()=>{w.drafts={};w.correct={};w.tries={};save();draw();});
      box.querySelector('[data-sw-close]')?.addEventListener('click',onBack);
    }
    function runCheck(){
      let firstWrong=null;const before=allDone();
      for(const task of tasks){
        if(w.correct[task.id]===true)continue;
        const node=view.querySelector(`[data-sw-task="${task.id}"]`),input=node.querySelector('textarea'),box=node.querySelector('.sw-feedback');
        w.drafts[task.id]=input.value.slice(0,600);
        if(!input.value.trim()){box.innerHTML='<ul class="sw-issues"><li>Schreibe erst diesen Satz.</li></ul>';firstWrong||=node;continue;}
        const result=check(task,input.value);
        if(result.ok){w.correct[task.id]=true;input.readOnly=true;node.classList.add('is-right');node.querySelector('.sw-number').textContent='✓';}
        else{w.tries[task.id]=(w.tries[task.id]||0)+1;firstWrong||=node;}
        feedback(box,task,result);
      }
      const justDone=!before&&allDone();
      if(justDone){w.passedAt||=new Date().toISOString();w.passes=(w.passes||0)+1;}
      save(justDone);drawResult();
      (firstWrong||(justDone?view.querySelector('[data-sw-result]'):null))?.scrollIntoView?.({behavior:'smooth',block:'center'});
    }
    function draw(){
      view.innerHTML=`<div class="sw-page" data-i18n-ignore data-bug-lesson="${id}">
        <button type="button" class="tiny-btn lesson-back-link" data-sw-back>← Lektion</button>
        <header class="card sw-head"><span class="sw-eyebrow">EXTRA · LEKTION ${id}</span><h2>Selbst schreiben</h2><p>Schreibe ${tasks.length} ganze Sätze auf Französisch. Du prüfst, verbesserst und prüfst wieder, so oft du möchtest, bis alle stimmen. Das zählt nicht zur Note von Finale &amp; Arcade.</p></header>
        ${tasks.map(card).join('')}
        ${window.A1ExerciseEngine?.charBar('fr','de')||''}
        <p class="sw-status" data-sw-status aria-live="polite"></p>
        <button type="button" class="primary-btn sw-check" data-sw-check>Sätze prüfen</button>
        <section class="card sw-result" data-sw-result hidden></section>
      </div>`;
      view.querySelector('[data-sw-back]').onclick=onBack;
      view.querySelector('[data-sw-check]').onclick=runCheck;
      const page=view.querySelector('.sw-page');
      view.querySelectorAll('.sw-input').forEach((input,i)=>{
        const task=tasks[i],box=input.parentElement.querySelector('.sw-feedback');
        input.oninput=()=>{w.drafts[task.id]=input.value.slice(0,600);box.replaceChildren();save();};
        input.onfocus=()=>window.A1ExerciseEngine?.wireChars(input,'fr',page);
      });
      const first=[...view.querySelectorAll('.sw-input')].find(x=>!x.readOnly)||view.querySelector('.sw-input');
      if(first)window.A1ExerciseEngine?.wireChars(first,'fr',page);
      drawResult();
      window.scrollTo?.({top:0,behavior:'instant'});
    }
    window.A1Voice?.cancel();
    draw();
  }
  window.FR_A2_SENTENCES={check,tokens,entryHtml,renderEntry,render,unlocked};
})();
