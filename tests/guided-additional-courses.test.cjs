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

const {fixture}=require('../englisch/tests/b1-fixture.cjs');
function voiceMock(w){const spoken=[];w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};w.speechSynthesis||={};w.A1Voice.select=lang=>({lang});w.A1Voice.cancel=()=>{};w.A1Voice.playUtterance=u=>spoken.push(u);return spoken;}
function tour(w,view,spoken,lang){
 const play=()=>view.querySelector('[data-guided-play]');assert(play());const start=spoken.length;play().click();assert.equal(spoken.length,start+1);let count=0;
 while(play().textContent==='Ⅱ Pause'){assert(count++<1500);spoken.at(-1).onend();}
 const parts=spoken.slice(start);assert(parts.some(p=>p.lang===lang));assert(parts.some(p=>p.lang==='de-DE'));assert.match(parts.at(-1).text,/Jetzt bist du dran/);
}
test('English B1: all 24 lessons narrate English then German and preserve exercise progress',async()=>{
 const e=fixture(),{w,view}=e,spoken=voiceMock(w);assert.deepEqual(e.errors,[]);
 for(let id=1;id<=24;id++){
  w.EN_A1_APP.renderLesson(id,{step:'listen'});const lesson=w.EN_A1_DATA.lessons[id-1],plan=w.EN_B1_GUIDED_AUDIO.plan({lesson,step:'listen',title:'Hören'});
  for(const p of plan.filter(p=>p.phrase!==undefined)){assert.equal(p.lang,'en-GB');assert.equal(plan[plan.indexOf(p)+1].lang,'de-DE');}
  tour(w,view,spoken,'en-GB');assert.equal(w.EN_A1_APP.state.lessonWork[id].heardPhrases.length,new Set(lesson.phrases.map(p=>p[0])).size);assert.equal(w.EN_A1_APP.state.lessonWork[id].quizDone,undefined);
  view.querySelector('[data-lesson-step="grammar"]').click();assert.equal(view.querySelectorAll('.guided-audio').length,1);const pagePlan=w.EN_B1_GUIDED_AUDIO.readContent(view.querySelector('#lessonGrammarPage'));assert(pagePlan.some(p=>p.lang==='en-GB'));assert(!pagePlan.some(p=>p.text.includes('Ergänze:')));
 }
 assert.deepEqual(e.errors,[]);view.innerHTML='';await Promise.resolve();e.close();
});
test('French A2: all lessons narrate French then German without completing quizzes',async()=>{
 const e=page(),{w,view}=e;assert.deepEqual(e.errors,[]);const spoken=voiceMock(w),lessons=w.FR_A1_DATA.lessons;assert.equal(lessons.length,24);
 for(const lesson of lessons){
  w.renderLesson(lesson.id);tour(w,view,spoken,'fr-FR');assert.equal(JSON.parse(w.localStorage.getItem(w.A1Profile.namespacedKey(w.A1_APP_META.stateBaseKey))).lessonWork[lesson.id].heardPhrases.length,new Set(lesson.phrases.map(p=>p[0])).size);assert.equal(JSON.parse(w.localStorage.getItem(w.A1Profile.namespacedKey(w.A1_APP_META.stateBaseKey))).lessonWork[lesson.id].quizDone,undefined);
  view.querySelector('[data-lesson-step="grammar"]').click();assert.equal(view.querySelectorAll('.guided-audio').length,1);assert(w.FR_A1_GUIDED_AUDIO.readContent(view.querySelector('#lessonGrammarPage')).some(p=>p.lang==='fr-FR'));
 }
 view.innerHTML='';await Promise.resolve();e.dom.window.close();
});
test('English B1 pause, resume, stop and navigation discard stale callbacks',async()=>{
 const e=fixture(),{w,view}=e,spoken=voiceMock(w);w.EN_A1_APP.renderLesson(1,{step:'listen'});const play=()=>view.querySelector('[data-guided-play]');play().click();const first=spoken.at(-1);play().click();first.onend();assert.equal(spoken.length,1);play().click();assert.equal(spoken.at(-1).text,first.text);view.querySelector('[data-guided-stop]').click();const count=spoken.length;spoken.at(-1).onend();assert.equal(spoken.length,count);play().click();const stale=spoken.at(-1);view.querySelector('[data-lesson-step="grammar"]').click();stale.onend();assert.equal(view.querySelector('[data-guided-status]').textContent,'Bereit');view.innerHTML='';await Promise.resolve();e.close();
});
