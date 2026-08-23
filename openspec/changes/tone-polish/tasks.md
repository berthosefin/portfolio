# Tasks: tone-polish

## 1. Duotone portrait

- [ ] 1.1 Add `.duotone` utility (teal gradient container + `screen` blend recipe) to `app/globals.css` components layer
- [ ] 1.2 Wrap the portrait `Image` in `components/intro.tsx` with the `.duotone` div, keeping alt text
- [ ] 1.3 Widen pane/image from 150px to 192px

## 2. Light paper density

- [ ] 2.1 Update light tokens: `--background: 40 20% 94%`, `--muted: 40 12% 89%`

## 3. Validation

- [ ] 3.1 `npm run lint && npx tsc --noEmit && npm run build`
- [ ] 3.2 Eyeball both themes on `/`: duotone holds in dark and light, face recognizable; sweep `/skills` in light mode for token hierarchy (bg < muted < card)
- [ ] 3.3 `openspec validate tone-polish --strict`
