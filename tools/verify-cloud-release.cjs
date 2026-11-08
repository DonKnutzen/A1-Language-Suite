// Verify that GitHub Pages serves exactly the checked-in repair, bypassing caches.
const fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto');
const root=path.join(__dirname,'..'),base='https://donknutzen.github.io/A1-Language-Suite/';
const hash=s=>createHash('sha256').update(s.replace(/\r\n/g,'\n')).digest('hex');
const courses=['deutsch','francais','francais-a2','englisch','spanisch','turkisch-deutsch'];
(async()=>{
 let passed=true;
 for(const file of ['shared/profile.js','index.html',...courses.flatMap(c=>[`${c}/app.js`,`${c}/index.html`,`${c}/service-worker.js`])]){
  try{
   const r=await fetch(`${base}${file}?verify=${Date.now()}`,{cache:'no-store',signal:AbortSignal.timeout(15000)});
   const matches=r.ok&&hash(await r.text())===hash(fs.readFileSync(path.join(root,file),'utf8'));
   console.log(JSON.stringify({file,status:r.status,matches}));if(!matches)passed=false;
  }catch(error){passed=false;console.log(JSON.stringify({file,error:error.cause?.code||error.message}));}
 }
 console.log(JSON.stringify({releaseVerified:passed}));process.exitCode=passed?0:1;
})();
