(() => {
  'use strict';
  const specs=window.FR_A1_MASTERY_SPECS||{};
  const data=window.FR_A1_DATA||{};
  const lessons=data.lessons||[];
  const PASS=80;
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const norm=s=>String(s||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[.,;:!?¿¡“”„"'’]/g,'').replace(/\s+/g,' ');
  const shuffled=a=>{const out=[...(a||[])];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
  const byId=id=>lessons.find(l=>Number(l.id)===Number(id));
  const spec=id=>specs[String(id)]||{goals:[],tasks:[]};

  function phraseTasks(lesson){
    const pairs=(lesson?.phrases||[]).filter(p=>p?.[0]&&p?.[1]);
    const words=s=>new Set(norm(s).split(' ').filter(w=>w.length>2&&!['ich','und','ein','eine','das','der','die','mir','mich'].includes(w)));
    return pairs.map(([target,native])=>{
      const key=words(native);
      const wrong=pairs.map(p=>p[1]).filter(candidate=>norm(candidate)!==norm(native))
        .filter((candidate,i,all)=>all.findIndex(x=>norm(x)===norm(candidate))===i)
        .map(candidate=>({candidate,similarity:[...words(candidate)].filter(w=>key.has(w)).length}))
        .sort((a,b)=>b.similarity-a.similarity).slice(0,2).map(x=>x.candidate);
      return {type:'choice',q:`Was bedeutet „${target}“?`,o:shuffled([native,...wrong]),answer:native,audio:target,tag:'Lektionsinhalt'};
    });
  }
  function customTasks(lesson){
    return (spec(lesson.id).tasks||[]).map(t=>{
      const out={...t};
      if(out.type==='gap'&&!out.audio)out.audio=out.prompt.replace('___',out.answer).replace(/\s*\([^)]*\)/g,'');
      if(out.type==='choice'){
        const answer=out.answer;
        out.a=(out.o||[]).findIndex(x=>norm(x)===norm(answer));
      }
      return out;
    });
  }
  function makeLessonTest(lesson){
    const ps=phraseTasks(lesson),cs=customTasks(lesson);
    if(Number(lesson?.id)===1){
      const phrasePick=shuffled(ps).slice(0,8);
      const byTag={};cs.forEach(t=>(byTag[t.tag]||(byTag[t.tag]=[])).push(t));
      const grammarPick=[];['être','-er-Verben','venir','s’appeler'].forEach(tag=>grammarPick.push(...shuffled(byTag[tag]||[]).slice(0,2)));
      return shuffled([...phrasePick,...grammarPick]);
    }
    return shuffled([...ps,...cs]);
  }
  function testCount(id){const l=byId(id);if(!l)return 0;return Number(id)===1?16:l.phrases.length+(spec(id).tasks||[]).length;}
  function best(state,id){return Number(state?.lessonMasteryBest?.[id]||0);}
  function attempted(state,id){return !!(state?.lessonMasteryLast&&Object.prototype.hasOwnProperty.call(state.lessonMasteryLast,id));}
  function passed(state,id){return attempted(state,id);}
  function passedCount(state){return lessons.filter(l=>attempted(state,l.id)).length;}
  function completePassedLessons(state,courseLessons=lessons){
    if(!Array.isArray(state.doneLessons))state.doneLessons=[];
    let changed=false;
    for(const lesson of courseLessons){
      if(best(state,lesson.id)>=PASS&&!state.doneLessons.includes(lesson.id)){
        state.doneLessons.push(lesson.id);changed=true;
      }
    }
    return changed;
  }

  function introHtml(lesson,state){
    const b=best(state,lesson.id),tried=attempted(state,lesson.id);
    return `<div class="lesson-mastery-intro compact">
      <div class="between"><div><div class="eyebrow">LEKTIONS-CHECK</div><strong>Zum Schluss: alles noch einmal gemischt</strong></div><span class="pill ${tried?'green':'gray'}">${tried?(b+' %'):'offen'}</span></div>
      <p class="muted">${testCount(lesson.id)} Fragen aus den wichtigsten Wendungen und Grammatikmustern dieser Lektion.</p>
    </div>`;
  }

  function accepted(task,input){
    const values=[task.answer,...(task.accept||[])].filter(Boolean);
    return values.some(v=>norm(v)===norm(input));
  }
  function runTasks({title,subtitle,tasks,view,onBack,onFinish,speak,targetLang='fr'}){
    const ex=shuffled(tasks);let i=0,score=0;
    function finish(){onFinish(score,ex.length,ex);}
    function feedback(ok,task){
      if(ok)score++;
      if(task.audio&&speak)speak(task.audio,true,.80);
      const answer=task.answer;
      document.getElementById('masteryFeedback').innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?'✓ Richtig':'✗ Richtig ist: '+esc(answer)}${task.explanation?`<p>${esc(task.explanation)}</p>`:''}</div><div class="spacer"></div><button class="primary-btn" id="masteryNext">${i<ex.length-1?'Weiter':'Ergebnis'}</button>`;
      document.getElementById('masteryNext').onclick=()=>{i++;i<ex.length?draw():finish();};
    }
    function draw(){
      const q=ex[i];let body='';
      if(q.type==='choice'){
        body=`<div class="quiz-q">${esc(q.q)}</div><div class="options">${(q.o||[]).map((o,j)=>`<button class="option-btn" data-mastery-o="${j}">${esc(o)}</button>`).join('')}</div>`;
      }else{
        body=`${q.context?`<p class="mixed-context"><strong>Bedeutung:</strong> ${esc(q.context)}</p>`:''}<label class="mixed-type" for="masteryInput">✍️ Form einsetzen</label><div class="quiz-q">${esc(q.prompt)}</div><input class="mixed-input" id="masteryInput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Deine Antwort…">${window.A1ExerciseEngine?.charBar?A1ExerciseEngine.charBar(targetLang,'de'):''}<div class="spacer"></div><button class="primary-btn" id="masteryCheck">Prüfen</button>`;
      }
      view.innerHTML=`<div class="between"><button class="tiny-btn" id="masteryBack">← Zurück</button><span class="pill">${i+1}/${ex.length}</span></div><section class="card" style="margin-top:12px"><div class="between"><div><div class="eyebrow">ABSCHLUSSTEST</div><h2>${esc(title)}</h2></div></div>${subtitle?`<p class="muted">${esc(subtitle)}</p>`:''}${body}<div id="masteryFeedback"></div></section>`;
      document.getElementById('masteryBack').onclick=onBack;
      if(q.type==='choice'){
        const a=(q.o||[]).findIndex(x=>norm(x)===norm(q.answer));
        document.querySelectorAll('[data-mastery-o]').forEach(b=>b.onclick=()=>{
          const chosen=+b.dataset.masteryO,ok=chosen===a;
          document.querySelectorAll('[data-mastery-o]').forEach((x,j)=>{x.disabled=true;if(j===a)x.classList.add('correct');else if(j===chosen)x.classList.add('wrong');});
          feedback(ok,q);
        });
      }else{
        const input=document.getElementById('masteryInput');
        window.A1ExerciseEngine?.wireChars?.(input,targetLang,view);
        const check=()=>{if(input.disabled||!input.value.trim())return;input.disabled=true;document.getElementById('masteryCheck').disabled=true;feedback(accepted(q,input.value),q);};
        document.getElementById('masteryCheck').onclick=check;input.onkeydown=e=>{if(e.key==='Enter')check();};
      }
      window.scrollTo({top:0,behavior:'instant'});
    }
    if(!ex.length)return onFinish(0,0,[]);
    draw();
  }

  function renderLessonTest({lesson,view,state,save,onBack,speak}){
    const tasks=makeLessonTest(lesson),s=spec(lesson.id),b=best(state,lesson.id);
    function intro(){
      view.innerHTML=`<div class="between"><button class="tiny-btn" id="masteryBackIntro">← Lektion</button><span class="pill">🏁 LEKTIONS-CHECK</span></div><section class="card" style="margin-top:12px"><h2>${lesson.id}. ${esc(lesson.title)}</h2>${introHtml(lesson,state)}<button class="primary-btn lesson-finale-btn" id="masteryStart">${b?`Noch einmal · Bestwert ${b} %`:`${tasks.length} Fragen starten`}</button></section>`;
      document.getElementById('masteryBackIntro').onclick=onBack;
      document.getElementById('masteryStart').onclick=()=>runTasks({title:`${lesson.id}. ${lesson.title}`,subtitle:`${tasks.length} gemischte Fragen`,tasks,view,onBack:intro,speak,onFinish:(score,total)=>{
        const pct=total?Math.round(score/total*100):0;
        state.lessonMasteryBest=state.lessonMasteryBest||{};state.lessonMasteryLast=state.lessonMasteryLast||{};
        state.lessonMasteryLast[lesson.id]=pct;state.lessonMasteryBest[lesson.id]=Math.max(Number(state.lessonMasteryBest[lesson.id]||0),pct);save(true);
        view.innerHTML=`<section class="card center"><span class="pill">LEKTIONS-CHECK</span><div class="score">${pct}%</div><h2>${score}/${total} richtig</h2><p class="muted">Das ist dein aktueller Stand. Du kannst den Check jederzeit wiederholen und vorher einzelne Teile noch einmal üben.</p><div class="button-row"><button class="secondary-btn" id="masteryAgain">Noch einmal</button><button class="primary-btn" id="masteryReturn">Zur Lektion</button></div></section>`;
        document.getElementById('masteryAgain').onclick=intro;document.getElementById('masteryReturn').onclick=onBack;
      }});
    }
    intro();
  }

  function courseModuleTasks(moduleNo){
    const start=(moduleNo-1)*6,group=lessons.slice(start,start+6),out=[];
    for(const lesson of group){
      const ps=phraseTasks(lesson),cs=customTasks(lesson);
      // Every module contains every lesson. Two core-phrase checks + three grammar/structure checks per lesson.
      const phrasePick=shuffled(ps).slice(0,2);
      const customPick=shuffled(cs).slice(0,3);
      const fallback=shuffled(ps.filter(x=>!phrasePick.includes(x))).slice(0,Math.max(0,5-phrasePick.length-customPick.length));
      [...phrasePick,...customPick,...fallback].forEach(t=>out.push({...t,tag:`L${lesson.id} · ${t.tag||'A1'}`}));
    }
    return shuffled(out);
  }
  function courseBest(state,n){return Number(state?.courseMasteryBest?.[n]||0);}
  function renderCourseMenu({view,state,save,onBack,speak}){
    state.courseMasteryBest=state.courseMasteryBest||{};
    const allPassed=[1,2,3,4].every(n=>Object.prototype.hasOwnProperty.call(state.courseMasteryBest,n)&&courseBest(state,n)>=0);
    view.innerHTML=`<div class="between"><button class="tiny-btn" id="courseMasteryBack">← Prüfung</button><span class="pill">A1 WISSENSCHECK</span></div><section class="card hero" style="margin-top:12px"><div class="between"><div><h2>Kursweiter A1-Abschlusscheck</h2><p class="muted">Vier Blöcke à 30 Aufgaben. Jeder Block deckt sechs Lektionen ab; jede Lektion kommt mit fünf Aufgaben vor.</p></div><span class="pill ${allPassed?'green':'gray'}">${allPassed?'✓ ausprobiert':'4 Teile'}</span></div><p class="muted">Der Kurscheck mischt Inhalte aus allen Lektionen und zeigt dir deinen aktuellen Stand.</p></section><div class="list">${[1,2,3,4].map(n=>{const a=(n-1)*6+1,b=n*6,score=courseBest(state,n);return `<button class="practice-card" data-course-mastery="${n}"><div class="between"><strong>Teil ${n} · Lektionen ${a}–${b}</strong><span class="pill ${score>=PASS?'green':'gray'}">${score?score+' %':'offen'}</span></div><small>30 gemischte Aufgaben</small></button>`;}).join('')}</div>`;
    document.getElementById('courseMasteryBack').onclick=onBack;
    document.querySelectorAll('[data-course-mastery]').forEach(btn=>btn.onclick=()=>{
      const n=+btn.dataset.courseMastery,tasks=courseModuleTasks(n);
      runTasks({title:`A1 Abschlusscheck · Teil ${n}`,subtitle:`Lektionen ${(n-1)*6+1}–${n*6} · 30 Aufgaben`,tasks,view,onBack:()=>renderCourseMenu({view,state,save,onBack,speak}),speak,onFinish:(score,total)=>{
        const pct=total?Math.round(score/total*100):0;state.courseMasteryBest[n]=Math.max(courseBest(state,n),pct);save(true);view.innerHTML=`<section class="card center"><span class="pill">TEIL ${n}</span><div class="score">${pct}%</div><h2>${score}/${total} richtig</h2><p class="muted">Das ist dein aktueller Stand in diesem Block.</p><div class="button-row"><button class="secondary-btn" id="courseAgain">Noch einmal</button><button class="primary-btn" id="courseMenu">Alle Teile</button></div></section>`;
        document.getElementById('courseAgain').onclick=()=>btn.click();document.getElementById('courseMenu').onclick=()=>renderCourseMenu({view,state,save,onBack,speak});
      }});
    });
  }
  window.FR_A1_MASTERY={PASS,spec,testCount,best,passed,passedCount,completePassedLessons,introHtml,makeLessonTest,renderLessonTest,renderCourseMenu};
})();

