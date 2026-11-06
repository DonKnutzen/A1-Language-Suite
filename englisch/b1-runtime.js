/* Compile authored content to the existing lesson, review and hard-mode APIs. */
(() => {
  'use strict';
  const lessons=window.EN_B1_AUTHORING.lessons,{scenes,reading}=window.EN_B1_SKILLS;
  const specs={},hard={},comprehension={},vocabulary=[],plan={},entries=[],meanings={};
  const contractions={"don't":'do not',"doesn't":'does not',"isn't":'is not',"aren't":'are not',"can't":'cannot',"won't":'will not',"wouldn't":'would not',"mustn't":'must not',"haven't":'have not',"hasn't":'has not',"didn't":'did not'};
  function variants(answer){
    const out=new Set();
    for(const[short,long]of Object.entries(contractions)){
      if(answer.includes(short))out.add(answer.replace(short,long));
      if(answer.includes(long))out.add(answer.replace(long,short));
    }
    if(answer.includes('practising'))out.add(answer.replace('practising','practicing'));
    return [...out];
  }
  const task=(r,l,t,i)=>{
    const [prompt,answer,b,c,meaning]=r,audio=prompt.replace('___',answer);
    return {type:'choice',kind:'form',q:'Ergänze: '+prompt,prompt,answer,o:[answer,b,c],a:0,context:meaning,meaning,audio,answerLang:'en',
      accept:variants(answer),
      family:`b1-${l.id}-${t.key}`,checkKey:`b1-${l.id}-${t.key}-${i}`,explanation:`${audio} = ${meaning} ${t.rule.split('\n')[0]}`};
  };
  for(const l of lessons){
    l.transfer.writing='Schreibe 90–110 Wörter (Ziel: ungefähr 100). '+l.writingTask;
    l.quiz=l.phraseRows.map(([target,meaning,b,c])=>({q:`Was bedeutet „${target}“?`,o:[meaning,b,c],a:0,audio:target,explanation:meaning}));
    const check=l.contexts.map(([q,answer,b,c],i)=>({type:'choice',q,answer,o:[answer,b,c],audio:answer,explanation:answer,family:`b1-${l.id}-communication-${i}`}));
    l.topics.forEach((t,ti)=>{
      t.key='t'+ti;t.practice=t.rows.slice(0,6).map((r,i)=>task(r,l,t,i));
      t.transfer=t.rows.slice(6).map((r,i)=>task(r,l,t,i+6));
      check.push(...t.transfer.map(q=>({...q,type:'gap',o:undefined})));
    });
    specs[l.id]={goals:l.goals,checkTasks:check,tasks:l.topics.flatMap(t=>t.transfer),checkTransfers:[]};
    const gaps=[],text=l.cloze.replace(/\{([^{}]+)\}/g,(_,value)=>{const[a,hint]=value.split('|');gaps.push({answers:a.split('~'),hint,strictAccents:true});return `{{${gaps.length-1}}}`;});
    comprehension[l.id]={title:l.title,...scenes[l.id][0]};
    hard[l.id]={version:1,minutes:[30,40],text,gaps,objectives:l.goals,
      listening:scenes[l.id].slice(1).map(s=>({turns:s.turns,text:s.turns.map(t=>t.text).join(' '),questions:s.fields.map((f,i)=>({q:f.label,answers:[f.answer,...f.accept],...(i===3?{options:f.options}:{}),strictAccents:true}))})),
      writing:{situation:l.writingTask,points:l.points,model:l.model,minWords:90,targetWords:100}};
    const words=l.vocabulary.map(([en])=>en);
    plan[l.id]={regular:words,hard:[],hardOnly:[],stages:{listen:words.slice(0,6),'grammar:0':words.slice(6,13),'grammar:1':words.slice(13),comprehension:[],hard:[]}};
    for(const [en,de]of l.vocabulary){
      if(!meanings[en]){meanings[en]=de;entries.push({en,de,enLessons:[l.id],deLessons:[]});}
      else {
        const entry=entries.find(e=>e.en===en);entry.enLessons.push(l.id);
        if(!entry.de.split(' / ').includes(de)&&entry.de!==de){entry.de+=' / '+de;meanings[en]=entry.de;}
      }
      vocabulary.push({en,de,enLessons:[l.id],deLessons:[]});
    }
  }
  window.EN_A1_DATA={lessons};window.EN_A1_MASTERY_SPECS=specs;window.EN_A1_HARD_CONTENT=hard;
  window.EN_A1_HARD_AUDIO={turns:(_id,data,i)=>data.listening[i].turns};
  window.A1_COMPREHENSION_CONTENT=comprehension;window.EN_A1_READING=reading;
  window.EN_A1_VOCABULARY={plan,entries,meanings};window.A1_VOCABULARY_CONTENT=entries;
  window.A1LessonVocabularyPlan={en:plan};window.A1LessonLexicon={entries:{en:entries}};
  window.EN_A1_FOUNDATIONS={en:Object.fromEntries(lessons.map(l=>[l.id,{words:l.vocabulary}]))};
})();
