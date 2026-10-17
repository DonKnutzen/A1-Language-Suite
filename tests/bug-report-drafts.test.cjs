const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const source=fs.readFileSync(path.join(__dirname,'../shared/bug-reports.js'),'utf8');
async function ui(configure=()=>{}){
  const dom=new JSDOM('<main id="view"><header data-bug-lesson="4"><h2>4. Uhrzeit</h2></header><div class="quiz-q">Le rendez-vous est ___ dix heures.</div><button class="option-btn">à</button><button class="option-btn">en</button></main>',{url:'https://example.org/francais/',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window;
  await new Promise(r=>w.addEventListener('load',r));w.HTMLDialogElement.prototype.show=function(){this.open=true};w.HTMLDialogElement.prototype.close=function(){this.open=false};
  let calls=[],failure=true;
  w.A1Profile={getUiLang:()=> 'de',getCurrent:()=>({profileKey:'Phillip'}),submitBugReport:async p=>{calls.push(p);if(failure)throw Error('BUG_SEND_TIMEOUT')}};
  configure(w);w.eval(source);return {dom,w,calls,succeed:()=>{failure=false;}};
}
test('a timed-out report can be reopened from another screen with its original question, category and UUID',async()=>{
  const {dom,w,calls,succeed}=await ui();w.A1BugReports.open();w.document.querySelector('[data-bug-category="answers"]').click();
  w.document.getElementById('a1BugMessage').value='These answers look wrong';w.document.getElementById('a1BugMessage').dispatchEvent(new w.Event('input'));
  await w.document.getElementById('a1BugSend').onclick();assert(w.document.getElementById('a1BugStatus').textContent.includes('Keine Bestätigung'));assert.equal(w.document.getElementById('a1BugSend').disabled,false);
  const first=calls[0];w.document.getElementById('view').innerHTML='<h2>Start</h2>';w.A1BugReports.showDrafts();assert(w.document.getElementById('a1BugDialog').textContent.includes(first.context.question));w.document.querySelector('[data-draft-index]').click();
  assert.equal(w.document.getElementById('a1BugMessage').value,'These answers look wrong');assert.equal(w.document.querySelector('[data-bug-category="answers"]').getAttribute('aria-pressed'),'true');
  succeed();await w.document.getElementById('a1BugSend').onclick();assert.equal(calls[1].id,first.id);assert.equal(calls[1].context.question,first.context.question);assert.equal(calls[1].context.lessonId,4);assert.equal(w.localStorage.length,0);dom.window.close();
});
test('old text drafts remain recoverable without inventing missing exercise details',async()=>{
  const {dom,w,calls,succeed}=await ui();const key='a1suite.bugDraft:'+JSON.stringify(['Phillip','francais-a1',7,'grammar',1,'Un kilo ___ pommes.']);w.localStorage.setItem(key,'Die Antwort ist falsch');
  w.localStorage.setItem('a1suite.bugDraft:'+JSON.stringify(['Bine','francais-a1',1,'listen',null,'PRIVATE OTHER PROFILE']),'Another profile draft');
  w.A1BugReports.showDrafts();assert(!w.document.getElementById('a1BugDialog').textContent.includes('PRIVATE OTHER PROFILE'));w.document.querySelector('[data-draft-index]').click();assert(w.document.getElementById('a1BugDialog').textContent.includes('Älterer Entwurf'));
  succeed();await w.document.getElementById('a1BugSend').onclick();assert.equal(calls[0].context.question,'Un kilo ___ pommes.');assert.equal(calls[0].context.lessonId,7);assert.equal(calls[0].context.options.length,0);assert.equal(calls[0].context.recoveredLegacyDraft,true);dom.window.close();
});

test('reporting stays non-modal with one close control and retains text while the page is used',async()=>{
  const {dom,w}=await ui();w.HTMLDialogElement.prototype.showModal=function(){throw Error('must not block the page');};
  let clicked=false;w.document.querySelector('.option-btn').onclick=()=>{clicked=true;};
  w.A1BugReports.open();const dialog=w.document.getElementById('a1BugDialog');assert(dialog.open);assert.equal(dialog.dataset.mode,'composer');assert(!dialog.querySelector('#a1BugMic'));assert(!dialog.querySelector('.a1-bug-preview').open);assert.equal(dialog.querySelector('textarea').rows,2);
  const input=w.document.getElementById('a1BugMessage');input.value='I need to see the question';input.dispatchEvent(new w.Event('input'));
  assert.equal(dialog.querySelectorAll('.a1-bug-top button').length,1);assert(!dialog.querySelector('#a1BugMinimize'));w.document.querySelector('.option-btn').click();assert(clicked);assert.equal(input.value,'I need to see the question');dom.window.close();
});

test('mobile typing contracts the panel and follows keyboard viewport scrolling',async()=>{
  let vv;
  const {dom,w}=await ui(w=>{Object.defineProperty(w,'innerWidth',{value:390,writable:true});Object.defineProperty(w,'innerHeight',{value:800,writable:true});vv=new w.EventTarget();Object.assign(vv,{height:800,width:390,offsetTop:0,offsetLeft:0,scale:1});w.visualViewport=vv;});
  const tick=()=>new Promise(r=>w.requestAnimationFrame(()=>w.requestAnimationFrame(r)));
  w.A1BugReports.open();const dialog=w.document.getElementById('a1BugDialog'),input=w.document.getElementById('a1BugMessage');dialog.getBoundingClientRect=()=>({width:374,height:56});
  input.value='Diese Frage ist unklar';input.focus();vv.height=350;vv.offsetTop=60;vv.dispatchEvent(new w.Event('resize'));await tick();assert(dialog.classList.contains('keyboard-compact'));assert.equal(dialog.style.transform,'translate3d(8px,350px,0)');assert.equal(dialog.style.width,'374px');
  vv.offsetTop=180;vv.dispatchEvent(new w.Event('scroll'));await tick();assert.equal(dialog.style.transform,'translate3d(8px,470px,0)');
  vv.offsetTop=180.6;vv.dispatchEvent(new w.Event('scroll'));await tick();assert.equal(dialog.style.transform,'translate3d(8px,470px,0)');assert.equal(input.value,'Diese Frage ist unklar');assert(dialog.open);
  input.blur();vv.height=800;vv.offsetTop=0;vv.dispatchEvent(new w.Event('resize'));await tick();assert(!dialog.classList.contains('keyboard-compact'));
  w.document.getElementById('a1BugClose').click();assert.equal(dialog.style.top,'');assert(!dialog.open);dom.window.close();
});
test('resolved reports are excluded from both the visible list and JSON export',async()=>{
  let exported;
  const {dom,w}=await ui(w=>{
    w.A1Profile.getBugReports=async()=>[{id:'open-1',status:'open',message:'Still open',context:{}},{id:'done-1',status:'resolved',message:'Already done',context:{}}];
    w.A1Profile.isBugReportAdmin=async()=>true;
    w.Blob=class{constructor(parts){exported=JSON.parse(parts[0]);}};
    w.URL.createObjectURL=()=> 'blob:test';w.URL.revokeObjectURL=()=>{};
    w.HTMLAnchorElement.prototype.click=()=>{};
  });
  w.A1BugReports.open();await w.A1BugReports.showReports();
  assert(w.document.querySelector('.a1-bug-reports').textContent.includes('Still open'));
  assert(!w.document.querySelector('.a1-bug-reports').textContent.includes('Already done'));
  w.document.getElementById('a1BugExport').click();assert.equal(exported.reports.length,1);assert.equal(exported.reports[0].id,'open-1');
  dom.window.close();
});
test('quick subcategories are scoped, optional, restored and submitted with report context',async()=>{
  const {dom,w,calls,succeed}=await ui();w.A1BugReports.open();
  assert(w.document.getElementById('a1BugReasons').hidden);
  w.document.querySelector('[data-bug-category="question"]').click();
  assert.equal(w.document.querySelectorAll('[data-bug-reason]').length,3);
  w.document.querySelector('[data-bug-reason="wrong-word"]').click();
  w.document.getElementById('a1BugClose').click();w.A1BugReports.open();
  assert.equal(w.document.querySelector('[data-bug-reason="wrong-word"]').getAttribute('aria-pressed'),'true');
  w.document.querySelector('[data-bug-category="answers"]').click();
  assert(!w.document.querySelector('[data-bug-reason="wrong-word"]'));
  assert.equal(w.document.querySelectorAll('[data-bug-reason][aria-pressed="true"]').length,0);
  w.document.querySelector('[data-bug-reason="explanation"]').click();
  succeed();await w.document.getElementById('a1BugSend').onclick();
  assert.equal(calls[0].context.issueType,'answers');assert.equal(calls[0].context.issueReason,'explanation');
  assert(calls[0].message.includes('Erklärung der Antwort falsch'));assert(calls[0].context.question);
  dom.window.close();
});
test('actual lesson-check choice and gap screens expose task content and nested feedback choices',async()=>{
  const {dom,w,calls,succeed}=await ui(w=>{
    w.scrollTo=()=>{};w.Math.random=()=>.999;
    for(const file of ['francais/data.js','francais/mastery-specs.js','francais/mastery.js'])w.eval(fs.readFileSync(path.join(__dirname,'..',file),'utf8'));
  });
  w.FR_A1_MASTERY.renderLessonTest({lesson:w.FR_A1_DATA.lessons[1],view:w.document.getElementById('view'),state:{},save:()=>{},onBack:()=>{},speak:()=>{}});
  w.document.getElementById('masteryStart').click();
  const question=w.document.querySelector('.quiz-q').textContent,options=[...w.document.querySelectorAll('.option-btn')].map(b=>b.textContent);
  w.A1BugReports.open();assert.equal(w.A1BugReports.context().lessonId,2);assert.equal(w.A1BugReports.context().step,'check');
  assert.equal(w.A1BugReports.context().question,question);assert.deepEqual([...w.A1BugReports.context().options],options);
  w.document.querySelector('[data-bug-category="answers"]').click();w.document.querySelector('[data-bug-reason="explanation"]').click();
  succeed();await w.document.getElementById('a1BugSend').onclick();assert.equal(calls[0].context.question,question);assert.equal(calls[0].context.issueReason,'explanation');
  w.document.getElementById('a1BugClose').click();
  for(let i=0;i<30&&!w.document.getElementById('masteryInput');i++){w.document.querySelector('[data-mastery-o]').click();w.document.getElementById('masteryNext').click();}
  assert(w.document.getElementById('masteryInput'));w.document.getElementById('masteryInput').value='PRIVATE ANSWER';
  w.A1BugReports.open();assert(w.document.querySelector('[data-bug-category="question"]'));
  assert(w.A1BugReports.context().question.includes('___'));assert(!JSON.stringify(w.A1BugReports.context()).includes('PRIVATE ANSWER'));
  dom.window.close();
});
test('admin export downloads first and archives only the exported reports',async()=>{
 let reports=[{id:'first',status:'open',message:'First report',context:{}}],archived,downloaded=false;
 const {dom,w}=await ui(w=>{
  w.A1Profile.getBugReports=async()=>reports;w.A1Profile.isBugReportAdmin=async()=>true;
  w.A1Profile.archiveExportedBugReports=async ids=>{assert(downloaded);archived=[...ids];reports=[{id:'new',status:'open',message:'New report after export',context:{}}];};
  w.Blob=class{};w.URL.createObjectURL=()=> 'blob:export';w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=()=>{downloaded=true;};
 });
 w.A1BugReports.open();await w.A1BugReports.showReports();await w.document.getElementById('a1BugExport').onclick();
 assert.deepEqual(archived,['first']);assert(w.document.querySelector('.a1-bug-reports').textContent.includes('New report after export'));assert(!w.document.querySelector('.a1-bug-reports').textContent.includes('First report'));
 w.A1Profile.archiveExportedBugReports=async()=>{throw Error('offline')};await w.document.getElementById('a1BugExport').onclick();
 assert(w.document.getElementById('a1BugStatus').textContent.includes('nicht archiviert'));assert.equal(w.document.getElementById('a1BugExport').disabled,false);
 dom.window.close();
});
test('sending closes immediately while pending and a late response preserves a newly edited draft',async()=>{
 let finish;
 const {dom,w}=await ui(w=>{w.A1Profile.submitBugReport=()=>new Promise(resolve=>{finish=resolve;});});
 w.A1BugReports.open();const input=w.document.getElementById('a1BugMessage');input.value='Original report';input.dispatchEvent(new w.Event('input'));
 const sending=w.document.getElementById('a1BugSend').onclick();assert.equal(w.document.getElementById('a1BugDialog').open,false);
 w.A1BugReports.open();const newer=w.document.getElementById('a1BugMessage');newer.value='A newer edited report';newer.dispatchEvent(new w.Event('input'));
 finish();await sending;assert(w.document.getElementById('a1BugDialog').open);assert.equal(newer.value,'A newer edited report');
 w.document.getElementById('a1BugClose').click();w.A1BugReports.open();assert.equal(w.document.getElementById('a1BugMessage').value,'A newer edited report');dom.window.close();
});
test('dialogue reports capture the full conversation and all four fields with their options',async()=>{
 const {dom,w,calls,succeed}=await ui(w=>{
  for(const f of ['francais/comprehension-content.js','shared/comprehension.js'])w.eval(fs.readFileSync(path.join(__dirname,'..',f),'utf8'));
  const view=w.document.getElementById('view');view.innerHTML='<header data-bug-lesson="4"><h2>4. Uhrzeit</h2></header><div id="dialogue"></div>';
  w.A1Comprehension.render({root:view.querySelector('#dialogue'),data:w.A1_COMPREHENSION_CONTENT[4],work:{},lessonId:4,targetLang:'fr',uiLang:'de',save:()=>{},onContinue:()=>{}});
 });
 w.document.querySelector('[data-comprehension-answer="1"]').click();
 w.A1BugReports.open();assert(w.document.querySelector('[data-bug-category="answers"]'));w.document.querySelector('[data-bug-category="answers"]').click();w.document.querySelector('[data-bug-reason="explanation"]').click();
 succeed();await w.document.querySelector('#a1BugSend').onclick();const c=calls[0].context,d=w.A1_COMPREHENSION_CONTENT[4];assert.equal(c.question,d.fields[1].label);assert.equal(c.step,'comprehension');assert.equal(c.lessonId,4);assert.equal(c.options.length,4);
 for(const f of d.fields)for(const option of f.options)assert(c.options.some(line=>line.includes(option)));for(const turn of d.turns)assert(c.audioTexts.some(t=>t.includes(turn.text)));assert.equal(c.issueReason,'explanation');dom.window.close();
});
