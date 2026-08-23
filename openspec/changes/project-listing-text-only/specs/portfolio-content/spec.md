## ADDED Requirements

### Requirement: Screenshot-free project data
Project data SHALL carry no screenshots: MDX files SHALL NOT include an `image` frontmatter field, and `public/images/` SHALL contain no project screenshots — only the profile photo. Removed assets SHALL include the screenshots of dots, gesthos-commercial-web-app, gesthos-tva, kotisthos, and volafin.

#### Scenario: Repository state is purged
- **WHEN** the repository is inspected after implementation
- **THEN** no project MDX file declares an image field and no project screenshot file remains under `public/images/`

#### Scenario: Build serves no dead assets
- **WHEN** the site is built
- **THEN** no route references a deleted screenshot and the profile photo still renders on the home intro

### Requirement: Compact role signaling
The project listing SHALL mark personal projects (`role: Author`) with a `~` prefix marker; contribution projects SHALL carry no marker. The project detail page SHALL continue to state the role explicitly in its meta pane.

#### Scenario: Personal projects are distinguishable in the index
- **WHEN** a visitor scans the projects listing
- **THEN** Author-role entries are prefixed with `~` while contributions are not

#### Scenario: Role stays explicit on detail pages
- **WHEN** a visitor opens any project detail page
- **THEN** the meta pane names the role (personal project or contributions) alongside the publication date
