/* Pure task construction and answer handling, shared by UI and verification. */
(() => {
  'use strict';
  const D=window.EL_A1_DATA;
  const normalize=s=>{const raw=String(s??'').normalize('NFC').toLocaleLowerCase('el').replace(/;/g,';').trim();return raw.replace(/[.,;·!?«»„“"…]/g,' ').replace(/\s+/g,' ').trim()||raw;};
  const unaccent=s=>normalize(s).normalize('NFD').replace(/\u0301/g,'').normalize('NFC');
  function grade(input,answer,accepted=[]){
    const candidates=[answer,...accepted];
    if(candidates.some(candidate=>normalize(input)===normalize(candidate)))return 'correct';
    if(candidates.some(candidate=>unaccent(input)===unaccent(candidate)))return 'accent';
    return 'wrong';
  }
  function tasks(l,kind='practice'){
    const result=[];
    const push=(t,key)=>result.push({...t,id:`${l.id}:${key}`,lessonId:l.id});
    l.phrases.forEach((p,i)=>{
      const others=l.phrases.filter(x=>x.de!==p.de&&x.el!==p.el);
      const choice=kind==='check'?null:[p.el,others[(i+1)%others.length].el,others[(i+3)%others.length].el];
      push({prompt:`${kind==='check'?'Schreibe':'Wähle'} auf Griechisch: ${p.de}`,answer:p.el,accepted:p.accepted||[],options:choice,explanation:`„${p.el}“ verwendest du für „${p.de}“. ${l.rule}`,audio:p.el},`phrase-${i}`);
      if(kind==='practice')push({prompt:`Was bedeutet „${p.el}“?`,answer:p.de,options:p.meaningOptions||[p.de,others[i%others.length].de,others[(i+2)%others.length].de],explanation:p.meaningExplanation||`Die Wendung bedeutet „${p.de}“. ${l.rule}`},`meaning-${i}`);
    });
    l.grammar.forEach((t,i)=>push(t,`grammar-${i}`));
    if(kind==='check')l.transfer.forEach((t,i)=>push(t,`transfer-${i}`));
    for(const key of ['reading','listening'])l[key].questions.forEach((t,i)=>push({...t,source:l[key].body,kind:key},`${key}-${i}`));
    return result;
  }
  function alphabetTasks(group){
    const letters=group===undefined?D.alphabet:D.alphabet.filter(a=>a.group===group);
    return letters.flatMap(a=>[
      {id:`letter:${a.upper}`,prompt:a.upper==='Σ'?'Welche Kleinform von Σ steht am Wortende?':`Welche Kleinbuchstaben gehören zu ${a.upper}?`,answer:a.upper==='Σ'?'ς':a.lower,options:a.upper==='Σ'?['ς','σ','ζ']:[a.lower,...D.alphabet.filter(b=>b.lower!==a.lower).slice((D.alphabet.indexOf(a)+2)%20,(D.alphabet.indexOf(a)+2)%20+2).map(b=>b.lower)],explanation:`${a.upper} und ${a.lower} heißen ${a.name}; Laut: ${a.sound}. Beispiel: ${a.word} (${a.meaning}).${a.upper==='Σ'?' Am Wortende steht ς, im Wort σ.':''}`},
      {id:`word:${a.upper}`,prompt:`Schreibe dieses Wort exakt ab: ${a.word}`,answer:a.word,explanation:`${a.word} bedeutet ${a.meaning}. Achte auf Kleinbuchstaben und Tonos; der Tonos markiert die Betonung.`}
    ]);
  }
  // Convert only the old navigation position; retain scores, drafts and review history.
  function migrate(state){
    state.lessonWork||={};state.lessonMasteryBest||={};state.lessonQuizBest||={};state.lessonCheckLast||={};state.qualifiedCheckBest||={};
    if(state.flowVersion!==2){
      for(const [id,work]of Object.entries(state.lessonWork)){
        work.step=({0:0,1:0,2:1,3:1,4:1,5:2,6:3,7:3})[work.step]??0;
        if(Number(state.lessonMasteryBest[id])>=80&&(!(state.lessonCheckLast[id]?.skippedAudio>0)||state.doneLessons?.includes(Number(id))))state.qualifiedCheckBest[id]=state.lessonMasteryBest[id];
      }
      state.flowVersion=2;
    }
    return state;
  }
  function passedCheck(state,id){return Number(state.qualifiedCheckBest?.[id]||0)>=80;}
  function completion(state){
    migrate(state);state.doneLessons=D.lessons.filter(l=>passedCheck(state,l.id)).map(l=>l.id);
    return Math.round(state.doneLessons.length/D.lessons.length*100);
  }
  function vocabularyTasks(l){
    const pool=tasks(l);return [...pool.filter(t=>t.id.includes(':phrase-')),...pool.filter(t=>t.id.includes(':meaning-')).slice(0,2)];
  }
  function orderTasks(l){
    return l.phrases.filter(p=>p.el.trim().split(/\s+/).length>1).slice(0,4).map((p,i)=>{
      const tokens=p.el.trim().split(/\s+/),extra=l.phrases.flatMap(x=>x.el.split(/\s+/)).find(t=>!tokens.includes(t));
      return {id:`${l.id}:order-${i}`,lessonId:l.id,kind:'order',prompt:`Baue den Satz: ${p.de}`,tokens:[...tokens,...(extra?[extra]:[])],answer:p.el,explanation:l.rule,audio:p.el};
    });
  }
  function checkTasks(l){
    const pool=tasks(l),check=tasks(l,'check');
    return [...pool.filter(t=>t.id.includes(':phrase-')).slice(0,6),...check.filter(t=>!t.id.includes(':phrase-'))];
  }
  function currentTask(task){
    if(!task?.id)return null;
    const l=D.lessons.find(l=>l.id===task.lessonId);
    const pool=l?[...tasks(l,task.options?'practice':'check'),...orderTasks(l)]:[...alphabetTasks(),...D.orthography];
    return pool.find(t=>t.id===task.id)||null;
  }
  window.EL_A1={normalize,grade,tasks,alphabetTasks,completion,currentTask,migrate,passedCheck,vocabularyTasks,checkTasks,orderTasks};
})();

