# AI Failure Audit

This audit follows the HW3 requirement on slide 25: document three defects, how review found them, and the corrected implementation. Findings below come from the repository history and review of the current files. A commit shows where a defect entered the code; it does not by itself prove who or what authored it.

## 1. Countdown engine deleted while adding timestamp validation

- **Defect:** Commit `ae62ac0` is titled `fix(timer): require valid UTC ISO 8601 target`, but its diff deletes all 54 lines of `countdown.js` and adds no validation or replacement. The countdown therefore stops working after that change.
- **Diagnostic method:** Inspect `git show ae62ac0` and compare the parent revision. The diff makes the scope mismatch visible: the timer implementation is removed entirely.
- **Refactored solution:** The current countdown in `app.js` checks for a UTC timestamp ending in `Z`, derives the remaining time from `Date.now()` on each tick, and clears its interval when the event starts. This avoids accumulated interval drift and keeps the timer behavior in place while handling invalid or elapsed targets.

## 2. RSVP reported success without sending or storing anything

- **Defect:** Commit `b9c416a` adds a form handler that moves to `success` after a 250 ms `setTimeout`. No request is sent and no RSVP is stored, so the success state can be mistaken for a completed RSVP.
- **Diagnostic method:** Trace the submit handler in `git show b9c416a:form.js`. The timeout is the only path to success; there is no network call or persistence.
- **Refactored solution:** The current handler in `app.js` enters `success` only after a configured endpoint responds successfully. It shows an explicit error when no endpoint is configured or a request fails.

## 3. Landmark change replaced unrelated working page code

- **Defect:** Commit `5943cb8` (`feat(html): semantic landmark tree`) replaced most of `index.html` and deleted `style.css` and `form.js`. The rewrite removed the prior countdown and RSVP element IDs and their script references along with unrelated presentation and behavior, although the commit was scoped to semantic HTML.
- **Diagnostic method:** Review `git show --stat 5943cb8` and compare the before-and-after `index.html`. The removed files and selectors show that this change crossed the HTML slice boundary and broke integration points.
- **Refactored solution:** The later commits restore the stylesheet and connect `app.js` to the page. Keep future semantic edits scoped to landmark markup and confirm referenced IDs and asset links still match their consumers in the diff.
