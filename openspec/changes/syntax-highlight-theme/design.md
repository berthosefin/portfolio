# Design: syntax-highlight-theme

## Context

Sugar-high inlines `style="color: var(--sh-<type>)"` on token spans and ships no stylesheet; the README instructs hosts to define the variables globally. The portfolio never did, so tokens fall back to inherited color (dark: readable but flat) or fail to resolve entirely (light: invisible per user report). Verified empirically: zero `--sh-` definitions in served CSS and HTML, both prod and dev.

## Goals / Non-Goals

- Goals: legible, theme-following syntax colors for every token type sugar-high emits.
- Non-Goals: switching highlighter libraries; line numbers (`.sh__line::before` counters — deferred); highlighting outside MDX prose.

## Decisions

### D1 — Define palettes inline in globals.css, not a separate stylesheet

Two small blocks (`:root` and `.dark`) colocated with the rest of the theme tokens. A separate `sugar-high.css` import adds indirection for ~20 lines. Token types to cover (all emitted by sugar-high): `class`, `identifier`, `sign`, `property`, `entity`, `jsxliterals`, `string`, `keyword`, `comment`, plus `space`/`break` which need nothing.

### D2 — Brand-aligned values

```
token        light (:root)              dark (.dark)
class        #2d5e9d → teal-leaning     brightened steel blue
identifier   near-foreground ink        terminal foreground
sign         muted-foreground           mid gray
property     deeper blue                soft blue
entity       brand teal dark            brand teal light
jsxliterals  violet (rarely hit in sh)  violet light
string       brand teal                 vivid teal
keyword      rust red                   coral red
comment      faded gray italic          faded gray italic
```

Exact hexes picked at apply time against real contrast on `--muted` block backgrounds; strings/entities anchor to `hsl(var(--brand))` so future accent changes propagate.

### D3 — Italic comments via one extra rule

`.prose pre .sh__token--comment { font-style: italic }` alongside the variable blocks — matches terminal convention, costs one rule.

## Risks / Trade-offs

- Hex literals instead of `hsl(var(--…))` everywhere: sugar-high palettes are plain colors; mixing is fine but only brand-anchored entries auto-track accent changes.
- Bash blocks barely exercise keyword/string variety — palette correctness is verified visually against the dots install block plus any MDX block containing strings/comments.

## Migration Plan

CSS-only addition; build + eyeball `/projects/dots` in both themes.

## Open Questions

(none)
