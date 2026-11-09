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
    // Explicit pronunciation buttons also identify German examples in older content.
    for(const button of copy.querySelectorAll('[data-speak]')){
      let spoken;try{spoken=decodeURIComponent(button.dataset.speak);}catch{spoken=button.dataset.speak;}
      const row=button.closest('.phrase-row,tr');
      if(row){
        const target=row.querySelector('strong');if(target)target.lang='de';
        for(const cell of row.querySelectorAll('td'))if(clean(cell.textContent.replace(button.textContent,''))===clean(spoken))cell.lang='de';
      }
    }
    copy.querySelectorAll('.phrase-row strong,.deepening-form-example > strong,.lesson1-pronoun-grid b').forEach(el=>el.lang='de');
    const germanColumns=/^(Personne|Pers\.|forme|Allemand|allemand|Exemple|exemple|Expression|Dans la phrase|Infinitif|Masc\. \/ neutre|Masc\. acc\.|Fém\. \/ plur\.|masculin|féminin|neutre|pluriel|arbeiten|heißen|kommen|sprechen|wohnen|dürfen|können|möchten|müssen|ich|du|er\/sie\/es|wir|ihr|sie\/Sie)$/;
    for(const table of copy.querySelectorAll('table')){
      const headers=[...table.querySelectorAll('thead th')].map(el=>clean(el.textContent));
      for(const row of table.querySelectorAll('tbody tr'))[...row.cells].forEach((cell,i)=>{if(germanColumns.test(headers[i]||''))cell.lang='de';});
    }
    copy.querySelectorAll('.study-conjugation th,.study-conjugation td,.study-number-table td').forEach(el=>el.lang='de');
    copy.querySelectorAll(ignore).forEach(el=>el.remove());
    function add(text,lang){text=clean(text);if(!text)return;const last=parts[parts.length-1];if(last&&last.lang===lang)last.text+=' '+text;else parts.push({text,lang});}
    function walk(node,lang='fr-FR'){
      if(node.nodeType===3){add(node.textContent,lang);return;}
      if(node.nodeType!==1)return;
      const own=node.getAttribute('lang');if(own)lang=own.startsWith('de')?'de-DE':'fr-FR';
      for(const child of node.childNodes)walk(child,lang);
      if(/^(P|LI|H[1-6]|TD|TH|DT|DD|DIV|SECTION|TR)$/.test(node.tagName)&&parts.length)parts[parts.length-1].text+='.';
    }
    walk(copy);
    // Short utterances avoid long browser synthesis stalls and give usable pause points.
    return parts.flatMap(part=>(part.text.match(/[^.!?]+[.!?]*/g)||[]).map(text=>({text:clean(text),lang:part.lang})).filter(p=>/[\p{L}\p{N}]/u.test(p.text)));
  }
  function plan({lesson,step,title,root,goals,masteryCount}){
    const fr=text=>({text,lang:'fr-FR'});
    const parts=[fr(`Leçon ${lesson.id}. ${lesson.title}. ${title}.`)];
    if(step==='listen'){
      parts.push(fr('Écoute les mots et les phrases en allemand, puis leur traduction française.'));
      lesson.phrases.forEach(([target,native],index)=>parts.push({text:target,lang:'de-DE',phrase:index},fr(native)));
      parts.push(...readContent(goals));
      if(root){const copy=root.cloneNode(true);copy.querySelectorAll('.lesson-core-phrases').forEach(el=>el.remove());parts.push(...readContent(copy));}
      parts.push(fr('À toi de jouer. Dix questions sur le vocabulaire de cette leçon. Appuie sur Commencer le quiz quand tu es prêt.'));
    }else if(step==='grammar'){
      parts.push(...readContent(root));
      parts.push(fr('À toi de jouer. Fais les exercices de cette page. Ensuite, passe à la page suivante et relance le mode audio.'));
    }else if(step==='comprehension'){
      parts.push(fr('À toi de jouer. Écoute le texte allemand avec le bouton de lecture de la compréhension orale. Réponds ensuite aux questions.'));
    }else if(step==='grammar-check'){
      parts.push(fr('À toi de jouer. Commence le test quand tu es prêt.'));
    }else{
      parts.push(fr(`À toi de jouer. ${Number(masteryCount)||'Plusieurs'} questions dans le bilan de la leçon. Commence le bilan quand tu es prêt.`));
    }
    return parts;
  }
  function mount(options){
    disposeCurrent();
    const {view}=options,voice=window.A1Voice,synth=window.speechSynthesis;
    const host=document.createElement('section');host.className='guided-audio card';host.setAttribute('aria-label','Mode audio guidé');
    host.innerHTML='<strong>Mode audio guidé · Test</strong><p>Écoute les exemples allemands, les traductions et les explications en français. Ensuite, à toi de pratiquer.</p><div class="button-row"><button type="button" class="primary-btn" data-guided-play>▶ Écouter cette page</button><button type="button" class="secondary-btn" data-guided-stop disabled>■ Arrêter</button></div><p data-guided-status role="status" aria-live="polite">Prêt</p>';
    view.querySelector('.lesson-step-header')?.after(host);
    if(!host.isConnected)return;
    const play=host.querySelector('[data-guided-play]'),stop=host.querySelector('[data-guided-stop]'),status=host.querySelector('[data-guided-status]');
    let parts=[],index=0,run=0,playing=false,paused=false,utterance=null,disposed=false;
    function reset(message='Prêt'){
      run++;playing=false;paused=false;utterance=null;voice?.cancel();index=0;
      play.textContent='▶ Écouter cette page';stop.disabled=true;status.textContent=message;
    }
    function next(token){
      if(disposed||token!==run||!playing)return;
      if(index>=parts.length){reset('Terminé. À toi de jouer.');return;}
      const part=parts[index];status.textContent=`${index+1} / ${parts.length} · ${part.text}`;
      if(part.phrase!==undefined)options.onPhraseStart?.(part.phrase);
      const u=utterance=new window.SpeechSynthesisUtterance(part.text),selected=voice.select(part.lang);
      u.lang=part.lang;if(selected)u.voice=selected;u.rate=part.lang==='de-DE'?.82:1;
      let handled=false;
      u.onend=()=>{if(handled||token!==run||disposed)return;handled=true;if(part.phrase!==undefined)options.onPhraseEnd?.(part.phrase);index++;next(token);};
      u.onerror=()=>{if(handled||token!==run||disposed)return;handled=true;reset('Lecture interrompue. Appuie à nouveau sur lecture.');};
      try{voice.playUtterance(u,part.lang);}catch{u.onerror();}
    }
    play.onclick=()=>{
      if(playing){run++;playing=false;paused=true;voice.cancel();utterance=null;play.textContent='▶ Reprendre';status.textContent='En pause. Reprendre répète la phrase en cours.';return;}
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
    if(!synth||!window.SpeechSynthesisUtterance||!voice?.playUtterance){play.disabled=true;status.textContent='La lecture audio n’est pas disponible dans ce navigateur.';}
  }
  window.DE_A1_GUIDED_AUDIO={mount,plan,readContent};
})();
