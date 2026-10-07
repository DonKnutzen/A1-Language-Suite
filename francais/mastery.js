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
    const allNative=pairs.map(p=>p[1]);
    return pairs.map(([target,native],idx)=>{
      const wrong=[];
      for(let step=1;wrong.length<2&&step<pairs.length+2;step++){
        const candidate=allNative[(idx+step)%allNative.length];
        if(candidate&&norm(candidate)!==norm(native)&&!wrong.some(x=>norm(x)===norm(candidate)))wrong.push(candidate);
      }
      return {type:'choice',q:`Was bedeutet „${target}“?`,o:shuffled([native,...wrong]),answer:native,audio:target,tag:'Lektionsinhalt'};
    });
  }
  function customTasks(lesson){
    return (spec(lesson.id).tasks||[]).map(t=>{
      const out={...t};
      if(out.type==='choice'){
        const answer=out.answer;
        out.a=(out.o||[]).findIndex(x=>norm(x)===norm(answer));
      }
      return out;
    });
  }
  function makeLessonTest(lesson){return shuffled([...phraseTasks(lesson),...customTasks(lesson)]);}
  function testCount(id){const l=byId(id);return l?l.phrases.length+(spec(id).tasks||[]).length:0;}
  function best(state,id){return Number(state?.lessonMasteryBest?.[id]||0);}
  function passed(state,id){return best(state,id)>=PASS;}
  function passedCount(state){return lessons.filter(l=>passed(state,l.id)).length;}

  function introHtml(lesson,state){
    const s=spec(lesson.id),b=best(state,lesson.id),ok=b>=PASS;
    return `<div class="lesson-mastery-intro">
      <div class="between"><div><div class="eyebrow">PFLICHTWISSEN</div><strong>Das wird im Abschlusstest vollständig geprüft</strong></div><span class="pill ${ok?'green':'gray'}">${ok?'✓ '+b+' %':b?b+' %':'offen'}</span></div>
      <ul>${(s.goals||[]).map(g=>`<li>${esc(g)}</li>`).join('')}</ul>
      <p class="muted">Der Test enthält <strong>${testCount(lesson.id)} Aufgaben</strong>: alle Kerninhalte dieser Lektion plus die oben definierten Grammatik- und Satzmuster. Es werden keine Aufgaben zufällig weggelassen. Bestehensgrenze: ${PASS} %.</p>
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
      view.innerHTML=`<div class="between"><button class="tiny-btn" id="masteryBack">← Zurück</button><span class="pill">${i+1}/${ex.length}</span></div><section class="card" style="margin-top:12px"><div class="between"><div><div class="eyebrow">ABSCHLUSSTEST</div><h2>${esc(title)}</h2></div>${q.tag?`<span class="pill gray">${esc(q.tag)}</span>`:''}</div>${subtitle?`<p class="muted">${esc(subtitle)}</p>`:''}${body}<div id="masteryFeedback"></div></section>`;
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
      view.innerHTML=`<div class="between"><button class="tiny-btn" id="masteryBackIntro">← Lektion</button><span class="pill">🏁 ABSCHLUSSTEST</span></div><section class="card" style="margin-top:12px"><h2>${lesson.id}. ${esc(lesson.title)}</h2>${introHtml(lesson,state)}<div class="notice"><strong>Warum mehr als 10 Fragen?</strong><br>Die 10 interaktiven Aufgaben sind Training. Dieser Test prüft dagegen jeden definierten Pflichtpunkt dieser Lektion mindestens einmal.</div><div class="spacer"></div><button class="primary-btn" id="masteryStart">${b?`Test erneut starten · Bestwert ${b} %`:`${tasks.length} Aufgaben starten`}</button></section>`;
      document.getElementById('masteryBackIntro').onclick=onBack;
      document.getElementById('masteryStart').onclick=()=>runTasks({title:`${lesson.id}. ${lesson.title}`,subtitle:`${tasks.length} Aufgaben · vollständig, ohne zufällige Auslassung`,tasks,view,onBack:intro,speak,onFinish:(score,total)=>{
        const pct=total?Math.round(score/total*100):0;
        state.lessonMasteryBest=state.lessonMasteryBest||{};state.lessonMasteryLast=state.lessonMasteryLast||{};
        state.lessonMasteryLast[lesson.id]=pct;state.lessonMasteryBest[lesson.id]=Math.max(Number(state.lessonMasteryBest[lesson.id]||0),pct);save(true);
        const ok=pct>=PASS;
        view.innerHTML=`<section class="card center"><span class="pill ${ok?'green':'amber'}">${ok?'PFLICHTWISSEN BESTANDEN':'NOCH NICHT BESTANDEN'}</span><div class="score">${pct}%</div><h2>${score}/${total}</h2><p class="muted">Alle ${total} vorgesehenen Inhalte dieses Abschlusstests wurden geprüft. ${ok?'Diese Lektion ist im Wissenscheck bestanden.':`Für den Wissenscheck brauchst du mindestens ${PASS} %.`}</p><div class="button-row"><button class="secondary-btn" id="masteryAgain">Noch einmal</button><button class="primary-btn" id="masteryReturn">Zur Lektion</button></div></section>`;
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
    const allPassed=[1,2,3,4].every(n=>courseBest(state,n)>=PASS);
    view.innerHTML=`<div class="between"><button class="tiny-btn" id="courseMasteryBack">← Prüfung</button><span class="pill">A1 WISSENSCHECK</span></div><section class="card hero" style="margin-top:12px"><div class="between"><div><h2>Kursweiter A1-Abschlusscheck</h2><p class="muted">Vier Blöcke à 30 Aufgaben. Jeder Block deckt sechs Lektionen ab; jede Lektion kommt mit fünf Aufgaben vor.</p></div><span class="pill ${allPassed?'green':'gray'}">${allPassed?'✓ komplett':'4 Teile'}</span></div><div class="notice">Die vollständige Detailabdeckung erfolgt in den 24 Lektions-Abschlusstests. Dieser Kurscheck prüft zusätzlich kumulativ, ob du Wissen aus allen Lektionen abrufen kannst.</div></section><div class="list">${[1,2,3,4].map(n=>{const a=(n-1)*6+1,b=n*6,score=courseBest(state,n);return `<button class="practice-card" data-course-mastery="${n}"><div class="between"><strong>Teil ${n} · Lektionen ${a}–${b}</strong><span class="pill ${score>=PASS?'green':'gray'}">${score?score+' %':'offen'}</span></div><small>30 Aufgaben · Bestehensgrenze ${PASS} %</small></button>`;}).join('')}</div>`;
    document.getElementById('courseMasteryBack').onclick=onBack;
    document.querySelectorAll('[data-course-mastery]').forEach(btn=>btn.onclick=()=>{
      const n=+btn.dataset.courseMastery,tasks=courseModuleTasks(n);
      runTasks({title:`A1 Abschlusscheck · Teil ${n}`,subtitle:`Lektionen ${(n-1)*6+1}–${n*6} · 30 Aufgaben`,tasks,view,onBack:()=>renderCourseMenu({view,state,save,onBack,speak}),speak,onFinish:(score,total)=>{
        const pct=total?Math.round(score/total*100):0;state.courseMasteryBest[n]=Math.max(courseBest(state,n),pct);save(true);const ok=pct>=PASS;
        view.innerHTML=`<section class="card center"><span class="pill ${ok?'green':'amber'}">TEIL ${n} · ${ok?'BESTANDEN':'NOCH OFFEN'}</span><div class="score">${pct}%</div><h2>${score}/${total}</h2><p class="muted">${ok?'Der Block ist bestanden.':'Für diesen Block brauchst du mindestens '+PASS+' %.'}</p><div class="button-row"><button class="secondary-btn" id="courseAgain">Noch einmal</button><button class="primary-btn" id="courseMenu">Alle Teile</button></div></section>`;
        document.getElementById('courseAgain').onclick=()=>btn.click();document.getElementById('courseMenu').onclick=()=>renderCourseMenu({view,state,save,onBack,speak});
      }});
    });
  }
  window.FR_A1_MASTERY={PASS,spec,testCount,best,passed,passedCount,introHtml,makeLessonTest,renderLessonTest,renderCourseMenu};
})();
