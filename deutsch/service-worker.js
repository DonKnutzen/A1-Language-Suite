const CACHE="deutsch-a1-live-checks-v116";
const PREFIX="deutsch-a1-live-";
const ASSETS=["../shared/learning-oak.js?v=oak-compact-115","../shared/learning-oak.css?v=oak-compact-115","../shared/course-home.css?v=home-112","./comprehension-content.js?v=dialogue-106","../shared/comprehension.js?v=inviting-checks-116","../shared/comprehension.css?v=inviting-checks-116","../shared/text-size.js?v=text-size-103","./deepening-content.js?v=german-depth-102","./applications.js?v=german-depth-102","./study.js?v=intro-choice-104","../shared/exercise-review.js?v=lesson-feedback-113","../shared/bug-reports.js?v=dialogue-choices-108","./", "./index.html", "./manifest.json", "./styles.css?v=home-112", "../shared/lesson-ui.css?v=inviting-checks-116", "../shared/config.js", "../shared/profile.js?v=text-size-103", "../shared/streak.js?v=streak-visible-111", "../shared/learning.js", "../shared/practice-progress.js?v=48", "./lesson-content.js", "../shared/lesson-guide.js", "../shared/lesson-topic-info.js", "../shared/grammar-ui.js?v=french-60", "../shared/exercise-engine.js?v=lesson-feedback-113", "../shared/pronunciation.js?v=alphabet-59", "../shared/voice-selection.js?v=resume-109", "./grammar-drills.js?v=german-depth-102","./assessments.js?v=oak-buttons-114", "./pronunciation.js?v=german-depth-102", "./lesson-flow.js?v=inviting-checks-116", "./app.js?v=oak-compact-115", "./course-reset.js?v=german-depth-102"];
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

