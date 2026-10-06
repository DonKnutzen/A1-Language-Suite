const CACHE="spanisch-a1-flow-v20";
const PREFIX="spanisch-a1-";
const ASSETS=["../shared/streak.js","./lesson-content.js","../shared/lesson-guide.js","./","./index.html","./styles.css?v=flow-20","./app.js?v=flow-20","./manifest.json","../shared/config.js","../shared/profile.js","../shared/learning.js","../shared/voice-selection.js?v=flow-20","../shared/lesson-flow.js?v=flow-20","../shared/pronunciation.js?v=flow-20","../shared/course-updates.css?v=flow-20","../shared/lesson-topic-info.js","../shared/grammar-ui.js","../shared/exercise-engine.js?v=flow-20","./data.js"];
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
