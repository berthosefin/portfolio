# portfolio-content Specification

## Purpose

Defines the curated content of the portfolio: which projects are presented and how the skill catalog is structured, so that every displayed item reflects the owner's real, verifiable profile (business-application builder + open-source/Linux contributor) without filler entries.

## Requirements

### Requirement: Curated project catalog
The projects page SHALL list exactly these six projects: `randanarana`, `gesthos-tva`, `gesthos-commercial-web-app`, `volafin`, `kotisthos`, `dots`. No other project SHALL appear anywhere on the site (listing, recents, or direct navigation).

#### Scenario: Projects listing shows only curated projects
- **WHEN** a visitor opens `/projects`
- **THEN** exactly the six curated projects are displayed, ordered by publication date (newest first)

#### Scenario: Removed projects are unreachable
- **WHEN** a visitor navigates to `/projects/lv-mgz`, `/projects/dotfiles`, `/projects/githread`, or `/projects/immob-agence`
- **THEN** the site responds with the not-found page

#### Scenario: Removed project assets are purged
- **WHEN** the repository is inspected after implementation
- **THEN** no MDX file or referenced screenshot for the four removed projects remains under `data/projects/` or `public/images/`

### Requirement: Skill catalog reflects real technology choices
The skill catalog SHALL NOT contain any of: Redux, Material-UI, Express, MongoDB, MySQL, SQLite, Django, Python, HTML5, CSS3, jose, date-fns, Sonner, Vercel, Netlify, Render, ESLint, Prettier, TanStack Table.

#### Scenario: Filler skills absent
- **WHEN** a visitor browses the skills page or featured skills on the home page
- **THEN** none of the removed skills appear in any category

### Requirement: Business-domain skill category
The skill catalog SHALL include a dedicated "Business Domain" category containing at least: Accounting, Payroll Management, VAT Management, Commercial Management. These entries represent professional experience, not tool familiarity.

#### Scenario: Business expertise visible
- **WHEN** a visitor opens `/skills`
- **THEN** a distinct Business Domain section lists accounting and payroll-related competencies alongside technical categories

### Requirement: Technical skill core preserved
The skill catalog SHALL retain the verified technical core: TypeScript, JavaScript, Rust, React, Next.js, TanStack Start, TanStack Query, shadcn/ui, Tailwind CSS, Zustand, Zod, Recharts, Node.js, NestJS, Prisma, PostgreSQL, Docker, Git, Linux, Vim, Bash, Cargo, CI/CD. Featured flags SHALL mark the technologies evidenced by multiple shipped projects.

#### Scenario: Core stack intact
- **WHEN** the skill data is rendered
- **THEN** all listed core technologies remain present with their featured status consistent with project evidence

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

### Requirement: Direct contact channels
The contact page SHALL list exactly three channels in this order: email first, LinkedIn profile second, WhatsApp third. Each entry SHALL be a working link (`mailto:` or `https://`) whose visible text shows the real address or handle. No other contact channel SHALL be presented.

#### Scenario: Channel order and targets
- **WHEN** the contact page renders
- **THEN** email appears above LinkedIn, LinkedIn appears above WhatsApp, and each row navigates to the correct mail or external target
