const DEFAULT_VERTEX_SHADER = `
precision highp float;
attribute vec2 aPosition;
attribute vec2 aUv;
varying vec2 vUv;
void main() {
  vUv = aUv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const DEFAULT_FRAGMENT_SHADER = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform float uScroll;
uniform float uIntensity;
uniform float uBlur;
uniform float uOpacity;
uniform float uSaturation;
uniform float uBrightness;
uniform float uRefraction;
uniform float uDistortion;
uniform float uChromaticAberration;
uniform float uHighlightIntensity;
uniform float uBorderGlow;
uniform float uBorderRadius;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x),u.y);}
float fbm(vec2 p){float v=0.0;float a=0.5;for(int i=0;i<4;i++){v+=a*noise(p);p*=2.03;a*=0.5;}return v;}
float roundedRectAlpha(vec2 uv,float radiusPx){vec2 s=uResolution;vec2 p=(uv-0.5)*s;vec2 h=s*0.5;float r=min(radiusPx,min(h.x,h.y)-1.0);vec2 q=abs(p)-h+r;float d=length(max(q,0.0))+min(max(q.x,q.y),0.0)-r;return 1.0-smoothstep(-1.5,1.5,d);}
vec3 saturateColor(vec3 color,float amount){float gray=dot(color,vec3(0.299,0.587,0.114));return mix(vec3(gray),color,amount);}
vec4 sampleGlass(vec2 uv,float blurPx){vec2 px=1.0/max(uResolution,vec2(1.0));vec2 o=px*blurPx;vec4 c=texture2D(uTexture,uv)*0.28;c+=texture2D(uTexture,uv+vec2(o.x,0.0))*0.10;c+=texture2D(uTexture,uv-vec2(o.x,0.0))*0.10;c+=texture2D(uTexture,uv+vec2(0.0,o.y))*0.10;c+=texture2D(uTexture,uv-vec2(0.0,o.y))*0.10;c+=texture2D(uTexture,uv+vec2(o.x,o.y))*0.08;c+=texture2D(uTexture,uv+vec2(-o.x,o.y))*0.08;c+=texture2D(uTexture,uv+vec2(o.x,-o.y))*0.08;c+=texture2D(uTexture,uv+vec2(-o.x,-o.y))*0.08;return c;}
void main(){vec2 uv=vUv;vec2 centered=uv-0.5;float t=uTime*0.08;float n=fbm(uv*8.0+vec2(t,-t*0.7+uScroll*0.001));vec2 normal=normalize(vec2(fbm(uv*9.0+vec2(2.0,t))-0.5,fbm(uv*9.0+vec2(-t,4.0))-0.5)+0.0001);float edge=smoothstep(0.34,0.72,length(centered*vec2(uResolution.x/max(uResolution.y,1.0),1.0)));vec2 mousePull=(uMouse-0.5)*0.007*uIntensity;vec2 refractOffset=normal*(0.003+uRefraction*0.018)*uIntensity;refractOffset+=centered*edge*uRefraction*0.006;refractOffset+=mousePull*(0.35+edge);refractOffset+=(n-0.5)*uDistortion*0.012;vec2 distortedUv=clamp(uv+refractOffset,0.002,0.998);float blurPx=mix(0.6,6.0,clamp(uBlur/28.0,0.0,1.0));vec4 base=sampleGlass(distortedUv,blurPx);float ca=uChromaticAberration*0.0035;float red=texture2D(uTexture,clamp(distortedUv+normal*ca,0.0,1.0)).r;float blue=texture2D(uTexture,clamp(distortedUv-normal*ca,0.0,1.0)).b;base.r=mix(base.r,red,0.22);base.b=mix(base.b,blue,0.22);vec3 color=saturateColor(base.rgb,uSaturation)*uBrightness;color=mix(color,vec3(0.88,0.96,1.0),0.04*uIntensity);float fresnel=pow(edge,2.2)*uBorderGlow;vec2 lightPos=mix(vec2(0.18,0.12),vec2(0.86,0.22),0.5+0.5*sin(uTime*0.18));lightPos=mix(lightPos,uMouse,0.28);float spec=pow(max(0.0,1.0-distance(uv,lightPos)*2.4),4.0)*uHighlightIntensity;float sweep=smoothstep(0.015,0.0,abs((uv.x+uv.y*0.32)-(0.18+0.18*sin(uTime*0.16))))*0.18*uHighlightIntensity;float inner=smoothstep(0.72,0.0,length(centered))*0.025;color+=vec3(0.70,0.90,1.0)*fresnel*0.22;color+=vec3(1.0,1.0,0.96)*(spec*0.55+sweep*0.55+inner);float alpha=roundedRectAlpha(uv,uBorderRadius);float opacity=clamp(uOpacity+fresnel*0.08+spec*0.04,0.0,0.86);gl_FragColor=vec4(color,opacity*alpha);}
`;

