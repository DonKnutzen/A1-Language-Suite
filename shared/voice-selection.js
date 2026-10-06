(function(){
  'use strict';
  const synth=window.speechSynthesis;
  let voices=[];
  let speakToken=0;
  const isApple=/Macintosh|Mac OS X|iPhone|iPad|iPod/i.test(navigator.userAgent||'') || /Mac|iPhone|iPad|iPod/i.test(navigator.platform||'');
  const preferred={
    'fr':['audrey','aurélie','aurelie','thomas','amélie','amelie','marie'],
    'es':['mónica','monica','jorge','paulina','marisol','juan'],
    'de':['anna','markus','petra','yannick']
  };
  const avoid=['compact','espeak','festival','novelty','whisper','zarvox','trinoids','bells','boing','bubbles','cellos','organ','superstar'];
  function refresh(){voices=synth?synth.getVoices():[];return voices;}
  function langNorm(s){return String(s||'').toLowerCase().replace('_','-');}
  function appleScore(v,lang){
    const wanted=langNorm(lang), base=wanted.slice(0,2), vl=langNorm(v.lang), name=String(v.name||'').toLowerCase();
    if(!vl.startsWith(base))return -10000;
    let score=vl===wanted?120:80;
    if(name.includes('enhanced')||name.includes('premium'))score+=80;
    if(name.includes('siri'))score+=70;
    const names=preferred[base]||[];
    const idx=names.findIndex(n=>name.includes(n));
    if(idx>=0)score+=60-idx*3;
    if(v.localService)score+=5;
    if(avoid.some(n=>name.includes(n)))score-=200;
    return score;
  }
  function select(lang){
    const list=refresh(), wanted=langNorm(lang), base=wanted.slice(0,2);
    if(!list.length)return null;
    if(!isApple){
      return list.find(v=>langNorm(v.lang)===wanted) || list.find(v=>langNorm(v.lang).startsWith(base)) || null;
    }
    return list.map((v,i)=>({v,i,s:appleScore(v,wanted)})).filter(x=>x.s>-1000).sort((a,b)=>b.s-a.s||a.i-b.i)[0]?.v||null;
  }
  function speak(text,{lang,rate=.82,volume=1,pitch=1}={}){
    if(!synth||!text)return;
    const token=++speakToken;
    synth.cancel();
    const run=(attempt=0)=>{
      if(token!==speakToken)return;
      const list=refresh();
      if(!list.length&&attempt<5){setTimeout(()=>run(attempt+1),120);return;}
      const u=new SpeechSynthesisUtterance(text);
      u.lang=lang;
      u.rate=rate;u.volume=volume;u.pitch=pitch;
      const v=select(lang);if(v)u.voice=v;
      synth.speak(u);
    };
    run();
  }
  function cancel(){speakToken++;if(synth)synth.cancel();}
  if(synth){
    refresh();
    if(typeof synth.addEventListener==='function')synth.addEventListener('voiceschanged',refresh);
    else synth.onvoiceschanged=refresh;
    // Safari/WebKit may populate voices shortly after page load.
    setTimeout(refresh,100);setTimeout(refresh,500);setTimeout(refresh,1500);
  }
  window.A1Voice={speak,cancel,select,refresh,isApple};
})();
