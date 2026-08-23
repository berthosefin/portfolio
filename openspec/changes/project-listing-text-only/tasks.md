# Tasks: project-listing-text-only

## 1. Data & assets

- [x] 1.1 Remove `image:` frontmatter from dots.mdx, gesthos-commercial-web-app.mdx, gesthos-tva.mdx, kotisthos.mdx, volafin.mdx
- [x] 1.2 Delete dots.png, gesthos-commercial.png, gesthos-tva.png, kotisthos.png, volafin.png from public/images/
- [x] 1.3 Remove `image?: string` from ProjectMetadata in lib/projects.ts

## 2. Projects index

- [x] 2.1 Rewrite components/projects.tsx as ls-style rows inside a single Pane (marker, name link, date, summary, tags, row hover)
- [x] 2.2 Strip Tabs from components/projects-with-filter.tsx, keep search input + reset
- [x] 2.3 Update app/projects/page.tsx prompt line if needed for the new presentation

## 3. Project detail

- [x] 3.1 Replace hero image block in app/projects/[slug]/page.tsx with meta Pane (title label, role+date, buttons, tags)

## 4. Verification

- [x] 4.1 npm run build passes; no route references deleted images
- [x] 4.2 openspec validate project-listing-text-only --strict passes
