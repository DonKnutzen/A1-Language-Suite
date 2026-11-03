const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM,VirtualConsole}=require('jsdom');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
function env(course,id,{mastery=80,state}={}){
 const dom=new JSDOM('<main id="view"></main>',{url:`https://example.test/${course==='de'?'deutsch':'francais'}/`,runScripts:'outside-only',virtualConsole:new VirtualConsole()}),w=dom.window;
 const spoken=[];let audio=null;w.scrollTo=()=>{};w.A1Profile={getUiLang:()=>course==='de'?'fr':'de'};w.A1Voice={cancel(){},speak:t=>spoken.push(t),speakSequence:l=>spoken.push(l.join('')),speakDialogue:(turns,o)=>{audio=o;return true;}};
 const files=['shared/vocabulary-content.js',course==='de'?'deutsch/hard-mode-content.js':'francais/hard-mode-content.js','shared/quiz-show.js','francais/hard-mode-arcade.js','shared/game-hard-mode.js',course==='de'?'deutsch/hard-mode.js':'francais/hard-mode.js'];
 if(course==='fr')files.unshift('francais/data.js');for(const f of files)w.eval(read(f));
 state||={lessonMasteryBest:{[id]:mastery},lessonWork:{}};let completions=0;const view=w.document.querySelector('main'),M=course==='de'?w.DE_A1_HARD_MODE:w.FR_A1_HARD_MODE;
 const lesson=course==='de'?{id,title:'Test'}:w.FR_A1_DATA.lessons.find(l=>l.id===id);
 const render=()=>M.render({lesson,view,state,save(done){if(done)completions++;},onBack(){view.replaceChildren();}});
 const click=s=>{const el=view.querySelector(s);assert(el,s);el.click();};
 const set=(s,v)=>{const el=view.querySelector(s);assert(el,s);el.value=v;el.dispatchEvent(new w.Event('input',{bubbles:true}));};
 return {dom,w,view,state,M,lesson,render,click,set,spoken,get audio(){return audio;},get g(){return state.lessonWork[id]?.hardMode?.games;},get a(){return state.lessonWork[id]?.hardMode?.games?.attempt;},get completions(){return completions;}};}
// Plays the current page correctly (or wrongly for the listed task ids) and checks it.
function solvePage(e,wrong=[]){const a=e.a,tasks=a.content.tasks,page=a.content.pages[a.page];
 for(const i of page.ids){if(a.round&&!a.retryIds.includes(i))continue;const q=tasks[i],bad=wrong.includes(i);
  if(q.type==='memory'){for(let n=0;n<q.pairs.length;n++){e.click(`[data-memory-card="${n*2}"]`);e.click(`[data-memory-card="${n*2+1}"]`);}}
  else if(q.type==='numbers'){for(const r of q.rounds){for(const d of String(r.n))e.click(`[data-games-key="${d}"]`);e.click('[data-games-key="✓"]');}}
  else if(q.type==='spell'){for(const r of q.rounds){const used=[];for(const c of r.word){const k=r.tiles.findIndex((x,n)=>x===c&&!used.includes(n));used.push(k);e.click(`[data-games-tile="${k}"]`);}e.click('[data-games-spell-check]');}}
  else if(q.type==='clock'){for(const r of q.rounds)e.click(`[data-games-time="${r.options.indexOf(r.answer)}"]`);}
  else if(q.type==='match')q.answers.forEach((v,n)=>{const value=bad&&n===0?q.answers[1]:v;e.click(`[data-games-connect="${i}"] [data-match-left="${n}"]`);e.click(`[data-games-connect="${i}"] [data-match-right="${a.orders[i].indexOf(value)}"]`);});
  else if(q.type==='order'){const order=bad?[q.required,...Array.from({length:q.required-1},(_,n)=>n+1)]:Array.from({length:q.required},(_,n)=>n);for(const n of order)e.click(`[data-games-token="${i}"][data-token="${n}"]`);}
  else if(q.type==='choice'){const v=bad?q.options.find(o=>!q.answers.includes(o)):q.answers[0];[...e.view.querySelectorAll(`[data-games-choice="${i}"]`)].find(el=>el.value===v).click();}
  else e.set(`[data-games-input="${i}"]`,bad?'faux':q.answers[0]);}
 if(e.view.querySelector('[data-games-check]'))e.click('[data-games-check]');}
function playAll(e,wrong=[]){for(let guard=0;guard<20&&e.a.phase==='running';guard++){solvePage(e,wrong);e.click('[data-games-next]');}}

