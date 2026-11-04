const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(p,'utf8');
const COURSES=[['francais','francais-a1',['de','en']],['francais-a2','francais-a2',['de']],['deutsch','deutsch-a1',['fr','en']]];
function fixture(){
  const dom=new JSDOM('<main id="view"></main>',{runScripts:'outside-only',url:'https://example.org/'});
  dom.window.scrollTo=()=>{};dom.window.eval(read('shared/writing-exam.js'));
  return {dom,w:dom.window,api:dom.window.A1WritingExam,view:dom.window.document.querySelector('main')};
}
const lessons=n=>Array.from({length:n},(_,i)=>({id:i+1}));
const sample=(api,course,n)=>{const t=api.COURSES[course].tasks[0];return Array.from({length:n},()=>t.model.split(/\s+/)[0]).join(' ');};
const input=(w,el,value)=>{el.value=value;el.dispatchEvent(new w.Event('input',{bubbles:true}));};
const pick=(w,el,value)=>{el.value=String(value);el.dispatchEvent(new w.Event('change',{bubbles:true}));};

test('content: every course offers exam-style tasks with matching points, models and translations',()=>{
  const {api,dom}=fixture();
  for(const [,course,langs] of COURSES){
    const c=api.COURSES[course];assert(c.tasks.length>=3,course);
    for(const t of c.tasks){
      assert.equal(t.points.length,c.level==='A2'?4:3,t.id);
      assert(api.words(t.model)>=c.minWords,`${t.id} model has ${api.words(t.model)} words`);
      for(const lang of langs){assert(t.gloss[lang]||t.gloss.en,`${t.id} ${lang}`);assert(t.title[lang]||t.title.en);}
      assert.equal(api.criteria(course,t,'de').length,t.points.length+2);
    }
    assert.equal(new Set(c.tasks.map(t=>t.id)).size,c.tasks.length);
  }
  dom.window.close();
});

test('marking: minimum words, 70 % of points and no criterion at 0 are all required',()=>{
  const {api,dom}=fixture(),id=api.COURSES['francais-a1'].tasks[0].id,long=sample(api,'francais-a1',30),short=sample(api,'francais-a1',29);
  assert.equal(api.words('Bonjour,  je m’appelle Léa ! 12 :'),5);
  assert(api.evaluate('francais-a1',id,long,[2,2,1,1,1]).passed);           // 7/10
  assert(!api.evaluate('francais-a1',id,long,[2,1,1,1,1]).passed);          // 6/10
  assert(!api.evaluate('francais-a1',id,long,[2,2,2,2,0]).passed);          // a zero
  assert(!api.evaluate('francais-a1',id,short,[2,2,2,2,2]).passed);         // too short
  assert(!api.evaluate('francais-a1',id,long,[2,2,2,2]).complete);          // missing criterion
  const a2=api.COURSES['francais-a2'].tasks[0].id,text=sample(api,'francais-a2',60);
  const r=api.evaluate('francais-a2',a2,text,[2,2,1,1,1,2]);assert.equal(r.max,12);assert(r.passed);  // 9/12
  assert(!api.evaluate('francais-a2',a2,text,[2,1,1,1,1,2]).passed);       // 8/12 < 70 %
  dom.window.close();
});

