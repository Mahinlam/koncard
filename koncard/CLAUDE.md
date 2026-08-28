# CLAUDE.md

Read this first, every session, before touching any file.

## What this project is
KONCARD — a static Bangladesh credit-card quiz-matcher. Full scope in `specs/PRD.md`.

## Non-negotiable rules
1. **Never** add or edit a card's `annual_fee`, `interest_rate`, or `income_min` from memory, from a third-party aggregator (`cardcompare.bd`, `creditcard.bd`, or similar), or from an old research document. Only an official bank Schedule of Charges or official product page counts as a source. Unconfirmed stays `null`.
2. **Never** mark a card `verified: true` unless its `features` array was checked line-by-line against `official_source` in this session or a prior one recorded in `progress.md`.
3. **No new dependency, framework, or build step** without first updating `specs/TECH_STACK.md`.
4. **No new page or user flow** without first updating `specs/APP_FLOW.md`.
5. Anything under `specs/PRD.md` §7 (Out of Scope) — don't build it, don't stub it, don't add a placeholder "for later."
6. Read `specs/PRD.md` → `specs/APP_FLOW.md` → `specs/TECH_STACK.md` before starting any new feature. Read `specs/IMPLEMENTATION_PLAN.md` before picking the next task.
7. Update `progress.md` at the end of every session — even a short one.

## Code style
Match what's already there: 2-space indent in JS, CSS custom properties for every color (no hardcoded hex outside `:root` in `css/style.css`), template literals for HTML generation in JS. Check `js/app.js` for existing conventions before adding to it.

## Test / run commands
Local: `python3 -m http.server 8000` from the project root, then open `localhost:8000`.
No automated test suite exists yet — this is a known gap, not a decision. See `specs/IMPLEMENTATION_PLAN.md` if adding one ever becomes a task.