test('every lesson after French lesson 1 turns its whole Hard Mode test into games',()=>{for(const course of ['fr','de']){const e=env(course,5),G=e.w.A1_GAME_HARD,H=course==='de'?e.w.DE_A1_HARD_CONTENT:e.w.FR_A1_HARD_CONTENT;
 assert.equal(G.supports('fr',1),false);
 for(let id=course==='fr'?2:1;id<=24;id++){assert(G.supports(course,id),course+id);const b=G.build(course,id),data=H[id];
  const text=b.pages.filter(p=>p.key==='text'),textTotal=text.reduce((s,p)=>s+p.ids.length,0);for(const p of text)assert(textTotal<2||[2,3].includes(p.ids.length),`${course} ${id} magic gaps 2–3 per page`);assert(text.filter(p=>p.ids.length===3).length<=1,`${course} ${id} at most one page of three`);
  const covered=new Set(b.tasks.flatMap(t=>t.gaps||[]));assert.deepEqual([...covered].sort((x,y)=>x-y),Array.from(data.gaps,(_,n)=>n),`${course} ${id} gaps`);
  const listen=b.pages.filter(p=>p.key==='listening');assert.equal(listen.length,1,`${course} ${id} one listening page`);assert.equal(listen[0].ids.length,data.listening.flatMap(x=>x.questions).length);assert.deepEqual(Array.from(listen[0].blocks),Array.from(data.listening,(_,n)=>n));
  const warm=b.tasks[b.pages[0].ids[0]];assert.equal(warm.type,{2:'spell',3:'numbers',4:'clock'}[id]||'memory',`${course} ${id}`);if(warm.type==='memory')assert.equal(warm.pairs.length*2,12);
  for(const t of b.tasks.filter(t=>t.type==='order'))assert(t.tokens.length>t.required);for(const t of b.tasks.filter(t=>t.type==='text'))assert(t.sentence.includes('___'));}
 e.dom.window.close();}});
test('numbers, letters and clock words are correct',()=>{const e=env('fr',3),G=e.w.A1_GAME_HARD;
 assert.deepEqual([21,71,80,81,96,100,17].map(G.numberFr),['vingt et un','soixante et onze','quatre-vingts','quatre-vingt-un','quatre-vingt-seize','cent','dix-sept']);
 assert.deepEqual([21,32,71,16,17,100].map(G.numberDe),['einundzwanzig','zweiunddreißig','einundsiebzig','sechzehn','siebzehn','hundert']);
 assert.equal(G.timeFr(4,45),'Il est cinq heures moins le quart.');assert.equal(G.timeFr(1,30),'Il est une heure et demie.');assert.equal(G.timeDe(4,30),'Es ist halb fünf.');assert.equal(G.timeDe(4,15),'Es ist Viertel nach vier.');assert.equal(G.timeDe(1,0),'Es ist ein Uhr.');e.dom.window.close();});
test('French lesson 5: the games run from intro to result, mistakes come back, and the arcade opens only at the end',()=>{const e=env('fr',5);e.render();assert(e.view.querySelector('[data-games-begin]'));assert(!e.view.querySelector('[data-games-arcade]'));assert(e.view.querySelectorAll('[data-games-start-at]').length>=5);
 e.click('[data-games-begin]');assert.equal(e.a.kind,'hard-games');assert.equal(e.view.querySelectorAll('[data-memory-card]').length,12);assert(!e.view.querySelector('[data-games-arcade]'));
 const wrongId=e.a.content.tasks.findIndex(t=>t.type==='text');playAll(e,[wrongId]);assert.equal(e.a.phase,'summary');assert(!e.g.arcadeUnlocked);assert(!e.view.querySelector('[data-games-arcade]'));
 e.click('[data-games-retry]');assert.deepEqual(Array.from(e.a.retryIds),[wrongId]);playAll(e);assert.equal(e.a.phase,'reviewed');assert.equal(e.completions,1);
 const scoredTotal=e.a.content.tasks.filter(t=>t.type!=='memory').length;assert.equal(e.a.result.total,scoredTotal);assert.equal(e.a.result.correct,scoredTotal-1);assert(e.g.arcadeUnlocked);
 assert(e.M.achievement(e.state,5));assert(e.view.textContent.includes('Spielhalle'));e.click('[data-games-arcade]');const tiles=[...e.view.querySelectorAll('[data-arcade-game]')].map(x=>x.dataset.arcadeGame);assert.deepEqual(tiles,['throw','balloons','catch','sort']);assert(!tiles.includes('quiz'));
 e.click('[data-arcade-game="sort"]');assert(e.view.querySelector('canvas'));e.click('[data-arcade-exit]');assert(e.view.querySelector('[data-arcade-hub]'));e.dom.window.close();});
