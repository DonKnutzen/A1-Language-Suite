/* The three lesson parts share one saved status in the existing course state. */
(() => {
  'use strict';
  const UI={
    de:{back:'← Lektionen',overview:'← Lerninhalt',start:'10 gemischte Übungen starten',apply:'Sprechen & Schreiben üben',part:'TEIL 2 · SELBST ANWENDEN',speak:'Sprechen',write:'Schreiben',dialogueHelp:'Hilfestellung',quiz:'10 Übungen',done:'Erledigt',open:'Offen',complete:'Lektion abgeschlossen',requirements:'Für den Abschluss: mindestens 70 % in den zehn Übungen, dazu Sprechen und Schreiben selbst bearbeiten.',instruction:'Beantworte die Aufgabe laut. Du kannst dich aufnehmen oder ohne Mikrofon üben. Vergleiche anschließend mit dem Beispiel und prüfe, ob du die Aufgabe erfüllt hast.',aloud:'Ich habe die Aufgabe laut beantwortet.',showOral:'Mit dem Sprechbeispiel vergleichen',example:'Mögliche Antwort',blocks:'Beispielbausteine',listen:'Beispiel anhören',self:'Meine Antwort erfüllt die Aufgabe.',again:'↻ Noch einmal üben',good:'✓ Sprechaufgabe abschließen',compare:'Mit dem Schreibbeispiel vergleichen',checkPoints:'Ich habe alle Punkte der Aufgabe bearbeitet.',checkLanguage:'Ich habe meine Antwort mit dem Beispiel geprüft.',writeGood:'✓ Schreibaufgabe abschließen',answer:'Deine Antwort',placeholder:'Schreibe deine eigene Antwort…',min:'Mindestwortzahl',short:'Bearbeite zuerst die Schreibaufgabe ausreichend.',writeNext:'Weiter zur Schreibaufgabe ↓',next:'Nächste Lektion',all:'Zur Kursübersicht',remaining:'Bearbeite die offenen Teile, um die Lektion abzuschließen.',retry:'Für den Abschluss brauchst du mindestens 70 %. Die Selbstaufgaben bleiben gespeichert.',quizAgain:'10 Übungen wiederholen',best:'Bester Wert',dictate:'Nachnamen buchstabiert anhören',dictateTip:'Höre den buchstabierten Nachnamen und notiere ihn. Die Lösung erscheint erst beim Vergleich.',writeHelp:'Hilfestellung',writeHelpText:'Nutze diese Satzbausteine. Namen, Ort, Zeit oder Zahl kannst du passend ersetzen.',noGrade:'Du prüfst deine freien Antworten selbst. Es findet keine automatische Sprachbewertung statt.',saved:'✓ Selbst geprüft und gespeichert.',unavailable:'Mikrofon nicht verfügbar. Übe laut ohne Aufnahme und bestätige dies unten.',denied:'Mikrofon konnte nicht geöffnet werden. Du kannst ohne Aufnahme üben.',recording:'● Aufnahme läuft…',recorded:'Aufnahme fertig. Höre deine Antwort an und vergleiche sie.',empty:'Keine Aufnahme gespeichert. Versuche es erneut.',core:'Lektionsinhalt',old:'Diese Lektion war bereits abgeschlossen. Die Selbstaufgaben kannst du zusätzlich üben.',plan:'Lektionsinhalt',listenDeepen:'Hören & Vertiefung',interactive:'10 interaktive Aufgaben',practical:'Praktisch anwenden',audioExamples:'Hörbeispiele & Nachsprechen',listenStep:'Hören',quizStep:'Übungen',practiceStep:'Praxis'},
    fr:{back:'← Leçons',overview:'← Contenu',start:'Commencer les 10 exercices variés',apply:'Pratiquer à l’oral et à l’écrit',part:'PARTIE 2 · À TOI DE PRATIQUER',speak:'À l’oral',write:'À l’écrit',dialogueHelp:'Aide orale',quiz:'10 exercices',done:'Terminé',open:'À faire',complete:'Leçon terminée',requirements:'Pour terminer : au moins 70 % aux dix exercices, puis les tâches à l’oral et à l’écrit.',instruction:'Réponds à voix haute. Tu peux t’enregistrer ou pratiquer sans micro. Compare ensuite avec l’exemple et vérifie si tu as répondu à la consigne.',aloud:'J’ai répondu à la consigne à voix haute.',showOral:'Comparer avec l’exemple oral',example:'Réponse possible',blocks:'Exemples utiles',listen:'Écouter l’exemple',self:'Ma réponse respecte la consigne.',again:'↻ Réessayer',good:'✓ Terminer la tâche orale',compare:'Comparer avec l’exemple écrit',checkPoints:'J’ai répondu à tous les points de la consigne.',checkLanguage:'J’ai vérifié ma réponse avec l’exemple.',writeGood:'✓ Terminer la tâche écrite',answer:'Ta réponse',placeholder:'Écris ta propre réponse…',min:'Nombre minimal de mots',short:'Fais d’abord la tâche écrite avec une réponse suffisante.',writeNext:'Passer à la tâche écrite ↓',next:'Leçon suivante',all:'Voir les leçons',remaining:'Termine les parties restantes pour compléter la leçon.',retry:'Il faut au moins 70 %. Tes tâches personnelles restent enregistrées.',quizAgain:'Refaire les 10 exercices',best:'Meilleur résultat',dictate:'Écouter le nom épelé',dictateTip:'Écoute le nom épelé et écris-le. La solution apparaît après la comparaison.',writeHelp:'Aide pour écrire',writeHelpText:'Utilise ces blocs de phrase. Tu peux adapter le nom, le lieu, l’heure ou le nombre.',noGrade:'Tu évalues tes propres réponses libres. Il n’y a pas de correction automatique de la langue.',saved:'✓ Auto-évalué et enregistré.',unavailable:'Micro non disponible. Réponds à voix haute sans enregistrement et confirme ci-dessous.',denied:'Micro inaccessible. Tu peux pratiquer sans enregistrement.',recording:'● Enregistrement en cours…',recorded:'Enregistrement terminé. Écoute ta réponse et compare-la.',empty:'Aucun enregistrement. Réessaie.',core:'Contenu de la leçon',old:'Cette leçon était déjà terminée. Tu peux pratiquer les nouvelles tâches en complément.',plan:'Contenu de la leçon',listenDeepen:'Écouter & approfondir',interactive:'10 exercices interactifs',practical:'Mise en pratique',audioExamples:'Exemples audio & répétition',listenStep:'Écoute',quizStep:'Exercices',practiceStep:'Pratique'},
    tr:{back:'← Dersler',overview:'← Ders içeriği',start:'10 karma alıştırmayı başlat',apply:'Konuşma ve yazma çalış',part:'BÖLÜM 2 · ŞİMDİ KENDİN UYGULA',speak:'Konuşma',write:'Yazma',dialogueHelp:'Konuşma yardımı',quiz:'10 alıştırma',done:'Tamamlandı',open:'Yapılacak',complete:'Ders tamamlandı',requirements:'Tamamlamak için: on alıştırmada en az %70, ardından konuşma ve yazma görevlerini yap.',instruction:'Görevi yüksek sesle yanıtla. Sesini kaydedebilir veya mikrofon olmadan çalışabilirsin. Sonra örnekle karşılaştır ve tüm noktaları yanıtladığını kontrol et.',aloud:'Görevi yüksek sesle yanıtladım.',showOral:'Konuşma örneğiyle karşılaştır',example:'Olası yanıt',blocks:'Örnek ifadeler',listen:'Örneği dinle',self:'Yanıtım görevin tüm noktalarını karşılıyor.',again:'↻ Tekrar çalış',good:'✓ Konuşma görevini tamamla',compare:'Yazma örneğiyle karşılaştır',checkPoints:'Görevin tüm noktalarını yanıtladım.',checkLanguage:'Yanıtımı örnekle karşılaştırıp kontrol ettim.',writeGood:'✓ Yazma görevini tamamla',answer:'Yanıtın',placeholder:'Kendi yanıtını yaz…',min:'En az kelime sayısı',short:'Önce yazma görevini yeterli bir yanıtla yap.',writeNext:'Yazma görevine geç ↓',next:'Sonraki ders',all:'Derslere dön',remaining:'Dersi tamamlamak için eksik bölümleri yap.',retry:'Tamamlamak için en az %70 gerekli. Konuşma ve yazma görevlerin kaydedilir.',quizAgain:'10 alıştırmayı tekrarla',best:'En iyi sonuç',dictate:'Harf harf söylenen soyadını dinle',dictateTip:'Soyadını dinleyip yaz. Yanıt karşılaştırmadan sonra gösterilir.',writeHelp:'Yazma yardımı',writeHelpText:'Bu cümle kalıplarını kullan. İsim, yer, saat veya sayıyı değiştirebilirsin.',noGrade:'Serbest yanıtlarını kendin değerlendirirsin. Otomatik dil değerlendirmesi yapılmaz.',saved:'✓ Kontrol edildi ve kaydedildi.',unavailable:'Mikrofon kullanılamıyor. Kayıt olmadan sesli çalış ve aşağıda onayla.',denied:'Mikrofon açılamadı. Kayıt olmadan çalışabilirsin.',recording:'● Kayıt sürüyor…',recorded:'Kayıt hazır. Yanıtını dinle ve örnekle karşılaştır.',empty:'Kayıt boş. Tekrar dene.',core:'Ders içeriği',old:'Bu ders daha önce tamamlandı. Yeni görevleri ek çalışma olarak yapabilirsin.',plan:'Ders içeriği',listenDeepen:'Dinleme & derinleştirme',interactive:'10 etkileşimli alıştırma',practical:'Uygulama',audioExamples:'Dinleme örnekleri & tekrar',listenStep:'Dinleme',quizStep:'Alıştırmalar',practiceStep:'Uygulama'}
  };
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  function listProgress(lesson,state,uiLang='de'){
    const L=UI[uiLang]||UI.de;
    const p=(state.lessonWork&&typeof state.lessonWork==='object'&&!Array.isArray(state.lessonWork)&&state.lessonWork[lesson.id]&&typeof state.lessonWork[lesson.id]==='object')?state.lessonWork[lesson.id]:{};
    const audioTargets=[...new Set((lesson.phrases||[]).map(x=>x?.[0]).filter(Boolean))];
    const heardSet=new Set(Array.isArray(p.heardPhrases)?p.heardPhrases.filter(v=>typeof v==='string'):[]);
    const heard=audioTargets.filter(x=>heardSet.has(x)).length,total=audioTargets.length;
    const audioDone=total>0&&heard>=total;
    const best=Number(state.lessonQuizBest?.[lesson.id]||0);
    const application=Number(p.speakingDone===true)+Number(p.writingDone===true);
    const quizScore=Math.max(0,Math.min(10,Math.round(best/10)));
    const lesson1=Number(lesson.id)===1&&!!window.FR_A1_LESSON1;
    const quizDone=lesson1?p.quizDone===true:best>=70;
    const complete=state.doneLessons?.includes(lesson.id)||(quizDone&&application===2);
    const masteryBest=Number(state.lessonMasteryBest?.[lesson.id]||0);
    const masteryDone=lesson1?!!(state.lessonMasteryLast&&Object.prototype.hasOwnProperty.call(state.lessonMasteryLast,lesson.id)):masteryBest>=80;
    const step=(label,value,done)=>`<span class="lesson-list-step ${done?'done':''}"><small>${esc(label)}</small><strong>${esc(value)}</strong></span>`;
    return `<div class="lesson-list-progress" aria-label="${esc(L.plan)}">${step(L.listenStep,audioDone?'✓':`${heard}/${total}`,audioDone)}${step(L.quizStep,p.quizDone===true?`${quizScore}/10`:'—',quizDone)}${step(L.practiceStep,application===2?'✓':`${application}/2`,application===2)}${step('Abschluss',masteryBest?masteryBest+' %':'—',masteryDone)}${complete&&masteryDone?'<span class="lesson-list-complete" aria-label="Wissenscheck bestanden">✓</span>':''}</div>`;
  }
  function render(opts){
    const {lesson:l,content:c,view,state}=opts,L=UI[opts.uiLang]||UI.de;
    const lesson1=opts.targetLang==='fr'&&Number(l.id)===1&&!!window.FR_A1_LESSON1;
    if(!state.lessonWork||typeof state.lessonWork!=='object'||Array.isArray(state.lessonWork))state.lessonWork={};
    const valid=state.lessonWork[l.id];
    const p=state.lessonWork[l.id]=valid&&typeof valid==='object'&&!Array.isArray(valid)?valid:{};
    if(!Array.isArray(p.heardPhrases))p.heardPhrases=[];
    const legacy=state.doneLessons.includes(l.id);
    const recId='LessonApply'+l.id;
    const best=()=>Number(state.lessonQuizBest[l.id]||0);
    const passed=()=>lesson1?p.quizDone===true:best()>=70;
    const complete=()=>legacy||(passed()&&p.speakingDone===true&&p.writingDone===true);
    const hasMastery=typeof opts.renderMastery==='function';
    const masteryBest=()=>Number(state.lessonMasteryBest?.[l.id]||0);
    const masteryAttempted=()=>!!(state.lessonMasteryLast&&Object.prototype.hasOwnProperty.call(state.lessonMasteryLast,l.id));
    const masteryPassed=()=>lesson1?masteryAttempted():masteryBest()>=80;
    const model=String(opts.model||'').replace(/\\n/g,'\n');
    const writingModel=String(opts.writingModel||model).replace(/\\n/g,'\n');
    const explicit=c.transfer.writing.match(/(\d+)\s*(?:[–-]\s*\d+\s*)?(?:Wörter|mots|kelime|palabras)/i);
    const minWords=explicit?Number(explicit[1]):opts.targetLang==='fr'&&l.id===2?1:3;
    let comparedText=null;
    const steps=[['listen','Hören & Verstehen'],['grammar','Grammatik'],...(lesson1?[['grammar-check','Abschluss-Test']]:[]),['speak','Sprechen'],['write','Schreiben'],...(hasMastery?[['check','Lektions-Check']]:[])];
    let activeStep='listen',grammarIndex=0,audioPage=0,audioLayoutObserver=null;
    const audioPageCount=Math.max(1,Math.ceil(l.phrases.length/6));
    const grammarSource=document.createElement('div');
    grammarSource.innerHTML=opts.grammarHtml||'';
    const grammarRoot=grammarSource.querySelector('.lesson-deepening')||grammarSource;
    const grammarTopics=[...grammarRoot.querySelectorAll('details.grammar-detail')];
    const basicElements=[...grammarRoot.children].filter(el=>el.tagName!=='SUMMARY'&&!el.matches('details.grammar-detail'));
    const grammarBasics=basicElements.map(el=>el.outerHTML).join('');
    const hasBasics=basicElements.some(el=>!el.matches('.lesson-deepening-title')&&el.textContent.trim());
    const grammarPages=[...(hasBasics||!grammarTopics.length?[{title:'Grundlagen',html:grammarBasics}]:[]),...grammarTopics.map(el=>({title:el.querySelector('summary')?.textContent.trim().replace(/ – .*/, '')||'Grammatik',html:el.outerHTML}))];
    function grammarTopicDone(i){
      const key=lesson1&&Object.keys(FR_A1_LESSON1.GROUPS)[i-1];
      return i>0&&!!key&&state.lessonGrammarPractice?.[1]?.[key]?.done===true;
    }
    function stepDone(key){
      return {listen:audioTargets().length>0&&heardCount()===audioTargets().length&&passed(),grammar:lesson1&&FR_A1_LESSON1.completedGroups(state)===4,'grammar-check':lesson1&&FR_A1_LESSON1.grammarCheckTried(state),speak:p.speakingDone===true,write:p.writingDone===true,check:masteryPassed()}[key];
    }
    function stepNav(){
      return `<div class="lesson-step-context"><strong>${esc(steps.find(([key])=>key===activeStep)[1])}</strong><small>${steps.findIndex(([key])=>key===activeStep)+1} / ${steps.length}</small></div><nav class="lesson-step-nav" aria-label="Lernschritte">${steps.map(([key,label],i)=>`<button type="button" class="lesson-step ${activeStep===key?'active':''} ${stepDone(key)?'done':''}" data-lesson-step="${key}" aria-label="${i+1}. ${esc(label)}${stepDone(key)?' · erledigt':''}" title="${esc(label)}" ${activeStep===key?'aria-current="step"':''}><span class="lesson-step-number">${stepDone(key)?'✓':i+1}</span><span class="lesson-step-label">${esc(label)}</span></button>`).join('')}</nav>`;
    }
    function stepHead(){
      return `<div class="between"><button class="tiny-btn" id="backLearn">${esc(L.back)}</button></div><header class="lesson-step-header"><h2>${l.id}. ${esc(l.title)}</h2>${stepNav()}</header>`;
    }
    function refreshSteps(){const nav=view.querySelector('.lesson-step-nav');if(nav){view.querySelector('.lesson-step-context')?.remove();nav.outerHTML=stepNav();}wireStepNav();view.querySelectorAll('[data-grammar-page]').forEach(button=>{
      if(grammarTopicDone(Number(button.dataset.grammarPage))){button.classList.add('done');button.querySelector('.lesson-topic-number').textContent='✓';
        const option=view.querySelector(`#grammarTopicSelect option[value="${button.dataset.grammarPage}"]`);if(option&&!option.textContent.startsWith('✓'))option.textContent='✓ '+option.textContent;}
    });}
    function wireStepNav(){view.querySelectorAll('[data-lesson-step]').forEach(btn=>btn.onclick=()=>goStep(btn.dataset.lessonStep));}
    function stepFooter(){
      const i=steps.findIndex(([key])=>key===activeStep),next=steps[i+1];
      return `<div class="lesson-step-footer">${i?'<button class="secondary-btn" id="previousLessonStep">← Zurück</button>':'<span></span>'}${next?`<button class="primary-btn" id="nextLessonStep">Weiter: ${esc(next[1])} →</button>`:''}</div>`;
    }
    function wireStepFooter(){
      document.getElementById('backLearn').onclick=opts.renderLearn;wireStepNav();
      const i=steps.findIndex(([key])=>key===activeStep);
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
      activeStep=key;
      if(key==='speak'||key==='write')drawApplication();else drawOverview();
    }
    function save(completed=false){
      if(passed()&&p.speakingDone===true&&p.writingDone===true&&!state.doneLessons.includes(l.id))state.doneLessons.push(l.id);
      opts.save(completed);
    }
    function statuses(){const rows=[[lesson1?'Hör-/Satzübung':L.quiz,passed()],[L.speak,p.speakingDone===true],[L.write,p.writingDone===true]];if(hasMastery)rows.push([lesson1?'Lektions-Check':'Abschlusstest',masteryPassed()]);return `<div class="lesson-part-status" aria-label="${esc(L.apply)}">${rows.map(([label,done])=>`<span class="pill ${done?'green':'gray'}">${done?'✓':'○'} ${esc(label)}</span>`).join('')}</div>`;}
    function audioTargets(){return [...new Set((l.phrases||[]).map(x=>x?.[0]).filter(Boolean))];}
    function heardCount(){const heard=new Set(p.heardPhrases);return audioTargets().filter(x=>heard.has(x)).length;}
    function taskPrompt(text,kind){
      let html=esc(text);
      if(lesson1){
        const highlights=kind==='speak'?['Stelle dich in drei Sätzen vor','Fragen nach Name und Wohnort']:['Name, Wohnort und eine Sprache','drei einfachen Sätzen'];
        for(const part of highlights)html=html.replace(esc(part),`<strong>${esc(part)}</strong>`);
      }
      return `<span class="lesson-task-label">Aufgabe:</span> ${html}`;
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
      const masteryBtn=document.getElementById('startMasteryFromApplication');if(masteryBtn&&!lesson1)masteryBtn.disabled=!complete();
      document.getElementById('lessonCompletion').textContent=lesson1?(complete()?'Praxis geschafft. Wenn du möchtest, mach jetzt den Lektions-Check.':'Sprich und schreib einmal selbst – du kannst jederzeit zurückgehen und weiterüben.'):complete()?(hasMastery&&!masteryPassed()?'Praxis abgeschlossen · Abschlusstest noch offen':L.complete):!passed()?L.retry:L.remaining;
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
      const corePhrases=`<section class="lesson-core-phrases"><div class="between"><h3>${esc(L.audioExamples)}</h3><small class="lesson-audio-page">${heardCount()} / ${l.phrases.length} gehört</small></div><div class="lesson-audio-rows">${l.phrases.map(([target,native],i)=>{return `<div class="phrase-row lesson-core-phrase ${heardSet.has(target)?'is-heard':''}" data-core-row="${i}"><div><strong>${esc(target)}</strong><small>${esc(native)}</small></div>${opts.speakBtn(target).replace('<button ',`<button data-core-phrase-index="${i}" `)}</div>`;}).join('')}</div>${audioPageCount>1?`<div class="lesson-audio-pager"><button type="button" class="tiny-btn" id="previousAudioPage" aria-label="Vorherige Hörbeispiele">←</button><small id="audioPageStatus" aria-live="polite"></small><button type="button" class="tiny-btn" id="nextAudioPage" aria-label="Nächste Hörbeispiele">→</button></div>`:''}</section>`;
      let body='';
      if(activeStep==='listen')body=`${opts.goalsHtml||opts.introHtml||''}<section class="card lesson-step-content">${corePhrases}<div class="lesson-listening-practice">${p.quizDone?`<p class="muted">Bestwert: ${best()} %</p>`:''}<button class="primary-btn exercise-start-btn" id="startQuiz">Lektionsübung · 10 Aufgaben</button></div><div class="lesson-pronunciation-bonus">${opts.pronunciationHtml||''}</div></section>`;
      if(activeStep==='grammar')body=`<section class="card lesson-step-content"><div class="lesson-topic-toolbar"><button class="tiny-btn" id="previousGrammarTopicTop" aria-label="Vorheriges Grammatikthema" ${grammarIndex===0?'disabled':''}>←</button><div class="lesson-topic-choice"><select id="grammarTopicSelect" aria-label="Grammatikthema wählen">${grammarPages.map((page,i)=>`<option value="${i}" ${i===grammarIndex?'selected':''}>${grammarTopicDone(i)?'✓ ':''}${esc(page.title)}</option>`).join('')}</select><small>${grammarIndex+1} / ${grammarPages.length}</small></div><button class="tiny-btn" id="nextGrammarTopicTop" aria-label="Nächstes Grammatikthema" ${grammarIndex===grammarPages.length-1?'disabled':''}>→</button></div><nav class="lesson-topic-nav" style="--topic-count:${grammarPages.length}" aria-label="Grammatikfortschritt">${grammarPages.map((page,i)=>`<button class="lesson-topic ${i===grammarIndex?'active':''} ${grammarTopicDone(i)?'done':''}" data-grammar-page="${i}" aria-label="${i+1}. ${esc(page.title)}" title="${esc(page.title)}" ${i===grammarIndex?'aria-current="true"':''}><span class="lesson-topic-number">${grammarTopicDone(i)?'✓':''}</span><span class="lesson-topic-label">${esc(page.title)}</span></button>`).join('')}</nav><div id="lessonGrammarPage">${grammarPages[grammarIndex].html}</div>${grammarIndex<grammarPages.length-1?`<button class="soft-btn" id="nextGrammarTopic">Weiter: ${esc(grammarPages[grammarIndex+1].title)} →</button>`:''}</section>`;
      if(activeStep==='grammar-check')body=`<section class="card lesson-step-content"><h3>Abschluss-Test</h3><p class="muted">12 gemischte Fragen aus être, habiter/parler, venir und s’appeler.</p>${FR_A1_LESSON1.grammarCheckTried(state)?`<p class="muted">Bestwert: ${FR_A1_LESSON1.grammarCheckBest(state)} %</p>`:''}<button class="primary-btn exercise-start-btn" id="startGrammarCheck">12 Fragen starten</button></section>`;
      if(activeStep==='check')body=`<section class="card lesson-step-content">${opts.masteryHtml||''}<button class="primary-btn lesson-finale-btn" id="startMasteryOverview" ${!lesson1&&!complete()?'disabled':''}>${masteryAttempted()?'Lektions-Check wiederholen':'Lektions-Check starten'}</button>${!lesson1&&!complete()?`<p class="muted">${esc(L.requirements)}</p>`:''}${complete()?`<div class="spacer"></div><button class="secondary-btn" id="nextLessonFromCheck">${esc(l.id<opts.lessonCount?L.next:L.all)}</button>`:''}</section>`;
      view.innerHTML=`${stepHead()}${body}${stepFooter()}`;
      wireStepFooter();
      if(activeStep==='listen'){
        const updateAudioPage=()=>{
          view.querySelectorAll('[data-core-row]').forEach(row=>row.hidden=Math.floor(Number(row.dataset.coreRow)/6)!==audioPage);
          const status=document.getElementById('audioPageStatus');
          if(status){status.textContent=`Seite ${audioPage+1} / ${audioPageCount}`;
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
      view.querySelectorAll('[data-grammar-page]').forEach(btn=>btn.onclick=()=>{grammarIndex=Number(btn.dataset.grammarPage);drawOverview();});
      document.getElementById('grammarTopicSelect')?.addEventListener('change',event=>{grammarIndex=Number(event.target.value);drawOverview();document.getElementById('grammarTopicSelect')?.focus({preventScroll:true});});
      document.getElementById('previousGrammarTopicTop')?.addEventListener('click',()=>{grammarIndex--;drawOverview();});
      document.getElementById('nextGrammarTopicTop')?.addEventListener('click',()=>{grammarIndex++;drawOverview();});
      document.getElementById('nextGrammarTopic')?.addEventListener('click',()=>{grammarIndex++;drawOverview();});
      if(lesson1&&activeStep==='grammar')FR_A1_LESSON1.decorate({root:view,state,save:(done)=>save(done),speak:opts.speak,onUpdate:refreshSteps});
      expandContent(view);
      opts.wireSpeakButtons();window.A1Pronunciation?.wire(view);
      view.querySelectorAll('[data-core-phrase-index]').forEach(btn=>btn.addEventListener('click',()=>{
        const i=Number(btn.dataset.corePhraseIndex),phraseKey=l.phrases[i]?.[0];if(!phraseKey)return;
        if(!p.heardPhrases.includes(phraseKey)){p.heardPhrases.push(phraseKey);save();refreshSteps();const counter=view.querySelector('.lesson-audio-page');if(counter)counter.textContent=`${heardCount()} / ${l.phrases.length} gehört`;}
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
        <section class="card lesson-flow" id="lessonSpeaking"><div class="between"><h3>🎤 ${esc(L.speak)}</h3><span id="oralStatus"></span></div><p class="lesson-task-prompt">${taskPrompt(c.transfer.speaking,'speak')}</p>${opts.recorderHtml(recId)}${dialogueHelp()}<button class="soft-btn exercise-start-btn" id="showSpeakingModel">Laut beantwortet · Beispiel vergleichen</button><div id="speakingModel" ${p.speakingDone?'':'hidden'}><div class="solution"><strong>${esc(opts.fullModel?L.example:L.blocks)}:</strong><p>${esc(model).replace(/\n/g,'<br>')}</p></div><button class="soft-btn" data-speak="${encodeURIComponent(model)}">🔊 ${esc(L.listen)}</button><p class="muted">Prüfe mit dem Beispiel, ob deine Antwort die Aufgabe erfüllt.</p><div class="button-row"><button class="secondary-btn" id="oralAgain">${esc(L.again)}</button><button class="primary-btn" id="oralGood" ${p.speakingDone?'':'disabled'}>✓ Geprüft · Sprechaufgabe abschließen</button></div><div id="oralFeedback" role="status"></div></div><button class="secondary-btn" id="continueWriting" hidden>${esc(L.writeNext)}</button></section>
        <section class="card lesson-flow" id="lessonWritingSection"><div class="between"><h3>✍️ ${esc(L.write)}</h3><span id="writingStatus"></span></div><label class="lesson-task-prompt" for="lessonWriting">${taskPrompt(c.transfer.writing,'write')}</label>${opts.targetLang==='fr'&&l.id===2?`<p class="muted">${esc(L.dictateTip)}</p><button class="soft-btn" data-pron-spell="MARTIN" data-pron-lang="fr">🔊 ${esc(L.dictate)}</button>`:''}<textarea class="text-area lesson-writing" id="lessonWriting" placeholder="${esc(opts.placeholder||L.placeholder)}">${esc(p.writingDraft||'')}</textarea>${A1ExerciseEngine.charBar(opts.targetLang,opts.uiLang)}<p class="muted" id="writingCount"></p>${Array.isArray(opts.writingHints)&&opts.writingHints.length?`<button class="soft-btn lesson-help-toggle" id="writingHelpBtn" aria-expanded="false" aria-controls="writingHelp">💡 ${esc(L.writeHelp)}</button><div class="lesson-writing-help lesson-help-content" id="writingHelp" hidden><p class="muted">${esc(opts.writingHelpText||L.writeHelpText)}</p>${opts.writingHints.map(h=>{const target=Array.isArray(h)?h[0]:h,native=Array.isArray(h)?h[1]:'';return `<div class="phrase-row"><div><strong>${esc(target)}</strong>${native?`<small>${esc(native)}</small>`:''}</div></div>`;}).join('')}</div>`:''}<button class="soft-btn" id="showWritingModel">${esc(L.compare)}</button><div id="writingModel" role="status"></div></section>
        <section class="card lesson-flow-finish"><div id="lessonCompletion" class="lesson-completion" role="status"></div>${hasMastery?`<button class="primary-btn" id="startMasteryFromApplication" ${lesson1?'':'disabled'}>🏁 ${lesson1?'Lektions-Check':'Abschlusstest starten'} · ${opts.masteryCount||''} Fragen</button><div class="spacer"></div>`:''}<div class="button-row"><button class="secondary-btn" id="repeatQuiz">${esc(lesson1?'10 Hör-/Satzübungen wiederholen':L.quizAgain)}</button><button class="primary-btn" id="nextLesson" disabled>${esc(l.id<opts.lessonCount?L.next:L.all)}</button></div></section>`;
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
        writing.innerHTML=`<div class="solution"><strong>${esc(L.answer)}:</strong><p>${esc(text).replace(/\n/g,'<br>')}</p></div><div class="solution"><strong>${esc(opts.fullModel?L.example:L.blocks)}:</strong><p>${esc(writingModel).replace(/\n/g,'<br>')}</p></div><p class="muted">Prüfe, ob du alle Punkte bearbeitet und deine Antwort mit dem Beispiel verglichen hast.</p><button class="primary-btn" id="writingGood">✓ Geprüft · Schreibaufgabe abschließen</button><div id="writingSelfFeedback"></div>`;
        const btn=document.getElementById('writingGood');
        btn.onclick=()=>{if(comparedText!==input.value.trim())return;p.writingDone=true;p.writingAnswer=text.slice(0,12000);save(true);document.getElementById('writingSelfFeedback').textContent=L.saved;refresh();};
      };
      opts.wireSpeakButtons();window.A1Pronunciation?.wire(view);count();refresh();
      window.scrollTo({top:0,behavior:'instant'});
    }
    drawOverview();
  }
  window.A1LessonFlow={render,listProgress};
})();

