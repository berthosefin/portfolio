# Tasks: i18n-polish

## 1. Theme toggle flash fix

- [ ] 1.1 Rewrite `components/theme-toggle.tsx`: drop `isMounted` state, render `<Sun className='size-4 dark:hidden' />` + `<Moon className='size-4 hidden dark:block' />`, keep `setTheme` click handler
- [ ] 1.2 Verify no wrong-icon flash in light and dark mode on cold load (`npm run build && npm run start`, check initial HTML contains both icons)

## 2. Locale switcher label case

- [ ] 2.1 In `components/locale-switcher.tsx`, render target locale code lowercase (`fr` / `en`), removing any `toUpperCase()`

## 3. Featured skills localization

- [ ] 3.1 In `components/featured-skills.tsx`, resolve skill names via active locale with the same rule as `components/skills.tsx` (`nameFr` when `lang === 'fr'`)
- [ ] 3.2 Check `/fr` home shows « Comptabilité » and « Gestion de paie » while technology names are unchanged

## 4. Dual not-found boundaries

- [ ] 4.1 Extract presentational `components/not-found-page.tsx` taking `{ title, message, hint, ctaHref, ctaLabel }`
- [ ] 4.2 Refactor `app/(en)/not-found.tsx`: export `metadata` from `dict.notFound.title`, render shared component with English strings
- [ ] 4.3 Create `app/(fr)/fr/not-found.tsx`: same shape, French strings (« Page introuvable », French hint/CTA), metadata title from FR dictionary
- [ ] 4.4 Update archived design note is historical only — no file change; confirm main specs carry the new requirements (done via this change's deltas)

## 5. Validation

- [ ] 5.1 `npm run lint && npx tsc --noEmit && npm run build`
- [ ] 5.2 Curl matrix: `/fr/projects/dotsssss` → styled FR 404 + FR `<title>`; `/jlhlljl` → styled EN 404; `/fr` featured skills FR names; header contains lowercase `fr` link and theme-toggle SVGs in initial HTML
- [ ] 5.3 `openspec validate i18n-polish --strict`
