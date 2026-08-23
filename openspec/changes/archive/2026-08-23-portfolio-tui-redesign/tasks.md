# Tasks: Portfolio TUI Redesign & Content Cleanup

## 1. Content cleanup

- [x] 1.1 Delete `data/projects/lv-mgz.mdx`, `dotfiles.mdx`, `githread.mdx`, `immob-agence.mdx`
- [x] 1.2 Delete orphaned images `public/images/{lv-mgz,dotfiles,githread,immob-agence}.png`
- [x] 1.3 Rewrite `data/skills.json`: remove filler skills (Redux, Material-UI, Express, MongoDB, MySQL, SQLite, Django, Python, HTML5, CSS3, jose, date-fns, Sonner, Vercel, Netlify, Render, ESLint, Prettier, TanStack Table); add `Business Domain` category (Accounting, Payroll Management, VAT Management, Commercial Management); review featured flags against kept projects

## 2. Typography — JetBrains Mono

- [x] 2.1 Obtain JetBrains Mono woff2 files (extract from `@fontsource/jetbrains-mono` npm package or JetBrains GitHub release) into `public/fonts/`; remove `0xProto-Regular.woff2`
- [x] 2.2 Update `app/layout.tsx` to load JetBrains Mono via `next/font/local` with `--font-jbmono` variable; drop OxProto wiring
- [x] 2.3 Update `tailwind.config.ts` font stacks (`sans`/`mono`) to reference `var(--font-jbmono)` with system-mono fallbacks

## 3. Terminal palette

- [x] 3.1 Rework `app/globals.css` theme variables to terminal tones (dark: blue-tinted near-black; light: paper-terminal off-white), keep teal accent in both; remove now-unused utilities if any
- [x] 3.2 Verify noise-texture overlay and existing animations still fit; adjust opacity/colors for new backgrounds

## 4. TUI primitives (`components/tui/`)

- [x] 4.1 Create `Pane.tsx`: bordered block with optional title-strip label using box-drawing characters decoratively + CSS borders structurally
- [x] 4.2 Create `PromptLine.tsx`: renders prompt command/output rows with CSS blinking-block caret (respects reduced motion)
- [x] 4.3 Create `StatusBar.tsx`: footer status-line layout (left identity / right links)
- [x] 4.4 Create `TabBar.tsx`: desktop nav-as-tabs with active-pane marker; mobile falls back to existing Sheet menu

## 5. Page implementations

- [x] 5.1 Rebuild hero/intro as static prompt session (`whoami`, `cat about.txt`, `ls ~/open-source` with links to dots and randanarana) per dual-profile narrative incl. accounting/payroll background
- [x] 5.2 Restyle home page sections (featured skills, recent projects) inside `Pane` chrome with `PromptLine` section headers
- [x] 5.3 Restyle header with `TabBar` (active-route pane marker) and footer as `StatusBar`; keep ThemeToggle functional in both themes
- [x] 5.4 Restyle `/projects` list: project cards as panes with always-visible title/date/tags in terminal style
- [x] 5.5 Restyle `/projects/[slug]`: metadata header, tags, GitHub/crates.io links as terminal buttons; MDX prose restyled per D6 (70ch measure, `##` heading markers, sugar-high code blocks)
- [x] 5.6 Restyle `/skills` page: categories as labeled panes, Business Domain section visually distinct
- [x] 5.7 Restyle `/contact` form inside a `Pane` (compose-style labels), teal Send button preserved
- [x] 5.8 Restyle `not-found.tsx` as terminal error output (e.g., `command not found` pattern)
- [x] 5.9 Sweep every route for English-only copy; fix any French remnants

## 6. Verification

- [x] 6.1 Run `npm run build` — zero errors, all pages generate (6 projects present, removed slugs 404)
- [ ] 6.2 Manual pass dark + light on all routes: contrast, pane chrome, active nav state, font rendering offline
- [x] 6.3 Validate change: `openspec validate portfolio-tui-redesign --strict`
