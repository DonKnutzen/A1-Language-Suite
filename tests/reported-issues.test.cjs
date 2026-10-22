const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(p,'utf8');
for(const [folder,prefix] of [['francais','FR'],['deutsch','DE']]){
 test(folder+': change choice before checking; selection survives reload/language and never reveals audio or counts a grade',()=>{
  const dom=new JSDOM('<main id="view"></main>',{runScripts:'outside-only'}),w=dom.window;let lang='en',completed=0;
  w.scrollTo=()=>{};w.A1Profile={getUiLang:()=>lang};w.A1Learning={shuffle:a=>[...a]};w.A1Voice={cancel(){}};w.FR_A1_MASTERY={};w.DE_A1_ASSESSMENTS={};
  w.eval(read('shared/exercise-engine.js'));w.eval(read('shared/review-audio.js'));w.eval(read(folder+'/review-practice.js'));const api=w[prefix+'_A1_REVIEW'],state={doneLessons:[],reviewPractice:{imported:true,items:{}}},root=w.document.querySelector('main');
  const q=api.task(2,'grammar:test','Test',{q:'Mon ___ est Sophie.',o:['prénom','nom','surnom'],answer:'prénom',audio:'Mon prénom est Sophie.'});api.record(state,q,false);
  const render=()=>api.render({view:root,lessons:[],state,save:done=>{if(done)completed++;},onBack(){},speak(){},grammarHtml:()=>'',initialMode:'mistakes'});
  const click=s=>root.querySelector(s).click();render();click('#reviewStart');const s=state.reviewPractice.session,index=value=>s.order.indexOf(value);
  assert(root.querySelector('#reviewCheck').disabled);click(`[data-review-option="${index('nom')}"]`);assert(!s.answers[0]);assert.equal(state.reviewPractice.items[q.id].wrong,1);assert(!root.querySelector('#reviewAnswerAudio'));assert(!root.querySelector('#reviewNext'));
  assert.equal(root.querySelector('[aria-pressed="true"]').textContent,'nom');click('#reviewPause');render();click('#reviewResume');assert.equal(root.querySelector('[aria-pressed="true"]').textContent,'nom');
  lang=folder==='francais'?'de':'fr';w.dispatchEvent(new w.Event('a1suite:languagechange'));assert.equal(root.querySelector('[aria-pressed="true"]').textContent,'nom');
  click(`[data-review-option="${index('prénom')}"]`);assert(!s.answers[0]);click('#reviewCheck');assert(s.answers[0].ok);assert(root.querySelector('#reviewAnswerAudio'));assert([...root.querySelectorAll('[data-review-option]')].every(b=>b.disabled));
  const before=JSON.stringify(state.reviewPractice.items);root.querySelector('#reviewCheck').click();assert.equal(JSON.stringify(state.reviewPractice.items),before);click('#reviewNext');assert.equal(completed,1);dom.window.close();
 });
}
function voiceFixture(list){
 const dom=new JSDOM('<main id="view"><section><button id="play">Play</button></section></main>',{runScripts:'outside-only',url:'https://example.org'}),w=dom.window;
 w.A1Profile={getUiLang:()=> 'de'};w.A1Voice={matching:()=>list,select:()=>list[0]};w.eval(read('shared/dialogue-voices.js'));return {dom,w,api:w.A1DialogueVoices};
}
const voice=name=>({name,voiceURI:name,lang:'fr-FR'});
test('two male dialogue roles use distinct male voices when available, with no fake female assignment',()=>{
 const e=voiceFixture(['Denise','Henri','Paul'].map(voice)),p=e.api.plan('fr-FR',[{speaker:'A',gender:'male'},{speaker:'B',gender:'male'}]);assert.notEqual(p.bySpeaker.A,p.bySpeaker.B);assert.equal(e.api.gender(p.bySpeaker.A,'fr-FR'),'male');assert.equal(e.api.gender(p.bySpeaker.B,'fr-FR'),'male');assert.equal(p.notice,'');e.dom.window.close();
});
test('mixed roles follow explicit gender, and a one-voice device gives an honest visible fallback notice',()=>{
 const e=voiceFixture(['Henri','Denise'].map(voice)),p=e.api.plan('fr-FR',[{speaker:'A',gender:'female'},{speaker:'B',gender:'male'}]);assert.equal(p.bySpeaker.A.name,'Denise');assert.equal(p.bySpeaker.B.name,'Henri');e.dom.window.close();
 const single=voiceFixture([voice('Henri')]),fallback=single.api.plan('fr-FR',[{speaker:'A',gender:'female'},{speaker:'B',gender:'male'}]);assert.equal(fallback.notice,'single');single.w.document.querySelector('#play').focus();single.api.announce(fallback.notice);assert(single.w.document.querySelector('[data-dialogue-voice-note]').textContent.includes('keine zweite'));single.api.announce('');assert(!single.w.document.querySelector('[data-dialogue-voice-note]'));single.dom.window.close();
});
test('reported content has natural coffee alternatives and the requested infinitive discrimination',()=>{
 const dom=new JSDOM('',{runScripts:'outside-only'}),w=dom.window;for(const f of ['francais/data.js','francais/comprehension-content.js','francais/grammar-practice.js'])w.eval(read(f));
 const coffee=w.FR_A1_DATA.lessons[5].quiz.find(q=>q.q==='Wie bestellst du höflich Kaffee?');assert(coffee.o.every(o=>o.startsWith('Je voudrais ')&&o.endsWith('s’il vous plaît.')));assert.equal(coffee.o.filter(o=>o.includes('café')).length,1);
 const q=w.FR_A1_DATA.lessons[1].quiz.find(q=>q.q==='Vous pouvez ___, s’il vous plaît ?');assert.deepEqual(Array.from(q.o),['épeler','épelez','épelle']);
 const Paul=w.A1_COMPREHENSION_CONTENT[5];assert(Paul.turns.some(t=>/Paul\. Il est calme\./.test(t.text)));assert.equal(Paul.fields.find(f=>f.label==='Eigenschaft von Paul').answer,'calme');assert(w.A1_COMPREHENSION_CONTENT[2].turns.every(t=>t.gender==='male'));dom.window.close();
});
test('paced playback includes every sentence of the reported Paul dialogue',()=>{
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org',runScripts:'outside-only'}),w=dom.window,spoken=[],timers=[];
 w.A1Voice={cancel(){},speak(){},speakSequence(){},speakDialogue(){},dialogueVoices:()=>({A:voice('Denise'),B:voice('Henri')}),select:()=>voice('Denise')};w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};w.speechSynthesis={speak:u=>spoken.push(u),cancel(){},getVoices:()=>[]};w.setTimeout=fn=>{timers.push(fn);return timers.length;};w.clearTimeout=()=>{};
 for(const f of ['francais/comprehension-content.js','francais/listening-audio.js'])w.eval(read(f));let ended=0;w.A1Voice.speakDialogue(w.A1_COMPREHENSION_CONTENT[5].turns,{lang:'fr-FR',rate:.75,onEnd(){ended++;}});
 let i=0;while(i<spoken.length){spoken[i++].onend();while(timers.length)timers.shift()();}
 assert.equal(ended,1);assert(spoken.some(u=>u.text==='Il est calme.'));assert(spoken.some(u=>u.text==='Elle est sympa.'));assert(spoken.some(u=>u.text==='nous habitons ici.'));dom.window.close();
});
test('an old unfinished coffee question upgrades without changing previously graded answers',()=>{
 const dom=new JSDOM('<main id="view"></main>',{runScripts:'outside-only'}),w=dom.window;w.scrollTo=()=>{};for(const f of ['francais/data.js','shared/exercise-engine.js'])w.eval(read(f));const l=w.FR_A1_DATA.lessons[5],q={type:'choice',q:'Wie bestellst du höflich Kaffee?',o:['Je voudrais un café, s’il vous plaît.','Je suis un café.','Je vais café.'],a:0,answer:'Je voudrais un café, s’il vous plaît.',audio:'Je voudrais un café, s’il vous plaît.'};
 const progress={session:{version:97,ex:[q],i:0,score:0,response:null}},run=()=>w.A1ExerciseEngine.run({lesson:l,view:w.document.querySelector('main'),progress,exerciseVersion:97,targetLang:'fr',uiLang:'de',selectionOnly:true,answerAudioAfterResponse:true,playAudio(){},onBack(){},onFinish(){}});run();assert(!progress.session.ex[0].o.includes('Je suis un café.'));assert.equal(progress.session.score,0);dom.window.close();
});
