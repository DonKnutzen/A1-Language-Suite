# Lesson Hard Mode

The 24 lessons retain three parts: a connected typed cloze, two listening texts with typed and sentence-choice questions, and a short message with three content points. The scope follows the essential taught skills, with no fixed question quota. Version 4 currently has 18–30 tasks per lesson, including writing. These are original A1 exercises informed by the supplied telc sample, without official equivalence or certification.

The compact red entry unlocks when `lessonMasteryBest[id] >= 80`. While locked it shows only a lock button and unlock hint. After unlocking it reveals section names, actual task count and indicative time. A slow red glow and passing highlight emphasize the button; unlocked animation is stronger. The surrounding frame stays subtle. Reduced-motion preferences disable animations. Normal lesson completion is independent of Hard Mode.

## Coverage and content

Version 4 maps each essential goal in `objectives` to actual gap/listening responses via `skills` and required writing points via `writing.skills`. The mappings support editorial review; passing a schema test alone cannot establish pedagogical coverage. Read [HARD-MODE-REVIEW.md](HARD-MODE-REVIEW.md) for the audited baseline, lesson-specific findings, corrections and remaining limitations.

Cloze authoring uses `{answer~alternative|hint|skill[,skill]|flags}`. Hints may specify a verb infinitive or intended meaning without supplying the inflected answer. Full negation, progressive expressions, adjective order and purpose expressions are entered as phrases where appropriate. Listening requires selective detail understanding. The browser voice runs at rate 0.75; that value is not a calibrated words-per-minute speed. Indicative time derives from scope, is not user-validated and imposes no time limit.

## Fair marking

Version 4 requires at least 80% **in each** automatically marked section, compared before rounding. The displayed overall percentage excludes writing. Free writing requires the displayed minimum word count and at least 6/8 self-assessed points, with no criterion at 0. Models permit other appropriate answers and understandable A1 errors. Results explicitly distinguish automatic marking from self-assessment; they do not certify language proficiency.

Typed answers use task-specific policies: explicit spelling tasks retain accents; ordinary listening responses tolerate absent accents. Apostrophe styles, case and spacing are normalized. Numeric prices accept equivalent decimal forms, times accept equivalent valid hours/minutes, and French phone numbers accept grouping or +33. Emails retain their characters. Curated semantic variants avoid substring or fuzzy matching. Choice order is shuffled once per attempt and persisted.

## Saved attempts and audio

State lives at `lessonWork[id].hardMode`: `attempt`, `history`, `contentVersions`, `bestByVersion`, original `bestObjective` and versioned achievement metadata. Starting a new attempt archives the previous answers and result. History allows current-version drafts to continue and prior results to be inspected. Superseded unfinished drafts are preserved for read-only inspection when their working copy is updated. Current content is snapshotted per version; the bundled v1/v2/v3 data preserves already published attempts and their original scoring rules. Unknown versions display all saved responses without grading against current tasks. Any published task/answer/rule change requires a new version. UI-only changes do not.

Drafts save after edits, navigation and audio count changes. Save errors are surfaced. Submission uses an explicit confirmation; unanswered items may be submitted as incorrect. Models and transcripts remain hidden until confirmation. Submitted responses and special-character insertion are locked; the four writing ratings remain editable only until the final result is saved.

Each recording allows three starts before submission. A manual stop/navigation still counts; an actual playback error refunds once. Playback states update without rebuilding the form or moving focus. Language changes retain the attempt, selection and active audio. Answers remain editable during listening. After submission the recordings can be replayed for review. A stalled playback times out after four minutes and refunds; this is only a safeguard, not an exam time limit.

## Validation

```sh
node --test francais/tests/*.test.cjs tests/french-listening.test.cjs
```

The suites exercise all 24 complete attempts, answer policies, section thresholds, drafts, stored choice orders, version binding, history, submission locks, audio limits/errors and language changes. Real Chromium checks separately cover normal-check unlock, home continuation, submission/result/reload, 320px and desktop layouts, themes, reduced motion and targeted axe audits. These checks do not validate actual French speech quality: the test browser provides no speech voices. Timing and difficulty need learner trials. Older root tests for the replaced optional panel and an unrelated pre-existing choice-count assertion are not evidence against the new flow.

Version 3 improves the contact-data dialogues and separates spoken phone groups, postcode characters and spelled names with deliberate pauses. The global three-play allowance also applies to saved older attempts. Question order, cloze order and objective passing thresholds are unchanged. See [AUDIO-GRAMMAR.md](AUDIO-GRAMMAR.md).

## Version 4: speaker roles and independent listening questions

All 48 recordings were reviewed for speaker identity and question-to-question hints. A role catalogue assigns male/female voice roles to the actual speakers and named narrators, independently of whether a role is labelled A or B. It also resolves roles when an old saved task snapshot has no gender metadata. A woman greeting Paul must not acquire Paul’s voice; Paul mentioning his wife Anna must retain his own voice. `FR_A1_HARD_AUDIO.turns` builds playback-only turns without modifying saved task content. The browser’s available voice catalogue still determines whether matching male/female device voices exist. No paid service or downloaded audio is required.

