const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(p,'utf8');
function fixture(folder='francais',native=false){
 const dom=new JSDOM('<main id="view"></main>',{runScripts:'outside-only',url:'https://example.org/'+folder+'/'}),w=dom.window,root=w.document.querySelector('main'),calls=[],utterances=[];let lang=folder==='francais'?'de':'fr',cancels=0,saves=0;
 w.scrollTo=()=>{};w.A1Profile={getUiLang:()=>lang};w.A1Learning={shuffle:a=>[...a]};w.FR_A1_MASTERY={};w.DE_A1_ASSESSMENTS={};
 if(native){
  w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
  w.speechSynthesis={getVoices:()=>[{name:'Audrey',lang:'fr-FR'},{name:'Thomas',lang:'fr-FR'},{name:'Anna',lang:'de-DE'},{name:'Markus',lang:'de-DE'}],cancel(){cancels++;},speak(u){utterances.push(u);},addEventListener(){}};
  w.localStorage.setItem('a1suite.voicePrefs.v2',JSON.stringify({'fr-fr':{rate:1.2},'de-de':{rate:1.2}}));w.eval(read('shared/voice-selection.js'));
 }else w.A1Voice={cancel(){cancels++;},speak(){throw Error('Review must use the callback-aware path');},speakDialogue(turns,options){calls.push({turns,options});return true;}};
 w.eval(read('shared/review-audio.js'));w.eval(read(folder+'/review-practice.js'));
 const api=w[folder==='francais'?'FR_A1_REVIEW':'DE_A1_REVIEW'],state={doneLessons:[],reviewPractice:{imported:true,items:{}}},targetLang=folder==='francais'?'fr-FR':'de-DE';
 const q=api.task(1,'hard-listening','Listening',{q:'Name?',answer:'Marie',o:['Marie','Luc','Paul'],turns:[{speaker:'A',text:folder==='francais'?'Bonjour !':'Guten Tag!',gender:'female'},{speaker:'B',text:folder==='francais'?'Je m’appelle Marc.':'Ich heiße Marc.',gender:'male'}]});api.record(state,q,false);
 const render=()=>api.render({view:root,lessons:[],state,save:()=>saves++,onBack(){root.innerHTML='Home';},speak(){w.A1Voice.cancel();},grammarHtml:()=>'',initialMode:'mistakes'});
 render();root.querySelector('#reviewStart').click();
 const click=s=>{assert(root.querySelector(s),s);root.querySelector(s).click();};
 return {dom,w,root,api,state,q,targetLang,calls,utterances,click,render,get cancels(){return cancels;},get saves(){return saves;},language(value){lang=value;w.dispatchEvent(new w.Event('a1suite:languagechange'));}};
}
for(const folder of ['francais','deutsch']){
 test(folder+': natural completion allows unlimited replay at 75 percent without modifying answers or scores',()=>{
  const e=fixture(folder),snapshot=JSON.stringify(e.state),saves=e.saves;assert(!e.root.querySelector('#reviewListen').disabled);assert(e.root.querySelector('#reviewStop').disabled);
  for(let i=0;i<4;i++){e.click('#reviewListen');const c=e.calls.at(-1);assert.equal(c.options.rate,.75);assert.equal(c.options.lang,e.targetLang);assert.deepEqual(JSON.parse(JSON.stringify(c.turns)),JSON.parse(JSON.stringify(e.q.turns)));assert(!e.root.querySelector('#reviewStop').disabled);assert(!e.root.querySelector('#reviewListen').disabled);c.options.onEnd();assert(e.root.querySelector('#reviewStop').disabled);assert(!e.root.querySelector('#reviewListen').disabled);}
  assert.equal(JSON.stringify(e.state),snapshot);assert.equal(e.saves,saves);assert.equal(e.calls.length,4);e.dom.window.close();
 });
 test(folder+': restart cancels the old run, begins at the first turn, and ignores late callbacks',()=>{
  const e=fixture(folder);e.click('#reviewListen');const old=e.calls[0];e.click('#reviewListen');const latest=e.calls[1];assert(e.cancels>=1);assert.equal(latest.turns[0].text,e.q.turns[0].text);old.options.onEnd();old.options.onError();assert(!e.root.querySelector('#reviewStop').disabled);assert(e.root.querySelector('.is-playing'));
  e.root.querySelector('#reviewStop').focus();e.click('#reviewStop');assert.equal(e.w.document.activeElement.id,'reviewListen');assert(e.root.querySelector('#reviewStop').disabled);assert(!e.root.querySelector('#reviewListen').disabled);latest.options.onEnd();assert(!e.root.querySelector('.is-playing'));e.click('#reviewListen');assert.equal(e.calls.length,3);e.dom.window.close();
 });
 test(folder+': answering during playback, restoring feedback and switching language never locks replay',()=>{
  const e=fixture(folder);e.click('#reviewListen');const old=e.calls[0],s=e.state.reviewPractice.session;e.click(`[data-review-option="${s.order.indexOf('Marie')}"]`);e.click('#reviewCheck');assert(s.answers[0].ok);assert(e.root.querySelector('#reviewStop').disabled);e.click('#reviewListen');assert.equal(e.calls.length,2);assert([...e.root.querySelectorAll('[data-review-option]')].every(b=>b.disabled));old.options.onEnd();assert(!e.root.querySelector('#reviewStop').disabled);
  const answers=JSON.stringify(s.answers),order=JSON.stringify(s.order);e.language('en');assert(e.root.textContent.includes('Listen · 75%'));assert(e.root.querySelector('#reviewStop').disabled);assert.equal(JSON.stringify(s.answers),answers);assert.equal(JSON.stringify(s.order),order);e.click('#reviewListen');assert.equal(e.calls.length,3);e.click('#reviewPause');assert(!e.root.querySelector('#reviewListen'));e.click('#reviewResume');assert(e.root.querySelector('#reviewNext'));assert(!e.root.querySelector('#reviewListen').disabled);assert(e.root.querySelector('#reviewStop').disabled);assert.equal(JSON.stringify(s.answers),answers);e.dom.window.close();
 });
 test(folder+': single-sentence audio uses completion-aware dialogue playback and is replayable',()=>{
  const e=fixture(folder);e.state.reviewPractice.session.tasks[0].turns=null;e.state.reviewPractice.session.tasks[0].speech='902 555 0142';e.render();e.click('#reviewResume');e.click('#reviewListen');const c=e.calls.at(-1);assert.equal(c.turns.length,1);assert.equal(c.turns[0].text,'902 555 0142');assert.equal(c.turns[0].speaker,'single');assert.equal(c.options.rate,.75);c.options.onEnd();assert(e.root.querySelector('#reviewStop').disabled);e.click('#reviewListen');assert.equal(e.calls.length,2);e.dom.window.close();
 });
 test(folder+': unavailable audio, exceptions, errors and missing end events all leave restart usable',()=>{
  const e=fixture(folder);e.w.A1Voice.speakDialogue=()=>false;e.click('#reviewListen');assert(e.root.querySelector('#reviewAudioStatus').textContent);assert(!e.root.querySelector('#reviewListen').disabled);assert(e.root.querySelector('#reviewStop').disabled);
  e.w.A1Voice.speakDialogue=()=>{throw Error('device failed');};e.click('#reviewListen');assert(e.root.querySelector('#reviewStop').disabled);
  let options,timeout;e.w.setTimeout=fn=>{timeout=fn;return 1;};e.w.clearTimeout=()=>{};e.w.A1Voice.speakDialogue=(t,o)=>{options=o;return true;};e.click('#reviewListen');options.onError();assert(!e.root.querySelector('#reviewListen').disabled);e.click('#reviewListen');timeout();assert(e.root.querySelector('#reviewStop').disabled);assert(!e.root.querySelector('#reviewListen').disabled);e.click('#reviewListen');assert(!e.root.querySelector('#reviewStop').disabled);e.dom.window.close();
 });
 test(folder+': leaving the question cancels playback and old cleanup cannot stop a newer player',async()=>{
  const e=fixture(folder);e.click('#reviewListen');const before=e.cancels;e.root.innerHTML='Other page';await Promise.resolve();assert(e.cancels>before);
  e.render();e.click('#reviewResume');e.click('#reviewListen');e.render();e.click('#reviewResume');e.click('#reviewListen');const started=e.cancels;await Promise.resolve();assert.equal(e.cancels,started);assert(!e.root.querySelector('#reviewStop').disabled);e.dom.window.close();
 });
 test(folder+': actual voice engine completes dialogues and single sentences at 75 percent despite preview preferences',()=>{
  const e=fixture(folder,true);e.click('#reviewListen');let first=e.utterances.at(-1);assert.equal(first.text,e.q.turns[0].text);assert.equal(first.rate,.75);first.onend();let second=e.utterances.at(-1);assert.equal(second.text,e.q.turns[1].text);assert.equal(second.rate,.75);second.onend();assert(e.root.querySelector('#reviewStop').disabled);
  e.state.reviewPractice.session.tasks[0].turns=null;e.state.reviewPractice.session.tasks[0].speech=e.q.turns[0].text;e.render();e.click('#reviewResume');e.click('#reviewListen');const single=e.utterances.at(-1);assert.equal(single.rate,.75);single.onend();assert(e.root.querySelector('#reviewStop').disabled);e.click('#reviewListen');assert(!e.root.querySelector('#reviewStop').disabled);assert.equal(e.utterances.at(-1).text,single.text);e.dom.window.close();
 });
}
for(const folder of ['francais','deutsch'])test(folder+': installed listening planner cancels between turns and its cancellation callback cannot finish a restarted run',()=>{
 const e=fixture(folder,true);e.w.eval(read(folder+'/listening-audio.js'));const timers=new Map();let id=0;e.w.setTimeout=(fn,delay)=>{timers.set(++id,{fn,delay});return id;};e.w.clearTimeout=key=>timers.delete(key);
 e.click('#reviewListen');const first=e.utterances.at(-1);assert.equal(first.voice.name,folder==='francais'?'Audrey':'Anna');first.onend();const pending=[...timers.values()].find(x=>x.delay===260);assert(pending);const count=e.utterances.length;e.click('#reviewStop');assert(!e.root.querySelector('#reviewListen').disabled);pending.fn();assert.equal(e.utterances.length,count);
 e.click('#reviewListen');assert(!e.root.querySelector('#reviewStop').disabled);assert.equal(e.utterances.at(-1).text,e.q.turns[0].text);e.utterances.at(-1).onend();const next=[...timers.values()].find(x=>x.delay===260);assert(next);next.fn();assert.equal(e.utterances.at(-1).text,e.q.turns[1].text);assert.equal(e.utterances.at(-1).voice.name,folder==='francais'?'Thomas':'Markus');e.utterances.at(-1).onend();assert(e.root.querySelector('#reviewStop').disabled);e.click('#reviewListen');assert(!e.root.querySelector('#reviewStop').disabled);e.dom.window.close();
});
