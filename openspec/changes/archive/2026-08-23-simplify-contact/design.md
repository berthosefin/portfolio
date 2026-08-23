# Design: simplify-contact

## Context

The TUI redesign established Pane/PromptLine primitives and the project index now uses full-row link rows with terminal-selection hover (`components/projects.tsx`). The contact page still mounts a react-hook-form + nodemailer stack requiring 6 `EMAIL_*` env vars. See proposal.md — Why.

## Goals / Non-Goals

- Goals: static contact directory, zero mail machinery, consistent section links.
- Non-Goals: no email obfuscation (plain `mailto:`, user decision), no copy-to-clipboard affordances, no i18n (deferred).

## Decisions

- **D1 — Layout**: PromptLine `$ cat ~/contact.txt` above a single Pane labeled `~/contact.txt`. Each channel is one full-row `<a>`: key in `text-muted-foreground` at fixed width, value in `text-foreground` truncated on overflow. Row hover = `bg-accent`, same selection language as the project index.
- **D2 — Values inline**: the three channels are hardcoded in `app/contact/page.tsx`. A data file for 3 rows is ceremony; if channels multiply later, extraction is trivial.
- **D3 — Deletion order**: delete consuming components first, then uninstall deps in a single `npm uninstall`, then purge env lines — so no intermediate state has dangling imports.
- **D4 — Toaster removal**: `providers.tsx` loses the import + mount; `components/ui/sonner.tsx` is deleted since the form was its only consumer.

## Risks / Trade-offs

- Plain `mailto:` invites scraping; accepted for a personal portfolio (user decision).
- Losing the form removes async messaging for visitors without any of the three channels; accepted — the audience for this site always has email or WhatsApp.

## Open Questions

(none)
