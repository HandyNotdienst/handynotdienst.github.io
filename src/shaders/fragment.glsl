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

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.03;
    amplitude *= 0.5;
  }
  return value;
}

float roundedRectAlpha(vec2 uv, float radiusPx) {
  vec2 size = uResolution;
  vec2 p = (uv - 0.5) * size;
  vec2 halfSize = size * 0.5;
  float radius = min(radiusPx, min(halfSize.x, halfSize.y) - 1.0);
  vec2 q = abs(p) - halfSize + radius;
  float dist = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
  return 1.0 - smoothstep(-1.5, 1.5, dist);
}

vec3 saturateColor(vec3 color, float amount) {
  float gray = dot(color, vec3(0.299, 0.587, 0.114));
  return mix(vec3(gray), color, amount);
}

vec4 sampleGlass(vec2 uv, float blurPx) {
  vec2 px = 1.0 / max(uResolution, vec2(1.0));
  vec2 o = px * blurPx;
  vec4 c = texture2D(uTexture, uv) * 0.28;
  c += texture2D(uTexture, uv + vec2(o.x, 0.0)) * 0.10;
  c += texture2D(uTexture, uv - vec2(o.x, 0.0)) * 0.10;
  c += texture2D(uTexture, uv + vec2(0.0, o.y)) * 0.10;
  c += texture2D(uTexture, uv - vec2(0.0, o.y)) * 0.10;
  c += texture2D(uTexture, uv + vec2(o.x, o.y)) * 0.08;
  c += texture2D(uTexture, uv + vec2(-o.x, o.y)) * 0.08;
  c += texture2D(uTexture, uv + vec2(o.x, -o.y)) * 0.08;
  c += texture2D(uTexture, uv + vec2(-o.x, -o.y)) * 0.08;
  return c;
}

void main() {
  vec2 uv = vUv;
  vec2 centered = uv - 0.5;
  float t = uTime * 0.08;

  float n = fbm(uv * 8.0 + vec2(t, -t * 0.7 + uScroll * 0.001));
  vec2 normal = normalize(vec2(
    fbm(uv * 9.0 + vec2(2.0, t)) - 0.5,
    fbm(uv * 9.0 + vec2(-t, 4.0)) - 0.5
  ) + 0.0001);

  float edge = smoothstep(0.34, 0.72, length(centered * vec2(uResolution.x / max(uResolution.y, 1.0), 1.0)));
  vec2 mousePull = (uMouse - 0.5) * 0.007 * uIntensity;
  vec2 refractOffset = normal * (0.003 + uRefraction * 0.018) * uIntensity;
  refractOffset += centered * edge * uRefraction * 0.006;
  refractOffset += mousePull * (0.35 + edge);
  refractOffset += (n - 0.5) * uDistortion * 0.012;

  vec2 distortedUv = clamp(uv + refractOffset, 0.002, 0.998);
  float blurPx = mix(0.6, 6.0, clamp(uBlur / 28.0, 0.0, 1.0));
  vec4 base = sampleGlass(distortedUv, blurPx);

  float ca = uChromaticAberration * 0.0035;
  float red = texture2D(uTexture, clamp(distortedUv + normal * ca, 0.0, 1.0)).r;
  float blue = texture2D(uTexture, clamp(distortedUv - normal * ca, 0.0, 1.0)).b;
  base.r = mix(base.r, red, 0.22);
  base.b = mix(base.b, blue, 0.22);

  vec3 color = saturateColor(base.rgb, uSaturation) * uBrightness;
  color = mix(color, vec3(0.88, 0.96, 1.0), 0.04 * uIntensity);

  float fresnel = pow(edge, 2.2) * uBorderGlow;
  vec2 lightPos = mix(vec2(0.18, 0.12), vec2(0.86, 0.22), 0.5 + 0.5 * sin(uTime * 0.18));
  lightPos = mix(lightPos, uMouse, 0.28);
  float spec = pow(max(0.0, 1.0 - distance(uv, lightPos) * 2.4), 4.0) * uHighlightIntensity;
  float sweep = smoothstep(0.015, 0.0, abs((uv.x + uv.y * 0.32) - (0.18 + 0.18 * sin(uTime * 0.16)))) * 0.18 * uHighlightIntensity;
  float inner = smoothstep(0.72, 0.0, length(centered)) * 0.025;

  color += vec3(0.70, 0.90, 1.0) * fresnel * 0.22;
  color += vec3(1.0, 1.0, 0.96) * (spec * 0.55 + sweep * 0.55 + inner);

  float alpha = roundedRectAlpha(uv, uBorderRadius);
  float opacity = clamp(uOpacity + fresnel * 0.08 + spec * 0.04, 0.0, 0.86);
  gl_FragColor = vec4(color, opacity * alpha);
}
