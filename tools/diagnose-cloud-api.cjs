// Validate API schema with zero-row reads; never read private progress.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../shared/config.js'),'utf8'),c);
const cfg=c.window.A1_CONFIG;
(async()=>{
 for(const query of ['course_progress?select=progress_data,percent,updated_at&limit=0','course_progress?select=*&limit=0',
  'leaderboard_entries?select=user_id,course,percent,updated_at&limit=0','profiles?select=id,username&limit=0']){
  try{const r=await fetch(`${cfg.supabaseUrl}/rest/v1/${query}`,{headers:{apikey:cfg.supabaseAnonKey},signal:AbortSignal.timeout(15000)});
   console.log(JSON.stringify({query,status:r.status,body:(await r.text()).slice(0,1200)}));
  }catch(error){console.log(JSON.stringify({query,error:error.cause?.code||error.message}));process.exitCode=1;}
 }
})();
