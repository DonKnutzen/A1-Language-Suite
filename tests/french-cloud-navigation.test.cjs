const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {TextEncoder}=require('node:util');
const {JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');

function app(t){
  const dom=new JSDOM(read('francais/index.html'),{url:'https://example.org/francais/',runScripts:'outside-only',pretendToBeVisual:true});
  const w=dom.window,observers=[],Observer=w.MutationObserver;
  w.MutationObserver=class extends Observer{constructor(fn){super(fn);observers.push(this);}};
  t.after(async()=>{await new Promise(resolve=>setImmediate(resolve));observers.forEach(o=>o.disconnect());w.close();});
  w.matchMedia=()=>({matches:true,addEventListener(){},removeEventListener(){}});
  w.TextEncoder=TextEncoder;w.scrollTo=()=>{};
  w.ResizeObserver=class{observe(){}disconnect(){}};
  w.localStorage.setItem('a1suite.currentProfile',JSON.stringify({username:'Test',profileKey:'test',mode:'local',uiLang:'de'}));
  w.A1_APP_META={course:'francais-a1',stateBaseKey:'francaisA1DelfState_v1'};
  // Load the actual page scripts in order, without fetching assets or contacting a real account.
  for(const script of w.document.querySelectorAll('script[src]')){
    const file=path.posix.normalize('francais/'+script.getAttribute('src').split('?')[0]);
    w.eval(read(file)+(file==='francais/app.js'?';window.testState=()=>state;':''));
    if(file==='shared/profile.js'){
      const key=w.A1Profile.namespacedKey('francaisA1DelfState_v1');
      w.localStorage.setItem(key,JSON.stringify({lastLessonId:6,doneLessons:[1,2,3,4,5],reviewPractice:{imported:true}}));
    }
  }
  const view=w.document.getElementById('view');
  function cloudUpdate(){
    const key=w.A1Profile.namespacedKey('francaisA1DelfState_v1');
    const progress=JSON.parse(w.localStorage.getItem(key));
    progress.lessonQuizBest={...progress.lessonQuizBest,24:80};
    w.localStorage.setItem(key,JSON.stringify(progress));
    w.A1ApplyCloudProgress(progress);
  }
  return {w,view,cloudUpdate};
}

for(const entry of ['continue','course'])test(`cloud updates preserve lesson 6 deepening questions entered via ${entry}`,t=>{
  const {w,view,cloudUpdate}=app(t);
  if(entry==='continue')view.querySelector('#continueLesson').click();
  else{
    w.document.querySelector('[data-route="learn"]').click();
    view.querySelector('[data-lesson="6"]').click();
  }
  view.querySelector('[data-lesson-step="grammar"]').click();
  view.querySelector('.deepening-start').click();
  const stage=view.querySelector('.deepening-stage');
  const question=stage.querySelector('.quiz-q');assert(question);
  const before=view.innerHTML;
  cloudUpdate();assert(view.innerHTML===before,'sync must leave the active question and screen intact');
  stage.querySelector('.option-btn').click();
  const feedback=stage.querySelector('.deepening-feedback');assert(feedback.textContent.trim());
  cloudUpdate();assert.equal(view.querySelector('.deepening-feedback'),feedback,'sync must preserve answer feedback');
  stage.querySelector('.deepening-next').click();
  assert.notEqual(stage.querySelector('.quiz-q'),question);
  cloudUpdate();assert.equal(view.querySelector('.deepening-stage'),stage);
  w.document.querySelector('[data-route="home"]').click();
  assert(view.querySelector('#continueLesson'));
  assert.equal(w.testState().lessonQuizBest[24],80,'remote progress loads when leaving the exercise');
  assert(Object.values(w.testState().lessonWork[6].deepening).some(p=>p.session?.i>=1),'local answers survive sync');
});

test('cloud updates still refresh the actual home screen',t=>{
  const {w,view,cloudUpdate}=app(t),home=view.querySelector('#continueLesson');
  cloudUpdate();assert(view.querySelector('#continueLesson'));assert.notEqual(view.querySelector('#continueLesson'),home);
  assert.equal(w.testState().lessonQuizBest[24],80);
});

test('cloud updates preserve review opened directly from home',t=>{
  const {view,cloudUpdate}=app(t);
  view.querySelector('#homeReview').click();
  assert(!view.querySelector('.home-continue-card'));
  const before=view.innerHTML;
  cloudUpdate();assert(view.innerHTML===before,'sync must leave home review intact');
});
