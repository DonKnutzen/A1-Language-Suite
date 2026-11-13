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
  w.scrollTo=()=>{};w.SpeechSynthesisUtterance=function(t){this.text=t;};w.speechSynthesis={getVoices:()=>voice?[{lang:'el-GR',name:'Greek',voiceURI:'el'}]:[],cancel(){},speak(u){u.onend?.();},addEventListener(){}};
  let profile='one';const saves=[];
  w.A1Profile={getUiLang:()=> 'de',namespacedKey:b=>`${b}::profile:${profile}`,saveProgress:(...args)=>saves.push(args)};
  w.A1Streak={completeExercise(){}};
  for(const [k,v] of Object.entries(storage))w.localStorage.setItem(k,v);
  w.matchMedia=()=>({matches:true,addEventListener(){},removeEventListener(){}});
  for(const f of ['shared/learning.js','shared/voice-selection.js','griechisch/data.js','griechisch/transfer.js','griechisch/course.js','shared/guide-language.js','shared/guide-follow.js','shared/lesson-audio-guide.js','shared/quiz-show.js','francais/hard-mode-arcade.js','shared/game-hard-mode.js','griechisch/games.js','griechisch/lesson-flow.js','griechisch/app.js'])w.eval(read(f));
  const click=s=>{
    const destination=/^\[data-step="(\d+)"\]$/.exec(s);
    if(destination){
      const target=({0:0,1:0,2:1,3:1,4:1,5:2,6:3,7:3})[Number(destination[1])];
      const el=w.document.querySelector(`[data-el-step="${target}"]`);assert(el);el.click();return;
    }
    const el=w.document.querySelector(s);assert(el,`missing ${s}`);el.click();
  };
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
test('a qualified 80% check completes a lesson without production self-checks; legacy progress migrates',()=>{
  const state={flowVersion:2,qualifiedCheckBest:{1:80,2:79},lessonMasteryBest:{1:80,2:100},lessonWork:{},lessonCheckLast:{}};
  assert.equal(C.completion(state),4);assert.deepEqual(plain(state.doneLessons),[1]);
  const legacy={lessonMasteryBest:{1:100},lessonWork:{1:{writing:true,speaking:true,step:6}},writingDrafts:{1:'Γεια σου!'}};C.migrate(legacy);assert.equal(legacy.lessonWork[1].step,3);assert.equal(C.completion(legacy),4);assert.equal(legacy.writingDrafts[1],'Γεια σου!');
});
test('all 24 lessons use four current learning steps, paged deepening and the finale entry',t=>{
 const e=env();t.after(e.close);const doc=e.w.document;
 for(const l of D.lessons){e.click('[data-route=learn]');e.click(`[data-lesson="${l.id}"]`);
  assert.equal(doc.querySelectorAll('[data-el-step]').length,4);assert(doc.querySelector('.lesson-goals'));assert(doc.querySelector('[data-guided-play]'));
  e.click('[data-el-step="1"]');assert.equal(doc.querySelector('.lesson-goals'),null);assert(doc.querySelector('#startDeepening'));
  for(let i=0;i<3;i++){e.click(`[data-grammar-progress="${i}"]`);assert(doc.querySelector('#startDeepening'));assert(!/undefined|NaN/.test(doc.getElementById('view').textContent));}
  e.click('[data-el-step="2"]');assert.equal(doc.querySelector('[data-guided-play]'),null);assert(doc.querySelector('#listenTasks'));
  e.click('[data-el-step="3"]');assert(doc.querySelector('[data-hard-start]'));assert(doc.querySelector('#openMillion'));assert.equal(doc.querySelector('[data-hard-start]').disabled,true);assert.equal(doc.querySelector('#writingDraft'),null);assert.equal(doc.querySelector('#saveSpeaking'),null);
 }
});
test('a completed 15-question lesson check unlocks finale and quiz, without free production',t=>{
 const storage={'griechischA1State_v1::profile:one':JSON.stringify({flowVersion:2,lastLessonId:1,lessonQuizBest:{1:100},lessonWork:{1:{step:3,comprehensionDone:true}}})};
 const e=env({storage});t.after(e.close);e.w.Math.random=()=>.999;e.click('#continue');e.click('#startCheck');
 const pool=C.checkTasks(D.lessons[0]);assert.equal(pool.length,15);
 for(const task of pool){if(task.kind==='listening')e.click('#playSource');const option=[...e.w.document.querySelectorAll('[data-answer]')].find(b=>b.dataset.answer===task.answer);assert(option,task.prompt);option.click();e.click('#nextQuestion');}
 assert.equal(e.saved().lessonMasteryBest[1],100);assert.deepEqual(e.saved().doneLessons,[1]);assert.equal(e.saved().session,null);
 e.click('#resultBack');assert.equal(e.w.document.querySelector('[data-hard-start]').disabled,false);assert.equal(e.w.document.querySelector('#openMillion').disabled,false);
 assert.equal(e.saves.at(-1)[0],'griechisch-a1');assert.equal(e.saves.at(-1)[2],4);
});
test('vocabulary errors remain available for spaced review and the check has no free-writing gate',t=>{
 const e=env();t.after(e.close);e.w.Math.random=()=>.999;e.click('#continue');e.click('#startVocabulary');
 const wrong=[...e.w.document.querySelectorAll('[data-answer]')].find(b=>b.dataset.answer!=='Γεια σου!');wrong.click();assert.equal(Object.keys(e.saved().reviewPractice).length,1);assert(e.w.document.getElementById('feedback').textContent.includes('Γεια σου!'));
 e.click('#leaveSession');e.click('[data-route=review]');assert(e.w.document.querySelector('#dueReview'));assert(!e.w.document.getElementById('view').textContent.includes('frei schreiben'));
});
test('no Greek voice means no listening answer can be submitted; skipping is recorded as wrong',t=>{
  const e=env({voice:false});t.after(e.close);e.click('#continue');e.click('[data-step="5"]');e.click('#listenTasks');
  assert([...e.w.document.querySelectorAll('[data-answer]')].every(b=>b.disabled));e.click('#playSource');assert(e.w.document.getElementById('audioStatus').textContent.includes('Keine griechische Stimme'));assert([...e.w.document.querySelectorAll('[data-answer]')].every(b=>b.disabled));
  e.click('#skipAudio');e.click('#nextQuestion');e.click('#skipAudio');e.click('#nextQuestion');assert.equal(e.saved().lessonWork[1].listening,0);assert.equal(Object.keys(e.saved().reviewPractice).length,2);
});
test('voice picker has a working Greek preview',t=>{
  const e=env();t.after(e.close);const spoken=[];e.w.speechSynthesis.speak=u=>spoken.push(u);e.click('#voiceSettings');e.click('#voicePreview');assert.match(spoken[0].text,/Καλημέρα/);assert.equal(spoken[0].lang,'el-GR');
});
test('Greek keyboard remains available for the script lab, including accents, final sigma and capitals',t=>{
 const e=env();t.after(e.close);e.w.Math.random=()=>.999;e.click('[data-route=alphabet]');e.click('[data-group="0"]');
 const first=[...e.w.document.querySelectorAll('[data-answer]')].find(b=>b.dataset.answer==='α');assert(first);first.click();e.click('#nextQuestion');
 const input=e.w.document.getElementById('typedAnswer');input.value='αβ';input.setSelectionRange(1,2);const key=letter=>[...e.w.document.querySelectorAll('.el-keyboard button')].find(b=>b.textContent===letter);key('ς').click();assert.equal(input.value,'ας');key('ά').click();assert.equal(input.value,'αςά');key('⇧').click();key('Ω').click();assert.equal(input.value,'αςάΩ');
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
  assert(assets.includes('./transfer.js?v=2'));assert.match(read('index.html'),/href="griechisch\/"/);assert.match(read('shared/profile.js'),/course === 'griechisch-a1'/);
});

