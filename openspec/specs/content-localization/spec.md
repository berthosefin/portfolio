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

The skill catalog data SHALL carry both an English and a French name for every category and for every domain-type skill that is not a technology proper noun (e.g., "Business Domain"/« Domaine métier », "Payroll Management"/« Gestion de paie »). Technology names (e.g., TypeScript, React) SHALL remain identical across locales. The skills tree SHALL derive its directory labels from the active locale's names, with accent-insensitive slugification, and its summary line SHALL be worded in the active locale.

#### Scenario: French tree rendering

- **WHEN** the skills page is rendered in French
- **THEN** category directories appear with French-derived kebab-case slugs (accents folded, e.g., « Analyse de données » → `analyse-de-donnees/`) and the summary line reads like `tree` output under a French locale (« répertoires », « compétences »)

#### Scenario: Untranslated tool leaves

- **WHEN** either locale renders the tree
- **THEN** technology skill names are identical strings in both locales

### Requirement: Localized project entries

Project entries SHALL exist per locale under parallel directories (`data/projects/en`, `data/projects/fr`) sharing stable slugs. Titles, tags, roles, and dates SHALL remain identical across locales; summaries SHALL be localized. Project bodies MAY remain English until a full translation pass, in which case French detail pages SHALL fall back to the English body without errors.

#### Scenario: French index shows translated summaries

- **WHEN** `/fr/projects` is rendered
- **THEN** each row displays the French summary while title, tags, and dates match the English entry

#### Scenario: Untranslated body fallback

- **WHEN** a French project detail page renders a project whose body is not yet translated
- **THEN** the article shows the English body with no missing-content error

### Requirement: Language switcher parity

Every page SHALL link to its twin page in the other locale, placed in the header next to the theme toggle and preserving the current route. The switcher SHALL always target the other locale of the exact current URL.

#### Scenario: Twin navigation from a deep page

- **GIVEN** a visitor is on `/fr/projects/gesthos-tva`
- **WHEN** they activate the language switcher
- **THEN** they land on `/projects/gesthos-tva`

### Requirement: Localized SEO signals

Every localized page SHALL set a locale-correct `<html lang>` attribute, localized `<title>`/description metadata, and hreflang alternates (`en`, `fr`, `x-default` resolving to the English URL) linking each locale's twin URL.

#### Scenario: hreflang pair emitted on every page

- **WHEN** `/skills` is rendered
- **THEN** its head contains alternate links for the English self URL, the French twin `/fr/skills`, and `x-default` pointing at the English URL
