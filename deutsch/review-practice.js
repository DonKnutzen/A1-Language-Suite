/* Profile-scoped review of taught content. No external service or inferred grading. */
(() => {
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const copy=x=>JSON.parse(JSON.stringify(x));
  const en=()=>window.A1Profile?.getUiLang()==='en';
  const tr=(de,english)=>en()?english:de;
  const translate=s=>en()?(window.DE_A1_I18N?.translate(s)||s):s;
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
    const out={answerLang:q.skill==='recognition'?'fr':'de',lessonId:Number(lessonId),topic,label,q:prompt,answer,accept:q.accept||[],context:q.context||q.meaning||'',explanation:q.explanation||'',audio:q.audio||'',speech:q.speech||(q.type==='listening'?q.audio:'')||'',turns:q.turns||null,kind:choices?'choice':'gap',...(choices?{o:choices}:{}),...(q.marking?{marking:q.marking}:{})};
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
  const pending=state=>Object.values(store(state).items).filter(x=>x.task&&x.streak<2);
  function captureSession(state,lessonId,session,topic="lesson",label="Exercices de la leçon"){
    if(!session?.response||session.response.reviewRecorded)return;
    const q=session.ex?.[session.i];if(!q)return;
    record(state,task(lessonId||q.lessonId||0,topic,label,q),session.response.status==='ok');
    session.response.reviewRecorded=true;
  }
  function captureListening(state,lessonId,data,progress){
    if(!data||!progress?.graded||progress.reviewRecorded)return;
    data.fields.forEach((f,i)=>record(state,task(lessonId,'listening',"Compréhension orale",{q:f.label,answer:f.answer,o:f.options,turns:data.turns}),progress.answers[i]===f.answer));
    progress.reviewRecorded=true;
  }
  function captureHard(state,lessonId,data,attempt){
    if(!data||data.version<2||!attempt?.submittedAt||attempt.reviewRecorded)return;
    data.gaps.forEach((g,i)=>{
      const prompt=data.text.replace(/\{\{(\d+)\}\}/g,(_,n)=>Number(n)===i?'___':data.gaps[Number(n)].answers[0]);
      const q=task(lessonId,'hard-gap','Hard Mode · texte à trous',{q:prompt,context:g.hint,answer:g.answers[0],accept:g.answers.slice(1),marking:{format:g.format,strictAccents:g.strictAccents,numberWords:g.numberWords}});
      record(state,q,window.DE_A1_HARD_MODE.matches(attempt.gaps[i],g.answers,g));
    });
    let index=0;
    data.listening.forEach((block,b)=>block.questions.forEach(q=>{
      record(state,task(lessonId,'hard-listening','Hard Mode · compréhension orale',{q:q.q,answer:q.answers[0],accept:q.answers.slice(1),o:q.options,turns:window.DE_A1_HARD_AUDIO.turns(lessonId,data,b),marking:{format:q.format,strictAccents:q.strictAccents,numberWords:q.numberWords}}),window.DE_A1_HARD_MODE.matches(attempt.listening[index++],q.answers,q));
    }));
    attempt.reviewRecorded=true;
  }
  function seed(state){
    const p=store(state);if(p.imported)return;
    for(const [id,w]of Object.entries(state.lessonWork||{})){
      captureSession(state,id,w.session);
      captureListening(state,id,window.A1_COMPREHENSION_CONTENT?.[id],w.comprehension);
      for(const [key,value]of Object.entries(w.deepening||{}))for(const q of value.session?.mistakes||[])record(state,task(id,'grammar:'+key,'Grammatik',q),false);
      const h=w.hardMode,a=h?.attempt,d=h?.contentVersions?.[a?.version]||(window.DE_A1_HARD_CONTENT?.[id]?.version===a?.version?window.DE_A1_HARD_CONTENT[id]:null);
      captureHard(state,id,d,a);
    }
    for(const [id,p]of Object.entries(state.lessonCheckProgress||{}))captureSession(state,id,p.session,'check','Bilan de la leçon');
    for(const [id,groups]of Object.entries(state.lessonGrammarPractice||{}))for(const [key,p]of Object.entries(groups))captureSession(state,id,p.session,'grammar:'+key,'Grammaire');
    for(const p of Object.values(state.courseCheckProgress||{}))captureSession(state,0,p.session,'course-check','Bilan du cours');
    for(const [id,p]of Object.entries(state.grammarCheckProgress||{}))captureSession(state,id,p.session,'grammar-check','Test final');
    p.imported=true;
  }
  function buildBank(lessons,state,grammarHtml){
    const out=[];
    for(const l of lessons.filter(l=>state.doneLessons.includes(l.id))){
      const root=document.createElement('div');root.innerHTML=grammarHtml(l);
      root.querySelectorAll('details.grammar-detail').forEach(el=>{
        const pool=window.DE_A1_ASSESSMENTS.topicPractice({html:el.outerHTML,title:el.querySelector('summary')?.textContent||''});
        if(pool)for(const q of pool.tasks){const t=task(l.id,'grammar:'+pool.key,pool.title,q);if(t)out.push(t);}
      });
    }
    return [...new Map(out.map(q=>[q.id,q])).values()];
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
  function choose(pool,count){
    // Deduplicate the same task across grammar topics, then balance lesson/topic buckets.
    const distinct=new Map();
    for(const q of shuffle(pool)){const key=JSON.stringify([q.lessonId,q.q,q.context,q.answer,q.turns,q.speech]);if(!distinct.has(key))distinct.set(key,q);}
    const groups=new Map();
    for(const q of distinct.values()){const key=q.lessonId+':'+q.topic;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(q);}
    const buckets=shuffle([...groups.values()]),picked=[];
    while(picked.length<count&&buckets.some(b=>b.length))for(const b of buckets){if(b.length&&picked.length<count)picked.push(b.pop());}
    return window.DE_A1_ASSESSMENTS.spreadAnswers?window.DE_A1_ASSESSMENTS.spreadAnswers(picked):picked;
  }
  function accepted(q,value){
    if(q.kind==='choice')return value===q.answer;
    if(q.marking)return window.DE_A1_HARD_MODE.matches(value,[q.answer,...q.accept],q.marking);
    return window.DE_A1_HARD_MODE.matches(value,[q.answer,...q.accept],{strictAccents:true});
  }
  let redraw=null;
  window.addEventListener('a1suite:languagechange',()=>redraw?.());
  function render({view,lessons,state,save,onBack,speak,grammarHtml,initialMode}){
    seed(state);const p=store(state);restrictRound(p);const bank=buildBank(lessons,state,grammarHtml);
    const selectable=bank;
    const topicKeys=new Set(selectable.map(q=>q.lessonId+':'+q.topic));
    let mode=['mixed','custom','mistakes'].includes(initialMode)?initialMode:p.settings?.mode||'mixed',count=p.settings?.count===20?20:10,selected=new Set((p.settings?.selected||[...topicKeys]).filter(key=>topicKeys.has(key)));
    const cancel=()=>window.A1Voice?.cancel();
    const finishBack=()=>{cancel();redraw=null;onBack();};
    const shell=html=>{cancel();view.innerHTML=`<div class="review-practice" data-i18n-ignore>${html}</div>`;view.querySelector('#reviewBack')?.addEventListener('click',finishBack);view.querySelector('h2')?.focus();window.scrollTo({top:0,behavior:'instant'});};
    const heading=()=>`<div class="between"><button class="tiny-btn" id="reviewBack">← ${tr("Accueil",'Home')}</button><span class="pill">${tr("RÉVISION",'REVIEW')}</span></div>`;
    function saveSettings(){p.settings={mode,count,selected:[...selected]};save();}
    function pool(){return mode==='mistakes'?pending(state).map(x=>x.task):mode==='custom'?selectable.filter(q=>selected.has(q.lessonId+':'+q.topic)):bank;}
    function setup(){
      redraw=()=>{if(view.querySelector('.review-practice'))setup();};
      const groups=[...new Map(selectable.map(q=>[q.lessonId+':'+q.topic,q])).values()];
      shell(`${heading()}<section class="card"><h2 tabindex="-1">${tr("Consolider les acquis",'Practise what you have learned')}</h2><p class="muted">${tr("Révise les thèmes étudiés dans les leçons terminées ou retravaille tes erreurs enregistrées.",'Review grammar topics from completed lessons or practise your saved mistakes.')}</p>${p.grammarPoolUpdated?`<p class="muted">${tr("Les rondes en cours utilisent désormais les thèmes de grammaire.",'Ongoing topic rounds now contain grammar tasks only.')}</p>`:''}<fieldset class="review-modes"><legend>${tr("Que veux-tu pratiquer ?",'What would you like to practise?')}</legend>${[['mixed',tr("Tout mélanger",'Mix everything'),tr("Les thèmes des leçons terminées.",'Grammar from your completed lessons.')],['custom',tr("Choisir les thèmes",'Choose topics'),tr("Choisir des leçons et des thèmes précis.",'Select individual lessons and topics.')],['mistakes',tr("Retravailler mes erreurs",'Practise mistakes'),`${pending(state).length} ${tr(pending(state).length===1?"exercice à revoir":"exercices à revoir",pending(state).length===1?'task to review':'tasks to review')}`]].map(([id,label,hint])=>`<label class="review-mode"><input type="radio" name="review-mode" value="${id}" ${mode===id?'checked':''}><span><strong>${label}</strong><small>${hint}</small></span></label>`).join('')}</fieldset><div id="reviewTopics" ${mode==='custom'?'':'hidden'}><div class="review-select-actions"><button class="tiny-btn" id="reviewAll">${tr("Tout sélectionner",'Select all')}</button><button class="tiny-btn" id="reviewNone">${tr("Tout désélectionner",'Clear selection')}</button></div>${lessons.filter(l=>groups.some(g=>g.lessonId===l.id)).map(l=>`<details class="review-lesson"><summary>${l.id}. ${esc(translate(l.title))}</summary><label><input type="checkbox" data-review-lesson="${l.id}">${tr("Alle Themen dieser Lektion","All topics in this lesson")}</label>${groups.filter(g=>g.lessonId===l.id).map(g=>`<label><input type="checkbox" data-review-topic="${g.lessonId}:${esc(g.topic)}" ${selected.has(g.lessonId+':'+g.topic)?'checked':''}>${esc(translate(g.label))}</label>`).join('')}</details>`).join('')}</div><p class="muted" id="reviewMistakeHint" ${mode==='mistakes'?'':'hidden'}>${tr("Deux réponses correctes consécutives en révision : l’exercice est alors consolidé.",'Answer correctly in two successive reviews to clear a task.')}</p><details id="reviewMistakeDetails" ${mode==='mistakes'?'':'hidden'}><summary>${tr("Quelles erreurs sont enregistrées ?",'Which mistakes are saved?')}</summary><p class="muted">${tr("Les nouvelles erreurs sont enregistrées dès maintenant. Les réponses encore disponibles sont reprises ; les anciens scores globaux ne permettent pas de retrouver chaque erreur. Tes textes restent auto-évalués.",'New mistakes are saved from now on; existing individual errors are imported. Earlier overall scores cannot identify individual answers. Free writing remains self-assessed.')}</p></details><label class="review-length" for="reviewCount">${tr("Longueur",'Length')}<select id="reviewCount"><option value="10" ${count===10?'selected':''}>10 ${tr("questions",'questions')}</option><option value="20" ${count===20?'selected':''}>20 ${tr("questions",'questions')}</option></select></label><p id="reviewPoolInfo" class="muted" role="status"></p>${p.session?`<button class="primary-btn" id="reviewResume">${tr("Continuer la ronde",'Resume round')} · ${p.session.index+1}/${p.session.tasks.length}</button>`:''}<button class="${p.session?'secondary':'primary'}-btn" id="reviewStart">${p.session?tr("Nouvelle ronde",'Start a new round'):tr("Commencer la révision",'Start review')}</button><p class="muted">${tr("Tes réponses sont enregistrées. La révision ne modifie pas les meilleurs scores des leçons.",'Your answers are saved. Review does not change lesson best scores.')}</p></section>`);
      function update(){
        view.querySelectorAll('[data-review-lesson]').forEach(el=>{
          const keys=groups.filter(g=>g.lessonId===Number(el.dataset.reviewLesson)).map(g=>g.lessonId+':'+g.topic),n=keys.filter(k=>selected.has(k)).length;
          el.checked=n===keys.length;el.indeterminate=n>0&&n<keys.length;
        });
        const n=choose(pool(),count).length;
        view.querySelector('#reviewTopics').hidden=mode!=='custom';view.querySelector('#reviewMistakeHint').hidden=mode!=='mistakes';view.querySelector('#reviewMistakeDetails').hidden=mode!=='mistakes';
        view.querySelector('#reviewPoolInfo').textContent=n?`${n} ${tr(n===1?"question dans cette ronde":"questions dans cette ronde",n===1?'question in this round':'questions in this round')}${n<count?' · '+tr("sans doublons",'without duplicate tasks'):''}`:mode==='mistakes'?tr("Aucune erreur à retravailler. Tu peux commencer une ronde mélangée.",'No mistakes pending. You can start a mixed round.'):tr("Choisis au moins un thème d’une leçon terminée.",'Select at least one topic from a completed lesson.');
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
      view.querySelector('#reviewCount').onchange=e=>{count=Number(e.target.value);update();};
      view.querySelector('#reviewResume')?.addEventListener('click',draw);
      view.querySelector('#reviewStart').onclick=()=>{
        const start=()=>{delete p.grammarPoolUpdated;p.session={version:1,tasks:choose(pool(),count).map(copy),index:0,answers:[],draft:'',mode,startedAt:Date.now()};save();draw();};
        if(!p.session)return start();
        view.querySelector('#reviewPoolInfo').innerHTML=`${tr("La nouvelle ronde remplace celle en cours. Les erreurs enregistrées sont conservées.",'The new round replaces your current round. Saved mistakes are kept.')} <button class="tiny-btn" id="reviewReplace">${tr("Confirmer la nouvelle ronde",'Confirm new round')}</button>`;
        view.querySelector('#reviewReplace').onclick=start;
      };
      update();
    }
    function result(){
      const s=p.session,right=s.answers.filter(a=>a.ok).length;
      p.lastResult={right,total:s.tasks.length,finishedAt:Date.now()};delete p.session;save(true);
      const missed=s.tasks.filter((q,i)=>!s.answers[i].ok);
      redraw=()=>{if(view.querySelector('.review-practice'))show();};
      function show(){shell(`${heading()}<section class="card center"><h2 tabindex="-1">${tr("Ronde terminée",'Round complete')}</h2><div class="score">${right}/${s.tasks.length}</div><p>${tr("réponses correctes",'correct answers')}</p><p class="muted">${pending(state).length} ${tr(pending(state).length===1?"exercice reste à retravailler.":"exercices restent à retravailler.",pending(state).length===1?'task remains for targeted practice.':'tasks remain for targeted practice.')}</p><div class="review-actions">${missed.length?`<button class="primary-btn" id="reviewErrors">${tr("Retravailler les erreurs de cette ronde",'Practise this round’s mistakes')}</button>`:''}<button class="secondary-btn" id="reviewSetup">${tr("Préparer une autre révision",'Set up another review')}</button></div></section>`);
        view.querySelector('#reviewSetup').onclick=setup;view.querySelector('#reviewErrors')?.addEventListener('click',()=>{p.session={version:1,tasks:missed,index:0,answers:[],draft:'',mode:'mistakes',startedAt:Date.now()};save();draw();});
      }show();
    }
    function draw(){
      const s=p.session;if(!s?.tasks?.length)return setup();if(s.index>=s.tasks.length)return result();
      const q=s.tasks[s.index],answer=s.answers[s.index],lesson=lessons.find(l=>l.id===q.lessonId);
      s.order||=q.o?shuffle(q.o):null;
      redraw=()=>{if(view.querySelector('.review-practice'))draw();};
      shell(`${heading()}<section class="card" data-bug-task data-bug-lesson="${q.lessonId}" data-bug-step="review"><div class="between"><span class="pill">${s.index+1}/${s.tasks.length}</span><button class="tiny-btn" id="reviewPause">${tr("Pause",'Pause')}</button></div><h2 tabindex="-1">${esc(translate(lesson?.title||tr("Entraînement supplémentaire",'Extra practice')))}</h2><p class="muted">${esc(translate(q.label))}</p>${q.context?`<p class="mixed-context">${esc(translate(q.context))}</p>`:''}${q.turns||q.speech?`<button class="secondary-btn" id="reviewListen">▶ ${tr("Écouter · 75 %",'Listen · 75%')}</button><p role="status" id="reviewAudioStatus"></p>`:''}<div class="quiz-q">${esc(translate(q.q))}</div>${q.kind==='choice'?`<div class="options">${s.order.map((o,i)=>`<button class="option-btn" lang="${q.answerLang||'de'}" data-review-option="${i}" ${answer?'disabled':''}>${esc(translate(o))}</button>`).join('')}</div>`:`<label for="reviewInput">${tr("Ta réponse",'Your answer')}</label><input class="mixed-input" id="reviewInput" lang="de" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(s.draft)}" ${answer?'disabled':''}>${window.A1ExerciseEngine.charBar('de',en()?'en':'de')}<button class="primary-btn" id="reviewCheck" ${answer?'disabled':''}>${tr("Vérifier",'Check')}</button>`}<div id="reviewFeedback" role="status"></div></section>`);
      view.querySelector('#reviewPause').onclick=setup;
      const audio=view.querySelector('#reviewListen');
      if(audio)audio.onclick=()=>{
        cancel();audio.disabled=true;
        const restore=()=>{if(audio.isConnected)audio.disabled=false;};
        const error=()=>{restore();if(audio.isConnected)view.querySelector('#reviewAudioStatus').textContent=tr("Échec de la lecture. Réessaie.",'Playback failed. Please try again.');};
        const opts={lang:'de-DE',rate:.75,onEnd:restore,onError:error};
        const started=q.turns?window.A1Voice?.speakDialogue(q.turns,opts):window.A1Voice?.speak(q.speech,opts);if(started===false)error();
      };
      function feedback(a){
        view.querySelectorAll('[data-review-option]').forEach((el,i)=>{const o=s.order[i];el.disabled=true;el.classList.toggle('correct',o===q.answer);el.classList.toggle('wrong',o===a.value&&!a.ok);});
        view.querySelectorAll('#reviewInput,#reviewCheck,.mixed-char,.mixed-shift').forEach(el=>el.disabled=true);
        view.querySelector('#reviewFeedback').innerHTML=`<div class="feedback ${a.ok?'good':'bad'}"><strong>${a.ok?tr("✓ Correct",'✓ Correct'):tr("Bonne réponse : ",'Correct answer: ')+esc(translate(q.answer))}</strong>${q.explanation?`<p>${esc(translate(q.explanation))}</p>`:''}${q.audio?`<button class="tiny-btn" id="reviewAnswerAudio">🔊 ${tr("Écouter",'Listen')}</button>`:''}</div><button class="primary-btn" id="reviewNext">${s.index<s.tasks.length-1?tr("Suivant",'Next'):tr("Résultat",'Result')}</button>`;
        view.querySelector('#reviewAnswerAudio')?.addEventListener('click',()=>speak(q.audio,true));
        view.querySelector('#reviewNext').onclick=()=>{s.index++;s.draft='';delete s.order;save();draw();};
      }
      function check(value){
        if(s.answers[s.index]||!value.trim())return;
        const a={value,ok:accepted(q,value)};s.answers[s.index]=a;record(state,q,a.ok,true);save();cancel();feedback(a);view.querySelector("#reviewNext").focus();
      }
      view.querySelectorAll('[data-review-option]').forEach((el,i)=>el.onclick=()=>check(s.order[i]));
      const input=view.querySelector('#reviewInput');
      if(input){
        input.oninput=()=>{s.draft=input.value;save();};
        window.A1ExerciseEngine.wireChars(input,'de',view);
        view.querySelector('#reviewCheck').onclick=()=>check(input.value);input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();check(input.value);}};
      }
      if(answer)feedback(answer);save();
    }
    setup();
  }
  window.DE_A1_REVIEW={task,record,pending,captureSession,captureListening,captureHard,seed,buildBank,choose,accepted,render};
})();
