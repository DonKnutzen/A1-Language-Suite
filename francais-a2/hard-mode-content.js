/* Original lesson-specific A2 Hard Mode content. The telc Français A2 sample informs task
   types and topics; no official exam items or recordings are reproduced. */
(() => {
  'use strict';
  const content={};
  const question=(q,answers,skills,extra={})=>({q,answers:[answers].flat(),skills:skills.split(','),...extra});
  // lesson(id,{text,objectives,listening,writing}): gaps are written as {answer~alt|hint|skill}.
  const lesson=(id,{text,objectives,listening,writing})=>{
    const gaps=[];
    const cloze=text.replace(/\{([^{}]+)\}/g,(_,v)=>{const [answer,hint,skill]=v.split('|');gaps.push({answers:answer.split('~'),hint,skills:skill.split(',')});return `{{${gaps.length-1}}}`;});
    content[id]={version:1,compatibleVersions:[],text:cloze,gaps,listening,writing:{minWords:40,targetWords:50,...writing},
      objectives:Object.fromEntries(objectives.map(([key,label])=>[key,{label,source:`A2 L${id}: Lerninhalt, Grammatik und Vertiefung`}]))};
    content[id].taskCount=gaps.length+listening.reduce((n,b)=>n+b.questions.length,0)+1;
  };
  void lesson;void question;
  window.FR_A1_HARD_LEGACY={};
  window.FR_A1_HARD_VERSIONS={};
  window.FR_A1_HARD_AUDIO={turns:(lessonId,data,blockIndex)=>{const block=data.listening[blockIndex];return (block.turns||[{speaker:'A',text:block.text}]).map(turn=>({...turn,gender:turn.gender||block.gender||'female'}));}};
  window.FR_A1_HARD_CONTENT=content;
})();
