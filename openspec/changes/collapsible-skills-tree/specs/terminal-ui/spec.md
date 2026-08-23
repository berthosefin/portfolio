## ADDED Requirements

### Requirement: Collapsible category branches
Category directory lines SHALL toggle the visibility of their subtree on click, with hover selection consistent with the site's row-hover language. The default state SHALL be fully expanded. A collapsed branch SHALL render its directory line with a dimmed item-count suffix (e.g. `(7)`), and the summary line SHALL count only currently visible items.

#### Scenario: Toggle collapses and re-expands
- **WHEN** a visitor clicks a category line
- **THEN** its leaf lines disappear behind the directory line with the count suffix, and clicking again restores them

#### Scenario: Collapsed state is visible
- **WHEN** one or more branches are collapsed
- **THEN** each collapsed directory line shows how many items it hides, and the summary reflects only displayed rows

### Requirement: Terminal favicon
The site SHALL serve a favicon depicting a shell-prompt glyph (`>`) followed by an underscore, drawn in the brand teal on a sharp-cornered dark tile consistent with the terminal palette. No framework-default favicon SHALL remain.

#### Scenario: Browser icon matches identity
- **WHEN** a browser requests the site icon
- **THEN** it receives the prompt-glyph tile instead of any default Next.js logo

## MODIFIED Requirements

### Requirement: Prune-style skill filtering
Filtering the catalog SHALL mimic `tree ~/skills -P "*<query*"`: the displayed command line updates live to include the `-P` pattern, branches without matching leaves are pruned from the output, pruning SHALL apply regardless of manually collapsed branches, clearing the filter SHALL restore those manual collapse states untouched, and a query with no match renders the root with a zeroed summary rather than an error message.

#### Scenario: Filter narrows the tree
- **WHEN** a visitor types into the search input
- **THEN** only categories containing at least one matching skill remain, showing only their matching leaves, and the command line reflects the active `-P` pattern

#### Scenario: No matches stays in character
- **WHEN** the query matches no skill
- **THEN** the tree shows only the root line and a summary counting zero skills — no grep-style error text

#### Scenario: Filter overrides manual collapse
- **WHEN** a visitor filters while some categories are manually collapsed
- **THEN** matching branches render expanded regardless of those states, and clearing the query brings the manual collapse states back exactly as they were
