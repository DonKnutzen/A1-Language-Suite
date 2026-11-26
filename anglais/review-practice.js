/* Profile-scoped review of taught content. No external service or inferred grading. */
(() => {
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const copy=x=>JSON.parse(JSON.stringify(x));
  const en=()=>false;
  const tr=(de,english)=>en()?english:de;
  const translate=s=>s;
  const shuffle=a=>window.A1Learning.shuffle(a);
  function store(state){
    const p=state.reviewPractice||={};p.items||={};return p;
  }
  function task(lessonId,topic,label,q){
    if(!Number.isInteger(Number(lessonId))||Number(lessonId)<0)return null;
    const answer=q.answer??q.o?.[q.a],prompt=q.q||q.prompt;
    if(!prompt||typeof answer!=='string'||!answer.trim())return null;
    const choices=q.o?[...new Set(q.o)]:null;
    if(choices&&(!choices.includes(answer)||choices.length<2))return null;
    const out={lessonId:Number(lessonId),topic,label,q:prompt,answer,accept:q.accept||[],context:q.context||q.meaning||'',explanation:q.explanation||'',explanationEn:q.explanationEn||'',contextEn:q.contextEn||q.meaningEn||'',audio:q.audio||'',speech:q.speech||(q.type==='listening'?q.audio:'')||'',turns:q.turns||null,kind:choices?'choice':'gap',...(choices?{o:choices}:{}),...(q.marking?{marking:q.marking}:{}),...(q.legacyTask?{legacyTask:q.legacyTask}:{}),...(q.legacyTaskForms?{legacyTaskForms:q.legacyTaskForms}:{})};
    // Content participates in the identity: changed questions cannot silently reuse a grade.
    out.id=JSON.stringify([out.lessonId,topic,prompt,answer,out.accept,out.context,choices?[...choices].sort():null,out.speech,out.turns,out.marking||null]);
    return out;
  }
  function record(state,question,ok,inReview=false){
    if(!question||!question.id||typeof ok!=='boolean')return;
    const p=store(state),old=p.items[question.id];
    if(ok&&!old)return;
    const item=p.items[question.id]||={task:copy(question),wrong:0,right:0,streak:0};
    item.task=copy(question);item.lastAt=Date.now();
    if(ok){item.right++;if(inReview)item.streak++;}else{item.wrong++;item.streak=0;item.failedAt=item.lastAt;}
  }
  const pending=state=>Object.values(store(state).items).filter(x=>x.task&&x.streak<2&&!x.retired);
  function history(state,scope='all'){
    return Object.values(store(state).items).filter(x=>x.task&&!x.retired&&x.wrong>0&&(scope==='open'?x.streak<2:scope==='resolved'?x.streak>=2:true));
  }
  function statistics(state){
    const all=history(state),open=history(state,'open').length;
    return {open,resolved:all.length-open,total:all.length,top:all.filter(x=>x.wrong>1).sort((a,b)=>b.wrong-a.wrong||(b.failedAt||0)-(a.failedAt||0)||a.task.id.localeCompare(b.task.id)).slice(0,5)};
  }
  function captureSession(state,lessonId,session){
    if(!session?.response||session.response.reviewRecorded)return;
    const q=session.ex?.[session.i];if(!q)return;
    record(state,task(lessonId,'lesson','Exercices de la leçon',q),session.response.status==='ok');
    session.response.reviewRecorded=true;
  }
  function captureGrammar(state,id,key,title,session){
    if(!session?.response||session.response.reviewRecorded)return;
    record(state,task(id,'grammar:'+key,title,session.ex[session.i]),session.response.status==='ok');
    session.response.reviewRecorded=true;
  }
  function captureListening(state,lessonId,data,progress){
    if(!data||!progress?.graded||progress.reviewRecorded)return;
    data.fields.forEach((f,i)=>record(state,task(lessonId,'listening','Compréhension orale',{q:f.label,answer:f.answer,o:f.options,turns:data.turns}),progress.answers[i]===f.answer));
    progress.reviewRecorded=true;
  }
  function captureHard(state,lessonId,data,attempt){
    if(!data||data.version<2||!attempt?.submittedAt||attempt.reviewRecorded)return;
    data.gaps.forEach((g,i)=>{
      const prompt=data.text.replace(/\{\{(\d+)\}\}/g,(_,n)=>Number(n)===i?'___':data.gaps[Number(n)].answers[0]);
      const q=task(lessonId,'hard-gap','Finale · texte à trous',{q:prompt,context:g.hint,answer:g.answers[0],accept:g.answers.slice(1),marking:{format:g.format,strictAccents:g.strictAccents,numberWords:g.numberWords}});
      record(state,q,window.EN_A1_HARD_MODE.matches(attempt.gaps[i],g.answers,g));
    });
    let index=0;
    data.listening.forEach((block,b)=>block.questions.forEach(q=>{
      record(state,task(lessonId,'hard-listening','Finale · compréhension orale',{q:q.q,answer:q.answers[0],accept:q.answers.slice(1),o:q.options,turns:window.EN_A1_HARD_AUDIO.turns(lessonId,data,b),marking:{format:q.format,strictAccents:q.strictAccents,numberWords:q.numberWords}}),window.EN_A1_HARD_MODE.matches(attempt.listening[index++],q.answers,q));
    }));
    attempt.reviewRecorded=true;
  }
  function seed(state){
    const p=store(state);if(p.imported)return;
    for(const [id,w]of Object.entries(state.lessonWork||{})){
      captureSession(state,id,w.session);
      captureListening(state,id,window.A1_COMPREHENSION_CONTENT?.[id],w.comprehension);
      for(const [key,value]of Object.entries(w.deepening||{}))for(const q of value.session?.mistakes||[])record(state,task(id,'grammar:'+key,'Grammaire',q),false);
      const h=w.hardMode,a=h?.attempt,d=h?.contentVersions?.[a?.version]||(window.EN_A1_HARD_CONTENT?.[id]?.version===a?.version?window.EN_A1_HARD_CONTENT[id]:null);
      captureHard(state,id,d,a);
    }
    for(const [id,p]of Object.entries(state.lessonCheckProgress||{})){
      const s=p.session;if(s?.response)record(state,task(id,'check','Test de leçon',s.ex[s.i]),s.response.ok);
    }
    for(const [key,g]of Object.entries(state.lessonGrammarPractice?.[1]||{})){
      const s=g.session;if(s?.response)record(state,task(1,'l1:'+key,window.EN_A1_LESSON1?.GROUPS[key]?.title||'Grammaire',{...s.tasks[s.i],answer:s.tasks[s.i].a}),s.response.chosen===s.tasks[s.i].a);
    }
    for(const p of Object.values(state.courseCheckProgress||{})){
      const s=p.session,q=s?.ex?.[s.i];if(s?.response&&q){const id=q.lessonId||Number(q.tag?.match(/^L(\d+)/)?.[1]);if(id)record(state,task(id,'check','Test de leçon',q),s.response.ok);}
    }
    const g=state.lessonGrammarCheckProgress?.[1]?.session;
    if(g?.response){const q=g.tasks[g.i];record(state,task(1,'l1-check','Test final de grammaire',{...q,answer:q.a}),g.response.chosen===q.a);}
    p.imported=true;
  }
  function buildBank(lessons,state,grammarHtml,includeLegacySources=false){
    const out=[];
    for(const l of lessons.filter(l=>state.doneLessons.includes(l.id))){
      const add=(topic,label,qs)=>qs.forEach(q=>{const t=task(l.id,topic,label,q);if(t)out.push(t);});
      if(l.id===1){
        for(const [key,g]of Object.entries(window.EN_A1_LESSON1?.GROUPS||{}))add('l1:'+key,g.title,g.tasks.map(q=>({...q,answer:q.a})));
        if(!includeLegacySources&&Object.keys(window.EN_A1_LESSON1?.GROUPS||{}).length)continue;
      }
      for(const pool of window.EN_A1_DEEPENING.pools(l,grammarHtml(l)))add('grammar:'+pool.key,pool.title,pool.tasks.filter(q=>q.kind==='form'));
    }
    return [...new Map(out.map(t=>[t.id,t])).values()];
  }
  const grammarTask=q=>q.topic?.startsWith('grammar:')||q.topic?.startsWith('l1:');
  function restrictRound(p){
    const s=p.session;if(!s||s.mode==='mistakes'||s.tasks.every(grammarTask))return;
    p.previousMixedRound=copy(s);
    const kept=s.tasks.map((q,i)=>grammarTask(q)?i:-1).filter(i=>i>=0),current=s.index;
    if(!kept.length)delete p.session;
    else{
      s.tasks=kept.map(i=>s.tasks[i]);s.answers=kept.map(i=>s.answers[i]||null);s.index=kept.filter(i=>i<current).length;
      if(!kept.includes(current)){s.draft='';delete s.order;}
    }
    p.grammarPoolUpdated=true;
  }
  function refreshQuestions(state,lessons){
    const p=store(state),catalogue=[];
    const add=(id,topic,label,qs)=>qs.forEach(q=>{const next=task(id,topic,label,q);if(next)catalogue.push(next);});
    for(const l of lessons){
      for(const t of l.topics)add(l.id,'grammar:'+t.key,t.title,t.practice);
      add(l.id,'lesson','Exercices de la leçon',l.quiz);
      add(l.id,'check','Test de leçon',window.EN_A1_MASTERY_SPECS[l.id].checkTasks);
      const normal=window.A1_COMPREHENSION_CONTENT[l.id];
      add(l.id,'listening','Compréhension orale',normal.fields.map(f=>({q:f.label,answer:f.answer,o:f.options,turns:normal.turns})));
      const hard=window.EN_A1_HARD_CONTENT[l.id];
      add(l.id,'hard-gap','Finale · texte à trous',hard.gaps.map((g,i)=>({q:hard.text.replace(/\{\{(\d+)\}\}/g,(_,n)=>Number(n)===i?'___':hard.gaps[Number(n)].answers[0]),answer:g.answers[0],accept:g.answers.slice(1),context:g.hint,marking:{format:g.format,strictAccents:g.strictAccents,numberWords:g.numberWords}})));
      for(const block of hard.listening)add(l.id,'hard-listening','Finale · compréhension orale',block.questions.map(q=>({q:q.q,answer:q.answers[0],accept:q.answers.slice(1),o:q.options,turns:block.turns,marking:{format:q.format,strictAccents:q.strictAccents,numberWords:q.numberWords}})));
    }
    const exact=new Map(catalogue.map(q=>[q.id,q])),key=q=>JSON.stringify([q.lessonId,q.topic,q.q,q.answer]),groups=new Map();
    for(const q of catalogue){const k=key(q);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(q);}
    const replacements=new Map();
    for(const [id,item]of Object.entries(p.items)){
      if(item.retired||!item.task)continue;
      const unchanged=exact.get(id);if(unchanged){item.task=copy(unchanged);continue;}
      const candidates=groups.get(key(item.task))||[],next=candidates.length===1?candidates[0]:null;
      // Keep the old record intact. Changed questions cannot keep an old grade silently.
      item.retired=true;item.retiredReason='Exercice révisé';p.questionQualityUpdated=true;
      if(next){p.items[next.id]||={...copy(item),task:copy(next),retired:false,revisedFrom:id};replacements.set(id,next);}
    }
    const s=p.session;
    if(s?.tasks?.some(q=>!exact.has(q.id))){
      (p.previousContentRounds||=[]).push(copy(s));
      const kept=s.tasks.map((q,i)=>({q:exact.get(q.id)||replacements.get(q.id),i})).filter(x=>x.q);
      if(!kept.length)delete p.session;
      else{
        s.tasks=kept.map(x=>copy(x.q));s.answers=kept.map(x=>s.answers[x.i]||null);s.index=kept.filter(x=>x.i<s.index).length;
        s.draft='';delete s.order;
      }
      p.questionQualityUpdated=true;
    }
  }
  function choose(pool,count){
    // Deduplicate the same task across grammar topics, then balance lesson/topic buckets.
    const distinct=new Map();
    for(const q of shuffle(pool)){const key=JSON.stringify([q.lessonId,q.q,q.context,q.answer,q.turns,q.speech]);if(!distinct.has(key))distinct.set(key,q);}
    const groups=new Map();
    for(const q of distinct.values()){const key=q.lessonId+':'+q.topic;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(q);}
    const buckets=shuffle([...groups.values()]),picked=[];
    while(picked.length<count&&buckets.some(b=>b.length))for(const b of buckets){if(b.length&&picked.length<count)picked.push(b.pop());}
    return window.EN_A1_MASTERY.spreadAnswers?window.EN_A1_MASTERY.spreadAnswers(picked):picked;
  }
  function accepted(q,value){
    if(q.kind==='choice')return value===q.answer;
    if(q.topic==='check'&&q.marking)return window.EN_A1_MASTERY.accepted(q,value);
    if(q.marking)return window.EN_A1_HARD_MODE.matches(value,[q.answer,...q.accept],q.marking);
    return window.EN_A1_MASTERY.accepted(q,value);
  }
  let redraw=null;
  window.addEventListener('a1suite:languagechange',()=>redraw?.());
  function render({view,lessons,state,save,onBack,speak,grammarHtml,initialMode}){
    seed(state);const p=store(state);restrictRound(p);const bank=buildBank(lessons,state,grammarHtml);refreshQuestions(state,lessons,grammarHtml,bank);
    const selectable=bank;
    const topicKeys=new Set(selectable.map(q=>q.lessonId+':'+q.topic));
    let mode=['mixed','custom','mistakes'].includes(initialMode)?initialMode:p.settings?.mode||'mixed',count=p.settings?.count===20?20:10,selected=new Set((p.settings?.selected||[...topicKeys]).filter(key=>topicKeys.has(key)));
    let mistakeScope=['open','resolved','all'].includes(p.settings?.mistakeScope)?p.settings.mistakeScope:'open';
    let reviewAudio=null;
    const cancel=()=>{reviewAudio?.stop(false);window.A1Voice?.cancel();};
    const finishBack=()=>{cancel();redraw=null;onBack();};
    const shell=html=>{cancel();view.innerHTML=`<div class="review-practice" data-i18n-ignore>${html}</div>`;view.querySelector('#reviewBack')?.addEventListener('click',finishBack);view.querySelector('h2')?.focus();window.scrollTo({top:0,behavior:'instant'});};
    const heading=()=>`<div class="between"><button class="tiny-btn" id="reviewBack">← ${tr('Accueil','Home')}</button><span class="pill">${tr('RÉVISION','REVIEW')}</span></div>`;
    function saveSettings(){p.settings={mode,count,selected:[...selected],mistakeScope};save();}
    function pool(){return mode==='mistakes'?history(state,mistakeScope).map(x=>x.task):mode==='custom'?selectable.filter(q=>selected.has(q.lessonId+':'+q.topic)):bank;}
    function mistakePanel(){
      const stats=statistics(state);
      return `<div id="reviewMistakePanel" ${mode==='mistakes'?'':'hidden'}><label class="review-length" for="reviewMistakeScope">${tr('Choix des erreurs','Mistake selection')}<select id="reviewMistakeScope">${[['open',tr('Erreurs à revoir','Open mistakes'),stats.open],['resolved',tr('Déjà consolidées','Already consolidated'),stats.resolved],['all',tr('Toutes les erreurs','All saved mistakes'),stats.total]].map(([value,label,n])=>`<option value="${value}" ${mistakeScope===value?'selected':''}>${label} (${n})</option>`).join('')}</select></label><details class="review-error-stats"><summary>${tr('Tes erreurs en un coup d’œil','Your mistake overview')}</summary><p>${stats.open} ${tr('à revoir','open')} · ${stats.resolved} ${tr('consolidées','consolidated')}</p><h3>${tr('Erreurs fréquentes','Frequent mistakes')}</h3><p class="muted">${tr('Ici apparaissent jusqu’à cinq exercices auxquels tu as répondu faux plus d’une fois.','Up to five tasks you have answered incorrectly more than once.')}</p>${stats.top.length?`<ol>${stats.top.map(item=>`<li><span class="muted">${tr('Leçon','Lesson')} ${item.task.lessonId} · ${esc(translate(item.task.label))}</span><p>${esc(translate(item.task.q))}</p><strong>${item.wrong} ${tr('fois faux','times incorrect')}</strong> · ${item.streak>=2?tr('consolidées','consolidated'):tr('à revoir','open')}</li>`).join('')}</ol>`:`<p class="muted">${tr('Aucun exercice raté plusieurs fois pour l’instant.','No task answered incorrectly more than once yet.')}</p>`}</details></div>`;
    }
    function setup(){
      redraw=()=>{if(view.querySelector('.review-practice'))setup();};
      const groups=[...new Map(selectable.map(q=>[q.lessonId+':'+q.topic,q])).values()];
      shell(`${heading()}<section class="card"><h2 tabindex="-1">${tr('Consolider ce que tu as appris','Practise what you have learned')}</h2><p class="muted">${tr('Révise les thèmes de grammaire des leçons terminées ou entraîne-toi sur tes erreurs enregistrées.','Review grammar topics from completed lessons or practise your saved mistakes.')}</p>${p.questionQualityUpdated?`<p class="muted">${tr('Les exercices à revoir ont été révisés. Les réponses déjà évaluées et les résultats précédents sont conservés.','Unanswered tasks have been updated. Graded answers and earlier results are preserved.')}</p>`:''}${p.grammarPoolUpdated?`<p class="muted">${tr('Les séries en cours ont été limitées aux exercices de grammaire.','Ongoing topic rounds now contain grammar tasks only.')}</p>`:''}<fieldset class="review-modes"><legend>${tr('Que veux-tu réviser ?','What would you like to practise?')}</legend>${[['mixed',tr('Tout mélanger','Mix everything'),tr('La grammaire de tes leçons terminées.','Grammar from your completed lessons.')],['custom',tr('Choisir moi-même','Choose topics'),tr('Choisir des leçons et des thèmes précis.','Select individual lessons and topics.')],['mistakes',tr('Revoir mes erreurs','Practise mistakes'),`${pending(state).length} ${tr(pending(state).length===1?'exercice à revoir':'exercices à revoir',pending(state).length===1?'task to review':'tasks to review')}`]].map(([id,label,hint])=>`<label class="review-mode"><input type="radio" name="review-mode" value="${id}" ${mode===id?'checked':''}><span><strong>${label}</strong><small>${hint}</small></span></label>`).join('')}</fieldset><div id="reviewTopics" ${mode==='custom'?'':'hidden'}><div class="review-select-actions"><button class="tiny-btn" id="reviewAll">${tr('Tout sélectionner','Select all')}</button><button class="tiny-btn" id="reviewNone">${tr('Effacer la sélection','Clear selection')}</button></div>${lessons.filter(l=>groups.some(g=>g.lessonId===l.id)).map(l=>`<details class="review-lesson"><summary>${l.id}. ${esc(translate(l.title))}</summary><label><input type="checkbox" data-review-lesson="${l.id}">${tr("Tous les thèmes de cette leçon","All topics in this lesson")}</label>${groups.filter(g=>g.lessonId===l.id).map(g=>`<label><input type="checkbox" data-review-topic="${g.lessonId}:${esc(g.topic)}" ${selected.has(g.lessonId+':'+g.topic)?'checked':''}>${esc(translate(g.label))}</label>`).join('')}</details>`).join('')}</div>${mistakePanel()}<p class="muted" id="reviewMistakeHint" ${mode==='mistakes'?'':'hidden'}>${tr('Deux bonnes réponses de suite en révision : l’exercice est alors consolidé.','Answer correctly in two successive reviews to clear a task.')}</p><details id="reviewMistakeDetails" ${mode==='mistakes'?'':'hidden'}><summary>${tr('Quelles erreurs sont enregistrées ?','Which mistakes are saved?')}</summary><p class="muted">${tr('Les nouvelles erreurs sont enregistrées à partir de maintenant ; les erreurs individuelles existantes sont reprises. Les anciens scores globaux ne disent rien sur les réponses individuelles. Tu continues d’évaluer toi-même les textes libres.','New mistakes are saved from now on; existing individual errors are imported. Earlier overall scores cannot identify individual answers. Free writing remains self-assessed.')}</p></details><label class="review-length" for="reviewCount">${tr('Taille','Length')}<select id="reviewCount"><option value="10" ${count===10?'selected':''}>10 ${tr('questions','questions')}</option><option value="20" ${count===20?'selected':''}>20 ${tr('questions','questions')}</option></select></label><p id="reviewPoolInfo" class="muted" role="status"></p>${p.session?`<button class="primary-btn" id="reviewResume">${tr('Reprendre la série','Resume round')} · ${p.session.index+1}/${p.session.tasks.length}</button>`:''}<button class="${p.session?'secondary':'primary'}-btn" id="reviewStart">${p.session?tr('Commencer une nouvelle série','Start a new round'):tr('Commencer la révision','Start review')}</button><p class="muted">${tr('Tes réponses sont enregistrées. La révision ne modifie pas tes meilleurs scores de leçon.','Your answers are saved. Review does not change lesson best scores.')}</p></section>`);
      function update(){
        view.querySelectorAll('[data-review-lesson]').forEach(el=>{
          const keys=groups.filter(g=>g.lessonId===Number(el.dataset.reviewLesson)).map(g=>g.lessonId+':'+g.topic),n=keys.filter(k=>selected.has(k)).length;
          el.checked=n===keys.length;el.indeterminate=n>0&&n<keys.length;
        });
        const n=choose(pool(),count).length;
        view.querySelector('#reviewMistakePanel').hidden=mode!=='mistakes';view.querySelector('#reviewTopics').hidden=mode!=='custom';view.querySelector('#reviewMistakeHint').hidden=mode!=='mistakes';view.querySelector('#reviewMistakeDetails').hidden=mode!=='mistakes';
        view.querySelector('#reviewPoolInfo').textContent=n?`${n} ${tr(n===1?'question dans cette série':'questions dans cette série',n===1?'question in this round':'questions in this round')}${n<count?' · '+tr('sans exercices en double','without duplicate tasks'):''}`:mode==='mistakes'?tr('Aucune erreur à revoir. Tu peux commencer une série mélangée.','No mistakes pending. You can start a mixed round.'):tr('Choisis au moins un thème d’une leçon terminée.','Select at least one topic from a completed lesson.');
        if(!n&&mode==='mistakes'&&mistakeScope!=='open')view.querySelector('#reviewPoolInfo').textContent=mistakeScope==='resolved'?tr('Aucune erreur consolidée.','No consolidated mistakes yet.'):tr('Aucune erreur enregistrée.','No saved mistakes yet.');
        view.querySelector('#reviewStart').disabled=!n;saveSettings();
      }
      view.querySelectorAll('[name="review-mode"]').forEach(el=>el.onchange=()=>{mode=el.value;update();});
      view.querySelectorAll('[data-review-topic]').forEach(el=>el.onchange=()=>{if(el.checked)selected.add(el.dataset.reviewTopic);else selected.delete(el.dataset.reviewTopic);update();});
      view.querySelectorAll('[data-review-lesson]').forEach(el=>el.onchange=()=>{
        const id=Number(el.dataset.reviewLesson);groups.filter(g=>g.lessonId===id).forEach(g=>{const key=id+':'+g.topic;if(el.checked)selected.add(key);else selected.delete(key);});
        view.querySelectorAll('[data-review-topic]').forEach(box=>box.checked=selected.has(box.dataset.reviewTopic));update();
      });
      view.querySelector('#reviewAll').onclick=()=>{groups.forEach(g=>selected.add(g.lessonId+':'+g.topic));setup();};
      view.querySelector('#reviewNone').onclick=()=>{selected.clear();setup();};
      view.querySelector('#reviewMistakeScope').onchange=e=>{mistakeScope=e.target.value;update();};
      view.querySelector('#reviewCount').onchange=e=>{count=Number(e.target.value);update();};
      view.querySelector('#reviewResume')?.addEventListener('click',draw);
      view.querySelector('#reviewStart').onclick=()=>{
        const start=()=>{delete p.grammarPoolUpdated;delete p.questionQualityUpdated;p.session={version:1,tasks:choose(pool(),count).map(copy),index:0,answers:[],draft:'',mode,startedAt:Date.now()};save();draw();};
        if(!p.session)return start();
        view.querySelector('#reviewPoolInfo').innerHTML=`${tr('La nouvelle série remplace ta série en cours. Les erreurs enregistrées sont conservées.','The new round replaces your current round. Saved mistakes are kept.')} <button class="tiny-btn" id="reviewReplace">${tr('Confirmer la nouvelle série','Confirm new round')}</button>`;
        view.querySelector('#reviewReplace').onclick=start;
      };
      update();
    }
    function result(){
      const s=p.session,right=s.answers.filter(a=>a.ok).length;
      const finishedAt=Date.now();window.A1DailyReview?.complete(state,s,finishedAt);
      p.lastResult={right,total:s.tasks.length,finishedAt};delete p.session;save(true);
      const missed=s.tasks.filter((q,i)=>!s.answers[i].ok);
      redraw=()=>{if(view.querySelector('.review-practice'))show();};
      function show(){shell(`${heading()}<section class="card center"><h2 tabindex="-1">${tr('Série terminée','Round complete')}</h2><div class="score">${right}/${s.tasks.length}</div>${window.A1DailyReview?.resultHtml(state,{lang:en()?'en':'fr'})||''}<p>${tr('bonnes réponses','correct answers')}</p><p class="muted">${pending(state).length} ${tr(pending(state).length===1?'exercice reste à revoir.':'exercices restent à revoir.',pending(state).length===1?'task remains for targeted practice.':'tasks remain for targeted practice.')}</p><div class="review-actions">${missed.length?`<button class="primary-btn" id="reviewErrors">${tr('Revoir les erreurs de cette série','Practise this round’s mistakes')}</button>`:''}<button class="secondary-btn" id="reviewSetup">${tr('Préparer une nouvelle révision','Set up another review')}</button></div></section>`);
        view.querySelector('#reviewSetup').onclick=setup;view.querySelector('#reviewErrors')?.addEventListener('click',()=>{p.session={version:1,tasks:missed,index:0,answers:[],draft:'',mode:'mistakes',startedAt:Date.now()};save();draw();});
      }show();
    }
    function draw(){
      const s=p.session;if(!s?.tasks?.length)return setup();if(s.index>=s.tasks.length)return result();
      const q=s.tasks[s.index],answer=s.answers[s.index],lesson=lessons.find(l=>l.id===q.lessonId);
      s.order||=q.o?shuffle(q.o):null;
      redraw=()=>{if(view.querySelector('.review-practice'))draw();};
      shell(`${heading()}<section class="card" data-bug-task data-bug-lesson="${q.lessonId}" data-bug-step="review"><div class="between"><span class="pill">${s.index+1}/${s.tasks.length}</span><button class="tiny-btn" id="reviewPause">${tr('Pause','Pause')}</button></div><h2 tabindex="-1">${esc(translate(lesson?.title||tr('Entraînement supplémentaire','Extra practice')))}</h2><p class="muted">${esc(translate(q.label))}</p>${q.context?`<p class="mixed-context">${esc(en()&&q.contextEn?q.contextEn:translate(q.context))}</p>`:''}${q.turns||q.speech?window.A1ReviewAudio.html(en()?'en':'fr'):''}<div class="quiz-q">${esc(translate(q.q))}</div>${q.kind==='choice'?`<div class="options">${s.order.map((o,i)=>`<button class="option-btn" data-review-option="${i}" ${answer?'disabled':''}>${esc(translate(o))}</button>`).join('')}</div><button class="primary-btn" id="reviewCheck" ${answer||!s.draft?'disabled':''}>${tr('Vérifier','Check')}</button>`:`<label for="reviewInput">${tr('Ta réponse','Your answer')}</label><input class="mixed-input" id="reviewInput" lang="en" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(s.draft)}" ${answer?'disabled':''}>${window.A1ExerciseEngine.charBar('en',en()?'en':'fr')}<button class="primary-btn" id="reviewCheck" ${answer?'disabled':''}>${tr('Vérifier','Check')}</button>`}<div id="reviewFeedback" role="status"></div></section>`);
      view.querySelector('#reviewPause').onclick=setup;
      reviewAudio=q.turns||q.speech?window.A1ReviewAudio.mount({root:view,turns:q.turns,speech:q.speech,targetLang:'en-GB',uiLang:en()?'en':'fr'}):null;
      function mistakeProgress(){
        const item=p.items[q.id];if(!item||item.retired)return '';
        const message=item.streak>=2?tr('Consolidé – retiré des erreurs à revoir.','Consolidated — removed from open mistakes.'):item.streak===1?tr('Encore une bonne réponse et cet exercice sera consolidé.','One more correct review will consolidate this task.'):tr('Cet exercice reste à revoir.','This task remains open for practice.');
        return `<p class="review-mistake-progress">${message} <span>${pending(state).length} ${tr('à revoir','open')}</span></p>`;
      }
      function feedback(a){
        view.querySelectorAll('[data-review-option]').forEach((el,i)=>{const o=s.order[i];el.disabled=true;el.classList.toggle('correct',o===q.answer);el.classList.toggle('wrong',o===a.value&&!a.ok);});
        view.querySelectorAll('#reviewInput,#reviewCheck,.mixed-char,.mixed-shift').forEach(el=>el.disabled=true);
        view.querySelector('#reviewFeedback').innerHTML=`<div class="feedback ${a.ok?'good':'bad'}"><strong>${a.ok?tr('✓ Correct','✓ Correct'):tr('La bonne réponse est : ','Correct answer: ')+esc(translate(q.answer))}</strong>${q.explanation?`<p>${esc(en()&&q.explanationEn?q.explanationEn:translate(q.explanation))}</p>`:''}${q.audio?`<button class="tiny-btn" id="reviewAnswerAudio">🔊 ${tr('Écouter','Listen')}</button>`:''}</div>${mistakeProgress()}<button class="primary-btn" id="reviewNext">${s.index<s.tasks.length-1?tr('Suivant','Next'):tr('Résultat','Result')}</button>`;
        view.querySelector('#reviewAnswerAudio')?.addEventListener('click',()=>{cancel();speak(q.audio,true);});
        view.querySelector('#reviewNext').onclick=()=>{s.index++;s.draft='';delete s.order;save();draw();};
      }
      function check(value){
        if(s.answers[s.index]||!value.trim())return;
        const a={value,ok:accepted(q,value)};s.answers[s.index]=a;record(state,q,a.ok,true);save();cancel();feedback(a);if(q.audio&&!q.turns&&!q.speech)speak(q.audio,true);view.querySelector("#reviewNext").focus();
      }
      const options=[...view.querySelectorAll('[data-review-option]')];
      function selectOption(value){
        if(s.answers[s.index])return;
        s.draft=value;
        options.forEach((el,i)=>{const selected=s.order[i]===value;el.classList.toggle('selected',selected);el.setAttribute('aria-pressed',String(selected));});
        view.querySelector('#reviewCheck').disabled=!value;save();
      }
      options.forEach((el,i)=>{el.setAttribute('aria-pressed',String(s.draft===s.order[i]));el.classList.toggle('selected',s.draft===s.order[i]);el.onclick=()=>selectOption(s.order[i]);});
      if(q.kind==='choice')view.querySelector('#reviewCheck').onclick=()=>check(s.draft);

      const input=view.querySelector('#reviewInput');
      if(input){
        input.oninput=()=>{s.draft=input.value;save();};
        window.A1ExerciseEngine.wireChars(input,'en',view);
        view.querySelector('#reviewCheck').onclick=()=>check(input.value);input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();check(input.value);}};
      }
      if(answer)feedback(answer);save();
    }
    setup();
  }
  window.EN_A1_REVIEW={task,record,pending,history,statistics,captureSession,captureGrammar,captureListening,captureHard,seed,buildBank,choose,accepted,render};
})();
