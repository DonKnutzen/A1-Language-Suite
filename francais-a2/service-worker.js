const CACHE="francais-a2-v35";
const PREFIX="francais-a2-";
const ASSETS=["../shared/guide-language.js?v=lesson-guide-254","../shared/lesson-audio-guide.js?v=lesson-guide-254","../francais/guided-audio.js?v=lesson-guide-254","../shared/lesson-audio-guide.css?v=lesson-guide-254","./","./index.html","./manifest.json","./review-practice.css?v=a2-22","./hard-mode.css?v=a2-22","../shared/quiz-show.css?v=entry-213","./lesson-challenge.css?v=a2-22","./hard-mode-games.css?v=a2-22","./sentence-writing.css?v=a2-22","../shared/game-hard-mode.css?v=gap-pages-245","../shared/course-home.css?v=home-112","../shared/lesson-ui.css?v=audio-pages-172","../shared/comprehension.css?v=inviting-checks-116","../shared/learning-oak.css?v=oak-compact-115","../shared/vocabulary-trainer.css?v=vocabulary-pairs-160","../shared/daily-review.css?v=daily-165","../shared/writing-exam.css?v=writing-exam-1","../shared/review-audio.css?v=review-audio-141","../shared/hard-mode-achievement.css?v=flaggen-244","../shared/answer-explain.css?v=explain-218","../shared/config.js","../shared/text-size.js?v=text-size-103","../shared/profile.js?v=cloud-sync-250","../shared/learning-oak.js?v=oak-compact-115","../shared/streak.js?v=streak-visible-111","../shared/learning.js","../shared/answer-feedback.js?v=answer-autoplay-179","../shared/practice-progress.js?v=48","./data.js?v=a2-22","./mastery-specs.js?v=a2-22","./mastery.js?v=a2-22","../shared/lesson-topic-info.js","../shared/grammar-ui.js?v=a2-course-176","../shared/exercise-review.js?v=answer-autoplay-179","./intro-listening.js?v=a2-22","./answer-audio.js?v=a2-22","../shared/exercise-engine.js?v=answer-autoplay-179","../shared/pronunciation.js?v=spell-225","../shared/voice-selection.js?v=android-fallback-248","../shared/dialogue-voices.js?v=dialogue-166","./listening-audio.js?v=android-fallback-248","./deepening-content.js?v=a2-22","./grammar-practice.js?v=a2-22","./deepening.js?v=a2-22","./comprehension-content.js?v=a2-22","../shared/comprehension.js?v=inviting-checks-116","./listening-player.js?v=a2-22","./hard-mode-content.js?v=a2-22","./lesson-challenge.js?v=noten-241","../shared/quiz-show.js?v=quiz-classes-221","./hard-mode-arcade.js?v=a2-22","./hard-mode-pilot.js?v=gap-pages-245","../shared/game-hard-mode.js?v=gap-pages-245","./hard-mode.js?v=noten-241","./sentence-writing-content.js?v=a2-22","./sentence-writing.js?v=a2-22","../shared/lesson-vocabulary-plan.js?v=didactic-161","../shared/lesson-foundations.js?v=noten-241","./lesson-flow.js?v=lesson-guide-254","./en.js?v=a2-22","./i18n.js?v=a2-22","../shared/daily-review.js?v=daily-165","../shared/writing-exam.js?v=writing-exam-1","../shared/review-audio.js?v=review-audio-141","./review-practice.js?v=noten-241","../shared/lesson-lexicon.js?v=didactic-161","../shared/vocabulary-content.js?v=a2-course-154","./foundations.js?v=a2-22","./course-scope.js?v=a2-22","../shared/vocabulary-trainer.js?v=a2-course-162","./telc-exam.js?v=a2-22","./app.js?v=cloud-sync-249","./course-reset.js?v=a2-22","../shared/answer-explain.js?v=explain-219","../shared/explain-fr.js?v=explain-219","../shared/bug-reports.js?v=reports-239"];
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