test('progress is saved: reopening resumes the same page, answers and memory board',()=>{const e=env('de',9);e.render();e.click('[data-games-begin]');e.click('[data-memory-card="0"]');e.click('[data-memory-card="1"]');solvePage(e);e.click('[data-games-next]');assert.equal(e.a.page,1);
 const state=JSON.parse(JSON.stringify(e.state));e.dom.window.close();const r=env('de',9,{state});r.render();assert.equal(r.a.page,1);assert(!r.view.querySelector('[data-games-begin]'));assert(r.a.solved[0]);assert(r.view.textContent.includes('Le jeu des fils'));r.dom.window.close();});
test('German lesson 3: the number safe opens only with the right number and counts misses',()=>{const e=env('de',3);e.render();e.click('[data-games-begin]');const q=e.a.content.tasks[0];assert.equal(q.type,'numbers');assert.equal(q.rounds.length,6);
 e.click('[data-games-hear]');assert.equal(e.spoken.at(-1),q.rounds[0].word);e.click('[data-games-key="1"]');e.click('[data-games-key="⌫"]');const wrong=q.rounds[0].n===99?'98':'99';for(const d of wrong)e.click(`[data-games-key="${d}"]`);e.click('[data-games-key="✓"]');assert.equal(e.a.game[0].round,0);assert.equal(e.a.game[0].tries,1);assert(e.view.textContent.includes('Pas tout à fait'));
 for(const d of String(q.rounds[0].n))e.click(`[data-games-key="${d}"]`);e.click('[data-games-key="✓"]');assert.equal(e.a.game[0].round,1);e.click('[data-games-hint]');assert(e.view.textContent.includes(q.rounds[1].word));e.dom.window.close();});
test('lesson 2 spelling box and lesson 4 clock are playable and finish their page',()=>{for(const [course,id,type] of [['fr',2,'spell'],['de',4,'clock']]){const e=env(course,id);e.render();e.click('[data-games-begin]');const q=e.a.content.tasks[0];assert.equal(q.type,type);
 if(type==='spell'){e.click('[data-games-hear]');assert.equal(e.spoken.at(-1),[...q.rounds[0].word].join('-'));e.click(`[data-games-tile="${q.rounds[0].tiles.findIndex(c=>!q.rounds[0].word.includes(c))}"]`);for(let n=1;n<q.rounds[0].word.length;n++)e.click(`[data-games-tile="${q.rounds[0].tiles.findIndex((c,k)=>!e.a.game[0].picks.includes(k))}"]`);e.click('[data-games-spell-check]');assert.equal(e.a.game[0].tries,1);}
 else{const r=q.rounds[0];assert(e.view.querySelector('svg.games-clock'));e.click(`[data-games-time="${r.options.findIndex(o=>o!==r.answer)}"]`);assert.equal(e.a.game[0].tries,1);assert(e.view.querySelector('.games-clock-option.is-wrong'));}
 solvePage(e);assert(e.a.solved[0]);assert(e.view.querySelector('[data-games-next]'));e.dom.window.close();}});
test('the radio quiz plays every recording twice on one page and grades typed and chosen answers',()=>{const e=env('fr',3);e.render();e.click('[data-games-begin]');const page=e.a.content.pages.findIndex(p=>p.key==='listening');e.click(`[data-games-goto="${page}"]`);
 const buttons=e.view.querySelectorAll('[data-games-listen]');assert.equal(buttons.length,e.w.FR_A1_HARD_CONTENT[3].listening.length);e.click('[data-games-listen="0"]');e.audio.onEnd();e.click('[data-games-listen="0"]');e.audio.onEnd();assert(e.view.querySelector('[data-games-listen="0"]').disabled);assert(!e.view.querySelector('[data-games-listen="1"]').disabled);
 e.click('[data-games-check]');assert(e.view.querySelector('[data-games-notice]').textContent);solvePage(e);assert(e.a.content.pages[page].ids.every(i=>e.a.solved[i]));assert(e.view.querySelectorAll('.challenge-transcript').length>=1);e.dom.window.close();});
