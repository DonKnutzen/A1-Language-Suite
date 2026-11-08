// Read-only diagnostics. Does not sign in, create accounts, or change progress.
const fs=require('node:fs'),vm=require('node:vm'),{createHash}=require('node:crypto');
const context={window:{}};vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'../shared/config.js'),'utf8'),context);
const cfg=context.window.A1_CONFIG;
async function check(label,url,options={}){
 try{const r=await fetch(url,{...options,signal:AbortSignal.timeout(15000)}),body=await r.text();
  console.log(JSON.stringify({check:label,status:r.status,...(label.startsWith('profile:')?{exists:body==='true'?true:body==='false'?false:'unavailable'}:{})}));
 }catch(error){console.log(JSON.stringify({check:label,error:error.cause?.code||error.message}));process.exitCode=1;}
}
(async()=>{
 await check('app','https://donknutzen.github.io/A1-Language-Suite/');
 await check('auth-settings',`${cfg.supabaseUrl}/auth/v1/settings`,{headers:{apikey:cfg.supabaseAnonKey}});
 for(const name of ['daniel','daniel2']){
  const hash=createHash('sha256').update(name).digest('hex').slice(0,32);
  await check(`profile:${name}`,`${cfg.supabaseUrl}/rest/v1/rpc/a1_pin_profile_exists`,{method:'POST',
   headers:{apikey:cfg.supabaseAnonKey,'Content-Type':'application/json'},body:JSON.stringify({p_email:`u_${hash}@profiles.a1trainer.app`})});
 }
})();
