/* Français A2 drills come only from authored mastery tasks with three close options.
   No options are generated from sentence pairs, so every distractor is reviewed. */
(() => {
  'use strict';
  const shuffle=a=>{const out=[...a];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
  function select(tasks,shuffleFn=shuffle){
    const seen=new Set(),forms=tasks.filter(t=>t.kind==='form').filter(t=>{const key=t.audio||t.q;if(seen.has(key))return false;seen.add(key);return true;});
    const selected=shuffleFn(forms);
    return window.FR_A1_MASTERY?.spreadAnswers?window.FR_A1_MASTERY.spreadAnswers(selected):selected;
  }
  window.FR_A1_GRAMMAR_EN={};
  window.FR_A1_GRAMMAR_PRACTICE={improve:(lesson,unit,tasks)=>tasks,select,possessives:()=>[],ordering:()=>[],fromPairs:()=>[],focusedTopics:()=>null};
})();
