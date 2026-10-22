# A1 vocabulary trainer — lesson mistake decks (revision 150)

Source reviewed: GitHub `main`, `416c0c82ba602704fab2be44fe1bd4062ca95f84`.
Enabled only in Français A1 and Deutsch A1. C1 and Spanish entry points are unchanged.

## Word lists

The previous lesson shortcut selected `kind: both`, which exposed full reference
sentences as vocabulary cards. The bank now contains only the 701 authored lexical
records in `shared/vocabulary-content.js` plus explicitly authored unit vocabulary.
Exact term/meaning pairs merge lesson memberships. Full lesson sentences, rows and
examples remain in their lessons and do not enter word training. Fixed everyday
expressions such as greetings or *j’ai faim* remain useful lexical chunks.
No automatic token splitting or invented word translations is used.

Each lesson shortcut opens its own **word list**, with the same searchable cards
as the bottom Vocabulary tab. The old words/examples/all selector is removed.
The “et demie” translation is corrected to “… Uhr dreißig”; German “halb” must
refer to the following hour, not the hour printed before French “et demie”.
This remains course vocabulary, not an official exhaustive examination word list.

## Separate mistake decks

- **Word list** and **Mistake decks** are separate compact buttons.
- “Nicht gewusst” / “Je ne savais pas” saves the word in the displayed lesson’s
  deck. New or once-correct words do not become invented mistakes.
- Mistake overview groups pending words by lesson. Open one deck, inspect its
  words, and practise only that lesson’s pending cards. Other words, examples,
  listening exercises and checks are not pulled into the deck.
- Two consecutive positive self-ratings remove the card from that lesson’s deck.
  A later negative rating puts it back. Practising a word in lesson B does not
  clear a pending error in lesson A, even when the lexical entry belongs to both.
- A mixed word round assigns each card to one eligible lesson before answering
  and displays that lesson on the card. A specific lesson selection takes priority;
  otherwise the first eligible lesson is used. Completed-lessons filtering respects
  the learner’s actual completed lessons.
- Short selections are never padded to 10/20 with duplicates. Unfinished rounds
  require confirmation before replacement. The resume button is shown only when
  the saved round matches the displayed mode and lesson context.
- A compact confirmation names the deck after an error or after consolidation.
  Results link directly to the remaining mistake decks from that round.

## Persistence and older progress

`state.vocabularyTrainer` is version 2. Existing course/profile storage is reused;
no external database or paid service is needed. `items` retains global word ratings,
while `lessonItems[lessonId][wordId]` tracks wrong/right counts, consecutive correct
ratings, review count and last review. Card snapshots store `lessonId`, direction,
mode, typed draft, reveal state, ratings and index. Double-clicks cannot grade the
next card, and revealing an answer never records a rating.

Older word records have no lesson provenance. A pending error is imported once
when its last rating was negative. A unique lesson can be assigned safely; a word
belonging to several lessons goes into an explicitly labelled **Earlier mistakes**
deck with no asserted original lesson. One successful old self-rating alone does
not establish an error. Old aggregate records and original course results remain.

Version-1 mixed rounds are archived as `previousSession`. Only still-valid word
cards continue; their graded answers, order and current word draft remain. A draft
for a removed sentence is cleared, not transferred into a different question.
Sentence ratings never become invented word grades. Old known-sentence state is
retained but no longer imported as knowledge of individual words.

## Honest assessment and audio

Recall and optional typing precede revealing. Buttons explicitly ask for a
**self-assessment**, not automatic translation/spelling judgement. Suitable
alternative translations can be accepted by the learner. There is no inference
of certified proficiency. Free browser TTS still uses the existing voice service;
reverse-direction pronunciation is hidden until revealing the target word.
Parenthetical grammatical annotations are omitted from word playback.

## Verification

- 31 vocabulary tests cover both courses, all 24 lesson inventories, word-only
  entry, lesson-specific errors, two-review consolidation, later failure, legacy
  migration, typed drafts after serialization, double-click protection, search,
  reverse-audio protection, language switching and profile isolation.
- 200 relevant tests pass, including the existing German quality/parity/audio
  and French grammar/check/Hard Mode/review suites.
- Full-app Chromium checks pass for both courses at 320, 390 and 1280 px:
  real navigation, local saving and reload, answer locking, word-to-mistake flow,
  confirmation before replacing a round, two-review removal and all 24 lesson
  vocabulary shortcuts. Light mistake-deck views and dark word lists were
  inspected visually. TTS was intercepted; audible device voice quality and
  remote account sync were not independently verified.
- A broader historical top-level test run also contains failures unrelated to
  vocabulary. The unmodified baseline reproduces 14 failures, including stale
  French question-count/optional-task expectations and an old bug-report asset
  version. Those unrelated tests/content are outside this change; they are not
  presented as passing.

Both course HTML pages and offline caches use `vocab-decks-150` for the three
shared vocabulary assets. The German question-quality cache assertion follows
the new cache version. No runtime dependencies, binaries or paid APIs are added.
