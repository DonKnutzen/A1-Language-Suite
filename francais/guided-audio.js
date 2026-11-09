/* A user-started audio tour. Exercises and their answers remain interactive. */
(() => {
  'use strict';
  let disposeCurrent=()=>{};
  const doc=document;
  const clean=text=>String(text||'').replace(/\s+/g,' ').trim();
  const ignore='button,svg,script,style,input,textarea,[hidden],.lesson-grammar-position,.lesson-audio-page,.lesson-audio-pager,.lesson-listening-practice,.lesson-extra-vocabulary,.deepening-practice,.lesson1-drill,.lesson1-grammar-practice,.lesson-step-footer';
  function readContent(root){
    if(!root)return [];
    const copy=root.cloneNode(true),parts=[];
    // Explicit pronunciation buttons also identify French examples in older content.
    for(const button of copy.querySelectorAll('[data-speak]')){
      let spoken;try{spoken=decodeURIComponent(button.dataset.speak);}catch{spoken=button.dataset.speak;}
      const row=button.closest('.phrase-row,tr');
      if(row){
        const target=row.querySelector('strong');if(target)target.lang='fr';
        for(const cell of row.querySelectorAll('td'))if(clean(cell.textContent.replace(button.textContent,''))===clean(spoken))cell.lang='fr';
      }
    }
    copy.querySelectorAll('.phrase-row strong,.deepening-form-example > strong,.lesson1-pronoun-grid b').forEach(el=>el.lang='fr');
    const frenchColumns=/^(Person|Form|Französisch|Beispiel|Verb|Wort|Plural|aller|avoir|habiter|parler|pouvoir|venir|je|tu|nous|vous|il\/elle|ils\/elles)$/;
    for(const table of copy.querySelectorAll('table')){
      const headers=[...table.querySelectorAll('thead th')].map(el=>clean(el.textContent));
      for(const row of table.querySelectorAll('tbody tr'))[...row.cells].forEach((cell,i)=>{if(frenchColumns.test(headers[i]||''))cell.lang='fr';});
    }
    copy.querySelectorAll(ignore).forEach(el=>el.remove());
    function add(text,lang){text=clean(text);if(!text)return;const last=parts[parts.length-1];if(last&&last.lang===lang)last.text+=' '+text;else parts.push({text,lang});}
    function walk(node,lang='de-DE'){
      if(node.nodeType===3){add(node.textContent,lang);return;}
      if(node.nodeType!==1)return;
      const own=node.getAttribute('lang');if(own)lang=own.startsWith('fr')?'fr-FR':'de-DE';
      for(const child of node.childNodes)walk(child,lang);
      if(/^(P|LI|H[1-6]|TD|TH|DT|DD|DIV|SECTION|TR)$/.test(node.tagName)&&parts.length)parts[parts.length-1].text+='.';
    }
    walk(copy);
    // Short utterances avoid long browser synthesis stalls and give usable pause points.
    return parts.flatMap(part=>(part.text.match(/[^.!?]+[.!?]*/g)||[]).map(text=>({text:clean(text),lang:part.lang})).filter(p=>/[\p{L}\p{N}]/u.test(p.text)));
  }
  function plan({lesson,step,title,root,goals,masteryCount}){
    const de=text=>({text,lang:'de-DE'});
    const parts=[de(`Lektion ${lesson.id}. ${lesson.title}. ${title}.`)];
    if(step==='listen'){
      parts.push(de('Höre zuerst die französischen Wörter und Sätze mit ihrer deutschen Übersetzung.'));
      lesson.phrases.forEach(([fr,native],index)=>parts.push({text:fr,lang:'fr-FR',phrase:index},de(native)));
      parts.push(...readContent(goals));
      if(root){const copy=root.cloneNode(true);copy.querySelectorAll('.lesson-core-phrases').forEach(el=>el.remove());parts.push(...readContent(copy));}
      parts.push(de('Jetzt bist du dran. Zehn Fragen zum Wortschatz dieser Lektion. Drücke auf Vokabel-Check starten, wenn du bereit bist.'));
    }else if(step==='grammar'){
      parts.push(...readContent(root));
      parts.push(de('Jetzt bist du dran. Bearbeite die Übungen auf dieser Seite. Danach kannst du zur nächsten Seite wechseln und den Audiomodus wieder starten.'));
    }else if(step==='comprehension'){
      parts.push(de('Jetzt bist du dran. Höre den französischen Hörtext mit dem Abspielknopf der Hörübung an. Beantworte anschließend die Fragen.'));
    }else if(step==='grammar-check'){
      parts.push(de('Jetzt bist du dran. Zwölf gemischte Fragen. Drücke auf zwölf Fragen starten, wenn du bereit bist.'));
    }else{
      parts.push(de(`Jetzt bist du dran. ${Number(masteryCount)||'Mehrere'} Fragen im Lektionscheck. Starte den Lektionscheck, wenn du bereit bist.`));
    }
    return parts;
  }
  function mount(options){
    disposeCurrent();
    const {view}=options,voice=window.A1Voice,synth=window.speechSynthesis;
    const host=document.createElement('section');host.className='guided-audio card';host.setAttribute('aria-label','Geführter Audiomodus');
    host.innerHTML='<strong>Geführter Audiomodus · Test</strong><p>Französisch hören, deutsche Übersetzungen und Erklärungen anhören. Bei den Aufgaben bist du dran.</p><div class="button-row"><button type="button" class="primary-btn" data-guided-play>▶ Seite vorlesen</button><button type="button" class="secondary-btn" data-guided-stop disabled>■ Stopp</button></div><p data-guided-status role="status" aria-live="polite">Bereit</p>';
    view.querySelector('.lesson-step-header')?.after(host);
    if(!host.isConnected)return;
    const play=host.querySelector('[data-guided-play]'),stop=host.querySelector('[data-guided-stop]'),status=host.querySelector('[data-guided-status]');
    let parts=[],index=0,run=0,playing=false,paused=false,utterance=null,disposed=false;
    function reset(message='Bereit'){
      run++;playing=false;paused=false;utterance=null;voice?.cancel();index=0;
      play.textContent='▶ Seite vorlesen';stop.disabled=true;status.textContent=message;
    }
    function next(token){
      if(disposed||token!==run||!playing)return;
      if(index>=parts.length){reset('Fertig. Jetzt bist du dran.');return;}
      const part=parts[index];status.textContent=`${index+1} / ${parts.length} · ${part.text}`;
      if(part.phrase!==undefined)options.onPhraseStart?.(part.phrase);
      const u=utterance=new window.SpeechSynthesisUtterance(part.text),selected=voice.select(part.lang);
      u.lang=part.lang;if(selected)u.voice=selected;u.rate=part.lang==='fr-FR'?.82:1;
      let handled=false;
      u.onend=()=>{if(handled||token!==run||disposed)return;handled=true;if(part.phrase!==undefined)options.onPhraseEnd?.(part.phrase);index++;next(token);};
      u.onerror=()=>{if(handled||token!==run||disposed)return;handled=true;reset('Vorlesen unterbrochen. Bitte erneut auf Play drücken.');};
      try{voice.playUtterance(u,part.lang);}catch{u.onerror();}
    }
    play.onclick=()=>{
      if(playing){run++;playing=false;paused=true;voice.cancel();utterance=null;play.textContent='▶ Fortsetzen';status.textContent='Pausiert. Fortsetzen wiederholt den aktuellen Satz.';return;}
      if(!paused){parts=plan(options);index=0;}
      voice.cancel();playing=true;paused=false;stop.disabled=false;play.textContent='Ⅱ Pause';next(++run);
    };
    stop.onclick=()=>reset();
    // Stop before any other audio, exercise, or navigation action takes ownership.
    const externalClick=e=>{if(!host.contains(e.target)&&e.target.closest('button,a'))reset();};
    const leave=()=>reset();
    doc.addEventListener('click',externalClick,true);window.addEventListener('pagehide',leave);
    const observer=new MutationObserver(()=>{if(!host.isConnected)dispose();});observer.observe(view,{childList:true,subtree:true});
    function dispose(){if(disposed)return;disposed=true;reset();observer.disconnect();doc.removeEventListener('click',externalClick,true);window.removeEventListener('pagehide',leave);host.remove();}
    disposeCurrent=dispose;
    if(!synth||!window.SpeechSynthesisUtterance||!voice?.playUtterance){play.disabled=true;status.textContent='Vorlesen ist in diesem Browser nicht verfügbar.';}
  }
  window.FR_A1_GUIDED_AUDIO={mount,plan,readContent};
})();
