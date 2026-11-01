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
 w.MutationObserver=class extends NativeObserver{constructor(fn){super(fn);observers.push(this);}};
 w.setInterval=(...a)=>{const id=setI(...a);timers.push(id);return id;};w.setTimeout=(...a)=>{const id=setT(...a);timers.push(id);return id;};
 w.close=()=>{observers.forEach(o=>o.disconnect());timers.forEach(id=>{w.clearInterval(id);w.clearTimeout(id);});close();};
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
 assert.equal(Object.keys(p.A1LessonFoundations.content.fr).length,0);assert.equal(p.A1LessonLexicon.entries.fr.length,0);assert.equal(p.A1LessonVocabularyPlan.fr,undefined);
 dom.window.close();
});
test('the A2 page loads and its main routes render without errors',()=>{
 const {dom,w,errors,view}=page(),click=s=>w.document.querySelector(s).click();
 assert.deepEqual(errors,[]);
 assert.match(view.textContent,/Ausführlich vorstellen/);
 click('[data-route="learn"]');assert.equal(view.querySelectorAll('[data-lesson]').length,24);assert.match(view.textContent,/telc Français A2/);
 click('[data-lesson="3"]');assert.match(view.textContent,/IN VORBEREITUNG/);assert.match(view.textContent,/Demander son chemin/);
 click('[data-route="exam"]');assert.match(view.textContent,/Éléments langagiers/);assert.match(view.textContent,/Bestanden ab 60 von 100 Punkten/);
 click('[data-route="practice"]');assert.match(view.textContent,/A2 · FRANÇAIS/);
 assert.deepEqual(errors,[]);dom.window.close();
});
