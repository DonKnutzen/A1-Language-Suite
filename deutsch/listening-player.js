/* Keep the shared comprehension component unchanged for the other courses. */
(() => {
  const comprehension=window.A1Comprehension;if(!comprehension)return;
  const render=comprehension.render;
  comprehension.render=function(options){
    if(options.targetLang!=='de')return render(options);
    const saved=options.work.comprehension;if(saved)saved.rate=Number(saved.rate)===.75?.75:1;
    render(options);
    const root=options.root,play=root.querySelector('#dialoguePlay');
    root.querySelectorAll('[data-dialogue-rate]').forEach(button=>{
      button.textContent=Number(button.dataset.dialogueRate)===.75?'75 %':'100 %';
      const change=button.onclick;
      button.onclick=()=>{const restart=play.textContent.startsWith('■')&&Number(button.dataset.dialogueRate)!==options.work.comprehension.rate;change();if(restart)play.click();};
    });
  };
})();
