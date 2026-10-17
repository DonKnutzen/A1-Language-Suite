/* German lesson tests share the resumable exercise runner with the French course. */
(() => {
  'use strict';
  let lessons=[],sets=[],progress;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const shuffle=a=>A1Learning.shuffle(a);
  function configure(data){lessons=data.lessons;sets=data.grammarSets;progress=data.practiceProgress;}
  function topicPractice(page){
    const root=document.createElement('div');root.innerHTML=page.html;
    const title=root.querySelector('details')?.dataset.grammarOriginalTitle||page.title;
    const drill=window.DE_A1_GRAMMAR_DRILLS?.topics[title];
    return drill?{key:title,title:page.title,setId:drill.setId,tasks:drill.tasks}:null;
  }
  function practiceState(state,id,key){return state.lessonGrammarPractice?.[id]?.[key]||{};}
  function bucket(state,id,key){state.lessonGrammarPractice||={};state.lessonGrammarPractice[id]||={};return state.lessonGrammarPractice[id][key]||={};}
  function normalize(q){
    if(q.type==='gap')return {...q,answer:q.answer,context:q.context||'',audio:q.audio};
    const answer=q.answer||q.o[q.a],o=shuffle(q.o);
    return {...q,type:q.type||'choice',o,a:o.indexOf(answer),answer};
  }
  function runTasks({tasks,view,title,onBack,onFinish,speak,session,save,lessonId,step='check',compact=false}){
    window.A1BugReports?.setContext({lessonId:lessonId||null,step});
    A1ExerciseEngine.run({lesson:{id:lessonId||0,title},view,targetLang:'de',uiLang:'fr',review:true,compact,bugStep:step,exercises:shuffle(tasks).map(normalize),progress:session,exerciseVersion:102,saveProgress:()=>save(),playAudio:t=>speak(t,true,.8),playFeedbackAudio:t=>speak(t,true,.8),onBack,onFinish});
  }
  function decorate({root,practice,lesson,state,save,speak,onUpdate,onStart}){
    if(!practice)return;
    const panel=document.createElement('div');panel.className='lesson-grammar-practice deepening-practice';root.querySelector('#lessonGrammarPage').append(panel);
    const current=bucket(state,lesson.id,practice.key);
    function intro(){
      panel.innerHTML=`<div class="between"><strong>À toi de pratiquer</strong><small>${current.done?'✓ Terminé':practice.tasks.length+' exercices'}</small></div><button class="soft-btn exercise-start-btn" id="topicPracticeStart">${current.session?'Continuer les exercices':current.done?'Refaire les exercices':'Commencer le mini-test'}</button><div class="grammar-drill-stage"></div>`;
      panel.querySelector('#topicPracticeStart').onclick=()=>{
        onStart?.();
        panel.querySelector('#topicPracticeStart').hidden=true;
        runTasks({tasks:practice.tasks,view:panel.querySelector('.grammar-drill-stage'),title:practice.title,onBack:intro,speak,session:current,save,lessonId:lesson.id,step:'grammar',compact:true,onFinish:(score,total)=>{
          current.done=true;current.last=score;current.best=Math.max(current.best||0,score);current.total=total;
          if(practice.setId){const set=sets.find(s=>s.id===practice.setId);if(set)practice.tasks.forEach(q=>progress?.recordGrammar(set,q));}
          save(true);onUpdate();intro();panel.insertAdjacentHTML('beforeend',`<p class="feedback good" role="status">✓ ${score} / ${total} réponses correctes</p>`);
        }});
      };
    }
    intro();
  }
  function makeLessonTest(lesson){
    // Exact vocabulary and patterns have already been explained and rehearsed in this lesson.
    const units=window.DE_A1_STUDY.content[lesson.id],tasks=units.flatMap((unit,index)=>{
      const tasks=window.DE_A1_STUDY.unitTasks(unit);
      const count=Math.floor(12/units.length)+Number(index<12%units.length);
      return [tasks[1],tasks[2],tasks[5],tasks[6],tasks[8],tasks[9]].slice(0,count);
    });tasks[3]={...window.DE_A1_APPLICATIONS[lesson.id].reading};return tasks;
  }
  function testCount(id){const lesson=lessons.find(l=>l.id===id);return lesson?makeLessonTest(lesson).length:0;}
  function attempted(state,id){return Object.prototype.hasOwnProperty.call(state.lessonMasteryLast||{},id);}
  function best(state,id){return Number(state.lessonMasteryBest?.[id]||0);}
  function passedCount(state){return lessons.filter(l=>attempted(state,l.id)).length;}
  function completePassedLessons(state,courseLessons=lessons){
    if(!Array.isArray(state.doneLessons))state.doneLessons=[];
    let changed=false;
    for(const lesson of courseLessons)if(best(state,lesson.id)>=80&&!state.doneLessons.includes(lesson.id)){state.doneLessons.push(lesson.id);changed=true;}
    return changed;
  }
  function introHtml(lesson,state){return `<div class="lesson-mastery-intro compact"><div class="between"><div><div class="eyebrow">BILAN DE LA LEÇON</div><strong>Pour finir : tout revoir ensemble</strong></div><span class="pill ${attempted(state,lesson.id)?'green':'gray'}">${attempted(state,lesson.id)?best(state,lesson.id)+' %':'À faire'}</span></div><p class="muted">${testCount(lesson.id)} questions sur les expressions et les structures étudiées.</p></div>`;}
  function result({view,score,total,onAgain,onBack}){
    const pct=total?Math.round(score/total*100):0;
    view.innerHTML=`<section class="card center"><span class="pill">BILAN</span><div class="score">${pct}%</div><h2>${score} / ${total} réponses correctes</h2><p class="muted">Tu peux revenir aux explications avant de refaire ce bilan.</p><div class="button-row"><button class="secondary-btn" id="checkAgain">Réessayer</button><button class="primary-btn" id="checkReturn">Retour</button></div></section>`;
    view.querySelector('#checkAgain').onclick=onAgain;view.querySelector('#checkReturn').onclick=onBack;
  }
  function renderLessonTest({lesson,view,state,save,onBack,speak,onResult}){
    state.lessonCheckProgress||={};const session=state.lessonCheckProgress[lesson.id]||={};
    function intro(){
      view.innerHTML=`<div class="between"><button class="tiny-btn" id="masteryBackIntro">← Leçon</button><span class="pill">BILAN DE LA LEÇON</span></div><section class="card" style="margin-top:12px"><h2>${lesson.id}. ${esc(lesson.title)}</h2>${introHtml(lesson,state)}<button class="primary-btn lesson-finale-btn" id="masteryStart">${session.session?'Continuer le bilan':'Commencer les '+testCount(lesson.id)+' questions'}</button></section>`;
      view.querySelector('#masteryBackIntro').onclick=onBack;
      view.querySelector('#masteryStart').onclick=()=>runTasks({tasks:makeLessonTest(lesson),view,title:lesson.title,onBack:intro,speak,session,save,lessonId:lesson.id,onFinish:(score,total)=>{
        const pct=total?Math.round(score/total*100):0;
        state.lessonMasteryLast||={};state.lessonMasteryBest||={};state.lessonMasteryLast[lesson.id]=pct;state.lessonMasteryBest[lesson.id]=Math.max(best(state,lesson.id),pct);save(true);
        result({view,score,total,onAgain:intro,onBack});onResult?.();
      }});
    }
    intro();
  }
  function grammarCheckTasks(){return [['sein – conjugaison',3],['Verbes réguliers au présent',4],['heißen et sprechen – conjugaison',3]].flatMap(([title,count])=>shuffle(DE_A1_GRAMMAR_DRILLS.topics[title].tasks).slice(0,count));}
  function grammarCheckTried(state){return Object.prototype.hasOwnProperty.call(state.lessonGrammarCheckLast||{},1);}
  function grammarCheckBest(state){return Number(state.lessonGrammarCheckBest?.[1]||0);}
  function renderGrammarCheck({view,state,save,speak,onBack}){
    state.grammarCheckProgress||={};const session=state.grammarCheckProgress[1]||={};
    function start(){runTasks({tasks:grammarCheckTasks(),view,title:'Test final',onBack,speak,session,save,lessonId:1,step:'grammar-check',onFinish:(score,total)=>{
      const pct=total?Math.round(score/total*100):0;state.lessonGrammarCheckLast||={};state.lessonGrammarCheckBest||={};state.lessonGrammarCheckLast[1]=pct;state.lessonGrammarCheckBest[1]=Math.max(grammarCheckBest(state),pct);save(true);
      result({view,score,total,onAgain:start,onBack});
    }});}
    start();
  }
  function courseModuleTasks(n){return lessons.slice((n-1)*6,n*6).flatMap(lesson=>shuffle(makeLessonTest(lesson)).slice(0,5));}
  function renderCourseMenu({view,state,save,onBack,speak}){
    function menu(){
      view.innerHTML=`<div class="between"><button class="tiny-btn" id="courseMasteryBack">← Examen</button><span class="pill">BILAN A1</span></div><section class="card"><h2>Bilan du cours</h2><p class="muted">Quatre blocs de 30 questions. Chaque bloc reprend six leçons.</p></section><div class="list">${[1,2,3,4].map(n=>`<button class="practice-card" data-course-mastery="${n}"><strong>Bloc ${n} · Leçons ${(n-1)*6+1}–${n*6}</strong><small>${state.courseCheckProgress?.[n]?.session?'En cours':state.courseMasteryBest?.[n]!==undefined?state.courseMasteryBest[n]+' %':'À faire'} · 30 questions</small></button>`).join('')}</div>`;
      view.querySelector('#courseMasteryBack').onclick=onBack;
      view.querySelectorAll('[data-course-mastery]').forEach(btn=>btn.onclick=()=>{
        const n=Number(btn.dataset.courseMastery);state.courseCheckProgress||={};const session=state.courseCheckProgress[n]||={};
        function start(){runTasks({tasks:courseModuleTasks(n),view,title:'Bilan A1 · Bloc '+n,onBack:menu,speak,session,save,onFinish:(score,total)=>{
          const pct=total?Math.round(score/total*100):0;state.courseMasteryBest||={};state.courseMasteryBest[n]=Math.max(Number(state.courseMasteryBest[n]||0),pct);save(true);result({view,score,total,onAgain:start,onBack:menu});
        }});}
        start();
      });
    }
    menu();
  }
  window.DE_A1_ASSESSMENTS={configure,topicPractice,decorate,practiceState,makeLessonTest,testCount,best,attempted,passedCount,completePassedLessons,introHtml,renderLessonTest,grammarCheckTasks,grammarCheckTried,grammarCheckBest,renderGrammarCheck,courseModuleTasks,renderCourseMenu};
})();
