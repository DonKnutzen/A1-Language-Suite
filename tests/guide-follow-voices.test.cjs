const {test}=require('node:test'),assert=require('node:assert/strict'),{environment,read}=require('./helpers/lesson-guide.cjs');
function voiceEnvironment(){
 const e=environment('francais');let listeners=new Map();const voices=[{name:'French One',lang:'fr-FR',voiceURI:'fr1'},{name:'French Two',lang:'fr-CA',voiceURI:'fr2'},{name:'German One',lang:'de-DE',voiceURI:'de1'},{name:'German Two',lang:'de-DE',voiceURI:'de2'}];
 e.w.speechSynthesis={getVoices:()=>voices,speak:u=>e.spoken.push(u),cancel(){},addEventListener:(n,f)=>{const fs=listeners.get(n)||new Set();fs.add(f);listeners.set(n,fs);},removeEventListener:(n,f)=>listeners.get(n)?.delete(f)};
 e.w.eval(read('shared/voice-selection.js'));e.time.tasks.clear();return {...e,voices,listeners};
}
function choose(e,lang,name){const select=e.view.querySelector(`[data-guide-voice="${lang}"]`),option=[...select.options].find(o=>o.textContent.includes(name));assert(option);select.value=option.value;select.dispatchEvent(new e.w.Event('change'));}
test('vocabulary is exactly target–translation–target; the later listening text is not replayed',()=>{
 for(const course of ['francais','deutsch']){const e=environment(course);try{e.options.lesson={...e.options.lesson,phrases:[['Bonjour !','Hallo!'],['Je m’appelle Léa.','Ich heiße Léa.']]};const plan=e.api.plan(e.options);for(let i=0;i<2;i++){const a=plan.findIndex(p=>p.phrase===i),b=plan[a+1],c=plan[a+2];assert.equal(b.lang,e.native);assert.equal(c.phrase,i);assert.equal(c.lang,e.target);assert.equal(plan.filter(p=>p.phrase===i).length,2);}assert(plan.filter(p=>p.listening).every(p=>p.round===1));assert.equal(plan.filter(p=>p.listening).length,0);assert(!plan.some(p=>/Und jetzt noch einmal|deuxième fois/.test(p.text)));}finally{e.dom.window.close();}}
});
test('both guide voices are selectable in place and use the shared persisted preference',()=>{
 const e=voiceEnvironment();try{e.mount();assert.equal(e.view.querySelectorAll('[data-guide-voice]').length,2);choose(e,'fr-FR','French Two');choose(e,'de-DE','German Two');assert.equal(e.w.A1Voice.select('fr-FR').name,'French Two');assert.equal(e.w.A1Voice.select('de-DE').name,'German Two');assert.equal(e.spoken.length,0);e.mount();assert.match(e.view.querySelector('[data-guide-voice="fr-FR"]').selectedOptions[0].textContent,/French Two/);e.view.querySelector('[data-guide-voice-preview="fr-FR"]').click();assert.equal(e.spoken.at(-1).voice.name,'French Two');assert.equal(e.spoken.at(-1).lang,'fr-CA');}finally{e.dom.window.close();}
});
test('changing the guide voice mid-play does not restart or duplicate the current utterance',()=>{
 const e=voiceEnvironment();try{e.mount();e.play();const first=e.spoken.at(-1);choose(e,'de-DE','German Two');assert.equal(e.spoken.length,1);assert.equal(first.voice.name,'German One');first.onend();e.time.next();assert.equal(e.spoken.at(-1).voice.name,'German Two');assert.notEqual(e.spoken.at(-1).text,first.text);}finally{e.dom.window.close();}
});
test('the guide is compact by default and uses existing text instead of a separate transcript',()=>{
 const e=environment('francais');try{e.mount();const settings=e.view.querySelector('[data-guide-options]');assert.equal(settings.open,false);assert.equal(e.view.querySelector('[data-guided-status]').hidden,true);assert.equal(e.view.querySelectorAll('[data-guide-reading],[data-guide-read],[data-guide-caption],[data-guide-line]').length,0);assert(settings.contains(e.view.querySelector('[data-guide-voice]')));assert(settings.contains(e.view.querySelector('[data-guide-speed]')));settings.open=true;e.play();assert.equal(settings.open,false);assert.equal(e.w.document.activeElement,e.w.document.body);}finally{e.dom.window.close();}
});
test('a spoken explanation highlights the existing visible paragraph without inserting or scrolling text',()=>{
 const e=environment('francais');try{const content=e.w.document.createElement('section');content.className='lesson-step-content';content.innerHTML='<p>Eine wichtige Erklärung.</p><details><summary>Versteckt</summary><p>Eine wichtige Erklärung.</p></details>';e.view.append(content);const paragraph=content.querySelector('p'),before=content.textContent;e.mount();e.play();let n=0;while(e.spoken.at(-1).text!=='Eine wichtige Erklärung.'){e.advance();assert(++n<150);}assert(paragraph.classList.contains('guide-source-current'));assert.equal(content.querySelectorAll('p').length,2);assert.equal(paragraph.textContent,'Eine wichtige Erklärung.');assert(!content.querySelector('details p').classList.contains('guide-source-current'));e.view.querySelector('[data-guided-stop]').click();assert.equal(content.textContent,before);assert.equal(content.querySelector('p'),paragraph);}finally{e.dom.window.close();}
});
test('the visible vocabulary source highlights both the target and its translation',()=>{
 const e=environment('francais');try{const row=e.w.document.createElement('div');row.dataset.coreRow='0';row.innerHTML='<strong>Bonjour !</strong><small>Guten Tag!</small>';e.view.append(row);e.options.lesson={...e.options.lesson,phrases:[['Bonjour !','Guten Tag!']]};e.mount();e.play();let n=0;while(e.spoken.at(-1).text!=='Bonjour !'){e.advance();assert(++n<100);}assert(row.querySelector('strong').classList.contains('guide-source-current'));e.advance();assert(row.querySelector('small').classList.contains('guide-source-current'));assert(!row.querySelector('strong').classList.contains('guide-source-current'));e.view.querySelector('[data-guided-stop]').click();assert.equal(e.view.querySelectorAll('.guide-source-current').length,0);}finally{e.dom.window.close();}
});
test('backgrounding does not replay, pagehide saves the current place and reopening resumes there',()=>{
 const e=environment('francais');try{e.mount();e.play();for(let i=0;i<4;i++)e.advance();const current=e.spoken.at(-1),count=e.spoken.length;Object.defineProperty(e.w.document,'visibilityState',{configurable:true,value:'hidden'});e.w.document.dispatchEvent(new e.w.Event('visibilitychange'));assert.equal(e.spoken.length,count);e.w.dispatchEvent(new e.w.Event('pagehide'));assert.equal(e.time.tasks.size,0);e.mount();assert.equal(e.spoken.length,count);e.play();assert.equal(e.spoken.at(-1).text,current.text);assert.notEqual(e.spoken.at(-1).text,e.spoken[0].text);e.view.querySelector('[data-guided-stop]').click();e.mount();e.play();assert.equal(e.spoken.at(-1).text,e.spoken[0].text);}finally{e.dom.window.close();}
});
test('a stalled browser voice pauses on return without silently restarting the guide',()=>{
 const e=environment('francais');try{e.mount();e.play();e.advance();const text=e.spoken.at(-1).text,count=e.spoken.length;e.w.speechSynthesis.speaking=false;e.w.speechSynthesis.pending=false;e.w.document.dispatchEvent(new e.w.Event('visibilitychange'));assert.equal(e.spoken.length,count);assert.match(e.view.querySelector('[data-guided-status]').textContent,/Browserstimme/);e.play();assert.equal(e.spoken.at(-1).text,text);}finally{e.dom.window.close();}
});
test('late voice loading updates the controls without restarting playback',()=>{
 const e=voiceEnvironment();try{e.mount();e.play();const n=e.spoken.length;e.voices.push({name:'French Three',lang:'fr-FR',voiceURI:'fr3'});for(const f of e.listeners.get('voiceschanged'))f();assert([...e.view.querySelector('[data-guide-voice="fr-FR"]').options].some(o=>o.textContent.includes('French Three')));assert.equal(e.spoken.length,n);}finally{e.dom.window.close();}
});
test('voice selection validates language and re-enables a selected French voice after a fallback',()=>{
 const e=voiceEnvironment();try{const voice=e.w.A1Voice;assert.equal(voice.setVoice('de-DE',{uri:'fr2',name:'French Two'}),false);let boundaries=0,started=0;const first=new e.w.SpeechSynthesisUtterance('Bonjour');first.voice=e.voices[0];first.lang='fr-FR';first.onstart=()=>started++;first.onboundary=()=>boundaries++;voice.playUtterance(first,'fr-FR');e.spoken.at(-1).onerror({error:'synthesis-failed'});assert.equal(e.spoken.length,2);const fallback=e.spoken.at(-1);fallback.onstart({});fallback.onboundary({charIndex:0});assert.equal(started,1);assert.equal(boundaries,1);assert(voice.setVoice('fr-FR',{uri:'fr2',name:'French Two'}));const next=new e.w.SpeechSynthesisUtterance('Salut');next.voice=voice.select('fr-FR');voice.playUtterance(next,'fr-FR');assert.equal(e.spoken.at(-1).voice.name,'French Two');}finally{e.dom.window.close();}
});
test('disposing the reader removes its voice listener and leaves no highlighted source',async()=>{
 const e=voiceEnvironment();try{e.mount();assert.equal(e.listeners.get('voiceschanged').size,2);e.play();e.view.innerHTML='';await Promise.resolve();assert.equal(e.listeners.get('voiceschanged').size,1);assert.equal(e.time.tasks.size,0);}finally{e.dom.window.close();}
});
test('voice lists can be refreshed explicitly even if the browser omits its voiceschanged event',()=>{
 const e=voiceEnvironment();try{e.mount();e.play();const n=e.spoken.length;e.voices.push({name:'Late Voice',lang:'fr-FR',voiceURI:'late'});e.view.querySelector('[data-guide-voice-reload]').click();assert([...e.view.querySelector('[data-guide-voice="fr-FR"]').options].some(o=>o.textContent.includes('Late Voice')));assert.equal(e.spoken.length,n);}finally{e.dom.window.close();}
});

