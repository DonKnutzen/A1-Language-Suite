const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
// Mechanical quality checks for the Français A2 tasks learners see (see francais-a2/FR-A2-QUALITAET.md).
const root=path.join(__dirname,'..'),load=file=>{const w={};new Function('window',fs.readFileSync(path.join(root,'francais-a2',file),'utf8'))(w);return w;};
const D=load('data.js').FR_A1_DATA,S=load('mastery-specs.js').FR_A1_MASTERY_SPECS,C=load('comprehension-content.js').A1_COMPREHENSION_CONTENT;
const I=load('intro-listening.js').FR_A1_INTRO_LISTENING,H=load('hard-mode-content.js').FR_A1_HARD_CONTENT;
// The review goes stage by stage; the give-away checks cover the lessons reviewed so far, the basic checks all lessons.
const REVIEWED=24;
const norm=s=>String(s).normalize('NFC').toLowerCase().replace(/[’']/g,'’').replace(/[.!?,;:«»„“"…]/g,' ').replace(/\s+/g,' ').trim();
// Every multiple-choice task with its source, options, answer and explanation.
function choiceTasks(){
 const out=[];
 for(const l of D.lessons.filter(l=>S[l.id])){
  const lesson=l.id,at=s=>`A2 L${lesson} ${s}`;
  l.quiz.forEach((q,i)=>out.push({id:at('quiz '+(i+1)),lesson,q:q.q+' '+(q.context||''),o:q.o,answer:q.o[q.a],explanation:q.explanation}));
  S[lesson].checkTasks.forEach((t,i)=>out.push({id:at('check '+(i+1)),lesson,q:t.q,o:t.o,answer:t.answer,explanation:t.explanation}));
  S[lesson].tasks.forEach((t,i)=>out.push({id:at('task '+(i+1)),lesson,q:t.prompt,o:t.o,answer:t.answer,explanation:t.explanation,gap:true}));
  C[lesson].fields.forEach((f,i)=>out.push({id:at('comprehension '+(i+1)),lesson,q:f.label,o:f.options,answer:f.answer,explanation:'-'}));
  out.push({id:at('intro'),lesson,q:'',o:I[lesson].o,answer:I[lesson].audio,explanation:'-'});
  H[lesson].listening.forEach((b,bi)=>b.questions.forEach((q,i)=>q.options&&out.push({id:at(`hard listening ${bi+1}.${i+1}`),lesson,q:q.q,o:q.options,answer:q.answers[0],explanation:'-'})));
 }
 // A grammar set counts as reviewed once its last lesson is.
 for(const g of D.grammarSets){const lesson=Number(/(\d+)\s*$/.exec(g.title)?.[1]||99);
  g.questions.forEach((q,i)=>out.push({id:`A2 ${g.id} ${i+1}`,lesson,q:q.q,o:q.o,answer:q.o[q.a],explanation:q.explanation,gap:true}));}
 return out;
}
const tasks=choiceTasks(),reviewed=tasks.filter(t=>t.lesson<=REVIEWED);
test('A2 choice tasks have three different options, one of them the answer',()=>{
 assert(tasks.length>600);const bad=[];
 for(const t of tasks){if(new Set(t.o.map(norm)).size!==t.o.length)bad.push(t.id+': duplicate options');if(!t.o.includes(t.answer))bad.push(t.id+': answer missing');}
 assert.deepEqual(bad,[]);
});
test('A2 explanations exist and say more than the answer itself',()=>{
 const bad=[];
 for(const t of tasks){if(!String(t.explanation||'').trim())bad.push(t.id+': no explanation');else if(norm(t.explanation)===norm(t.answer))bad.push(t.id+': explanation repeats the answer');}
 for(const l of D.lessons.filter(l=>S[l.id]))for(const t of S[l.id].checkTransfers)if(norm(t.explanation)===norm(t.answer))bad.push(`A2 L${l.id} transfer ${t.prompt}`);
 assert.deepEqual(bad,[]);
});
test('reviewed A2 answers are not given away by the question or by their length',()=>{
 const bad=[];
 for(const t of reviewed){
  // A gap prompt shows the sentence, never the word that fills it; hints in brackets may name the base form.
  const answer=norm(t.answer);
  if(answer.length>=3&&(t.gap||answer.length>=4)&&(' '+norm(t.q.replace(/\([^)]*\)/g,''))+' ').includes(' '+answer+' '))bad.push(t.id+': answer stands in the question');
  const longest=Math.max(...t.o.filter(o=>o!==t.answer).map(o=>o.length));
  if(t.answer.length>1.8*longest)bad.push(t.id+': answer is much longer than every distractor');
 }
 assert.deepEqual(bad,[]);
});
test('reviewed A2 gap tasks never offer a form that breaks elision after je',()=>{
 const bad=[];
 for(const t of reviewed.filter(t=>t.gap&&/(^|\s)je ___/i.test(t.q)))for(const o of t.o)if(/^[aeiouéèêh]/i.test(o))bad.push(`${t.id}: “je ${o}” would have to be “j’${o}”`);
 assert.deepEqual(bad,[]);
});
test('the lesson check transfer never repeats a deepening drill',()=>{
 const bad=[],key=s=>norm(String(s).replace(/\s*\([^)]*\)/g,''));
 for(const l of D.lessons.filter(l=>S[l.id])){const drills=new Set(S[l.id].tasks.map(t=>key(t.prompt)));
  for(const t of S[l.id].checkTransfers)if(drills.has(key(t.prompt)))bad.push(`A2 L${l.id} transfer ${t.prompt}`);}
 assert.deepEqual(bad,[]);
});
test('telc true/false blocks keep the share of true statements between 35 and 65 %',()=>{
 const bad=[];
 for(const t of D.telc){
  const blocks={co1:t.co1.items.map(x=>x.a),co3:t.co3.map(x=>x.a),ce2:t.ce2.flatMap(b=>b.items).map(x=>x[1]),co:[...t.co1.items,...t.co2,...t.co3].map(x=>x.a)};
  for(const [name,list] of Object.entries(blocks)){const share=list.filter(Boolean).length/list.length;if(share<.35||share>.65)bad.push(`${t.id} ${name}: ${Math.round(share*100)} % true`);}
 }
 assert.deepEqual(bad,[]);
});
