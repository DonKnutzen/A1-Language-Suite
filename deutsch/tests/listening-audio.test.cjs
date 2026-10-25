const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'../..',p),'utf8');
function environment(){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/deutsch/',runScripts:'outside-only'}),w=dom.window,utterances=[],queue=[];
 const female={name:'Microsoft Katja',lang:'de-DE'},male={name:'Microsoft Stefan',lang:'de-DE'};
 let available=[female,male];
 w.speechSynthesis={getVoices:()=>available,cancel(){},addEventListener(){},speak(u){utterances.push(u);},resume(){}};w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
 w.A1Profile={getUiLang:()=> 'fr'};
 for(const f of ['shared/pronunciation.js','shared/voice-selection.js','shared/dialogue-voices.js','deutsch/listening-audio.js','deutsch/comprehension-content.js','deutsch/hard-mode-content.js'])w.eval(read(f));
 w.setTimeout=fn=>{queue.push(fn);return queue.length;};w.clearTimeout=()=>{};
 function finish(){let n=0,done=0;while(n<utterances.length||queue.length){assert(++done<2000);if(n<utterances.length)utterances[n++].onend?.();else queue.shift()();}}
 return {dom,w,utterances,female,male,finish,setVoices:list=>{available=list;}};
}
test('German telephone numbers, postal codes and spelled umlauts use slow individual elements',()=>{
 const e=environment(),parts=e.w.DE_A1_LISTENING_AUDIO.plan([{speaker:'A',gender:'female',text:'Meine Telefonnummer ist 030 21 34 56. Die Postleitzahl ist 10115. Müller: M, Ü, L, L, E, R.'}],.75),dictation=parts.filter(p=>p.kind==='dictation');
 assert(dictation.length>=20);assert(dictation.every(p=>p.rate<=.65&&p.pause>=550));assert(parts.filter(p=>p.kind==='speech').every(p=>p.rate===.75));assert(!parts.some(p=>p.text.includes('10115')));
 assert(e.w.DE_A1_LISTENING_AUDIO.plan([{speaker:'B',text:'Die Postleitzahl ist eins, null, eins, eins, fünf.'}],.75).filter(p=>p.kind==='dictation').length===5);e.dom.window.close();
});
test('all 48 German Hard Mode recordings route named speaker roles to the corresponding device voice',()=>{
 const e=environment();for(const d of Object.values(e.w.DE_A1_HARD_CONTENT))for(const block of d.listening){
  e.utterances.length=0;let ended=0;e.w.A1Voice.speakDialogue(block.turns,{lang:'de-DE',rate:.75,onEnd(){ended++;}});e.finish();assert.equal(ended,1);assert(e.utterances.length>=block.turns.length);
  const plan=e.w.DE_A1_LISTENING_AUDIO.plan(block.turns,.75);assert.equal(e.utterances.length,plan.length);
  plan.forEach((p,i)=>{assert.equal(e.utterances[i].voice,p.gender==='male'?e.male:e.female);assert.equal(e.utterances[i].rate,p.rate);assert.equal(e.utterances[i].lang,'de-DE');});
 }e.dom.window.close();
});
test('normal German dialogue tempo labels switch between 75 and 100 and restart active playback',()=>{
 const e=environment();e.w.eval(read('shared/comprehension.js'));e.w.eval(read('deutsch/listening-player.js'));const work={},root=e.w.document.querySelector('main');
 e.w.A1Comprehension.render({root,data:e.w.A1_COMPREHENSION_CONTENT[1],work,lessonId:1,targetLang:'de',uiLang:'fr',save(){},onUpdate(){},onContinue(){}});
 root.querySelector('[data-dialogue-rate="0.75"]').click();assert.equal(work.comprehension.rate,.75);root.querySelector('#dialoguePlay').click();assert.equal(e.utterances.at(-1).rate,.75);
 root.querySelector('[data-dialogue-rate="1"]').click();assert.equal(work.comprehension.rate,1);assert.equal(e.utterances.at(-1).rate,1);e.dom.window.close();
});

