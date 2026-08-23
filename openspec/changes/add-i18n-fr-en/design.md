# Design: add-i18n-fr-en

## Context

Static Next.js 14 App Router site (no backend, no middleware, no runtime functions). Single root layout (`app/layout.tsx`) hardcodes `<html lang='en'>`, fonts, ThemeProvider, Header, StatusBar. All pages live at `app/{page,projects,skills,contact,not-found}`; 14 prerendered routes today. Content sources: `data/skills.json` (categories → skills with `featured`), `data/projects/*.mdx` read by `lib/projects.ts` via gray-matter. UI prose is hardcoded in components (Intro, Header, StatusBar, projects-with-filter, skills, contact page). Decisions on routing shape, phasing, and translated domain names were settled during exploration — see proposal.

## Goals / Non-Goals

**Goals:**

- Correct per-locale `<html lang>` without middleware.
- One dictionary source of truth per locale, type-checked against the English shape.
- FR pages reuse the same components as EN (props-driven strings), so the terminal look stays pixel-identical across locales.
- Zero new dependencies.

**Non-Goals:**

- No automatic browser-language redirect or cookie persistence (explicit links only).
- No full translation of MDX project bodies in this change (v1 falls back to English bodies).
- No localized date formatting (dates stay ISO-like), no localized route slugs for projects.
- No i18n of `app/icon.svg`, theme system, or collapse/filter behavior.

## Decisions

### D1 — Route groups with two root layouts, not `[lang]` segments

`app/(en)/…` hosts every existing route at unchanged URLs; `app/(fr)/fr/…` mirrors them under the prefix. Each group gets its own root layout rendering `<html lang={...}>`. A shared `components/root-shell.tsx` (fonts, globals import, ThemeProvider, Header, main, StatusBar) keeps the two layouts to ~10 lines each and guarantees identical chrome. Rejected: `app/[lang]/` + rewrite-based canonical root (needs middleware or an `/en` prefix — violates the no-middleware decision).

### D2 — Locale plumbing: props down from layouts, no React context

`lib/i18n.ts` exports `type Locale = 'en' | 'fr'`, `locales`, and `getDictionary(locale)` importing both JSONs statically. The Dictionary type is derived from the EN JSON (`typeof enDictionary`) so missing FR keys fail at build time. Layouts resolve the dictionary once and pass it (or narrow slices) to Header/StatusBar/pages. Pages under `(fr)` are thin wrappers: they render the same section components with `lang='fr'`.

### D3 — Dictionaries structure

`dictionaries/en.json` and `dictionaries/fr.json` share namespaces: `header` (nav labels), `home` (hero bio paragraphs, section prompts' visible prose), `projects` (index/detail headings, filter placeholder, empty-grep line, back label), `skills` (summary wording, filter placeholder, footnote), `contact` (intro sentence, channel descriptions), `notFound`, `footer` (status-bar tagline), `meta` (per-page title/description ×4 + 404). Only prose lives here; commands and pane labels stay in component code.

### D4 — Bilingual data model

- `data/skills.json`: categories gain `"nameFr"`; non-tool leaves inside `business-domain` also gain `"nameFr"` (e.g., « Comptabilité », « Gestion de paie », « Gestion TVA », « Gestion commerciale »). Tool leaves keep name only.
- Slugification moves to `lib/slugify.ts` with NFD accent folding (é→e) before the existing kebab-case regex, shared by both locales.
- `components/skills.tsx` takes `lang: Locale`; dir labels, summary wording (« X répertoires, Y compétences »), filter placeholder and footnote come from the dictionary; featured `*`/footnote semantics unchanged.

### D5 — Projects per-locale directories with stable slugs

`data/projects/*.mdx` moves to `data/projects/en/`; `data/projects/fr/` starts as copies with frontmatter `summary` translated (title/tags/role/dates/URLs untouched) and body copied verbatim from EN with a `<!-- TODO(i18n v2): translate body -->` marker. `lib/projects.ts`: `rootDirectory(lang)`, signatures become `getProjects(limit?, lang: Locale = 'en')` and `getProjectBySlug(slug, lang: Locale = 'en')`. FR `[slug]` pages call `generateStaticParams` over the fr directory.

### D6 — Switcher as a client island in the StatusBar

New `components/locale-switcher.tsx` ('use client', `usePathname()`): computes the twin href by stripping a leading `/fr` (→ EN target) or prepending `/fr` (→ FR target); renders a muted link labeled with the other locale's code (`FR` / `EN`) that brightens on hover, placed in the StatusBar right cluster next to the social icons. Keeping it client-side avoids threading `pathname` through server layouts.

### D7 — SEO signals

`lib/site.ts` exports `SITE_URL` (from `NEXT_PUBLIC_SITE_URL`, localhost fallback) used as `metadataBase`. Each page's metadata moves into `generateMetadata` reading `dict.meta.*` and emitting `alternates: { languages: { en, fr, 'x-default': enUrl } }` with absolute twin URLs. Root layouts set `<html lang>` only.

### D8 — Global 404 stays English

With multiple root layouts, unmatched paths render the single root-level `not-found.tsx`; localizing it per-request is impossible without middleware. Accepted limitation: the 404 remains English and links back to `/`. Recorded here so validation doesn't flag mixed language later.

## Risks / Trade-offs

- **Page-file duplication**: ~5 thin FR wrappers mirror EN pages. Chosen over context providers/middleware for explicitness; acceptable at this site size.
- **Drift between locale trees**: mitigated because all real markup lives in shared components; wrappers only bind locale + params.
- **FR slug drift in tree**: French dirs differ from English (`domaine-metier/` vs `business-domain/`). Intentional — the tree reflects the active locale's data, matching real `tree` output under a French environment.
- **Build size doubles (~28 pages)**: static export cost only; no runtime impact.
