/* Pure task construction and answer handling, shared by UI and verification. */
(() => {
  'use strict';
  const D=window.EL_A1_DATA;
  const normalize=s=>{const raw=String(s??'').normalize('NFC').toLocaleLowerCase('el').replace(/;/g,';').trim();return raw.replace(/[.,;·!?«»„“"…]/g,' ').replace(/\s+/g,' ').trim()||raw;};
  const unaccent=s=>normalize(s).normalize('NFD').replace(/\u0301/g,'').normalize('NFC');
  function grade(input,answer){
    if(normalize(input)===normalize(answer))return 'correct';
    if(unaccent(input)===unaccent(answer))return 'accent';
    return 'wrong';
  }
  function tasks(l,kind='practice'){
    const result=[];
    const push=(t,key)=>result.push({...t,id:`${l.id}:${key}`,lessonId:l.id});
    l.phrases.forEach((p,i)=>{
      const others=l.phrases.filter(x=>x.de!==p.de&&x.el!==p.el);
      const choice=kind==='check'?null:[p.el,others[(i+1)%others.length].el,others[(i+3)%others.length].el];
      push({prompt:`Schreibe auf Griechisch: ${p.de}`,answer:p.el,options:choice,explanation:`„${p.el}“ verwendest du für „${p.de}“. ${l.rule}`,audio:p.el},`phrase-${i}`);
      if(kind==='practice')push({prompt:`Was bedeutet „${p.el}“?`,answer:p.de,options:[p.de,others[i%others.length].de,others[(i+2)%others.length].de],explanation:`Die Wendung bedeutet „${p.de}“. ${l.rule}`},`meaning-${i}`);
    });
    l.grammar.forEach((t,i)=>push(t,`grammar-${i}`));
    if(kind==='check')l.transfer.forEach((t,i)=>push(t,`transfer-${i}`));
    for(const key of ['reading','listening'])l[key].questions.forEach((t,i)=>push({...t,source:l[key].body,kind:key},`${key}-${i}`));
    return result;
  }
  function alphabetTasks(group){
    const letters=group===undefined?D.alphabet:D.alphabet.filter(a=>a.group===group);
    return letters.flatMap(a=>[
      {id:`letter:${a.upper}`,prompt:`Welche Kleinbuchstaben gehören zu ${a.upper}?`,answer:a.lower,options:[a.lower,...D.alphabet.filter(b=>b.lower!==a.lower).slice((D.alphabet.indexOf(a)+2)%20,(D.alphabet.indexOf(a)+2)%20+2).map(b=>b.lower)],explanation:`${a.upper} und ${a.lower} heißen ${a.name}; Laut: ${a.sound}. Beispiel: ${a.word} (${a.meaning}).`},
      {id:`word:${a.upper}`,prompt:`Schreibe dieses Wort exakt ab: ${a.word}`,answer:a.word,explanation:`${a.word} bedeutet ${a.meaning}. Achte auf Kleinbuchstaben und Tonos; der Tonos markiert die Betonung.`}
    ]);
  }
  function completion(state){
    state.doneLessons=D.lessons.filter(l=>Number(state.lessonMasteryBest[l.id]||0)>=80&&state.lessonWork[l.id]?.writing&&state.lessonWork[l.id]?.speaking).map(l=>l.id);
    return Math.round(state.doneLessons.length/D.lessons.length*100);
  }
  window.EL_A1={normalize,grade,tasks,alphabetTasks,completion};
})();
