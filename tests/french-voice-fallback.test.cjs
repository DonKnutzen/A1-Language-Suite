const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
function fixture(){const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/francais-a2/',runScripts:'outside-only'}),w=dom.window,spoken=[];w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;this.voice=null}};w.speechSynthesis={getVoices:()=>[{name:'Français France',lang:'fr-FR',voiceURI:'fr'}],cancel(){},speak:u=>spoken.push(u),addEventListener(){}};w.eval(fs.readFileSync(path.join(__dirname,'../shared/voice-selection.js'),'utf8'));return {dom,w,spoken};}
test('French device voice failure retries same text once through language default',()=>{const e=fixture();try{e.w.A1Voice.speakSequence(['Bonjour','Merci'],{lang:'fr-FR'});const first=e.spoken[0];first.onerror({error:'synthesis-failed'});assert.equal(e.spoken.length,2);assert.equal(e.spoken[1].text,'Bonjour');assert.equal(e.spoken[1].voice,null);assert.equal(e.spoken[1].lang,'fr-FR');first.onend();assert.equal(e.spoken.length,2);e.spoken[1].onend();assert.equal(e.spoken[2].text,'Merci');assert.equal(e.spoken[2].voice,null);}finally{e.dom.window.close()}});
test('fallback failure surfaces the engine error instead of silently retrying forever',()=>{const e=fixture();try{e.w.A1Voice.speak('Bonjour',{lang:'fr-FR'});e.spoken[0].onerror({error:'voice-unavailable'});e.spoken[1].onerror({error:'language-unavailable'});assert.equal(e.spoken.length,2);assert.match(e.w.document.getElementById('voicePlaybackError').textContent,/language-unavailable/);}finally{e.dom.window.close()}});
test('started, cancelled and superseded audio cannot trigger fallback replay',()=>{for(const kind of ['started','canceled','replaced']){const e=fixture();try{e.w.A1Voice.speak('Bonjour',{lang:'fr-FR'});const old=e.spoken[0];if(kind==='started')old.onstart();if(kind==='replaced')e.w.A1Voice.speak('Salut',{lang:'fr-FR'});old.onerror({error:kind==='canceled'?'canceled':'synthesis-failed'});assert.equal(e.spoken.length,kind==='replaced'?2:1);}finally{e.dom.window.close()}}});

test('Greek dialogue retries a listed but unusable Android voice once without unlocking early',()=>{
 const e=fixture();try{
 e.w.speechSynthesis.getVoices=()=>[{name:'Greek Android',lang:'el-GR',voiceURI:'el'}];let ended=0,errors=0;
 e.w.A1Voice.speakDialogue([{speaker:'A',text:'Καλημέρα'}],{lang:'el-GR',onEnd:()=>ended++,onError:()=>errors++});
 e.spoken[0].onerror({error:'voice-unavailable'});assert.equal(e.spoken.length,2);assert.equal(e.spoken[1].voice,null);assert.equal(e.spoken[1].lang,'el-GR');
 e.spoken[0].onend();assert.equal(ended,0);e.spoken[1].onend();assert.equal(ended,1);assert.equal(errors,0);
 }finally{e.dom.window.close()}
});
