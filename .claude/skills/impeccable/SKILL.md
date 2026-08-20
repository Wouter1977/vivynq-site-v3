---
name: impeccable
description: Design-taste checklist to apply whenever building or editing UI in this project — typography, spacing rhythm, color restraint, hierarchy, and motion. Use before calling any UI work on this site "done," not just for one-off artifacts.
---

# Impeccable

A short list of taste checks to run against any UI change in this repo
(components, pages, sections) before considering it finished. This is about
polish and restraint, not new features.

## Typography

- One display/heading typeface, one body typeface — never more than two
  families on a page.
- Use a real type scale (e.g. the project's Tailwind `@theme` sizes), not
  one-off arbitrary `text-[17px]` values.
- Line length for body text stays readable (~50–75 characters); line-height
  loosens as size shrinks.

## Spacing & rhythm

- Whitespace is a design tool, not leftover space — err on the side of more
  room around hero/section content.
- Reuse a small spacing scale consistently; don't invent a new gap value per
  component.
- Vertical rhythm between sections should feel intentional and consistent
  down the page, not ad hoc per section.

## Color

- Restrain the palette: one primary, a couple of accents, and neutrals for
  everything else. If a change introduces a new color, ask whether an
  existing token already covers it.
- Contrast must hold up (body text on background, text on buttons) — check
  this, don't eyeball it.
- Dark/light consistency: if the site supports both, verify the change in
  both before calling it done.

## Hierarchy

- Every screen/section should have one obvious focal point. If everything
  is bold/colored/animated, nothing is.
- Buttons: one primary action per view stands out; secondary actions are
  visually quieter.

## Motion

- Motion (this project uses GSAP/Framer Motion/Lenis) should support
  reading order, not decorate for its own sake — entrances, not gimmicks.
- Keep it fast and interruptible; avoid motion that blocks the user from
  reaching content.

## Before calling it done

Actually look at the rendered page (see the `playwright-cli` skill) at
mobile and desktop widths. A change that only looks right in code is not
done.
