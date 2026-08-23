# Tasks: i18n-polish

## 1. Theme toggle flash fix

- [x] 1.1 Rewrite `components/theme-toggle.tsx`: drop `isMounted` state, render `<Sun className='size-4 dark:hidden' />` + `<Moon className='size-4 hidden dark:block' />`, keep `setTheme` click handler
- [x] 1.2 Verify no wrong-icon flash in light and dark mode on cold load (`npm run build && npm run start`, check initial HTML contains both icons)

## 2. Locale switcher label case

- [x] 2.1 In `components/locale-switcher.tsx`, render target locale code lowercase (`fr` / `en`), removing any `toUpperCase()`

## 3. Featured skills localization

- [x] 3.1 In `components/featured-skills.tsx`, resolve skill names via active locale with the same rule as `components/skills.tsx` (`nameFr` when `lang === 'fr'`)
- [x] 3.2 Check `/fr` home shows « Comptabilité » and « Gestion de paie » while technology names are unchanged

## 4. Dual not-found boundaries

- [x] 4.1 Extract presentational `components/not-found-page.tsx` taking `{ title, message, hint, ctaHref, ctaLabel }`
- [x] 4.2 Refactor `app/(en)/not-found.tsx`: export `metadata` from `dict.notFound.title`, render shared component with English strings
- [x] 4.3 Create `app/(fr)/fr/not-found.tsx`: same shape, French strings (« Page introuvable », French hint/CTA), metadata title from FR dictionary
- [x] 4.4 Update archived design note is historical only — no file change; confirm main specs carry the new requirements (done via this change's deltas)
- [x] 4.5 Add `app/(fr)/fr/[...rest]/page.tsx` catch-all calling `notFound()` so any unmatched `/fr/*` path renders the French boundary instead of falling through to the English catch-all

## 6. 404 hardening (post-feedback)

- [x] 6.1 Unify the French 404 scene: shell error line identical to English chrome (`zsh: no such file or directory: /this-page-does-not-exist`), French explanatory prose below
- [x] 6.2 Add `title.default: 'Berthose Fin'` to both group layouts so no page ever falls back to URL-as-title
- [x] 6.3 Export `generateMetadata` from both `[...rest]` catch-all pages returning localized notFound title/description (guarantees title in client-side navigation RSC payloads)
- [x] 6.4 `[slug]` generateMetadata returns localized notFound title/description when the project is missing, instead of `?? undefined`
- [x] 6.5 Verify `<title>` in SSR HTML and RSC payload for all 404 paths; `openspec validate i18n-polish --strict`

## 5. Validation

- [x] 5.1 `npm run lint && npx tsc --noEmit && npm run build`
- [x] 5.2 Curl matrix: `/fr/projects/dotsssss` → styled FR 404 + FR `<title>`; `/jlhlljl` → styled EN 404; `/fr` featured skills FR names; header contains lowercase `fr` link and theme-toggle SVGs in initial HTML
- [x] 5.3 `openspec validate i18n-polish --strict`
