## Context

`components/skills.tsx` derives static `allBranches` from `skills.json`, flattens them into a `Row[]` (dir + leaf lines with tree connectors) on every render, and renders each row as a `<p>` inside the `Pane`. The only state is the `-P` filter query; pruning happens in a `useMemo`. The site ships Next.js's default `app/favicon.ico`.

See proposal.md for motivation; see specs/terminal-ui/spec.md for requirements.

## Goals / Non-Goals

**Goals:**
- Per-category collapse state that survives filtering round-trips untouched.
- Visible-only summary counting, dimmed count suffix on collapsed dirs.
- Row-hover interaction consistent with existing components (`hover:text-brand` + `transition-colors` language).
- Replace framework-default favicon via file-based metadata icon.

**Non-Goals:**
- Persisting collapse state across reloads or sharing it via URL.
- Collapsing individual skills, nested sub-categories, or animations.
- Changing the skills data model.

## Decisions

- **Collapse state = `Set<string>` of collapsed dir names in component state.** Toggle adds/removes the dir key; leaf rendering skips leaves of collapsed branches when no query is active.
  - *Alternative considered:* storing an explicit expanded set — same thing inverted; collapsed-set keeps default (fully expanded) as the zero value.
- **Filter overrides collapse at render time, not by mutating state.** When `q` is non-empty, the pruned branch list renders fully expanded and collapse states are simply not consulted; the `Set` is left untouched, so clearing the query restores manual states exactly. No sync effects needed.
  - *Alternative considered:* clearing/resetting collapse sets on query change — would destroy manual states and needs effect coordination.
- **Dir lines become real `<button type="button">` elements** (block-level, `text-left`) so toggling is keyboard-accessible for free; connector span stays outside the button hit area. Hover follows the site's row language: `cursor-pointer transition-colors hover:text-brand`.
  - *Alternative considered:* clickable `<p role="button">` — requires manual keyboard handling.
- **Count suffix rendered inside the collapsed dir line** as a separate `<span className='text-muted-foreground'>` after the name (`dir/ (7)`), dimmed relative to the dir color; hidden while expanded or filtered.
- **Summary counts rendered rows only:** compute visible leaf total from what is actually displayed (respecting both pruning and collapsing). Branch count likewise reflects rendered branches.
- **Favicon via `app/icon.svg`** (Next.js file-convention metadata icon): sharp-cornered rect filled with the dark background tone (`hsl(220 14% 6%)` ≈ `#0d0f11`), `>_` glyph stroked in brand teal (`hsl(173 70% 48%)` ≈ `#25d0bc`). Delete `app/favicon.ico` so no framework-default icon remains; no metadata changes needed since file-based icons are auto-wired.

## Risks / Trade-offs

- [Collapsed subtree hides non-matching context during filtering] → Filtering already ignores collapse entirely; suffix count only shows in unfiltered view.
- [`app/icon.svg` alone means browsers without SVG-icon support get no `.ico`] → Modern browsers (Chrome, Firefox, Safari ≥ 15+) all support SVG favicons; acceptable for this site.
- [Click target includes trailing whitespace of the dir line] → Keep the button inline to the label width to avoid surprise hit areas on wide rows.

## Migration Plan

Single client-component edit plus adding `app/icon.svg` and deleting `app/favicon.ico`; deploy is atomic with any release. Rollback = revert the commit.

## Open Questions

(none)