const DEFAULTS = {
  element: null,
  texture: "",
  preset: "panel",
  intensity: 0.62,
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
  borderRadius: null,
  shadowStrength: 0.35,
  animationSpeed: 0.42,
  mouseStrength: 0.42,
  scrollStrength: 0.18,
  interactive: true,
  maxPixelRatio: 1.6,
  shaderBasePath: "./src/shaders/",
};

const PRESETS = {
  nav: { opacity: 0.30, blur: 14, refraction: 0.06, distortion: 0.03, borderGlow: 0.28, highlightIntensity: 0.16, shadowStrength: 0.18, canvasOpacity: 0 },
  panel: { opacity: 0.38, blur: 16, refraction: 0.08, distortion: 0.04, borderGlow: 0.30, highlightIntensity: 0.18, shadowStrength: 0.26, canvasOpacity: 0.18 },
  "text-panel": { opacity: 0.72, blur: 12, refraction: 0.02, distortion: 0.01, borderGlow: 0.20, highlightIntensity: 0.10, shadowStrength: 0.24, canvasOpacity: 0 },
  media: { opacity: 0.34, blur: 14, refraction: 0.08, distortion: 0.035, borderGlow: 0.34, highlightIntensity: 0.22, shadowStrength: 0.28, canvasOpacity: 0.42 },
  hero: { opacity: 0.42, blur: 16, refraction: 0.10, distortion: 0.045, borderGlow: 0.34, highlightIntensity: 0.24, shadowStrength: 0.32, canvasOpacity: 0.34 },
  dock: { opacity: 0.38, blur: 16, refraction: 0.05, distortion: 0.025, borderGlow: 0.30, highlightIntensity: 0.16, shadowStrength: 0.28, canvasOpacity: 0 },
  subtle: { opacity: 0.24, blur: 10, refraction: 0.04, distortion: 0.02, borderGlow: 0.18, highlightIntensity: 0.12, shadowStrength: 0.14, canvasOpacity: 0.12 },
};

const shaderCache = new Map();
const MAX_WEBGL_INSTANCES = 6;
let activeWebglInstances = 0;
const prefersReducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function numberOption(value, fallback) {
  if (value === undefined || value === null || value === "") return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function resolveElement(element) {
  if (typeof element === "string") return document.querySelector(element);
  return element instanceof Element ? element : null;
}

function getQualityTier() {
  const cores = navigator.hardwareConcurrency || 4;
  const mobile = window.matchMedia?.("(max-width: 720px)")?.matches;
  if (prefersReducedMotion()) return "static";
  if (mobile || cores <= 4) return "balanced";
  return "high";
}

function getDevicePixelRatio(options) {
  const tier = getQualityTier();
  const cap = tier === "high" ? options.maxPixelRatio : 1.15;
  return clamp(window.devicePixelRatio || 1, 1, cap);
}

async function fetchShader(url, fallback) {
  if (shaderCache.has(url)) return shaderCache.get(url);
  try {
    const response = await fetch(url, { cache: "force-cache" });
    if (!response.ok) throw new Error(`Shader request failed: ${url}`);
    const source = await response.text();
    shaderCache.set(url, source);
    return source;
  } catch {
    shaderCache.set(url, fallback);
    return fallback;
  }
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || "Unknown shader compile error";
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function createProgram(gl, vertexSource, fragmentSource) {
  const program = gl.createProgram();
  const vertex = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) || "Unknown shader link error";
    gl.deleteProgram(program);
    throw new Error(message);
  }
  return program;
}

