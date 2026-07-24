(() => {
      try {
        const params = new URLSearchParams(window.location.search);
        const requested = params.get("theme");
        const saved = localStorage.getItem("hn_theme");
        const system = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
        const theme = requested === "light" || requested === "dark"
          ? requested
          : (saved === "light" || saved === "dark" ? saved : system);
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f5f5f7" : "#071521");
      } catch (error) {
        document.documentElement.dataset.theme = "light";
        document.documentElement.style.colorScheme = "light";
      }
    })();
