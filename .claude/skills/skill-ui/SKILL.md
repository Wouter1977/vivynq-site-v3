---
name: skill-ui
description: Pull the visual design language (colors, typography, spacing, layout patterns) from a reference site and translate it into this project's Tailwind setup. Use when the user shares a URL and asks to match, copy, or take inspiration from that site's look — never copy its text or images, only the design tokens and structure.
---

# Skill UI

Extract a reference site's design system and re-implement it natively in this
Next.js + Tailwind v4 project — never by copying markup, copy, or assets.

## When to use

The user gives a URL (or names a well-known site) and asks for this project
to look like it, feel like it, or borrow "the vibe" of it.

## Process

1. **Inspect the reference.** Use Playwright (see the `playwright-cli` skill
   for how the browser is already set up in this environment) to open the
   URL and capture:
   - A full-page screenshot for overall layout/rhythm.
   - Computed styles for key elements (body, headings, buttons, cards): font
     family/weight/size, color (as hex), line-height, border-radius, box-shadow,
     spacing (padding/margin/gap).
   - The page's `<head>` for font-face / Google Fonts links.
   Fall back to WebFetch if a full browser session isn't needed.

2. **Distill into tokens**, not pixel-for-pixel copies:
   - Color palette: 1 primary, 1–2 accents, neutrals/backgrounds.
   - Type scale: font family, and a small set of size/weight pairs for
     display/heading/body/caption.
   - Spacing/radius scale: the handful of values the site actually reuses.
   - Layout patterns: how hero sections, nav, and cards are structured
     (e.g. centered max-width column, big whitespace, asymmetric grid).

3. **Map tokens into this project.** This repo uses Tailwind v4's CSS-based
   theme config — check `src/**/globals.css` (or equivalent) for an
   `@theme` block and add/update tokens there rather than hand-rolling
   arbitrary values throughout components. Update fonts via `next/font` if a
   new typeface is needed.

4. **Apply incrementally.** Restyle one section/component at a time, run the
   dev server, and visually check each change (see `playwright-cli`) before
   moving to the next.

5. **Never copy content.** Do not lift the reference site's actual copy,
   images, icons, or code — only its visual design language. Flag to the
   user if the reference is a competitor or a site with obvious proprietary
   branding, so they can confirm this is just style inspiration.
