# A1 vocabulary trainer

Enabled only in Français A1 and Deutsch A1. The bottom navigation now opens vocabulary instead of the previous skill menu. The previous grammar, listening, reading, writing and speaking exercises remain accessible through “Weitere Übungen” / “Autres exercices”. Each lesson’s first learning step links to its own vocabulary list and returns to the lesson without changing completion.

## Inventory

`shared/vocabulary-content.js` contains 701 authored bilingual records, assigned separately to the actual French and German lesson sequences. Duplicate exact term/meaning pairs are combined across lesson memberships. The inventory covers introductions, spelling, numbers, dates, family, food, shopping, housing, transport, work, school, routines, health, weather, clothing, leisure, travel, invitations, messages, public services and core grammatical expressions. Nouns include articles, frequent German nouns include explicit plural notes, and verbs use infinitives where appropriate.

The bank also includes all existing lesson phrase pairs, German reference phrases, and translated pairs, rows, extra expressions and vocabulary in each course’s deepening content. These are kept as a separate “Satzbeispiele” / “Phrases exemples” category. Words are curated rather than mechanically splitting French or German sentences into ambiguous tokens. This is an expanded course inventory, not a claim of an official exhaustive DELF/Goethe examination list. In English interface mode the course’s original German/French meanings remain visible and are labelled accordingly.

## Behavior and persistence

- Search either language, ignoring case/accents for discovery; filter by lesson, completed lessons, words/examples and learning status. Large lists render 60 entries at a time, without limiting the training pool.
- Train up to 10 or 20 distinct entries per round, in either direction. A short selection is never padded with duplicate questions.
- Recall and optional typing precede revealing the answer. Ratings are explicitly self-assessments; there is no automatic synonym/spelling judgement or language-proficiency claim. Pronunciation in reverse mode is available only after revealing the target word.
- “Noch üben” resets the streak. Two consecutive “Gewusst” ratings establish confidence. Recorded errors take priority, followed by unseen words; previously trained words are ordered by oldest review. Users can train only uncertain items.
- `state.vocabularyTrainer` stores settings, per-entry ratings and the current snapshot, including typed draft, reveal state, direction and question index, through the existing course/profile save. Ordinary lesson results and existing state keys stay unchanged. Legacy known sentence cards import once with one previous successful self-rating; no confidence is inferred for individual words from a known sentence.
- Replacing an unfinished round requires confirmation; learned word records remain. Completed rounds cannot score twice. Profile/course reset clears the new state along with other course progress. Snapshot cards retain their original content when inventory content changes.
- Free browser TTS uses the existing course voice service. Parenthetical grammatical annotations are omitted from word playback. No paid services or new packages are needed in the app.

## Verification

`tests/vocabulary-trainer.test.cjs` exercises both courses, all 24 lesson inventories, search, empty and short pools, resuming/revealing typed drafts, audio answer protection, confidence/error transitions, legacy migration, interface language switching and isolated state. The combined vocabulary, German course/audio/parity and French grammar/check/Hard Mode/review suites pass 94 tests.

Full-app Chromium checks pass at 320, 390 and 1280 px for both courses: navigation, list/card overflow, typed draft after page reload, answer locking, secondary exercises and lesson vocabulary return. Dark mobile views were visually inspected. Browser fixtures use a local profile adapter; remote account synchronization and audible quality of device TTS were not independently verified. Browser TTS was not audibly listened to.

Only these two A1 entry pages load the new shared assets. Both service-worker caches and changed app/flow asset versions are updated. No Spanish or C1 entry points or existing shared modules are modified.
