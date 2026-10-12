(() => {
  'use strict';
  const BUILD='bug-context-72',trail=[];
  let currentPoint=null;
  const text=(el,max=800)=>(el?.textContent||'').trim().replace(/\s+/g,' ').slice(0,max);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const words={
    de:{report:'Fehler melden',title:'Was funktioniert nicht?',placeholder:'Beschreibe kurz den Fehler und was du erwartet hast…',send:'Meldung senden',close:'Schließen',list:'Meldungen',export:'Export für die Fehlerprüfung',privacy:'Die Meldung ist privat. Seite und Übung werden mitgesendet, keine eingegebenen Antworten oder Aufnahmen.',tip:'Zum Diktieren kannst du das Mikrofon deiner Handy-Tastatur nutzen.',saved:'Danke! Deine Meldung wurde gespeichert.',error:'Senden fehlgeschlagen. Dein Entwurf bleibt erhalten. Bitte später erneut versuchen.',login:'Bitte mit einem Cloud-Profil anmelden, um die Meldung zu senden.',short:'Bitte beschreibe den Fehler mit mindestens fünf Zeichen.',empty:'Noch keine Meldungen.',resolve:'Als erledigt markieren',setup:'Die Meldungsfunktion ist noch nicht freigeschaltet. Dein Entwurf bleibt gespeichert.',latest:'Bis zu 200 neueste Meldungen',sending:'Wird gesendet…'},
    fr:{report:'Signaler un problème',title:'Quel est le problème ?',placeholder:'Décris le problème et ce que tu attendais…',send:'Envoyer',close:'Fermer',list:'Signalements',export:'Exporter pour vérifier les erreurs',privacy:'Le signalement est privé. La page et l’exercice sont joints, sans tes réponses saisies ni tes enregistrements.',tip:'Pour dicter, utilise le microphone du clavier de ton téléphone.',saved:'Merci ! Ton signalement a été enregistré.',error:'Échec de l’envoi. Ton brouillon est conservé. Réessaie plus tard.',login:'Connecte-toi avec un profil cloud pour envoyer le signalement.',short:'Décris le problème avec au moins cinq caractères.',empty:'Aucun signalement.',resolve:'Marquer comme résolu',setup:'Le signalement n’est pas encore activé. Ton brouillon est conservé.',latest:'Jusqu’aux 200 derniers signalements',sending:'Envoi…'},
    en:{report:'Report a problem',title:'What went wrong?',placeholder:'Describe the problem and what you expected…',send:'Send report',close:'Close',list:'Reports',export:'Export for bug review',privacy:'Reports are private. The page and exercise are included, without your typed answers or recordings.',tip:'To dictate, use the microphone on your phone keyboard.',saved:'Thank you! Your report was saved.',error:'Sending failed. Your draft is saved. Please try again later.',login:'Sign in with a cloud profile to send your report.',short:'Please describe the problem in at least five characters.',empty:'No reports yet.',resolve:'Mark resolved',setup:'Reporting is not activated yet. Your draft is saved.',latest:'Up to 200 latest reports',sending:'Sending…'}
  };
  const language=()=>A1Profile.getUiLang?.()||document.documentElement.lang;
  const labels=()=>words[language()]||words.en;
  const visible=el=>!el.closest('[hidden]')&&getComputedStyle(el).display!=='none'&&getComputedStyle(el).visibility!=='hidden';
  const collect=(root,selector,max=1200)=>[...root.querySelectorAll(selector)].filter(visible).map(el=>text(el,max)).filter(Boolean);
  function context(){
    const view=document.getElementById('view')||document.querySelector('main')||document.body;
    const header=view.querySelector('[data-bug-lesson]');
    const heading=text(header?.querySelector('h2')||view.querySelector('h2'),250);
    const inExercise=!!view.querySelector('.quiz-q,#mixedCheck,#mixedListen,#masteryInput,#checkNext');
    const point=(header||inExercise)?currentPoint:null;
    const lesson=header?.dataset.bugLesson||heading.match(/^(\d+)\.\s/)?.[1]||point?.lessonId||null;
    const step=view.querySelector('.lesson-step.active')?.dataset.lessonStep||point?.step||null;
    const grammar=view.querySelector('.lesson-grammar-segment.active');
    const question=text(view.querySelector('.quiz-q')||view.querySelector('#lessonSpeaking:not([hidden]) .lesson-task-prompt')||view.querySelector('#lessonWritingSection:not([hidden]) .lesson-task-prompt'));
    const course=window.A1_APP_META?.course||'suite';
    // Only authored task content: never input values, recordings or answer feedback.
    const sourceTexts=collect(view,'.reading-text,.ad-box,.sign,.card > p,.lesson-task-prompt',1800).slice(0,8);
    let remaining=6000;
    const taskTexts=sourceTexts.map(s=>{const part=s.slice(0,remaining);remaining-=part.length;return part;}).filter(Boolean);
    const formFields=collect(view,'.form-grid .field label',120).slice(0,20);
    const audioTexts=[...view.querySelectorAll('[data-bug-audio],[data-speak]')].filter(visible).map(el=>{try{return el.dataset.bugAudio||decodeURIComponent(el.dataset.speak);}catch{return '';}}).filter(Boolean).slice(0,12).map(s=>s.slice(0,500));
    const options=collect(view,'.option-btn',250).slice(0,8);
    const identity=JSON.stringify([course,lesson,step,question,taskTexts,formFields,options,audioTexts]);
    let hash=2166136261;for(const char of identity)hash=Math.imul(hash^char.codePointAt(0),16777619);
    const exerciseKey='task-'+(hash>>>0).toString(16);

    return {schema:2,capturedAt:new Date().toISOString(),exerciseKey,taskTexts,formFields,audioTexts,surface:document.querySelector('.profile-overlay')?'profile':'course',course,path:location.pathname,route:document.querySelector('[data-route].active')?.dataset.route||'home',lessonId:lesson?Number(lesson):null,step,grammarIndex:grammar?Number(grammar.dataset.grammarProgress):point?.grammarIndex??null,grammarTitle:grammar?.getAttribute('aria-label')?.replace(/ · .*/, '')||null,heading,question,meaning:text(view.querySelector('.mixed-context'),800),tokens:[...view.querySelectorAll('.mixed-token')].map(el=>text(el,80)),visibleExamples:[...view.querySelectorAll('.lesson-core-phrase:not([hidden]) strong')].slice(0,12).map(el=>text(el,250)),options,position:text(view.querySelector('.lesson-audio-pager #audioPageStatus')||view.querySelector('.grammar-drill-stage>small')||view.querySelector('.between>.pill'),80),language:language(),viewport:{width:innerWidth,height:innerHeight},userAgent:navigator.userAgent.slice(0,300),build:BUILD,assets:[...document.scripts].map(s=>s.getAttribute('src')).filter(s=>s&&/[?]v=/.test(s)).slice(0,20),actions:trail.slice(-12)};
  }
  document.addEventListener('click',e=>{
    if(e.target.closest('#a1BugDialog,#a1BugLauncher,.profile-overlay'))return;
    const button=e.target.closest('button,a');if(!button)return;
    const data={};for(const key of ['route','lesson','lessonStep','grammarProgress','practice','courseMastery','corePhraseIndex'])if(button.dataset[key]!==undefined)data[key]=button.dataset[key];
    if(button.id)data.action=button.id;
    if(button.dataset.route||['backLearn','backGrammar','backPractice','backExam'].includes(button.id))currentPoint=null;
    if(Object.keys(data).length){trail.push(data);if(trail.length>12)trail.shift();}
  },true);
  const draftKey=c=>'a1suite.bugDraft:'+JSON.stringify([A1Profile.getCurrent()?.profileKey||'guest',c.course,c.lessonId,c.step,c.grammarIndex,c.question]);
  const storeDraft=(key,value)=>{try{value?localStorage.setItem(key,value):localStorage.removeItem(key);}catch{}};
  const readDraft=key=>{try{return localStorage.getItem(key)||'';}catch{return '';}};
  let dialog,launcher,lastFocus;
  function close(){dialog.close();lastFocus?.focus();}
  function frame(content){dialog.innerHTML=`<div class="a1-bug-top"><strong>${esc(labels().report)}</strong><button type="button" id="a1BugClose" aria-label="${esc(labels().close)}">×</button></div>${content}`;dialog.querySelector('#a1BugClose').onclick=close;}
  function open(){
    lastFocus=document.activeElement;
    const c=context(),key=draftKey(c),reportId=crypto.randomUUID(),L=labels();
    frame(`<h2>${esc(L.title)}</h2><p class="a1-bug-location">${esc([c.course,c.heading,c.step,c.grammarTitle].filter(Boolean).join(' · '))}</p><label for="a1BugMessage" class="a1-bug-label">${esc(L.report)}</label><textarea id="a1BugMessage" maxlength="4000" rows="5" placeholder="${esc(L.placeholder)}">${esc(readDraft(key))}</textarea><p class="a1-bug-note">${esc(L.tip)}</p><p class="a1-bug-note">${esc(L.privacy)}</p><p id="a1BugStatus" role="status"></p><button type="button" class="a1-bug-primary" id="a1BugSend">${esc(L.send)}</button><button type="button" class="a1-bug-link" id="a1BugList">${esc(L.list)}</button>`);
    const input=dialog.querySelector('#a1BugMessage'),send=dialog.querySelector('#a1BugSend'),status=dialog.querySelector('#a1BugStatus');let sent=false;
    input.oninput=()=>storeDraft(key,input.value);
    send.onclick=async()=>{
      const message=input.value.trim();if(message.length<5){status.textContent=L.short;input.focus();return;}
      send.disabled=true;input.disabled=true;status.textContent=L.sending;
      try{await A1Profile.submitBugReport({id:reportId,message,context:c});sent=true;storeDraft(key,'');status.textContent=L.saved;send.textContent=L.close;send.disabled=false;send.onclick=close;}
      catch(error){status.textContent=error.message==='BUG_LOGIN_REQUIRED'?L.login:/bug_reports|PGRST205|42P01/.test(error.message||'')?L.setup:L.error;send.disabled=false;input.disabled=false;}
    };
    dialog.querySelector('#a1BugList').onclick=()=>{if(!sent)storeDraft(key,input.value);showReports();};
    if(!dialog.open)dialog.showModal();input.focus();
  }
  function reportDetails(c){
    if(!c)return '';
    const lines=[c.question,c.meaning,...(c.taskTexts||[]),...(c.tokens||[]),...(c.options||[]),...(c.formFields||[]),...(c.audioTexts||[])].filter(Boolean);
    const content=[...new Set(lines)].map(s=>`<p>${esc(s)}</p>`).join('');
    const title=language()==='de'?'Aufgabeninhalt':language()==='fr'?'Contenu de l’exercice':'Exercise content';
    return content?`<details><summary>${esc(title)}</summary><small>${esc([c.lessonId?`#${c.lessonId}`:'',c.step,c.position,c.exerciseKey].filter(Boolean).join(' · '))}</small>${content}</details>`:'';
  }
  async function showReports(){
    const L=labels();frame(`<h2>${esc(L.list)}</h2><p id="a1BugStatus" role="status">…</p>`);
    try{
      const [reports,admin]=await Promise.all([A1Profile.getBugReports(),A1Profile.isBugReportAdmin()]);
      frame(`<h2>${esc(L.list)}</h2><p class="a1-bug-note">${esc(L.latest)}</p><button type="button" class="a1-bug-primary" id="a1BugExport">${esc(L.export)}</button><p id="a1BugStatus" role="status"></p><div class="a1-bug-reports">${reports.map(r=>`<article><strong>${esc(r.context?.heading||r.context?.course)} · ${esc(r.status==='resolved'?'✓':'○')}</strong><small>${esc(r.reporter_name)} · ${esc(r.created_at)} · ${esc(r.id)}</small><p>${esc(r.message)}</p>${reportDetails(r.context)}${admin&&r.status!=='resolved'?`<button type="button" class="a1-bug-link" data-bug-resolve="${esc(r.id)}">${esc(L.resolve)}</button>`:''}</article>`).join('')||`<p>${esc(L.empty)}</p>`}</div>`);
      dialog.querySelector('#a1BugExport').onclick=()=>{
        const blob=new Blob([JSON.stringify({schema:1,exportedAt:new Date().toISOString(),reports},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='a1-bug-reports.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
      };
      dialog.querySelectorAll('[data-bug-resolve]').forEach(b=>b.onclick=async()=>{b.disabled=true;try{await A1Profile.resolveBugReport(b.dataset.bugResolve);showReports();}catch{dialog.querySelector('#a1BugStatus').textContent=L.error;b.disabled=false;}});
    }catch(error){dialog.querySelector('#a1BugStatus').textContent=error.message==='No active cloud session'?L.login:L.setup;}
  }
  function init(){
    const style=document.createElement('style');style.textContent=`
#a1BugLauncher{position:fixed;z-index:1000;right:12px;bottom:calc(94px + env(safe-area-inset-bottom));border:1px solid #94a3b8;border-radius:999px;background:#f8fafc;color:#334155;padding:8px 12px;font:600 12px system-ui;box-shadow:0 3px 14px #0002;cursor:pointer}
#a1BugDialog{box-sizing:border-box;width:min(440px,calc(100% - 24px));max-height:85dvh;overflow:auto;padding:20px;border:1px solid #cbd5e1;border-radius:20px;color:#0f172a;background:#fff;font:16px system-ui}#a1BugDialog::backdrop{background:#0007}#a1BugDialog h2{font-size:20px;margin:16px 0 8px}.a1-bug-top{display:flex;align-items:center;justify-content:space-between;gap:10px}.a1-bug-top button{font-size:25px;background:transparent;border:0;color:inherit;padding:0 8px;cursor:pointer}.a1-bug-location,.a1-bug-note{font-size:12px;line-height:1.5;color:#64748b}.a1-bug-label{display:block;font-size:13px;margin:16px 0 6px}#a1BugMessage{box-sizing:border-box;display:block;width:100%;padding:12px;font:16px system-ui;border:1px solid #94a3b8;border-radius:12px;resize:vertical;color:inherit;background:transparent}.a1-bug-primary{background:#2563eb;color:white;border:0;border-radius:12px;padding:12px 16px;font:600 14px system-ui;cursor:pointer}.a1-bug-primary:disabled{opacity:.6}.a1-bug-link{display:block;margin:12px auto 0;border:0;background:transparent;color:#2563eb;font:600 13px system-ui;padding:8px;cursor:pointer}.a1-bug-reports article{border-top:1px solid #cbd5e1;padding:16px 0;overflow-wrap:anywhere}.a1-bug-reports small{display:block;font-size:11px;color:#64748b;margin-top:6px}.a1-bug-reports p{white-space:pre-wrap;line-height:1.5}.a1-bug-reports blockquote{margin:8px 0;padding-left:12px;border-left:3px solid #94a3b8;font-size:13px}#a1BugStatus{font-size:13px;line-height:1.5}html.dark-mode #a1BugDialog,body.dark #a1BugDialog{background:#1e293b;color:#f8fafc}html.dark-mode .a1-bug-note,html.dark-mode .a1-bug-location{color:#94a3b8}html.dark-mode #a1BugLauncher,body.dark #a1BugLauncher{background:#1e293b;color:#e2e8f0}@media(min-width:761px){#a1BugLauncher{bottom:20px}}`;
    document.head.append(style);launcher=document.createElement('button');launcher.id='a1BugLauncher';launcher.type='button';launcher.textContent='⚑ '+labels().report;launcher.onclick=open;
    dialog=document.createElement('dialog');dialog.id='a1BugDialog';dialog.dataset.i18nIgnore='';dialog.setAttribute('aria-label',labels().report);dialog.addEventListener('cancel',()=>lastFocus?.focus());document.body.append(launcher,dialog);
    window.addEventListener('a1suite:languagechange',()=>{launcher.textContent='⚑ '+labels().report;});
  }
  window.addEventListener('a1suite:profilemenu',event=>{
    const root=event.detail?.root,actions=root?.querySelector('.profile-menu-actions');
    if(!actions||actions.querySelector('[data-bug-report]'))return;
    const button=document.createElement('button');button.type='button';button.dataset.bugReport='';button.textContent='⚑ '+labels().report;button.onclick=open;actions.append(button);
  });
  window.A1BugReports={open,showReports,context,setContext:point=>{currentPoint=point;}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
