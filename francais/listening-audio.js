/* French-only paced listening. Other courses keep the shared voice implementation. */
(() => {
  'use strict';
  const voice=window.A1Voice;if(!voice)return;
  const original={cancel:voice.cancel,speak:voice.speak,speakSequence:voice.speakSequence,speakDialogue:voice.speakDialogue};
  const digits=['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf'];
  let generation=0,timer=null,onCancel=null;
  function cancel(){const stopped=onCancel;onCancel=null;generation++;if(timer!==null)window.clearTimeout(timer);timer=null;original.cancel();stopped?.();}
  voice.cancel=cancel;
  for(const method of ['speak','speakSequence'])voice[method]=function(...args){cancel();return original[method](...args);};
  const letter=text=>window.A1Pronunciation?.spellParts(text,'fr')?.join(' ')||text;
  function dictations(text){
    const found=[];
    function collect(regex,parts){for(const match of text.matchAll(regex))found.push({start:match.index,end:match.index+match[0].length,parts:parts(match[0])});}
    collect(/\b[A-Z]\d[A-Z]\s?\d[A-Z]\d\b/g,s=>[...s.replace(/\s/g,'')].map(c=>/\d/.test(c)?digits[Number(c)]:letter(c)));
    collect(/\bzéro\s+(?:un|deux|trois|quatre|cinq|six|sept|huit|neuf)(?:,\s*[^.!?;:,]+){4}/giu,s=>s.split(/,\s*/));
    collect(/\b[A-Z],\s*(?:zéro|un|deux|trois|quatre|cinq|six|sept|huit|neuf),\s*[A-Z],\s*(?:zéro|un|deux|trois|quatre|cinq|six|sept|huit|neuf),\s*[A-Z],\s*(?:zéro|un|deux|trois|quatre|cinq|six|sept|huit|neuf)\b/gu,s=>s.split(/,\s*/).map(p=>/^[A-Z]$/.test(p)?letter(p):p));
    collect(/\b(?:[A-Z](?: cédille)?\s*[,–—-]\s*){2,}[A-Z](?: cédille)?\b/gu,s=>s.split(/\s*[,–—-]\s*/).map(p=>p==='C cédille'?'c cédille':letter(p)));
    collect(/zède,\s*o,\s*e accent aigu/giu,s=>s.split(/,\s*/));
    // Explicitly spelled email segments (point/arobase are spoken as words).
    collect(/\b(?:[a-z],\s*){2,}(?:point|arobase)(?:,\s*(?:[a-z]|point|arobase))+\b/gu,s=>s.split(/,\s*/).map(p=>p==='point'||p==='arobase'?p:letter(p)));
    const out=[];let cursor=0;
    for(const item of found.sort((a,b)=>a.start-b.start||b.end-a.end)){
      if(item.start<cursor)continue;
      if(item.start>cursor)out.push({text:text.slice(cursor,item.start),kind:'speech'});
      out.push(...item.parts.map(part=>({text:part.trim(),kind:'dictation'})));cursor=item.end;
    }
    if(cursor<text.length)out.push({text:text.slice(cursor),kind:'speech'});
    return out;
  }
  function plan(turns,rate=.75){
    return turns.flatMap((turn,index)=>dictations(String(turn.text||'')).flatMap(part=>{
      const pieces=part.kind==='speech'&&rate<1?(part.text.match(/[^.!?;,]+[.!?;,]*/g)||[]):[part.text];
      return pieces.filter(text=>/[\p{L}\p{N}]/u.test(text)).map(text=>({text:text.trim(),speaker:turn.speaker,gender:turn.gender,turn:index,kind:part.kind,rate:part.kind==='dictation'?Math.min(rate,.65):rate,pause:part.kind==='dictation'?550:rate<1?260:100}));
    }));
  }
  voice.speakDialogue=function(turns,options={}){
    if(!Array.isArray(turns)||!turns.length)return false;
    if(options.lang&& !/^fr(?:-|$)/i.test(options.lang)){cancel();return original.speakDialogue(turns,options);}
    const synth=window.speechSynthesis;if(!synth||typeof window.SpeechSynthesisUtterance==='undefined')return false;
    const rate=Number(options.rate??.75),parts=plan(turns,rate);if(!parts.length)return false;
    cancel();const run=generation,pair=voice.dialogueVoices('fr-FR');let index=0,lastTurn=-1,finished=false;
    function finish(failed){if(finished||run!==generation)return;finished=true;onCancel=null;if(timer!==null)window.clearTimeout(timer);timer=null;(failed?options.onError:options.onEnd)?.();}
    onCancel=()=>{if(finished)return;finished=true;options.onEnd?.();};
    function next(){
      if(run!==generation||finished)return;
      if(index>=parts.length){finish(false);return;}
      const part=parts[index++],selected=pair[part.gender==='male'?'B':part.gender==='female'?'A':part.speaker]||voice.select('fr-FR');
      const u=new window.SpeechSynthesisUtterance(part.text);u.lang=selected?.lang||'fr-FR';if(selected)u.voice=selected;u.rate=part.rate;u.pitch=1;u.volume=1;
      if(lastTurn!==part.turn){lastTurn=part.turn;options.onTurn?.(part.speaker,part.turn);}
      let handled=false;
      u.onend=()=>{if(handled||run!==generation||finished)return;handled=true;if(index>=parts.length)finish(false);else timer=window.setTimeout(()=>{timer=null;next();},part.pause);};
      u.onerror=()=>{if(handled)return;handled=true;finish(true);};
      if(synth.paused)synth.resume?.();
      try{synth.speak(u);}catch{finish(true);}
    }
    next();return true;
  };
  window.FR_A1_LISTENING_AUDIO={plan,dictations};
})();
