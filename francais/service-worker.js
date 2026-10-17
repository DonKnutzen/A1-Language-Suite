const CACHE="francais-a1-live-reports-v103";
const PREFIX="francais-a1-";
const ASSETS=["../shared/text-size.js?v=text-size-103","../shared/exercise-review.js?v=reports-101","./deepening-content.js?v=reports-101","./deepening.js?v=reports-101","../shared/bug-reports.js?v=bug-autoclose-98","./en.js?v=report-fixes-90","./i18n.js?v=english-61","../shared/streak.js","./","./index.html","./styles.css?v=alphabet-audio-88","./app.js?v=report-fixes-90","./manifest.json","../shared/config.js","../shared/profile.js?v=text-size-103","../shared/learning.js","../shared/practice-progress.js?v=48","../shared/voice-selection.js?v=dialog-44","./course-reset.js?v=lessonsteps-61","./lesson-flow.js?v=reports-101","../shared/pronunciation.js?v=alphabet-59","../shared/lesson-ui.css?v=lessonsteps-61","../shared/lesson-topic-info.js","../shared/grammar-ui.js?v=french-60","../shared/exercise-engine.js?v=reports-101","./data.js?v=reports-101","./mastery-specs.js?v=reports-101","./mastery.js?v=reports-101","./lesson1-practice.js?v=reports-101"];
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

