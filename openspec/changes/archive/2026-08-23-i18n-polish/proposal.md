# Proposal: i18n-polish

## Why

The first real usage of the FR/EN site surfaced four rough edges: the theme toggle flashes (disappears then reappears) on every full page load — which includes every EN↔FR switch since route-group navigation is a full reload; featured skills render English names on French pages (Accounting, Payroll Management); unknown project slugs under `/fr/*` hit Next's default unstyled 404 while other unknown paths get the styled one; and the locale switcher's uppercase `FR`/`EN` clashes with the all-lowercase terminal UI.

## What Changes

- Render both theme icons server-side with CSS-based switching (`dark:hidden` / `hidden dark:block`) instead of the mounted-guard, eliminating the hydration gap everywhere.
- Lowercase the locale switcher label (`fr` / `en`) to match the terminal UI language.
- Localize featured-skill names in the home section using the same `nameFr` data the skills tree already uses.
- Add a styled not-found boundary to the `(fr)` route group so `/fr/projects/<unknown>` gets a real 404 page, with localized copy (French under `/fr`, English elsewhere), localized `<title>`, and update design D8 accordingly.
- No data changes; no new dependencies.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `content-localization`: adds a requirement for per-locale styled not-found boundaries with localized titles, and extends the bilingual skill catalog requirement to cover the featured-skills section.
- `terminal-ui`: adds a requirement that header controls (theme toggle) are present in server-rendered HTML without a post-hydration gap.

## Impact

- `components/theme-toggle.tsx`, `components/locale-switcher.tsx`, `components/featured-skills.tsx` — small edits.
- `app/(en)/not-found.tsx`, new `app/(fr)/fr/not-found.tsx` — shared component extraction + metadata exports.
- `openspec/specs/terminal-ui` D8 note replaced by dual boundaries (design doc of archived change stays as history; main specs carry the new requirements).