test('all 24 normal German recordings use both authored roles at 75 and 100 percent, with a stable voice per speaker',()=>{
 const e=environment();let maleStarts=0,femaleStarts=0;
 for(const [id,block]of Object.entries(e.w.A1_COMPREHENSION_CONTENT)){
  const roles=new Map();for(const turn of block.turns){assert(['male','female'].includes(turn.gender));if(roles.has(turn.speaker))assert.equal(roles.get(turn.speaker),turn.gender);roles.set(turn.speaker,turn.gender);}
  assert.deepEqual([...new Set(roles.values())].sort(),['female','male'],`L${id}`);
  block.turns[0].gender==='male'?maleStarts++:femaleStarts++;
  for(const rate of [.75,1]){
   e.utterances.length=0;let ended=0;
   e.w.A1Voice.speakDialogue(block.turns,{lang:'de-DE',rate,onEnd(){ended++;}});e.finish();assert.equal(ended,1);
   const plan=e.w.DE_A1_LISTENING_AUDIO.plan(block.turns,rate);assert.equal(e.utterances.length,plan.length);
   plan.forEach((part,i)=>{assert.equal(e.utterances[i].voice,part.gender==='male'?e.male:e.female,`L${id}, turn ${part.turn}`);assert.equal(e.utterances[i].pitch,1);});
  }
 }
 assert(maleStarts>0&&femaleStarts>0);
 for(const[id,name,gender]of [[1,'Anna','female'],[1,'Paul','male'],[2,'Lukas','male'],[22,'Anna','female']]){
  const block=e.w.A1_COMPREHENSION_CONTENT[id],speaker=block.turns.find(t=>t.text.includes(name)).speaker;
  assert(block.turns.filter(t=>t.speaker===speaker).every(t=>t.gender===gender));
 }
 e.dom.window.close();
});
test('German dialogue selection recognizes Apple Martin, including Siri URIs, and keeps the preferred female voice',()=>{
 const e=environment(),otherFemale={name:'Anna',voiceURI:'anna',lang:'de-DE'},female={name:'Petra (Premium)',voiceURI:'petra-premium',lang:'de-DE'},male={name:'Siri Voice 1',voiceURI:'com.apple.ttsbundle.siri_Martin_de-DE_compact',lang:'de-DE'};
 e.setVoices([otherFemale,female,male]);e.w.localStorage.setItem('a1suite.voicePrefs.v2',JSON.stringify({'de-de':{name:female.name,uri:female.voiceURI}}));
 const block=e.w.A1_COMPREHENSION_CONTENT[1];e.w.A1Voice.speakDialogue(block.turns,{lang:'de-DE',rate:1});e.finish();
 assert.equal(e.w.A1DialogueVoices.gender({name:'Martin'},'de-DE'),'male');
 const plan=e.w.DE_A1_LISTENING_AUDIO.plan(block.turns,1);plan.forEach((part,i)=>assert.equal(e.utterances[i].voice,part.gender==='male'?male:female));
 assert(!e.w.document.querySelector('[data-dialogue-voice-note]'));e.dom.window.close();
});
test('normal playback refreshes late device voices and reports a single-voice fallback without faking pitch',()=>{
 const e=environment(),block=e.w.A1_COMPREHENSION_CONTENT[1];e.setVoices([e.female]);
 e.w.A1Voice.speakDialogue(block.turns,{lang:'de-DE',rate:1});e.finish();assert(e.w.document.querySelector('[data-dialogue-voice-note]'));assert(e.utterances.every(u=>u.voice===e.female&&u.pitch===1));
 e.utterances.length=0;e.setVoices([e.female,e.male]);e.w.A1Voice.speakDialogue(block.turns,{lang:'de-DE',rate:1});e.finish();
 assert(e.utterances.some(u=>u.voice===e.male));assert(!e.w.document.querySelector('[data-dialogue-voice-note]'));e.dom.window.close();
});
