const CACHE="spanisch-a1-es-practice-266";
const PREFIX="spanisch-a1-";
const ASSETS=["../shared/answer-feedback.js?v=answer-autoplay-179","../shared/streak.js","./lesson-content.js?v=es-review-263","../shared/lesson-guide.js","./","./index.html","./styles.css?v=es-practice-266","./app.js?v=es-practice-266","./deepening-content.js?v=es-practice-266","./check-content.js?v=es-practice-266","./lesson-practice.js?v=es-practice-266","./manifest.json","../shared/config.js","../shared/profile.js?v=quiet-sync-259","../shared/learning.js","../shared/voice-selection.js?v=android-audio-262","../shared/lesson-flow.js?v=es-practice-266","../shared/pronunciation.js?v=es-review-265","../shared/lesson-ui.css?v=dialog-45","../shared/lesson-topic-info.js","../shared/grammar-ui.js?v=dialog-45","../shared/exercise-engine.js?v=answer-autoplay-179","./data.js?v=es-review-263"];
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

