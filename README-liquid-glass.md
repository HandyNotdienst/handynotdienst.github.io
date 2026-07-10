# Handy Notdienst Liquid Glass

Apple/VisionOS-inspired Liquid Glass material for the static Handy Notdienst site.
It is a progressive enhancement: HTML content stays accessible, while a decorative
WebGL layer adds controlled refraction where a texture is available.

## Files

- `src/liquidGlass.js` - reusable ES module, API, WebGL lifecycle, fallback logic.
- `src/liquidGlass.css` - shared material CSS and fallback styling.
- `src/shaders/vertex.glsl` - fullscreen quad vertex shader.
- `src/shaders/fragment.glsl` - refraction, blur, fresnel, chromatic shift and highlights.
- `liquid-glass-demo.html` - standalone demo; production `index.html` remains unchanged.

## Architecture

The engine wraps an existing element with a decorative canvas:

1. The original HTML element receives `.liquid-glass`.
2. If a texture is configured and WebGL2 is available, a canvas is prepended.
3. The shader samples the controlled texture and renders subtle glass distortion.
4. If anything fails, the element keeps the CSS fallback: `backdrop-filter`, tint,
   border glow and shadow.

The canvas has `aria-hidden="true"`, `role="presentation"` and `pointer-events:none`.
The real links, buttons, headings and text stay in the DOM.

## Shader Pipeline

The fragment shader performs:

- 9-tap soft texture blur.
- Subtle UV refraction from procedural noise.
- Minimal chromatic aberration by shifting red/blue channels only a few pixels.
- Fresnel-like edge glow based on rounded-rectangle edge distance.
- Slow specular highlight and light sweep.
- Inner highlight for a thicker, less flat material feeling.

This is an Apple-inspired material, not an Apple implementation.

## API

```js
import { LiquidGlass } from "./src/liquidGlass.js";

const glass = new LiquidGlass({
  element: ".glass",
  texture: "assets/hero/owner-repair-960.jpg",
  preset: "hero",
  intensity: 0.6,
  blur: 18,
  opacity: 0.42,
  saturation: 1.16,
  brightness: 1.05,
  refraction: 0.18,
  distortion: 0.12,
  chromaticAberration: 0.08,
  highlightIntensity: 0.42,
  borderGlow: 0.52,
  canvasOpacity: 0.28,
  borderRadius: 28,
  shadowStrength: 0.35,
  animationSpeed: 0.42,
  mouseStrength: 0.42,
  scrollStrength: 0.18,
  interactive: true
});

glass.setOptions({ refraction: 0.12 });
glass.destroy();
```

Enhance all marked surfaces:

```js
LiquidGlass.enhanceAll("[data-liquid-glass]");
```

Markup:

```html
<div
  class="card"
  data-liquid-glass="media"
  data-liquid-glass-texture="assets/phones/iphone-12-pro-max.png"
  data-liquid-glass-refraction="0.06">
  ...
</div>
```

For content-heavy cards, prefer the quiet readable material:

```html
<div class="card" data-liquid-glass="text-panel">
  ...
</div>
```

## Presets

- `nav` - subtle header/docked navigation material.
- `text-panel` - readable CSS-first material for text-heavy cards.
- `panel` - general premium cards with restrained values.
- `media` - controlled WebGL refraction for image/product previews.
- `hero` - stronger refraction for demo/high-value media surfaces.
- `dock` - bottom navigation/dock material.
- `subtle` - low-intensity fallback-style glass.

## Controlled Texture Mode

Real refraction needs something stable to sample. Use one of:

- Image URL: `data-liquid-glass-texture="assets/hero/owner-repair-960.jpg"`
- DOM media selector: `data-liquid-glass-texture="#heroCanvas"`
- Generated texture: `data-liquid-glass-texture="gradient"`

If no texture is provided, the element uses the CSS fallback material. This is
intentional for headers, mobile navigation and small cards where a WebGL context
would not add enough value. Avoid using generated textures behind long text;
use `text-panel` so readability stays stronger than the material effect.

## Performance

Implemented safeguards:

- Lazy ES module import from `app.js` only when a marked surface approaches viewport.
- IntersectionObserver renders only visible WebGL surfaces.
- ResizeObserver updates geometry without polling.
- Hidden or tiny responsive surfaces stay on the CSS material until they become
  renderable, instead of opening a WebGL context at `1x1`.
- Device pixel ratio cap: desktop up to `1.6`, mobile/balanced up to `1.15`.
- Maximum of six active WebGL surfaces per page; the rest use CSS fallback.
- `prefers-reduced-motion: reduce` disables WebGL animation and uses static fallback.

Recommended usage:

- Use WebGL texture mode only for large premium surfaces.
- Use CSS fallback-only glass for header, mobilebar and dense lists.
- Avoid putting WebGL glass on every repeated card.

## Accessibility

- Decorative canvas is hidden from assistive tech.
- No information is encoded only in the shader.
- The module respects reduced motion.
- Existing focus states and semantic HTML remain responsible for interaction.

## Web Component

```js
import { defineLiquidGlassElement } from "./src/liquidGlass.js";
defineLiquidGlassElement();
```

```html
<liquid-glass texture="gradient" preset="panel">
  <button>Jetzt anfragen</button>
</liquid-glass>
```

## GSAP Compatibility

Animate the host element with GSAP as usual. The canvas is absolute and decorative.
After large size animations, call `instance.setOptions({})` or trigger a resize
event if you need an immediate geometry refresh.

## React Wrapper Example

```jsx
import { useEffect, useRef } from "react";
import { LiquidGlass } from "./src/liquidGlass.js";

export function LiquidGlassPanel({ texture, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const instance = new LiquidGlass({ element: ref.current, texture, preset: "panel" });
    return () => instance.destroy();
  }, [texture]);

  return <div ref={ref}>{children}</div>;
}
```

## Vue Wrapper Example

```js
import { onMounted, onBeforeUnmount, ref } from "vue";
import { LiquidGlass } from "./src/liquidGlass.js";

export default {
  setup() {
    const el = ref(null);
    let instance;
    onMounted(() => {
      instance = new LiquidGlass({ element: el.value, texture: "gradient" });
    });
    onBeforeUnmount(() => instance?.destroy());
    return { el };
  }
};
```

## Future Extensions

- Multiple stacked glass layers for special hero compositions.
- Video textures for high-end campaign pages.
- Material presets for "thin", "thick", "chrome" and "soft".
- Adaptive texture choice based on the active theme and surrounding background.
