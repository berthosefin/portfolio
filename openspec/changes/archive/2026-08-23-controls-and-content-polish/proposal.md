# Proposal: controls-and-content-polish

## Why

Three friction points emerged from real use. First, the Keybindings Overview markdown table in the dots project renders completely unstyled because the site's hand-rolled `.prose` styles cover headings, links, code, and blockquotes but nothing for tables — any future README containing a table would break the same way. Second, the header switchers show only one option at a time (the target locale code; a single cycling theme icon), which hides the available choices and flashes during hydration-adjacent re-renders. Third, keeping parallel `data/projects/en/` and `data/projects/fr/` directories duplicates every project body just to localize a one-line summary — directly contradicting the owner's future workflow of pasting a new project README and moving on.

## What Changes

- Add TUI-styled table styles to `.prose` (borders, header row, cell padding) so any markdown table renders correctly with no per-table work.
- Redesign both header switchers as dual-option controls in terminal style: both options always visible, active option bracketed and brand-colored (`[fr]`) / full-color (icons), non-clickable; inactive option is muted, hover-brand, and clickable. Applies to the locale switcher (`fr`/`en`) and replaces the single cycling theme toggle with two discrete icons (moon = dark, sun = light).
- Consolidate project storage to one file per project: `data/projects/<slug>.mdx` carries `summary` (English), `summaryFr`, and all other frontmatter once; the body stays English-only permanently (decision recorded with user). Removes the `en/`/`fr/` split and the `{/* TODO(i18n v2) */}` markers.
- Update specs to match: localized project entries become bilingual-metadata + permanent-English-body; language switcher parity gains dual-display semantics.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `content-localization`: MODIFIED "Localized project entries" (single-file bilingual metadata, bodies permanently English, documented add-a-project workflow) and MODIFIED "Language switcher parity" (dual options displayed, bracketed active state, active not actionable).
- `terminal-ui`: ADDED "Dual-state header switchers" covering the visual treatment shared by locale and theme controls; ADDED scenario-level table rendering under prose content styling.

## Impact

- `app/globals.css` — new `.prose` table rules.
- `components/locale-switcher.tsx`, `components/theme-toggle.tsx` — rewritten as dual-state controls; `Header` wiring unchanged.
- `lib/projects.ts` — reads single-directory files, picks summary by locale.
- `data/projects/**` — files merged six times (mechanical), `en/`+`fr/` directories removed.
- Main specs updated at archive time via this change's deltas; no dictionary changes needed.
