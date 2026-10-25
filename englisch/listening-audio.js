/* Explicit roles, slow dictation chunks, and cancellable playback for English. */
(() => {
  'use strict';
  const voice=window.A1Voice,original=voice.speakDialogue.bind(voice),originalCancel=voice.cancel.bind(voice);
  let generation=0,timer=null,onCancel=null;
  function cancel(){generation++;if(timer!==null)clearTimeout(timer);timer=null;const end=onCancel;onCancel=null;originalCancel();end?.();}
  voice.cancel=cancel;
  function plan(turns,rate){
    return turns.flatMap(turn=>{
      const text=String(turn.text||'');
      // Single letters/digits are spoken separately, with a real pause in between.
      const parts=text.match(/(?:\b[A-Z0-9]\b(?:,\s*|\.\s*|$))|[^.!?]+[.!?]?/g)||[text];
      return parts.filter(p=>p.trim()).flatMap(part=>{
        const match=part.match(/^(.*?:\s*)?((?:[A-Z0-9],\s*)+[A-Z0-9])\.?$/);
        return match?[...(match[1]?[{...turn,text:match[1].trim(),rate,pause:300}]:[]),...match[2].split(/,\s*/).map(text=>({...turn,text,rate:Math.min(rate,.65),pause:550}))]:[{...turn,text:part.trim(),rate,pause:rate<1?300:140}];
      });
    });
  }
  voice.speakDialogue=function(turns,options={}){
    if(!/^en(?:-|$)/i.test(options.lang||''))return original(turns,options);
    const synth=window.speechSynthesis;if(!synth||typeof SpeechSynthesisUtterance==='undefined')return false;
    cancel();const run=generation,rate=Number(options.rate??.75),parts=plan(turns,rate),roles=A1DialogueVoices.plan(options.lang,turns);let i=0,finished=false;
    A1DialogueVoices.announce(roles.notice);
    function finish(failed){if(finished||run!==generation)return;finished=true;onCancel=null;(failed?options.onError:options.onEnd)?.();}
    onCancel=()=>{if(finished)return;finished=true;options.onEnd?.();};
    function next(){
      if(run!==generation||finished)return;if(i>=parts.length)return finish(false);
      const part=parts[i++],chosen=roles.bySpeaker[part.speaker]||voice.select('en-GB');
      const u=new SpeechSynthesisUtterance(part.text);u.lang=chosen?.lang||'en-GB';if(chosen)u.voice=chosen;u.rate=part.rate;
      options.onTurn?.(part.speaker,i-1);let handled=false;
      u.onend=()=>{if(handled||run!==generation)return;handled=true;timer=setTimeout(next,part.pause);};
      u.onerror=()=>{if(handled)return;handled=true;finish(true);};
      try{if(synth.paused)synth.resume();synth.speak(u);}catch{finish(true);}
    }
    if(!parts.length)return false;next();return true;
  };
  window.EN_A1_LISTENING_AUDIO={plan};
})();
