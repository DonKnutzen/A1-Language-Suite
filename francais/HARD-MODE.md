# Lesson Hard Mode

Each of the 24 lessons has original A1 tasks: a connected typed cloze, two audio texts with six detail questions (four typed and two sentence choices), and one short message addressing three content points. There are 15–18 tasks per lesson. The supplied TELC Français A1 sample informed the everyday scenarios and approximately 30-word writing task; this is not an official TELC test or score.

The entry replaces the former optional speaking/writing panel and unlocks when `lessonMasteryBest[id] >= 80`, including previously recorded passes. Legacy lesson completion alone does not unlock it. Hard Mode does not change the normal course-completion calculation. Existing practice drafts remain stored; an old speaking/writing resume position returns to the lesson check.

Attempts live at `lessonWork[id].hardMode`. Inputs, section, audio counts, submission and self-assessment are saved through the existing profile save function. Before submission, sections can be revisited and edited. Each audio text allows two plays; playback failures refund the play. Answers, transcripts and the writing model appear only after submission. Submitted text is read-only. A new attempt explicitly replaces the current answers while preserving the objective best score and the achieved Hard Mode status.

The training goal is at least 80% across objectively marked questions, at least half correct in each objective section, and a writing self-assessment of at least 6/8 with no criterion scored 0. The displayed percentage excludes writing. Writing has no automatic semantic or grammatical correction: the learner compares the model and rates three content points plus communicative clarity. Small A1 errors are allowed when understandable. Audio uses the existing French browser voice at rate 0.85.

Content is in `hard-mode-content.js`; `{answer|hint}` marks a cloze gap. Bump a lesson's content version when changing published answers. A version mismatch preserves the old writing draft and offers a fresh attempt rather than silently grading against revised content. UI text supports German/English, light/dark themes and reduced motion.

Validation (Node and the same `jsdom` dependency used by the repository's existing DOM tests):

```sh
node --test francais/tests/*.test.cjs tests/french-listening.test.cjs
```

The new DOM suite completes and reviews all 24 tests, verifies the unlock guard, interrupted drafts, persisted audio limits, playback failures, language switches and retry behavior. The former optional-panel and dictation UI tests in the root suite describe the replaced interface; their replacement coverage is in `francais/tests/`. The unrelated existing `all 23 later lessons...` assertion (2 versus 3 choices) also fails on the unchanged starting commit.
