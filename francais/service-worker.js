const CACHE="francais-a1-home-v107";
const PREFIX="francais-a1-";
const ASSETS=["./comprehension-content.js?v=dialogue-106","../shared/comprehension.js?v=dialogue-106","../shared/comprehension.css?v=dialogue-106","./intro-listening.js?v=intro-choice-104","../shared/text-size.js?v=text-size-103","../shared/exercise-review.js?v=reports-101","./deepening-content.js?v=reports-101","./deepening.js?v=reports-101","../shared/bug-reports.js?v=dialogue-context-106","./en.js?v=home-107","./i18n.js?v=dialogue-106","../shared/streak.js","./","./index.html","./styles.css?v=home-107","./app.js?v=home-107","./manifest.json","../shared/config.js","../shared/profile.js?v=text-size-103","../shared/learning.js","../shared/practice-progress.js?v=48","../shared/voice-selection.js?v=dialogue-106","./course-reset.js?v=lessonsteps-61","./lesson-flow.js?v=dialogue-106","../shared/pronunciation.js?v=alphabet-59","../shared/lesson-ui.css?v=lessonsteps-61","../shared/lesson-topic-info.js","../shared/grammar-ui.js?v=french-60","../shared/exercise-engine.js?v=intro-next-105","./data.js?v=reports-101","./mastery-specs.js?v=reports-101","./mastery.js?v=dialogue-106","./lesson1-practice.js?v=reports-101"];
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

