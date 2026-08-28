# progress.md

## 2026-08-27 — Initial verified build
- Built a 6-card dataset (`data/cards.json`), replacing an earlier 20-card draft that was 19/20 unverified.
- 2 of 6 cards independently re-checked against official bank pages this session (BRAC Cashback, EBL Platinum) — both matched exactly.
- All 6 cards: `features` verified; `annual_fee`/`interest_rate`/`income_min` intentionally `null` (not yet checked).
- Built all 9 pages (index, quiz, result, cards, card, methodology, about, privacy, terms), `css/style.css`, `js/app.js`.
- Fixed a real bug from an earlier draft: the quiz asked an income question that `scoreCard()` never read, and no card had `income_min` data anyway. Removed the question rather than fake the logic; documented why in `methodology.html`.
- Validated: all HTML pages link `css`/`js` correctly, all internal nav links resolve, `cards.json` has no missing fields, a local server serves every asset with 200.

## 2026-08-27 — Retrofitting the spec framework
- The site was already built before this six-document framework was introduced. `specs/` describes the site as it actually exists — it is not a fresh redesign.
- Six canonical docs + this file + `CLAUDE.md` written to lock the current state and define real next steps.

## Next steps (see `specs/IMPLEMENTATION_PLAN.md` for full detail)
1. Verify `annual_fee` + `interest_rate` for the 6 cards against official SOCs (EBL's SOC is a scanned-image PDF — may need manual reading).
2. Decide `income_min` sourcing approach per card.
3. Re-add the income quiz question — only after (2).
4. Expand past 6 cards, using the same verify-first process.
5. Fix or remove the non-functional mobile nav menu button.
6. Resolve the monetization question (no confirmed BD bank referral program exists) before any growth/marketing work.

## Known gaps / decisions not yet made
- No monetization model confirmed.
- No automated tests.
- No Bengali-language UI (explicitly out of scope for this phase — see `specs/PRD.md` §7).
