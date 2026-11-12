/* Reproducible structural inventory, not a linguistic or CEFR certification. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),files=['griechisch/data.js','griechisch/transfer.js','griechisch/course.js'];
const context={window:{}};vm.createContext(context);
for(const file of files)vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
const D=context.window.EL_A1_DATA,C=context.window.EL_A1;
const words=s=>(s.match(/\p{Script=Greek}[\p{Script=Greek}\p{M}]*/gu)||[]).length;
const practice=D.lessons.flatMap(l=>C.tasks(l)),checks=D.lessons.flatMap(l=>C.tasks(l,'check'));
const alphabet=[...C.alphabetTasks(),...D.orthography];
const choiceTasks=[...practice,...checks,...alphabet].filter(t=>t.options);
const unique=new Map([...practice,...checks,...alphabet].map(t=>[t.id,t]));
const lengthCues=[...unique.values()].filter(t=>t.options&&t.answer.length>1.8*Math.max(...t.options.filter(o=>o!==t.answer).map(o=>o.length))).map(t=>({id:t.id,prompt:t.prompt,answer:t.answer,options:t.options}));
const invalidChoices=choiceTasks.filter(t=>t.options.length!==3||new Set(t.options.map(C.normalize)).size!==3||!t.options.includes(t.answer)).map(t=>t.id);
const output={
  scope:'Structural inventory only. Length cues require editorial judgment; word counts are Greek surface words, not vocabulary lemmas.',
  sourceSha256:Object.fromEntries(files.map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n')).digest('hex')])),
  totals:{lessons:D.lessons.length,phrases:D.lessons.reduce((n,l)=>n+l.phrases.length,0),grammarItems:D.lessons.reduce((n,l)=>n+l.grammar.length,0),transferItems:D.lessons.reduce((n,l)=>n+l.transfer.length,0),comprehensionItems:D.lessons.reduce((n,l)=>n+l.reading.questions.length+l.listening.questions.length,0),practiceTasks:practice.length,checkTasks:checks.length,alphabetTasks:alphabet.length,uniqueTaskIds:unique.size,practiceTyped:practice.filter(t=>!t.options).length,checkTyped:checks.filter(t=>!t.options).length,phrasesWithAcceptedVariants:D.lessons.flatMap(l=>l.phrases).filter(p=>p.accepted?.length).length,invalidChoiceTasks:invalidChoices.length,lengthCueCandidates:lengthCues.length},
  lessons:D.lessons.map(l=>({id:l.id,title:l.title,goal:l.goal,readingWords:words(l.reading.body),listeningWords:words(l.listening.body),practice:C.tasks(l).length,check:C.tasks(l,'check').length,ruleItems:l.grammar.length,transferItems:l.transfer.length,readingQuestions:l.reading.questions.length,listeningQuestions:l.listening.questions.length})),
  invalidChoices,lengthCueCandidates:lengthCues
};
process.stdout.write(JSON.stringify(output,null,2)+'\n');
