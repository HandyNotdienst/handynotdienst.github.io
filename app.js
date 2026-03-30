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

  const PRICE_DATA = {
    apple: [
      { model: "iPhone 16 Pro Max", series: "iphone", repairs: [{ key: "repair_display", price: "374€", variant: "repair_oled_premium" }, { key: "repair_battery", price: "124€" }, { key: "repair_backglass", price: "174€" }] },
      { model: "iPhone 16 Pro", series: "iphone", repairs: [{ key: "repair_display", price: "335€", variant: "repair_oled_premium" }, { key: "repair_battery", price: "105€" }, { key: "repair_backglass", price: "164€" }] },
      { model: "iPhone 16 Plus", series: "iphone", repairs: [{ key: "repair_display", price: "234€", variant: "repair_oled_premium" }, { key: "repair_battery", price: "84€" }, { key: "repair_backglass", price: "154€" }] },
      { model: "iPhone 16", series: "iphone", repairs: [{ key: "repair_display", price: "224€", variant: "repair_oled_premium" }, { key: "repair_battery", price: "74€" }, { key: "repair_backglass", price: "134€" }] },
      { model: "iPhone 15 Pro Max", series: "iphone", repairs: [{ key: "repair_display", price: "264€", variant: "repair_oled_premium" }, { key: "repair_battery", price: "84€" }, { key: "repair_backglass", price: "134€" }] },
      { model: "iPhone 15 Pro", series: "iphone", repairs: [{ key: "repair_display", price: "234€", variant: "repair_oled_premium" }, { key: "repair_battery", price: "74€" }, { key: "repair_backglass", price: "124€" }] },
      { model: "iPhone 15 Plus", series: "iphone", repairs: [{ key: "repair_display", price: "214€", variant: "repair_oled_premium" }, { key: "repair_battery", price: "64€" }, { key: "repair_backglass", price: "104€" }] },
      { model: "iPhone 15", series: "iphone", repairs: [{ key: "repair_display", price: "184€", variant: "repair_oled_premium" }, { key: "repair_battery", price: "64€" }, { key: "repair_backglass", price: "84€" }] },
      { model: "iPhone 14", series: "iphone", repairs: [{ key: "repair_display", price: "124€", variant: "repair_oled_premium" }, { key: "repair_battery", price: "60€" }, { key: "repair_backglass", price: "64€" }] },
      { model: "iPhone 13", series: "iphone", repairs: [{ key: "repair_display", price: "124€", variant: "repair_oled_premium" }, { key: "repair_battery", price: "54€" }, { key: "repair_backglass", price: "74€" }] },
      { model: "iPhone 12", series: "iphone", repairs: [{ key: "repair_display", price: "114€", variant: "repair_oled_premium" }, { key: "repair_battery", price: "54€" }, { key: "repair_backglass", price: "64€" }] },
      { model: "iPhone 11", series: "iphone", repairs: [{ key: "repair_display", price: "64€", variant: "repair_oled_premium" }, { key: "repair_battery", price: "54€" }, { key: "repair_backglass", price: "54€" }] },
      { model: "iPhone XS", series: "iphone", repairs: [{ key: "repair_display", price: "54€", variant: "repair_oled_premium" }, { key: "repair_battery", price: "44€" }, { key: "repair_backglass", price: "44€" }] },
      { model: "iPhone XR", series: "iphone", repairs: [{ key: "repair_display", price: "54€", variant: "repair_oled_premium" }, { key: "repair_battery", price: "44€" }, { key: "repair_backglass", price: "44€" }] }
    ],
    samsung: [
      { model: "Galaxy S25 Ultra", series: "s", repairs: [{ key: "repair_display", price: "274€" }, { key: "repair_battery", price: "84€" }, { key: "repair_port", price: "84€" }, { key: "repair_backglass", price: "105€" }] },
      { model: "Galaxy S24 Ultra", series: "s", repairs: [{ key: "repair_display", price: "324€" }, { key: "repair_battery", price: "84€" }, { key: "repair_port", price: "74€" }, { key: "repair_backglass", price: "105€" }] },
      { model: "Galaxy S24", series: "s", repairs: [{ key: "repair_display", price: "244€" }, { key: "repair_battery", price: "74€" }, { key: "repair_port", price: "64€" }, { key: "repair_backglass", price: "94€" }] },
      { model: "Galaxy S24+", series: "s", repairs: [{ key: "repair_display", price: "274€" }, { key: "repair_battery", price: "74€" }, { key: "repair_port", price: "64€" }, { key: "repair_backglass", price: "94€" }] },
      { model: "Galaxy S23", series: "s", repairs: [{ key: "repair_display", price: "224€" }, { key: "repair_battery", price: "74€" }, { key: "repair_port", price: "64€" }, { key: "repair_backglass", price: "84€" }] },
      { model: "Galaxy S22", series: "s", repairs: [{ key: "repair_display", price: "224€" }, { key: "repair_battery", price: "74€" }, { key: "repair_port", price: "54€" }, { key: "repair_backglass", price: "74€" }] },
      { model: "Galaxy S21", series: "s", repairs: [{ key: "repair_display", price: "164€" }, { key: "repair_battery", price: "64€" }, { key: "repair_port", price: "54€" }, { key: "repair_backglass", price: "74€" }] },
      { model: "Galaxy S20", series: "s", repairs: [{ key: "repair_display", price: "205€" }, { key: "repair_battery", price: "54€" }, { key: "repair_port", price: "44€" }, { key: "repair_backglass", price: "64€" }] },
      { model: "Galaxy S10", series: "s", repairs: [{ key: "repair_display", price: "204€" }, { key: "repair_battery", price: "54€" }, { key: "repair_port", price: "44€" }, { key: "repair_backglass", price: "64€" }] }
    ],
  };

  const POPULAR_MODELS = {
    apple: ["iPhone 11", "iPhone 12", "iPhone 13", "iPhone 14"],
    samsung: ["Galaxy S20", "Galaxy S21", "Galaxy S22", "Galaxy S23"],
  };

  function openWAForPrice(brand, model, repair, price) {
    if (!whatsappNumber) return;
    const lang = getLang();
    const t = i18n[lang] || i18n.de || {};
    const text = `${t.wa_message_intro || "Hallo!"}
📱 ${t.wa_label_device || "Modell"}: ${model}
🛠️ ${t.wa_label_repair || "Reparatur"}: ${repair}
💶 ${t.wa_label_price || "Preis"}: ${price}
${t.wa_label_city || "Ort"}: ${city}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  }

  function isPopularModel(brand, model) {
    return (POPULAR_MODELS[brand] || []).includes(model);
  }

  function getRepairLabel(repair, lang) {
    const t = i18n[lang] || i18n.de || {};
    const base = t[repair.key] || repair.key;
    if (repair.variant) {
      return `${t[repair.variant] || repair.variant}`;
    }
    return base;
  }

  function createPriceCard(brand, modelData, lang) {
    const card = document.createElement("article");
    card.className = "price-model-card";
    card.dataset.brand = brand;
    card.dataset.series = modelData.series;
    card.dataset.popular = String(isPopularModel(brand, modelData.model));

    const h3 = document.createElement("h3");
    h3.className = "price-model-card__title";
    h3.textContent = modelData.model;
    card.appendChild(h3);

    const list = document.createElement("ul");
    list.className = "price-model-card__list";

    modelData.repairs.forEach((repair) => {
      const item = document.createElement("li");
      const isDisplay = repair.key === "repair_display";
      const label = isDisplay && repair.variant
        ? `${i18n[lang]?.repair_display || "Display"} (${getRepairLabel(repair, lang)})`
        : getRepairLabel(repair, lang);
      item.innerHTML = `<span>${label}</span><strong>${repair.price}</strong>`;
      item.className = "price-line";
      item.addEventListener("click", () => openWAForPrice(brand, modelData.model, label, repair.price));
      list.appendChild(item);
    });

    card.appendChild(list);
    return card;
  }

  function renderPrices(lang) {
    Object.entries(PRICE_DATA).forEach(([brand, models]) => {
      const popularWrap = document.querySelector(`.js-model-grid[data-brand="${brand}"]`);
      const allWrap = document.querySelector(`.js-all-models[data-brand="${brand}"]`);
      if (!popularWrap || !allWrap) return;
      popularWrap.innerHTML = "";
      allWrap.innerHTML = "";

      const popular = models.filter((entry) => isPopularModel(brand, entry.model));
      const rest = models.filter((entry) => !isPopularModel(brand, entry.model));

      popular.forEach((entry) => popularWrap.appendChild(createPriceCard(brand, entry, lang)));
      rest.forEach((entry) => allWrap.appendChild(createPriceCard(brand, entry, lang)));
    });
  }

  function initPriceExpanders() {
    document.querySelectorAll(".js-show-all[data-brand]").forEach((btn) => {
      const brand = btn.dataset.brand;
      const allWrap = document.querySelector(`.js-all-models[data-brand="${brand}"]`);
      if (!allWrap) return;
      btn.addEventListener("click", () => {
        allWrap.hidden = false;
        allWrap.classList.add("is-revealed");
        btn.hidden = true;
        btn.setAttribute("aria-expanded", "true");
      });
    });
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
    if (document.querySelector(".js-prices-section")) renderPrices(lang);
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

  if (document.querySelector(".js-prices-section")) {
    renderPrices(getLang());
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
