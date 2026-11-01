const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
function page(){
 const html=read('francais-a2/index.html');
 const dom=new JSDOM(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,''),{url:'https://example.org/francais-a2/',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window,errors=[];
 w.scrollTo=()=>{};w.TextEncoder=TextEncoder;w.TextDecoder=TextDecoder;w.ResizeObserver=class{observe(){}disconnect(){}};
 if(!w.crypto?.subtle)Object.defineProperty(w,'crypto',{value:require('node:crypto').webcrypto});
 w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){},addListener(){}});
 // The page keeps observers and timers alive; stop them before closing the window.
 const NativeObserver=w.MutationObserver,observers=[],timers=[],close=w.close.bind(w),setI=w.setInterval.bind(w),setT=w.setTimeout.bind(w);
 w.MutationObserver=class extends NativeObserver{constructor(fn){super(fn);observers.push(this);}};const frames=[],raf=w.requestAnimationFrame?.bind(w);if(raf)w.requestAnimationFrame=fn=>{const id=raf(fn);frames.push(id);return id;};
 w.setInterval=(...a)=>{const id=setI(...a);timers.push(id);return id;};w.setTimeout=(...a)=>{const id=setT(...a);timers.push(id);return id;};
 w.close=()=>{observers.forEach(o=>o.disconnect());frames.forEach(id=>w.cancelAnimationFrame(id));timers.forEach(id=>{w.clearInterval(id);w.clearTimeout(id);});close();};
 for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)){
  const src=/src="([^"?]+)/.exec(m[1])?.[1];
  try{w.eval(src?read(path.join('francais-a2',src)):m[2]);}catch(e){errors.push((src||'inline')+': '+e.message);}
 }
 return {dom,w,errors,view:w.document.getElementById('view')};
}
test('Français A2 has its own course id, progress key, cache and landing tile',()=>{
 const html=read('francais-a2/index.html'),sw=read('francais-a2/service-worker.js');
 assert.match(html,/window\.A1_APP_META=\{course:"francais-a2",stateBaseKey:"francaisA2TelcState_v1"\}/);
 assert.match(sw,/^const CACHE="francais-a2-v\d+";/m);assert.match(sw,/^const PREFIX="francais-a2-";/m);
 const assets=[...html.matchAll(/(?:src|href)="([^"]+\.(?:js|css)\?v=[^"]+)"/g)].map(m=>m[1].startsWith('../')?m[1]:'./'+m[1]);
 for(const asset of assets)assert(sw.includes(JSON.stringify(asset)),'not precached: '+asset);
 assert(!html.includes('lesson1-practice.js'),'A1 lesson 1 drills stay in the A1 course');
 for(const file of html.matchAll(/src="(?!\.\.\/)([^"?]+)/g))assert(fs.existsSync(path.join(root,'francais-a2',file[1])),file[1]);
 assert(read('index.html').includes('<a class="course" href="francais-a2/">'));
 assert(read('shared/profile.js').includes("if(META.course==='francais-a2')return 'de';"),'A2 stays German even with an English suite preference');
 assert(read('shared/profile.js').includes("if(course === 'fr-a2' || course === 'francais-a2') return 'fr-a2';"));
});
test('the A2 lesson plan has 24 lessons, each tied to a part of the telc Français A2 exam',()=>{
 const w={};new Function('window',read('francais-a2/data.js'))(w);const D=w.FR_A1_DATA;
 assert.equal(D.lessons.length,24);assert.deepEqual(D.lessons.map(l=>l.id),[...Array(24)].map((_,i)=>i+1));
 for(const l of D.lessons){assert(l.title&&l.topic&&l.canDo[0]?.startsWith('Ich ')&&l.grammar.title&&l.grammar.explanation,'lesson '+l.id);assert(l.telc.length>=1,'lesson '+l.id);}
 assert.equal(new Set(D.lessons.map(l=>l.title)).size,24);
 const E=D.curriculum.exam,points=E.written.flatMap(t=>t.parts).reduce((s,p)=>s+p.points,0)+E.oral.parts.reduce((s,p)=>s+p.points,0);
 assert.equal(points,100);assert.equal(E.pass,60);
 assert.deepEqual(E.written.map(t=>[t.id,t.minutes]),[['el',15],['co',20],['ce',30],['ee',15]]);
 assert.deepEqual(E.written.flatMap(t=>t.parts).reduce((s,p)=>s+p.items,0),45);
});
test('shared French A1 vocabulary and lexical data never appear in A2 lessons',()=>{
 const w={};new Function('window',read('shared/vocabulary-content.js')+read('francais-a2/course-scope.js'))(w);
 assert(w.A1_VOCABULARY_CONTENT.length>100);
 for(const word of w.A1_VOCABULARY_CONTENT)assert.deepEqual(word.frLessons,word.frA2Lessons||[],word.fr);
 const {dom,w:p}=page();
 assert.equal(p.A1LessonFoundations.content.fr,p.FR_A2_FOUNDATIONS);assert.equal(p.A1LessonLexicon.entries.fr.length,0);assert.equal(p.A1LessonVocabularyPlan.fr,undefined);
 dom.window.close();
});
test('the A2 page loads and its main routes render without errors',()=>{
 const {dom,w,errors,view}=page(),click=s=>w.document.querySelector(s).click();
 assert.deepEqual(errors,[]);
 assert.match(view.textContent,/Ausführlich vorstellen/);
 click('[data-route="learn"]');assert.equal(view.querySelectorAll('[data-lesson]').length,24);assert.match(view.textContent,/telc Français A2/);
 const planned=w.FR_A1_DATA.lessons.find(l=>l.status==='planned');if(planned){click(`[data-lesson="${planned.id}"]`);assert.match(view.textContent,/IN VORBEREITUNG/);click('[data-route="learn"]');}click('[data-lesson="3"]');assert.match(view.textContent,/Lektions-Check/);
 click('[data-route="exam"]');assert.match(view.textContent,/Éléments langagiers/);assert.match(view.textContent,/Bestanden ab 60 von 100 Punkten/);
 click('[data-route="practice"]');assert.match(view.textContent,/A2 · FRANÇAIS/);
 assert.deepEqual(errors,[]);dom.window.close();
});
test('every authored A2 lesson has complete, close-option practice in all steps, Hard Mode and the quiz tower',()=>{
 const {dom,w,errors}=page(),D=w.FR_A1_DATA,S=w.FR_A1_MASTERY_SPECS,done=D.lessons.filter(l=>l.status!=='planned');
 assert(done.length>=6);assert.deepEqual(errors,[]);
 const three=(o,answer,where)=>{assert.equal(o.length,3,where);assert.equal(new Set(o).size,3,where);assert(o.includes(answer),where);};
 for(const l of done){
  const at=s=>`L${l.id} ${s}`;
  assert(l.phrases.length>=10,at('phrases'));assert(l.dialogue.length>=6,at('dialogue'));
  assert.equal(l.quiz.length,10,at('quiz'));for(const q of l.quiz){three(q.o,q.o[q.a],at(q.q));assert(q.audio&&q.explanation,at(q.q));}
  assert.equal(w.A1ExerciseEngine.makeAuthored(l).length,10,at('training'));
  const s=S[l.id];assert.equal(s.goals.length,3,at('goals'));assert.equal(s.checkTasks.length,8,at('check'));
  for(const t of s.checkTasks){three(t.o,t.answer,at(t.q));assert(t.explanation,at(t.q));}
  assert(new Set(s.checkTransfers.map(t=>t.family)).size>=5,at('transfer families'));
  for(const t of s.checkTransfers)assert(t.prompt.includes('___')&&t.answer&&t.context,at(t.prompt));
  assert(w.FR_A1_MASTERY.testCount(l.id)>=13,at('check length'));
  for(const t of s.tasks){three(t.o,t.answer,at(t.prompt));assert(t.prompt.includes('___'),at(t.prompt));}
  const app=D.applications[l.id];assert(app.speakModel&&app.writeModel&&app.writingHints.length===3,at('applications'));
  const html=w.FR_A1_DEEPENING.enrich(l,`<details class="lesson-explanation lesson-deepening"><summary>V</summary></details>`);
  const pools=w.FR_A1_DEEPENING.pools(l,html);assert.equal(pools.length,w.FR_A1_DEEPENING_CONTENT[l.id].length,at('units'));
  for(const p of pools)assert(p.tasks.length>=4,at('drill '+p.title));
  const c=w.A1_COMPREHENSION_CONTENT[l.id];assert(c.turns.length>=8&&c.fields.length===6,at('comprehension'));for(const f of c.fields)three(f.options,f.answer,at(f.label));
  const intro=w.FR_A1_INTRO_LISTENING[l.id];three(intro.o,intro.audio,at('intro'));
  const H=w.FR_A1_HARD_CONTENT[l.id];assert(H.gaps.length>=12,at('hard gaps'));assert.equal(H.listening.length,2,at('hard listening'));
  for(const b of H.listening){assert.equal(b.questions.length,3);for(const q of b.questions)if(q.options)three(q.options,q.answers[0],at(q.q));}
  assert(w.A1_GAME_HARD.supports('fr',l.id),at('hard supported'));const game=w.A1_GAME_HARD.build('fr',l.id);assert(game.tasks.length>=10,at('hard tasks'));
  assert(w.A1_QUIZ_SHOW.generate('fr',l.id).length>=12,at('tower'));
  assert(w.A1_VOCABULARY_CONTENT.filter(v=>v.frLessons.includes(l.id)).length>=10,at('vocabulary'));
  assert(w.FR_A2_FOUNDATIONS[l.id].words.length>=6,at('word list'));
 }
 dom.window.close();
});
