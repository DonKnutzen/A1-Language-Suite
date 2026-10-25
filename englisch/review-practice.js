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
    record(state,task(lessonId,'lesson','Lektionsübungen',q),session.response.status==='ok');
    session.response.reviewRecorded=true;
  }
  function captureGrammar(state,id,key,title,session){
    if(!session?.response||session.response.reviewRecorded)return;
    record(state,task(id,'grammar:'+key,title,session.ex[session.i]),session.response.status==='ok');
    session.response.reviewRecorded=true;
  }
  function captureListening(state,lessonId,data,progress){
    if(!data||!progress?.graded||progress.reviewRecorded)return;
    data.fields.forEach((f,i)=>record(state,task(lessonId,'listening','Hörverstehen',{q:f.label,answer:f.answer,o:f.options,turns:data.turns}),progress.answers[i]===f.answer));
    progress.reviewRecorded=true;
  }
  function captureHard(state,lessonId,data,attempt){
    if(!data||data.version<2||!attempt?.submittedAt||attempt.reviewRecorded)return;
    data.gaps.forEach((g,i)=>{
      const prompt=data.text.replace(/\{\{(\d+)\}\}/g,(_,n)=>Number(n)===i?'___':data.gaps[Number(n)].answers[0]);
      const q=task(lessonId,'hard-gap','Hard Mode · Lückentext',{q:prompt,context:g.hint,answer:g.answers[0],accept:g.answers.slice(1),marking:{format:g.format,strictAccents:g.strictAccents,numberWords:g.numberWords}});
      record(state,q,window.EN_A1_HARD_MODE.matches(attempt.gaps[i],g.answers,g));
    });
    let index=0;
    data.listening.forEach((block,b)=>block.questions.forEach(q=>{
      record(state,task(lessonId,'hard-listening','Hard Mode · Hörverstehen',{q:q.q,answer:q.answers[0],accept:q.answers.slice(1),o:q.options,turns:window.EN_A1_HARD_AUDIO.turns(lessonId,data,b),marking:{format:q.format,strictAccents:q.strictAccents,numberWords:q.numberWords}}),window.EN_A1_HARD_MODE.matches(attempt.listening[index++],q.answers,q));
    }));
    attempt.reviewRecorded=true;
  }
  function seed(state){
    const p=store(state);if(p.imported)return;
    for(const [id,w]of Object.entries(state.lessonWork||{})){
      captureSession(state,id,w.session);
      captureListening(state,id,window.A1_COMPREHENSION_CONTENT?.[id],w.comprehension);
      for(const [key,value]of Object.entries(w.deepening||{}))for(const q of value.session?.mistakes||[])record(state,task(id,'grammar:'+key,'Grammatik',q),false);
      const h=w.hardMode,a=h?.attempt,d=h?.contentVersions?.[a?.version]||(window.EN_A1_HARD_CONTENT?.[id]?.version===a?.version?window.EN_A1_HARD_CONTENT[id]:null);
      captureHard(state,id,d,a);
    }
    for(const [id,p]of Object.entries(state.lessonCheckProgress||{})){
      const s=p.session;if(s?.response)record(state,task(id,'check','Lektionscheck',s.ex[s.i]),s.response.ok);
    }
    for(const [key,g]of Object.entries(state.lessonGrammarPractice?.[1]||{})){
      const s=g.session;if(s?.response)record(state,task(1,'l1:'+key,window.EN_A1_LESSON1?.GROUPS[key]?.title||'Grammatik',{...s.tasks[s.i],answer:s.tasks[s.i].a}),s.response.chosen===s.tasks[s.i].a);
    }
    for(const p of Object.values(state.courseCheckProgress||{})){
      const s=p.session,q=s?.ex?.[s.i];if(s?.response&&q){const id=q.lessonId||Number(q.tag?.match(/^L(\d+)/)?.[1]);if(id)record(state,task(id,'check','Lektionscheck',q),s.response.ok);}
    }
    const g=state.lessonGrammarCheckProgress?.[1]?.session;
    if(g?.response){const q=g.tasks[g.i];record(state,task(1,'l1-check','Grammatik-Abschlusstest',{...q,answer:q.a}),g.response.chosen===q.a);}
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
  function refreshQuestions(){
    // New course: there are no legacy French drafts to migrate.
    // Saved task snapshots retain their original wording and scoring policy.
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
    const heading=()=>`<div class="between"><button class="tiny-btn" id="reviewBack">← ${tr('Start','Home')}</button><span class="pill">${tr('WIEDERHOLUNG','REVIEW')}</span></div>`;
    function saveSettings(){p.settings={mode,count,selected:[...selected],mistakeScope};save();}
    function pool(){return mode==='mistakes'?history(state,mistakeScope).map(x=>x.task):mode==='custom'?selectable.filter(q=>selected.has(q.lessonId+':'+q.topic)):bank;}
    function mistakePanel(){
      const stats=statistics(state);
      return `<div id="reviewMistakePanel" ${mode==='mistakes'?'':'hidden'}><label class="review-length" for="reviewMistakeScope">${tr('Fehlerauswahl','Mistake selection')}<select id="reviewMistakeScope">${[['open',tr('Offene Fehler','Open mistakes'),stats.open],['resolved',tr('Bereits gefestigt','Already consolidated'),stats.resolved],['all',tr('Alle bisherigen Fehler','All saved mistakes'),stats.total]].map(([value,label,n])=>`<option value="${value}" ${mistakeScope===value?'selected':''}>${label} (${n})</option>`).join('')}</select></label><details class="review-error-stats"><summary>${tr('Deine Fehlerübersicht','Your mistake overview')}</summary><p>${stats.open} ${tr('offen','open')} · ${stats.resolved} ${tr('gefestigt','consolidated')}</p><h3>${tr('Häufige Fehler','Frequent mistakes')}</h3><p class="muted">${tr('Hier erscheinen bis zu fünf Aufgaben, die du mehr als einmal falsch beantwortet hast.','Up to five tasks you have answered incorrectly more than once.')}</p>${stats.top.length?`<ol>${stats.top.map(item=>`<li><span class="muted">${tr('Lektion','Lesson')} ${item.task.lessonId} · ${esc(translate(item.task.label))}</span><p>${esc(translate(item.task.q))}</p><strong>${item.wrong} ${tr('mal falsch','times incorrect')}</strong> · ${item.streak>=2?tr('gefestigt','consolidated'):tr('offen','open')}</li>`).join('')}</ol>`:`<p class="muted">${tr('Noch keine Aufgabe mehrfach falsch beantwortet.','No task answered incorrectly more than once yet.')}</p>`}</details></div>`;
    }
    function setup(){
      redraw=()=>{if(view.querySelector('.review-practice'))setup();};
      const groups=[...new Map(selectable.map(q=>[q.lessonId+':'+q.topic,q])).values()];
      shell(`${heading()}<section class="card"><h2 tabindex="-1">${tr('Gelerntes festigen','Practise what you have learned')}</h2><p class="muted">${tr('Wiederhole Grammatikthemen abgeschlossener Lektionen oder übe deine gespeicherten Fehler.','Review grammar topics from completed lessons or practise your saved mistakes.')}</p>${p.questionQualityUpdated?`<p class="muted">${tr('Offene Aufgaben wurden überarbeitet. Bereits bewertete Antworten und frühere Ergebnisse bleiben erhalten.','Unanswered tasks have been updated. Graded answers and earlier results are preserved.')}</p>`:''}${p.grammarPoolUpdated?`<p class="muted">${tr('Laufende Themenrunden wurden auf Grammatikaufgaben beschränkt.','Ongoing topic rounds now contain grammar tasks only.')}</p>`:''}<fieldset class="review-modes"><legend>${tr('Was möchtest du üben?','What would you like to practise?')}</legend>${[['mixed',tr('Alles mischen','Mix everything'),tr('Grammatik aus deinen abgeschlossenen Lektionen.','Grammar from your completed lessons.')],['custom',tr('Selbst auswählen','Choose topics'),tr('Lektionen und Themen gezielt auswählen.','Select individual lessons and topics.')],['mistakes',tr('Fehler gezielt üben','Practise mistakes'),`${pending(state).length} ${tr(pending(state).length===1?'Aufgabe vorgemerkt':'Aufgaben vorgemerkt',pending(state).length===1?'task to review':'tasks to review')}`]].map(([id,label,hint])=>`<label class="review-mode"><input type="radio" name="review-mode" value="${id}" ${mode===id?'checked':''}><span><strong>${label}</strong><small>${hint}</small></span></label>`).join('')}</fieldset><div id="reviewTopics" ${mode==='custom'?'':'hidden'}><div class="review-select-actions"><button class="tiny-btn" id="reviewAll">${tr('Alle auswählen','Select all')}</button><button class="tiny-btn" id="reviewNone">${tr('Auswahl löschen','Clear selection')}</button></div>${lessons.filter(l=>groups.some(g=>g.lessonId===l.id)).map(l=>`<details class="review-lesson"><summary>${l.id}. ${esc(translate(l.title))}</summary><label><input type="checkbox" data-review-lesson="${l.id}">${tr("Alle Themen dieser Lektion","All topics in this lesson")}</label>${groups.filter(g=>g.lessonId===l.id).map(g=>`<label><input type="checkbox" data-review-topic="${g.lessonId}:${esc(g.topic)}" ${selected.has(g.lessonId+':'+g.topic)?'checked':''}>${esc(translate(g.label))}</label>`).join('')}</details>`).join('')}</div>${mistakePanel()}<p class="muted" id="reviewMistakeHint" ${mode==='mistakes'?'':'hidden'}>${tr('Zweimal hintereinander richtig in der Wiederholung: Dann ist eine Aufgabe gefestigt.','Answer correctly in two successive reviews to clear a task.')}</p><details id="reviewMistakeDetails" ${mode==='mistakes'?'':'hidden'}><summary>${tr('Welche Fehler werden gespeichert?','Which mistakes are saved?')}</summary><p class="muted">${tr('Neue Fehler merken wir uns ab jetzt; vorhandene einzelne Fehler übernehmen wir. Frühere Gesamtwerte verraten keine einzelnen Antworten. Freie Texte bewertest du weiterhin selbst.','New mistakes are saved from now on; existing individual errors are imported. Earlier overall scores cannot identify individual answers. Free writing remains self-assessed.')}</p></details><label class="review-length" for="reviewCount">${tr('Umfang','Length')}<select id="reviewCount"><option value="10" ${count===10?'selected':''}>10 ${tr('Fragen','questions')}</option><option value="20" ${count===20?'selected':''}>20 ${tr('Fragen','questions')}</option></select></label><p id="reviewPoolInfo" class="muted" role="status"></p>${p.session?`<button class="primary-btn" id="reviewResume">${tr('Runde fortsetzen','Resume round')} · ${p.session.index+1}/${p.session.tasks.length}</button>`:''}<button class="${p.session?'secondary':'primary'}-btn" id="reviewStart">${p.session?tr('Neue Runde starten','Start a new round'):tr('Wiederholung starten','Start review')}</button><p class="muted">${tr('Deine Antworten werden gespeichert. Die Wiederholung verändert keine Lektionsbestwerte.','Your answers are saved. Review does not change lesson best scores.')}</p></section>`);
      function update(){
        view.querySelectorAll('[data-review-lesson]').forEach(el=>{
          const keys=groups.filter(g=>g.lessonId===Number(el.dataset.reviewLesson)).map(g=>g.lessonId+':'+g.topic),n=keys.filter(k=>selected.has(k)).length;
          el.checked=n===keys.length;el.indeterminate=n>0&&n<keys.length;
        });
        const n=choose(pool(),count).length;
        view.querySelector('#reviewMistakePanel').hidden=mode!=='mistakes';view.querySelector('#reviewTopics').hidden=mode!=='custom';view.querySelector('#reviewMistakeHint').hidden=mode!=='mistakes';view.querySelector('#reviewMistakeDetails').hidden=mode!=='mistakes';
        view.querySelector('#reviewPoolInfo').textContent=n?`${n} ${tr(n===1?'Frage in dieser Runde':'Fragen in dieser Runde',n===1?'question in this round':'questions in this round')}${n<count?' · '+tr('ohne doppelte Aufgaben','without duplicate tasks'):''}`:mode==='mistakes'?tr('Keine offenen Fehler. Du kannst eine gemischte Runde starten.','No mistakes pending. You can start a mixed round.'):tr('Wähle mindestens ein Thema aus einer abgeschlossenen Lektion.','Select at least one topic from a completed lesson.');
        if(!n&&mode==='mistakes'&&mistakeScope!=='open')view.querySelector('#reviewPoolInfo').textContent=mistakeScope==='resolved'?tr('Keine gefestigten Fehler vorhanden.','No consolidated mistakes yet.'):tr('Keine gespeicherten Fehler vorhanden.','No saved mistakes yet.');
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
        view.querySelector('#reviewPoolInfo').innerHTML=`${tr('Die neue Runde ersetzt deine laufende Runde. Gemerkte Fehler bleiben erhalten.','The new round replaces your current round. Saved mistakes are kept.')} <button class="tiny-btn" id="reviewReplace">${tr('Neue Runde bestätigen','Confirm new round')}</button>`;
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
      function show(){shell(`${heading()}<section class="card center"><h2 tabindex="-1">${tr('Runde abgeschlossen','Round complete')}</h2><div class="score">${right}/${s.tasks.length}</div>${window.A1DailyReview?.resultHtml(state,{lang:en()?'en':'de'})||''}<p>${tr('richtig beantwortet','correct answers')}</p><p class="muted">${pending(state).length} ${tr(pending(state).length===1?'Aufgabe bleibt zum gezielten Üben vorgemerkt.':'Aufgaben bleiben zum gezielten Üben vorgemerkt.',pending(state).length===1?'task remains for targeted practice.':'tasks remain for targeted practice.')}</p><div class="review-actions">${missed.length?`<button class="primary-btn" id="reviewErrors">${tr('Fehler dieser Runde üben','Practise this round’s mistakes')}</button>`:''}<button class="secondary-btn" id="reviewSetup">${tr('Neue Wiederholung zusammenstellen','Set up another review')}</button></div></section>`);
        view.querySelector('#reviewSetup').onclick=setup;view.querySelector('#reviewErrors')?.addEventListener('click',()=>{p.session={version:1,tasks:missed,index:0,answers:[],draft:'',mode:'mistakes',startedAt:Date.now()};save();draw();});
      }show();
    }
    function draw(){
      const s=p.session;if(!s?.tasks?.length)return setup();if(s.index>=s.tasks.length)return result();
      const q=s.tasks[s.index],answer=s.answers[s.index],lesson=lessons.find(l=>l.id===q.lessonId);
      s.order||=q.o?shuffle(q.o):null;
      redraw=()=>{if(view.querySelector('.review-practice'))draw();};
      shell(`${heading()}<section class="card" data-bug-task data-bug-lesson="${q.lessonId}" data-bug-step="review"><div class="between"><span class="pill">${s.index+1}/${s.tasks.length}</span><button class="tiny-btn" id="reviewPause">${tr('Pausieren','Pause')}</button></div><h2 tabindex="-1">${esc(translate(lesson?.title||tr('Zusätzliches Training','Extra practice')))}</h2><p class="muted">${esc(translate(q.label))}</p>${q.context?`<p class="mixed-context">${esc(en()&&q.contextEn?q.contextEn:translate(q.context))}</p>`:''}${q.turns||q.speech?window.A1ReviewAudio.html(en()?'en':'de'):''}<div class="quiz-q">${esc(translate(q.q))}</div>${q.kind==='choice'?`<div class="options">${s.order.map((o,i)=>`<button class="option-btn" data-review-option="${i}" ${answer?'disabled':''}>${esc(translate(o))}</button>`).join('')}</div><button class="primary-btn" id="reviewCheck" ${answer||!s.draft?'disabled':''}>${tr('Prüfen','Check')}</button>`:`<label for="reviewInput">${tr('Deine Antwort','Your answer')}</label><input class="mixed-input" id="reviewInput" lang="en" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(s.draft)}" ${answer?'disabled':''}>${window.A1ExerciseEngine.charBar('en',en()?'en':'de')}<button class="primary-btn" id="reviewCheck" ${answer?'disabled':''}>${tr('Prüfen','Check')}</button>`}<div id="reviewFeedback" role="status"></div></section>`);
      view.querySelector('#reviewPause').onclick=setup;
      reviewAudio=q.turns||q.speech?window.A1ReviewAudio.mount({root:view,turns:q.turns,speech:q.speech,targetLang:'en-GB',uiLang:en()?'en':'de'}):null;
      function mistakeProgress(){
        const item=p.items[q.id];if(!item||item.retired)return '';
        const message=item.streak>=2?tr('Gefestigt – aus den offenen Fehlern entfernt.','Consolidated — removed from open mistakes.'):item.streak===1?tr('Noch einmal richtig beantworten, dann ist diese Aufgabe gefestigt.','One more correct review will consolidate this task.'):tr('Diese Aufgabe bleibt zum Üben offen.','This task remains open for practice.');
        return `<p class="review-mistake-progress">${message} <span>${pending(state).length} ${tr('offen','open')}</span></p>`;
      }
      function feedback(a){
        view.querySelectorAll('[data-review-option]').forEach((el,i)=>{const o=s.order[i];el.disabled=true;el.classList.toggle('correct',o===q.answer);el.classList.toggle('wrong',o===a.value&&!a.ok);});
        view.querySelectorAll('#reviewInput,#reviewCheck,.mixed-char,.mixed-shift').forEach(el=>el.disabled=true);
        view.querySelector('#reviewFeedback').innerHTML=`<div class="feedback ${a.ok?'good':'bad'}"><strong>${a.ok?tr('✓ Richtig','✓ Correct'):tr('Richtig ist: ','Correct answer: ')+esc(translate(q.answer))}</strong>${q.explanation?`<p>${esc(en()&&q.explanationEn?q.explanationEn:translate(q.explanation))}</p>`:''}${q.audio?`<button class="tiny-btn" id="reviewAnswerAudio">🔊 ${tr('Anhören','Listen')}</button>`:''}</div>${mistakeProgress()}<button class="primary-btn" id="reviewNext">${s.index<s.tasks.length-1?tr('Weiter','Next'):tr('Ergebnis','Result')}</button>`;
        view.querySelector('#reviewAnswerAudio')?.addEventListener('click',()=>{cancel();speak(q.audio,true);});
        view.querySelector('#reviewNext').onclick=()=>{s.index++;s.draft='';delete s.order;save();draw();};
      }
      function check(value){
        if(s.answers[s.index]||!value.trim())return;
        const a={value,ok:accepted(q,value)};s.answers[s.index]=a;record(state,q,a.ok,true);save();cancel();feedback(a);view.querySelector("#reviewNext").focus();
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
