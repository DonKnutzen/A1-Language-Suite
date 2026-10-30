const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(p,'utf8');
for(const [lang,sentence] of [['de','Ich wohne hier.'],['fr','Je suis ici.'],['en','I am here.'],['es','Estoy aquí.']]){
 test(lang+': right and wrong answers speak the correct solution once; restore is silent and replay remains available',()=>{
  const dom=new JSDOM('<main id="view"></main>',{url:'https://example.test/',runScripts:'outside-only'}),w=dom.window,calls=[];
  w.scrollTo=()=>{};w.A1Profile={getUiLang:()=> 'de'};w.A1Voice={speak:(text,options)=>calls.push({text,options})};
  for(const file of ['shared/answer-feedback.js','shared/exercise-review.js','shared/exercise-engine.js',...(lang==='es'?[]:[({de:'deutsch',fr:'francais',en:'englisch'})[lang]+'/answer-audio.js'])])w.eval(read(file));
  const view=w.document.querySelector('main'),playAudio=text=>w.A1Voice.speak(text,{lang});
  for(const type of ['choice','gap','text','order'])for(const correct of [true,false]){
   const q={type,q:'Choose',prompt:'Complete',o:[sentence,'Wrong'],a:0,answer:sentence,audio:sentence,tokens:[{id:0,w:sentence},{id:1,w:'Wrong'}]},progress={};
   const run=()=>w.A1ExerciseEngine.run({lesson:{id:1},view,exercises:[q],progress,targetLang:lang,uiLang:'de',answerAudioAfterResponse:true,playAudio,onBack(){},onFinish(){}});
   const before=calls.length;run();assert.equal(calls.length,before);
   if(type==='choice')view.querySelector(`[data-o="${correct?0:1}"]`).click();
   else if(type==='order'){view.querySelector(`[data-id="${correct?0:1}"]`).click();view.querySelector('#mixedCheck').click();}
   else{view.querySelector('#mixedInput').value=correct?sentence:'Wrong';view.querySelector('#mixedCheck').click();}
   assert.equal(calls.length,before+1);assert.equal(calls.at(-1).text,sentence);
   const score=progress.session.score;run();assert.equal(calls.length,before+1);assert.equal(progress.session.score,score);
   view.querySelector('[data-answer-replay]').click();assert.equal(calls.length,before+2);assert.equal(calls.at(-1).text,sentence);
  }
  const before=calls.length;w.A1ExerciseEngine.run({lesson:{id:1},view,exercises:[{type:'listening',q:'Listen',o:['A','B'],a:0,answer:'A',audio:sentence}],targetLang:lang,uiLang:'de',answerAudioAfterResponse:true,playAudio,onBack(){},onFinish(){}});
  view.querySelector('#mixedListen').click();assert.equal(calls.length,before+1);view.querySelector('[data-o="1"]').click();assert.equal(calls.length,before+1);dom.window.close();
 });
}
test('C1 batch corrections queue every correct sentence exactly once and hearing checks stay silent',async()=>{
 const dom=new JSDOM(read('turkisch-deutsch/index.html'),{url:'https://example.test/turkisch-deutsch/',runScripts:'outside-only'}),w=dom.window,calls=[];
 w.scrollTo=()=>{};w.CSS={escape:s=>s};w.A1Profile={namespacedKey:s=>s,saveProgress(){}};
 w.A1Voice={cancel(){},mount(){},speak:(text,options)=>calls.push({text,options}),speakSequence:(parts,options)=>calls.push({parts:[...parts],options})};
 for(const file of ['shared/learning.js','shared/answer-feedback.js','turkisch-deutsch/lesson-content.js','turkisch-deutsch/app.js'])w.eval(read(file));
 const click=s=>{assert(w.document.querySelector(s),s);w.document.querySelector(s).click();};
 click('[data-route="practice"]');click('[data-practice="grammar"]');click('[data-set]');
 const questions=w.C1_DATA.grammarSets[0].questions;questions.forEach((q,i)=>{const group=w.document.querySelectorAll('.question-block')[i];group.querySelectorAll('input')[q.a].checked=true;});
 assert.equal(calls.length,0);click('#gradeSet');await Promise.resolve();assert.equal(calls.length,1);assert.equal(calls[0].parts.length,questions.length);assert.equal(calls[0].parts[0],'Die Kommission ist den Antrag gestern abgelehnt worden.');
 click('#gradeSet');await Promise.resolve();assert.equal(calls.length,1);click('[data-answer-replay]');assert.equal(calls.length,2);
 click('[data-route="practice"]');click('[data-practice="listening"]');click('[data-listening]');click('#gradeListen');await Promise.resolve();assert.equal(calls.length,2);dom.window.close();
});
test('every course loads and caches the feedback helper, and all affected script URLs match the page',()=>{
 for(const folder of ['deutsch','francais','englisch','spanisch','turkisch-deutsch']){
  const index=read(folder+'/index.html'),sw=read(folder+'/service-worker.js');assert.equal((index.match(/shared\/answer-feedback\.js/g)||[]).length,1);
  for(const match of index.matchAll(/src="([^"]+answer-autoplay-179)"/g))assert(sw.includes(match[1]),folder+': '+match[1]);
 }
});
