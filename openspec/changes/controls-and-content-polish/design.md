# Design: controls-and-content-polish

## Context

Post-usage feedback after the bilingual launch. Three independent workstreams share one theme: make the site comfortable to maintain solo. All are small-to-medium; no new dependencies; dictionaries untouched.

## Goals / Non-Goals

- Goals: tables render correctly everywhere by default; switchers reveal both options with terminal-authentic active states; one-file-per-project storage matching the paste-a-README workflow.
- Non-Goals: translating project bodies (permanently settled: English-only); touching routing, dictionaries, or SEO; redesigning anything outside the two header controls.

## Decisions

### D1 — Tables need GFM parsing plus prose CSS

Root cause of the dots table chaos is two-layered. Parser layer: markdown tables are a GitHub Flavored Markdown extension, not CommonMark — `next-mdx-remote` rendered them as literal pipe text because no `remark-gfm` was installed or passed via `mdxOptions.remarkPlugins`. Fix: add the plugin to `components/mdx-content.tsx`. Style layer: `app/globals.css` styles `.prose` headings/links/code/blockquote but has zero `table` rules, so even correctly parsed tables would render bare. Fix in `@layer components`:

```css
.prose table { @apply my-6 w-full border-collapse text-sm; }
.prose th { @apply border border-border bg-muted px-3 py-1.5 text-left font-semibold; color: hsl(var(--brand)); }
.prose td { @apply border border-border px-3 py-1.5 align-top; }
```

CSS beats an MDX component map here: it covers every current and future table (dots, any pasted README) with zero content-side discipline. The `**System**` / empty-cell section rows in dots will read as bold first cells once borders exist — accepted behavior, no special-case styling.

### D2 — Dual-state controls: brackets for text, brightness for icons

Shared visual grammar across both switchers:

- Active option: brand-colored and wrapped in literal square brackets — for both the locale code (`[fr]`) and the theme icons (`[☾]`/`[☀]`) — rendered as a `<span>` with `aria-current="true"`; no link, no button semantics.
- Positional order is fixed regardless of state: locale reads `en fr` left-to-right always, icons read moon-sun always; only brackets/color move. Mirrors how tmux/sed-style UIs keep slot positions stable.
- Inactive option: `text-muted-foreground`, `hover:text-brand`, real link/button; locale keeps lowercase codes per earlier polish. The two control groups are separated by a wider gap (`gap-3`) inside the header cluster.

LocaleSwitcher becomes two adjacent elements: active span + twin `Link`. ThemeToggle becomes two icon buttons (Moon → dark, Sun → light); the icon matching `resolvedTheme` renders as inert highlighted span, the other as button calling `setTheme('dark'|'light')`. Hydration-safety stays on the CSS approach from i18n-polish (both icons server-rendered; visibility/state via `.dark` class). One nuance: which icon is "active" depends on `resolvedTheme`, unknown at SSR — so SSR shows both icons in neutral state and post-hydration one dims via a `dark:` variant class pair rather than conditional rendering, keeping markup stable (no flicker regression). Locale active state is fully SSR-known (route-based).

### D3 — Single-file projects with bilingual frontmatter

Merge `data/projects/en/<slug>.mdx` + `fr/<slug>.mdx` → `data/projects/<slug>.mdx`:

```yaml
---
title: Dots
tags: [dotfiles, hyprland]
summary: English one-liner
summaryFr: Résumé français
---
<English body, verbatim — permanent>
```

`lib/projects.ts` reads the flat directory, returns entries whose summary is picked by `lang` (`lang === 'fr' && summaryFr ? summaryFr : summary`). Slugs derive from filenames as today; detail pages feed EN body to both locales. Removes six duplicate bodies and all `{/* TODO(i18n v2) */}` markers. This reverses the parallel-directories decision of add-i18n-fr-en — justified because bodies are now permanently canonical-English, so duplication served only a single localized line.

### D4 — Future-project runbook (documented in this design)

To add a project: create `data/projects/<slug>.mdx`; frontmatter = title, tags, dates, github, `summary` (EN), `summaryFr` (translate only that line); paste README below. Nothing else — indexes, cards, detail pages, both locales derive automatically. This is the contract the owner asked for.

## Risks / Trade-offs

- D2's SSR-neutral icon state means the inactive/active distinction appears only after hydration for theme icons (locale unaffected) — acceptable: both icons remain visible from first paint, satisfying the existing server-rendered-controls spec.
- D3 touches every project file mechanically; slug stability must be verified against existing URLs (`/projects/dots` etc.) after merge.
- Table CSS may need a `overflow-x-auto` wrapper consideration for wide tables — start without; revisit if dots overflows on mobile.

## Migration Plan

Mechanical merge first (D3), then lib change, then CSS (D1), then controls (D2). Build + curl matrix: project URLs unchanged, FR summaries still localized, dots table bordered, switcher states correct in both locales/themes. No data migration beyond file moves.

## Open Questions

(none)
