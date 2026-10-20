const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'../..',p),'utf8');
function environment(){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/deutsch/',runScripts:'outside-only'}),w=dom.window,utterances=[],queue=[];
 const female={name:'Microsoft Katja',lang:'de-DE'},male={name:'Microsoft Stefan',lang:'de-DE'};
 w.speechSynthesis={getVoices:()=>[female,male],cancel(){},addEventListener(){},speak(u){utterances.push(u);},resume(){}};w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
 w.A1Profile={getUiLang:()=> 'fr'};
 for(const f of ['shared/pronunciation.js','shared/voice-selection.js','deutsch/listening-audio.js','deutsch/comprehension-content.js','deutsch/hard-mode-content.js'])w.eval(read(f));
 w.setTimeout=fn=>{queue.push(fn);return queue.length;};w.clearTimeout=()=>{};
 function finish(){let n=0,done=0;while(n<utterances.length||queue.length){assert(++done<2000);if(n<utterances.length)utterances[n++].onend?.();else queue.shift()();}}
 return {dom,w,utterances,female,male,finish};
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
