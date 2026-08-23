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

### Requirement: Skills index as directory tree
The skills page SHALL render the catalog as a single ASCII directory tree inside one labeled pane: categories as kebab-case directories with a trailing `/`, skills as leaf lines, and box-drawing connectors rendered in muted color. The `business-domain/` subtree SHALL be tinted with the brand color. Supporting tools SHALL carry a trailing `*` explained by the existing footnote; featured skills SHALL be unmarked.

#### Scenario: Full tree renders
- **WHEN** a visitor opens `/skills` without filtering
- **THEN** every category appears once as a directory line followed by its indented skill leaves, and the output ends with a summary line counting directories and skills

#### Scenario: Business domain stands out
- **WHEN** the tree renders
- **THEN** the `business-domain/` branch is distinguishable by brand coloring without any additional pane chrome

### Requirement: Collapsible category branches
Category directory lines SHALL toggle the visibility of their subtree on click, with hover selection consistent with the site's row-hover language. The default state SHALL be fully expanded. A collapsed branch SHALL render its directory line with a dimmed item-count suffix (e.g. `(7)`), and the summary line SHALL count only currently visible items.

#### Scenario: Toggle collapses and re-expands
- **WHEN** a visitor clicks a category line
- **THEN** its leaf lines disappear behind the directory line with the count suffix, and clicking again restores them

#### Scenario: Collapsed state is visible
- **WHEN** one or more branches are collapsed
- **THEN** each collapsed directory line shows how many items it hides, and the summary reflects only displayed rows

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

### Requirement: Terminal favicon
The site SHALL serve a favicon depicting a shell-prompt glyph (`>`) followed by an underscore, drawn in the brand teal on a sharp-cornered dark tile consistent with the terminal palette. No framework-default favicon SHALL remain.

#### Scenario: Browser icon matches identity
- **WHEN** a browser requests the site icon
- **THEN** it receives the prompt-glyph tile instead of any default Next.js logo

### Requirement: Server-rendered header controls

Interactive header controls that depend on client-only state — specifically the theme toggle — SHALL be present and visible in the server-rendered HTML of every page, using CSS-driven state representation where needed. A control SHALL NOT render empty and appear only after hydration, on initial load or after cross-route-group navigation alike.

#### Scenario: Theme toggle visible on first paint

- **WHEN** a visitor loads any page or navigates between locales
- **THEN** the theme toggle is present in the delivered HTML and never occupies blank space awaiting hydration

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

### Requirement: Theme-aware code highlighting

Syntax-highlighted code blocks in MDX content SHALL define sugar-high token colors for both themes via the `--sh-*` custom properties, so every token type remains legible on both the light paper background and the dark terminal background. No code block content SHALL become invisible or unreadable in either theme.

#### Scenario: Install commands readable in light mode

- **WHEN** a visitor reads a project page containing fenced shell blocks in light mode
- **THEN** every token of the block is visibly rendered against the light background

#### Scenario: Tokens follow the active theme

- **WHEN** the visitor toggles between dark and light modes
- **THEN** token colors switch between the dark and light palettes without losing legibility
