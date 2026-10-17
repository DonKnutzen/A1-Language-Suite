const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const root=path.join(__dirname,'..');
function environment(){const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/francais/',runScripts:'outside-only'}),w=dom.window;w.scrollTo=()=>{};w.Math.random=()=>.999;for(const p of ['francais/data.js','francais/intro-listening.js','shared/exercise-review.js','shared/exercise-engine.js'])w.eval(fs.readFileSync(path.join(root,p),'utf8'));return {dom,w,view:w.document.getElementById('view')};}
test('all French lessons use ten authored questions with unique options and a valid answer',()=>{
 const {dom,w}=environment();
 for(const lesson of w.FR_A1_DATA.lessons){const tasks=w.A1ExerciseEngine.makeAuthored(lesson);assert.equal(tasks.length,10,`lesson ${lesson.id}`);assert.equal(new Set(tasks.map(q=>q.q||q.prompt)).size,10);for(const q of tasks){assert(q.answer);assert(q.audio,`lesson ${lesson.id}: ${q.q||q.prompt}`);if(q.o){assert.equal(new Set(q.o).size,q.o.length);assert.equal(q.o[q.a],q.answer);}assert(['choice','listening'].includes(q.type));}}
 const lesson=w.FR_A1_DATA.lessons[1],tasks=w.A1ExerciseEngine.makeAuthored(lesson);
 assert.equal(tasks.filter(t=>t.type==='listening').length,1);
 assert(tasks.filter(t=>t.q?.includes('___')).every(t=>t.type==='choice'));
 assert(!tasks.some(t=>/M\s*[–-]|A bis M|N bis Z|buchstabierst|Lies den Dialog/.test(JSON.stringify(t))));
 const request=tasks.find(t=>t.q?.startsWith('Was bedeutet „Vous pouvez'));assert.equal(request.o.length,3);assert(request.o.every(o=>o.startsWith('Können Sie')));
 dom.window.close();
});
test('leaving and reloading resumes question order and graded feedback without duplicate scoring',()=>{
 const {dom,w,view}=environment(),lesson=w.FR_A1_DATA.lessons[1],progress={},audio=[];let completed=null,saves=0;
 const run=()=>w.A1ExerciseEngine.run({lesson,view,targetLang:'fr',uiLang:'de',exercises:w.A1ExerciseEngine.makeAuthored(lesson),progress,exerciseVersion:94,saveProgress:()=>saves++,playAudio:t=>audio.push(t),onBack:()=>view.replaceChildren(),onFinish:(score,total)=>completed={score,total}});
 run();const first=view.querySelector('.quiz-q').textContent;
 view.querySelector(`[data-o="${progress.session.ex[0].a}"]`).click();assert.equal(progress.session.score,1);assert.equal(audio.length,1);assert.equal(view.querySelectorAll('.answer-success').length,1);
 view.querySelector('#mixedBack').click();run();assert.equal(view.querySelector('.quiz-q').textContent,first);assert(view.querySelector('#mixedNext'));assert.equal(view.querySelectorAll('.answer-success').length,0);assert.equal(progress.session.score,1);assert.equal(audio.length,1);
 view.querySelector('#mixedNext').click();assert.equal(progress.session.i,1);
 while(progress.session.i<5){view.querySelector(`[data-o="${progress.session.ex[progress.session.i].a}"]`).click();view.querySelector('#mixedNext').click();}
 while(progress.session){const q=progress.session.ex[progress.session.i];if(q.type==='gap'){const input=view.querySelector('#mixedInput');input.value=q.answer;input.dispatchEvent(new w.Event('input'));view.querySelector('#mixedCheck').click();}else view.querySelector(`[data-o="${q.a}"]`).click();view.querySelector('#mixedNext').click();}
 assert.deepEqual(completed,{score:10,total:10});assert(saves>10);assert(!progress.session);assert.equal(audio.length,10);dom.window.close();
});
test('legacy callers keep the existing generator and need no persistence options',()=>{
 const {dom,w}=environment();const legacy=w.A1ExerciseEngine.make({id:1,phrases:[['Hallo','Bonjour'],['Danke','Merci'],['Tschüss','Au revoir']],quiz:[]},1,'fr');assert(legacy.length);dom.window.close();
});
test('partial sentence construction survives leaving the exercise',()=>{
 const {dom,w,view}=environment(),lesson=w.FR_A1_DATA.lessons[7],progress={};
 const tasks=[{type:'order',context:'Ich wohne in Paris.',answer:'J’habite à Paris',tokens:[{id:0,w:'J’habite'},{id:1,w:'à'},{id:2,w:'Paris'}],audio:'J’habite à Paris.'}],index=0;
 progress.session={version:94,ex:tasks,i:index,score:0,response:null,draft:'',orderPicked:[]};
 const run=()=>w.A1ExerciseEngine.run({lesson,view,targetLang:'fr',uiLang:'de',progress,exerciseVersion:94,playAudio:()=>{},onBack:()=>view.replaceChildren(),onFinish:()=>{}});
 run();view.querySelector('.mixed-token').click();const text=view.querySelector('#orderAnswer').textContent;
 view.querySelector('#mixedBack').click();run();assert.equal(view.querySelector('#orderAnswer').textContent,text);assert.equal(view.querySelectorAll('.mixed-token:disabled').length,1);dom.window.close();
});
test('review shows a previous answer read-only and returns to the live question without rescoring',()=>{
 const {dom,w,view}=environment(),lesson=w.FR_A1_DATA.lessons[1],progress={},audio=[];
 w.A1ExerciseEngine.run({lesson,view,targetLang:'fr',uiLang:'de',exercises:w.A1ExerciseEngine.makeAuthored(lesson),progress,playAudio:t=>audio.push(t),onBack:()=>{},onFinish:()=>{}});
 const first=view.querySelector('.quiz-q').textContent;view.querySelector(`[data-o="${progress.session.ex[0].a}"]`).click();view.querySelector('#mixedNext').click();
 const second=view.querySelector('.quiz-q').textContent;view.querySelector('.exercise-review-nav button').click();
 assert.equal(view.querySelector('.quiz-q').textContent,first);assert([...view.querySelectorAll('.option-btn')].every(b=>b.disabled));assert.equal(view.querySelectorAll('.answer-success').length,0);assert(!view.querySelector('#mixedNext'));
 view.querySelector('.exercise-review-nav .primary-btn').click();assert.equal(view.querySelector('.quiz-q').textContent,second);assert.equal(progress.session.score,1);assert.equal(audio.length,1);
 view.querySelector(`[data-o="${progress.session.ex[1].a}"]`).click();assert.equal(progress.session.score,2);dom.window.close();
});
test('lesson checks use authored vocabulary instead of generating alphabet translation questions',()=>{
 const {dom,w,view}=environment();for(const file of ['francais/mastery-specs.js','francais/mastery.js'])w.eval(fs.readFileSync(path.join(root,file),'utf8'));
 for(const l of w.FR_A1_DATA.lessons){const tasks=w.FR_A1_MASTERY.makeLessonTest(l);assert.equal(w.FR_A1_MASTERY.testCount(l.id),tasks.length);assert(tasks.length>=10);if(l.id!==1)assert(!tasks.some(q=>/A bis M|N bis Z|Was bedeutet „M –|Was bedeutet „avec|Was bedeutet „Ça s’écrit/.test(JSON.stringify(q))));}
 const l=w.FR_A1_DATA.lessons[1],tasks=w.FR_A1_MASTERY.makeLessonTest(l),family=tasks.find(q=>q.prompt==='Mon ___ est Dupont.');assert.equal(family.answer,'nom de famille');
 w.FR_A1_MASTERY.renderLessonTest({lesson:l,view,state:{},save:()=>{},onBack:()=>{},speak:()=>{}});view.querySelector('#masteryStart').click();
 const first=view.querySelector('.quiz-q').textContent;view.querySelector('[data-mastery-o]').click();view.querySelector('#masteryNext').click();view.querySelector('.exercise-review-nav button').click();assert.equal(view.querySelector('.quiz-q').textContent,first);assert([...view.querySelectorAll('.option-btn')].every(b=>b.disabled));dom.window.close();
});
test('final lesson checks resume submitted feedback and draft without scoring twice',()=>{
 const {dom,w,view}=environment();for(const file of ['francais/mastery-specs.js','francais/mastery.js'])w.eval(fs.readFileSync(path.join(root,file),'utf8'));
 const state={},lesson=w.FR_A1_DATA.lessons[3];let saves=0;
 const run=()=>{w.FR_A1_MASTERY.renderLessonTest({lesson,view,state,save:()=>saves++,onBack:()=>{},speak:()=>{}});view.querySelector('#masteryStart').click();};
 run();const progress=state.lessonCheckProgress[lesson.id],task=progress.session.ex[0];
 if(task.type==='choice')view.querySelector(`[data-mastery-o="${task.o.indexOf(task.answer)}"]`).click();
 else{const input=view.querySelector('#masteryInput');input.value=task.answer;input.dispatchEvent(new w.Event('input'));view.querySelector('#masteryCheck').click();}
 assert.equal(progress.session.score,1);const feedback=view.querySelector('#masteryFeedback').textContent;
 run();assert.equal(progress.session.score,1);assert.equal(view.querySelector('#masteryFeedback').textContent,feedback);
 view.querySelector('#masteryNext').click();assert.equal(progress.session.i,1);assert.equal(progress.session.score,1);assert(saves>0);dom.window.close();
});
test('dialogue questions render separate speakers and escape markup',()=>{
 const {dom,w}=environment();const html=w.A1ExerciseReview.question('Lies den Dialog: Bonjour. / Salut.\nQue dit B ?');
 const root=w.document.createElement('div');root.innerHTML=html;assert.equal(root.querySelectorAll('.exercise-dialogue p').length,2);assert(root.textContent.includes('B: Salut.'));assert.equal(w.A1ExerciseReview.question('<img>'),'&lt;img&gt;');dom.window.close();
});
test('every initial round offers choices only, with an unheard-in-the-test phrase and close audio alternatives',()=>{
 const {dom,w,view}=environment();
 for(const lesson of w.FR_A1_DATA.lessons){
  const tasks=w.A1ExerciseEngine.makeAuthored(lesson),heard=tasks.find(t=>t.type==='listening');assert(heard);assert(lesson.phrases.some(p=>p[0]===heard.audio));assert.equal(heard.explanation,lesson.phrases.find(p=>p[0]===heard.audio)[1]);assert(!tasks.some(t=>t!==heard&&t.audio===heard.audio));assert.equal(new Set(heard.o).size,3);
  let complete=false;w.A1ExerciseEngine.run({lesson,view,targetLang:'fr',uiLang:'de',exercises:tasks,selectionOnly:true,playAudio:()=>{},onBack:()=>{},onFinish:()=>complete=true});
  for(const q of tasks){assert(!view.querySelector('#mixedInput,textarea,.mixed-token'));view.querySelector(`[data-o="${q.a}"]`).click();if(q.type==='listening')assert(view.querySelector('#mixedFeedback').textContent.includes(q.explanation));view.querySelector('#mixedNext').click();}assert(complete);
 }
 dom.window.close();
});
test('interrupted old intro sessions keep points and position while pending typing and order tasks become choices',()=>{
 const {dom,w,view}=environment(),lesson=w.FR_A1_DATA.lessons[1],tasks=w.A1ExerciseEngine.makeAuthored(lesson);
 tasks[2]={type:'gap',prompt:'Mon ___ est Dupont.',answer:'nom de famille',audio:'Mon nom de famille est Dupont.'};tasks[4]={type:'order',q:'Wie fragst du „Wie schreibt man das?“?',answer:'Comment ça s’écrit',audio:'Comment ça s’écrit ?'};
 const progress={session:{version:97,ex:tasks,i:2,score:1,response:null,draft:'nom',orderPicked:[]}};
 w.A1ExerciseEngine.run({lesson,view,targetLang:'fr',uiLang:'de',exercises:w.A1ExerciseEngine.makeAuthored(lesson),progress,exerciseVersion:97,selectionOnly:true,saveProgress:()=>{},playAudio:()=>{},onBack:()=>{},onFinish:()=>{}});
 assert.equal(progress.session.i,2);assert.equal(progress.session.score,1);assert(!view.querySelector('input,textarea,.mixed-token'));assert.equal(progress.session.ex[4].type,'choice');view.querySelector(`[data-o="${progress.session.ex[2].a}"]`).click();assert.equal(progress.session.score,2);dom.window.close();
});
test('later exercise pools still allow typed gaps and retain unfinished input',()=>{
 const {dom,w,view}=environment(),progress={},lesson={id:2},tasks=[{type:'gap',prompt:'Vous pouvez ___ ?',answer:'épeler',audio:'Vous pouvez épeler ?'}];
 const run=()=>w.A1ExerciseEngine.run({lesson,view,targetLang:'fr',uiLang:'de',exercises:tasks,progress,playAudio:()=>{},onBack:()=>view.replaceChildren(),onFinish:()=>{}});
 run();view.querySelector('#mixedInput').value='épe';view.querySelector('#mixedInput').dispatchEvent(new w.Event('input'));view.querySelector('#mixedBack').click();run();assert.equal(view.querySelector('#mixedInput').value,'épe');dom.window.close();
});
test('introductory cloze choices retain the meaning hint that makes the missing word unambiguous',()=>{
 const {dom,w,view}=environment(),lesson=w.FR_A1_DATA.lessons[1],q=w.A1ExerciseEngine.makeAuthored(lesson).find(t=>t.q==='Mon ___ est Sophie.');
 assert(q.context);w.A1ExerciseEngine.run({lesson,view,targetLang:'fr',uiLang:'de',selectionOnly:true,exercises:[q],playAudio:()=>{},onBack:()=>{},onFinish:()=>{}});assert(view.querySelector('.mixed-context').textContent.includes(q.context));assert.equal(view.querySelectorAll('.option-btn').length,3);assert(!view.querySelector('input'));
 w.eval(fs.readFileSync(path.join(root,'francais/en.js'),'utf8'));w.eval(fs.readFileSync(path.join(root,'francais/i18n.js'),'utf8'));assert.equal(w.A1FrenchI18n.translate('Weiter zur Vertiefung'),'Continue to practice & patterns');dom.window.close();
});
test('an already graded listening question also shows its translation when an old session is reopened',()=>{
 const {dom,w,view}=environment(),lesson=w.FR_A1_DATA.lessons[0],q=w.A1ExerciseEngine.makeAuthored(lesson).find(t=>t.type==='listening');delete q.explanation;
 const progress={session:{version:97,ex:[q],i:0,score:1,response:{status:'ok',answer:q.answer,audio:q.audio},draft:'',choicePicked:q.a}};
 w.A1ExerciseEngine.run({lesson,view,targetLang:'fr',uiLang:'de',exercises:[q],progress,exerciseVersion:97,selectionOnly:true,finishLabel:'Weiter zur Vertiefung',playAudio:()=>{},onBack:()=>{},onFinish:()=>{}});
 assert(view.querySelector('#mixedFeedback').textContent.includes(lesson.phrases.find(p=>p[0]===q.audio)[1]));assert.equal(view.querySelector('#mixedNext').textContent,'Weiter zur Vertiefung');assert.equal(progress.session.score,1);dom.window.close();
});
