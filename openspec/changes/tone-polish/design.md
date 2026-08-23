# Design: tone-polish

## Context

Follow-up visual polish after the i18n and controls work. Three small, independent tweaks sharing one goal: make every surface speak the terminal theme.

## Goals / Non-Goals

- Goals: teal duotone portrait, larger portrait pane, denser light paper.
- Non-Goals: ASCII/ASCII-toggle variants of the portrait (explored and set aside — recognition wins); dark theme token changes; new dependencies.

## Decisions

### D1 — Duotone via CSS blend, not a generated asset

Explored ASCII/blocks conversions (real PIL previews at 46–64 cols); rejected: below ~64 columns likeness collapses, and a wider pane changes the home layout for a gimmick. Chosen recipe keeps the photograph:

```css
.duotone {
  @apply relative overflow-hidden;
  background: linear-gradient(160deg, hsl(var(--brand)) 0%, hsl(var(--brand) / 55%) 100%);
}
.duotone img {
  filter: grayscale(100%) contrast(1.1) brightness(1.05);
  mix-blend-mode: screen;
}
```

`screen` maps black → container color (deep teal), white stays white; midtones pick up teal proportionally. Works identically in both themes because the image carries its own palette. Applied in `intro.tsx` by wrapping the `Image` in a `.duotone` div. Fallback: if blending ever misrenders, the image still shows as grayscale (progressive enhancement semantics).

### D2 — Pane width 150px → 192px

`Image` width/height props move from 150 to 192 (`w-48` footprint). The pane already centers itself (`mx-auto w-fit`); no other layout coupling. Alt text unchanged.

### D3 — Light tokens stepped down together

```
--background: 40 20% 97%  →  40 20% 94%
--muted:      40 12% 92%  →  40 12% 89%
```

Both step by the same 3% so muted surfaces keep their current contrast offset above the page. Cards/popovers stay at 99% — they now pop slightly more against the denser paper. Borders (84%) sit between muted and card, hierarchy preserved.

## Risks / Trade-offs

- D1 relies on `mix-blend-mode: screen` support — universal in evergreen browsers; degradation path is plain grayscale.
- D3 shifts every light-mode surface by eye-feel only; if 94% reads too dark in daylight testing, single-token revert is trivial (design records intent, not permanence).

## Migration Plan

Single small commit-sized change; build + eyeball both themes on `/`, plus light-mode sweep over one inner page (skills) for token sanity.

## Open Questions

(none)
