# Proposal: syntax-highlight-theme

## Why

Sugar-high (the MDX code highlighter) emits token colors as `var(--sh-*)` custom properties and expects the host site to define them. The portfolio defines none: in dark mode code blocks render as monochrome inherited gray, and in light mode the unresolved variables make block content effectively invisible on the paper background — the install command on `/projects/dots` cannot be read.

## What Changes

- Define both `--sh-*` token palettes in `app/globals.css`: one under `:root` tuned for the light paper theme, one under `.dark` tuned for the terminal theme, using the existing brand teal for strings and keeping identifiers near-foreground.
- No changes to components, MDX pipeline, or dependencies.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `terminal-ui`: ADDED requirement "Theme-aware code highlighting".

## Impact

- `app/globals.css` only (~20 lines of token definitions).
- Main specs updated at archive time via this change's deltas.
- Line-number support (`.sh__line::before` counters) is explicitly out of scope.
