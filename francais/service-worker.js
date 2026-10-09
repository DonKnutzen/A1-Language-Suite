const CACHE="francais-a1-lessonsteps-v59";
const PREFIX="francais-a1-";
const ASSETS=["../shared/streak.js","./","./index.html","./styles.css?v=lessonsteps-59","./app.js?v=lessonsteps-59","./manifest.json","../shared/config.js","../shared/profile.js?v=course-reset-57","../shared/learning.js","../shared/practice-progress.js?v=48","../shared/voice-selection.js?v=dialog-44","./course-reset.js?v=lessonsteps-59","./lesson-flow.js?v=lessonsteps-59","../shared/pronunciation.js?v=alphabet-59","../shared/lesson-ui.css?v=lessonsteps-59","../shared/lesson-topic-info.js","../shared/grammar-ui.js?v=dialog-44","../shared/exercise-engine.js?v=dialog-44","./data.js?v=lessonsteps-59","./mastery-specs.js?v=lessonsteps-59","./mastery.js?v=lessonsteps-59","./lesson1-practice.js?v=lessonsteps-59"];
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

