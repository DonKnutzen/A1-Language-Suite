const CACHE='griechisch-a1-v4';
const ASSETS=["./", "./index.html", "./manifest.json", "./LEHRPLAN-A1.md", "../shared/icons/language.svg", "../shared/icons/language-180.png", "../francais/styles.css?v=audio-switch-176", "../shared/course-home.css?v=home-112", "../shared/lesson-ui.css?v=audio-pages-172", "../shared/learning-oak.css?v=oak-compact-115", "../francais/hard-mode.css?v=greek-flow-4", "../francais/lesson-challenge.css?v=greek-flow-4", "../francais/hard-mode-games.css?v=greek-flow-4", "../shared/game-hard-mode.css?v=greek-flow-4", "../shared/quiz-show.css?v=greek-flow-4", "../shared/lesson-audio-guide.css?v=greek-flow-4", "./styles.css?v=4", "../shared/config.js", "../shared/text-size.js?v=text-size-103", "../shared/profile.js?v=greek-251", "../shared/learning-oak.js?v=oak-compact-115", "../shared/learning.js", "../shared/streak.js?v=streak-visible-111", "../shared/voice-selection.js?v=greek-251", "./data.js?v=2", "./transfer.js?v=2", "./course.js?v=4", "../shared/guide-language.js?v=greek-flow-4", "../shared/guide-follow.js?v=greek-flow-4", "../shared/lesson-audio-guide.js?v=greek-flow-4", "../shared/quiz-show.js?v=greek-flow-4", "../francais/hard-mode-arcade.js?v=greek-flow-4", "../shared/game-hard-mode.js?v=greek-flow-4", "./games.js?v=greek-flow-4", "./lesson-flow.js?v=greek-flow-4", "./app.js?v=4"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('griechisch-a1-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
  // Only cache the explicit course shell; never store profile or API traffic.
  if(!ASSETS.some(p=>new URL(p,self.location.href).href===e.request.url))return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(e.request,copy)));}return r;}).catch(()=>caches.match(e.request)));
});

