const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=f=>fs.readFileSync(path.join(__dirname,'..','..',f),'utf8');
function environment(state={doneLessons:[1,2],lessonMasteryBest:{1:91},lessonWork:{}}){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/francais/',runScripts:'outside-only'}),w=dom.window;let saves=0,completed=0,lang='de';
 w.scrollTo=()=>{};w.A1Profile={getUiLang:()=>lang};w.A1Voice={cancel(){},speakDialogue(){return false;}};
 for(const f of ['shared/learning.js','francais/data.js','francais/mastery-specs.js','francais/mastery.js','shared/exercise-engine.js','shared/grammar-ui.js','shared/lesson-topic-info.js','francais/deepening-content.js','francais/grammar-practice.js','francais/deepening.js','francais/lesson1-practice.js','francais/comprehension-content.js','francais/hard-mode-content.js','francais/hard-mode.js','francais/review-practice.js'])w.eval(read(f));
 w.esc=s=>{const el=w.document.createElement('span');el.textContent=s;return el.innerHTML;};const app=read('francais/app.js');w.eval(app.slice(app.indexOf('const GRAMMAR_GUIDES='),app.indexOf('function renderGrammarIntro('))+'window.grammarHtml=lessonGrammarHtml;');
 const view=w.document.querySelector('main'),api=w.FR_A1_REVIEW;
 const save=done=>{saves++;if(done)completed++;};
 const render=(options={})=>api.render({view,lessons:w.FR_A1_DATA.lessons,state,save,onBack(){view.innerHTML='Home';},speak(){},grammarHtml:w.grammarHtml,...options});
 const click=s=>{assert(view.querySelector(s),s);view.querySelector(s).click();};
 return {dom,w,api,state,view,render,save,click,get saves(){return saves;},get completed(){return completed;},language(value){lang=value;w.dispatchEvent(new w.Event('a1suite:languagechange'));}};
}
test('bank uses only completed lessons, all topics have valid answers and selection never duplicates tasks',()=>{
 const e=environment();e.state.doneLessons=[];assert.equal(e.api.buildBank(e.w.FR_A1_DATA.lessons,e.state,e.w.grammarHtml).length,0);
 e.state.doneLessons=[1,5];const bank=e.api.buildBank(e.w.FR_A1_DATA.lessons,e.state,e.w.grammarHtml);assert(bank.length>100);
 assert(bank.every(q=>[1,5].includes(q.lessonId)&&q.answer));
 assert(bank.some(q=>q.topic==='l1:etre'));assert(bank.filter(q=>q.lessonId===5&&q.topic==='grammar:r0').length>=24);
 const round=e.api.choose(bank,20);assert.equal(round.length,20);assert.equal(new Set(round.map(q=>JSON.stringify([q.lessonId,q.q,q.context,q.answer,q.turns,q.speech]))).size,20);assert(new Set(round.map(q=>q.lessonId)).size===2);
 for(const q of bank){assert(e.api.accepted(q,q.answer));if(q.o){assert(q.o.includes(q.answer));assert(q.o.length>=2);}}
 e.dom.window.close();
});
test('all 24 lessons supply grammar-only rounds without padding small topic pools',()=>{
 const e=environment();for(let id=1;id<=24;id++){e.state.doneLessons=[id];const bank=e.api.buildBank(e.w.FR_A1_DATA.lessons,e.state,e.w.grammarHtml);const round=e.api.choose(bank,20);assert(round.length>0&&round.length<=20,`L${id}`);assert(round.length<=bank.length);assert(bank.every(q=>q.topic.startsWith('grammar:')||q.topic.startsWith('l1:')));assert(bank.every(q=>!q.turns&&!q.speech));assert(bank.every(q=>q.lessonId===id));}e.dom.window.close();
});
test('mistakes persist by profile, are cleared after two correct reviews, and return on new errors',()=>{
 const e=environment(),q=e.api.task(1,'check','Check',{prompt:'Vous ___ allemand.',answer:'êtes'});
 e.api.record(e.state,q,true);assert.equal(e.api.pending(e.state).length,0);
 e.api.record(e.state,q,false);e.api.record(e.state,q,true);assert.equal(e.api.pending(e.state).length,1);
 e.api.record(e.state,q,true,true);assert.equal(e.api.pending(e.state).length,1);
 const saved=JSON.parse(JSON.stringify(e.state));e.dom.window.close();const restored=environment(saved);
 restored.api.record(saved,q,true,true);assert.equal(restored.api.pending(saved).length,0);restored.api.record(saved,q,false);assert.equal(restored.api.pending(saved).length,1);
 assert.equal(restored.api.pending({}).length,0);
 const changed=restored.api.task(1,'check','Check',{prompt:'Vous ___ allemands.',answer:'êtes'});assert.notEqual(changed.id,q.id);restored.dom.window.close();
});
test('paused drafts, checked answers, option order and scores survive reopen without recording twice',()=>{
 const e=environment();e.render();e.click('#reviewStart');let s=e.state.reviewPractice.session,q=s.tasks[0];
 if(q.kind==='choice'){e.click(`[data-review-option="${s.order.indexOf(q.answer)}"]`);}else{const input=e.view.querySelector('#reviewInput');input.value=q.answer;input.dispatchEvent(new e.w.Event('input'));e.click('#reviewCheck');}
 assert.equal(s.answers.length,1);e.render();e.click('#reviewResume');assert(e.view.querySelector('#reviewNext'));assert.equal(s.answers.length,1);
 e.language('en');assert(e.view.querySelector('#reviewNext'));assert(e.view.textContent.includes('Correct'));
 e.click('#reviewNext');s=e.state.reviewPractice.session;
 const saved=JSON.parse(JSON.stringify(e.state));e.dom.window.close();const r=environment(saved);r.render();r.click('#reviewResume');assert.equal(saved.reviewPractice.session.index,1);assert.equal(saved.lessonMasteryBest[1],91);assert.equal(r.completed,0);r.dom.window.close();
});
test('custom selection limits the pool, reports short rounds, and empty selection cannot start',()=>{
 const e=environment();e.render();e.click('[value="custom"]');e.click('#reviewNone');assert(e.view.querySelector('#reviewStart').disabled);
 const el=e.view.querySelector('[data-review-topic="1:l1:etre"]');assert(el);el.click();
 e.view.querySelector('#reviewCount').value='20';e.view.querySelector('#reviewCount').dispatchEvent(new e.w.Event('change'));
 e.click('#reviewStart');const tasks=e.state.reviewPractice.session.tasks;assert(tasks.length<=20);assert(tasks.every(q=>q.topic==='l1:etre'&&q.lessonId===1));e.dom.window.close();
});
test('new rounds require explicit replacement; mistake rounds accept unfinished lessons and keep achievements',()=>{
 const e=environment({doneLessons:[],lessonMasteryBest:{1:95},lessonWork:{}});const q=e.api.task(3,'grammar:r0','avoir',{q:'Tu ___ vingt ans.',answer:'as',o:['as','a','ai']});e.api.record(e.state,q,false);
 e.render();e.click('[value="mistakes"]');e.click('#reviewStart');assert.equal(e.state.reviewPractice.session.tasks.length,1);e.click('#reviewPause');const previous=e.state.reviewPractice.session;e.click('#reviewStart');assert.equal(e.state.reviewPractice.session,previous);e.click('#reviewReplace');assert.notEqual(e.state.reviewPractice.session,previous);
 e.click(`[data-review-option="${e.state.reviewPractice.session.order.indexOf('as')}"]`);e.click('#reviewNext');assert.equal(e.completed,1);assert.equal(e.state.lessonMasteryBest[1],95);assert.equal(e.api.pending(e.state).length,1);e.dom.window.close();
});
test('session imports do not double count; strict accents and hard-mode alternatives retain marking policy',()=>{
 const e=environment(),s={ex:[{type:'choice',q:'Bonjour ?',o:['Guten Tag','Gute Nacht'],a:0,answer:'Guten Tag'}],i:0,response:{status:'bad'}};
 e.api.captureSession(e.state,1,s);e.api.captureSession(e.state,1,s);assert.equal(e.api.pending(e.state)[0].wrong,1);
 const strict=e.api.task(2,'hard','Hard',{q:'accent',answer:'é',marking:{strictAccents:true}});assert(!e.api.accepted(strict,'e'));assert(e.api.accepted(strict,'é'));
 const normal=e.api.task(2,'check','Check',{prompt:'Vous ___',answer:'êtes'});assert(e.api.accepted(normal,' ETES '));
 const data=e.w.FR_A1_HARD_CONTENT[1],a={submittedAt:Date.now(),gaps:data.gaps.map(g=>g.answers[0]),listening:data.listening.flatMap(b=>b.questions).map(q=>q.answers[0])};a.listening[0]='incorrect';
 e.api.captureHard(e.state,1,data,a);const n=e.api.pending(e.state).length;e.api.captureHard(e.state,1,data,a);assert.equal(e.api.pending(e.state).length,n);assert(e.api.pending(e.state).some(x=>x.task.topic==='hard-listening'&&x.task.turns.length));e.dom.window.close();
});
test('production lesson check records each new answer once and does not count restored feedback again',()=>{
 const e=environment({doneLessons:[],lessonMasteryBest:{},lessonWork:{}}),lesson=e.w.FR_A1_DATA.lessons[0];
 e.w.FR_A1_MASTERY.renderLessonTest({lesson,view:e.view,state:e.state,save:e.save,onBack(){},speak(){}});e.click('#masteryStart');
 const q=e.state.lessonCheckProgress[1].session.ex[0];const wrong=[...e.view.querySelectorAll('[data-mastery-o]')].find(b=>b.textContent!==q.answer);wrong.click();assert.equal(e.api.pending(e.state).length,1);
 e.w.FR_A1_MASTERY.renderLessonTest({lesson,view:e.view,state:e.state,save:e.save,onBack(){},speak(){}});e.click('#masteryStart');assert.equal(e.api.pending(e.state)[0].wrong,1);e.dom.window.close();
});
test('lesson listening records only checked answers once; retries can add new mistakes',()=>{
 const e=environment(),data=e.w.A1_COMPREHENSION_CONTENT[1],p={answers:data.fields.map(f=>f.answer),graded:false};p.answers[0]='incorrect';
 e.api.captureListening(e.state,1,data,p);assert.equal(e.api.pending(e.state).length,0);p.graded=true;e.api.captureListening(e.state,1,data,p);e.api.captureListening(e.state,1,data,p);assert.equal(e.api.pending(e.state).length,1);assert.equal(e.api.pending(e.state)[0].wrong,1);delete p.reviewRecorded;e.api.captureListening(e.state,1,data,p);assert.equal(e.api.pending(e.state)[0].wrong,2);e.dom.window.close();
});
test('production grammar drill saves a new mistake once, including after resuming feedback',()=>{
 const e=environment({doneLessons:[],lessonMasteryBest:{},lessonWork:{5:{}}});e.api.seed(e.state);const lesson=e.w.FR_A1_DATA.lessons[4],html=e.w.FR_A1_DEEPENING.enrich(lesson,e.w.grammarHtml(lesson));
 const render=()=>{e.view.innerHTML=html;e.w.FR_A1_DEEPENING.decorate({root:e.view,lesson,grammarHtml:html,state:e.state,save:e.save,speak(){},onUpdate(){}});e.view.querySelector('[data-deepening-practice="r0"] .deepening-start').onclick({resume:true});};
 render();let s=e.state.lessonWork[5].deepening.r0.session,q=s.questions[0];[...e.view.querySelectorAll('[data-deepening-practice="r0"] .option-btn')].find(b=>b.textContent!==q.answer).click();assert.equal(e.api.pending(e.state).length,1);render();assert.equal(e.api.pending(e.state)[0].wrong,1);e.dom.window.close();
});
test('whole-lesson checkbox selects and clears its topics while leaving other lessons alone',()=>{
 const e=environment();e.render();e.click('[value="custom"]');e.click('#reviewNone');const lesson=e.view.querySelector('[data-review-lesson="1"]');lesson.click();
 assert([...e.view.querySelectorAll('[data-review-topic^="1:"]')].every(el=>el.checked));assert([...e.view.querySelectorAll('[data-review-topic^="2:"]')].every(el=>!el.checked));
 e.view.querySelector('[data-review-topic^="1:"]').click();assert(lesson.indeterminate);e.dom.window.close();
});
test('typed drafts and character keys persist, freeze after checking and retain their marking policy',()=>{
 const e=environment();const q=e.api.task(2,'grammar:r0','Akzent',{prompt:'Écris un e accent aigu.',answer:'é',marking:{strictAccents:true}});e.state.reviewPractice={imported:true,items:{},session:{version:1,tasks:[q],index:0,answers:[],draft:'',mode:'custom'}};e.render();e.click('#reviewResume');
 const key=[...e.view.querySelectorAll('.mixed-char')].find(b=>b.textContent==='é');assert(key);key.click();assert.equal(e.state.reviewPractice.session.draft,'é');e.click('#reviewCheck');assert(e.state.reviewPractice.session.answers[0].ok);assert(e.view.querySelector('#reviewInput').disabled);assert([...e.view.querySelectorAll('.mixed-char,.mixed-shift')].every(b=>b.disabled));
 const saved=JSON.parse(JSON.stringify(e.state));e.dom.window.close();const r=environment(saved);r.render();r.click('#reviewResume');assert.equal(r.view.querySelector('#reviewInput').value,'é');assert(r.view.querySelector('#reviewInput').disabled);r.dom.window.close();
});
test('real hard-mode submission captures objective errors but never grades free writing automatically',()=>{
 const e=environment({doneLessons:[],lessonMasteryBest:{1:80},lessonWork:{}});e.api.seed(e.state);
 e.w.FR_A1_HARD_MODE.render({lesson:e.w.FR_A1_DATA.lessons[0],view:e.view,state:e.state,save:e.save,onBack(){}});e.click('#hardBegin');e.click('[data-hard-page="2"]');e.click('#hardSubmit');assert.equal(e.api.pending(e.state).length,0);e.click('#hardConfirmSubmit');
 const d=e.w.FR_A1_HARD_CONTENT[1];assert.equal(e.api.pending(e.state).length,d.gaps.length+d.listening.flatMap(b=>b.questions).length);assert(e.api.pending(e.state).every(x=>x.task.topic!=='writing'));e.dom.window.close();
});

