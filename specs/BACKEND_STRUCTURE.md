# BACKEND_STRUCTURE.md — Data Contract

## No live backend
KONCARD is a static site. There is no server, no database, no API in the conventional sense. "Backend structure" here means the one data contract the site depends on: `data/cards.json`.

## `cards.json` schema
An array of card objects. Each object:

| Field | Type | Notes |
|---|---|---|
| `id` | string | Unique, kebab-case |
| `bank` | string | Issuing bank's full name |
| `name` | string | Card product name |
| `network` | string | e.g. "Visa", "Visa / ShareTrip" |
| `annual_fee` | number \| `null` | `null` = not yet verified against the bank's official Schedule of Charges — never guess this |
| `interest_rate` | number \| `null` | Same rule as `annual_fee` |
| `income_min` | number \| `null` | Same rule. Currently `null` for every card — this is why no quiz question uses it yet |
| `verified` | boolean | Whether `features` below were checked against `official_source` |
| `verified_date` | string | `YYYY-MM-DD` |
| `official_source` | string (URL) | The bank's own product page or SOC document |
| `application_url` | string (URL) | Where a user would actually apply |
| `features` | string[] | Only facts confirmed on `official_source` — no inferred or aggregator-sourced claims |
| `tags` | string[] | Used by the quiz's scoring function. These ARE editorial/heuristic — not verified facts, and should not be presented to the user as confirmed bank data |

## Current verification status (as of this build)
6/6 cards have `verified: true` for their `features` field. 2 of the 6 (BRAC Cashback, EBL Platinum) were independently re-checked against the bank's live page in this session and matched exactly. `annual_fee`, `interest_rate`, and `income_min` are `null` for all 6 cards — intentional, not an oversight.

## Client-side state
- `localStorage` key `koncard_answers` — the user's quiz answers.
- `localStorage` key `koncard_results` — the scored, sorted card list for the result page.
- No cookies, no server session, no accounts, nothing sent off the user's device.
