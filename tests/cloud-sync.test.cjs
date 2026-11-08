const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {webcrypto}=require('node:crypto'),{TextEncoder}=require('node:util'),{JSDOM}=require('jsdom');
const source=fs.readFileSync(path.join(__dirname,'../shared/profile.js'),'utf8').replace(
 'window.A1Profile = {','window.A1Profile = {mergeProgress,refreshCourseFromCloud,ensureToken,clearCurrent,');
const plain=v=>JSON.parse(JSON.stringify(v));
const deferred=()=>{let resolve;const promise=new Promise(r=>resolve=r);return {promise,resolve};};
const response=(data,status=200)=>({ok:status<400,status,json:async()=>plain(data)});
function backend(){
 const rows=new Map(),leaderboard=new Map();
 const b={rows,leaderboard,offline:false,conflicts:0,refreshes:0,beforeRead:null,beforeWrite:null,beforeRefresh:null};
 b.seed=(user='u',course='fr-a2',data={doneLessons:[1]},percent=5)=>{
  if(['de','fr'].includes(course))rows.set(`${user}:${course}`,
   {user_id:user,course,progress_data:plain(data),percent,updated_at:'2026-11-01T00:00:00.000Z'});
  else{
   const host=rows.get(`${user}:fr`)||{user_id:user,course:'fr',progress_data:{},percent:0,updated_at:'2026-11-01T00:00:00.000Z'};
   (host.progress_data._suiteCourses||={})[course]={progress_data:plain(data),percent};rows.set(`${user}:fr`,host);
  }
 };
 b.progress=(user='u',course='fr-a2')=>['de','fr'].includes(course)?rows.get(`${user}:${course}`):rows.get(`${user}:fr`)?.progress_data?._suiteCourses?.[course];
 b.fetch=async(raw,options={})=>{
  if(b.offline)throw Error('offline');
  const url=new URL(raw),method=options.method||'GET',body=options.body?JSON.parse(options.body):null;
  if(url.pathname.includes('/auth/v1/token')){
   b.refreshes++;if(b.beforeRefresh)await b.beforeRefresh();
   return response({access_token:'u',refresh_token:'rotated',expires_in:3600,user:{id:'u'}});
  }
  const user=options.headers?.Authorization?.replace('Bearer ','');
  if(!user)return response({message:'not authenticated'},401);
  if(url.pathname.endsWith('/leaderboard_entries')){leaderboard.set(`${body.user_id}:${body.course}`,body);return response([]);}
  if(!url.pathname.endsWith('/course_progress'))throw Error(`Unexpected request ${raw}`);
  if(method==='GET'){
   const id=url.searchParams.get('user_id').slice(3),course=url.searchParams.get('course').slice(3);
   if(id!==user)return response([]);
   const row=rows.get(`${id}:${course}`),snapshot=row?plain(row):null;
   if(b.beforeRead)await b.beforeRead({user:id,course,snapshot});
   return response(snapshot?[snapshot]:[]);
  }
  assert.equal(body.user_id,user,'matching account token required');
  if(!['de','fr'].includes(body.course))return response({code:'23514',message:'violates check constraint course_progress_course_check'},400);
  if(b.beforeWrite)await b.beforeWrite(body);
  const key=`${user}:${body.course}`,current=rows.get(key);
  if(method==='POST'){
   assert.match(options.headers.Prefer,/ignore-duplicates/);
   if(current){b.conflicts++;return response([]);}
  }else{
   assert.equal(method,'PATCH');const expected=url.searchParams.get('updated_at')?.slice(3);
   if(!current||current.updated_at!==expected){b.conflicts++;return response([]);}
   assert.notEqual(body.updated_at,expected,'CAS token must advance');
  }
  rows.set(key,plain(body));return response([body]);
 };
 return b;
}
async function device(b,{user='u',profile='p',course='francais-a2',base='base',state,storage,expired=false}={}){
 const dom=new JSDOM('<div class="header-actions"></div><span data-cloud-status></span>',{url:'https://example.org/course/',runScripts:'outside-only'}),w=dom.window;
 await new Promise(resolve=>w.addEventListener('load',resolve));
 w.TextEncoder=TextEncoder;Object.defineProperty(w.crypto,'subtle',{value:webcrypto.subtle});
 w.A1_CONFIG={supabaseUrl:'https://cloud.example',supabaseAnonKey:'publishable'};w.A1_APP_META={course,stateBaseKey:base};w.fetch=b.fetch;
 if(storage)for(const [k,v] of storage)w.localStorage.setItem(k,v);
 else w.localStorage.setItem('a1suite.currentProfile',JSON.stringify({username:profile,profileKey:profile,userId:user,mode:'cloud',
  access_token:user,refresh_token:'refresh',expires_at:expired?1:Math.floor(Date.now()/1000)+3600}));
 const key=`${base}::profile:${profile}`;if(state)w.localStorage.setItem(key,JSON.stringify(state));
 let applies=0;w.A1ApplyCloudProgress=()=>applies++;w.eval(source);
 return {w,api:w.A1Profile,key,close:()=>dom.window.close(),get state(){return JSON.parse(w.localStorage.getItem(key)||'null');},
  get queued(){return Object.keys(w.localStorage).filter(k=>k.startsWith('a1suite.syncQueue:'));},get applies(){return applies;},storage:()=>Object.entries(w.localStorage)};
}

