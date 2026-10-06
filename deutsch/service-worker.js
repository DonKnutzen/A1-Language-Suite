const CACHE="deutsch-a1-live-lesson-review-v22";
const PREFIX="deutsch-a1-live-";
const ASSETS=["./", "./index.html", "./manifest.json", "styles.css?v=lesson-review-22", "../shared/course-updates.css?v=lesson-review-22", "../shared/config.js?v=lesson-review-22", "../shared/profile.js?v=lesson-review-22", "../shared/streak.js?v=lesson-review-22", "../shared/learning.js?v=lesson-review-22", "lesson-content.js?v=lesson-review-22", "../shared/lesson-guide.js?v=lesson-review-22", "../shared/lesson-topic-info.js?v=lesson-review-22", "../shared/grammar-ui.js?v=lesson-review-22", "../shared/exercise-engine.js?v=lesson-review-22", "../shared/pronunciation.js?v=lesson-review-22", "../shared/voice-selection.js?v=lesson-review-22", "../shared/lesson-flow.js?v=lesson-review-22", "../shared/practice-progress.js?v=lesson-review-22", "app.js?v=lesson-review-22"];
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
