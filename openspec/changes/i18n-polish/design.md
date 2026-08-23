# Design: i18n-polish

## Context

Four defects surfaced after shipping `add-i18n-fr-en`. All are small, mechanical fixes; no data-model or routing-architecture changes. The archived change's design decision D8 ("404 stays English, single root boundary") is superseded here by option A chosen with the user: per-locale styled boundaries.

## Goals / Non-Goals

- Goals: zero-hydration-gap theme toggle; lowercase switcher label; localized featured-skill names; styled localized 404 in both route groups.
- Non-Goals: translating project MDX bodies (deferred v2, existing `{/* TODO(i18n v2) */}` markers); changing dictionaries beyond what 404 copy needs.

## Decisions

### D1 — Theme toggle: CSS icon swap instead of mounted guard

Replace the `isMounted` guard (SSR renders `null` → blank until hydration) with both icons always rendered and visibility driven by the `dark` class on `<html>`:

```tsx
<Sun className='size-4 dark:hidden' />
<Moon className='size-4 hidden dark:block' />
```

`next-themes` sets the class before paint via its injected script, so SSR output is stable and correct on first paint. Removes `useState`/`useEffect` entirely; the component can stay a client component only for `setTheme`. Note: `resolvedTheme` is still used in the click handler, which is fine post-hydration.

### D2 — Switcher label case

`components/locale-switcher.tsx` renders the target locale code; change `toUpperCase()` usage to plain lowercase (`fr`, `en`). Matches nav labels and prompt chrome. No dictionary change needed since labels are locale codes, not words.

### D3 — Featured skills localization

`components/featured-skills.tsx` receives `lang` already (or gains it) and resolves each skill name as `lang === 'fr' && skill.nameFr ? skill.nameFr : skill.name` — identical rule to `components/skills.tsx`. No new data; business-domain leaves already carry `nameFr`.

### D4 — Dual not-found boundaries (supersedes D8 of add-i18n-fr-en)

Structure:

```
app/(en)/not-found.tsx        ← exists; becomes thin wrapper
app/(fr)/fr/not-found.tsx     ← new
components/not-found-page.tsx ← shared presentational component
                                props: { title, message, hint?, ctaHref, ctaLabel }
```

- Shared component holds the terminal-styled layout (prompt line `$ cd /wrong/path`, ASCII-ish framing, back-to-home link).
- Each group file exports `metadata` from its locale dictionary (`dict.notFound.title` — namespace already exists in both dictionaries) and renders the component with that dictionary's strings. French copy: « Page introuvable », hint « Le chemin demandé n'existe pas ou a été déplacé. », CTA « revenir à l'accueil »; English mirrors current content.
- Why not one root `not-found.tsx`: with multiple root layouts Next cannot use a root-level boundary across groups; per-group files are the supported pattern. The `(fr)` file must live at `app/(fr)/fr/not-found.tsx` so it scopes to the `/fr/*` subtree.
- Metadata export kills the default « 404: This page could not be found. » title in both groups.
- Unknown slugs under `/en`-side dynamic routes already bubble to `(en)`'s boundary; nothing else changes there.

## Risks / Trade-offs

- D1 relies on `next-themes`' blocking script having applied `.dark` pre-paint — it does (that's its core mechanism), but verify no flash-of-wrong-icon in light mode after build.
- D4 duplicates two thin wrapper files — acceptable; alternative (catch-all redirect) would lose the requested URL semantics.

## Migration Plan

Single commit-sized change; no migration. Build + curl matrix verifies both 404 paths, first-paint toggle presence (`curl | grep 'Toggle theme'`), FR featured names, lowercase label.

## Open Questions

(none)
