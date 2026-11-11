# Radio audio

The French A1/A2 and German A1 radio quizzes, and the English B1 final listening
tasks, play checked-in MP3s. Playback does not depend on installed system voices,
Firefox's speech synthesis implementation, an API key, or a runtime TTS service.
The lesson guide and other audio controls keep their selectable system voices.

There are 194 exercise recordings: 48 per course, plus two French A1 lesson-1
pilot dialogues. One dialogue is shared, so there are 193 unique MP3 files.
Each dialogue preserves the authored male/female roles. Speaker
badges A/B are not spoken. The player applies the exercise's speed with pitch
preservation, stops when another audio control is used, and reports load or
autoplay failures through the existing quiz callback, refunding that attempt.
An audio file which has not started within 15 seconds is treated as failed.

`shared/radio-recordings.js` stores the exact language, speaker, text and gender
signature for each file. If a text changes, its old audio cannot be selected.
Regenerate affected recordings together with content changes.

To regenerate, install `edge-tts==7.3.1` in a temporary authoring environment and
run from the repository root:

```text
node tools/build-radio-recordings.cjs <temporary-job-file.json>
python tools/generate-radio-recordings.py <temporary-job-file.json> <temporary-chunk-cache>
```

The generator sends only the public authored exercise texts to Microsoft Edge's
TTS service at build time. These sources were compared byte-for-byte (after
newline normalization) with unauthenticated public GitHub files at commit
`d3202b3` before generation. Voices: Denise/Henri (French), Katja/Conrad
(German), Sonia/Ryan (British English). Audio contains the dialogue text only.

Validation:

```text
node --test tests/radio-recordings.test.cjs
node tools/test-radio-firefox.cjs
```

The Firefox harness uses Playwright. `PLAYWRIGHT_MODULE_PATH` and `FIREFOX_PATH`
can point to an existing test installation. It plays each real MP3, checks
decoded duration and the playback-start event, then seeks near the end and
waits for the real completion event. System speech synthesis is forbidden in
that test. The unit/integration tests additionally cover every quiz's play
counter, failures, stop/replay, stale callbacks, changed content and tempo.

Release checks on 2026-11-11: Firefox decoded and played all 193 unique files
through the end (194 exercise mappings), with zero calls to system speech
synthesis. The focused audio/guide suite passed 76 checks. The wider suite's
23 existing failures were reproduced on the unchanged `d3202b3` baseline.
Firefox was tested on Windows; the user's MacBook was not directly accessible.
