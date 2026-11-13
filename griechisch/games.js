/* Greek data adapters for the same finale, arcade and quiz engines as French A1. */
(() => {
  'use strict';
  const D=window.EL_A1_DATA,C=window.EL_A1;
  const lesson=id=>D.lessons.find(l=>l.id===Number(id));
  const words=text=>[...text.matchAll(/[\p{L}\p{M}]+/gu)];
  function gaps(l){return l.phrases.map(p=>{
    const word=words(p.el).sort((a,b)=>b[0].length-a[0].length)[0];
    return {sentence:p.el.slice(0,word.index)+'___'+p.el.slice(word.index+word[0].length),answers:[word[0]],hint:p.de,policy:{strictAccents:true},full:p.el};
  });}
  const content=Object.fromEntries(D.lessons.map(l=>[l.id,{version:1,listening:[l.listening,l.reading].map(block=>({text:block.body,questions:block.questions.map(q=>({q:q.prompt,options:q.options,answers:[q.answer]}))}))}]));
  function build(id){
    const l=lesson(id),tasks=[],pages=[];
    const add=(key,items,extra={})=>{const ids=items.map(q=>{tasks.push(q);return tasks.length-1;});pages.push({key,ids,...extra});};
    add('memory',[{type:'memory',pairs:l.phrases.map(p=>[p.el,p.de]),title:['Karten-Memory','Card memory'],skills:['Wortschatz']}]);
    add('match',[{type:'match',labels:l.phrases.slice(0,6).map(p=>p.de),answers:l.phrases.slice(0,6).map(p=>p.el),policy:l.phrases.slice(0,6).map(()=>({strictAccents:true})),title:['Wendungen verbinden','Match phrases'],skills:['Wortschatz']}]);
    const trains=l.phrases.filter(p=>p.el.trim().split(/\s+/).length>=2).slice(0,2).map(p=>{
      const tokens=p.el.trim().split(/\s+/),extras=[...new Set(l.phrases.flatMap(x=>x.el.split(/\s+/)))].filter(w=>!tokens.includes(w)&&/\p{L}/u.test(w)).slice(0,2);
      return {type:'order',tokens:[...tokens,...extras],required:tokens.length,answer:p.el,title:['Satz bauen · '+p.de,'Build the sentence · '+p.de],skills:['Satzbau']};
    });
    add('order',trains);
    const cloze=gaps(l).map(g=>({...g,type:'text',title:['Lücke füllen','Fill the gap'],skills:['Wortschatz','Tonos']}));
    for(let i=0;i<cloze.length;i+=2)add('text',cloze.slice(i,i+2));
    const radio=content[id].listening.flatMap((block,b)=>block.questions.map(q=>({...q,type:'choice',block:b,title:[q.q,q.q],skills:['Hörverstehen']})));
    add('listening',radio,{blocks:[0,1]});return {tasks,pages,version:1};
  }
  const mode={matches:(value,answers)=>answers.some(answer=>C.grade(value,answer)==='correct')};
  window.A1_GAME_HARD.registerCourse('el',{content:()=>content,mode:()=>mode,build,audio:()=>({available:()=>window.speechSynthesis?.getVoices().some(v=>/^el(?:-|$)/i.test(v.lang)),turns:(id,data,b)=>[{speaker:'A',text:data.listening[b].text}]}),target:'el',voice:'el-GR',ui:'de',requireAudio:true,accents:[...'αβγδεζηθικλμνξοπρσςτυφχψωάέήίόύώϊϋΐΰ'],cheers:['Μπράβο!','Πολύ καλά!','Ωραία!','Σωστά!']});
  function arcadeContent(id){
    const l=lesson(id),cloze=gaps(l),pool=[...new Set(l.phrases.flatMap(p=>words(p.el).map(m=>m[0])))];
    const rounds=cloze.map(g=>{const [before,after]=g.sentence.split('___');return {before,after,verb:g.hint,answer:g.answers[0],others:pool.filter(w=>C.normalize(w)!==C.normalize(g.answers[0])).slice(0,3),sentence:g.full};});
    const sort=C.tasks(l,'check').filter(q=>q.options&&!q.kind).flatMap(q=>q.options.map(option=>[q.prompt+' → '+option,option===q.answer?1:0,q.answer+' · '+q.explanation]));
    return {course:'el',voice:'el-GR',formRound:(count=4)=>{const r=rounds[Math.floor(Math.random()*rounds.length)];return {...r,options:window.A1Learning.shuffle([r.answer,...r.others.slice(0,count-1)])};},PHRASES:l.phrases.map(p=>[p.el,[p.de,p.de,p.de]]),SORTS:[{title:['Passt zur Aufgabe?','Does it fit the task?'],sides:[['✗ passt nicht','✗ does not fit'],['✓ passt','✓ fits']],colors:['#ff5d8f','#06d6a0'],cards:sort}],tags:{throw:['Wörter der Lektion treffen','Hit the lesson’s words'],balloons:['Griechisch hören und erkennen','Listen and recognise Greek'],catch:['Das passende Wort fangen','Catch the matching word'],sort:['Die Aufgabe und ihre Antwort verbinden','Match the task and its answer']}};
  }
  window.FR_A1_ARCADE.registerCourse('el',arcadeContent);
  function quizPool(id){
    const l=lesson(id),pool=[];
    l.phrases.forEach((p,i)=>{
      for(const reverse of [false,true]){
        const field=reverse?'de':'el',answer=p[field],wrong=[...new Set(l.phrases.map(x=>x[field]))].filter(x=>C.normalize(x)!==C.normalize(answer)).slice(0,3);
        pool.push({id:`el-${id}-${i}-${reverse}`,l:1+Math.floor(i*11/8),q:Array(3).fill(reverse?`Was bedeutet „${p.el}“?`:`Wie sagst du „${p.de}“ auf Griechisch?`),pl:'de',o:[answer,...wrong],ol:reverse?'de':'el',h:Array(3).fill(p.el+' · '+p.de),src:`el-${id}-${i}-${reverse}`});
      }
    });return pool;
  }
  window.EL_A1_GAMES={build,content,arcadeContent,quizPool};
})();
