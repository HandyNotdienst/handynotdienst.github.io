# Brand picker audit — 2026-10-01

## Scope

The first step of `prices.html`: manufacturer selection, model search, result list, keyboard focus, responsive layout, and existing image fallbacks.

## Evidence

- `catalog.json` contains 305 models across 9 brands and is the accepted pricing source of truth.
- `prices.html` currently uses a native `select#brand`, one search input, and an ungrouped `#model-results` list.
- `catalog-guided.mjs` currently filters through `filterModels()` and selects a model only from an explicit result button.
- Existing image assets include iPhone images, Apple Watch icon, Samsung series icons, Samsung model images, and existing catalog icon assets.

## Checklist review

The Front-End Checklist `review_code` pass found global heuristic warnings for heading hierarchy, critical CSS, fixed pixel values, specificity, script loading, image format negotiation, inline theme bootstrap, and resource hints. The rendered page has one visible configurator heading; the remaining warnings are existing page-wide patterns or require rendered-network evidence, so they are outside this focused picker change. The new implementation will keep the existing inline theme bootstrap, module loading, tokens, and legacy flows unchanged.

Relevant rules verified before editing:

- `alt-text` and `input-image-alt`: tile and model image assets must have an accessible alternative through the containing control; decorative repeated images use empty `alt`.
- `keyboard-navigation`: manufacturer and model controls remain native keyboard-focusable buttons with visible focus states.
- `dimensions` and `responsive-images`: fixed image slots receive explicit dimensions and responsive sizing.
- `heading-hierarchy`: model-family headings will follow the existing page `h1` with `h2`/`h3` semantics.

## Implementation priorities

1. Keep model selection explicit and preserve current URL/deep-link behavior.
2. Keep catalog data, prices, availability, legacy price pages, and Samsung legacy logic unchanged.
3. Preserve all ten languages, RTL layout, light/dark themes, and mobile overflow constraints.
