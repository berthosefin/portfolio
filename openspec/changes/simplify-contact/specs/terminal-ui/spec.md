## ADDED Requirements

### Requirement: Static contact directory
The contact page SHALL render as static terminal output: a prompt line followed by a single labeled pane listing each contact channel as one row (muted key, linked value). The page SHALL NOT contain form fields, client-side validation, or submission logic.

#### Scenario: No form on the contact page
- **WHEN** a visitor opens `/contact`
- **THEN** no input, textarea, or submit button exists and every channel row is directly clickable

#### Scenario: Row hover selection
- **WHEN** a visitor hovers a contact row
- **THEN** the row highlights like a terminal selection, consistent with project index rows

### Requirement: Prompt-style section links
Cross-section links embedded in home sections SHALL use the shell navigation pattern (`$ cd /<section> →`) instead of prose labels such as "view all".

#### Scenario: Featured skills link matches the pattern
- **WHEN** the home featured-skills section renders
- **THEN** its link to `/skills` reads as a shell command line consistent with the recent projects link
