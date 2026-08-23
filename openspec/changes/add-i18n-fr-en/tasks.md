# Tasks: add-i18n-fr-en

## 1. i18n foundation and route groups

- [x] 1.1 Create `lib/i18n.ts` (`Locale`, `locales`, `getDictionary`) and `dictionaries/en.json` + `dictionaries/fr.json` with the namespaces from design D3 (header, home, projects, skills, contact, notFound, footer, meta) — FR translations written in the same pass
- [x] 1.2 Create `components/root-shell.tsx` (fonts, globals import, ThemeProvider, Header, main grow wrapper, StatusBar) taking `locale`/dictionary props; restructure `app/` into `(en)` (existing pages, unchanged URLs) and `(fr)/fr` mirrors with per-group root layouts setting `<html lang>`
- [x] 1.3 Verify build still produces the 14 existing URLs with `<html lang='en'>` after the move before any translation work

## 2. Bilingual data layer

- [x] 2.1 Add `nameFr` to every category in `data/skills.json` and to the four business-domain leaves (« Comptabilité », « Gestion de paie », « Gestion TVA », « Gestion commerciale »); extract `lib/slugify.ts` with NFD accent folding and reuse it in the skills tree
- [x] 2.2 Move `data/projects/*.mdx` to `data/projects/en/`; create `data/projects/fr/` copies with translated frontmatter summaries, verbatim EN bodies plus `TODO(i18n v2)` markers, slugs identical across locales
- [x] 2.3 Update `lib/projects.ts`: locale-aware root directory, `getProjects(limit?, lang = 'en')`, `getProjectBySlug(slug, lang = 'en')`; update all call sites

## 3. Localized surfaces

- [x] 3.1 Thread dictionaries through Header (nav labels), StatusBar (tagline + switcher slot), Intro (hero bio prose), home sections (featured-skills/recent-projects headings)
- [x] 3.2 Localize projects index + detail (headings, filter placeholder, empty state, back link) via props; FR `[slug]` page gets its own `generateStaticParams`
- [x] 3.3 Localize skills tree (dir labels from `nameFr`, summary wording, filter placeholder, footnote) for `lang='fr'`; commands and pane labels stay English
- [x] 3.4 Localize contact page copy and keep `$ cat ~/contact.txt` chrome unchanged

## 4. Switcher and SEO

- [x] 4.1 Add `components/locale-switcher.tsx` (client, `usePathname`, twin-href computation stripping/prepending `/fr`, label = other locale code) mounted in the Header control cluster next to the theme toggle
- [x] 4.2 Create `lib/site.ts` (`SITE_URL` via `NEXT_PUBLIC_SITE_URL`, localhost fallback); convert page metadata to `generateMetadata` reading `dict.meta.*` and emitting `alternates.languages` with en/fr/x-default absolute twins

## 5. Verification

- [x] 5.1 `npm run build`: ~28 static pages, both locales prerendered, no missing-key type errors; spot-check `/fr/projects/gesthos-tva` summary vs body fallback and `/de/projects` → not-found
- [x] 5.2 Inspect rendered head of `/skills` for hreflang triple (en self / fr / x-default) and `<html lang>` correctness on both locales
- [x] 5.3 `openspec validate add-i18n-fr-en --strict` passes
