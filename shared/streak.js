/* One learning series per profile, shared by all courses. */
(() => {
  'use strict';
  const BASE_KEY='a1suite.dailyStreak.v1';
  const memory=new Map();
  let syncing=null,queued=false,midnightTimer=null;
  const copy=days=>({version:1,days:[...days]});
  function key(){return A1Profile.namespacedKey(BASE_KEY);}
  function localDay(date=new Date()){
    return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
  }
  function ordinal(day){
    if(typeof day!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(day))return NaN;
    const [y,m,d]=day.split('-').map(Number),stamp=Date.UTC(y,m-1,d),date=new Date(stamp);
    if(date.getUTCFullYear()!==y||date.getUTCMonth()!==m-1||date.getUTCDate()!==d)return NaN;
    return stamp/86400000;
  }
  function activeDays(days,today=localDay()){
    const now=ordinal(today);
    const sorted=[...new Set(Array.isArray(days)?days:[])].filter(d=>Number.isFinite(ordinal(d))&&ordinal(d)<=now).sort();
    if(!sorted.length||now-ordinal(sorted[sorted.length-1])>2)return [];
    let start=sorted.length-1;
    while(start>0&&ordinal(sorted[start])-ordinal(sorted[start-1])<=2)start--;
    return sorted.slice(start);
  }
  function write(storageKey,days){
    const state=copy(days);memory.set(storageKey,state);
    try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{}
    return state;
  }
  function read(storageKey=key()){
    let saved;
    try{saved=JSON.parse(localStorage.getItem(storageKey)||'null');}catch{}
    if(!saved)saved=memory.get(storageKey);
    const days=activeDays(saved?.version===1?saved.days:[]);
    const state=copy(days);
    memory.set(storageKey,state);
    // Expired dates are removed; old progress is never used to recreate a series.
    if(saved&&JSON.stringify(saved)!==JSON.stringify(state))write(storageKey,days);
    return state;
  }
  function snapshot(){
    const days=read().days,lastDay=days[days.length-1]||null;
    return {count:days.length,lastDay,practicedToday:lastDay===localDay()};
  }
  const labels={
    de:{title:'Lernserie',day:'Tag',days:'Tage',empty:'Schließe eine Übung ab, um deine Lernserie zu starten.',rule:'Ein Pausentag ist erlaubt und zählt nicht mit. Nach zwei Tagen Pause beginnt die nächste abgeschlossene Übung wieder bei 1.'},
    en:{title:'Learning streak',day:'day',days:'days',empty:'Complete an exercise to start your learning streak.',rule:'One rest day is allowed and does not count. After two rest days, the next completed exercise starts the streak again at 1.'},
    fr:{title:'Série d’apprentissage',day:'jour',days:'jours',empty:'Termine un exercice pour commencer ta série d’apprentissage.',rule:'Un jour de pause est permis et ne compte pas. Après deux jours de pause, le prochain exercice terminé recommence la série à 1.'},
    tr:{title:'Öğrenme serisi',day:'gün',days:'gün',rule:'Bir gün ara verebilirsin; ara günü sayılmaz. İki gün ara verdikten sonra tamamlanan ilk alıştırma seriyi yeniden 1’den başlatır.'}
  };
  const displayLang=lang=>lang==='de'&&window.A1Profile?.getUiLang?.()==='en'?'en':lang;
  function description(lang,state){
    const w=labels[lang]||labels.de;
    return `${w.title}: ${state.count} ${state.count===1?w.day:w.days}`;
  }
  function body(state){
    return `<svg class="a1-streak-flame" viewBox="0 0 24 28" aria-hidden="true" focusable="false"><path class="a1-streak-outer" fill="#ff8526" d="M12 2c0 4-5 6-3 11-2 0-3-2-3-5-3 3-4 6-4 9 0 5 4 9 10 9s10-4 10-9c0-4-1-7-4-10 0 3-1 5-3 5 1-4-1-8-3-10Z"/><path class="a1-streak-inner" fill="#ffe28a" d="M12 14c-1 3-4 4-4 7a4 4 0 0 0 8 0c0-3-2-5-4-7Z"/></svg><span data-streak-count aria-hidden="true">${state.count}</span>`;
  }
  function title(lang,state){
    const w=labels[lang]||labels.de;
    return description(lang,state)+'. '+(!state.count&&w.empty?w.empty+' ':'')+w.rule;
  }
  function render(lang='de',{showEmpty=false}={}){
    const state=snapshot(),display=displayLang(lang);
    return `<span class="a1-streak-badge${state.count?'':' is-inactive'}" data-a1-streak data-streak-lang="${Object.hasOwn(labels,lang)?lang:'de'}" ${showEmpty?'data-streak-show-empty':''} role="img" aria-label="${description(display,state)}" title="${title(display,state)}" ${state.count||showEmpty?'':'hidden'}>${body(state)}</span>`;
  }
  function refresh(){
    const state=snapshot();
    document.querySelectorAll('[data-a1-streak]').forEach(el=>{
      const lang=displayLang(el.dataset.streakLang);
      el.innerHTML=body(state);el.hidden=state.count===0&&!el.hasAttribute('data-streak-show-empty');
      el.classList.toggle('is-inactive',state.count===0);
      el.setAttribute('aria-label',description(lang,state));el.title=title(lang,state);
    });
  }
  function identity(){
    const p=A1Profile.getCurrent();
    return p&&{profileKey:p.profileKey,userId:p.userId,mode:p.mode};
  }
  function sameProfile(p){
    const current=identity();
    return current?.profileKey===p?.profileKey&&current?.userId===p?.userId&&current?.mode===p?.mode;
  }
  function sync(){
    const p=identity();
    if(!p||p.mode!=='cloud'||!A1Profile.cloudConfigured)return Promise.resolve();
    if(syncing){queued=true;return syncing;}
    const storageKey=key();
    syncing=(async()=>{
      const remote=await A1Profile.getDailyActivity(p);
      if(!sameProfile(p)||key()!==storageKey)return;
      // Read again after the request: a completed exercise may have happened meanwhile.
      const local=read(storageKey),remoteDays=remote?.version===1?remote.days:[];
      const days=activeDays([...local.days,...(Array.isArray(remoteDays)?remoteDays:[])]);
      write(storageKey,days);refresh();
      if(JSON.stringify(remote)!==JSON.stringify(copy(days)))await A1Profile.saveDailyActivity(copy(days),p);
    })().catch(()=>{}).finally(()=>{
      syncing=null;
      if(queued){queued=false;sync();}
    });
    return syncing;
  }
  function completeExercise(){
    const storageKey=key(),today=localDay(),days=read(storageKey).days;
    if(!days.includes(today)){
      write(storageKey,activeDays([...days,today]));
      window.dispatchEvent(new CustomEvent('a1suite:streakchange',{detail:snapshot()}));
    }
    refresh();sync();
    return snapshot();
  }
  function scheduleMidnight(){
    clearTimeout(midnightTimer);
    const now=new Date(),next=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1);
    midnightTimer=setTimeout(()=>{refresh();scheduleMidnight();},next.getTime()-now.getTime()+50);
  }
  const style=document.createElement('style');style.textContent=`
    [data-streak-anchor]{position:relative}
    .a1-streak-badge{position:absolute;top:16px;right:16px;display:inline-flex;align-items:center;gap:5px;padding:6px 9px;border-radius:11px;background:var(--accent-soft);color:var(--ink);font-size:16px;line-height:1.2;font-weight:800;font-variant-numeric:tabular-nums}
    .a1-streak-flame{display:block;width:18px;height:21px;flex:none}
    .a1-streak-badge.is-inactive{color:var(--muted)}
    .a1-streak-badge.is-inactive .a1-streak-outer{fill:currentColor}
    .a1-streak-badge.is-inactive .a1-streak-inner{fill:var(--panel)}
    [data-streak-anchor]:has(.a1-streak-badge:not([hidden])) .eyebrow{min-height:24px;padding-right:84px}
    .a1-streak-badge[hidden]{display:none!important}
  `;document.head.appendChild(style);
  window.A1Streak={render,snapshot,completeExercise,sync};
  function resume(){refresh();scheduleMidnight();sync();}
  window.addEventListener('DOMContentLoaded',resume);
  window.addEventListener('pageshow',event=>{if(event.persisted)resume();});
  window.addEventListener('online',()=>sync());
  window.addEventListener('a1suite:languagechange',refresh);
  window.addEventListener('storage',e=>{if(e.key===key()||e.key==='a1suite.currentProfile')resume();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)resume();});
  window.addEventListener('pagehide',()=>clearTimeout(midnightTimer));
})();
