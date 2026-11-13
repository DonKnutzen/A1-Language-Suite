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
      const choice=[p.el,...[...others].sort((a,b)=>Math.abs(a.el.length-p.el.length)-Math.abs(b.el.length-p.el.length)).slice(0,2).map(x=>x.el)];
      push({prompt:`Wähle auf Griechisch: ${p.de}`,answer:p.el,accepted:p.accepted||[],options:choice,explanation:`„${p.el}“ verwendest du für „${p.de}“. ${l.rule}`,audio:p.el},`phrase-${i}`);
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
      {id:`word:${a.upper}`,prompt:`Welches Wort bedeutet „${a.meaning}“?`,answer:a.word,options:[a.word,...[...new Set(D.alphabet.map(b=>b.word))].filter(word=>word!==a.word).sort((x,y)=>Math.abs(x.length-a.word.length)-Math.abs(y.length-a.word.length)).slice(0,2)],explanation:`${a.word} bedeutet ${a.meaning}. Achte auf Kleinbuchstaben und Tonos; der Tonos markiert die Betonung.`}
    ]);
  }
  function migrate(state){
    state.lessonWork||={};state.lessonMasteryBest||={};state.lessonQuizBest||={};
    if(state.flowVersion===2){
      for(const work of Object.values(state.lessonWork))work.step=work.step===1?({0:2,1:3,2:5}[work.topic]??2):({0:1,2:5,3:6}[work.step]??0);
    }else if(state.flowVersion!==3){
      for(const work of Object.values(state.lessonWork))work.step=Math.min(6,Math.max(0,Number(work.step)||0));
    }
    state.flowVersion=3;return state;
  }
  function completion(state){
    migrate(state);const already=new Set(state.doneLessons||[]);
    state.doneLessons=D.lessons.filter(l=>already.has(l.id)||Number(state.lessonMasteryBest[l.id]||0)>=80).map(l=>l.id);
    return Math.round(state.doneLessons.length/D.lessons.length*100);
  }
  function currentTask(task){
    if(!task?.id)return null;
    const l=D.lessons.find(l=>l.id===task.lessonId);
    const pool=l?[...tasks(l),...tasks(l,'check')]:[...alphabetTasks(),...D.orthography];
    return pool.find(t=>t.id===task.id)||null;
  }
  window.EL_A1={normalize,grade,tasks,alphabetTasks,completion,currentTask,migrate};
})();

