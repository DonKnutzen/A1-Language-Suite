const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{JSDOM}=require('jsdom');
const voice=(name,uri=name)=>({name,voiceURI:uri,lang:'de-DE'});
function environment(initial,paced=true){
  const dom=new JSDOM('<main id="view"><section><button id="play">Play</button></section></main>',{url:'https://example.test/deutsch/',runScripts:'outside-only'}),w=dom.window,spoken=[],timers=[];let voices=initial;
  w.A1Profile={getUiLang:()=> 'de'};
  w.speechSynthesis={getVoices:()=>voices,cancel(){},addEventListener(){},speak:u=>spoken.push(u)};
  w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
  for(const f of ['shared/voice-selection.js','shared/dialogue-voices.js',...(paced?['deutsch/listening-audio.js']:[])])w.eval(fs.readFileSync(f,'utf8'));
  w.setTimeout=fn=>{timers.push(fn);return timers.length;};w.clearTimeout=()=>{};
  function play(turns){
    spoken.length=0;let ended=0,index=0,limit=0;
    assert(w.A1Voice.speakDialogue(turns,{lang:'de-DE',onEnd:()=>ended++}));
    while(index<spoken.length||timers.length){assert(++limit<1000);if(index<spoken.length)spoken[index++].onend();else timers.shift()();}
    assert.equal(ended,1);return spoken;
  }
  return {dom,w,play,setVoices:list=>voices=list};
}
const defaults=[{speaker:'A',text:'Guten Tag.'},{speaker:'B',text:'Hallo.'},{speaker:'A',text:'Auf Wiedersehen.'}];

for(const paced of [true,false])test(`German ${paced?'paced':'shared'} playback defaults to female/male even with multiple female voices and a saved female preference`,()=>{
  const female=voice('Microsoft Katja Online (Natural)'),other=voice('Petra'),male=voice('Microsoft Stefan'),e=environment([female,other,male],paced);
  e.w.localStorage.setItem('a1suite.voicePrefs.v2',JSON.stringify({'de-de':{uri:other.voiceURI,name:other.name}}));
  const spoken=e.play(defaults);assert.deepEqual(spoken.map(u=>u.voice),[other,male,other]);
  const reversed=e.play([{speaker:'B',text:'Hallo.'},{speaker:'A',text:'Guten Tag.'}]);assert.deepEqual(reversed.map(u=>u.voice),[male,other]);
  assert(!e.w.document.querySelector('[data-dialogue-voice-note]'));e.dom.window.close();
});

test('German device voice names, Apple URIs and Microsoft Neural names identify role gender',()=>{
  for(const [female,male]of [
    [voice('Anna (Enhanced)'),voice('Martin')],
    [voice('Deutsch 1','com.apple.voice.compact.de-DE.Petra'),voice('Deutsch 2','com.apple.voice.compact.de-DE.Markus')],
    [voice('de-DE-KatjaNeural'),voice('de-DE-ConradNeural')],
    [voice('SeraphinaMultilingualNeural'),voice('FlorianMultilingualNeural')]
  ]){
    const e=environment([male,female]);assert.equal(e.w.A1DialogueVoices.gender(female,'de-DE'),'female');assert.equal(e.w.A1DialogueVoices.gender(male,'de-DE'),'male');
    assert.deepEqual(e.play(defaults).map(u=>u.voice),[female,male,female]);e.dom.window.close();
  }
});

test('explicit reversed roles and single narrators retain their gender, independently of A/B',()=>{
  const female=voice('Anna'),male=voice('Martin'),e=environment([female,male]);
  assert.deepEqual(e.play([{speaker:'A',gender:'male',text:'Ich heiße Paul.'},{speaker:'B',gender:'female',text:'Ich heiße Nora.'}]).map(u=>u.voice),[male,female]);
  assert.equal(e.play([{speaker:'A',gender:'male',text:'Hier ist Paul.'}])[0].voice,male);
  assert.equal(e.play([{speaker:'single',text:'Eine Hörprobe.'}])[0].voice,female);e.dom.window.close();
});

test('a late-loaded second voice is picked on the next play; unavailable or unidentified genders are reported honestly',()=>{
  const female=voice('Anna'),male=voice('Martin'),e=environment([female]);
  assert.equal(e.play(defaults)[1].voice,female);assert(e.w.document.querySelector('[data-dialogue-voice-note]').textContent.includes('keine zweite'));
  e.setVoices([female,male]);assert.equal(e.play(defaults)[1].voice,male);assert(!e.w.document.querySelector('[data-dialogue-voice-note]'));
  const unknown1=voice('Browser Deutsch 1'),unknown2=voice('Browser Deutsch 2');e.setVoices([unknown1,unknown2]);
  const spoken=e.play(defaults);assert.notEqual(spoken[0].voice,spoken[1].voice);assert(e.w.document.querySelector('[data-dialogue-voice-note]').textContent.includes('Geschlecht'));
  // Do not consume the only identified male voice as a fallback for the female role.
  e.setVoices([male,unknown1]);assert.deepEqual(e.play(defaults).map(u=>u.voice),[unknown1,male,unknown1]);e.dom.window.close();
});
