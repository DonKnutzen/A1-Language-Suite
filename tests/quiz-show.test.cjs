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
 const M=()=>course==='de'?w.DE_A1_HARD_MODE:w.FR_A1_HARD_MODE;
 // The lesson page: Hard Mode button with the quiz button below it; leaving the quiz returns to this page.
 const entry=()=>{view.innerHTML='';M().renderEntry({lesson,view,state,onStart(){},onQuiz:()=>M().openQuiz({lesson,view,state,save(){saves++;},onBack:entry})});};
 const click=s=>{const el=view.querySelector(s);assert(el,s);el.click();};
 return {dom,w,view,state,render,entry,click,flush(){while(jobs.length)jobs.shift()();},get saves(){return saves;},get quiz(){return state.lessonWork[id]?.hardMode?.quiz;}};}

test('every lesson of both courses has questions for all twelve levels with four distinct answers and one right one',()=>{const e=env('fr',1),Q=e.w.A1_QUIZ_SHOW;e.w.eval(read('deutsch/hard-mode-content.js'));
 for(const course of ['fr','de'])for(let id=1;id<=24;id++){const pool=Q.generate(course,id);
  for(let l=1;l<=12;l++)assert(pool.filter(q=>q.l===l).length>=3,`${course} ${id} level ${l}`);
  for(const q of pool){assert.equal(q.o.length,4,`${course} ${id} ${q.q[0]}`);assert.equal(new Set(q.o.map(o=>String(o).trim().toLowerCase())).size,4,`${course} ${id} ${q.q[0]} ${q.o}`);assert(q.q[0]&&q.h[0]);}
  for(const q of pool.filter(q=>q.kind.startsWith('gap')))assert(q.q[0].includes('___'));
  const set=Q.pickSet(pool);assert.equal(set.length,12);assert.equal(new Set(set.map(q=>q.id)).size,12);const levels=Array.from(set,q=>q.l);levels.forEach((l,i)=>assert(l>=i-1&&l<=i+1,`${course} ${id} rung ${i+1} got level ${l}`));const srcs=set.flatMap(q=>[q.src,q.also]).filter(Boolean);assert.equal(new Set(srcs).size,srcs.length,`${course} ${id} repeats a sentence`);}
 e.dom.window.close();});
test('difficulty rises over twelve rungs: meaning, the word, a serious near miss, then gap sentences and whole sentences at the top',()=>{const e=env('de',20),Q=e.w.A1_QUIZ_SHOW;assert.deepEqual(Array.from(Q.LADDER),[10,50,100,200,500,1000,5000,25000,100000,250000,500000,1000000]);assert.equal(Q.LADDER[Q.SAFE],1000);
 for(let run=0;run<5;run++){const set=Q.pickSet(Q.generate('de',20)),kinds=Array.from(set,q=>q.kind);
  assert.deepEqual(kinds.slice(0,3),['meaning','meaning','meaning']);assert.deepEqual(kinds.slice(3,5),['word','word']);assert.equal(kinds[5],'word-near');assert(kinds.slice(6,9).every(k=>k.startsWith('gap')),kinds.join());assert(kinds.slice(9).every(k=>k.startsWith('sentence')),kinds.join());
  assert(set[0].q[2].startsWith('Que veut dire'));assert.equal(set[0].ol,'fr');assert.equal(set[3].ol,'de');assert(set[6].q[2].includes('___'));assert(set[11].q[2].startsWith('Quelle phrase'));}
 e.dom.window.close();});
