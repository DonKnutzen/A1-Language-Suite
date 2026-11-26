/* A user-started audio tour. Exercises and their answers remain interactive. */
(() => {
  'use strict';
  let disposeCurrent=()=>{};
  const doc=document;
  const clean=text=>String(text||'').replace(/\s+/g,' ').trim();
  const ignore='button,svg,script,style,input,textarea,[hidden],.lesson-grammar-position,.lesson-audio-page,.lesson-audio-pager,.lesson-listening-practice,.lesson-extra-vocabulary,.deepening-practice,.lesson1-drill,.lesson1-grammar-practice,.lesson-step-footer,[data-english-practice]';
  function readContent(root){
    if(!root)return [];
    const copy=root.cloneNode(true),parts=[];
    // Explicit pronunciation buttons also identify English examples in older content.
    for(const button of copy.querySelectorAll('[data-speak]')){
      let spoken;try{spoken=decodeURIComponent(button.dataset.speak);}catch{spoken=button.dataset.speak;}
      const row=button.closest('.phrase-row,tr');
      if(row){
        const target=row.querySelector('strong');if(target)target.lang='en';
        for(const cell of row.querySelectorAll('td'))if(clean(cell.textContent.replace(button.textContent,''))===clean(spoken))cell.lang='en';
      }
    }
    copy.querySelectorAll('.phrase-row strong,.deepening-form-example > strong,.lesson1-pronoun-grid b').forEach(el=>el.lang='en');
    const englishColumns=/^(Form|Forme|Englisch|English|Anglais|Beispiel|Example|Exemple|Verb|Verbe|Wort|Mot|Plural|Pluriel)$/;
    for(const table of copy.querySelectorAll('table')){
      const headers=[...table.querySelectorAll('thead th')].map(el=>clean(el.textContent));
      for(const row of table.querySelectorAll('tbody tr'))[...row.cells].forEach((cell,i)=>{if(englishColumns.test(headers[i]||''))cell.lang='en';});
    }
    copy.querySelectorAll('.en-rule-table td[lang="en"]').forEach(el=>el.lang='en');
    copy.querySelectorAll(ignore).forEach(el=>el.remove());
    function add(text,lang){text=clean(text);if(!text)return;const last=parts[parts.length-1];if(last&&last.lang===lang)last.text+=' '+text;else parts.push({text,lang});}
    function walk(node,lang='fr-FR'){
      if(node.nodeType===3){add(node.textContent,lang);return;}
      if(node.nodeType!==1)return;
      const own=node.getAttribute('lang');if(own)lang=own.startsWith('en')?'en-GB':'fr-FR';
      for(const child of node.childNodes)walk(child,lang);
      if(/^(P|LI|H[1-6]|TD|TH|DT|DD|DIV|SECTION|TR)$/.test(node.tagName)&&parts.length)parts[parts.length-1].text+='.';
    }
    walk(copy);
    // Short utterances avoid long browser synthesis stalls and give usable pause points.
    return parts.flatMap(part=>(part.text.match(/[^.!?]+[.!?]*/g)||[]).map(text=>({text:clean(text),lang:part.lang})).filter(p=>/[\p{L}\p{N}]/u.test(p.text)));
  }
  function plan({lesson,step,title,root,goals,masteryCount}){
    const de=text=>({text,lang:'fr-FR'});
    const parts=[de(`Leçon ${lesson.id}. ${lesson.title}. ${title}.`)];
    if(step==='listen'){
      parts.push(de('Écoute d’abord les mots et les phrases en anglais, avec leur traduction en français.'));
      lesson.phrases.forEach(([fr,native],index)=>parts.push({text:fr,lang:'en-GB',phrase:index},{...de(native),sourcePhrase:index}));
      parts.push(...readContent(goals));
      if(root){const copy=root.cloneNode(true);copy.querySelectorAll('.lesson-core-phrases').forEach(el=>el.remove());parts.push(...readContent(copy));}
      parts.push(de('À toi de jouer. Dix questions sur le vocabulaire de cette leçon. Appuie sur Commencer le test de vocabulaire quand tu es prêt.'));
    }else if(step==='grammar'){
      parts.push(...readContent(root));
      parts.push(de('À toi de jouer. Fais les exercices de cette page. Ensuite, tu peux passer à la page suivante et relancer le mode audio.'));
    }else if(step==='comprehension'){
      parts.push(de('À toi de jouer. Écoute le texte anglais avec le bouton de lecture de l’exercice d’écoute. Réponds ensuite aux questions.'));
    }else if(step==='grammar-check'){
      parts.push(de('À toi de jouer. Douze questions mélangées. Appuie sur Commencer les 12 questions quand tu es prêt.'));
    }else{
      parts.push(de(`À toi de jouer. ${Number(masteryCount)||'Plusieurs'} questions dans le test de leçon. Commence le test de leçon quand tu es prêt.`));
    }
    return parts;
  }
  function mount(options){
    disposeCurrent();
    if(!['listen','grammar'].includes(options.step))return;
    const {view}=options,voice=window.A1Voice,synth=window.speechSynthesis;
    const host=document.createElement('section');host.className='guided-audio guide-menu';host.setAttribute('aria-label','Mode audio guidé');
    host.innerHTML='<button type="button" class="guide-icon" data-guided-play data-icon="▶" aria-label="Lire la page" title="Guide audio">▶ Lire la page</button><button type="button" class="guide-icon" data-guide-toggle aria-label="Commandes audio" aria-expanded="false" hidden>⋯</button><div class="guide-panel" data-guide-panel hidden><div class="guide-toolbar"><strong>Guide audio</strong><div class="button-row"><button type="button" class="secondary-btn" data-guided-stop disabled>■</button></div></div><p data-guided-status role="status" aria-live="polite" hidden>Prêt</p></div>';
    const header=view.querySelector('.lesson-step-header');let menu=view.querySelector('.lesson-back-row,.guide-menu-row');if(!menu&&header){menu=document.createElement('div');menu.className='guide-menu-row';header.before(menu);}menu?.append(host);
    if(!host.isConnected)return;
    const play=host.querySelector('[data-guided-play]'),stop=host.querySelector('[data-guided-stop]'),status=host.querySelector('[data-guided-status]');
    const panel=host.querySelector('[data-guide-panel]'),toggle=host.querySelector('[data-guide-toggle]');
    function closePanel(){panel.hidden=true;toggle.setAttribute('aria-expanded','false');}
    function controls(){play.dataset.icon=playing?'Ⅱ':'▶';play.setAttribute('aria-label',play.textContent);play.title=play.textContent;toggle.hidden=stop.disabled;if(toggle.hidden)closePanel();}
    toggle.onclick=()=>{panel.hidden=!panel.hidden;toggle.setAttribute('aria-expanded',String(!panel.hidden));};
    host.onkeydown=e=>{if(e.key==='Escape'){closePanel();toggle.focus();}};
    const reader=window.A1GuideFollow?.create(view,{targetLang:'en-GB'});
    let parts=[],index=0,run=0,playing=false,paused=false,utterance=null,disposed=false;
    function reset(message='Prêt'){
      reader?.clear();run++;playing=false;paused=false;utterance=null;voice?.cancel();index=0;
      play.textContent='▶ Lire la page';stop.disabled=true;status.textContent=message;status.hidden=message==='Prêt';controls();
    }
    function next(token){
      if(disposed||token!==run||!playing)return;
      if(index>=parts.length){reset('Terminé. À toi de jouer.');return;}
      const part=parts[index];status.hidden=true;
      if(part.phrase!==undefined)options.onPhraseStart?.(part.phrase);
      reader?.follow(part);
      const u=utterance=new window.SpeechSynthesisUtterance(part.text),selected=voice.select(part.lang);
      u.lang=part.lang;if(selected)u.voice=selected;u.rate=part.lang==='en-GB'?.82:1;
      let handled=false;
      u.onboundary=e=>{if(token===run&&!disposed&&playing&&(!e.name||e.name==='word'))reader?.word(u.text,e.charIndex,e.charLength);};
      u.onend=()=>{if(handled||token!==run||disposed)return;handled=true;reader?.clearWord();if(part.phrase!==undefined)options.onPhraseEnd?.(part.phrase);index++;next(token);};
      u.onerror=()=>{if(handled||token!==run||disposed)return;handled=true;reset('Lecture interrompue. Appuie de nouveau sur Lecture.');};
      try{voice.playUtterance(u,part.lang);}catch{u.onerror();}
    }
    play.onclick=()=>{
      if(playing){reader?.clearWord();run++;playing=false;paused=true;voice.cancel();utterance=null;play.textContent='▶ Reprendre';status.textContent='En pause. Reprendre relit la phrase en cours.';controls();return;}
      if(!paused){parts=plan(options);index=0;}
      voice.cancel();playing=true;paused=false;stop.disabled=false;play.textContent='Ⅱ Pause';controls();next(++run);
    };
    stop.onclick=()=>reset();
    // Stop before any other audio, exercise, or navigation action takes ownership.
    const externalClick=e=>{if(!host.contains(e.target)){closePanel();if(e.target.closest('button,a'))reset();}};
    const leave=()=>reset();
    doc.addEventListener('click',externalClick,true);window.addEventListener('pagehide',leave);
    const observer=new MutationObserver(()=>{if(!host.isConnected)dispose();});observer.observe(view,{childList:true,subtree:true});
    function dispose(){if(disposed)return;disposed=true;reset();observer.disconnect();doc.removeEventListener('click',externalClick,true);window.removeEventListener('pagehide',leave);host.remove();}
    disposeCurrent=dispose;
    if(!synth||!window.SpeechSynthesisUtterance||!voice?.playUtterance){play.disabled=true;status.textContent='La lecture à voix haute n’est pas disponible dans ce navigateur.';}
  }
  window.EN_B1_GUIDED_AUDIO={mount,plan,readContent};
})();

