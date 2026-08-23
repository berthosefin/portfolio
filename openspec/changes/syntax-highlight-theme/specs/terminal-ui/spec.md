# terminal-ui Specification

## ADDED Requirements

### Requirement: Theme-aware code highlighting

Syntax-highlighted code blocks in MDX content SHALL define sugar-high token colors for both themes via the `--sh-*` custom properties, so every token type remains legible on both the light paper background and the dark terminal background. No code block content SHALL become invisible or unreadable in either theme.

#### Scenario: Install commands readable in light mode

- **WHEN** a visitor reads a project page containing fenced shell blocks in light mode
- **THEN** every token of the block is visibly rendered against the light background

#### Scenario: Tokens follow the active theme

- **WHEN** the visitor toggles between dark and light modes
- **THEN** token colors switch between the dark and light palettes without losing legibility
