(() => {
  'use strict';
  const resolve=(task,text)=>task?.audio||text||'';
  function mount(root,{text,task,playAudio}={}){
    text=resolve(task,text);if(!root||!text)return;
    const button=document.createElement('button');button.type='button';button.className='tiny-btn';button.textContent='🔊 Antwort anhören';
    button.onclick=()=>playAudio?playAudio(text):A1Voice.speak(text,{lang:'en-GB',rate:.8});root.append(button);
  }
  window.EN_A1_ANSWER_AUDIO={resolve,mount};
})();
