const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM,VirtualConsole}=require('jsdom');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
function env(course,id,{ui=course==='de'?'fr':'de',state}={}){
 const dom=new JSDOM('<main id="view"></main>',{url:`https://example.test/${course==='de'?'deutsch':'francais'}/`,runScripts:'outside-only',virtualConsole:new VirtualConsole()}),w=dom.window;
 w.scrollTo=()=>{};w.A1Profile={getUiLang:()=>ui};w.A1Voice={cancel(){},speak(){},speakDialogue(){return true;}};w.speechSynthesis={};w.SpeechSynthesisUtterance=class{};
 const jobs=[];w.setTimeout=fn=>{jobs.push(fn);return jobs.length;};w.clearTimeout=()=>{};
 const files=course==='de'?['shared/vocabulary-content.js','deutsch/hard-mode-content.js','shared/quiz-show.js','deutsch/hard-mode.js']:['shared/vocabulary-content.js','francais/data.js','francais/hard-mode-content.js','shared/quiz-show.js','francais/hard-mode.js'];
 for(const f of files)w.eval(read(f));
 state||={lessonMasteryBest:{[id]:80},lessonWork:{}};let saves=0;const view=w.document.querySelector('main');
 const lesson=course==='de'?{id,title:'Test'}:w.FR_A1_DATA.lessons.find(l=>l.id===id);
 const render=()=>(course==='de'?w.DE_A1_HARD_MODE:w.FR_A1_HARD_MODE).render({lesson,view,state,save(){saves++;},onBack(){},legacy:true});
 const click=s=>{const el=view.querySelector(s);assert(el,s);el.click();};
 return {dom,w,view,state,render,click,flush(){while(jobs.length)jobs.shift()();},get saves(){return saves;},get quiz(){return state.lessonWork[id]?.hardMode?.quiz;}};}

test('every lesson of both courses has questions for all ten levels with four distinct answers and one right one',()=>{const e=env('fr',1),Q=e.w.A1_QUIZ_SHOW;e.w.eval(read('deutsch/hard-mode-content.js'));
 for(const course of ['fr','de'])for(let id=1;id<=24;id++){const pool=Q.generate(course,id);
  for(let l=1;l<=10;l++)assert(pool.filter(q=>q.l===l).length>=3,`${course} ${id} level ${l}`);
  for(const q of pool){assert.equal(q.o.length,4,`${course} ${id} ${q.q[0]}`);assert.equal(new Set(q.o.map(o=>String(o).trim().toLowerCase())).size,4,`${course} ${id} ${q.q[0]} ${q.o}`);assert(q.q[0]&&q.h[0]);}
  for(const q of pool.filter(q=>q.kind.startsWith('gap')))assert(q.q[0].includes('___'));
  const set=Q.pickSet(pool);assert.equal(set.length,10);assert.deepEqual(Array.from(set,q=>q.l),[1,2,3,4,5,6,7,8,9,10]);assert.equal(new Set(set.map(q=>q.id)).size,10);const srcs=set.flatMap(q=>[q.src,q.also]).filter(Boolean);assert.equal(new Set(srcs).size,srcs.length,`${course} ${id} repeats a sentence`);}
 e.dom.window.close();});
test('difficulty rises: meaning first, then the target word, then gap sentences with look-alike forms at the top',()=>{const e=env('de',20),Q=e.w.A1_QUIZ_SHOW;const set=Q.pickSet(Q.generate('de',20));
 assert.deepEqual(Array.from(set,q=>q.kind).slice(0,9),['meaning','meaning','meaning','word','word-near','gap-form','gap-close','gap-hard','sentence']);assert(set[9].kind.startsWith('sentence'));
 assert(set[0].q[2].startsWith('Que veut dire'));assert.equal(set[0].ol,'fr');assert.equal(set[3].ol,'de');assert(set[5].q[2].includes('___'));assert(set[8].q[2].startsWith('Quelle phrase'));e.dom.window.close();});
