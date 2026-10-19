const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=f=>fs.readFileSync(path.join(__dirname,'..','..',f),'utf8');
function environment(apple=false){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/francais/',runScripts:'outside-only'}),w=dom.window,spoken=[],queue=[];let canceled=0;
 if(apple)Object.defineProperty(w.navigator,'userAgent',{value:'iPhone'});
 const voices=[{name:'Audrey',lang:'fr-FR',voiceURI:'a'},{name:'Thomas',lang:'fr-FR',voiceURI:'b'}];
 w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};w.speechSynthesis={getVoices:()=>voices,cancel:()=>canceled++,speak:u=>spoken.push(u),addEventListener(){}};
 w.localStorage.setItem('a1suite.voicePrefs.v2',JSON.stringify({'fr-fr':{rate:1.1}}));
 for(const f of ['shared/pronunciation.js','shared/voice-selection.js','francais/listening-audio.js','francais/comprehension-content.js','shared/comprehension.js','francais/listening-player.js'])w.eval(read(f));
 w.setTimeout=(fn,delay)=>{const job={fn,delay};queue.push(job);return job;};w.clearTimeout=job=>{const i=queue.indexOf(job);if(i>=0)queue.splice(i,1);};
 return {dom,w,spoken,queue,flush(){queue.shift()?.fn();},get canceled(){return canceled;}};
}
test('75% and 100% reach synthesis on desktop and Apple, regardless of saved voice speed',()=>{
 for(const apple of [false,true])for(const rate of [.75,1]){
  const e=environment(apple);let ended=0;e.w.A1Voice.speakDialogue([{speaker:'A',text:'Bonjour. Comment allez-vous ?'},{speaker:'B',text:'Très bien, merci.'}],{lang:'fr-FR',rate,onEnd:()=>ended++});
  assert.equal(e.spoken[0].rate,rate);let safety=0;while(!ended&&safety++<30){e.spoken.at(-1).onend();e.flush();}assert.equal(ended,1);assert(e.spoken.every(u=>u.rate===rate));assert(e.spoken.some(u=>u.voice.name==='Thomas'));e.dom.window.close();
 }
});
test('phone pairs, Canadian postal codes and spelled names have separate slow utterances and real pauses',()=>{
 const e=environment();
 for(const [text,parts]of [['Mon téléphone est zéro sept, quatre-vingt-douze, trente, vingt et un, quinze.',5],['Mon code postal est B3V 1L2.',6],['François : F, R, A, N, C cédille, O, I, S.',8],['Zoé s’écrit zède, o, e accent aigu.',3]]){
  const plan=e.w.FR_A1_LISTENING_AUDIO.plan([{speaker:'A',text}],.75),dictation=plan.filter(p=>p.kind==='dictation');assert.equal(dictation.length,parts,text);assert(dictation.every(p=>p.pause>=500&&p.rate<=.65));
 }
 e.w.A1Voice.speakDialogue([{speaker:'A',text:'M, O, R, E, L.'}],{lang:'fr-FR',rate:.75});assert.equal(e.spoken[0].text,'emme');assert.equal(e.spoken[0].rate,.65);e.spoken[0].onend();assert.equal(e.queue[0].delay,550);assert.equal(e.spoken.length,1);e.flush();assert.equal(e.spoken[1].text,'o');e.dom.window.close();
});
test('stop or another audio cancels queued chunks; playback errors notify only once',()=>{
 const e=environment();let errors=0;e.w.A1Voice.speakDialogue([{speaker:'A',text:'Bonjour. Comment allez-vous ?'}],{lang:'fr-FR',rate:.75,onError:()=>errors++});e.spoken[0].onend();assert(e.queue.length);e.w.A1Voice.cancel();assert.equal(e.queue.length,0);assert.equal(e.spoken.length,1);
 e.w.A1Voice.speakDialogue([{speaker:'B',text:'Bonjour.'}],{lang:'fr-FR',onError:()=>errors++});e.spoken.at(-1).onerror();e.spoken.at(-1).onerror();assert.equal(errors,1);
 e.w.A1Voice.speakDialogue([{speaker:'A',text:'M, O, R, E, L.'}],{lang:'fr-FR'});e.spoken.at(-1).onend();e.w.A1Voice.speak('Merci',{lang:'fr-FR'});assert.equal(e.queue.length,0);assert.equal(e.spoken.at(-1).rate,1.1);e.dom.window.close();
});
test('normal player restarts at selected speed and persists that selection',()=>{
 const e=environment(),work={},view=e.w.document.querySelector('main');const render=()=>e.w.A1Comprehension.render({root:view,data:e.w.A1_COMPREHENSION_CONTENT[1],work,lessonId:1,targetLang:'fr',uiLang:'de',save(){},onContinue(){}});
 render();view.querySelector('#dialoguePlay').click();assert.equal(e.spoken.at(-1).rate,1);view.querySelector('[data-dialogue-rate="0.75"]').click();assert.equal(e.spoken.at(-1).rate,.75);assert.equal(work.comprehension.rate,.75);assert(view.querySelector('#dialoguePlay').textContent.startsWith('■'));e.w.A1Voice.cancel();render();assert.equal(view.querySelector('[data-dialogue-rate="0.75"]').getAttribute('aria-pressed'),'true');e.dom.window.close();
});
