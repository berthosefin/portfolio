# Design: project-listing-text-only

## Context

The TUI redesign (archived as 2026-08-23-portfolio-tui-redesign) established `components/tui/` primitives (Pane, PromptLine, StatusBar, TabBar), JetBrains Mono everywhere, and a terminal palette. Project cards currently render an image grid (`components/projects.tsx`) fed by `components/projects-with-filter.tsx` (search + All/Personal/Contributions Tabs). Five MDX files carry `image:` frontmatter; five PNGs (~2.2 MB) sit in `public/images/`. See proposal.md — Why.

## Goals / Non-Goals

- Goals:
  - One consistent text-only presentation for project index and detail.
  - Purge screenshot assets and the image field from the data model.
  - Keep grep search as the sole filter on `/projects`.
- Non-Goals:
  - No changes to home sections, skills, contact, or the profile photo pipeline.
  - No OG/social preview images introduced.

## Decisions

- **D1 — Index = rows in one Pane (Option A)** over text-card grid (B) and tree view (C): most authentic to `ls` output, best mobile behavior (no cropping, natural reflow), ages well as projects are added. Row anatomy top-to-bottom: role marker + name link (brand color) · date right-aligned on the same line; summary line; bracketed tags line. Rows separated by whitespace only — no divider borders — so the pane reads like real terminal output.
- **D2 — Role marker is textual**: `~` prefix for `role: Author`, nothing for Contributor. Chosen over icon/color encoding because it survives copy-paste, screen readers, and monochrome displays. Detail page keeps spelling roles out ("personal project" / "contributions") per spec.
- **D3 — Hover = selection highlight**: row hover applies `bg-accent`-style background across the full row width instead of border-color shifts. Rationale: mirrors terminal selection; avoids reintroducing card chrome. Name link keeps its own hover color change.
- **D4 — Data model cleanup order matters**: remove frontmatter fields before deleting PNGs so no build references dangling assets. `ProjectMetadata.image?` is removed outright (not made optional-and-deprecated) since this is a personal codebase with one consumer.
- **D5 — Filter chrome**: keep the existing search Input + reset button from `projects-with-filter.tsx`; delete the Tabs block. Component stays client-side (`useState` filtering); rename not required but file keeps its name to limit diff surface.

## Risks / Trade-offs

- Losing screenshots removes at-a-glance visual proof (dots' ricing look). Accepted: GitHub READMEs carry the visuals, linked from each detail page.
- Text-only rows reduce desktop density vs. the old 2-column grid. Mitigated by full-width rows that fit all metadata without truncation.
- `next/image` remains imported only in `intro.tsx` after cleanup; if future pages need images the dependency stays configured anyway.

## Open Questions

(none — resolved during explore: Option A chosen, grep-only kept, `~` marker approved)
