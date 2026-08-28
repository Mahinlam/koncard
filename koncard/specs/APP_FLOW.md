# APP_FLOW.md — Navigation & Screen Inventory

## Entry points
- Direct URL / homepage (`index.html`)
- Deep link to a specific card (`card.html?id=<card-id>`)

## Screen inventory

| Page | Route | Purpose |
|---|---|---|
| Home | `index.html` | Pitch + entry point to the quiz |
| Quiz | `quiz.html` | 4-question matcher |
| Result | `result.html` | Top match + up to 4 alternates |
| Cards directory | `cards.html` | Search/filter all cards |
| Card detail | `card.html?id=<id>` | Full feature list, official source, apply link |
| Methodology | `methodology.html` | Scoring explanation; documents why there's no income question yet |
| About | `about.html` | What KONCARD is / isn't |
| Privacy | `privacy.html` | localStorage-only data note |
| Terms | `terms.html` | Informational-only disclaimer |

## Happy path
Home → Start quiz → Q1 (spend) → Q2 (benefit) → Q3 (international) → Q4 (lounge) → Result → optionally view an alternate → Card detail → official bank link (external, opens in new tab).

## Navigation tree
```
Home
 ├─ Quiz → Result → Card detail
 ├─ Cards directory → Card detail
 ├─ Methodology
 ├─ About
 ├─ Privacy
 └─ Terms
```

## Edge cases / error states (already implemented)
- Result page loaded with no stored quiz answers (empty `localStorage`) → redirects to `quiz.html`.
- Card detail page loaded with an `id` not present in `cards.json` → shows a "Card not found" empty state.
- Cards directory search/filter returns nothing → shows a "No cards match your filters" empty state.

## Responsive behavior
Below 900px: hero grid, result grid, and detail grid collapse to a single column; top-nav links (`.navlinks`) are hidden.

**Known gap:** a `.menu` button class exists in the CSS for a mobile menu, but no click handler or dropdown is wired — nav links simply disappear below 900px with nothing to replace them. Tracked in `IMPLEMENTATION_PLAN.md`.
