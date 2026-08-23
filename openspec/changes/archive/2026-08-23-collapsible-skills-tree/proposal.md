# Skills Tree: Collapsible Categories

## Why

The tree renders 28 leaves at once. Letting visitors collapse categories turns the printed transcript into a live file-manager session (ranger/nnn culture) and lets them focus on the branches they care about — while staying trivially reversible.

## What Changes

- Category directory lines become toggle controls: clicking a `dir/` line collapses or re-expands its subtree.
- A collapsed branch shows its directory line with a dimmed item-count suffix — e.g. `devops-tools/ (7)` — so nothing is silently hidden.
- The summary line counts only what is currently visible; the default state is fully expanded.
- Filtering precedence: an active `-P` query prunes the tree regardless of manual collapse states, and clearing the filter restores those manual states untouched.
- Hover selection on directory lines matches the site's row-hover language.
- A site favicon ships as `app/icon.svg`: a shell-prompt glyph (`>_`) in brand teal on a sharp-cornered dark tile matching the terminal palette, replacing the default Next.js favicon.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `terminal-ui`: adds requirements for interactive branch collapsing and the terminal favicon, and extends the existing prune-style filtering requirement with collapse-precedence behavior.

## Impact

- `components/skills.tsx` — collapsed-state set, row click handlers, count suffixes, visibility-aware summary.
- `app/icon.svg` — new file-based metadata icon.
- No data changes.
