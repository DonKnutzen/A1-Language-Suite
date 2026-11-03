const CACHE="deutsch-a1-hard-v227";
const PREFIX="deutsch-a1-";
const ASSETS=["../shared/game-hard-mode.js?v=strings-226","../shared/game-hard-mode.css?v=games-219","../francais/hard-mode-arcade.js?v=games-218","../francais/lesson-challenge.css?v=compact-hardmode-191","../francais/hard-mode-games.css?v=quiz-205","../shared/answer-explain.js?v=explain-219","../shared/answer-explain.css?v=explain-218","../shared/explain-de.js?v=explain-219","../shared/answer-feedback.js?v=answer-autoplay-179","../shared/lesson-vocabulary-plan.js?v=didactic-161","../shared/lesson-lexicon.js?v=didactic-161","../shared/lesson-foundations.js?v=course-language-177","./question-content.js?v=quality-222","../shared/dialogue-voices.js?v=dialogue-168","../shared/hard-mode-achievement.css?v=hard-gold-142","../shared/review-audio.js?v=review-audio-141","../shared/review-audio.css?v=review-audio-141","../shared/daily-review.js?v=daily-165","../shared/daily-review.css?v=daily-165","../shared/vocabulary-content.js?v=vocab-decks-150","../shared/vocabulary-trainer.js?v=course-language-177","../shared/vocabulary-trainer.css?v=vocabulary-pairs-160","./hard-mode.css?v=parity-137","./review-practice.css?v=mistake-history-155","./hard-mode-content.js?v=quality-222","./deepening.css?v=page-load-223","./deepening-tidy.js?v=tidy-209","../shared/quiz-show.js?v=quiz-classes-221","../shared/quiz-show.css?v=entry-213","./hard-mode.js?v=games-218","./review-practice.js?v=answer-autoplay-179","./listening-audio.js?v=reports-144","./listening-player.js?v=parity-137","./pronouns.js?v=german-layout-121","./answer-audio.js?v=reports-129","../shared/learning-oak.js?v=oak-compact-115","../shared/learning-oak.css?v=oak-compact-115","../shared/course-home.css?v=home-112","./comprehension-content.js?v=quality-222","../shared/comprehension.js?v=german-audio-119","../shared/comprehension.css?v=inviting-checks-116","../shared/text-size.js?v=text-size-103","./deepening-content.js?v=page-load-223","./applications.js?v=quality-222","./study.js?v=page-load-223","../shared/exercise-review.js?v=answer-autoplay-179","../shared/bug-reports.js?v=reports-145","./", "./index.html", "./manifest.json", "./styles.css?v=deepening-layout-178", "../shared/lesson-ui.css?v=audio-pages-172", "../shared/config.js", "../shared/profile.js?v=course-language-177", "../shared/streak.js?v=streak-visible-111", "../shared/learning.js", "../shared/practice-progress.js?v=48", "./lesson-content.js?v=curriculum-179", "../shared/lesson-guide.js", "../shared/lesson-topic-info.js", "../shared/grammar-ui.js?v=page-load-223", "../shared/exercise-engine.js?v=answer-autoplay-179", "../shared/pronunciation.js?v=spell-225", "../shared/voice-selection.js?v=spell-225", "./grammar-drills.js?v=quality-222","./page-checks.js?v=page-checks-224","./assessments.js?v=page-checks-224", "./pronunciation.js?v=german-depth-102", "./lesson-flow.js?v=page-load-223", "./app.js?v=quality-222", "./course-reset.js?v=german-depth-102"];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS.map(url => new Request(url, {cache:'reload'})));
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
