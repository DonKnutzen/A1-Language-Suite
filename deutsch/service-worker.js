const CACHE="deutsch-a1-live-vocabulary-pairs-v160";
const PREFIX="deutsch-a1-live-";
const ASSETS=["../shared/lesson-vocabulary-plan.js?v=teaching-placement-157","../shared/lesson-lexicon.js?v=lexical-153","../shared/lesson-foundations.js?v=vocabulary-pairs-160","./question-content.js?v=teaching-placement-157","../shared/dialogue-voices.js?v=reports-144","../shared/hard-mode-achievement.css?v=hard-gold-142","../shared/review-audio.js?v=review-audio-141","../shared/review-audio.css?v=review-audio-141","../shared/daily-review.js?v=daily-140","../shared/daily-review.css?v=daily-140","../shared/vocabulary-content.js?v=vocab-decks-150","../shared/vocabulary-trainer.js?v=vocabulary-pairs-160","../shared/vocabulary-trainer.css?v=vocabulary-pairs-160","./hard-mode.css?v=parity-137","./review-practice.css?v=mistake-history-155","./hard-mode-content.js?v=prerequisites-151","./hard-mode.js?v=teaching-placement-157","./review-practice.js?v=teaching-placement-157","./listening-audio.js?v=reports-144","./listening-player.js?v=parity-137","./pronouns.js?v=german-layout-121","./answer-audio.js?v=reports-129","../shared/learning-oak.js?v=oak-compact-115","../shared/learning-oak.css?v=oak-compact-115","../shared/course-home.css?v=home-112","./comprehension-content.js?v=parity-137","../shared/comprehension.js?v=german-audio-119","../shared/comprehension.css?v=inviting-checks-116","../shared/text-size.js?v=text-size-103","./deepening-content.js?v=german-layout-121","./applications.js?v=reports-129","./study.js?v=teaching-placement-157","../shared/exercise-review.js?v=answer-audio-143","../shared/bug-reports.js?v=reports-145","./", "./index.html", "./manifest.json", "./styles.css?v=ios-safe-area-156", "../shared/lesson-ui.css?v=vocabulary-audio-158", "../shared/config.js", "../shared/profile.js?v=text-size-103", "../shared/streak.js?v=streak-visible-111", "../shared/learning.js", "../shared/practice-progress.js?v=48", "./lesson-content.js", "../shared/lesson-guide.js", "../shared/lesson-topic-info.js", "../shared/grammar-ui.js?v=french-60", "../shared/exercise-engine.js?v=german-quality-149", "../shared/pronunciation.js?v=alphabet-59", "../shared/voice-selection.js?v=resume-109", "./grammar-drills.js?v=teaching-placement-157","./assessments.js?v=teaching-placement-157", "./pronunciation.js?v=german-depth-102", "./lesson-flow.js?v=teaching-placement-157", "./app.js?v=german-quality-149", "./course-reset.js?v=german-depth-102"];
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
