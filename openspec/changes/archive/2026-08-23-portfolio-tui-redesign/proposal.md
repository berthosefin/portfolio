# Proposal: Portfolio TUI Redesign & Content Cleanup

## Why

The portfolio currently dilutes Berthose's real profile: 4 of 10 projects are learning exercises or duplicates that add noise rather than signal, and ~15 listed skills contradict his actual technology choices (Redux while every project uses Zustand, Material-UI while everything is shadcn/ui, Express while the backend is NestJS). At the same time, two genuine identity pillars are invisible: his business-domain expertise (accounting & payroll, held professionally) and his open-source/Linux ricing work (dots, randanarana on crates.io). The recent teal/shadcn redesign is pleasant but generic — it does not tell any story.

This is the right moment to do both at once because content curation and a total visual redesign share the same pages; doing them separately means touching every file twice.

## What Changes

### Content curation
- **Remove** 4 projects from the catalog: `lv-mgz`, `dotfiles`, `githread`, `immob-agence` (learning/duplicate value only) — MDX files and their screenshots deleted
- **Keep** 6 high-signal projects: `randanarana`, `gesthos-tva`, `gesthos-commercial-web-app`, `volafin`, `kotisthos`, `dots`
- **Purge filler skills** from `data/skills.json`: Redux, Material-UI, Express, MongoDB, MySQL, SQLite, Django, Python, HTML5, CSS3, jose, date-fns, Sonner, Vercel, Netlify, Render, ESLint, Prettier
- **Add business-domain skills** reflecting real professional experience: Accounting, Payroll Management (new "Business Domain" category)
- **Add missing technical skills** surfaced by the audit: CI/CD stays; TanStack Table removed unless used (verify during implementation)

### Narrative
- **Rewrite the hero/intro** around the dual-profile story: fullstack builder of complete business management applications (TVA, commercial, ERP, finance) *and* open-source Linux tinkerer (Hyprland ricing, Rust CLI published on crates.io)
- Surface the **accounting & payroll professional background** as a differentiator, not a footnote
- **All content remains in English**; i18n/multilanguage is explicitly deferred to a future change

### Visual redesign — Terminal/TUI aesthetic
- **BREAKING** (visual identity): replace the shadcn-default neutral look with a full terminal/TUI design language — ASCII box-drawing borders, tmux-style pane chrome, prompt-driven hero, monospace-first typography
- Switch primary font from `0xProto` to **JetBrains Mono** (bundled locally as woff2 — Google Fonts fetch is unavailable in the build environment)
- Apply the TUI system consistently across all pages: home, projects list, project detail, skills, contact, 404, header/nav, footer
- Keep light/dark theme support via next-themes; keep the teal accent family adapted to phosphor-terminal tones

## Capabilities

### New Capabilities
- `portfolio-content`: Curated project catalog (6 projects) and skill catalog structure, including the business-domain category and removal rules for filler entries
- `profile-narrative`: Hero/about content presenting the dual profile (business-app builder + open source/Linux), including accounting & payroll background, in English
- `terminal-ui`: Terminal-inspired design system — typography, pane chrome, box-drawing borders, prompt elements, status bars, theming — applied to every page and shared component

### Modified Capabilities
<!-- None: openspec/specs/ is empty, no prior requirements exist. -->

## Impact

- **Data**: deletion of 4 files in `data/projects/`, rewrite of `data/skills.json`; orphaned images removed from `public/images/`
- **Components**: rewrite of header, footer, intro, projects cards, skills, featured-skills, contact form presentation, theme-toggle placement
- **Pages**: restyle of all routes under `app/` (home, projects, projects/[slug], skills, contact, not-found)
- **Fonts**: `public/fonts/` gains JetBrains Mono woff2; `app/layout.tsx` font wiring changes; tailwind config font stack updated
- **Dependencies**: no new runtime dependencies planned; `next/font/local` used for fonts
- **Out of scope**: i18n infrastructure, blog, live GitHub stats (candidate future changes)