test('a fresh browser downloads phone progress and fetches subsequent changes in the same tab',async t=>{
 const b=backend();b.seed('u','fr-a2',{doneLessons:[1,2,3],lessonQuizBest:{3:95}});const d=await device(b);t.after(d.close);
 await d.api.refreshCourseFromCloud();assert.deepEqual(d.state.doneLessons,[1,2,3]);assert.equal(d.applies,1);
 await d.api.refreshCourseFromCloud();assert.equal(d.applies,1);
 b.seed('u','fr-a2',{doneLessons:[1,2,3,4],lessonQuizBest:{3:95,4:90}});
 await d.api.refreshCourseFromCloud();assert.deepEqual(d.state.doneLessons,[1,2,3,4]);assert.equal(d.applies,2);
});
test('login hydration combines local and cloud achievements, best scores and partially completed lessons',async t=>{
 const b=backend();b.seed('u','fr-a2',{doneLessons:[1,3],lessonQuizBest:{1:95,3:80},lessonWork:{1:{heardPhrases:[0,2],quizDone:true}}});
 const d=await device(b,{state:{doneLessons:[1,2],lessonQuizBest:{1:70,2:90},lessonWork:{1:{heardPhrases:[0,1],quizDone:false}}}});t.after(d.close);
 await d.api.hydrateCourse();assert.deepEqual(d.state.doneLessons,[1,2,3]);assert.deepEqual(d.state.lessonQuizBest,{1:95,2:90,3:80});
 assert.deepEqual(d.state.lessonWork[1].heardPhrases,[0,1,2]);assert.equal(d.state.lessonWork[1].quizDone,true);
 assert.deepEqual(b.progress().progress_data.doneLessons,[1,2,3]);
});
for(const first of [false,true])test(`simultaneous device writes preserve both sets of lessons (${first?'new':'existing'} cloud row)`,async t=>{
 const b=backend();if(!first)b.seed();const a=await device(b),d=await device(b);t.after(a.close);t.after(d.close);
 const gate=deferred();let reads=0;b.beforeRead=async({course})=>{if(course==='fr'&&++reads<=2){if(reads===2)gate.resolve();await gate.promise;}};
 a.api.saveProgress('francais-a2',{doneLessons:[1,2],lessonQuizBest:{2:95}},10);
 d.api.saveProgress('francais-a2',{doneLessons:[1,3],lessonQuizBest:{3:85}},10);
 await Promise.all([a.api.flushProgress(),d.api.flushProgress()]);assert(b.conflicts>=1);
 assert.deepEqual(b.progress().progress_data.doneLessons,[1,2,3]);assert.deepEqual(b.progress().progress_data.lessonQuizBest,{2:95,3:85});
 assert.equal(b.progress().percent,13,'percentage reflects the union of three out of 24 lessons');
});
test('offline uploads survive closing the browser and resume on the landing page',async t=>{
 const b=backend();b.seed();b.offline=true;const first=await device(b);first.api.saveProgress('francais-a2',{doneLessons:[1,2]},10);
 assert.equal(first.queued.length,1);await assert.rejects(first.api.flushProgress(),/offline/);assert.equal(first.api.getSyncStatus(),'error');
 const storage=first.storage();first.close();b.offline=false;b.seed('u','fr-a2',{doneLessons:[1,3]},10);
 const next=await device(b,{course:null,base:null,storage});t.after(next.close);await next.api.flushProgress();
 assert.equal(next.queued.length,0);assert.deepEqual(b.progress().progress_data.doneLessons,[1,2,3]);
});
test('local work completed during a cloud read is preserved and subsequently combined',async t=>{
 const b=backend();b.seed('u','fr-a2',{doneLessons:[1,3]});const d=await device(b,{state:{doneLessons:[1]}});t.after(d.close);
 const entered=deferred(),gate=deferred();b.beforeRead=async()=>{entered.resolve();await gate.promise;};
 const reading=d.api.refreshCourseFromCloud();await entered.promise;d.api.saveProgress('francais-a2',{doneLessons:[1,2]},10);gate.resolve();await reading;
 assert.deepEqual(d.state.doneLessons,[1,2]);await d.api.flushProgress();assert.deepEqual(b.progress().progress_data.doneLessons,[1,2,3]);
});
test('acknowledging an older upload cannot delete newer pending work',async t=>{
 const b=backend();b.seed();const d=await device(b);t.after(d.close);const entered=deferred(),gate=deferred();let writes=0;
 b.beforeWrite=async()=>{if(++writes===1){entered.resolve();await gate.promise;}};
 d.api.saveProgress('francais-a2',{doneLessons:[1,2]},10);const uploading=d.api.flushProgress();await entered.promise;
 d.api.saveProgress('francais-a2',{doneLessons:[1,2,3]},15);gate.resolve();await uploading;assert.equal(d.queued.length,1);
 await d.api.flushProgress();assert.equal(d.queued.length,0);assert.deepEqual(b.progress().progress_data.doneLessons,[1,2,3]);
});
test('reset propagates without stale devices resurrecting old achievements or percent',async t=>{
 const b=backend();b.seed('u','fr-a2',{doneLessons:[1,2,3],bestMock:90},50);
 const a=await device(b),stale=await device(b,{state:{doneLessons:[1,2,3],bestMock:90}});t.after(a.close);t.after(stale.close);
 await a.api.resetProgress('francais-a2',{doneLessons:[],bestMock:0});
 stale.api.saveProgress('francais-a2',{doneLessons:[1,2,3,4],bestMock:95},75);await stale.api.flushProgress();
 assert.deepEqual(b.progress().progress_data.doneLessons,[]);assert.equal(b.progress().percent,0);assert.deepEqual(stale.state.doneLessons,[]);
 const resumed=plain(a.state);resumed.doneLessons=[1];a.api.saveProgress('francais-a2',resumed,5);await a.api.flushProgress();
 assert.deepEqual(b.progress().progress_data.doneLessons,[1]);
});
test('rotating tokens refresh once and a late refresh cannot restore a signed-out account',async t=>{
 const b=backend(),d=await device(b,{expired:true});t.after(d.close);
 await Promise.all([d.api.ensureToken(),d.api.ensureToken(),d.api.ensureToken()]);assert.equal(b.refreshes,1);
 const p=d.api.getCurrent();p.expires_at=1;d.w.localStorage.setItem('a1suite.currentProfile',JSON.stringify(p));
 const entered=deferred(),gate=deferred();b.beforeRefresh=async()=>{entered.resolve();await gate.promise;};
 const refreshing=d.api.ensureToken();await entered.promise;d.api.clearCurrent();gate.resolve();
 await assert.rejects(refreshing,/Profile changed/);assert.equal(d.api.getCurrent(),null);
});
test('profile changes during hydration cannot put one account’s progress into another account',async t=>{
 const b=backend();b.seed();const d=await device(b,{state:{doneLessons:[2]}});t.after(d.close);
 const entered=deferred(),gate=deferred();b.beforeRead=async()=>{entered.resolve();await gate.promise;};const hydrating=d.api.hydrateCourse();await entered.promise;
 d.w.localStorage.setItem('a1suite.currentProfile',JSON.stringify({mode:'cloud',userId:'other',profileKey:'other',access_token:'other'}));
 gate.resolve();await hydrating;assert.deepEqual(d.state.doneLessons,[2]);assert.equal(d.w.localStorage.getItem('base::profile:other'),null);
 b.beforeRead=null;d.api.saveProgress('francais-a1',{doneLessons:[9]},30);await d.api.flushProgress();
 assert.deepEqual(b.rows.get('other:fr').progress_data.doneLessons,[9]);assert.equal(b.rows.get('u:fr').progress_data.doneLessons,undefined);
});
test('daily streaks also merge concurrent updates without creating leaderboard entries',async t=>{
 const b=backend(),a=await device(b),d=await device(b);t.after(a.close);t.after(d.close);
 await Promise.all([a.api.saveDailyActivity({version:1,days:['2026-11-06']}),d.api.saveDailyActivity({version:1,days:['2026-11-07']})]);
 assert.deepEqual(b.progress('u','a1-daily-streak').progress_data.days,['2026-11-06','2026-11-07']);assert.equal(b.leaderboard.size,0);
});
test('live answers stay intact while completed lessons and best scores combine',async t=>{
 const d=await device(backend());t.after(d.close);
 const merged=plain(d.api.mergeProgress({doneLessons:[1],lessonQuizBest:{1:95},lessonWork:{1:{answers:['a','b'],done:true}},_sync:{modified:'1'}},
  {doneLessons:[2],lessonQuizBest:{1:60},lessonWork:{1:{answers:['c'],done:false}},_sync:{modified:'2'}}));
 assert.deepEqual(merged.doneLessons,[1,2]);assert.equal(merged.lessonQuizBest[1],95);assert.deepEqual(merged.lessonWork[1].answers,['c']);assert.equal(merged.lessonWork[1].done,true);
});
test('saving repeatedly preserves exercise object references and allows restarting a dialogue',async t=>{
 const d=await device(backend());t.after(d.close);
 const state={doneLessons:[],lessonWork:{1:{comprehension:{answers:['a'],graded:true,done:true}}}};
 const work=state.lessonWork[1],dialogue=work.comprehension;
 d.api.saveProgress('francais-a2',state,0);
 assert.equal(state.lessonWork[1],work);assert.equal(work.comprehension,dialogue);
 dialogue.answers=[];dialogue.graded=false;dialogue.done=false;
 d.api.saveProgress('francais-a2',state,0);
 assert.equal(state.lessonWork[1],work);assert.deepEqual(d.state.lessonWork[1].comprehension.answers,[]);
 assert.equal(d.state.lessonWork[1].comprehension.done,false);
});
test('A1 and A2 stay separate in a legacy row, including resets of either course',async t=>{
 const b=backend();b.seed('u','fr',{doneLessons:[1,2],bestMock:80},8);b.seed('u','fr-a2',{doneLessons:[1],bestMock:70},4);
 const a1=await device(b,{course:'francais-a1',base:'a1'}),a2=await device(b);t.after(a1.close);t.after(a2.close);
 a2.api.saveProgress('francais-a2',{doneLessons:[2],bestMock:90},4);await a2.api.flushProgress();
 assert.deepEqual(b.progress('u','fr').progress_data.doneLessons,[1,2]);assert.equal(b.progress('u','fr').percent,8);
 assert.deepEqual(b.progress().progress_data.doneLessons,[1,2]);
 await a1.api.resetProgress('francais-a1',{doneLessons:[],bestMock:0});
 assert.deepEqual(b.progress('u','fr').progress_data.doneLessons,[]);assert.deepEqual(b.progress().progress_data.doneLessons,[1,2]);
 await a2.api.resetProgress('francais-a2',{doneLessons:[],bestMock:0});
 assert.deepEqual(b.progress().progress_data.doneLessons,[]);assert.deepEqual(b.progress('u','fr').progress_data.doneLessons,[]);
});
test('different courses and a streak can concurrently write one legacy row without replacing other courses',async t=>{
 const b=backend(),a=await device(b,{course:'francais-a1',base:'a1'}),d=await device(b);t.after(a.close);t.after(d.close);
 a.api.saveProgress('francais-a1',{doneLessons:[1,2]},8);d.api.saveProgress('francais-a2',{doneLessons:[3]},4);
 await Promise.all([a.api.flushProgress(),d.api.flushProgress(),d.api.saveDailyActivity({version:1,days:['2026-11-08']})]);
 assert.deepEqual(b.progress('u','fr').progress_data.doneLessons,[1,2]);assert.deepEqual(b.progress().progress_data.doneLessons,[3]);
 assert.deepEqual(b.progress('u','a1-daily-streak').progress_data.days,['2026-11-08']);
});
test('existing native progress migrates into compatible storage and cannot undo a later reset',async t=>{
 const b=backend();b.rows.set('u:fr-a2',{user_id:'u',course:'fr-a2',progress_data:{doneLessons:[1,2]},percent:8,updated_at:'2026-11-01T00:00:00.000Z'});
 const d=await device(b);t.after(d.close);await d.api.hydrateCourse();assert.deepEqual(d.state.doneLessons,[1,2]);
 d.api.saveProgress('francais-a2',{doneLessons:[3]},4);await d.api.flushProgress();assert.deepEqual(b.progress().progress_data.doneLessons,[1,2,3]);
 await d.api.resetProgress('francais-a2',{doneLessons:[]});await d.api.hydrateCourse();assert.deepEqual(d.state.doneLessons,[]);
});
test('all current course identities save through a database that only permits de and fr',async t=>{
 const b=backend(),d=await device(b);t.after(d.close);
 for(const [course,code] of [['deutsch-a1','de'],['francais-a1','fr'],['francais-a2','fr-a2'],['englisch-b1','en-b1'],['spanisch-a1','es'],['deutsch-c1-tr','de-c1-tr']]){
  d.api.saveProgress(course,{doneLessons:[1]},4);await d.api.flushProgress();assert.deepEqual(b.progress('u',code).progress_data.doneLessons,[1],course);
 }
 assert.deepEqual([...b.rows.keys()].sort(),['u:de','u:fr']);
});
test('expired cloud sessions request a new sign-in while preserving the account and local progress',async t=>{
 const b=backend();b.fetch=async()=>response({code:'refresh_token_not_found',message:'Invalid Refresh Token'},400);
 const d=await device(b,{expired:true,state:{doneLessons:[1,2]}});t.after(d.close);
 await d.api.refreshCourseFromCloud();assert.equal(d.api.getSyncStatus(),'reauth');assert.deepEqual(d.state.doneLessons,[1,2]);
 assert.equal(d.api.getCurrent().userId,'u');assert.match(d.w.document.querySelector('[data-cloud-status]').textContent,/same profile|demselben Profil/);
 d.api.open();assert(d.w.document.getElementById('pmReconnect'));d.w.document.getElementById('pmReconnect').click();
 assert.equal(d.w.document.getElementById('profileName').value,'p');assert.equal(d.api.getCurrent().userId,'u');
});
