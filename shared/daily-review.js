/* Opt-in home component for the French and German A1 courses. */
(() => {
  'use strict';
  const dayKey=(date=new Date())=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  const text={
    de:{title:'Tägliche Wiederholung',hint:'Eine Runde am Tag hält dein Wissen frisch.',doneHint:'Tagesziel geschafft. Du kannst jederzeit weiterüben.',due:'Heute noch offen',done:'Heute wiederholt',start:'Wissen auffrischen',again:'Weiter wiederholen',mistakes:'Fehler gezielt üben',empty:'Nach deiner ersten Lektion kannst du hier wiederholen.',locked:'Noch kein Lernstoff',errors:'offene Fehler'},
    fr:{title:'Révision quotidienne',hint:'Une série par jour pour garder tes acquis.',doneHint:'Objectif atteint. Tu peux continuer quand tu veux.',due:'À faire aujourd’hui',done:'Révision du jour faite',start:'Réviser mes acquis',again:'Continuer à réviser',mistakes:'Retravailler mes erreurs',empty:'Tu pourras réviser après ta première leçon.',locked:'Après la première leçon',errors:'erreurs à revoir'},
    en:{title:'Daily review',hint:'One round a day keeps your knowledge fresh.',doneHint:'Daily goal complete. You can keep practising anytime.',due:'Still to do today',done:'Reviewed today',start:'Refresh your knowledge',again:'Keep reviewing',mistakes:'Practise mistakes',empty:'You can review here after your first lesson.',locked:'After your first lesson',errors:'mistakes to review'}
  };
  const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${name==='check'?'<path d="m5 12 4 4L19 6"/>':name==='target'?'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="m12 12 7-7M17 5h2v2"/>':name==='arrow'?'<path d="M5 12h14m-6-6 6 6-6 6"/>':'<path d="M20 7v5h-5M19.5 12a7.5 7.5 0 1 0-2 5M20 7l-.5 5"/>'}</svg>`;
  function status(state,date=new Date()){
    const p=state.reviewPractice||{},day=dayKey(date),daily=p.daily;
    const legacy=p.lastResult;
    const done=daily?.day===day||(Number.isFinite(legacy?.finishedAt)&&legacy.total>0&&dayKey(new Date(legacy.finishedAt))===day);
    return {day,done:!!done};
  }
  function complete(state,session,finishedAt=Date.now()){
    if(session?.dailyRecordedAt||!session?.tasks?.length||!Number.isInteger(session.index)||session.index<session.tasks.length||!Array.isArray(session.answers)||!session.tasks.every((_,i)=>typeof session.answers[i]?.ok==='boolean')||!Number.isFinite(finishedAt))return false;
    const p=state.reviewPractice||={},day=dayKey(new Date(finishedAt));
    p.daily={day,rounds:p.daily?.day===day?(p.daily.rounds||0)+1:1,lastCompletedAt:finishedAt};
    session.dailyRecordedAt=finishedAt;return true;
  }
  function html(state,{lang='de',available=false,mistakes=0}={}){
    const T=text[lang]||text.de,done=status(state).done,phase=!available?'locked':done?'complete':'due',count=Math.max(0,Number(mistakes)||0);
    return `<section class="card daily-review-card is-${phase}" data-daily-review data-i18n-ignore aria-labelledby="dailyReviewTitle"><header class="daily-review-heading"><span class="daily-review-symbol">${icon(done?'check':'repeat')}</span><div><h2 id="dailyReviewTitle">${T.title}</h2><p class="daily-review-status">${!available?T.locked:done?T.done:T.due}</p></div></header><p class="daily-review-hint">${available?(done?T.doneHint:T.hint):T.empty}</p><button type="button" class="daily-review-primary" id="homeReview" ${available?'':'disabled'}><span>${done?T.again:T.start}</span><span class="daily-review-arrow">${icon('arrow')}</span></button><button type="button" class="daily-review-errors" id="homeMistakes" ${available?'':'disabled'}>${icon('target')}<span>${T.mistakes}</span>${count?`<span class="daily-review-count" aria-label="${count} ${T.errors}">${count}</span>`:''}</button></section>`;
  }
  function resultHtml(state,{lang='de'}={}){return status(state).done?`<p class="daily-review-result">${icon('check')}${(text[lang]||text.de).done}</p>`:'';}
  function mount(root,{onDayChange,now=()=>new Date()}={}){
    if(!root)return ()=>{};
    let last=dayKey(now()),timer,stopped=false;
    function cleanup(){stopped=true;clearTimeout(timer);window.removeEventListener('focus',check);document.removeEventListener('visibilitychange',check);window.removeEventListener('a1suite:languagechange',language);}
    function arm(){clearTimeout(timer);if(stopped)return;const date=now(),midnight=new Date(date);midnight.setHours(24,0,0,50);timer=setTimeout(check,Math.max(100,midnight-date));}
    function check(){if(stopped)return;if(!root.isConnected){cleanup();return;}const current=dayKey(now());if(current!==last){last=current;onDayChange?.();}arm();}
    function language(){if(root.isConnected)onDayChange?.();else cleanup();}
    window.addEventListener('focus',check);document.addEventListener('visibilitychange',check);window.addEventListener('a1suite:languagechange',language);arm();return cleanup;
  }
  window.A1DailyReview={dayKey,status,complete,html,resultHtml,mount};
})();
