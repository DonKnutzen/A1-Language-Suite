(() => {
  'use strict';
  const specs=window.FR_A1_MASTERY_SPECS||{};
  const data=window.FR_A1_DATA||{};
  const lessons=data.lessons||[];
  const PASS=80;
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const norm=s=>String(s||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[.,;:!?¿¡“”„"'’]/g,'').replace(/\s+/g,' ');
  const choiceEqual=(a,b)=>String(a).normalize('NFC')===String(b).normalize('NFC');
  const shuffled=a=>{const out=[...(a||[])];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
  const byId=id=>lessons.find(l=>Number(l.id)===Number(id));
  const spec=id=>specs[String(id)]||{goals:[],tasks:[]};

  function phraseTasks(lesson){
    if(Number(lesson.id)!==1)return (lesson.quiz||[]).map(q=>{
      if(q.context&&q.q.includes('___'))return {type:'gap',prompt:q.q,answer:q.o[q.a],context:q.context,audio:q.audio,explanation:q.explanation,tag:'Lektionsinhalt'};
      return {type:'choice',q:q.q,o:shuffled(q.o),answer:q.o[q.a],audio:q.audio,explanation:q.explanation,tag:'Lektionsinhalt'};
    });
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
        out.a=(out.o||[]).findIndex(x=>choiceEqual(x,answer));
      }
      return out;
    });
  }
  function spreadAnswers(tasks,lead=[]){
    const pending=[...tasks],out=[...lead];
    const tokens=q=>new Set(norm(q.audio||q.prompt||q.q).replace(/___/g,' ').split(' ').filter(w=>w.length>2));
    function penalty(q){
      let cost=0;const qt=tokens(q);
      out.slice(-3).reverse().forEach((previous,distance)=>{
        const weight=1/(distance+1),pt=tokens(previous),overlap=[...qt].filter(w=>pt.has(w)).length/Math.max(1,Math.min(qt.size,pt.size));
        if(norm(q.answer)===norm(previous.answer))cost+=180*weight;
        if(q.family&&q.family===previous.family)cost+=120*weight;
        if(overlap>.6)cost+=70*weight;
        if(q.type===previous.type)cost+=8*weight;
      });return cost;
    }
    while(pending.length){let index=0,best=Infinity;pending.forEach((q,i)=>{const value=penalty(q);if(value<best){best=value;index=i;}});out.push(pending.splice(index,1)[0]);}
    return out;
  }
  function makeLessonTest(lesson){
    const authored=spec(lesson.id).checkTasks;
    if(!authored)return spreadAnswers(shuffled([...phraseTasks(lesson),...customTasks(lesson)]));
    const context=shuffled(authored).map(q=>({...q,o:shuffled(q.o)}));
    // Recognition and productive grammar are complementary. Repeating all six
    // persons of one verb belongs in drills/Hard Mode, not in this mixed check.
    const groups=new Map();
    for(const task of customTasks(lesson).filter(q=>q.type==='gap')){
      const family='grammar:'+task.tag;
      if(!groups.has(family))groups.set(family,[]);
      groups.get(family).push({...task,family,checkKey:`L${lesson.id}-${family}-${norm(task.prompt)}`});
    }
    const grammar=[];
    for(const [family,tasks]of groups){
      const used=new Set(),limit=lesson.id===1?1:2;
      for(let task of shuffled(tasks)){if(lesson.id===14&&task.tag==='Verneinung')task={...task,prompt:'Je ___ courir.',answer:'n’aime pas'};const key=norm(task.answer);if(used.has(key))continue;used.add(key);grammar.push(task);if(used.size>=limit)break;}
    }
    // Always start with a situation, then preserve this planned order in runTasks.
    const start=context.shift();return spreadAnswers(shuffled([...context,...grammar]),[start]);
  }
  function testCount(id){const l=byId(id);if(!l)return 0;return makeLessonTest(l).length;}
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
    const b=best(state,lesson.id),tried=attempted(state,lesson.id),count=state.lessonCheckProgress?.[lesson.id]?.session?.ex?.length||testCount(lesson.id);
    return `<div class="lesson-mastery-intro compact">
      <div class="between"><div><div class="eyebrow">LEKTIONS-CHECK</div><strong>Zum Schluss: alles noch einmal gemischt</strong></div><span class="pill ${tried?'green':'gray'}">${tried?(b+' %'):'offen'}</span></div>
      <p class="muted">${count} Fragen aus den wichtigsten Wendungen und Grammatikmustern dieser Lektion.</p>
    </div>`;
  }

  function accepted(task,input){
    const values=[task.answer,...(task.accept||[])].filter(Boolean);
    return values.some(v=>norm(v)===norm(input));
  }
  function runTasks({title,subtitle,tasks,view,onBack,onFinish,speak,targetLang='fr',lessonId=null,progress=null,saveProgress=()=>{},reviewState=null}){
    const session=progress?.session;
    const resume=session?.version===101&&Array.isArray(session.ex)&&session.i>=0&&session.i<session.ex.length;
    const ex=resume?session.ex:tasks,contentVersion=resume?(session.contentVersion||1):2,review=window.A1ExerciseReview?.create();
    let i=resume?session.i:0,score=resume?session.score:0,draft=resume?session.draft||'':'',response=resume?session.response:null;
    function persist(){if(progress){progress.session={version:101,contentVersion,ex,i,score,draft,response};saveProgress();}}
    function finish(){if(progress){delete progress.session;saveProgress();}onFinish(score,ex.length,ex);review?.attach(view);}
    function feedback(ok,task,restoring=false){
      if(!restoring){if(ok)score++;if(reviewState)window.FR_A1_REVIEW?.record(reviewState,window.FR_A1_REVIEW.task(lessonId||task.lessonId||Number(task.tag?.match(/^L(\d+)/)?.[1]),"check","Lektionscheck",task),ok);response={ok,chosen:response?.chosen};persist();}
      if(!restoring&&task.audio&&speak)speak(task.audio,true,.80);
      const answer=task.answer;
      document.getElementById('masteryFeedback').innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?'✓ Richtig':'✗ Richtig ist: '+esc(answer)}${task.explanation?`<p>${esc(task.explanation)}</p>`:''}</div><div class="spacer"></div><button class="primary-btn" id="masteryNext">${i<ex.length-1?'Weiter':'Ergebnis'}</button>`;
      if(ok&&!restoring)view.querySelector('.option-btn.correct,#masteryInput')?.classList.add('answer-success');
      document.getElementById('masteryNext').onclick=()=>{i++;draft='';response=null;if(i<ex.length){persist();draw();}else finish();};if(!restoring)review?.attach(view,true);
    }
    function draw(){
      const q=ex[i];let body='';
      if(q.type==='choice'){
        body=`<div class="quiz-q">${window.A1ExerciseReview?.question(q.q)||esc(q.q)}</div><div class="options">${(q.o||[]).map((o,j)=>`<button class="option-btn" data-mastery-o="${j}">${esc(o)}</button>`).join('')}</div>`;
      }else{
        body=`${q.context?`<p class="mixed-context"><strong>Bedeutung:</strong> ${esc(q.context)}</p>`:''}<label class="mixed-type" for="masteryInput">✍️ Form einsetzen</label><div class="quiz-q">${esc(q.prompt)}</div><input class="mixed-input" id="masteryInput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Deine Antwort…">${window.A1ExerciseEngine?.charBar?A1ExerciseEngine.charBar(targetLang,'de'):''}<div class="spacer"></div><button class="primary-btn" id="masteryCheck">Prüfen</button>`;
      }
      view.innerHTML=`<div class="between"><button class="tiny-btn" id="masteryBack">← Zurück</button><span class="pill">${i+1}/${ex.length}</span></div><section class="card" data-bug-task data-bug-lesson="${lessonId||''}" data-bug-step="check" data-bug-question="${esc(q.q||q.prompt)}" data-bug-audio="${esc(q.audio||'')}" style="margin-top:12px"><div class="between"><div><div class="eyebrow">ABSCHLUSSTEST</div><h2>${esc(title)}</h2></div></div>${subtitle?`<p class="muted">${esc(subtitle)}</p>`:''}${body}<div id="masteryFeedback"></div></section>`;
      document.getElementById('masteryBack').onclick=onBack;
      if(q.type==='choice'){
        const a=(q.o||[]).findIndex(x=>choiceEqual(x,q.answer));
        document.querySelectorAll('[data-mastery-o]').forEach(b=>b.onclick=()=>{
          const chosen=+b.dataset.masteryO,ok=chosen===a;response={chosen};
          document.querySelectorAll('[data-mastery-o]').forEach((x,j)=>{x.disabled=true;if(j===a)x.classList.add('correct');else if(j===chosen)x.classList.add('wrong');});
          feedback(ok,q);
        });
      }else{
        const input=document.getElementById('masteryInput');input.value=draft;input.oninput=()=>{draft=input.value;persist();};
        window.A1ExerciseEngine?.wireChars?.(input,targetLang,view);
        const check=()=>{if(input.disabled||!input.value.trim())return;input.disabled=true;document.getElementById('masteryCheck').disabled=true;feedback(accepted(q,input.value),q);};
        document.getElementById('masteryCheck').onclick=check;input.onkeydown=e=>{if(e.key==='Enter')check();};
      }
      if(response){
        if(q.type==='choice')document.querySelectorAll('[data-mastery-o]').forEach((b,j)=>{b.disabled=true;b.classList.toggle('correct',choiceEqual(q.o[j],q.answer));b.classList.toggle('wrong',j===response.chosen&&!response.ok);});
        else{document.getElementById('masteryInput').disabled=true;document.getElementById('masteryCheck').disabled=true;}
        feedback(response.ok,q,true);
      }
      review?.attach(view);window.scrollTo({top:0,behavior:'instant'});
    }
    if(!ex.length)return onFinish(0,0,[]);
    persist();draw();
  }

  function renderLessonTest({lesson,view,state,save,onBack,speak,onResult}){
    const tasks=makeLessonTest(lesson),b=best(state,lesson.id);
    state.lessonCheckProgress=state.lessonCheckProgress||{};
    const progress=state.lessonCheckProgress[lesson.id]||=( {} );
    function intro(){
      view.innerHTML=`<div class="between"><button class="tiny-btn" id="masteryBackIntro">← Lektion</button><span class="pill">🏁 LEKTIONS-CHECK</span></div><section class="card" style="margin-top:12px"><h2>${lesson.id}. ${esc(lesson.title)}</h2>${introHtml(lesson,state)}${progress.session&&(progress.session.contentVersion||1)<2?'<p class="muted">Dein laufender Versuch bleibt erhalten. Die überarbeiteten Fragen erscheinen beim nächsten neuen Versuch.</p>':''}<button class="primary-btn lesson-finale-btn ${attempted(state,lesson.id)?'is-completed':''}" id="masteryStart">${progress.session?'Test fortsetzen':b?`Noch einmal · Bestwert ${b} %`:`${tasks.length} Fragen starten`}</button></section>`;
      document.getElementById('masteryBackIntro').onclick=onBack;
      document.getElementById('masteryStart').onclick=()=>runTasks({reviewState:state,progress,saveProgress:()=>save(),lessonId:lesson.id,title:`${lesson.id}. ${lesson.title}`,subtitle:`${progress.session?.ex?.length||tasks.length} gemischte Fragen`,tasks,view,onBack:intro,speak,onFinish:(score,total)=>{
        const pct=total?Math.round(score/total*100):0;
        state.lessonMasteryBest=state.lessonMasteryBest||{};state.lessonMasteryLast=state.lessonMasteryLast||{};
        state.lessonMasteryLast[lesson.id]=pct;state.lessonMasteryBest[lesson.id]=Math.max(Number(state.lessonMasteryBest[lesson.id]||0),pct);save(true);
        view.innerHTML=`<section class="card center"><span class="pill">LEKTIONS-CHECK</span><div class="score">${pct}%</div><h2>${score}/${total} richtig</h2><p class="muted">Das ist dein aktueller Stand. Du kannst den Check jederzeit wiederholen und vorher einzelne Teile noch einmal üben.</p><div class="button-row"><button class="secondary-btn" id="masteryAgain">Noch einmal</button><button class="primary-btn" id="masteryReturn">Zur Lektion</button></div></section>`;
        document.getElementById('masteryAgain').onclick=intro;document.getElementById('masteryReturn').onclick=onBack;onResult?.();
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
      [...phrasePick,...customPick,...fallback].forEach(t=>out.push({...t,lessonId:lesson.id,tag:`L${lesson.id} · ${t.tag||'A1'}`}));
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
      runTasks({reviewState:state,progress:(state.courseCheckProgress||={})[n]||=( {} ),saveProgress:()=>save(),title:`A1 Abschlusscheck · Teil ${n}`,subtitle:`Lektionen ${(n-1)*6+1}–${n*6} · 30 Aufgaben`,tasks,view,onBack:()=>renderCourseMenu({view,state,save,onBack,speak}),speak,onFinish:(score,total)=>{
        const pct=total?Math.round(score/total*100):0;state.courseMasteryBest[n]=Math.max(courseBest(state,n),pct);save(true);view.innerHTML=`<section class="card center"><span class="pill">TEIL ${n}</span><div class="score">${pct}%</div><h2>${score}/${total} richtig</h2><p class="muted">Das ist dein aktueller Stand in diesem Block.</p><div class="button-row"><button class="secondary-btn" id="courseAgain">Noch einmal</button><button class="primary-btn" id="courseMenu">Alle Teile</button></div></section>`;
        document.getElementById('courseAgain').onclick=()=>btn.click();document.getElementById('courseMenu').onclick=()=>renderCourseMenu({view,state,save,onBack,speak});
      }});
    });
  }
  window.FR_A1_MASTERY={accepted,spreadAnswers,practiceTasks:lesson=>[...phraseTasks(lesson),...customTasks(lesson),...(spec(lesson.id).checkTasks||[])],PASS,spec,testCount,best,passed,passedCount,completePassedLessons,introHtml,makeLessonTest,renderLessonTest,renderCourseMenu};
})();


