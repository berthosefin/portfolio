# Tasks: syntax-highlight-theme

## 1. Token palettes

- [ ] 1.1 Define `--sh-*` variables under `:root` (light paper palette) in `app/globals.css`
- [ ] 1.2 Define `--sh-*` variables under `.dark` (terminal palette)
- [ ] 1.3 Add italic comment rule for `.sh__token--comment`

## 2. Validation

- [ ] 2.1 `npm run lint && npx tsc --noEmit && npm run build`
- [ ] 2.2 Eyeball `/projects/dots` in both themes: install command fully readable, strings/keywords/comments visibly distinct
- [ ] 2.3 `openspec validate syntax-highlight-theme --strict`
