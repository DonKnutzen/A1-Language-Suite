/* A complete lesson tour: detached learning content, explicit language spans,
   paced speech and no exercise navigation or grading. English keeps its pilot. */
(() => {
  'use strict';
  const doc=document,clean=s=>window.A1GuideLanguage.clean(s);
  const excluded='button,svg,script,style,input,textarea,select,[hidden],[aria-hidden="true"],.deepening-practice,.deepening-form-examples,.lesson1-grammar-practice,.lesson-grammar-practice,.quiz-q,.options,.feedback,.lesson-grammar-position,.lesson-audio-page,.lesson-audio-pager,.lesson-listening-practice,.pronunciation-name,label,#spellFeedback,details.grammar-detail>summary,.lesson-step-footer';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const UI={
    de:{name:'Audio-Guide für die ganze Lektion',help:'Einmal starten: Hörbeispiele, Wortschatz, alle Erklärungen und der Hörtext. Danach bearbeitest du die Aufgaben selbst. Längere Einstiegsbeispiele hörst du zweimal.',play:'▶ Ganze Lektion anhören',pause:'Ⅱ Pause',resume:'▶ Fortsetzen',stop:'■ Stopp',ready:'Bereit',paused:'Pausiert. Mit Fortsetzen hörst du hier weiter.',done:'Fertig. Jetzt kannst du die Lektion selbst durcharbeiten.',error:'Wiedergabe unterbrochen. Mit Fortsetzen kannst du an dieser Stelle weiterhören.',unavailable:'Vorlesen ist in diesem Browser nicht verfügbar.',chapter:'Abschnitt',speed:'Tempo',normal:'Ruhig',slow:'Sehr ruhig',intro:'Einstieg',words:'Hörbeispiele & Wortschatz',grammar:'Grammatik & Satzmuster',dialogue:'Alltagsdialog',listen:'Hörtext',practice:'Selbst anwenden',finale:'Vorbereitung aufs optionale Finale',end:'Dein nächster Schritt'},
    fr:{name:'Guide audio de toute la leçon',help:'Une seule lecture : exemples, vocabulaire, toutes les explications et le texte audio. Ensuite, fais les exercices toi-même. Les exemples longs du début sont répétés deux fois.',play:'▶ Écouter toute la leçon',pause:'Ⅱ Pause',resume:'▶ Reprendre',stop:'■ Arrêter',ready:'Prêt',paused:'En pause. Reprendre continue à cet endroit.',done:'Terminé. Tu peux maintenant travailler la leçon toi-même.',error:'Lecture interrompue. Appuie sur Reprendre pour continuer ici.',unavailable:'La lecture audio n’est pas disponible dans ce navigateur.',chapter:'Partie',speed:'Vitesse',normal:'Calme',slow:'Très calme',intro:'Introduction',words:'Exemples & vocabulaire',grammar:'Grammaire & structures',dialogue:'Dialogue',listen:'Compréhension orale',practice:'À toi de pratiquer',finale:'Préparation à la finale facultative',end:'La suite'}
  };
  function create({targetLang,nativeLang}){
    const base=targetLang.split('-')[0],L=UI[nativeLang.startsWith('fr')?'fr':'de'],german=nativeLang.startsWith('de');
    let disposeCurrent=()=>{};
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
      say(german?'Höre das französische Beispiel und danach seine deutsche Bedeutung. Längere Beispiele hörst du nach der Übersetzung noch einmal. Du kannst leise mitsprechen.':'Écoute l’exemple allemand, puis sa traduction française. Après la traduction, les exemples longs sont répétés. Tu peux répéter à voix basse.');
      lesson.phrases.forEach(([target,meaning],index)=>{
        const repeated=(target.match(/[\p{L}\p{N}]+(?:[’'][\p{L}]+)*/gu)||[]).length>1||/[,;/]/.test(target);
        parts.push({text:speechText(target,targetLang),lang:targetLang,chapter,phrase:index,repeat:1,pauseAfter:280,phraseEnd:!repeated});
        say(meaning,nativeLang,{pauseAfter:repeated?420:650});
        if(repeated)parts.push({text:speechText(target,targetLang),lang:targetLang,chapter,phrase:index,repeat:2,phraseEnd:true,pauseAfter:650});
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
        title(L.listen);say(german?'Jetzt hörst du den Hörtext der Lektion zweimal. Höre zuerst auf die Situation und beim zweiten Mal auf Einzelheiten. Die Fragen beantwortest du später selbst.':'Tu vas écouter le texte de la leçon deux fois. Écoute d’abord la situation, puis les détails. Tu répondras aux questions toi-même après le guide.');
        for(let round=0;round<2;round++){
          if(round)say(german?'Und jetzt noch einmal.':'Écoute une deuxième fois.',nativeLang,{pauseAfter:550});
          for(const turn of turns)say(turn.text,targetLang,{pauseAfter:400,listening:true,round:round+1});
        }
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
    function mount(options){
      disposeCurrent();const {view}=options,voice=window.A1Voice;
      const host=doc.createElement('section');host.className='guided-audio card';host.dataset.i18nIgnore='';host.setAttribute('aria-label',L.name);
      host.innerHTML=`<strong>${esc(L.name)}</strong><p>${esc(L.help)}</p><div class="button-row"><button type="button" class="primary-btn" data-guided-play>${esc(L.play)}</button><button type="button" class="secondary-btn" data-guided-stop disabled>${esc(L.stop)}</button></div><div class="guide-controls"><label>${esc(L.chapter)}<select data-guide-chapter disabled><option>${esc(L.ready)}</option></select></label><label>${esc(L.speed)}<select data-guide-speed><option value="1">${esc(L.normal)}</option><option value="0.88">${esc(L.slow)}</option></select></label></div><progress data-guide-progress value="0" max="1" aria-label="${esc(L.name)}"></progress><p data-guided-status role="status" aria-live="polite">${esc(L.ready)}</p><p data-guide-caption aria-live="off"></p>`;
      view.querySelector('.lesson-step-header')?.after(host);if(!host.isConnected)return;
      const play=host.querySelector('[data-guided-play]'),stop=host.querySelector('[data-guided-stop]'),status=host.querySelector('[data-guided-status]'),caption=host.querySelector('[data-guide-caption]'),progress=host.querySelector('progress'),chapterSelect=host.querySelector('[data-guide-chapter]'),speed=host.querySelector('[data-guide-speed]');
      let parts=null,index=0,run=0,playing=false,paused=false,timer=null,current=null,disposed=false,lastChapter=null;
      function clear(){if(timer!==null)window.clearTimeout(timer);timer=null;}
      function cancel(){run++;clear();current=null;voice?.cancel();}
      function prepare(){if(parts)return;parts=plan(options);chapterSelect.innerHTML=parts.map((p,i)=>p.chapterTitle?`<option value="${i}">${esc(p.chapterTitle)}</option>`:'').join('');chapterSelect.disabled=false;progress.max=parts.length;}
      function update(){
        const part=parts?.[index];progress.value=index;
        if(part){caption.textContent=part.text;if(lastChapter!==part.chapter){lastChapter=part.chapter;status.textContent=parts.find(p=>p.chapter===part.chapter&&p.chapterTitle)?.chapterTitle||L.name;chapterSelect.value=String(parts.findIndex(p=>p.chapter===part.chapter&&p.chapterTitle));}}
      }
      function stopped(message=L.ready){cancel();playing=false;paused=false;index=0;lastChapter=null;play.textContent=L.play;stop.disabled=true;status.textContent=message;caption.textContent='';progress.value=0;if(parts)chapterSelect.value='0';}
      function next(token){
        if(disposed||token!==run||!playing)return;
        if(index>=parts.length){cancel();playing=false;paused=false;play.textContent=L.play;stop.disabled=true;progress.value=parts.length;status.textContent=L.done;caption.textContent='';index=0;lastChapter=null;return;}
        const part=parts[index];update();if(part.phrase!==undefined)options.onPhraseStart?.(part.phrase);
        const u=current=new window.SpeechSynthesisUtterance(speechText(part.text,part.lang)),selected=voice.select(part.lang);
        u.lang=part.lang;if(selected)u.voice=selected;u.rate=(part.lang===targetLang?.74:.86)*Number(speed.value);u.pitch=1;u.volume=1;
        let handled=false;
        u.onend=()=>{
          if(handled||token!==run||disposed)return;handled=true;current=null;
          if(part.phraseEnd)options.onPhraseEnd?.(part.phrase);
          index++;progress.value=index;
          if(index>=parts.length){next(token);return;}
          timer=window.setTimeout(()=>{timer=null;next(token);},part.pauseAfter??280);
        };
        u.onerror=()=>{if(handled||token!==run||disposed)return;handled=true;cancel();playing=false;paused=true;play.textContent=L.resume;stop.disabled=false;status.textContent=L.error;};
        try{voice.playUtterance(u,part.lang);}catch{u.onerror();}
      }
      play.onclick=()=>{
        if(playing){cancel();playing=false;paused=true;play.textContent=L.resume;status.textContent=L.paused;return;}
        prepare();cancel();playing=true;paused=false;stop.disabled=false;play.textContent=L.pause;next(run);
      };
      stop.onclick=()=>stopped();
      chapterSelect.onchange=()=>{const wasPlaying=playing;cancel();index=Number(chapterSelect.value);lastChapter=null;update();paused=true;stop.disabled=false;if(wasPlaying){playing=true;next(run);}else{playing=false;play.textContent=L.resume;}};
      const external=e=>{if(!host.contains(e.target)&&e.target.closest?.('button,a'))stopped();};
      const leave=()=>stopped();doc.addEventListener('click',external,true);window.addEventListener('pagehide',leave);
      const observer=new MutationObserver(()=>{if(!host.isConnected)dispose();});observer.observe(view,{childList:true,subtree:true});
      function dispose(){if(disposed)return;disposed=true;cancel();observer.disconnect();doc.removeEventListener('click',external,true);window.removeEventListener('pagehide',leave);host.remove();}
      disposeCurrent=dispose;
      if(!window.speechSynthesis||!window.SpeechSynthesisUtterance||!voice?.playUtterance){play.disabled=true;status.textContent=L.unavailable;}
    }
    return {plan,mount,readContent,speechText};
  }
  window.A1LessonAudioGuide={create};
})();
