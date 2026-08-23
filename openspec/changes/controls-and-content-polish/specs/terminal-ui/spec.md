# terminal-ui Specification

## ADDED Requirements

### Requirement: Dual-state header switchers

Header controls representing an either/or state — language and color theme — SHALL display all available options simultaneously in terminal idiom, at fixed positions regardless of state (locale reads `en fr`, theme reads moon-sun). The selected option SHALL be highlighted in the brand color and wrapped in literal square brackets (`[en]`, `[☾]`) laid out inline beside the glyph, rendered as plain content rather than a control; unselected options are muted, become brand-colored on hover/focus, and are individually actionable so selecting a target takes one click. Options within a control SHALL keep a small breathing gap between targets. The theme control SHALL expose two discrete targets — moon for dark, sun for light — instead of a single cycling button.

#### Scenario: Theme target switches directly

- **GIVEN** the site is rendered in light mode
- **WHEN** a visitor clicks the moon icon
- **THEN** dark mode activates and the highlight moves from sun to moon without a second click

#### Scenario: Consistent treatment across controls

- **WHEN** the header renders in either locale or theme
- **THEN** the locale pair and the icon pair use the same active/inactive visual grammar (brand highlight for active, muted-to-brand interaction for the rest)

### Requirement: Styled markdown tables

Markdown tables inside project bodies SHALL render with the terminal design system automatically — cell borders using the standard border token, a visually distinct header row, and comfortable cell padding — without requiring per-table markup or components, so any table pasted from a README displays coherently.

#### Scenario: Keybindings overview table

- **WHEN** the dots project detail page renders its Keybindings Overview table
- **THEN** columns align within bordered cells, the header row is distinguishable, and section rows read as bold entries rather than broken layout
