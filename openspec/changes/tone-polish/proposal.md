# Proposal: tone-polish

## Why

The profile portrait renders as a neutral grayscale photo inside an otherwise fully themed terminal interface — it reads as "unstyled" next to the teal-on-dark design. Separately, the light theme's paper background (`97%` luminosity) is bright to the point of feeling sterile; the owner wants a denser paper.

## What Changes

- Render the home profile portrait as a brand duotone: grayscale image blended over a teal gradient so shadows take deep teal and highlights stay bright (CSS `mix-blend-mode: screen` — the source image is untouched, maximizing recognizability).
- Widen the portrait pane from 150px to 192px for more presence.
- Darken the light theme: `--background` 40 20% 97% → 94%, `--muted` 92% → 89%; all other light tokens unchanged so card/popover layering keeps its contrast steps.
- No dictionary, routing, or data changes.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `terminal-ui`: ADDED requirement "Duotone profile portrait"; MODIFIED requirement "Theme-aware terminal palette" with a denser light-paper scenario.

## Impact

- `components/intro.tsx` — wrapper classes + pane width.
- `app/globals.css` — `.duotone` utility in components layer; two light-theme token values.
- Main specs updated at archive time via this change's deltas.
