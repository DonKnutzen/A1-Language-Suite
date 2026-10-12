# Bug reports

## One-time activation

Run `shared/bug-reports.sql` in the existing Supabase project's SQL Editor.
The script grants the existing unique `Phillip` profile access to all reports.
If the profile name differs, replace `phillip` in the administrator block first.
It never uses a service key in the browser. Client accounts cannot grant administrator privileges.

## Submit and review

The **Fehler melden / Signaler un problème / Report a problem** button appears
on the course selector and every French/German course page. It opens a small
text dialog; phone keyboard dictation works in the same text field.
Reporting requires an existing cloud profile. Failed submissions retain their local draft.
The learner's answers, recordings, PIN, email and authentication tokens are not captured.

Reports are stored in **Supabase → public.bug_reports**, independently of course
progress and resets. Learners can see their own reports. The administrator can
see all reports through **Fehler melden → Meldungen** and mark them resolved.
The export contains up to 200 newest reports, including their UUID and context.

## Workflow for Codex

Ask Phillip for **a1-bug-reports.json**, exported from that overview, and read it.
Do not claim direct access to private reports without an authenticated session or an export.
Match `context.course`, `lessonId`, `step`, `grammarIndex`, `grammarTitle`,
`question`, `options`, `position` and `actions` to the relevant source.
Schema 2 also includes `taskTexts` (reading/form/task text), `formFields`,
`audioTexts`, `exerciseKey` and `capturedAt`. Context is frozen when the dialog opens.
The overview exposes this content under **Aufgabeninhalt**; typed learner answers remain excluded.
Older reports cannot retroactively recover missing context.
`assets` records the actual loaded asset versions for stale-cache diagnosis.
French source: `francais/lesson-flow.js`, `lesson1-practice.js`, `mastery.js`,
`mastery-specs.js`, `data.js`, `app.js`.
German source: `deutsch/lesson-flow.js`, `grammar-drills.js`, `assessments.js`,
`lesson-content.js`, `app.js`.
Shared UI issues: `shared/bug-reports.js` and `shared/profile.js`.
Use the report UUID in fixes to make the connection explicit.

Checks: `node --test tests/bug-reports.test.cjs`.

When reviewing an export, group reports by reporter and task. Summarize the
reported problem, the exact location and proposed change, distinguishing suggestions
from verified bugs. Preserve report UUIDs. Present concrete implementation instructions
to Phillip, then implement and push only the changes he authorizes.

The report dialog previews the frozen question and answer choices. Optional quick
buttons select `issueType` (`question`, `answers`, `both`); clicking again clears it.
A selection can be submitted without a description. Free text alone still works.
Both category and draft text survive failed submissions. `context.description`
keeps the original description separate from the localized summary in `message`.
