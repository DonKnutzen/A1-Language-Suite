// Export the authored radio texts and content signatures for generate-radio-recordings.py.
const fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'..');
const signature=(lang,turns)=>JSON.stringify([lang.split('-')[0],turns.map(t=>[t.speaker||'',String(t.text||'').trim(),t.gender||''])]);
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(16).padStart(8,'0');}
const jobs=[],entries={};
for(const [course,lang] of [['francais','fr-FR'],['francais-a2','fr-FR'],['deutsch','de-DE'],['englisch','en-GB']]){
 const dom=new JSDOM('',{runScripts:'outside-only'}),w=dom.window;
 const files=course==='englisch'?['b1-course.js','b1-course-2.js','b1-course-3.js','b1-course-4.js','b1-skills.js','b1-skills-2.js','b1-skills-3.js','b1-skills-4.js','b1-runtime.js'] : ['hard-mode-content.js'];
 for(const f of files)w.eval(fs.readFileSync(path.join(root,course,f),'utf8'));
 const prefix=lang.startsWith('en')?'EN_A1':lang.startsWith('de')?'DE_A1':'FR_A1',content=w[prefix+'_HARD_CONTENT'],audio=w[prefix+'_HARD_AUDIO'];
 for(const [id,data] of Object.entries(content))for(let b=0;b<data.listening.length;b++){
  const turns=Array.from(audio.turns(Number(id),data,b)),key=signature(lang,turns),digest=hash(key),file=`${course}/lesson-${String(id).padStart(2,'0')}-${b+1}-${digest}.mp3`;
  if(entries[digest]&&entries[digest].signature!==key)throw Error('Recording signature collision');
  entries[digest]={file,signature:key};jobs.push({course,lesson:Number(id),block:b,lang,file,turns});
 }
 if(course==='francais'){
  w.eval(fs.readFileSync(path.join(root,course,'hard-mode-pilot.js'),'utf8'));
  for(const [b,block]of w.FR_A1_HARD_PILOT.recordings.entries()){
   const turns=Array.from(block.turns),key=signature(lang,turns),digest=hash(key),file=entries[digest]?.file||`${course}/lesson-01-pilot-${b+1}-${digest}.mp3`;
   if(entries[digest]&&entries[digest].signature!==key)throw Error('Recording signature collision');
   entries[digest]={file,signature:key};jobs.push({course,lesson:1,block:b,lang,file,turns});
  }
 }
 dom.window.close();
}
const target=process.argv[2];if(!target)throw Error('Pass the output job JSON path');
fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,JSON.stringify(jobs,null,2)+'\n');
fs.writeFileSync(path.join(root,'shared/radio-recordings.js'),'/* Generated from authored radio texts. Regenerate when a recording changes. */\nwindow.A1_RADIO_RECORDINGS={base:new URL("audio/radio/",document.currentScript?.src||new URL("../shared/radio-recordings.js",document.baseURI).href).href,entries:'+JSON.stringify(entries)+'};\n');
console.log(JSON.stringify({exercises:jobs.length,uniqueRecordings:Object.keys(entries).length,turns:jobs.reduce((n,j)=>n+j.turns.length,0),courses:[...new Set(jobs.map(j=>j.course))]}));
