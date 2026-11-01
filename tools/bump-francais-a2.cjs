/* Raises the version tag of every local francais-a2 asset and the offline cache name. */
const fs=require('fs'),path=require('path'),dir=path.join(__dirname,'..','francais-a2');
const page=path.join(dir,'index.html'),sw=path.join(dir,'service-worker.js');
let html=fs.readFileSync(page,'utf8');const next=Math.max(...[...html.matchAll(/\?v=a2-(\d+)"/g)].map(m=>Number(m[1])))+1;
html=html.replace(/((?:src|href)="(?!\.\.\/)[a-z0-9-]+\.(?:js|css))\?v=a2-\d+"/g,`$1?v=a2-${next}"`);
for(const [file,tag] of (process.argv[2]||'').split(',').filter(Boolean).map(x=>x.split('=')))html=html.split(`../shared/${file}?v=`).map((part,i)=>i?part.replace(/^[^"]+"/,`${tag}"`):part).join(`../shared/${file}?v=`);
fs.writeFileSync(page,html);
const s=fs.readFileSync(sw,'utf8').replace(/const CACHE="francais-a2-v(\d+)";/,(m,n)=>`const CACHE="francais-a2-v${Number(n)+1}";`);
fs.writeFileSync(sw,s);console.log('assets a2-'+next,s.match(/const CACHE="[^"]+"/)[0]);
