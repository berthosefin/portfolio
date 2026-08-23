# Design: Portfolio TUI Redesign & Content Cleanup

## Context

Next.js 14 App Router portfolio, Tailwind 3 + shadcn/ui (default style, HSL CSS variables in `app/globals.css`), next-themes for dark/light, MDX project files parsed by gray-matter in `lib/projects.ts`. Current look: neutral grayscale + teal accent added recently, system sans body + 0xProto headings. Constraint discovered earlier: `fonts.googleapis.com` is unreachable from the build environment (Inter via `next/font/google` fails the build), so any new font MUST be self-hosted. No test suite exists; verification is `npm run build` plus manual page inspection.

See `proposal.md` for motivation and `specs/` for behavior contracts.

## Goals / Non-Goals

**Goals:**
- A cohesive terminal/TUI visual language implemented as reusable primitives, not one-off styling per page
- Content truth: catalog matches verifiable projects/skills only
- Zero new runtime dependencies except (optionally) a dev-time source for font files

**Non-Goals:**
- i18n infrastructure (English-only now)
- Live GitHub stats widgets, blog, animations-heavy effects
- Replacing shadcn/ui internals — we restyle on top of them

## Decisions

### D1 — Font delivery: `next/font/local` with JetBrains Mono woff2
JetBrains Mono (OFL license) will live in `public/fonts/` as self-hosted woff2 (regular 400 + optionally 500/700; variable font acceptable if smaller overall). Files obtained at build-setup time by extracting from the `@fontsource/jetbrains-mono` npm package or downloading from the JetBrains GitHub release — both avoid the blocked Google Fonts CDN. Wired through `next/font/local` with `variable: '--font-jbmono'`; tailwind `sans` and `mono` stacks point at it.
*Alternative rejected:* `@fontsource` CSS import — works, but `next/font/local` gives zero-layout-shift self-hosting and removes an import indirection.

### D2 — Terminal palette mapped onto existing shadcn variables
Keep the shadcn variable contract (`--background`, `--card`, `--border`, `--primary`, `--brand`, …) and change their values to terminal tones instead of introducing a parallel token system:
- **Dark**: near-black blue-tinted terminal background (e.g. `hsl(220 13% 6%)`), slightly lighter panes, muted gray-green text, teal accent retained (phosphor-compatible).
- **Light**: "paper terminal" — warm off-white background, ink-dark text, same teal accent darkened for contrast.
*Alternative rejected:* full CRT green-phosphor palette — too costume-y for recruiters; teal keeps continuity with what the user approved.

### D3 — TUI primitives library: `components/tui/`
New folder of small server-compatible components:
- `Pane` — bordered block with optional title bar label (`─ title ─` style header strip); wraps sections/cards/forms
- `PromptLine` — renders `user@host:~$ command` + output rows for the hero and section headers
- `StatusBar` — footer-as-status-line (left identity / right links)
- `TabBar` — nav-as-tabs with active-pane marker (desktop); reuses existing Sheet for mobile
Box-drawing characters (`─ │ ┌ ┐ └ ┘`) used decoratively inside title strips only; structural borders stay CSS `border` so nothing depends on glyph alignment.
*Alternative rejected:* pure ASCII-art layout via `<pre>` blocks — unmaintainable and breaks responsive layout.

### D4 — Hero: static prompt session, CSS-only life
Hero renders deterministic SSR markup: `$ whoami` → name/role line, `$ cat about.txt` → dual-profile paragraph, `$ ls ~/open-source` → dots + randanarana links. A blinking-block caret comes from a CSS keyframe. No JS typing effect (hydration cost, accessibility noise) — can be added later behind `prefers-reduced-motion`.

### D5 — Content edits are plain data operations
Delete `data/projects/{lv-mgz,dotfiles,githread,immob-agence}.mdx` and their four PNGs. Rewrite `data/skills.json` to the audited set plus new `Business Domain` category (Accounting, Payroll Management, VAT Management, Commercial Management). Rewrite `intro.tsx` copy per `profile-narrative` spec. No schema change to frontmatter needed — existing fields suffice.

### D6 — MDX prose stays readable
Long paragraphs inside a monospace face get `max-width` measure (~70ch), relaxed line-height (1.7+), and the existing typography plugin restyled to terminal conventions (headings prefixed with `## `-style markers via CSS `::before`, code blocks keep sugar-high highlight).

## Risks / Trade-offs

- [Monospace fatigue on long text] → generous line-height, 70ch measure; body copy kept short per new narrative
- [TUI aesthetic reads as gimmick to corporate recruiters] → flat, restrained chrome; no scanlines/glitch effects; content professionalism carries the page
- [Font files unavailable offline during setup] → fallback chain documented; if npm/curl both fail, temporarily ship with system mono stack (`ui-monospace, 'JetBrains Mono', Menlo, monospace`) and swap files in later — spec scenario "loads offline" still satisfied once bundled
- [Unicode glyphs render inconsistently across OS fonts] → decorative-only usage (D3); alignment never load-bearing
- [Deleting projects breaks inbound deep links] → Next.js not-found handles it gracefully (spec scenario); acceptable for a personal site

## Migration Plan

Single branch, all-at-once deploy (static site): content deletions, data rewrite, component restyle land together so no intermediate state ships a half-TUI site. Rollback = git revert of the merge commit. No database, no API consumers.

## Open Questions

None blocking. TanStack Table is removed (audit found no usage among kept projects); if implementation discovers otherwise, restoring that single entry is trivial and does not affect specs.
