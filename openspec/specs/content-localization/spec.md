# content-localization Specification

## Purpose

Deliver the portfolio in English and French through explicit static routes and dictionary-driven strings, without middleware or runtime locale negotiation, while keeping the terminal metaphor's chrome authentic and untranslated.

## Requirements

### Requirement: Explicit locale routing without middleware

The site SHALL serve English at unprefixed canonical routes (`/`, `/projects`, `/projects/[slug]`, `/skills`, `/contact`) and French under the `/fr` prefix (`/fr`, `/fr/projects`, ...) using file-based routes only. Locale selection SHALL NOT depend on middleware, cookies, or runtime negotiation; every localized page SHALL prerender as static HTML.

#### Scenario: Canonical English root

- **WHEN** a visitor requests `/`
- **THEN** the English home page is served with `<html lang="en">`

#### Scenario: French mirror route

- **WHEN** a visitor requests `/fr/projects`
- **THEN** the French projects index is served with `<html lang="fr">`

#### Scenario: Unsupported locales are not negotiated

- **WHEN** a visitor requests an unprefixed-but-unrouted locale path such as `/de/projects`
- **THEN** the site serves the not-found response instead of guessing a locale

### Requirement: Dictionary-driven UI strings

All translatable UI strings — navigation labels, hero copy, section headings, filter placeholders, skills summary line, contact copy, footer tagline, 404 message, per-page metadata titles and descriptions — SHALL come from typed per-locale dictionaries (`en`, `fr`) resolved by a single i18n helper. Components SHALL NOT hardcode translatable prose.

#### Scenario: Locale swap changes prose only

- **WHEN** the same page is rendered for `en` and then for `fr`
- **THEN** headings, paragraphs, buttons, placeholders, and metadata differ according to each dictionary, while layout and structure remain identical

### Requirement: Terminal chrome stays English

Simulated shell commands, flags, and path-like chrome (e.g., `$ tree ~/skills -P "*q*"`, `$ cat ~/contact.txt`, `$ whoami`, pane labels such as `~/projects`) SHALL render identically in both locales.

#### Scenario: Commands untranslated on French pages

- **WHEN** a French page renders prompt lines or pane labels
- **THEN** the command text and pane labels remain in English

### Requirement: Bilingual skill catalog

The skill catalog data SHALL carry both an English and a French name for every category and for every domain-type skill that is not a technology proper noun (e.g., "Business Domain"/« Domaine métier », "Payroll Management"/« Gestion de paie »). Technology names (e.g., TypeScript, React) SHALL remain identical across locales. The skills tree SHALL derive its directory labels from the active locale's names, with accent-insensitive slugification, and its summary line SHALL be worded in the active locale. Every surface that displays skill names — including the home featured-skills section — SHALL resolve domain-type skill names through the active locale's data.

#### Scenario: French tree rendering

- **WHEN** the skills page is rendered in French
- **THEN** category directories appear with French-derived kebab-case slugs (accents folded, e.g., « Analyse de données » → `analyse-de-donnees/`) and the summary line reads like `tree` output under a French locale (« répertoires », « compétences »)

#### Scenario: Untranslated tool leaves

- **WHEN** either locale renders the tree
- **THEN** technology skill names are identical strings in both locales

#### Scenario: Featured skills follow the locale

- **WHEN** the home featured-skills section is rendered in French
- **THEN** domain-type skills display their French names (e.g., « Comptabilité », « Gestion de paie ») while technology names remain unchanged

### Requirement: Localized project entries

Each project SHALL be described by a single file (`data/projects/<slug>.mdx`) carrying bilingual metadata in its frontmatter: `summary` in English and `summaryFr` in French, alongside locale-neutral title, tags, roles, and dates. The project body — technical README content — SHALL remain in English permanently; it is not translated and needs no fallback logic. Project indexes, cards, and detail pages SHALL display the summary matching the active locale.

#### Scenario: French index shows translated summaries

- **WHEN** `/fr/projects` is rendered
- **THEN** each row displays the French summary from `summaryFr` while title, tags, and dates match the English entry

#### Scenario: Adding a future project

- **GIVEN** a new project README written in English
- **WHEN** the owner adds it as one file with English `summary`, a translated `summaryFr` line, and the pasted body
- **THEN** both locale versions of the index, cards, and detail pages work with no other step and no duplicated body files

#### Scenario: Untranslated body fallback

- **WHEN** either locale renders any project detail page
- **THEN** the canonical English body is displayed as-is — bodies have no per-locale variants, so no translation pass or fallback logic is involved

### Requirement: Language switcher parity

Every page SHALL expose its twin page in the other locale through the header switcher placed next to the theme control, preserving the current route. The switcher SHALL show both locale options at all times; the active locale is highlighted in terminal idiom (bracketed, brand-colored) and is not actionable, while the inactive option links to the twin of the exact current URL.

#### Scenario: Twin navigation from a deep page

- **GIVEN** a visitor is on `/fr/projects/gesthos-tva`
- **WHEN** they activate the inactive locale option
- **THEN** they land on `/projects/gesthos-tva`

#### Scenario: Active option is inert

- **WHEN** a page renders for the current locale
- **THEN** that locale's option displays as highlighted plain content with no link semantics, and only the other locale navigates

### Requirement: Localized SEO signals

Every localized page SHALL set a locale-correct `<html lang>` attribute, localized `<title>`/description metadata, and hreflang alternates (`en`, `fr`, `x-default` resolving to the English URL) linking each locale's twin URL.

#### Scenario: hreflang pair emitted on every page

- **WHEN** `/skills` is rendered
- **THEN** its head contains alternate links for the English self URL, the French twin `/fr/skills`, and `x-default` pointing at the English URL

### Requirement: Localized not-found boundaries

Every locale route group SHALL provide a styled not-found boundary so any unmatched path or unknown dynamic segment within that group renders the site's terminal-styled 404 page rather than a framework-default error. The 404 copy, `<title>`, and metadata SHALL match the group's locale (French under `/fr`, English elsewhere), except simulated shell chrome which follows the terminal-chrome rule above; the browser tab SHALL always show a localized title, never the raw URL. The page SHALL offer navigation back to that locale's home.

#### Scenario: Unknown project slug under French prefix

- **WHEN** a visitor requests `/fr/projects/<slug>` where no such project exists
- **THEN** the styled not-found page renders with French copy and a French `<title>`, not a framework-default error page

#### Scenario: Unknown top-level path stays English

- **WHEN** a visitor requests an unknown unprefixed path
- **THEN** the styled not-found page renders with English copy and an English `<title>`
