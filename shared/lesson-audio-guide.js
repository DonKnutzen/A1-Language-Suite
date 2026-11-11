/* A complete lesson tour: detached learning content, explicit language spans,
   paced speech and no exercise navigation or grading. English keeps its pilot. */
(() => {
  'use strict';
  const doc=document,clean=s=>window.A1GuideLanguage.clean(s);
  const excluded='[data-foundation-words],button,svg,script,style,input,textarea,select,[hidden],[aria-hidden="true"],.deepening-practice,.deepening-form-examples,.lesson1-grammar-practice,.lesson-grammar-practice,.quiz-q,.options,.feedback,.lesson-grammar-position,.lesson-audio-page,.lesson-audio-pager,.lesson-listening-practice,.pronunciation-name,label,#spellFeedback,details.grammar-detail>summary,.lesson-step-footer';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const UI={
    de:{name:'Audio-Guide für die ganze Lektion',help:'Einmal starten: Hörbeispiele, Wortschatz, alle Erklärungen und der Hörtext. Danach bearbeitest du die Aufgaben selbst. Die Lernsprache hörst du zweimal, die Übersetzung einmal.',play:'▶ Ganze Lektion anhören',pause:'Ⅱ Pause',resume:'▶ Fortsetzen',stop:'■ Stopp',ready:'Bereit',paused:'Pausiert. Mit Fortsetzen hörst du hier weiter.',done:'Fertig. Jetzt kannst du die Lektion selbst durcharbeiten.',error:'Wiedergabe unterbrochen. Mit Fortsetzen kannst du an dieser Stelle weiterhören.',unavailable:'Vorlesen ist in diesem Browser nicht verfügbar.',timeline:'Position im Audio-Guide',estimated:'Zeit geschätzt',timeHelp:'Zeiten sind geschätzt. Springen und Tempowechsel setzen am Satzanfang ein.',chapter:'Abschnitt',speed:'Tempo',voices:'Stimmen',voiceReload:'Stimmen neu laden',autoVoice:'Automatisch',targetVoice:'Französisch · Lernsprache',nativeVoice:'Deutsch · Übersetzung',preview:'Hörprobe',voiceHint:'Hier wählst du die Stimmen für beide Sprachen. Die Auswahl wird auf diesem Gerät gespeichert.',noVoices:'Noch keine passende Stimme gefunden. Der Browser verwendet seine Sprachvoreinstellung.',voiceSaved:'Stimme gespeichert. Während der Wiedergabe gilt sie ab dem nächsten Sprechabschnitt.',voiceError:'Die Hörprobe konnte nicht abgespielt werden.',reading:'Mitlesen',background:'App-Wechsel kann die Browserstimme unterbrechen. Die Hörposition wird gespeichert; beim Zurückkehren kannst du hier fortsetzen.',interrupted:'Die Browserstimme wurde unterbrochen. Setze an dieser Stelle fort.',intro:'Einstieg',words:'Hörbeispiele & Wortschatz',grammar:'Grammatik & Satzmuster',dialogue:'Alltagsdialog',listen:'Hörtext',practice:'Selbst anwenden',finale:'Vorbereitung aufs optionale Finale',end:'Dein nächster Schritt'},
    fr:{name:'Guide audio de toute la leçon',help:'Une seule lecture : exemples, vocabulaire, toutes les explications et le texte audio. Ensuite, fais les exercices toi-même. Les exemples allemands sont lus deux fois, leur traduction une seule fois.',play:'▶ Écouter toute la leçon',pause:'Ⅱ Pause',resume:'▶ Reprendre',stop:'■ Arrêter',ready:'Prêt',paused:'En pause. Reprendre continue à cet endroit.',done:'Terminé. Tu peux maintenant travailler la leçon toi-même.',error:'Lecture interrompue. Appuie sur Reprendre pour continuer ici.',unavailable:'La lecture audio n’est pas disponible dans ce navigateur.',timeline:'Position dans le guide audio',estimated:'Durée estimée',timeHelp:'Durées estimées. Un déplacement ou un changement de vitesse reprend au début de la phrase.',chapter:'Partie',speed:'Vitesse',voices:'Voix',voiceReload:'Actualiser les voix',autoVoice:'Automatique',targetVoice:'Allemand · langue apprise',nativeVoice:'Français · traduction',preview:'Écouter',voiceHint:'Choisis les deux voix ici. Ton choix est enregistré sur cet appareil.',noVoices:'Aucune voix correspondante disponible pour le moment. Le navigateur utilise sa voix par défaut.',voiceSaved:'Voix enregistrée. Pendant la lecture, elle sera utilisée au prochain passage.',voiceError:'Impossible de lire cet exemple.',reading:'Lire en écoutant',background:'Changer d’application peut interrompre la voix du navigateur. Ta position est enregistrée et tu peux reprendre ici.',interrupted:'La voix du navigateur a été interrompue. Reprends à cet endroit.',intro:'Introduction',words:'Exemples & vocabulaire',grammar:'Grammaire & structures',dialogue:'Dialogue',listen:'Compréhension orale',practice:'À toi de pratiquer',finale:'Préparation à la finale facultative',end:'La suite'}
  };
  function create({targetLang,nativeLang}){
    const base=targetLang.split('-')[0],L=UI[nativeLang.startsWith('fr')?'fr':'de'],german=nativeLang.startsWith('de');
    let disposeCurrent=()=>{},instance=0;
    const element=html=>{const root=doc.createElement('div');root.innerHTML=html||'';return root;};
    function language(options,roots=[]){return window.A1GuideLanguage.create({targetLang,nativeLang,lesson:options.lesson,roots});}
    function speechText(text,lang){
      text=clean(text).replace(/→/g,lang===nativeLang?(german?' wird zu ':' devient '):', ').replace(/\s*\/\s*/g,', ').replace(/&/g,lang.startsWith('fr')?' et ':' und ');
      if(lang===targetLang)text=text.replace(/(^|[\s,;])-(\p{L}+)/gu,(_,before,ending)=>before+(window.A1Pronunciation?.spellParts(ending,base)?.join(', ')||ending.split('').join(', ')));
      if(lang===targetLang)text=text.replace(/(?<!\p{L})\p{Lu}(?:[-–—]\p{Lu})+(?!\p{L})/gu,name=>window.A1Pronunciation?.spellParts(name,base)?.join(', ')||name.replace(/[-–—]/g,', '));
      if(lang===nativeLang){
        text=german?text.replace(/\bMin\./g,'Minuten').replace(/\bP\./g,'Punkte').replace(/\bca\./g,'ungefähr').replace(/\bmax\./g,'höchstens').replace(/\bz\.\s*B\./g,'zum Beispiel').replace(/\bbzw\./g,'beziehungsweise'):text.replace(/\bmin\./gi,'minutes').replace(/\bpar ex\./gi,'par exemple');
      }
      return text.replace(/_{2,}/g,german?' Lücke ':' blanc ').replace(/\*\*/g,'');
    }
    function chunks(parts){
      const out=[];
      for(const p of parts){
        const text=speechText(p.text,p.lang);if(!/[\p{L}\p{N}]/u.test(text))continue;
        // Break long utterances on phrase boundaries. No queue of an entire
        // lesson: one retained utterance, then its paced successor.
        const sentences=text.match(/[^.!?]+(?:[.!?]+|$)/g)||[text];
        for(const sentence of sentences){
          let remaining=clean(sentence);
          while(remaining.length>230){let cut=remaining.lastIndexOf(', ',220);if(cut<70)cut=remaining.lastIndexOf(' ',220);if(cut<1)cut=220;out.push({...p,text:remaining.slice(0,cut).trim(),pauseAfter:150});remaining=remaining.slice(cut).trim();}
          if(remaining)out.push({...p,text:remaining,pauseAfter:/[.!?]$/.test(remaining)||p.boundary?300:110});
        }
      }
      return out;
    }
    function readContent(root,options={}){
      if(!root)return [];
      const copy=root.cloneNode(true),lang=options.language||language(options,[copy]);lang.annotate(copy);
      copy.querySelectorAll(excluded).forEach(n=>n.remove());
      const parts=[];
      const add=p=>{if(!p.text)return;const previous=parts.at(-1);if(previous&&previous.lang===p.lang&&!previous.boundary)previous.text+=' '+p.text;else parts.push({...p});};
      function walk(node,inherited=null){
        if(node.nodeType===3){const s=clean(node.textContent);if(!s)return;let ps;if(inherited)ps=[{text:s,lang:inherited}];else{
          const block=node.parentElement.closest('p,li,h1,h2,h3,h4,h5,h6,summary,td,th,dt,dd')||node.parentElement;
          const range=doc.createRange();range.selectNodeContents(block);range.setEnd(node,0);const prefix=clean(range.toString()),context=clean(block.textContent),offset=context.indexOf(s,prefix.length);
          ps=offset>=0?lang.split(s,{context,offset}):lang.split(s);
        }ps.forEach(add);return;}
        if(node.nodeType!==1)return;
        const own=node.getAttribute('lang');const current=own?(own.startsWith(base)?targetLang:nativeLang):inherited;
        for(const child of node.childNodes)walk(child,current);
        if(/^(P|LI|H[1-6]|TR|DT|DD|SUMMARY)$/.test(node.tagName)||node.matches('.phrase-row,.lesson-foundation-example')){if(parts.length)parts.at(-1).boundary=true;}
      }
      walk(copy);return chunks(parts);
    }
    function plan(options){
      const {lesson,grammarPages=[],introHtml='',dialogueHtml='',finaleHtml='',content=lesson,comprehension=window.A1_COMPREHENSION_CONTENT?.[lesson.id],masteryCount}=options;
      const introRoot=element(introHtml),goalRoot=element(options.goalsHtml||''),pages=grammarPages.map(p=>({...p,root:element(p.html)})),dialogue=element(dialogueHtml),finale=element(finaleHtml);
      const lang=language(options,[introRoot,goalRoot,dialogue,finale,...pages.map(p=>p.root)]),parts=[];
      let chapter=0;
      function say(text,language=nativeLang,extra={}){parts.push(...chunks([{text,lang:language,...extra}]).map((p,i,a)=>({...p,chapter,...extra,pauseAfter:i===a.length-1?(extra.pauseAfter??p.pauseAfter):p.pauseAfter})));}
      function native(text){for(const p of lang.split(text))say(p.text,p.lang);}
      function title(label){chapter++;const heading=chunks(lang.split(label));heading.forEach((p,i)=>parts.push({...p,chapter,...(i===0?{chapterTitle:label}:{}),pauseAfter:i===heading.length-1?500:100}));}
      function contentParts(root){for(const p of readContent(root,{...options,language:lang}))parts.push({...p,chapter});}
      title(L.intro);
      native(german?`Willkommen zu Lektion ${lesson.id}: ${lesson.title}. Du hörst jetzt die Lerninhalte der ganzen Lektion. Du brauchst zwischendurch nichts anzuklicken. Danach kannst du alles selbst üben.`:`Bienvenue dans la leçon ${lesson.id} : ${lesson.title}. Tu vas écouter le contenu de toute la leçon, sans changer de page. Ensuite, tu pourras travailler les exercices toi-même.`);
      contentParts(goalRoot);
      title(L.words);
      say(german?'Höre das französische Beispiel und danach seine deutsche Bedeutung. Das Beispiel hörst du nach der Übersetzung noch einmal. Du kannst leise mitsprechen.':'Écoute l’exemple allemand, puis sa traduction française. Après la traduction, chaque exemple allemand est répété. Tu peux répéter à voix basse.');
      lesson.phrases.forEach(([target,meaning],index)=>{
        parts.push({text:speechText(target,targetLang),lang:targetLang,chapter,phrase:index,repeat:1,pauseAfter:280,phraseEnd:false});
        say(meaning,nativeLang,{pauseAfter:420,sourcePhrase:index});
        parts.push({text:speechText(target,targetLang),lang:targetLang,chapter,phrase:index,repeat:2,phraseEnd:true,pauseAfter:650});
      });
      // The introduction's supporting words and rules are independent of the
      // visible page, and never include the exercise widget or its answers.
      contentParts(introRoot);
      for(const [i,page] of pages.entries()){
        title(`${L.grammar} ${i+1}: ${page.title}`);contentParts(page.root);
      }
      if(clean(dialogue.textContent)){
        title(L.dialogue);say(german?'Höre jetzt den Alltagsdialog. Achte darauf, wie die Satzmuster zusammen verwendet werden.':'Écoute maintenant le dialogue. Remarque comment les structures sont utilisées ensemble.');
        // French dialogue rows have no lang attribute; their strong elements are
        // marked by the language reader. French translations stay French in DE.
        contentParts(dialogue);
      }
      const turns=comprehension?.turns||[];
      if(turns.length){
        title(L.listen);say(german?'Jetzt hörst du den Hörtext der Lektion einmal. Achte auf die Situation und auf Einzelheiten. Die Fragen beantwortest du später selbst.':'Tu vas écouter le texte de la leçon une fois. Écoute la situation et les détails. Tu répondras aux questions toi-même après le guide.');
        for(const turn of turns)say(turn.text,targetLang,{pauseAfter:400,listening:true,round:1});
      }
      if(clean(finale.textContent)){
        title(L.finale);say(german?'Zum Schluss noch die zusätzlichen Wörter für das optionale Finale. Die Aufgaben bearbeitest du später selbst.':'Voici les mots supplémentaires de la finale facultative. Tu feras les exercices toi-même ensuite.');contentParts(finale);
      }
      if(content.transfer?.speaking||content.transfer?.writing){
        title(L.practice);
        if(content.transfer.speaking){say(german?'Das ist deine Sprechaufgabe für später:':'Voici la tâche orale pour après le guide :');native(content.transfer.speaking);}
        if(content.transfer.writing){say(german?'Das ist deine Schreibaufgabe für später:':'Voici la tâche écrite pour après le guide :');native(content.transfer.writing);}
      }
      title(L.end);
      say(german?`Der Audio-Guide ist zu Ende. Jetzt bist du dran. Gehe die Lektion in deinem Tempo durch. Bearbeite den Vokabel-Check mit zehn Fragen, die Übungen zu den Erklärungen und die Hörfragen. Anschließend kannst du den Lektionscheck${masteryCount?' mit '+masteryCount+' Fragen':''} und die weiteren Aufgaben bearbeiten. Die Wiedergabe hat keine deiner Antworten bewertet.`:`Le guide audio est terminé. À toi de jouer. Parcours la leçon à ton rythme. Fais le quiz de vocabulaire de dix questions, les exercices des explications et les questions de compréhension orale. Ensuite, tu peux faire le bilan${masteryCount?' de '+masteryCount+' questions':''} et les autres activités. Aucune réponse n’a été évaluée pendant le guide.`);
      return parts;
    }
    function timing(parts,multiplier=1,measured=new Map()){
      const starts=[],durations=[],pauses=[];let total=0;
      for(const [i,part] of parts.entries()){
        const words=(part.text.match(/[\p{L}\p{N}]+/gu)||[]).length;
        const units=Math.max(words,part.text.replace(/\s/g,'').length/6);
        const baseline=Math.max(.4,(units*60/175+(part.text.match(/[,;:.!?]/g)||[]).length*.1)/(part.lang===targetLang?.74:.86));
        starts.push(total);durations.push((measured.get(i)||baseline)/multiplier);
        pauses.push(i===parts.length-1?0:(part.pauseAfter??280)/1000);total+=durations[i]+pauses[i];
      }
      return {starts,durations,pauses,total};
    }
    function formatTime(seconds){const s=Math.max(0,Math.floor(seconds));return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;}
    function mount(options){
      disposeCurrent();const {view}=options,voice=window.A1Voice,id=`lesson-guide-${++instance}`;
      const host=doc.createElement('section');host.className='guided-audio card';host.dataset.i18nIgnore='';host.setAttribute('aria-label',L.name);
      host.innerHTML=`<strong>${esc(L.name)}</strong><p>${esc(L.help)}</p><div class="button-row"><button type="button" class="primary-btn" data-guided-play>${esc(L.play)}</button><button type="button" class="secondary-btn" data-guided-stop disabled>${esc(L.stop)}</button></div><section class="guide-voices" aria-label="${esc(L.voices)}"><strong>${esc(L.voices)}</strong><div class="guide-voice-grid">${[[targetLang,L.targetVoice],[nativeLang,L.nativeVoice]].map(([lang,label],i)=>`<div class="guide-control"><label for="${id}-voice-${i}">${esc(label)}</label><select id="${id}-voice-${i}" data-guide-voice="${lang}"></select><button type="button" class="tiny-btn" data-guide-voice-preview="${lang}" aria-label="${esc(L.preview+': '+label)}">${esc(L.preview)}</button></div>`).join('')}</div><button type="button" class="tiny-btn" data-guide-voice-reload>${esc(L.voiceReload)}</button><small data-guide-voice-note role="status">${esc(L.voiceHint)}</small></section><div class="guide-controls"><div class="guide-control"><label for="${id}-chapter">${esc(L.chapter)}</label><select id="${id}-chapter" data-guide-chapter></select></div><div class="guide-control"><label for="${id}-speed">${esc(L.speed)} <output data-guide-speed-value aria-hidden="true">1,00×</output></label><input id="${id}-speed" type="range" data-guide-speed min="0.6" max="1.6" step="0.05" value="1"></div></div><div class="guide-timeline"><label for="${id}-time">${esc(L.timeline)}</label><input id="${id}-time" type="range" data-guide-timeline min="0" max="1" step="1" value="0"><div class="guide-time-readout"><output data-guide-current aria-live="off">0:00</output><span>/</span><span>≈ <output data-guide-total aria-live="off">0:00</output></span></div><small>${esc(L.timeHelp)}</small></div><p data-guided-status role="status" aria-live="polite">${esc(L.ready)}</p><p data-guide-caption class="guide-current-line" aria-live="off"></p><label class="guide-read-toggle"><input type="checkbox" data-guide-read checked> ${esc(L.reading)}</label><section data-guide-reading class="guide-reading" aria-label="${esc(L.reading)}"><h3 data-guide-reading-title>${esc(L.reading)}</h3><div data-guide-reading-lines></div></section><small class="guide-background-note">${esc(L.background)}</small>`;
      view.querySelector('.lesson-step-header')?.after(host);if(!host.isConnected)return;
      const play=host.querySelector('[data-guided-play]'),stop=host.querySelector('[data-guided-stop]'),status=host.querySelector('[data-guided-status]'),caption=host.querySelector('[data-guide-caption]'),timeline=host.querySelector('[data-guide-timeline]'),chapterSelect=host.querySelector('[data-guide-chapter]'),speed=host.querySelector('[data-guide-speed]'),speedValue=host.querySelector('[data-guide-speed-value]'),currentTime=host.querySelector('[data-guide-current]'),totalTime=host.querySelector('[data-guide-total]');
      const speedKey=`a1suite.lessonGuideSpeed.${base}.${nativeLang}`,measured=new Map();
      const reading=host.querySelector('[data-guide-reading]'),readingLines=host.querySelector('[data-guide-reading-lines]'),readToggle=host.querySelector('[data-guide-read]'),voiceNote=host.querySelector('[data-guide-voice-note]'),voiceLists=new Map();
      const bookmarkBase=`a1suite.lessonGuidePosition.${window.A1_APP_META?.course||base+'-'+nativeLang}.${options.lesson.id}`,bookmarkKey=window.A1Profile?.namespacedKey?.(bookmarkBase)||bookmarkBase;

      try{const saved=Number(window.localStorage.getItem(speedKey));if(saved>=.6&&saved<=1.6)speed.value=String(saved);}catch{}
      const parts=plan(options),now=()=>window.performance.now(),factor=()=>Math.min(1.6,Math.max(.6,Number(speed.value)||1));
      let readerChapter=null,readerActive=null,markedSource=null,previewRun=0;
      let model=timing(parts,factor(),measured),index=0,run=0,playing=false,paused=false,timer=null,ticker=null,current=null,disposed=false,lastChapter=null,phase='idle',phaseStarted=0,frozen=0,gapIndex=0,finished=false,scrubbing=false,preview=0;
      chapterSelect.innerHTML=parts.map((p,i)=>p.chapterTitle?`<option value="${i}">${esc(p.chapterTitle)}</option>`:'').join('');
      let fingerprint=2166136261;for(const p of parts)for(const char of p.lang+'|'+p.text){fingerprint^=char.charCodeAt(0);fingerprint=Math.imul(fingerprint,16777619);}fingerprint=String(fingerprint>>>0);
      function checkpoint(){try{if(finished||(!playing&&!paused&&index===0))window.localStorage.removeItem(bookmarkKey);else window.localStorage.setItem(bookmarkKey,JSON.stringify({fingerprint,index}));}catch{}}
      try{const saved=JSON.parse(window.localStorage.getItem(bookmarkKey)||'null');if(saved?.fingerprint===fingerprint&&Number.isInteger(saved.index)&&saved.index>=0&&saved.index<parts.length){index=saved.index;paused=true;frozen=model.starts[index];play.textContent=L.resume;stop.disabled=false;}}catch{}
      function clearHighlight(){if(readerActive){readerActive.classList.remove('is-current');readerActive.removeAttribute('aria-current');readerActive.textContent=speechText(parts[Number(readerActive.dataset.guideLine)].text,parts[Number(readerActive.dataset.guideLine)].lang);}readerActive=null;markedSource?.classList.remove('guide-source-current');markedSource=null;caption.classList.remove('is-current');}
      function follow(partIndex=index){
        if(doc.visibilityState==='hidden')return;
        const part=parts[partIndex];if(!part)return;
        if(readToggle.checked){
          if(readerChapter!==part.chapter){
            readerChapter=part.chapter;host.querySelector('[data-guide-reading-title]').textContent=parts.find(p=>p.chapter===part.chapter&&p.chapterTitle)?.chapterTitle||L.reading;
            const fragment=doc.createDocumentFragment();parts.forEach((p,i)=>{if(p.chapter!==part.chapter)return;const line=doc.createElement('p');line.dataset.guideLine=String(i);line.lang=p.lang;line.textContent=speechText(p.text,p.lang);fragment.append(line);});readingLines.replaceChildren(fragment);
          }
          clearHighlight();readerActive=readingLines.querySelector(`[data-guide-line="${partIndex}"]`);if(readerActive){readerActive.classList.add('is-current');readerActive.setAttribute('aria-current','true');const r=reading.getBoundingClientRect(),a=readerActive.getBoundingClientRect();if(reading.clientHeight>0&&(a.top<r.top||a.bottom>r.bottom))reading.scrollTop+=a.top-r.top-reading.clientHeight*.35;}
        }else clearHighlight();
        caption.lang=part.lang;caption.classList.add('is-current');
        if((part.sourcePhrase??part.phrase)!==undefined){const row=view.querySelector(`[data-core-row="${part.sourcePhrase??part.phrase}"]`);markedSource=row?.querySelector(part.lang===targetLang?'strong':'small')||null;markedSource?.classList.add('guide-source-current');}
      }
      function renderVoices(){
        let missing=false;
        for(const select of host.querySelectorAll('[data-guide-voice]')){
          const lang=select.dataset.guideVoice,list=voice?.matching?.(lang)||[],pref=voice?.getVoicePreference?.(lang),map=new Map();
          select.replaceChildren();const auto=doc.createElement('option');auto.value='auto';auto.textContent=L.autoVoice;select.append(auto);
          for(const v of list){const value=encodeURIComponent(JSON.stringify({uri:v.voiceURI,name:v.name}));map.set(value,{uri:v.voiceURI,name:v.name});const opt=doc.createElement('option');opt.value=value;opt.textContent=v.name+' · '+v.lang;select.append(opt);if(pref?.uri===v.voiceURI&&pref?.name===v.name)select.value=value;}
          voiceLists.set(lang,map);missing||=!list.length;
        }
        voiceNote.textContent=missing?L.noVoices:L.voiceHint;
      }
      function position(){
        if(finished)return model.total;
        if(phase==='speech')return model.starts[index]+Math.min(model.durations[index],Math.max(0,(now()-phaseStarted)/1000));
        if(phase==='gap')return model.starts[gapIndex]+model.durations[gapIndex]+Math.min(model.pauses[gapIndex],Math.max(0,(now()-phaseStarted)/1000));
        return frozen;
      }
      function renderTime(){
        const value=Math.min(model.total,scrubbing?preview:position()),maximum=Math.ceil(model.total);
        timeline.max=String(maximum);if(!scrubbing)timeline.value=String(finished?maximum:Math.floor(value));
        currentTime.textContent=formatTime(finished?maximum:value);totalTime.textContent=formatTime(maximum);
        timeline.setAttribute('aria-valuetext',`${formatTime(finished?maximum:value)} / ${formatTime(maximum)} · ${L.estimated}`);
        speedValue.textContent=factor().toFixed(2).replace('.',',')+'×';speed.setAttribute('aria-valuetext',speedValue.textContent);
      }
      function clear(){if(timer!==null)window.clearTimeout(timer);if(ticker!==null)window.clearInterval(ticker);timer=null;ticker=null;}
      function cancel(){run++;previewRun++;clear();current=null;phase='idle';voice?.cancel();}
      function startTicker(){if(ticker!==null)window.clearInterval(ticker);ticker=window.setInterval(renderTime,200);}
      function update(){
        const activeIndex=phase==='gap'?gapIndex:index,part=parts[activeIndex];
        if(part){caption.textContent=speechText(part.text,part.lang);if(lastChapter!==part.chapter){lastChapter=part.chapter;status.textContent=parts.find(p=>p.chapter===part.chapter&&p.chapterTitle)?.chapterTitle||L.name;chapterSelect.value=String(parts.findIndex(p=>p.chapter===part.chapter&&p.chapterTitle));}}
        follow(activeIndex);renderTime();
      }
      function stopped(message=L.ready){cancel();playing=false;paused=false;finished=false;scrubbing=false;frozen=0;index=0;lastChapter=null;play.textContent=L.play;stop.disabled=true;status.textContent=message;caption.textContent='';chapterSelect.value='0';clearHighlight();checkpoint();renderTime();}
      function complete(){cancel();playing=false;paused=false;finished=true;scrubbing=false;play.textContent=L.play;stop.disabled=true;status.textContent=L.done;caption.textContent='';index=0;lastChapter=null;clearHighlight();checkpoint();renderTime();}
      function next(token){
        if(disposed||token!==run||!playing)return;
        if(index>=parts.length){complete();return;}
        const part=parts[index],speechIndex=index,multiplier=factor();phase='speech';phaseStarted=now();frozen=model.starts[index];update();if(part.phrase!==undefined)options.onPhraseStart?.(part.phrase);follow(index);
        const u=current=new window.SpeechSynthesisUtterance(speechText(part.text,part.lang)),selected=voice.select(part.lang);
        u.lang=selected?.lang||part.lang;if(selected)u.voice=selected;u.rate=(part.lang===targetLang?.74:.86)*multiplier;u.pitch=1;u.volume=1;
        let handled=false;
        u.onboundary=e=>{
          if(token!==run||disposed||!readerActive||!readToggle.checked||doc.visibilityState==='hidden')return;
          const start=Number(e.charIndex);if(!Number.isInteger(start)||start<0||start>=u.text.length)return;const rest=u.text.slice(start),length=Number(e.charLength)||rest.match(/^\S+/)?.[0].length||0;if(!length)return;
          const mark=doc.createElement('mark');mark.textContent=u.text.slice(start,start+length);readerActive.replaceChildren(doc.createTextNode(u.text.slice(0,start)),mark,doc.createTextNode(u.text.slice(start+length)));
        };
        u.onend=()=>{
          if(handled||token!==run||disposed)return;handled=true;current=null;
          const duration=(now()-phaseStarted)/1000;if(duration>=.2){measured.set(speechIndex,duration*multiplier);model=timing(parts,factor(),measured);}
          if(part.phraseEnd)options.onPhraseEnd?.(part.phrase);
          index++;gapIndex=speechIndex;phase='gap';phaseStarted=now();checkpoint();renderTime();
          if(index>=parts.length){next(token);return;}
          timer=window.setTimeout(()=>{timer=null;next(token);},part.pauseAfter??280);
        };
        u.onerror=()=>{if(handled||token!==run||disposed)return;handled=true;frozen=position();cancel();playing=false;paused=true;play.textContent=L.resume;stop.disabled=false;status.textContent=L.error;checkpoint();renderTime();};
        startTicker();try{voice.playUtterance(u,part.lang);}catch{u.onerror();}
      }
      function seekIndex(destination,wasPlaying=playing){
        cancel();index=Math.max(0,Math.min(parts.length-1,destination));lastChapter=null;finished=false;scrubbing=false;frozen=model.starts[index];paused=true;stop.disabled=false;playing=wasPlaying;update();
        checkpoint();if(wasPlaying){play.textContent=L.pause;next(run);}else play.textContent=L.resume;
      }
      play.onclick=()=>{
        if(playing){frozen=position();cancel();playing=false;paused=true;play.textContent=L.resume;status.textContent=L.paused;checkpoint();renderTime();return;}
        cancel();finished=false;playing=true;paused=false;stop.disabled=false;play.textContent=L.pause;next(run);
      };
      stop.onclick=()=>stopped();
      chapterSelect.onchange=()=>seekIndex(Number(chapterSelect.value));
      timeline.oninput=()=>{scrubbing=true;preview=Number(timeline.value);renderTime();};
      timeline.onchange=()=>{
        const value=Math.min(model.total,Number(timeline.value));if(value>=model.total){complete();return;}let destination=parts.length-1;
        for(let i=0;i<parts.length-1;i++)if(value<model.starts[i+1]){destination=i;break;}
        seekIndex(destination);
      };
      speed.oninput=()=>{speedValue.textContent=factor().toFixed(2).replace('.',',')+'×';speed.setAttribute('aria-valuetext',speedValue.textContent);};
      speed.onchange=()=>{
        try{window.localStorage.setItem(speedKey,String(factor()));}catch{}
        const wasPlaying=playing,wasFinished=finished;cancel();model=timing(parts,factor(),measured);frozen=wasFinished?model.total:model.starts[index];finished=wasFinished;renderTime();
        checkpoint();if(wasPlaying){playing=true;next(run);}else if(paused){play.textContent=L.resume;}
      };
      function hold(message=L.paused){if(!playing)return;frozen=position();cancel();playing=false;paused=true;play.textContent=L.resume;status.textContent=message;checkpoint();renderTime();}
      for(const select of host.querySelectorAll('[data-guide-voice]'))select.onchange=()=>{const lang=select.dataset.guideVoice,choice=select.value==='auto'?null:voiceLists.get(lang)?.get(select.value);if(voice?.setVoice?.(lang,choice))voiceNote.textContent=L.voiceSaved;else renderVoices();};
      host.querySelector('[data-guide-voice-reload]').onclick=renderVoices;
      for(const button of host.querySelectorAll('[data-guide-voice-preview]'))button.onclick=()=>{
        hold();cancel();const token=++previewRun,lang=button.dataset.guideVoicePreview,u=new window.SpeechSynthesisUtterance(({fr:'Bonjour ! Je m’appelle Léa.',de:'Hallo! Ich heiße Anna.'})[lang.split('-')[0]]),selected=voice.select(lang);u.lang=selected?.lang||lang;if(selected)u.voice=selected;u.rate=.85;
        u.onerror=()=>{if(token===previewRun&&!disposed)voiceNote.textContent=L.voiceError;};try{voice.playUtterance(u,lang);}catch{u.onerror();}
      };
      readToggle.onchange=()=>{reading.hidden=!readToggle.checked;if(readToggle.checked&&(playing||paused))follow(phase==='gap'?gapIndex:index);else clearHighlight();};
      const external=e=>{if(!host.contains(e.target)&&e.target.closest?.('button,a'))hold();};
      const leave=()=>{hold();checkpoint();};
      const visibility=()=>{
        checkpoint();if(doc.visibilityState==='hidden')return;
        const synth=window.speechSynthesis;
        if(playing&&phase==='speech'&&current&&synth?.speaking===false&&synth?.pending===false)hold(L.interrupted);
        else{if(playing&&synth?.paused===true)synth.resume?.();update();}
      };
      doc.addEventListener('click',external,true);doc.addEventListener('visibilitychange',visibility);window.addEventListener('pagehide',leave);window.addEventListener('a1voicechange',renderVoices);window.speechSynthesis?.addEventListener?.('voiceschanged',renderVoices);
      const observer=new MutationObserver(()=>{if(!host.isConnected)dispose();});observer.observe(view,{childList:true,subtree:true});
      function dispose(){if(disposed)return;checkpoint();disposed=true;cancel();clearHighlight();observer.disconnect();doc.removeEventListener('click',external,true);doc.removeEventListener('visibilitychange',visibility);window.removeEventListener('pagehide',leave);window.removeEventListener('a1voicechange',renderVoices);window.speechSynthesis?.removeEventListener?.('voiceschanged',renderVoices);host.remove();}
      disposeCurrent=dispose;renderVoices();if(paused)update();else{readingLines.textContent=german?'Nach Play erscheint hier der Text mit der aktuellen Markierung.':'Après lecture, le passage en cours est mis en évidence ici.';renderTime();}
      if(!window.speechSynthesis||!window.SpeechSynthesisUtterance||!voice?.playUtterance){play.disabled=true;status.textContent=L.unavailable;}
    }
    return {plan,mount,readContent,speechText,timing,formatTime};
  }
  window.A1LessonAudioGuide={create};
})();