test('unlock: locked until every lesson is done, then stays unlocked once recorded',()=>{
  const {api,view,w,dom}=fixture(),ls=lessons(24),state={doneLessons:ls.slice(0,23).map(l=>l.id)};let saves=0;
  view.innerHTML=api.homeHtml(state,{course:'francais-a1',lessons:ls,lang:'de'});
  assert(view.querySelector('.writing-exam-card.is-locked'));assert(view.querySelector('#homeWritingExam').disabled);
  assert(view.textContent.includes('23/24 Lektionen abgeschlossen'));
  api.wireHome(view,{course:'francais-a1',state,save:()=>saves++,lessons:ls,lang:'de'});
  view.querySelector('#homeWritingExam').click();assert(view.querySelector('[data-writing-exam-home]'));assert.equal(saves,0);
  state.doneLessons.push(24);view.innerHTML=api.homeHtml(state,{course:'francais-a1',lessons:ls,lang:'de'});
  assert(view.querySelector('.writing-exam-card.is-open'));assert(!view.querySelector('#homeWritingExam').disabled);
  let opened=0;api.wireHome(view,{course:'francais-a1',state,save:()=>saves++,lessons:ls,lang:'de',beforeOpen:()=>opened++});
  assert(state.writingExam.unlockedAt);assert.equal(saves,1);
  state.doneLessons=[];assert(api.isUnlocked(state,ls));
  view.querySelector('#homeWritingExam').click();assert.equal(opened,1);assert(view.querySelector('[data-writing-exam]'));
  assert(!api.isUnlocked({doneLessons:[]},[]));
  dom.window.close();
});

test('drafts: switching tasks keeps each draft, a submitted text must be assessed first',()=>{
  const {api,dom}=fixture(),state={},[a,b]=api.COURSES['deutsch-a1'].tasks.map(t=>t.id);
  api.startTask(state,'deutsch-a1',a,1);api.updateDraft(state,'Liebe Frau Weber, ich bin krank.',2);
  api.startTask(state,'deutsch-a1',b,3);assert.equal(state.writingExam.drafts[a].text,'Liebe Frau Weber, ich bin krank.');assert.equal(state.writingExam.active.text,'');
  api.updateDraft(state,'Lieber Jonas',4);api.startTask(state,'deutsch-a1',a,5);
  assert.equal(state.writingExam.active.text,'Liebe Frau Weber, ich bin krank.');assert.equal(state.writingExam.drafts[b].text,'Lieber Jonas');assert(!state.writingExam.drafts[a]);
  const copy=JSON.parse(JSON.stringify(state));assert.equal(copy.writingExam.active.text,'Liebe Frau Weber, ich bin krank.');
  assert(api.submit(state,6));assert(!api.updateDraft(state,'changed'));assert.equal(api.startTask(state,'deutsch-a1',b).taskId,a);
  assert.equal(api.complete(state,'deutsch-a1',[2,2]),null);
  const entry=api.complete(state,'deutsch-a1',[2,2,2,1,1],7);assert.equal(entry.points,8);assert.equal(entry.passed,false);// 7 words < 30
  assert.equal(state.writingExam.active,null);assert.equal(state.writingExam.history.length,1);assert(!state.writingExam.passedAt);
  dom.window.close();
});

