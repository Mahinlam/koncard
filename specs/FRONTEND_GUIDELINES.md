# FRONTEND_GUIDELINES.md — Design System & UI Tokens

## Color tokens
Pulled directly from `css/style.css` `:root`. These are the only colors that should appear anywhere in the site — no new hardcoded hex values outside this list without updating this file first.

| Token | Hex | Use |
|---|---|---|
| `--green` | `#123f2e` | Primary dark green — nav CTA, dark sections, scorecard |
| `--green2` | `#1c6b4a` | Secondary/accent green — links, hover states, progress bar |
| `--mint` | `#e9f2ec` | Light surface — tag backgrounds, option hover/selected |
| `--cream` | `#f6f8f5` | Page background |
| `--ink` | `#10261d` | Primary text |
| `--muted` | `#68756e` | Secondary/caption text |
| `--line` | `#e1e8e3` | Borders, dividers |
| `--white` | `#fff` | Surfaces, secondary button background |
| `--gold` | `#d7b35d` | Accent — score bar fill, mock-card chip |

## Typography
- Font family: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` (see `TECH_STACK.md` — no hosted Inter file pinned yet).
- Hero `h1`: 72px desktop → 56px ≤900px → 44px ≤560px, letter-spacing -4px to -2.5px.
- Section `h2`: 40px desktop → 32px ≤560px.
- Body line-height: 1.55.

## Layout
- Container: max-width 1180px, 24px side padding.
- Breakpoints: **900px** (grids collapse to single column, nav links hidden), **560px** (further size reductions, footer stacks).
- Cards/panels: 18–22px border-radius, `1px solid var(--line)` border, `box-shadow: 0 10px 30px rgba(18,63,46,.04)` on panels.

## Components in use
- `.btn.primary` / `.btn.secondary` — primary (dark green fill) and secondary (white + border) buttons.
- `.panel` — white card container, used for steps, stats, notices.
- `.option` — quiz answer button, `.selected` state = green border + mint background.
- `.carditem` — card list entry (directory + result alternates).
- `.verify` badge — green "✓ Official source" or red-tinted "Verification pending."
- `.notice` — pale yellow disclaimer box.

## Accessibility
Not yet audited against WCAG 2.1 AA. Known gap: the `.menu` mobile-nav button exists in CSS with no functioning toggle — see `APP_FLOW.md` and `IMPLEMENTATION_PLAN.md`.
