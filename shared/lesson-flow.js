/* The three lesson parts share one saved status in the existing course state. */
(() => {
  'use strict';
  const UI={
    de:{back:'← Lektionen',overview:'← Lerninhalt',start:'10 gemischte Übungen starten',apply:'Sprechen & Schreiben üben',part:'TEIL 2 · SELBST ANWENDEN',speak:'Sprechen',write:'Schreiben',dialogueHelp:'Sprechhilfe',quiz:'10 Übungen',done:'Erledigt',open:'Offen',complete:'Lektion abgeschlossen',requirements:'Für den Abschluss: mindestens 70 % in den zehn Übungen, dazu Sprechen und Schreiben selbst bearbeiten.',instruction:'Beantworte die Aufgabe laut. Du kannst dich aufnehmen oder ohne Mikrofon üben. Vergleiche anschließend mit dem Beispiel und prüfe, ob du die Aufgabe erfüllt hast.',aloud:'Ich habe die Aufgabe laut beantwortet.',showOral:'Mit dem Sprechbeispiel vergleichen',example:'Mögliche Antwort',blocks:'Beispielbausteine',listen:'Beispiel anhören',self:'Meine Antwort erfüllt die Aufgabe.',again:'↻ Noch einmal üben',good:'✓ Sprechaufgabe abschließen',compare:'Mit dem Schreibbeispiel vergleichen',checkPoints:'Ich habe alle Punkte der Aufgabe bearbeitet.',checkLanguage:'Ich habe meine Antwort mit dem Beispiel geprüft.',writeGood:'✓ Schreibaufgabe abschließen',answer:'Deine Antwort',placeholder:'Schreibe deine eigene Antwort…',min:'Mindestwortzahl',short:'Bearbeite zuerst die Schreibaufgabe ausreichend.',writeNext:'Weiter zur Schreibaufgabe ↓',next:'Nächste Lektion',all:'Zur Kursübersicht',remaining:'Bearbeite die offenen Teile, um die Lektion abzuschließen.',retry:'Für den Abschluss brauchst du mindestens 70 %. Die Selbstaufgaben bleiben gespeichert.',quizAgain:'10 Übungen wiederholen',best:'Bester Wert',dictate:'Nachnamen buchstabiert anhören',dictateTip:'Höre den buchstabierten Nachnamen und notiere ihn. Die Lösung erscheint erst beim Vergleich.',writeHelp:'Schreibhilfe',writeHelpText:'Nutze diese Satzbausteine. Namen, Ort, Zeit oder Zahl kannst du passend ersetzen.',noGrade:'Du prüfst deine freien Antworten selbst. Es findet keine automatische Sprachbewertung statt.',saved:'✓ Selbst geprüft und gespeichert.',unavailable:'Mikrofon nicht verfügbar. Übe laut ohne Aufnahme und bestätige dies unten.',denied:'Mikrofon konnte nicht geöffnet werden. Du kannst ohne Aufnahme üben.',recording:'● Aufnahme läuft…',recorded:'Aufnahme fertig. Höre deine Antwort an und vergleiche sie.',empty:'Keine Aufnahme gespeichert. Versuche es erneut.',core:'Lektionsinhalt',old:'Diese Lektion war bereits abgeschlossen. Die Selbstaufgaben kannst du zusätzlich üben.',plan:'Lektionsinhalt',listenDeepen:'Hören & Vertiefung',interactive:'10 interaktive Aufgaben',practical:'Praktisch anwenden',audioExamples:'Hörbeispiele & Nachsprechen',listenStep:'Hören',quizStep:'Aufgaben',practiceStep:'Praxis'},
    fr:{back:'← Leçons',overview:'← Contenu',start:'Commencer les 10 exercices variés',apply:'Pratiquer à l’oral et à l’écrit',part:'PARTIE 2 · À TOI DE PRATIQUER',speak:'À l’oral',write:'À l’écrit',dialogueHelp:'Aide orale',quiz:'10 exercices',done:'Terminé',open:'À faire',complete:'Leçon terminée',requirements:'Pour terminer : au moins 70 % aux dix exercices, puis les tâches à l’oral et à l’écrit.',instruction:'Réponds à voix haute. Tu peux t’enregistrer ou pratiquer sans micro. Compare ensuite avec l’exemple et vérifie si tu as répondu à la consigne.',aloud:'J’ai répondu à la consigne à voix haute.',showOral:'Comparer avec l’exemple oral',example:'Réponse possible',blocks:'Exemples utiles',listen:'Écouter l’exemple',self:'Ma réponse respecte la consigne.',again:'↻ Réessayer',good:'✓ Terminer la tâche orale',compare:'Comparer avec l’exemple écrit',checkPoints:'J’ai répondu à tous les points de la consigne.',checkLanguage:'J’ai vérifié ma réponse avec l’exemple.',writeGood:'✓ Terminer la tâche écrite',answer:'Ta réponse',placeholder:'Écris ta propre réponse…',min:'Nombre minimal de mots',short:'Fais d’abord la tâche écrite avec une réponse suffisante.',writeNext:'Passer à la tâche écrite ↓',next:'Leçon suivante',all:'Voir les leçons',remaining:'Termine les parties restantes pour compléter la leçon.',retry:'Il faut au moins 70 %. Tes tâches personnelles restent enregistrées.',quizAgain:'Refaire les 10 exercices',best:'Meilleur résultat',dictate:'Écouter le nom épelé',dictateTip:'Écoute le nom épelé et écris-le. La solution apparaît après la comparaison.',writeHelp:'Aide pour écrire',writeHelpText:'Utilise ces blocs de phrase. Tu peux adapter le nom, le lieu, l’heure ou le nombre.',noGrade:'Tu évalues tes propres réponses libres. Il n’y a pas de correction automatique de la langue.',saved:'✓ Auto-évalué et enregistré.',unavailable:'Micro non disponible. Réponds à voix haute sans enregistrement et confirme ci-dessous.',denied:'Micro inaccessible. Tu peux pratiquer sans enregistrement.',recording:'● Enregistrement en cours…',recorded:'Enregistrement terminé. Écoute ta réponse et compare-la.',empty:'Aucun enregistrement. Réessaie.',core:'Contenu de la leçon',old:'Cette leçon était déjà terminée. Tu peux pratiquer les nouvelles tâches en complément.',plan:'Contenu de la leçon',listenDeepen:'Écouter & approfondir',interactive:'10 exercices interactifs',practical:'Mise en pratique',audioExamples:'Exemples audio & répétition',listenStep:'Écoute',quizStep:'Exercices',practiceStep:'Pratique'},
    tr:{back:'← Dersler',overview:'← Ders içeriği',start:'10 karma alıştırmayı başlat',apply:'Konuşma ve yazma çalış',part:'BÖLÜM 2 · ŞİMDİ KENDİN UYGULA',speak:'Konuşma',write:'Yazma',dialogueHelp:'Konuşma yardımı',quiz:'10 alıştırma',done:'Tamamlandı',open:'Yapılacak',complete:'Ders tamamlandı',requirements:'Tamamlamak için: on alıştırmada en az %70, ardından konuşma ve yazma görevlerini yap.',instruction:'Görevi yüksek sesle yanıtla. Sesini kaydedebilir veya mikrofon olmadan çalışabilirsin. Sonra örnekle karşılaştır ve tüm noktaları yanıtladığını kontrol et.',aloud:'Görevi yüksek sesle yanıtladım.',showOral:'Konuşma örneğiyle karşılaştır',example:'Olası yanıt',blocks:'Örnek ifadeler',listen:'Örneği dinle',self:'Yanıtım görevin tüm noktalarını karşılıyor.',again:'↻ Tekrar çalış',good:'✓ Konuşma görevini tamamla',compare:'Yazma örneğiyle karşılaştır',checkPoints:'Görevin tüm noktalarını yanıtladım.',checkLanguage:'Yanıtımı örnekle karşılaştırıp kontrol ettim.',writeGood:'✓ Yazma görevini tamamla',answer:'Yanıtın',placeholder:'Kendi yanıtını yaz…',min:'En az kelime sayısı',short:'Önce yazma görevini yeterli bir yanıtla yap.',writeNext:'Yazma görevine geç ↓',next:'Sonraki ders',all:'Derslere dön',remaining:'Dersi tamamlamak için eksik bölümleri yap.',retry:'Tamamlamak için en az %70 gerekli. Konuşma ve yazma görevlerin kaydedilir.',quizAgain:'10 alıştırmayı tekrarla',best:'En iyi sonuç',dictate:'Harf harf söylenen soyadını dinle',dictateTip:'Soyadını dinleyip yaz. Yanıt karşılaştırmadan sonra gösterilir.',writeHelp:'Yazma yardımı',writeHelpText:'Bu cümle kalıplarını kullan. İsim, yer, saat veya sayıyı değiştirebilirsin.',noGrade:'Serbest yanıtlarını kendin değerlendirirsin. Otomatik dil değerlendirmesi yapılmaz.',saved:'✓ Kontrol edildi ve kaydedildi.',unavailable:'Mikrofon kullanılamıyor. Kayıt olmadan sesli çalış ve aşağıda onayla.',denied:'Mikrofon açılamadı. Kayıt olmadan çalışabilirsin.',recording:'● Kayıt sürüyor…',recorded:'Kayıt hazır. Yanıtını dinle ve örnekle karşılaştır.',empty:'Kayıt boş. Tekrar dene.',core:'Ders içeriği',old:'Bu ders daha önce tamamlandı. Yeni görevleri ek çalışma olarak yapabilirsin.',plan:'Ders içeriği',listenDeepen:'Dinleme & derinleştirme',interactive:'10 etkileşimli alıştırma',practical:'Uygulama',audioExamples:'Dinleme örnekleri & tekrar',listenStep:'Dinleme',quizStep:'Alıştırmalar',practiceStep:'Uygulama'}
  };
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  function render(opts){
    const {lesson:l,content:c,view,state}=opts,L=UI[opts.uiLang]||UI.de;
    if(!state.lessonWork||typeof state.lessonWork!=='object'||Array.isArray(state.lessonWork))state.lessonWork={};
    const valid=state.lessonWork[l.id];
    const p=state.lessonWork[l.id]=valid&&typeof valid==='object'&&!Array.isArray(valid)?valid:{};
    if(!Array.isArray(p.heardPhrases))p.heardPhrases=[];
    const legacy=state.doneLessons.includes(l.id);
    const recId='LessonApply'+l.id;
    const best=()=>Number(state.lessonQuizBest[l.id]||0);
    const passed=()=>best()>=70;
    const complete=()=>legacy||(passed()&&p.speakingDone===true&&p.writingDone===true);
    const model=String(opts.model||'').replace(/\\n/g,'\n');
    const writingModel=String(opts.writingModel||model).replace(/\\n/g,'\n');
    const explicit=c.transfer.writing.match(/(\d+)\s*(?:[–-]\s*\d+\s*)?(?:Wörter|mots|kelime|palabras)/i);
    const minWords=explicit?Number(explicit[1]):opts.targetLang==='fr'&&l.id===2?1:3;
    let comparedText=null;
    function save(completed=false){
      if(passed()&&p.speakingDone===true&&p.writingDone===true&&!state.doneLessons.includes(l.id))state.doneLessons.push(l.id);
      opts.save(completed);
    }
    function statuses(){return `<div class="lesson-part-status" aria-label="${esc(L.apply)}">${[[L.quiz,passed()],[L.speak,p.speakingDone===true],[L.write,p.writingDone===true]].map(([label,done])=>`<span class="pill ${done?'green':'gray'}">${done?'✓':'○'} ${esc(label)}</span>`).join('')}</div>`;}
    function audioTargets(){return [...new Set((l.phrases||[]).map(x=>x?.[0]).filter(Boolean))];}
    function heardCount(){const heard=new Set(p.heardPhrases);return audioTargets().filter(x=>heard.has(x)).length;}
    function applicationCount(){return Number(p.speakingDone===true)+Number(p.writingDone===true);}
    function miniProgress(){
      const total=audioTargets().length,heard=heardCount(),audioDone=total>0&&heard>=total;
      const quizTried=p.quizDone===true||p.quizLast!=null||best()>0,application=applicationCount();
      const step=(icon,label,value,done)=>`<div class="lesson-mini-step ${done?'done':''}"><span class="lesson-mini-icon">${icon}</span><span><small>${esc(label)}</small><strong>${esc(value)}</strong></span></div>`;
      return `<div class="lesson-mini-progress" id="lessonMiniProgress" aria-label="${esc(L.plan)}">${step('🎧',L.listenStep,audioDone?'✓':`${heard}/${total}`,audioDone)}${step('✓',L.quizStep,quizTried?best()+' %':'—',passed())}${step('✦',L.practiceStep,application===2?'✓':`${application}/2`,application===2)}</div>`;
    }
    function refreshMiniProgress(){const e=document.getElementById('lessonMiniProgress');if(e)e.outerHTML=miniProgress();}
    function roadmap(){return `<div class="lesson-roadmap"><div class="lesson-roadmap-title">${esc(L.plan)}</div><div class="lesson-roadmap-steps"><span><b>1</b>${esc(L.listenDeepen)}</span><span><b>2</b>${esc(L.interactive)}</span><span><b>3</b>${esc(L.practical)}</span></div></div>`;}
    function dialogueHelp(){
      const raw=String(opts.dialogueHtml||'');
      if(!raw.trim())return '';
      const body=raw
        .replace(/<summary>[\s\S]*?<\/summary>/,'')
        .replace(/<details[^>]*>/g,'')
        .replace(/<\/details>/g,'')
        .trim();
      if(!body)return '';
      return `<div class="spacer"></div><button class="soft-btn" id="speechHelpBtn">💡 ${esc(L.dialogueHelp)}</button><div class="lesson-writing-help" id="speechHelp" hidden>${body}</div>`;
    }
    function refresh(){
      document.getElementById('lessonPartStatus').innerHTML=statuses();
      refreshMiniProgress();
      const next=document.getElementById('nextLesson');next.disabled=!complete();
      document.getElementById('lessonCompletion').textContent=complete()?L.complete:!passed()?L.retry:L.remaining;
      document.getElementById('continueWriting').hidden=p.speakingDone!==true;
      for(const [id,done] of [['oralStatus',p.speakingDone],['writingStatus',p.writingDone]]){
        const e=document.getElementById(id);e.textContent=done===true?'✓ '+L.done:L.open;e.className='pill '+(done===true?'green':'gray');
      }
    }
    function drawOverview(){
      window.A1Voice?.cancel();
      const goalsHtml=opts.goalsHtml||opts.introHtml||'';
      const grammarHtml=opts.grammarHtml||'';
      // Since v34, listened lesson phrases are stored by target text, not by row index.
      // Older numeric entries are discarded so reordering a lesson never marks the wrong sentence as heard.
      if(p.heardPhrases.some(v=>typeof v!=='string')){p.heardPhrases=p.heardPhrases.filter(v=>typeof v==='string');save();}
      const heardSet=new Set(p.heardPhrases);
      const corePhrases=`<details class="lesson-explanation lesson-core-phrases" open><summary><strong>${esc(L.audioExamples)}</strong></summary><p class="muted">${esc(opts.repeatHint)}</p>${l.phrases.map(([target,native],i)=>`<div class="phrase-row lesson-core-phrase ${heardSet.has(target)?'is-heard':''}" data-core-row="${i}"><div><strong>${esc(target)}</strong><small>${esc(native)}</small></div>${opts.speakBtn(target).replace('<button ',`<button data-core-phrase-index="${i}" `)}</div>`).join('')}</details>`;
      view.innerHTML=`<div class="between"><button class="tiny-btn" id="backLearn">${esc(L.back)}</button><span class="pill">${esc(l.topic)}</span></div><section class="card" style="margin-top:12px"><h2>${l.id}. ${esc(l.title)}</h2>${miniProgress()}${roadmap()}${goalsHtml}${corePhrases}${opts.pronunciationHtml}${grammarHtml}<p class="lesson-flow-requirements">${esc(L.requirements)}</p>${statuses()}<div class="button-row"><button class="primary-btn" id="startQuiz">${esc(L.start)}</button><button class="secondary-btn" id="startApplication">${esc(L.apply)}</button></div></section>`;
      document.getElementById('backLearn').onclick=opts.renderLearn;
      document.getElementById('startQuiz').onclick=drawQuiz;
      document.getElementById('startApplication').onclick=drawApplication;
      opts.wireSpeakButtons();window.A1Pronunciation?.wire(view);
      view.querySelectorAll('[data-core-phrase-index]').forEach(btn=>btn.addEventListener('click',()=>{
        const i=Number(btn.dataset.corePhraseIndex);if(!Number.isInteger(i))return;
        const row=view.querySelector(`.lesson-core-phrase[data-core-row="${i}"]`);
        const phraseKey=l.phrases[i]?.[0];if(!phraseKey)return;
        const firstListen=!p.heardPhrases.includes(phraseKey);
        if(firstListen){p.heardPhrases.push(phraseKey);save();refreshMiniProgress();}
        row?.classList.add('is-heard');
        if(firstListen&&row){
          row.classList.remove('just-heard');
          void row.offsetWidth;
          row.classList.add('just-heard');
          window.setTimeout(()=>row.classList.remove('just-heard'),760);
        }
      }));
      window.scrollTo({top:0,behavior:'instant'});
    }
    function drawQuiz(){
      window.A1Voice?.cancel();
      A1ExerciseEngine.run({lesson:l,view,targetLang:opts.targetLang,uiLang:opts.uiLang,playAudio:t=>opts.speak(t,true),playFeedbackAudio:opts.playFeedbackAudio,onBack:drawOverview,onFinish:(score,total)=>{
        const pct=total?Math.round(score/total*100):0;
        state.lessonQuizBest[l.id]=Math.max(best(),pct);p.quizDone=true;p.quizLast=pct;
        save(true);drawApplication();
      }});
    }
    function drawApplication(){
      window.A1Voice?.cancel();comparedText=null;
      view.innerHTML=`<div class="between"><button class="tiny-btn" id="backLessonContent">${esc(L.overview)}</button><span class="pill">${esc(L.part)}</span></div><section class="card lesson-flow" style="margin-top:12px"><h2>${l.id}. ${esc(l.title)}</h2>${miniProgress()}<p class="muted">${esc(L.quiz)}: ${p.quizLast!=null?p.quizLast+' % · ':''}${esc(L.best)} ${best()} %</p><div id="lessonPartStatus">${statuses()}</div><p>${esc(L.requirements)}</p>${legacy?`<p class="muted">${esc(L.old)}</p>`:''}<p class="muted">${esc(L.noGrade)}</p></section>
        <section class="card lesson-flow" id="lessonSpeaking"><div class="between"><h3>🎤 ${esc(L.speak)}</h3><span id="oralStatus"></span></div><p class="lesson-task-prompt">${esc(c.transfer.speaking)}</p>${dialogueHelp()}<p class="muted">${esc(L.instruction)}</p>${opts.recorderHtml(recId)}<label class="lesson-check"><input type="checkbox" id="aloudDone" ${p.speakingAttempted?'checked':''}> <span>${esc(L.aloud)}</span></label><button class="soft-btn" id="showSpeakingModel" ${p.speakingAttempted?'':'disabled'}>${esc(L.showOral)}</button><div id="speakingModel" ${p.speakingDone?'':'hidden'}><div class="solution"><strong>${esc(opts.fullModel?L.example:L.blocks)}:</strong><p>${esc(model).replace(/\n/g,'<br>')}</p></div><button class="soft-btn" data-speak="${encodeURIComponent(model)}">🔊 ${esc(L.listen)}</button><label class="lesson-check"><input type="checkbox" id="oralChecked" ${p.speakingDone?'checked':''}> <span>${esc(L.self)}</span></label><div class="button-row"><button class="secondary-btn" id="oralAgain">${esc(L.again)}</button><button class="primary-btn" id="oralGood" ${p.speakingDone?'':'disabled'}>${esc(L.good)}</button></div><div id="oralFeedback" role="status"></div></div><button class="secondary-btn" id="continueWriting" hidden>${esc(L.writeNext)}</button></section>
        <section class="card lesson-flow" id="lessonWritingSection"><div class="between"><h3>✍️ ${esc(L.write)}</h3><span id="writingStatus"></span></div><label class="lesson-task-prompt" for="lessonWriting">${esc(c.transfer.writing)}</label>${opts.targetLang==='fr'&&l.id===2?`<p class="muted">${esc(L.dictateTip)}</p><button class="soft-btn" data-pron-spell="MARTIN" data-pron-lang="fr">🔊 ${esc(L.dictate)}</button>`:''}${Array.isArray(opts.writingHints)&&opts.writingHints.length?`<div class="spacer"></div><button class="soft-btn" id="writingHelpBtn">💡 ${esc(L.writeHelp)}</button><div class="lesson-writing-help" id="writingHelp" hidden><p class="muted">${esc(opts.writingHelpText||L.writeHelpText)}</p>${opts.writingHints.map(h=>{const target=Array.isArray(h)?h[0]:h,native=Array.isArray(h)?h[1]:'';return `<div class="phrase-row"><div><strong>${esc(target)}</strong>${native?`<small>${esc(native)}</small>`:''}</div></div>`;}).join('')}</div>`:''}<textarea class="text-area lesson-writing" id="lessonWriting" placeholder="${esc(opts.placeholder||L.placeholder)}">${esc(p.writingDraft||'')}</textarea>${A1ExerciseEngine.charBar(opts.targetLang,opts.uiLang)}<p class="muted" id="writingCount"></p><button class="soft-btn" id="showWritingModel">${esc(L.compare)}</button><div id="writingModel" role="status"></div></section>
        <section class="card lesson-flow-finish"><div id="lessonCompletion" class="lesson-completion" role="status"></div><div class="button-row"><button class="secondary-btn" id="repeatQuiz">${esc(L.quizAgain)}</button><button class="primary-btn" id="nextLesson" disabled>${esc(l.id<opts.lessonCount?L.next:L.all)}</button></div></section>`;
      document.getElementById('backLessonContent').onclick=drawOverview;
      document.getElementById('repeatQuiz').onclick=drawQuiz;
      document.getElementById('nextLesson').onclick=()=>{if(complete())l.id<opts.lessonCount?opts.renderLesson(l.id+1):opts.renderLearn();};
      const aloud=document.getElementById('aloudDone'),show=document.getElementById('showSpeakingModel'),oral=document.getElementById('speakingModel'),checked=document.getElementById('oralChecked'),good=document.getElementById('oralGood');
      const reveal=()=>{oral.hidden=false;good.disabled=!aloud.checked||!checked.checked;};
      aloud.onchange=()=>{p.speakingAttempted=aloud.checked;show.disabled=!aloud.checked;good.disabled=!aloud.checked||!checked.checked;save();};
      show.onclick=reveal;checked.onchange=()=>good.disabled=!aloud.checked||!checked.checked;
      good.onclick=()=>{if(!aloud.checked||!checked.checked)return;p.speakingDone=true;save(true);document.getElementById('oralFeedback').textContent=L.saved;refresh();};
      document.getElementById('oralAgain').onclick=()=>{checked.checked=false;good.disabled=true;document.getElementById('oralFeedback').textContent='';document.getElementById('lessonSpeaking').scrollIntoView?.({behavior:'smooth',block:'start'});};
      document.getElementById('continueWriting').onclick=()=>document.getElementById('lessonWritingSection').scrollIntoView({behavior:'smooth',block:'start'});
      A1Learning.wireRecorder(recId,()=>{p.speakingAttempted=true;aloud.checked=true;show.disabled=false;save(true);reveal();},{unavailable:L.unavailable,denied:L.denied,recording:L.recording,done:L.recorded,empty:L.empty});
      const input=document.getElementById('lessonWriting'),writing=document.getElementById('writingModel');
      const writingHelpBtn=document.getElementById('writingHelpBtn'),writingHelp=document.getElementById('writingHelp');
      if(writingHelpBtn&&writingHelp)writingHelpBtn.onclick=()=>{writingHelp.hidden=!writingHelp.hidden;writingHelpBtn.setAttribute('aria-expanded',String(!writingHelp.hidden));if(!writingHelp.hidden)input.focus();};
      const speechHelpBtn=document.getElementById('speechHelpBtn'),speechHelp=document.getElementById('speechHelp');
      if(speechHelpBtn&&speechHelp)speechHelpBtn.onclick=()=>{speechHelp.hidden=!speechHelp.hidden;speechHelpBtn.setAttribute('aria-expanded',String(!speechHelp.hidden));};
      function count(){document.getElementById('writingCount').textContent=`${A1Learning.countWords(input.value)} · ${L.min}: ${minWords}`;}
      input.oninput=()=>{p.writingDraft=input.value.slice(0,12000);if(comparedText!==input.value.trim()){writing.replaceChildren();comparedText=null;}count();save();};
      A1ExerciseEngine.wireChars(input,opts.targetLang,document.getElementById('lessonWritingSection'));
      document.getElementById('showWritingModel').onclick=()=>{
        const text=input.value.trim();
        if(A1Learning.countWords(text)<minWords){writing.innerHTML=`<p class="feedback bad">${esc(L.short)} (${minWords})</p>`;return;}
        comparedText=text;p.writingDraft=input.value.slice(0,12000);save();
        writing.innerHTML=`<div class="solution"><strong>${esc(L.answer)}:</strong><p>${esc(text).replace(/\n/g,'<br>')}</p></div><div class="solution"><strong>${esc(opts.fullModel?L.example:L.blocks)}:</strong><p>${esc(writingModel).replace(/\n/g,'<br>')}</p></div><label class="lesson-check"><input type="checkbox" id="writingPoints"> <span>${esc(L.checkPoints)}</span></label><label class="lesson-check"><input type="checkbox" id="writingLanguage"> <span>${esc(L.checkLanguage)}</span></label><button class="primary-btn" id="writingGood" disabled>${esc(L.writeGood)}</button><div id="writingSelfFeedback"></div>`;
        const btn=document.getElementById('writingGood'),points=document.getElementById('writingPoints'),language=document.getElementById('writingLanguage');
        points.onchange=language.onchange=()=>btn.disabled=!points.checked||!language.checked;
        btn.onclick=()=>{if(!points.checked||!language.checked||comparedText!==input.value.trim())return;p.writingDone=true;p.writingAnswer=text.slice(0,12000);save(true);document.getElementById('writingSelfFeedback').textContent=L.saved;refresh();};
      };
      opts.wireSpeakButtons();window.A1Pronunciation?.wire(view);count();refresh();
      window.scrollTo({top:0,behavior:'instant'});
    }
    drawOverview();
  }
  window.A1LessonFlow={render};
})();