test('an incorrect accent in a choice question is a scored mistake, not a free typed retry',t=>{
  const e=env();t.after(e.close);e.w.Math.random=()=>.999;e.click('[data-route=alphabet]');e.click('#orthography');
  const select=value=>[...e.w.document.querySelectorAll('[data-answer]')].find(b=>b.dataset.answer===value).click();
  select('ναι');e.click('#nextQuestion');select('ο');
  assert(!e.w.document.getElementById('nextQuestion').hidden);
  assert.equal(e.saved().reviewPractice['orthography:1'].wrong,1);
  assert([...e.w.document.querySelectorAll('[data-answer]')].every(b=>b.disabled));
});

test('listening unlocks only after completion; engine failure and stale callbacks cannot unlock a question',t=>{
  const e=env();t.after(e.close);const spoken=[];e.w.speechSynthesis.speak=u=>spoken.push(u);
  e.click('#continue');e.click('[data-step="5"]');e.click('#listenTasks');e.click('#playSource');
  const disabled=()=>[...e.w.document.querySelectorAll('[data-answer]')].every(b=>b.disabled);
  assert(disabled());spoken.at(-1).onerror({error:'synthesis-failed'});assert(disabled());assert.match(e.w.document.getElementById('audioStatus').textContent,/nicht vollständig/);
  e.click('#playSource');const stale=spoken.at(-1).onend;e.click('#skipAudio');e.click('#nextQuestion');stale();assert(disabled());
  e.click('#playSource');assert(disabled());spoken.at(-1).onend();assert(!disabled());
});

