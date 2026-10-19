# Lesson Hard Mode

The 24 lessons retain three parts: a connected typed cloze, two listening texts with typed and sentence-choice questions, and a short message with three content points. The scope follows the essential taught skills, with no fixed question quota. Version 3 currently has 18–30 tasks per lesson, including writing. These are original A1 exercises informed by the supplied telc sample, without official equivalence or certification.

The compact red entry unlocks when `lessonMasteryBest[id] >= 80`. While locked it shows only a lock button and unlock hint. After unlocking it reveals section names, actual task count and indicative time. A slow red glow and passing highlight emphasize the button; unlocked animation is stronger. The surrounding frame stays subtle. Reduced-motion preferences disable animations. Normal lesson completion is independent of Hard Mode.

## Coverage and content

Version 3 maps each essential goal in `objectives` to actual gap/listening responses via `skills` and required writing points via `writing.skills`. The mappings support editorial review; passing a schema test alone cannot establish pedagogical coverage. Read [HARD-MODE-REVIEW.md](HARD-MODE-REVIEW.md) for the audited baseline, lesson-specific findings, corrections and remaining limitations.

Cloze authoring uses `{answer~alternative|hint|skill[,skill]|flags}`. Hints may specify a verb infinitive or intended meaning without supplying the inflected answer. Full negation, progressive expressions, adjective order and purpose expressions are entered as phrases where appropriate. Listening requires selective detail understanding. The browser voice runs at rate 0.75; that value is not a calibrated words-per-minute speed. Indicative time derives from scope, is not user-validated and imposes no time limit.

## Fair marking

Version 3 requires at least 80% **in each** automatically marked section, compared before rounding. The displayed overall percentage excludes writing. Free writing requires the displayed minimum word count and at least 6/8 self-assessed points, with no criterion at 0. Models permit other appropriate answers and understandable A1 errors. Results explicitly distinguish automatic marking from self-assessment; they do not certify language proficiency.

Typed answers use task-specific policies: explicit spelling tasks retain accents; ordinary listening responses tolerate absent accents. Apostrophe styles, case and spacing are normalized. Numeric prices accept equivalent decimal forms, times accept equivalent valid hours/minutes, and French phone numbers accept grouping or +33. Emails retain their characters. Curated semantic variants avoid substring or fuzzy matching. Choice order is shuffled once per attempt and persisted.

## Saved attempts and audio

State lives at `lessonWork[id].hardMode`: `attempt`, `history`, `contentVersions`, `bestByVersion`, original `bestObjective` and versioned achievement metadata. Starting a new attempt archives the previous answers and result. History allows previous drafts to continue or results to be inspected. Current content is snapshotted per version; the bundled v1/v2 data preserves already published attempts and their original scoring rules. Unknown versions display all saved responses without grading against current tasks. Any published task/answer/rule change requires a new version. UI-only changes do not.

Drafts save after edits, navigation and audio count changes. Save errors are surfaced. Submission uses an explicit confirmation; unanswered items may be submitted as incorrect. Models and transcripts remain hidden until confirmation. Submitted responses and special-character insertion are locked; the four writing ratings remain editable only until the final result is saved.

Each recording allows three starts before submission. A manual stop/navigation still counts; an actual playback error refunds once. Playback states update without rebuilding the form or moving focus. Language changes retain the attempt, selection and active audio. Answers remain editable during listening. After submission the recordings can be replayed for review. A stalled playback times out after four minutes and refunds; this is only a safeguard, not an exam time limit.

## Validation

```sh
node --test francais/tests/*.test.cjs tests/french-listening.test.cjs
```

The suites exercise all 24 complete attempts, answer policies, section thresholds, drafts, stored choice orders, version binding, history, submission locks, audio limits/errors and language changes. Real Chromium checks separately cover normal-check unlock, home continuation, submission/result/reload, 320px and desktop layouts, themes, reduced motion and targeted axe audits. These checks do not validate actual French speech quality: the test browser provides no speech voices. Timing and difficulty need learner trials. Older root tests for the replaced optional panel and an unrelated pre-existing choice-count assertion are not evidence against the new flow.

Version 3 improves the contact-data dialogues and separates spoken phone groups, postcode characters and spelled names with deliberate pauses. The global three-play allowance also applies to saved older attempts. Question order, cloze order and objective passing thresholds are unchanged. See [AUDIO-GRAMMAR.md](AUDIO-GRAMMAR.md).
