# content-localization Specification

## MODIFIED Requirements

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

## ADDED Requirements

### Requirement: Localized not-found boundaries

Every locale route group SHALL provide a styled not-found boundary so any unmatched path or unknown dynamic segment within that group renders the site's terminal-styled 404 page rather than a framework-default error. The 404 copy and `<title>` SHALL match the group's locale (French under `/fr`, English elsewhere), and the page SHALL offer navigation back to that locale's home.

#### Scenario: Unknown project slug under French prefix

- **WHEN** a visitor requests `/fr/projects/<slug>` where no such project exists
- **THEN** the styled not-found page renders with French copy and a French `<title>`, not a framework-default error page

#### Scenario: Unknown top-level path stays English

- **WHEN** a visitor requests an unknown unprefixed path
- **THEN** the styled not-found page renders with English copy and an English `<title>`