test('word-train selections survive a reload and continue at the same exercise',t=>{
 const e=env();t.after(e.close);e.w.Math.random=()=>.999;e.click('#continue');e.click('[data-el-step="1"]');e.click('[data-grammar-progress="1"]');e.click('#startDeepening');
 e.click('[data-order-token="0"]');const stored=e.w.localStorage.getItem('griechischA1State_v1::profile:one');assert.deepEqual(e.saved().session.orderPicks,[0]);
 const resumed=env({storage:{'griechischA1State_v1::profile:one':stored}});t.after(resumed.close);resumed.click('#continue');assert(resumed.w.document.getElementById('orderAnswer').textContent.length>0);assert.equal(resumed.w.document.querySelector('[data-order-token="0"]').disabled,true);
});
test('authored alternatives accept optional first-person subjects without accepting wrong meanings or accents',()=>{
  const lesson=D.lessons[3],task=C.tasks(lesson,'check').find(t=>t.answer==='Μαθαίνω ελληνικά.');
  assert.equal(C.grade('Εγώ μαθαίνω ελληνικά.',task.answer,task.accepted),'correct');
  assert.equal(C.grade('Εγώ μαθαινω ελληνικά.',task.answer,task.accepted),'accent');
  assert.equal(C.grade('Εσύ μαθαίνεις ελληνικά.',task.answer,task.accepted),'wrong');
  assert.equal(C.grade('Ονομάζομαι Άννα.',D.lessons[0].phrases[4].el,D.lessons[0].phrases[4].accepted),'correct');
  assert.deepEqual(plain(D.lessons[9].phrases[5].accepted),[],'do not turn a dative construction into a subject-prefix variant');
});

