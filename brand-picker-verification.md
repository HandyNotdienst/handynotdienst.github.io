# Brand tiles and grouped model picker — verification

Completed locally on 2026-10-11. Implementation and the full browser matrix were tested on 2026-10-02; automated checks and the final browser smoke test were repeated on 2026-10-11.

## Scope and repository

- Branch: `codex/brand-tiles-model-order-2026-10-01`.
- Base: local `origin/main`, `9810ca5ba2c60d3b6b9020d252502c37f8296a7c`.
- Preview: http://127.0.0.1:4222/prices.html?lang=de&theme=dark
- No push, publication or PR was performed for this change.
- Existing untracked `design-qa.md`, `implementation-audit.md` and `verification-report.md` were preserved. This report and `brand-picker-design-qa.md` describe only the brand-picker change.

## Delivered behavior

Nine native toggle buttons show the supplied manufacturer logos in the approved order. They retain three columns on mobile. `Alle Marken` clears the brand filter. Search text and brand filtering combine; neither selects a model automatically. Only an explicit model result advances to the repair step.

The optional `brand` URL parameter restores the filter. A selected model determines its own brand. Invalid parameters normalize to an available step. Back/Forward, existing model/repair links, language and theme changes preserve the applicable state.

Apple groups are iPhone, iPad and Apple Watch. Samsung groups follow Galaxy S, A, Note, Z, M, J, then other existing families; empty groups are omitted. Other manufacturers use prefixes actually present in the catalog. Models are ordered by generation/release cohort, with stable variant ordering and original catalog order for ties. This is not a day-by-day release-date database. Older generations come first; Samsung A/M cohorts prevent a purely numeric ordering from interleaving older and newer generations.

The picker uses existing exact model images, existing family icons or the manufacturer logo. The presentation metadata does not change the catalog. Fixed image slots, explicit dimensions, empty decorative alt text and named buttons prevent duplicate announcements and layout shifts.

## Automated checks

| Check | Result |
| --- | --- |
| `node --test tests/catalog-guided.test.mjs` | 16 passed, 0 failed |
| `node --check` for `catalog-state.mjs`, `catalog-guided.mjs`, `catalog.mjs`, `assets/i18n/guided.js`, `sw.js` | Passed |
| `git diff --check` | Passed |
| Catalog byte/hash comparison | Unchanged |
| Picker asset existence and cache inclusion | Passed for every catalog model/family icon and all nine logos |
| Service worker asset inventory | All 290 local cache paths exist |

Tests cover brand/group order, Apple and Samsung ordering, stable ties, icon fallbacks, brand URL normalization and round trips, parent-selection resets, all catalog option links, unknown prices, availability, translations, WhatsApp serialization and cache versions. There is no configured package build or lint task in this static site.

Catalog SHA-256: `2eb72a9e8771584e6af23f98c5cfe2bf6ecea9c2f045d628eb37493fb42d307e`.

The catalog still contains 305 models across nine brands, with 2,536 options: 1,767 fixed-price and 769 price-on-request entries. Prices, availability and catalog version were not modified. Legacy pricing files and their Samsung flow have no changes.

UI version: `HN-GUIDED-PRICES-V2-2026-10-01`. Service worker cache: `hn-v79-brand-picker-20261002-r1`. Pricing version remains `HN-PRICING-V1-2026-09-25`.

## Browser verification

The Codex in-app browser was used against the local HTTP preview. No WhatsApp message was sent.

| Scenario | Result |
| --- | --- |
| Initial state | Nine unselected brands, 305 results, no selected model |
| Every brand | Apple 110; Samsung 132; Google 16; Xiaomi 7; Redmi 8; Poco 5; Honor 6; Huawei 17; Sony 4 |
| Brand and search combination | Search remains when switching brands; empty results and reset verified |
| Explicit model choice | Result click advances to step 2; input alone does not |
| History and links | Back/Forward, old model/repair links, conflicting brand and shipping parameter verified |
| Repair flow | Display selection, six-option expansion, explicit Premium selection, edit model and full request summary verified |
| Language and theme | Selected model, repair and option retained |
| Keyboard | Tab moves between tiles; Enter selects; visible 3px focus; count announcement updated |
| Loading failure | Intentional first catalog request failure displays retry; retry restores 305 models |
| WhatsApp local/shipping | Decoded link text reviewed for model, repair, part, price and delivery; no transmission |
| Final smoke test, 2026-10-11 | All nine logos loaded; 305 results; zero pressed tiles after reset; one visible H1; no warning/error console entries |

The responsive matrix contains 80 combinations: 320, 390, 768 and 1440 px; ten languages (`de`, `uk`, `en`, `ru`, `pl`, `it`, `ar`, `ku`, `fr`, `sl`); light and dark themes. Every combination retained nine tiles in three columns and the selected Apple filter, with zero controls outside the viewport and no horizontal overflow. Arabic and Kurdish retained RTL. German and Arabic screenshots were visually inspected alongside the reference. The final comparison was refreshed on 2026-10-11.

Accessibility names and states were checked through the DOM/accessibility tree and keyboard interaction. A separate assistive-technology session with NVDA/VoiceOver and physical-device testing were not performed.

## Front-End Checklist

The pre-edit report is `brand-picker-audit.md`. `review_code`, `search_rules` and targeted rule verification were performed before implementation. Post-edit JavaScript review returned no Critical/High findings. Targeted keyboard-navigation, focus-styles, dimensions and horizontal-scroll checks reported no obvious issue and were followed by browser verification.

Two HTML/CSS heuristic warnings were manually resolved as unconfirmed findings:

- **Heading hierarchy / multiple H1:** the DOM has a hidden load-error H1 and the visible wizard H1. The final successful state exposes exactly one visible H1. The load-error and wizard states are mutually exclusive.
- **Image format / picture element:** the flagged picker images are fixed-size decorative manufacturer logos and existing icons. They have dimensions and named containing buttons. The review supplied no rendered evidence that art direction or a `picture` element was necessary for these assets. Empty alt text is intentional for these decorative images.

No confirmed Critical or High issue remains within this change's scope. This is a focused picker review, not a claim that the entire site's unrelated code has been exhaustively audited.

## Evidence

Artifacts: `D:/handy-notdienst-singen.de/outputs/brand-picker-implementation-2026-10-02/`.

- `responsive-matrix.json`: all 80 viewport/language/theme observations.
- `brand-checks.json`: brand counts and group observations.
- `comparison-desktop.png`, `comparison-mobile.png`: selected mockup beside final implementation.
- `reference-desktop-20261011.png`, `reference-mobile-20261011.png`: refreshed reference-state captures.
- `handoff-desktop-20261011.png`: initial all-brands state for handoff.
- `de-*.jpg` and `ar-*.jpg`: theme and viewport evidence from the full matrix.

Presentation-only chronology references used during implementation: [Apple iPhone identification](https://support.apple.com/en-us/108044), [Apple iPad identification](https://support.apple.com/en-us/108043), [Apple Watch identification](https://support.apple.com/en-us/108056), [Samsung A-series guide](https://www.samsung.com/ae/mobile-phone-buying-guide/best-samsung-a-series-phone/), [Samsung 2020 A-series announcement](https://news.samsung.com/us/galaxy-a-series-a11-a21-a51-a71-galaxy-for-everyone), and [Samsung 2019 A-series announcement](https://news.samsung.com/it/samsung-presenta-galaxy-a-la-gamma-di-smartphone-di-nuova-generazione).
