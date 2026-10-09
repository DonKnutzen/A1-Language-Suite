/* Lesson checks reuse the German course's existing questions and phrase pairs. */
(() => {
  'use strict';
  let lessons=[],sets=[],progress;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const shuffle=a=>A1Learning.shuffle(a);
  // Each drill belongs to the explanation above it. Theory-only pages remain read steps.
  const TOPICS={
    'sein – conjugaison':['g1',[4,6]],
    'haben – conjugaison':['g1',[5]],
    'Verbes réguliers au présent':['g1',[0,1,8,9]],
    'heißen et sprechen – conjugaison':['g1',[2,3]],
    'Articles au nominatif':['g2',[0,1,2,4,9]],
    'Pluriel: formes importantes':['g2',[6,7]],
    'Possessif au pluriel':['g2',[8]],
    'Articles à l’accusatif':['g3',[0,1,2,3,4,6,7,9]],
    'Commander poliment':['g3',[5,8]],
    'Mots interrogatifs utiles':['g4',[0,1,2,3,6,7,8,9]],
    'Ordre des mots':['g4',[4,5]],
    'Prépositions de temps':['g5',[0,1,2,3,6,7,8]],
    'Lire l’heure':['g5',[4,5]],
    'Autres expressions':['g5',[9]],
    'Modalverben – formes utiles':['g6',[0,1,2,5,6,7]],
    'Structure avec un modal':['g6',[0,1,2,5,6,7]],
    'Verbes séparables':['g6',[3,4,8,9]],
    'kein – nominatif et accusatif':['g7',[0,1,7,9]],
    'nicht – exemples':['g7',[4,8]],
    'Possessifs utiles':['g7',[2,3,5,6]]
  };
  function configure(data){lessons=data.lessons;sets=data.grammarSets;progress=data.practiceProgress;}
  function topicPractice(page){
    const root=document.createElement('div');root.innerHTML=page.html;
    const title=root.querySelector('details')?.dataset.grammarOriginalTitle||page.title;
    const ref=TOPICS[title];if(!ref)return null;
    const set=sets.find(s=>s.id===ref[0]);
    const tasks=ref[1].map(i=>set?.questions[i]).filter(Boolean);
    return tasks.length?{key:title,title:page.title,setId:set.id,tasks}:null;
  }
  function practiceState(state,id,key){return state.lessonGrammarPractice?.[id]?.[key]||{};}
  function decorate({root,practice,lesson,state,save,speak,onUpdate}){
    if(!practice)return;
    const panel=document.createElement('div');panel.className='lesson-grammar-practice';root.querySelector('#lessonGrammarPage').append(panel);
    function intro(){
      const done=practiceState(state,lesson.id,practice.key).done===true;
      panel.innerHTML=`<div class="between"><strong>À toi de pratiquer</strong><span class="pill ${done?'green':'gray'}">${done?'✓ Terminé':practice.tasks.length+' exercices'}</span></div><button class="soft-btn exercise-start-btn" id="topicPracticeStart">${done?'Refaire les exercices':'Pratiquer ces formes'}</button><div class="grammar-drill-stage"></div>`;
      panel.querySelector('#topicPracticeStart').onclick=run;
    }
    function run(){
      const tasks=shuffle(practice.tasks),stage=panel.querySelector('.grammar-drill-stage');let i=0,score=0;
      panel.querySelector('#topicPracticeStart').hidden=true;
      function draw(){
        if(i===tasks.length){
          state.lessonGrammarPractice=state.lessonGrammarPractice||{};
          const bucket=state.lessonGrammarPractice[lesson.id]=state.lessonGrammarPractice[lesson.id]||{};
          bucket[practice.key]={done:true,last:score,best:Math.max(practiceState(state,lesson.id,practice.key).best||0,score),total:tasks.length};
          save(true);onUpdate();intro();
          panel.insertAdjacentHTML('beforeend',`<p class="feedback good" role="status">✓ ${score} / ${tasks.length} réponses correctes</p>`);return;
        }
        const q=tasks[i];
        stage.innerHTML=`<small>${i+1} / ${tasks.length}</small><div class="quiz-q">${esc(q.q)}</div><div class="options">${q.o.map((o,j)=>`<button class="option-btn" data-drill-answer="${j}">${esc(o)}</button>`).join('')}</div><div class="grammar-drill-feedback" role="status"></div>`;
        stage.querySelectorAll('[data-drill-answer]').forEach(btn=>btn.onclick=()=>{
          const chosen=Number(btn.dataset.drillAnswer),ok=chosen===q.a;if(ok)score++;
          stage.querySelectorAll('[data-drill-answer]').forEach((b,j)=>{b.disabled=true;if(j===q.a)b.classList.add('correct');else if(j===chosen)b.classList.add('wrong');});
          speak(q.audio,true,.8);
          progress?.recordGrammar(sets.find(s=>s.id===practice.setId),q);
          stage.querySelector('.grammar-drill-feedback').innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?'✓ Correct':'Bonne réponse : '+esc(q.o[q.a])}</div><button class="primary-btn" id="nextDrillAnswer">${i<tasks.length-1?'Suivant':'Terminer'}</button>`;
          stage.querySelector('#nextDrillAnswer').onclick=()=>{i++;draw();};
        });
      }
      draw();
    }
    intro();
  }
  function phraseTasks(lesson){
    const pairs=lesson.phrases;
    return pairs.map(([target,native],i)=>({q:`Que signifie « ${target} » ?`,o:shuffle([native,...pairs.filter((p,j)=>j!==i&&p[1]!==native).slice(0,2).map(p=>p[1])]),answer:native,audio:target}));
  }
  function quizTasks(lesson){return lesson.quiz.map(q=>({...q,answer:q.o[q.a]}));}
  function distinct(tasks){const seen=new Set();return tasks.filter(q=>{const key=q.audio+'\0'+q.answer;if(seen.has(key))return false;seen.add(key);return true;});}
  function makeLessonTest(lesson){return distinct([...quizTasks(lesson),...phraseTasks(lesson)]);}
  function testCount(id){const lesson=lessons.find(l=>l.id===id);return lesson?makeLessonTest(lesson).length:0;}
  function attempted(state,id){return Object.prototype.hasOwnProperty.call(state.lessonMasteryLast||{},id);}
  function best(state,id){return Number(state.lessonMasteryBest?.[id]||0);}
  function passedCount(state){return lessons.filter(l=>attempted(state,l.id)).length;}
  function introHtml(lesson,state){return `<div class="lesson-mastery-intro compact"><div class="between"><div><div class="eyebrow">BILAN DE LA LEÇON</div><strong>Pour finir : tout revoir ensemble</strong></div><span class="pill ${attempted(state,lesson.id)?'green':'gray'}">${attempted(state,lesson.id)?best(state,lesson.id)+' %':'À faire'}</span></div><p class="muted">${testCount(lesson.id)} questions sur les phrases et les structures de cette leçon.</p></div>`;}
  function runTasks({tasks,view,title,onBack,onFinish,speak}){
    const questions=shuffle(tasks);let i=0,score=0;
    function draw(){
      if(i===questions.length)return onFinish(score,questions.length);
      const q=questions[i];
      view.innerHTML=`<div class="between"><button class="tiny-btn" id="checkBack">← Retour</button><span class="pill">${i+1} / ${questions.length}</span></div><section class="card" style="margin-top:12px"><h2>${esc(title)}</h2><div class="quiz-q">${esc(q.q)}</div><div class="options">${q.o.map((o,j)=>`<button class="option-btn" data-check-answer="${j}">${esc(o)}</button>`).join('')}</div><div id="checkFeedback" role="status"></div></section>`;
      view.querySelector('#checkBack').onclick=onBack;
      view.querySelectorAll('[data-check-answer]').forEach(btn=>btn.onclick=()=>{
        const chosen=Number(btn.dataset.checkAnswer),ok=q.o[chosen]===q.answer;if(ok)score++;
        view.querySelectorAll('[data-check-answer]').forEach((b,j)=>{b.disabled=true;if(q.o[j]===q.answer)b.classList.add('correct');else if(j===chosen)b.classList.add('wrong');});
        if(q.audio)speak(q.audio,true,.8);
        view.querySelector('#checkFeedback').innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?'✓ Correct':'Bonne réponse : '+esc(q.answer)}</div><div class="spacer"></div><button class="primary-btn" id="checkNext">${i<questions.length-1?'Suivant':'Résultat'}</button>`;
        view.querySelector('#checkNext').onclick=()=>{i++;draw();};
      });
      window.scrollTo({top:0,behavior:'instant'});
    }
    draw();
  }
  function result({view,score,total,onAgain,onBack}){
    const pct=total?Math.round(score/total*100):0;
    view.innerHTML=`<section class="card center"><span class="pill">BILAN</span><div class="score">${pct}%</div><h2>${score} / ${total} réponses correctes</h2><p class="muted">Tu peux refaire ce bilan et revenir aux parties à revoir.</p><div class="button-row"><button class="secondary-btn" id="checkAgain">Réessayer</button><button class="primary-btn" id="checkReturn">Retour</button></div></section>`;
    view.querySelector('#checkAgain').onclick=onAgain;view.querySelector('#checkReturn').onclick=onBack;
  }
  function renderLessonTest({lesson,view,state,save,onBack,speak}){
    function intro(){
      view.innerHTML=`<div class="between"><button class="tiny-btn" id="masteryBackIntro">← Leçon</button><span class="pill">BILAN DE LA LEÇON</span></div><section class="card" style="margin-top:12px"><h2>${lesson.id}. ${esc(lesson.title)}</h2>${introHtml(lesson,state)}<button class="primary-btn lesson-finale-btn" id="masteryStart">Commencer les ${testCount(lesson.id)} questions</button></section>`;
      view.querySelector('#masteryBackIntro').onclick=onBack;
      view.querySelector('#masteryStart').onclick=()=>runTasks({tasks:makeLessonTest(lesson),view,title:lesson.title,onBack:intro,speak,onFinish:(score,total)=>{
        const pct=total?Math.round(score/total*100):0;
        state.lessonMasteryLast=state.lessonMasteryLast||{};state.lessonMasteryBest=state.lessonMasteryBest||{};
        state.lessonMasteryLast[lesson.id]=pct;state.lessonMasteryBest[lesson.id]=Math.max(best(state,lesson.id),pct);save(true);
        result({view,score,total,onAgain:intro,onBack});
      }});
    }
    intro();
  }
  // No invented questions or fixed French conjugation counts: use the relevant German set.
  function grammarCheckTasks(){return (sets.find(s=>s.id==='g1')?.questions||[]).filter((_,i)=>i!==5).map(q=>({...q,answer:q.o[q.a]}));}
  function grammarCheckTried(state){return Object.prototype.hasOwnProperty.call(state.lessonGrammarCheckLast||{},1);}
  function grammarCheckBest(state){return Number(state.lessonGrammarCheckBest?.[1]||0);}
  function renderGrammarCheck({view,state,save,speak,onBack}){
    function start(){runTasks({tasks:grammarCheckTasks(),view,title:'Test de grammaire',onBack,speak,onFinish:(score,total)=>{
      const pct=total?Math.round(score/total*100):0;
      state.lessonGrammarCheckLast=state.lessonGrammarCheckLast||{};state.lessonGrammarCheckBest=state.lessonGrammarCheckBest||{};
      state.lessonGrammarCheckLast[1]=pct;state.lessonGrammarCheckBest[1]=Math.max(grammarCheckBest(state),pct);save(true);
      result({view,score,total,onAgain:start,onBack});
    }});}
    start();
  }
  function courseModuleTasks(n){
    return lessons.slice((n-1)*6,n*6).flatMap(lesson=>{
      const phrases=shuffle(phraseTasks(lesson)).slice(0,2),remaining=distinct([...shuffle(quizTasks(lesson)),...shuffle(phraseTasks(lesson))]).filter(q=>!phrases.some(p=>p.audio===q.audio&&p.answer===q.answer));
      return [...phrases,...remaining.slice(0,3)];
    });
  }
  function renderCourseMenu({view,state,save,onBack,speak}){
    function menu(){
      view.innerHTML=`<div class="between"><button class="tiny-btn" id="courseMasteryBack">← Examen</button><span class="pill">BILAN A1</span></div><section class="card"><h2>Bilan du cours</h2><p class="muted">Quatre blocs de 30 questions. Chaque bloc reprend six leçons, avec cinq questions par leçon.</p></section><div class="list">${[1,2,3,4].map(n=>`<button class="practice-card" data-course-mastery="${n}"><strong>Bloc ${n} · Leçons ${(n-1)*6+1}–${n*6}</strong><small>${Object.prototype.hasOwnProperty.call(state.courseMasteryBest||{},n)?state.courseMasteryBest[n]+' %':'À faire'} · 30 questions</small></button>`).join('')}</div>`;
      view.querySelector('#courseMasteryBack').onclick=onBack;
      view.querySelectorAll('[data-course-mastery]').forEach(btn=>btn.onclick=()=>{
        const n=Number(btn.dataset.courseMastery);
        function start(){runTasks({tasks:courseModuleTasks(n),view,title:'Bilan A1 · Bloc '+n,onBack:menu,speak,onFinish:(score,total)=>{
          const pct=total?Math.round(score/total*100):0;state.courseMasteryBest=state.courseMasteryBest||{};state.courseMasteryBest[n]=Math.max(Number(state.courseMasteryBest[n]||0),pct);save(true);result({view,score,total,onAgain:start,onBack:menu});
        }});}
        start();
      });
    }
    menu();
  }
  window.DE_A1_ASSESSMENTS={configure,topicPractice,decorate,practiceState,makeLessonTest,testCount,best,attempted,passedCount,introHtml,renderLessonTest,grammarCheckTasks,grammarCheckTried,grammarCheckBest,renderGrammarCheck,courseModuleTasks,renderCourseMenu};
})();
