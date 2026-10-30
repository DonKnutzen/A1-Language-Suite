/* Quiz show "Millionen-Turm" for every Hard Mode: ten questions of rising difficulty, prize ladder,
   50/50 and hint jokers, saved progress and optional uploaded sound files (no built-in sounds). */
(() => {
'use strict';
const en=()=>window.A1Profile?.getUiLang()==='en';
const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pick=xs=>xs[Math.floor(Math.random()*xs.length)];
const shuffle=xs=>{const a=[...xs];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const store={get(k,d){try{return localStorage.getItem(k)??d;}catch{return d;}},set(k,v){try{localStorage.setItem(k,v);}catch{}}};
const soundOn=()=>store.get('a1-arcade-sound','on')!=='off';
// Interface text: German (French course), French (German course) or English when the profile uses English.
let ui='de';
const T=(de,english,fr)=>en()?english:ui==='fr'?(fr??de):de;
const tx=p=>Array.isArray(p)?(en()?p[1]:ui==='fr'?(p[2]??p[0]):p[0])??p[0]:p;

const LADDER=[50,100,200,500,1000,5000,25000,100000,500000,1000000],SAFE=4;
const locale=()=>en()?'en-GB':ui==='fr'?'fr-FR':'de-DE';
const money=n=>new Intl.NumberFormat(locale(),{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n);
const short=n=>n>=1e6?T('1 Mio. €','€1M','1 M €'):n>=1000?T(n/1000+'k €','€'+n/1000+'k',n/1000+' k €'):T(n+' €','€'+n,n+' €');
const STARS=[1000,100000,1000000];
const starsFor=amount=>STARS.filter(s=>amount>=s).length;

// Optional sound files <base><name>.mp3 (see francais/audio/quiz/README.md). Three prize ranges (questions 1–4, 5–7, 8–10).
const SOUNDS={intro:'start',loop1:'schleife-1',loop2:'schleife-2',loop3:'schleife-3',lock:'festgelegt',right1:'richtig-1',right2:'richtig-2',right3:'richtig-3',wrong1:'falsch-1',wrong2:'falsch-2',wrong3:'falsch-3',joker:'joker',walk:'aussteigen'};
const tier=level=>level<4?1:level<7?2:3;
const ICONS={
 half:'<svg class="quiz-icon" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13" fill="#1d2f5e" stroke="#4cc9f0" stroke-width="2"/><path d="M16 3a13 13 0 0 1 0 26z" fill="#4cc9f0"/><path d="M16 3v26" stroke="#fff" stroke-width="2"/></svg>',
 hint:'<svg class="quiz-icon" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="13" r="11" fill="#ffd16633"/><path d="M16 5a8 8 0 0 0-4.8 14.4c.8.6 1.3 1.5 1.3 2.5V23h7v-1.1c0-1 .5-1.9 1.3-2.5A8 8 0 0 0 16 5z" fill="#ffd166" stroke="#fff3c4" stroke-width="1.5" stroke-linejoin="round"/><path d="M13 26.5h6M14 29h4" stroke="#fff3c4" stroke-width="2" stroke-linecap="round"/><path d="M16 9.5a3.5 3.5 0 0 0-3.5 3.5" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>',
 walk:'<svg class="quiz-icon" viewBox="0 0 32 32" aria-hidden="true"><path d="M18 5h6a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2h-6" fill="none" stroke="#ffd166" stroke-width="2.4" stroke-linecap="round"/><path d="M13 10l6 6-6 6M19 16H5" fill="none" stroke="#fff3c4" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};
function quizAudio(base){
 const files={},ok={};let loop=null,loopSlot=null,shot=null;const layers=new Set();
 // Each file is downloaded completely before it counts as ready, so the first play of a long loop does not stutter while it streams.
 const whole=typeof window.fetch==='function'&&typeof window.URL?.createObjectURL==='function';
 if(typeof window.Audio==='function')for(const [slot,name] of Object.entries(SOUNDS)){try{const a=new window.Audio();a.preload='auto';files[slot]=a;const url=base+name+'.mp3';
  a.addEventListener('error',()=>{ok[slot]=false;},{once:true});
  if(whole){a.addEventListener('canplaythrough',()=>{ok[slot]=true;},{once:true});window.fetch(url).then(r=>r.ok?r.blob():Promise.reject(new Error(r.status))).then(blob=>{a.src=URL.createObjectURL(blob);a.load?.();},()=>{ok[slot]=false;});}
  else{const ready=()=>{ok[slot]=true;};a.addEventListener('canplaythrough',ready,{once:true});a.addEventListener('loadeddata',ready,{once:true});a.src=url;}}catch{}}
 const has=slot=>soundOn()&&ok[slot]===true;
 const go=(a,repeat)=>{a.muted=false;a.loop=repeat;try{if(a.currentTime)a.currentTime=0;}catch{}try{Promise.resolve(a.play?.()).catch(()=>{});}catch{}};
 const halt=a=>{try{a?.pause?.();}catch{}};
 return {
  // 'ready', 'pending' (file exists but is still loading) or 'missing' (no file: stay silent).
  state:slot=>ok[slot]===true?'ready':ok[slot]===false||!files[slot]?'missing':'pending',
  whenReady(slot,fn){const a=files[slot];if(!a)return;const once=()=>{a.removeEventListener('canplaythrough',once);a.removeEventListener('loadeddata',once);fn();};a.addEventListener('canplaythrough',once);a.addEventListener('loadeddata',once);},
  // Mobile browsers only allow sounds started from a tap; starting and immediately pausing every file at game start unlocks them silently.
  unlock(skip=[]){for(const [slot,a] of Object.entries(files)){if(skip.includes(slot))continue;try{a.muted=true;Promise.resolve(a.play?.()).catch(()=>{});halt(a);try{if(a.currentTime)a.currentTime=0;}catch{}}catch{}a.muted=false;}},
  play(slot,onEnd){if(!has(slot))return false;if(shot!==files[slot])halt(shot);shot=files[slot];if(onEnd)shot.addEventListener('ended',onEnd,{once:true});go(shot,false);return true;},
  // Plays on top of everything else without stopping it (joker).
  over(slot){if(!has(slot))return false;layers.add(files[slot]);go(files[slot],false);return true;},
  loop(slot){if(!has(slot)){this.stopLoop();return false;}if(loopSlot===slot&&loop&&!loop.paused)return true;this.stopLoop();loop=files[slot];loopSlot=slot;go(loop,true);return true;},
  stopLoop(){halt(loop);loop=null;loopSlot=null;},
  stopShot(){halt(shot);shot=null;},
  stopAll(){this.stopLoop();this.stopShot();layers.forEach(halt);layers.clear();}
 };
}

/* ---------- Question generator: rising difficulty from each lesson's own material ---------- */
const norm=s=>String(s).normalize('NFC').trim().toLowerCase();
function distance(a,b){a=norm(a);b=norm(b);const d=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let prev=d[0];d[0]=i;for(let j=1;j<=b.length;j++){const tmp=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=tmp;}}return d[b.length];}
// Distractors: `near` ranks look-alike words first (later levels), otherwise a random mix.
function distractors(answer,pool,{near=false,exclude=[]}={}){const banned=new Set([answer,...exclude].map(norm));const seen=new Set();const cand=[];for(const w of pool){const k=norm(w);if(!w||banned.has(k)||seen.has(k))continue;seen.add(k);cand.push(w);}
 if(!near)return shuffle(cand).slice(0,3);return cand.map(w=>[w,distance(w,answer)/Math.max(String(w).length,String(answer).length)+(norm(w)[0]===norm(answer)[0]?0:.25)+Math.random()*.05]).sort((x,y)=>x[1]-y[1]).slice(0,3).map(x=>x[0]);}
function startsWith(word){const w=String(word);return w.length>3?w.slice(0,2)+'…':w.slice(0,1)+'…';}
const COURSES={
 fr:{target:'fr',meaning:'de',lessons:'frLessons',hard:()=>window.FR_A1_HARD_CONTENT,lang:['Französisch','French','français']},
 de:{target:'de',meaning:'fr',lessons:'deLessons',hard:()=>window.DE_A1_HARD_CONTENT,lang:['Deutsch','German','allemand']}
};
function gapSentences(data){if(!data?.text)return [];const out=[];const parts=String(data.text).split(/\n+|(?<=[.!?])\s+/);for(const part of parts){for(const m of part.matchAll(/\{\{(\d+)\}\}/g)){const i=Number(m[1]),gap=data.gaps[i];if(!gap?.answers?.length)continue;const sentence=part.replace(/\{\{(\d+)\}\}/g,(_,n)=>Number(n)===i?'___':(data.gaps[Number(n)]?.answers?.[0]??'…')).trim();out.push({sentence,answers:gap.answers,hint:gap.hint||''});}}return out;}
function hintText(hint){const parts=String(hint).split(' / ');return parts.length===2?(en()?parts[1]:parts[0]):String(hint);}
function generate(course,lessonId){
 const C=COURSES[course];if(!C)return [];const id=Number(lessonId),V=window.A1_VOCABULARY_CONTENT||[],H=C.hard()||{};
 const inLesson=v=>(v[C.lessons]||[]).includes(id),upTo=v=>(v[C.lessons]||[]).some(n=>n<=id);
 const pairs=(list)=>{const seenT=new Set(),seenM=new Set(),out=[];for(const v of list){const t=v[C.target],m=v[C.meaning];if(!t||!m||seenT.has(norm(t))||seenM.has(norm(m)))continue;seenT.add(norm(t));seenM.add(norm(m));out.push({t,m});}return out;};
 let lesson=pairs(V.filter(inLesson));const earlier=pairs(V.filter(upTo));if(lesson.length<8)lesson=pairs([...V.filter(inLesson),...shuffle(V.filter(upTo))]).slice(0,Math.max(8,lesson.length));
 const lang=C.lang,qs=[];
 // Levels 1–3: what does the word mean?
 for(const p of lesson){const wrong=distractors(p.m,lesson.map(x=>x.m));if(wrong.length<3)continue;
  qs.push({l:0,kind:'meaning',q:[`Was bedeutet „${p.t}“?`,`What does “${p.t}” mean?`,`Que veut dire « ${p.t} » ?`],o:[p.m,...wrong],ol:C.meaning,h:[`Beginnt mit „${startsWith(p.m)}“`,`Starts with “${startsWith(p.m)}”`,`Commence par « ${startsWith(p.m)} »`]});}
 // Levels 4–6: how do you say it? (5–6 with look-alike words)
 for(const p of lesson)for(const near of [false,true]){const wrong=distractors(p.t,(near?earlier:lesson).map(x=>x.t),{near});if(wrong.length<3)continue;
  qs.push({l:0,kind:near?'word-near':'word',q:[`Wie heißt „${p.m}“ auf ${lang[0]}?`,`How do you say “${p.m}” in ${lang[1]}?`,`Comment dit-on « ${p.m} » en ${lang[2]} ?`],o:[p.t,...wrong],ol:C.target,h:[`Beginnt mit „${startsWith(p.t)}“`,`Starts with “${startsWith(p.t)}”`,`Commence par « ${startsWith(p.t)} »`]});}
 // Levels 7–10: the lesson's own gap sentences; 9–10 with look-alike forms from every lesson so far.
 const sentences=gapSentences(H[id]),allGaps=Object.entries(H).filter(([k])=>Number(k)<=id).flatMap(([,d])=>(d.gaps||[]).flatMap(g=>g.answers||[]));
 for(const s of sentences)for(const near of [false,true]){const answer=s.answers[0];const wrong=distractors(answer,near?[...allGaps,...earlier.map(x=>x.t)]:sentences.map(x=>x.answers[0]),{near,exclude:s.answers});if(wrong.length<3)continue;
  const hint=s.hint?` (${hintText(s.hint)})`:'';qs.push({l:0,kind:near?'gap-near':'gap',q:[`${s.sentence}${hint}`,`${s.sentence}${hint}`,`${s.sentence}${hint}`],pl:C.target,o:[answer,...wrong],ol:C.target,h:[`Beginnt mit „${startsWith(answer)}“`,`Starts with “${startsWith(answer)}”`,`Commence par « ${startsWith(answer)} »`]});}
 const levels={meaning:[1,2,3],word:[4],'word-near':[5,6],gap:[7,8],'gap-near':[9,10]};
 return qs.flatMap(q=>levels[q.kind].map(l=>({...q,l})));
}
// One question per level; falls back to the closest easier level when a level has none.
function pickSet(pool){const used=new Set();return LADDER.map((_,i)=>{for(let l=i+1;l>=1;l--){const options=pool.filter(q=>q.l===l&&!used.has(q.q[0]));if(options.length){const q=pick(options);used.add(q.q[0]);return q;}}return pick(pool);});}
const resumable=g=>!!g&&Array.isArray(g.qs)&&g.qs.length===LADDER.length&&g.qs.every(q=>q&&Array.isArray(q.o)&&q.o.length===4&&q.q)&&Number.isInteger(g.level)&&g.level>=0&&g.level<LADDER.length;

/* ---------- The show ---------- */
function mount(host,{pool=[],course='fr',lessonLabel=null,audioBase='audio/quiz/',best=0,saved=null,onSave,onEnd,onExit,backLabel=null}={}){
 ui=course==='de'?'fr':'de';
 const target=COURSES[course]?.target||'fr';
 const S={level:0,qs:pickSet(pool),jokers:{cut:true,hint:true},removed:[],showHint:false,selected:null,phase:'intro',won:0,order:null};
 let timers=[],dead=false;const snd=quizAudio(audioBase);
 const later=(fn,ms)=>timers.push(setTimeout(()=>{if(!dead&&host.isConnected)fn();},ms));
 // The loop waits while the start or a result sound is still playing (S.hold); a file that is still loading is waited for, a missing one stays silent.
 function background(){if(S.hold||(S.phase!=='ask'&&S.phase!=='confirm'))return;const slot='loop'+tier(S.level),state=snd.state(slot);if(state==='ready')snd.loop(slot);else{snd.stopLoop();if(state==='pending')snd.whenReady(slot,()=>later(background,0));}}
 function cue(slot,{over=false,onEnd:done}={}){return snd.state(slot)==='ready'&&(over?snd.over(slot):snd.play(slot,done));}
 function hold(slot,fallbackMs){if(!cue(slot,{onEnd:release}))return false;S.hold=true;later(release,fallbackMs);return true;}
 function release(){if(!S.hold)return;S.hold=false;later(background,600);}
 const q=()=>S.qs[S.level];
 const snapshot=(extra={})=>({qs:S.qs,level:S.level,won:S.won,jokers:{...S.jokers},order:S.order,removed:S.removed,showHint:S.showHint,...extra});
 const back=backLabel||T('Zurück','Back','Retour');
 function newOrder(){S.order=shuffle([0,1,2,3]);S.removed=[];S.showHint=false;S.selected=null;}
 function ladder(){return `<ol class="quiz-ladder" aria-label="${T('Gewinnstufen','Prize ladder','Paliers de gains')}">${LADDER.map((v,i)=>`<li class="${i===S.level&&S.phase!=='end'?'is-current':''} ${i<S.level?'is-done':''} ${i===SAFE?'is-safe':''}"><span>${i<S.level?'✓':i+1}</span><b>${short(v)}</b>${i===SAFE?'<i aria-label="'+T('Sicherheitsstufe','Safe level','Palier sûr')+'">🛟</i>':''}</li>`).reverse().join('')}</ol>`;}
 function controls(){return `<div class="arcade-controls"><button type="button" class="tiny-btn" data-arcade-sound aria-pressed="${soundOn()}">${soundOn()?'🔔':'🔕'} ${T('Töne','Sound','Son')}</button><button type="button" class="tiny-btn" data-arcade-exit>← ${E(back)}</button></div>`;}
 function frame(inner){host.innerHTML=`<div class="arcade-stage quiz-show"><div class="quiz-stage"><div class="quiz-lights" aria-hidden="true"><i></i><i></i><i></i></div>${inner}</div>${controls()}</div>`;
  host.querySelector('[data-arcade-exit]').onclick=exit;
  host.querySelector('[data-arcade-sound]').onclick=e=>{const on=!soundOn();store.set('a1-arcade-sound',on?'on':'off');e.currentTarget.textContent=(on?'🔔 ':'🔕 ')+T('Töne','Sound','Son');e.currentTarget.setAttribute('aria-pressed',String(on));if(!on)snd.stopAll();else background();};}
 function intro(){S.phase='intro';frame(`<div class="quiz-intro"><span class="arcade-big-icon" aria-hidden="true">💎</span><h3>${T('Millionen-Turm','Million tower','La tour du million')}</h3>${lessonLabel?`<p class="quiz-lesson">${E(lessonLabel)}</p>`:''}<p>${T('10 Fragen, jede mit 4 Antworten – und jede Stufe wird schwerer. Jede richtige Antwort bringt dich höher, bis zur Million! Ab 1.000 € bist du sicher 🛟. Du kannst jederzeit mit deinem Gewinn aussteigen.','10 questions, each with 4 answers – and every step gets harder. Every right answer takes you higher, up to a million! From €1,000 you are safe 🛟. You can walk away with your winnings at any time.','10 questions, chacune avec 4 réponses – et chaque palier est plus difficile. Chaque bonne réponse te fait monter, jusqu’au million ! À partir de 1 000 € tu es à l’abri 🛟. Tu peux partir avec tes gains à tout moment.')}</p><p>${T('Joker:','Jokers:','Jokers :')} <b>50/50</b> ${T('(zwei falsche Antworten weg)','(removes two wrong answers)','(enlève deux mauvaises réponses)')} · 💡 ${T('Tipp','Hint','Indice')}</p>${best?`<p class="arcade-best">🏆 ${T('Rekord','Best','Record')}: ${money(best)}</p>`:''}${resumable(saved)?`<button type="button" class="hard-start" data-quiz-resume>▶ ${T('Weiter bei Frage','Continue at question','Continuer à la question')} ${saved.level+1} · ${money(LADDER[saved.level])}</button><button type="button" class="secondary-btn" data-quiz-start>↻ ${T('Neues Spiel','New game','Nouvelle partie')}</button>`:`<button type="button" class="hard-start" data-quiz-start>▶ ${T('Spiel starten','Start the game','Commencer')}</button>`}</div>`);
  host.querySelector('[data-quiz-start]').onclick=()=>start();host.querySelector('[data-quiz-resume]')?.addEventListener('click',()=>start(saved));}
 function start(from){Object.assign(S,{level:0,qs:pickSet(pool),jokers:{cut:true,hint:true},won:0,phase:'ask',reveal:false,hold:false});newOrder();
  if(resumable(from)){Object.assign(S,{qs:from.qs,level:from.level,won:from.won||0,jokers:{cut:from.jokers?.cut!==false,hint:from.jokers?.hint!==false}});if(Array.isArray(from.order)&&from.order.length===4){S.order=from.order;S.removed=Array.isArray(from.removed)?from.removed:[];S.showHint=!!from.showHint;}}
  snd.stopAll();snd.unlock(['intro','loop1']);hold('intro',12000);ask();}
 function ask(){if(S.phase!=='suspense'&&S.phase!=='reveal')S.phase=S.selected===null?'ask':'confirm';if(S.phase==='ask'||S.phase==='confirm'){background();saved=snapshot();onSave?.(saved);}const cur=q(),letters='ABCD',optLang=k=>typeof cur.o[k]==='string'?`lang="${cur.ol||target}"`:'';
  frame(`<div class="quiz-board"><div class="quiz-main"><div class="quiz-level quiz-topbar"><span class="quiz-chip">${T('Frage','Question','Question')} ${S.level+1}/10</span><span class="quiz-prize"><small>${T('Es geht um','Playing for','En jeu')}</small>${money(LADDER[S.level])}</span></div><div class="quiz-question"><span class="quiz-q-badge" aria-hidden="true">${S.level+1}</span><span ${cur.pl||/___/.test(tx(cur.q))?`lang="${cur.pl||target}"`:''}>${E(tx(cur.q))}</span></div>${S.showHint?`<p class="quiz-hint">💡 ${E(tx(cur.h))}</p>`:''}
  <div class="quiz-answers">${S.order.map((k,n)=>`<button type="button" class="quiz-answer ${S.selected===k?'is-selected':''} ${S.reveal?(k===0?'is-correct':S.selected===k?'is-wrong':''):''}" data-quiz-answer="${k}" ${S.removed.includes(k)||S.phase==='suspense'||S.phase==='reveal'?'disabled':''} ${optLang(k)}><b>${letters[n]}</b><span>${S.removed.includes(k)?'':E(tx(cur.o[k]))}</span></button>`).join('')}</div>
  ${S.reveal&&S.selected===0?`<div class="quiz-win-banner" role="status"><b>✓ ${T('Richtig!','Correct!','Bravo !')}</b> ${money(LADDER[S.level])}${S.level===SAFE?` · 🛟 ${T('sicher','safe','à l’abri')}`:''}</div>`:''}${S.phase==='suspense'?`<div class="quiz-suspense" role="status">${T('Antwort festgelegt …','Answer locked in …','Réponse validée …')}</div>`:''}
  ${S.phase==='confirm'?`<div class="quiz-confirm"><button type="button" class="hard-start" data-quiz-lock>✔ ${T('Sicher – Antwort festlegen!','I’m sure – lock it in!','Sûr – je valide !')}</button></div>`:''}
  <div class="quiz-jokers">${[['cut',ICONS.half,'50/50'],['hint',ICONS.hint,T('Tipp','Hint','Indice')]].map(([k,icon,name])=>`<button type="button" class="quiz-joker" data-quiz-joker="${k}" ${S.jokers[k]&&S.phase!=='suspense'&&S.phase!=='reveal'?'':'disabled'} aria-label="${name}">${icon}<small>${name}</small></button>`).join('')}<button type="button" class="quiz-joker quiz-walk" data-quiz-walk ${S.phase==='suspense'||S.phase==='reveal'?'disabled':''}>${ICONS.walk}<small>${T('Aussteigen','Walk away','Partir')}: ${money(S.won)}</small></button></div></div>${ladder()}</div>`);
  host.querySelectorAll('[data-quiz-answer]').forEach(b=>b.onclick=()=>{if(S.phase!=='ask'&&S.phase!=='confirm')return;S.selected=Number(b.dataset.quizAnswer);ask();});
  host.querySelector('[data-quiz-lock]')?.addEventListener('click',lock);
  host.querySelectorAll('[data-quiz-joker]').forEach(b=>b.onclick=()=>joker(b.dataset.quizJoker));
  host.querySelector('[data-quiz-walk]').onclick=()=>end('walk');}
 function joker(k){if(!S.jokers[k])return;S.jokers[k]=false;cue('joker',{over:true});if(k==='cut'){S.removed=shuffle([1,2,3].filter(i=>i!==S.selected)).slice(0,2);if(S.removed.includes(S.selected))S.selected=null;}else if(k==='hint')S.showHint=true;ask();}
 // Lock-in commits the outcome at once (leaving during the suspense cannot undo it): loop stops, lock-in sound, 3 s, then right/wrong of the current range.
 function lock(){const right=S.selected===0;saved=right&&S.level<LADDER.length-1?snapshot({level:S.level+1,won:LADDER[S.level],order:null,removed:[],showHint:false}):null;onSave?.(saved);S.phase='suspense';S.hold=false;snd.stopLoop();cue('lock');ask();later(reveal,3000);}
 function reveal(){const ok=S.selected===0,range=tier(S.level);S.reveal=true;S.phase='reveal';snd.stopShot();ask();
  if(ok){S.won=LADDER[S.level];hold('right'+range,10000);later(()=>{S.reveal=false;if(S.level===LADDER.length-1)return end('win');S.level++;S.phase='ask';newOrder();ask();},2200);}
  else{cue('wrong'+range);later(()=>{S.reveal=false;end('lost');},2400);}}
 function end(how){const amount=how==='lost'?(S.level>SAFE?LADDER[SAFE]:0):S.won;S.phase='end';saved=null;onSave?.(null);S.hold=false;snd.stopLoop();if(how==='walk')cue('walk');const stars=starsFor(amount),record=amount>best;if(record)best=amount;onEnd?.({score:amount,stars});
  frame(`<div class="quiz-intro quiz-end ${how==='win'?'is-million':''}"><span class="arcade-big-icon" aria-hidden="true">${how==='win'?'💎':amount?'💰':'😬'}</span><h3>${how==='win'?T('MILLIONÄR! 🎉','MILLIONAIRE! 🎉','MILLIONNAIRE ! 🎉'):how==='walk'?T('Klug ausgestiegen!','Smart move!','Bien joué !'):T('Leider falsch!','Sorry, wrong!','Dommage, c’est faux !')}</h3><p class="arcade-score">${money(amount)}</p><p class="arcade-result-stars" aria-label="${stars}/3">${[1,2,3].map(k=>`<i class="${k<=stars?'is-lit':''}">★</i>`).join('')}</p>${record&&amount?`<p class="arcade-record">🎉 ${T('Neuer Rekord!','New record!','Nouveau record !')}</p>`:''}${how==='lost'?`<p>${T('Richtig war','The right answer was','La bonne réponse était')}: <b ${typeof q().o[0]==='string'?`lang="${q().ol||target}"`:''}>${E(tx(q().o[0]))}</b></p>`:''}<div class="arcade-actions"><button type="button" class="hard-start" data-quiz-start>↻ ${T('Neues Spiel','New game','Nouvelle partie')}</button><button type="button" class="secondary-btn" data-arcade-back>← ${E(back)}</button></div></div>`);
  host.querySelector('[data-quiz-start]').onclick=()=>start();host.querySelector('[data-arcade-back]').onclick=exit;}
 function stop(){if(dead)return;dead=true;timers.forEach(clearTimeout);snd.stopAll();}
 function exit(){stop();onExit?.();}
 intro();return stop;
}
window.A1_QUIZ_SHOW={mount,generate,pickSet,starsFor,money:(n,course)=>{if(course)ui=course==='de'?'fr':'de';return money(n);},LADDER,SAFE,SOUNDS};
})();
