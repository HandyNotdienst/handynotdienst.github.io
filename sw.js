const CACHE = "hn-v11";
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
  "./assets/model-finder/optimized/back-cover-lookup.webp",
  "./assets/model-finder/optimized/connector-lookup.webp",
  "./assets/model-finder/optimized/old-back-cover-lookup.webp",
  "./assets/model-finder/optimized/sim-tray-lookup.webp"
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
