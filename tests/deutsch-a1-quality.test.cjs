const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
// Mechanical quality checks for the Deutsch A1 tasks learners see (see deutsch/DE-A1-QUALITAET.md).
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
function environment(){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/deutsch/',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window;
 w.scrollTo=()=>{};w.Math.random=()=>.99;w.A1_APP_META={course:'deutsch-a1'};
 w.A1Learning={shuffle:a=>[...a],countWords:s=>s.trim().split(/\s+/).filter(Boolean).length,wireRecorder:()=>{}};
 for(const f of ['deutsch/lesson-content.js','shared/lesson-guide.js','shared/grammar-ui.js','shared/lesson-topic-info.js','shared/pronunciation.js','shared/exercise-review.js','deutsch/pronouns.js','deutsch/answer-audio.js','shared/exercise-engine.js','deutsch/grammar-drills.js','deutsch/deepening-content.js','deutsch/question-content.js','deutsch/applications.js','deutsch/study.js','deutsch/page-checks.js','deutsch/assessments.js','deutsch/comprehension-content.js','deutsch/hard-mode-content.js','shared/answer-explain.js','shared/explain-de.js'])w.eval(read(f));
 const app=read('deutsch/app.js');w.eval(app.slice(0,app.indexOf('const stateKey'))+';window.testData={lessons,grammarSets,listening};');
 return w;
}
const w=environment(),D=w.testData;
const norm=s=>String(s??'').normalize('NFC').toLowerCase().replace(/[’']/g,'’').replace(/[.!?,;:«»„“"…]/g,' ').replace(/\s+/g,' ').trim();
// Every multiple-choice task with its source, options, answer and explanation.
function choiceTasks(){
 const out=[];
 for(const l of D.lessons){
  const at=s=>`DE L${l.id} ${s}`,answer=q=>q.answer??q.o[q.a];
  w.DE_A1_STUDY.lessonExercises(l).forEach((q,i)=>out.push({id:at('quiz '+(i+1)),q:q.q+' '+q.audio,o:q.o,answer:answer(q),explanation:q.explanation,meaning:q.skill==='recognition'}));
  w.DE_A1_STUDY.assessmentTasks(l).forEach((q,i)=>out.push({id:at((q.skill==='transfer'?'transfer ':'check ')+(i+1)),q:q.prompt||q.q,o:q.o,answer:answer(q),explanation:q.explanation,gap:q.type==='gap',typed:q.type==='gap'}));
  w.DE_A1_STUDY.content[l.id].forEach((u,ui)=>w.DE_A1_STUDY.unitTasks(u).forEach((q,i)=>out.push({id:at(`deep ${ui+1}.${i+1}`),q:q.prompt||q.q,o:q.o,answer:answer(q),explanation:q.explanation,gap:/___/.test(q.prompt||q.q)})));
  const A=w.DE_A1_APPLICATIONS[l.id];out.push({id:at('reading'),q:A.reading.q,o:A.reading.o,answer:answer(A.reading),explanation:A.reading.explanation});
  A.review.fields.forEach((f,i)=>out.push({id:at('review '+(i+1)),q:f.q,o:f.o,answer:f.answer,explanation:'-'}));
  w.A1_COMPREHENSION_CONTENT[l.id].fields.forEach((f,i)=>out.push({id:at('comprehension '+(i+1)),q:f.label,o:f.options,answer:f.answer,explanation:'-'}));
  w.DE_A1_HARD_CONTENT[l.id].listening.forEach((b,bi)=>b.questions.forEach((q,i)=>q.options&&out.push({id:at(`hard listening ${bi+1}.${i+1}`),q:q.q,o:q.options,answer:q.answers[0],explanation:'-'})));
 }
 // Grammar sets and drills without an authored explanation rely on the 💡 grammar card (shared/explain-de.js).
 const card=q=>q.explanation||(/Pas de règle de grammaire/.test(w.A1Explain.explain({lang:'de',answer:q.answer??q.o[q.a],question:String(q.q).replace(/^«[^»]*»\s*—\s*/,''),sentence:q.audio||''}))?'':'💡');
 for(const g of D.grammarSets)g.questions.forEach((q,i)=>out.push({id:`DE set ${g.id} ${i+1}`,q:q.prompt||q.q,o:q.o,answer:q.answer??q.o[q.a],explanation:card(q),gap:/___/.test(q.prompt||q.q)}));
 for(const [k,d] of Object.entries(w.DE_A1_GRAMMAR_DRILLS.topics))d.tasks.forEach((q,i)=>out.push({id:`DE drill ${k} ${i+1}`,q:q.prompt||q.q,o:q.o,answer:q.answer??q.o[q.a],explanation:card(q),gap:/___/.test(q.prompt||q.q),typed:q.type==='gap'}));
 return out.filter(t=>t.o||!t.typed).map(t=>({...t,o:t.o||[]}));
}
const tasks=choiceTasks();
test('DE A1 choice tasks have three different options, one of them the answer',()=>{
 assert(tasks.length>2000);const bad=[];
 // sie and Sie are different pronouns, so case counts here.
 const exact=s=>String(s).normalize('NFC').replace(/\s+/g,' ').trim();
 for(const t of tasks){if(new Set(t.o.map(exact)).size!==t.o.length)bad.push(t.id+': duplicate options');if(!t.o.includes(t.answer))bad.push(t.id+': answer missing');}
 assert.deepEqual(bad,[]);
});
test('DE A1 explanations exist and say more than the answer itself',()=>{
 const bad=[];
 for(const t of tasks){if(!String(t.explanation||'').trim())bad.push(t.id+': no explanation');else if(norm(t.explanation)===norm(t.answer))bad.push(t.id+': explanation repeats the answer');}
 assert.deepEqual(bad,[]);
});
test('DE A1 answers are not given away by the question or by their length',()=>{
 const bad=[];
 for(const t of tasks){
  // A gap prompt shows the sentence, never the word that fills it; hints in brackets may name the base form.
  const answer=norm(t.answer);
  if(answer.length>=3&&t.gap&&(' '+norm(t.q.replace(/\([^)]*\)/g,''))+' ').includes(' '+answer+' '))bad.push(t.id+': answer stands in the question');
  const longest=Math.max(...t.o.filter(o=>o!==t.answer).map(o=>o.length));
  if(t.o.length&&t.answer.length>1.8*longest)bad.push(t.id+': answer is much longer than every distractor');
 }
 assert.deepEqual(bad,[]);
});
test('DE A1 meaning questions do not differ only in a name copied from the question',()=>{
 const bad=[],tokens=s=>new Set(norm(s).split(' ')),cap=s=>(String(s).match(/\b\p{Lu}[\p{L}-]+/gu)||[]);
 for(const t of tasks.filter(t=>t.meaning)){
  const q=tokens(t.q),answer=tokens(t.answer),others=t.o.filter(o=>o!==t.answer).map(tokens);
  for(const word of cap(t.answer).map(norm))if(q.has(word)&&answer.has(word)&&others.every(o=>!o.has(word)))bad.push(`${t.id}: only the answer repeats “${word}”`);
  // “Que signifie « Adresse » ?” – adresse: the meaning is the asked word itself.
  const asked=/«\s*([^»]+?)\s*»/.exec(t.q)?.[1];if(asked&&norm(asked)===norm(t.answer))bad.push(`${t.id}: the meaning repeats the word`);
 }
 assert.deepEqual(bad,[]);
});
test('the lesson check transfer never repeats a deepening drill',()=>{
 const bad=[],key=s=>norm(String(s).replace(/«[^»]*»\s*—\s*/,'').replace(/\s*\([^)]*\)/g,''));
 for(const l of D.lessons){
  const drills=new Set(w.DE_A1_STUDY.content[l.id].flatMap(u=>w.DE_A1_STUDY.unitTasks(u)).map(q=>key(q.prompt||q.q)));
  w.DE_A1_STUDY.assessmentTasks(l).filter(q=>q.skill==='transfer').forEach(q=>{if(drills.has(key(q.prompt||q.q)))bad.push(`DE L${l.id} transfer ${q.prompt||q.q}`);});
 }
 assert.deepEqual(bad,[]);
});
// Articles that never fit a singular noun of the given gender at A1 (no genitive).
const IMPOSSIBLE={m:['das','die','eine','einer'],n:['der','die','den','eine','einen','einer'],f:['das','den','dem','ein','einen','einem']};
test('DE A1 sentence options never contain an article that cannot fit the noun',()=>{
 const genus={};
 const learn=s=>{for(const m of String(s).matchAll(/\b(der|die|das)\s+(\p{Lu}\p{Ll}+)/gu)){const g={der:'m',die:'f',das:'n'}[m[1]];(genus[m[2]]||=new Set()).add(g);}};
 const V={};new Function('window',read('shared/vocabulary-content.js'))(V);
 for(const entry of V.A1_VOCABULARY_CONTENT)if(entry.deLessons?.length&&/^(der|die|das) \p{Lu}\p{Ll}+$/u.test(entry.de))learn(entry.de);
 // Plurals and nouns seen with two genders are left out.
 const sure=Object.fromEntries(Object.entries(genus).filter(([n,g])=>g.size===1&&!/(er|el|en|e)$/.test(n)).map(([n,g])=>[n,[...g][0]]));
 assert(Object.keys(sure).length>100);
 // When the options differ only in the article, the article is what the task asks for.
 const articles=/\b(der|die|das|den|dem|ein|eine|einen|einem|einer|\w*ein(e|en|em|er)?)\b/giu,articlePoint=t=>new Set(t.o.map(o=>o.replace(articles,'').replace(/\s+/g,' ').trim())).size===1;
 const bad=[];
 for(const t of tasks.filter(t=>!articlePoint(t)))for(const o of t.o.filter(o=>/\s/.test(o)))for(const m of o.matchAll(/\b(der|die|das|den|dem|ein|eine|einen|einem|einer)\s+(\p{Lu}\p{Ll}+)\b/giu)){
  const g=sure[m[2]];if(g&&IMPOSSIBLE[g].includes(m[1].toLowerCase()))bad.push(`${t.id}: “${m[0]}” in “${o}”`);
 }
 assert.deepEqual(bad,[]);
});
test('DE A1 true/false blocks keep the share of true statements between 35 and 65 %',()=>{
 const bad=[],tf=/^(richtig|falsch|vrai|faux)$/i,isTrue=/^(richtig|vrai)$/i;
 const part2=D.listening[2].map(t=>Boolean(t.a)),share=part2.filter(Boolean).length/part2.length;
 if(share<.35||share>.65)bad.push(`listening part 2: ${Math.round(share*100)} % true`);
 for(const l of D.lessons){const list=w.DE_A1_HARD_CONTENT[l.id].listening.flatMap(b=>b.questions).filter(q=>q.options&&q.options.every(o=>tf.test(o)));
  if(list.length>=4){const s=list.filter(q=>isTrue.test(q.answers[0])).length/list.length;if(s<.35||s>.65)bad.push(`DE L${l.id} hard listening: ${Math.round(s*100)} % true`);}}
 assert.deepEqual(bad,[]);
});
