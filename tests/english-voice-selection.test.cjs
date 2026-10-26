const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),{JSDOM}=require('jsdom');
const voice=(name,lang)=>({name,lang,voiceURI:'com.apple.voice.'+name});
const albert=voice('Albert','en-US'),samantha=voice('Samantha','en-US'),daniel=voice('Daniel','en-GB'),karen=voice('Karen','en-AU');
function fixture(voices,apple=false){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.test/',runScripts:'outside-only'}),w=dom.window,spoken=[];
 Object.defineProperty(w.navigator,'platform',{value:apple?'iPhone':'Linux'});
 w.speechSynthesis={getVoices:()=>voices,cancel(){},speak:u=>spoken.push(u),addEventListener(){}};w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
 w.localStorage.setItem('a1suite.voicePrefs.v2',JSON.stringify({'en-gb':{name:'Albert',uri:albert.voiceURI}}));
 for(const p of ['shared/voice-selection.js','shared/dialogue-voices.js','englisch/listening-audio.js'])w.eval(fs.readFileSync(p,'utf8'));
 return {dom,w,spoken};
}
for(const apple of [true,false])test(`English excludes Albert and prefers Samantha, including saved Albert settings (Apple: ${apple})`,()=>{
 const {dom,w,spoken}=fixture([albert,daniel,karen,samantha],apple);
 assert(!w.A1Voice.matching('en-GB').includes(albert));
 assert.equal(w.A1Voice.select('en-GB'),samantha);
 assert.equal(w.A1Voice.automatic('en-GB',[albert,daniel,samantha]),samantha);
 assert.equal(w.A1Voice.automatic('en-GB',[albert]),null);
 w.A1Voice.speak('Hello.',{lang:'en-GB'});assert.equal(spoken[0].voice,samantha);assert.equal(spoken[0].lang,'en-US');
 const roles=w.A1DialogueVoices.plan('en-GB',[{speaker:'A',gender:'female',text:'Hello.'},{speaker:'B',gender:'male',text:'Hi.'}]);
 assert.equal(roles.bySpeaker.A,samantha);assert.equal(roles.bySpeaker.B,daniel);
 dom.window.close();
});
test('English never delegates playback to a banned browser default when Albert is the only voice',()=>{
 const {dom,w,spoken}=fixture([albert],true);let failed=0;
 w.A1Voice.speak('Hello.',{lang:'en-GB'});
 w.A1Voice.speakDialogue([{speaker:'A',gender:'male',text:'Hello.'}],{lang:'en-GB',onError:()=>failed++});
 assert.equal(spoken.length,0);assert.equal(failed,1);dom.window.close();
});
test('English keeps another safe voice when Samantha is unavailable and respects safe manual choices',()=>{
 const {dom,w}=fixture([albert,daniel,karen]);assert.equal(w.A1Voice.select('en-GB'),daniel);
 w.localStorage.setItem('a1suite.voicePrefs.v2',JSON.stringify({'en-gb':{name:karen.name,uri:karen.voiceURI}}));
 assert.equal(w.A1Voice.select('en-GB'),karen);dom.window.close();
});

test('English dialogue roles prefer Samantha and Daniel over another saved safe voice',()=>{
 const alex=voice('Alex','en-US');
 const {dom,w}=fixture([albert,alex,daniel,karen,samantha]);
 for(const saved of [alex,karen]){
  w.localStorage.setItem('a1suite.voicePrefs.v2',JSON.stringify({'en-gb':{name:saved.name,uri:saved.voiceURI}}));
  const turns=[{speaker:'B',gender:'male',text:'Hello.'},{speaker:'A',gender:'female',text:'Hi.'}];
  const roles=w.A1DialogueVoices.plan('en-GB',turns);
  assert.equal(roles.bySpeaker.A,samantha);assert.equal(roles.bySpeaker.B,daniel);
 }
 dom.window.close();
});
