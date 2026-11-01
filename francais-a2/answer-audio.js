/* Correct-answer pronunciation is mounted only after a response is marked. */
(() => {
  'use strict';
  const clean=value=>String(value??'').replace(/\|/g,'').trim();
  function resolve(task={},audio='',answer='',lesson={}){
    const explicit=clean(audio||task.audio);
    if(explicit&&!explicit.includes('___'))return explicit;
    const correct=clean(answer||task.answer||task.o?.[task.a]);
    const pair=lesson.phrases?.find(p=>clean(p[1])===correct);
    if(pair)return clean(pair[0]);
    // Do not read a German/English instruction or translation as French.
    return explicit?explicit.replace(/___/g,correct):'';
  }
  function play(text){if(text)window.A1Voice?.speak(text,{lang:'fr-FR',rate:.8});}
  function mount(root,{task={},text='',answer='',lesson={},playAudio=play}={}){
    if(!root)return;
    const audio=resolve(task,text,answer,lesson);if(!audio)return;
    root.querySelectorAll('[data-answer-replay]').forEach(button=>button.remove());
    const button=document.createElement('button');button.type='button';button.className='tiny-btn answer-audio-repeat';button.dataset.answerReplay='';button.dataset.answerAudio=audio;
    const en=window.A1Profile?.getUiLang()==='en';button.textContent=en?'🔊 Listen again':'🔊 Noch einmal anhören';
    button.setAttribute('aria-label',(en?'Listen to the correct answer: ':'Richtige Antwort anhören: ')+audio);
    button.onclick=()=>playAudio(audio);root.append(button);return button;
  }
  window.FR_A1_ANSWER_AUDIO={resolve,mount,play};
})();
