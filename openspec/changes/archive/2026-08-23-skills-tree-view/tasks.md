# Tasks: skills-tree-view

## 1. Tree rendering

- [x] 1.1 Rewrite components/skills.tsx: in-component PromptLine with live `-P` command, single-pane ASCII tree (kebab-case dirs + `/`, muted connectors, brand-tinted business-domain branch), `*` markers + footnote, computed summary line

## 2. Filtering

- [x] 2.1 Prune-style filtering: case-insensitive leaf matching, empty categories pruned, zeroed summary on no-match, reset button intact

## 3. Wrapper

- [x] 3.1 Remove the static PromptLine from app/skills/page.tsx

## 4. Verification

- [x] 4.1 npm run build passes; tree counts match skills.json content
- [x] 4.2 openspec validate skills-tree-view --strict passes
