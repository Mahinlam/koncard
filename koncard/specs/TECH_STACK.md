# TECH_STACK.md — Technology & Dependency Manifest

## Stack
- HTML5, vanilla CSS, vanilla JavaScript (ES6+).
- No framework, no build step, no bundler, no package manager.
- Data layer: a single static JSON file (`data/cards.json`), fetched client-side with the native `fetch()` API.
- No backend, no database, no server-side code of any kind.

## Hosting & deployment
- **Cloudflare Pages** (free tier).
  - Framework preset: **None**
  - Build command: **(empty)**
  - Output directory: **/** (repo root)
- Version control: **GitHub**, repo connected to the Cloudflare Pages project for auto-deploy on every push to the default branch.

## Local development
```
python3 -m http.server 8000
```
Run from the project root, then open `http://localhost:8000`. Opening `index.html` directly by double-click can fail — `fetch()` requires a server, not the `file://` protocol, in some browsers.

## Fonts
- `Inter`, falling back to the system stack: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- No hosted Inter font file is currently pinned — the system fallback stack is what actually renders today. If a hosted Inter file is added later, its exact CDN URL and version must be added here **before** it's added to any HTML file.

## Explicitly NOT in the stack
No React, Vue, Svelte, or any other JS framework. No CSS framework (Tailwind, Bootstrap). No analytics script. No server framework (Express, etc.). No test runner is configured yet.

**Rule:** nothing gets installed or imported unless it's declared in this file first.
