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
    // The transcript is a correction aid: it opens after "Vérifier", or at once if the device cannot speak.
    const transcript=root.querySelector('.comprehension-transcript'),status=root.querySelector('#dialogueStatus');
    if(!transcript)return;
    const note=document.createElement('p');note.className='muted comprehension-transcript-note';note.textContent='Le texte du dialogue s’affiche après la vérification.';
    transcript.before(note);
    const sync=()=>{const open=options.work.comprehension?.graded===true||(status&&!status.hidden);transcript.hidden=!open;note.hidden=open;if(!open)transcript.open=false;};
    for(const id of ['dialogueCheck','dialogueRetry']){
      const button=root.querySelector('#'+id),original=button?.onclick;
      if(button&&original)button.onclick=event=>{original.call(button,event);sync();};
    }
    if(status)new MutationObserver(sync).observe(status,{attributes:true,attributeFilter:['hidden']});
    sync();
  };
})();