test('custom selection offers only concrete topics and drops saved generic exercise categories',()=>{
 const e=environment();e.state.reviewPractice={imported:true,items:{},settings:{mode:'custom',count:20,selected:['1:lesson','1:check','1:listening','1:l1:etre']}};e.render();
 const topics=[...e.view.querySelectorAll('[data-review-topic]')].map(el=>el.dataset.reviewTopic);
 assert(topics.length>0);assert(topics.every(key=>/^\d+:(grammar:|l1:)/.test(key)));
 assert(!e.view.querySelector('[data-review-topic="1:lesson"]'));assert(!e.view.querySelector('[data-review-topic="1:check"]'));assert(!e.view.querySelector('[data-review-topic="1:listening"]'));
 assert.equal(e.state.reviewPractice.settings.selected.join(','),'1:l1:etre');e.click('#reviewStart');assert(e.state.reviewPractice.session.tasks.every(q=>q.topic==='l1:etre'));
 e.click('#reviewPause');e.click('[value="mixed"]');e.click('#reviewStart');e.click('#reviewReplace');assert(e.state.reviewPractice.session.tasks.every(q=>q.topic.startsWith('l1:')||q.topic.startsWith('grammar:')));e.dom.window.close();
});

test('resuming old mixed rounds removes check/listening items without reassigning saved answers',()=>{
 const e=environment(),api=e.api;
 const before=api.task(1,'grammar:r0','être',{q:'Je ___',answer:'suis'}),removed=api.task(1,'check','Check',{q:'Check ?',answer:'oui'}),after=api.task(1,'l1:etre','être',{q:'Tu ___',answer:'es'});
 const original={version:1,mode:'mixed',tasks:[before,removed,after],answers:[{value:'suis',ok:true},{value:'non',ok:false}],index:1,draft:'ancien',order:['oui','non']};
 e.state.reviewPractice={imported:true,items:{},session:JSON.parse(JSON.stringify(original))};e.render();const s=e.state.reviewPractice.session;
 assert.equal(s.tasks.length,2);assert.equal(s.index,1);assert.equal(s.answers[0].value,'suis');assert.equal(s.answers[1],null);assert.equal(s.draft,'');assert(!s.order);assert.equal(e.state.reviewPractice.previousMixedRound.tasks.length,3);
 e.click('#reviewResume');assert.equal(e.view.querySelector('#reviewInput').value,'');assert(e.view.textContent.includes('Tu ___'));e.dom.window.close();
});

test('separate home entries open the requested mode regardless of the last saved selection',()=>{
 const e=environment();e.state.reviewPractice={imported:true,items:{},settings:{mode:'custom',count:20}};
 e.render({initialMode:'mistakes'});assert(e.view.querySelector('[value="mistakes"]').checked);assert(e.view.querySelector('#reviewStart').disabled);
 e.render({initialMode:'mixed'});assert(e.view.querySelector('[value="mixed"]').checked);assert(!e.view.querySelector('#reviewStart').disabled);e.dom.window.close();
});
