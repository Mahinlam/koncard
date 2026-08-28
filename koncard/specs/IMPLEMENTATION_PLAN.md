# IMPLEMENTATION_PLAN.md — Sequential Build Roadmap

Tasks in priority order. Each has a success criterion a human can check without re-reading the whole codebase.

---

## Task 1 — Verify `annual_fee` + `interest_rate` for the current 6 cards
- **Source rule:** each bank's own official Schedule of Charges (SOC) page or PDF. Not `cardcompare.bd`, not `creditcard.bd`, not memory.
- **Known blocker:** EBL's SOC PDF was a scanned image as of Aug 2026 — no extractable text. May need manual reading or an OCR step before this task can close for EBL cards.
- **Success:** `annual_fee` and `interest_rate` are non-`null` for all 6 cards in `data/cards.json`, and `official_source` points at the actual SOC if it lives at a different URL than the product page used for `features`.

## Task 2 — Decide `income_min` sourcing
- Income eligibility is often not published in a simple table; may require reading full SOC/terms documents per card, not just the marketing page.
- **Success:** every card's `income_min` is either a real verified number, or explicitly documented in this file as "bank does not publish this" — not silently left blank with no note either way.

## Task 3 — Re-add the income quiz question
- **Blocked by Task 2.** Do not re-add the question until a majority of cards have real `income_min` values — an unused or under-supported question is the exact bug that was already fixed once.
- **Success:** `quiz.html` has a 5th question, `js/app.js` `scoreCard()` actually reads `a.income` and weighs it, and the "why there's no income question" section in `methodology.html` is removed or updated to reflect the change.

## Task 4 — Expand past 6 cards
- **Blocked by** a working verification habit from Tasks 1–2 — don't scale a process that isn't proven yet.
- **Success:** every new card follows the exact schema in `BACKEND_STRUCTURE.md`, has `verified: true` only when `features` were actually checked, and `null` (never guessed) fee fields until confirmed.

## Task 5 — Fix or remove the mobile nav menu
- `.menu` button class exists in `css/style.css` with no click handler or dropdown wired. Nav links currently just disappear below 900px.
- **Success:** either a working toggle that reveals the nav links on mobile, or the `.menu` class and its CSS removed if a mobile menu isn't being built this cycle.

## Task 6 — Resolve monetization before any growth work
- No confirmed bank referral/affiliate program exists in Bangladesh for this card category as of Aug 2026 (checked directly, unconfirmed).
- **Success:** either a documented outcome from direct bank outreach ("Bank X will pay per approved referral"), or an explicit, written decision to run this as a free tool with no revenue model — before time goes into SEO, content, or marketing features.
