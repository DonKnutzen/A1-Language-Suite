const CACHE='griechisch-a1-v2';
const ASSETS=["../shared/course-home.css?v=home-112","../shared/lesson-ui.css?v=audio-pages-172","../shared/learning-oak.css?v=oak-compact-115","../shared/learning-oak.js?v=oak-compact-115",'./','./index.html','./data.js?v=2','./transfer.js?v=2','./course.js?v=2','./app.js?v=2','./styles.css?v=2','./manifest.json','./LEHRPLAN-A1.md','../francais/styles.css?v=audio-switch-176','../shared/config.js','../shared/profile.js?v=greek-251','../shared/learning.js','../shared/text-size.js?v=text-size-103','../shared/streak.js?v=streak-visible-111','../shared/voice-selection.js?v=greek-251','../shared/icons/language.svg','../shared/icons/language-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('griechisch-a1-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
  // Only cache the explicit course shell; never store profile or API traffic.
  if(!ASSETS.some(p=>new URL(p,self.location.href).href===e.request.url))return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(e.request,copy)));}return r;}).catch(()=>caches.match(e.request)));
});
