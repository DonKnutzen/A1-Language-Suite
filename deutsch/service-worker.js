const CACHE="deutsch-a1-live-practice-v67";
const PREFIX="deutsch-a1-live-";
const ASSETS=["./", "./index.html", "./manifest.json", "./styles.css?v=lessonsteps-63", "../shared/lesson-ui.css?v=lessonsteps-61", "../shared/config.js", "../shared/profile.js?v=leaderboard-65", "../shared/streak.js", "../shared/learning.js", "../shared/practice-progress.js?v=48", "./lesson-content.js", "../shared/lesson-guide.js", "../shared/lesson-topic-info.js", "../shared/grammar-ui.js?v=french-60", "../shared/exercise-engine.js?v=practice-67", "../shared/pronunciation.js?v=alphabet-59", "../shared/voice-selection.js?v=dialog-44", "./assessments.js?v=practice-67", "./pronunciation.js?v=lessonsteps-63", "./lesson-flow.js?v=completion-66", "./app.js?v=practice-67", "./course-reset.js?v=lessonsteps-63"];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(event.request, {cache:'no-store'});
      if (response.ok) {
        event.waitUntil(cache.put(event.request, response.clone()).catch(() => {}));
        return response;
      }
      return await cache.match(event.request) || response;
    } catch {
      return await cache.match(event.request) || Response.error();
    }
  })());
});

