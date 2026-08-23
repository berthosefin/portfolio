## ADDED Requirements

### Requirement: Skills index as directory tree
The skills page SHALL render the catalog as a single ASCII directory tree inside one labeled pane: categories as kebab-case directories with a trailing `/`, skills as leaf lines, and box-drawing connectors rendered in muted color. The `business-domain/` subtree SHALL be tinted with the brand color. Supporting tools SHALL carry a trailing `*` explained by the existing footnote; featured skills SHALL be unmarked.

#### Scenario: Full tree renders
- **WHEN** a visitor opens `/skills` without filtering
- **THEN** every category appears once as a directory line followed by its indented skill leaves, and the output ends with a summary line counting directories and skills

#### Scenario: Business domain stands out
- **WHEN** the tree renders
- **THEN** the `business-domain/` branch is distinguishable by brand coloring without any additional pane chrome

### Requirement: Prune-style skill filtering
Filtering the catalog SHALL mimic `tree ~/skills -P "*<query*"`: the displayed command line updates live to include the `-P` pattern, branches without matching leaves are pruned from the output, and a query with no match renders the root with a zeroed summary rather than an error message.

#### Scenario: Filter narrows the tree
- **WHEN** a visitor types into the search input
- **THEN** only categories containing at least one matching skill remain, showing only their matching leaves, and the command line reflects the active `-P` pattern

#### Scenario: No matches stays in character
- **WHEN** the query matches no skill
- **THEN** the tree shows only the root line and a summary counting zero skills — no grep-style error text