test('the idle guide occupies the lesson menu and playback reveals optional controls without expanding the page',()=>{
 for(const course of ['francais','deutsch']){const e=environment(course);try{
  const row=e.w.document.createElement('div');row.className='lesson-back-row';e.view.prepend(row);e.mount();
  const host=row.querySelector('.guided-audio'),panel=host.querySelector('[data-guide-panel]'),toggle=host.querySelector('[data-guide-toggle]'),play=host.querySelector('[data-guided-play]');
  assert(host);assert(panel.hidden);assert(toggle.hidden);assert.equal(play.dataset.icon,'▶');assert(play.getAttribute('aria-label'));assert.equal(e.spoken.length,0);
  e.play();assert.equal(e.spoken.length,1);assert.equal(play.dataset.icon,'Ⅱ');assert(!toggle.hidden);assert(panel.hidden);
  toggle.click();assert(!panel.hidden);assert.equal(toggle.getAttribute('aria-expanded'),'true');
  panel.dispatchEvent(new e.w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert(panel.hidden);assert.equal(e.spoken.length,1);
  toggle.click();host.querySelector('[data-guided-stop]').click();assert(panel.hidden);assert(toggle.hidden);assert.equal(play.dataset.icon,'▶');
 }finally{e.dom.window.close();}}
});
