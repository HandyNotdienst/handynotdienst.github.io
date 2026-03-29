(() => {
  const config = window.HN_CONFIG || {};
  const i18n = window.HN_I18N || {};
  const htmlKeys = new Set(config.htmlKeys || []);
  const defaultLang = config.defaultLang || "de";
  const whatsappNumber = config.whatsappNumber || "";
  const city = config.city || "";
  const serviceWorkerPath = config.serviceWorkerPath || "";

  const hasI18n = Object.keys(i18n).length > 0;

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function getLang() {
    return localStorage.getItem("hn_lang") || defaultLang;
  }

  function applyTranslations(lang) {
    if (!hasI18n) return;
    document.querySelectorAll(".lang__btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = i18n[lang]?.[key];
      if (!val) return;
      if (htmlKeys.has(key)) el.innerHTML = val;
      else el.textContent = val;
    });

    localStorage.setItem("hn_lang", lang);
    document.documentElement.lang = lang === "ua" ? "uk" : lang;
  }

  function updateQuickWA(lang) {
    const link = document.getElementById("waQuick");
    if (!link || !whatsappNumber) return;

    const model = (document.getElementById("model")?.value || "").trim() || "-";
    const issue = (document.getElementById("issue")?.value || "").trim() || "-";

    let msg;
    if (lang === "ua") msg = `Привіт!
Модель: ${model}
Проблема: ${issue}
Місто: ${city}`;
    else if (lang === "en") msg = `Hi!
Model: ${model}
Issue: ${issue}
City: ${city}`;
    else msg = `Hallo!
Modell: ${model}
Problem: ${issue}
Ort: ${city}`;

    link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }

  function updateLiveBadge() {
    const el = document.getElementById("liveBadge");
    if (!el) return;
    const lang = getLang();

    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    const isWorkDay = day >= 1 && day <= 6;
    const isWorkTime = hour >= 10 && hour < 19;
    const ok = isWorkDay && isWorkTime;

    const text = {
      de: ok ? "⏱️ Heute: 30–90 Min möglich" : "⏱️ Schnell via WhatsApp",
      ua: ok ? "⏱️ Сьогодні: 30–90 хв можливо" : "⏱️ Швидко у WhatsApp",
      en: ok ? "⏱️ Today: 30–90 min possible" : "⏱️ Fast via WhatsApp",
    }[lang];

    el.textContent = text;
    el.dataset.state = ok ? "open" : "closed";
  }

  function updateSearchPlaceholders(lang) {
    const map = {
      de: { s: "Modell suchen (z.B. S23, Ultra...)", i: "Modell suchen (z.B. iPhone 13, Pro...)" },
      ua: { s: "Пошук моделі (напр. S23, Ultra...)", i: "Пошук моделі (напр. iPhone 13, Pro...)" },
      en: { s: "Search model (e.g. S23, Ultra...)", i: "Search model (e.g. iPhone 13, Pro...)" },
    };
    document.querySelectorAll(".price-search").forEach((input) => {
      const t = input.getAttribute("data-filter-target");
      if (t === "samsungTable") input.placeholder = map[lang].s;
      if (t === "iphoneTable") input.placeholder = map[lang].i;
    });
  }

  function splitGroupedModelName(rawName, series = "") {
    const clean = rawName.trim();
    if (!clean.includes("/")) return [clean];

    const parts = clean.split("/").map((part) => part.trim()).filter(Boolean);
    if (!parts.length) return [clean];

    const first = parts[0];
    const iphonePrefix = first.match(/^iPhone\s+/i)?.[0] || "";
    const samsungSeriesPrefix = series === "s" ? (first.match(/^S\d+\+?/i)?.[0]?.replace(/\+$/, "") || "") : "";

    return parts.map((part, idx) => {
      if (idx === 0) return part;
      if (iphonePrefix && !/^iPhone\s+/i.test(part)) return `${iphonePrefix}${part}`;
      if (series === "s" && samsungSeriesPrefix) {
        if (/^(FE|Ultra|Plus)$/i.test(part)) return `${samsungSeriesPrefix} ${part}`;
        if (!/^S\d+/i.test(part)) return `${samsungSeriesPrefix}${part.startsWith("+") ? part : ` ${part}`}`;
      }
      return part;
    });
  }

  function normalizeDisplayPrice(row) {
    const displayCell = row.cells[1];
    if (!displayCell) return;
    const model = row.cells[0]?.innerText?.trim() || "";
    if (!/^iPhone/i.test(model)) return;

    const value = displayCell.innerText.trim();
    if (!value.includes("/")) return;
    const parts = value.split("/").map((item) => item.trim()).filter(Boolean);
    if (parts.length !== 2) {
      displayCell.textContent = parts[0] || value;
      return;
    }
    displayCell.textContent = `OLED Premium: ${parts[0]} · Standard: ${parts[1]}`;
  }

  function normalizeModelRows(table) {
    const tbody = table.tBodies[0];
    if (!tbody) return;

    Array.from(tbody.rows).forEach((row) => {
      normalizeDisplayPrice(row);
      const modelCell = row.cells[0];
      if (!modelCell) return;
      const variants = splitGroupedModelName(modelCell.innerText, row.dataset.series || "");
      if (variants.length <= 1) return;

      variants.forEach((variant) => {
        const clone = row.cloneNode(true);
        clone.cells[0].innerText = variant;
        clone.dataset.searchMatch = "true";
        tbody.insertBefore(clone, row);
      });
      row.remove();
    });
  }

  function isPopularModel(brand, model) {
    if (brand === "apple") return /^(iPhone 11|iPhone 12|iPhone 13|iPhone 14)$/i.test(model);
    if (brand === "samsung") return /^(S20|S21|S22|S23)$/i.test(model);
    return false;
  }

  function sortRowsByPopularity(table) {
    const tbody = table.tBodies[0];
    if (!tbody) return;
    const brand = table.dataset.brandKey || "";
    const rows = Array.from(tbody.rows);

    rows.forEach((row) => {
      const model = row.cells[0]?.innerText?.trim() || "";
      row.dataset.popular = isPopularModel(brand, model) ? "true" : "false";
      row.dataset.searchMatch = "true";
    });

    rows.sort((a, b) => {
      const ap = a.dataset.popular === "true" ? 1 : 0;
      const bp = b.dataset.popular === "true" ? 1 : 0;
      return bp - ap;
    });

    rows.forEach((row) => tbody.appendChild(row));
  }

  function preparePriceTables() {
    document.querySelectorAll(".js-price-table").forEach((table) => {
      normalizeModelRows(table);
      sortRowsByPopularity(table);
    });
  }

  function openWAForPrice(brand, model, repair, price) {
    if (!whatsappNumber) return;
    const lang = getLang();
    const device = `${brand} ${model}`.trim();
    let text;
    if (lang === "ua") text = `Привіт!
📱 ${device}
🛠️ ${repair}
💶 ${price}
Місто: ${city}`;
    else if (lang === "en") text = `Hi!
📱 ${device}
🛠️ ${repair}
💶 ${price}
City: ${city}`;
    else text = `Hallo!
📱 ${device}
🛠️ ${repair}
💶 ${price}
Ort: ${city}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  }

  function bindTablePriceClicks() {
    document.querySelectorAll(".js-price-table").forEach((table) => {
      const brand = table.dataset.brand || "";
      const headers = Array.from(table.tHead.rows[0].cells).map((th) => th.innerText.trim());
      table.querySelectorAll("tbody tr").forEach((row) => {
        const model = row.cells[0].innerText.trim();
        Array.from(row.cells).forEach((cell, idx) => {
          if (idx === 0) return;
          const price = cell.innerText.trim();
          if (!price || price === "-") return;
          cell.classList.add("price-cell");
          cell.addEventListener("click", () => openWAForPrice(brand, model, headers[idx] || "Repair", price));
        });
      });
    });
  }

  function applyPriceVisibility(table) {
    const showAll = table.dataset.showAll === "true";
    table.querySelectorAll("tbody tr").forEach((row) => {
      const isPopular = row.dataset.popular === "true";
      const searchMatch = row.dataset.searchMatch !== "false";
      const shouldShow = searchMatch && (showAll || isPopular);
      row.classList.toggle("price-row--hidden", !shouldShow);
    });

    table
      .closest(".price-block")
      ?.querySelectorAll(".price-card")
      .forEach((card) => {
        const isPopular = card.dataset.popular === "true";
        const searchMatch = card.dataset.searchMatch !== "false";
        const shouldShow = searchMatch && (showAll || isPopular);
        card.classList.toggle("price-card--hidden", !shouldShow);
      });
  }

  function animatePriceContainers(table, updateVisibility) {
    const block = table.closest(".price-block");
    if (!block) {
      updateVisibility();
      return;
    }

    const containers = [block.querySelector(".table-wrap"), block.querySelector(".price-cards")].filter(Boolean);
    const starts = containers.map((el) => el.offsetHeight);
    updateVisibility();

    containers.forEach((el, idx) => {
      const start = starts[idx];
      const end = el.scrollHeight;
      if (Math.abs(end - start) < 4) return;

      el.animate([{ height: `${start}px` }, { height: `${end}px` }], {
        duration: 260,
        easing: "ease",
      });
    });
  }

  function initPriceExpanders() {
    document.querySelectorAll(".price-expand-btn[data-expand-target]").forEach((btn) => {
      const table = document.getElementById(btn.dataset.expandTarget);
      if (!table) return;

      table.dataset.showAll = "false";
      applyPriceVisibility(table);

      const setBtnLabel = (expanded) => {
        const lang = getLang();
        const moreKey = btn.dataset.i18nMore;
        const lessKey = btn.dataset.i18nLess;
        const moreText = i18n[lang]?.[moreKey] || "Alle Modelle anzeigen";
        const lessText = i18n[lang]?.[lessKey] || "Weniger anzeigen";
        btn.textContent = expanded ? lessText : moreText;
      };
      setBtnLabel(false);

      btn.addEventListener("click", () => {
        const expanded = table.dataset.showAll === "true";
        table.dataset.showAll = expanded ? "false" : "true";
        btn.setAttribute("aria-expanded", String(!expanded));
        setBtnLabel(!expanded);
        animatePriceContainers(table, () => applyPriceVisibility(table));
      });
    });
  }

  function generateMobileCards() {
    document.querySelectorAll(".js-price-table").forEach((table) => {
      const brand = table.dataset.brand || "";
      const container = table.closest(".price-block")?.querySelector(".js-price-cards");
      if (!container) return;
      container.innerHTML = "";

      const headers = Array.from(table.tHead.rows[0].cells).slice(1).map((th) => th.innerText.trim());
      table.querySelectorAll("tbody tr").forEach((row) => {
        const model = row.cells[0].innerText.trim();
        const card = document.createElement("div");
        card.className = "price-card";
        card.dataset.popular = row.dataset.popular === "true" ? "true" : "false";
        card.dataset.searchMatch = "true";
        const h = document.createElement("h4");
        h.textContent = `${brand} ${model}`;
        card.appendChild(h);

        headers.forEach((repair, idx) => {
          const cell = row.cells[idx + 1];
          if (!cell) return;
          const price = cell.innerText.trim();
          if (!price || price === "-") return;
          const btn = document.createElement("button");
          btn.type = "button";
          btn.innerHTML = `<span>${repair}</span><strong>${price}</strong>`;
          btn.addEventListener("click", () => openWAForPrice(brand, model, repair, price));
          card.appendChild(btn);
        });

        container.appendChild(card);
      });
    });
  }

  function filterPriceBlock(input) {
    const table = document.getElementById(input.getAttribute("data-filter-target"));
    if (!table) return;
    const q = input.value.toLowerCase().trim();

    table.querySelectorAll("tbody tr").forEach((row) => {
      row.dataset.searchMatch = row.innerText.toLowerCase().includes(q) ? "true" : "false";
    });

    table
      .closest(".price-block")
      ?.querySelectorAll(".price-card")
      .forEach((card) => {
        card.dataset.searchMatch = card.innerText.toLowerCase().includes(q) ? "true" : "false";
      });

    applyPriceVisibility(table);
  }

  function initPriceToggle() {
    const toggle = document.querySelector(".js-price-toggle");
    if (!toggle) return;
    const buttons = Array.from(toggle.querySelectorAll("[data-brand-toggle]"));
    const groups = Array.from(document.querySelectorAll(".price-group[data-brand]"));
    if (!buttons.length || !groups.length) return;

    const setActive = (brand) => {
      groups.forEach((group) => {
        const isActive = group.dataset.brand === brand;
        group.classList.toggle("is-active", isActive);
        group.setAttribute("aria-hidden", String(!isActive));
      });
      buttons.forEach((btn) => {
        const isActive = btn.dataset.brandToggle === brand;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
      });
    };

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => setActive(btn.dataset.brandToggle));
    });

    const defaultButton = toggle.querySelector('[data-brand-toggle="apple"]') || buttons[0];
    if (defaultButton) setActive(defaultButton.dataset.brandToggle);
  }

  function initBundles() {
    document.querySelectorAll(".bundle__item").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!whatsappNumber) return;
        const lang = getLang();
        const bundle = btn.textContent.trim();
        const msg =
          lang === "ua"
            ? `Привіт! Хочу зробити пакет: ${bundle}. Місто: ${city}`
            : lang === "en"
              ? `Hi! I'd like a bundle: ${bundle}. City: ${city}`
              : `Hallo! Ich möchte ein Bundle anfragen: ${bundle}. Ort: ${city}`;
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
      });
    });
  }

  function initPickupButton() {
    const btn = document.getElementById("btnPickup");
    if (!btn || !whatsappNumber) return;
    btn.addEventListener("click", () => {
      const lang = getLang();
      const msg =
        lang === "ua"
          ? `Привіт! Хочу домовитись про забір/доставку. Місто: ${city}`
          : lang === "en"
            ? `Hi! I'd like to arrange pickup/delivery. City: ${city}`
            : `Hallo! Ich möchte Abholung/Lieferung anfragen. Ort: ${city}`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
    });
  }

  function initQuiz() {
    const quizModal = document.getElementById("quizModal");
    if (!quizModal) return;

    const quizOverlay = document.getElementById("quizOverlay");
    const quizStartBtn = document.getElementById("quizStartBtn");
    const quizCloseBtn = document.getElementById("quizClose");
    const quizBackBtn = document.getElementById("quizBackBtn");
    const quizProgressFill = document.getElementById("quizProgressFill");
    const quizProgressText = document.getElementById("quizProgressText");

    let quizStep = 1;
    let quizAnswers = [];

    function openQuiz() {
      quizModal.hidden = false;
      quizStep = 1;
      quizAnswers = [];
      updateQuizUI();
    }
    function closeQuiz() {
      quizModal.hidden = true;
    }

    function updateProgress() {
      const percent = Math.min(quizStep * 33, 100);
      quizProgressFill.style.width = percent + "%";
      quizProgressText.textContent = percent + "%";
    }
    function showQuizScreen(step) {
      document.querySelectorAll(".quiz-screen").forEach((s) => s.classList.remove("is-active"));
      document.querySelector(`.quiz-screen[data-step="${step}"]`)?.classList.add("is-active");
    }
    function updateQuizUI() {
      quizBackBtn.hidden = quizStep <= 1;
      updateProgress();
      showQuizScreen(String(quizStep));
    }

    function showQuizResult() {
      const lang = getLang();
      const score = { battery: 0, port: 0, display: 0 };
      if (quizAnswers[0] === "no") score.port += 2;
      if (quizAnswers[1] === "yes") score.battery += 3;
      if (quizAnswers[2] === "yes") score.display += 3;
      const resultKey = Object.keys(score).reduce((a, b) => (score[a] > score[b] ? a : b));

      const T = {
        de: {
          battery: "🔋 Sehr wahrscheinlich: Akku",
          port: "🔌 Sehr wahrscheinlich: Ladebuchse",
          display: "📱 Sehr wahrscheinlich: Display / Elektronik",
          hint: "Schreib uns kurz – wir prüfen das schnell.",
        },
        ua: {
          battery: "🔋 Дуже ймовірно: акумулятор",
          port: "🔌 Дуже ймовірно: розʼєм зарядки",
          display: "📱 Дуже ймовірно: дисплей або плата",
          hint: "Напиши нам — швидко перевіримо.",
        },
        en: {
          battery: "🔋 Very likely: battery",
          port: "🔌 Very likely: charging port",
          display: "📱 Very likely: screen or electronics",
          hint: "Message us — we’ll check fast.",
        },
      }[lang];

      document.getElementById("quizResultBadge").textContent = T[resultKey];
      document.getElementById("quizResultText").textContent = T.hint;

      const msg =
        lang === "ua"
          ? `Привіт! Тест показав: ${T[resultKey]} | Місто: ${city}`
          : lang === "en"
            ? `Hi! Quiz result: ${T[resultKey]} | City: ${city}`
            : `Hallo! Quiz-Ergebnis: ${T[resultKey]} | Ort: ${city}`;

      document.getElementById("quizResultWA").href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;

      document.querySelectorAll(".quiz-screen").forEach((s) => s.classList.remove("is-active"));
      document.querySelector(`.quiz-screen[data-step="result"]`)?.classList.add("is-active");
      quizProgressFill.style.width = "100%";
      quizProgressText.textContent = "100%";
      quizBackBtn.hidden = true;
    }

    document.querySelectorAll(".quiz-actions button").forEach((btn) => {
      btn.addEventListener("click", () => {
        quizAnswers.push(btn.dataset.answer);
        quizStep++;
        if (quizStep <= 3) updateQuizUI();
        else showQuizResult();
      });
    });

    quizBackBtn.addEventListener("click", () => {
      if (quizStep > 1) {
        quizStep--;
        quizAnswers.pop();
        updateQuizUI();
      }
    });

    quizStartBtn?.addEventListener("click", openQuiz);
    quizCloseBtn?.addEventListener("click", closeQuiz);
    quizOverlay?.addEventListener("click", closeQuiz);
  }

  function initHeaderShadow() {
    const header = document.querySelector(".header");
    if (!header) return;
    window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 20));
  }

  function initEasterEgg() {
    const logo = document.querySelector(".brand");
    if (!logo) return;

    const messages = ["☕ Kaffee heute gratis 😉", "🔧 Techniker-Level freigeschaltet"];
    const storageKey = "hn_egg_last_seen";
    const today = () => new Date().toISOString().slice(0, 10);

    let clickCount = 0;
    let toastEl;

    function ensureToast() {
      if (toastEl) return toastEl;
      toastEl = document.createElement("div");
      toastEl.className = "egg-toast";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
      return toastEl;
    }

    function showToast(message) {
      const el = ensureToast();
      el.textContent = message;
      el.classList.add("is-visible");
      window.setTimeout(() => {
        el.classList.remove("is-visible");
      }, 3000);
    }

    logo.addEventListener("click", () => {
      clickCount += 1;
      if (clickCount < 10) return;
      clickCount = 0;

      const lastSeen = localStorage.getItem(storageKey);
      if (lastSeen === today()) return;

      const message = messages[Math.floor(Math.random() * messages.length)];
      showToast(message);
      localStorage.setItem(storageKey, today());
    });
  }


  function initServiceWorker() {
    if (!serviceWorkerPath) return;
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register(serviceWorkerPath).catch(() => {});
      });
    }
  }

  function initLangButtons() {
    if (!hasI18n) return;
    document.querySelectorAll(".lang__btn").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
  }

  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((item) => observer.observe(item));
  }

  function initQuizHighlight() {
    const quizSection = document.getElementById("quiz");
    const targets = document.querySelectorAll(".js-quiz-highlight");
    if (!quizSection || !targets.length || !("IntersectionObserver" in window)) return;

    const setActive = (isActive) => {
      targets.forEach((el) => el.classList.toggle("is-highlighted", isActive));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target !== quizSection) return;
          setActive(entry.isIntersecting);
        });
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0.1 }
    );

    observer.observe(quizSection);
  }

  function setLang(lang) {
    applyTranslations(lang);
    updateSearchPlaceholders(lang);
    updateQuickWA(lang);
    updateLiveBadge();
    document.querySelectorAll(".price-expand-btn[data-expand-target]").forEach((btn) => {
      const table = document.getElementById(btn.dataset.expandTarget);
      if (!table) return;
      const expanded = table.dataset.showAll === "true";
      const moreText = i18n[lang]?.[btn.dataset.i18nMore] || "Alle Modelle anzeigen";
      const lessText = i18n[lang]?.[btn.dataset.i18nLess] || "Weniger anzeigen";
      btn.textContent = expanded ? lessText : moreText;
    });
  }

  initHeaderShadow();
  initLangButtons();
  initReveal();
  initPickupButton();
  initBundles();
  initQuiz();
  initEasterEgg();
  initServiceWorker();
  initPriceToggle();
  initQuizHighlight();

  document.querySelectorAll(".price-search").forEach((input) => {
    input.addEventListener("input", () => filterPriceBlock(input));
  });

  if (document.querySelector(".js-price-table")) {
    preparePriceTables();
    bindTablePriceClicks();
    generateMobileCards();
    initPriceExpanders();
  }

  ["model", "issue"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", () => updateQuickWA(getLang()));
  });

  if (hasI18n) {
    setLang(getLang());
  } else {
    updateQuickWA(getLang());
    updateLiveBadge();
  }

  if (document.getElementById("liveBadge")) {
    setInterval(updateLiveBadge, 60000);
  }
})();
