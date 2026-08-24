---
name: playwright-cli
description: Use Playwright to launch this project's dev server, navigate the changed pages, check for console/network errors, and visually verify UI changes — then fix what's broken before reporting work as done. Use after any change to src/ that affects rendered output.
---

# Playwright CLI

Claude checks its own work: after a UI/frontend change, actually load the
page and look, instead of trusting that the code compiles.

## When to use

After any change under `src/` that affects what renders — new/edited
component, page, layout, or style — before telling the user the change is
complete.

## Setup notes for this project

- Dev server: `npm run dev` (runs on port 3300 per `package.json`).
- No `@playwright/test` dependency is installed yet. For ad hoc checks,
  drive Playwright directly via a small Node script using the `playwright`
  package (install it as a dev dependency if missing), or use an available
  Playwright MCP/browser tool if one is configured for this session.
- If a pre-installed Chromium is available in this environment
  (`PLAYWRIGHT_BROWSERS_PATH` set), launch with that browser and do **not**
  run `playwright install` — it's already provided.

## Process

1. Start the dev server (`npm run dev`) if it isn't already running, and
   wait for it to be ready on `http://localhost:3300`.
2. Open the affected route(s) with Playwright.
3. Check, in order:
   - Page loads without a Next.js error overlay.
   - No errors/warnings in the browser console.
   - No failed network requests (404s on assets, failed API calls).
   - Take a screenshot at both a mobile width (~390px) and a desktop width
     (~1440px).
4. Compare the screenshot against what was intended. If something's off
   (layout broken, overlapping elements, missing styles, broken image),
   fix the code and re-check — don't just report the issue back.
5. Stop the dev server (or leave it running if the user is actively
   iterating) once the check is clean.
6. Only report the change as done after this loop is clean — if something
   can't be verified visually (e.g. requires auth/data you don't have),
   say so explicitly rather than claiming it works.
