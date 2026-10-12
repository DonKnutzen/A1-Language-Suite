const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const source=fs.readFileSync(path.join(__dirname,'../shared/bug-reports.js'),'utf8');
async function ui(){
  const dom=new JSDOM('<main id="view"><header data-bug-lesson="4"><h2>4. Uhrzeit</h2></header><div class="quiz-q">Le rendez-vous est ___ dix heures.</div><button class="option-btn">à</button><button class="option-btn">en</button></main>',{url:'https://example.org/francais/',runScripts:'outside-only'}),w=dom.window;
  await new Promise(r=>w.addEventListener('load',r));w.HTMLDialogElement.prototype.showModal=function(){this.open=true};w.HTMLDialogElement.prototype.close=function(){this.open=false};
  let calls=[],failure=true;
  w.A1Profile={getUiLang:()=> 'de',getCurrent:()=>({profileKey:'Phillip'}),submitBugReport:async p=>{calls.push(p);if(failure)throw Error('BUG_SEND_TIMEOUT')}};
  w.eval(source);return {dom,w,calls,succeed:()=>{failure=false;}};
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
