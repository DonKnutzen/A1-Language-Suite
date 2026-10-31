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
// Sentences of the Hard Mode cloze text; every gap keeps its sentence template so whole-sentence options can be built.
// Sentences of the Hard Mode cloze text; every gap keeps its sentence template so whole-sentence options can be built.
// Sentences of the Hard Mode cloze text; every gap keeps its sentence template so whole-sentence options can be built.
// Sentences of the Hard Mode cloze text; every gap keeps its sentence template so whole-sentence options can be built.
// Sentences of the Hard Mode cloze text; every gap keeps its sentence template so whole-sentence options can be built.
// Sentences of the Hard Mode cloze text; every gap keeps its sentence template so whole-sentence options can be built.
// Sentences of the Hard Mode cloze text; every gap keeps its sentence template so whole-sentence options can be built.
// Sentences of the Hard Mode cloze text; every gap keeps its sentence template so whole-sentence options can be built.
// Sentences of the Hard Mode cloze text; every gap keeps its sentence template so whole-sentence options can be built.
// Sentences of the Hard Mode cloze text; every gap keeps its sentence template so whole-sentence options can be built.
function gapSentences(data){if(!data?.text)return [];const out=[];const parts=String(data.text).split(/\n+|(?<=[.!?])\s+/);
 parts.forEach((part,p)=>{const ids=[...part.matchAll(/\{\{(\d+)\}\}/g)].map(m=>Number(m[1])).filter(i=>data.gaps[i]?.answers?.length);
  const fill=(over={})=>part.replace(/\{\{(\d+)\}\}(?=(.?))/g,(_,n,next)=>{const v=over[n]??data.gaps[Number(n)]?.answers?.[0]??'…';return v+(/\p{L}/u.test(next)&&!/[’']$/.test(v)?' ':'');}).replace(/([’'])\s+/g,'$1').trim();
  for(const i of ids){const gap=data.gaps[i];out.push({key:p+':'+i,id:i,sentence:part.replace(/\{\{(\d+)\}\}/g,(_,n)=>Number(n)===i?'___':(data.gaps[Number(n)]?.answers?.[0]??'…')).trim(),answers:gap.answers,hint:gap.hint||'',fill,ids,before:part.split('{{'+i+'}}')[0].trim()});}});
 return out;}
function hintText(hint){const parts=String(hint).split(' / ');return parts.length===2?(en()?parts[1]:parts[0]):String(hint);}

/* Close wrong answers: other forms of the same word – the kind of choice an A1 exam actually tests. */
const WORD_SETS={
 de:[['der','die','das','den','dem','des'],['ein','eine','einen','einem','einer','eines'],['kein','keine','keinen','keinem','keiner'],['mein','meine','meinen','meinem','meiner'],['dein','deine','deinen','deinem','deiner'],['sein','seine','seinen','seinem','seiner'],['ihr','ihre','ihren','ihrem','ihrer'],['unser','unsere','unseren','unserem'],['euer','eure','euren','eurem'],['mich','mir','dich','dir'],['in','im','ins'],['an','am','ans'],['zu','zum','zur'],['von','vom'],['bin','bist','ist','sind','seid'],['habe','hast','hat','haben','habt'],['wo','woher','wohin','wie','wann','was','wer'],['am','um','im','an'],['heute','morgen','übermorgen','gestern']],
 fr:[['le','la','les','l’'],['un','une','des'],['du','de la','des','de','d’'],['au','aux','à la','à l’','à'],['mon','ma','mes','ton','ta','tes','son','sa','ses','notre','nos','votre','vos','leur','leurs'],['ce','cet','cette','ces'],['je','j’'],['de','d’'],['me','m’'],['te','t’'],['se','s’'],['ne','n’'],['que','qu’'],['suis','es','est','sommes','êtes','sont'],['ai','as','a','avons','avez','ont'],['vais','vas','va','allons','allez','vont'],['fais','fait','faisons','faites','font'],['où','ou'],['à','a'],['aujourd’hui','demain','hier','après-demain'],['le','à','en','au']]
};
const ENDINGS={de:['est','et','en','st','er','es','e','n','t','s'],fr:['ons','ent','ez','ées','ée','és','es','e','s','x','t']};
// Real learner slips only: dropping a mark (é→e, ü→u, ß→ss) or mixing up look-alikes (é/è/ê, ie/ei) – never marks on random letters.
const MARKS={de:[['ä','a'],['ö','o'],['ü','u'],['ß','ss'],['ie','ei'],['ei','ie']],fr:[['é','e'],['è','e'],['ê','e'],['é','è'],['è','é'],['ê','é'],['é','ê'],['à','a'],['ù','u'],['î','i'],['ô','o'],['ç','c']]};
const INFINITIVE={fr:/^(s’|se )?[a-zàâçéèêëîïôûü]+(er|ir|re|oir)$/,de:/^[a-zäöüß]+(en|ern|eln)$/};
function variants(word,course,verb){const w=String(word),out=new Set(),m=w.match(/^(.*?)([^\s’']+)$/),head=m?m[1]:'',tail=m?m[2]:w;
 const lead=w.match(/^(\S+)(\s.+)$/),keepCase=(orig,x)=>/^\p{Lu}/u.test(orig)?x.charAt(0).toUpperCase()+x.slice(1):x;
 for(const set of WORD_SETS[course]){if(set.includes(w))set.forEach(x=>out.add(x));else if(head&&set.includes(tail))set.forEach(x=>out.add(head+x));
  if(lead&&set.includes(lead[1].toLowerCase()))set.forEach(x=>out.add(keepCase(lead[1],x)+lead[2]));}
 if(verb&&tail.length>=4)for(const e of ENDINGS[course])if(tail.endsWith(e)&&tail.length-e.length>=2){const stem=tail.slice(0,-e.length);for(const f of ['',...ENDINGS[course]])out.add(head+stem+f);break;}
 for(const [from,to] of MARKS[course]){let i=tail.indexOf(from);while(i>=0){out.add(head+tail.slice(0,i)+to+tail.slice(i+from.length));i=tail.indexOf(from,i+1);}}
 out.delete(w);return [...out].map(v=>v.replace(/([’'])\s+/g,'$1')).filter(v=>v.trim().length>0&&v!==w);}
// A German verb right after a sentence-initial "Sie/sie" could be "she" (-t) or "they/you" (-en): never offer the other reading.
function ambiguous(s,answer,cand,course){if(course!=='de'||!/^(Sie|sie)$/.test(s.before))return false;const plural=a=>/en$|^sind$|^haben$/.test(a),single=a=>/t$|^ist$|^hat$/.test(a);return (plural(answer)&&single(cand))||(single(answer)&&plural(cand));}
// French gender/number endings after je/tu/vous are open (speaker unknown), so they are only used for verbs.
function genderOnly(answer,cand){const a=norm(answer),c=norm(cand);return [a+'e',a+'s',a+'es',a+'x'].includes(c)||[c+'e',c+'s',c+'es',c+'x'].includes(a);}
function common(a,b){let best=0;for(let i=0;i<a.length;i++)for(let j=0;j<b.length;j++){let k=0;while(a[i+k]&&a[i+k]===b[j+k])k++;if(k>best)best=k;}return best;}
// Wrong answers from the word's own family: other forms of the same verb in the course, article/possessive/pronoun sets,
// and (from level 7) realistic spelling slips. "formable" means the family alone gives three close options.
function closeOptions(s,course,{lemma,lexicon,synthetic}){const answer=s.answers[0],banned=new Set(s.answers.map(norm)),family=[],spelling=[],look=[];
 const base=norm(String(s.hint).split(' / ')[0].split(',')[0]),forms=lemma.get(base)||new Set();
 const verb=INFINITIVE[course].test(base)&&(forms.size>=2||course==='de');
 // After an elided word (C’, j’, l’) only a vowel or h can follow.
 const elided=/[’']$/.test(s.before);
 const ok=c=>c&&!banned.has(norm(c))&&!ambiguous(s,answer,c,course)&&!(course==='fr'&&!verb&&genderOnly(answer,c))&&!(elided&&!/^[aeiouyhàâéèêîïôûü]/i.test(c));
 for(const c of forms)if(ok(c))family.push(c);
 for(const c of variants(answer,course,verb)){if(!ok(c))continue;const last=norm(c).split(/[\s’']/).pop();(lexicon.has(last)||lexicon.has(norm(c))?family:spelling).push(c);}
 // Last resort only: course words sharing most of the answer (einundzwanzig ~ einunddreißig).
 const a=norm(answer),cap=w=>/^\p{Lu}/u.test(answer)?w.charAt(0).toUpperCase()+w.slice(1):w;
 const ownFirst=take0();
 if(ownFirst.length<3&&a.length>=5&&!/\s/.test(a))for(const w of lexicon){if(w.length<4||Math.abs(w.length-a.length)>3||w[0]!==a[0]||!ok(cap(w)))continue;if(common(w,a)>=Math.ceil(a.length*.6))look.push(cap(w));}
 function take0(){const seen=[];for(const c of [...family,...(synthetic?spelling:[])]){if(!seen.some(p=>norm(p)===norm(c)))seen.push(c);if(seen.length===3)break;}return seen;}
 const rank=list=>[...new Set(list)].map(c=>[c,distance(c,answer)/Math.max(c.length,answer.length)+Math.random()*.02]).sort((x,y)=>x[1]-y[1]).map(x=>x[0]);
 const take=lists=>{const picks=[];for(const c of lists.flat()){if(picks.length===3)break;if(!picks.some(p=>norm(p)===norm(c)))picks.push(c);}return picks;};
 const own=take([rank(family),synthetic?rank(spelling):[]]),picks=own.length===3?own:take([own,rank(look)]);
 if(picks.length<3)return null;
 return {picks,formable:own.length===3,score:picks.reduce((n,c)=>n+distance(c,answer)/Math.max(c.length,answer.length),0)/3-picks.filter(c=>family.includes(c)).length*.06-(/[’'äöüßéèêàçîôù]/.test(answer)?.08:0)-(verb?.1:0)};}

function generate(course,lessonId){
 const C=COURSES[course];if(!C)return [];const id=Number(lessonId),V=window.A1_VOCABULARY_CONTENT||[],H=C.hard()||{};
 const inLesson=v=>(v[C.lessons]||[]).includes(id),upTo=v=>(v[C.lessons]||[]).some(n=>n<=id);
 const pairs=(list)=>{const seenT=new Set(),seenM=new Set(),out=[];for(const v of list){const t=v[C.target],m=v[C.meaning];if(!t||!m||seenT.has(norm(t))||seenM.has(norm(m)))continue;seenT.add(norm(t));seenM.add(norm(m));out.push({t,m});}return out;};
 let lesson=pairs(V.filter(inLesson));const earlier=pairs(V.filter(upTo));if(lesson.length<8)lesson=pairs([...V.filter(inLesson),...shuffle(V.filter(upTo))]).slice(0,Math.max(8,lesson.length));
 const lang=C.lang,qs=[],hintFor=w=>[`Beginnt mit „${startsWith(w)}“`,`Starts with “${startsWith(w)}”`,`Commence par « ${startsWith(w)} »`];
 // Levels 1–3: what does the word mean?
 for(const p of lesson){const wrong=distractors(p.m,lesson.map(x=>x.m));if(wrong.length<3)continue;
  qs.push({id:'m:'+p.t,l:[1,2,3],kind:'meaning',q:[`Was bedeutet „${p.t}“?`,`What does “${p.t}” mean?`,`Que veut dire « ${p.t} » ?`],o:[p.m,...wrong],ol:C.meaning,h:hintFor(p.m)});}
 // Level 4: how do you say it? Level 5: the same with look-alike words.
 for(const p of lesson)for(const near of [false,true]){const wrong=distractors(p.t,(near?earlier:lesson).map(x=>x.t),{near});if(wrong.length<3)continue;
  qs.push({id:(near?'wn:':'w:')+p.t,l:[near?5:4],kind:near?'word-near':'word',q:[`Wie heißt „${p.m}“ auf ${lang[0]}?`,`How do you say “${p.m}” in ${lang[1]}?`,`Comment dit-on « ${p.m} » en ${lang[2]} ?`],o:[p.t,...wrong],ol:C.target,h:hintFor(p.t)});}
 // Levels 6–10 use the lesson's cloze sentences, ranked from easier to hardest by how close the wrong forms are.
 const lemma=new Map(),lexicon=new Set();
 for(const data of Object.values(H)){for(const g of data.gaps||[]){const k=norm(g.hint||'');if(!k)continue;if(!lemma.has(k))lemma.set(k,new Set());g.answers.forEach(a=>lemma.get(k).add(a));}
  String(data.text||'').replace(/\{\{(\d+)\}\}/g,(_,n)=>' '+(data.gaps?.[n]?.answers?.[0]||'')+' ').toLowerCase().split(/[\s.,!?;:«»„“"()…—–-]+/).forEach(t=>t&&lexicon.add(t));}
 for(const v of V){String(v[C.target]||'').toLowerCase().split(/[\s,/()?!.;:«»„“"…]+/).forEach(t=>t&&lexicon.add(t));}
 for(const set of WORD_SETS[course])set.forEach(w=>lexicon.add(norm(w)));
 const sentences=gapSentences(H[id]),hintOf=s=>s.hint?` (${hintText(s.hint)})`:'';
 // Grammar-rule hints ("à + le : dos", "arbeiten : je") would give the answer away when whole sentences are compared.
 const ruleHint=s=>/[+:]/.test(s.hint)||INFINITIVE[course].test(norm(String(s.hint).split(',')[0]));
 const sentenceHint=s=>ruleHint(s)?'':hintOf(s);
 const formed=sentences.map(s=>({s,real:closeOptions(s,course,{lemma,lexicon,synthetic:false}),close:closeOptions(s,course,{lemma,lexicon,synthetic:true})})).filter(x=>x.close);
 let strong=formed.filter(x=>x.close.formable);
 // Like the real exam, the top levels may revisit the hardest sentences of earlier lessons when this lesson has few.
 for(let back=id-1;back>=1&&strong.length<8;back--)strong=strong.concat(gapSentences(H[back]).map(s=>({s:{...s,key:back+'/'+s.key},close:closeOptions(s,course,{lemma,lexicon,synthetic:true})})).filter(x=>x.close?.formable).sort((x,y)=>x.close.score-y.close.score).slice(0,8-strong.length));
 const hardPool=strong.length>=3?strong:formed;
 const byScore=[...hardPool].sort((x,y)=>x.close.score-y.close.score),n=byScore.length;
 const slice=(from,to,min=3)=>{const a=Math.floor(n*from),b=Math.max(Math.ceil(n*to),a+min);return b>n?byScore.slice(Math.max(0,n-min)):byScore.slice(a,b);};
 const gapQ=(x,level,kind,picks)=>({id:kind+':'+x.s.key,src:x.s.key,l:[level],kind,q:Array(3).fill(`${x.s.sentence}${hintOf(x.s)}`),pl:C.target,o:[x.s.answers[0],...picks],ol:C.target,h:hintFor(x.s.answers[0])});
 // 6: real forms of the same word · 7: plus spelling traps · 8: the closest third of the lesson
 const easier=[...formed].sort((x,y)=>y.close.score-x.close.score);
 for(const x of [...easier,...strong.filter(y=>!formed.includes(y))])qs.push(gapQ(x,6,'gap-form',(x.real||x.close).picks));
 // Lessons with few word families: level 6 uses the lesson's own sentences with the most similar answers of the lesson.
 if(qs.filter(q=>q.kind==='gap-form').length<6)for(const s of sentences){if(qs.filter(q=>q.kind==='gap-form').length>=8)break;if(formed.some(x=>x.s.key===s.key))continue;const wrong=distractors(s.answers[0],[...sentences.map(x=>x.answers[0]),...lesson.map(p=>p.t)],{near:true,exclude:s.answers});if(wrong.length===3)qs.push(gapQ({s},6,'gap-form',wrong));}
 for(const x of slice(.25,.85))qs.push(gapQ(x,7,'gap-close',x.close.picks));
 for(const x of slice(.6,1))qs.push(gapQ(x,8,'gap-hard',x.close.picks));
 // 9: which whole sentence is right? · 10: two gaps in one sentence, errors in either or both
 const whichQ=[`Welcher Satz ist richtig?`,`Which sentence is correct?`,`Quelle phrase est correcte ?`];
 for(const x of slice(.5,1)){const o=[x.s.fill(),...x.close.picks.map(c=>x.s.fill({[x.s.id]:c}))];if(new Set(o.map(norm)).size<4)continue;
  qs.push({id:'s:'+x.s.key,src:x.s.key,l:[9],kind:'sentence',q:whichQ.map(t=>t+sentenceHint(x.s)),o,ol:C.target,h:[`Achte auf „${startsWith(x.s.answers[0])}“`,`Look at “${startsWith(x.s.answers[0])}”`,`Regarde « ${startsWith(x.s.answers[0])} »`]});}
 const twoQ=[`Welcher Satz ist komplett richtig?`,`Which sentence is completely correct?`,`Quelle phrase est entièrement correcte ?`];
 const pairsSeen=new Set();
  for(const x of byScore){if(x.s.ids.length<2)continue;const other=hardPool.find(y=>y.s.key!==x.s.key&&y.s.fill===x.s.fill&&!pairsSeen.has([x.s.key,y.s.key].sort().join('|')));if(!other)continue;pairsSeen.add([x.s.key,other.s.key].sort().join('|'));const a=x.close.picks[0],b=other.close.picks[0];
  const o=[x.s.fill(),x.s.fill({[x.s.id]:a}),x.s.fill({[other.s.id]:b}),x.s.fill({[x.s.id]:a,[other.s.id]:b})];if(new Set(o.map(norm)).size<4)continue;
  qs.push({id:'d:'+x.s.key,src:x.s.key,also:other.s.key,l:[10],kind:'sentence-double',q:twoQ.map(t=>t+([x.s,other.s].filter(s=>!ruleHint(s)).map(s=>hintText(s.hint)).join(' · ').replace(/^(.+)$/,' ($1)'))),o,ol:C.target,h:[`Zwei Stellen prüfen: „${startsWith(x.s.answers[0])}“ und „${startsWith(other.s.answers[0])}“`,`Check two places: “${startsWith(x.s.answers[0])}” and “${startsWith(other.s.answers[0])}”`,`Vérifie deux endroits : « ${startsWith(x.s.answers[0])} » et « ${startsWith(other.s.answers[0])} »`]});}
 // The million question is always among the hardest of the lesson; without two-gap sentences the hardest single ones are used.
 if(qs.filter(q=>q.kind==='sentence-double').length<3)for(const q of qs.filter(q=>q.kind==='sentence').slice(-3))qs.push({...q,id:'x:'+q.src,l:[10],kind:'sentence-hardest'});
 return qs.flatMap(q=>q.l.map(l=>({...q,l})));
}
// One question per level, never the same sentence twice in a game. The ladder is filled from the top, so the
// million question gets the hardest sentence first; an empty level falls back to the closest easier one.
function pickSet(pool){const used=new Set(),srcs=new Set(),set=[];const free=q=>!used.has(q.id||q.q[0])&&!(q.src&&srcs.has(q.src))&&!(q.also&&srcs.has(q.also));
 for(let i=LADDER.length-1;i>=0;i--){let chosen=null;for(let l=i+1;l>=1&&!chosen;l--){const options=pool.filter(q=>q.l===l&&free(q));if(options.length)chosen=pick(options);}chosen||=pick(pool);used.add(chosen.id||chosen.q[0]);if(chosen.src)srcs.add(chosen.src);if(chosen.also)srcs.add(chosen.also);set[i]=chosen;}
 return set;}
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
window.A1_QUIZ_SHOW={mount,generate,pickSet,starsFor,WORD_SETS,money:(n,course)=>{if(course)ui=course==='de'?'fr':'de';return money(n);},LADDER,SAFE,SOUNDS};
})();
