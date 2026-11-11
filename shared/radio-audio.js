/* Recorded radio exercises work even when Firefox exposes no target-language voice. */
(() => {
  'use strict';
  const voice=window.A1Voice,library=window.A1_RADIO_RECORDINGS;
  if(!voice||!library)return;
  const original={};
  for(const method of ['cancel','speak','speakSequence','speakDialogue','playUtterance'])original[method]=voice[method];
  let active=null,generation=0;
  function signature(lang,turns){return JSON.stringify([String(lang||'fr-FR').split('-')[0],turns.map(t=>[t.speaker||'',String(t.text||'').trim(),t.gender||''])]);}
  function recording(turns,lang){
    if(!Array.isArray(turns))return null;
    const key=signature(lang,turns);let h=2166136261;
    for(let i=0;i<key.length;i++){h^=key.charCodeAt(i);h=Math.imul(h,16777619);}
    const item=library.entries[(h>>>0).toString(16).padStart(8,'0')];
    // A changed exercise must never play an old recording with different answers.
    return item?.signature===key?item:null;
  }
  function stop(){generation++;active?.finish(false);}
  voice.cancel=function(...args){stop();return original.cancel.apply(voice,args);};
  for(const method of ['speak','speakSequence','playUtterance'])if(original[method])voice[method]=function(...args){stop();return original[method].apply(voice,args);};
  voice.speakDialogue=function(turns,options={}){
    const item=recording(turns,options.lang);
    if(!item||typeof window.Audio!=='function'){stop();return original.speakDialogue.call(voice,turns,options);}
    voice.cancel();const run=generation;let media,timer=null,settled=false,started=false;
    function finish(failed,error){
      if(settled)return;settled=true;
      if(timer!==null)window.clearTimeout(timer);timer=null;
      if(active?.finish===finish)active=null;
      if(media){media.onended=media.onerror=media.onplaying=null;media.pause();media.removeAttribute('src');media.load();}
      (failed?options.onError:options.onEnd)?.(error);
    }
    try{
      media=new window.Audio(new URL(item.file,library.base).href);media.preload='auto';
      media.playbackRate=Math.min(2,Math.max(.5,Number(options.rate)||.75));
      media.preservesPitch=true;
      active={finish};
      media.onplaying=()=>{if(settled||run!==generation)return;if(timer!==null)window.clearTimeout(timer);timer=null;if(!started){started=true;options.onStart?.();}};
      media.onended=()=>{if(run===generation)finish(false);};
      media.onerror=()=>{if(run===generation)finish(true,{error:'recording-unavailable'});};
      timer=window.setTimeout(()=>{if(run===generation)finish(true,{error:'recording-timeout'});},15000);
      // Start directly in the click handler, retaining browser user activation.
      media.play()?.catch(()=>{if(run===generation)finish(true,{error:'recording-unavailable'});});
      return true;
    }catch{finish(true,{error:'recording-unavailable'});return false;}
  };
  window.A1RadioAudio={recording};
})();
