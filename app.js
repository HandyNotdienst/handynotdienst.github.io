(() => {
  const config = window.HN_CONFIG || {};
  const i18n = window.HN_I18N || {};
  const htmlKeys = new Set(config.htmlKeys || []);
  const defaultLang = config.defaultLang || "de";
  const whatsappNumber = config.whatsappNumber || "";
  const city = config.city || "";
  const serviceWorkerPath = config.serviceWorkerPath || "";

  const hasI18n = Object.keys(i18n).length > 0;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function trackEvent(name, params = {}) {
    const payload = { event: name, ...params };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);

    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }
    if (typeof window.plausible === "function") {
      window.plausible(name, { props: params });
    }
    window.dispatchEvent(new CustomEvent("hn:analytics", { detail: payload }));
  }

  window.HN_trackEvent = trackEvent;

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
      { model: "iPhone 16 Pro Max", series: "iphone", repairs: [{ key: "repair_display", price: "399€" }, { key: "repair_battery", price: "139€" }, { key: "repair_original_battery", price: "149€" }, { key: "repair_backglass", price: "189€" }] },
      { model: "iPhone 16 Pro", series: "iphone", repairs: [{ key: "repair_display", price: "359€" }, { key: "repair_battery", price: "129€" }, { key: "repair_original_battery", price: "129€" }, { key: "repair_backglass", price: "179€" }] },
      { model: "iPhone 16 Plus", series: "iphone", repairs: [{ key: "repair_display", price: "269€" }, { key: "repair_battery", price: "109€" }, { key: "repair_original_battery", price: "109€" }, { key: "repair_backglass", price: "169€" }] },
      { model: "iPhone 16", series: "iphone", repairs: [{ key: "repair_display", price: "249€" }, { key: "repair_battery", price: "99€" }, { key: "repair_original_battery", price: "109€" }, { key: "repair_backglass", price: "149€" }] },
      { model: "iPhone 15 Pro Max", series: "iphone", repairs: [{ key: "repair_display", price: "299€" }, { key: "repair_battery", price: "109€" }, { key: "repair_original_battery", price: "119€" }, { key: "repair_backglass", price: "149€" }] },
      { model: "iPhone 15 Pro", series: "iphone", repairs: [{ key: "repair_display", price: "269€" }, { key: "repair_battery", price: "99€" }, { key: "repair_original_battery", price: "119€" }, { key: "repair_backglass", price: "139€" }] },
      { model: "iPhone 15 Plus", series: "iphone", repairs: [{ key: "repair_display", price: "239€" }, { key: "repair_battery", price: "89€" }, { key: "repair_original_battery", price: "99€" }, { key: "repair_backglass", price: "119€" }] },
      { model: "iPhone 15", series: "iphone", repairs: [{ key: "repair_display", price: "209€" }, { key: "repair_battery", price: "89€" }, { key: "repair_original_battery", price: "99€" }, { key: "repair_backglass", price: "99€" }] },
      { model: "iPhone 14 Pro Max", series: "iphone", repairs: [{ key: "repair_display", price: "209€" }, { key: "repair_battery", price: "99€" }, { key: "repair_original_battery", price: "129€" }, { key: "repair_backglass", price: "139€" }] },
      { model: "iPhone 14 Pro", series: "iphone", repairs: [{ key: "repair_display", price: "199€" }, { key: "repair_battery", price: "89€" }, { key: "repair_original_battery", price: "119€" }, { key: "repair_backglass", price: "129€" }] },
      { model: "iPhone 14 Plus", series: "iphone", repairs: [{ key: "repair_display", price: "169€" }, { key: "repair_battery", price: "85€" }, { key: "repair_original_battery", price: "99€" }, { key: "repair_backglass", price: "99€" }] },
      { model: "iPhone 14", series: "iphone", repairs: [{ key: "repair_display", price: "149€" }, { key: "repair_battery", price: "85€" }, { key: "repair_original_battery", price: "99€" }, { key: "repair_backglass", price: "89€" }] },
      { model: "iPhone 13 Pro Max", series: "iphone", repairs: [{ key: "repair_display", price: "189€" }, { key: "repair_battery", price: "79€" }, { key: "repair_backglass", price: "109€" }] },
      { model: "iPhone 13 Pro", series: "iphone", repairs: [{ key: "repair_display", price: "179€" }, { key: "repair_battery", price: "79€" }, { key: "repair_original_battery", price: "109€" }, { key: "repair_backglass", price: "99€" }] },
      { model: "iPhone 13", series: "iphone", repairs: [{ key: "repair_display", price: "149€" }, { key: "repair_battery", price: "79€" }, { key: "repair_original_battery", price: "89€" }, { key: "repair_backglass", price: "99€" }] },
      { model: "iPhone 13 mini", series: "iphone", repairs: [{ key: "repair_display", price: "139€" }, { key: "repair_battery", price: "79€" }, { key: "repair_original_battery", price: "99€" }, { key: "repair_backglass", price: "89€" }] },
      { model: "iPhone 12 Pro Max", series: "iphone", repairs: [{ key: "repair_display", price: "149€" }, { key: "repair_battery", price: "79€" }, { key: "repair_original_battery", price: "99€" }, { key: "repair_backglass", price: "99€" }] },
      { model: "iPhone 12 / 12 Pro", series: "iphone", repairs: [{ key: "repair_display", price: "139€" }, { key: "repair_battery", price: "79€" }, { key: "repair_backglass", price: "89€" }] },
      { model: "iPhone 12 mini", series: "iphone", repairs: [{ key: "repair_display", price: "109€" }, { key: "repair_battery", price: "79€" }, { key: "repair_original_battery", price: "89€" }, { key: "repair_backglass", price: "79€" }] },
      { model: "iPhone 11 Pro Max", series: "iphone", repairs: [{ key: "repair_display", price: "119€" }, { key: "repair_battery", price: "79€" }, { key: "repair_backglass", price: "79€" }] },
      { model: "iPhone 11 Pro", series: "iphone", repairs: [{ key: "repair_display", price: "109€" }, { key: "repair_battery", price: "79€" }, { key: "repair_backglass", price: "79€" }] },
      { model: "iPhone 11", series: "iphone", repairs: [{ key: "repair_display", price: "89€" }, { key: "repair_battery", price: "79€" }, { key: "repair_backglass", price: "79€" }] },
      { model: "iPhone XS Max", series: "iphone", repairs: [{ key: "repair_display", price: "99€" }, { key: "repair_battery", price: "79€" }, { key: "repair_backglass", price: "79€" }] },
      { model: "iPhone X / XS / XR", series: "iphone", repairs: [{ key: "repair_display", price: "79€" }, { key: "repair_battery", price: "69€" }, { key: "repair_backglass", price: "69€" }] },
      { model: "iPhone SE (2022)", series: "iphone", repairs: [{ key: "repair_display", price: "79€" }, { key: "repair_battery", price: "69€" }, { key: "repair_backglass", price: "59€" }] },
      { model: "iPhone SE (2020)", series: "iphone", repairs: [{ key: "repair_display", price: "69€" }, { key: "repair_battery", price: "59€" }, { key: "repair_backglass", price: "59€" }] },
      { model: "iPhone 8 Plus", series: "iphone", repairs: [{ key: "repair_display", price: "69€" }, { key: "repair_battery", price: "59€" }, { key: "repair_backglass", price: "49€" }] },
      { model: "iPhone 8", series: "iphone", repairs: [{ key: "repair_display", price: "59€" }, { key: "repair_battery", price: "59€" }, { key: "repair_backglass", price: "49€" }] },
      { model: "iPhone 7 / 7 Plus", series: "iphone", repairs: [{ key: "repair_display", price: "49€" }, { key: "repair_battery", price: "49€" }] },
      { model: "iPhone 6s / 6s Plus", series: "iphone", repairs: [{ key: "repair_display", price: "39€" }, { key: "repair_battery", price: "39€" }] },
      { model: "iPhone 6 / 6 Plus", series: "iphone", repairs: [{ key: "repair_display", price: "39€" }, { key: "repair_battery", price: "39€" }] }
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

  const PRICE_IMAGES = {
    apple: "assets/before-phone.png",
    samsung: "assets/after-phone.png",
  };

  let selectedPriceRepair = null;
  let selectedPriceBrand = "apple";

  function slugifyPriceModel(model) {
    return model
      .toLowerCase()
      .replace(/\+/g, " plus ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getPriceImage(entry, brand) {
    if (entry.image) return entry.image;
    if (brand === "apple") return `assets/phones/${slugifyPriceModel(entry.model)}.png`;
    return PRICE_IMAGES[brand] || "assets/logo.png";
  }

  function getPriceImageSources(entry, brand) {
    if (brand !== "apple") return {};
    const slug = slugifyPriceModel(entry.model);
    return {
      webp: `assets/phones/optimized/${slug}-420.webp 420w, assets/phones/optimized/${slug}-800.webp 800w`,
      sizes: "(max-width: 560px) 92vw, (max-width: 820px) 430px, 390px",
    };
  }

  function getRepairLabel(repair, lang) {
    const t = i18n[lang] || i18n.de || {};
    if (repair.key === "repair_display" && repair.variant) {
      return `${t.repair_display || "Display"} (${t[repair.variant] || repair.variant})`;
    }
    return t[repair.key] || repair.key;
  }

  function getPriceCtaText(lang) {
    const t = i18n[lang] || i18n.de || {};
    return t.price_selector_cta || t.wa_message_intro || "Per WhatsApp anfragen";
  }

  function getStockLabel(stock, lang) {
    const t = i18n[lang] || i18n.de || {};
    const labels = {
      available: t.stock_available || "Auf Lager",
      unavailable: t.stock_unavailable || "Nicht auf Lager",
      on_request: t.stock_on_request || "Verfügbarkeit prüfen",
    };
    return labels[stock] || labels.on_request;
  }

  function getPriceFamily(model) {
    const iphone = model.match(/^(iPhone\s\d+)/);
    if (iphone) return iphone[1];

    const galaxy = model.match(/^(Galaxy\sS\d+)/);
    if (galaxy) return galaxy[1];

    return model;
  }

  function getPriceEntries() {
    return Object.entries(PRICE_DATA).flatMap(([brand, models]) => (
      models.map((entry) => ({
        ...entry,
        brand,
        family: entry.family || getPriceFamily(entry.model),
        image: getPriceImage(entry, brand),
      }))
    ));
  }

  function getPriceFamilies(entries) {
    const seen = new Set();
    return entries.reduce((families, entry) => {
      if (seen.has(entry.family)) return families;
      seen.add(entry.family);
      families.push({ family: entry.family, brand: entry.brand, image: entry.image });
      return families;
    }, []);
  }

  function getCurrentPriceEntry() {
    const modelSelect = document.querySelector("[data-price-model]");
    const model = modelSelect?.value;
    return getPriceEntries().find((entry) => entry.model === model) || getPriceEntries()[0];
  }

  function buildPriceWaHref(entry, repair) {
    if (!whatsappNumber || !entry) return "#";

    const lang = getLang();
    const t = i18n[lang] || i18n.de || {};
    const stockLine = repair?.stock
      ? `\n${t.wa_label_stock || "Lager"}: ${getStockLabel(repair.stock, lang)}`
      : "";
    const repairLine = repair
      ? `${t.wa_label_repair || "Reparatur"}: ${repair.label}\n${t.wa_label_price || "Preis"}: ${repair.price}${stockLine}`
      : (lang === "ua"
        ? "Ремонт: загальний запит"
        : lang === "en"
          ? "Repair: general inquiry"
          : "Reparatur: allgemeine Anfrage");

    const text = `${t.wa_message_intro || "Hallo!"}
📱 ${t.wa_label_device || "Modell"}: ${entry.model}
🛠️ ${repairLine}
${t.wa_label_city || "Ort"}: ${city}`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  }

  function updatePriceCta(entry) {
    const cta = document.querySelector("[data-price-cta]");
    if (!cta || !entry) return;
    cta.textContent = getPriceCtaText(getLang());
    cta.href = buildPriceWaHref(entry, selectedPriceRepair);
  }

  function setPriceCtaReady(isReady) {
    document.querySelector("[data-price-selector]")?.classList.toggle("is-repair-selected", isReady);
    document.querySelector("[data-price-cta]")?.classList.toggle("is-ready", isReady);
  }

  function updatePriceSummary(entry, repair) {
    const modelEl = document.querySelector("[data-price-summary-model]");
    const repairEl = document.querySelector("[data-price-summary-repair]");
    const priceEl = document.querySelector("[data-price-summary-price]");
    const stockEl = document.querySelector("[data-price-summary-stock]");
    if (!entry) return;

    const lang = getLang();
    const activeRepair = repair || entry.repairs[0];
    const label = activeRepair?.label || (activeRepair ? getRepairLabel(activeRepair, lang) : "");
    const price = activeRepair?.price || "";
    const stock = activeRepair?.stock || "on_request";

    if (modelEl) modelEl.textContent = entry.model;
    if (repairEl) repairEl.textContent = label || "Display";
    if (priceEl) priceEl.textContent = price;
    if (stockEl) stockEl.textContent = getStockLabel(stock, lang);
  }

  function animatePriceValue(el, price) {
    const match = String(price).match(/(\d+)/);
    if (!match || prefersReducedMotion) {
      el.textContent = price;
      return;
    }

    const end = Number(match[1]);
    const suffix = String(price).replace(match[1], "");
    const startedAt = performance.now();
    const duration = 360;

    function tick(now) {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(end * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = price;
    }

    requestAnimationFrame(tick);
  }

  function updatePricePreview(entry) {
    const image = document.querySelector("[data-price-image]");
    const webpSource = document.querySelector("[data-price-source-webp]");
    const preview = document.querySelector(".price-selector-preview");
    const selectedModel = document.querySelector("[data-price-selected-model]");
    if (!entry) return;

    const brand = entry.brand || selectedPriceBrand;
    const sources = getPriceImageSources(entry, brand);
    const setImage = () => {
      if (webpSource) {
        webpSource.srcset = sources.webp || "";
        webpSource.sizes = sources.sizes || "";
      }
      if (image) {
        image.src = entry.image;
        image.alt = `${entry.model} Reparatur bei Handy Notdienst Singen`;
      }
      if (selectedModel) selectedModel.textContent = entry.model;
    };

    if (!preview || prefersReducedMotion) {
      setImage();
      return;
    }

    preview.classList.add("is-switching");
    window.setTimeout(() => {
      setImage();
      preview.classList.remove("is-switching");
      preview.classList.add("is-settled");
      window.setTimeout(() => preview.classList.remove("is-settled"), 360);
    }, 120);
  }

  function renderPriceServices(entry, lang) {
    const list = document.querySelector("[data-price-services]");
    if (!list || !entry) return;

    list.innerHTML = "";
    selectedPriceRepair = null;
    setPriceCtaReady(false);

    entry.repairs.forEach((repair, index) => {
      const label = getRepairLabel(repair, lang);
      const row = document.createElement("button");
      row.className = `price-service-row${index === 0 ? " is-selected" : ""}`;
      row.type = "button";
      row.style.setProperty("--row-index", index);

      const labelEl = document.createElement("span");
      labelEl.textContent = label;

      const metaEl = document.createElement("span");
      metaEl.className = "price-service-row__meta";

      if (repair.stock) {
        const stockEl = document.createElement("small");
        stockEl.className = `price-stock price-stock--${repair.stock}`;
        stockEl.textContent = getStockLabel(repair.stock, lang);
        metaEl.appendChild(stockEl);
      }

      const priceEl = document.createElement("strong");
      animatePriceValue(priceEl, repair.price);
      metaEl.appendChild(priceEl);

      row.append(labelEl, metaEl);
      row.addEventListener("click", () => {
        selectedPriceRepair = { label, price: repair.price, stock: repair.stock || "on_request" };
        list.querySelectorAll(".price-service-row").forEach((item) => item.classList.remove("is-selected"));
        row.classList.add("is-selected");
        setPriceCtaReady(true);
        updatePriceSummary(entry, selectedPriceRepair);
        updatePriceCta(entry);
        trackEvent("repair_select", {
          brand: entry.brand,
          model: entry.model,
          repair: label,
          price: repair.price,
          stock: repair.stock || "on_request",
        });
      });
      list.appendChild(row);
    });

    const defaultRepair = entry.repairs[0];
    if (defaultRepair) {
      const label = getRepairLabel(defaultRepair, lang);
      selectedPriceRepair = { label, price: defaultRepair.price, stock: defaultRepair.stock || "on_request" };
      updatePriceSummary(entry, selectedPriceRepair);
      updatePriceCta(entry);
    }
    setPriceCtaReady(false);
  }

  function renderPriceSelection() {
    const familySelect = document.querySelector("[data-price-family]");
    const modelSelect = document.querySelector("[data-price-model]");
    if (!familySelect || !modelSelect) return;

    const lang = getLang();
    const entries = getPriceEntries().filter((entry) => entry.brand === selectedPriceBrand);
    const models = entries.filter((entry) => entry.family === familySelect.value);
    const entry = models.find((item) => item.model === modelSelect.value) || models[0] || entries[0];
    if (!entry) return;

    modelSelect.innerHTML = "";
    models.forEach((modelEntry) => {
      const option = document.createElement("option");
      option.value = modelEntry.model;
      option.textContent = modelEntry.model;
      option.selected = modelEntry.model === entry.model;
      modelSelect.appendChild(option);
    });

    updatePricePreview(entry);

    renderPriceServices(entry, lang);
    updatePriceCta(entry);
  }

  function renderPrices() {
    const familySelect = document.querySelector("[data-price-family]");
    const modelSelect = document.querySelector("[data-price-model]");
    if (!familySelect || !modelSelect) return;

    const currentFamily = familySelect.value;
    const entries = getPriceEntries().filter((entry) => entry.brand === selectedPriceBrand);
    const families = getPriceFamilies(entries);

    familySelect.innerHTML = "";
    families.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.family;
      option.textContent = item.family;
      familySelect.appendChild(option);
    });

    familySelect.value = families.some((item) => item.family === currentFamily)
      ? currentFamily
      : (families.find((item) => item.family === (selectedPriceBrand === "apple" ? "iPhone 15" : "Galaxy S24")) || families[0])?.family;

    renderPriceSelection();
  }

  function initPriceSelector() {
    const familySelect = document.querySelector("[data-price-family]");
    const modelSelect = document.querySelector("[data-price-model]");
    const cta = document.querySelector("[data-price-cta]");
    const brandButtons = document.querySelectorAll("[data-price-brand]");
    if (!familySelect || !modelSelect) return;

    brandButtons.forEach((button) => {
      button.addEventListener("click", () => {
        selectedPriceBrand = button.dataset.priceBrand || "apple";
        brandButtons.forEach((item) => item.classList.toggle("is-active", item === button));
        selectedPriceRepair = null;
        setPriceCtaReady(false);
        familySelect.value = "";
        modelSelect.value = "";
        renderPrices();
        trackEvent("brand_select", { brand: selectedPriceBrand });
      });
    });

    familySelect.addEventListener("change", () => {
      selectedPriceRepair = null;
      setPriceCtaReady(false);
      renderPriceSelection();
      trackEvent("model_family_select", { brand: selectedPriceBrand, family: familySelect.value });
    });
    modelSelect.addEventListener("change", () => {
      selectedPriceRepair = null;
      setPriceCtaReady(false);
      renderPriceSelection();
      trackEvent("model_select", { brand: selectedPriceBrand, model: modelSelect.value });
    });
    cta?.addEventListener("click", () => {
      const entry = getCurrentPriceEntry();
      updatePriceCta(entry);
      trackEvent("price_whatsapp_click", {
        brand: entry?.brand,
        model: entry?.model,
        repair: selectedPriceRepair?.label || "general",
        price: selectedPriceRepair?.price || "",
      });
    });

    renderPrices();
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
    const quizStartBtns = document.querySelectorAll("#quizStartBtn, .js-quiz-open");
    const quizCloseBtn = document.getElementById("quizClose");
    const quizBackBtn = document.getElementById("quizBackBtn");
    const quizProgressFill = document.getElementById("quizProgressFill");
    const quizProgressText = document.getElementById("quizProgressText");

    let quizStep = 1;
    let quizAnswers = [];

    function openQuiz(event) {
      event?.preventDefault();
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

    quizStartBtns.forEach((btn) => btn.addEventListener("click", openQuiz));
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
    if (["localhost", "127.0.0.1", "::1"].includes(window.location.hostname)) return;
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

  function initFaqAccordion() {
    const items = document.querySelectorAll(".faq details");
    if (!items.length) return;

    items.forEach((details) => {
      details.classList.add("faq__item");
      const summary = details.querySelector("summary");
      if (!summary) return;

      summary.addEventListener("click", (event) => {
        event.preventDefault();
        const willOpen = !details.open;

        items.forEach((item) => {
          if (item !== details) item.open = false;
        });

        details.open = willOpen;
        trackEvent("faq_toggle", {
          question: summary.textContent.trim(),
          open: willOpen,
        });
      });
    });
  }

  function initAnalyticsTracking() {
    document.addEventListener("click", (event) => {
      const waLink = event.target.closest?.('a[href*="wa.me"]');
      if (!waLink) return;
      trackEvent("whatsapp_click", {
        location: waLink.closest("header") ? "header" : waLink.closest(".mobilebar") ? "mobilebar" : "content",
        label: waLink.textContent.trim(),
        href: waLink.href,
      });
    });
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
    if (document.querySelector(".js-prices-section")) renderPrices();
  }

  initHeaderShadow();
  initLangButtons();
  initReveal();
  initFaqAccordion();
  initAnalyticsTracking();
  initPickupButton();
  initBundles();
  initQuiz();
  initEasterEgg();
  initServiceWorker();
  initPriceSelector();
  initQuizHighlight();

  if (document.querySelector(".js-prices-section")) {
    renderPrices();
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
