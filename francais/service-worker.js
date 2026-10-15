const CACHE="francais-a1-live-pin-approval-v100";
const PREFIX="francais-a1-";
const ASSETS=["../shared/exercise-review.js?v=check-review-97","./deepening-content.js?v=alphabet-trim-92","./deepening.js?v=check-review-97","../shared/bug-reports.js?v=bug-autoclose-98","./en.js?v=report-fixes-90","./i18n.js?v=english-61","../shared/streak.js","./","./index.html","./styles.css?v=alphabet-audio-88","./app.js?v=report-fixes-90","./manifest.json","../shared/config.js","../shared/profile.js?v=pin-approval-100","../shared/learning.js","../shared/practice-progress.js?v=48","../shared/voice-selection.js?v=dialog-44","./course-reset.js?v=lessonsteps-61","./lesson-flow.js?v=check-review-97","../shared/pronunciation.js?v=alphabet-59","../shared/lesson-ui.css?v=lessonsteps-61","../shared/lesson-topic-info.js","../shared/grammar-ui.js?v=french-60","../shared/exercise-engine.js?v=check-review-97","./data.js?v=check-review-97","./mastery-specs.js?v=check-review-97","./mastery.js?v=check-review-97","./lesson1-practice.js?v=check-review-97"];
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

