/* Compile the reviewed source into the same runtime contracts as Français A1. */
(() => {
  'use strict';
  const lessons=window.EN_A1_AUTHORING.lessons;
  const specs={},hard={},comprehension={},vocabulary=[],foundations={en:{}};
  function rowTask(row,lessonId,topicIndex,index,rule){
    const [prompt,answer,b,c,meaning]=row;
    const audio=prompt.replace('___',answer);
    return {type:'choice',kind:'form',q:'Ergänze: '+prompt,answer,o:[answer,b,c],a:0,context:meaning,meaning,
      audio,answerLang:'en',family:`L${lessonId}-t${topicIndex}`,checkKey:`en-${lessonId}-${topicIndex}-${index}`,
      explanation:`${audio} = ${meaning} ${rule.split(/(?<=[.!?])\s/)[0]}`};
  }
  for(const l of lessons){
    l.quiz=l.phraseRows.map(([target,meaning,b,c])=>({q:`Was bedeutet „${target}“?`,o:[meaning,b,c],a:0,audio:target,explanation:meaning}));
    const check=l.contexts.map(([q,answer,b,c],i)=>({type:'choice',q,answer,o:[answer,b,c],audio:answer,explanation:answer,family:`L${l.id}-situation-${i}`}));
    l.topics.forEach((t,ti)=>{
      t.key='t'+ti;
      t.practice=t.rows.slice(0,10).map((r,i)=>rowTask(r,l.id,ti,i,t.rule));
      t.transfer=t.rows.slice(10).map((r,i)=>rowTask(r,l.id,ti,i+10,t.rule));
      // Half of the independent grammar transfer items require production.
      check.push(...t.transfer.map((q,i)=>i%2?{...q,type:'gap',prompt:q.q.replace(/^Ergänze: /,''),o:undefined}:q));
    });
    specs[l.id]={goals:l.goals,checkTasks:check,tasks:l.topics.flatMap(t=>t.transfer),checkTransfers:[]};
    const gaps=[];
    const text=l.cloze.replace(/\{([^{}]+)\}/g,(_,value)=>{
      const [answers,hint]=value.split('|');gaps.push({answers:answers.split('~'),hint,strictAccents:true});return `{{${gaps.length-1}}}`;
    });
    const scenes=window.EN_A1_LISTENING[l.id];
    comprehension[l.id]={title:l.title,...scenes[0]};
    hard[l.id]={version:2,minutes:l.id<4?[15,25]:[20,30],text,gaps,
      listening:scenes.slice(1).map(s=>({turns:s.turns,text:s.turns.map(t=>t.text).join(' '),questions:s.fields.map((f,i)=>({q:f.label,answers:[f.answer,...f.accept],...(i===3?{options:f.options}:{}),...(f.format?{format:f.format}:{}),strictAccents:true}))})),
      writing:{situation:l.transfer.speaking,points:l.points,model:l.model,minWords:l.id<4?15:25,targetWords:l.id<4?20:35}};
    foundations.en[l.id]={words:l.vocabulary};
    for(const [en,de]of l.vocabulary)vocabulary.push({en,de,enLessons:[l.id],deLessons:[]});
  }
  window.EN_A1_DATA={lessons};
  window.EN_A1_MASTERY_SPECS=specs;
  window.EN_A1_HARD_CONTENT=hard;
  window.EN_A1_HARD_AUDIO={turns:(_id,data,index)=>data.listening[index].turns};
  window.A1_COMPREHENSION_CONTENT=comprehension;
  window.A1_VOCABULARY_CONTENT=vocabulary;
  window.EN_A1_FOUNDATIONS=foundations;
})();
