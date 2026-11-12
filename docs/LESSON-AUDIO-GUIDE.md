# Whole-lesson audio guides

Enabled for French A1, French A2 and German A1. English B1 keeps its existing page player.

`shared/lesson-audio-guide.js` builds an ordered speech plan from the actual lesson data and detached copies of every grammar page. It covers the goals, opening vocabulary examples, supporting words and rules, and all grammar pages before the first lesson check. Listening-comprehension exercises, checks, optional Hard Mode material and later speaking/writing tasks are excluded. The player is mounted only in the vocabulary and grammar learning sections. The complete reference word list (`data-foundation-words`) stays on the learning page and is excluded from narration. It never runs an exercise, reveals answer widgets, submits an answer or awards quiz points. A core phrase is marked heard only after its last scheduled repetition finishes.

## Pacing and controls

The target language uses rate 0.74 and explanations use 0.86. A slider scales both rates from 0.60× to 1.60× in steps of 0.05×. The selection is kept on this device for the course. Releasing the slider during playback restarts the current sentence at the new speed. Every opening vocabulary example follows exactly target → translation → target again, including single words. Listening-comprehension recordings are played only through their own exercise controls. The gap before the next pair is 650 ms; listening turns use 400 ms. Shorter pauses separate clauses and language changes. Only one utterance, one pause timer and one display clock can be active. Pause, stop, navigation, pagehide and errors invalidate old callbacks and timers. Pagehide, navigation and interruptions preserve a profile-scoped, content-fingerprinted per-lesson bookmark. Reopening offers explicit resume at that segment; stop and completion clear the bookmark. Hiding the page alone does not cancel audio or requeue the current segment. Resume starts the unfinished segment; an error retains its place. Choose the whole lesson or just the current learning part using the compact scope selector. Grammar defaults to the current part; the first vocabulary page defaults to the whole lesson. The whole guide opens the corresponding existing learning page as it proceeds, without grading or completing grammar exercises. Chapter selection and seeking use the same page-following behavior. Scope-specific bookmarks keep whole-lesson and current-page positions separate. The time display advances during speech and gaps, freezes on pause and resets on stop. Seeking snaps to a sentence start, and seeking to the end stops playback without marking skipped content as heard. Duration is explicitly estimated because Web Speech does not expose an audio-file duration. The initial model uses text length, language rates and pauses; completed utterances refine it using observed time. Speed changes rescale speech durations while leaving pauses unchanged.

## Voices, reading and background limits

Two inline voice selectors use the existing shared device voice preferences through `A1Voice.getVoicePreference` and `setVoice`. Late voice availability updates the lists without restarting narration. Selection takes effect on the next segment. A preview pauses the guide while preserving its place; it never resumes the guide automatically. The shared voice wrapper forwards word-boundary callbacks even through the French fallback.

The guide has a compact default toolbar and time slider. Voice, speed and chapter controls are in a closed settings disclosure; starting playback closes it. There is no separate transcript, repeated caption or reading panel. Existing visible vocabulary and matching lesson paragraphs receive a subtle background. Real speech word-boundary events highlight only the spoken word in the original text, including words crossing inline formatting. CSS Highlight ranges preserve the DOM; older browsers use temporary inline marks that are removed on pause, stop, error, completion or navigation. No estimated word timers are used: voices without word-boundary events retain only the subtle passage background. No duplicate transcript, focus movement or forced scrolling is added. Hidden/collapsed content and answer widgets are excluded from source matching. Presentation-only A/B speaker labels are omitted from narration while genuine alphabet examples remain intact.

Browser speech is not an audio file. This implementation does not promise playback after an app is terminated or when the OS suspends speech/JavaScript while locked. It uses no silent-audio keepalive or assumed Media Session support. On return, a browser-stopped utterance offers manual resume instead of silently replaying the guide. Reliable lock-screen playback would need a real audio/media or native playback path.

## Language annotations

Always mark new inline learning-language material explicitly:

```html
<p lang="de">Mit <span lang="fr">je suis</span> stellst du dich vor.</p>
<p lang="fr">Avec <span lang="de">ich bin</span>, tu te présentes.</p>
```

Explicit `lang` values take priority, including native-language translations. Existing phrase rows, conjugation tables, alphabet buttons and translated word lists are annotated on a detached copy. `shared/guide-language.js` handles older unmarked rules using authored target examples and grammar terms, with paragraph context across inline emphasis. Its native-word exclusions distinguish ambiguous short forms and cognates. Add explicit annotations for new ambiguous material rather than relying on lexical matching. Spelled endings and names use the existing pronunciation letter names; visual IPA notes are omitted from speech.

French A2 shares the French wrapper, while supplying only its own A2 lesson, foundation, dialogue and listening data. No paid API, generated recording, new permission or account state is needed.

## Validation

The guide unit tests cover repetitions, language boundaries, timing, slower speech, chapters, pause/resume, errors, stale callbacks and cleanup. `tests/whole-lesson-guide.test.cjs` loads the real course pages and checks the complete guide in all 72 lessons, including every grammar topic, excluded listening tasks and unchanged stored exercise progress. Word-follow tests cover inline formatting, stale callbacks, assessment exclusions, current-part scope, and real whole-lesson page transitions in all three shared-guide courses. Existing English-guide tests verify its unchanged behavior. Real browser voice quality and operating-system background playback remain device-dependent.

