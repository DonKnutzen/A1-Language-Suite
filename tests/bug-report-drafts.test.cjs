const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const source=fs.readFileSync(path.join(__dirname,'../shared/bug-reports.js'),'utf8');
async function ui(){
  const dom=new JSDOM('<main id="view"><header data-bug-lesson="4"><h2>4. Uhrzeit</h2></header><div class="quiz-q">Le rendez-vous est ___ dix heures.</div><button class="option-btn">à</button><button class="option-btn">en</button></main>',{url:'https://example.org/francais/',runScripts:'outside-only'}),w=dom.window;
  await new Promise(r=>w.addEventListener('load',r));w.HTMLDialogElement.prototype.show=function(){this.open=true};w.HTMLDialogElement.prototype.close=function(){this.open=false};
  let calls=[],failure=true;
  w.A1Profile={getUiLang:()=> 'de',getCurrent:()=>({profileKey:'Phillip'}),submitBugReport:async p=>{calls.push(p);if(failure)throw Error('BUG_SEND_TIMEOUT')}};
  w.eval(fs.readFileSync(path.join(__dirname,'../shared/bug-dictation.js'),'utf8'));w.eval(source);return {dom,w,calls,succeed:()=>{failure=false;}};
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

test('reporting stays non-modal, can minimize, and retains text while the page is used',async()=>{
  const {dom,w}=await ui();w.HTMLDialogElement.prototype.showModal=function(){throw Error('must not block the page');};
  let clicked=false;w.document.querySelector('.option-btn').onclick=()=>{clicked=true;};
  w.A1BugReports.open();const dialog=w.document.getElementById('a1BugDialog');assert(dialog.open);assert.equal(dialog.dataset.mode,'composer');assert(!dialog.querySelector('.a1-bug-preview').open);assert.equal(dialog.querySelector('textarea').rows,2);
  const input=w.document.getElementById('a1BugMessage');input.value='I need to see the question';input.dispatchEvent(new w.Event('input'));
  w.document.getElementById('a1BugMinimize').click();assert(dialog.classList.contains('is-collapsed'));w.document.querySelector('.option-btn').click();assert(clicked);w.document.getElementById('a1BugMinimize').click();assert(!dialog.classList.contains('is-collapsed'));assert.equal(input.value,'I need to see the question');dom.window.close();
});

test('dictation preserves typed text, updates interim results without duplication and never sends automatically',async()=>{
  const {dom,w,calls}=await ui();let instance;
  w.SpeechRecognition=class{constructor(){instance=this;}start(){this.onstart();}stop(){this.onend();}abort(){this.aborted=true;}};
  w.A1BugReports.open();const input=w.document.getElementById('a1BugMessage'),mic=w.document.getElementById('a1BugMic'),send=w.document.getElementById('a1BugSend');input.value='Die Aufgabe:';input.dispatchEvent(new w.Event('input'));mic.click();assert.equal(instance.lang,'de-DE');assert.equal(mic.getAttribute('aria-pressed'),'true');assert(send.disabled);
  const result=s=>instance.onresult({results:[[{transcript:s}]]});result('ist');result('ist unklar');assert.equal(input.value,'Die Aufgabe: ist unklar');assert(w.localStorage.getItem('a1suite.bugPending:Phillip').includes('ist unklar'));
  mic.click();assert.equal(mic.getAttribute('aria-pressed'),'false');assert(!send.disabled);assert(!input.readOnly);assert.equal(calls.length,0);dom.window.close();
});
test('denied microphone access restores typing and closing aborts active dictation',async()=>{
  const {dom,w}=await ui();let instance;
  w.webkitSpeechRecognition=class{constructor(){instance=this;}start(){}stop(){this.onend();}abort(){this.aborted=true;}};
  w.A1BugReports.open();w.document.getElementById('a1BugMic').click();instance.onerror({error:'not-allowed'});instance.onend();assert(w.document.getElementById('a1BugStatus').textContent.includes('nicht freigegeben'));assert(!w.document.getElementById('a1BugMessage').readOnly);
  w.document.getElementById('a1BugMic').click();w.document.getElementById('a1BugClose').click();assert(instance.aborted);dom.window.close();
});
test('unsupported speech recognition offers keyboard dictation without blocking typing',async()=>{
  const {dom,w}=await ui();w.A1BugReports.open();w.document.getElementById('a1BugMic').click();assert(w.document.getElementById('a1BugStatus').textContent.includes('Handy-Tastatur'));assert(!w.document.getElementById('a1BugSend').disabled);dom.window.close();
});
