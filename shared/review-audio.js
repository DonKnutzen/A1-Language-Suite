/* Restartable browser TTS for A1 review; playback never changes answers or grades. */
(() => {
  'use strict';
  const text={
    de:{group:'Hörtext · 75 Prozent',start:'Anhören · 75 %',restart:'Von vorne · 75 %',again:'Erneut anhören · 75 %',stop:'Stopp',playing:'Wiedergabe läuft.',stopped:'Gestoppt. Erneutes Anhören startet von vorn.',finished:'Hörtext beendet. Du kannst ihn erneut anhören.',error:'Wiedergabe nicht möglich. Versuche es erneut.',timeout:'Wiedergabe unterbrochen. Du kannst von vorne starten.'},
    fr:{group:'Texte audio · 75 pour cent',start:'Écouter · 75 %',restart:'Du début · 75 %',again:'Réécouter · 75 %',stop:'Arrêter',playing:'Lecture en cours.',stopped:'Lecture arrêtée. Tu peux reprendre du début.',finished:'Lecture terminée. Tu peux réécouter.',error:'Échec de la lecture. Réessaie.',timeout:'Lecture interrompue. Tu peux reprendre du début.'},
    en:{group:'Listening text · 75 percent',start:'Listen · 75%',restart:'Restart · 75%',again:'Listen again · 75%',stop:'Stop',playing:'Playing.',stopped:'Stopped. Listening again starts from the beginning.',finished:'Playback finished. You can listen again.',error:'Playback failed. Please try again.',timeout:'Playback interrupted. You can restart from the beginning.'}
  };
  let owner=null;
  function html(uiLang='de'){
    const T=text[uiLang]||text.de;
    return `<div class="review-audio-controls" role="group" aria-label="${T.group}"><button type="button" class="secondary-btn" id="reviewListen"><span aria-hidden="true">▶</span><span data-review-audio-label>${T.start}</span></button><button type="button" class="secondary-btn" id="reviewStop" disabled><span aria-hidden="true">■</span><span>${T.stop}</span></button></div><p class="review-audio-status" role="status" id="reviewAudioStatus"></p>`;
  }
  function mount({root,turns,speech,targetLang='fr-FR',uiLang='de',timeoutMs=240000}){
    const playButton=root.querySelector('#reviewListen'),stopButton=root.querySelector('#reviewStop'),status=root.querySelector('#reviewAudioStatus');
    if(!playButton||!stopButton||!status)return null;
    const T=text[uiLang]||text.de,controls=playButton.parentElement,label=playButton.querySelector('[data-review-audio-label]');
    // A single sentence uses the same callback-aware path as a dialogue. A1Voice.speak
    // does not forward onEnd/onError; it also applies voice-preview speed preferences.
    const dialogue=(Array.isArray(turns)?turns:[]).filter(t=>String(t?.text||'').trim());
    const parts=dialogue.length?dialogue:[{speaker:'single',text:speech}].filter(t=>String(t.text||'').trim());
    let generation=0,playing=false,started=false,disposed=false,timer=null;
    function paint(message=''){
      if(!controls.isConnected)return;
      label.textContent=playing?T.restart:started?T.again:T.start;
      stopButton.disabled=!playing;playButton.disabled=false;status.textContent=message;
      controls.classList.toggle('is-playing',playing);
    }
    function stop(announce=true){
      generation++;clearTimeout(timer);const wasPlaying=playing;playing=false;
      if(owner===controller){owner=null;window.A1Voice?.cancel();}
      paint(wasPlaying?T.stopped:status.textContent);
      if(announce&&document.activeElement===stopButton)playButton.focus();
    }
    function play(){
      if(disposed||!controls.isConnected)return;
      owner?.stop(false);
      const run=++generation;started=true;playing=true;owner=controller;paint(T.playing);
      const valid=()=>!disposed&&run===generation&&owner===controller;
      function finish(message,failed=false){
        if(!valid())return;clearTimeout(timer);generation++;playing=false;owner=null;
        if(failed)window.A1Voice?.cancel();paint(message);
      }
      const options={lang:targetLang,rate:.75,onEnd:()=>finish(T.finished),onError:()=>finish(T.error,true)};
      timer=setTimeout(()=>finish(T.timeout,true),timeoutMs);
      try{if(!parts.length||!window.A1Voice?.speakDialogue||window.A1Voice.speakDialogue(parts,options)===false)finish(T.error,true);}
      catch{finish(T.error,true);}
    }
    function dispose(){if(disposed)return;stop(false);disposed=true;observer.disconnect();playButton.onclick=null;stopButton.onclick=null;}
    const controller={stop,dispose};
    const observer=new MutationObserver(()=>{if(!controls.isConnected)dispose();});
    observer.observe(root,{childList:true,subtree:true});
    playButton.onclick=play;stopButton.onclick=()=>stop();paint();return controller;
  }
  window.A1ReviewAudio={html,mount};
})();