test('up to 500 € one or two wrong answers sound like the right one where it fits, the others come from the same topic; from 1.000 € they share its article and topic',()=>{const e=env('fr',9),Q=e.w.A1_QUIZ_SHOW,pool=Q.generate('fr',9);
 const travel=['taxi','train','métro','vélo','voiture','tramway','billet','quai','départ','gare','arrêt','avion','bateau','pont','place','plan','rue'],has=(o,list)=>list.some(t=>String(o).includes(t));
 for(let run=0;run<4;run++){const bus=Q.generate('fr',9).find(q=>q.kind==='word'&&q.o[0]==='le bus'&&q.l===4);assert(bus,'le bus');assert(bus.o.slice(1).some(o=>has(o,['jus','bras','but','Fuß','Bus','Fuss'])||/fu|us$/i.test(o))||bus.o.slice(1).filter(o=>has(o,travel)).length>=2,bus.o.join());}
 const low=pool.filter(q=>q.kind==='word'&&q.ol==='fr');assert(low.filter(q=>q.o.slice(1).some(o=>has(o,travel))).length>=low.length*.5,'topic words');
 const art=s=>(String(s).match(/^(der|die|das|le|la|les|l’)\s*/)||[''])[0].trim();
 const near=pool.filter(q=>q.kind==='word-near'&&art(q.o[0]));assert(near.length>5);assert(near.filter(q=>q.o.slice(1).every(o=>art(o)===art(q.o[0]))).length>=near.length*.7);e.dom.window.close();});
test('a game never asks the same word or the same sentence twice',()=>{const e=env('fr',1),Q=e.w.A1_QUIZ_SHOW;e.w.eval(read('deutsch/hard-mode-content.js'));let games=0,repeats=0;
 for(const course of ['fr','de'])for(let id=1;id<=24;id++){const pool=Q.generate(course,id);for(let run=0;run<3;run++){const set=Q.pickSet(pool),seen=new Set();games++;const srcs=set.flatMap(q=>[q.src,q.also]).filter(Boolean);assert.equal(new Set(srcs).size,srcs.length,`${course} ${id}`);
  for(const q of set)for(const w of new Set((q.w||[]).filter(w=>w[0]!=='#'))){if(seen.has(w))repeats++;seen.add(w);}}}
 assert(repeats/games<.1,`${repeats} repeated words in ${games} games`);e.dom.window.close();});