Listening questions now separate requested facts. Examples: the options about languages no longer spell out the person’s name, residence and origin; the family options do not reveal a wife’s name or a child’s age; the weather options do not print the temperature requested in another question. Options mostly contrast the same kind of information. Date, identity and contact literals shared between cloze and listening were separated in lessons 2, 3, 17 and 22. Familiar vocabulary can recur across tasks; merely seeing a familiar noun does not establish which answer is true in the recording.

Lesson 6 adds a coffee preference and lesson 12 adds the duration already covered by the lesson’s ordinary medication dialogue. In lesson 15, a redundant arrival/duration/departure question is replaced by a separate train departure-time response. The three-part structure, essential objectives, task totals, three-play limit, 75% setting and scoring thresholds remain in place.

New attempts use version 4. Resuming an unfinished v1–v3 draft now archives its original answers and updates the working copy to the current questions automatically. Only unchanged task prompts/answers/marking policies retain their responses; changed questions start empty. The writing draft and prior best results remain stored. Changed recordings or question sets receive a fresh three-play allowance; unchanged sets retain their counts. The update saves once and remains stable across reloads and language changes. Superseded drafts can be inspected read-only from history. Submitted and reviewed attempts retain their original dataset and scoring. Older achievements are not silently labelled as passes of the revised questions. Corrected speaker roles apply when replaying old attempts too.

Regression tests check hidden-name leaks across every lesson, specific cross-question hints, actual utterance voice selection across all 48 recordings and all four dataset versions with either preferred device voice, and v3-to-v4 preservation. Controlled synthesis verifies routing, rate and sequencing; actual device audio quality still requires listening on the device.

Validation of this revision: 54 targeted tests pass, including `tests/reported-exercises.test.cjs` alongside the command above. Real Chromium journeys pass for normal-check unlock, complete submission/reload, 320px/desktop layouts, actual Marc/Thomas and Léa/Audrey utterance routing at 75%, stored play counts and v3-to-v4 archiving. Speech synthesis is controlled in these journeys; no claim is made to have heard the device audio.

## Resume correction (build 131)

The earlier checks verified fresh v4 attempts but intentionally left running v1–v3 snapshots on the old questions. This reproduced the reported case: an unanswered name question followed by “Où habite Luc ?”. Updating the working draft on resume removes the need to find a manual restart button. The original saved dataset is kept for historical grading, and its original draft remains readable without replacing the active updated attempt.

55 targeted tests pass, including migration of all 24 lessons from each of v1/v2/v3, unchanged submitted results, response/order/count preservation, exact archival and idempotence. A Chromium regression first runs the previously published renderer against a persisted v3 draft and confirms the visible clue, then reloads the corrected renderer against the same storage and verifies automatic correction, draft/history access, retained best results and a second reload.

## Mini-game skin (lesson 1 pilot, build 193)

Each page of the lesson 1 Hard Mode is presented as its own colourful mini-game: card memory, string game (tap-to-connect), word train (sentence building with surplus wagons; tapping a wagon unhooks it), magic gaps (inline typed gaps in a speech bubble plus an accent keyboard for é è ê à ç ’ î ô) and radio quiz (listening with A–D quiz cards and an equaliser while audio plays). Correct answers trigger confetti and a star; the result screen shows a trophy with 1–3 stars from the first-check score (≥90 % three, ≥70 % two).

This is a UI-only change: tasks, answers, saved attempt format, scoring and the content version are unchanged, so no new version is required. Styles live in `hard-mode-games.css`; reduced-motion preferences disable all animations and confetti. The page buttons 1–6 (and the tiles on the intro map) jump straight to any game; “Previous page” always works, and “Next” on the last page leads to the first unfinished page before the result. During a correction round, finished games stay viewable read-only. A “Restart Hard Mode” button under the save status starts a fresh attempt at any time after confirmation; the previous attempt is archived under “Previous attempts”. The state before this change is tagged `vor-minispiele` in git.

Marking fix (build 194, all three Hard Mode courses): a space before French punctuation no longer decides correctness. Previously the trailing `?` was stripped before whitespace was collapsed, so a model such as “Comment vous vous appelez ?” kept a trailing space and rejected “Comment vous vous appelez?”. Already graded attempts are not re-scored.

## Arcade / Spielhalle (lesson 1, build 196)

`hard-mode-arcade.js` adds five bonus games reachable from the 🕹️ button in the page bar, the intro and the result screen. They reuse lesson 1 language only and never change the Hard Mode attempt or its score; best scores and stars (0–3 per game) are stored in `lessonWork[1].hardMode.pilot.arcade`.