function getBorderRadiusPx(element, configured) {
  if (configured !== null && configured !== undefined && configured !== "") return Number(configured) || 0;
  const computed = getComputedStyle(element).borderTopLeftRadius || "0";
  return Number.parseFloat(computed) || 0;
}

function createGradientTexture(size = 384) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const bg = ctx.createLinearGradient(0, 0, size, size);
  bg.addColorStop(0, "#16364a");
  bg.addColorStop(0.42, "#0f2a3c");
  bg.addColorStop(0.76, "#102333");
  bg.addColorStop(1, "#071421");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);
  ctx.globalAlpha = 0.16;
  for (let i = 0; i < 8; i += 1) {
    const x = Math.sin(i * 1.77) * size * 0.38 + size * 0.5;
    const y = Math.cos(i * 1.31) * size * 0.38 + size * 0.5;
    const r = size * (0.12 + (i % 3) * 0.04);
    const glow = ctx.createRadialGradient(x, y, 0, x, y, r);
    glow.addColorStop(0, i % 2 ? "#35d765" : "#d8f1ff");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, size, size);
  }
  return canvas;
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

async function resolveTextureSource(texture) {
  if (texture === "gradient") return createGradientTexture();
  if (texture instanceof HTMLCanvasElement || texture instanceof HTMLImageElement || texture instanceof HTMLVideoElement) return texture;
  if (typeof texture === "string") {
    let selected = null;
    try {
      selected = document.querySelector(texture);
    } catch {
      selected = null;
    }
    if (selected instanceof HTMLCanvasElement || selected instanceof HTMLImageElement || selected instanceof HTMLVideoElement) return selected;
    return loadImage(texture);
  }
  return null;
}

export class LiquidGlass {
  constructor(options = {}) {
    const element = resolveElement(options.element);
    if (!element) throw new Error("LiquidGlass requires a valid element.");
    const presetName = options.preset || element.dataset.liquidGlass || DEFAULTS.preset;
    this.options = {
      ...DEFAULTS,
      ...(PRESETS[presetName] || PRESETS.panel),
      ...options,
      preset: presetName,
      texture: options.texture || element.dataset.liquidGlassTexture || "",
    };
    this.element = element;
    this.canvas = null;
    this.gl = null;
    this.program = null;
    this.texture = null;
    this.textureSource = null;
    this.frameId = 0;
    this.visible = false;
    this.needsRender = true;
    this.destroyed = false;
    this.mouse = { x: 0.5, y: 0.28 };
    this.targetMouse = { x: 0.5, y: 0.28 };
    this.startTime = performance.now();
    this.resizeObserver = null;
    this.intersectionObserver = null;
    this.uniforms = {};
    this.buffers = {};
    this.webglActive = false;
    this.onPointerMove = this.handlePointerMove.bind(this);
    this.onScroll = this.handleScroll.bind(this);
    this.render = this.render.bind(this);
    this.init();
  }

  async init() {
    this.element.classList.add("liquid-glass", "liquid-glass--fallback");
    this.applyCssOptions();
    if (!this.options.texture || !this.canUseWebGL()) return;

    try {
      this.textureSource = await resolveTextureSource(this.options.texture);
      if (!this.textureSource) return;
      if (this.destroyed) return;
      if (activeWebglInstances >= MAX_WEBGL_INSTANCES) return;
      this.setupCanvas();
      await this.setupWebGL();
      activeWebglInstances += 1;
      this.webglActive = true;
      this.setupObservers();
      this.element.classList.remove("liquid-glass--fallback");
      this.element.classList.add("liquid-glass--webgl");
      this.resize();
      this.requestRender();
    } catch (error) {
      this.element.classList.add("liquid-glass--fallback");
      this.element.dispatchEvent(new CustomEvent("liquidglass:fallback", { detail: { error } }));
      this.destroyWebGLOnly();
    }
  }

  canUseWebGL() {
    if (prefersReducedMotion()) return false;
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2", { antialias: true, alpha: true, premultipliedAlpha: false });
    return !!gl;
  }