for(const [lang,labels] of Object.entries({de:['Schreibprüfung starten','Text abgeben','Jetzt abgeben','BESTANDEN'],en:['Start writing exam','Submit text','Submit now','PASSED'],fr:['Commencer l’épreuve','Rendre le texte','Rendre maintenant','RÉUSSIE']})){
  test(`full flow in ${lang}: write, autosave, submit, self-assess and see the result`,async()=>{
    const {api,view,w,dom}=fixture(),course=lang==='fr'?'deutsch-a1':'francais-a1',ls=lessons(3),state={doneLessons:[1,2,3]};let saves=0,back=0;
    view.innerHTML=api.homeHtml(state,{course,lessons:ls,lang});assert(view.textContent.includes(labels[0]));
    api.wireHome(view,{course,state,save:()=>saves++,lessons:ls,lang,onBack:()=>back++});view.querySelector('#homeWritingExam').click();
    assert(view.querySelectorAll('[data-wx-task]').length>=3);assert(!view.querySelector('.writing-exam-model'),'model hidden before submission');
    const t=api.COURSES[course].tasks[1];view.querySelector(`[data-wx-task="${t.id}"]`).click();
    const area=view.querySelector('#wxText');assert.equal(area.getAttribute('lang'),api.COURSES[course].target);
    assert(view.querySelector('#wxSubmit').disabled);assert(view.querySelector('details.writing-exam-gloss'));
    input(w,area,t.model);assert.equal(state.writingExam.active.text,t.model);
    const before=saves;await new Promise(r=>setTimeout(r,650));assert(saves>before,'draft saved after typing');
    view.querySelector('[data-wx-char]').click();assert(state.writingExam.active.text.length>t.model.length);
    view.querySelector('#wxOverview').click();assert(view.textContent.includes(lang==='de'?'Entwurf ·':lang==='en'?'Draft ·':'Brouillon ·'));
    view.querySelector(`[data-wx-task="${t.id}"]`).click();input(w,view.querySelector('#wxText'),t.model);
    view.querySelector('#wxSubmit').click();assert(view.textContent.includes(labels[2]));assert(!state.writingExam.active.submittedAt);
    view.querySelector('#wxConfirmSubmit').click();assert(state.writingExam.active.submittedAt);
    assert(view.querySelector('.writing-exam-model'));assert(!view.querySelector('#wxText'));
    view.querySelector('#wxComplete').click();assert(view.querySelector('#wxRatingError').textContent);assert.equal(state.writingExam.history.length,0);
    view.querySelectorAll('[data-wx-rating]').forEach(sel=>pick(w,sel,2));view.querySelector('#wxComplete').click();
    assert.equal(state.writingExam.history.length,1);assert(state.writingExam.history[0].passed);assert(view.querySelector('.writing-exam-result.is-passed'));assert(view.textContent.includes(labels[3]));
    view.querySelector('#wxHome').click();assert.equal(back,1);
    view.innerHTML=api.homeHtml(state,{course,lessons:ls,lang});assert(view.textContent.includes('10/10'));
    dom.window.close();
  });
}

test('a reload during self-assessment resumes there; language changes re-render the exam',()=>{
  const {api,view,w,dom}=fixture(),state={doneLessons:[1]},t=api.COURSES['francais-a1'].tasks[0];let lang='de';
  api.startTask(state,'francais-a1',t.id);api.updateDraft(state,t.model);api.submit(state);
  const restored=JSON.parse(JSON.stringify(state));
  view.innerHTML=api.homeHtml(restored,{course:'francais-a1',lessons:lessons(1),lang});assert(view.textContent.includes('Selbstbewertung fortsetzen'));
  api.render({view,course:'francais-a1',state:restored,save(){},lessons:lessons(1),lang:()=>lang});
  assert(view.querySelector('[data-wx-rating]'));assert(view.textContent.includes('Bewerte deinen Text selbst'));
  lang='en';w.dispatchEvent(new w.CustomEvent('a1suite:languagechange',{detail:{lang}}));assert(view.textContent.includes('Assess your text'));
  dom.window.close();
});

for(const [folder,course] of COURSES){
  test(`${folder}: course home shows the writing exam and assets are versioned`,()=>{
    const app=read(folder+'/app.js'),home=app.slice(app.indexOf('function renderHome(){'),app.indexOf('function renderLearn(){'));
    assert(home.includes(`A1WritingExam.homeHtml(state,{course:'${course}',lessons`));
    assert(home.indexOf('A1DailyReview.html')<home.indexOf('A1WritingExam.homeHtml'));
    assert(home.indexOf('A1WritingExam.homeHtml')<home.indexOf('course-progress-card'));
    assert(home.includes(`A1WritingExam.wireHome(view,{course:'${course}'`));
    const html=read(folder+'/index.html'),sw=read(folder+'/service-worker.js');
    const js=html.match(/src="\.\.\/shared\/writing-exam\.js\?v=([^"]+)"/),css=html.match(/href="\.\.\/shared\/writing-exam\.css\?v=([^"]+)"/);
    assert(js&&css);assert(sw.includes(`../shared/writing-exam.js?v=${js[1]}`));assert(sw.includes(`../shared/writing-exam.css?v=${css[1]}`));
    assert(html.indexOf('writing-exam.js')<html.search(/src="app\.js/),'module loads before app.js');
    const appAsset=html.match(/src="(app\.js\?v=[^"]+)"/)[1];assert(sw.includes('./'+appAsset));
  });
}
