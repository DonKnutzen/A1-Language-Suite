/* Compact German A1 lesson steps share the existing saved course state. */
(() => {
  'use strict';
  const UI={fr:{back:'← Leçons',overview:'← Contenu',start:'Commencer les 10 exercices variés',apply:'Pratiquer à l’oral et à l’écrit',part:'PARTIE 2 · À TOI DE PRATIQUER',speak:'À l’oral',write:'À l’écrit',dialogueHelp:'Aide',quiz:'10 exercices',done:'Terminé',open:'À faire',complete:'Leçon terminée',requirements:'Pour terminer : au moins 70 % aux dix exercices, puis les tâches à l’oral et à l’écrit.',instruction:'Réponds à voix haute. Tu peux t’enregistrer ou pratiquer sans micro. Compare ensuite avec l’exemple et vérifie si tu as répondu à la consigne.',aloud:'J’ai répondu à la consigne à voix haute.',showOral:'Comparer avec l’exemple oral',example:'Réponse possible',blocks:'Exemples utiles',listen:'Écouter l’exemple',self:'Ma réponse respecte la consigne.',again:'↻ Réessayer',good:'✓ Terminer la tâche orale',compare:'Comparer avec l’exemple écrit',checkPoints:'J’ai répondu à tous les points de la consigne.',checkLanguage:'J’ai vérifié ma réponse avec l’exemple.',writeGood:'✓ Terminer la tâche écrite',answer:'Ta réponse',placeholder:'Écris ta propre réponse…',min:'Nombre minimal de mots',short:'Fais d’abord la tâche écrite avec une réponse suffisante.',writeNext:'Passer à la tâche écrite ↓',next:'Leçon suivante',all:'Voir les leçons',remaining:'Termine les parties restantes pour compléter la leçon.',retry:'Il faut au moins 70 %. Tes tâches personnelles restent enregistrées.',quizAgain:'Refaire les 10 exercices',best:'Meilleur résultat',dictate:'Écouter le nom épelé',dictateTip:'Écoute le nom épelé et écris-le. La solution apparaît après la comparaison.',writeHelp:'Aide',writeHelpText:'Utilise ces blocs de phrase. Tu peux adapter le nom, le lieu, l’heure ou le nombre.',noGrade:'Tu évalues tes propres réponses libres. Il n’y a pas de correction automatique de la langue.',saved:'✓ Auto-évalué et enregistré.',unavailable:'Micro non disponible. Réponds à voix haute sans enregistrement et confirme ci-dessous.',denied:'Micro inaccessible. Tu peux pratiquer sans enregistrement.',recording:'● Enregistrement en cours…',recorded:'Enregistrement terminé. Écoute ta réponse et compare-la.',empty:'Aucun enregistrement. Réessaie.',core:'Contenu de la leçon',old:'Cette leçon était déjà terminée. Tu peux pratiquer les nouvelles tâches en complément.',plan:'Contenu de la leçon',listenDeepen:'Écouter & approfondir',interactive:'10 exercices interactifs',practical:'Mise en pratique',audioExamples:'Exemples audio & répétition',listenStep:'Écoute',quizStep:'Exercices',practiceStep:'Pratique'}};
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  function listProgress(lesson,state,uiLang='de'){
    const L=UI.fr;
    const p=(state.lessonWork&&typeof state.lessonWork==='object'&&!Array.isArray(state.lessonWork)&&state.lessonWork[lesson.id]&&typeof state.lessonWork[lesson.id]==='object')?state.lessonWork[lesson.id]:{};
    const audioTargets=[...new Set((lesson.phrases||[]).map(x=>x?.[0]).filter(Boolean))];
    const heardSet=new Set(Array.isArray(p.heardPhrases)?p.heardPhrases.filter(v=>typeof v==='string'):[]);
    const heard=audioTargets.filter(x=>heardSet.has(x)).length,total=audioTargets.length;
    const audioDone=total>0&&heard>=total;
    const best=Number(state.lessonQuizBest?.[lesson.id]||0);
    const application=Number(p.speakingDone===true)+Number(p.writingDone===true);
    const quizScore=Math.max(0,Math.min(10,Math.round(best/10)));
    const quizDone=best>=70;
    const complete=state.doneLessons?.includes(lesson.id)||(quizDone&&application===2);
    const masteryBest=Number(state.lessonMasteryBest?.[lesson.id]||0);
    const masteryDone=Object.prototype.hasOwnProperty.call(state.lessonMasteryLast||{},lesson.id);
    const step=(label,value,done)=>`<span class="lesson-list-step ${done?'done':''}"><small>${esc(label)}</small><strong>${esc(value)}</strong></span>`;
    return `<div class="lesson-list-progress" aria-label="${esc(L.plan)}">${step(L.listenStep,audioDone?'✓':`${heard}/${total}`,audioDone)}${step(L.quizStep,p.quizDone===true?`${quizScore}/10`:'—',quizDone)}${step(L.practiceStep,application===2?'✓':`${application}/2`,application===2)}${step('Bilan',masteryBest?masteryBest+' %':'—',masteryDone)}${complete&&masteryDone?'<span class="lesson-list-complete" aria-label="Bilan effectué">✓</span>':''}</div>`;
  }
  function render(opts){
    const {lesson:l,content:c,view,state}=opts,L=UI.fr;
    const hasGrammarCheck=Number(l.id)===1;
    if(!state.lessonWork||typeof state.lessonWork!=='object'||Array.isArray(state.lessonWork))state.lessonWork={};
    const valid=state.lessonWork[l.id];
    const p=state.lessonWork[l.id]=valid&&typeof valid==='object'&&!Array.isArray(valid)?valid:{};
    if(!Array.isArray(p.heardPhrases))p.heardPhrases=[];
    const legacy=state.doneLessons.includes(l.id);
    const recId='LessonApply'+l.id;
    const best=()=>Number(state.lessonQuizBest[l.id]||0);
    const passed=()=>best()>=70;
    const complete=()=>legacy||(passed()&&p.speakingDone===true&&p.writingDone===true);
    const hasMastery=typeof opts.renderMastery==='function';
    const masteryBest=()=>Number(state.lessonMasteryBest?.[l.id]||0);
    const masteryAttempted=()=>!!(state.lessonMasteryLast&&Object.prototype.hasOwnProperty.call(state.lessonMasteryLast,l.id));
    const masteryPassed=()=>masteryAttempted();
    const model=String(opts.model||'').replace(/\\n/g,'\n');
    const writingModel=String(opts.writingModel||model).replace(/\\n/g,'\n');
    const explicit=c.transfer.writing.match(/(\d+)\s*(?:[–-]\s*\d+\s*)?(?:Wörter|mots|kelime|palabras)/i);
    const minWords=explicit?Number(explicit[1]):opts.targetLang==='fr'&&l.id===2?1:3;
    let comparedText=null;
    const steps=[['listen','Écouter & comprendre'],['grammar','Grammaire'],...(hasGrammarCheck?[['grammar-check','Test final']]:[]),['speak','Oral'],['write','Écriture'],...(hasMastery?[['check','Bilan de la leçon']]:[])];
    let activeStep='listen',grammarIndex=0,audioPage=0,audioLayoutObserver=null;
    const audioPageCount=Math.max(1,Math.ceil(l.phrases.length/6));
    const grammarSource=document.createElement('div');
    grammarSource.innerHTML=opts.grammarHtml||'';
    const grammarRoot=grammarSource.querySelector('.lesson-deepening')||grammarSource;
    const grammarTopics=[...grammarRoot.querySelectorAll('details.grammar-detail')];
    const basicElements=[...grammarRoot.children].filter(el=>el.tagName!=='SUMMARY'&&!el.matches('details.grammar-detail'));
    const grammarBasics=basicElements.map(el=>el.outerHTML).join('');
    const intro=basicElements.filter(el=>!el.matches('.lesson-deepening-title')).map(el=>el.outerHTML).join('');
    // Pronouns are a real first topic in lesson 1; other intros belong with the first explanation.
    if(grammarTopics.length){
      const firstBody=grammarTopics[0].querySelector('.grammar-detail-body')||grammarTopics[0];
      firstBody.insertAdjacentHTML('afterbegin',intro);
    }
    const grammarPages=[...(!grammarTopics.length?[{title:c.grammar.title,html:grammarBasics}]:[]),...grammarTopics.map(el=>({title:el.querySelector('summary')?.textContent.trim().replace(/ – .*/, '')||'Grammaire',html:el.outerHTML}))];
    const grammarPractices=grammarPages.map(page=>DE_A1_ASSESSMENTS.topicPractice(page));
    function grammarPracticeKey(i){return grammarPractices[i]?.key;}
    function grammarTopicDone(i){
      const key=grammarPracticeKey(i);
      return key?state.lessonGrammarPractice?.[l.id]?.[key]?.done===true:Array.isArray(p.grammarReadPages)&&p.grammarReadPages.includes(i);
    }
    function markGrammarRead(){
      if(grammarPracticeKey(grammarIndex)||grammarTopicDone(grammarIndex))return;
      if(!Array.isArray(p.grammarReadPages))p.grammarReadPages=[];
      p.grammarReadPages.push(grammarIndex);save();
    }
    function goGrammarTopic(index,focus=false){
      if(!Number.isInteger(index)||index<0||index>=grammarPages.length||index===grammarIndex)return;
      if(index>grammarIndex)markGrammarRead();
      grammarIndex=index;drawOverview();
      if(focus)view.querySelector(`[data-grammar-progress="${index}"]`)?.focus({preventScroll:true});
    }
    function stepDone(key){
      return {listen:audioTargets().length>0&&heardCount()===audioTargets().length&&passed(),grammar:grammarPages.every((_,i)=>grammarTopicDone(i)),'grammar-check':hasGrammarCheck&&DE_A1_ASSESSMENTS.grammarCheckTried(state),speak:p.speakingDone===true,write:p.writingDone===true,check:masteryPassed()}[key];
    }
    function stepNav(){
      return `<div class="lesson-step-context"><strong>${esc(steps.find(([key])=>key===activeStep)[1])}</strong><small>${steps.findIndex(([key])=>key===activeStep)+1} / ${steps.length}</small></div><nav class="lesson-step-nav" aria-label="Étapes de la leçon">${steps.map(([key,label],i)=>`<button type="button" class="lesson-step ${activeStep===key?'active':''} ${stepDone(key)?'done':''}" data-lesson-step="${key}" aria-label="${i+1}. ${esc(label)}${stepDone(key)?' · terminé':''}" title="${esc(label)}" ${activeStep===key?'aria-current="step"':''}><span class="lesson-step-number">${stepDone(key)?'✓':i+1}</span><span class="lesson-step-label">${esc(label)}</span></button>`).join('')}</nav>`;
    }
    function stepHead(){
      return `<div class="lesson-back-row"><button class="tiny-btn lesson-back-link" id="backLearn">${esc(L.back)}</button></div><header class="lesson-step-header"><h2>${l.id}. ${esc(l.title)}</h2>${stepNav()}</header>`;
    }
    function refreshSteps(){
      const nav=view.querySelector('.lesson-step-nav');if(nav){view.querySelector('.lesson-step-context')?.remove();nav.outerHTML=stepNav();}wireStepNav();
      view.querySelectorAll('[data-grammar-progress]').forEach(segment=>{
        const i=Number(segment.dataset.grammarProgress),done=grammarTopicDone(i);
        segment.classList.toggle('done',done);segment.querySelector('.lesson-topic-number').textContent=done?'✓':'';
        segment.setAttribute('aria-label',`${grammarPages[i].title}${done?' · terminé':''}${i===grammarIndex?' · actuel':''}`);
      });
    }
    function wireStepNav(){view.querySelectorAll('[data-lesson-step]').forEach(btn=>btn.onclick=()=>goStep(btn.dataset.lessonStep));}
    function stepFooter(){
      const i=steps.findIndex(([key])=>key===activeStep),next=steps[i+1];
      if(activeStep==='grammar')return `<div class="lesson-step-footer">${grammarIndex?`<button class="secondary-btn" id="previousGrammarTopic">← Retour</button>`:'<button class="secondary-btn" id="previousLessonStep">← Retour</button>'}${grammarIndex<grammarPages.length-1?`<button class="primary-btn" id="nextGrammarTopic">Suivant : ${esc(grammarPages[grammarIndex+1].title)} →</button>`:next?`<button class="primary-btn" id="nextLessonStep">Suivant : ${esc(next[1])} →</button>`:''}</div>`;
      return `<div class="lesson-step-footer">${i?'<button class="secondary-btn" id="previousLessonStep">← Retour</button>':''}${next?`<button class="primary-btn" id="nextLessonStep">Suivant : ${esc(next[1])} →</button>`:''}</div>`;
    }
    function wireStepFooter(){
      document.getElementById('backLearn').onclick=opts.renderLearn;wireStepNav();
      const i=steps.findIndex(([key])=>key===activeStep);
      document.getElementById('previousGrammarTopic')?.addEventListener('click',()=>goGrammarTopic(grammarIndex-1));
      document.getElementById('nextGrammarTopic')?.addEventListener('click',()=>goGrammarTopic(grammarIndex+1));
      view.querySelectorAll('[data-grammar-progress]').forEach(btn=>btn.onclick=()=>goGrammarTopic(Number(btn.dataset.grammarProgress),true));
      document.getElementById('previousLessonStep')?.addEventListener('click',()=>goStep(steps[i-1][0]));
      document.getElementById('nextLessonStep')?.addEventListener('click',()=>goStep(steps[i+1][0]));
    }
    function expandContent(root){
      // Explanations stay visible; answers and self-check solutions keep their reveal controls.
      [...root.querySelectorAll('details')].reverse().forEach(detail=>{
        const section=document.createElement('section');section.className=detail.className;
        const summary=detail.querySelector(':scope > summary');
        if(summary){const heading=document.createElement('h3');heading.className='lesson-content-heading';heading.innerHTML=summary.innerHTML;section.appendChild(heading);summary.remove();}
        section.append(...detail.childNodes);detail.replaceWith(section);
      });
    }
    function goStep(key){
      if(!steps.some(([id])=>id===key))return;
      if(activeStep==='grammar'&&steps.findIndex(([id])=>id===key)>steps.findIndex(([id])=>id==='grammar'))markGrammarRead();
      activeStep=key;
      if(key==='speak'||key==='write')drawApplication();else drawOverview();
    }
    function save(completed=false){
      if(passed()&&p.speakingDone===true&&p.writingDone===true&&!state.doneLessons.includes(l.id))state.doneLessons.push(l.id);
      opts.save(completed);
    }
    function statuses(){const rows=[[L.quiz,passed()],[L.speak,p.speakingDone===true],[L.write,p.writingDone===true]];if(hasMastery)rows.push(['Bilan',masteryPassed()]);return `<div class="lesson-part-status" aria-label="${esc(L.apply)}">${rows.map(([label,done])=>`<span class="pill ${done?'green':'gray'}">${done?'✓':'○'} ${esc(label)}</span>`).join('')}</div>`;}
    function audioTargets(){return [...new Set((l.phrases||[]).map(x=>x?.[0]).filter(Boolean))];}
    function heardCount(){const heard=new Set(p.heardPhrases);return audioTargets().filter(x=>heard.has(x)).length;}
    function taskPrompt(text,kind){
      let html=esc(text);
      if(l.id===1){
        const highlights=kind==='speak'?['Présente-toi en quatre phrases','les questions pour demander le nom et la ville']:['quatre phrases','heißen, kommen, wohnen et sprechen'];
        for(const part of highlights)html=html.replace(esc(part),`<strong>${esc(part)}</strong>`);
      }
      return `<span class="lesson-task-label">Consigne :</span> ${html}`;
    }
    function dialogueHelp(){
      const raw=String(opts.dialogueHtml||'');
      if(!raw.trim())return '';
      const body=raw
        .replace(/<summary>[\s\S]*?<\/summary>/,'')
        .replace(/<details[^>]*>/g,'')
        .replace(/<\/details>/g,'')
        .trim();
      if(!body)return '';
      return `<button class="soft-btn lesson-help-toggle" id="speechHelpBtn" aria-expanded="false" aria-controls="speechHelp">💡 ${esc(L.dialogueHelp)}</button><div class="lesson-writing-help lesson-help-content" id="speechHelp" hidden>${body}</div>`;
    }
    function drawMastery(){
      if(!hasMastery)return;
      window.A1Voice?.cancel();
      opts.renderMastery({onBack:()=>goStep('check')});
    }
    function refresh(){
      document.getElementById('lessonPartStatus').innerHTML=statuses();
      refreshSteps();
      const next=document.getElementById('nextLesson');next.disabled=!complete();
      const masteryBtn=document.getElementById('startMasteryFromApplication');if(masteryBtn)masteryBtn.disabled=!complete();
      document.getElementById('lessonCompletion').textContent=complete()?(hasMastery&&!masteryPassed()?'Pratique terminée · bilan à faire':L.complete):!passed()?L.retry:L.remaining;
      document.getElementById('continueWriting').hidden=p.speakingDone!==true;
      for(const [id,done] of [['oralStatus',p.speakingDone],['writingStatus',p.writingDone]]){
        const e=document.getElementById(id);e.textContent=done===true?'✓ '+L.done:L.open;e.className='pill '+(done===true?'green':'gray');
      }
    }
    function drawOverview(){
      audioLayoutObserver?.disconnect();
      window.A1Voice?.cancel();
      if(p.heardPhrases.some(v=>typeof v!=='string')){p.heardPhrases=p.heardPhrases.filter(v=>typeof v==='string');save();}
      const heardSet=new Set(p.heardPhrases);
      const corePhrases=`<section class="lesson-core-phrases"><div class="between"><h3>${esc(L.audioExamples)}</h3><small class="lesson-audio-page">${heardCount()} / ${l.phrases.length} écoutés</small></div><div class="lesson-audio-rows">${l.phrases.map(([target,native],i)=>{return `<div class="phrase-row lesson-core-phrase ${heardSet.has(target)?'is-heard':''}" data-core-row="${i}"><div><strong>${esc(target)}</strong><small>${esc(native)}</small></div>${opts.speakBtn(target).replace('<button ',`<button data-core-phrase-index="${i}" `)}</div>`;}).join('')}</div>${audioPageCount>1?`<div class="lesson-audio-pager"><button type="button" class="tiny-btn" id="previousAudioPage" aria-label="Exemples précédents">←</button><small id="audioPageStatus" aria-live="polite"></small><button type="button" class="tiny-btn" id="nextAudioPage" aria-label="Exemples suivants">→</button></div>`:''}</section>`;
      let body='';
      if(activeStep==='listen')body=`${opts.goalsHtml||opts.introHtml||''}<section class="card lesson-step-content">${corePhrases}<div class="lesson-listening-practice">${p.quizDone?`<p class="muted">Meilleur résultat : ${best()} %</p>`:''}<button class="primary-btn exercise-start-btn" id="startQuiz">Exercices de la leçon · 10 questions</button></div><div class="lesson-pronunciation-bonus">${opts.pronunciationHtml||''}</div></section>`;
      if(activeStep==='grammar')body=`<section class="card lesson-step-content"><div class="lesson-grammar-position"><nav class="lesson-grammar-progress" aria-label="Progression en grammaire">${grammarPages.map((page,i)=>`<button type="button" class="lesson-grammar-segment ${i===grammarIndex?'active':''} ${grammarTopicDone(i)?'done':''}" data-grammar-progress="${i}" aria-controls="lessonGrammarPage" aria-label="${esc(page.title)}${grammarTopicDone(i)?' · terminé':''}${i===grammarIndex?' · actuel':''}" ${i===grammarIndex?'aria-current="step"':''}><span class="lesson-topic-number" aria-hidden="true">${grammarTopicDone(i)?'✓':''}</span></button>`).join('')}</nav><small aria-label="Thème ${grammarIndex+1} / ${grammarPages.length}">${grammarIndex+1} / ${grammarPages.length}</small></div><div id="lessonGrammarPage">${grammarPages[grammarIndex].html}</div></section>`;
      if(activeStep==='grammar-check')body=`<section class="card lesson-step-content"><h3>Test final</h3><p class="muted">${DE_A1_ASSESSMENTS.grammarCheckTasks().length} questions sur les pronoms et le présent : sein, kommen, wohnen, arbeiten, heißen et sprechen.</p>${DE_A1_ASSESSMENTS.grammarCheckTried(state)?`<p class="muted">Meilleur résultat : ${DE_A1_ASSESSMENTS.grammarCheckBest(state)} %</p>`:''}<button class="primary-btn exercise-start-btn" id="startGrammarCheck">${DE_A1_ASSESSMENTS.grammarCheckTasks().length} questions · Commencer</button></section>`;
      if(activeStep==='check')body=`<section class="card lesson-step-content">${opts.masteryHtml||''}<button class="primary-btn lesson-finale-btn" id="startMasteryOverview" ${!complete()?'disabled':''}>${masteryAttempted()?'Refaire le bilan':'Commencer le bilan'}</button>${!complete()?`<p class="muted">${esc(L.requirements)}</p>`:''}${complete()?`<div class="spacer"></div><button class="secondary-btn" id="nextLessonFromCheck">${esc(l.id<opts.lessonCount?L.next:L.all)}</button>`:''}</section>`;
      view.innerHTML=`${stepHead()}${body}${stepFooter()}`;
      wireStepFooter();
      if(activeStep==='listen'){
        const updateAudioPage=()=>{
          view.querySelectorAll('[data-core-row]').forEach(row=>row.hidden=Math.floor(Number(row.dataset.coreRow)/6)!==audioPage);
          const status=document.getElementById('audioPageStatus');
          if(status){status.textContent=`Page ${audioPage+1} / ${audioPageCount}`;
            document.getElementById('previousAudioPage').disabled=audioPage===0;
            document.getElementById('nextAudioPage').disabled=audioPage===audioPageCount-1;
          }
        };
        document.getElementById('previousAudioPage')?.addEventListener('click',()=>{window.A1Voice?.cancel();audioPage--;updateAudioPage();});
        document.getElementById('nextAudioPage')?.addEventListener('click',()=>{window.A1Voice?.cancel();audioPage++;updateAudioPage();});
        const audioRows=view.querySelector('.lesson-audio-rows');
        let audioWidth=0;
        const reserveAudioSpace=()=>{
          const rows=[...audioRows.querySelectorAll('[data-core-row]')];
          rows.forEach(row=>row.hidden=false);
          const heights=[];
          rows.forEach((row,i)=>{const page=Math.floor(i/6);heights[page]=(heights[page]||0)+row.getBoundingClientRect().height;});
          audioRows.style.minHeight=`${Math.ceil(Math.max(0,...heights))}px`;
          updateAudioPage();
        };
        reserveAudioSpace();
        audioLayoutObserver=new ResizeObserver(()=>{
          if(!audioRows.isConnected){audioLayoutObserver?.disconnect();return;}
          const width=audioRows.getBoundingClientRect().width;
          if(width!==audioWidth){audioWidth=width;reserveAudioSpace();}
        });
        audioLayoutObserver.observe(audioRows);
      }
      document.getElementById('startQuiz')?.addEventListener('click',drawQuiz);
      document.getElementById('startMasteryOverview')?.addEventListener('click',drawMastery);
      document.getElementById('nextLessonFromCheck')?.addEventListener('click',()=>l.id<opts.lessonCount?opts.renderLesson(l.id+1):opts.renderLearn());
      document.getElementById('startGrammarCheck')?.addEventListener('click',()=>opts.renderGrammarCheck({onBack:()=>goStep('grammar-check')}));
      if(activeStep==='grammar')DE_A1_ASSESSMENTS.decorate({root:view,practice:grammarPractices[grammarIndex],lesson:l,state,save,speak:opts.speak,onUpdate:refreshSteps});
      expandContent(view);
      opts.wireSpeakButtons();opts.wirePronunciation?.(view);
      view.querySelectorAll('[data-core-phrase-index]').forEach(btn=>btn.addEventListener('click',()=>{
        const i=Number(btn.dataset.corePhraseIndex),phraseKey=l.phrases[i]?.[0];if(!phraseKey)return;
        if(!p.heardPhrases.includes(phraseKey)){p.heardPhrases.push(phraseKey);save();refreshSteps();const counter=view.querySelector('.lesson-audio-page');if(counter)counter.textContent=`${heardCount()} / ${l.phrases.length} écoutés`;}
        view.querySelector(`.lesson-core-phrase[data-core-row="${i}"]`)?.classList.add('is-heard');
      }));
      window.scrollTo({top:0,behavior:'instant'});
    }
    function drawQuiz(){
      window.A1Voice?.cancel();
      A1ExerciseEngine.run({lesson:l,view,targetLang:opts.targetLang,uiLang:opts.uiLang,playAudio:t=>opts.speak(t,true),playFeedbackAudio:opts.playFeedbackAudio,onBack:()=>goStep('listen'),onFinish:(score,total)=>{
        const pct=total?Math.round(score/total*100):0;
        state.lessonQuizBest[l.id]=Math.max(best(),pct);p.quizDone=true;p.quizLast=pct;
        save(true);goStep('grammar');
      }});
    }
    function drawApplication(){
      window.A1Voice?.cancel();audioLayoutObserver?.disconnect();comparedText=null;
      const appHead=stepHead()+`<div id="lessonPartStatus" hidden>${statuses()}</div>`;
      view.innerHTML=`${appHead}
        <section class="card lesson-flow" id="lessonSpeaking"><div class="between"><h3>🎤 ${esc(L.speak)}</h3><span id="oralStatus"></span></div><p class="lesson-task-prompt">${taskPrompt(c.transfer.speaking,'speak')}</p>${opts.recorderHtml(recId)}${dialogueHelp()}<button class="soft-btn exercise-start-btn" id="showSpeakingModel">Réponse donnée à voix haute · Comparer</button><div id="speakingModel" ${p.speakingDone?'':'hidden'}><div class="solution"><strong>${esc(opts.fullModel?L.example:L.blocks)}:</strong><p>${esc(model).replace(/\n/g,'<br>')}</p></div><button class="soft-btn" data-speak="${esc(model)}">🔊 ${esc(L.listen)}</button><p class="muted">Vérifie avec l’exemple si tu as répondu à la consigne.</p><div class="button-row"><button class="secondary-btn" id="oralAgain">${esc(L.again)}</button><button class="primary-btn" id="oralGood" ${p.speakingDone?'':'disabled'}>✓ Vérifié · Terminer la tâche orale</button></div><div id="oralFeedback" role="status"></div></div><button class="secondary-btn" id="continueWriting" hidden>${esc(L.writeNext)}</button></section>
        <section class="card lesson-flow" id="lessonWritingSection"><div class="between"><h3>✍️ ${esc(L.write)}</h3><span id="writingStatus"></span></div><label class="lesson-task-prompt" for="lessonWriting">${taskPrompt(c.transfer.writing,'write')}</label>${Array.isArray(opts.writingHints)&&opts.writingHints.length?`<button class="soft-btn lesson-help-toggle" id="writingHelpBtn" aria-expanded="false" aria-controls="writingHelp">💡 ${esc(L.writeHelp)}</button><div class="lesson-writing-help lesson-help-content" id="writingHelp" hidden><p class="muted">${esc(opts.writingHelpText||L.writeHelpText)}</p>${opts.writingHints.map(h=>{const target=Array.isArray(h)?h[0]:h,native=Array.isArray(h)?h[1]:'';return `<div class="phrase-row"><div><strong>${esc(target)}</strong>${native?`<small>${esc(native)}</small>`:''}</div></div>`;}).join('')}</div>`:''}<textarea class="text-area lesson-writing" id="lessonWriting" placeholder="${esc(opts.placeholder||L.placeholder)}">${esc(p.writingDraft||'')}</textarea>${A1ExerciseEngine.charBar(opts.targetLang,opts.uiLang)}<p class="muted" id="writingCount"></p><button class="soft-btn" id="showWritingModel">${esc(L.compare)}</button><div id="writingModel" role="status"></div></section>
        <section class="card lesson-flow-finish"><div id="lessonCompletion" class="lesson-completion" role="status"></div>${hasMastery?`<button class="primary-btn" id="startMasteryFromApplication" disabled>🏁 Bilan de la leçon · ${opts.masteryCount||''} questions</button><div class="spacer"></div>`:''}<div class="button-row"><button class="secondary-btn" id="repeatQuiz">${esc(L.quizAgain)}</button><button class="primary-btn" id="nextLesson" disabled>${esc(l.id<opts.lessonCount?L.next:L.all)}</button></div></section>`;
      document.getElementById('lessonSpeaking').hidden=activeStep!=='speak';
      document.getElementById('lessonWritingSection').hidden=activeStep!=='write';
      view.querySelector('.lesson-flow-finish').hidden=true;
      view.insertAdjacentHTML('beforeend',stepFooter());wireStepFooter();
      document.getElementById('repeatQuiz').onclick=drawQuiz;
      if(hasMastery)document.getElementById('startMasteryFromApplication').onclick=drawMastery;
      document.getElementById('nextLesson').onclick=()=>{if(complete())l.id<opts.lessonCount?opts.renderLesson(l.id+1):opts.renderLearn();};
      const show=document.getElementById('showSpeakingModel'),oral=document.getElementById('speakingModel'),good=document.getElementById('oralGood');
      const reveal=()=>{p.speakingAttempted=true;oral.hidden=false;good.disabled=false;save();};
      show.onclick=reveal;
      good.onclick=()=>{if(!p.speakingAttempted)return;p.speakingDone=true;save(true);document.getElementById('oralFeedback').textContent=L.saved;refresh();};
      document.getElementById('oralAgain').onclick=()=>{oral.hidden=true;good.disabled=true;document.getElementById('oralFeedback').textContent='';show.focus();};
      document.getElementById('continueWriting').onclick=()=>goStep('write');
      A1Learning.wireRecorder(recId,()=>{reveal();save(true);},{unavailable:L.unavailable,denied:L.denied,recording:L.recording,done:L.recorded,empty:L.empty});
      const input=document.getElementById('lessonWriting'),writing=document.getElementById('writingModel');
      const writingHelpBtn=document.getElementById('writingHelpBtn'),writingHelp=document.getElementById('writingHelp');
      if(writingHelpBtn&&writingHelp)writingHelpBtn.onclick=()=>{writingHelp.hidden=!writingHelp.hidden;writingHelpBtn.setAttribute('aria-expanded',String(!writingHelp.hidden));};
      const speechHelpBtn=document.getElementById('speechHelpBtn'),speechHelp=document.getElementById('speechHelp');
      if(speechHelpBtn&&speechHelp)speechHelpBtn.onclick=()=>{speechHelp.hidden=!speechHelp.hidden;speechHelpBtn.setAttribute('aria-expanded',String(!speechHelp.hidden));};
      function count(){document.getElementById('writingCount').textContent=`${A1Learning.countWords(input.value)} · ${L.min}: ${minWords}`;}
      input.oninput=()=>{p.writingDraft=input.value.slice(0,12000);if(comparedText!==input.value.trim()){writing.replaceChildren();comparedText=null;}count();save();};
      A1ExerciseEngine.wireChars(input,opts.targetLang,document.getElementById('lessonWritingSection'));
      document.getElementById('showWritingModel').onclick=()=>{
        const text=input.value.trim();
        if(A1Learning.countWords(text)<minWords){writing.innerHTML=`<p class="feedback bad">${esc(L.short)} (${minWords})</p>`;return;}
        comparedText=text;p.writingDraft=input.value.slice(0,12000);save();
        writing.innerHTML=`<div class="solution"><strong>${esc(L.answer)}:</strong><p data-i18n-ignore>${esc(text).replace(/\n/g,'<br>')}</p></div><div class="solution"><strong>${esc(opts.fullModel?L.example:L.blocks)}:</strong><p>${esc(writingModel).replace(/\n/g,'<br>')}</p></div><p class="muted">Vérifie que tu as traité tous les points et comparé ta réponse avec l’exemple.</p><button class="primary-btn" id="writingGood">✓ Vérifié · Terminer la tâche écrite</button><div id="writingSelfFeedback"></div>`;
        const btn=document.getElementById('writingGood');
        btn.onclick=()=>{if(comparedText!==input.value.trim())return;p.writingDone=true;p.writingAnswer=text.slice(0,12000);save(true);document.getElementById('writingSelfFeedback').textContent=L.saved;refresh();};
      };
      opts.wireSpeakButtons();opts.wirePronunciation?.(view);count();refresh();
      window.scrollTo({top:0,behavior:'instant'});
    }
    drawOverview();
  }
  window.A1LessonFlow={render,listProgress};
})();

