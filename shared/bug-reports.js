(() => {
  'use strict';
  const BUILD='dialogue-context-106',trail=[],inFlight=new Set();
  let currentPoint=null;
  const text=(el,max=800)=>(el?.textContent||'').trim().replace(/\s+/g,' ').slice(0,max);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const words={
    de:{report:'Fehler melden',title:'Was funktioniert nicht?',placeholder:'Beschreibe kurz den Fehler und was du erwartet hast…',send:'Meldung senden',close:'Schließen',list:'Meldungen',export:'Export für die Fehlerprüfung',privacy:'Die Meldung ist privat. Seite und Übung werden mitgesendet, keine eingegebenen Antworten oder Aufnahmen.',tip:'Zum Diktieren kannst du das Mikrofon deiner Handy-Tastatur nutzen.',saved:'Danke! Deine Meldung wurde gespeichert.',error:'Senden fehlgeschlagen. Dein Entwurf bleibt erhalten. Bitte später erneut versuchen.',login:'Bitte mit einem Cloud-Profil anmelden, um die Meldung zu senden.',short:'Bitte beschreibe den Fehler mit mindestens fünf Zeichen.',empty:'Keine offenen Meldungen.',resolve:'Als erledigt markieren',setup:'Die Meldungsfunktion ist noch nicht freigeschaltet. Dein Entwurf bleibt gespeichert.',latest:'Bis zu 200 neueste offene Meldungen',sending:'Wird gesendet…'},
    fr:{report:'Signaler un problème',title:'Quel est le problème ?',placeholder:'Décris le problème et ce que tu attendais…',send:'Envoyer',close:'Fermer',list:'Signalements',export:'Exporter pour vérifier les erreurs',privacy:'Le signalement est privé. La page et l’exercice sont joints, sans tes réponses saisies ni tes enregistrements.',tip:'Pour dicter, utilise le microphone du clavier de ton téléphone.',saved:'Merci ! Ton signalement a été enregistré.',error:'Échec de l’envoi. Ton brouillon est conservé. Réessaie plus tard.',login:'Connecte-toi avec un profil cloud pour envoyer le signalement.',short:'Décris le problème avec au moins cinq caractères.',empty:'Aucun signalement non résolu.',resolve:'Marquer comme résolu',setup:'Le signalement n’est pas encore activé. Ton brouillon est conservé.',latest:'Jusqu’aux 200 derniers signalements non résolus',sending:'Envoi…'},
    en:{report:'Report a problem',title:'What went wrong?',placeholder:'Describe the problem and what you expected…',send:'Send report',close:'Close',list:'Reports',export:'Export for bug review',privacy:'Reports are private. The page and exercise are included, without your typed answers or recordings.',tip:'To dictate, use the microphone on your phone keyboard.',saved:'Thank you! Your report was saved.',error:'Sending failed. Your draft is saved. Please try again later.',login:'Sign in with a cloud profile to send your report.',short:'Please describe the problem in at least five characters.',empty:'No open reports.',resolve:'Mark resolved',setup:'Reporting is not activated yet. Your draft is saved.',latest:'Up to 200 latest open reports',sending:'Sending…'}
  };
  const quickWords={
    de:{quick:'Schnellauswahl · optional',question:'Frage fehlerhaft',answers:'Antwort(en) fehlerhaft',both:'Beides fehlerhaft',description:'Beschreibung · optional bei Schnellauswahl',hint:'Schnellauswahl oder Beschreibung genügt.',details:'Aufgabeninhalt',privacy:'Aufgabe wird mitgesendet, keine Eingaben oder Aufnahmen.',steps:{listen:'Hören',understand:'Verstehen',grammar:'Grammatik',speak:'Sprechen',write:'Schreiben',check:'Lektionscheck'}},
    fr:{quick:'Choix rapide · facultatif',question:'Question incorrecte',answers:'Réponse(s) incorrecte(s)',both:'Les deux sont incorrects',description:'Description · facultative avec un choix',hint:'Choisis un problème ou décris-le.',details:'Contenu de l’exercice',privacy:'Exercice joint, sans tes saisies ni tes enregistrements.',steps:{listen:'Écouter',understand:'Comprendre',grammar:'Grammaire',speak:'Parler',write:'Écrire',check:'Bilan'}},
    en:{quick:'Quick selection · optional',question:'Incorrect question',answers:'Incorrect answer(s)',both:'Both incorrect',description:'Description · optional with a selection',hint:'Select an issue or describe it.',details:'Exercise content',privacy:'Exercise included, without your input or recordings.',steps:{listen:'Listening',understand:'Understanding',grammar:'Grammar',speak:'Speaking',write:'Writing',check:'Lesson check'}}
  };
  const reasonGroups={question:['wrong-word','off-topic','nonsense'],answers:['too-obvious','translation','explanation'],both:['off-topic','nonsense']};
  const reasonWords={
    de:{'wrong-word':'Prüft das falsche Wort','off-topic':'Passt nicht zur Lektion',nonsense:'Ergibt keinen Sinn (AI Slop)','too-obvious':'Antwortmöglichkeiten zu offensichtlich',translation:'Falsch oder unnatürlich übersetzt',explanation:'Erklärung der Antwort falsch'},
    fr:{'wrong-word':'Teste le mauvais mot','off-topic':'Ne correspond pas à la leçon',nonsense:'N’a pas de sens (AI Slop)','too-obvious':'Choix de réponses trop évidents',translation:'Traduction incorrecte ou peu naturelle',explanation:'Explication de la réponse incorrecte'},
    en:{'wrong-word':'Tests the wrong word','off-topic':'Does not fit the lesson',nonsense:'Makes no sense (AI Slop)','too-obvious':'Answer choices too obvious',translation:'Incorrect or unnatural translation',explanation:'Incorrect answer explanation'}
  };
  const reasonLabels=()=>reasonWords[language()]||reasonWords.en;
  const recoveryWords={
    de:{drafts:'Gespeicherte Entwürfe',empty:'Keine gespeicherten Entwürfe.',retry:'Entwurf öffnen',timeout:'Keine Bestätigung erhalten. Die Meldung bleibt als Entwurf gespeichert. Bitte erneut senden.',old:'Älterer Entwurf: Zusätzlicher Aufgabeninhalt ist nicht mehr verfügbar.'},
    fr:{drafts:'Brouillons enregistrés',empty:'Aucun brouillon enregistré.',retry:'Ouvrir le brouillon',timeout:'Aucune confirmation reçue. Le signalement reste enregistré comme brouillon. Réessaie.',old:'Ancien brouillon : le contenu détaillé de l’exercice n’est plus disponible.'},
    en:{drafts:'Saved drafts',empty:'No saved drafts.',retry:'Open draft',timeout:'No confirmation received. Your report is saved as a draft. Please retry.',old:'Older draft: additional exercise content is no longer available.'}
  };
  const recoveryLabels=()=>recoveryWords[language()]||recoveryWords.en;
  const quickLabels=()=>quickWords[language()]||quickWords.en;
  const language=()=>A1Profile.getUiLang?.()||document.documentElement.lang;
  const labels=()=>words[language()]||words.en;
  const visible=el=>!el.closest('[hidden]')&&getComputedStyle(el).display!=='none'&&getComputedStyle(el).visibility!=='hidden';
  const collect=(root,selector,max=1200)=>[...root.querySelectorAll(selector)].filter(visible).map(el=>text(el,max)).filter(Boolean);
  function context(){
    const view=document.getElementById('view')||document.querySelector('main')||document.body;
    const task=view.querySelector('[data-bug-task]');
    const header=view.querySelector('[data-bug-lesson]');
    const heading=text(header?.querySelector('h2')||view.querySelector('h2'),250);
    const inExercise=!!task||!!view.querySelector('.quiz-q,#mixedCheck,#mixedListen,#masteryInput,#checkNext');
    const point=(header||inExercise)?currentPoint:null;
    const lesson=header?.dataset.bugLesson||heading.match(/^(\d+)\.\s/)?.[1]||point?.lessonId||null;
    const step=task?.dataset.bugStep||view.querySelector('.lesson-step.active')?.dataset.lessonStep||point?.step||null;
    const grammar=view.querySelector('.lesson-grammar-segment.active');
    const question=(task?.dataset.bugQuestion||'').slice(0,800)||text(view.querySelector('.quiz-q')||view.querySelector('#lessonSpeaking:not([hidden]) .lesson-task-prompt')||view.querySelector('#lessonWritingSection:not([hidden]) .lesson-task-prompt'));
    const course=window.A1_APP_META?.course||'suite';
    // Only authored task content: never input values, recordings or answer feedback.
    const sourceTexts=collect(view,'.reading-text,.ad-box,.sign,.card > p,.lesson-task-prompt',1800).slice(0,8);
    let remaining=6000;
    const taskTexts=sourceTexts.map(s=>{const part=s.slice(0,remaining);remaining-=part.length;return part;}).filter(Boolean);
    const formFields=collect(view,'.form-grid .field label,[data-comprehension-label]',120).slice(0,20);
    const audioTexts=[...view.querySelectorAll('[data-bug-audio],[data-speak]')].filter(visible).map(el=>{try{return el.dataset.bugAudio||decodeURIComponent(el.dataset.speak);}catch{return '';}}).filter(Boolean).slice(0,12).map(s=>s.slice(0,500));
    const comprehensionOptions=[...view.querySelectorAll('.comprehension-field')].filter(visible).map(field=>text(field.querySelector('label'),120)+': '+[...field.querySelectorAll('option')].filter(o=>o.value).map(o=>text(o,250)).join(' | '));
    const options=comprehensionOptions.length?comprehensionOptions:collect(view,'.option-btn',250).slice(0,8);
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
  const owner=()=>A1Profile.getCurrent()?.profileKey||'guest';
  const pendingKey=()=> 'a1suite.bugPending:'+owner();
  function readPending(){try{return JSON.parse(localStorage.getItem(pendingKey())||'{}');}catch{return {};}}
  function savePending(key,report){try{const pending=readPending();report?pending[key]=report:delete pending[key];Object.keys(pending).length?localStorage.setItem(pendingKey(),JSON.stringify(pending)):localStorage.removeItem(pendingKey());}catch{}}
  function pendingDrafts(){
    const drafts=readPending();
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i);if(!key.startsWith('a1suite.bugDraft:'))continue;
      const categoryKey=key.endsWith(':category'),base=categoryKey?key.slice(0,-9):key;if(drafts[base])continue;
      try{
        const [profile,course,lessonId,step,grammarIndex,question]=JSON.parse(base.slice('a1suite.bugDraft:'.length));
        if(profile!==owner())continue;
        const description=readDraft(base),issueType=readDraft(base+':category');
        if(!description&&!issueType)continue;
        drafts[base]={id:crypto.randomUUID(),description,context:{schema:2,course,lessonId,step,grammarIndex,question,heading:lessonId?'#'+lessonId:course,options:[],tokens:[],taskTexts:[],audioTexts:[],formFields:[],issueType:issueType||null,recoveredLegacyDraft:true}};
      }catch{}
    }
    return drafts;
  }
  function showDrafts(){
    const R=recoveryLabels(),drafts=pendingDrafts();
    frame(`<h2>${esc(R.drafts)}</h2>${Object.keys(drafts).length?Object.entries(drafts).map(([key,r],i)=>`<article class="a1-bug-preview"><small>${esc([r.context?.course,r.context?.heading,r.context?.step].filter(Boolean).join(' · '))}</small><p>${esc(r.context?.question||'')}</p><p>${esc(r.description||r.context?.description||quickLabels()[r.context?.issueType]||'')}</p><button type="button" class="a1-bug-link" data-draft-index="${i}">${esc(R.retry)}</button></article>`).join(''):`<p>${esc(R.empty)}</p>`}`);
    const entries=Object.entries(drafts);dialog.querySelectorAll('[data-draft-index]').forEach(b=>b.onclick=()=>{const [key,report]=entries[Number(b.dataset.draftIndex)];open(report,key);});
    if(!dialog.open)dialog.show();
  }
  let dialog,launcher,lastFocus;
  function notify(message){
    document.getElementById('a1BugNotice')?.remove();
    const notice=document.createElement('div');notice.id='a1BugNotice';notice.setAttribute('role','status');notice.dataset.i18nIgnore='';notice.textContent=message;
    notice.style.cssText='position:fixed;bottom:90px;right:12px;max-width:min(340px,calc(100% - 48px));padding:10px 14px;border-radius:12px;background:#1e293b;color:#fff;font:14px system-ui;z-index:1004;box-shadow:0 4px 16px #0003';document.body.append(notice);setTimeout(()=>notice.remove(),6000);
  }
  function close(){dialog.close();updatePanelViewport();lastFocus?.focus();}
  function frame(content){dialog.dataset.mode='overview';dialog.innerHTML=`<div class="a1-bug-top"><strong>${esc(labels().report)}</strong><div><button type="button" id="a1BugClose" aria-label="${esc(labels().close)}">×</button></div></div>${content}`;dialog.querySelector('#a1BugClose').onclick=close;}
  function open(restored=null,restoredKey=null){
    if(restored instanceof Event)restored=null;
    lastFocus=document.activeElement;
    let c=restored?.context||context();
    const key=restoredKey||draftKey(c),existing=restored||readPending()[key],reportId=existing?.id&&!inFlight.has(existing.id)?existing.id:crypto.randomUUID(),L=labels(),Q=quickLabels(),R=recoveryLabels();
    if(existing?.context)c=existing.context;
    const hasTask=!!(c.question||c.options?.length||c.formFields?.length||c.tokens?.length);
    let category=hasTask?(existing?.context?.issueType||readDraft(key+':category')):'';
    if(!['question','answers','both'].includes(category))category='';
    let reason=existing?.context?.issueReason||'';
    if(!reasonGroups[category]?.includes(reason))reason='';
    const location=[c.heading||c.course,Q.steps[c.step]||c.step,c.position].filter(Boolean).join(' · ');
    const preview=c.question||c.taskTexts[0]||c.tokens.join(' ');
    frame(`<p class="a1-bug-location" title="${esc(location)}">${esc(location)}</p>${hasTask?`<details class="a1-bug-preview"><summary title="${esc(Q.details)}">${esc(preview.slice(0,80)||Q.details)}</summary><strong>${esc(preview)}</strong>${c.options.length?`<ul>${c.options.map(o=>`<li>${esc(o)}</li>`).join('')}</ul>`:''}${reportDetails({...c,question:null,options:[]})}</details><fieldset class="a1-bug-quick"><legend>${esc(Q.quick)}</legend>${['question','answers','both'].map(id=>`<button type="button" data-bug-category="${id}" title="${esc(Q[id])}" aria-label="${esc(Q[id])}" aria-pressed="${category===id}">${esc((language()==='de'?{question:'Frage',answers:'Antworten',both:'Beides'}:language()==='fr'?{question:'Question',answers:'Réponses',both:'Les deux'}:{question:'Question',answers:'Answers',both:'Both'})[id])}</button>`).join('')}</fieldset><fieldset class="a1-bug-quick a1-bug-reasons" id="a1BugReasons" hidden></fieldset>`:''}<label for="a1BugMessage" class="a1-bug-label a1-bug-sr">${esc(hasTask?Q.description:L.report)}</label><textarea id="a1BugMessage" maxlength="4000" rows="2" placeholder="${esc(language()==='de'?'Was ist dir aufgefallen?':language()==='fr'?'Quel est le problème ?':'What went wrong?')}">${esc(existing?.description??readDraft(key))}</textarea>${c.recoveredLegacyDraft?`<p class="a1-bug-note">${esc(R.old)}</p>`:''}<p class="a1-bug-note">${esc(language()==='de'?'Beschreibe den Fehler möglichst genau und ausführlich. Nutze dafür gern die Spracheingabe deines Geräts.':language()==='fr'?'Décris le problème précisément et en détail. Tu peux utiliser la dictée de ton appareil.':'Describe the problem as precisely and thoroughly as possible. Feel free to use your device’s dictation.')}</p><p id="a1BugStatus" role="status"></p><div class="a1-bug-actions"><button type="button" class="a1-bug-primary" id="a1BugSend">${esc(L.send)}</button><details class="a1-bug-tools"><summary>⋯</summary><button type="button" class="a1-bug-link" id="a1BugDrafts">${esc(R.drafts)}</button><button type="button" class="a1-bug-link" id="a1BugList">${esc(L.list)}</button></details></div>`);
    dialog.dataset.mode='composer';
    const input=dialog.querySelector('#a1BugMessage'),send=dialog.querySelector('#a1BugSend'),status=dialog.querySelector('#a1BugStatus'),choices=[...dialog.querySelectorAll('[data-bug-category]')];let sent=false;
    const remember=()=>savePending(key,input.value.trim()||category?{id:reportId,description:input.value,context:{...c,issueType:category||null,issueReason:reason||null,description:input.value}}:null);
    function drawReasons(){
      const panel=dialog.querySelector('#a1BugReasons');if(!panel)return;
      panel.hidden=!category;
      panel.innerHTML=(reasonGroups[category]||[]).map(id=>`<button type="button" data-bug-reason="${id}" aria-pressed="${reason===id}">${esc(reasonLabels()[id])}</button>`).join('');
      panel.querySelectorAll('[data-bug-reason]').forEach(b=>b.onclick=()=>{reason=reason===b.dataset.bugReason?'':b.dataset.bugReason;drawReasons();remember();});
    }
    drawReasons();
    choices.forEach(b=>b.onclick=()=>{category=category===b.dataset.bugCategory?'':b.dataset.bugCategory;reason='';drawReasons();choices.forEach(el=>el.setAttribute('aria-pressed',String(category===el.dataset.bugCategory)));storeDraft(key+':category',category);remember();});
    input.oninput=()=>{status.textContent='';storeDraft(key,input.value);remember();};
    send.onclick=async()=>{
      const description=input.value.trim(),message=category?[Q[category],reasonLabels()[reason],description].filter(Boolean).join(': ').slice(0,4000):description;if(!category&&message.length<5){status.textContent=L.short;input.focus();return;}
      remember();const controls=[...dialog.querySelectorAll('[data-bug-category],[data-bug-reason]')];send.disabled=true;input.disabled=true;dialog.querySelectorAll('[data-bug-category],[data-bug-reason]').forEach(b=>b.disabled=true);status.textContent=L.sending;inFlight.add(reportId);close();
      try{await A1Profile.submitBugReport({id:reportId,message,context:{...c,issueType:category||null,issueReason:reason||null,description}});sent=true;const pending=readPending()[key];if(pending?.id===reportId&&pending.description?.trim()===description&&pending.context?.issueType===(category||null)&&pending.context?.issueReason===(reason||null)){storeDraft(key,'');storeDraft(key+':category','');savePending(key,null);}status.textContent=L.saved;notify(L.saved);send.textContent=L.close;send.disabled=false;send.onclick=close;}
      catch(error){status.textContent=error.message==='BUG_LOGIN_REQUIRED'?L.login:error.message==='BUG_SEND_TIMEOUT'||error.name==='AbortError'?R.timeout:/PGRST205|42P01|schema cache/.test(error.message||'')?L.setup:L.error;send.disabled=false;input.disabled=false;controls.forEach(b=>b.disabled=false);notify(status.textContent);}
      finally{inFlight.delete(reportId);}
    };
    dialog.querySelector('#a1BugDrafts').onclick=()=>{if(!sent&&(input.value||category))remember();showDrafts();};
    dialog.querySelector('#a1BugList').onclick=()=>{if(!sent)storeDraft(key,input.value);showReports();};
    if(!dialog.open)dialog.show();updatePanelViewport();dialog.querySelector('#a1BugClose').focus({preventScroll:true});
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
      const [allReports,admin]=await Promise.all([A1Profile.getBugReports(),A1Profile.isBugReportAdmin()]);
      const reports=allReports.filter(report=>report.status==='open');
      frame(`<h2>${esc(L.list)}</h2><p class="a1-bug-note">${esc(L.latest)}${admin?esc(language()==='de'?' · Nach dem Export automatisch archiviert.':language()==='fr'?' · Archivés automatiquement après export.':' · Automatically archived after export.'):''}</p><button type="button" class="a1-bug-primary" id="a1BugExport">${esc(L.export)}</button><p id="a1BugStatus" role="status"></p><div class="a1-bug-reports">${reports.map(r=>`<article><strong>${esc(r.context?.heading||r.context?.course)} · ${esc(r.status==='resolved'?'✓':'○')}</strong><small>${esc(r.reporter_name)} · ${esc(r.created_at)} · ${esc(r.id)}</small><p>${esc(r.message)}</p>${reportDetails(r.context)}${admin&&r.status!=='resolved'?`<button type="button" class="a1-bug-link" data-bug-resolve="${esc(r.id)}">${esc(L.resolve)}</button>`:''}</article>`).join('')||`<p>${esc(L.empty)}</p>`}</div>`);
      const exportButton=dialog.querySelector('#a1BugExport');exportButton.disabled=!reports.length;
      exportButton.onclick=async()=>{
        exportButton.disabled=true;
        try{
        const blob=new Blob([JSON.stringify({schema:1,workflow:'exported-for-review',exportedAt:new Date().toISOString(),reports},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='a1-bug-reports.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
        if(admin){await A1Profile.archiveExportedBugReports(reports.map(report=>report.id));await showReports();}
        else exportButton.disabled=false;
        }catch{exportButton.disabled=false;dialog.querySelector('#a1BugStatus').textContent=language()==='de'?'Die Exportdatei wurde erstellt, aber die Meldungen konnten nicht archiviert werden. Bitte erneut exportieren.':language()==='fr'?'Le fichier a été créé, mais l’archivage a échoué. Exporte à nouveau.':'The export file was created, but archiving failed. Please export again.';}
      };
      dialog.querySelectorAll('[data-bug-resolve]').forEach(b=>b.onclick=async()=>{b.disabled=true;try{await A1Profile.resolveBugReport(b.dataset.bugResolve);showReports();}catch{dialog.querySelector('#a1BugStatus').textContent=L.error;b.disabled=false;}});
    }catch(error){dialog.querySelector('#a1BugStatus').textContent=error.message==='No active cloud session'?L.login:L.setup;}
  }
  let viewportFrame=null,viewportWidth=innerWidth,viewportBaseline=innerHeight,panelX=null,panelY=null;
  function updatePanelViewport(){
    if(!dialog)return;
    const vv=window.visualViewport,mobile=innerWidth<=760;
    if(!dialog.open||!mobile){
      dialog.classList.remove('keyboard-compact');
      for(const name of ['top','left','right','bottom','width','max-height','transform','will-change'])dialog.style.removeProperty(name);
      panelX=panelY=null;return;
    }
    if(Math.abs(innerWidth-viewportWidth)>80){viewportWidth=innerWidth;viewportBaseline=innerHeight;}
    const height=vv?.height||innerHeight,width=vv?.width||innerWidth;
    const editing=document.activeElement===dialog.querySelector('#a1BugMessage');
    if(!editing&&(vv?.scale||1)<1.05)viewportBaseline=Math.max(viewportBaseline,height);
    const keyboard=(vv?.scale||1)<1.05&&viewportBaseline-height>120;
    const compact=dialog.dataset.mode==='composer'&&(editing||keyboard);
    dialog.classList.toggle('keyboard-compact',compact);
    const panelWidth=Math.min(compact?width-16:350,width-16)+'px',limit=Math.max(64,compact?Math.min(100,height*.3):height*.5)+'px';
    if(dialog.style.width!==panelWidth)dialog.style.width=panelWidth;
    if(dialog.style.maxHeight!==limit)dialog.style.maxHeight=limit;
    dialog.style.bottom='auto';dialog.style.right='auto';
    const rect=dialog.getBoundingClientRect(),gap=compact?4:8;
    const x=Math.round(Math.max(8,(vv?.offsetLeft||0)+width-rect.width-8));
    const y=Math.round(Math.max(vv?.offsetTop||0,(vv?.offsetTop||0)+height-rect.height-gap));
    // Composite movement without triggering layout; ignore one-pixel viewport noise.
    if(panelX===null||Math.abs(x-panelX)>1)panelX=x;
    if(panelY===null||Math.abs(y-panelY)>1)panelY=y;
    dialog.style.left='0px';dialog.style.top='0px';dialog.style.willChange='transform';
    const position=`translate3d(${panelX}px,${panelY}px,0)`;
    if(dialog.style.transform!==position)dialog.style.transform=position;
  }
  function schedulePanelViewport(){
    if(viewportFrame!==null)return;
    viewportFrame=requestAnimationFrame(()=>{viewportFrame=null;updatePanelViewport();});
  }
  function init(){
    const style=document.createElement('style');style.textContent=`
#a1BugLauncher{transform:translateZ(0);position:fixed;z-index:1000;right:12px;bottom:calc(94px + env(safe-area-inset-bottom));border:1px solid #94a3b8;border-radius:999px;background:#f8fafc;color:#334155;padding:8px 12px;font:600 12px system-ui;box-shadow:0 3px 14px #0002;cursor:pointer}
#a1BugDialog{box-sizing:border-box;width:min(440px,calc(100% - 24px));max-height:85dvh;overflow:auto;padding:20px;border:1px solid #cbd5e1;border-radius:20px;color:#0f172a;background:#fff;font:16px system-ui}#a1BugDialog::backdrop{background:#0007}#a1BugDialog h2{font-size:20px;margin:16px 0 8px}.a1-bug-top{display:flex;align-items:center;justify-content:space-between;gap:10px}.a1-bug-top button{font-size:25px;background:transparent;border:0;color:inherit;padding:0 8px;cursor:pointer}.a1-bug-location,.a1-bug-note{font-size:12px;line-height:1.5;color:#64748b}.a1-bug-label{display:block;font-size:13px;margin:16px 0 6px}#a1BugMessage{box-sizing:border-box;display:block;width:100%;padding:12px;font:16px system-ui;border:1px solid #94a3b8;border-radius:12px;resize:vertical;color:inherit;background:transparent}.a1-bug-preview{font-size:13px;line-height:1.45;background:#64748b12;border-radius:12px;padding:12px;overflow-wrap:anywhere}.a1-bug-preview ul{margin:8px 0;padding-left:18px}.a1-bug-preview details{margin-top:8px}.a1-bug-preview details p{margin:6px 0}.a1-bug-reasons[hidden]{display:none}.a1-bug-reasons button{font-size:11px!important;padding:5px 8px!important;min-height:30px!important}.a1-bug-quick{border:0;padding:0;margin:14px 0 0;display:flex;flex-wrap:wrap;gap:6px}.a1-bug-quick legend{font-size:12px;margin-bottom:8px;color:#64748b}.a1-bug-quick button{border:1px solid #94a3b8;border-radius:999px;background:transparent;color:inherit;font:600 12px system-ui;min-height:40px;padding:8px 10px;cursor:pointer}.a1-bug-quick button[aria-pressed="true"]{background:#2563eb;color:#fff;border-color:#2563eb}.a1-bug-quick button:disabled{opacity:.6}.a1-bug-primary{background:#2563eb;color:white;border:0;border-radius:12px;padding:12px 16px;font:600 14px system-ui;cursor:pointer}.a1-bug-primary:disabled{opacity:.6}.a1-bug-link{display:block;margin:12px auto 0;border:0;background:transparent;color:#2563eb;font:600 13px system-ui;padding:8px;cursor:pointer}.a1-bug-reports article{border-top:1px solid #cbd5e1;padding:16px 0;overflow-wrap:anywhere}.a1-bug-reports small{display:block;font-size:11px;color:#64748b;margin-top:6px}.a1-bug-reports p{white-space:pre-wrap;line-height:1.5}.a1-bug-reports blockquote{margin:8px 0;padding-left:12px;border-left:3px solid #94a3b8;font-size:13px}#a1BugStatus{font-size:13px;line-height:1.5}html.dark-mode #a1BugDialog,body.dark #a1BugDialog{background:#1e293b;color:#f8fafc}html.dark-mode .a1-bug-note,html.dark-mode .a1-bug-location{color:#94a3b8}html.dark-mode #a1BugLauncher,body.dark #a1BugLauncher{background:#1e293b;color:#e2e8f0}@media(min-width:761px){#a1BugLauncher{bottom:20px}}`;
    style.textContent+=`
#a1BugDialog{position:fixed;inset:auto 12px 20px auto;margin:0;width:min(350px,calc(100% - 24px));max-height:65dvh;z-index:1002;padding:12px;border-radius:16px;box-shadow:0 8px 32px #0003}#a1BugDialog::backdrop{background:transparent}.a1-bug-top{font-size:14px}.a1-bug-top>div{display:flex}.a1-bug-top button{font-size:22px;min-width:32px;min-height:32px}.a1-bug-location{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:4px 0 8px}.a1-bug-preview{padding:0;background:transparent}.a1-bug-preview summary{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:12px;color:#64748b;cursor:pointer}.a1-bug-preview[open]{padding:8px;background:#64748b12;max-height:120px;overflow:auto}.a1-bug-sr,.a1-bug-quick legend{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.a1-bug-quick{margin:8px 0}.a1-bug-quick button{min-height:34px;padding:6px 12px}#a1BugMessage{padding:8px;min-height:60px;max-height:100px;resize:none}.a1-bug-actions{display:flex;gap:8px;align-items:center;justify-content:space-between;margin-top:8px}.a1-bug-primary{padding:9px 12px}.a1-bug-tools{position:relative}.a1-bug-tools>summary{cursor:pointer;list-style:none;font-size:24px;padding:0 10px}.a1-bug-tools[open]{padding:4px 8px;background:#64748b12;border-radius:10px}.a1-bug-tools .a1-bug-link{margin:0;padding:6px;font-size:12px}#a1BugStatus:empty{display:none}#a1BugStatus{margin:6px 0}html.dark-mode .a1-bug-preview summary{color:#94a3b8}@media(max-width:760px){#a1BugDialog{bottom:calc(8px + env(safe-area-inset-bottom));width:min(350px,calc(100% - 24px));max-height:50dvh}#a1BugDialog[data-mode="composer"]{max-height:40dvh}}`;
    style.textContent+=`
@media(max-width:760px){#a1BugDialog.keyboard-compact{display:grid;grid-template-columns:minmax(0,1fr) 38px;grid-template-rows:minmax(0,1fr);height:64px;gap:4px;padding:4px;border-radius:12px}#a1BugDialog.keyboard-compact>.a1-bug-top,#a1BugDialog.keyboard-compact>.a1-bug-location,#a1BugDialog.keyboard-compact>.a1-bug-preview,#a1BugDialog.keyboard-compact>.a1-bug-quick,#a1BugDialog.keyboard-compact>.a1-bug-label,#a1BugDialog.keyboard-compact>.a1-bug-note{display:none}#a1BugDialog.keyboard-compact #a1BugMessage{grid-column:1;grid-row:1;height:100%;min-height:0;max-height:none;padding:5px 7px;font-size:16px;line-height:20px}#a1BugDialog.keyboard-compact .a1-bug-actions{display:contents}#a1BugDialog.keyboard-compact .a1-bug-tools{display:none}#a1BugDialog.keyboard-compact #a1BugSend{grid-column:2;grid-row:1;height:100%;min-height:0;padding:0;font-size:0;border-radius:9px}#a1BugDialog.keyboard-compact #a1BugSend::after{content:'↑';font:700 22px system-ui}#a1BugDialog.keyboard-compact #a1BugStatus{grid-column:1;grid-row:1;align-self:end;z-index:1;margin:0;padding:2px 6px;max-height:32px;overflow:auto;font-size:11px;background:inherit;pointer-events:none}}
`;
    document.head.append(style);launcher=document.createElement('button');launcher.id='a1BugLauncher';launcher.type='button';launcher.textContent='⚑ '+labels().report;launcher.onclick=open;
    dialog=document.createElement('dialog');dialog.id='a1BugDialog';dialog.dataset.i18nIgnore='';dialog.setAttribute('aria-label',labels().report);dialog.addEventListener('cancel',()=>lastFocus?.focus());dialog.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close();}});document.body.append(launcher,dialog);
    document.addEventListener('focusin',schedulePanelViewport);document.addEventListener('focusout',schedulePanelViewport);dialog.addEventListener('close',schedulePanelViewport);dialog.addEventListener('click',schedulePanelViewport);
    window.addEventListener('resize',schedulePanelViewport,{passive:true});window.addEventListener('scroll',schedulePanelViewport,{passive:true});
    window.visualViewport?.addEventListener('resize',schedulePanelViewport,{passive:true});window.visualViewport?.addEventListener('scroll',schedulePanelViewport,{passive:true});
    window.addEventListener('a1suite:languagechange',()=>{launcher.textContent='⚑ '+labels().report;});
  }
  window.addEventListener('a1suite:profilemenu',event=>{
    const root=event.detail?.root,actions=root?.querySelector('.profile-menu-actions');
    if(!actions||actions.querySelector('[data-bug-report]'))return;
    const button=document.createElement('button');button.type='button';button.dataset.bugReport='';button.textContent='⚑ '+labels().report;button.onclick=open;actions.append(button);
  });
  window.A1BugReports={open,showReports,showDrafts,context,setContext:point=>{currentPoint=point;}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
