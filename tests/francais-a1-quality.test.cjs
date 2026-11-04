const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
// Mechanical quality checks for the Français A1 tasks learners see (see francais/FR-A1-QUALITAET.md).
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
function environment(){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/francais/',runScripts:'outside-only'}),w=dom.window;
 let seed=7;w.scrollTo=()=>{};w.Math.random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};w.A1_APP_META={course:'francais-a1'};
 for(const f of ['francais/data.js','francais/mastery-specs.js','francais/mastery.js','shared/grammar-ui.js','shared/lesson-topic-info.js','francais/deepening-content.js','francais/grammar-practice.js','francais/deepening.js','francais/comprehension-content.js','francais/intro-listening.js','francais/hard-mode-content.js','francais/lesson1-practice.js','shared/answer-explain.js','shared/explain-fr.js'])w.eval(read(f));
 w.esc=s=>{const el=w.document.createElement('span');el.textContent=s;return el.innerHTML;};
 const app=read('francais/app.js');w.eval(app.slice(app.indexOf('const GRAMMAR_GUIDES='),app.indexOf('function renderGrammarIntro('))+'window.grammarHtml=lessonGrammarHtml;');
 return w;
}
const w=environment(),D=w.FR_A1_DATA,S=w.FR_A1_MASTERY_SPECS;
const norm=s=>String(s??'').normalize('NFC').toLowerCase().replace(/[’']/g,'’').replace(/[.!?,;:«»„“"…]/g,' ').replace(/\s+/g,' ').trim();
// An explanation that only shows the answer or the solved sentence says nothing; then the 💡 grammar card
// (shared/explain-fr.js) has to supply a rule. Only tasks that would get its default card count as unexplained.
const solved=q=>String(q.prompt||q.q||'').replace('___',q.answer??'');
function explained(q,answer){
 const own=norm(String(q.explanation||'').replace(/^(Beispiel|Die richtige Antwort ist)\s*:?\s*/,''));
 if(own&&own!==norm(answer)&&own!==norm(solved({...q,answer}))&&own!==norm(q.audio))return true;
 return !/keine besondere Grammatikregel/.test(w.A1Explain.explain({lang:'fr',answer,question:String(q.q||q.prompt||''),sentence:q.audio||solved({...q,answer})}));
}
const deepPools=l=>w.FR_A1_DEEPENING.pools(l,w.FR_A1_DEEPENING.enrich(l,w.grammarHtml(l)));
// Every multiple-choice task with its source, options, answer and explanation; typed gaps only for give-away checks.
function allTasks(){
 const out=[];
 for(const l of D.lessons){
  const at=s=>`FR L${l.id} ${s}`,quiz=l.id===1?l.phrases.length:l.quiz.length;
  w.FR_A1_MASTERY.practiceTasks(l).forEach((q,i)=>out.push({id:at((i<quiz?'quiz ':'task ')+(i+1)),q:q.q||q.prompt,o:q.o,answer:q.answer,explained:explained(q,q.answer),gap:/___/.test(q.q||q.prompt),meaning:i<quiz&&/^„[^“]+“ =$|^Was bedeutet/.test(q.q||'')}));
  (S[l.id]?.checkTasks||[]).forEach((q,i)=>out.push({id:at('check '+(i+1)),q:q.q,o:q.o,answer:q.answer,explained:explained(q,q.answer)}));
  (S[l.id]?.checkTransfers||[]).forEach((q,i)=>out.push({id:at('transfer '+(i+1)),q:q.prompt,o:q.o,answer:q.answer,explained:explained(q,q.answer),gap:true}));
  const checks=new Set((S[l.id]?.checkTasks||[]).map(q=>q.q));
  deepPools(l).forEach(p=>p.tasks.forEach((q,i)=>{if(!checks.has(q.q))out.push({id:at(`deep ${p.key}.${i+1}`),q:q.q,o:q.o,answer:q.answer,explained:explained(q,q.answer),gap:/___/.test(q.q)});}));
  w.A1_COMPREHENSION_CONTENT[l.id].fields.forEach((f,i)=>out.push({id:at('comprehension '+(i+1)),q:f.label,o:f.options,answer:f.answer,explained:true}));
  out.push({id:at('intro'),q:'',o:w.FR_A1_INTRO_LISTENING[l.id].o,answer:w.FR_A1_INTRO_LISTENING[l.id].audio,explained:true});
  w.FR_A1_HARD_CONTENT[l.id].listening.forEach((b,bi)=>b.questions.forEach((q,i)=>q.options&&out.push({id:at(`hard listening ${bi+1}.${i+1}`),q:q.q,o:q.options,answer:q.answers[0],explained:true})));
 }
 for(const g of D.grammarSets)g.questions.forEach((q,i)=>out.push({id:`FR set ${g.id} ${i+1}`,q:q.q,o:q.o,answer:q.o[q.a],explained:explained(q,q.o[q.a]),gap:/___/.test(q.q)}));
 for(const [k,g] of Object.entries(w.FR_A1_LESSON1.GROUPS))g.tasks.forEach((q,i)=>out.push({id:`FR drill L1 ${k} ${i+1}`,q:q.q,o:q.o,answer:q.a,explained:explained(q,q.a),gap:/___/.test(q.q)}));
 return out;
}
const all=allTasks(),tasks=all.filter(t=>t.o?.length);
test('FR A1 choice tasks have three different options, one of them the answer',()=>{
 assert(tasks.length>1300);const bad=[];
 // tu and Tu, le and Le: case alone does not make a different option.
 for(const t of tasks){if(new Set(t.o.map(o=>norm(o)||o)).size!==t.o.length)bad.push(t.id+': duplicate options');if(!t.o.includes(t.answer))bad.push(t.id+': answer missing');if(t.o.length<3)bad.push(t.id+': fewer than three options');}
 assert.deepEqual(bad,[]);
});
test('FR A1 tasks explain their answer beyond repeating it',()=>{
 const bad=all.filter(t=>!t.explained).map(t=>t.id);
 assert(all.length>1600);
 assert.deepEqual(bad,[]);
});
test('FR A1 answers are not given away by the question or by their length',()=>{
 const bad=[];
 for(const t of all){
  // A gap prompt shows the sentence, never the word that fills it; hints in brackets may name the base form.
  const answer=norm(t.answer);
  // nous nous levons: a reflexive pronoun repeats the subject right before the gap.
  if(answer.length>=3&&t.gap&&!String(t.q).toLowerCase().includes(String(t.answer).toLowerCase()+' ___')&&(' '+norm(String(t.q).replace(/\([^)]*\)/g,''))+' ').includes(' '+answer+' '))bad.push(t.id+': answer stands in the question');
  if(!t.o?.length)continue;
  const longest=Math.max(...t.o.filter(o=>o!==t.answer).map(o=>o.length));
  if(t.answer.length>1.8*longest)bad.push(t.id+': answer is much longer than every distractor');
 }
 assert.deepEqual(bad,[]);
});
test('FR A1 meaning questions do not differ only in a name copied from the question',()=>{
 const meaning=tasks.filter(t=>t.meaning),bad=[],tokens=s=>new Set(norm(s).split(' ')),cap=s=>(String(s).match(/\b\p{Lu}[\p{L}-]+/gu)||[]);
 assert(meaning.length>40);
 for(const t of meaning){
  const q=tokens(t.q),answer=tokens(t.answer),others=t.o.filter(o=>o!==t.answer).map(tokens);
  for(const word of cap(t.answer).map(norm))if(q.has(word)&&answer.has(word)&&others.every(o=>!o.has(word)))bad.push(`${t.id}: only the answer repeats “${word}”`);
  // „restaurant“ = Restaurant: the meaning is the asked word itself.
  const asked=/„\s*([^“]+?)\s*“/.exec(t.q)?.[1];if(asked&&norm(asked)===norm(t.answer))bad.push(`${t.id}: the meaning repeats the word`);
 }
 assert.deepEqual(bad,[]);
});
test('FR A1 gap options respect elision',()=>{
 const gaps=tasks.filter(t=>t.gap),bad=[];let checked=0;
 for(const t of gaps){
  const before=/(?:^|[\s(«])(je|me|te|se|ne|le|la|de|que)\s+___/i.exec(t.q),after=/___\s+([\p{L}]+)/u.exec(t.q);
  if(before){checked++;for(const o of t.o)if(/^[aeiouéèêâîôh]/i.test(o)&&!/^h[ao]/i.test(o))bad.push(`${t.id}: “${before[1]} ${o}” has to be elided`);}
  if(after&&/^[bcdfgjklmnpqrstvwxz]/i.test(after[1])){checked++;for(const o of t.o)if(/[’']$/.test(o))bad.push(`${t.id}: “${o} ${after[1]}” stands before a consonant`);}
  if(/\bj[’']___/i.test(t.q)){checked++;for(const o of t.o)if(/^[bcdfgjklmnpqrstvwxz]/i.test(o))bad.push(`${t.id}: “j’${o}”`);}
 }
 assert(checked>100,String(checked));
 assert.deepEqual(bad,[]);
});
test('FR A1 gaps never leave a space before a full stop or comma',()=>{
 const gaps=all.filter(t=>t.gap);assert(gaps.length>500);
 assert.deepEqual(gaps.filter(t=>/___\s+[.,]/.test(t.q)).map(t=>t.id+': '+t.q),[]);
});
test('the lesson check transfer never repeats a deepening drill',()=>{
 const bad=[],key=s=>norm(String(s).replace(/\s*\([^)]*\)/g,''));let checked=0;
 for(const l of D.lessons){
  const drills=new Set(deepPools(l).flatMap(p=>p.tasks).map(q=>key(q.q)));
  for(const t of S[l.id]?.checkTransfers||[]){if(!/^___$/.test(t.prompt.trim()))checked++;if(!/^___$/.test(t.prompt.trim())&&drills.has(key(t.prompt)))bad.push(`FR L${l.id} transfer ${t.prompt}`);}
 }
 assert(checked>100);
 assert.deepEqual(bad,[]);
});
test('FR A1 true/false blocks keep the share of true statements between 35 and 65 %',()=>{
 const bad=[],tf=/^(vrai|faux|richtig|falsch)$/i,isTrue=/^(vrai|richtig)$/i;let blocks=0;
 const share=(name,list)=>{if(list.length<4)return;blocks++;const s=list.filter(Boolean).length/list.length;if(s<.35||s>.65)bad.push(`${name}: ${Math.round(s*100)} % true`);};
 share('listening part 2',D.listening.part2.map(t=>Boolean(t.a)));
 share('reading part 1',D.reading.part1.map(t=>Boolean(t.a)));
 for(const l of D.lessons)share(`FR L${l.id} hard listening`,w.FR_A1_HARD_CONTENT[l.id].listening.flatMap(b=>b.questions).filter(q=>q.options?.every(o=>tf.test(o))).map(q=>isTrue.test(q.answers[0])));
 assert(blocks>=2);
 assert.deepEqual(bad,[]);
});
