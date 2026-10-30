const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(p,'utf8');
function fixture(){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/francais/',runScripts:'outside-only'}),w=dom.window,audio=[];
 w.scrollTo=()=>{};w.A1Profile={getUiLang:()=> 'de'};w.A1Voice={speak:(text,opts)=>audio.push({text,opts}),cancel(){}};
 for(const f of ['francais/data.js','francais/intro-listening.js','francais/answer-audio.js','shared/exercise-review.js','shared/exercise-engine.js','francais/mastery-specs.js','francais/mastery.js','francais/lesson1-practice.js'])w.eval(read(f));
 const view=w.document.querySelector('main'),speak=(text,force,rate)=>audio.push({text,force,rate});
 const run=(tasks,progress={},extra={})=>w.A1ExerciseEngine.run({lesson:{id:7,phrases:[]},view,exercises:tasks,progress,targetLang:'fr',uiLang:'de',selectionOnly:true,answerAudioAfterResponse:true,playAudio:text=>speak(text,true,.8),onBack(){},onFinish(){},...extra});
 return {dom,w,view,audio,speak,run};
}
test('reported meat translation has no answer audio until marking; correct and wrong choices replay the solution',()=>{
 for(const correct of [true,false]){
  const e=fixture(),lesson=e.w.FR_A1_DATA.lessons.find(l=>l.quiz.some(q=>q.q.includes('Ohne Fleisch'))),source=lesson.quiz.find(q=>q.q.includes('Ohne Fleisch'));
  const task={...source,type:'choice',answer:source.o[source.a]},progress={};e.run([task],progress);
  assert(!e.view.querySelector('#mixedListen'));assert(!e.view.querySelector('[data-answer-replay]'));assert.equal(e.audio.length,0);
  e.view.querySelector(`[data-o="${correct?task.a:(task.a+1)%task.o.length}"]`).click();assert.equal(e.audio.length,1);assert.equal(e.audio[0].text,'Sans viande, s’il vous plaît.');
  const score=progress.session.score;e.view.querySelector('[data-answer-replay]').click();e.view.querySelector('[data-answer-replay]').click();assert.equal(e.audio.length,3);assert.equal(progress.session.score,score);
  e.run([],progress);assert.equal(e.audio.length,3);assert(!e.view.querySelector('#mixedListen'));assert(e.view.querySelector('[data-answer-replay]'));assert([...e.view.querySelectorAll('[data-o]')].every(b=>b.disabled));e.view.querySelector('[data-answer-replay]').click();assert.equal(e.audio.length,4);e.dom.window.close();
 }
});
test('all 24 French lesson rounds hide choice answer audio but retain real listening prompts',()=>{
 const e=fixture();let checked=0,listening=0;
 for(const lesson of e.w.FR_A1_DATA.lessons){
  const tasks=e.w.A1ExerciseEngine.makeAuthored(lesson);e.run(tasks,{}, {lesson});
  for(const q of tasks){
   const before=e.audio.length;
   if(q.type==='choice'){assert(!e.view.querySelector('#mixedListen'),`L${lesson.id}: ${q.q}`);checked++;}
   else{assert.equal(q.type,'listening');e.view.querySelector('#mixedListen').click();assert.equal(e.audio.at(-1).text,q.audio);listening++;}
   assert(!e.view.querySelector('[data-answer-replay]'));e.view.querySelector(`[data-o="${q.a}"]`).click();
   if(q.audio){assert(e.view.querySelector('[data-answer-replay]'));assert.equal(e.audio.length,before+1);}
   e.view.querySelector('#mixedNext').click();
  }
 }
 assert(checked>150);assert(listening>0);e.dom.window.close();
});
test('previous-answer view can replay French corrections while live answers and scores stay locked',()=>{
 const e=fixture(),q={type:'choice',q:'Wie sagt man Hallo?',o:['Bonjour.','Bonsoir.','Salut.'],a:0,answer:'Bonjour.',audio:'Bonjour.'},progress={};
 e.run([q,{...q,q:'Noch eine Frage'}],progress);e.view.querySelector('[data-o="0"]').click();e.view.querySelector('#mixedNext').click();assert(!e.view.querySelector('[data-answer-replay]'));
 e.view.querySelector('.exercise-review-nav button').click();const replay=e.view.querySelector('[data-answer-replay]');assert(!replay.disabled);assert([...e.view.querySelectorAll('[data-o]')].every(b=>b.disabled));replay.click();assert.equal(e.audio.at(-1).text,'Bonjour.');assert.equal(e.audio.at(-1).opts.lang,'fr-FR');assert.equal(progress.session.score,1);e.dom.window.close();
});
test('German A1 opts in; other course engine callers retain their previous behavior',()=>{
 const e=fixture();e.w.eval(read('deutsch/answer-audio.js'));const q={type:'choice',q:'Comment dit-on bonjour ?',o:['Guten Tag.','Gute Nacht.','Guten Abend.'],a:0,answer:'Guten Tag.',audio:'Guten Tag.'};
 e.run([q],{}, {targetLang:'de',uiLang:'fr'});assert(!e.view.querySelector('#mixedListen'));e.view.querySelector('[data-o="1"]').click();assert.equal(e.audio.at(-1).text,'Guten Tag.');assert(e.view.querySelector('[data-answer-replay]'));
 e.run([q],{}, {targetLang:'es',answerAudioAfterResponse:false});assert(e.view.querySelector('#mixedListen'));e.dom.window.close();
});
test('French checks expose replay only after marking and restore it without autoplay',()=>{
 const e=fixture(),lesson=e.w.FR_A1_DATA.lessons[0],state={};const show=()=>{e.w.FR_A1_MASTERY.renderLessonTest({lesson,view:e.view,state,save(){},onBack(){},speak:e.speak});e.view.querySelector('#masteryStart').click();};
 show();const session=state.lessonCheckProgress[1].session,q=session.ex.find(q=>q.type==='choice'&&q.audio);session.ex=[q];session.i=0;show();assert(!e.view.querySelector('[data-answer-replay]'));e.view.querySelector(`[data-mastery-o="${q.o.indexOf(q.answer)}"]`).click();assert(e.view.querySelector('[data-answer-replay]'));const before=e.audio.length;show();assert.equal(e.audio.length,before);e.view.querySelector('[data-answer-replay]').click();assert.equal(e.audio.at(-1).text,q.audio);e.dom.window.close();
});
test('French first-lesson grammar check has replay only after marking',()=>{
 const e=fixture();e.w.FR_A1_LESSON1.renderGrammarCheck({view:e.view,state:{},save(){},speak:e.speak,onBack(){}});
 e.view.querySelector('#l1GrammarStart').click();assert(!e.view.querySelector('[data-answer-replay]'));e.view.querySelector('[data-l1-check]').click();const replay=e.view.querySelector('[data-answer-replay]');assert(replay);const before=e.audio.length;replay.click();assert.equal(e.audio.length,before+1);e.dom.window.close();
});
test('A1 entry points opt in and cache their new assets',()=>{
 for(const folder of ['francais','deutsch']){
  assert(read(folder+'/lesson-flow.js').includes('answerAudioAfterResponse:true'));
  const index=read(folder+'/index.html'),worker=read(folder+'/service-worker.js');
  for(const match of index.matchAll(/(?:src|href)="([^"]+answer-audio-143)"/g))assert(worker.includes(match[1]),folder+': '+match[1]);
 }
 assert(read('deutsch/assessments.js').includes('answerAudioAfterResponse:true'));
});
