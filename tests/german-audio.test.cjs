const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
function environment(){
 const dom=new JSDOM('<main id="view"></main>',{runScripts:'outside-only',url:'https://example.org/deutsch/'}),w=dom.window,audio=[];
 w.scrollTo=()=>{};w.A1Voice={speak:(text,opts)=>audio.push({text,opts}),cancel:()=>{}};
 for(const f of ['deutsch/pronouns.js','deutsch/answer-audio.js','shared/exercise-review.js','shared/exercise-engine.js','deutsch/comprehension-content.js','shared/comprehension.js'])w.eval(read(f));
 return {dom,w,view:w.document.querySelector('main'),audio};
}
test('German answers autoplay once, replay repeatedly and restore without playing or scoring again',()=>{
 const {dom,w,view,audio}=environment(),progress={},lesson={id:1,phrases:[['Ich wohne in Bonn.','J’habite à Bonn.']]};
 const q={type:'choice',q:'Que signifie « Ich wohne in Bonn. » ?',o:['J’habite à Bonn.','J’habite à Berlin.','Je viens de Bonn.'],a:0,answer:'J’habite à Bonn.'};
 const run=()=>w.A1ExerciseEngine.run({lesson,view,exercises:[q],progress,targetLang:'de',uiLang:'fr',playAudio:t=>w.DE_A1_ANSWER_AUDIO.play(t),saveProgress:()=>{},onBack:()=>{},onFinish:()=>{}});
 run();view.querySelector('[data-o="0"]').click();assert.equal(audio.length,1);assert.equal(audio[0].text,'Ich wohne in Bonn.');assert.equal(audio[0].opts.lang,'de-DE');
 view.querySelector('[data-answer-replay]').click();view.querySelector('[data-answer-replay]').click();assert.equal(audio.length,3);assert.equal(progress.session.score,1);
 run();assert.equal(audio.length,3);assert(view.querySelector('[data-answer-replay]'));view.querySelector('[data-answer-replay]').click();assert.equal(audio.length,4);assert.equal(progress.session.score,1);dom.window.close();
});
test('German gap fallback fills all slots and wrong selections always play the correct solution',()=>{
 const {dom,w,view,audio}=environment();assert.equal(w.DE_A1_ANSWER_AUDIO.resolve({q:'Complète : Wir ___ um sieben Uhr ___.',o:['stehen / auf'],a:0}),'Wir stehen um sieben Uhr auf.');
 const q={type:'choice',q:'Complète : Du ___ in Bonn.',o:['wohnst','wohne','wohnen'],a:0,answer:'wohnst'};
 w.A1ExerciseEngine.run({lesson:{id:1},view,exercises:[q],targetLang:'de',uiLang:'fr',playAudio:t=>w.DE_A1_ANSWER_AUDIO.play(t),onBack:()=>{},onFinish:()=>{}});
 view.querySelector('[data-o="1"]').click();assert.equal(audio.at(-1).text,'Du wohnst in Bonn.');view.querySelector('[data-answer-replay]').click();assert.equal(audio.at(-1).text,'Du wohnst in Bonn.');dom.window.close();
});
test('German review history keeps replay active without re-enabling answer buttons',()=>{
 const {dom,w,view,audio}=environment(),q={type:'choice',q:'Complète : Ich ___ hier.',o:['wohne','wohnst','wohnt'],a:0,answer:'wohne',audio:'Ich wohne hier.'};
 w.A1ExerciseEngine.run({lesson:{id:1},view,exercises:[q,{...q,q:'Complète : Ich ___ in Bonn.',audio:'Ich wohne in Bonn.'}],targetLang:'de',uiLang:'fr',review:true,playAudio:t=>w.DE_A1_ANSWER_AUDIO.play(t),onBack:()=>{},onFinish:()=>{}});
 view.querySelector('[data-o="0"]').click();view.querySelector('#mixedNext').click();view.querySelector('.exercise-review-nav button').click();
 const replay=view.querySelector('[data-answer-replay]');assert(!replay.disabled);assert([...view.querySelectorAll('[data-o]')].every(b=>b.disabled));replay.click();assert.equal(audio.at(-1).text,'Ich wohne hier.');dom.window.close();
});
test('German comprehension plays one combined correction and each correct answer remains replayable',()=>{
 const {dom,w,view,audio}=environment(),work={},data=w.A1_COMPREHENSION_CONTENT[1];let saves=0;
 const render=()=>w.A1Comprehension.render({root:view,data,work,lessonId:1,targetLang:'de',uiLang:'fr',save:()=>saves++,onContinue:()=>{}});
 render();data.fields.forEach((f,i)=>{const input=[...view.querySelectorAll(`[data-comprehension-answer="${i}"]`)].find(b=>b.value===f.answer);input.click();});
 assert.equal(audio.length,0);view.querySelector('#dialogueCheck').click();assert.equal(audio.length,1);assert.equal(audio[0].text,data.fields.map(f=>f.answer).join('. '));
 const saved=saves;view.querySelectorAll('[data-answer-replay]').forEach((b,i)=>{b.click();assert.equal(audio.at(-1).text,data.fields[i].answer);});assert.equal(saves,saved);
 render();assert.equal(audio.length,4);assert.equal(view.querySelectorAll('[data-answer-replay]').length,3);dom.window.close();
});
function standalone(){
 const env=environment(),{w,audio}=env;w.qaAudio=audio;
 w.eval(`var view=document.querySelector('main'),state={masteredListening:[],masteredReading:[],grammarBest:{},writingDone:[]},grammarSets=[{id:'test',title:'Test',questions:[{q:'Complète : Ich ___ hier.',o:['wohne','wohnst','wohnt'],a:0}]}];var esc=s=>String(s),shuffle=a=>[...a],save=()=>{},normalize=s=>s.toLowerCase().trim(),randomItem=a=>a[0];var practiceProgress={record:()=>{},recordGrammar:()=>{}},A1Streak={completeExercise:()=>{}};function renderGrammarMenu(){}function renderListeningMenu(){}function renderReadingMenu(){}function renderWritingMenu(){}function renderExam(){}function playCorrectAudio(t){qaAudio.push({text:t});}function speak(t){qaAudio.push({text:t});}`);
 const app=read('deutsch/app.js');for(const [start,end]of [['function startGrammarSet','function renderVocab'],['function renderListeningTask','function renderReadingMenu'],['function renderReadingTask','function renderWritingMenu'],['function renderFormTask','function renderEmailTask']])w.eval(app.slice(app.indexOf(start),app.indexOf(end)));
 return env;
}
test('standalone German grammar and reading autoplay, while listening corrections stay manual',()=>{
 const {dom,w,view,audio}=standalone();w.startGrammarSet('test');view.querySelector('[data-o="0"]').click();assert.equal(audio.at(-1).text,'Ich wohne hier.');view.querySelector('[data-answer-replay]').click();assert.equal(audio.length,2);
 for(const exam of [false,true]){
  for(const part of [1,2,3,4]){
   const task={id:'hear-'+part,q:'Was kostet das?',statement:'Das kostet drei Euro.',speech:'Das kostet zwei Euro.',o:['zwei Euro','drei Euro','vier Euro'],a:part===2?false:0};
   w.renderListeningTask(part,task,exam);const before=audio.length;view.querySelector('[data-o="1"]').click();assert.equal(audio.length,before);view.querySelector('[data-answer-replay]').click();assert.equal(audio.length,before+1);assert.match(audio.at(-1).text,part===2?/Falsch.*zwei Euro/:/zwei Euro/);
  }
  for(const part of [1,2,3,4]){
   const task={id:'read-'+part,q:'Was kostet das?',need:'Eine Fahrkarte',text:'Die Fahrkarte kostet zwei Euro.',statement:'Die Fahrkarte kostet drei Euro.',where:'Am Bahnhof',sign:'Heute geschlossen.',aText:'Die Fahrkarte kostet zwei Euro.',bText:'Die Fahrkarte kostet drei Euro.',o:['zwei Euro','drei Euro','vier Euro'],a:part===1||part===3?false:0};
   w.renderReadingTask(part,task,exam);const before=audio.length;view.querySelector('[data-o="0"]').click();assert.equal(audio.length,before+1);assert(!/Falsch.*kostet drei Euro/.test(audio.at(-1).text));view.querySelector('[data-answer-replay]').click();assert.equal(audio.length,before+2);
  }
 }
 dom.window.close();
});
test('French exercise feedback is unchanged even when the German helper is present',()=>{
 const {dom,w,view}=environment(),audio=[];w.A1ExerciseEngine.run({lesson:{id:1},view,targetLang:'fr',uiLang:'de',exercises:[{type:'choice',q:'Bonjour?',o:['Hallo','Danke'],a:0,answer:'Hallo',audio:'Bonjour'}],playAudio:t=>audio.push(t),onBack:()=>{},onFinish:()=>{}});view.querySelector('[data-o="0"]').click();assert.deepEqual(audio,['Bonjour']);assert(!view.querySelector('[data-answer-replay]'));dom.window.close();
});

test('German form corrections have replay and never read an incorrect entered value',()=>{
 const {dom,w,view,audio}=standalone();w.renderFormTask({id:'form-test',situation:'Anna wohnt in Bonn.',fields:[{label:'Vorname',answers:['Anna']},{label:'Wohnort',answers:['Bonn']}]});
 view.querySelector('#field0').value='Wrong name';view.querySelector('#field1').value='Wrong city';view.querySelector('#checkForm').click();assert.equal(audio.at(-1).text,'Anna. Bonn');
 view.querySelector('[data-answer-replay]').click();assert.equal(audio.at(-1).text,'Anna. Bonn');assert.equal(audio.length,2);dom.window.close();
});
