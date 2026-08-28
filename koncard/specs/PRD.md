# PRD.md — KONCARD Product Requirements

## 1. Product overview
KONCARD (কোন কার্ড?) is a static, single-purpose web tool that helps a person in Bangladesh find a credit card matching their stated preferences, via a short quiz. It does not process applications, store personal data server-side, or claim affiliation with any bank.

## 2. Problem statement
Bangladesh has 40+ card-issuing banks/NBFIs. There is no plain-language way for a prospective cardholder to get matched to one card without reading a comparison table built for someone who already understands banking terminology. Existing local tools (cardcompare.bd, creditcard.bd) are compare-tables — they don't recommend a single card from a quiz.

## 3. Goals & success metrics
- **Current phase goal:** a small, fully-verified card dataset and a working quiz that recommends from it. This is not yet a growth or revenue phase.
- **Success for this phase:** every card in `data/cards.json` has its `features` checked against the issuing bank's own official page, with the source link and check date recorded.
- **Explicitly deferred:** traffic, conversion rate, revenue. No monetization model is confirmed (see §7).

## 4. Target personas
- A prospective Bangladeshi cardholder comparing options who doesn't want to read six separate bank pages.
- Not currently aimed at existing cardholders looking to switch cards (no current-card comparison feature exists).

## 5. User scenarios
- User lands on the homepage, starts the quiz, answers 4 questions, receives one top match plus up to 4 alternates, and can open full detail + the official bank source for any card.
- User skips the quiz and browses/searches the 6-card directory directly.

## 6. Features by priority

**P0 — built:**
- 4-question quiz (spend focus, benefit priority, international need, lounge importance)
- Weighted tag-matching scoring, ranked results
- Result page: top match + up to 4 alternates, "why this card" reasoning
- Card directory with search + bank filter
- Card detail page with features, verification badge, official source link, apply link
- Methodology, About, Privacy, Terms pages
- Per-card verified/unverified badge shown to the end user

**P1 — not built:**
- Real `annual_fee` / `interest_rate` / `income_min` values (currently `null` for all cards, intentionally)
- Income-based quiz question, re-added only once income data exists
- Expansion past the current 6 cards

**P2 — not built, may never be:**
- Bank partnership / referral monetization
- Analytics or lead capture
- Bengali-language UI
- User accounts

## 7. Explicitly OUT OF SCOPE

This section is absolute. Nothing here gets implemented, stubbed, or prepared for "just in case."

- **Any fee, interest rate, or income-eligibility number not independently checked against the issuing bank's current official Schedule of Charges.** The dataset intentionally leaves these fields `null`. Do not fill them from memory, from a third-party aggregator (cardcompare.bd, creditcard.bd, or similar), or from an old research document, without doing the actual check first.
- **Any monetization mechanism** — referral fees, lead-gen, ads. No confirmed bank partnership or affiliate program exists in Bangladesh for this category as of this build. Do not build payment or lead-capture infrastructure speculatively.
- **User accounts, login, or server-side storage of any kind.**
- **Analytics or lead-capture tooling.**
- **Bengali-language UI** (English-only for this phase).
- **Expansion beyond the current 6 cards** until a repeatable verification process is documented and followed (see `IMPLEMENTATION_PLAN.md`).
