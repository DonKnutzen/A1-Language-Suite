/* Builds the Français A2 content files from the compact sources in francais-a2/src/.
   Run: node tools/build-francais-a2.cjs   (deterministic; never runs in the app) */
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),dir=path.join(root,'francais-a2'),src=path.join(dir,'src');
const plan=require(path.join(src,'plan.cjs'));
const sources=fs.readdirSync(src).filter(f=>/^lessons-.*\.cjs$/.test(f)).sort().flatMap(f=>require(path.join(src,f)));
const exam=fs.existsSync(path.join(src,'exam.cjs'))?require(path.join(src,'exam.cjs')):{};
const byId=new Map(sources.map(l=>[l.id,l]));
// Deterministic shuffle so the right option is not always first.
function hash(s){let h=2166136261;for(const c of String(s)){h^=c.codePointAt(0);h=Math.imul(h,16777619);}return h>>>0;}
function mix(list,seed){const out=[...list];let h=hash(seed);for(let i=out.length-1;i>0;i--){h=Math.imul(h^(h>>>15),2246822507)>>>0;const j=h%(i+1);[out[i],out[j]]=[out[j],out[i]];}return out;}
const complete=(prompt,answer)=>prompt.replace('___',answer).replace(/([’'])\s+/g,'$1').replace(/\s*\([^)]*\)\s*$/,'').replace(/\s*\([^)]*\)/g,'');
const fail=m=>{throw new Error(m);};
const out={lessons:[],applications:{},mastery:{},deepening:{},comprehension:{},intro:{},hard:{},foundations:{},vocab:new Map()};
for(const base of plan.lessons){
  const L=byId.get(base.id);
  if(!L){out.lessons.push(base);continue;}
  const id=base.id,tag=`A2L${id}`;
  const quiz=L.quiz.map(([q,options,audio,explanation,context],i)=>{
    const o=mix(options,tag+'q'+i);if(new Set(o).size!==3)fail(`${tag} quiz ${i}: options`);
    return {q,o,a:o.indexOf(options[0]),audio,...(explanation?{explanation}:{}),...(context?{context}:{})};
  });
  const {status,...rest}=base;
  out.lessons.push({...rest,phrases:L.phrases,quiz,pronunciation:{focus:L.pron[0],explanation:L.pron[1]},dialogue:L.dialogue,transfer:{speaking:L.transfer[0],writing:L.transfer[1]},cefrDomains:L.domains});
  out.applications[id]={speakModel:L.app.speak,writeModel:L.app.write,placeholder:L.app.placeholder,writingHelpText:L.app.help,writingHints:L.app.hints};
  out.mastery[id]={goals:L.goals,
    tasks:L.tasks.map(([unit,prompt,answer,others,context,tagName,explanation])=>({type:'gap',unit:'u'+unit,prompt,answer,o:[answer,...others],context,tag:tagName,explanation:explanation||complete(prompt,answer)+' = '+context})),
    checkTasks:L.check.map(([q,options,explanation,family,audio])=>({type:'choice',q,o:options,answer:options[0],explanation,tag:'Anwenden',family,checkKey:`${tag}-context-${family}`,...(audio?{audio}:{})})),
    checkTransfers:L.transfers.map(([family,prompt,answer,context,accept],i)=>({type:'gap',prompt,answer,accept:accept||[],context,explanation:complete(prompt,answer),audio:complete(prompt,answer),marking:{strictAccents:true,format:null,numberWords:false},family:'transfer:'+family,checkKey:`${tag}-transfer-${family}-${i}`}))};
  out.deepening[id]=L.units.map(u=>({title:u.title,rule:u.rule,pairs:u.pairs,emphasis:u.emphasis||[]}));
  out.comprehension[id]={turns:L.comp.turns.map(([speaker,text])=>({speaker,text,gender:L.comp.voices[speaker]})),fields:L.comp.fields.map(([label,options],i)=>({label,options:mix(options,tag+'c'+i),answer:options[0]}))};
  out.intro[id]={audio:L.intro[0],o:mix([L.intro[0],...L.intro[1]],tag+'i')};
  const H=L.hard,gaps=[];
  const text=H.text.replace(/\{([^{}]+)\}/g,(_,v)=>{const [answer,hint,skill]=v.split('|');if(!skill)fail(`${tag} hard gap ${v}`);gaps.push({answers:answer.split('~'),hint,skills:skill.split(',')});return `{{${gaps.length-1}}}`;});
  const listening=H.listen.map(b=>({...(b.turns?{turns:b.turns.map(([speaker,text])=>({speaker,text,gender:b.voices[speaker]}))}:{text:b.text,gender:b.voice}),
    questions:b.q.map(([q,answers,options,skill])=>({q,answers:[answers].flat(),...(options?{options:mix(options,tag+q)}:{}),skills:skill.split(',')}))}));
  const keys=new Set(H.obj.map(o=>o[0]));
  for(const s of [...gaps.flatMap(g=>g.skills),...listening.flatMap(b=>b.questions.flatMap(q=>q.skills))])if(!keys.has(s))fail(`${tag} unknown skill ${s}`);
  out.hard[id]={version:1,compatibleVersions:[],text,gaps,listening,
    writing:{situation:H.writing.situation,points:H.writing.points,model:H.writing.model,minWords:H.writing.minWords||40,targetWords:H.writing.targetWords||50,skills:H.writing.points.map(()=>[H.obj[0][0]])},
    objectives:Object.fromEntries(H.obj.map(([key,label])=>[key,{label,source:`A2 L${id}: Lerninhalt, Grammatik und Vertiefung`}]))};
  out.hard[id].taskCount=gaps.length+listening.reduce((n,b)=>n+b.questions.length,0)+1;
  out.foundations[id]={intro:[],topics:{},words:L.words};
  for(const [fr,de] of L.vocab){if(de.includes('('))fail(`${tag} vocabulary meaning must not use parentheses: ${de}`);const k=fr.normalize('NFC');if(!out.vocab.has(k))out.vocab.set(k,{fr:k,de,lessons:[]});const e=out.vocab.get(k);if(!e.lessons.includes(id))e.lessons.push(id);}
}
// Grammar sets: four lessons per set, drills taken from the authored tasks.
const done=out.lessons.filter(l=>out.mastery[l.id]);
const grammarSets=[];
for(let i=0;i<done.length;i+=4){
  const group=done.slice(i,i+4),pool=group.flatMap(l=>out.mastery[l.id].tasks.map(t=>({l,t})));
  const picked=[];for(let r=0;picked.length<10&&r<20;r++)for(const l of group){const x=pool.filter(p=>p.l===l)[r];if(x&&picked.length<10)picked.push(x);}
  grammarSets.push({id:'a2g'+(grammarSets.length+1),title:`Lektionen ${group[0].id}–${group.at(-1).id}`,subtitle:group.map(l=>l.grammar.title).join(' · '),
    questions:picked.map(({t},k)=>{const o=mix(t.o,'gs'+i+k+t.prompt);return {q:'Ergänze: '+t.prompt,o,a:o.indexOf(t.answer),audio:complete(t.prompt,t.answer),explanation:t.explanation};})});
}
const data={lessons:out.lessons,applications:out.applications,listening:exam.listening||{part1:[],part2:[],part3:[]},reading:exam.reading||{part1:[],part2:[],part3:[]},forms:[],writing:exam.writing||[],interview:exam.interview||[],infoCards:exam.infoCards||[],roleplays:exam.roleplays||[],grammarSets:[...grammarSets,...(exam.grammarSets||[])],telc:exam.telc||[],curriculum:plan.curriculum};
const write=(file,head,name,value)=>fs.writeFileSync(path.join(dir,file),`${head}\nwindow.${name} = ${JSON.stringify(value,null,2)};\n`);
write('data.js','/* Français A2 course data, generated by tools/build-francais-a2.cjs from francais-a2/src/. Global names stay FR_A1_* so the copied course logic runs unchanged. */','FR_A1_DATA',data);
write('mastery-specs.js','/* Français A2 lesson checks (generated). */','FR_A1_MASTERY_SPECS',out.mastery);
write('deepening-content.js','/* Français A2 lesson-specific deepening (generated). */','FR_A1_DEEPENING_CONTENT',out.deepening);
write('comprehension-content.js','/* Français A2 listening comprehension per lesson (generated). */','A1_COMPREHENSION_CONTENT',out.comprehension);
write('intro-listening.js','/* Français A2 audio recognition per lesson (generated). */','FR_A1_INTRO_LISTENING',out.intro);
write('foundations.js','/* Français A2 lesson word lists (generated). course-scope.js installs them for the shared lesson UI. */','FR_A2_FOUNDATIONS',out.foundations);
fs.writeFileSync(path.join(dir,'hard-mode-content.js'),`/* Original lesson-specific A2 Hard Mode content (generated from francais-a2/src/). The telc Français A2
   sample informs task types and topics; no official exam items or recordings are reproduced. */
(() => {
  'use strict';
  const content=${JSON.stringify(out.hard)};
  window.FR_A1_HARD_LEGACY={};
  window.FR_A1_HARD_VERSIONS={};
  window.FR_A1_HARD_AUDIO={turns:(lessonId,data,blockIndex)=>{const block=data.listening[blockIndex];return (block.turns||[{speaker:'A',text:block.text,gender:block.gender}]).map(turn=>({...turn,gender:turn.gender||block.gender||'female'}));}};
  window.FR_A1_HARD_CONTENT=content;
})();
`);
// Shared vocabulary: A2 lessons are recorded in frA2Lessons only; A1 data stays untouched.
const vocabFile=path.join(root,'shared/vocabulary-content.js'),raw=fs.readFileSync(vocabFile,'utf8');
const start=raw.indexOf('['),end=raw.lastIndexOf(']');
const list=JSON.parse(raw.slice(start,end+1));
for(const e of list)delete e.frA2Lessons;
const filtered=list.filter(e=>e.frLessons?.length||e.deLessons?.length||e.enLessons?.length||Object.keys(e).some(k=>/Lessons$/.test(k)&&e[k].length));
for(const v of out.vocab.values()){
  let e=filtered.find(x=>String(x.fr).normalize('NFC')===v.fr);
  if(!e){e={fr:v.fr,de:v.de,frLessons:[],deLessons:[]};filtered.push(e);}
  e.frA2Lessons=v.lessons.sort((a,b)=>a-b);
}
const eol=raw.includes('\r\n')?'\r\n':'\n';
fs.writeFileSync(vocabFile,(raw.slice(0,start)+JSON.stringify(filtered,null,2)+raw.slice(end+1)).replace(/\r?\n/g,eol));
console.log(`built ${done.length}/24 lessons, ${out.vocab.size} A2 vocabulary entries, ${grammarSets.length} grammar sets`);
// Keep the offline cache in step with the page: every script and stylesheet is precached.
const page=fs.readFileSync(path.join(dir,'index.html'),'utf8'),swFile=path.join(dir,'service-worker.js');
const assets=[...page.matchAll(/(?:src|href)="([^"]+\.(?:js|css)(?:\?v=[^"]+)?)"/g)].map(m=>m[1]).map(u=>u.startsWith('../')?u:'./'+u);
fs.writeFileSync(swFile,fs.readFileSync(swFile,'utf8').replace(/^const ASSETS=.*$/m,'const ASSETS='+JSON.stringify([...new Set(['./','./index.html','./manifest.json',...assets])])+';'));
