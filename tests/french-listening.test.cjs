const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const root=path.join(__dirname,'..');
function environment(){const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/francais/',runScripts:'outside-only'}),w=dom.window;w.scrollTo=()=>{};w.Math.random=()=>.999;for(const p of ['francais/data.js','shared/exercise-engine.js'])w.eval(fs.readFileSync(path.join(root,p),'utf8'));return {dom,w,view:w.document.getElementById('view')};}
test('all French lessons use ten authored questions with unique options and a valid answer',()=>{
 const {dom,w}=environment();
 for(const lesson of w.FR_A1_DATA.lessons){const tasks=w.A1ExerciseEngine.makeAuthored(lesson);assert.equal(tasks.length,10,`lesson ${lesson.id}`);assert.equal(new Set(tasks.map(q=>q.q||q.prompt)).size,10);for(const q of tasks){assert(q.answer);assert(q.audio,`lesson ${lesson.id}: ${q.q||q.prompt}`);if(q.o){assert.equal(new Set(q.o).size,q.o.length);assert.equal(q.o[q.a],q.answer);}if(q.type==='gap'){assert(q.context);assert(!/^(est|plaît)$/.test(q.answer));}}}
 const lesson=w.FR_A1_DATA.lessons[1],tasks=w.A1ExerciseEngine.makeAuthored(lesson);
 assert.deepEqual([...tasks.filter(t=>t.type==='gap').map(t=>t.answer)],['épeler','prénom','famille']);
 assert(!tasks.some(t=>/M\s*[–-]|A bis M|N bis Z|buchstabierst|Lies den Dialog/.test(JSON.stringify(t))));
 const request=tasks.find(t=>t.q?.startsWith('Was bedeutet „Vous pouvez'));assert.equal(request.o.length,3);assert(request.o.every(o=>o.startsWith('Können Sie')));
 dom.window.close();
});
test('leaving and reloading resumes question order, graded feedback and input without duplicate scoring',()=>{
 const {dom,w,view}=environment(),lesson=w.FR_A1_DATA.lessons[1],progress={},audio=[];let completed=null,saves=0;
 const run=()=>w.A1ExerciseEngine.run({lesson,view,targetLang:'fr',uiLang:'de',exercises:w.A1ExerciseEngine.makeAuthored(lesson),progress,exerciseVersion:94,saveProgress:()=>saves++,playAudio:t=>audio.push(t),onBack:()=>view.replaceChildren(),onFinish:(score,total)=>completed={score,total}});
 run();const first=view.querySelector('.quiz-q').textContent;
 view.querySelector(`[data-o="${progress.session.ex[0].a}"]`).click();assert.equal(progress.session.score,1);assert.equal(audio.length,1);
 view.querySelector('#mixedBack').click();run();assert.equal(view.querySelector('.quiz-q').textContent,first);assert(view.querySelector('#mixedNext'));assert.equal(progress.session.score,1);assert.equal(audio.length,1);
 view.querySelector('#mixedNext').click();assert.equal(progress.session.i,1);
 while(progress.session.i<5){view.querySelector(`[data-o="${progress.session.ex[progress.session.i].a}"]`).click();view.querySelector('#mixedNext').click();}
 const input=view.querySelector('#mixedInput');input.value='épe';input.dispatchEvent(new w.Event('input'));
 const serialized=JSON.parse(JSON.stringify(progress));view.querySelector('#mixedBack').click();Object.assign(progress,serialized);run();assert.equal(view.querySelector('#mixedInput').value,'épe');
 while(progress.session){const q=progress.session.ex[progress.session.i];if(q.type==='gap'){const input=view.querySelector('#mixedInput');input.value=q.answer;input.dispatchEvent(new w.Event('input'));view.querySelector('#mixedCheck').click();}else view.querySelector(`[data-o="${q.a}"]`).click();view.querySelector('#mixedNext').click();}
 assert.deepEqual(completed,{score:10,total:10});assert(saves>10);assert(!progress.session);assert.equal(audio.length,10);dom.window.close();
});
test('legacy callers keep the existing generator and need no persistence options',()=>{
 const {dom,w}=environment();const legacy=w.A1ExerciseEngine.make({id:1,phrases:[['Hallo','Bonjour'],['Danke','Merci'],['Tschüss','Au revoir']],quiz:[]},1,'fr');assert(legacy.length);dom.window.close();
});
test('partial sentence construction survives leaving the exercise',()=>{
 const {dom,w,view}=environment(),lesson=w.FR_A1_DATA.lessons[7],progress={};
 const tasks=w.A1ExerciseEngine.makeAuthored(lesson),index=tasks.findIndex(q=>q.type==='order');assert(index>=0);
 progress.session={version:94,ex:tasks,i:index,score:0,response:null,draft:'',orderPicked:[]};
 const run=()=>w.A1ExerciseEngine.run({lesson,view,targetLang:'fr',uiLang:'de',progress,exerciseVersion:94,playAudio:()=>{},onBack:()=>view.replaceChildren(),onFinish:()=>{}});
 run();view.querySelector('.mixed-token').click();const text=view.querySelector('#orderAnswer').textContent;
 view.querySelector('#mixedBack').click();run();assert.equal(view.querySelector('#orderAnswer').textContent,text);assert.equal(view.querySelectorAll('.mixed-token:disabled').length,1);dom.window.close();
});