test('from 5.000 € the wrong answers come from the same word family and the top questions compare near-identical sentences',()=>{const e=env('fr',1),Q=e.w.A1_QUIZ_SHOW;e.w.eval(read('deutsch/hard-mode-content.js'));const words=t=>String(t).split(/\s+/);
 for(const course of ['fr','de'])for(let id=1;id<=24;id++){const pool=Q.generate(course,id);
  for(const q of pool.filter(q=>q.kind.startsWith('sentence'))){const right=words(q.o[0]);for(const wrong of q.o.slice(1)){const w=words(wrong),d=Array.from({length:w.length+1},(_,i)=>i);for(let i=1;i<=right.length;i++){let prev=d[0];d[0]=i;for(let j=1;j<=w.length;j++){const tmp=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,prev+(right[i-1]===w[j-1]?0:1));prev=tmp;}}const diff=d[w.length];assert(diff<=(q.kind==='sentence-double'?4:3),`${course} ${id}: "${wrong}" vs "${q.o[0]}"`);}}
  for(const q of pool.filter(q=>q.kind==='gap-hard')){const core=t=>String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/^.*[’']/,'').replace(/^(am|um|im|an|à la|à l|au|aux|à) /,'').split(/\s+/).filter(w=>w.length>2).pop()||'';const toks=t=>String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').split(/[\s’']+/).filter(w=>w.length>2);const lev=(a,b)=>{const d=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let p=d[0];d[0]=i;for(let j=1;j<=b.length;j++){const t=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,p+(a[i-1]===b[j-1]?0:1));p=t;}}return d[b.length];};const sameSet=(a,b)=>Q.WORD_SETS[course].some(set=>{const has=x=>set.includes(String(x).toLowerCase())||set.includes(String(x).toLowerCase().split(' ')[0]);return has(a)&&has(b);});for(const wrong of q.o.slice(1))assert(sameSet(wrong,q.o[0])||lev(String(wrong).toLowerCase(),String(q.o[0]).toLowerCase())<=2||core(wrong)[0]===core(q.o[0])[0]||toks(wrong).some(w=>toks(q.o[0]).some(r=>r.slice(0,5)===w.slice(0,5)))||core(wrong).length<=4||core(q.o[0]).length<=4,`${course} ${id}: ${wrong} ~ ${q.o[0]}`);}}
 const fr5=Q.generate('fr',5).filter(q=>q.l===8).map(q=>q.o);assert(fr5.some(o=>o.includes('mon')&&o.includes('son')||o.includes('vos')&&o.includes('nos')||o.includes('est')&&o.includes('es')));e.dom.window.close();});
test('French Hard Mode lessons offer the quiz with German interface text and keep its progress per lesson',()=>{const e=env('fr',7);e.render();const entry=e.view.querySelector('[data-hard-quiz]');assert(entry);assert(entry.textContent.includes('Millionen-Turm'));e.click('[data-hard-quiz]');
 assert(e.view.textContent.includes('Lektion 7'));e.click('[data-quiz-start]');assert(e.view.textContent.includes('Frage 1/10'));assert(e.quiz.game);assert.equal(e.quiz.game.level,0);
 e.click('[data-quiz-answer="0"]');e.click('[data-quiz-lock]');assert.equal(e.quiz.game.level,1);e.flush();e.click('[data-quiz-walk]');assert.equal(e.quiz.best,50);assert(!e.quiz.game);assert(e.view.textContent.includes('Klug ausgestiegen'));
 e.click('[data-arcade-back]');assert(e.view.querySelector('[data-hard-quiz]').textContent.includes('50'));assert(e.saves>0);e.dom.window.close();});
test('German Hard Mode lessons offer the quiz in French and resume a saved game',()=>{const e=env('de',12);e.render();assert(e.view.querySelector('[data-hard-quiz]').textContent.includes('La tour du million'));e.click('[data-hard-quiz]');
 assert(e.view.textContent.includes('Leçon 12'));e.click('[data-quiz-start]');assert(e.view.textContent.includes('Question 1/10'));e.click('[data-quiz-answer="0"]');e.click('[data-quiz-lock]');e.flush();assert(e.view.textContent.includes('Question 2/10'));
 const prompt=e.view.querySelector('.quiz-question').textContent;e.click('[data-arcade-exit]');assert(e.view.querySelector('[data-hard-quiz]').textContent.includes('Continuer à la question 2'));
 e.click('[data-hard-quiz]');e.click('[data-quiz-resume]');assert(e.view.textContent.includes('Question 2/10'));assert.equal(e.view.querySelector('.quiz-question').textContent,prompt);
 e.click('[data-quiz-answer="1"]');e.click('[data-quiz-lock]');e.flush();assert(e.view.textContent.includes('Dommage'));assert(!e.quiz.game);e.dom.window.close();});
test('both course pages load and precache the shared quiz before the Hard Mode script',()=>{for(const course of ['francais','deutsch']){const html=read(course+'/index.html'),sw=read(course+'/service-worker.js');for(const asset of ['../shared/quiz-show.js','../shared/quiz-show.css']){const url=html.match(new RegExp('(?:src|href)="('+asset.replace(/[.]/g,'\\.')+'\\?[^"]+)"'))?.[1];assert(url,course+' '+asset);assert(sw.includes(JSON.stringify(url)),course+' cache '+url);}
 assert(html.indexOf('shared/quiz-show.js')<html.indexOf('src="hard-mode.js'));}});