- 🎯 Wurf-Arena – slingshot (drag back and release, or tap a target / keys 1–4) at moving targets carrying forms of être, venir, habiter and parler; 45 s, wrong hits cost 3 s, tapped throws home in on their target.
- 🎈 Ballon-Jagd – the sentence is spoken by the browser voice; pop the matching balloon before it escapes (German/English meaning appears after 3.5 s or when no voice is available); 3 lives.
- 🧺 Wort-Fänger – catch only the word that fits the gap with a draggable basket (or arrow keys); 3 lives.
- ⚡ Blitz-Sortierer – swipe/tap/arrow-key cards to origin vs home, tu vs vous, être vs venir; 5 s per card shrinking to 2 s; 3 lives.
- 💎 Millionen-Turm – an original quiz show: 10 graded questions with four answers on a prize ladder up to €1,000,000 (safe level €1,000), two jokers (50/50 removes two wrong answers, hint; the swap joker was removed in build 201), walk away at any time, synthesised background music, drum roll and fanfares.

Canvas games run on `requestAnimationFrame`, pause when the page is hidden or on Escape, and fall back to a message without canvas support. Sounds are synthesised with the Web Audio API (no audio files); sound effects and voice can be switched off and the choice is remembered on the device. Game logic is unit-tested in `tests/hard-mode-arcade.test.cjs`; real touch feel, audio and speech output still need checking on a device.

Quiz sound slots (build 197): the quiz show looks for optional MP3 files in `francais/audio/quiz/` (`start`, `fragen-1/2/3` loops for questions 1–4, 5–9 and 10, `festgelegt`, `richtig`, `sicher`, `million`, `falsch-1/2`, `joker`, `aussteigen`); each missing file falls back to the synthesised sound. The folder README lists when each file plays. Only sounds the project may use (own recordings, CC0/royalty-free) belong there – no TV, film or game music.

Quiz sound flow and look (build 198): sound slots now follow three prize ranges (questions 1–4, 5–7, 8–10) with `schleife-N` loops and `richtig-N`/`falsch-N` results; locking in stops the loop and plays `festgelegt`, the result follows after 3 s (build 199; 2 s in build 198), and the loop resumes 0.6 s after the result sound ends. `joker` plays on top without stopping anything. The quiz got a starry stage, an animated gradient question frame, glass answer buttons, a prize readout, a lock-in status and a "correct" banner. See `audio/quiz/README.md` for the file list.

Quiz progress and difficulty (build 202): the running quiz is saved in `lessonWork[1].hardMode.pilot.arcade.quiz` after every change (question set, level, winnings, jokers, answer order, removed answers, hint) and offered as "Weiter bei Frage X" on the quiz start screen and the arcade tile. Locking in commits the outcome before the suspense, so leaving the page cannot undo an answer; a wrong answer, walking away or winning clears the save. The pool now has 3–4 questions per level: meaning questions first, then verb forms, and from level 7 near-identical spelling and grammar traps (êtes/étes/êtez, tu parles/parle, viennent/vienent, j’habite/je habite, venir de/habiter à).

Quiz audio (build 204): on the user's request the quiz plays only the uploaded files – no synthesised music, fanfares, drum roll, beeps or speech; a missing file is silent and the voice toggle is hidden in the quiz. Files are fetched completely before first play (build 203) to avoid stutter. The four action games keep their built-in sounds.

## Quiz show in every Hard Mode (build 205)

`shared/quiz-show.js` (+ `shared/quiz-show.css`) now hosts the quiz show for both courses. French lesson 1 keeps its hand-written questions in the arcade; every other French lesson and all 24 German lessons get a "💎 Millionen-Turm / La tour du million" button below the Hard Mode header. Questions are generated from the lesson's own material with rising difficulty:

| Level | Question | Material |
|---|---|---|
| 1–3 | What does the word mean? | lesson vocabulary (`shared/vocabulary-content.js`) |
| 4 | How do you say it? | lesson vocabulary, random distractors |
| 5–6 | How do you say it? | look-alike words from all lessons so far |
| 7–8 | Fill the gap (with the Hard Mode hint) | the lesson's Hard Mode cloze sentences |
| 9–10 | Fill the gap | look-alike forms from every lesson so far |

The interface follows the course (German for the French course, French for the German course, English when chosen). Saved game, best prize and stars are stored per lesson in `lessonWork[id].hardMode.quiz`. Both courses play the uploaded sounds from `francais/audio/quiz/`. Tests: `tests/quiz-show.test.cjs` checks all 48 lessons (each level ≥3 questions, four distinct answers) and the integration in both courses.

Quiz difficulty (build 212): from €5,000 the generated questions get harder step by step. Wrong answers come from the answer's own word family – other forms of the same verb in the course, article/possessive/pronoun/preposition and time-word sets – and, from level 7, realistic spelling slips (dropped accents/umlauts, é/è/ê, ie/ei, ß/ss, elision). Level 8 uses the lesson's closest third, level 9 asks "Which sentence is correct?" with four near-identical sentences, level 10 compares sentences with two gaps (error in either or both). Grammar-rule hints are hidden for whole-sentence questions. The ladder is filled from the top so the €500,000 and million questions always get the hardest sentences; lessons with few word families add the hardest sentences of earlier lessons, like the cumulative exam.
