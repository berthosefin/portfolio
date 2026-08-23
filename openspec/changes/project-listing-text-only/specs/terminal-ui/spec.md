## ADDED Requirements

### Requirement: Project index as terminal file listing
The projects listing SHALL render as text-only terminal output inside a single labeled pane: one row per project containing a role marker, the project name as a link in the accent color, the publication date right-aligned, and a one-line summary followed by bracketed tags beneath. Raster images SHALL NOT appear in any project listing. Hovering a row SHALL highlight it like a terminal selection.

#### Scenario: Listing reads as ls output
- **WHEN** a visitor opens `/projects`
- **THEN** every project appears as a text row inside one bordered pane with name, date, summary, and tags — and no screenshot is rendered anywhere in the list

#### Scenario: Row hover selection
- **WHEN** a visitor hovers a project row
- **THEN** the row background highlights consistently with terminal selection styling and no card-level image or shadow appears

### Requirement: Search-only project filtering
The `/projects` page SHALL offer exactly one filter affordance: a text search input styled as a grep prompt. Category tabs (all/personal/contributions) SHALL NOT be presented.

#### Scenario: No category tabs
- **WHEN** a visitor opens `/projects`
- **THEN** only the search input is shown above the listing; no tab bar for personal/contribution categories exists

#### Scenario: Search narrows rows
- **WHEN** a visitor types into the search input
- **THEN** the listing narrows to projects whose fields match the query

### Requirement: Image-free project detail header
The project detail page SHALL open with a prompt line followed by a meta pane carrying the title as pane label, the role-and-date line, external link buttons (`[ source ]`, `[ live demo ]`), and bracketed tags. The detail page SHALL NOT render a hero image.

#### Scenario: Detail opens without hero image
- **WHEN** a visitor opens any `/projects/<slug>` page
- **THEN** no raster hero image is displayed; metadata, links, and tags appear in the meta pane above the MDX content