  applyCssOptions() {
    const radius = this.options.borderRadius ?? getBorderRadiusPx(this.element, null);
    this.element.style.setProperty("--lg-opacity", this.options.opacity);
    this.element.style.setProperty("--lg-blur", `${this.options.blur}px`);
    this.element.style.setProperty("--lg-radius", `${radius}px`);
    this.element.style.setProperty("--lg-shadow-strength", this.options.shadowStrength);
    this.element.style.setProperty("--lg-border-glow", this.options.borderGlow);
    this.element.style.setProperty("--lg-canvas-opacity", this.options.canvasOpacity);
  }

  setupCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.className = "liquid-glass__canvas";
    this.canvas.setAttribute("aria-hidden", "true");
    this.canvas.setAttribute("role", "presentation");
    this.element.prepend(this.canvas);
  }

  async setupWebGL() {
    const gl = this.canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) throw new Error("WebGL2 is not available.");
    this.gl = gl;

    const [vertexSource, fragmentSource] = await Promise.all([
      fetchShader(`${this.options.shaderBasePath}vertex.glsl`, DEFAULT_VERTEX_SHADER),
      fetchShader(`${this.options.shaderBasePath}fragment.glsl`, DEFAULT_FRAGMENT_SHADER),
    ]);
    this.program = createProgram(gl, vertexSource, fragmentSource);
    gl.useProgram(this.program);

    const vertices = new Float32Array([
      -1, -1, 0, 0,
       1, -1, 1, 0,
      -1,  1, 0, 1,
       1,  1, 1, 1,
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    this.buffers.quad = buffer;

    const stride = 4 * Float32Array.BYTES_PER_ELEMENT;
    const position = gl.getAttribLocation(this.program, "aPosition");
    const uv = gl.getAttribLocation(this.program, "aUv");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(uv);
    gl.vertexAttribPointer(uv, 2, gl.FLOAT, false, stride, 2 * Float32Array.BYTES_PER_ELEMENT);

    [
      "uTexture", "uResolution", "uMouse", "uTime", "uScroll", "uIntensity", "uBlur",
      "uOpacity", "uSaturation", "uBrightness", "uRefraction", "uDistortion",
      "uChromaticAberration", "uHighlightIntensity", "uBorderGlow", "uBorderRadius",
    ].forEach((name) => {
      this.uniforms[name] = gl.getUniformLocation(this.program, name);
    });

    this.texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(this.uniforms.uTexture, 0);
    this.uploadTexture();
  }

  setupObservers() {
    this.resizeObserver = new ResizeObserver(() => {
      this.resize();
      this.requestRender();
    });
    this.resizeObserver.observe(this.element);

    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.visible = entries.some((entry) => entry.isIntersecting);
      if (this.visible) this.requestRender();
      else this.stopLoop();
    }, { rootMargin: "160px 0px", threshold: 0.01 });
    this.intersectionObserver.observe(this.element);

    if (this.options.interactive) {
      this.element.addEventListener("pointermove", this.onPointerMove, { passive: true });
      window.addEventListener("scroll", this.onScroll, { passive: true });
    }
  }

  uploadTexture() {
    if (!this.gl || !this.textureSource) return;
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.textureSource);
  }

  resize() {
    if (!this.canvas || !this.gl) return;
    const rect = this.element.getBoundingClientRect();
    const dpr = getDevicePixelRatio(this.options);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.canvas.style.width = `${rect.width}px`;
      this.canvas.style.height = `${rect.height}px`;
      this.gl.viewport(0, 0, width, height);
    }
  }

  handlePointerMove(event) {
    const rect = this.element.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    this.targetMouse.x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    this.targetMouse.y = 1 - clamp((event.clientY - rect.top) / rect.height, 0, 1);
    this.requestRender();
  }

  handleScroll() {
    this.requestRender();
  }

  requestRender() {
    this.needsRender = true;
    if (!this.frameId && this.visible !== false) {
      this.frameId = requestAnimationFrame(this.render);
    }
  }

  stopLoop() {
    if (this.frameId) cancelAnimationFrame(this.frameId);
    this.frameId = 0;
  }

  render(now) {
    this.frameId = 0;
    if (this.destroyed || !this.gl || !this.program || !this.visible) return;

    const animated = !prefersReducedMotion();
    const time = ((now || performance.now()) - this.startTime) / 1000 * this.options.animationSpeed;
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.08 * this.options.mouseStrength;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.08 * this.options.mouseStrength;
    const gl = this.gl;

    if (this.textureSource instanceof HTMLVideoElement || this.textureSource instanceof HTMLCanvasElement) {
      this.uploadTexture();
    }

    gl.useProgram(this.program);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(this.uniforms.uResolution, this.canvas.width, this.canvas.height);
    gl.uniform2f(this.uniforms.uMouse, this.mouse.x, this.mouse.y);
    gl.uniform1f(this.uniforms.uTime, animated ? time : 0);
    gl.uniform1f(this.uniforms.uScroll, window.scrollY * this.options.scrollStrength);
    gl.uniform1f(this.uniforms.uIntensity, this.options.intensity);
    gl.uniform1f(this.uniforms.uBlur, this.options.blur);
    gl.uniform1f(this.uniforms.uOpacity, this.options.opacity);
    gl.uniform1f(this.uniforms.uSaturation, this.options.saturation);
    gl.uniform1f(this.uniforms.uBrightness, this.options.brightness);
    gl.uniform1f(this.uniforms.uRefraction, this.options.refraction);
    gl.uniform1f(this.uniforms.uDistortion, this.options.distortion);
    gl.uniform1f(this.uniforms.uChromaticAberration, this.options.chromaticAberration);
    gl.uniform1f(this.uniforms.uHighlightIntensity, this.options.highlightIntensity);
    gl.uniform1f(this.uniforms.uBorderGlow, this.options.borderGlow);
    gl.uniform1f(this.uniforms.uBorderRadius, getBorderRadiusPx(this.element, this.options.borderRadius) * getDevicePixelRatio(this.options));
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (animated && this.visible) {
      this.frameId = requestAnimationFrame(this.render);
    }
  }

  setOptions(nextOptions = {}) {
    this.options = { ...this.options, ...nextOptions };
    this.applyCssOptions();
    this.resize();
    this.requestRender();
  }

  destroyWebGLOnly() {
    this.stopLoop();
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.intersectionObserver) this.intersectionObserver.disconnect();
    this.element.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("scroll", this.onScroll);
    this.canvas?.remove();
    this.canvas = null;
    this.gl = null;
    if (this.webglActive) {
      activeWebglInstances = Math.max(0, activeWebglInstances - 1);
      this.webglActive = false;
    }
  }

  destroy() {
    this.destroyed = true;
    this.destroyWebGLOnly();
    this.element.classList.remove("liquid-glass", "liquid-glass--fallback", "liquid-glass--webgl");
  }

  static enhanceAll(selector = "[data-liquid-glass]", defaults = {}) {
    const elements = Array.from(document.querySelectorAll(selector));
    return elements.map((element) => {
      const options = {
        ...defaults,
        element,
      };
      if (element.dataset.liquidGlass) options.preset = element.dataset.liquidGlass;
      if (element.dataset.liquidGlassTexture) options.texture = element.dataset.liquidGlassTexture;
      [
        ["intensity", "liquidGlassIntensity"],
        ["blur", "liquidGlassBlur"],
        ["refraction", "liquidGlassRefraction"],
        ["distortion", "liquidGlassDistortion"],
        ["canvasOpacity", "liquidGlassCanvasOpacity"],
      ].forEach(([optionName, dataName]) => {
        if (element.dataset[dataName] !== undefined && element.dataset[dataName] !== "") {
          options[optionName] = numberOption(element.dataset[dataName], defaults[optionName]);
        }
      });
      if (element.dataset.liquidGlassRadius) options.borderRadius = element.dataset.liquidGlassRadius;
      return new LiquidGlass(options);
    });
  }
}

export function defineLiquidGlassElement() {
  if (customElements.get("liquid-glass")) return;
  customElements.define("liquid-glass", class extends HTMLElement {
    connectedCallback() {
      const content = document.createElement("div");
      content.className = "liquid-glass-web-component";
      while (this.firstChild) content.appendChild(this.firstChild);
      this.appendChild(content);
      this.instance = new LiquidGlass({
        element: content,
        texture: this.getAttribute("texture") || "",
        preset: this.getAttribute("preset") || "panel",
      });
    }

    disconnectedCallback() {
      this.instance?.destroy();
    }
  });
}

window.LiquidGlass = LiquidGlass;
window.defineLiquidGlassElement = defineLiquidGlassElement;
