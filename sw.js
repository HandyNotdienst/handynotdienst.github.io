const CACHE = "hn-v15";
const ASSETS = [
  "./",
  "./index.html",
  "./prices.html",
  "./iphone-modell-finder.html",
  "./tools/iphone-model-finder.html",
  "./faqs.html",
  "./style.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/logo.png",
  "./assets/og-image.png",
  "./assets/logos/call.svg",
  "./assets/logos/data-security.png",
  "./assets/logos/email.png",
  "./assets/logos/part-options.png",
  "./assets/logos/prices.png",
  "./assets/logos/proof-fast.png",
  "./assets/logos/proof-price.png",
  "./assets/logos/proof-warranty.png",
  "./assets/logos/telegram.png",
  "./assets/logos/warranty-details.png",
  "./assets/logos/whatsapp.png",
  "./assets/model-finder/optimized/camera-one.webp",
  "./assets/model-finder/optimized/camera-three.webp",
  "./assets/model-finder/optimized/camera-two-diagonal.webp",
  "./assets/model-finder/optimized/camera-two-vertical.webp",
  "./assets/model-finder/optimized/connector-port.webp",
  "./assets/model-finder/optimized/finder-hero-1280.webp",
  "./assets/model-finder/optimized/finder-hero-720.webp",
  "./assets/model-finder/optimized/flat-rounded-edges.webp",
  "./assets/model-finder/optimized/help-illustration.webp",
  "./assets/model-finder/optimized/model-finder-icon.webp",
  "./assets/model-finder/optimized/notch-dynamic-island.webp",
  "./assets/model-finder/optimized/old-back-cover.webp",
  "./assets/model-finder/optimized/portrait-420.webp",
  "./assets/model-finder/optimized/portrait-720.webp",
  "./assets/model-finder/optimized/repair-before-after-640.webp",
  "./assets/model-finder/optimized/repair-before-after-980.webp",
  "./assets/model-finder/optimized/settings-about.webp",
  "./assets/model-finder/optimized/sim-tray.webp",
  "./assets/model-finder/optimized/trust-data-safe.webp",
  "./assets/model-finder/optimized/trust-fair-price.webp",
  "./assets/model-finder/optimized/trust-fast-repair.webp",
  "./assets/model-finder/optimized/trust-warranty.webp"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE ? caches.delete(k) : null)))
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  );
});
