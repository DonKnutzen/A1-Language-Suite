const CACHE="francais-a1-hard-gold-v142";
const PREFIX="francais-a1-";
const ASSETS=["../shared/hard-mode-achievement.css?v=hard-gold-142","../shared/review-audio.js?v=review-audio-141","../shared/review-audio.css?v=review-audio-141","../shared/daily-review.js?v=daily-140","../shared/daily-review.css?v=daily-140","../shared/vocabulary-content.js?v=vocab-138","../shared/vocabulary-trainer.js?v=vocab-138","../shared/vocabulary-trainer.css?v=vocab-138","./review-practice.js?v=review-audio-141","./review-practice.css?v=review-entry-136","./grammar-practice.js?v=review-quality-139","./listening-audio.js?v=audio-128","./listening-player.js?v=audio-128","./hard-mode.css?v=buttons-132","./hard-mode-content.js?v=listening-130","./hard-mode.js?v=hard-gold-142","../shared/learning-oak.js?v=oak-compact-115","../shared/learning-oak.css?v=oak-compact-115","../shared/course-home.css?v=home-112","./comprehension-content.js?v=reports-129","../shared/comprehension.js?v=inviting-checks-116","../shared/comprehension.css?v=inviting-checks-116","./intro-listening.js?v=intro-choice-104","../shared/text-size.js?v=text-size-103","../shared/exercise-review.js?v=lesson-feedback-113","./deepening-content.js?v=reports-101","./deepening.js?v=review-quality-139","../shared/bug-reports.js?v=dialogue-choices-108","./en.js?v=review-quality-139","./i18n.js?v=dialogue-106","../shared/streak.js?v=streak-visible-111","./","./index.html","./styles.css?v=home-glow-110","./app.js?v=hard-gold-142","./manifest.json","../shared/config.js","../shared/profile.js?v=text-size-103","../shared/learning.js","../shared/practice-progress.js?v=48","../shared/voice-selection.js?v=resume-109","./course-reset.js?v=lessonsteps-61","./lesson-flow.js?v=vocab-138","../shared/pronunciation.js?v=alphabet-59","../shared/lesson-ui.css?v=inviting-checks-116","../shared/lesson-topic-info.js","../shared/grammar-ui.js?v=french-60","../shared/exercise-engine.js?v=report-fixes-117","./data.js?v=report-fixes-117","./mastery-specs.js?v=reports-129","./mastery.js?v=review-133","./lesson1-practice.js?v=review-133"];
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


