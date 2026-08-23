# terminal-ui Specification

## Purpose

Establishes the terminal/TUI visual design system applied to every page of the portfolio: monospace-first typography based on JetBrains Mono, pane chrome with box-drawing aesthetics, prompt-driven elements, status bars, and theme-aware terminal colors — replacing the previous generic shadcn look while continuing to build on shadcn/ui primitives.

## Requirements

### Requirement: JetBrains Mono typography
The site SHALL use JetBrains Mono (self-hosted woff2, no external font CDN) as its primary typeface for body, headings, and interface elements across every page and component. The previous 0xProto font SHALL no longer be used.

#### Scenario: Font loads offline
- **WHEN** the site is built and served without internet access
- **THEN** JetBrains Mono renders correctly because it is bundled locally

#### Scenario: No legacy font references
- **WHEN** the codebase is searched after implementation
- **THEN** no layout, config, or CSS rule still references 0xProto

### Requirement: Terminal pane chrome
Every major content block (hero, sections, cards, forms) SHALL be presented inside terminal-style panes featuring box-drawing or bordered chrome with an optional title bar (e.g., session/pane label), consistent spacing, and no drop shadows that contradict the flat terminal aesthetic.

#### Scenario: Home sections read as panes
- **WHEN** a visitor views any home-page section (skills, projects)
- **THEN** each section is visually enclosed in a labeled terminal pane rather than floating plain content

### Requirement: Prompt-driven hero
The hero SHALL render as an interactive-looking terminal session: a shell prompt line introducing the owner, followed by command/output style lines conveying the dual-profile narrative.

#### Scenario: Hero mimics a shell session
- **WHEN** a visitor loads the home page
- **THEN** they see at least one prompt line (command + output pattern) instead of a conventional marketing heading layout

### Requirement: TUI navigation and status bars
Site navigation SHALL adopt a terminal multiplexer metaphor: the header SHALL present navigation entries as tab/session labels with an active-pane indicator, and the footer SHALL present as a status bar line (e.g., left: identity, right: links).

#### Scenario: Active route indicated like an active pane
- **WHEN** a visitor is on `/projects` and looks at the header navigation
- **THEN** the Projects entry is visually marked as active in a way consistent with terminal tab highlighting

### Requirement: Theme-aware terminal palette
Both dark and light themes SHALL remain available and SHALL map to terminal-inspired palettes (dark = classic dark terminal; light = light terminal/paper terminal). The teal accent family SHALL be retained as the highlight color in both themes.

#### Scenario: Theme toggle switches palettes without breaking contrast
- **WHEN** a visitor toggles between dark and light modes on any page
- **THEN** text, panes, borders, and accents remain legible with sufficient contrast in both themes

### Requirement: Consistent application across all routes
The TUI design system SHALL be applied uniformly to all existing routes: home, projects list, project detail, skills, contact, and the 404 page. MDX project content SHALL render inside the same design language (terminal-styled typography, headings, code blocks).

#### Scenario: Project detail matches the system
- **WHEN** a visitor opens any `/projects/<slug>` page
- **THEN** metadata, tags, external links, and MDX body are styled within the same terminal design language as the rest of the site

#### Scenario: 404 page stays in character
- **WHEN** a visitor hits an unknown route
- **THEN** the not-found page presents its message using the terminal aesthetic (e.g., error-style output) rather than the previous generic layout

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
