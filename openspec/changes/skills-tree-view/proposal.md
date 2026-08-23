# Skills Page: Real Directory Tree

## Why

The skills page prompt promises `tree ~/skills` but renders a chip grid — the command lies. Rendering an actual ASCII tree makes the page the purest expression of the site's terminal identity, and the existing search input maps natively onto `tree -P` prune semantics.

## What Changes

- **BREAKING (visual)**: `/skills` replaces the category pane grid with a single Pane rendering a real directory tree: categories as kebab-case directories with trailing `/`, skills as leaves, box-drawing characters (`├──`, `└──`, `│`) in muted color.
- The `business-domain/` subtree is visually tinted with the brand color to preserve its distinct status without extra chrome.
- Supporting tools keep their `*` suffix and the existing footnote; featured skills are unmarked and full-brightness.
- The search filter behaves like `tree ~/skills -P "*<query*"`: the displayed command updates live to include the `-P` pattern, non-matching branches are pruned, and an empty result renders the root with a zeroed summary instead of an error line.
- A real-`tree` summary footer closes the output: `6 directories, 31 skills`.
- The home featured-skills section is unchanged (`$ grep -i "featured" ~/skills.json` stays — flat extraction vs. hierarchical view).

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `terminal-ui`: adds requirements for the tree-rendered skills index and its prune-style filtering.

## Impact

- `components/skills.tsx` — rewritten (tree layout, path-based filtering, live command line).
- No data changes; `data/skills.json` untouched. `app/skills/page.tsx` wrapper untouched.
