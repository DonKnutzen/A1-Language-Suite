const CACHE="deutsch-a1-live-vocabulary-v138";
const PREFIX="deutsch-a1-live-";
const ASSETS=["../shared/vocabulary-content.js?v=vocab-138","../shared/vocabulary-trainer.js?v=vocab-138","../shared/vocabulary-trainer.css?v=vocab-138","./hard-mode.css?v=parity-137","./review-practice.css?v=parity-137","./hard-mode-content.js?v=parity-137","./hard-mode.js?v=parity-137","./review-practice.js?v=parity-137","./listening-audio.js?v=parity-137","./listening-player.js?v=parity-137","./pronouns.js?v=german-layout-121","./answer-audio.js?v=reports-129","../shared/learning-oak.js?v=oak-compact-115","../shared/learning-oak.css?v=oak-compact-115","../shared/course-home.css?v=home-112","./comprehension-content.js?v=parity-137","../shared/comprehension.js?v=german-audio-119","../shared/comprehension.css?v=inviting-checks-116","../shared/text-size.js?v=text-size-103","./deepening-content.js?v=german-layout-121","./applications.js?v=reports-129","./study.js?v=parity-137","../shared/exercise-review.js?v=german-audio-119","../shared/bug-reports.js?v=dialogue-choices-108","./", "./index.html", "./manifest.json", "./styles.css?v=german-layout-121", "../shared/lesson-ui.css?v=inviting-checks-116", "../shared/config.js", "../shared/profile.js?v=text-size-103", "../shared/streak.js?v=streak-visible-111", "../shared/learning.js", "../shared/practice-progress.js?v=48", "./lesson-content.js", "../shared/lesson-guide.js", "../shared/lesson-topic-info.js", "../shared/grammar-ui.js?v=french-60", "../shared/exercise-engine.js?v=german-layout-121", "../shared/pronunciation.js?v=alphabet-59", "../shared/voice-selection.js?v=resume-109", "./grammar-drills.js?v=parity-137","./assessments.js?v=parity-137", "./pronunciation.js?v=german-depth-102", "./lesson-flow.js?v=vocab-138", "./app.js?v=vocab-138", "./course-reset.js?v=german-depth-102"];
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

