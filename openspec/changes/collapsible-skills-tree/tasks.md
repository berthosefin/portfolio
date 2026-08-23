## 1. Collapsible branches

- [x] 1.1 Add collapsed-state `Set<string>` in `components/skills.tsx` with a toggle handler; skip leaf rows of collapsed branches when no query is active
- [x] 1.2 Render dir lines as keyboard-accessible toggle buttons with row-hover language (`cursor-pointer transition-colors hover:text-brand`)
- [x] 1.3 Show dimmed item-count suffix (e.g. ` (7)`) on collapsed dir lines
- [x] 1.4 Make the summary line count only currently visible branches/skills

## 2. Filter precedence

- [x] 2.1 Ensure an active `-P` query renders pruned branches expanded regardless of collapse states, and clearing the query restores manual collapse states untouched

## 3. Terminal favicon

- [x] 3.1 Add `app/icon.svg` with `>_` glyph in brand teal on a sharp-cornered dark tile and remove the default `app/favicon.ico`

## 4. Verification

- [x] 4.1 Run lint/typecheck and build; verify toggling, filter precedence, visible-only summary, and favicon output
- [x] 4.2 Preserve tree connector indentation (`whitespace-pre` on the pane content so collapsed-space runs render nested)
