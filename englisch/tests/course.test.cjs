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
  assert.equal(w.EN_A1_APP.state.lessonQuizBest[1],100);assert(view.querySelector('.en-rule'));
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
