/* Spanish A1: lesson deepening (topic rule + mini-test) and lesson check, following the French A1 lesson logic. */
(() => {
  'use strict';
  const VERSION=1,PASS=80;
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const shuffle=a=>{const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]];}return r;};
  const plain=s=>String(s||'').normalize('NFC').toLowerCase().replace(/[¿¡.,;:!?«»"“”]/g,' ').replace(/\s+/g,' ').trim();
  const noAccent=s=>plain(s).normalize('NFD').replace(/[̀-̂̈]/g,'').normalize('NFC');
  const fill=(sentence,answer)=>String(sentence).replace('___',answer);

  // Content uses compact rows; they are expanded once into self-describing tasks.
  function deepeningTopics(id){
    return (window.ES_A1_DEEPENING_CONTENT?.[id]||[]).map((t,ti)=>({
      key:'t'+ti,title:t.title,rule:t.rule,pairs:t.pairs||[],
      tasks:t.tasks.map(([q,answer,wrong,meaning,why],i)=>({id:`d${id}-${ti}-${i}`,kind:'choice',q,answer,options:[answer,...wrong],meaning,why,audio:q.includes('___')?fill(q,answer):answer}))
    }));
  }
  function checkTasks(id){
    return (window.ES_A1_CHECK_CONTENT?.[id]||[]).map((row,i)=>{
      const tid=`c${id}-${i}`;
      if(row[0]==='c'){const [,q,answer,wrong,audio,why]=row;return {id:tid,kind:'choice',q,answer,options:[answer,...wrong],audio:audio==='='?answer:(audio||''),why};}
      if(row[0]==='l'){const [,audio,q,answer,wrong,why]=row;return {id:tid,kind:'listen',q,answer,options:[answer,...wrong],audio,why};}
      const [,q,sentence,answers,why,strict]=row;return {id:tid,kind:'type',q,sentence,answers,answer:answers[0],audio:fill(sentence,answers[0]),why,strict:strict===true};
    });
  }
  function work(state,id){state.lessonWork||={};const w=state.lessonWork[id]||={};return w;}
  function deepeningProgress(state,id){
    const topics=deepeningTopics(id),d=state.lessonWork?.[id]?.deepening||{};
    return {done:topics.filter(t=>d[t.key]?.done===true).length,total:topics.length};
  }
  function checkBest(state,id){return Number(state.lessonWork?.[id]?.check?.best||0);}
  function checkPassed(state,id){return checkTasks(id).length===0||checkBest(state,id)>=PASS;}

  // One question at a time: choice, listening or typed gap. Calls done(ok, chosenText).
  function drawTask(stage,task,{speak,charBar,wireChars,restore,onAnswer,nextLabel,onNext,header=''}){
    const options=task.kind==='type'?[]:(task.order||=shuffle(task.options));
    const prompt=task.kind==='type'?`<p class="mixed-context">${esc(task.q)}</p><div class="quiz-q">${esc(task.sentence).replace('___','<span class="gap">___</span>')}</div><input class="text-input es-check-input" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Fehlendes Wort">${charBar||''}<button type="button" class="primary-btn es-check-submit">Prüfen</button>`
      :`${task.kind==='listen'?`<button type="button" class="soft-btn es-check-play">▶️ Anhören</button>`:''}${task.meaning?`<p class="mixed-context">${esc(task.meaning)}</p>`:''}<div class="quiz-q">${esc(task.q)}</div><div class="options">${options.map(o=>`<button type="button" class="option-btn">${esc(o)}</button>`).join('')}</div>`;
    stage.innerHTML=`${header}${prompt}<div class="es-practice-feedback" aria-live="polite"></div>`;
    const play=stage.querySelector('.es-check-play');if(play){play.onclick=()=>speak(task.audio,true,.8);if(!restore)setTimeout(()=>speak(task.audio,true,.8),150);}
    const input=stage.querySelector('.es-check-input');
    if(input){wireChars?.(input,stage);input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();submit(input.value);}});stage.querySelector('.es-check-submit').onclick=()=>submit(input.value);setTimeout(()=>input.focus?.(),0);}
    stage.querySelectorAll('.option-btn').forEach(b=>b.onclick=()=>submit(b.textContent));
    function grade(value){
      if(task.kind!=='type')return {ok:value===task.answer,note:''};
      if(task.answers.some(a=>plain(a)===plain(value)))return {ok:true,note:''};
      if(task.answers.some(a=>noAccent(a)===noAccent(value)))return task.strict?{ok:false,note:'Hier entscheidet der Akzent über die Bedeutung.'}:{ok:true,note:`Achte auf die Schreibweise mit Akzent: ${task.answer}`};
      return {ok:false,note:''};
    }
    function show(value,restoring){
      const {ok,note}=grade(value);
      stage.querySelectorAll('.option-btn').forEach(b=>{b.disabled=true;b.classList.toggle('correct',b.textContent===task.answer);b.classList.toggle('wrong',b.textContent===value&&!ok);});
      if(input){input.value=value;input.disabled=true;input.classList.add(ok?'correct':'wrong');stage.querySelector('.es-check-submit').hidden=true;}
      const solution=task.kind==='type'?fill(task.sentence,task.answer):task.answer;
      stage.querySelector('.es-practice-feedback').innerHTML=`<div class="feedback ${ok?'good':'bad'}"><strong>${ok?'✓ Richtig':'✗ Richtig ist: '+esc(solution)}</strong>${note?`<p>${esc(note)}</p>`:''}<p>${esc(task.why)}</p>${task.audio?`<button type="button" class="tiny-btn es-practice-audio">🔊 Anhören</button>`:''}</div><button type="button" class="primary-btn es-practice-next">${esc(nextLabel)}</button>`;
      stage.querySelector('.es-practice-audio')?.addEventListener('click',()=>speak(task.audio,true,.8));
      if(!restoring&&task.audio)speak(task.audio,true,.8);
      stage.querySelector('.es-practice-next').onclick=onNext;
      return ok;
    }
    function submit(value){value=String(value||'').trim();if(!value||stage.dataset.answered)return;stage.dataset.answered='1';const ok=show(value,false);onAnswer(ok,value);}
    if(restore!=null){stage.dataset.answered='1';show(restore,true);}
  }

  // A resumable sequence of tasks. store keeps {session,best,last,done}.
  function runSequence(stage,tasks,{store,save,speak,charBar,wireChars,onFinish,label}){
    const s=store.session&&store.session.version===VERSION&&Array.isArray(store.session.ids)&&store.session.i<store.session.ids.length?store.session:null;
    const byId=new Map(tasks.map(t=>[t.id,t]));
    let ids=s?s.ids.filter(x=>byId.has(x)):shuffle(tasks).map(t=>t.id),i=s?Math.min(s.i,ids.length):0,score=s?s.score:0,wrong=s?s.wrong:[],response=s?s.response:null;
    function persist(){store.session={version:VERSION,ids,i,score,wrong,response};save();}
    function next(){i++;response=null;draw();}
    function draw(){
      if(i>=ids.length){delete store.session;return onFinish(score,ids.length,wrong.map(x=>byId.get(x)).filter(Boolean));}
      persist();delete stage.dataset.answered;
      const task=byId.get(ids[i]);
      drawTask(stage,task,{speak,charBar,wireChars,restore:response?.value??null,header:`<small class="muted">${esc(label)} · ${i+1} / ${ids.length}</small>`,nextLabel:i<ids.length-1?'Weiter':'Ergebnis',onNext:next,onAnswer:(ok,value)=>{if(ok)score++;else wrong.push(task.id);response={value};persist();}});
    }
    draw();
  }
  // Wrong answers are repeated once; this round does not change the saved score.
  function runReview(stage,tasks,{speak,charBar,wireChars,onDone}){
    let i=0;const list=shuffle(tasks).map(t=>({...t,order:null}));
    function draw(){
      if(i>=list.length)return onDone();
      delete stage.dataset.answered;
      drawTask(stage,list[i],{speak,charBar,wireChars,restore:null,header:`<small class="muted">Fehler wiederholen · ${i+1} / ${list.length}</small>`,nextLabel:i<list.length-1?'Weiter':'Fertig',onNext:()=>{i++;draw();},onAnswer:()=>{}});
    }
    draw();
  }

  function deepeningHtml(id,state,speakBtn){
    const topics=deepeningTopics(id);if(!topics.length)return '';
    const d=state.lessonWork?.[id]?.deepening||{};
    return `<details class="lesson-explanation es-deepening" open><summary><strong>Vertiefung üben</strong> <small class="muted">${deepeningProgress(state,id).done}/${topics.length} Themen geübt</small></summary>${topics.map(t=>`<section class="es-deepening-topic" data-es-topic="${t.key}"><h4>${esc(t.title)}</h4><p>${esc(t.rule)}</p>${t.pairs.map(([es,de])=>`<div class="phrase-row"><div><strong>${esc(es)}</strong><small>${esc(de)}</small></div>${speakBtn(es)}</div>`).join('')}<div class="es-deepening-panel"><div class="between"><strong>Direkt üben</strong><small class="es-topic-status">${d[t.key]?.done?`✓ geübt · bestes Ergebnis ${d[t.key].best}/${t.tasks.length}`:t.tasks.length+' Aufgaben'}</small></div><button type="button" class="soft-btn exercise-start-btn es-topic-start ${d[t.key]?.done?'is-completed':''}">${d[t.key]?.session?'Übung fortsetzen':d[t.key]?.done?'Übung wiederholen':'Intensiv üben'}</button><div class="es-deepening-stage grammar-drill-stage"></div></div></section>`).join('')}</details>`;
  }
  function wireDeepening(root,{lesson,state,save,speak,onUpdate}){
    const topics=deepeningTopics(lesson.id);
    const charBar=window.A1ExerciseEngine?.charBar('es','de')||'',wireChars=(input,c)=>window.A1ExerciseEngine?.wireChars(input,'es',c);
    root.querySelectorAll('[data-es-topic]').forEach(section=>{
      const topic=topics.find(t=>t.key===section.dataset.esTopic);if(!topic)return;
      const start=section.querySelector('.es-topic-start'),stage=section.querySelector('.es-deepening-stage');
      start.onclick=()=>{
        const w=work(state,lesson.id);w.deepening||={};const store=w.deepening[topic.key]||={};
        start.hidden=true;
        runSequence(stage,topic.tasks,{store,save,speak,charBar,wireChars,label:topic.title,onFinish:(score,total,wrong)=>{
          Object.assign(store,{done:true,last:score,best:Math.max(store.best||0,score),total});save(true);onUpdate?.();
          section.querySelector('.es-topic-status').textContent=`✓ geübt · bestes Ergebnis ${store.best}/${total}`;
          stage.innerHTML=`<div class="deepening-result"><strong>${score} / ${total} richtig</strong>${wrong.length?`<p class="muted">Wiederhole diese Formen:</p>${wrong.map(t=>`<p>${esc(t.audio)}</p>`).join('')}`:'<p class="muted">Gut vorbereitet für die Übungen.</p>'}</div>`;
          start.hidden=false;start.textContent='Übung wiederholen';start.classList.add('is-completed');
        }});
      };
    });
  }

  function runCheck({view,lesson,state,save,speak,onBack,onContinue}){
    const tasks=checkTasks(lesson.id),w=work(state,lesson.id),store=w.check||={};
    const charBar=window.A1ExerciseEngine?.charBar('es','de')||'',wireChars=(input,c)=>window.A1ExerciseEngine?.wireChars(input,'es',c);
    function intro(){
      window.A1Voice?.cancel();
      view.innerHTML=`<div class="between"><button class="tiny-btn" id="esCheckBack">← Lerninhalt</button><span class="pill">LEKTIONSCHECK</span></div><section class="card lesson-flow" style="margin-top:12px"><h2>${lesson.id}. ${esc(lesson.title)}</h2><p>Der Lektionscheck prüft die Ziele dieser Lektion mit ${tasks.length} neuen Aufgaben: Situationen, Hörfragen und Formen zum Eintippen. Zum Bestehen brauchst du mindestens ${PASS} %.</p><p class="muted">${store.best!=null?`Bester Wert: ${store.best} %`:'Noch nicht bearbeitet.'}</p><div class="button-row"><button class="primary-btn" id="esCheckStart">${store.session?'Lektionscheck fortsetzen':store.best!=null?'Lektionscheck wiederholen':'Lektionscheck starten'}</button><button class="secondary-btn" id="esCheckSkip">Zu Sprechen & Schreiben</button></div></section>`;
      document.getElementById('esCheckBack').onclick=onBack;document.getElementById('esCheckSkip').onclick=onContinue;
      document.getElementById('esCheckStart').onclick=start;window.scrollTo({top:0,behavior:'instant'});
    }
    function start(){
      view.innerHTML=`<div class="between"><button class="tiny-btn" id="esCheckBack">← Lektionscheck</button><span class="pill">LEKTIONSCHECK</span></div><section class="card lesson-flow es-check" style="margin-top:12px"><div class="es-check-stage"></div></section>`;
      document.getElementById('esCheckBack').onclick=intro;
      const stage=view.querySelector('.es-check-stage');
      runSequence(stage,tasks,{store,save,speak,charBar,wireChars,label:'Lektionscheck',onFinish:(score,total,wrong)=>{
        const pct=total?Math.round(score/total*100):0;
        Object.assign(store,{last:pct,best:Math.max(Number(store.best||0),pct),done:true});save(true);
        const passed=pct>=PASS;
        stage.innerHTML=`<div class="center"><span class="pill ${passed?'green':'amber'}">${passed?'BESTANDEN':'NOCH NICHT BESTANDEN'}</span><div class="score">${pct}%</div><h3>${score}/${total} richtig</h3><p class="muted">${passed?'Du kannst die Ziele dieser Lektion anwenden.':`Zum Bestehen brauchst du ${PASS} %. Wiederhole die Vertiefung und versuche es noch einmal.`}</p></div>${wrong.length?`<p><strong>Das solltest du wiederholen:</strong></p>${wrong.map(t=>`<p>• ${esc(t.kind==='type'?fill(t.sentence,t.answer):t.answer)}</p>`).join('')}`:''}<div class="button-row">${wrong.length?'<button class="secondary-btn" id="esCheckReview">Fehler noch einmal üben</button>':''}<button class="secondary-btn" id="esCheckAgain">Neuer Versuch</button><button class="primary-btn" id="esCheckContinue">Weiter zu Sprechen & Schreiben</button></div>`;
        document.getElementById('esCheckAgain').onclick=start;document.getElementById('esCheckContinue').onclick=onContinue;
        const review=document.getElementById('esCheckReview');
        if(review)review.onclick=()=>runReview(stage,wrong,{speak,charBar,wireChars,onDone:intro});
      }});
      window.scrollTo({top:0,behavior:'instant'});
    }
    intro();
  }
  window.ES_A1_PRACTICE={deepeningTopics,checkTasks,deepeningProgress,checkBest,checkPassed,deepeningHtml,wireDeepening,runCheck,PASS,_grade:{plain,noAccent}};
})();