test('writing models fulfil the explicit information and quantity requirements of their prompts',()=>{
  const model=id=>D.lessons[id-1].model;
  assert.match(model(1),/Γεια σου.*Πώς σε λένε/s);assert.match(model(2),/Άννα.*νερό.*βιβλίο/s);
  assert.match(model(4),/Μιλάω γερμανικά/);assert.equal((model(7).match(/\./g)||[]).length,4);
  assert.match(model(8),/Η φίλη.*Ο φίλος/s);assert.equal((model(8).match(/\./g)||[]).length,4);
  for(const item of ['κιλό μήλα','κιλό τυρί','μπουκάλια νερό','ένα ψωμί'])assert(model(11).includes(item));
  assert.match(model(12),/Το βιβλίο.*Η τσάντα/s);assert.match(model(14),/Πότε.*Πόσο/s);
  for(const time of ['στις επτά','Στις οκτώ','Στις εννέα','στις έντεκα'])assert(model(16).includes(time));
  for(const adverb of ['Συνήθως','πάντα'])assert(model(16).includes(adverb));
  for(const action of ['διαβάζω','Ακούω μουσική','παίζω ποδόσφαιρο','Δεν μπορώ'])assert(model(17).includes(action));
  assert.match(model(18),/παντελόνι.*μπουφάν/s);assert.match(model(20),/πρωινό περιλαμβάνεται;/);
  assert.equal((model(22).match(/\./g)||[]).length,4);assert.equal((model(23).match(/[Θθ]α /g)||[]).length,3);assert.match(model(23),/Πρέπει/);
});

test('corrected tasks replace stale review snapshots while preserving mistake history',t=>{
  const old={reviewPractice:{'18:grammar-2':{task:{id:'18:grammar-2',lessonId:18,prompt:'Veralteter Text',answer:'μπλος παντελόνι',options:['μπλος παντελόνι','μπλη παντελόνι','μπλε παντελόνι'],explanation:'Veraltete Erklärung'},wrong:3,streak:0,due:0}}};
  const e=env({storage:{'griechischA1State_v1::profile:one':JSON.stringify(old)}});t.after(e.close);e.click('[data-route=review]');e.click('#dueReview');
  assert(!e.w.document.getElementById('view').textContent.includes('Veralteter Text'));
  [...e.w.document.querySelectorAll('[data-answer]')].find(b=>b.dataset.answer==='μπλε παντελόνι').click();
  const item=e.saved().reviewPractice['18:grammar-2'];assert.equal(item.wrong,3);assert.equal(item.task.answer,'μπλε παντελόνι');assert.equal(item.streak,1);
});

test('a high check score with skipped audio stays explicitly marked as lacking a listening result',t=>{
  const e=env({voice:false,storage:{'griechischA1State_v1::profile:one':JSON.stringify({flowVersion:2,lastLessonId:1,lessonQuizBest:{1:100},lessonWork:{1:{step:3,comprehensionDone:true}}})}});t.after(e.close);e.w.Math.random=()=>.999;e.click('#continue');e.click('#startCheck');
  for(const task of C.checkTasks(D.lessons[0])){
    if(task.kind==='listening')e.click('#skipAudio');
    else if(!task.options){e.w.document.getElementById('typedAnswer').value=task.answer;e.w.document.getElementById('typedForm').dispatchEvent(new e.w.Event('submit',{cancelable:true}));}
    else [...e.w.document.querySelectorAll('[data-answer]')].find(b=>b.dataset.answer===task.answer).click();
    e.click('#nextQuestion');
  }
  assert.equal(e.saved().lessonMasteryBest[1],87);assert.equal(e.saved().lessonCheckLast[1].skippedAudio,2);
  assert.match(e.w.document.getElementById('view').textContent,/Hörteil (?:blieb zuletzt )?offen/);assert(!e.w.document.getElementById('view').textContent.includes('Gut gefestigt.'));
  e.click('#resultBack');assert.match(e.w.document.getElementById('view').textContent,/Hörteil (?:blieb zuletzt )?offen/);
});

test('reviewed choices avoid obvious length clues and the sigma answer is not the only two-symbol option',()=>{
  const unique=new Map([...D.lessons.flatMap(l=>[...C.tasks(l),...C.tasks(l,'check')]),...C.alphabetTasks(),...D.orthography].map(t=>[t.id,t]));
  for(const t of unique.values()){
    // Real city names differ in length; all three remain plausible place answers.
    if(!t.options||t.id==='18:reading-0')continue;
    assert(t.answer.length<=1.8*Math.max(...t.options.filter(o=>o!==t.answer).map(o=>o.length)),t.id);
  }
  const sigma=C.alphabetTasks().find(t=>t.id==='letter:Σ');assert.equal(sigma.answer,'ς');assert(sigma.options.every(o=>o.length===1));
  const phone=C.tasks(D.lessons[4]).find(t=>t.id==='5:meaning-3');assert(phone.options.every(o=>o.includes('210 345 6789')));
});

