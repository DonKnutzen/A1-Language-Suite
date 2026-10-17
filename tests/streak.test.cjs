const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const source=fs.readFileSync(path.join(__dirname,'../shared/streak.js'),'utf8');
function environment({days=[],cloud=false}={}){
 const dom=new JSDOM('<section data-streak-anchor></section>',{url:'https://example.org/francais/',runScripts:'outside-only'}),w=dom.window,NativeDate=w.Date;
 w.Date=class extends NativeDate{constructor(...args){super(...(args.length?args:[2026,9,17,12]));}static now(){return new NativeDate(2026,9,17,12).getTime();}};
 w.setTimeout=()=>0;
 let profile={profileKey:'alice',userId:'alice-id',mode:cloud?'cloud':'local'},lang='de';
 w.A1Profile={namespacedKey:k=>profile.profileKey+':'+k,getCurrent:()=>profile,getUiLang:()=>lang,cloudConfigured:cloud,getDailyActivity:async()=>null,saveDailyActivity:async()=>{}};
 w.localStorage.setItem('alice:a1suite.dailyStreak.v1',JSON.stringify({version:1,days}));w.eval(source);
 return {dom,w,setProfile:p=>profile=p,setLang:l=>lang=l};
}
test('French home shows an inactive flame at zero and a completed exercise lights it once per day',()=>{
 const {dom,w}=environment(),root=w.document.querySelector('section');root.innerHTML=w.A1Streak.render('de',{showEmpty:true});let badge=root.firstElementChild;
 assert(!badge.hidden);assert(badge.classList.contains('is-inactive'));assert(badge.querySelector('svg'));assert.equal(badge.querySelector('[data-streak-count]').textContent,'0');assert(badge.title.includes('Schließe eine Übung ab'));
 w.A1Streak.completeExercise();assert(!badge.hidden);assert(!badge.classList.contains('is-inactive'));assert.equal(badge.querySelector('[data-streak-count]').textContent,'1');assert.equal(w.A1Streak.completeExercise().count,1);
 assert.equal(JSON.parse(w.localStorage.getItem('alice:a1suite.dailyStreak.v1')).days.length,1);dom.window.close();
});
test('other course entry points keep the existing hidden-at-zero behavior',()=>{
 const {dom,w}=environment(),root=w.document.querySelector('section');root.innerHTML=w.A1Streak.render('fr');assert(root.firstElementChild.hidden);w.A1Streak.completeExercise();assert(!root.firstElementChild.hidden);assert.equal(root.firstElementChild.getAttribute('aria-label'),'Série d’apprentissage: 1 jour');dom.window.close();
});
test('streak allows one rest day but never invents days from completed lessons or an expired streak',()=>{
 for(const [days,expected] of [[['2026-10-15'],1],[['2026-10-14'],0],[['2026-10-13','2026-10-15','2026-10-17'],3]]){
  const {dom,w}=environment({days});w.localStorage.setItem('francais-state',JSON.stringify({doneLessons:[1,2,3,4]}));assert.equal(w.A1Streak.snapshot().count,expected);assert.equal(w.A1Streak.completeExercise().count,expected+(days.includes('2026-10-17')?0:1));dom.window.close();
 }
});
test('cloud synchronization combines device activity and keeps a locally completed exercise during the request',async()=>{
 const {dom,w}=environment({days:['2026-10-15'],cloud:true});let finish,saved;
 w.A1Profile.getDailyActivity=()=>new Promise(resolve=>finish=resolve);w.A1Profile.saveDailyActivity=async data=>{saved=data;};
 const syncing=w.A1Streak.sync();w.A1Streak.completeExercise();finish({version:1,days:['2026-10-15','2026-10-16']});await syncing;
 assert.equal(w.A1Streak.snapshot().count,3);assert.deepEqual([...saved.days],['2026-10-15','2026-10-16','2026-10-17']);dom.window.close();
});
test('a late cloud response cannot replace the next profile’s streak',async()=>{
 const {dom,w,setProfile}=environment({cloud:true});let finish;w.A1Profile.getDailyActivity=()=>new Promise(resolve=>finish=resolve);const syncing=w.A1Streak.sync();
 setProfile({profileKey:'bob',userId:'bob-id',mode:'local'});finish({version:1,days:['2026-10-16','2026-10-17']});await syncing;assert.equal(w.A1Streak.snapshot().count,0);assert.equal(w.localStorage.getItem('bob:a1suite.dailyStreak.v1'),null);dom.window.close();
});
test('the visible flame follows English display language without changing saved activity',()=>{
 const {dom,w,setLang}=environment({days:['2026-10-16']}),root=w.document.querySelector('section');root.innerHTML=w.A1Streak.render('de',{showEmpty:true});setLang('en');w.dispatchEvent(new w.CustomEvent('a1suite:languagechange'));assert.equal(root.firstElementChild.getAttribute('aria-label'),'Learning streak: 1 day');assert.equal(w.A1Streak.snapshot().count,1);dom.window.close();
});
