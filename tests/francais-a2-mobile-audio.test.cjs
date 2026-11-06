const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
test('A2 mobile playback cancels once; replay invalidates the previous dialogue',()=>{
 const dom=new JSDOM('<main/>',{url:'https://example.org/francais-a2/',runScripts:'outside-only'}),w=dom.window,spoken=[];let cancels=0,ended=0;
 Object.defineProperty(w.navigator,'userAgent',{value:'iPhone'});w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
 w.speechSynthesis={getVoices:()=>[{name:'Audrey',voiceURI:'Audrey',lang:'fr-FR'}],cancel(){cancels++},speak:u=>spoken.push(u),addEventListener(){}};
 try{
 for(const file of ['shared/voice-selection.js','francais-a2/listening-audio.js'])w.eval(fs.readFileSync(path.join(__dirname,'..',file),'utf8'));
 w.A1Voice.speak('Bonjour',{lang:'fr-FR'});assert.equal(cancels,1);assert.equal(spoken[0].text,'Bonjour');assert.equal(spoken[0].lang,'fr-FR');
 w.A1Voice.speakDialogue([{speaker:'A',text:'Salut.'},{speaker:'B',text:'Bonjour.'}],{lang:'fr-FR',onEnd:()=>ended++});const old=spoken.at(-1);assert.equal(cancels,2);
 w.A1Voice.speakSequence(['Merci','Au revoir'],{lang:'fr-FR'});assert.equal(cancels,3);assert.equal(ended,1);old.onend();assert.equal(spoken.length,3);assert.equal(spoken.at(-1).text,'Merci');spoken.at(-1).onend();assert.equal(spoken.at(-1).text,'Au revoir');
 }finally{dom.window.close()}
});