test('Greek shares the current lesson navigation and no redundant contents or repeated goal block',t=>{
 const e=env();t.after(e.close);const doc=e.w.document;e.click('#continue');assert(doc.querySelector('.lesson-step-nav'));assert.equal(doc.querySelectorAll('[data-el-step]').length,4);assert.equal(doc.querySelector('details.el-contents'),null);assert.match(doc.querySelector('.lesson-step-context').textContent,/1 \/ 4/);
 e.click('[data-el-step="1"]');assert.equal(doc.querySelector('.lesson-goals'),null);assert(doc.querySelector('[data-guide-scope]'));assert.equal(doc.querySelector('[data-guide-scope]').value,'part');
});
test('phrase pages show four examples at a time and retain both halves',t=>{
  const e=env();t.after(e.close);e.click('#continue');e.click('[data-step="1"]');const doc=e.w.document;
  const visible=()=>[...doc.querySelectorAll('[data-phrase-page]')].filter(r=>!r.hidden).map(r=>r.textContent);
  assert.equal(visible().length,4);assert(visible().some(s=>s.includes('Γεια σου')));e.click('#phrasePager');
  assert.equal(visible().length,4);assert(visible().some(s=>s.includes('Με λένε Άννα')));assert(!visible().some(s=>s.includes('Γεια σου')));
  e.click('[data-el-step="1"]');e.click('[data-el-step="0"]');assert(visible().some(s=>s.includes('Με λένε Άννα')));
});

test('the alphabet uses one six-letter group per page and returns to the originating lesson',t=>{
  const e=env();t.after(e.close);e.click('[data-route=learn]');e.click('[data-lesson="2"]');e.click('#lessonAlphabet');const doc=e.w.document;
  const seen=[];for(let group=0;group<4;group++){
    assert.equal(doc.querySelectorAll('.el-letter-card').length,6);seen.push(...[...doc.querySelectorAll('.el-letter-card .el-letter')].map(el=>el.textContent));
    if(group<3)e.click('#alphabetNext');
  }
  assert.equal(new Set(seen).size,24);assert.match(doc.querySelector('.el-position').textContent,/Gruppe 4 von 4/);e.click('#alphabetBack');assert.match(doc.querySelector('.lesson-step-header h2').textContent,/2\./);
});

test('Greek input assistance is collapsed initially and Shift changes letter case without losing the cursor',t=>{
  const e=env();t.after(e.close);e.w.Math.random=()=>.999;e.click('[data-route=alphabet]');e.click('[data-group="0"]');[...e.w.document.querySelectorAll('[data-answer]')].find(b=>b.dataset.answer==='α').click();e.click('#nextQuestion');const doc=e.w.document,input=doc.getElementById('typedAnswer'),help=doc.querySelector('.el-input-help');
  assert(!help.open);help.open=true;input.value='αβ';input.setSelectionRange(1,2);
  const key=value=>[...help.querySelectorAll('button')].find(b=>b.textContent===value);
  assert(key('Ά').hidden);e.click('.mixed-shift');assert(!key('Ά').hidden);assert(key('α').hidden);key('Ά').click();assert.equal(input.value,'αΆ');assert.equal(input.selectionStart,2);
});


