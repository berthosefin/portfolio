# Project Listing: Text-Only Terminal Output

## Why

Project screenshots are the last non-terminal element of the design: 5 of 6 projects show a raster image while randanarana shows a placeholder icon, so every listing mixes two visual languages. Removing screenshots makes the TUI identity fully consistent and sheds ~2.2 MB of static assets.

## What Changes

- **BREAKING (visual)**: Project cards no longer display screenshots anywhere — the `/projects` grid becomes a single labeled Pane rendering an `ls -la`-style text list: `~` marker for personal projects (`role: Author`), nothing for contributions; project name as brand-colored link; publication date right-aligned; one-line summary; bracketed tag row. Hover highlights the row like a terminal selection.
- Project detail page drops the hero image block; a meta Pane replaces it (title as pane label, role + date line, `[ source ]` / `[ live demo ]` buttons, bracketed tags).
- The `/projects` page removes the All/Personal/Contributions tabs; text search (`grep`) remains the only filter.
- Data cleanup: `image:` frontmatter removed from all project MDX files; `image?` field dropped from `ProjectMetadata`; the five project PNGs deleted from `public/images/` (~2.2 MB). The profile photo `thos.jpg` is untouched.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `terminal-ui`: adds requirements for the text-only project index (ls-style rows in one pane) and the search-only filter chrome on `/projects`.
- `portfolio-content`: adds requirements for screenshot-free project data (no image field, assets purged) and compact role signaling (`~` marker in listings, role stated on detail pages).

## Impact

- `components/projects.tsx` — rewritten as text list rows inside one Pane.
- `components/projects-with-filter.tsx` — Tabs removed; search input kept.
- `app/projects/[slug]/page.tsx` — hero image block replaced by meta Pane.
- `lib/projects.ts` — `image?: string` removed from `ProjectMetadata`.
- `data/projects/*.mdx` — 5 files lose their `image:` frontmatter field.
- `public/images/` — delete dots.png, gesthos-commercial.png, gesthos-tva.png, kotisthos.png, volafin.png (~2.2 MB).
- No dependency changes; `next/image` remains used only for the profile photo.
