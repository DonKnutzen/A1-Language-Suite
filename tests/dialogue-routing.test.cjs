const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),{JSDOM}=require('jsdom');
for(const [folder,code]of [['francais','fr'],['deutsch','de'],['englisch','en']])test(folder+': all 72 normal/Hard Mode recordings preserve explicit role voices through actual playback',()=>{
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.test/'+folder+'/',runScripts:'outside-only'}),w=dom.window,spoken=[],timers=[];
 const female={name:'Test Female',lang:code+'-'+({fr:'FR',de:'DE',en:'GB'}[code]),voiceURI:'female'},male={...female,name:'Test Male',voiceURI:'male'};
 w.speechSynthesis={getVoices:()=>[female,male],cancel(){},speak:u=>spoken.push(u),addEventListener(){}};w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
 const files=['shared/voice-selection.js','shared/dialogue-voices.js',folder+'/listening-audio.js',...(code==='en'?['content.js','content-2.js','content-3.js','content-4.js','listening-content.js','reading-content.js','feedback.js','course-data.js'].map(f=>folder+'/'+f):[folder+'/comprehension-content.js',folder+'/hard-mode-content.js'])];
 for(const f of files)w.eval(fs.readFileSync(f,'utf8'));w.setTimeout=f=>{timers.push(f);return timers.length;};w.clearTimeout=()=>{};
 const hard=w[code==='en'?'EN_A1_HARD_CONTENT':code==='fr'?'FR_A1_HARD_CONTENT':'DE_A1_HARD_CONTENT'],api=w[code==='en'?'EN_A1_HARD_AUDIO':code==='fr'?'FR_A1_HARD_AUDIO':'DE_A1_HARD_AUDIO'];let count=0;
 const recordings=[...Object.values(w.A1_COMPREHENSION_CONTENT).map(b=>b.turns),...Object.entries(hard).flatMap(([id,d])=>d.listening.map((b,i)=>api.turns(+id,d,i)))];
 for(const turns of recordings){assert(turns?.length);if(count<24){const legacy=turns.map(({gender,...t})=>t),fixed=w.A1DialogueVoices.plan(female.lang,legacy);for(const t of turns)assert.equal(fixed.bySpeaker[t.speaker],t.gender==='female'?female:male);}const roles=new Map();for(const t of turns){assert(['female','male'].includes(t.gender));if(roles.has(t.speaker))assert.equal(roles.get(t.speaker),t.gender);roles.set(t.speaker,t.gender);}if(roles.size===2)assert.equal(new Set(roles.values()).size,2);
  spoken.length=0;timers.length=0;let ended=0;w.A1Voice.speakDialogue(turns,{lang:female.lang,rate:.75,onEnd:()=>ended++});let i=0,limit=0;while(i<spoken.length||timers.length){assert(++limit<3000);if(i<spoken.length)spoken[i++].onend?.();else timers.shift()();}assert.equal(ended,1);
  const audio=w[code==='en'?'EN_A1_LISTENING_AUDIO':code==='fr'?'FR_A1_LISTENING_AUDIO':'DE_A1_LISTENING_AUDIO'];const parts=audio.plan(turns,.75);assert.equal(spoken.length,parts.length);parts.forEach((p,i)=>assert.equal(spoken[i].voice,p.gender==='female'?female:male));count++;
 }assert.equal(count,72);dom.window.close();
});
