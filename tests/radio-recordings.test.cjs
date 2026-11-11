const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const courses=[['francais','fr-FR'],['francais-a2','fr-FR'],['deutsch','de-DE'],['englisch','en-GB']];
function fixture(course,lang){
 const dom=new JSDOM('<main id="view"></main>',{url:`https://example.test/suite/${course}/`,runScripts:'outside-only'}),w=dom.window,media=[],spoken=[],timers=new Map();let seq=0;
 w.scrollTo=()=>{};w.A1_APP_META={course};w.setTimeout=(fn,ms)=>{timers.set(++seq,{fn,ms});return seq;};w.clearTimeout=id=>timers.delete(id);
 // No target-language system voices: Firefox's reported failing configuration.
 w.speechSynthesis={getVoices:()=>[],cancel(){},speak:u=>spoken.push(u),addEventListener(){}};
 w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
 w.Audio=class{constructor(src){this.src=src;media.push(this);}play(){return Promise.resolve();}pause(){this.paused=true;}removeAttribute(){this.src='';}load(){}};
 const files=['shared/voice-selection.js','shared/dialogue-voices.js',course+'/listening-audio.js','shared/radio-recordings.js','shared/radio-audio.js'];
 if(course==='englisch')files.push(...['b1-course.js','b1-course-2.js','b1-course-3.js','b1-course-4.js','b1-skills.js','b1-skills-2.js','b1-skills-3.js','b1-skills-4.js','b1-runtime.js'].map(f=>course+'/'+f));
 else files.push(course+'/hard-mode-content.js');
 for(const file of files)w.eval(read(file));
 const prefix=lang.startsWith('fr')?'FR_A1':lang.startsWith('de')?'DE_A1':'EN_A1';
 return {dom,w,media,spoken,timers,content:w[prefix+'_HARD_CONTENT'],helper:w[prefix+'_HARD_AUDIO'],load:file=>w.eval(read(file))};
}
for(const [course,lang] of courses)test(`${course}: all 48 current radio recordings play without a target-language system voice`,()=>{
 const e=fixture(course,lang);try{let count=0;
 for(const [id,data]of Object.entries(e.content))for(let b=0;b<data.listening.length;b++){
  const turns=e.helper.turns(Number(id),data,b),item=e.w.A1RadioAudio.recording(turns,lang);assert(item,`${course} ${id}/${b}`);
  const bytes=fs.readFileSync(path.join(root,'shared/audio/radio',item.file));assert(bytes.length>1000,item.file);
  let ended=0,errors=0,started=0;assert.equal(e.w.A1Voice.speakDialogue(turns,{lang,rate:.75,onStart:()=>started++,onEnd:()=>ended++,onError:()=>errors++}),true);
  const audio=e.media.at(-1);assert(audio.src.endsWith(item.file));assert.equal(audio.playbackRate,.75);assert.equal(audio.preservesPitch,true);audio.onplaying();audio.onplaying();assert.equal(started,1);audio.onended();assert.equal(ended,1);assert.equal(errors,0);assert(![...e.timers.values()].some(t=>t.ms===15000));count++;
 }
 assert.equal(count,48);assert.equal(e.spoken.length,0);
 }finally{e.dom.window.close();}
});
test('French lesson 1 pilot recordings are covered as well as the standard test',()=>{
 const e=fixture('francais','fr-FR');try{e.load('francais/hard-mode-pilot.js');for(const block of e.w.FR_A1_HARD_PILOT.recordings){assert(e.w.A1RadioAudio.recording(block.turns,'fr-FR'));e.w.A1Voice.speakDialogue(block.turns,{lang:'fr-FR'});e.media.at(-1).onended();}assert.equal(e.media.length,2);assert.equal(e.spoken.length,0);}finally{e.dom.window.close();}
});
test('failed, rejected and stalled recordings settle once and cancel their startup watchdog',async()=>{
 for(const kind of ['error','timeout','reject']){const e=fixture('francais-a2','fr-FR');try{let failed=0,ended=0;const turns=e.helper.turns(1,e.content[1],0);
  if(kind==='reject')e.w.Audio.prototype.play=()=>Promise.reject(new Error('blocked'));
  e.w.A1Voice.speakDialogue(turns,{lang:'fr-FR',onEnd:()=>ended++,onError:()=>failed++});const audio=e.media.at(-1),late=audio.onended,fail=audio.onerror;
  if(kind==='error')fail();if(kind==='timeout')[...e.timers.values()].find(t=>t.ms===15000).fn();await Promise.resolve();late();fail();assert.equal(failed,1,kind);assert.equal(ended,0);assert(audio.paused);assert.equal(audio.src,'');assert(![...e.timers.values()].some(t=>t.ms===15000));
 }finally{e.dom.window.close();}}
});
test('stop, replay and another audio invalidate late callbacks without overlapping playback',()=>{
 for(const action of ['cancel','dialogue','speak','speakSequence','playUtterance']){const e=fixture('francais-a2','fr-FR');try{let ended=0,failed=0;const turns=e.helper.turns(1,e.content[1],0);e.w.A1Voice.speakDialogue(turns,{lang:'fr-FR',onEnd:()=>ended++,onError:()=>failed++});const old=e.media[0],lateEnd=old.onended,lateError=old.onerror;
  if(action==='cancel')e.w.A1Voice.cancel();else if(action==='dialogue')e.w.A1Voice.speakDialogue(turns,{lang:'fr-FR'});else if(action==='playUtterance')e.w.A1Voice.playUtterance(new e.w.SpeechSynthesisUtterance('Merci'),'fr-FR');else e.w.A1Voice[action](action==='speak'?'Merci':['Merci'],{lang:'fr-FR'});
  lateEnd();lateError();assert(old.paused);assert.equal(old.src,'');assert.equal(ended,1);assert.equal(failed,0);assert.equal(e.media.length,action==='dialogue'?2:1);
 }finally{e.dom.window.close();}}
});
test('changed exercise text never matches a stale recording; unrelated speech retains the native player',()=>{
 const e=fixture('francais-a2','fr-FR');try{const turns=e.helper.turns(1,e.content[1],0).map(t=>({...t,text:t.text+' Texte modifié.'}));assert.equal(e.w.A1RadioAudio.recording(turns,'fr-FR'),null);e.w.A1Voice.speakDialogue(turns,{lang:'fr-FR'});assert.equal(e.media.length,0);assert(e.spoken.length);}finally{e.dom.window.close();}
});
test('recorded radio playback also works when the entire speech synthesis API is absent',()=>{
 const e=fixture('francais-a2','fr-FR');try{delete e.w.speechSynthesis;delete e.w.SpeechSynthesisUtterance;let ended=0;assert.equal(e.w.A1Voice.speakDialogue(e.helper.turns(1,e.content[1],0),{lang:'fr-FR',onEnd:()=>ended++}),true);e.media.at(-1).onplaying();e.media.at(-1).onended();assert.equal(ended,1);assert.equal(e.spoken.length,0);}finally{e.dom.window.close();}
});
for(const [course,lang]of courses.slice(0,3))test(`${course}: every lesson's radio buttons recover failed plays and keep the two-play limit`,()=>{
 const e=fixture(course,lang);try{
  for(const file of ['shared/vocabulary-content.js','shared/quiz-show.js','francais/hard-mode-arcade.js','shared/game-hard-mode.js',course+'/hard-mode.js'])e.load(file);
  const w=e.w,view=w.document.querySelector('main');
  for(let id=1;id<=24;id++){
   const state={lessonMasteryBest:{[id]:100},lessonWork:{}};w.A1_GAME_HARD.render({course:lang.slice(0,2),lesson:{id,title:'Test'},view,state,save(){},onBack(){}});
   [...view.querySelectorAll('[data-games-start-at]')].at(-1).click();const attempt=state.lessonWork[id].hardMode.games.attempt;
   for(let b=0;b<2;b++){
    const button=view.querySelector(`[data-games-listen="${b}"]`);button.click();assert.equal(attempt.plays[b],1);e.media.at(-1).onerror();assert.equal(attempt.plays[b],0);assert.equal(button.disabled,false);assert(view.querySelector('[data-games-audio-error]').textContent);
    for(let n=1;n<=2;n++){button.click();const audio=e.media.at(-1);audio.onplaying();audio.onended();assert.equal(attempt.plays[b],n);assert.equal(button.disabled,n===2);}
   }
  }
  assert.equal(e.spoken.length,0);
 }finally{e.dom.window.close();}
});
