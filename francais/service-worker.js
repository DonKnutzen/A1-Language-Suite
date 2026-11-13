const CACHE="francais-a1-guide-menu-v260";
const PREFIX="francais-a1-";
const ASSETS=["../shared/guide-follow.js?v=guide-words-259","../shared/radio-recordings.js?v=radio-258","../shared/radio-audio.js?v=radio-258","../shared/guide-language.js?v=guide-words-259","../shared/lesson-audio-guide.js?v=guide-menu-260","./guided-audio.js?v=guide-words-259","../shared/lesson-audio-guide.css?v=guide-menu-260","../shared/game-hard-mode.js?v=gap-pages-245","../shared/game-hard-mode.css?v=gap-pages-245","../shared/answer-explain.js?v=explain-219","../shared/answer-explain.css?v=explain-218","../shared/explain-fr.js?v=explain-219","../shared/quiz-show.js?v=quiz-classes-221","../shared/quiz-show.css?v=entry-213","./hard-mode-arcade.js?v=arcade-232","./hard-mode-pilot.js?v=gap-pages-245","./hard-mode-games.css?v=arcade-232","./lesson-challenge.js?v=noten-241","./lesson-challenge.css?v=compact-hardmode-191","../shared/answer-feedback.js?v=answer-autoplay-179","../shared/lesson-vocabulary-plan.js?v=didactic-161","../shared/lesson-lexicon.js?v=didactic-161","../shared/lesson-foundations.js?v=noten-241","../shared/dialogue-voices.js?v=dialogue-166","./answer-audio.js?v=answer-audio-143","../shared/hard-mode-achievement.css?v=flaggen-244","../shared/review-audio.js?v=review-audio-141","../shared/review-audio.css?v=review-audio-141","../shared/daily-review.js?v=daily-165","../shared/daily-review.css?v=daily-165","../shared/writing-exam.js?v=writing-exam-1","../shared/writing-exam.css?v=writing-exam-1","../shared/vocabulary-content.js?v=vocab-decks-150","../shared/vocabulary-trainer.js?v=didactic-161","../shared/vocabulary-trainer.css?v=vocabulary-pairs-160","./review-practice.js?v=noten-241","./review-practice.css?v=mistake-history-155","./grammar-practice.js?v=quality-222","./listening-audio.js?v=reports-144","./listening-player.js?v=audio-128","./hard-mode.css?v=buttons-132","./hard-mode-content.js?v=listening-130","./hard-mode.js?v=noten-241","../shared/learning-oak.js?v=oak-compact-115","../shared/learning-oak.css?v=oak-compact-115","../shared/course-home.css?v=home-112","./comprehension-content.js?v=quality-222","../shared/comprehension.js?v=inviting-checks-116","../shared/comprehension.css?v=inviting-checks-116","./intro-listening.js?v=intro-choice-104","../shared/text-size.js?v=text-size-103","../shared/exercise-review.js?v=answer-autoplay-179","./deepening-content.js?v=foundations-clarity-152","./deepening.js?v=quality-222","../shared/bug-reports.js?v=reports-239","./en.js?v=flaggen-244","./i18n.js?v=dialogue-106","../shared/streak.js?v=streak-visible-111","./","./index.html","./styles.css?v=audio-switch-176","./app.js?v=cloud-sync-249","./manifest.json","../shared/config.js","../shared/profile.js?v=quiet-sync-259","../shared/learning.js","../shared/practice-progress.js?v=48","../shared/voice-selection.js?v=guide-voices-256","./course-reset.js?v=lessonsteps-61","./lesson-flow.js?v=guide-words-259","../shared/pronunciation.js?v=spell-225","../shared/lesson-ui.css?v=audio-pages-172","../shared/lesson-topic-info.js","../shared/grammar-ui.js?v=course-context-175","../shared/exercise-engine.js?v=answer-autoplay-179","./data.js?v=quality-222","./mastery-specs.js?v=quality-222","./mastery.js?v=quality-222","./lesson1-practice.js?v=quality-222"];
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

