# Tasks: controls-and-content-polish

## 1. Project storage consolidation

- [ ] 1.1 Merge `data/projects/en/<slug>.mdx` + `fr/<slug>.mdx` into `data/projects/<slug>.mdx` with bilingual frontmatter (`summary` EN, `summaryFr` FR), dropping `{/* TODO(i18n v2) */}` markers; delete `en/` and `fr/` directories
- [ ] 1.2 Update `lib/projects.ts`: read flat directory, resolve summary per locale (`summaryFr` when `lang === 'fr'`), body always the single English one; keep slug/date sorting behavior
- [ ] 1.3 Verify project URLs unchanged (`/projects/dots`, `/fr/projects/gesthos-tva`, …) with FR summaries localized on indexes/cards/detail pages

## 2. Markdown table styling

- [ ] 2.1 Add `.prose table/th/td` rules to `app/globals.css` per design D1 (border-border cells, bg-muted + brand header row, padding)
- [ ] 2.2 Check dots Keybindings Overview renders bordered/aligned on `/projects/dots` (and FR twin), including bold section rows

## 3. Dual-state locale switcher

- [ ] 3.1 Rewrite `components/locale-switcher.tsx`: render both options — active as bracketed brand-colored `<span aria-current="true">`, inactive as muted `Link` to the twin URL with hover brand

## 4. Dual-icon theme control

- [ ] 4.1 Rewrite `components/theme-toggle.tsx` as two discrete targets (Moon → dark, Sun → light): active icon inert brand-highlighted via stable markup + `.dark` CSS classes (no conditional rendering), inactive a muted button calling `setTheme`
- [ ] 4.2 Verify no hydration gap regression: both icons present in server HTML on first paint in both themes

## 5. Validation

- [ ] 5.1 `npm run lint && npx tsc --noEmit && npm run build`
- [ ] 5.2 Curl matrix: switcher active/inactive states on `/` and `/fr`; theme icons in initial HTML; dots table borders present; project URLs + FR summaries intact
- [ ] 5.3 `openspec validate controls-and-content-polish --strict`
