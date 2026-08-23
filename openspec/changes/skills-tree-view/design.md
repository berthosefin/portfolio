# Design: skills-tree-view

## Context

`components/skills.tsx` (client) renders a grid of category Panes fed by `data/skills.json`; `app/skills/page.tsx` wraps it with a static PromptLine `tree ~/skills`. The command/rendering mismatch is the motivation (see proposal.md — Why).

## Goals / Non-Goals

- Goals: authentic `tree` output, native `-P` filter semantics, preserved featured/supporting distinction.
- Non-Goals: no changes to home featured-skills, no fake `.md` extensions, no new dependencies.

## Decisions

- **D1 — Rows are composed spans, not one `<pre>` string**: each line = `<span>` connectors (muted) + `<span>` name, inside a `whitespace-nowrap` block with `overflow-x-auto` fallback. Mono font guarantees alignment across spans; colors stay per-segment without breaking the grid.
- **D2 — Directory naming**: `name.toLowerCase().replace(/[^a-z0-9]+/g,'-')` → `devops-&-tools` becomes `devops-tools`. Trailing `/` on every category (ls-F convention).
- **D3 — Brand tint scope**: only the `business-domain/` line (full brand) and its own connector glyphs (`text-brand/40`) are tinted; leaf names keep the standard featured (foreground) / supporting (muted + ` *`) treatment so the two signals never fight.
- **D4 — Live command lives in the component**: the PromptLine moves from the page wrapper into `skills.tsx` so the `-P "*query*"` suffix can update on each keystroke. Page wrapper keeps only the sr-only heading.
- **D5 — Summary math is computed**, never hardcoded: displayed categories × displayed skills after pruning; `0 directories, 0 skills` when nothing matches (mirrors real `tree --prune` zero output).
- **D6 — Matching**: case-insensitive substring on skill names only (categories are containers; `tree -P` matches files).

## Risks / Trade-offs

- Longest line ≈ 30ch → safe down to ~360px viewports; `overflow-x-auto` covers pathological cases.
- Losing chips reduces glanceability for chip-lovers; accepted for identity consistency (user decision).

## Open Questions

(none)
