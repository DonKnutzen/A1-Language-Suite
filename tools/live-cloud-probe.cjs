// Explicitly opt in: creates a dedicated diagnostic account, never uses a learner account.
// Tokens and the randomly generated PIN stay in memory and are never printed.
if(!process.argv.includes('--create-test-profile'))throw Error('Pass --create-test-profile to create a dedicated diagnostic account');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),crypto=require('node:crypto');
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../shared/config.js'),'utf8'),c);
const cfg=c.window.A1_CONFIG,name=`sync-test-${crypto.randomBytes(5).toString('hex')}`;
const hash=crypto.createHash('sha256').update(name).digest('hex'),email=`u_${hash.slice(0,32)}@profiles.a1trainer.app`;
const pin=String(crypto.randomInt(100000,1000000)),headers={apikey:cfg.supabaseAnonKey,'Content-Type':'application/json'};
async function request(label,route,options={}){
 const r=await fetch(`${cfg.supabaseUrl}${route}`,{...options,headers:{...headers,...options.headers},signal:AbortSignal.timeout(15000)});
 const text=await r.text();let body;try{body=JSON.parse(text);}catch{body=text;}
 console.log(JSON.stringify({check:label,status:r.status,...(!r.ok?{error:body.message||body.msg||body.error,code:body.code}:{}),
  ...(r.ok&&route.startsWith('/rest/')?{rows:Array.isArray(body)?body.length:undefined}:{} )}));
 return {ok:r.ok,body};
}
async function verifyApplication(firstSession){
 const assert=require('node:assert/strict'),{JSDOM}=require('jsdom'),{TextEncoder}=require('node:util');
 const second=await request('second independent login','/auth/v1/token?grant_type=password',{method:'POST',body:JSON.stringify({email,password:`A1-${pin}-trainer`})});
 assert(second.ok&&second.body.access_token);
 const documents=[];
 async function browser(session,course='francais-a2',base='syncTestA2'){
  const dom=new JSDOM('<div class="header-actions"></div>',{url:'https://example.org/',runScripts:'outside-only'}),w=dom.window;documents.push(dom);
  await new Promise(resolve=>w.addEventListener('load',resolve));w.TextEncoder=TextEncoder;w.AbortController=global.AbortController;
  w.A1_CONFIG=cfg;w.A1_APP_META={course,stateBaseKey:base};w.fetch=global.fetch;w.A1ApplyCloudProgress=()=>{};
  w.localStorage.setItem('a1suite.currentProfile',JSON.stringify({mode:'cloud',username:name,profileKey:hash.slice(0,20),userId:session.user.id,
   access_token:session.access_token,refresh_token:session.refresh_token,expires_at:Math.floor(Date.now()/1000)+session.expires_in}));
  w.eval(fs.readFileSync(path.join(__dirname,'../shared/profile.js'),'utf8'));
  return {w,api:w.A1Profile,key:`${base}::profile:${hash.slice(0,20)}`};
 }
 try{
  const a1=await browser(firstSession,'francais-a1','syncTestA1'),phone=await browser(firstSession),mac=await browser(second.body);
  a1.api.saveProgress('francais-a1',{doneLessons:[1,2],bestMock:80},8);await a1.api.flushProgress();
  phone.api.saveProgress('francais-a2',{doneLessons:[1,2],lessonQuizBest:{2:90}},8);
  mac.api.saveProgress('francais-a2',{doneLessons:[3],lessonQuizBest:{3:95}},4);
  await Promise.all([phone.api.flushProgress(),mac.api.flushProgress()]);
  await phone.api.saveDailyActivity({version:1,days:['2026-11-08']});
  const fresh=await browser(second.body);await fresh.api.hydrateCourse();
  assert.deepEqual(JSON.parse(fresh.w.localStorage.getItem(fresh.key)).doneLessons,[1,2,3]);
  const auth={Authorization:`Bearer ${firstSession.access_token}`},route=`/rest/v1/course_progress?user_id=eq.${firstSession.user.id}&course=eq.fr&select=progress_data,percent`;
  const stored=await request('read actual combined storage',route,{headers:auth});assert(stored.ok);
  assert.deepEqual(stored.body[0].progress_data.doneLessons,[1,2]);
  assert.deepEqual(stored.body[0].progress_data._suiteCourses['fr-a2'].progress_data.doneLessons,[1,2,3]);
  assert.deepEqual(stored.body[0].progress_data._suiteCourses['a1-daily-streak'].progress_data.days,['2026-11-08']);
  await phone.api.resetProgress('francais-a2',{doneLessons:[]});
  mac.api.saveProgress('francais-a2',{doneLessons:[1,2,3,4]},16);await mac.api.flushProgress();
  const reset=await request('read reset isolation',route,{headers:auth});
  assert.deepEqual(reset.body[0].progress_data._suiteCourses['fr-a2'].progress_data.doneLessons,[]);
  assert.deepEqual(reset.body[0].progress_data.doneLessons,[1,2]);
  await a1.api.resetProgress('francais-a1',{doneLessons:[],bestMock:0});
  console.log(JSON.stringify({liveApplicationSync:true,independentSessions:2,freshBrowserRestored:true,a1Preserved:true,streakSaved:true,resetIsolated:true,diagnosticLeaderboardCleared:true}));
 }finally{for(const dom of documents)dom.window.close();}
}
(async()=>{
 const signed=await request('create diagnostic account','/auth/v1/signup',{method:'POST',body:JSON.stringify({email,password:`A1-${pin}-trainer`,data:{username:name,display_lang:'de'}})});
 if(!signed.ok||!signed.body.access_token){process.exitCode=1;return;}
 const {user,access_token}=signed.body;console.log(JSON.stringify({diagnosticProfile:name,userId:user.id}));
 const auth={Authorization:`Bearer ${access_token}`};
 try{
  const read=await request('authenticated progress columns','/rest/v1/course_progress?select=progress_data,percent,updated_at&limit=0',{headers:auth});
  await request('authenticated leaderboard columns','/rest/v1/leaderboard_entries?select=user_id,course,percent,updated_at&limit=0',{headers:auth});
  if(!read.ok){process.exitCode=1;return;}
  if(process.argv.includes('--app-sync')){await verifyApplication(signed.body);return;}
  for(const course of ['fr-a2','fr','en-b1','de-c1-tr','a1-daily-streak','en','de-tr','de']){
   const row={user_id:user.id,course,progress_data:{doneLessons:[]},percent:0,updated_at:new Date().toISOString()};
   const write=await request(`insert ${course}`,'/rest/v1/course_progress?on_conflict=user_id,course',{method:'POST',
    headers:{...auth,Prefer:'resolution=ignore-duplicates,return=representation'},body:JSON.stringify(row)});
   if(!write.ok||!write.body.length){process.exitCode=1;continue;}
   const previous=write.body[0].updated_at;row.updated_at=new Date(Date.now()+1).toISOString();
   const update=await request(`conditional update ${course}`,`/rest/v1/course_progress?user_id=eq.${user.id}&course=eq.${course}&updated_at=eq.${encodeURIComponent(previous)}`,{
    method:'PATCH',headers:{...auth,Prefer:'return=representation'},body:JSON.stringify(row)});
   if(!update.ok||!update.body.length)process.exitCode=1;
  }
 }finally{await request('sign out diagnostic session','/auth/v1/logout',{method:'POST',headers:auth});}
})().catch(error=>{console.error(JSON.stringify({error:error.cause?.code||error.message}));process.exitCode=1;});
