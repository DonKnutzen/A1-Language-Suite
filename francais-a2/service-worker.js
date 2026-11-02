const CACHE="francais-a2-v12";
const PREFIX="francais-a2-";
const ASSETS=["./","./index.html","./manifest.json","./review-practice.css?v=a2-14","./hard-mode.css?v=a2-14","../shared/quiz-show.css?v=entry-213","./lesson-challenge.css?v=a2-14","./hard-mode-games.css?v=a2-14","../shared/game-hard-mode.css?v=games-218","../shared/course-home.css?v=home-112","../shared/lesson-ui.css?v=audio-pages-172","../shared/comprehension.css?v=inviting-checks-116","../shared/learning-oak.css?v=oak-compact-115","../shared/vocabulary-trainer.css?v=vocabulary-pairs-160","../shared/daily-review.css?v=daily-165","../shared/review-audio.css?v=review-audio-141","../shared/hard-mode-achievement.css?v=hard-gold-142","../shared/answer-explain.css?v=explain-218","../shared/config.js","../shared/text-size.js?v=text-size-103","../shared/profile.js?v=a2-german-173","../shared/learning-oak.js?v=oak-compact-115","../shared/streak.js?v=streak-visible-111","../shared/learning.js","../shared/answer-feedback.js?v=answer-autoplay-179","../shared/practice-progress.js?v=48","./data.js?v=a2-14","./mastery-specs.js?v=a2-14","./mastery.js?v=a2-14","../shared/lesson-topic-info.js","../shared/grammar-ui.js?v=a2-course-176","../shared/exercise-review.js?v=answer-autoplay-179","./intro-listening.js?v=a2-14","./answer-audio.js?v=a2-14","../shared/exercise-engine.js?v=answer-autoplay-179","../shared/pronunciation.js?v=alphabet-59","../shared/voice-selection.js?v=resume-109","../shared/dialogue-voices.js?v=dialogue-166","./listening-audio.js?v=a2-14","./deepening-content.js?v=a2-14","./grammar-practice.js?v=a2-14","./deepening.js?v=a2-14","./comprehension-content.js?v=a2-14","../shared/comprehension.js?v=inviting-checks-116","./listening-player.js?v=a2-14","./hard-mode-content.js?v=a2-14","./lesson-challenge.js?v=a2-14","../shared/quiz-show.js?v=explain-218","./hard-mode-arcade.js?v=a2-14","./hard-mode-pilot.js?v=a2-14","../shared/game-hard-mode.js?v=a2-course-219","./hard-mode.js?v=a2-14","../shared/lesson-vocabulary-plan.js?v=didactic-161","../shared/lesson-foundations.js?v=course-context-175","./lesson-flow.js?v=a2-14","./en.js?v=a2-14","./i18n.js?v=a2-14","../shared/daily-review.js?v=daily-165","../shared/review-audio.js?v=review-audio-141","./review-practice.js?v=a2-14","../shared/lesson-lexicon.js?v=didactic-161","../shared/vocabulary-content.js?v=a2-course-154","./foundations.js?v=a2-14","./course-scope.js?v=a2-14","../shared/vocabulary-trainer.js?v=a2-course-162","./telc-exam.js?v=a2-14","./app.js?v=a2-14","./course-reset.js?v=a2-14","../shared/answer-explain.js?v=explain-219","../shared/explain-fr.js?v=explain-219","../shared/bug-reports.js?v=a2-course-146"];
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
