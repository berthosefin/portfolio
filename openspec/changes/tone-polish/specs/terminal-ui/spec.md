# terminal-ui Specification

## MODIFIED Requirements

### Requirement: Theme-aware terminal palette

Both dark and light themes SHALL remain available and SHALL map to terminal-inspired palettes (dark = classic dark terminal; light = light terminal/paper terminal). The teal accent family SHALL be retained as the highlight color in both themes. The light theme's paper background SHALL be dense enough to read as toned paper rather than plain white, while cards and popovers stay lighter than the page background.

#### Scenario: Theme toggle switches palettes without breaking contrast

- **WHEN** a visitor toggles between dark and light modes on any page
- **THEN** text, panes, borders, and accents remain legible with sufficient contrast in both themes

#### Scenario: Dense paper in light mode

- **WHEN** the site is viewed in light mode
- **THEN** the page background is visibly toned (not pure white) yet still lighter than card and popover surfaces

## ADDED Requirements

### Requirement: Duotone profile portrait

The home profile portrait SHALL render as a brand duotone instead of neutral grayscale: the source photograph stays untouched, and CSS blending tints its shadows with the deep teal accent family while highlights remain bright. The treatment SHALL hold in both dark and light themes without a second image asset.

#### Scenario: Portrait speaks the theme language

- **WHEN** the home page renders in either theme
- **THEN** the portrait shows teal-toned shadows and bright highlights rather than neutral gray tones, with facial features clearly recognizable
