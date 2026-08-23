# terminal-ui Specification

## ADDED Requirements

### Requirement: Server-rendered header controls

Interactive header controls that depend on client-only state — specifically the theme toggle — SHALL be present and visible in the server-rendered HTML of every page, using CSS-driven state representation where needed. A control SHALL NOT render empty and appear only after hydration, on initial load or after cross-route-group navigation alike.

#### Scenario: Theme toggle visible on first paint

- **WHEN** a visitor loads any page or navigates between locales
- **THEN** the theme toggle is present in the delivered HTML and never occupies blank space awaiting hydration
