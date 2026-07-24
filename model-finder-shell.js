(() => {
  const iframe = document.getElementById("iphoneModelFinder");
  if (!iframe) return;
  const targetOrigin = window.location.origin === "null" ? "*" : window.location.origin;

  function currentQuizLang() {
    const stored = localStorage.getItem("hn_lang") || document.documentElement.lang || "de";
    const code = String(stored).toLowerCase().split("-")[0];
    return code === "ua" ? "uk" : code;
  }

  function currentFinderTheme() {
    const stored = localStorage.getItem("hn_theme") || document.documentElement.dataset.theme || "dark";
    return stored === "light" || stored === "dark" ? stored : "dark";
  }

  function syncFinderParams() {
    const lang = currentQuizLang();
    const theme = currentFinderTheme();
    const url = new URL(iframe.getAttribute("src"), window.location.href);
    if (url.searchParams.get("lang") === lang && url.searchParams.get("theme") === theme) return;
    url.searchParams.set("lang", lang);
    url.searchParams.set("theme", theme);
    iframe.src = `${url.pathname}${url.search}`;
  }

  function notifyFinderTheme() {
    iframe.contentWindow?.postMessage({ type: "hn-theme-change", theme: currentFinderTheme() }, targetOrigin);
  }

  window.addEventListener("message", (event) => {
    if (targetOrigin !== "*" && event.origin !== targetOrigin) return;
    if (event.source !== iframe.contentWindow) return;
    if (!event.data || event.data.type !== "iphone-model-quiz-height") return;
    const requestedHeight = Number(event.data.height || 0);
    if (!Number.isFinite(requestedHeight)) return;
    iframe.style.height = `${Math.max(760, Math.min(requestedHeight, 10000))}px`;
  });

  window.addEventListener("hn:language-change", () => window.setTimeout(syncFinderParams, 0));
  window.addEventListener("hn:theme-change", () => {
    notifyFinderTheme();
    window.setTimeout(syncFinderParams, 0);
  });

  syncFinderParams();
})();
