const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../shared/profile.js'),'utf8');
function setup(){
 const store=new Map([['state','{"doneLessons":[]}']]),session=new Map([['a1suite.hydrated:p:francais-a2','1']]);
 let remote={progress_data:{doneLessons:[1]}},reloads=0,reads=0;
 const c={cloudConfigured:true,getCurrent:()=>({mode:'cloud',profileKey:'p',userId:'u'}),META:{course:'francais-a2',stateBaseKey:'base'},SYNC_PENDING:new Map(),SYNC_REQUESTS:new Map(),resetVersion:0,namespacedKey:()=> 'state',localStorage:{getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)},sessionStorage:{getItem:k=>session.get(k),setItem:(k,v)=>session.set(k,v)},cloudGet:async()=>{reads++;return remote;},location:{reload:()=>reloads++},cloudPut:async()=>{},pagePercent:()=>0};
 vm.createContext(c);vm.runInContext(source.slice(source.indexOf('let courseRefreshRunning=false;'),source.indexOf("window.addEventListener('focus',()=>refreshCourseFromCloud());")),c);
 return {c,store,setRemote:v=>remote=v,get reloads(){return reloads},get reads(){return reads}};
}
test('A2 fetches a changed phone snapshot even after hydration in the same tab',async()=>{
 const s=setup();await s.c.refreshCourseFromCloud();assert.equal(s.reloads,1);assert.equal(s.store.get('state'),'{"doneLessons":[1]}');
 await s.c.refreshCourseFromCloud();assert.equal(s.reloads,1);assert.equal(s.reads,2);
 s.setRemote({progress_data:{doneLessons:[1,2]}});await s.c.refreshCourseFromCloud();assert.equal(s.reloads,2);
});
test('pending local work is not overwritten by a cloud refresh',async()=>{
 const s=setup();s.c.SYNC_PENDING.set('francais-a2',()=>{});await s.c.refreshCourseFromCloud();assert.equal(s.reads,0);assert.equal(s.reloads,0);
});
test('failed read is retried and local changes during the request are preserved',async()=>{
 const s=setup();s.c.cloudGet=async()=>{throw Error('offline')};await s.c.refreshCourseFromCloud();
 s.c.cloudGet=async()=>{s.store.set('state','{"doneLessons":[3]}');return {progress_data:{doneLessons:[1]}}};await s.c.refreshCourseFromCloud();assert.equal(s.reloads,0);assert.equal(s.store.get('state'),'{"doneLessons":[3]}');
 s.c.cloudGet=async()=>({progress_data:{doneLessons:[1,3]}});await s.c.refreshCourseFromCloud();assert.equal(s.reloads,1);
});
