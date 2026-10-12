/* Uses the browser's speech service. No paid API or app-side audio recording/storage. */
(() => {
  'use strict';
  const words={
    de:{start:'Beschreibung diktieren',stop:'Diktat stoppen',listening:'Ich höre zu …',ready:'Text eingefügt – bitte kurz prüfen.',unsupported:'Diktieren wird hier nicht unterstützt. Nutze das Mikrofon deiner Handy-Tastatur.',denied:'Mikrofon nicht freigegeben. Du kannst die Beschreibung weiterhin tippen.',error:'Diktieren funktioniert gerade nicht. Bitte erneut versuchen oder tippen.',empty:'Keine Sprache erkannt. Bitte erneut versuchen.',limit:'Das Textfeld ist voll.',privacy:'Spracherkennung des Browsers; je nach Browser online.'},
    fr:{start:'Dicter la description',stop:'Arrêter la dictée',listening:'Je t’écoute…',ready:'Texte ajouté – vérifie-le.',unsupported:'Dictée non disponible ici. Utilise le micro du clavier de ton téléphone.',denied:'Micro non autorisé. Tu peux toujours écrire.',error:'Dictée indisponible. Réessaie ou écris.',empty:'Aucune parole reconnue. Réessaie.',limit:'Le champ est plein.',privacy:'Reconnaissance du navigateur, parfois en ligne.'},
    en:{start:'Dictate description',stop:'Stop dictation',listening:'Listening…',ready:'Text added – please check it.',unsupported:'Dictation is not supported here. Use your phone keyboard microphone.',denied:'Microphone not allowed. You can still type.',error:'Dictation is unavailable. Retry or type.',empty:'No speech recognized. Please retry.',limit:'The text field is full.',privacy:'Browser speech recognition; may use an online service.'}
  };
  function attach({input,button,send,status,onInput,lang='de'}){
    const L=words[lang]||words.en,Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
    button.title=L.start+' · '+L.privacy;button.setAttribute('aria-label',L.start);button.setAttribute('aria-pressed','false');
    let recognition=null,timer=null,active=false,disposed=false,original='',before='',after='',hadError=false,hasText=false;
    function reset(){
      clearTimeout(timer);active=false;recognition=null;input.readOnly=false;send.disabled=false;
      button.textContent='🎙';button.setAttribute('aria-label',L.start);button.setAttribute('aria-pressed','false');
    }
    function dispose(){
      disposed=true;clearTimeout(timer);
      if(recognition){recognition.onstart=recognition.onresult=recognition.onerror=recognition.onend=null;try{recognition.abort();}catch{}}
      reset();button.onclick=null;
    }
    function stop(){
      if(!active)return;
      const current=recognition;clearTimeout(timer);
      try{current.stop();}catch{try{current.abort();}catch{}reset();}
      if(!active||recognition!==current)return;
      timer=setTimeout(()=>{if(recognition){try{recognition.abort();}catch{}reset();}},5000);
    }
    button.onclick=()=>{
      if(active){stop();return;}
      if(send.disabled||input.disabled)return;
      if(!Recognition){status.textContent=L.unsupported;input.focus();return;}
      original=input.value;before=original;after='';
      hadError=false;hasText=false;
      try{
        recognition=new Recognition();const session=recognition;recognition.lang={de:'de-DE',fr:'fr-FR',en:'en-CA'}[lang]||'de-DE';recognition.continuous=true;recognition.interimResults=true;recognition.maxAlternatives=1;
        active=true;input.readOnly=true;send.disabled=true;button.textContent='■';button.setAttribute('aria-label',L.stop);button.setAttribute('aria-pressed','true');status.textContent=L.listening;
        recognition.onstart=()=>{if(disposed||recognition!==session)return;clearTimeout(timer);timer=setTimeout(stop,60000);};
        recognition.onresult=e=>{
          if(disposed||recognition!==session)return;
          const transcript=Array.from(e.results).map(r=>r[0]?.transcript||'').join(' ').trim();if(!transcript)return;
          const prefix=before+(before&&!/\s$/.test(before)?' ':''),suffix=(after&&!/^\s/.test(after)?' ':'')+after;
          const capacity=Math.max(0,(input.maxLength>0?input.maxLength:4000)-prefix.length-suffix.length);
          if(!capacity){status.textContent=L.limit;stop();return;}
          input.value=prefix+transcript.slice(0,capacity)+suffix;hasText=true;onInput();
          if(transcript.length>capacity){hadError=true;status.textContent=L.limit;stop();}
        };
        recognition.onerror=e=>{if(disposed||recognition!==session)return;hadError=true;status.textContent=['not-allowed','service-not-allowed','audio-capture'].includes(e.error)?L.denied:e.error==='no-speech'?L.empty:L.error;};
        recognition.onend=()=>{if(disposed||recognition!==session)return;if(!hadError)status.textContent=hasText?L.ready:L.empty;reset();};
        window.A1Voice?.cancel();timer=setTimeout(stop,15000);recognition.start();
      }catch{status.textContent=L.error;reset();}
    };
    return dispose;
  }
  window.A1BugDictation={attach};
})();
