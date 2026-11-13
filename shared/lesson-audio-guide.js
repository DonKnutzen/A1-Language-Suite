/* A complete lesson tour: detached learning content, explicit language spans,
   paced speech and no exercise navigation or grading. English keeps its pilot. */
(() => {
  'use strict';
  const doc=document,clean=s=>window.A1GuideLanguage.clean(s);
  const excluded='[data-foundation-words],button,svg,script,style,input,textarea,select,[hidden],[aria-hidden="true"],.deepening-practice,.deepening-form-examples,.lesson1-grammar-practice,.lesson-grammar-practice,.quiz-q,.options,.feedback,.lesson-grammar-position,.lesson-audio-page,.lesson-audio-pager,.lesson-listening-practice,.pronunciation-name,label,#spellFeedback,details.grammar-detail>summary,.lesson-step-footer';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const UI={
    de:{shortName:'Audio-Guide',settings:'Stimmen & Tempo',name:'Audio-Guide für die ganze Lektion',help:'Einmal starten: Hörbeispiele, Wortschatz und alle Erklärungen vor dem Lektionscheck. Danach bearbeitest du die Aufgaben selbst. Die Lernsprache hörst du zweimal, die Übersetzung einmal.',play:'▶ Anhören',pause:'Ⅱ Pause',resume:'▶ Fortsetzen',stop:'■ Stopp',ready:'Bereit',paused:'Pausiert. Mit Fortsetzen hörst du hier weiter.',done:'Fertig. Jetzt kannst du die Lektion selbst durcharbeiten.',error:'Wiedergabe unterbrochen. Mit Fortsetzen kannst du an dieser Stelle weiterhören.',unavailable:'Vorlesen ist in diesem Browser nicht verfügbar.',timeline:'Position im Audio-Guide',estimated:'Zeit geschätzt',timeHelp:'Zeiten sind geschätzt. Springen und Tempowechsel setzen am Satzanfang ein.',chapter:'Abschnitt',speed:'Tempo',voices:'Stimmen',voiceReload:'Stimmen neu laden',autoVoice:'Automatisch',targetVoice:'Französisch · Lernsprache',nativeVoice:'Deutsch · Übersetzung',preview:'Hörprobe',voiceHint:'Hier wählst du die Stimmen für beide Sprachen. Die Auswahl wird auf diesem Gerät gespeichert.',noVoices:'Noch keine passende Stimme gefunden. Der Browser verwendet seine Sprachvoreinstellung.',voiceSaved:'Stimme gespeichert. Während der Wiedergabe gilt sie ab dem nächsten Sprechabschnitt.',voiceError:'Die Hörprobe konnte nicht abgespielt werden.',reading:'Mitlesen',background:'App-Wechsel kann die Browserstimme unterbrechen. Die Hörposition wird gespeichert; beim Zurückkehren kannst du hier fortsetzen.',interrupted:'Die Browserstimme wurde unterbrochen. Setze an dieser Stelle fort.',intro:'Einstieg',words:'Hörbeispiele & Wortschatz',grammar:'Grammatik & Satzmuster',dialogue:'Alltagsdialog',listen:'Hörtext',practice:'Selbst anwenden',finale:'Vorbereitung aufs optionale Finale',end:'Dein nächster Schritt'},
    fr:{shortName:'Guide audio',settings:'Voix et vitesse',name:'Guide audio de toute la leçon',help:'Une seule lecture : exemples, vocabulaire et explications avant le bilan. Ensuite, fais les exercices toi-même. Les exemples allemands sont lus deux fois, leur traduction une seule fois.',play:'▶ Écouter',pause:'Ⅱ Pause',resume:'▶ Reprendre',stop:'■ Arrêter',ready:'Prêt',paused:'En pause. Reprendre continue à cet endroit.',done:'Terminé. Tu peux maintenant travailler la leçon toi-même.',error:'Lecture interrompue. Appuie sur Reprendre pour continuer ici.',unavailable:'La lecture audio n’est pas disponible dans ce navigateur.',timeline:'Position dans le guide audio',estimated:'Durée estimée',timeHelp:'Durées estimées. Un déplacement ou un changement de vitesse reprend au début de la phrase.',chapter:'Partie',speed:'Vitesse',voices:'Voix',voiceReload:'Actualiser les voix',autoVoice:'Automatique',targetVoice:'Allemand · langue apprise',nativeVoice:'Français · traduction',preview:'Écouter',voiceHint:'Choisis les deux voix ici. Ton choix est enregistré sur cet appareil.',noVoices:'Aucune voix correspondante disponible pour le moment. Le navigateur utilise sa voix par défaut.',voiceSaved:'Voix enregistrée. Pendant la lecture, elle sera utilisée au prochain passage.',voiceError:'Impossible de lire cet exemple.',reading:'Lire en écoutant',background:'Changer d’application peut interrompre la voix du navigateur. Ta position est enregistrée et tu peux reprendre ici.',interrupted:'La voix du navigateur a été interrompue. Reprends à cet endroit.',intro:'Introduction',words:'Exemples & vocabulaire',grammar:'Grammaire & structures',dialogue:'Dialogue',listen:'Compréhension orale',practice:'À toi de pratiquer',finale:'Préparation à la finale facultative',end:'La suite'}
  };
  function create({targetLang,nativeLang,languageReader}){
    const base=targetLang.split('-')[0],L={...UI[nativeLang.startsWith('fr')?'fr':'de'],...(targetLang.startsWith('el')?{targetVoice:'Griechisch · Lernsprache'}:{})},german=nativeLang.startsWith('de');
    let disposeCurrent=()=>{},instance=0,relocating=false,relocate=null;
    const element=html=>{const root=doc.createElement('div');root.innerHTML=html||'';return root;};
    function language(options,roots=[]){if(languageReader)return languageReader({...options,roots});return window.A1GuideLanguage.create({targetLang,nativeLang,lesson:options.lesson,roots});}
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
      const copy=root.cloneNode(true);
      for(const label of copy.querySelectorAll('.phrase-row small,[data-guide-speaker-label]')){
        const text=clean(label.textContent),aria=label.getAttribute('aria-label')||'';
        if(label.hasAttribute('data-guide-speaker-label')||/^(?:Person|Personne|Speaker|Sprecher(?:in)?)\s+[AB]$/i.test(text)||(/^[AB]$/.test(text)&&(/^(?:Person|Personne|Speaker)\s+[AB]$/i.test(aria)||label.nextElementSibling?.tagName==='STRONG')))label.remove();
      }
      const lang=options.language||language(options,[copy]);lang.annotate(copy);
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
      if(options.scope==='part'&&options.step==='grammar')return readContent(options.root,options).map((p,i)=>({...p,chapter:1,...(i===0?{chapterTitle:options.title||L.grammar}:{})}));
      const {lesson,grammarPages=[],introHtml='',dialogueHtml='',finaleHtml='',content=lesson,comprehension=window.A1_COMPREHENSION_CONTENT?.[lesson.id],masteryCount}=options;
      const introRoot=element(introHtml),goalRoot=element(options.goalsHtml||''),pages=grammarPages.map(p=>({...p,root:element(p.html)})),dialogue=element(dialogueHtml),finale=element(finaleHtml);
      const lang=language(options,[introRoot,goalRoot,dialogue,finale,...pages.map(p=>p.root)]),parts=[];
      let chapter=0,sourcePage={step:'listen'};
      function say(text,language=nativeLang,extra={}){parts.push(...chunks([{text,lang:language,...extra}]).map((p,i,a)=>({...p,chapter,sourcePage,...extra,pauseAfter:i===a.length-1?(extra.pauseAfter??p.pauseAfter):p.pauseAfter})));}
      function native(text){for(const p of lang.split(text))say(p.text,p.lang);}
      function title(label){chapter++;const heading=chunks(lang.split(label));heading.forEach((p,i)=>parts.push({...p,chapter,sourcePage,...(i===0?{chapterTitle:label}:{}),pauseAfter:i===heading.length-1?500:100}));}
      function contentParts(root){for(const p of readContent(root,{...options,language:lang}))parts.push({...p,chapter,sourcePage});}
      title(L.intro);
      native(german?`Willkommen zu Lektion ${lesson.id}: ${lesson.title}. Du hörst jetzt die Lerninhalte der ganzen Lektion. Du brauchst zwischendurch nichts anzuklicken. Danach kannst du alles selbst üben.`:`Bienvenue dans la leçon ${lesson.id} : ${lesson.title}. Tu vas écouter le contenu de toute la leçon, sans changer de page. Ensuite, tu pourras travailler les exercices toi-même.`);
      contentParts(goalRoot);
      title(L.words);
      say(german?`Höre das ${base==='el'?'griechische':'französische'} Beispiel und danach seine deutsche Bedeutung. Das Beispiel hörst du nach der Übersetzung noch einmal. Du kannst leise mitsprechen.`:'Écoute l’exemple allemand, puis sa traduction française. Après la traduction, chaque exemple allemand est répété. Tu peux répéter à voix basse.');
      lesson.phrases.forEach(([target,meaning],index)=>{
        parts.push({text:speechText(target,targetLang),lang:targetLang,chapter,sourcePage,phrase:index,repeat:1,pauseAfter:280,phraseEnd:false});
        say(meaning,nativeLang,{pauseAfter:420,sourcePhrase:index});
        parts.push({text:speechText(target,targetLang),lang:targetLang,chapter,sourcePage,phrase:index,repeat:2,phraseEnd:true,pauseAfter:650});
      });
      // The introduction's supporting words and rules are independent of the
      // visible page, and never include the exercise widget or its answers.
      contentParts(introRoot);
      if(options.scope==='part')return parts;
      for(const [i,page] of pages.entries()){
        sourcePage={step:'grammar',index:i};title(`${L.grammar} ${i+1}: ${page.title}`);contentParts(page.root);
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
      if(relocating){relocate(options);return;}
      disposeCurrent();if(options.step&&!['listen','grammar'].includes(options.step))return;
      options={...options,scope:options.scope||(options.step==='grammar'?'part':'lesson')};
      const {view}=options,voice=window.A1Voice,id=`lesson-guide-${++instance}`;
      const host=doc.createElement('section');host.className='guided-audio card';host.dataset.i18nIgnore='';host.setAttribute('aria-label',L.name);
      host.innerHTML=`<div class="guide-toolbar"><strong>${esc(L.shortName)}</strong><select data-guide-scope aria-label="${german?'Umfang':'Contenu'}"><option value="lesson">${german?'Ganze Lektion':'Toute la leçon'}</option><option value="part">${german?'Diesen Teil anhören':'Écouter cette partie'}</option></select><div class="button-row"><button type="button" class="primary-btn" data-guided-play title="${esc(L.name)}">${esc(L.play)}</button><button type="button" class="secondary-btn" data-guided-stop aria-label="${esc(L.stop)}" title="${esc(L.stop)}" disabled>■</button></div></div><div class="guide-timeline"><label for="${id}-time" class="guide-sr-only">${esc(L.timeline)}</label><input id="${id}-time" type="range" data-guide-timeline min="0" max="1" step="1" value="0"><div class="guide-time-readout"><output data-guide-current aria-live="off">0:00</output><span>/</span><span>≈ <output data-guide-total aria-live="off">0:00</output></span></div></div><p data-guided-status role="status" aria-live="polite" hidden>${esc(L.ready)}</p><details class="guide-options" data-guide-options><summary>${esc(L.settings)}</summary><div class="guide-options-body"><section class="guide-voices" aria-label="${esc(L.voices)}"><div class="guide-voice-grid">${[[targetLang,L.targetVoice],[nativeLang,L.nativeVoice]].map(([lang,label],i)=>`<div class="guide-control"><label for="${id}-voice-${i}">${esc(label)}</label><select id="${id}-voice-${i}" data-guide-voice="${lang}"></select><button type="button" class="tiny-btn" data-guide-voice-preview="${lang}" aria-label="${esc(L.preview+': '+label)}">${esc(L.preview)}</button></div>`).join('')}</div><button type="button" class="tiny-btn" data-guide-voice-reload>${esc(L.voiceReload)}</button><small data-guide-voice-note role="status">${esc(L.voiceHint)}</small></section><div class="guide-controls"><div class="guide-control"><label for="${id}-chapter">${esc(L.chapter)}</label><select id="${id}-chapter" data-guide-chapter></select></div><div class="guide-control"><label for="${id}-speed">${esc(L.speed)} <output data-guide-speed-value aria-hidden="true">1,00×</output></label><input id="${id}-speed" type="range" data-guide-speed min="0.6" max="1.6" step="0.05" value="1"></div></div><small>${esc(L.timeHelp)}</small><small>${esc(L.help)}</small><small>${esc(L.background)}</small></div></details>`;
      view.querySelector('.lesson-step-header')?.after(host);if(!host.isConnected)return;
      const play=host.querySelector('[data-guided-play]'),stop=host.querySelector('[data-guided-stop]'),status=host.querySelector('[data-guided-status]'),timeline=host.querySelector('[data-guide-timeline]'),chapterSelect=host.querySelector('[data-guide-chapter]'),speed=host.querySelector('[data-guide-speed]'),speedValue=host.querySelector('[data-guide-speed-value]'),currentTime=host.querySelector('[data-guide-current]'),totalTime=host.querySelector('[data-guide-total]');
      const speedKey=`a1suite.lessonGuideSpeed.${base}.${nativeLang}`,measured=new Map();
      const voiceNote=host.querySelector('[data-guide-voice-note]'),voiceLists=new Map();
      const bookmarkBase=`a1suite.lessonGuidePosition.${options.scope}.${options.scope==='part'?options.title||options.step||'listen':'all'}.${window.A1_APP_META?.course||base+'-'+nativeLang}.${options.lesson.id}`,bookmarkKey=window.A1Profile?.namespacedKey?.(bookmarkBase)||bookmarkBase;

      try{const saved=Number(window.localStorage.getItem(speedKey));if(saved>=.6&&saved<=1.6)speed.value=String(saved);}catch{}
      host.querySelector('[data-guide-scope]').value=options.scope;
      host.querySelector('[data-guide-scope]').onchange=e=>mount({...options,scope:e.target.value});
      const parts=plan(options),now=()=>window.performance.now(),factor=()=>Math.min(1.6,Math.max(.6,Number(speed.value)||1));
      let previewRun=0;
      let model=timing(parts,factor(),measured),index=0,run=0,playing=false,paused=false,timer=null,ticker=null,current=null,disposed=false,lastChapter=null,phase='idle',phaseStarted=0,frozen=0,gapIndex=0,finished=false,scrubbing=false,preview=0;
      chapterSelect.innerHTML=parts.map((p,i)=>p.chapterTitle?`<option value="${i}">${esc(p.chapterTitle)}</option>`:'').join('');
      let fingerprint=2166136261;for(const p of parts)for(const char of p.lang+'|'+p.text){fingerprint^=char.charCodeAt(0);fingerprint=Math.imul(fingerprint,16777619);}fingerprint=String(fingerprint>>>0);
      function checkpoint(){try{if(finished||(!playing&&!paused&&index===0))window.localStorage.removeItem(bookmarkKey);else window.localStorage.setItem(bookmarkKey,JSON.stringify({fingerprint,index}));}catch{}}
      try{const saved=JSON.parse(window.localStorage.getItem(bookmarkKey)||'null');if(saved?.fingerprint===fingerprint&&Number.isInteger(saved.index)&&saved.index>=0&&saved.index<parts.length){index=saved.index;paused=true;frozen=model.starts[index];play.textContent=L.resume;stop.disabled=false;}}catch{}
      const reader=window.A1GuideFollow?.create(view,{targetLang,speechText});
      function clearHighlight(){reader?.clear();}
      function follow(partIndex=index){
        const part=parts[partIndex];if(!part)return;
        if(playing&&part.sourcePage&&options.showPage&&(options.step!==part.sourcePage.step||(part.sourcePage.step==='grammar'&&options.grammarIndex!==part.sourcePage.index))){
          clearHighlight();relocating=true;try{options.showPage(part.sourcePage);}finally{relocating=false;}
        }
        reader?.follow(part);
      }
      relocate=nextOptions=>{options={...nextOptions,scope:options.scope};nextOptions.view.querySelector('.lesson-step-header')?.after(host);};
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
      function cancel(){reader?.clearWord();run++;previewRun++;clear();current=null;phase='idle';voice?.cancel();}
      function startTicker(){if(ticker!==null)window.clearInterval(ticker);ticker=window.setInterval(renderTime,200);}
      function update(){
        const activeIndex=phase==='gap'?gapIndex:index,part=parts[activeIndex];
        if(part){status.hidden=false;if(lastChapter!==part.chapter){lastChapter=part.chapter;status.textContent=parts.find(p=>p.chapter===part.chapter&&p.chapterTitle)?.chapterTitle||L.name;chapterSelect.value=String(parts.findIndex(p=>p.chapter===part.chapter&&p.chapterTitle));}}
        follow(activeIndex);renderTime();
      }
      function stopped(message=L.ready){cancel();playing=false;paused=false;finished=false;scrubbing=false;frozen=0;index=0;lastChapter=null;play.textContent=L.play;stop.disabled=true;status.textContent=message;status.hidden=true;chapterSelect.value='0';clearHighlight();checkpoint();renderTime();}
      function complete(){cancel();playing=false;paused=false;finished=true;scrubbing=false;play.textContent=L.play;stop.disabled=true;status.textContent=L.done;status.hidden=false;index=0;lastChapter=null;clearHighlight();checkpoint();renderTime();}
      function next(token){
        if(disposed||token!==run||!playing)return;
        if(index>=parts.length){complete();return;}
        const part=parts[index],speechIndex=index,multiplier=factor();phase='speech';phaseStarted=now();frozen=model.starts[index];update();if(part.phrase!==undefined)options.onPhraseStart?.(part.phrase);follow(index);
        const u=current=new window.SpeechSynthesisUtterance(speechText(part.text,part.lang)),selected=voice.select(part.lang);
        u.lang=selected?.lang||part.lang;if(selected)u.voice=selected;u.rate=(part.lang===targetLang?.74:.86)*multiplier;u.pitch=1;u.volume=1;
        let handled=false;
        u.onboundary=e=>{if(token===run&&!disposed&&playing&&(!e.name||e.name==='word'))reader?.word(u.text,e.charIndex,e.charLength);};
        u.onend=()=>{
          if(handled||token!==run||disposed)return;handled=true;reader?.clearWord();current=null;
          const duration=(now()-phaseStarted)/1000;if(duration>=.2){measured.set(speechIndex,duration*multiplier);model=timing(parts,factor(),measured);}
          if(part.phraseEnd)options.onPhraseEnd?.(part.phrase);
          index++;gapIndex=speechIndex;phase='gap';phaseStarted=now();checkpoint();renderTime();
          if(index>=parts.length){next(token);return;}
          timer=window.setTimeout(()=>{timer=null;next(token);},part.pauseAfter??280);
        };
        u.onerror=()=>{if(handled||token!==run||disposed)return;handled=true;frozen=position();cancel();playing=false;paused=true;play.textContent=L.resume;stop.disabled=false;status.textContent=L.error;status.hidden=false;checkpoint();renderTime();};
        if(base==='el'&&part.lang===targetLang&&!selected){u.onerror();return;}startTicker();try{voice.playUtterance(u,part.lang);}catch{u.onerror();}
      }
      function seekIndex(destination,wasPlaying=playing){
        cancel();index=Math.max(0,Math.min(parts.length-1,destination));lastChapter=null;finished=false;scrubbing=false;frozen=model.starts[index];paused=true;stop.disabled=false;playing=wasPlaying;update();
        checkpoint();if(wasPlaying){play.textContent=L.pause;next(run);}else play.textContent=L.resume;
      }
      play.onclick=()=>{
        if(playing){frozen=position();cancel();playing=false;paused=true;play.textContent=L.resume;status.textContent=L.paused;status.hidden=false;checkpoint();renderTime();return;}
        host.querySelector('[data-guide-options]').open=false;cancel();finished=false;playing=true;paused=false;stop.disabled=false;play.textContent=L.pause;next(run);
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
      function hold(message=L.paused){if(!playing)return;frozen=position();cancel();playing=false;paused=true;play.textContent=L.resume;status.textContent=message;status.hidden=false;checkpoint();renderTime();}
      for(const select of host.querySelectorAll('[data-guide-voice]'))select.onchange=()=>{const lang=select.dataset.guideVoice,choice=select.value==='auto'?null:voiceLists.get(lang)?.get(select.value);if(voice?.setVoice?.(lang,choice))voiceNote.textContent=L.voiceSaved;else renderVoices();};
      host.querySelector('[data-guide-voice-reload]').onclick=renderVoices;
      for(const button of host.querySelectorAll('[data-guide-voice-preview]'))button.onclick=()=>{
        hold();cancel();const token=++previewRun,lang=button.dataset.guideVoicePreview,u=new window.SpeechSynthesisUtterance(({fr:'Bonjour ! Je m’appelle Léa.',de:'Hallo! Ich heiße Anna.',el:'Γεια σου! Με λένε Άννα.'})[lang.split('-')[0]]),selected=voice.select(lang);u.lang=selected?.lang||lang;if(selected)u.voice=selected;u.rate=.85;
        u.onerror=()=>{if(token===previewRun&&!disposed)voiceNote.textContent=L.voiceError;};try{voice.playUtterance(u,lang);}catch{u.onerror();}
      };
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
      disposeCurrent=dispose;renderVoices();if(paused)update();else renderTime();
      if(!window.speechSynthesis||!window.SpeechSynthesisUtterance||!voice?.playUtterance){play.disabled=true;status.textContent=L.unavailable;status.hidden=false;}
    }
    return {plan,mount,readContent,speechText,timing,formatTime};
  }
  window.A1LessonAudioGuide={create};
})();


