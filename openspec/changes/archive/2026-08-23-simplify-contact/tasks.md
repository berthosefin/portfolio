# Tasks: simplify-contact

## 1. Contact page

- [x] 1.1 Rewrite app/contact/page.tsx as static directory (PromptLine cat ~/contact.txt + single Pane of link rows: email, linkedin, whatsapp)
- [x] 1.2 Delete components/contact-form.tsx, lib/actions.ts, lib/schemas.ts, components/ui/sonner.tsx
- [x] 1.3 Remove Toaster import/mount from components/providers.tsx

## 2. Cleanup

- [x] 2.1 npm uninstall nodemailer @types/nodemailer react-hook-form @hookform/resolvers zod sonner
- [x] 2.2 Purge EMAIL_* lines from .env.local

## 3. Section links

- [x] 3.1 Replace "view all" in components/featured-skills.tsx with $ cd /skills → pattern

## 4. Verification

- [x] 4.1 npm run build passes; /contact renders without any form field; no leftover imports of deleted modules
- [x] 4.2 openspec validate simplify-contact --strict passes
