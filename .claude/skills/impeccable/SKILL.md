---
name: impeccable
description: Production-grade frontend polish — audit, critique, typeset, layout, harden, animate
---

# Impeccable — Frontend Polish Skill

## Commands

### `audit [target]` — Evaluate
Technical quality check: accessibility, performance, responsive, AI Slop Test. Structured report.

### `critique [target]` — Evaluate
Experiential design feedback: visual hierarchy, emotional impact, brand alignment.

### `polish [target]` — Refine
Final quality pass: typeset + colorize + layout + AI Slop Test + ship-readiness verdict.

### `typeset [target]` — Enhance
Typography repair:
- Font selection: avoid default Inter/Roboto without rationale
- Modular type scale (not arbitrary px sizes)
- Weight contrast: body vs heading vs label
- Line-height optimal 60-75 chars; text-wrap: balance on h1-h3
- Pair fonts on contrast axis: serif+sans, geometric+humanist

### `layout [target]` — Enhance
Spacing, rhythm, visual hierarchy:
- Vary spacing — same padding everywhere = monotony
- Cards are lazy; only when truly needed; nested cards = always wrong
- Flexbox 1D, Grid 2D; prefer `repeat(auto-fit, minmax(280px, 1fr))`
- Semantic z-index: dropdown → sticky → modal → toast → tooltip. Never 999/9999.
- Group related, separate unrelated; clear grid baseline

### `harden [target]` — Refine
Strengthen completion: error states, loading states, edge cases, empty states.

### `animate [target]` — Enhance
Add purposeful motion: entrance, hover, layout-shift, attention.

### `delight [target]` — Enhance
Add one surprising, memorable detail that fits the brand.

## AI Slop Test
Flags: Inter/Roboto defaults, pure black backgrounds, centered-everything, identical card grids, blue-purple gradients, "Something went wrong" errors, 1.05 scale on every hover.

Verdict: Clean / Mild slop (1-2) / Heavy slop (3+ needs rework)
