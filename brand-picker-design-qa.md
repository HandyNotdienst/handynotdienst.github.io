# Brand-picker design QA

Final review: 2026-10-11. Result: implemented and verified locally for the approved brand-picker scope.

## Reference and states

Selected reference: the first brand-tile design, copied to `D:/handy-notdienst-singen.de/outputs/brand-picker-implementation-2026-10-02/selected-reference.png` (1536 × 1024 board).

The reference desktop region is 1152 × 1024; its mobile screen region is approximately 339 × 883. Final comparisons use German, dark theme, step 1 and Apple selected. Browser viewport requests were 1152 × 1024 and 339 × 1100; browser chrome/scrollbars reduce the captured content bounds. The comparison panels are scaled for side-by-side inspection, not a pixel-diff assertion. The initial-state handoff capture uses a 1440 px viewport and no selected brand or model.

Evidence folder: `D:/handy-notdienst-singen.de/outputs/brand-picker-implementation-2026-10-02/`.

## Visual review

| Surface | Outcome |
| --- | --- |
| Layout | Nine tiles in the approved 3×3 composition above a single search field; helper link beside the search label; grouped results below. Mobile retains all three columns without a carousel. |
| Typography | Existing site font, bold page heading, smaller section labels and readable result names retained. Long translated labels fit tested widths. |
| Color and states | Existing light/dark theme tokens; blue selected tiles; visible keyboard focus. Supplied black wordmarks receive a light backing in dark mode; white marks receive dark backing where needed. |
| Assets | Real supplied logos, existing model/family icons and stable fixed slots. No generated replacement logos or images of unrelated devices. |
| Copy and data | Ten-language labels, reset action, brand announcement and actual result counts. Grouped chronological catalog order replaces the mockup's illustrative first result. |

## Iterations completed

1. Added contrast backing for Redmi/Huawei and theme treatment for Sony so original wordmarks remain visible.
2. Adjusted padded Poco/Honor/Sony logo sizing within fixed slots; reduced the mobile scale after checking narrow-screen lettering.
3. Positioned the model-finder link beside the search label and removed the redundant visible search-hint row while retaining its accessible description.
4. Verified the 80-case responsive matrix after those changes.
5. Refreshed desktop/mobile captures on 2026-10-11 using the visible browser screenshot API. Earlier full-page captures could crop the right edge in the screenshot output even when DOM bounds fit; the final comparison files use the refreshed visible captures.

## Intentional differences from the generated reference

- The actual supplied Google Pixel logo is outlined, unlike the generated reference's filled mark. Original branding is preserved.
- Contrast backing for the supplied Redmi/Huawei artwork remains visible instead of recoloring those multicolor logos.
- Existing language/theme controls stay available on mobile. This can wrap the site name at the narrowest widths and increases header height.
- The filter reset and short brand hint add useful controls/copy absent from the illustrative mockup.
- Apple selection correctly reports 110 models, not the mockup's 305. The first result is iPhone 4 because the approved ordering is older generations first.
- The existing result list scroll behavior is retained; real groups and model icons replace the reference's single illustrative row.

## Final assessment

The approved composition, brand order, blue selection state and search/result hierarchy are present. No confirmed clipping, horizontal overflow or content overlap remains in the tested states. Light/dark and RTL checks are recorded in `brand-picker-verification.md`. No publication was performed.

Final comparison images: `comparison-desktop.png` and `comparison-mobile.png`. Handoff image: `handoff-desktop-20261011.png`.
