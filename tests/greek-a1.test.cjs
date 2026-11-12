const {test}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {JSDOM}=require('jsdom');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const context={window:{}};vm.createContext(context);for(const f of ['data','transfer','course'])vm.runInContext(read(`griechisch/${f}.js`),context);
const D=context.window.EL_A1_DATA,C=context.window.EL_A1;
const plain=x=>JSON.parse(JSON.stringify(x));
function env({voice=true,storage={}}={}){
  const html=read('griechisch/index.html').replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
  const dom=new JSDOM(html,{url:'https://example.org/griechisch/',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window;
  w.scrollTo=()=>{};w.SpeechSynthesisUtterance=function(t){this.text=t;};w.speechSynthesis={getVoices:()=>voice?[{lang:'el-GR',name:'Greek',voiceURI:'el'}]:[],cancel(){},speak(){},addEventListener(){}};
  let profile='one';const saves=[];
  w.A1Profile={namespacedKey:b=>`${b}::profile:${profile}`,saveProgress:(...args)=>saves.push(args)};
  w.A1Streak={completeExercise(){}};
  for(const [k,v] of Object.entries(storage))w.localStorage.setItem(k,v);
  for(const f of ['shared/learning.js','shared/voice-selection.js','griechisch/data.js','griechisch/transfer.js','griechisch/course.js','griechisch/app.js'])w.eval(read(f));
  const click=s=>{const el=w.document.querySelector(s);assert(el,`missing ${s}`);el.click();};
  const saved=()=>JSON.parse(w.localStorage.getItem(`griechischA1State_v1::profile:${profile}`)||'{}');
  return {w,dom,click,saved,saves,close:()=>w.close(),profile:p=>profile=p};
}
test('24 sequenced lessons have complete original learning material and independent transfers',()=>{
  assert.equal(D.lessons.length,24);let total=0;
  for(const [i,l] of D.lessons.entries()){
    assert.equal(l.id,i+1);assert.equal(l.phrases.length,8);assert(l.rule.length>180);assert(l.goal.startsWith('Ich '));
    assert.equal(l.dialogue.length,l.dialogueDe.length);assert(l.dialogueDe.every(Boolean));assert.equal(l.transfer.length,2);
    for(const k of ['reading','listening']){assert(l[k].body.length>(l.id===2?10:25));assert.equal(l[k].questions.length,2);}
    for(const k of ['writing','speaking','model'])assert(l[k].length>15);
    assert.equal(C.tasks(l).length,23);assert.equal(C.tasks(l,'check').length,17);
    const practice=new Set(C.tasks(l).map(t=>t.prompt));assert(l.transfer.every(t=>!practice.has(t.prompt)));
    total+=C.tasks(l).length;
  }
  assert.equal(total,552);
});
test('every choice has exactly three different options, the answer and an explanation',()=>{
  const pool=[...D.lessons.flatMap(l=>[...C.tasks(l),...C.tasks(l,'check')]),...C.alphabetTasks(),...D.orthography];
  for(const t of pool){assert(t.answer&&t.prompt&&t.explanation,JSON.stringify(t));if(!t.options)continue;assert.equal(t.options.length,3,t.id);assert.equal(new Set(t.options.map(C.normalize)).size,3,t.id);assert(t.options.includes(t.answer),t.id);assert(t.explanation.length>15&&C.normalize(t.explanation)!==C.normalize(t.answer),t.id);}
});
test('alphabet includes all 24 letters once, four usable groups, ς and vowel combinations',()=>{
  assert.equal(D.alphabet.length,24);assert.equal(new Set(D.alphabet.map(a=>a.upper)).size,24);
  assert.equal([...D.alphabet.map(a=>a.upper)].sort().join(''),'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ');
  for(let i=0;i<4;i++){assert.equal(D.alphabet.filter(a=>a.group===i).length,6);assert.equal(C.alphabetTasks(i).length,12);}
  assert(D.alphabet.some(a=>a.lower==='σ/ς'));for(const c of ['αι','ει','οι','ου','αυ','ευ','μπ','ντ','γκ'])assert(D.combinations.some(a=>a[0]===c));assert.equal(D.orthography.length,12);
});
test('answer matching preserves accent learning and trema while accepting Unicode/punctuation variants',()=>{
  assert.equal(C.grade('  ΚΑΛΗΜΈΡΑ!!  ','Καλημέρα!'),'correct');
  assert.equal(C.grade('νερό'.normalize('NFD'),'νερό'),'correct');assert.equal(C.grade('νερο','νερό'),'accent');assert.equal(C.grade('νέρο','νερό'),'accent');
  assert.equal(C.grade('μαιμού','μαϊμού'),'wrong');assert.equal(C.grade('Πώς σε λένε;','Πώς σε λένε;'),'correct');assert.equal(C.grade('κόσμοσ','κόσμος'),'wrong');
  assert.equal(C.grade('!',';'),'wrong');
});
test('a quiz score alone never completes a lesson; checks and both production criteria do',()=>{
  const s={lessonMasteryBest:{1:100,2:79,3:80},lessonWork:{1:{writing:true},2:{writing:true,speaking:true},3:{writing:true,speaking:true}}};
  assert.equal(C.completion(s),4);assert.deepEqual(plain(s.doneLessons),[3]);s.lessonWork[1].speaking=true;assert.equal(C.completion(s),8);
});
test('all 24 lessons and all eight steps render, including dialogue meanings and production controls',t=>{
  const e=env();t.after(e.close);
  for(const l of D.lessons){e.click('[data-route=learn]');e.click(`[data-lesson="${l.id}"]`);for(let i=0;i<8;i++){e.click(`[data-step="${i}"]`);assert(!/undefined|NaN/.test(e.w.document.getElementById('view').textContent),`L${l.id}.${i}`);if(i===3)assert.equal(e.w.document.querySelectorAll('.el-dialogue details').length,l.dialogue.length);if(i===6){assert(e.w.document.querySelector('#playbackEl').tagName==='DIV');assert(e.w.document.querySelector('.el-keyboard'));}}}
});
test('new check attempt includes every core phrase, grammar, transfer and comprehension question',t=>{
  const e=env();t.after(e.close);e.w.Math.random=()=>.999;
  e.click('#continue');e.click('[data-step="7"]');e.click('#startCheck');
  let total=0;
  for(const task of C.tasks(D.lessons[0],'check')){
    const input=e.w.document.getElementById('typedAnswer');
    if(task.kind==='listening'){assert(!e.w.document.getElementById('view').textContent.includes(task.source));e.click('#playSource');}
    if(input){input.value=task.answer;e.w.document.getElementById('typedForm').dispatchEvent(new e.w.Event('submit',{bubbles:true,cancelable:true}));}
    else {const option=[...e.w.document.querySelectorAll('[data-answer]')].find(b=>b.dataset.answer===task.answer);assert(option,task.prompt);option.click();}
    assert.equal(e.w.document.getElementById('nextQuestion').hidden,false);e.click('#nextQuestion');total++;
  }
  assert.equal(total,17);assert.equal(e.saved().lessonMasteryBest[1],100);assert.deepEqual(e.saved().doneLessons,[]);
  e.click('#resultBack');e.click('[data-step="6"]');const draft=e.w.document.getElementById('writingDraft');draft.value='Καλημέρα! Με λένε Άννα. Πώς σε λένε;';
  e.click('#saveWriting');assert(!e.saved().lessonWork[1]?.writing);
  for(const id of ['wTask','wForms','wMeaning'])e.w.document.getElementById(id).checked=true;e.click('#saveWriting');
  e.w.document.getElementById('spoken').checked=true;e.click('#saveSpeaking');assert.deepEqual(e.saved().doneLessons,[1]);
  assert.equal(e.saves.at(-1)[0],'griechisch-a1');assert.equal(e.saves.at(-1)[2],4);
});
test('typed accent hints do not award points and reveal queues a task for repetition',t=>{
  const e=env();t.after(e.close);e.w.Math.random=()=>.999;e.click('[data-route=review]');e.click('#freePractice');
  const field=e.w.document.getElementById('typedAnswer');field.value='Γεια σου';e.w.document.getElementById('typedForm').dispatchEvent(new e.w.Event('submit',{cancelable:true}));e.click('#nextQuestion');
  // Second phrase is Γεια σας; reveal it as a failed task.
  e.click('#reveal');assert.equal(Object.keys(e.saved().reviewPractice).length,1);e.click('#nextQuestion');
  const next=e.w.document.getElementById('typedAnswer');next.value='Καλημερα';e.w.document.getElementById('typedForm').dispatchEvent(new e.w.Event('submit',{cancelable:true}));assert(e.w.document.getElementById('feedback').textContent.includes('Tonos'));assert(e.w.document.getElementById('nextQuestion').hidden);
  next.value='Καλημέρα';e.w.document.getElementById('typedForm').dispatchEvent(new e.w.Event('submit',{cancelable:true}));assert(!e.w.document.getElementById('nextQuestion').hidden);
});
test('no Greek voice means no listening answer can be submitted; skipping is recorded as wrong',t=>{
  const e=env({voice:false});t.after(e.close);e.click('#continue');e.click('[data-step="5"]');e.click('#listenTasks');
  assert([...e.w.document.querySelectorAll('[data-answer]')].every(b=>b.disabled));e.click('#playSource');assert(e.w.document.getElementById('audioStatus').textContent.includes('Keine griechische Stimme'));assert([...e.w.document.querySelectorAll('[data-answer]')].every(b=>b.disabled));
  e.click('#skipAudio');e.click('#nextQuestion');e.click('#skipAudio');e.click('#nextQuestion');assert.equal(e.saved().lessonWork[1].listening,0);assert.equal(Object.keys(e.saved().reviewPractice).length,2);
});
test('voice picker has a working Greek preview',t=>{
  const e=env();t.after(e.close);const spoken=[];e.w.speechSynthesis.speak=u=>spoken.push(u);e.click('#voiceSettings');e.click('#voicePreview');assert.match(spoken[0].text,/Καλημέρα/);assert.equal(spoken[0].lang,'el-GR');
});
test('Greek keyboard inserts at selection and can enter accents, final sigma and capitals',t=>{
  const e=env();t.after(e.close);e.click('[data-route=review]');e.click('#freePractice');const input=e.w.document.getElementById('typedAnswer');input.value='αβ';input.setSelectionRange(1,2);
  const key=[...e.w.document.querySelectorAll('.el-keyboard button')].find(b=>b.textContent==='ώ');key.click();assert.equal(input.value,'αώ');assert.equal(input.selectionStart,2);for(const char of ['ς','Ά','ΰ'])assert([...e.w.document.querySelectorAll('.el-keyboard button')].some(b=>b.textContent===char));
});
test('corrupt storage recovers, profiles remain separate, restored cloud progress reaches home',t=>{
  const e=env({storage:{'griechischA1State_v1::profile:one':'{broken'}});t.after(e.close);assert.match(e.w.document.getElementById('view').textContent,/0 von 24/);
  e.w.localStorage.setItem('griechischA1State_v1::profile:one',JSON.stringify({lessonMasteryBest:{1:90},lessonWork:{1:{writing:true,speaking:true}}}));e.w.A1ApplyCloudProgress();assert.match(e.w.document.getElementById('view').textContent,/1 von 24/);
  e.profile('two');e.w.A1ApplyCloudProgress();assert.match(e.w.document.getElementById('view').textContent,/0 von 24/);
});
test('every script, stylesheet, manifest and offline asset exists',()=>{
  const doc=new JSDOM(read('griechisch/index.html')).window.document;
  const assets=[...doc.querySelectorAll('script[src],link[href]')].map(el=>el.getAttribute('src')||el.getAttribute('href'));
  const sw={};vm.runInNewContext(read('griechisch/service-worker.js')+';self.assets=ASSETS;',{self:{addEventListener(){},...sw}});
  const ctx={self:{addEventListener(){}}};vm.runInNewContext(read('griechisch/service-worker.js')+';self.assets=ASSETS;',ctx);
  assets.push(...ctx.self.assets);
  for(const asset of assets){const clean=asset.split('?')[0];assert(fs.existsSync(path.resolve(root,'griechisch',clean)),asset);}
  assert(assets.includes('./transfer.js?v=1'));assert.match(read('index.html'),/href="griechisch\/"/);assert.match(read('shared/profile.js'),/course === 'griechisch-a1'/);
});
