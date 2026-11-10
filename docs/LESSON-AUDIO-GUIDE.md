# Whole-lesson audio guides

Enabled for French A1, French A2 and German A1. English B1 keeps its existing page player.

`shared/lesson-audio-guide.js` builds an ordered speech plan from the actual lesson data and detached copies of every grammar page. It covers goals, opening examples, supporting words and rules, grammar, pronunciation, dialogue, both readings of the listening text, optional finale vocabulary and practice instructions. It never runs an exercise, reveals answer widgets, submits an answer or awards quiz points. A core phrase is marked heard only after its last scheduled repetition finishes.

## Pacing and controls

The target language uses rate 0.74 and explanations use 0.86. “Very calm” multiplies both by 0.88. Multiword opening examples follow target → translation → target again. Single words follow target → translation. The gap before the next pair is 650 ms; listening turns use 400 ms. Shorter pauses separate clauses and language changes. Only one utterance and one pause timer can be active. Pause, stop, navigation, pagehide and errors invalidate old callbacks and timers. Resume starts the unfinished segment; an error retains its place. Chapters can be selected without changing the exercise page.

## Language annotations

Always mark new inline learning-language material explicitly:

```html
<p lang="de">Mit <span lang="fr">je suis</span> stellst du dich vor.</p>
<p lang="fr">Avec <span lang="de">ich bin</span>, tu te présentes.</p>
```

Explicit `lang` values take priority, including native-language translations. Existing phrase rows, conjugation tables, alphabet buttons and translated word lists are annotated on a detached copy. `shared/guide-language.js` handles older unmarked rules using authored target examples and grammar terms, with paragraph context across inline emphasis. Its native-word exclusions distinguish ambiguous short forms and cognates. Add explicit annotations for new ambiguous material rather than relying on lexical matching. Spelled endings and names use the existing pronunciation letter names; visual IPA notes are omitted from speech.

French A2 shares the French wrapper, while supplying only its own A2 lesson, foundation, dialogue and listening data. No paid API, generated recording, new permission or account state is needed.

## Validation

The guide unit tests cover repetitions, language boundaries, timing, slower speech, chapters, pause/resume, errors, stale callbacks and cleanup. `tests/whole-lesson-guide.test.cjs` loads the real course pages and checks the complete guide in all 72 lessons, including every grammar topic, both listening readings and unchanged stored exercise progress. Existing English-guide tests verify its unchanged behavior. Real browser voice quality and operating-system background playback remain device-dependent.
