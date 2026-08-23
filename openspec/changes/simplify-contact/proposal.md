# Contact Page: Static Directory, No Form

## Why

The contact form forces the portfolio to carry server-side mail machinery (nodemailer transport, 6 `EMAIL_*` env vars) and six npm dependencies for a channel visitors rarely prefer over direct contact. A static directory of direct channels removes all of it while staying fully in character with the terminal design.

## What Changes

- **BREAKING**: The `/contact` page no longer offers a message form. It renders a static contact directory — a prompt line (`$ cat ~/contact.txt`) above one labeled Pane whose rows are links: `email`, `linkedin`, `whatsapp` (muted key + value), ordered email → LinkedIn → WhatsApp, row hover matching the project index selection style.
- Form stack deleted: `components/contact-form.tsx`, `lib/actions.ts` (nodemailer server action), `lib/schemas.ts` (`ContactFormSchema`), `components/ui/sonner.tsx` and its `<Toaster />` mount in `providers.tsx`.
- Dependencies removed: `nodemailer`, `@types/nodemailer`, `react-hook-form`, `@hookform/resolvers`, `zod`, `sonner`.
- `EMAIL_*` variables purged from `.env.local`.
- Home featured-skills section link changes from prose "view all" to the shell pattern `$ cd /skills →` already used by recent projects.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `terminal-ui`: adds requirements for the static contact page presentation (no form, link rows in one pane) and prompt-style cross-section links.
- `portfolio-content`: adds a requirement fixing the exact contact channels, their order, and their link targets.

## Impact

- `app/contact/page.tsx` — rewritten as static directory.
- Deleted files: `components/contact-form.tsx`, `lib/actions.ts`, `lib/schemas.ts`, `components/ui/sonner.tsx`.
- `components/providers.tsx` — Toaster import/mount removed.
- `components/featured-skills.tsx` — link restyled; `ArrowRightIcon` usage replaced by the `$ cd` pattern.
- `.env.local` — 6 `EMAIL_*` lines removed.
- `package.json` / lockfile — 6 dependencies dropped; bundle sheds react-hook-form/zod/sonner/nodemailer from the `/contact` route (~24 kB First Load on that route today).
