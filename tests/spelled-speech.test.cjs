const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),{JSDOM}=require('jsdom');
function fixture(){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.test/',runScripts:'outside-only'}),w=dom.window,spoken=[];
 const voices=[{name:'Thomas',lang:'fr-FR',voiceURI:'thomas'},{name:'Anna',lang:'de-DE',voiceURI:'anna'}];
 w.speechSynthesis={getVoices:()=>voices,cancel(){},speak:u=>{spoken.push(u.text);setTimeout(()=>u.onend?.(),0);},addEventListener(){}};w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
 for(const p of ['shared/pronunciation.js','shared/voice-selection.js'])w.eval(fs.readFileSync(p,'utf8'));
 return {dom,w,spoken};
}
test('spelled names are read as letter names, never with hyphens or "la lettre"',async()=>{
 const {dom,w,spoken}=fixture();
 w.A1Voice.speakDialogue([{speaker:'A',text:'Oui, ça s’écrit M-A-R-T-I-N. Rue Victor-Hugo.'}],{lang:'fr-FR'});
 assert.equal(spoken[0],'Oui, ça s’écrit emme, a, erre, té, i, enne. Rue Victor-Hugo.');
 w.A1Voice.speak('L-É-A',{lang:'fr-FR'});
 assert.equal(spoken.at(-1),'elle, e accent aigu, a');
 w.A1Voice.speak('Q-U-E',{lang:'fr-FR'});
 assert.doesNotMatch(spoken.at(-1),/lettre|-/i);
 w.A1Voice.speak('A-ß-J',{lang:'de-DE'});
 assert.doesNotMatch(spoken.at(-1),/Buchstabe|-/);
 w.A1Voice.speakSequence(['Est-ce que vous venez ? Il y a-t-il M-A ?'],{lang:'fr-FR'});
 assert.equal(spoken.at(-1),'Est-ce que vous venez ? Il y a-t-il emme, a ?');
 dom.window.close();
});