test('the previous Hard Mode test stays available and untouched',()=>{for(const course of ['fr','de']){const e=env(course,6);e.render();e.click('[data-games-legacy]');assert(e.view.querySelector('#hardBegin')||e.view.querySelector('.hard-mode'));assert(!e.view.querySelector('[data-games-begin]'));e.dom.window.close();}});
test('the lesson page shows the game Hard Mode entry with the special game of the lesson',()=>{const e=env('de',3),host=e.w.document.createElement('div');e.view.append(host);e.M.renderEntry({lesson:e.lesson,view:host,state:e.state,onStart(){}});assert(host.textContent.includes('Le coffre aux nombres'));assert(host.textContent.includes('Salle de jeux en récompense'));const locked=env('fr',7,{mastery:40}),h2=locked.w.document.createElement('div');locked.view.append(h2);locked.M.renderEntry({lesson:locked.lesson,view:h2,state:locked.state,onStart(){}});assert(h2.querySelector('[data-hard-start]').disabled);e.dom.window.close();locked.dom.window.close();});
test('the arcade uses each lesson’s own words and forms, with a French interface in the German course',()=>{const e=env('de',9),A=e.w.FR_A1_ARCADE;const L=A.lessonContent('de',9);const r=L.formRound(4);assert(r.options.includes(r.answer));assert.equal(r.options.length,4);assert(L.SORTS.some(s=>s.title[0]==='der oder die?'));assert(L.PHRASES.length>=8);
 const games=A.lessonGames('de',9);assert.equal(games[0].title,'L’arène de tir');const host=e.w.document.createElement('div');e.w.document.body.append(host);A.mount(host,'throw',{course:'de',lesson:9,onExit(){}});assert(host.textContent.includes('Ce jeu a besoin'));e.dom.window.close();});
test('both course pages load and precache the game Hard Mode before the router',()=>{for(const course of ['francais','deutsch']){const html=read(course+'/index.html'),sw=read(course+'/service-worker.js');for(const asset of ['../shared/game-hard-mode.js','../shared/game-hard-mode.css']){const url=html.match(new RegExp('(?:src|href)="('+asset.replace(/[.]/g,'\\.')+'\\?[^"]+)"'))?.[1];assert(url,course+' '+asset);assert(sw.includes(JSON.stringify(url)),course+' cache '+url);}
 assert(html.indexOf('game-hard-mode.js')<html.indexOf('src="hard-mode.js'));assert(html.indexOf('hard-mode-arcade.js')<html.indexOf('src="hard-mode.js'));}});
test('string game: every lesson links six pairs of one category, numbers link digit and word, old attempts get the new pairs',()=>{
 const e=env('fr',3),S=e.w.A1_GAME_HARD.STRINGS;
 for(const [key,first] of [['fr',2],['fr-a2',1],['de',1]])for(let id=first;id<=24;id++){const groups=S[key][id];assert(groups?.length,key+id);
  for(const [kind,...pairs] of groups){assert(pairs.length>=5,key+id);const split=pairs.map(x=>x.split('|'));assert(split.every(x=>x.length===2&&x[0]&&x[1]),key+id);
   assert.equal(new Set(split.map(x=>x[0])).size,split.length,key+id+' clues');assert.equal(new Set(split.map(x=>x[1])).size,split.length,key+id+' forms');}}
 e.dom.window.close();
 for(const course of ['fr','de']){const e=env(course,3);for(let k=0;k<6;k++){const q=e.w.A1_GAME_HARD.build(course,3).tasks.find(t=>t.type==='match');assert.equal(q.labels.length,6);assert(q.labels.every(l=>/^\d+$/.test(l)),q.labels.join(' | '));assert(q.answers.every(x=>!/\d/.test(x)));assert.deepEqual(Array.from(q.gaps),[]);}e.dom.window.close();}
 const e8=env('fr',8);e8.render();e8.click('[data-games-begin]');const i=e8.a.content.tasks.findIndex(t=>t.type==='match');Object.assign(e8.a.content.tasks[i],{labels:['alt ___ · x','b ___ · y','c ___ · z'],answers:['x','y','z'],gaps:[0,1,2]});
 const r=env('fr',8,{state:JSON.parse(JSON.stringify(e8.state))});r.render();const q=r.a.content.tasks[i];assert.deepEqual(Array.from(q.gaps),[]);assert(q.labels.every(l=>!l.includes('___')));assert.equal(r.a.orders[i].length,q.answers.length);e8.dom.window.close();r.dom.window.close();
});
