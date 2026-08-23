## Purpose

Defines the curated content of the portfolio: which projects are presented and how the skill catalog is structured, so that every displayed item reflects the owner's real, verifiable profile (business-application builder + open-source/Linux contributor) without filler entries.

## ADDED Requirements

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