test('every Greek lesson supplies the shared finale games, two gaps per sheet, Greek arcade and a 4-option quiz',t=>{
 const e=env();t.after(e.close);const w=e.w;
 for(const l of D.lessons){
  assert(w.A1_GAME_HARD.supports('el',l.id));const built=w.EL_A1_GAMES.build(l.id);
  assert.deepEqual(plain([...new Set(built.pages.map(p=>p.key))]),['memory','match','order','text','listening']);assert.equal(built.tasks.length,16);
  assert.equal(built.tasks[0].pairs.length,8);assert(built.pages.filter(p=>p.key==='text').every(p=>p.ids.length===2));
  const arcade=w.EL_A1_GAMES.arcadeContent(l.id);assert.equal(arcade.voice,'el-GR');assert.deepEqual(plain(arcade.PHRASES.map(p=>p[0])),plain(l.phrases.map(p=>p.el)));
  for(let i=0;i<12;i++){const r=arcade.formRound();assert.equal(r.options.length,4);assert.equal(new Set(r.options).size,4);assert(r.options.includes(r.answer));assert(/\p{Script=Greek}/u.test(r.sentence));}
  const pool=w.EL_A1_GAMES.quizPool(l.id);assert(pool.length>=12);for(const q of pool){assert.equal(q.o.length,4);assert.equal(new Set(q.o).size,4);assert(['de','el'].includes(q.ol));}
 }
});
test('the shared Greek finale persists, requires actual listening, retries mistakes and unlocks all four arcade games',t=>{
 const e=env();t.after(e.close);const {w}=e,view=w.document.getElementById('view'),state={lessonWork:{}};let cleanup;
 const render=()=>{cleanup?.();cleanup=w.A1_GAME_HARD.render({course:'el',lesson:w.EL_A1_DATA.lessons[0],view,state,save(){},onBack(){}});};t.after(()=>cleanup?.());render();e.click('[data-games-begin]');
 const game=()=>state.lessonWork[1].hardMode.games,attempt=()=>game().attempt;let a=attempt();
 for(let n=0;n<8;n++){e.click(`[data-memory-card="${n*2}"]`);e.click(`[data-memory-card="${n*2+1}"]`);}assert(a.solved[0]);render();assert(attempt().solved[0]);e.click('[data-games-next]');
 const wrongId=a.content.tasks.findIndex(q=>q.type==='text');let failed=false;
 function solvePage(){
  a=attempt();const page=a.content.pages[a.page];
  for(const i of page.ids){if(a.round&&!a.retryIds.includes(i))continue;const q=a.content.tasks[i];
   if(q.type==='match')q.answers.forEach((v,n)=>{e.click(`[data-games-connect="${i}"] [data-match-left="${n}"]`);e.click(`[data-games-connect="${i}"] [data-match-right="${a.orders[i].indexOf(v)}"]`);});
   else if(q.type==='order')for(let n=0;n<q.required;n++)e.click(`[data-games-token="${i}"][data-token="${n}"]`);
   else if(q.type==='text'){const field=view.querySelector(`[data-games-input="${i}"]`);field.value=i===wrongId&&!failed?'λάθος':q.answers[0];if(i===wrongId)failed=true;field.dispatchEvent(new w.Event('input'));}
   else if(q.type==='choice')[...view.querySelectorAll(`[data-games-choice="${i}"]`)].find(x=>x.value===q.answers[0]).click();
  }
  if(page.blocks){e.click('[data-games-check]');assert.match(view.textContent,/zuerst den Text vollständig/);for(const b of page.blocks)e.click(`[data-games-listen="${b}"]`);}
  if(view.querySelector('[data-games-check]'))e.click('[data-games-check]');e.click('[data-games-next]');
 }
 for(let guard=0;attempt().phase==='running';guard++){assert(guard<15);solvePage();}
 assert.equal(game().arcadeUnlocked,undefined);assert.equal(attempt().phase,'summary');e.click('[data-games-retry]');solvePage();assert.equal(attempt().phase,'reviewed');assert.equal(game().arcadeUnlocked,true);
 const result=JSON.stringify(attempt().result);e.click('[data-games-arcade]');assert.equal(view.querySelectorAll('[data-arcade-game]').length,4);assert.equal(JSON.stringify(attempt().result),result);
});