test('from 5.000 € the wrong answers come from the same word family and the top questions compare near-identical sentences',()=>{const e=env('fr',1),Q=e.w.A1_QUIZ_SHOW;e.w.eval(read('deutsch/hard-mode-content.js'));const words=t=>String(t).split(/\s+/);
 for(const course of ['fr','de'])for(let id=1;id<=24;id++){const pool=Q.generate(course,id);
  for(const q of pool.filter(q=>q.kind.startsWith('sentence'))){const right=words(q.o[0]);for(const wrong of q.o.slice(1)){const w=words(wrong),d=Array.from({length:w.length+1},(_,i)=>i);for(let i=1;i<=right.length;i++){let prev=d[0];d[0]=i;for(let j=1;j<=w.length;j++){const tmp=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,prev+(right[i-1]===w[j-1]?0:1));prev=tmp;}}const diff=d[w.length];assert(diff<=(q.kind==='sentence-double'?4:3),`${course} ${id}: "${wrong}" vs "${q.o[0]}"`);}}
  for(const q of pool.filter(q=>q.kind==='gap-hard')){const core=t=>String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/^.*[’']/,'').replace(/^(am|um|im|an|à la|à l|au|aux|à) /,'').split(/\s+/).filter(w=>w.length>2).pop()||'';const toks=t=>String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').split(/[\s’']+/).filter(w=>w.length>2);const lev=(a,b)=>{const d=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let p=d[0];d[0]=i;for(let j=1;j<=b.length;j++){const t=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,p+(a[i-1]===b[j-1]?0:1));p=t;}}return d[b.length];};const sameSet=(a,b)=>Q.WORD_SETS[course].some(set=>{const has=x=>set.includes(String(x).toLowerCase())||set.includes(String(x).toLowerCase().split(' ')[0]);return has(a)&&has(b);});for(const wrong of q.o.slice(1))assert(sameSet(wrong,q.o[0])||lev(String(wrong).toLowerCase(),String(q.o[0]).toLowerCase())<=2||core(wrong)[0]===core(q.o[0])[0]||toks(wrong).some(w=>toks(q.o[0]).some(r=>r.slice(0,5)===w.slice(0,5)))||core(wrong).length<=4||core(q.o[0]).length<=4,`${course} ${id}: ${wrong} ~ ${q.o[0]}`);}}
 const fr5=Q.generate('fr',5).filter(q=>q.l===9).map(q=>q.o);assert(fr5.some(o=>['ma','ta','sa'].every(x=>o.includes(x))||['mon','ton','son'].filter(x=>o.includes(x)).length>=2||o.includes('vos')&&o.includes('nos')));e.dom.window.close();});
test('French lessons show the quiz as its own button below Hard Mode and keep its progress per lesson',()=>{const e=env('fr',7);e.entry();const btn=e.view.querySelector('.hard-entry + .quiz-entry-card [data-quiz-entry]');assert(btn);assert(!btn.disabled);assert(btn.textContent.includes('Millionen-Turm'));e.click('[data-quiz-entry]');
 assert(e.view.textContent.includes('Lektion 7'));e.click('[data-quiz-start]');assert(e.view.textContent.includes('Frage 1/12'));assert(e.quiz.game);assert.equal(e.quiz.game.level,0);
 e.click('[data-quiz-answer="0"]');e.click('[data-quiz-lock]');assert.equal(e.quiz.game.level,1);e.flush();e.click('[data-quiz-walk]');assert.equal(e.quiz.best,10);assert(!e.quiz.game);assert(e.view.textContent.includes('Klug ausgestiegen'));
 e.click('[data-arcade-back]');assert(e.view.querySelector('[data-quiz-entry]').textContent.includes('10'));assert(e.saves>0);
 e.render();assert(!e.view.querySelector('[data-quiz-entry],[data-hard-quiz]'),'no second quiz button inside Hard Mode');e.dom.window.close();});
test('the quiz button stays locked until Hard Mode is unlocked',()=>{for(const course of ['fr','de']){const e=env(course,3,{state:{lessonMasteryBest:{3:50},lessonWork:{}}});e.entry();const btn=e.view.querySelector('[data-quiz-entry]');assert(btn.disabled,course);assert(e.view.querySelector('.quiz-entry-card.is-locked .quiz-lock-icon'));assert(e.view.querySelector('.quiz-entry-hint'));e.dom.window.close();}});
test('German lessons offer the quiz in French below Hard Mode and resume a saved game',()=>{const e=env('de',12);e.entry();assert(e.view.querySelector('[data-quiz-entry]').textContent.includes('La tour du million'));e.click('[data-quiz-entry]');
 assert(e.view.textContent.includes('Leçon 12'));e.click('[data-quiz-start]');assert(e.view.textContent.includes('Question 1/12'));e.click('[data-quiz-answer="0"]');e.click('[data-quiz-lock]');e.flush();assert(e.view.textContent.includes('Question 2/12'));
 const prompt=e.view.querySelector('.quiz-question').textContent;e.click('[data-arcade-exit]');assert(e.view.querySelector('[data-quiz-entry]').textContent.includes('question 2'));
 e.click('[data-quiz-entry]');e.click('[data-quiz-resume]');assert(e.view.textContent.includes('Question 2/12'));assert.equal(e.view.querySelector('.quiz-question').textContent,prompt);
 e.click('[data-quiz-answer="1"]');e.click('[data-quiz-lock]');e.flush();assert(e.view.textContent.includes('Dommage'));assert(!e.quiz.game);e.dom.window.close();});
test('both course pages load and precache the shared quiz before the Hard Mode script',()=>{for(const course of ['francais','deutsch']){const html=read(course+'/index.html'),sw=read(course+'/service-worker.js');for(const asset of ['../shared/quiz-show.js','../shared/quiz-show.css']){const url=html.match(new RegExp('(?:src|href)="('+asset.replace(/[.]/g,'\\.')+'\\?[^"]+)"'))?.[1];assert(url,course+' '+asset);assert(sw.includes(JSON.stringify(url)),course+' cache '+url);}
 assert(html.indexOf('shared/quiz-show.js')<html.indexOf('src="hard-mode.js'));}});
