---
name: taste-skill
description: Anti-Slop design framework with 3 dials — stops AI from making boring UIs
---

# Taste-Skill — Design Taste Framework

Configure 3 dials before generating any UI:

## DESIGN_VARIANCE (1-10)
Layout experimentalism. 1-3 = symmetric/centered. 4-7 = offset/overlapping. 8-10 = asymmetric/masonry.
**Rule:** When VARIANCE > 4, centered hero/H1 is BANNED. Use Split Screen or Asymmetric Whitespace.

## MOTION_INTENSITY (1-10)
Animation intensity. 1-3 = no motion. 4-7 = subtle hover/fade. 8-10 = scroll-triggered/parallax/spring.

## VISUAL_DENSITY (1-10)
1-4 = airy whitespace. 5-7 = balanced cards. 8-10 = dense/dashboard.

### Baseline: VARIANCE 8 / MOTION 6 / DENSITY 4

### Blog/Editorial → VARIANCE 6, MOTION 4, DENSITY 4

## Color Rules
- Never pure black (#000) backgrounds — tint with palette
- Text contrast ≥ 4.5:1 body, ≥ 3:1 large
- Prefer CSS custom properties over hardcoded values

## Output Rules
- Production-ready complete code — no "..." placeholders
- Every component: hover, focus, active, disabled states
- Mobile-first responsive: sm/md/lg/xl breakpoints
