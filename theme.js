(() => {
  try {
    const saved = localStorage.getItem("hn_theme");
    const system = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const theme = saved === "light" || saved === "dark" ? saved : system;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.style.colorScheme = "dark";
  }
})();
