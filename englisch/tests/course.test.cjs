const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM,VirtualConsole}=require('jsdom');
const fixtures=[];
test.afterEach(()=>{for(const f of fixtures.splice(0)){f.dom.window.close();assert.equal(f.errors.length,0,f.errors.join('\n'));}});
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
function fixture(){
  const errors=[],console=new VirtualConsole();console.on('jsdomError',e=>errors.push(e.message+' '+(e.detail?.stack||'')));
  const dom=new JSDOM(read('englisch/index.html'),{url:'https://example.test/englisch/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:console});
  fixtures.push({dom,errors});
  const w=dom.window,spoken=[],saved=[];
  w.scrollTo=()=>{};w.matchMedia=()=>({matches:true,addEventListener(){},removeEventListener(){}});
  w.ResizeObserver=class{observe(){}disconnect(){}};
  w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
  w.speechSynthesis={getVoices:()=>[{name:'English Female',lang:'en-GB',voiceURI:'female'},{name:'English Male',lang:'en-GB',voiceURI:'male'}],speak:u=>spoken.push(u),cancel(){},addEventListener(){}};
  w.A1Profile={namespacedKey:k=>k+'::profile:test',getUiLang:()=> 'de',getCurrent:()=>({profileKey:'test',mode:'local'}),cloudConfigured:false,saveProgress:(...args)=>saved.push(args),resetProgress:async()=>{}};
  w.A1_APP_META={course:'englisch-a1',stateBaseKey:'englischA1State_v1'};
  const skip=['config.js','profile.js','text-size.js','bug-reports.js'];
  for(const node of w.document.querySelectorAll('script[src]')){
    const src=node.getAttribute('src').split('?')[0];if(skip.includes(src.split('/').pop()))continue;
    const file=path.normalize('englisch/'+src);w.eval(read(file)+'\n//# sourceURL='+file);
  }
  return {dom,w,spoken,saved,view:w.document.getElementById('view'),close:()=>dom.window.close()};
}
const chooseCorrect=f=>{const s=f.w.EN_A1_APP.state.lessonWork[1].session;f.view.querySelector(`[data-o="${s.ex[s.i].a}"]`).click();f.view.querySelector('#mixedNext').click();};
test('all 24 lessons have independent, valid exercise contracts and sufficient writing models',()=>{
  const f=fixture(),w=f.w;assert.equal(w.EN_A1_DATA.lessons.length,24);
  for(const l of w.EN_A1_DATA.lessons){
    assert.equal(l.phrases.length,10);assert.equal(l.quiz.length,10);assert(l.vocabulary.length>=19);assert.equal(l.topics.length,2);
    const practice=new Set();
    for(const t of l.topics){assert.equal(t.practice.length,10);assert.equal(t.transfer.length,6);assert(t.rule.length>100);assert(t.examples.length>=3);for(const q of t.practice)practice.add(JSON.stringify([q.q,q.answer,q.context]));}
    const qs=[...l.topics.flatMap(t=>t.practice),...w.EN_A1_MASTERY_SPECS[l.id].checkTasks];
    for(const q of qs){assert(q.context||l.contexts.some(c=>c[0]===q.q),`${l.id}: missing context`);assert(q.answer);assert(q.audio);if(q.o){assert.equal(q.o.length,3);assert.equal(new Set(q.o).size,3);assert(q.o.includes(q.answer));}}
    for(const q of w.EN_A1_MASTERY.practiceTasks(l).slice(0,10)){const original=l.quiz.find(x=>x.q===q.q);assert.deepEqual([...q.o].sort(),[...original.o].sort());}
    const check=w.EN_A1_MASTERY.makeLessonTest(l);assert.equal(check.length,16);assert(check.filter(q=>q.type==='gap').length>=6);for(const q of check)assert(!practice.has(JSON.stringify([q.q,q.answer,q.context])),`${l.id}: drill repeated in check: ${q.q}`);
    const hard=w.EN_A1_HARD_CONTENT[l.id];assert.equal(hard.gaps.length,8);assert.equal(hard.listening.length,2);assert.equal(hard.listening.flatMap(b=>b.questions).length,8);assert(w.EN_A1_HARD_MODE.words(hard.writing.model)>=hard.writing.minWords);
    for(const g of hard.gaps)assert(w.EN_A1_HARD_MODE.matches(g.answers[0],g.answers,g));
    assert(!/\{(?!\{)/.test(hard.text.replace(/\{\{\d+\}\}/g,'')));
    assert.notEqual(hard.listening[0].text,hard.listening[1].text);assert.notEqual(hard.listening[0].text,w.A1_COMPREHENSION_CONTENT[l.id].turns.map(t=>t.text).join(' '));
    for(const b of hard.listening)for(const q of b.questions){assert(w.EN_A1_HARD_MODE.matches(q.answers[0],q.answers,q));if(q.options)assert.equal(new Set(q.options).size,3);}
  }
  f.close();
});
test('all lesson pages, both grammar topics and practice screens render',()=>{
  const f=fixture(),{w,view}=f;
  for(let id=1;id<=24;id++){
    w.EN_A1_APP.renderLesson(id,{step:'listen'});assert.equal(view.querySelectorAll('[data-core-row]').length,10);
    assert(view.querySelector('.en-glossary'));assert.equal(view.querySelector('.en-glossary').tagName,'DETAILS');assert(!view.querySelector('.en-glossary').open);
    for(let i=0;i<2;i++){w.EN_A1_APP.renderLesson(id,{step:'grammar',grammarIndex:i});assert(view.querySelector('.en-rule'));assert(view.querySelector('[data-grammar-start]'));view.querySelector('[data-grammar-start]').click();assert(view.querySelector('.mixed-context'));assert.equal(view.querySelectorAll('[data-o]').length,3);view.querySelector('#mixedBack').click();}
    w.EN_A1_APP.renderLesson(id,{step:'comprehension'});assert.equal(view.querySelectorAll('.comprehension-field').length,4);
    w.EN_A1_APP.renderLesson(id,{step:'check'});assert(view.querySelector('[data-lesson-step="speak"]'));assert(view.querySelector('[data-lesson-step="write"]'));
    w.EN_A1_APP.renderLesson(id,{step:'speak'});assert(view.querySelector('#showSpeakingModel'));
    w.EN_A1_APP.renderLesson(id,{step:'write'});assert(view.querySelector('#lessonWriting'));
  }
  f.close();
});
test('intro resumes exact order and score; automatic answer audio never leaks before an answer',()=>{
  const f=fixture(),{w,view}=f;
  w.EN_A1_APP.renderLesson(1,{step:'listen'});view.querySelector('#startQuiz').click();
  assert.equal(f.spoken.length,0);const before=JSON.stringify(w.EN_A1_APP.state.lessonWork[1].session.ex);
  chooseCorrect(f);assert.equal(f.spoken.length,0,'audio is off by default');
  view.querySelector('#mixedBack').click();view.querySelector('#startQuiz').click();
  const s=w.EN_A1_APP.state.lessonWork[1].session;assert.equal(s.i,1);assert.equal(s.score,1);assert.equal(JSON.stringify(s.ex),before);
  while(view.querySelector('#mixedNext')||view.querySelector('[data-o]'))chooseCorrect(f);
  assert.equal(w.EN_A1_APP.state.lessonQuizBest[1],100);assert(view.querySelector('#startQuiz.is-completed'));assert(view.querySelector('#nextLessonStep.lesson-next-ready'));
  assert(f.saved.every(args=>args[0]==='englisch-a1'));
  f.close();
});
test('grammar errors are saved against the actual topic and only grammar enters ordinary review',()=>{
  const f=fixture(),{w,view}=f;w.EN_A1_APP.renderLesson(5,{step:'grammar'});view.querySelector('[data-grammar-start]').click();
  const s=w.EN_A1_APP.state.lessonWork[5].deepening.t0.session;view.querySelector(`[data-o="${(s.ex[0].a+1)%3}"]`).click();
  const mistakes=w.EN_A1_REVIEW.pending(w.EN_A1_APP.state);assert.equal(mistakes.length,1);assert.equal(mistakes[0].task.topic,'grammar:t0');
  w.EN_A1_APP.state.doneLessons=[1,5];
  const bank=w.EN_A1_REVIEW.buildBank(w.EN_A1_DATA.lessons,w.EN_A1_APP.state,w.EN_A1_DEEPENING.grammarHtml);
  assert.equal(bank.length,40);assert(bank.every(q=>q.topic.startsWith('grammar:')));
  f.close();
});
test('English listening uses English voices and explicit genders, with stop and replay',()=>{
  const f=fixture(),{w,view}=f;w.EN_A1_APP.renderLesson(1,{step:'comprehension'});view.querySelector('#dialoguePlay').click();
  assert.equal(f.spoken.at(-1).lang,'en-GB');assert.equal(f.spoken.at(-1).voice.name,'English Female');
  view.querySelector('#dialoguePlay').click();assert(view.querySelector('#dialoguePlay').textContent.includes('anhören'));
  w.EN_A1_APP.renderLesson(2,{step:'comprehension'});view.querySelector('#dialoguePlay').click();assert.equal(f.spoken.at(-1).voice.name,'English Male');
  assert(!view.querySelector('.comprehension-transcript').open);
  f.close();
});
test('mastery check grades free forms, persists a draft and unlocks Hard Mode after passing',()=>{
  const f=fixture(),{w,view}=f,s=w.EN_A1_APP.state;
  assert(!w.EN_A1_HARD_MODE.unlocked(s,8));
  const lesson=w.EN_A1_DATA.lessons[7];w.EN_A1_MASTERY.renderLessonTest({lesson,view,state:s,save:()=>{},onBack:()=>{},speak:()=>{}});view.querySelector('#masteryStart').click();
  while(view.querySelector('#masteryNext')||view.querySelector('[data-mastery-o]')||view.querySelector('#masteryInput')){
    const session=s.lessonCheckProgress[8].session,q=session.ex[session.i];
    if(q.type==='choice')view.querySelector(`[data-mastery-o="${q.o.indexOf(q.answer)}"]`).click();
    else{const input=view.querySelector('#masteryInput');input.value=q.answer;input.dispatchEvent(new w.Event('input'));view.querySelector('#masteryCheck').click();}
    view.querySelector('#masteryNext').click();
  }
  assert.equal(s.lessonMasteryBest[8],100);assert(w.EN_A1_HARD_MODE.unlocked(s,8));assert.equal(s.lessonCheckProgress[8].session,undefined);
  f.close();
});
test('writing can be saved, locked, edited and resumed without an English special-character bar',()=>{
  const f=fixture(),{w,view}=f;w.EN_A1_APP.renderLesson(5,{step:'write'});let input=view.querySelector('#lessonWriting');
  input.value=w.EN_A1_DATA.lessons[4].model;input.dispatchEvent(new w.Event('input'));view.querySelector('#showWritingModel').click();assert(input.readOnly);
  view.querySelector('#editWriting').click();assert(!input.readOnly);
  view.querySelector('#showWritingModel').click();view.querySelector('#writingGood').click();assert(w.EN_A1_APP.state.lessonWork[5].writingDone);
  w.EN_A1_APP.renderLesson(5);input=view.querySelector('#lessonWriting');assert(input);assert.equal(input.value,w.EN_A1_DATA.lessons[4].model);
  f.close();
});
test('vocabulary directions, lesson decks and course progress stay English-specific',()=>{
  const f=fixture(),{w,view}=f;w.EN_A1_APP.setRoute('practice');assert(view.textContent.includes('ENGLISH'));assert(view.querySelector('#vtDirection').textContent.includes('EN → DE'));
  const bank=w.A1Vocabulary.buildBank({course:'en',lessons:w.EN_A1_DATA.lessons});assert(bank.length>400);assert(bank.every(e=>e.target&&e.meaning));assert(bank.some(e=>e.target==='would like'&&e.meaning.includes('möchte')));
  const select=view.querySelector('#vtLesson');select.value='4';select.dispatchEvent(new w.Event('change'));assert(view.querySelectorAll('.vt-entry').length>=20);
  view.querySelector('#vtStart').click();view.querySelector('#vtReveal').click();view.querySelector('#vtAgain').click();assert(w.EN_A1_APP.state.vocabularyTrainer.lessonItems[4]);
  assert(!w.localStorage.getItem('francaisA1DelfState_v1::profile:test'));
  f.close();
});
test('gold requires a passed, self-assessed result and at least 95 percent using exact counts',()=>{
  const f=fixture(),api=f.w.EN_A1_HARD_MODE;
  const result=(correct,total,passed=true)=>({phase:'reviewed',completedAt:1,result:{correct,total,passed}});
  assert(api.goldResult(result(19,20)));assert(api.goldResult(result(20,20)));assert(!api.goldResult(result(18,20)));assert(!api.goldResult(result(19,20,false)));assert(!api.goldResult(result(94,99)));
  f.close();
});
test('offline cache contains every local entry-point asset and never purges another course',()=>{
  const html=read('englisch/index.html'),sw=read('englisch/service-worker.js');
  for(const [,asset]of html.matchAll(/(?:src|href)="([^"#]+\.(?:css|js)(?:\?[^"]*)?)"/g)){
    assert(fs.existsSync(path.resolve(root,'englisch',asset.split('?')[0])),asset);assert(sw.includes(asset),asset+' missing from cache');
  }
  assert(sw.includes("const PREFIX='englisch-a1-'"));assert(!sw.includes('francais-a1-'));
  assert(read('index.html').includes('href="englisch/"'));
});
test('all 24 Hard Mode attempts can be submitted, self-assessed, reviewed and restarted',()=>{
  const f=fixture(),{w,view}=f,s=w.EN_A1_APP.state;
  const click=selector=>{assert(view.querySelector(selector),selector);view.querySelector(selector).click();};
  const input=(selector,value)=>{const el=view.querySelector(selector);assert(el,selector);el.value=value;el.dispatchEvent(new w.Event('input',{bubbles:true}));};
  for(let id=1;id<=24;id++){
    s.lessonMasteryBest[id]=80;const data=w.EN_A1_HARD_CONTENT[id];
    w.EN_A1_HARD_MODE.render({lesson:w.EN_A1_DATA.lessons[id-1],view,state:s,save:()=>{},onBack:()=>{}});click('#hardBegin');
    assert(!view.querySelector('.hard-transcript'));assert(!view.querySelector('.hard-accents'));assert(!view.textContent.includes('Französisch'));
    data.gaps.forEach((g,i)=>input(`[data-hard-gap="${i}"]`,g.answers[0]));click('[data-hard-page="1"]');
    data.listening.flatMap(b=>b.questions).forEach((q,i)=>{
      if(q.options)[...view.querySelectorAll(`[data-hard-listen="${i}"]`)].find(el=>el.value===q.answers[0]).click();
      else input(`[data-hard-listen="${i}"]`,q.answers[0]);
    });
    click('[data-hard-page="2"]');input('#hardWriting',data.writing.model);click('#hardSubmit');click('#hardConfirmSubmit');
    assert(view.querySelector('#hardWriting').readOnly);assert(view.querySelector('.hard-transcript'));
    view.querySelectorAll('[data-hard-rating]').forEach(el=>{el.value='2';el.dispatchEvent(new w.Event('change'));});click('#hardComplete');
    const p=s.lessonWork[id].hardMode;assert(p.passedAt);assert.equal(p.attempt.result.correct,16);assert(w.EN_A1_HARD_MODE.goldResult(p.attempt));
    click('#hardReview');click('[data-hard-page="1"]');assert.equal(view.querySelectorAll('.hard-transcript').length,2);
    click('[data-hard-page="2"]');click('#hardResult');click('#hardRetry');click('#hardNew');
    assert.equal(p.history.length,1);assert.equal(p.attempt.text,'');assert(!view.querySelector('.hard-transcript'));
  }
  f.close();
});
test('word preparation precedes early recordings and no possession-have is tested before lesson 4',()=>{
  const f=fixture(),w=f.w;
  for(let id=1;id<4;id++){
    const texts=w.EN_A1_LISTENING[id].flatMap(s=>s.turns.map(t=>t.text)).join(' ');
    assert(!/\b(?:have|has)\b/i.test(texts));
  }
  for(const [id,word]of [[2,'country'],[3,'sixteen'],[10,'meet'],[14,'cash'],[18,'address'],[19,'beach'],[20,'reception'],[22,'lunch']]){
    assert(w.EN_A1_DATA.lessons.slice(0,id).some(l=>l.vocabulary.some(p=>p[0]===word)),`${word} not introduced by ${id}`);
  }
  f.close();
});
test('a final round retains its sampled questions and typed drafts when paused',()=>{
  const f=fixture(),{w,view}=f;w.EN_A1_APP.renderExam();view.querySelector('#finalMock').click();
  const s=w.EN_A1_APP.state.training.final.session;assert.equal(s.ex.length,32);const before=JSON.stringify(s.ex);
  view.querySelector('#mixedBack').click();view.querySelector('#finalMock').click();assert.equal(JSON.stringify(w.EN_A1_APP.state.training.final.session.ex),before);
  w.EN_A1_APP.renderTraining();for(const key of ['reading','listening','speaking','writing','grammar','form'])assert(view.querySelector(`[data-skill="${key}"]`));
  f.close();
});
function finishGrammar(f,id,key,correct=10){
  for(let i=0;i<10;i++){
    const s=f.w.EN_A1_APP.state.lessonWork[id].deepening[key].session,q=s.ex[s.i];
    f.view.querySelector(`[data-o="${i<correct?q.a:(q.a+1)%q.o.length}"]`).click();
    f.view.querySelector('#mixedNext').click();
  }
}
test('home highlights Continue and the tree only explains growth',()=>{
  const f=fixture(),{view}=f,button=view.querySelector('#continueLesson');
  assert(button.classList.contains('home-continue-btn'));assert(button.classList.contains('en-action-current'));assert(!button.classList.contains('continue-btn'));
  const tree=view.querySelector('.en-course-summary');assert(tree.textContent.includes('Mit jeder bestandenen Lektion wächst dein Baum.'));assert.equal(tree.querySelectorAll('button').length,0);
  assert(!tree.textContent.includes('deutsche Erklärungen'));assert(view.textContent.includes('So lernst du'));
  f.close();
});
test('passing the vocabulary check leaves a distinct result and focuses the glowing next step',()=>{
  const f=fixture(),{w,view}=f;w.EN_A1_APP.renderLesson(1,{step:'listen'});
  assert.equal(view.querySelector('#startQuiz').dataset.actionState,'new');assert(view.querySelector('#startQuiz.en-action-current'));assert(!view.querySelector('#nextLessonStep.lesson-next-ready'));
  view.querySelector('#startQuiz').click();for(let i=0;i<10;i++)chooseCorrect(f);
  const result=view.querySelector('#startQuiz'),next=view.querySelector('#nextLessonStep');
  assert.equal(result.dataset.actionState,'passed');assert(result.textContent.includes('Vokabel-Check bestanden'));assert(result.textContent.includes('100 %'));assert(result.classList.contains('is-completed'));assert(!result.classList.contains('en-action-current'));
  assert(next.classList.contains('lesson-next-ready'));assert.equal(w.document.activeElement,next);next.click();
  assert(view.querySelector('[data-grammar-start].en-action-current'));assert(!view.querySelector('#nextGrammarTopic.lesson-next-ready'));
  f.close();
});
test('an unsuccessful vocabulary attempt is a retry, not a passed check or a highlighted next step',()=>{
  const f=fixture(),{w,view}=f;w.EN_A1_APP.renderLesson(1,{step:'listen'});view.querySelector('#startQuiz').click();
  for(let i=0;i<10;i++){const s=w.EN_A1_APP.state.lessonWork[1].session,q=s.ex[s.i];view.querySelector(`[data-o="${(q.a+1)%q.o.length}"]`).click();view.querySelector('#mixedNext').click();}
  const button=view.querySelector('#startQuiz');assert.equal(button.dataset.actionState,'retry');assert(!button.classList.contains('is-completed'));assert(button.classList.contains('en-action-current'));assert(button.textContent.includes('erneut üben'));assert(!view.querySelector('#nextLessonStep.lesson-next-ready'));
  assert.equal(w.A1LessonFlow.resumePosition(w.EN_A1_DATA.lessons[0],w.EN_A1_APP.state).step,'listen');
  f.close();
});
test('passed grammar topics offer direct next-topic and listening navigation; earlier bests survive a retry',()=>{
  const f=fixture(),{w,view}=f;w.EN_A1_APP.renderLesson(2,{step:'grammar',grammarIndex:0});view.querySelector('[data-grammar-start]').click();finishGrammar(f,2,'t0');
  let next=view.querySelector('#grammarNext');assert(next.classList.contains('lesson-next-ready'));assert(next.textContent.includes('Verneinen'));next.click();
  assert(view.querySelector('.en-rule').textContent.includes('not'));assert(!view.querySelector('#nextLessonStep.lesson-next-ready'));
  view.querySelector('[data-grammar-start]').click();finishGrammar(f,2,'t1');next=view.querySelector('#grammarNext');assert(next.textContent.includes('Hörverstehen'));next.click();assert(view.querySelector('#dialoguePlay'));
  w.EN_A1_APP.renderLesson(2,{step:'grammar',grammarIndex:0});assert(view.querySelector('[data-grammar-start].is-completed'));assert(view.querySelector('#nextGrammarTopic.lesson-next-ready'));
  view.querySelector('[data-grammar-start]').click();finishGrammar(f,2,'t0',0);assert.equal(w.EN_A1_APP.state.lessonWork[2].deepening.t0.best,100);assert(w.EN_A1_APP.state.lessonWork[2].deepening.t0.done);assert(view.querySelector('#grammarNext'));
  f.close();
});

test('word teaching is staged, audio is opt-in and the glossary appears only at the lesson overview',()=>{
 const f=fixture(),{w,view}=f;const start=f.spoken.length;
 for(const l of w.EN_A1_DATA.lessons){
  const p=w.EN_A1_VOCABULARY.plan[l.id];
  w.EN_A1_APP.renderLesson(l.id,{step:'listen'});assert(!view.querySelector('#lessonVocabulary'));assert(!view.querySelector('.en-glossary').open);assert(view.querySelector('.en-glossary').textContent.includes('nicht vorab auswendig'));
  assert.equal(view.querySelectorAll('[data-vocabulary-stage="listen"] .phrase-row').length,p.stages.listen.length);
  for(let i=0;i<2;i++){w.EN_A1_APP.renderLesson(l.id,{step:'grammar',grammarIndex:i});assert.equal(view.querySelectorAll('[data-vocabulary-stage] .phrase-row').length,p.stages['grammar:'+i].length);}
  w.EN_A1_APP.renderLesson(l.id,{step:'comprehension'});assert(!view.querySelector('.en-glossary'));assert(!view.querySelector('[data-vocabulary-stage]'));
 }
 assert.equal(f.spoken.length,start);w.EN_A1_APP.renderLesson(3,{step:'listen'});assert(view.textContent.includes('Zahlen hören und unterscheiden'));const b=view.querySelector('[data-vocabulary-stage] [data-speak]');const text=decodeURIComponent(b.dataset.speak);b.click();assert.equal(f.spoken.at(-1).text,text);assert.equal(f.spoken.at(-1).lang,'en-GB');f.close();
});
test('expanded vocabulary keeps old saved card identities and supplies German meanings for contractions',()=>{
 const f=fixture(),{w}=f,bank=w.A1Vocabulary.buildBank({course:'en',lessons:w.EN_A1_DATA.lessons});
 for(const l of w.EN_A1_DATA.lessons)for(const [target,meaning]of l.vocabulary){const id=JSON.stringify(['word',target.replace(/[’‘]/g,"'"),meaning.replace(/[’‘]/g,"'")]);assert(bank.some(e=>e.id===id),id);}
 const cant=bank.find(e=>e.target==='can’t');assert(w.A1Vocabulary.displayPairs('en',cant)[0].meaning.includes('kann nicht'));assert(bank.some(e=>e.target==='quiet'&&e.lessons.includes(20)));f.close();
});
test('equivalent full negatives are accepted in every typed lesson-check gap',()=>{
 const f=fixture(),{w}=f;let count=0;
 for(const l of w.EN_A1_DATA.lessons)for(const q of w.EN_A1_MASTERY_SPECS[l.id].checkTasks)if(q.type==='gap')for(const alternative of q.accept||[]){assert(w.EN_A1_MASTERY.accepted(q,alternative),q.q);count++;}
 assert(count>=6);assert(!w.EN_A1_MASTERY.passed({lessonMasteryBest:{1:40},lessonMasteryLast:{1:40}},1));assert(w.EN_A1_MASTERY.passed({lessonMasteryBest:{1:80}},1));f.close();
});
test('unanswered revised grammar tasks are updated once while the original draft and grades are preserved',()=>{
 const f=fixture(),{w}=f,t=w.EN_A1_DATA.lessons[12].topics[1],q=t.practice[0],old={...q,o:['some','a','an']};
 const p={best:90,session:{version:162,ex:[old],i:0,score:0,draft:'some',response:null}},before=JSON.stringify(p.session);
 w.EN_A1_DEEPENING.refreshPractice(p,t.practice);assert.equal(JSON.stringify(p.previousDrafts[0]),before);assert(p.session.ex[0].o.includes('any'));assert.equal(p.best,90);w.EN_A1_DEEPENING.refreshPractice(p,t.practice);assert.equal(p.previousDrafts.length,1);f.close();
});
test('revised saved errors use current options while old records remain archived',()=>{
 const f=fixture(),{w,view}=f,s=w.EN_A1_APP.state,l=w.EN_A1_DATA.lessons[12],t=l.topics[1],q={...t.practice[0],o:['some','a','an']};
 w.EN_A1_REVIEW.record(s,w.EN_A1_REVIEW.task(13,'grammar:t1',t.title,q),false);const old=Object.keys(s.reviewPractice.items)[0];
 w.EN_A1_REVIEW.render({view,lessons:w.EN_A1_DATA.lessons,state:s,save(){},onBack(){},speak(){},grammarHtml:w.EN_A1_DEEPENING.grammarHtml,initialMode:'mistakes'});
 assert(s.reviewPractice.items[old].retired);const current=w.EN_A1_REVIEW.pending(s);assert.equal(current.length,1);assert(current[0].task.o.includes('any'));assert.equal(current[0].wrong,1);f.close();
});
test('the mixed final shows the German context required to disambiguate grammar choices',()=>{
 const f=fixture(),{w,view}=f;w.EN_A1_APP.renderExam();view.querySelector('#finalMock').click();const p=w.EN_A1_APP.state.training.final;while(!p.session.ex[p.session.i].context){const q=p.session.ex[p.session.i];view.querySelector(`[data-o="${q.a}"]`).click();view.querySelector('#mixedNext').click();}assert(view.querySelector('.mixed-context'));assert(view.querySelector('.mixed-context').textContent.includes(p.session.ex[p.session.i].context));f.close();
});
test('a completed English daily round returns to a visibly completed home card and remains repeatable',()=>{
 const f=fixture(),{w,view}=f,s=w.EN_A1_APP.state;s.doneLessons=[1];w.EN_A1_APP.setRoute('home');assert(view.querySelector('.daily-review-card.is-due'));view.querySelector('#homeReview').click();view.querySelector('#reviewStart').click();
 while(s.reviewPractice.session){const session=s.reviewPractice.session,q=session.tasks[session.index];view.querySelector(`[data-review-option="${session.order.indexOf(q.answer)}"]`).click();view.querySelector('#reviewCheck').click();view.querySelector('#reviewNext').click();}
 assert.equal(s.reviewPractice.daily.rounds,1);w.EN_A1_APP.setRoute('home');assert(view.querySelector('.daily-review-card.is-complete'));assert(view.querySelector('.daily-review-completed').textContent.includes('Eine Runde abgeschlossen'));assert.equal(view.querySelector('#homeReview').textContent,'Weitere Runde üben');f.close();
});
test('extra listening and final listening keep both speaker roles rather than flattening their audio',()=>{
 const f=fixture(),{w,view}=f;let turns;w.A1Voice.speakDialogue=t=>{turns=t;return true;};w.EN_A1_APP.renderTraining();view.querySelector('[data-skill="listening"]').click();view.querySelector('#mixedListen').click();assert.equal(turns.length,2);assert.deepEqual([...new Set(turns.map(t=>t.gender))].sort(),['female','male']);w.EN_A1_APP.renderExam();view.querySelector('#finalMock').click();for(const q of w.EN_A1_APP.state.training.final.session.ex.filter(q=>q.type==='listening'))assert(q.turns.length>=2);f.close();
});
