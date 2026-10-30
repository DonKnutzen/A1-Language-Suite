/* Explicit answer feedback is independent of optional example autoplay. */
(() => {
  'use strict';
  const languages={de:'de-DE',fr:'fr-FR',en:'en-GB',es:'es-ES'};
  const labels={de:'Richtige Antwort noch einmal anhören',fr:'Réécouter la bonne réponse',en:'Listen to the correct answer again',tr:'Doğru cevabı tekrar dinle'};
  let pending=[],scheduled=false;
  const language=lang=>languages[lang]||lang;
  function play(text,lang){if(text)window.A1Voice?.speak(text,{lang:language(lang),rate:.8});}
  function enqueue(root,text,lang){
    pending.push({root,text,lang:language(lang)});
    if(scheduled)return;scheduled=true;
    queueMicrotask(()=>{
      scheduled=false;const entries=pending.filter(item=>item.root.isConnected);pending=[];
      if(!entries.length)return;
      // Batch-graded C1 pages must read each answer, not cancel the preceding one.
      const parts=entries.map(item=>item.text),lang=entries[0].lang;
      if(window.A1Voice?.speakSequence)window.A1Voice.speakSequence(parts,{lang,rate:.8});
      else play(parts.join('. '),lang);
    });
  }
  function resolve(task={},text='',answer=''){
    const explicit=String(text||task.audio||'').replace(/\|/g,'').trim();
    const correct=String(answer||task.answer||task.o?.[task.a]||'').replace(/\|/g,'').trim();
    if(explicit)return explicit.replace(/___/g,correct);
    const prompt=String(task.prompt||'');
    const forms=correct.split(/\s+\/\s+/);let index=0;
    return prompt.includes('___')?prompt.replace(/___/g,()=>forms[index++]||correct):correct;
  }
  function mount(root,{text,lang='de',uiLang='de',autoplay=true,enqueue:queued=false,playAudio}={}){
    if(!root||!String(text||'').trim())return;
    const existing=root.querySelector('[data-correct-answer-audio]');if(existing)return existing;
    const button=document.createElement('button');button.type='button';
    button.className='tiny-btn answer-audio-repeat';button.style.minHeight='44px';
    button.dataset.correctAnswerAudio='';button.dataset.answerReplay='';
    button.dataset.answerAudio=text;button.dataset.answerLang=language(lang);
    const label=labels[uiLang]||labels.de;button.textContent='🔊 '+label;button.setAttribute('aria-label',label);
    const speak=()=>playAudio?playAudio(text):play(text,lang);button.onclick=speak;root.append(button);
    if(autoplay){if(queued&&!playAudio)enqueue(root,text,lang);else speak();}
    return button;
  }
  window.A1AnswerFeedback={resolve,mount,play};
})();
