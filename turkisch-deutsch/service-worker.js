const CACHE='deutsch-c1-tr-v14-compact-progress';
const LEGACY_PREFIXES=['deutsch-a1-tr','deutsch-c1-tr'];
const ASSETS=[
  './','./index.html','./styles.css','./app.js','./lesson-content.js','./manifest.json',
  '../shared/config.js','../shared/profile.js','../shared/streak.js','../shared/learning.js','../shared/voice-selection.js'
];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>LEGACY_PREFIXES.some(p=>k.startsWith(p))&&k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(caches.open(CACHE).then(cache=>cache.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    if(response && response.ok && new URL(event.request.url).origin===self.location.origin) cache.put(event.request,response.clone());
    return response;
  }))));
});
