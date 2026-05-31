const CACHE = "hn-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./prices.html",
  "./faqs.html",
  "./style.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/logo.png",
  "./assets/og-image.png"
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
