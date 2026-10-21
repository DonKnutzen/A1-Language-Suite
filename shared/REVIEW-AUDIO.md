# Restartable A1 review audio

Only the French and German A1 review screens load `review-audio.js` / `review-audio.css`.

The listening button stays enabled during playback and becomes a restart-from-the-beginning action. A separate Stop button cancels the current utterance and any queued dialogue pauses. After natural completion the same text can be replayed without a limit. These controls remain available after grading; they do not unlock responses, record another attempt or change a score.

Both dialogues and single-sentence prompts use the existing callback-aware `A1Voice.speakDialogue` path. The old single-sentence path called `A1Voice.speak`, whose sequence implementation does not forward `onEnd` / `onError` and can apply voice-preview speed preferences. That left the disabled listening button stuck. Single sentences now use the selected voice; existing dialogue speaker/gender metadata and the course's phone/spelling planner are preserved. Normal speech requests 75%; dictation segments retain the intentionally slower course pacing.

The controller invalidates older callbacks before cancelling or restarting. It also stops when an answer is checked, a correction is played, the interface language changes, the round is paused or the view is removed. Mutation cleanup cancels pending playback on bottom-navigation changes. A four-minute watchdog recovers from an engine that sends neither end nor error; restart is always usable even before that timeout. Playback status is transient and is deliberately not restored as an active utterance after page reload.

Verification: 16 dedicated tests cover both real review renderers, unlimited replay, restart/Stop, stale callbacks, errors/false returns/exceptions, missing end events, grading while playing, locked feedback, language changes, view cleanup, the existing voice engine and the installed French/German listening planners with controllable browser speech synthesis. Together with the existing A1 suites, 127 tests pass. Full-app Chromium checks pass at 320, 390 and 1280 px in both courses, including reload and English controls; mobile button layouts were visually inspected. Device sound quality and actual Safari/iPhone speech output were not audibly verified.

All audio remains free, browser-generated and on demand. No speech-engine code used by other courses is modified. Question content, marking policies, stored answers, lesson results and daily review goals are unchanged.
