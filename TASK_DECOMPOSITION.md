# HW3: Resilient Landing Page

## Goal
Build a responsive event landing page with a UTC countdown and a safe, duplicate-proof RSVP form. Document three AI failure modes and how they were caught and corrected.

## Contracts
- Use semantic HTML, CSS, and vanilla JavaScript; no external dependencies.
- Countdown target is an ISO 8601 UTC timestamp ending in `Z`, supplied by the page's `<time datetime>` value. Invalid or elapsed targets show a clear ended/unavailable state.
- Form states are `idle -> submitting -> success | error`; only one submission can be in flight.
- Validate and trim user values. Never inject user input as HTML; use text nodes / `textContent` for any reflected content.
- Keep the page usable by keyboard and at 375px width, with no horizontal overflow.

## Work Breakdown Structure

| Slice | Deliverable | Contract / verification |
| --- | --- | --- |
| S0 | Semantic page shell, landmarks, labeled RSVP form | One `<h1>`, skip link, visible labels, no generic layout-only `<div>` elements |
| S1 | Drift-resistant UTC countdown | Parse ISO 8601 UTC target; derive remaining time from `Date.now()` on each tick, not accumulated intervals |
| S2 | RSVP form state machine | Idle, submitting, success, and error states are visibly communicated and announced accessibly |
| S3 | Duplicate-submit protection and safe input handling | Lock during submission; trim and validate; never use `innerHTML` with user data |
| S4 | `AI_FAILURE_AUDIT.md` | Three defects, each with diagnostic method and corrected solution |

## Commit Plan
1. `docs(spec): define HW3 slices and contracts`
2. `feat(html): add semantic event landing page`
3. `feat(css): style responsive landing page`
4. `feat(js): add drift-free UTC countdown`
5. `feat(js): model RSVP form states`
6. `fix(security): prevent duplicate submits and unsafe input rendering`
7. `docs(audit): record reviewed AI failure modes`

Each commit stays focused on one deliverable. No remote push is part of this plan.
