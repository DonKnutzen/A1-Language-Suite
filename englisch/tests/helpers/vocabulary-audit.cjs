const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'../../..');
const window={},context=vm.createContext({window});
for(const name of ['content.js','content-2.js','content-3.js','content-4.js','listening-content.js','reading-content.js','feedback.js','course-data.js'])vm.runInContext(fs.readFileSync(path.join(root,'englisch',name),'utf8'),context);
const norm=s=>String(s).normalize('NFC').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’‘]/g,"'").replace(/[-‐‑–]/g,' ').replace(/\s+/g,' ').trim();
const lessons=window.EN_A1_DATA.lessons,entries=new Map();
for(const l of lessons)for(const [target,meaning]of l.vocabulary){const key=norm(target);if(!entries.has(key))entries.set(key,{target,meaning,declared:[]});entries.get(key).declared.push(l.id);}
const supplement=path.join(root,'englisch/vocabulary-supplement.json');
if(fs.existsSync(supplement))for(const [target,meaning]of JSON.parse(fs.readFileSync(supplement,'utf8')))if(!entries.has(norm(target)))entries.set(norm(target),{target,meaning,declared:[]});
const corpus=[];
const add=(l,stage,text,origin)=>{if(text)corpus.push({lesson:l.id,stage,text,origin});};
for(const l of lessons){
 for(const p of l.phrases)add(l,'listen',p[0],'phrase');
 l.topics.forEach((t,i)=>{
  for(const p of t.examples)add(l,'grammar:'+i,p[0],'grammar.example');
  for(const [s,a,b,c]of t.rows){add(l,'grammar:'+i,s.replace('___',a),'grammar.correct');for(const option of [b,c])add(l,'grammar:'+i,option,'grammar.option');}
 });
 const normal=window.A1_COMPREHENSION_CONTENT[l.id];for(const turn of normal.turns)add(l,'comprehension',turn.text,'dialogue');
 for(const f of normal.fields)for(const o of f.options)add(l,'comprehension',o,'dialogue.option');
 for(const q of window.EN_A1_MASTERY_SPECS[l.id].checkTasks){add(l,'check',q.audio,'check.correct');for(const o of q.o||[])add(l,'check',o,'check.option');}
 add(l,'application',l.model,'model');
 const reading=window.EN_A1_READING[l.id-1];add(l,'reading',reading.text,'reading');for(const q of reading.fields)for(const o of q.o)add(l,'reading',o,'reading.option');
 const hard=window.EN_A1_HARD_CONTENT[l.id];add(l,'hard',hard.text.replace(/\{\{(\d+)\}\}/g,(_,i)=>hard.gaps[i].answers[0]),'hard.cloze');
 for(const block of hard.listening){for(const turn of block.turns)add(l,'hard',turn.text,'hard.audio');for(const q of block.questions)for(const o of q.options||[])add(l,'hard',o,'hard.option');}
 add(l,'hard',hard.writing.model,'hard.model');
}
const ignored=new Set(['anna','emma','mia','ben','tom','leo','hill','hall','bell','halifax','berlin','london','ball']);
const contractions={"i'm":'i am',"you're":'you are',"he's":'he is',"she's":'she is',"it's":'it is',"we're":'we are',"they're":'they are',"i've":'i have',"we've":'we have',"you've":'you have',"they've":'they have',"i'd":'i would',"we'd":'we would',"he'd":'he would',"she'd":'she would',"let's":'let us'};
const irregular={ones:'one',uses:'use',am:'be',is:'be',are:'be',was:'be',were:'be',has:'have',had:'have',having:'have',went:'go',gone:'go',ate:'eat',eaten:'eat',drank:'drink',drunk:'drink',saw:'see',seen:'see',bought:'buy',made:'make',sent:'send',took:'take',came:'come',got:'get',feet:'foot',teeth:'tooth',children:'child',people:'person',men:'man',women:'woman',worse:'bad',worst:'bad',better:'good',best:'good',does:'do',did:'do'};
function candidates(token){return [token,irregular[token],token.endsWith("'s")?token.slice(0,-2):null,token.replace(/ies$/,'y'),token.replace(/es$/,''),token.replace(/s$/,''),token.replace(/ied$/,'y'),token.replace(/ed$/,''),token.endsWith('ed')?token.slice(0,-1):null,token.replace(/ing$/,''),token.replace(/ing$/,'e'),token.replace(/(.)\1ing$/,'$1'),token.replace(/ier$/,'y'),token.replace(/iest$/,'y'),token.replace(/er$/,''),token.replace(/er$/,'e'),token.replace(/est$/,''),token.replace(/est$/,'e'),token.replace(/(.)\1er$/,'$1'),token.replace(/(.)\1est$/,'$1')].filter(Boolean);}
const aliasPairs=[['has got','have got'],['single rooms','single room'],['double rooms','double room']];
const multi=[...entries.entries()].filter(([key])=>key.includes(' ')).sort((a,b)=>b[0].length-a[0].length);
function analyse(text){
 let input=norm(String(text).replace(/\b[A-Z](?:,\s*[A-Z]){2,}\b/g,' ')).replace(/[a-z]+(?:'[a-z]+)?/g,t=>contractions[t]||t);const found=new Set(),unknown=[];
 for(const [surface,key]of [...aliasPairs,...multi.map(([key])=>[key,key])]){const pattern=surface.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/ /g,'\\s+'),regex=new RegExp('(?<![a-z])'+pattern+'(?![a-z])','g');if(regex.test(input)){found.add(key);input=input.replace(regex,' ');}}
 for(const token of input.match(/[a-z]+(?:'[a-z]+)?/g)||[]){if(ignored.has(token)||token.length===1&&token!=='i'&&token!=='a')continue;const key=candidates(token).find(c=>entries.has(c))||candidates(token).map(c=>[...entries.keys()].find(key=>['listen to','look at','try on','get on','get off'].includes(key)&&key.startsWith(c+' '))).find(Boolean);if(key)found.add(key);else unknown.push(token);}
 return {found:[...found],unknown};
}
const unknown=new Map(),used=new Map();
for(const segment of corpus){const a=analyse(segment.text);segment.words=a.found;segment.unknown=a.unknown;for(const token of a.unknown){if(!unknown.has(token))unknown.set(token,[]);const list=unknown.get(token);if(list.length<5)list.push({lesson:segment.lesson,stage:segment.stage,origin:segment.origin,text:segment.text});}for(const word of a.found){if(!used.has(word))used.set(word,[]);used.get(word).push({lesson:segment.lesson,stage:segment.stage});}}
const output={entries:[...entries.entries()],corpus,unknown:[...unknown.entries()],used:[...used.entries()]};
if(require.main===module)process.stdout.write(JSON.stringify(output,null,2)+'\n');
module.exports={analyse,entries,corpus,lessons,window,norm,candidates,output};
