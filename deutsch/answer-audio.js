/* German answer feedback uses the device voice; replay never grades or changes progress. */
(() => {
  'use strict';
  const clean=value=>String(value??'').replace(/\|/g,'').trim();
  // A postal code is an identifier, not a number of thousands.
  function forSpeech(text){
    const digits=['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun'];
    return String(text??'').replace(/\b(Postleitzahl\s*(?:ist\s*|:\s*)?)(\d{5})\b/gi,(_,label,code)=>label+[...code].map(d=>digits[Number(d)]).join(', '));
  }
  function resolve(task={},audio='',answer='',lesson={}){
    const explicit=clean(audio||task.audio);if(explicit&&!explicit.includes('___'))return explicit;
    const correct=clean(answer||task.answer||task.o?.[task.a]);
    const pair=lesson.phrases?.find(p=>clean(p[1])===correct);if(pair)return clean(pair[0]);
    const question=clean(task.prompt||task.q);
    if(question.includes('___')){
      let sentence=question.split(/Complète\s*:\s*/i).pop().replace(/^Quel article\s*:\s*/i,'');
      const parts=correct.split(/\s+\/\s+/);let i=0;
      sentence=sentence.replace(/___/g,()=>parts[i++]||correct);
      if(!/[«»]/.test(sentence))return sentence;
    }
    if(/signifie|signifie…|demande…/.test(question)){
      const quoted=question.match(/[«„]([^»“]+)[»“]/);if(quoted)return clean(quoted[1]);
    }
    return correct;
  }
  function play(text){if(text)window.A1Voice?.speak(forSpeech(text),{lang:'de-DE',rate:.8});}
  function mount(root,{task={},text='',answer='',lesson={},autoplay=true,playAudio=play}={}){
    if(!root)return;
    const audio=resolve(task,text,answer,lesson);if(!audio)return;
    root.querySelectorAll('[data-answer-replay]').forEach(button=>button.remove());
    const button=document.createElement('button');button.type='button';button.className='tiny-btn answer-audio-repeat';button.dataset.answerReplay='';button.dataset.answerAudio=audio;
    button.textContent='🔊 Réécouter';button.setAttribute('aria-label','Réécouter la bonne réponse : '+audio);
    button.onclick=()=>playAudio(audio);root.append(button);
    if(autoplay)playAudio(audio);
    return button;
  }
  window.DE_A1_ANSWER_AUDIO={resolve,mount,play,forSpeech};
})();
