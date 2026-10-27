const CACHE="francais-a1-live-course-ux-v172";
const PREFIX="francais-a1-";
const ASSETS=["../shared/lesson-vocabulary-plan.js?v=didactic-161","../shared/lesson-lexicon.js?v=didactic-161","../shared/lesson-foundations.js?v=supplement-167","../shared/dialogue-voices.js?v=dialogue-166","./answer-audio.js?v=answer-audio-143","../shared/hard-mode-achievement.css?v=hard-gold-142","../shared/review-audio.js?v=review-audio-141","../shared/review-audio.css?v=review-audio-141","../shared/daily-review.js?v=daily-165","../shared/daily-review.css?v=daily-165","../shared/vocabulary-content.js?v=vocab-decks-150","../shared/vocabulary-trainer.js?v=didactic-161","../shared/vocabulary-trainer.css?v=vocabulary-pairs-160","./review-practice.js?v=mistake-history-155","./review-practice.css?v=mistake-history-155","./grammar-practice.js?v=reports-148","./listening-audio.js?v=reports-144","./listening-player.js?v=audio-128","./hard-mode.css?v=buttons-132","./hard-mode-content.js?v=listening-130","./hard-mode.js?v=teaching-placement-157","../shared/learning-oak.js?v=oak-compact-115","../shared/learning-oak.css?v=oak-compact-115","../shared/course-home.css?v=home-112","./comprehension-content.js?v=dialogue-166","../shared/comprehension.js?v=inviting-checks-116","../shared/comprehension.css?v=inviting-checks-116","./intro-listening.js?v=intro-choice-104","../shared/text-size.js?v=text-size-103","../shared/exercise-review.js?v=course-ux-172","./deepening-content.js?v=foundations-clarity-152","./deepening.js?v=didactic-161","../shared/bug-reports.js?v=reports-145","./en.js?v=didactic-161","./i18n.js?v=dialogue-106","../shared/streak.js?v=streak-visible-111","./","./index.html","./styles.css?v=course-ux-172","./app.js?v=course-ux-172","./manifest.json","../shared/config.js","../shared/profile.js?v=settings-final-171","../shared/learning.js","../shared/practice-progress.js?v=48","../shared/voice-selection.js?v=resume-109","./course-reset.js?v=lessonsteps-61","./lesson-flow.js?v=course-ux-172","../shared/pronunciation.js?v=alphabet-59","../shared/lesson-ui.css?v=vocabulary-audio-158","../shared/lesson-topic-info.js","../shared/grammar-ui.js?v=french-60","../shared/exercise-engine.js?v=course-ux-172","./data.js?v=grammar-quality-146","./mastery-specs.js?v=reports-148","./mastery.js?v=reports-148","./lesson1-practice.js?v=answer-audio-143"];
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
