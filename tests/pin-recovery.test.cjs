const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{webcrypto}=require('node:crypto'),{TextEncoder}=require('node:util'),{JSDOM}=require('jsdom');
const code=fs.readFileSync(path.join(__dirname,'../shared/profile.js'),'utf8');
function env(config={}){const dom=new JSDOM('<header class="topbar"><div class="header-actions"></div></header>',{url:'https://example.org/',runScripts:'outside-only'}),w=dom.window;w.TextEncoder=TextEncoder;Object.defineProperty(w.crypto,'subtle',{value:webcrypto.subtle});w.A1_CONFIG=config;w.eval(code);return {dom,w};}
test('local PIN reset ignores username case, preserves progress and never creates an unknown profile',async()=>{
 const {dom,w}=env(),hash=async s=>Buffer.from(await webcrypto.subtle.digest('SHA-256',new TextEncoder().encode(s))).toString('hex'),key=(await hash('sabine')).slice(0,20);
 w.localStorage.setItem('a1suite.localProfiles',JSON.stringify({[key]:{username:'Sabine',pinHash:'old'}}));w.localStorage.setItem('course-progress','preserve');
 assert(await w.A1Profile.recoveryExists(' SABINE '));await assert.rejects(w.A1Profile.resetProfilePin('sAbInE','5678'),/cloud|Cloud/);
 assert.equal(JSON.parse(w.localStorage.getItem('a1suite.localProfiles'))[key].pinHash,'old');assert.equal(w.localStorage.getItem('course-progress'),'preserve');
 await assert.rejects(w.A1Profile.resetProfilePin('unknown','5678'));await assert.rejects(w.A1Profile.resetProfilePin('Sabine','123'));
 dom.window.close();
});
test('cloud reset sends only pseudo-email and new PIN to the dedicated RPC',async()=>{
 const {dom,w}=env({supabaseUrl:'https://db.example',supabaseAnonKey:'public-key'}),calls=[];
 w.fetch=async(url,opts)=>{calls.push({url,body:JSON.parse(opts.body)});return {ok:true,json:async()=>true}};
 assert(await w.A1Profile.recoveryExists('SABINE'));await w.A1Profile.resetProfilePin('sabine','123456');
 assert.equal(calls[0].body.p_email,calls[1].body.p_email);assert(calls[0].url.endsWith('/rpc/a1_pin_profile_exists'));assert(calls[1].url.endsWith('/rpc/a1_request_pin_reset'));assert.equal(calls[1].body.p_pin,'123456');
 w.fetch=async()=>({ok:false,status:404});await assert.rejects(w.A1Profile.recoveryExists('sabine'),/freigeschaltet|available/);dom.window.close();
});
test('forgot PIN form asks for username before revealing the new PIN field',async()=>{
 const {dom,w}=env();await new Promise(resolve=>w.addEventListener('load',resolve));w.document.querySelectorAll('.profile-overlay').forEach(el=>el.remove());w.A1Profile.open();w.document.getElementById('tabLogin').click();w.document.getElementById('profileForgot').click();
 assert(w.document.getElementById('profilePin').closest('.profile-field').hidden);assert(w.document.getElementById('profileName'));
 const hash=Buffer.from(await webcrypto.subtle.digest('SHA-256',new TextEncoder().encode('sabine'))).toString('hex').slice(0,20);
 w.localStorage.setItem('a1suite.localProfiles',JSON.stringify({[hash]:{username:'Sabine',pinHash:'old'}}));w.document.getElementById('profileName').value='SABINE';await w.document.getElementById('profileSubmit').onclick();
 assert.equal(w.document.getElementById('profileError').textContent,'');assert(!w.document.getElementById('profilePin').closest('.profile-field').hidden);assert(w.document.getElementById('profileName').readOnly);assert(w.document.getElementById('profileSubmit').textContent.toUpperCase().includes('PIN'));dom.window.close();
});

test('database migration blocks the legacy direct endpoint and enforces authenticated admin review',()=>{
 const sql=fs.readFileSync(path.join(__dirname,'../shared/pin-recovery.sql'),'utf8');
 assert(sql.includes("raise exception 'ADMIN_APPROVAL_REQUIRED'"));assert(sql.includes('revoke all on function public.a1_reset_profile_pin(text,text) from public,anon,authenticated'));
 assert(sql.includes('user_id=auth.uid()'));assert(sql.includes("raise exception 'ADMIN_REQUIRED'"));assert(sql.includes("r.status<>'pending'"));assert(sql.includes("interval '24 hours'"));assert(sql.includes("pin_hash=''"));
 const request=sql.slice(sql.indexOf('create or replace function public.a1_request_pin_reset'),sql.indexOf('create or replace function public.a1_pending_pin_resets'));
 assert(!request.includes('update auth.users'));assert(request.includes('extensions.crypt'));assert(sql.includes('revoke all on public.pin_reset_requests from anon,authenticated'));
});
