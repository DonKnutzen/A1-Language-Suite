const CACHE="francais-a1-lessonflow-v49";
const PREFIX="francais-a1-";
const ASSETS=["../shared/streak.js","./","./index.html","./styles.css?v=lessonflow-49","./app.js?v=lessonflow-49","./manifest.json","../shared/config.js","../shared/profile.js","../shared/learning.js","../shared/practice-progress.js?v=48","../shared/voice-selection.js?v=dialog-45","./lesson-flow.js?v=lessonflow-49","../shared/pronunciation.js?v=dialog-45","../shared/lesson-ui.css?v=lessonflow-49","../shared/lesson-topic-info.js","../shared/grammar-ui.js?v=dialog-45","../shared/exercise-engine.js?v=dialog-45","./data.js?v=lessonflow-49","./mastery-specs.js?v=lessonflow-49","./mastery.js?v=lessonflow-49","./lesson1-practice.js?v=lessonflow-49"];
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
