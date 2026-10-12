const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
const source=fs.readFileSync(path.join(root,'shared/profile.js'),'utf8');
function api(profile,fetch,overrides={}){
  const code=source.slice(source.indexOf('  async function submitBugReport('),source.indexOf('  window.A1Profile = {'));
  const scope={getCurrent:()=>profile,ensureToken:async()=>profile?.access_token,cfg:{supabaseUrl:'https://example.invalid'},authHeaders:token=>({Authorization:'Bearer '+token}),responseError:async()=>new Error('request failed'),fetch,restGet:async()=>[],window:{},AbortController,setTimeout,clearTimeout,...overrides};
  vm.createContext(scope);vm.runInContext(code+';window.api={submitBugReport,resolveBugReport};',scope);return scope.window.api;
}
test('submission includes only the report and server-required profile identity',async()=>{
  let request;
  const p={mode:'cloud',userId:'user-1',username:'Bine',access_token:'private-token',pin:'private-pin'};
  const a=api(p,async(url,opts)=>{request={url,...opts};return {ok:true,status:201};});
  await a.submitBugReport({id:'report-1',message:'This exercise fails.',context:{lessonId:1,question:'Je ___ allemand.'},access_token:'never send this'});
  const body=JSON.parse(request.body);assert.deepEqual(Object.keys(body).sort(),['context','id','message','reporter_name','user_id']);assert.equal(body.reporter_name,'Bine');assert(!request.body.includes('private-'));assert.equal(request.headers.Authorization,'Bearer private-token');
});
test('local profile cannot submit and a failed request is not reported as success',async()=>{
  let calls=0;const local=api({mode:'local'},async()=>{calls++;});await assert.rejects(local.submitBugReport({}),/BUG_LOGIN_REQUIRED/);assert.equal(calls,0);
  const cloud=api({mode:'cloud',access_token:'token'},async()=>({ok:false,status:403}));await assert.rejects(cloud.submitBugReport({id:'one'}),/request failed/);
});
test('duplicate retry succeeds without creating a second report',async()=>{
  const a=api({mode:'cloud',access_token:'token'},async()=>({ok:false,status:409}));await a.submitBugReport({id:'same-id'});
});
test('resolving a report requires the server to confirm an updated row',async()=>{
  const a=api({mode:'cloud',access_token:'token'},async()=>({ok:true,json:async()=>[]}));await assert.rejects(a.resolveBugReport('report-1'),/BUG_NOT_UPDATED/);
});
test('all supported pages and offline caches include the reporting module',()=>{
  for(const page of ['index.html','francais/index.html','deutsch/index.html']){const html=fs.readFileSync(path.join(root,page),'utf8');assert(html.includes('bug-reports.js?v=bug-mic-77'));assert(html.includes('bug-dictation.js?v=bug-mic-77'));}
  for(const course of ['francais','deutsch']){const sw=fs.readFileSync(path.join(root,course,'service-worker.js'),'utf8');assert(sw.includes('bug-reports.js?v=bug-mic-77'));assert(sw.includes('bug-dictation.js?v=bug-mic-77'));}
});

test('a stalled report request expires and aborts instead of waiting forever',async()=>{
  let signal;
  const a=api({mode:'cloud',userId:'u',access_token:'token'},async(url,opts)=>{signal=opts.signal;return new Promise(()=>{});},{setTimeout:fn=>setTimeout(fn,5)});
  await assert.rejects(a.submitBugReport({id:'same-id',message:'Broken question',context:{}}),/BUG_SEND_TIMEOUT/);
  assert.equal(signal.aborted,true);
});
test('an auth refresh that finishes after the deadline cannot post a late report',async()=>{
  let release,calls=0;
  const a=api({mode:'cloud',userId:'u'},async()=>{calls++;},{ensureToken:()=>new Promise(r=>{release=r;}),setTimeout:fn=>setTimeout(fn,5)});
  await assert.rejects(a.submitBugReport({id:'id'}),/BUG_SEND_TIMEOUT/);
  release('late-token');await new Promise(r=>setImmediate(r));assert.equal(calls,0);
});
