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
    const base = `https://wa.me/${whatsappNumber}?text=`;

    let msg;
    if (lang === "ua") msg = `Привіт!%0AМодель: ${encodeURIComponent(model)}%0AПроблема: ${encodeURIComponent(issue)}%0AМісто: ${city}`;
    else if (lang === "en") msg = `Hi!%0AModel: ${encodeURIComponent(model)}%0AIssue: ${encodeURIComponent(issue)}%0ACity: ${city}`;
    else msg = `Hallo!%0AModell: ${encodeURIComponent(model)}%0AProblem: ${encodeURIComponent(issue)}%0AOrt: ${city}`;

    link.href = base + msg;
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

  function openWAForPrice(brand, model, repair, price) {
    if (!whatsappNumber) return;
    const lang = getLang();
    const device = `${brand} ${model}`.trim();
    let text;
    if (lang === "ua") text = `Привіт!%0A📱 ${device}%0A🛠️ ${repair}%0A💶 ${price}%0AМісто: ${city}`;
    else if (lang === "en") text = `Hi!%0A📱 ${device}%0A🛠️ ${repair}%0A💶 ${price}%0ACity: ${city}`;
    else text = `Hallo!%0A📱 ${device}%0A🛠️ ${repair}%0A💶 ${price}%0AOrt: ${city}`;
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
          btn.innerHTML = `${repair} — <strong>${price}</strong>`;
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
    const q = input.value.toLowerCase();
    table.querySelectorAll("tbody tr").forEach((tr) => {
      tr.style.display = tr.innerText.toLowerCase().includes(q) ? "" : "none";
    });
    table
      .closest(".price-block")
      ?.querySelectorAll(".price-card")
      .forEach((card) => {
        card.style.display = card.innerText.toLowerCase().includes(q) ? "" : "none";
      });
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

  function initBeforeAfterSlider() {
    document.querySelectorAll("[data-ba-slider]").forEach((slider) => {
      const range = slider.querySelector(".ba-slider__range");
      const handle = slider.querySelector(".ba-slider__handle");
      if (!range) return;

      const setPosition = (value) => {
        const clamped = Math.min(100, Math.max(0, Number(value)));
        slider.style.setProperty("--ba-position", `${clamped}%`);
        range.value = clamped;
        if (handle) handle.setAttribute("aria-valuenow", String(Math.round(clamped)));
      };

      const updateFromPointer = (event) => {
        const rect = slider.getBoundingClientRect();
        const offset = event.clientX - rect.left;
        const ratio = rect.width ? offset / rect.width : 0;
        setPosition(ratio * 100);
      };

      setPosition(range.value || 50);

      let isDragging = false;
      slider.addEventListener("pointerdown", (event) => {
        isDragging = true;
        slider.setPointerCapture?.(event.pointerId);
        updateFromPointer(event);
      });
      slider.addEventListener("pointermove", (event) => {
        if (!isDragging) return;
        updateFromPointer(event);
      });
      slider.addEventListener("pointerup", (event) => {
        if (!isDragging) return;
        isDragging = false;
        slider.releasePointerCapture?.(event.pointerId);
      });
      slider.addEventListener("pointerleave", () => {
        isDragging = false;
      });

      range.addEventListener("input", (event) => {
        setPosition(event.target.value);
      });
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

  function setLang(lang) {
    applyTranslations(lang);
    updateSearchPlaceholders(lang);
    updateQuickWA(lang);
    updateLiveBadge();
  }

  initHeaderShadow();
  initBeforeAfterSlider();
  initLangButtons();
  initPickupButton();
  initBundles();
  initQuiz();
  initServiceWorker();

  document.querySelectorAll(".price-search").forEach((input) => {
    input.addEventListener("input", () => filterPriceBlock(input));
  });

  if (document.querySelector(".js-price-table")) {
    bindTablePriceClicks();
    generateMobileCards();
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
