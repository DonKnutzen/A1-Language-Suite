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
The list and export contain only open reports (up to 200 newest open reports), including their UUID and context.

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

Submissions have a 15-second deadline including session refresh. A timed-out auth
refresh cannot post later. The complete draft, frozen task context, category and UUID
are saved locally per profile before sending. **Gespeicherte Entwürfe** opens them
without a database request. Reopening reuses the UUID to avoid duplicate reports
when a server stored a report but its confirmation was lost. Older text/category
drafts can be recovered with their original question and lesson; missing historical
context is explicitly indicated. Nothing is automatically sent in the background.

The reporter is a non-modal corner panel: the page remains scrollable and usable.
Task details start collapsed, the textarea has two rows, and draft/list tools live
under the overflow menu. The header has one close control; closing preserves the draft.
The task context still belongs to the question shown when reporting was opened.

The mobile panel sits at the bottom over the navigation buttons, leaving more
of the exercise visible. The experimental browser dictation button and module
have been removed; reports use the normal text field.

On mobile the composer contracts to the textarea and send control while typing.
VisualViewport resize and scroll events anchor it above the on-screen keyboard;
focus, orientation and closing restore the normal panel. The French mobile header
now scrolls in normal flow instead of sticking during browser viewport panning.

Optional subcategories are stored in `context.issueReason` alongside `issueType`, task context and description. They also appear in the report message and JSON export. Changing the main category clears the previous subcategory; drafts preserve both selections. No database migration is needed because context is JSONB.
