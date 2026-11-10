const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
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
test('English B1 pause, resume, stop and navigation discard stale callbacks',async()=>{
 const e=fixture(),{w,view}=e,spoken=voiceMock(w);w.EN_A1_APP.renderLesson(1,{step:'listen'});const play=()=>view.querySelector('[data-guided-play]');play().click();const first=spoken.at(-1);play().click();first.onend();assert.equal(spoken.length,1);play().click();assert.equal(spoken.at(-1).text,first.text);view.querySelector('[data-guided-stop]').click();const count=spoken.length;spoken.at(-1).onend();assert.equal(spoken.length,count);play().click();const stale=spoken.at(-1);view.querySelector('[data-lesson-step="grammar"]').click();stale.onend();assert.equal(view.querySelector('[data-guided-status]').textContent,'Bereit');view.innerHTML='';await Promise.resolve();e.close();
});
