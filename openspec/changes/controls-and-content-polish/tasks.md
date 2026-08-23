# Tasks: controls-and-content-polish

## 1. Project storage consolidation

- [x] 1.1 Merge `data/projects/en/<slug>.mdx` + `fr/<slug>.mdx` into `data/projects/<slug>.mdx` with bilingual frontmatter (`summary` EN, `summaryFr` FR), dropping `{/* TODO(i18n v2) */}` markers; delete `en/` and `fr/` directories
- [x] 1.2 Update `lib/projects.ts`: read flat directory, resolve summary per locale (`summaryFr` when `lang === 'fr'`), body always the single English one; keep slug/date sorting behavior
- [x] 1.3 Verify project URLs unchanged (`/projects/dots`, `/fr/projects/gesthos-tva`, …) with FR summaries localized on indexes/cards/detail pages

## 2. Markdown table styling

- [x] 2.1 Add `.prose table/th/td` rules to `app/globals.css` per design D1 (border-border cells, bg-muted + brand header row, padding)
- [x] 2.2 Check dots Keybindings Overview renders bordered/aligned on `/projects/dots` (and FR twin), including bold section rows
- [x] 2.3 Install `remark-gfm` and enable it via `mdxOptions.remarkPlugins` in `components/mdx-content.tsx` (parser-level root cause: tables are GFM, not CommonMark)

## 3. Dual-state locale switcher

- [x] 3.1 Rewrite `components/locale-switcher.tsx`: render both options — active as bracketed brand-colored `<span aria-current="true">`, inactive as muted `Link` to the twin URL with hover brand

## 4. Dual-icon theme control

- [x] 4.1 Rewrite `components/theme-toggle.tsx` as two discrete targets (Moon → dark, Sun → light): active icon inert brand-highlighted via stable markup + `.dark` CSS classes (no conditional rendering), inactive a muted button calling `setTheme`
- [x] 4.2 Verify no hydration gap regression: both icons present in server HTML on first paint in both themes

## 6. Switcher polish (post-feedback)

- [x] 6.1 Wider gap between locale and theme control groups in the header cluster
- [x] 6.2 Locale switcher fixed positional order (`fr en` always) — brackets/color move instead of element order
- [x] 6.3 Literal square brackets around the active theme icon (`[☾]` / `[☀]`) matching the locale grammar; design D2 + terminal-ui delta updated
- [x] 6.4 Re-verify: lint/tsc/build, fixed order on `/` and `/fr`, bracketed active icon present

## 7. Switcher polish round 2 (post-feedback)

- [x] 7.1 Locale order swapped: `en` always first, `fr` second (`[en] fr` / `en [fr]`)
- [x] 7.2 Theme brackets laid out inline beside the glyph via `inline-flex items-center` (Tailwind preflight makes svg block-level, which stacked brackets vertically)
- [x] 7.3 Small breathing gap between moon and sun targets (`gap-2`)
- [x] 7.4 Locale codes bumped to `text-base leading-none` for visual parity with the `size-4` icons

## 5. Validation

- [x] 5.1 `npm run lint && npx tsc --noEmit && npm run build`
- [x] 5.2 Curl matrix: switcher active/inactive states on `/` and `/fr`; theme icons in initial HTML; dots table borders present; project URLs + FR summaries intact
- [x] 5.3 `openspec validate controls-and-content-polish --strict`
