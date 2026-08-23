# content-localization Specification

## MODIFIED Requirements

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
