# Proposal: add-i18n-fr-en

## Why

The portfolio is fully English today, which limits its reach with French- and Malagasy-speaking recruiters and clients. Bilingual delivery (English/French) was already explored and scoped: the site is static, so locale variants can be prerendered as explicit routes with zero middleware and no runtime cost.

## What Changes

- Add French versions of every page under an explicit `/fr` segment; the unprefixed root (`/`, `/projects`, `/skills`, `/contact`) stays canonical English.
- No middleware: both locales are plain static routes (file-based), keeping the deployment fully static. Build grows from 14 to ~28 pages.
- Introduce `dictionaries/{en,fr}.json` plus a small i18n helper (`lib/i18n.ts`) for all UI strings: header nav, hero bio copy, section headings, prompts' visible prose, filter placeholders, skills tree summary line, contact page copy, footer tagline, 404 message, per-page metadata titles/descriptions.
- Make the skill catalog bilingual: category names gain a French variant (e.g., "Payroll Management" domain → « Gestion de paie »). Skill/tool leaf names stay untranslated (proper nouns).
- Duplicate project content into `data/projects/{en,fr}/*.mdx`; v1 translates frontmatter summaries while MDX bodies fall back to English until a later full-translation pass (v2).
- Add a language switcher to the status bar: each page links to its twin page in the other locale.
- Emit SEO signals: correct `<html lang>` per locale, localized `<title>`/description, and `alternates.languages` hreflang annotations (en / fr / x-default).
- Terminal chrome stays English everywhere (commands such as `$ tree ~/skills`, flags, file paths are not translated); only prose and labels localize.

## Capabilities

### New Capabilities

- `content-localization`: Explicit en/fr routing without middleware, dictionary-driven UI strings, bilingual skill catalog, per-locale project metadata, language switcher parity, and hreflang/`lang` SEO requirements.

### Modified Capabilities

- `profile-narrative`: The "English-only content" requirement becomes a bilingual requirement — all user-facing text SHALL be available in English and French instead of English-only.

## Impact

- **Routing/layout**: `app/` restructures into two route groups — `(en)` hosting the existing pages at their current URLs and `(fr)` hosting `/fr/*` mirrors — each with its own root layout so `<html lang>` is correct per locale; shared shell extracted to avoid duplication.
- **Data**: `data/skills.json` gains `nameFr` on categories; `data/projects/{en,fr}/` replaces the flat directory; `lib/projects.ts` takes a locale parameter.
- **Components**: Header, Intro, StatusBar, skills/projects/contact/not-found surfaces accept locale-derived strings via props from server layouts/pages (no client context needed).
- **SEO**: `metadataBase` + `alternates.languages` added to page metadata.
- **No new runtime dependencies** (no next-intl/i18next — dictionaries are plain JSON modules).
