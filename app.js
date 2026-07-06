(() => {
  const config = window.HN_CONFIG || {};
  const i18n = window.HN_I18N || {};
  const htmlKeys = new Set(config.htmlKeys || []);
  const requestedDefaultLang = config.defaultLang || "de";
  const whatsappNumber = config.whatsappNumber || "";
  const city = config.city || "";
  const serviceWorkerPath = config.serviceWorkerPath || "";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
  const THEME_STORAGE_KEY = "hn_theme";
  const COOKIE_CONSENT_KEY = window.HN_COOKIE_CONSENT_KEY || "hn_cookie_consent";
  const THEME_COLORS = {
    dark: "#1b374c",
    light: "#eef5f8",
  };

  const LANGUAGES = [
    { code: "de", short: "DE", name: "Deutsch", nativeName: "Deutsch", search: "de deutsch german allemand niemiecki tedesco" },
    { code: "uk", short: "UA", name: "Ukrainisch", nativeName: "Українська", search: "uk ua ukrainisch ukrainian українська українська мова" },
    { code: "en", short: "EN", name: "Englisch", nativeName: "English", search: "en english englisch anglais angielski inglese" },
    { code: "ru", short: "RU", name: "Russisch", nativeName: "Русский", search: "ru russian russisch русский rosyjski russo" },
    { code: "pl", short: "PL", name: "Polnisch", nativeName: "Polski", search: "pl polish polnisch polski polonais polacco" },
    { code: "it", short: "IT", name: "Italienisch", nativeName: "Italiano", search: "it italian italienisch italiano włoski italien" },
    { code: "ar", short: "AR", name: "Arabisch", nativeName: "العربية", search: "ar arabic arabisch العربية arabe arabski" },
    { code: "ku", short: "KU", name: "Kurdisch", nativeName: "Kurdî", search: "ku kurdish kurdisch kurdî kurmanji kurdki" },
    { code: "fr", short: "FR", name: "Französisch", nativeName: "Français", search: "fr french französisch français francuski francese" },
    { code: "sl", short: "SL", name: "Slowenisch", nativeName: "Slovenščina", search: "sl slovene slowenisch slovenščina slovenski" },
  ];
  const LANGUAGE_CODES = new Set(LANGUAGES.map((language) => language.code));

  function normalizeLang(value) {
    if (!value) return "";
    const raw = String(value).trim().toLowerCase().replace("_", "-");
    const base = raw.split("-")[0];
    const aliases = {
      ua: "uk",
      uk: "uk",
      "uk-ua": "uk",
      iw: "he",
      in: "id",
    };
    const exact = aliases[raw] || raw;
    const normalized = LANGUAGE_CODES.has(exact) ? exact : aliases[base] || base;
    return LANGUAGE_CODES.has(normalized) ? normalized : "";
  }

  function normalizeTheme(value) {
    return value === "light" || value === "dark" ? value : "";
  }

  const defaultLang = normalizeLang(requestedDefaultLang) || "de";
  let currentTheme = normalizeTheme(document.documentElement.dataset.theme) || "dark";

  const GLOBAL_I18N = {
    de: {
      language_picker_label: "Sprache wählen",
      language_search_placeholder: "Sprache suchen",
      language_no_results: "Keine Sprache gefunden",
      price_transition_text: "Reparaturpreise werden geöffnet",
      live_badge_open: "Heute: 30-90 Min möglich",
      live_badge_closed: "Schnell via WhatsApp",
      search_samsung_placeholder: "Modell suchen (z.B. S23, Ultra...)",
      search_iphone_placeholder: "Modell suchen (z.B. iPhone 13, Pro...)",
      tagline: "Singen • Schnell & zuverlässig",
      nav_home: "Start",
      nav_prices: "Preise",
      nav_contact: "Kontakt",
      no_appt: "Ohne Termin",
      mb_call: "Anrufen",
      mb_prices: "Preise",
      footer_impressum: "Impressum",
      footer_privacy: "Datenschutz",
      cta_main: "Jetzt per WhatsApp anfragen",
      quiz_label: "Diagnose (1 Min)",
      hero_help_now: "Sofort Hilfe",
      home_concept_h1: "Faire Preise.<br class=\"hero-mobile-break\"> Schnelle <br class=\"hero-mobile-break\">Reparaturen.<br><span>Zufriedene <br class=\"hero-mobile-break\">Kunden.</span>",
      lead: "Display, Akku, Ladebuchse, Kamera, Wasserschaden - wir helfen schnell. Schreib uns per WhatsApp oder ruf an.",
      hero_proof_fast: "Schnell vor Ort",
      hero_proof_fast_text: "meist in 30-60 Min.",
      hero_proof_warranty: "Garantie auf",
      hero_proof_warranty_text: "alle Reparaturen",
      hero_proof_price: "Faire Preise",
      hero_proof_price_text: "transparent",
      hero_quality: "Ersatzteile in Erstausrüster-Qualität",
      safe_badge: "Ohne Datenverlust",
      hero_rating_text: "über 250+ Bewertungen",
      hero_rating_area: "Aus Singen und Umgebung",
      home_price_cta_eyebrow: "Preise ohne Umwege",
      home_price_cta_title: "Gerät auswählen, Preis prüfen, direkt anfragen.",
      home_price_cta_text: "Die komplette Preisliste ist übersichtlich nach iPhone und Samsung getrennt. So bleibt die Startseite ruhig und du findest schneller den passenden Reparaturpreis.",
      home_price_cta_point_1: "iPhone & Samsung getrennt",
      home_price_cta_point_2: "Display, Akku, Rückglas und mehr",
      home_price_cta_point_3: "Nach Auswahl sofort per WhatsApp anfragen",
      home_price_cta_button: "Preise ansehen",
      home_price_cta_note: "Auf der Preis-Seite ist iPhone 12 als schneller Einstieg vorausgewählt.",
      contact_call: "Anrufen",
      dock_wa_text: "Schnell & unverbindlich",
      dock_quiz_text: "Problem kurz eingrenzen",
      ba_title: "VORHER / NACHHER",
      ba_before_alt: "Defektes Smartphone vor der Reparatur",
      ba_before_label: "Vorher",
      ba_compare: "Akku leer nach 2 Std -> Ganzer Tag Nutzung",
      ba_after_alt: "Repariertes Smartphone nach der Reparatur",
      ba_after_label: "Nachher",
      ba_after_caption: "Repariert, getestet & bereit für den Alltag.",
      how_title: "So läuft es ab",
      how_text: "3 Schritte - einfach & transparent.",
      how_1_t: "Diagnose",
      how_1_p: "Kurz prüfen, was genau kaputt ist.",
      how_2_t: "Preis bestätigen",
      how_2_p: "Du bekommst den Preis - du entscheidest.",
      how_3_t: "Reparatur + Test",
      how_3_p: "Reparieren, testen, fertig.",
      pick_title: "Abholung / Lieferung (Singen)",
      pick_text: "Wenn du keine Zeit hast: Wir können das Gerät nach Absprache abholen oder zurückbringen.",
      pick_btn: "Abholung anfragen",
      pick_hint: "Hinweis: Abholung/Lieferung nur nach Absprache.",
      why_me_title: "Warum ich?",
      why_me_story: "Ich repariere Smartphones mit Sorgfalt und fairen Preisen. Deine Daten bleiben privat und werden nicht gelöscht. Lokal in Singen und schnell erreichbar.",
      why_me_point_1: "Keine Daten gelöscht",
      why_me_point_2: "Faire Preise ohne Überraschungen",
      why_me_point_3: "Schnell (oft unter 1 Stunde)",
      why_me_point_4: "Bezahlen erst nach Reparatur",
      why_me_point_5: "Singen & Umgebung",
      why_me_badge_1: "Daten sicher",
      why_me_badge_2: "Schnell",
      why_me_badge_3: "Getestet",
      war_title: "Garantie",
      war_text: "Klar & verständlich.",
      war_1_t: "Garantie auf Arbeit",
      war_1_p: "Je nach Reparatur - Details beim Auftrag.",
      war_2_t: "Teilequalität",
      war_2_p: "Original/Premium je nach Verfügbarkeit.",
      war_3_t: "Daten bleiben sicher",
      war_3_p: "Bei Standard-Reparaturen normalerweise ohne Datenverlust.",
      contact_title: "Kontakt",
      contact_text: "Schreib oder ruf an - aktuell arbeite ich mobil und nach Absprache in Singen.",
      contact_wa: "schreiben",
      mobile_service_title: "Mobiler Service in Singen",
      address_hint: "Kein offenes Ladenlokal - Übergabe, Abholung oder Vor-Ort-Termin nach Absprache.",
      hours: "Termine",
      hours_hint: "meist kurzfristig nach WhatsApp-Check möglich",
      map_title: "Übergabe, Abholung oder Versand",
      map_text: "Aktuell ohne offenes Ladenlokal: lokal flexibel in Singen oder per Versand aus Deutschland.",
      map_placeholder: "Singen & deutschlandweiter Versand",
      service_area_text: "Innerhalb Singen sind Übergabe, Abholung oder mobiler Termin nach Absprache möglich. Außerhalb Singen läuft die Reparatur per verfolgbarer Sendung.",
      map_hint: "Bitte zuerst per WhatsApp Modell, Schaden und gewünschten Weg schreiben: Singen, Abholung oder Versand.",
      quiz_q1: "Lädt das Handy?",
      quiz_q2: "Akku schnell leer?",
      quiz_q3: "Bildschirm schwarz oder flackert?",
      quiz_yes: "Ja",
      quiz_no: "Nein",
      quiz_yes_b: "Ja",
      quiz_no_b: "Nein",
      quiz_yes_s: "Ja",
      quiz_no_s: "Nein",
      quiz_close: "Schließen",
      quiz_back: "Zurück",
      quiz_result_battery: "Sehr wahrscheinlich: Akku",
      quiz_result_port: "Sehr wahrscheinlich: Ladebuchse",
      quiz_result_display: "Sehr wahrscheinlich: Display / Elektronik",
      quiz_result_hint: "Schreib uns kurz - wir prüfen das schnell.",
      bundle_message: "Hallo! Ich möchte ein Bundle anfragen: {bundle}. Ort: {city}",
      pickup_message: "Hallo! Ich möchte Abholung/Lieferung anfragen. Ort: {city}",
      price_model_finder_btn: "iPhone Modell finden",
      price_selector_title: "Was kostet die Reparatur?",
      price_selector_subtitle: "Wähle dein Gerät und sieh die Preise inkl. Einbau für gängige Reparaturen.",
      price_selector_card_eyebrow: "Preise sofort prüfen",
      price_selector_trust_note: "Daten bleiben erhalten",
      price_selector_card_title: "Gerät auswählen",
      price_selector_family_label: "Gerätetyp",
      price_selector_model_label: "Modell",
      price_selector_selected_label: "Ausgewähltes Gerät",
      price_selector_services_title: "Verfügbare Reparaturen",
      price_selector_estimate_label: "Preise inkl. Einbau",
      price_selector_cta: "Per WhatsApp anfragen",
      price_stock_note: "OEM Pull Akkus sind nicht immer verfügbar. Die Verfügbarkeit wird beim WhatsApp-Check bestätigt.",
      price_selector_note: "Die endgültigen Kosten und Garantie hängen vom Zustand des Geräts und der gewählten Ersatzteilqualität ab. OEM Pull Akkus 99–100% sind nicht immer verfügbar und werden vorab bestätigt.",
      repair_display: "Display",
      repair_oled_premium: "OLED Premium",
      repair_standard: "Standard",
      repair_battery: "Akku",
      repair_original_battery: "iPhone OEM Akku 99–100%",
      repair_original_battery_info: "Replacement battery for iPhone with 99–100% battery health. OEM Pull availability varies.",
      repair_backglass: "Rückglas",
      repair_port: "Ladebuchse",
      stock_available: "Auf Lager",
      stock_unavailable: "Nicht auf Lager",
      stock_on_request: "Verfügbarkeit prüfen",
      wa_message_intro: "Hallo!",
      wa_label_device: "Modell",
      wa_label_repair: "Reparatur",
      wa_label_price: "Preis",
      wa_label_stock: "Lager",
      wa_label_city: "Ort",
      wa_label_issue: "Problem",
      wa_repair_general: "Reparatur: allgemeine Anfrage",
      faq_sub: "Kurze Antworten auf die häufigsten Fragen.",
      faq1_q: "Wie lange dauert eine Reparatur?",
      faq1_a: "Viele Reparaturen dauern 30-90 Minuten (je nach Modell und Teil).",
      faq2_q: "Bleiben meine Daten erhalten?",
      faq2_a: "Bei Standard-Reparaturen normalerweise ja. Trotzdem empfehlen wir ein Backup.",
      faq3_q: "Brauche ich einen Termin?",
      faq3_a: "Meistens nicht. Schreib kurz per WhatsApp, dann planen wir es schnell ein.",
      faq4_q: "Gibt es Garantie?",
      faq4_a: "Je nach Reparatur/Teil gibt es Garantie - Details beim Auftrag.",
      faq5_q: "Originalteile oder Premium?",
      faq5_a: "Je nach Gerät bieten wir Original oder Premium - wir erklären dir die Optionen.",
      faq6_q: "Was, wenn mein Modell nicht in der Liste steht?",
      faq6_a: "Frag uns trotzdem. Oft können wir es bestellen oder eine Alternative anbieten.",
      finder_kicker: "iPhone Modell-Finder",
      finder_title: "Welches iPhone habe ich?",
      finder_intro: "Wenn du beim Preis nicht sicher bist, wähle zuerst den Modell-Finder. Am sichersten ist die A-Nummer aus den Einstellungen, dem SIM-Fach, dem Anschluss oder der Rückseite.",
      finder_price_cta: "Danach Preis prüfen",
      finder_wa_cta: "Hilfe per WhatsApp",
      finder_step_settings: "Einstellungen prüfen",
      finder_step_settings_text: "Schnellster Weg bei entsperrtem iPhone.",
      finder_step_device: "Am Gerät suchen",
      finder_step_device_text: "SIM-Fach, Anschluss oder Rückseite mit Licht prüfen.",
      finder_step_price: "Preis passend wählen",
      finder_step_price_text: "Mit dem richtigen Modell vermeidest du falsche Preise.",
      finder_trust_fast: "Schneller Check",
      finder_trust_fast_text: "Meist direkt per WhatsApp.",
      finder_trust_warranty: "Garantie",
      finder_trust_warranty_text: "Details beim Auftrag.",
      finder_trust_data: "Daten bleiben sicher",
      finder_trust_data_text: "Standard-Reparaturen ohne Datenverlust.",
      finder_trust_price: "Faire Preise",
      finder_trust_price_text: "Modell korrekt bestimmen, Preis passend sehen.",
      finder_tool_title: "Modell jetzt bestimmen",
      finder_tool_text: "Der Finder führt dich Schritt für Schritt zur wahrscheinlich richtigen Modellbezeichnung.",
      finder_back_prices: "Zur Preisliste",
      finder_after_title: "Wenn das Modell klar ist, geht es schneller.",
      finder_after_text: "Mit der richtigen Modellnummer kann ich Preis, Ersatzteil und Dauer viel genauer einschätzen.",
      finder_after_cta: "Reparaturpreis ansehen",
      finder_person_title: "Nicht sicher? Ich schaue mit dir drauf.",
      finder_person_text: "Schick ein Foto vom Modellhinweis oder vom iPhone per WhatsApp. Du bekommst schnell eine klare Antwort.",
      finder_person_cta: "Foto per WhatsApp senden",
      finder_help_title: "Der Finder ist nur der erste Schritt.",
      finder_help_text: "Danach wählst du auf der Preisseite die passende Reparatur. Die Verfügbarkeit bestätige ich vor dem Auftrag.",
      finder_help_cta: "Zur Preisseite",
      impressum_title: "Impressum",
      impressum_intro: "Bitte ergänze hier: Name/Firma, Adresse, Kontakt, ggf. USt-ID.",
      impressum_location: "Singen (Baden-Württemberg)",
      impressum_phone_label: "Telefon:",
      impressum_email_label: "Email:",
      impressum_notice: "Hinweis: Das ist ein Platzhalter. Für Deutschland muss das Impressum korrekt ausgefüllt werden.",
      privacy_title: "Datenschutz",
      privacy_intro: "Platzhalter - hier gehört eine korrekte Datenschutzerklärung rein (Hosting, Kontakt, Cookies etc.).",
      privacy_contact_title: "Kontakt",
      privacy_contact_text: "Wenn Nutzer per Email/WhatsApp/Telegram Kontakt aufnehmen, werden Daten zur Bearbeitung der Anfrage verwendet.",
      privacy_hosting_title: "Server/Hosting",
      privacy_hosting_text: "Diese Webseite wird statisch gehostet (z.B. GitHub Pages). Logfiles können technisch anfallen.",
      privacy_notice: "Hinweis: Das ist ein Platzhalter. Für Deutschland bitte eine rechtskonforme Datenschutzerklärung verwenden.",
    },
    uk: {
      language_picker_label: "Вибрати мову",
      language_search_placeholder: "Пошук мови",
      language_no_results: "Мову не знайдено",
      price_transition_text: "Відкриваємо ціни на ремонт",
      live_badge_open: "Сьогодні: можливо за 30-90 хв",
      live_badge_closed: "Швидко через WhatsApp",
      search_samsung_placeholder: "Пошук моделі (напр. S23, Ultra...)",
      search_iphone_placeholder: "Пошук моделі (напр. iPhone 13, Pro...)",
      tagline: "Singen • Швидко та надійно",
      nav_home: "Головна",
      nav_prices: "Ціни",
      nav_contact: "Контакт",
      no_appt: "Без запису",
      mb_call: "Дзвінок",
      mb_prices: "Ціни",
      footer_impressum: "Impressum",
      footer_privacy: "Захист даних",
      cta_main: "Написати у WhatsApp",
      quiz_label: "Діагностика (1 хв)",
      hero_help_now: "Швидка допомога",
      home_concept_h1: "Чесні ціни.<br class=\"hero-mobile-break\"> Швидкий <br class=\"hero-mobile-break\">ремонт.<br><span>Задоволені <br class=\"hero-mobile-break\">клієнти.</span>",
      lead: "Дисплей, акумулятор, розʼєм зарядки, камера, вода - допоможемо швидко. Напишіть у WhatsApp або зателефонуйте.",
      hero_proof_fast: "Швидко на місці",
      hero_proof_fast_text: "зазвичай 30-60 хв",
      hero_proof_warranty: "Гарантія на",
      hero_proof_warranty_text: "усі ремонти",
      hero_proof_price: "Чесні ціни",
      hero_proof_price_text: "прозоро",
      hero_quality: "Запчастини OEM/Premium якості",
      safe_badge: "Без втрати даних",
      hero_rating_text: "понад 250+ відгуків",
      hero_rating_area: "З Singen та околиць",
      home_price_cta_eyebrow: "Ціни без зайвих кроків",
      home_price_cta_title: "Оберіть пристрій, перевірте ціну, одразу напишіть.",
      home_price_cta_text: "Повний прайс розділений на iPhone і Samsung. Так простіше знайти потрібну ціну ремонту.",
      home_price_cta_point_1: "iPhone і Samsung окремо",
      home_price_cta_point_2: "Дисплей, акумулятор, заднє скло та інше",
      home_price_cta_point_3: "Після вибору одразу запит у WhatsApp",
      home_price_cta_button: "Переглянути ціни",
      home_price_cta_note: "На сторінці цін для швидкого старту обрано iPhone 12.",
      contact_call: "Подзвонити",
      dock_wa_text: "Швидко та без зобовʼязань",
      dock_quiz_text: "Коротко визначити проблему",
      ba_title: "ДО / ПІСЛЯ",
      ba_before_alt: "Пошкоджений смартфон до ремонту",
      ba_before_label: "До",
      ba_compare: "Акумулятор сідав за 2 год -> користування весь день",
      ba_after_alt: "Відремонтований смартфон після ремонту",
      ba_after_label: "Після",
      ba_after_caption: "Відремонтовано, протестовано і готово до щоденного використання.",
      how_title: "Як це працює",
      how_text: "3 кроки - просто і прозоро.",
      how_1_t: "Діагностика",
      how_1_p: "Швидко перевіряємо, що саме зламано.",
      how_2_t: "Підтвердження ціни",
      how_2_p: "Ви отримуєте ціну - рішення за вами.",
      how_3_t: "Ремонт + тест",
      how_3_p: "Ремонтуємо, тестуємо, готово.",
      pick_title: "Забір / доставка (Singen)",
      pick_text: "Якщо немає часу: можемо за домовленістю забрати пристрій або повернути його.",
      pick_btn: "Запитати забір",
      pick_hint: "Примітка: забір/доставка тільки за домовленістю.",
      why_me_title: "Чому я?",
      why_me_story: "Я ремонтую смартфони уважно та за чесними цінами. Ваші дані залишаються приватними і не видаляються. Локально в Singen та швидко на звʼязку.",
      why_me_point_1: "Дані не видаляються",
      why_me_point_2: "Чесні ціни без сюрпризів",
      why_me_point_3: "Швидко (часто менше 1 години)",
      why_me_point_4: "Оплата після ремонту",
      why_me_point_5: "Singen та околиці",
      why_me_badge_1: "Дані в безпеці",
      why_me_badge_2: "Швидко",
      why_me_badge_3: "Перевірено",
      war_title: "Гарантія",
      war_text: "Просто та зрозуміло.",
      war_1_t: "Гарантія на роботу",
      war_1_p: "Залежно від ремонту - деталі під час замовлення.",
      war_2_t: "Якість запчастин",
      war_2_p: "Original/Premium залежно від доступності.",
      war_3_t: "Дані залишаються безпечними",
      war_3_p: "Стандартні ремонти зазвичай без втрати даних.",
      contact_title: "Контакт",
      contact_text: "Напишіть або зателефонуйте - зараз я працюю мобільно та за домовленістю в Singen.",
      contact_wa: "написати",
      mobile_service_title: "Мобільний сервіс у Singen",
      address_hint: "Поки без відкритого магазину - передача, забір або виїзд за домовленістю.",
      hours: "Терміни",
      hours_hint: "часто швидко після WhatsApp-перевірки",
      map_title: "Передача, забір або відправка",
      map_text: "Поки немає відкритого магазину: гнучко локально в Singen або через доставку по Німеччині.",
      map_placeholder: "Singen і доставка по Німеччині",
      service_area_text: "У межах Singen можливі передача, забір або мобільний термін за домовленістю. За межами Singen ремонт проходить через відстежувану посилку.",
      map_hint: "Спершу напиши в WhatsApp модель, пошкодження і бажаний шлях: Singen, забір або Versand.",
      quiz_q1: "Телефон заряджається?",
      quiz_q2: "Акумулятор швидко сідає?",
      quiz_q3: "Екран чорний або блимає?",
      quiz_yes: "Так",
      quiz_no: "Ні",
      quiz_yes_b: "Так",
      quiz_no_b: "Ні",
      quiz_yes_s: "Так",
      quiz_no_s: "Ні",
      quiz_close: "Закрити",
      quiz_back: "Назад",
      quiz_result_battery: "Найімовірніше: акумулятор",
      quiz_result_port: "Найімовірніше: розʼєм зарядки",
      quiz_result_display: "Найімовірніше: дисплей / електроніка",
      quiz_result_hint: "Напишіть нам - швидко перевіримо.",
      bundle_message: "Вітаю! Хочу запитати пакет: {bundle}. Місто: {city}",
      pickup_message: "Вітаю! Хочу домовитись про забір/доставку. Місто: {city}",
      price_model_finder_btn: "Знайти модель iPhone",
      price_selector_title: "Скільки коштує ремонт?",
      price_selector_subtitle: "Оберіть пристрій і перегляньте ціни з установкою на популярні ремонти.",
      price_selector_card_eyebrow: "Швидка перевірка цін",
      price_selector_trust_note: "Дані зберігаються",
      price_selector_card_title: "Оберіть пристрій",
      price_selector_family_label: "Тип пристрою",
      price_selector_model_label: "Модель",
      price_selector_selected_label: "Обраний пристрій",
      price_selector_services_title: "Доступні ремонти",
      price_selector_estimate_label: "Ціни з установкою",
      price_selector_cta: "Запитати у WhatsApp",
      price_stock_note: "OEM Pull акумулятори доступні не завжди. Наявність підтвердимо під час запиту у WhatsApp.",
      price_selector_note: "Остаточна вартість і гарантія залежать від стану пристрою та обраної якості запчастини. OEM Pull акумулятори 99–100% доступні не завжди і підтверджуються заздалегідь.",
      repair_display: "Дисплей",
      repair_oled_premium: "OLED Premium",
      repair_standard: "Стандарт",
      repair_battery: "Акумулятор",
      repair_original_battery: "iPhone OEM Akku 99–100%",
      repair_backglass: "Заднє скло",
      repair_port: "Розʼєм заряджання",
      stock_available: "Є на складі",
      stock_unavailable: "Немає на складі",
      stock_on_request: "Перевірити наявність",
      wa_message_intro: "Вітаю!",
      wa_label_device: "Модель",
      wa_label_repair: "Ремонт",
      wa_label_price: "Ціна",
      wa_label_stock: "Склад",
      wa_label_city: "Місто",
      wa_label_issue: "Проблема",
      wa_repair_general: "Ремонт: загальний запит",
      faq_sub: "Короткі відповіді на найчастіші питання.",
      faq1_q: "Скільки триває ремонт?",
      faq1_a: "Багато ремонтів займають 30-90 хвилин (залежно від моделі та деталі).",
      faq2_q: "Чи збережуться мої дані?",
      faq2_a: "При стандартних ремонтах зазвичай так. Але резервну копію ми все одно рекомендуємо.",
      faq3_q: "Чи потрібен запис?",
      faq3_a: "Здебільшого ні. Напишіть коротко у WhatsApp, і ми швидко домовимося.",
      faq4_q: "Чи є гарантія?",
      faq4_a: "Залежно від ремонту/деталі є гарантія - деталі під час замовлення.",
      faq5_q: "Оригінальні деталі чи Premium?",
      faq5_a: "Залежно від пристрою пропонуємо Original або Premium - пояснимо варіанти.",
      faq6_q: "Що, якщо моєї моделі немає у списку?",
      faq6_a: "Все одно запитайте. Часто можемо замовити деталь або запропонувати альтернативу.",
      finder_kicker: "Пошук моделі iPhone",
      finder_title: "Який у мене iPhone?",
      finder_intro: "Якщо ви не впевнені щодо ціни, спочатку скористайтесь пошуком моделі. Найнадійніше - A-номер у налаштуваннях, SIM-лотку, розʼємі або на задній кришці.",
      finder_price_cta: "Потім перевірити ціну",
      finder_wa_cta: "Допомога у WhatsApp",
      finder_step_settings: "Перевірити налаштування",
      finder_step_settings_text: "Найшвидший шлях, якщо iPhone розблокований.",
      finder_step_device: "Пошук на пристрої",
      finder_step_device_text: "Перевірте SIM-лоток, розʼєм або задню кришку зі світлом.",
      finder_step_price: "Обрати правильну ціну",
      finder_step_price_text: "Правильна модель допомагає уникнути неправильної ціни.",
      finder_trust_fast: "Швидка перевірка",
      finder_trust_fast_text: "Зазвичай прямо через WhatsApp.",
      finder_trust_warranty: "Гарантія",
      finder_trust_warranty_text: "Деталі під час замовлення.",
      finder_trust_data: "Дані в безпеці",
      finder_trust_data_text: "Стандартні ремонти без втрати даних.",
      finder_trust_price: "Чесні ціни",
      finder_trust_price_text: "Правильно визначте модель і побачите відповідну ціну.",
      finder_tool_title: "Визначити модель зараз",
      finder_tool_text: "Пошук крок за кроком веде до найбільш ймовірної назви моделі.",
      finder_back_prices: "До прайсу",
      finder_after_title: "Коли модель зрозуміла, усе швидше.",
      finder_after_text: "З правильною моделлю я значно точніше оціню ціну, деталь і час ремонту.",
      finder_after_cta: "Переглянути ціну ремонту",
      finder_person_title: "Не впевнені? Я перевірю разом з вами.",
      finder_person_text: "Надішліть фото підказки моделі або iPhone у WhatsApp. Ви швидко отримаєте чітку відповідь.",
      finder_person_cta: "Надіслати фото у WhatsApp",
      finder_help_title: "Пошук моделі - лише перший крок.",
      finder_help_text: "Після цього оберіть ремонт на сторінці цін. Наявність деталі підтверджую перед замовленням.",
      finder_help_cta: "До сторінки цін",
      impressum_title: "Impressum",
      impressum_intro: "Будь ласка, додайте тут: імʼя/фірму, адресу, контакт, за потреби USt-ID.",
      impressum_location: "Singen (Baden-Württemberg)",
      impressum_phone_label: "Телефон:",
      impressum_email_label: "Email:",
      impressum_notice: "Примітка: це заповнювач. Для Німеччини Impressum має бути правильно заповнений.",
      privacy_title: "Захист даних",
      privacy_intro: "Заповнювач - тут має бути коректна політика конфіденційності (хостинг, контакт, cookies тощо).",
      privacy_contact_title: "Контакт",
      privacy_contact_text: "Якщо користувачі звертаються через Email/WhatsApp/Telegram, дані використовуються для обробки запиту.",
      privacy_hosting_title: "Сервер/хостинг",
      privacy_hosting_text: "Цей сайт розміщений статично (наприклад, GitHub Pages). Технічні log-файли можуть виникати.",
      privacy_notice: "Примітка: це заповнювач. Для Німеччини потрібна юридично коректна політика конфіденційності.",
    },
  };

  const EXTRA_I18N = {
    en: {
      language_picker_label: "Choose language",
      language_search_placeholder: "Search language",
      language_no_results: "No language found",
      price_transition_text: "Opening repair prices",
      live_badge_open: "Today: 30-90 min possible",
      live_badge_closed: "Fast via WhatsApp",
      search_samsung_placeholder: "Search model (e.g. S23, Ultra...)",
      search_iphone_placeholder: "Search model (e.g. iPhone 13, Pro...)",
      tagline: "Singen • Fast & reliable",
      nav_home: "Home",
      nav_prices: "Prices",
      nav_contact: "Contact",
      no_appt: "No appointment",
      mb_call: "Call",
      mb_prices: "Prices",
      footer_impressum: "Legal notice",
      footer_privacy: "Privacy",
      cta_main: "Ask on WhatsApp now",
      quiz_label: "Diagnosis (1 min)",
      home_concept_h1: "Fair prices.<br class=\"hero-mobile-break\"> Fast <br class=\"hero-mobile-break\">repairs.<br><span>Happy <br class=\"hero-mobile-break\">customers.</span>",
      lead: "Display, battery, charging port, camera, water damage - we help fast. Message us on WhatsApp or call.",
      hero_help_now: "Instant help",
      hero_proof_fast: "Fast on site",
      hero_proof_fast_text: "usually 30-60 min",
      hero_proof_warranty: "Warranty on",
      hero_proof_warranty_text: "all repairs",
      hero_proof_price: "Fair prices",
      hero_proof_price_text: "transparent",
      hero_quality: "OEM/Premium-quality parts",
      safe_badge: "No data loss",
      hero_rating_text: "over 250+ reviews",
      hero_rating_area: "From Singen and nearby",
      home_price_cta_eyebrow: "Prices without detours",
      home_price_cta_title: "Choose device, check price, ask directly.",
      home_price_cta_text: "The full price list is clearly separated by iPhone and Samsung, so you find the right repair price faster.",
      home_price_cta_point_1: "iPhone & Samsung separated",
      home_price_cta_point_2: "Display, battery, back glass and more",
      home_price_cta_point_3: "Ask via WhatsApp right after selecting",
      home_price_cta_button: "View prices",
      home_price_cta_note: "On the price page, iPhone 12 is preselected as a quick start.",
      contact_call: "Call",
      dock_wa_text: "Fast & non-binding",
      dock_quiz_text: "Narrow down the issue",
      ba_title: "BEFORE / AFTER",
      ba_before_alt: "Broken smartphone before repair",
      ba_before_label: "Before",
      ba_compare: "Battery empty after 2h -> full day use",
      ba_after_alt: "Repaired smartphone after repair",
      ba_after_label: "After",
      ba_after_caption: "Repaired, tested & ready for everyday use.",
      how_title: "How it works",
      how_text: "3 steps - simple & transparent.",
      how_1_t: "Diagnosis",
      how_1_p: "Quickly check what is broken.",
      how_2_t: "Confirm price",
      how_2_p: "You get the price - you decide.",
      how_3_t: "Repair + test",
      how_3_p: "Repair, test, done.",
      pick_title: "Pickup / delivery (Singen)",
      pick_text: "No time? We can arrange pickup or return delivery.",
      pick_btn: "Request pickup",
      pick_hint: "Note: pickup/delivery only by arrangement.",
      why_me_title: "Why me?",
      why_me_story: "I repair smartphones carefully and at fair prices. Your data stays private and is not deleted. Local in Singen and easy to reach.",
      why_me_point_1: "No data deleted",
      why_me_point_2: "Fair prices without surprises",
      why_me_point_3: "Fast (often under 1 hour)",
      why_me_point_4: "Pay only after repair",
      why_me_point_5: "Singen & nearby",
      why_me_badge_1: "Data safe",
      why_me_badge_2: "Fast",
      why_me_badge_3: "Tested",
      war_title: "Warranty",
      war_text: "Clear & understandable.",
      war_1_t: "Warranty on work",
      war_1_p: "Depending on repair - details with the order.",
      war_2_t: "Part quality",
      war_2_p: "Original/Premium depending on availability.",
      war_3_t: "Data stays safe",
      war_3_p: "Standard repairs usually without data loss.",
      contact_title: "Contact",
      contact_text: "Message or call - currently I work mobile and by appointment in Singen.",
      contact_wa: "message",
      mobile_service_title: "Mobile service in Singen",
      address_hint: "No open shop yet - handover, pickup or on-site appointment by arrangement.",
      hours: "Appointments",
      hours_hint: "often short-notice after WhatsApp check",
      map_title: "Handover, pickup or shipping",
      map_text: "Currently without an open shop: flexible locally in Singen or by mail-in repair within Germany.",
      map_placeholder: "Singen & Germany-wide shipping",
      service_area_text: "Within Singen, handover, pickup or a mobile appointment can be arranged. Outside Singen, the repair runs by trackable parcel.",
      map_hint: "Please first send model, damage and preferred option by WhatsApp: Singen, pickup or shipping.",
      quiz_q1: "Does the phone charge?",
      quiz_q2: "Battery drains fast?",
      quiz_q3: "Screen black or flickering?",
      quiz_yes: "Yes",
      quiz_no: "No",
      quiz_yes_b: "Yes",
      quiz_no_b: "No",
      quiz_yes_s: "Yes",
      quiz_no_s: "No",
      quiz_close: "Close",
      quiz_back: "Back",
      quiz_result_battery: "Very likely: battery",
      quiz_result_port: "Very likely: charging port",
      quiz_result_display: "Very likely: display / electronics",
      quiz_result_hint: "Message us - we will check it fast.",
      bundle_message: "Hi! I would like to ask for a bundle: {bundle}. City: {city}",
      pickup_message: "Hi! I would like to arrange pickup/delivery. City: {city}",
      price_model_finder_btn: "Find iPhone model",
      price_selector_title: "How much does the repair cost?",
      price_selector_subtitle: "Choose your device and see prices incl. installation for common repairs.",
      price_selector_card_eyebrow: "Check prices instantly",
      price_selector_trust_note: "Your data stays safe",
      price_selector_card_title: "Choose your device",
      price_selector_family_label: "Device type",
      price_selector_model_label: "Model",
      price_selector_selected_label: "Selected device",
      price_selector_services_title: "Available repairs",
      price_selector_estimate_label: "Prices incl. installation",
      price_selector_cta: "Ask via WhatsApp",
      price_stock_note: "OEM Pull batteries are not always available. Availability is confirmed during the WhatsApp check.",
      price_selector_note: "Final cost and warranty depend on device condition and selected part quality. OEM Pull batteries 99–100% are not always available and are confirmed upfront.",
      repair_display: "Display",
      repair_oled_premium: "OLED Premium",
      repair_standard: "Standard",
      repair_battery: "Battery",
      repair_original_battery: "iPhone OEM Akku 99–100%",
      repair_backglass: "Back glass",
      repair_port: "Charging port",
      stock_available: "In stock",
      stock_unavailable: "Not in stock",
      stock_on_request: "Check availability",
      wa_message_intro: "Hi!",
      wa_label_device: "Model",
      wa_label_repair: "Repair",
      wa_label_price: "Price",
      wa_label_stock: "Stock",
      wa_label_city: "City",
      wa_label_issue: "Issue",
      wa_repair_general: "Repair: general inquiry",
      faq_sub: "Short answers to the most common questions.",
      faq1_q: "How long does a repair take?",
      faq1_a: "Many repairs take 30-90 minutes, depending on model and part.",
      faq2_q: "Will my data stay intact?",
      faq2_a: "Usually yes for standard repairs. We still recommend a backup.",
      faq3_q: "Do I need an appointment?",
      faq3_a: "Usually not. Send a short WhatsApp message and we will plan it quickly.",
      faq4_q: "Is there a warranty?",
      faq4_a: "Depending on repair/part, warranty is available - details with the order.",
      faq5_q: "Original parts or Premium?",
      faq5_a: "Depending on the device, we offer Original or Premium and explain the options.",
      faq6_q: "What if my model is not listed?",
      faq6_a: "Ask anyway. We can often order it or offer an alternative.",
      finder_kicker: "iPhone model finder",
      finder_title: "Which iPhone do I have?",
      finder_intro: "If you are not sure about the price, start with the model finder. The safest way is the A-number from Settings, SIM tray, port or back cover.",
      finder_price_cta: "Then check price",
      finder_wa_cta: "Help via WhatsApp",
      finder_step_settings: "Check Settings",
      finder_step_settings_text: "Fastest path when the iPhone is unlocked.",
      finder_step_device: "Look on the device",
      finder_step_device_text: "Check SIM tray, port or back cover with light.",
      finder_step_price: "Choose matching price",
      finder_step_price_text: "The correct model prevents wrong prices.",
      finder_trust_fast: "Fast check",
      finder_trust_fast_text: "Usually directly via WhatsApp.",
      finder_trust_warranty: "Warranty",
      finder_trust_warranty_text: "Details with the order.",
      finder_trust_data: "Data stays safe",
      finder_trust_data_text: "Standard repairs without data loss.",
      finder_trust_price: "Fair prices",
      finder_trust_price_text: "Find the exact model and see the right price.",
      finder_tool_title: "Find the model now",
      finder_tool_text: "The finder guides you step by step to the most likely model name.",
      finder_back_prices: "Go to prices",
      finder_after_title: "Once the model is clear, everything is faster.",
      finder_after_text: "With the correct model number I can estimate price, part and repair time much more accurately.",
      finder_after_cta: "View repair price",
      finder_person_title: "Not sure? I can check it with you.",
      finder_person_text: "Send a photo of the model hint or the iPhone via WhatsApp. You will get a clear answer quickly.",
      finder_person_cta: "Send photo via WhatsApp",
      finder_help_title: "The finder is only the first step.",
      finder_help_text: "After that, choose the repair on the prices page. I confirm part availability before the order.",
      finder_help_cta: "Go to prices",
      impressum_title: "Legal notice",
      impressum_intro: "Please add here: name/company, address, contact, VAT ID if applicable.",
      impressum_location: "Singen (Baden-Württemberg)",
      impressum_phone_label: "Phone:",
      impressum_email_label: "Email:",
      impressum_notice: "Note: This is a placeholder. For Germany, the legal notice must be completed correctly.",
      privacy_title: "Privacy",
      privacy_intro: "Placeholder - a proper privacy policy belongs here (hosting, contact, cookies etc.).",
      privacy_contact_title: "Contact",
      privacy_contact_text: "If users contact us by email/WhatsApp/Telegram, data is used to process the request.",
      privacy_hosting_title: "Server/hosting",
      privacy_hosting_text: "This website is hosted statically (e.g. GitHub Pages). Technical log files may occur.",
      privacy_notice: "Note: This is a placeholder. Please use a legally compliant privacy policy for Germany.",
    },
  };

  const SIMPLE_LANGUAGE_OVERRIDES = {
    ru: {
      language_picker_label: "Выбрать язык",
      language_search_placeholder: "Поиск языка",
      language_no_results: "Язык не найден",
      price_transition_text: "Открываем цены ремонта",
      live_badge_open: "Сегодня: возможно 30-90 мин",
      live_badge_closed: "Быстро через WhatsApp",
      search_samsung_placeholder: "Поиск модели (например S23, Ultra...)",
      search_iphone_placeholder: "Поиск модели (например iPhone 13, Pro...)",
      tagline: "Singen • быстро и надежно",
      nav_home: "Главная",
      nav_prices: "Цены",
      nav_contact: "Контакт",
      no_appt: "Без записи",
      mb_call: "Звонок",
      mb_prices: "Цены",
      cta_main: "Написать в WhatsApp",
      quiz_label: "Диагностика (1 мин)",
      home_concept_h1: "Честные цены.<br class=\"hero-mobile-break\"> Быстрый <br class=\"hero-mobile-break\">ремонт.<br><span>Довольные <br class=\"hero-mobile-break\">клиенты.</span>",
      lead: "Дисплей, аккумулятор, разъем зарядки, камера, вода - поможем быстро. Напишите в WhatsApp или позвоните.",
      hero_help_now: "Быстрая помощь",
      hero_proof_fast: "Быстро на месте",
      hero_proof_fast_text: "обычно 30-60 мин",
      hero_proof_warranty: "Гарантия на",
      hero_proof_warranty_text: "все ремонты",
      hero_proof_price: "Честные цены",
      hero_proof_price_text: "прозрачно",
      hero_quality: "Запчасти OEM/Premium качества",
      safe_badge: "Без потери данных",
      contact_call: "Позвонить",
      contact_title: "Контакт",
      contact_text: "Напишите или позвоните - сейчас я работаю мобильно и по договоренности в Singen.",
      contact_wa: "написать",
      mobile_service_title: "Мобильный сервис в Singen",
      address_hint: "Пока без открытого магазина - передача, забор или выезд по договоренности.",
      hours: "Встречи",
      hours_hint: "часто быстро после WhatsApp-проверки",
      price_selector_title: "Сколько стоит ремонт?",
      price_selector_subtitle: "Выберите устройство и посмотрите цены с установкой на частые ремонты.",
      price_model_finder_btn: "Найти модель iPhone",
      price_selector_card_eyebrow: "Быстрая проверка цен",
      price_selector_trust_note: "Данные сохраняются",
      price_selector_card_title: "Выберите устройство",
      price_selector_family_label: "Тип устройства",
      price_selector_model_label: "Модель",
      price_selector_selected_label: "Выбранное устройство",
      price_selector_services_title: "Доступные ремонты",
      price_selector_estimate_label: "Цены с установкой",
      price_selector_cta: "Спросить в WhatsApp",
      price_stock_note: "OEM Pull аккумуляторы доступны не всегда. Наличие подтвердим во время WhatsApp-проверки.",
      price_selector_note: "Итоговая стоимость и гарантия зависят от состояния устройства и выбранного качества детали. OEM Pull аккумуляторы 99–100% доступны не всегда и подтверждаются заранее.",
      repair_display: "Дисплей",
      repair_battery: "Аккумулятор",
      repair_original_battery: "iPhone OEM Akku 99–100%",
      repair_backglass: "Заднее стекло",
      repair_port: "Разъем зарядки",
      stock_available: "В наличии",
      stock_unavailable: "Нет в наличии",
      stock_on_request: "Проверить наличие",
      wa_message_intro: "Здравствуйте!",
      wa_label_device: "Модель",
      wa_label_repair: "Ремонт",
      wa_label_price: "Цена",
      wa_label_stock: "Склад",
      wa_label_city: "Город",
      wa_label_issue: "Проблема",
      wa_repair_general: "Ремонт: общий запрос",
      faq_sub: "Короткие ответы на частые вопросы.",
      faq1_q: "Сколько длится ремонт?",
      faq1_a: "Многие ремонты занимают 30-90 минут, в зависимости от модели и детали.",
      faq2_q: "Сохранятся ли мои данные?",
      faq2_a: "При стандартных ремонтах обычно да. Но резервную копию мы все равно рекомендуем.",
      faq3_q: "Нужна ли запись?",
      faq3_a: "Чаще всего нет. Напишите в WhatsApp, и мы быстро договоримся.",
      faq4_q: "Есть ли гарантия?",
      faq4_a: "В зависимости от ремонта/детали есть гарантия - детали при заказе.",
      faq5_q: "Оригинальные детали или Premium?",
      faq5_a: "В зависимости от устройства предлагаем Original или Premium и объясняем варианты.",
      faq6_q: "Что если моей модели нет в списке?",
      faq6_a: "Все равно спросите. Часто мы можем заказать деталь или предложить альтернативу.",
      finder_title: "Какой у меня iPhone?",
      finder_intro: "Если вы не уверены в цене, сначала используйте поиск модели. Самый надежный путь - A-номер в настройках, SIM-лотке, разъеме или на задней крышке.",
      finder_price_cta: "Затем проверить цену",
      finder_wa_cta: "Помощь в WhatsApp",
      finder_tool_title: "Определить модель сейчас",
      finder_tool_text: "Finder шаг за шагом ведет к наиболее вероятной модели.",
      finder_back_prices: "К прайсу",
      finder_after_cta: "Посмотреть цену ремонта",
      impressum_title: "Impressum",
      impressum_intro: "Добавьте здесь: имя/фирма, адрес, контакт, при необходимости USt-ID.",
      impressum_phone_label: "Телефон:",
      impressum_email_label: "Email:",
      impressum_notice: "Примечание: это заполнитель. Для Германии Impressum должен быть заполнен правильно.",
      privacy_title: "Защита данных",
      privacy_intro: "Заполнитель - здесь должна быть корректная политика конфиденциальности (хостинг, контакт, cookies и т.д.).",
      privacy_contact_title: "Контакт",
      privacy_contact_text: "Если пользователи обращаются по Email/WhatsApp/Telegram, данные используются для обработки запроса.",
      privacy_hosting_title: "Сервер/хостинг",
      privacy_hosting_text: "Сайт размещен статически (например, GitHub Pages). Технические log-файлы возможны.",
      privacy_notice: "Примечание: это заполнитель. Для Германии нужна юридически корректная политика конфиденциальности.",
    },
    pl: {
      language_picker_label: "Wybierz język",
      language_search_placeholder: "Szukaj języka",
      language_no_results: "Nie znaleziono języka",
      price_transition_text: "Otwieramy ceny napraw",
      live_badge_open: "Dzisiaj: możliwe 30-90 min",
      live_badge_closed: "Szybko przez WhatsApp",
      tagline: "Singen • szybko i niezawodnie",
      nav_home: "Start",
      nav_prices: "Ceny",
      nav_contact: "Kontakt",
      no_appt: "Bez terminu",
      mb_call: "Zadzwoń",
      mb_prices: "Ceny",
      cta_main: "Napisz na WhatsApp",
      quiz_label: "Diagnoza (1 min)",
      home_concept_h1: "Uczciwe ceny.<br class=\"hero-mobile-break\"> Szybkie <br class=\"hero-mobile-break\">naprawy.<br><span>Zadowoleni <br class=\"hero-mobile-break\">klienci.</span>",
      lead: "Wyświetlacz, bateria, gniazdo ładowania, kamera, zalanie - pomagamy szybko. Napisz na WhatsApp albo zadzwoń.",
      hero_proof_fast: "Szybko na miejscu",
      hero_proof_fast_text: "zwykle 30-60 min",
      hero_proof_warranty: "Gwarancja na",
      hero_proof_warranty_text: "wszystkie naprawy",
      hero_proof_price: "Uczciwe ceny",
      hero_proof_price_text: "przejrzyste",
      contact_call: "Zadzwoń",
      contact_title: "Kontakt",
      contact_text: "Napisz albo zadzwoń - obecnie pracuję mobilnie i po uzgodnieniu w Singen.",
      price_selector_title: "Ile kosztuje naprawa?",
      price_selector_subtitle: "Wybierz urządzenie i zobacz ceny z montażem najczęstszych napraw.",
      price_model_finder_btn: "Znajdź model iPhone",
      price_selector_card_title: "Wybierz urządzenie",
      price_selector_family_label: "Typ urządzenia",
      price_selector_model_label: "Model",
      price_selector_selected_label: "Wybrane urządzenie",
      price_selector_services_title: "Dostępne naprawy",
      price_selector_estimate_label: "Ceny z montażem",
      price_selector_cta: "Zapytaj przez WhatsApp",
      price_stock_note: "Baterie OEM Pull nie zawsze są dostępne. Dostępność potwierdzimy podczas sprawdzenia przez WhatsApp.",
      repair_display: "Wyświetlacz",
      repair_battery: "Bateria",
      repair_original_battery: "iPhone OEM Akku 99–100%",
      repair_backglass: "Tylne szkło",
      repair_port: "Gniazdo ładowania",
      stock_available: "Na stanie",
      stock_unavailable: "Brak na stanie",
      stock_on_request: "Sprawdź dostępność",
      wa_message_intro: "Cześć!",
      wa_label_device: "Model",
      wa_label_repair: "Naprawa",
      wa_label_price: "Cena",
      wa_label_stock: "Stan",
      wa_label_city: "Miasto",
      wa_label_issue: "Problem",
      wa_repair_general: "Naprawa: zapytanie ogólne",
      faq_sub: "Krótkie odpowiedzi na najczęstsze pytania.",
      faq1_q: "Jak długo trwa naprawa?",
      faq1_a: "Wiele napraw trwa 30-90 minut, zależnie od modelu i części.",
      faq2_q: "Czy moje dane zostaną zachowane?",
      faq2_a: "Przy standardowych naprawach zwykle tak. Mimo to zalecamy kopię zapasową.",
      faq3_q: "Czy potrzebuję terminu?",
      faq3_a: "Zazwyczaj nie. Napisz krótko na WhatsApp, a szybko ustalimy szczegóły.",
      faq4_q: "Czy jest gwarancja?",
      faq4_a: "W zależności od naprawy/części jest gwarancja - szczegóły przy zleceniu.",
      finder_title: "Jaki mam iPhone?",
      finder_intro: "Jeśli nie znasz ceny, najpierw użyj wyszukiwarki modelu. Najpewniejszy jest numer A z ustawień, tacki SIM, portu albo tylnej obudowy.",
      finder_price_cta: "Potem sprawdź cenę",
      finder_wa_cta: "Pomoc przez WhatsApp",
      impressum_title: "Nota prawna",
      impressum_intro: "Uzupełnij tutaj: imię/firma, adres, kontakt, ewentualnie USt-ID.",
      impressum_location: "Singen (Badenia-Wirtembergia)",
      impressum_phone_label: "Telefon:",
      impressum_email_label: "Email:",
      impressum_notice: "Uwaga: to jest tekst zastępczy. W Niemczech nota prawna musi być poprawnie uzupełniona.",
      privacy_title: "Ochrona danych",
      privacy_intro: "Tekst zastępczy - tutaj powinna znajdować się poprawna polityka prywatności (hosting, kontakt, cookies itd.).",
      privacy_contact_title: "Kontakt",
      privacy_contact_text: "Jeśli użytkownicy kontaktują się przez Email/WhatsApp/Telegram, dane są używane do obsługi zapytania.",
      privacy_hosting_title: "Serwer/hosting",
      privacy_hosting_text: "Ta strona jest hostowana statycznie (np. GitHub Pages). Techniczne logi mogą powstawać.",
      privacy_notice: "Uwaga: to jest tekst zastępczy. Dla Niemiec należy użyć prawnie zgodnej polityki prywatności.",
    },
    it: {
      language_picker_label: "Scegli lingua",
      language_search_placeholder: "Cerca lingua",
      language_no_results: "Lingua non trovata",
      price_transition_text: "Apro i prezzi di riparazione",
      live_badge_open: "Oggi: possibile 30-90 min",
      live_badge_closed: "Rapido via WhatsApp",
      tagline: "Singen • veloce e affidabile",
      nav_home: "Home",
      nav_prices: "Prezzi",
      nav_contact: "Contatto",
      no_appt: "Senza appuntamento",
      mb_call: "Chiama",
      mb_prices: "Prezzi",
      cta_main: "Scrivi su WhatsApp",
      quiz_label: "Diagnosi (1 min)",
      home_concept_h1: "Prezzi equi.<br class=\"hero-mobile-break\"> Riparazioni <br class=\"hero-mobile-break\">rapide.<br><span>Clienti <br class=\"hero-mobile-break\">soddisfatti.</span>",
      lead: "Display, batteria, porta di ricarica, fotocamera, acqua - aiutiamo rapidamente. Scrivici su WhatsApp o chiama.",
      hero_proof_fast: "Rapido sul posto",
      hero_proof_fast_text: "di solito 30-60 min",
      hero_proof_warranty: "Garanzia su",
      hero_proof_warranty_text: "tutte le riparazioni",
      hero_proof_price: "Prezzi equi",
      hero_proof_price_text: "trasparenti",
      contact_call: "Chiama",
      contact_title: "Contatto",
      contact_text: "Scrivi o chiama - attualmente lavoro in modo mobile e su appuntamento a Singen.",
      price_selector_title: "Quanto costa la riparazione?",
      price_selector_subtitle: "Scegli il dispositivo e vedi i prezzi con montaggio per le riparazioni più comuni.",
      price_model_finder_btn: "Trova modello iPhone",
      price_selector_card_title: "Scegli dispositivo",
      price_selector_family_label: "Tipo dispositivo",
      price_selector_model_label: "Modello",
      price_selector_selected_label: "Dispositivo scelto",
      price_selector_services_title: "Riparazioni disponibili",
      price_selector_estimate_label: "Prezzi con montaggio",
      price_selector_cta: "Chiedi via WhatsApp",
      repair_display: "Display",
      repair_battery: "Batteria",
      repair_original_battery: "iPhone OEM Akku 99–100%",
      repair_backglass: "Vetro posteriore",
      repair_port: "Porta di ricarica",
      stock_on_request: "Verifica disponibilità",
      wa_message_intro: "Ciao!",
      wa_label_device: "Modello",
      wa_label_repair: "Riparazione",
      wa_label_price: "Prezzo",
      wa_label_stock: "Disponibilità",
      wa_label_city: "Città",
      wa_label_issue: "Problema",
      wa_repair_general: "Riparazione: richiesta generale",
      faq_sub: "Risposte brevi alle domande più frequenti.",
      faq1_q: "Quanto dura una riparazione?",
      faq1_a: "Molte riparazioni durano 30-90 minuti, secondo modello e parte.",
      finder_title: "Quale iPhone ho?",
      finder_intro: "Se non sei sicuro del prezzo, usa prima il finder modello. Il modo più sicuro è il numero A da Impostazioni, SIM, porta o retro.",
      finder_price_cta: "Poi controlla il prezzo",
      finder_wa_cta: "Aiuto via WhatsApp",
      impressum_title: "Note legali",
      impressum_intro: "Inserisci qui: nome/azienda, indirizzo, contatto, eventuale USt-ID.",
      impressum_location: "Singen (Baden-Württemberg)",
      impressum_phone_label: "Telefono:",
      impressum_email_label: "Email:",
      impressum_notice: "Nota: questo è un segnaposto. Per la Germania le note legali devono essere compilate correttamente.",
      privacy_title: "Privacy",
      privacy_intro: "Segnaposto - qui va inserita una corretta informativa sulla privacy (hosting, contatto, cookie ecc.).",
      privacy_contact_title: "Contatto",
      privacy_contact_text: "Se gli utenti contattano via Email/WhatsApp/Telegram, i dati vengono usati per elaborare la richiesta.",
      privacy_hosting_title: "Server/hosting",
      privacy_hosting_text: "Questo sito è ospitato staticamente (ad es. GitHub Pages). Possono essere generati log tecnici.",
      privacy_notice: "Nota: questo è un segnaposto. Per la Germania usare una privacy policy conforme alla legge.",
    },
    ar: {
      language_picker_label: "اختيار اللغة",
      language_search_placeholder: "ابحث عن لغة",
      language_no_results: "لم يتم العثور على لغة",
      price_transition_text: "يتم فتح أسعار الإصلاح",
      live_badge_open: "اليوم: ممكن خلال 30-90 دقيقة",
      live_badge_closed: "سريع عبر WhatsApp",
      tagline: "Singen • سريع وموثوق",
      nav_home: "الرئيسية",
      nav_prices: "الأسعار",
      nav_contact: "تواصل",
      no_appt: "بدون موعد",
      mb_call: "اتصال",
      mb_prices: "الأسعار",
      cta_main: "اسأل عبر WhatsApp",
      quiz_label: "تشخيص (دقيقة)",
      home_concept_h1: "أسعار عادلة.<br class=\"hero-mobile-break\"> إصلاحات <br class=\"hero-mobile-break\">سريعة.<br><span>عملاء <br class=\"hero-mobile-break\">راضون.</span>",
      lead: "شاشة، بطارية، منفذ شحن، كاميرا، أضرار ماء - نساعدك بسرعة. اكتب لنا على WhatsApp أو اتصل.",
      hero_proof_fast: "سريع في الموقع",
      hero_proof_fast_text: "غالبا 30-60 دقيقة",
      hero_proof_warranty: "ضمان على",
      hero_proof_warranty_text: "كل الإصلاحات",
      hero_proof_price: "أسعار عادلة",
      hero_proof_price_text: "شفافة",
      contact_call: "اتصال",
      contact_title: "تواصل",
      contact_text: "اكتب أو اتصل - حاليا أعمل بشكل متنقل وباتفاق مسبق في Singen.",
      price_selector_title: "كم تكلفة الإصلاح؟",
      price_selector_subtitle: "اختر جهازك وشاهد الأسعار مع التركيب للإصلاحات الشائعة.",
      price_model_finder_btn: "اعرف موديل iPhone",
      price_selector_card_title: "اختر الجهاز",
      price_selector_family_label: "نوع الجهاز",
      price_selector_model_label: "الموديل",
      price_selector_selected_label: "الجهاز المختار",
      price_selector_services_title: "الإصلاحات المتاحة",
      price_selector_estimate_label: "الأسعار تشمل التركيب",
      price_selector_cta: "اسأل عبر WhatsApp",
      repair_display: "الشاشة",
      repair_battery: "البطارية",
      repair_original_battery: "iPhone OEM Akku 99–100%",
      repair_backglass: "الزجاج الخلفي",
      repair_port: "منفذ الشحن",
      stock_on_request: "تحقق من التوفر",
      wa_message_intro: "مرحبا!",
      wa_label_device: "الموديل",
      wa_label_repair: "الإصلاح",
      wa_label_price: "السعر",
      wa_label_stock: "التوفر",
      wa_label_city: "المدينة",
      wa_label_issue: "المشكلة",
      wa_repair_general: "الإصلاح: استفسار عام",
      faq_sub: "إجابات قصيرة على الأسئلة الشائعة.",
      faq1_q: "كم يستغرق الإصلاح؟",
      faq1_a: "تستغرق كثير من الإصلاحات 30-90 دقيقة حسب الموديل والقطعة.",
      finder_title: "ما هو موديل iPhone لدي؟",
      finder_intro: "إذا لم تكن متأكدا من السعر، ابدأ بأداة معرفة الموديل. أدق طريقة هي رقم A من الإعدادات أو درج SIM أو المنفذ أو الخلف.",
      finder_price_cta: "ثم تحقق من السعر",
      finder_wa_cta: "مساعدة عبر WhatsApp",
      impressum_title: "البيانات القانونية",
      impressum_intro: "يرجى إضافة: الاسم/الشركة، العنوان، بيانات الاتصال، ورقم الضريبة إن وجد.",
      impressum_location: "Singen (Baden-Württemberg)",
      impressum_phone_label: "هاتف:",
      impressum_email_label: "Email:",
      impressum_notice: "ملاحظة: هذا نص مؤقت. في ألمانيا يجب ملء البيانات القانونية بشكل صحيح.",
      privacy_title: "حماية البيانات",
      privacy_intro: "نص مؤقت - هنا يجب إضافة سياسة خصوصية صحيحة (الاستضافة، الاتصال، cookies وغيرها).",
      privacy_contact_title: "تواصل",
      privacy_contact_text: "عند التواصل عبر Email/WhatsApp/Telegram تُستخدم البيانات لمعالجة الطلب.",
      privacy_hosting_title: "الخادم/الاستضافة",
      privacy_hosting_text: "يتم استضافة هذا الموقع بشكل ثابت (مثلا GitHub Pages). قد تظهر ملفات سجل تقنية.",
      privacy_notice: "ملاحظة: هذا نص مؤقت. لألمانيا يرجى استخدام سياسة خصوصية متوافقة قانونيا.",
    },
    ku: {
      language_picker_label: "Ziman hilbijêre",
      language_search_placeholder: "Li zimanê bigere",
      language_no_results: "Ziman nehat dîtin",
      price_transition_text: "Buhayên tamîrê vedibin",
      live_badge_open: "Îro: 30-90 deqîqe gengaz e",
      live_badge_closed: "Zû bi WhatsApp",
      tagline: "Singen • zû û bawerbar",
      nav_home: "Destpêk",
      nav_prices: "Buha",
      nav_contact: "Têkilî",
      no_appt: "Bê randevû",
      mb_call: "Bang",
      mb_prices: "Buha",
      cta_main: "Li WhatsAppê bipirse",
      quiz_label: "Teşxîs (1 deq)",
      home_concept_h1: "Buhayên adil.<br class=\"hero-mobile-break\"> Tamîrên <br class=\"hero-mobile-break\">zû.<br><span>Mişteriyên <br class=\"hero-mobile-break\">razî.</span>",
      lead: "Dîmender, batarya, porta şarjê, kamera, av - em zû alîkar in. Li WhatsAppê binivîse an bang bike.",
      hero_proof_fast: "Zû li cih",
      hero_proof_fast_text: "pir caran 30-60 deq",
      hero_proof_warranty: "Garantiya",
      hero_proof_warranty_text: "hemû tamîran",
      hero_proof_price: "Buhayên adil",
      hero_proof_price_text: "zelal",
      contact_call: "Bang bike",
      contact_title: "Têkilî",
      contact_text: "Binivîse an bang bike - niha ez mobîl û bi lihevkirinê li Singen dixebitim.",
      price_selector_title: "Tamîr çiqas e?",
      price_selector_subtitle: "Amûra xwe hilbijêre û bihayên bi danînê re ji bo tamîrên gelemperî bibîne.",
      price_model_finder_btn: "Modela iPhone bibîne",
      price_selector_card_title: "Amûr hilbijêre",
      price_selector_family_label: "Cureyê amûrê",
      price_selector_model_label: "Model",
      price_selector_selected_label: "Amûra hilbijartî",
      price_selector_services_title: "Tamîrên berdest",
      price_selector_estimate_label: "Biha bi danînê re",
      price_selector_cta: "Li WhatsAppê bipirse",
      repair_display: "Dîmender",
      repair_battery: "Batarya",
      repair_original_battery: "iPhone OEM Akku 99–100%",
      repair_backglass: "Camê paş",
      repair_port: "Porta şarjê",
      stock_on_request: "Berdestbûnê bipirse",
      wa_message_intro: "Silav!",
      wa_label_device: "Model",
      wa_label_repair: "Tamîr",
      wa_label_price: "Buha",
      wa_label_stock: "Berdestî",
      wa_label_city: "Bajar",
      wa_label_issue: "Pirsgirêk",
      wa_repair_general: "Tamîr: pirsiyara giştî",
      finder_title: "Kîjan iPhone li min heye?",
      finder_price_cta: "Paşê buhayê kontrol bike",
      finder_wa_cta: "Alîkarî bi WhatsApp",
      impressum_title: "Agahdariya qanûnî",
      impressum_intro: "Li vir zêde bike: nav/şirket, navnîşan, têkilî, heke hebe USt-ID.",
      impressum_location: "Singen (Baden-Württemberg)",
      impressum_phone_label: "Telefon:",
      impressum_email_label: "Email:",
      impressum_notice: "Têbînî: ev cîgir e. Ji bo Almanyayê agahdariya qanûnî divê rast were temamkirin.",
      privacy_title: "Parastina daneyan",
      privacy_intro: "Cîgir - li vir divê daxuyaniya parastina daneyan a rast be (hosting, têkilî, cookies hwd.).",
      privacy_contact_title: "Têkilî",
      privacy_contact_text: "Dema bikarhêner bi Email/WhatsApp/Telegram têkilî digirin, dane ji bo bersiva daxwazê tên bikaranîn.",
      privacy_hosting_title: "Server/hosting",
      privacy_hosting_text: "Ev malper statîk tê hostkirin (wek GitHub Pages). Logên teknîkî dikarin çêbin.",
      privacy_notice: "Têbînî: ev cîgir e. Ji bo Almanyayê daxuyaniya qanûnî ya parastina daneyan bikar bîne.",
    },
    fr: {
      language_picker_label: "Choisir la langue",
      language_search_placeholder: "Rechercher une langue",
      language_no_results: "Aucune langue trouvée",
      price_transition_text: "Ouverture des prix de réparation",
      live_badge_open: "Aujourd'hui : 30-90 min possible",
      live_badge_closed: "Rapide via WhatsApp",
      tagline: "Singen • rapide et fiable",
      nav_home: "Accueil",
      nav_prices: "Prix",
      nav_contact: "Contact",
      no_appt: "Sans rendez-vous",
      mb_call: "Appeler",
      mb_prices: "Prix",
      cta_main: "Demander sur WhatsApp",
      quiz_label: "Diagnostic (1 min)",
      home_concept_h1: "Prix justes.<br class=\"hero-mobile-break\"> Réparations <br class=\"hero-mobile-break\">rapides.<br><span>Clients <br class=\"hero-mobile-break\">satisfaits.</span>",
      lead: "Écran, batterie, port de charge, caméra, dégât d'eau - nous aidons vite. Écrivez sur WhatsApp ou appelez.",
      hero_proof_fast: "Rapide sur place",
      hero_proof_fast_text: "souvent 30-60 min",
      hero_proof_warranty: "Garantie sur",
      hero_proof_warranty_text: "toutes les réparations",
      hero_proof_price: "Prix justes",
      hero_proof_price_text: "transparents",
      contact_call: "Appeler",
      contact_title: "Contact",
      contact_text: "Écrivez ou appelez - actuellement je travaille en mobile et sur rendez-vous à Singen.",
      price_selector_title: "Combien coûte la réparation ?",
      price_selector_subtitle: "Choisissez votre appareil et voyez les prix pose incluse pour les réparations courantes.",
      price_model_finder_btn: "Trouver le modèle iPhone",
      price_selector_card_title: "Choisir l'appareil",
      price_selector_family_label: "Type d'appareil",
      price_selector_model_label: "Modèle",
      price_selector_selected_label: "Appareil choisi",
      price_selector_services_title: "Réparations disponibles",
      price_selector_estimate_label: "Prix pose incluse",
      price_selector_cta: "Demander via WhatsApp",
      repair_display: "Écran",
      repair_battery: "Batterie",
      repair_original_battery: "iPhone OEM Akku 99–100%",
      repair_backglass: "Vitre arrière",
      repair_port: "Port de charge",
      stock_on_request: "Vérifier la disponibilité",
      wa_message_intro: "Bonjour !",
      wa_label_device: "Modèle",
      wa_label_repair: "Réparation",
      wa_label_price: "Prix",
      wa_label_stock: "Stock",
      wa_label_city: "Ville",
      wa_label_issue: "Problème",
      wa_repair_general: "Réparation : demande générale",
      faq_sub: "Réponses courtes aux questions fréquentes.",
      faq1_q: "Combien de temps dure une réparation ?",
      faq1_a: "Beaucoup de réparations prennent 30-90 minutes selon le modèle et la pièce.",
      finder_title: "Quel iPhone ai-je ?",
      finder_intro: "Si vous n'êtes pas sûr du prix, commencez par le finder modèle. Le plus sûr est le numéro A dans Réglages, tiroir SIM, port ou dos.",
      finder_price_cta: "Puis vérifier le prix",
      finder_wa_cta: "Aide via WhatsApp",
      impressum_title: "Mentions légales",
      impressum_intro: "Veuillez ajouter ici : nom/entreprise, adresse, contact, éventuellement USt-ID.",
      impressum_location: "Singen (Bade-Wurtemberg)",
      impressum_phone_label: "Téléphone :",
      impressum_email_label: "Email :",
      impressum_notice: "Remarque : ceci est un texte provisoire. Pour l'Allemagne, les mentions légales doivent être complétées correctement.",
      privacy_title: "Confidentialité",
      privacy_intro: "Texte provisoire - une politique de confidentialité correcte doit figurer ici (hébergement, contact, cookies, etc.).",
      privacy_contact_title: "Contact",
      privacy_contact_text: "Si les utilisateurs contactent par Email/WhatsApp/Telegram, les données sont utilisées pour traiter la demande.",
      privacy_hosting_title: "Serveur/hébergement",
      privacy_hosting_text: "Ce site est hébergé statiquement (p. ex. GitHub Pages). Des logs techniques peuvent être générés.",
      privacy_notice: "Remarque : ceci est un texte provisoire. Pour l'Allemagne, utilisez une politique de confidentialité conforme.",
    },
    sl: {
      language_picker_label: "Izberi jezik",
      language_search_placeholder: "Poišči jezik",
      language_no_results: "Jezik ni najden",
      price_transition_text: "Odpiram cene popravil",
      live_badge_open: "Danes: možno 30-90 min",
      live_badge_closed: "Hitro prek WhatsApp",
      tagline: "Singen • hitro in zanesljivo",
      nav_home: "Domov",
      nav_prices: "Cene",
      nav_contact: "Kontakt",
      no_appt: "Brez termina",
      mb_call: "Klic",
      mb_prices: "Cene",
      cta_main: "Vprašaj prek WhatsApp",
      quiz_label: "Diagnoza (1 min)",
      home_concept_h1: "Poštene cene.<br class=\"hero-mobile-break\"> Hitra <br class=\"hero-mobile-break\">popravila.<br><span>Zadovoljne <br class=\"hero-mobile-break\">stranke.</span>",
      lead: "Zaslon, baterija, polnilni priključek, kamera, voda - hitro pomagamo. Piši na WhatsApp ali pokliči.",
      hero_proof_fast: "Hitro na lokaciji",
      hero_proof_fast_text: "običajno 30-60 min",
      hero_proof_warranty: "Garancija na",
      hero_proof_warranty_text: "vsa popravila",
      hero_proof_price: "Poštene cene",
      hero_proof_price_text: "pregledne",
      contact_call: "Pokliči",
      contact_title: "Kontakt",
      contact_text: "Piši ali pokliči - trenutno delam mobilno in po dogovoru v Singen.",
      price_selector_title: "Koliko stane popravilo?",
      price_selector_subtitle: "Izberi napravo in poglej cene z vgradnjo za pogosta popravila.",
      price_model_finder_btn: "Najdi model iPhone",
      price_selector_card_title: "Izberi napravo",
      price_selector_family_label: "Tip naprave",
      price_selector_model_label: "Model",
      price_selector_selected_label: "Izbrana naprava",
      price_selector_services_title: "Razpoložljiva popravila",
      price_selector_estimate_label: "Cene z vgradnjo",
      price_selector_cta: "Vprašaj prek WhatsApp",
      repair_display: "Zaslon",
      repair_battery: "Baterija",
      repair_original_battery: "iPhone OEM Akku 99–100%",
      repair_backglass: "Zadnje steklo",
      repair_port: "Polnilni priključek",
      stock_on_request: "Preveri razpoložljivost",
      wa_message_intro: "Pozdravljeni!",
      wa_label_device: "Model",
      wa_label_repair: "Popravilo",
      wa_label_price: "Cena",
      wa_label_stock: "Zaloga",
      wa_label_city: "Mesto",
      wa_label_issue: "Težava",
      wa_repair_general: "Popravilo: splošno vprašanje",
      finder_title: "Kateri iPhone imam?",
      finder_price_cta: "Nato preveri ceno",
      finder_wa_cta: "Pomoč prek WhatsApp",
      impressum_title: "Pravno obvestilo",
      impressum_intro: "Tukaj dodaj: ime/podjetje, naslov, kontakt, po potrebi USt-ID.",
      impressum_location: "Singen (Baden-Württemberg)",
      impressum_phone_label: "Telefon:",
      impressum_email_label: "Email:",
      impressum_notice: "Opomba: to je nadomestno besedilo. Za Nemčijo mora biti pravno obvestilo pravilno izpolnjeno.",
      privacy_title: "Varstvo podatkov",
      privacy_intro: "Nadomestno besedilo - tukaj spada pravilna izjava o zasebnosti (hosting, kontakt, cookies itd.).",
      privacy_contact_title: "Kontakt",
      privacy_contact_text: "Če uporabniki vzpostavijo stik prek Email/WhatsApp/Telegram, se podatki uporabijo za obdelavo zahtevka.",
      privacy_hosting_title: "Strežnik/hosting",
      privacy_hosting_text: "Ta stran je gostovana statično (npr. GitHub Pages). Tehnični logi lahko nastanejo.",
      privacy_notice: "Opomba: to je nadomestno besedilo. Za Nemčijo uporabite pravno skladno izjavo o zasebnosti.",
    },
  };

  const HOME_SECTION_I18N = {
    ru: {
      ba_title: "ДО / ПОСЛЕ",
      ba_before_alt: "Неисправный смартфон до ремонта",
      ba_before_label: "До",
      ba_compare: "Аккумулятор садился за 2 часа -> полный день использования",
      ba_after_alt: "Отремонтированный смартфон после ремонта",
      ba_after_label: "После",
      ba_after_caption: "Отремонтировано, протестировано и готово к ежедневному использованию.",
      how_title: "Как это работает",
      how_text: "3 шага - просто и прозрачно.",
      how_1_t: "Диагностика",
      how_1_p: "Быстро проверяем, что именно сломано.",
      how_2_t: "Подтверждение цены",
      how_2_p: "Вы получаете цену - решение за вами.",
      how_3_t: "Ремонт + тест",
      how_3_p: "Ремонтируем, тестируем, готово.",
      pick_title: "Забор / доставка (Singen)",
      pick_text: "Если нет времени: можем по договоренности забрать устройство или вернуть его.",
      pick_btn: "Запросить забор",
      pick_hint: "Примечание: забор/доставка только по договоренности.",
      why_me_title: "Почему я?",
      why_me_story: "Я ремонтирую смартфоны внимательно и по честным ценам. Ваши данные остаются приватными и не удаляются. Локально в Singen и быстро на связи.",
      why_me_point_1: "Данные не удаляются",
      why_me_point_2: "Честные цены без сюрпризов",
      why_me_point_3: "Быстро (часто меньше 1 часа)",
      why_me_point_4: "Оплата только после ремонта",
      why_me_point_5: "Singen и окрестности",
      why_me_badge_1: "Данные в безопасности",
      why_me_badge_2: "Быстро",
      why_me_badge_3: "Проверено",
      war_title: "Гарантия",
      war_text: "Понятно и прозрачно.",
      war_1_t: "Гарантия на работу",
      war_1_p: "Зависит от ремонта - детали при заказе.",
      war_2_t: "Качество деталей",
      war_2_p: "Original/Premium в зависимости от наличия.",
      war_3_t: "Данные остаются в безопасности",
      war_3_p: "Стандартные ремонты обычно без потери данных.",
      map_title: "Передача, забор или отправка",
      map_text: "Пока нет открытого магазина: гибко локально в Singen или почтовым ремонтом по Германии.",
      map_placeholder: "Singen и отправка по Германии",
      service_area_text: "В пределах Singen возможны передача, забор или мобильный термин по договоренности. За пределами Singen ремонт проходит через отслеживаемую посылку.",
      map_hint: "Сначала напишите в WhatsApp модель, поломку и желаемый способ: Singen, забор или Versand.",
    },
    pl: {
      ba_title: "PRZED / PO",
      ba_before_alt: "Uszkodzony smartfon przed naprawą",
      ba_before_label: "Przed",
      ba_compare: "Bateria rozładowana po 2 godz. -> cały dzień używania",
      ba_after_alt: "Naprawiony smartfon po naprawie",
      ba_after_label: "Po",
      ba_after_caption: "Naprawiony, przetestowany i gotowy do codziennego używania.",
      how_title: "Jak to działa",
      how_text: "3 kroki - prosto i przejrzyście.",
      how_1_t: "Diagnoza",
      how_1_p: "Szybko sprawdzamy, co dokładnie jest uszkodzone.",
      how_2_t: "Potwierdzenie ceny",
      how_2_p: "Otrzymujesz cenę - decyzja należy do Ciebie.",
      how_3_t: "Naprawa + test",
      how_3_p: "Naprawiamy, testujemy, gotowe.",
      pick_title: "Odbiór / dostawa (Singen)",
      pick_text: "Nie masz czasu? Możemy po uzgodnieniu odebrać urządzenie albo je zwrócić.",
      pick_btn: "Poproś o odbiór",
      pick_hint: "Uwaga: odbiór/dostawa tylko po uzgodnieniu.",
      why_me_title: "Dlaczego ja?",
      why_me_story: "Naprawiam smartfony starannie i w uczciwych cenach. Twoje dane pozostają prywatne i nie są usuwane. Lokalnie w Singen i łatwo się ze mną skontaktować.",
      why_me_point_1: "Dane nie są usuwane",
      why_me_point_2: "Uczciwe ceny bez niespodzianek",
      why_me_point_3: "Szybko (często poniżej 1 godziny)",
      why_me_point_4: "Płatność dopiero po naprawie",
      why_me_point_5: "Singen i okolice",
      why_me_badge_1: "Dane bezpieczne",
      why_me_badge_2: "Szybko",
      why_me_badge_3: "Przetestowane",
      war_title: "Gwarancja",
      war_text: "Jasno i zrozumiale.",
      war_1_t: "Gwarancja na pracę",
      war_1_p: "Zależnie od naprawy - szczegóły przy zleceniu.",
      war_2_t: "Jakość części",
      war_2_p: "Original/Premium zależnie od dostępności.",
      war_3_t: "Dane pozostają bezpieczne",
      war_3_p: "Standardowe naprawy zwykle bez utraty danych.",
      map_title: "Przekazanie, odbiór lub wysyłka",
      map_text: "Aktualnie bez otwartego punktu: elastycznie lokalnie w Singen albo naprawa wysyłkowa w Niemczech.",
      map_placeholder: "Singen i wysyłka w Niemczech",
      service_area_text: "W Singen możliwe jest przekazanie, odbiór lub termin mobilny po uzgodnieniu. Poza Singen naprawa odbywa się przez przesyłkę z trackingiem.",
      map_hint: "Najpierw napisz przez WhatsApp model, usterkę i wybraną opcję: Singen, odbiór albo wysyłka.",
    },
    it: {
      ba_title: "PRIMA / DOPO",
      ba_before_alt: "Smartphone danneggiato prima della riparazione",
      ba_before_label: "Prima",
      ba_compare: "Batteria scarica dopo 2 ore -> uso per tutta la giornata",
      ba_after_alt: "Smartphone riparato dopo la riparazione",
      ba_after_label: "Dopo",
      ba_after_caption: "Riparato, testato e pronto per l'uso quotidiano.",
      how_title: "Come funziona",
      how_text: "3 passaggi - semplice e trasparente.",
      how_1_t: "Diagnosi",
      how_1_p: "Controllo rapido di cosa è guasto.",
      how_2_t: "Conferma prezzo",
      how_2_p: "Ricevi il prezzo - decidi tu.",
      how_3_t: "Riparazione + test",
      how_3_p: "Ripariamo, testiamo, fatto.",
      pick_title: "Ritiro / consegna (Singen)",
      pick_text: "Non hai tempo? Possiamo concordare ritiro o riconsegna del dispositivo.",
      pick_btn: "Richiedi ritiro",
      pick_hint: "Nota: ritiro/consegna solo su accordo.",
      why_me_title: "Perché me?",
      why_me_story: "Riparo smartphone con cura e prezzi equi. I tuoi dati restano privati e non vengono cancellati. Locale a Singen e facilmente raggiungibile.",
      why_me_point_1: "Nessun dato cancellato",
      why_me_point_2: "Prezzi equi senza sorprese",
      why_me_point_3: "Veloce (spesso sotto 1 ora)",
      why_me_point_4: "Paghi solo dopo la riparazione",
      why_me_point_5: "Singen e dintorni",
      why_me_badge_1: "Dati sicuri",
      why_me_badge_2: "Veloce",
      why_me_badge_3: "Testato",
      war_title: "Garanzia",
      war_text: "Chiara e comprensibile.",
      war_1_t: "Garanzia sul lavoro",
      war_1_p: "A seconda della riparazione - dettagli all'ordine.",
      war_2_t: "Qualità dei ricambi",
      war_2_p: "Original/Premium secondo disponibilità.",
      war_3_t: "I dati restano sicuri",
      war_3_p: "Riparazioni standard normalmente senza perdita di dati.",
      map_title: "Consegna, ritiro o spedizione",
      map_text: "Al momento senza negozio aperto: flessibile localmente a Singen o riparazione per spedizione in Germania.",
      map_placeholder: "Singen e spedizione in Germania",
      service_area_text: "A Singen sono possibili consegna, ritiro o appuntamento mobile su accordo. Fuori Singen la riparazione avviene tramite pacco tracciabile.",
      map_hint: "Invia prima via WhatsApp modello, danno e opzione desiderata: Singen, ritiro o spedizione.",
    },
    ar: {
      ba_title: "قبل / بعد",
      ba_before_alt: "هاتف ذكي تالف قبل الإصلاح",
      ba_before_label: "قبل",
      ba_compare: "البطارية تنفد بعد ساعتين -> استخدام طوال اليوم",
      ba_after_alt: "هاتف ذكي بعد الإصلاح",
      ba_after_label: "بعد",
      ba_after_caption: "تم الإصلاح والاختبار وجاهز للاستخدام اليومي.",
      how_title: "كيف تتم العملية",
      how_text: "3 خطوات - بسيطة وشفافة.",
      how_1_t: "التشخيص",
      how_1_p: "نفحص بسرعة ما هو العطل بالضبط.",
      how_2_t: "تأكيد السعر",
      how_2_p: "تحصل على السعر - وأنت تقرر.",
      how_3_t: "إصلاح + اختبار",
      how_3_p: "نصلح، نختبر، انتهى.",
      pick_title: "استلام / توصيل (Singen)",
      pick_text: "ليس لديك وقت؟ يمكننا الاتفاق على استلام الجهاز أو إرجاعه.",
      pick_btn: "طلب الاستلام",
      pick_hint: "ملاحظة: الاستلام/التوصيل فقط بعد الاتفاق.",
      why_me_title: "لماذا أنا؟",
      why_me_story: "أصلح الهواتف الذكية بعناية وبأسعار عادلة. تبقى بياناتك خاصة ولا يتم حذفها. محلي في Singen وسهل الوصول.",
      why_me_point_1: "لا يتم حذف البيانات",
      why_me_point_2: "أسعار عادلة بدون مفاجآت",
      why_me_point_3: "سريع (غالبا أقل من ساعة)",
      why_me_point_4: "الدفع بعد الإصلاح فقط",
      why_me_point_5: "Singen والمنطقة المحيطة",
      why_me_badge_1: "البيانات آمنة",
      why_me_badge_2: "سريع",
      why_me_badge_3: "تم الاختبار",
      war_title: "الضمان",
      war_text: "واضح ومفهوم.",
      war_1_t: "ضمان على العمل",
      war_1_p: "حسب نوع الإصلاح - التفاصيل عند الطلب.",
      war_2_t: "جودة القطع",
      war_2_p: "Original/Premium حسب التوفر.",
      war_3_t: "تبقى البيانات آمنة",
      war_3_p: "الإصلاحات القياسية عادة بدون فقدان بيانات.",
      map_title: "التسليم أو الاستلام أو الشحن",
      map_text: "حاليا بدون محل مفتوح: مرونة داخل Singen أو إصلاح عبر الشحن داخل ألمانيا.",
      map_placeholder: "Singen والشحن داخل ألمانيا",
      service_area_text: "داخل Singen يمكن الاتفاق على التسليم أو الاستلام أو موعد متنقل. خارج Singen يتم الإصلاح عبر طرد قابل للتتبع.",
      map_hint: "يرجى أولا إرسال الموديل والعطل والطريقة المطلوبة عبر WhatsApp: Singen أو الاستلام أو الشحن.",
    },
    ku: {
      ba_title: "BERÎ / PIŞTÎ",
      ba_before_alt: "Smartphone ya xerab berî tamîrê",
      ba_before_label: "Berî",
      ba_compare: "Batarya piştî 2 demjimêran vala dibû -> bikaranîna hemû rojê",
      ba_after_alt: "Smartphone ya tamîrkirî piştî tamîrê",
      ba_after_label: "Piştî",
      ba_after_caption: "Tamîrkirî, testkirî û ji bo rojane amade.",
      how_title: "Ev çawa dixebite",
      how_text: "3 gav - hêsan û zelal.",
      how_1_t: "Teşxîs",
      how_1_p: "Em zû kontrol dikin ka çi xerab e.",
      how_2_t: "Buhayê pejirandin",
      how_2_p: "Tu buhayê werdigiri - biryar ya te ye.",
      how_3_t: "Tamîr + test",
      how_3_p: "Tamîr dikin, test dikin, amade.",
      pick_title: "Wergirtin / vegerandin (Singen)",
      pick_text: "Demê te tune? Em dikarin bi lihevkirinê amûrê bistînin an vegerînin.",
      pick_btn: "Wergirtinê bipirse",
      pick_hint: "Têbînî: wergirtin/vegerandin tenê bi lihevkirinê.",
      why_me_title: "Çima ez?",
      why_me_story: "Ez smartphonean bi baldarî û buhayên adil tamîr dikim. Daneyên te taybet dimînin û nayên jêbirin. Li Singen lokal û zû têkilî.",
      why_me_point_1: "Dane nayên jêbirin",
      why_me_point_2: "Buhayên adil bê surprîz",
      why_me_point_3: "Zû (pir caran di bin 1 demjimêrê de)",
      why_me_point_4: "Piştî tamîrê tenê dayîn",
      why_me_point_5: "Singen û derdor",
      why_me_badge_1: "Dane ewle ne",
      why_me_badge_2: "Zû",
      why_me_badge_3: "Testkirî",
      war_title: "Garanti",
      war_text: "Zelal û têgihiştî.",
      war_1_t: "Garantiya karê",
      war_1_p: "Li gorî tamîrê - hûrgulî di daxwazê de.",
      war_2_t: "Kalîteya parçeyan",
      war_2_p: "Original/Premium li gorî berdestbûnê.",
      war_3_t: "Dane ewle dimînin",
      war_3_p: "Tamîrên standard bi gelemperî bê windakirina daneyan.",
      map_title: "Radestkirin, wergirtin an şandin",
      map_text: "Niha dikanê vekirî tune: li Singen bi lihevkirinê an jî bi şandina li Almanyayê.",
      map_placeholder: "Singen û şandina li Almanyayê",
      service_area_text: "Li hundirê Singen radestkirin, wergirtin an demjimêra mobîl bi lihevkirinê dibe. Li derveyî Singen tamîr bi pakêta şopbar tê kirin.",
      map_hint: "Ji kerema xwe pêşî model, zirar û rêya xwestî bi WhatsApp binivîse: Singen, wergirtin an şandin.",
    },
    fr: {
      ba_title: "AVANT / APRÈS",
      ba_before_alt: "Smartphone défectueux avant la réparation",
      ba_before_label: "Avant",
      ba_compare: "Batterie vide après 2 h -> utilisation toute la journée",
      ba_after_alt: "Smartphone réparé après la réparation",
      ba_after_label: "Après",
      ba_after_caption: "Réparé, testé et prêt pour le quotidien.",
      how_title: "Comment ça marche",
      how_text: "3 étapes - simple et transparent.",
      how_1_t: "Diagnostic",
      how_1_p: "Vérifier rapidement ce qui est exactement cassé.",
      how_2_t: "Confirmer le prix",
      how_2_p: "Vous recevez le prix - vous décidez.",
      how_3_t: "Réparation + test",
      how_3_p: "Réparer, tester, terminé.",
      pick_title: "Enlèvement / livraison (Singen)",
      pick_text: "Pas le temps ? Nous pouvons convenir d'un enlèvement ou d'un retour de l'appareil.",
      pick_btn: "Demander un enlèvement",
      pick_hint: "Remarque : enlèvement/livraison uniquement sur accord.",
      why_me_title: "Pourquoi moi ?",
      why_me_story: "Je répare les smartphones avec soin et à des prix justes. Vos données restent privées et ne sont pas supprimées. Local à Singen et facilement joignable.",
      why_me_point_1: "Aucune donnée supprimée",
      why_me_point_2: "Prix justes sans surprise",
      why_me_point_3: "Rapide (souvent moins d'1 heure)",
      why_me_point_4: "Paiement seulement après réparation",
      why_me_point_5: "Singen et environs",
      why_me_badge_1: "Données sécurisées",
      why_me_badge_2: "Rapide",
      why_me_badge_3: "Testé",
      war_title: "Garantie",
      war_text: "Clair et compréhensible.",
      war_1_t: "Garantie sur le travail",
      war_1_p: "Selon la réparation - détails lors de la commande.",
      war_2_t: "Qualité des pièces",
      war_2_p: "Original/Premium selon disponibilité.",
      war_3_t: "Les données restent sûres",
      war_3_p: "Réparations standard généralement sans perte de données.",
      map_title: "Remise, collecte ou envoi",
      map_text: "Actuellement sans boutique ouverte : flexible à Singen ou réparation par envoi en Allemagne.",
      map_placeholder: "Singen et envoi dans toute l'Allemagne",
      service_area_text: "À Singen, une remise, une collecte ou un rendez-vous mobile peut être convenu. Hors Singen, la réparation se fait par colis suivi.",
      map_hint: "Envoie d'abord via WhatsApp le modèle, le problème et l'option souhaitée : Singen, collecte ou envoi.",
    },
    sl: {
      ba_title: "PREJ / POTEM",
      ba_before_alt: "Pokvarjen pametni telefon pred popravilom",
      ba_before_label: "Prej",
      ba_compare: "Baterija prazna po 2 urah -> uporaba ves dan",
      ba_after_alt: "Popravljen pametni telefon po popravilu",
      ba_after_label: "Potem",
      ba_after_caption: "Popravljeno, testirano in pripravljeno za vsakdan.",
      how_title: "Kako poteka",
      how_text: "3 koraki - preprosto in pregledno.",
      how_1_t: "Diagnoza",
      how_1_p: "Hitro preverimo, kaj točno je pokvarjeno.",
      how_2_t: "Potrditev cene",
      how_2_p: "Dobiš ceno - odločiš se ti.",
      how_3_t: "Popravilo + test",
      how_3_p: "Popravimo, testiramo, končano.",
      pick_title: "Prevzem / dostava (Singen)",
      pick_text: "Nimaš časa? Po dogovoru lahko napravo prevzamemo ali vrnemo.",
      pick_btn: "Zahtevaj prevzem",
      pick_hint: "Opomba: prevzem/dostava samo po dogovoru.",
      why_me_title: "Zakaj jaz?",
      why_me_story: "Pametne telefone popravljam skrbno in po poštenih cenah. Tvoji podatki ostanejo zasebni in se ne izbrišejo. Lokalno v Singen in hitro dosegljivo.",
      why_me_point_1: "Podatki se ne izbrišejo",
      why_me_point_2: "Poštene cene brez presenečenj",
      why_me_point_3: "Hitro (pogosto manj kot 1 ura)",
      why_me_point_4: "Plačilo šele po popravilu",
      why_me_point_5: "Singen in okolica",
      why_me_badge_1: "Podatki varni",
      why_me_badge_2: "Hitro",
      why_me_badge_3: "Testirano",
      war_title: "Garancija",
      war_text: "Jasno in razumljivo.",
      war_1_t: "Garancija na delo",
      war_1_p: "Odvisno od popravila - podrobnosti ob naročilu.",
      war_2_t: "Kakovost delov",
      war_2_p: "Original/Premium glede na razpoložljivost.",
      war_3_t: "Podatki ostanejo varni",
      war_3_p: "Standardna popravila običajno brez izgube podatkov.",
      map_title: "Predaja, prevzem ali pošiljanje",
      map_text: "Trenutno brez odprte poslovalnice: prilagodljivo lokalno v Singen ali pošiljanje po Nemčiji.",
      map_placeholder: "Singen in pošiljanje po Nemčiji",
      service_area_text: "V Singen so po dogovoru možni predaja, prevzem ali mobilni termin. Zunaj Singen popravilo poteka prek sledljive pošiljke.",
      map_hint: "Najprej po WhatsApp pošlji model, okvaro in želeno možnost: Singen, prevzem ali pošiljanje.",
    },
  };

  const FAQ_I18N = {
    de: {
      faq_sub: "Antworten zu Daten, Akku, Display, Ladebuchse, Ersatzteilen und Versand.",
      faq_section_general: "Allgemein",
      faq_section_battery: "Akku-Reparaturen",
      faq_section_display: "Display-Reparaturen",
      faq_section_port: "Ladebuchsen-Reparaturen",
      faq_section_parts: "Preise & Ersatzteile",
      faq_section_other: "Sonstiges",
      faq_duration_q: "Wie lange dauert eine Reparatur?",
      faq_duration_a: "Viele Reparaturen dauern 30-90 Minuten (je nach Modell und Teil).",
      faq_data_q: "Werden meine Daten gelöscht?",
      faq_data_a: "Nein. Bei einer Display-, Akku-, Rückseiten- oder Ladebuchsenreparatur bleiben deine Daten normalerweise vollständig erhalten. Trotzdem empfehlen wir vor jeder Reparatur ein Backup.",
      faq_appointment_q: "Brauche ich einen Termin?",
      faq_appointment_a: "Meistens nicht. Schreib kurz per WhatsApp, dann planen wir es schnell ein.",
      faq_warranty_q: "Gibt es Garantie?",
      faq_warranty_a: "Je nach Reparatur und Ersatzteil gibt es Garantie. Die genauen Details klären wir vor dem Auftrag.",
      faq_model_missing_q: "Was, wenn mein Modell nicht in der Liste steht?",
      faq_model_missing_a: "Frag uns trotzdem. Oft können wir es bestellen, prüfen oder eine passende Alternative anbieten.",
      faq_oem_pull_q: "Was ist ein OEM Pull Akku?",
      faq_oem_pull_a: "Ein OEM Pull Akku ist ein originaler Apple Akku, der aus einem anderen Gerät stammt. Die Akkus werden geprüft und nach Zustand sortiert.",
      faq_grade_a_q: "Was bedeutet Grade A (99-100% SOH)?",
      faq_grade_a_a: "Grade A bedeutet, dass der Akku einen Batteriezustand (SOH = State of Health) von 99-100% besitzt und sich technisch nahezu im Neuzustand befindet.",
      faq_oem_better_q: "Sind OEM Pull Akkus besser als Nachbau-Akkus?",
      faq_oem_better_a: "Ja. OEM Pull Akkus sind originale Apple Akkus und bieten in der Regel eine bessere Qualität, genauere Batteriewerte und eine längere Lebensdauer als viele Nachbau-Akkus.",
      faq_battery_capacity_q: "Wird nach dem Akkutausch die Batteriekapazität angezeigt?",
      faq_battery_capacity_a: "Bei vielen Modellen kann die Batteriekapazität weiterhin angezeigt werden. Dies hängt vom jeweiligen Gerät und der Reparaturmethode ab.",
      faq_oem_expensive_q: "Warum sind OEM Akkus teurer?",
      faq_oem_expensive_a: "OEM Pull Akkus stammen aus Originalgeräten und haben meist einen Batteriezustand von 99-100%. Sie sind deutlich seltener und qualitativ hochwertiger als Standard-Nachbauakkus.",
      faq_display_quality_q: "Welche Display-Qualitäten bietet ihr an?",
      faq_display_quality_a: "Aftermarket ist eine günstige Alternative für preisbewusste Kunden. Aftermarket Pro bietet bessere Farbdarstellung und Helligkeit. OEM / Original steht für originale Apple Displays oder hochwertige Refurbished-Displays mit maximaler Bildqualität.",
      faq_promotion_q: "Unterstützen ProMotion Displays weiterhin 120Hz?",
      faq_promotion_a: "Ja. Bei unseren 120Hz-kompatiblen Displays bleiben die hohen Bildwiederholraten der Pro-Modelle erhalten.",
      faq_lcd_oled_q: "Was ist der Unterschied zwischen LCD und OLED?",
      faq_lcd_oled_a: "OLED bietet bessere Farben, tiefere Schwarztöne, höhere Kontraste und einen geringeren Stromverbrauch. OLED entspricht der Originaltechnik moderner iPhones.",
      faq_charge_port_q: "Mein iPhone lädt nicht mehr. Muss die Ladebuchse getauscht werden?",
      faq_charge_port_a: "Nicht immer. Oft reicht bereits eine professionelle Reinigung. Erst wenn die Ladebuchse tatsächlich defekt ist, wird sie ersetzt.",
      faq_fast_charge_q: "Funktionieren Datenübertragung und Schnellladen nach der Reparatur?",
      faq_fast_charge_a: "Ja. Nach dem Austausch funktionieren Laden und Datenübertragung wieder wie vorgesehen.",
      faq_cheaper_apple_q: "Warum sind eure Preise günstiger als Apple?",
      faq_cheaper_apple_a: "Wir bieten verschiedene Reparaturoptionen an und können viele Geräte wirtschaftlicher reparieren, ohne komplette Baugruppen austauschen zu müssen.",
      faq_original_parts_q: "Verwendet ihr Originalteile?",
      faq_original_parts_a: "Je nach Reparatur bieten wir OEM Pull, Refurbished, Original OEM und hochwertige Aftermarket-Ersatzteile an.",
      faq_quality_choice_q: "Kann ich zwischen verschiedenen Qualitätsstufen wählen?",
      faq_quality_choice_a: "Ja. Bei vielen Modellen kannst du zwischen verschiedenen Display- und Akkuqualitäten wählen.",
      faq_buy_broken_q: "Kauft ihr auch defekte Geräte an?",
      faq_buy_broken_a: "Ja. Wir kaufen viele defekte iPhones an. Kontaktiere uns mit Modell und Fehlerbeschreibung.",
      faq_water_damage_q: "Repariert ihr auch Geräte mit Wasserschaden?",
      faq_water_damage_a: "Ja. Eine erfolgreiche Reparatur kann jedoch nicht in jedem Fall garantiert werden. Eine Diagnose erfolgt vorab.",
      faq_shipping_q: "Kann ich mein Gerät einsenden?",
      faq_shipping_a: "Ja. Auf Anfrage bieten wir auch einen Reparaturservice per Versand an.",
    },
    uk: {
      faq_sub: "Відповіді про дані, акумулятор, дисплей, роз'єм зарядки, запчастини та відправку.",
      faq_section_general: "Загальне",
      faq_section_battery: "Ремонт акумулятора",
      faq_section_display: "Ремонт дисплея",
      faq_section_port: "Ремонт роз'єму зарядки",
      faq_section_parts: "Ціни та запчастини",
      faq_section_other: "Інше",
      faq_duration_q: "Скільки триває ремонт?",
      faq_duration_a: "Багато ремонтів займають 30-90 хвилин, залежно від моделі та деталі.",
      faq_data_q: "Чи будуть видалені мої дані?",
      faq_data_a: "Ні. При ремонті дисплея, акумулятора, задньої частини або роз'єму зарядки твої дані зазвичай повністю зберігаються. Але перед кожним ремонтом ми все одно рекомендуємо зробити резервну копію.",
      faq_appointment_q: "Чи потрібен запис?",
      faq_appointment_a: "Здебільшого ні. Напиши коротко у WhatsApp, і ми швидко домовимося.",
      faq_warranty_q: "Чи є гарантія?",
      faq_warranty_a: "Залежно від ремонту та запчастини є гарантія. Точні деталі ми уточнюємо перед замовленням.",
      faq_model_missing_q: "Що, якщо моєї моделі немає у списку?",
      faq_model_missing_a: "Все одно напиши нам. Часто ми можемо замовити деталь, перевірити модель або запропонувати відповідну альтернативу.",
      faq_oem_pull_q: "Що таке OEM Pull акумулятор?",
      faq_oem_pull_a: "OEM Pull акумулятор - це оригінальний акумулятор Apple, знятий з іншого пристрою. Такі акумулятори перевіряються і сортуються за станом.",
      faq_grade_a_q: "Що означає Grade A (99-100% SOH)?",
      faq_grade_a_a: "Grade A означає, що акумулятор має стан батареї 99-100% (SOH = State of Health) і технічно майже як новий.",
      faq_oem_better_q: "Чи кращі OEM Pull акумулятори за копії?",
      faq_oem_better_a: "Так. OEM Pull акумулятори є оригінальними акумуляторами Apple і зазвичай мають кращу якість, точніші показники батареї та довший строк служби, ніж багато копій.",
      faq_battery_capacity_q: "Чи показуватиметься ємність батареї після заміни?",
      faq_battery_capacity_a: "На багатьох моделях ємність батареї може й надалі відображатися. Це залежить від конкретного пристрою та методу ремонту.",
      faq_oem_expensive_q: "Чому OEM акумулятори дорожчі?",
      faq_oem_expensive_a: "OEM Pull акумулятори походять з оригінальних пристроїв і зазвичай мають стан 99-100%. Вони значно рідкісніші та якісніші за стандартні копії.",
      faq_display_quality_q: "Які якості дисплеїв ви пропонуєте?",
      faq_display_quality_a: "Aftermarket - бюджетна альтернатива. Aftermarket Pro має кращі кольори та яскравість. OEM / Original означає оригінальні дисплеї Apple або якісні refurbished-дисплеї з максимальною якістю зображення.",
      faq_promotion_q: "Чи підтримують ProMotion дисплеї 120Hz після ремонту?",
      faq_promotion_a: "Так. На наших 120Hz-сумісних дисплеях висока частота оновлення Pro-моделей зберігається.",
      faq_lcd_oled_q: "У чому різниця між LCD і OLED?",
      faq_lcd_oled_a: "OLED має кращі кольори, глибший чорний, вищий контраст і менше споживання енергії. OLED відповідає оригінальній технології сучасних iPhone.",
      faq_charge_port_q: "Мій iPhone більше не заряджається. Чи треба міняти роз'єм?",
      faq_charge_port_a: "Не завжди. Часто достатньо професійного очищення. Роз'єм замінюється тільки тоді, коли він справді несправний.",
      faq_fast_charge_q: "Чи працюватимуть передача даних і швидка зарядка після ремонту?",
      faq_fast_charge_a: "Так. Після заміни зарядка і передача даних знову працюють як передбачено.",
      faq_cheaper_apple_q: "Чому ваші ціни нижчі, ніж у Apple?",
      faq_cheaper_apple_a: "Ми пропонуємо різні варіанти ремонту і можемо ремонтувати багато пристроїв економніше, без заміни цілих модулів.",
      faq_original_parts_q: "Чи використовуєте ви оригінальні запчастини?",
      faq_original_parts_a: "Залежно від ремонту ми пропонуємо OEM Pull, Refurbished, Original OEM та якісні Aftermarket-запчастини.",
      faq_quality_choice_q: "Чи можу я вибрати різні рівні якості?",
      faq_quality_choice_a: "Так. Для багатьох моделей можна вибрати різну якість дисплея та акумулятора.",
      faq_buy_broken_q: "Чи купуєте ви несправні пристрої?",
      faq_buy_broken_a: "Так. Ми купуємо багато несправних iPhone. Напиши нам модель і опис несправності.",
      faq_water_damage_q: "Чи ремонтуєте пристрої після води?",
      faq_water_damage_a: "Так. Але успішний ремонт не завжди можна гарантувати. Спочатку проводиться діагностика.",
      faq_shipping_q: "Чи можу я надіслати пристрій поштою?",
      faq_shipping_a: "Так. За запитом ми також пропонуємо ремонт із відправкою поштою.",
    },
    en: {
      faq_sub: "Answers about data, batteries, displays, charging ports, parts and shipping.",
      faq_section_general: "General",
      faq_section_battery: "Battery repairs",
      faq_section_display: "Display repairs",
      faq_section_port: "Charging port repairs",
      faq_section_parts: "Prices & parts",
      faq_section_other: "Other",
      faq_duration_q: "How long does a repair take?",
      faq_duration_a: "Many repairs take 30-90 minutes, depending on model and part.",
      faq_data_q: "Will my data be deleted?",
      faq_data_a: "No. For display, battery, back housing or charging port repairs, your data normally stays fully intact. We still recommend a backup before every repair.",
      faq_appointment_q: "Do I need an appointment?",
      faq_appointment_a: "Usually not. Send a short WhatsApp message and we will plan it quickly.",
      faq_warranty_q: "Is there a warranty?",
      faq_warranty_a: "Depending on the repair and replacement part, warranty is available. We clarify the exact details before the order.",
      faq_model_missing_q: "What if my model is not listed?",
      faq_model_missing_a: "Ask anyway. We can often order it, check it or offer a suitable alternative.",
      faq_oem_pull_q: "What is an OEM Pull battery?",
      faq_oem_pull_a: "An OEM Pull battery is an original Apple battery taken from another device. The batteries are tested and sorted by condition.",
      faq_grade_a_q: "What does Grade A (99-100% SOH) mean?",
      faq_grade_a_a: "Grade A means the battery has a battery health of 99-100% (SOH = State of Health) and is technically almost like new.",
      faq_oem_better_q: "Are OEM Pull batteries better than aftermarket batteries?",
      faq_oem_better_a: "Yes. OEM Pull batteries are original Apple batteries and usually offer better quality, more accurate battery values and a longer lifespan than many aftermarket batteries.",
      faq_battery_capacity_q: "Will battery capacity still be shown after replacement?",
      faq_battery_capacity_a: "On many models, the battery capacity can still be displayed. This depends on the device and the repair method.",
      faq_oem_expensive_q: "Why are OEM batteries more expensive?",
      faq_oem_expensive_a: "OEM Pull batteries come from original devices and usually have 99-100% battery health. They are much rarer and higher quality than standard aftermarket batteries.",
      faq_display_quality_q: "Which display qualities do you offer?",
      faq_display_quality_a: "Aftermarket is an affordable option for price-conscious customers. Aftermarket Pro offers better color and brightness. OEM / Original means original Apple displays or high-quality refurbished displays with maximum image quality.",
      faq_promotion_q: "Do ProMotion displays still support 120Hz?",
      faq_promotion_a: "Yes. With our 120Hz-compatible displays, the high refresh rates of Pro models remain available.",
      faq_lcd_oled_q: "What is the difference between LCD and OLED?",
      faq_lcd_oled_a: "OLED offers better colors, deeper blacks, higher contrast and lower power consumption. OLED matches the original technology of modern iPhones.",
      faq_charge_port_q: "My iPhone no longer charges. Does the charging port need replacing?",
      faq_charge_port_a: "Not always. A professional cleaning is often enough. The charging port is replaced only when it is actually defective.",
      faq_fast_charge_q: "Will data transfer and fast charging work after the repair?",
      faq_fast_charge_a: "Yes. After replacement, charging and data transfer work as intended again.",
      faq_cheaper_apple_q: "Why are your prices lower than Apple?",
      faq_cheaper_apple_a: "We offer different repair options and can repair many devices more economically without replacing complete assemblies.",
      faq_original_parts_q: "Do you use original parts?",
      faq_original_parts_a: "Depending on the repair, we offer OEM Pull, refurbished, original OEM and high-quality aftermarket replacement parts.",
      faq_quality_choice_q: "Can I choose between different quality levels?",
      faq_quality_choice_a: "Yes. For many models, you can choose between different display and battery qualities.",
      faq_buy_broken_q: "Do you also buy defective devices?",
      faq_buy_broken_a: "Yes. We buy many defective iPhones. Contact us with the model and fault description.",
      faq_water_damage_q: "Do you also repair water-damaged devices?",
      faq_water_damage_a: "Yes. However, a successful repair cannot be guaranteed in every case. A diagnosis is done first.",
      faq_shipping_q: "Can I send in my device?",
      faq_shipping_a: "Yes. On request, we also offer a repair service by shipping.",
    },
    ru: {
      faq_sub: "Ответы о данных, аккумуляторах, дисплеях, разъеме зарядки, запчастях и отправке.",
      faq_section_general: "Общее",
      faq_section_battery: "Ремонт аккумулятора",
      faq_section_display: "Ремонт дисплея",
      faq_section_port: "Ремонт разъема зарядки",
      faq_section_parts: "Цены и запчасти",
      faq_section_other: "Другое",
      faq_duration_q: "Сколько длится ремонт?",
      faq_duration_a: "Многие ремонты занимают 30-90 минут, в зависимости от модели и детали.",
      faq_data_q: "Будут ли удалены мои данные?",
      faq_data_a: "Нет. При ремонте дисплея, аккумулятора, задней части или разъема зарядки ваши данные обычно полностью сохраняются. Тем не менее перед каждым ремонтом мы рекомендуем сделать резервную копию.",
      faq_appointment_q: "Нужна ли запись?",
      faq_appointment_a: "Чаще всего нет. Напишите в WhatsApp, и мы быстро договоримся.",
      faq_warranty_q: "Есть ли гарантия?",
      faq_warranty_a: "В зависимости от ремонта и запчасти предоставляется гарантия. Точные детали мы уточняем до заказа.",
      faq_model_missing_q: "Что если моей модели нет в списке?",
      faq_model_missing_a: "Все равно спросите. Часто мы можем заказать деталь, проверить модель или предложить подходящую альтернативу.",
      faq_oem_pull_q: "Что такое OEM Pull аккумулятор?",
      faq_oem_pull_a: "OEM Pull аккумулятор - это оригинальный аккумулятор Apple, снятый с другого устройства. Аккумуляторы проверяются и сортируются по состоянию.",
      faq_grade_a_q: "Что означает Grade A (99-100% SOH)?",
      faq_grade_a_a: "Grade A означает, что аккумулятор имеет состояние 99-100% (SOH = State of Health) и технически почти как новый.",
      faq_oem_better_q: "OEM Pull аккумуляторы лучше копий?",
      faq_oem_better_a: "Да. OEM Pull аккумуляторы являются оригинальными аккумуляторами Apple и обычно дают лучшее качество, более точные значения батареи и более долгий срок службы, чем многие копии.",
      faq_battery_capacity_q: "Будет ли отображаться емкость батареи после замены?",
      faq_battery_capacity_a: "На многих моделях емкость батареи может продолжать отображаться. Это зависит от устройства и метода ремонта.",
      faq_oem_expensive_q: "Почему OEM аккумуляторы дороже?",
      faq_oem_expensive_a: "OEM Pull аккумуляторы происходят из оригинальных устройств и обычно имеют состояние 99-100%. Они значительно реже и качественнее стандартных копий.",
      faq_display_quality_q: "Какие качества дисплеев вы предлагаете?",
      faq_display_quality_a: "Aftermarket - доступная альтернатива для экономных клиентов. Aftermarket Pro дает лучшую цветопередачу и яркость. OEM / Original означает оригинальные дисплеи Apple или качественные refurbished-дисплеи с максимальным качеством изображения.",
      faq_promotion_q: "Поддерживают ли ProMotion дисплеи 120Hz после ремонта?",
      faq_promotion_a: "Да. На наших 120Hz-совместимых дисплеях высокая частота обновления Pro-моделей сохраняется.",
      faq_lcd_oled_q: "В чем разница между LCD и OLED?",
      faq_lcd_oled_a: "OLED дает лучшие цвета, более глубокий черный, высокий контраст и меньшее энергопотребление. OLED соответствует оригинальной технологии современных iPhone.",
      faq_charge_port_q: "Мой iPhone больше не заряжается. Нужно менять разъем?",
      faq_charge_port_a: "Не всегда. Часто достаточно профессиональной чистки. Разъем заменяется только если он действительно неисправен.",
      faq_fast_charge_q: "Будут ли работать передача данных и быстрая зарядка после ремонта?",
      faq_fast_charge_a: "Да. После замены зарядка и передача данных снова работают как положено.",
      faq_cheaper_apple_q: "Почему ваши цены ниже, чем у Apple?",
      faq_cheaper_apple_a: "Мы предлагаем разные варианты ремонта и можем ремонтировать многие устройства экономичнее, без замены целых модулей.",
      faq_original_parts_q: "Используете ли вы оригинальные запчасти?",
      faq_original_parts_a: "В зависимости от ремонта мы предлагаем OEM Pull, Refurbished, Original OEM и качественные Aftermarket-запчасти.",
      faq_quality_choice_q: "Можно ли выбрать разные уровни качества?",
      faq_quality_choice_a: "Да. Для многих моделей можно выбрать разные качества дисплея и аккумулятора.",
      faq_buy_broken_q: "Покупаете ли вы неисправные устройства?",
      faq_buy_broken_a: "Да. Мы покупаем многие неисправные iPhone. Напишите нам модель и описание неисправности.",
      faq_water_damage_q: "Ремонтируете ли устройства после воды?",
      faq_water_damage_a: "Да. Но успешный ремонт не всегда можно гарантировать. Сначала проводится диагностика.",
      faq_shipping_q: "Можно ли отправить устройство?",
      faq_shipping_a: "Да. По запросу мы также предлагаем ремонт с отправкой.",
    },
    pl: {
      faq_sub: "Odpowiedzi o danych, bateriach, wyświetlaczach, gnieździe ładowania, częściach i wysyłce.",
      faq_section_general: "Ogólne",
      faq_section_battery: "Naprawy baterii",
      faq_section_display: "Naprawy wyświetlacza",
      faq_section_port: "Naprawy gniazda ładowania",
      faq_section_parts: "Ceny i części",
      faq_section_other: "Inne",
      faq_duration_q: "Jak długo trwa naprawa?",
      faq_duration_a: "Wiele napraw trwa 30-90 minut, zależnie od modelu i części.",
      faq_data_q: "Czy moje dane zostaną usunięte?",
      faq_data_a: "Nie. Przy naprawie wyświetlacza, baterii, tylnej części lub gniazda ładowania dane zwykle pozostają w całości zachowane. Mimo to przed każdą naprawą zalecamy kopię zapasową.",
      faq_appointment_q: "Czy potrzebuję terminu?",
      faq_appointment_a: "Zazwyczaj nie. Napisz krótko na WhatsApp, a szybko ustalimy szczegóły.",
      faq_warranty_q: "Czy jest gwarancja?",
      faq_warranty_a: "W zależności od naprawy i części dostępna jest gwarancja. Dokładne szczegóły ustalamy przed zleceniem.",
      faq_model_missing_q: "Co jeśli mojego modelu nie ma na liście?",
      faq_model_missing_a: "Zapytaj mimo wszystko. Często możemy zamówić część, sprawdzić model albo zaproponować odpowiednią alternatywę.",
      faq_oem_pull_q: "Czym jest bateria OEM Pull?",
      faq_oem_pull_a: "Bateria OEM Pull to oryginalna bateria Apple pochodząca z innego urządzenia. Baterie są testowane i sortowane według stanu.",
      faq_grade_a_q: "Co oznacza Grade A (99-100% SOH)?",
      faq_grade_a_a: "Grade A oznacza, że bateria ma kondycję 99-100% (SOH = State of Health) i technicznie jest prawie jak nowa.",
      faq_oem_better_q: "Czy baterie OEM Pull są lepsze niż zamienniki?",
      faq_oem_better_a: "Tak. Baterie OEM Pull są oryginalnymi bateriami Apple i zwykle oferują lepszą jakość, dokładniejsze wskazania oraz dłuższą żywotność niż wiele zamienników.",
      faq_battery_capacity_q: "Czy po wymianie będzie widoczna kondycja baterii?",
      faq_battery_capacity_a: "W wielu modelach kondycja baterii może nadal być wyświetlana. Zależy to od urządzenia i metody naprawy.",
      faq_oem_expensive_q: "Dlaczego baterie OEM są droższe?",
      faq_oem_expensive_a: "Baterie OEM Pull pochodzą z oryginalnych urządzeń i zwykle mają kondycję 99-100%. Są znacznie rzadsze i jakościowo lepsze niż standardowe zamienniki.",
      faq_display_quality_q: "Jakie jakości wyświetlaczy oferujecie?",
      faq_display_quality_a: "Aftermarket to tańsza alternatywa dla klientów liczących cenę. Aftermarket Pro oferuje lepsze kolory i jasność. OEM / Original oznacza oryginalne wyświetlacze Apple lub wysokiej jakości refurbished z maksymalną jakością obrazu.",
      faq_promotion_q: "Czy wyświetlacze ProMotion nadal obsługują 120Hz?",
      faq_promotion_a: "Tak. Przy naszych wyświetlaczach zgodnych z 120Hz wysoka częstotliwość odświeżania modeli Pro zostaje zachowana.",
      faq_lcd_oled_q: "Jaka jest różnica między LCD i OLED?",
      faq_lcd_oled_a: "OLED oferuje lepsze kolory, głębszą czerń, wyższy kontrast i mniejsze zużycie energii. OLED odpowiada oryginalnej technologii nowoczesnych iPhone'ów.",
      faq_charge_port_q: "Mój iPhone nie ładuje się. Czy trzeba wymienić gniazdo?",
      faq_charge_port_a: "Nie zawsze. Często wystarczy profesjonalne czyszczenie. Gniazdo wymienia się dopiero wtedy, gdy faktycznie jest uszkodzone.",
      faq_fast_charge_q: "Czy przesył danych i szybkie ładowanie będą działać po naprawie?",
      faq_fast_charge_a: "Tak. Po wymianie ładowanie i przesył danych działają znów zgodnie z przeznaczeniem.",
      faq_cheaper_apple_q: "Dlaczego wasze ceny są niższe niż w Apple?",
      faq_cheaper_apple_a: "Oferujemy różne opcje naprawy i wiele urządzeń możemy naprawić ekonomiczniej, bez wymiany całych modułów.",
      faq_original_parts_q: "Czy używacie oryginalnych części?",
      faq_original_parts_a: "W zależności od naprawy oferujemy OEM Pull, Refurbished, Original OEM oraz wysokiej jakości części Aftermarket.",
      faq_quality_choice_q: "Czy mogę wybrać różne poziomy jakości?",
      faq_quality_choice_a: "Tak. Przy wielu modelach możesz wybrać różne jakości wyświetlacza i baterii.",
      faq_buy_broken_q: "Czy kupujecie także uszkodzone urządzenia?",
      faq_buy_broken_a: "Tak. Kupujemy wiele uszkodzonych iPhone'ów. Skontaktuj się z nami, podając model i opis usterki.",
      faq_water_damage_q: "Czy naprawiacie urządzenia po zalaniu?",
      faq_water_damage_a: "Tak. Udanej naprawy nie da się jednak zagwarantować w każdym przypadku. Najpierw wykonywana jest diagnoza.",
      faq_shipping_q: "Czy mogę wysłać urządzenie?",
      faq_shipping_a: "Tak. Na życzenie oferujemy również naprawę wysyłkową.",
    },
    it: {
      faq_sub: "Risposte su dati, batterie, display, porta di ricarica, ricambi e spedizione.",
      faq_section_general: "Generale",
      faq_section_battery: "Riparazioni batteria",
      faq_section_display: "Riparazioni display",
      faq_section_port: "Riparazioni porta di ricarica",
      faq_section_parts: "Prezzi e ricambi",
      faq_section_other: "Altro",
      faq_duration_q: "Quanto dura una riparazione?",
      faq_duration_a: "Molte riparazioni durano 30-90 minuti, a seconda del modello e del ricambio.",
      faq_data_q: "I miei dati vengono cancellati?",
      faq_data_a: "No. Con riparazioni di display, batteria, retro o porta di ricarica i tuoi dati normalmente restano completamente conservati. Consigliamo comunque un backup prima di ogni riparazione.",
      faq_appointment_q: "Serve un appuntamento?",
      faq_appointment_a: "Di solito no. Scrivi brevemente su WhatsApp e organizziamo tutto rapidamente.",
      faq_warranty_q: "C'è garanzia?",
      faq_warranty_a: "A seconda della riparazione e del ricambio è disponibile una garanzia. I dettagli precisi vengono chiariti prima dell'ordine.",
      faq_model_missing_q: "Cosa succede se il mio modello non è nella lista?",
      faq_model_missing_a: "Chiedi comunque. Spesso possiamo ordinare il pezzo, verificare il modello o proporre un'alternativa adatta.",
      faq_oem_pull_q: "Cos'è una batteria OEM Pull?",
      faq_oem_pull_a: "Una batteria OEM Pull è una batteria originale Apple proveniente da un altro dispositivo. Le batterie vengono testate e ordinate in base allo stato.",
      faq_grade_a_q: "Cosa significa Grade A (99-100% SOH)?",
      faq_grade_a_a: "Grade A significa che la batteria ha una salute del 99-100% (SOH = State of Health) ed è tecnicamente quasi come nuova.",
      faq_oem_better_q: "Le batterie OEM Pull sono migliori delle batterie compatibili?",
      faq_oem_better_a: "Sì. Le batterie OEM Pull sono batterie originali Apple e di solito offrono qualità migliore, valori batteria più precisi e durata maggiore rispetto a molte compatibili.",
      faq_battery_capacity_q: "Dopo la sostituzione viene mostrata la capacità batteria?",
      faq_battery_capacity_a: "Su molti modelli la capacità batteria può continuare a essere visualizzata. Dipende dal dispositivo e dal metodo di riparazione.",
      faq_oem_expensive_q: "Perché le batterie OEM costano di più?",
      faq_oem_expensive_a: "Le batterie OEM Pull provengono da dispositivi originali e di solito hanno una salute del 99-100%. Sono molto più rare e di qualità superiore rispetto alle compatibili standard.",
      faq_display_quality_q: "Quali qualità di display offrite?",
      faq_display_quality_a: "Aftermarket è un'alternativa economica per chi guarda al prezzo. Aftermarket Pro offre colori e luminosità migliori. OEM / Original indica display Apple originali o refurbished di alta qualità con massima resa dell'immagine.",
      faq_promotion_q: "I display ProMotion continuano a supportare 120Hz?",
      faq_promotion_a: "Sì. Con i nostri display compatibili 120Hz, l'elevata frequenza di aggiornamento dei modelli Pro rimane disponibile.",
      faq_lcd_oled_q: "Qual è la differenza tra LCD e OLED?",
      faq_lcd_oled_a: "OLED offre colori migliori, neri più profondi, maggiore contrasto e minore consumo energetico. OLED corrisponde alla tecnologia originale degli iPhone moderni.",
      faq_charge_port_q: "Il mio iPhone non carica più. Va sostituita la porta?",
      faq_charge_port_a: "Non sempre. Spesso basta una pulizia professionale. La porta viene sostituita solo se è davvero difettosa.",
      faq_fast_charge_q: "Trasferimento dati e ricarica rapida funzionano dopo la riparazione?",
      faq_fast_charge_a: "Sì. Dopo la sostituzione, ricarica e trasferimento dati funzionano di nuovo come previsto.",
      faq_cheaper_apple_q: "Perché i vostri prezzi sono più bassi di Apple?",
      faq_cheaper_apple_a: "Offriamo diverse opzioni di riparazione e possiamo riparare molti dispositivi in modo più economico senza sostituire interi moduli.",
      faq_original_parts_q: "Usate ricambi originali?",
      faq_original_parts_a: "A seconda della riparazione offriamo OEM Pull, Refurbished, Original OEM e ricambi Aftermarket di alta qualità.",
      faq_quality_choice_q: "Posso scegliere tra diversi livelli di qualità?",
      faq_quality_choice_a: "Sì. Per molti modelli puoi scegliere tra diverse qualità di display e batteria.",
      faq_buy_broken_q: "Comprate anche dispositivi difettosi?",
      faq_buy_broken_a: "Sì. Compriamo molti iPhone difettosi. Contattaci con modello e descrizione del guasto.",
      faq_water_damage_q: "Riparate anche dispositivi con danni da acqua?",
      faq_water_damage_a: "Sì. Tuttavia una riparazione riuscita non può essere garantita in ogni caso. Prima viene fatta una diagnosi.",
      faq_shipping_q: "Posso spedire il mio dispositivo?",
      faq_shipping_a: "Sì. Su richiesta offriamo anche un servizio di riparazione con spedizione.",
    },
    ar: {
      faq_sub: "إجابات حول البيانات والبطارية والشاشة ومنفذ الشحن والقطع والشحن.",
      faq_section_general: "عام",
      faq_section_battery: "إصلاح البطارية",
      faq_section_display: "إصلاح الشاشة",
      faq_section_port: "إصلاح منفذ الشحن",
      faq_section_parts: "الأسعار وقطع الغيار",
      faq_section_other: "أخرى",
      faq_duration_q: "كم يستغرق الإصلاح؟",
      faq_duration_a: "تستغرق كثير من الإصلاحات 30-90 دقيقة حسب الموديل والقطعة.",
      faq_data_q: "هل سيتم حذف بياناتي؟",
      faq_data_a: "لا. عند إصلاح الشاشة أو البطارية أو الجهة الخلفية أو منفذ الشحن تبقى بياناتك عادة محفوظة بالكامل. ومع ذلك ننصح بعمل نسخة احتياطية قبل كل إصلاح.",
      faq_appointment_q: "هل أحتاج إلى موعد؟",
      faq_appointment_a: "غالبا لا. أرسل رسالة قصيرة عبر WhatsApp وسنرتب الأمر بسرعة.",
      faq_warranty_q: "هل توجد ضمانة؟",
      faq_warranty_a: "حسب نوع الإصلاح وقطعة الغيار يمكن أن توجد ضمانة. نوضح التفاصيل الدقيقة قبل الطلب.",
      faq_model_missing_q: "ماذا إذا لم يكن موديلي في القائمة؟",
      faq_model_missing_a: "اسألنا على أي حال. غالبا يمكننا طلب القطعة أو فحص الموديل أو اقتراح بديل مناسب.",
      faq_oem_pull_q: "ما هي بطارية OEM Pull؟",
      faq_oem_pull_a: "بطارية OEM Pull هي بطارية Apple أصلية مأخوذة من جهاز آخر. يتم فحص البطاريات وفرزها حسب الحالة.",
      faq_grade_a_q: "ماذا يعني Grade A (99-100% SOH)؟",
      faq_grade_a_a: "Grade A يعني أن حالة البطارية 99-100% (SOH = State of Health) وأنها تقنيا قريبة جدا من الجديدة.",
      faq_oem_better_q: "هل بطاريات OEM Pull أفضل من البطاريات البديلة؟",
      faq_oem_better_a: "نعم. بطاريات OEM Pull هي بطاريات Apple أصلية وتقدم عادة جودة أفضل وقراءات أدق وعمر استخدام أطول من كثير من البطاريات البديلة.",
      faq_battery_capacity_q: "هل تظهر سعة البطارية بعد الاستبدال؟",
      faq_battery_capacity_a: "في كثير من الموديلات يمكن أن تستمر سعة البطارية بالظهور. هذا يعتمد على الجهاز وطريقة الإصلاح.",
      faq_oem_expensive_q: "لماذا بطاريات OEM أغلى؟",
      faq_oem_expensive_a: "بطاريات OEM Pull تأتي من أجهزة أصلية وغالبا حالتها 99-100%. لذلك هي أندر وأعلى جودة من البطاريات البديلة القياسية.",
      faq_display_quality_q: "ما درجات جودة الشاشة التي تقدمونها؟",
      faq_display_quality_a: "Aftermarket خيار اقتصادي للعملاء المهتمين بالسعر. Aftermarket Pro يقدم ألوانا وسطوعا أفضل. OEM / Original يعني شاشات Apple أصلية أو شاشات Refurbished عالية الجودة بأفضل جودة صورة.",
      faq_promotion_q: "هل تستمر شاشات ProMotion بدعم 120Hz؟",
      faq_promotion_a: "نعم. مع شاشاتنا المتوافقة مع 120Hz تبقى معدلات التحديث العالية في موديلات Pro متاحة.",
      faq_lcd_oled_q: "ما الفرق بين LCD و OLED؟",
      faq_lcd_oled_a: "OLED يقدم ألوانا أفضل وأسود أعمق وتباينا أعلى واستهلاكا أقل للطاقة. OLED يطابق التقنية الأصلية في أجهزة iPhone الحديثة.",
      faq_charge_port_q: "iPhone لا يشحن. هل يجب تبديل منفذ الشحن؟",
      faq_charge_port_a: "ليس دائما. غالبا يكفي تنظيف احترافي. يتم استبدال منفذ الشحن فقط إذا كان معطلا فعلا.",
      faq_fast_charge_q: "هل يعمل نقل البيانات والشحن السريع بعد الإصلاح؟",
      faq_fast_charge_a: "نعم. بعد الاستبدال يعمل الشحن ونقل البيانات كما هو متوقع.",
      faq_cheaper_apple_q: "لماذا أسعاركم أقل من Apple؟",
      faq_cheaper_apple_a: "نقدم خيارات إصلاح مختلفة ويمكننا إصلاح كثير من الأجهزة بشكل أوفر دون تبديل وحدات كاملة.",
      faq_original_parts_q: "هل تستخدمون قطع أصلية؟",
      faq_original_parts_a: "حسب الإصلاح نقدم OEM Pull و Refurbished و Original OEM وقطع Aftermarket عالية الجودة.",
      faq_quality_choice_q: "هل يمكنني الاختيار بين مستويات جودة مختلفة؟",
      faq_quality_choice_a: "نعم. في كثير من الموديلات يمكنك الاختيار بين درجات مختلفة لجودة الشاشة والبطارية.",
      faq_buy_broken_q: "هل تشترون الأجهزة المعطلة أيضا؟",
      faq_buy_broken_a: "نعم. نشتري كثيرا من أجهزة iPhone المعطلة. تواصل معنا مع الموديل ووصف العطل.",
      faq_water_damage_q: "هل تصلحون الأجهزة المتضررة من الماء؟",
      faq_water_damage_a: "نعم. لكن لا يمكن ضمان نجاح الإصلاح في كل حالة. يتم التشخيص أولا.",
      faq_shipping_q: "هل يمكنني إرسال جهازي؟",
      faq_shipping_a: "نعم. عند الطلب نقدم أيضا خدمة إصلاح عبر الشحن.",
    },
    ku: {
      faq_sub: "Bersivên derbarê daneyan, bataryayê, dîmenderê, porta şarjê, parçeyan û şandinê.",
      faq_section_general: "Giştî",
      faq_section_battery: "Tamîra bataryayê",
      faq_section_display: "Tamîra dîmenderê",
      faq_section_port: "Tamîra porta şarjê",
      faq_section_parts: "Buha û parçeyên guhertinê",
      faq_section_other: "Yên din",
      faq_duration_q: "Tamîr çiqas dem digire?",
      faq_duration_a: "Gelek tamîr 30-90 deqîqe didomînin, li gorî model û parçeyê.",
      faq_data_q: "Daneên min tên jêbirin?",
      faq_data_a: "Na. Di tamîra dîmenderê, bataryayê, piştê an porta şarjê de daneên te bi gelemperî temam dimînin. Lê em berî her tamîrê backup pêşniyar dikin.",
      faq_appointment_q: "Ma randevû pêwîst e?",
      faq_appointment_a: "Pir caran na. Bi WhatsAppê kurt binivîse, em ê zû plan bikin.",
      faq_warranty_q: "Garanti heye?",
      faq_warranty_a: "Li gorî tamîr û parçeyê garanti dikare hebe. Em berî karê tamîrê hûrguliyên rast eşkere dikin.",
      faq_model_missing_q: "Heke modela min di lîsteyê de tune be?",
      faq_model_missing_a: "Dîsa jî bipirse. Pir caran em dikarin parçeyê bestellen bikin, modelê kontrol bikin an alternatîfek guncaw pêşkêş bikin.",
      faq_oem_pull_q: "OEM Pull batarya çi ye?",
      faq_oem_pull_a: "OEM Pull batarya bataryayek orîjînal a Apple ye ku ji amûrek din hatiye derxistin. Batarya têne kontrolkirin û li gorî rewşê têne rêzkirin.",
      faq_grade_a_q: "Grade A (99-100% SOH) çi wate ye?",
      faq_grade_a_a: "Grade A wateya wê ye ku rewşa bataryayê 99-100% e (SOH = State of Health) û ji aliyê teknîkî ve hema hema wekî nû ye.",
      faq_oem_better_q: "OEM Pull batarya ji bataryayên kopî çêtir in?",
      faq_oem_better_a: "Erê. OEM Pull batarya bataryayên orîjînal ên Apple ne û bi gelemperî kalîteya çêtir, nirxên bataryayê yên rasttir û temenê dirêjtir didin.",
      faq_battery_capacity_q: "Piştî guhertina bataryayê kapasîte tê nîşandan?",
      faq_battery_capacity_a: "Li gelek modelan kapasîteya bataryayê dikare hîn jî xuya bibe. Ev bi amûr û rêbaza tamîrê ve girêdayî ye.",
      faq_oem_expensive_q: "Çima OEM batarya biha ne?",
      faq_oem_expensive_a: "OEM Pull batarya ji amûrên orîjînal tên û gelek caran 99-100% rewşa bataryayê hene. Ew ji bataryayên kopî yên standard kêmpeyda û kalîteytir in.",
      faq_display_quality_q: "Hûn kîjan kalîteyên dîmenderê pêşkêş dikin?",
      faq_display_quality_a: "Aftermarket alternatîfek erzan e. Aftermarket Pro reng û ronahiyê çêtir dide. OEM / Original tê wateya dîmenderên orîjînal ên Apple an refurbished yên kalîte bilind bi kalîteya wêneyê herî baş.",
      faq_promotion_q: "Ma dîmenderên ProMotion hîn jî 120Hz piştgirî dikin?",
      faq_promotion_a: "Erê. Bi dîmenderên me yên 120Hz-compatible, refresh rate-a bilind a modelên Pro dimîne.",
      faq_lcd_oled_q: "Cudahîya LCD û OLED çi ye?",
      faq_lcd_oled_a: "OLED rengên çêtir, reşiya kûrtir, kontrasta bilindtir û bikaranîna enerjiyê ya kêmtir dide. OLED teknolojîya orîjînal a iPhoneên nû ye.",
      faq_charge_port_q: "iPhoneê min êdî şarj nabe. Divê porta şarjê were guhertin?",
      faq_charge_port_a: "Ne her dem. Pir caran paqijkirina profesyonel têr e. Porta şarjê tenê heke rastî xerab be tê guhertin.",
      faq_fast_charge_q: "Piştî tamîrê veguhestina daneyan û şarjkirina zû dixebitin?",
      faq_fast_charge_a: "Erê. Piştî guhertinê, şarjkirin û veguhestina daneyan dîsa wekî ku divê dixebitin.",
      faq_cheaper_apple_q: "Çima buhayên we ji Apple kêmtir in?",
      faq_cheaper_apple_a: "Em vebijarkên cuda yên tamîrê pêşkêş dikin û dikarin gelek amûran bi awayek aborîtir tamîr bikin, bêyî guhertina moduleyên temam.",
      faq_original_parts_q: "Hûn parçeyên orîjînal bikar tînin?",
      faq_original_parts_a: "Li gorî tamîrê em OEM Pull, Refurbished, Original OEM û parçeyên Aftermarket yên kalîte bilind pêşkêş dikin.",
      faq_quality_choice_q: "Ez dikarim di navbera astên kalîteyê de hilbijêrim?",
      faq_quality_choice_a: "Erê. Li gelek modelan dikarî di navbera kalîteyên cuda yên dîmender û bataryayê de hilbijêrî.",
      faq_buy_broken_q: "Hûn amûrên xerab jî dikirin?",
      faq_buy_broken_a: "Erê. Em gelek iPhoneên xerab dikirin. Bi model û ravekirina xeletiyê bi me re têkilî bike.",
      faq_water_damage_q: "Hûn amûrên ku ji avê zirar dîtine tamîr dikin?",
      faq_water_damage_a: "Erê. Lê serkeftina tamîrê di her rewşê de nayê garantîkirin. Pêşî teşxîs tê kirin.",
      faq_shipping_q: "Ez dikarim amûra xwe bi postê bişînim?",
      faq_shipping_a: "Erê. Li ser daxwazê em xizmeta tamîrê bi şandinê jî pêşkêş dikin.",
    },
    fr: {
      faq_sub: "Réponses sur les données, batteries, écrans, ports de charge, pièces et envoi.",
      faq_section_general: "Général",
      faq_section_battery: "Réparations de batterie",
      faq_section_display: "Réparations d'écran",
      faq_section_port: "Réparations du port de charge",
      faq_section_parts: "Prix et pièces",
      faq_section_other: "Autres",
      faq_duration_q: "Combien de temps dure une réparation ?",
      faq_duration_a: "Beaucoup de réparations prennent 30-90 minutes selon le modèle et la pièce.",
      faq_data_q: "Mes données seront-elles supprimées ?",
      faq_data_a: "Non. Pour une réparation d'écran, de batterie, de face arrière ou de port de charge, vos données restent normalement entièrement conservées. Nous recommandons tout de même une sauvegarde avant chaque réparation.",
      faq_appointment_q: "Ai-je besoin d'un rendez-vous ?",
      faq_appointment_a: "Généralement non. Envoyez un court message WhatsApp et nous planifierons rapidement.",
      faq_warranty_q: "Y a-t-il une garantie ?",
      faq_warranty_a: "Selon la réparation et la pièce, une garantie est disponible. Les détails exacts sont clarifiés avant la commande.",
      faq_model_missing_q: "Et si mon modèle n'est pas dans la liste ?",
      faq_model_missing_a: "Demandez quand même. Nous pouvons souvent commander la pièce, vérifier le modèle ou proposer une alternative adaptée.",
      faq_oem_pull_q: "Qu'est-ce qu'une batterie OEM Pull ?",
      faq_oem_pull_a: "Une batterie OEM Pull est une batterie Apple originale provenant d'un autre appareil. Les batteries sont testées et triées selon leur état.",
      faq_grade_a_q: "Que signifie Grade A (99-100% SOH) ?",
      faq_grade_a_a: "Grade A signifie que la batterie a un état de santé de 99-100% (SOH = State of Health) et qu'elle est techniquement presque neuve.",
      faq_oem_better_q: "Les batteries OEM Pull sont-elles meilleures que les batteries compatibles ?",
      faq_oem_better_a: "Oui. Les batteries OEM Pull sont des batteries Apple originales et offrent généralement une meilleure qualité, des valeurs plus précises et une durée de vie plus longue que beaucoup de batteries compatibles.",
      faq_battery_capacity_q: "La capacité de batterie s'affiche-t-elle après le remplacement ?",
      faq_battery_capacity_a: "Sur de nombreux modèles, la capacité de batterie peut continuer à s'afficher. Cela dépend de l'appareil et de la méthode de réparation.",
      faq_oem_expensive_q: "Pourquoi les batteries OEM sont-elles plus chères ?",
      faq_oem_expensive_a: "Les batteries OEM Pull proviennent d'appareils originaux et ont souvent un état de 99-100%. Elles sont nettement plus rares et de meilleure qualité que les batteries compatibles standard.",
      faq_display_quality_q: "Quelles qualités d'écran proposez-vous ?",
      faq_display_quality_a: "Aftermarket est une alternative économique. Aftermarket Pro offre de meilleures couleurs et une meilleure luminosité. OEM / Original désigne des écrans Apple originaux ou des écrans refurbished de haute qualité avec une qualité d'image maximale.",
      faq_promotion_q: "Les écrans ProMotion prennent-ils toujours en charge 120Hz ?",
      faq_promotion_a: "Oui. Avec nos écrans compatibles 120Hz, les taux de rafraîchissement élevés des modèles Pro restent disponibles.",
      faq_lcd_oled_q: "Quelle est la différence entre LCD et OLED ?",
      faq_lcd_oled_a: "OLED offre de meilleures couleurs, des noirs plus profonds, un contraste plus élevé et une consommation réduite. OLED correspond à la technologie originale des iPhones modernes.",
      faq_charge_port_q: "Mon iPhone ne charge plus. Faut-il remplacer le port de charge ?",
      faq_charge_port_a: "Pas toujours. Un nettoyage professionnel suffit souvent. Le port de charge n'est remplacé que s'il est réellement défectueux.",
      faq_fast_charge_q: "Le transfert de données et la charge rapide fonctionneront-ils après la réparation ?",
      faq_fast_charge_a: "Oui. Après le remplacement, la charge et le transfert de données fonctionnent à nouveau comme prévu.",
      faq_cheaper_apple_q: "Pourquoi vos prix sont-ils moins chers qu'Apple ?",
      faq_cheaper_apple_a: "Nous proposons plusieurs options de réparation et pouvons réparer de nombreux appareils de façon plus économique sans remplacer des modules complets.",
      faq_original_parts_q: "Utilisez-vous des pièces originales ?",
      faq_original_parts_a: "Selon la réparation, nous proposons des pièces OEM Pull, Refurbished, Original OEM et Aftermarket de haute qualité.",
      faq_quality_choice_q: "Puis-je choisir entre différents niveaux de qualité ?",
      faq_quality_choice_a: "Oui. Pour de nombreux modèles, vous pouvez choisir entre plusieurs qualités d'écran et de batterie.",
      faq_buy_broken_q: "Achetez-vous aussi des appareils défectueux ?",
      faq_buy_broken_a: "Oui. Nous achetons de nombreux iPhones défectueux. Contactez-nous avec le modèle et la description du défaut.",
      faq_water_damage_q: "Réparez-vous aussi les appareils avec dégât des eaux ?",
      faq_water_damage_a: "Oui. Toutefois, une réparation réussie ne peut pas être garantie dans tous les cas. Un diagnostic est effectué au préalable.",
      faq_shipping_q: "Puis-je envoyer mon appareil ?",
      faq_shipping_a: "Oui. Sur demande, nous proposons aussi un service de réparation par envoi.",
    },
    sl: {
      faq_sub: "Odgovori o podatkih, baterijah, zaslonih, polnilnem priključku, delih in pošiljanju.",
      faq_section_general: "Splošno",
      faq_section_battery: "Popravila baterije",
      faq_section_display: "Popravila zaslona",
      faq_section_port: "Popravila polnilnega priključka",
      faq_section_parts: "Cene in deli",
      faq_section_other: "Drugo",
      faq_duration_q: "Kako dolgo traja popravilo?",
      faq_duration_a: "Veliko popravil traja 30-90 minut, odvisno od modela in dela.",
      faq_data_q: "Ali bodo moji podatki izbrisani?",
      faq_data_a: "Ne. Pri popravilu zaslona, baterije, zadnjega dela ali polnilnega priključka tvoji podatki običajno ostanejo v celoti ohranjeni. Kljub temu pred vsakim popravilom priporočamo varnostno kopijo.",
      faq_appointment_q: "Ali potrebujem termin?",
      faq_appointment_a: "Običajno ne. Kratko piši prek WhatsApp in hitro se dogovorimo.",
      faq_warranty_q: "Ali obstaja garancija?",
      faq_warranty_a: "Odvisno od popravila in nadomestnega dela je garancija možna. Natančne podrobnosti pojasnimo pred naročilom.",
      faq_model_missing_q: "Kaj če mojega modela ni na seznamu?",
      faq_model_missing_a: "Vseeno vprašaj. Pogosto lahko del naročimo, preverimo model ali ponudimo primerno alternativo.",
      faq_oem_pull_q: "Kaj je OEM Pull baterija?",
      faq_oem_pull_a: "OEM Pull baterija je originalna Apple baterija, vzeta iz druge naprave. Baterije se preverijo in razvrstijo po stanju.",
      faq_grade_a_q: "Kaj pomeni Grade A (99-100% SOH)?",
      faq_grade_a_a: "Grade A pomeni, da ima baterija stanje 99-100% (SOH = State of Health) in je tehnično skoraj kot nova.",
      faq_oem_better_q: "So OEM Pull baterije boljše od nadomestnih?",
      faq_oem_better_a: "Da. OEM Pull baterije so originalne Apple baterije in običajno ponujajo boljšo kakovost, natančnejše vrednosti baterije in daljšo življenjsko dobo kot veliko nadomestnih baterij.",
      faq_battery_capacity_q: "Ali bo po menjavi prikazana kapaciteta baterije?",
      faq_battery_capacity_a: "Pri številnih modelih se kapaciteta baterije lahko še naprej prikazuje. To je odvisno od naprave in metode popravila.",
      faq_oem_expensive_q: "Zakaj so OEM baterije dražje?",
      faq_oem_expensive_a: "OEM Pull baterije prihajajo iz originalnih naprav in imajo pogosto stanje 99-100%. So bistveno redkejše in kakovostnejše od standardnih nadomestnih baterij.",
      faq_display_quality_q: "Katere kakovosti zaslonov ponujate?",
      faq_display_quality_a: "Aftermarket je ugodna alternativa za cenovno občutljive stranke. Aftermarket Pro ponuja boljše barve in svetlost. OEM / Original pomeni originalne Apple zaslone ali kakovostne refurbished zaslone z največjo kakovostjo slike.",
      faq_promotion_q: "Ali ProMotion zasloni še naprej podpirajo 120Hz?",
      faq_promotion_a: "Da. Pri naših 120Hz-združljivih zaslonih visoke frekvence osveževanja Pro modelov ostanejo na voljo.",
      faq_lcd_oled_q: "Kakšna je razlika med LCD in OLED?",
      faq_lcd_oled_a: "OLED ponuja boljše barve, globljo črnino, višji kontrast in manjšo porabo energije. OLED ustreza originalni tehnologiji sodobnih iPhonov.",
      faq_charge_port_q: "Moj iPhone se ne polni več. Ali je treba zamenjati priključek?",
      faq_charge_port_a: "Ne vedno. Pogosto zadostuje profesionalno čiščenje. Polnilni priključek se zamenja šele, ko je dejansko okvarjen.",
      faq_fast_charge_q: "Ali bosta prenos podatkov in hitro polnjenje delovala po popravilu?",
      faq_fast_charge_a: "Da. Po zamenjavi polnjenje in prenos podatkov znova delujeta kot predvideno.",
      faq_cheaper_apple_q: "Zakaj so vaše cene nižje kot pri Apple?",
      faq_cheaper_apple_a: "Ponujamo različne možnosti popravila in lahko številne naprave popravimo ugodneje, brez menjave celotnih sklopov.",
      faq_original_parts_q: "Ali uporabljate originalne dele?",
      faq_original_parts_a: "Odvisno od popravila ponujamo OEM Pull, Refurbished, Original OEM in kakovostne Aftermarket nadomestne dele.",
      faq_quality_choice_q: "Ali lahko izbiram med različnimi ravnmi kakovosti?",
      faq_quality_choice_a: "Da. Pri številnih modelih lahko izbereš različne kakovosti zaslona in baterije.",
      faq_buy_broken_q: "Ali kupujete tudi okvarjene naprave?",
      faq_buy_broken_a: "Da. Kupujemo veliko okvarjenih iPhonov. Kontaktiraj nas z modelom in opisom napake.",
      faq_water_damage_q: "Ali popravljate tudi naprave s poškodbo zaradi vode?",
      faq_water_damage_a: "Da. Uspešnega popravila pa ni mogoče zagotoviti v vsakem primeru. Najprej se opravi diagnostika.",
      faq_shipping_q: "Ali lahko napravo pošljem?",
      faq_shipping_a: "Da. Na zahtevo ponujamo tudi servis popravila po pošti.",
    },
  };

  const THEME_I18N = {
    de: {
      theme_switch_to_light: "Zum hellen Theme wechseln",
      theme_switch_to_dark: "Zum dunklen Theme wechseln",
    },
    uk: {
      theme_switch_to_light: "Увімкнути світлу тему",
      theme_switch_to_dark: "Увімкнути темну тему",
    },
    en: {
      theme_switch_to_light: "Switch to light theme",
      theme_switch_to_dark: "Switch to dark theme",
    },
    ru: {
      theme_switch_to_light: "Включить светлую тему",
      theme_switch_to_dark: "Включить темную тему",
    },
    pl: {
      theme_switch_to_light: "Przełącz na jasny motyw",
      theme_switch_to_dark: "Przełącz na ciemny motyw",
    },
    it: {
      theme_switch_to_light: "Passa al tema chiaro",
      theme_switch_to_dark: "Passa al tema scuro",
    },
    ar: {
      theme_switch_to_light: "التبديل إلى الوضع الفاتح",
      theme_switch_to_dark: "التبديل إلى الوضع الداكن",
    },
    ku: {
      theme_switch_to_light: "Derbasî tema ronahî bibe",
      theme_switch_to_dark: "Derbasî tema tarî bibe",
    },
    fr: {
      theme_switch_to_light: "Passer au thème clair",
      theme_switch_to_dark: "Passer au thème sombre",
    },
    sl: {
      theme_switch_to_light: "Preklopi na svetlo temo",
      theme_switch_to_dark: "Preklopi na temno temo",
    },
  };

  const SAMSUNG_I18N = {
    de: {
      samsung_config_title: "Reparatur konfigurieren",
      samsung_step_series: "Schritt 1", samsung_series_title: "Serie wählen", samsung_series_hint: "Wähle zuerst die Galaxy-Serie. Handy ist bereits vorausgewählt.",
      samsung_step_model: "Schritt 2", samsung_model_title: "Modell wählen", samsung_model_search_label: "Modell suchen", samsung_model_search_placeholder: "Modell suchen",
      samsung_no_models: "Kein Modell gefunden. Schreib uns kurz per WhatsApp.",
      samsung_step_repair: "Schritt 3", samsung_repair_title: "Schadensart wählen", samsung_repair_hint: "Wenn du unsicher bist, wähle Diagnose oder Unbekannt.",
      samsung_other_title: "Andere Geräte", samsung_other_hint: "Für Tablet, Watch und Laptop bitte Problem kurz beschreiben, damit wir den Preis ermitteln können.",
      samsung_device_phone: "Handy", samsung_device_tablet: "Tablet", samsung_device_watch: "Watch", samsung_device_laptop: "Laptop",
      samsung_summary_title: "Reparaturübersicht", samsung_summary_device: "Gerät", samsung_summary_series: "Serie", samsung_summary_model: "Modell", samsung_summary_damage: "Schaden",
      samsung_summary_price_label: "Reparaturpreis", samsung_summary_note: "Preise sind Richtwerte. Verfügbarkeit und Endpreis bestätigen wir per WhatsApp.", samsung_summary_cta: "Jetzt per WhatsApp anfragen",
      samsung_price_ask: "Einfach fragen", samsung_other_summary_note: "Bitte Modell und Problem kurz beschreiben, damit wir den Preis ermitteln können.", samsung_none: "Noch nicht gewählt",
      samsung_repair_display: "Display", samsung_repair_battery: "Akku", samsung_repair_port: "Ladebuchse", samsung_repair_backglass: "Rückseite", samsung_repair_camera: "Kamera", samsung_repair_water: "Wasserschaden", samsung_repair_unknown: "Unbekannt / Diagnose",
    },
    uk: {
      samsung_config_title: "Налаштувати ремонт",
      samsung_step_series: "Крок 1", samsung_series_title: "Оберіть серію", samsung_series_hint: "Спочатку оберіть серію Galaxy. Смартфон уже вибраний.",
      samsung_step_model: "Крок 2", samsung_model_title: "Оберіть модель", samsung_model_search_label: "Пошук моделі", samsung_model_search_placeholder: "Пошук моделі",
      samsung_no_models: "Модель не знайдено. Напишіть нам у WhatsApp.",
      samsung_step_repair: "Крок 3", samsung_repair_title: "Оберіть тип поломки", samsung_repair_hint: "Якщо не впевнені, оберіть діагностику або невідомо.",
      samsung_other_title: "Інші пристрої", samsung_other_hint: "Для Tablet, Watch і Laptop коротко опишіть проблему, щоб ми могли визначити ціну.",
      samsung_device_phone: "Смартфон", samsung_device_tablet: "Tablet", samsung_device_watch: "Watch", samsung_device_laptop: "Laptop",
      samsung_summary_title: "Огляд ремонту", samsung_summary_device: "Пристрій", samsung_summary_series: "Серія", samsung_summary_model: "Модель", samsung_summary_damage: "Поломка",
      samsung_summary_price_label: "Ціна ремонту", samsung_summary_note: "Ціни орієнтовні. Наявність і фінальну ціну підтвердимо у WhatsApp.", samsung_summary_cta: "Запитати у WhatsApp",
      samsung_price_ask: "Просто запитати", samsung_other_summary_note: "Опишіть модель і проблему, щоб ми могли визначити ціну.", samsung_none: "Ще не вибрано",
      samsung_repair_display: "Дисплей", samsung_repair_battery: "Акумулятор", samsung_repair_port: "Роз'єм зарядки", samsung_repair_backglass: "Задня кришка", samsung_repair_camera: "Камера", samsung_repair_water: "Пошкодження водою", samsung_repair_unknown: "Невідомо / діагностика",
    },
    en: {
      samsung_config_title: "Configure repair",
      samsung_step_series: "Step 1", samsung_series_title: "Choose series", samsung_series_hint: "Choose the Galaxy series first. Phone is already selected.",
      samsung_step_model: "Step 2", samsung_model_title: "Choose model", samsung_model_search_label: "Search model", samsung_model_search_placeholder: "Search model",
      samsung_no_models: "No model found. Send us a quick WhatsApp message.",
      samsung_step_repair: "Step 3", samsung_repair_title: "Choose damage", samsung_repair_hint: "If you are unsure, choose diagnosis or unknown.",
      samsung_other_title: "Other devices", samsung_other_hint: "For tablet, watch and laptop, briefly describe the issue so we can calculate the price.",
      samsung_device_phone: "Phone", samsung_device_tablet: "Tablet", samsung_device_watch: "Watch", samsung_device_laptop: "Laptop",
      samsung_summary_title: "Repair overview", samsung_summary_device: "Device", samsung_summary_series: "Series", samsung_summary_model: "Model", samsung_summary_damage: "Damage",
      samsung_summary_price_label: "Repair price", samsung_summary_note: "Prices are estimates. Availability and final price are confirmed on WhatsApp.", samsung_summary_cta: "Ask via WhatsApp",
      samsung_price_ask: "Simply ask", samsung_other_summary_note: "Please describe model and issue so we can calculate the price.", samsung_none: "Not selected yet",
      samsung_repair_display: "Display", samsung_repair_battery: "Battery", samsung_repair_port: "Charging port", samsung_repair_backglass: "Back cover", samsung_repair_camera: "Camera", samsung_repair_water: "Water damage", samsung_repair_unknown: "Unknown / diagnosis",
    },
    ru: {
      samsung_config_title: "Настроить ремонт",
      samsung_step_series: "Шаг 1", samsung_series_title: "Выберите серию", samsung_series_hint: "Сначала выберите серию Galaxy. Смартфон уже выбран.",
      samsung_step_model: "Шаг 2", samsung_model_title: "Выберите модель", samsung_model_search_label: "Поиск модели", samsung_model_search_placeholder: "Поиск модели",
      samsung_no_models: "Модель не найдена. Напишите нам в WhatsApp.",
      samsung_step_repair: "Шаг 3", samsung_repair_title: "Выберите поломку", samsung_repair_hint: "Если не уверены, выберите диагностику или неизвестно.",
      samsung_other_title: "Другие устройства", samsung_other_hint: "Для Tablet, Watch и Laptop кратко опишите проблему, чтобы мы рассчитали цену.",
      samsung_device_phone: "Смартфон", samsung_device_tablet: "Tablet", samsung_device_watch: "Watch", samsung_device_laptop: "Laptop",
      samsung_summary_title: "Обзор ремонта", samsung_summary_device: "Устройство", samsung_summary_series: "Серия", samsung_summary_model: "Модель", samsung_summary_damage: "Поломка",
      samsung_summary_price_label: "Цена ремонта", samsung_summary_note: "Цены ориентировочные. Наличие и финальную цену подтвердим в WhatsApp.", samsung_summary_cta: "Спросить в WhatsApp",
      samsung_price_ask: "Просто спросить", samsung_other_summary_note: "Опишите модель и проблему, чтобы мы рассчитали цену.", samsung_none: "Еще не выбрано",
      samsung_repair_display: "Дисплей", samsung_repair_battery: "Аккумулятор", samsung_repair_port: "Разъем зарядки", samsung_repair_backglass: "Задняя крышка", samsung_repair_camera: "Камера", samsung_repair_water: "Попадание воды", samsung_repair_unknown: "Неизвестно / диагностика",
    },
    pl: {
      samsung_config_title: "Skonfiguruj naprawę",
      samsung_step_series: "Krok 1", samsung_series_title: "Wybierz serię", samsung_series_hint: "Najpierw wybierz serię Galaxy. Telefon jest już wybrany.",
      samsung_step_model: "Krok 2", samsung_model_title: "Wybierz model", samsung_model_search_label: "Szukaj modelu", samsung_model_search_placeholder: "Szukaj modelu",
      samsung_no_models: "Nie znaleziono modelu. Napisz do nas na WhatsApp.",
      samsung_step_repair: "Krok 3", samsung_repair_title: "Wybierz uszkodzenie", samsung_repair_hint: "Jeśli nie masz pewności, wybierz diagnostykę lub nieznane.",
      samsung_other_title: "Inne urządzenia", samsung_other_hint: "Dla tabletu, zegarka i laptopa opisz krótko problem, abyśmy mogli ustalić cenę.",
      samsung_device_phone: "Telefon", samsung_device_tablet: "Tablet", samsung_device_watch: "Watch", samsung_device_laptop: "Laptop",
      samsung_summary_title: "Podsumowanie naprawy", samsung_summary_device: "Urządzenie", samsung_summary_series: "Seria", samsung_summary_model: "Model", samsung_summary_damage: "Uszkodzenie",
      samsung_summary_price_label: "Cena naprawy", samsung_summary_note: "Ceny są orientacyjne. Dostępność i cenę końcową potwierdzimy przez WhatsApp.", samsung_summary_cta: "Zapytaj przez WhatsApp",
      samsung_price_ask: "Po prostu zapytaj", samsung_other_summary_note: "Opisz model i problem, abyśmy mogli ustalić cenę.", samsung_none: "Jeszcze nie wybrano",
      samsung_repair_display: "Wyświetlacz", samsung_repair_battery: "Bateria", samsung_repair_port: "Gniazdo ładowania", samsung_repair_backglass: "Tylna obudowa", samsung_repair_camera: "Kamera", samsung_repair_water: "Zalanie", samsung_repair_unknown: "Nieznane / diagnostyka",
    },
    it: {
      samsung_config_title: "Configura riparazione",
      samsung_step_series: "Passo 1", samsung_series_title: "Scegli la serie", samsung_series_hint: "Scegli prima la serie Galaxy. Il telefono è già selezionato.",
      samsung_step_model: "Passo 2", samsung_model_title: "Scegli il modello", samsung_model_search_label: "Cerca modello", samsung_model_search_placeholder: "Cerca modello",
      samsung_no_models: "Nessun modello trovato. Scrivici su WhatsApp.",
      samsung_step_repair: "Passo 3", samsung_repair_title: "Scegli il danno", samsung_repair_hint: "Se non sei sicuro, scegli diagnosi o sconosciuto.",
      samsung_other_title: "Altri dispositivi", samsung_other_hint: "Per tablet, watch e laptop descrivi brevemente il problema, così calcoliamo il prezzo.",
      samsung_device_phone: "Telefono", samsung_device_tablet: "Tablet", samsung_device_watch: "Watch", samsung_device_laptop: "Laptop",
      samsung_summary_title: "Riepilogo riparazione", samsung_summary_device: "Dispositivo", samsung_summary_series: "Serie", samsung_summary_model: "Modello", samsung_summary_damage: "Danno",
      samsung_summary_price_label: "Prezzo riparazione", samsung_summary_note: "I prezzi sono indicativi. Disponibilità e prezzo finale vengono confermati su WhatsApp.", samsung_summary_cta: "Chiedi su WhatsApp",
      samsung_price_ask: "Chiedi semplicemente", samsung_other_summary_note: "Descrivi modello e problema, così calcoliamo il prezzo.", samsung_none: "Non ancora selezionato",
      samsung_repair_display: "Display", samsung_repair_battery: "Batteria", samsung_repair_port: "Porta di ricarica", samsung_repair_backglass: "Retro", samsung_repair_camera: "Fotocamera", samsung_repair_water: "Danno da acqua", samsung_repair_unknown: "Sconosciuto / diagnosi",
    },
    ar: {
      samsung_config_title: "إعداد الإصلاح",
      samsung_step_series: "الخطوة 1", samsung_series_title: "اختر السلسلة", samsung_series_hint: "اختر سلسلة Galaxy أولاً. الهاتف محدد مسبقاً.",
      samsung_step_model: "الخطوة 2", samsung_model_title: "اختر الموديل", samsung_model_search_label: "بحث عن موديل", samsung_model_search_placeholder: "بحث عن موديل",
      samsung_no_models: "لم يتم العثور على موديل. راسلنا عبر واتساب.",
      samsung_step_repair: "الخطوة 3", samsung_repair_title: "اختر نوع العطل", samsung_repair_hint: "إذا لم تكن متأكداً، اختر التشخيص أو غير معروف.",
      samsung_other_title: "أجهزة أخرى", samsung_other_hint: "للتابلت والساعة واللابتوب، اشرح المشكلة باختصار كي نحدد السعر.",
      samsung_device_phone: "هاتف", samsung_device_tablet: "تابلت", samsung_device_watch: "ساعة", samsung_device_laptop: "لابتوب",
      samsung_summary_title: "ملخص الإصلاح", samsung_summary_device: "الجهاز", samsung_summary_series: "السلسلة", samsung_summary_model: "الموديل", samsung_summary_damage: "العطل",
      samsung_summary_price_label: "سعر الإصلاح", samsung_summary_note: "الأسعار تقديرية. نؤكد التوفر والسعر النهائي عبر واتساب.", samsung_summary_cta: "اسأل عبر واتساب",
      samsung_price_ask: "اسأل ببساطة", samsung_other_summary_note: "يرجى وصف الموديل والمشكلة كي نحدد السعر.", samsung_none: "لم يتم الاختيار بعد",
      samsung_repair_display: "الشاشة", samsung_repair_battery: "البطارية", samsung_repair_port: "منفذ الشحن", samsung_repair_backglass: "الغطاء الخلفي", samsung_repair_camera: "الكاميرا", samsung_repair_water: "ضرر الماء", samsung_repair_unknown: "غير معروف / تشخيص",
    },
    ku: {
      samsung_config_title: "Çakkirinê saz bike",
      samsung_step_series: "Gav 1", samsung_series_title: "Seriyê hilbijêre", samsung_series_hint: "Pêşî seriya Galaxy hilbijêre. Telefon jixwe hilbijartî ye.",
      samsung_step_model: "Gav 2", samsung_model_title: "Modelê hilbijêre", samsung_model_search_label: "Modelê bigere", samsung_model_search_placeholder: "Modelê bigere",
      samsung_no_models: "Model nehat dîtin. Li WhatsAppê ji me re binivîse.",
      samsung_step_repair: "Gav 3", samsung_repair_title: "Cureyê zirarê hilbijêre", samsung_repair_hint: "Ger ne bawer î, teşhîs an nenas hilbijêre.",
      samsung_other_title: "Cîhazên din", samsung_other_hint: "Ji bo tablet, watch û laptop pirsgirêkê kurt rave bike, da ku em bihayê diyar bikin.",
      samsung_device_phone: "Telefon", samsung_device_tablet: "Tablet", samsung_device_watch: "Watch", samsung_device_laptop: "Laptop",
      samsung_summary_title: "Kurteya çakkirinê", samsung_summary_device: "Cîhaz", samsung_summary_series: "Serî", samsung_summary_model: "Model", samsung_summary_damage: "Zirar",
      samsung_summary_price_label: "Bihayê çakkirinê", samsung_summary_note: "Biha texmînî ne. Amadeyî û bihayê dawî li WhatsAppê piştrast dikin.", samsung_summary_cta: "Li WhatsAppê bipirse",
      samsung_price_ask: "Tenê bipirse", samsung_other_summary_note: "Model û pirsgirêkê rave bike, da ku em bihayê diyar bikin.", samsung_none: "Hîn nehatiye hilbijartin",
      samsung_repair_display: "Display", samsung_repair_battery: "Battery", samsung_repair_port: "Porta şarjê", samsung_repair_backglass: "Pişt", samsung_repair_camera: "Kamera", samsung_repair_water: "Zirara avê", samsung_repair_unknown: "Nenas / teşhîs",
    },
    fr: {
      samsung_config_title: "Configurer la réparation",
      samsung_step_series: "Étape 1", samsung_series_title: "Choisir la série", samsung_series_hint: "Choisis d'abord la série Galaxy. Téléphone est déjà sélectionné.",
      samsung_step_model: "Étape 2", samsung_model_title: "Choisir le modèle", samsung_model_search_label: "Rechercher un modèle", samsung_model_search_placeholder: "Rechercher un modèle",
      samsung_no_models: "Aucun modèle trouvé. Écris-nous sur WhatsApp.",
      samsung_step_repair: "Étape 3", samsung_repair_title: "Choisir le problème", samsung_repair_hint: "Si tu n'es pas sûr, choisis diagnostic ou inconnu.",
      samsung_other_title: "Autres appareils", samsung_other_hint: "Pour tablette, watch et ordinateur portable, décris brièvement le problème afin que nous puissions estimer le prix.",
      samsung_device_phone: "Téléphone", samsung_device_tablet: "Tablette", samsung_device_watch: "Watch", samsung_device_laptop: "Ordinateur",
      samsung_summary_title: "Résumé réparation", samsung_summary_device: "Appareil", samsung_summary_series: "Série", samsung_summary_model: "Modèle", samsung_summary_damage: "Problème",
      samsung_summary_price_label: "Prix réparation", samsung_summary_note: "Les prix sont indicatifs. Disponibilité et prix final sont confirmés sur WhatsApp.", samsung_summary_cta: "Demander sur WhatsApp",
      samsung_price_ask: "Demander simplement", samsung_other_summary_note: "Décris le modèle et le problème afin que nous puissions estimer le prix.", samsung_none: "Pas encore choisi",
      samsung_repair_display: "Écran", samsung_repair_battery: "Batterie", samsung_repair_port: "Port de charge", samsung_repair_backglass: "Dos", samsung_repair_camera: "Caméra", samsung_repair_water: "Dégât des eaux", samsung_repair_unknown: "Inconnu / diagnostic",
    },
    sl: {
      samsung_config_title: "Konfiguriraj popravilo",
      samsung_step_series: "Korak 1", samsung_series_title: "Izberi serijo", samsung_series_hint: "Najprej izberi serijo Galaxy. Telefon je že izbran.",
      samsung_step_model: "Korak 2", samsung_model_title: "Izberi model", samsung_model_search_label: "Išči model", samsung_model_search_placeholder: "Išči model",
      samsung_no_models: "Model ni najden. Piši nam na WhatsApp.",
      samsung_step_repair: "Korak 3", samsung_repair_title: "Izberi okvaro", samsung_repair_hint: "Če nisi prepričan, izberi diagnostiko ali neznano.",
      samsung_other_title: "Druge naprave", samsung_other_hint: "Za tablet, watch in laptop na kratko opiši težavo, da lahko določimo ceno.",
      samsung_device_phone: "Telefon", samsung_device_tablet: "Tablet", samsung_device_watch: "Watch", samsung_device_laptop: "Laptop",
      samsung_summary_title: "Pregled popravila", samsung_summary_device: "Naprava", samsung_summary_series: "Serija", samsung_summary_model: "Model", samsung_summary_damage: "Okvara",
      samsung_summary_price_label: "Cena popravila", samsung_summary_note: "Cene so okvirne. Dobavljivost in končno ceno potrdimo prek WhatsAppa.", samsung_summary_cta: "Vprašaj prek WhatsAppa",
      samsung_price_ask: "Preprosto vprašaj", samsung_other_summary_note: "Opiši model in težavo, da lahko določimo ceno.", samsung_none: "Še ni izbrano",
      samsung_repair_display: "Zaslon", samsung_repair_battery: "Baterija", samsung_repair_port: "Polnilni priključek", samsung_repair_backglass: "Zadnja stran", samsung_repair_camera: "Kamera", samsung_repair_water: "Poškodba zaradi vode", samsung_repair_unknown: "Neznano / diagnostika",
    },
  };

  const SAMSUNG_MODAL_I18N = {
    de: { samsung_series_hint: "Waehle zuerst die Galaxy-Serie. Danach fuehren wir dich Schritt fuer Schritt weiter.", samsung_back: "Zurueck", samsung_next: "Weiter", samsung_close: "Schliessen" },
    uk: { samsung_series_hint: "Спочатку оберіть серію Galaxy. Далі ми проведемо вас крок за кроком.", samsung_back: "Назад", samsung_next: "Далі", samsung_close: "Закрити" },
    en: { samsung_series_hint: "Choose the Galaxy series first. Then we guide you step by step.", samsung_back: "Back", samsung_next: "Next", samsung_close: "Close" },
    ru: { samsung_series_hint: "Сначала выберите серию Galaxy. Затем мы проведем вас шаг за шагом.", samsung_back: "Назад", samsung_next: "Далее", samsung_close: "Закрыть" },
    pl: { samsung_series_hint: "Najpierw wybierz serię Galaxy. Potem poprowadzimy Cię krok po kroku.", samsung_back: "Wstecz", samsung_next: "Dalej", samsung_close: "Zamknij" },
    it: { samsung_series_hint: "Scegli prima la serie Galaxy. Poi ti guidiamo passo dopo passo.", samsung_back: "Indietro", samsung_next: "Avanti", samsung_close: "Chiudi" },
    ar: { samsung_series_hint: "اختر سلسلة Galaxy أولاً. بعدها نرشدك خطوة بخطوة.", samsung_back: "رجوع", samsung_next: "التالي", samsung_close: "إغلاق" },
    ku: { samsung_series_hint: "Pêşî seriya Galaxy hilbijêre. Paşê em te gav bi gav rêber dikin.", samsung_back: "Paşve", samsung_next: "Pêşve", samsung_close: "Bigire" },
    fr: { samsung_series_hint: "Choisis d'abord la série Galaxy. Ensuite nous te guidons étape par étape.", samsung_back: "Retour", samsung_next: "Suivant", samsung_close: "Fermer" },
    sl: { samsung_series_hint: "Najprej izberi serijo Galaxy. Nato te vodimo korak za korakom.", samsung_back: "Nazaj", samsung_next: "Naprej", samsung_close: "Zapri" },
  };

  const PRICE_REMINDER_I18N = {
    de: { price_reminder_kicker: "Smart Preischeck", price_reminder_title: "Preis sofort prüfen", price_reminder_text: "Modell wählen und direkt anfragen", price_reminder_close: "Preishinweis schliessen" },
    uk: { price_reminder_kicker: "Розумна перевірка ціни", price_reminder_title: "Перевірити ціну зараз", price_reminder_text: "Оберіть модель і одразу надішліть запит", price_reminder_close: "Закрити підказку з цінами" },
    en: { price_reminder_kicker: "Smart price check", price_reminder_title: "Check the price now", price_reminder_text: "Choose a model and request directly", price_reminder_close: "Close price reminder" },
    ru: { price_reminder_kicker: "Умная проверка цены", price_reminder_title: "Проверить цену сейчас", price_reminder_text: "Выберите модель и сразу отправьте запрос", price_reminder_close: "Закрыть подсказку с ценами" },
    pl: { price_reminder_kicker: "Szybka wycena", price_reminder_title: "Sprawdź cenę teraz", price_reminder_text: "Wybierz model i od razu wyślij zapytanie", price_reminder_close: "Zamknij przypomnienie o cenach" },
    it: { price_reminder_kicker: "Controllo prezzo smart", price_reminder_title: "Controlla subito il prezzo", price_reminder_text: "Scegli il modello e invia la richiesta", price_reminder_close: "Chiudi il promemoria prezzi" },
    ar: { price_reminder_kicker: "فحص سعر ذكي", price_reminder_title: "تحقق من السعر الآن", price_reminder_text: "اختر الموديل وأرسل الطلب مباشرة", price_reminder_close: "إغلاق تذكير الأسعار" },
    ku: { price_reminder_kicker: "Kontrola bihayê zîrek", price_reminder_title: "Niha bihayê kontrol bike", price_reminder_text: "Modelê hilbijêre û daxwazê rasterast bişîne", price_reminder_close: "Bîranîna bihayan bigire" },
    fr: { price_reminder_kicker: "Check prix intelligent", price_reminder_title: "Vérifier le prix maintenant", price_reminder_text: "Choisis le modèle et envoie la demande", price_reminder_close: "Fermer le rappel des prix" },
    sl: { price_reminder_kicker: "Pametno preverjanje cene", price_reminder_title: "Preveri ceno zdaj", price_reminder_text: "Izberi model in takoj pošlji povpraševanje", price_reminder_close: "Zapri opomnik za cene" },
  };

  const COOKIE_I18N = {
    de: {
      cookie_consent_label: "Analytics-Einstellungen",
      cookie_consent_title: "Analytics nur mit Zustimmung",
      cookie_consent_text: "Wir nutzen Google Analytics, um Klicks auf Preise, Anruf und WhatsApp zu verstehen. Ohne Zustimmung bleibt Analytics deaktiviert.",
      cookie_consent_accept: "Zustimmen",
      cookie_consent_decline: "Ablehnen",
      cookie_consent_privacy: "Datenschutz",
    },
    uk: {
      cookie_consent_label: "Налаштування аналітики",
      cookie_consent_title: "Аналітика тільки за згодою",
      cookie_consent_text: "Ми використовуємо Google Analytics, щоб розуміти кліки на ціни, дзвінок і WhatsApp. Без згоди аналітика вимкнена.",
      cookie_consent_accept: "Погодитись",
      cookie_consent_decline: "Відхилити",
      cookie_consent_privacy: "Захист даних",
    },
    en: {
      cookie_consent_label: "Analytics settings",
      cookie_consent_title: "Analytics only with consent",
      cookie_consent_text: "We use Google Analytics to understand clicks on prices, calls and WhatsApp. Without consent, analytics stays disabled.",
      cookie_consent_accept: "Accept",
      cookie_consent_decline: "Decline",
      cookie_consent_privacy: "Privacy",
    },
    ru: {
      cookie_consent_label: "Настройки аналитики",
      cookie_consent_title: "Аналитика только с согласием",
      cookie_consent_text: "Мы используем Google Analytics, чтобы понимать клики по ценам, звонкам и WhatsApp. Без согласия аналитика отключена.",
      cookie_consent_accept: "Согласиться",
      cookie_consent_decline: "Отклонить",
      cookie_consent_privacy: "Защита данных",
    },
    pl: {
      cookie_consent_label: "Ustawienia analityki",
      cookie_consent_title: "Analityka tylko za zgodą",
      cookie_consent_text: "Używamy Google Analytics, aby rozumieć kliknięcia w ceny, połączenia i WhatsApp. Bez zgody analityka pozostaje wyłączona.",
      cookie_consent_accept: "Akceptuję",
      cookie_consent_decline: "Odrzuć",
      cookie_consent_privacy: "Prywatność",
    },
    it: {
      cookie_consent_label: "Impostazioni analytics",
      cookie_consent_title: "Analytics solo con consenso",
      cookie_consent_text: "Usiamo Google Analytics per capire i clic su prezzi, chiamate e WhatsApp. Senza consenso, analytics resta disattivato.",
      cookie_consent_accept: "Accetta",
      cookie_consent_decline: "Rifiuta",
      cookie_consent_privacy: "Privacy",
    },
    ar: {
      cookie_consent_label: "إعدادات التحليلات",
      cookie_consent_title: "التحليلات فقط بالموافقة",
      cookie_consent_text: "نستخدم Google Analytics لفهم النقرات على الأسعار والاتصال وWhatsApp. بدون موافقة تبقى التحليلات معطلة.",
      cookie_consent_accept: "موافقة",
      cookie_consent_decline: "رفض",
      cookie_consent_privacy: "حماية البيانات",
    },
    ku: {
      cookie_consent_label: "Mîhengên analytics",
      cookie_consent_title: "Analytics tenê bi erêkirinê",
      cookie_consent_text: "Em Google Analytics bikar tînin da ku klikên ser biha, bang û WhatsApp fam bikin. Bê erêkirin analytics girtî dimîne.",
      cookie_consent_accept: "Erê bike",
      cookie_consent_decline: "Red bike",
      cookie_consent_privacy: "Parastina daneyan",
    },
    fr: {
      cookie_consent_label: "Paramètres analytics",
      cookie_consent_title: "Analytics uniquement avec consentement",
      cookie_consent_text: "Nous utilisons Google Analytics pour comprendre les clics sur les prix, les appels et WhatsApp. Sans consentement, analytics reste désactivé.",
      cookie_consent_accept: "Accepter",
      cookie_consent_decline: "Refuser",
      cookie_consent_privacy: "Confidentialité",
    },
    sl: {
      cookie_consent_label: "Nastavitve analitike",
      cookie_consent_title: "Analitika samo s soglasjem",
      cookie_consent_text: "Google Analytics uporabljamo za razumevanje klikov na cene, klice in WhatsApp. Brez soglasja analitika ostane izklopljena.",
      cookie_consent_accept: "Sprejmi",
      cookie_consent_decline: "Zavrni",
      cookie_consent_privacy: "Zasebnost",
    },
  };

  const SHIPPING_I18N = {
    de: {
      nav_shipping: "Versand",
      footer_shipping_terms: "Versandbedingungen",
      mb_shipping_flow: "Ablauf",
      price_mode_local: "In Singen",
      price_mode_shipping: "Per Versand",
      price_mode_local_note: "Lokale Übergabe, Abholung oder mobiler Termin nach WhatsApp-Check.",
      price_mode_shipping_note: "Bei Versand bekommst du zuerst Versandhinweise. Keine Reparatur ohne Freigabe.",
      price_mode_shipping_cta: "Versand per WhatsApp anfragen",
      shipping_kicker: "Deutschlandweiter Versand",
      shipping_h1: "Handy einschicken. Erst prüfen. Dann entscheiden.",
      shipping_lead: "Du kannst dein Smartphone aus ganz Deutschland einsenden. Die Reparatur startet erst, wenn Diagnose, Reparaturoption und finaler Preis von dir freigegeben sind.",
      shipping_hero_cta: "Versand per WhatsApp starten",
      shipping_hero_secondary: "Ablauf ansehen",
      shipping_trust_no_auto: "Keine Reparatur ohne Freigabe",
      shipping_trust_final_price: "Finaler Preis vor Start",
      shipping_trust_tracking: "Rückversand mit Sendungsnummer",
      shipping_logistics_pack: "Gepolstert verpacken",
      shipping_logistics_send: "Verfolgbar senden",
      shipping_logistics_return: "Rückversand",
      shipping_logistics_station: "Packstation nach Absprache",
      shipping_status_title: "WhatsApp Status",
      shipping_status_text: "Diagnose erhalten - Freigabe offen",
      shipping_entry_title: "Wähle den passenden Weg",
      shipping_entry_text: "Lokal in Singen bleibt möglich. Versand ist der einfache Weg, wenn du weiter weg wohnst.",
      shipping_entry_local_title: "Vor Ort in Singen",
      shipping_entry_local_text: "Für schnelle Übergabe oder Reparatur nach kurzer Absprache.",
      shipping_entry_pickup_title: "Abholung in Singen",
      shipping_entry_pickup_text: "Wenn es zeitlich passt, kann eine Abholung innerhalb Singen vereinbart werden.",
      shipping_entry_shipping_title: "Versand aus ganz Deutschland",
      shipping_entry_shipping_text: "Du bekommst Versandhinweise per WhatsApp und entscheidest nach der Diagnose.",
      shipping_flow_title: "So läuft Versand-Reparatur ab",
      shipping_flow_text: "Erst prüfen. Dann entscheiden. Dann reparieren.",
      shipping_step_1_title: "WhatsApp Anfrage",
      shipping_step_1_text: "Schick Modell, Schaden, Ort und gern Fotos. Danach bekommst du die nächsten Schritte.",
      shipping_step_2_title: "Versandhinweise erhalten",
      shipping_step_2_text: "Die Einsendeadresse wird nicht öffentlich angezeigt, sondern nach Kontakt und Klärung geschickt.",
      shipping_step_3_title: "Diagnose & Freigabe",
      shipping_step_3_text: "Du bekommst Diagnose, Reparaturoption und finalen Preis. Ohne Freigabe wird nicht repariert.",
      shipping_step_4_title: "Reparatur & Rückversand",
      shipping_step_4_text: "Nach Freigabe wird repariert, getestet und mit Sendungsnummer zurückgeschickt.",
      shipping_approval_badge: "Wichtig für dein Vertrauen",
      shipping_approval_title: "Das Einsenden bedeutet noch keine automatische Reparatur.",
      shipping_approval_text: "Du entscheidest nach der Diagnose. Wenn eine Reparatur nicht sinnvoll ist, besprechen wir eine Alternative oder den Rückversand.",
      shipping_approval_1: "Keine Reparatur ohne Freigabe.",
      shipping_approval_2: "Du bekommst zuerst Diagnose, Reparaturoption und finalen Preis.",
      shipping_approval_3: "Rückversand mit Sendungsnummer.",
      shipping_pack_title: "Verpackungs-Checkliste",
      shipping_pack_text: "Kurz, praktisch, ohne Stress: so kommt dein Gerät sicher an.",
      shipping_pack_open: "Checkliste öffnen",
      shipping_pack_1: "Gerät ausschalten und SIM-Karte entfernen.",
      shipping_pack_2: "Wenn möglich Backup erstellen und Sperrcode vorab klären.",
      shipping_pack_3: "Gerät weich polstern, am besten in einer kleinen Box im Paket.",
      shipping_pack_4: "Zettel mit Name, Rückkontakt, Modell und Fehlerbeschreibung beilegen.",
      shipping_pack_5: "Nur mit verfolgbarer Sendung verschicken.",
      shipping_faq_title: "Häufige Fragen zum Versand",
      shipping_final_title: "Bereit für die Versand-Reparatur?",
      shipping_final_text: "Schreib kurz Modell, Schaden und Ort. Du bekommst danach die Versandhinweise und kannst in Ruhe entscheiden.",
      shipping_final_cta: "Versandhinweise per WhatsApp erhalten",
      service_choice_title: "Drei Wege zur Reparatur",
      service_choice_text: "Wähle, was zu dir passt: lokal in Singen, Abholung nach Absprache oder Versand aus ganz Deutschland.",
      service_choice_local_title: "Vor Ort in Singen",
      service_choice_local_text: "Kurze Abstimmung per WhatsApp, dann Übergabe oder mobiler Termin in Singen.",
      service_choice_pickup_title: "Abholung in Singen",
      service_choice_pickup_text: "Wenn es zeitlich passt, kann ich Abholung oder Rückgabe innerhalb Singen vereinbaren.",
      service_choice_shipping_title: "Versand aus ganz Deutschland",
      service_choice_shipping_text: "Erst prüfen, dann entscheiden: keine Reparatur ohne deine Freigabe.",
      service_choice_hint: "Versandadresse und genaue Hinweise bekommst du erst nach dem WhatsApp-Check.",
      faq_section_shipping: "Versandreparatur",
      faq_shipping_approval_q: "Wird automatisch repariert, wenn ich mein Gerät einsende?",
      faq_shipping_approval_a: "Nein. Erst nach Diagnose, finalem Preis und deiner ausdrücklichen Freigabe beginnt die Reparatur.",
      faq_shipping_payment_q: "Wann bezahle ich?",
      faq_shipping_payment_a: "Die Zahlung wird nach Freigabe und vor dem Rückversand geklärt. Details bekommst du im WhatsApp-Verlauf.",
      faq_shipping_cost_q: "Wer trägt die Versandkosten?",
      faq_shipping_cost_a: "Die Einsendekosten trägt der Kunde. Rückversand und mögliche Zusatzkosten werden vorab transparent geklärt.",
      faq_shipping_pack_q: "Wie soll ich mein Gerät verpacken?",
      faq_shipping_pack_a: "Bitte gut polstern, SIM-Karte entfernen und einen Zettel mit Modell, Fehlerbeschreibung und Rückkontakt beilegen. Versand nur verfolgbar.",
      faq_shipping_data_q: "Bleiben meine Daten erhalten?",
      faq_shipping_data_a: "Bei Standardreparaturen normalerweise ja. Trotzdem empfehlen wir vor dem Versand ein Backup.",
      faq_shipping_tracking_q: "Bekomme ich eine Sendungsnummer?",
      faq_shipping_tracking_a: "Ja, der Rückversand erfolgt mit Sendungsnummer, sobald das Gerät repariert, getestet und versandbereit ist.",
      faq_shipping_water_q: "Geht Versand auch bei Wasserschaden?",
      faq_shipping_water_a: "Ja, aber eine erfolgreiche Reparatur kann nicht garantiert werden. Nach der Diagnose entscheidest du über die nächsten Schritte.",
      faq_shipping_unprofitable_q: "Was passiert, wenn sich die Reparatur nicht lohnt?",
      faq_shipping_unprofitable_a: "Dann besprechen wir ehrlich die Optionen: Rückversand, Ankauf, Ersatzteiloption oder keine Reparatur.",
      shipping_terms_title: "Versandbedingungen",
      shipping_terms_intro: "Diese Hinweise erklären den Ablauf der Reparatur per Versand. Sie ersetzen keine individuelle Absprache im WhatsApp-Verlauf.",
      shipping_terms_before_title: "1. Vor dem Einsenden",
      shipping_terms_before_text: "Bitte kontaktiere uns zuerst per WhatsApp. Sende Modell, Schaden, Ort und wenn möglich Fotos. Die Einsendeadresse wird erst nach der Vorabklärung mitgeteilt.",
      shipping_terms_no_auto_title: "2. Keine automatische Reparatur",
      shipping_terms_no_auto_text: "Das Einsenden bedeutet noch keine automatische Reparatur. Nach Eingang bekommst du Diagnose, Reparaturoption und finalen Preis. Repariert wird erst nach deiner Freigabe.",
      shipping_terms_cost_title: "3. Versandkosten und Rückversand",
      shipping_terms_cost_text: "Die Einsendekosten trägt der Kunde. Rückversand, Sendungsnummer und mögliche Zusatzkosten werden vorab transparent geklärt.",
      shipping_terms_data_title: "4. Daten und Backup",
      shipping_terms_data_text: "Bei Standardreparaturen bleiben Daten normalerweise erhalten. Trotzdem empfehlen wir vor jeder Reparatur ein Backup.",
      shipping_terms_damage_title: "5. Sonderfälle",
      shipping_terms_damage_text: "Bei Wasserschaden, starken Sturzschäden oder nicht wirtschaftlicher Reparatur wird die weitere Vorgehensweise vorab besprochen.",
      shipping_terms_notice: "Hinweis: Bitte diese Informationen vor aktiver Werbung final rechtlich prüfen lassen.",
    },
    uk: {
      nav_shipping: "Доставка",
      footer_shipping_terms: "Умови доставки",
      mb_shipping_flow: "Процес",
      price_mode_local: "У Singen",
      price_mode_shipping: "Поштою",
      price_mode_local_note: "Передача, забір або мобільний термін у Singen після WhatsApp-перевірки.",
      price_mode_shipping_note: "Для ремонту поштою спочатку надішлю інструкції. Без твоєї згоди ремонт не починається.",
      price_mode_shipping_cta: "Запитати Versand у WhatsApp",
      shipping_kicker: "Відправка по Німеччині",
      shipping_h1: "Надішли телефон. Спочатку перевірка. Потім рішення.",
      shipping_hero_cta: "Почати через WhatsApp",
      shipping_logistics_pack: "М'яко запакувати",
      shipping_logistics_send: "Надіслати з трекінгом",
      shipping_logistics_return: "Зворотна доставка",
      shipping_logistics_station: "Packstation за домовленістю",
      faq_section_shipping: "Ремонт поштою",
    },
    en: {
      nav_shipping: "Shipping",
      footer_shipping_terms: "Shipping terms",
      mb_shipping_flow: "Flow",
      price_mode_local: "In Singen",
      price_mode_shipping: "By shipping",
      price_mode_local_note: "Local handover, pickup or mobile appointment after WhatsApp check.",
      price_mode_shipping_note: "For shipping, you first receive shipping instructions. No repair without approval.",
      price_mode_shipping_cta: "Ask for mail-in repair",
      shipping_kicker: "Germany-wide shipping",
      shipping_h1: "Send in your phone. Check first. Decide after.",
      shipping_hero_cta: "Start by WhatsApp",
      shipping_logistics_pack: "Pack with padding",
      shipping_logistics_send: "Send with tracking",
      shipping_logistics_return: "Return shipping",
      shipping_logistics_station: "Parcel locker by agreement",
      faq_section_shipping: "Mail-in repair",
    },
    ru: { nav_shipping: "Доставка", footer_shipping_terms: "Условия доставки", mb_shipping_flow: "Процесс", price_mode_local: "В Singen", price_mode_shipping: "Почтой", price_mode_shipping_cta: "Спросить про отправку", shipping_logistics_pack: "Мягко упаковать", shipping_logistics_send: "Отправить с трекингом", shipping_logistics_return: "Обратная доставка", shipping_logistics_station: "Packstation по договоренности", faq_section_shipping: "Ремонт почтой" },
    pl: { nav_shipping: "Wysyłka", footer_shipping_terms: "Warunki wysyłki", mb_shipping_flow: "Proces", price_mode_local: "W Singen", price_mode_shipping: "Wysyłkowo", price_mode_shipping_cta: "Zapytaj o wysyłkę", shipping_logistics_pack: "Dobrze zabezpieczyć", shipping_logistics_send: "Wysłać z trackingiem", shipping_logistics_return: "Wysyłka zwrotna", shipping_logistics_station: "Packstation po uzgodnieniu", faq_section_shipping: "Naprawa wysyłkowa" },
    it: { nav_shipping: "Spedizione", footer_shipping_terms: "Condizioni spedizione", mb_shipping_flow: "Procedura", price_mode_local: "A Singen", price_mode_shipping: "Per spedizione", price_mode_shipping_cta: "Chiedi la spedizione", shipping_logistics_pack: "Imballare protetto", shipping_logistics_send: "Inviare tracciato", shipping_logistics_return: "Rispedizione", shipping_logistics_station: "Packstation su accordo", faq_section_shipping: "Riparazione per spedizione" },
    ar: { nav_shipping: "الشحن", footer_shipping_terms: "شروط الشحن", mb_shipping_flow: "الخطوات", price_mode_local: "في Singen", price_mode_shipping: "بالشحن", price_mode_shipping_cta: "اسأل عن الشحن", shipping_logistics_pack: "تغليف مبطن", shipping_logistics_send: "إرسال مع تتبع", shipping_logistics_return: "إرجاع بالشحن", shipping_logistics_station: "Packstation بالاتفاق", faq_section_shipping: "إصلاح عبر الشحن" },
    ku: { nav_shipping: "Şandin", footer_shipping_terms: "Mercên şandinê", mb_shipping_flow: "Rêbaz", price_mode_local: "Li Singen", price_mode_shipping: "Bi şandinê", price_mode_shipping_cta: "Derbarê şandinê bipirse", shipping_logistics_pack: "Bi parastinê pak bike", shipping_logistics_send: "Bi şopandinê bişîne", shipping_logistics_return: "Şandina vegerê", shipping_logistics_station: "Packstation bi lihevkirinê", faq_section_shipping: "Tamîra bi şandinê" },
    fr: { nav_shipping: "Envoi", footer_shipping_terms: "Conditions d'envoi", mb_shipping_flow: "Étapes", price_mode_local: "À Singen", price_mode_shipping: "Par envoi", price_mode_shipping_cta: "Demander l'envoi", shipping_logistics_pack: "Emballer protégé", shipping_logistics_send: "Envoyer avec suivi", shipping_logistics_return: "Retour suivi", shipping_logistics_station: "Packstation sur accord", faq_section_shipping: "Réparation par envoi" },
    sl: { nav_shipping: "Pošiljanje", footer_shipping_terms: "Pogoji pošiljanja", mb_shipping_flow: "Potek", price_mode_local: "V Singen", price_mode_shipping: "Po pošti", price_mode_shipping_cta: "Vprašaj za pošiljanje", shipping_logistics_pack: "Varno zapakiraj", shipping_logistics_send: "Pošlji s sledenjem", shipping_logistics_return: "Povratno pošiljanje", shipping_logistics_station: "Packstation po dogovoru", faq_section_shipping: "Popravilo po pošti" },
  };

  Object.entries(EXTRA_I18N).forEach(([lang, values]) => {
    GLOBAL_I18N[lang] = { ...GLOBAL_I18N.de, ...values };
  });
  Object.entries(SIMPLE_LANGUAGE_OVERRIDES).forEach(([lang, values]) => {
    GLOBAL_I18N[lang] = { ...GLOBAL_I18N.de, ...values, ...(HOME_SECTION_I18N[lang] || {}) };
  });
  Object.entries(FAQ_I18N).forEach(([lang, values]) => {
    GLOBAL_I18N[lang] = { ...(GLOBAL_I18N[lang] || GLOBAL_I18N.de), ...values };
  });
  Object.entries(THEME_I18N).forEach(([lang, values]) => {
    GLOBAL_I18N[lang] = { ...(GLOBAL_I18N[lang] || GLOBAL_I18N.de), ...values };
  });
  Object.entries(SAMSUNG_I18N).forEach(([lang, values]) => {
    GLOBAL_I18N[lang] = { ...(GLOBAL_I18N[lang] || GLOBAL_I18N.de), ...values };
  });
  Object.entries(SAMSUNG_MODAL_I18N).forEach(([lang, values]) => {
    GLOBAL_I18N[lang] = { ...(GLOBAL_I18N[lang] || GLOBAL_I18N.de), ...values };
  });
  Object.entries(PRICE_REMINDER_I18N).forEach(([lang, values]) => {
    GLOBAL_I18N[lang] = { ...(GLOBAL_I18N[lang] || GLOBAL_I18N.de), ...values };
  });
  Object.entries(COOKIE_I18N).forEach(([lang, values]) => {
    GLOBAL_I18N[lang] = { ...(GLOBAL_I18N[lang] || GLOBAL_I18N.de), ...values };
  });
  Object.entries(SHIPPING_I18N).forEach(([lang, values]) => {
    GLOBAL_I18N[lang] = { ...(GLOBAL_I18N[lang] || GLOBAL_I18N.de), ...values };
  });
  const PRICE_OPTION_I18N_DE = {
    repair_back_housing: "Rückgehäuse komplett",
    repair_midframe_backglass: "Mittelrahmen + Rückglas",
    quality_premium_aftermarket_xo7: "Premium Aftermarket OLED XO7 Soft, 120 Hz",
    quality_oem_pull_grade_a: "OEM Pull Grade A",
    quality_budget_import: "Budget-Importteil",
    repair_note_premium_aftermarket: "Gute Qualität, schneller verfügbar als OEM",
    repair_note_oem_display: "Originales ausgebautes Display in sehr gutem Zustand",
    repair_note_oem_backglass: "Originales Rückglas, bessere Passform",
    repair_note_oem_housing: "Originalgehäuse mit Kleinteilen",
    repair_note_budget_import: "Lieferzeit ca. 10-14 Werktage, Verfügbarkeit schwankt",
    stock_leadtime_10_14: "10-14 Werktage",
    price_iphone17_notes_title: "Hinweise zur iPhone 17 Serie",
    price_iphone17_included_note: "Alle Preise inkl. Einbau. Preise gelten für die angegebene Teilequalität. Der Reparaturtermin erfolgt erst nach Teileingang, wenn ein Teil bestellt werden muss.",
    price_iphone17_budget_note: "Budget-Importteile sind günstiger, haben aber eine Lieferzeit von durchschnittlich ca. 10-14 Werktagen. Verfügbarkeit, Farbe und Passform können je nach Charge leicht abweichen.",
    price_iphone17_oem_note: "OEM Pull Teile sind originale Apple-Teile aus ausgebauten Geräten. Sie bieten in der Regel die beste Passform und ein hochwertiges Ergebnis, sind aber abhängig von Verfügbarkeit und Zustand.",
    price_iphone17_damage_note: "Wichtig: Preise gelten, sofern keine zusätzlichen Schäden an Rahmen, Kamera, Face ID, Ladebuchse oder Mainboard vorhanden sind.",
    price_included_short: "inkl. Einbau",
    quality_chip_premium: "Premium",
    quality_chip_original: "Original OEM",
    quality_chip_budget: "Budget",
    quality_hint_premium: "Gute Qualität, meist schneller verfügbar",
    quality_hint_original: "Beste Passform, je nach Verfügbarkeit",
    quality_hint_budget: "Günstiger, ca. 10-14 Werktage Lieferzeit",
    price_quality_details_title: "Qualitäten kurz erklärt",
    price_quality_details_premium: "Premium: gute Qualität und meist schneller verfügbar.",
    price_quality_details_original: "Original OEM: beste Passform, abhängig von Verfügbarkeit und Zustand.",
    price_quality_details_budget: "Budget: günstiger, mit ca. 10-14 Werktagen Lieferzeit.",
    wa_label_quality: "Teilequalität",
    wa_label_note: "Hinweis",
  };
  const PRICE_OPTION_I18N = {
    uk: {
      price_included_short: "з установкою",
      quality_chip_premium: "Преміум",
      quality_chip_original: "Original OEM",
      quality_chip_budget: "Бюджет",
      quality_hint_premium: "Хороша якість, зазвичай швидше доступно",
      quality_hint_original: "Найкраща сумісність, залежить від наявності",
      quality_hint_budget: "Дешевше, доставка приблизно 10-14 робочих днів",
      price_quality_details_title: "Коротко про якість",
      price_quality_details_premium: "Преміум: хороша якість і зазвичай швидша доступність.",
      price_quality_details_original: "Original OEM: найкраща посадка, залежить від наявності та стану.",
      price_quality_details_budget: "Бюджет: дешевше, доставка деталей приблизно 10-14 робочих днів.",
    },
    en: {
      price_included_short: "incl. installation",
      quality_chip_premium: "Premium",
      quality_chip_original: "Original OEM",
      quality_chip_budget: "Budget",
      quality_hint_premium: "Good quality, usually available faster",
      quality_hint_original: "Best fit, depending on availability",
      quality_hint_budget: "Cheaper, approx. 10-14 working days delivery",
      price_quality_details_title: "Part quality explained",
      price_quality_details_premium: "Premium: good quality and usually available faster.",
      price_quality_details_original: "Original OEM: best fit, depending on availability and condition.",
      price_quality_details_budget: "Budget: cheaper, with approx. 10-14 working days delivery time.",
    },
    ru: {
      price_included_short: "с установкой",
      quality_chip_premium: "Премиум",
      quality_chip_original: "Original OEM",
      quality_chip_budget: "Бюджет",
      quality_hint_premium: "Хорошее качество, обычно доступно быстрее",
      quality_hint_original: "Лучшая посадка, зависит от наличия",
      quality_hint_budget: "Дешевле, доставка примерно 10-14 рабочих дней",
      price_quality_details_title: "Кратко о качестве",
      price_quality_details_premium: "Премиум: хорошее качество и обычно быстрее доступно.",
      price_quality_details_original: "Original OEM: лучшая посадка, зависит от наличия и состояния.",
      price_quality_details_budget: "Бюджет: дешевле, срок поставки около 10-14 рабочих дней.",
    },
    pl: {
      price_included_short: "z montażem",
      quality_chip_premium: "Premium",
      quality_chip_original: "Original OEM",
      quality_chip_budget: "Budżet",
      quality_hint_premium: "Dobra jakość, zwykle szybciej dostępne",
      quality_hint_original: "Najlepsze dopasowanie, zależnie od dostępności",
      quality_hint_budget: "Taniej, dostawa ok. 10-14 dni roboczych",
      price_quality_details_title: "Krótko o jakości",
      price_quality_details_premium: "Premium: dobra jakość i zwykle szybsza dostępność.",
      price_quality_details_original: "Original OEM: najlepsze dopasowanie, zależnie od dostępności i stanu.",
      price_quality_details_budget: "Budżet: taniej, z czasem dostawy ok. 10-14 dni roboczych.",
    },
    it: {
      price_included_short: "montaggio incluso",
      quality_chip_premium: "Premium",
      quality_chip_original: "Original OEM",
      quality_chip_budget: "Budget",
      quality_hint_premium: "Buona qualità, di solito disponibile più velocemente",
      quality_hint_original: "Migliore aderenza, secondo disponibilità",
      quality_hint_budget: "Più economico, consegna circa 10-14 giorni lavorativi",
      price_quality_details_title: "Qualità in breve",
      price_quality_details_premium: "Premium: buona qualità e di solito disponibile più velocemente.",
      price_quality_details_original: "Original OEM: migliore aderenza, secondo disponibilità e stato.",
      price_quality_details_budget: "Budget: più economico, con consegna in circa 10-14 giorni lavorativi.",
    },
    ar: {
      price_included_short: "يشمل التركيب",
      quality_chip_premium: "Premium",
      quality_chip_original: "Original OEM",
      quality_chip_budget: "Budget",
      quality_hint_premium: "جودة جيدة، غالبا متوفر أسرع",
      quality_hint_original: "أفضل توافق حسب التوفر",
      quality_hint_budget: "أرخص، التوريد حوالي 10-14 يوم عمل",
      price_quality_details_title: "شرح مختصر للجودة",
      price_quality_details_premium: "Premium: جودة جيدة وغالبا متوفر أسرع.",
      price_quality_details_original: "Original OEM: أفضل توافق، حسب التوفر والحالة.",
      price_quality_details_budget: "Budget: أرخص، مع وقت توريد حوالي 10-14 يوم عمل.",
    },
    ku: {
      price_included_short: "bi danînê re",
      quality_chip_premium: "Premium",
      quality_chip_original: "Original OEM",
      quality_chip_budget: "Budget",
      quality_hint_premium: "Kalîteya baş, pir caran zûtir amade ye",
      quality_hint_original: "Lihevhatina herî baş, li gorî amadeyiyê",
      quality_hint_budget: "Erzantir, gihandin nêzî 10-14 rojên kar",
      price_quality_details_title: "Kalîte bi kurtî",
      price_quality_details_premium: "Premium: kalîteya baş û pir caran zûtir amade ye.",
      price_quality_details_original: "Original OEM: lihevhatina herî baş, li gorî amadeyî û rewşê.",
      price_quality_details_budget: "Budget: erzantir, bi dema gihandina nêzî 10-14 rojên kar.",
    },
    fr: {
      price_included_short: "pose incluse",
      quality_chip_premium: "Premium",
      quality_chip_original: "Original OEM",
      quality_chip_budget: "Budget",
      quality_hint_premium: "Bonne qualité, souvent disponible plus vite",
      quality_hint_original: "Meilleur ajustement, selon disponibilité",
      quality_hint_budget: "Moins cher, livraison env. 10-14 jours ouvrés",
      price_quality_details_title: "Qualités en bref",
      price_quality_details_premium: "Premium : bonne qualité et souvent disponible plus vite.",
      price_quality_details_original: "Original OEM : meilleur ajustement, selon disponibilité et état.",
      price_quality_details_budget: "Budget : moins cher, avec env. 10-14 jours ouvrés de livraison.",
    },
    sl: {
      price_included_short: "z vgradnjo",
      quality_chip_premium: "Premium",
      quality_chip_original: "Original OEM",
      quality_chip_budget: "Budget",
      quality_hint_premium: "Dobra kakovost, običajno hitreje dobavljivo",
      quality_hint_original: "Najboljše prileganje, glede na dobavljivost",
      quality_hint_budget: "Ugodneje, dobava približno 10-14 delovnih dni",
      price_quality_details_title: "Kakovosti na kratko",
      price_quality_details_premium: "Premium: dobra kakovost in običajno hitrejša dobavljivost.",
      price_quality_details_original: "Original OEM: najboljše prileganje, odvisno od dobavljivosti in stanja.",
      price_quality_details_budget: "Budget: ugodneje, z dobavo približno 10-14 delovnih dni.",
    },
  };
  LANGUAGES.forEach(({ code }) => {
    GLOBAL_I18N[code] = { ...(GLOBAL_I18N[code] || GLOBAL_I18N.de), ...PRICE_OPTION_I18N_DE, ...(PRICE_OPTION_I18N[code] || {}) };
  });
  const LEGAL_SOURCE_OF_TRUTH = {
    privacy_intro: "Diese Datenschutzhinweise erklären kurz, welche Daten bei Kontakt, Versand-Anfrage, Website-Nutzung und Analytics verarbeitet werden.",
    privacy_contact_text: "Wenn du per Telefon, Email, WhatsApp oder Telegram Kontakt aufnimmst, werden die von dir gesendeten Angaben zur Bearbeitung deiner Reparaturanfrage verwendet.",
    privacy_hosting_text: "Diese Website wird statisch gehostet. Dabei können technisch notwendige Server-Logfiles entstehen.",
    privacy_notice: "Google Analytics wird nur nach Zustimmung aktiviert. Bei Versand-Anfragen können zusätzlich Modell, Schaden, Kontaktweg, Versandstatus und Rückversand-Informationen verarbeitet werden.",
  };
  Object.keys(GLOBAL_I18N).forEach((lang) => {
    GLOBAL_I18N[lang] = { ...(GLOBAL_I18N[lang] || {}), ...LEGAL_SOURCE_OF_TRUTH };
  });

  const hasI18n = Object.keys(i18n).length > 0 || Object.keys(GLOBAL_I18N).length > 0;
  let currentLang = null;

  function getCookieConsent() {
    try {
      const value = localStorage.getItem(COOKIE_CONSENT_KEY);
      return value === "granted" || value === "denied" ? value : "";
    } catch (error) {
      return "";
    }
  }

  function setCookieConsent(value) {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, value);
    } catch (error) {}
  }

  function isAnalyticsGranted() {
    return getCookieConsent() === "granted";
  }

  function updateAnalyticsConsent(value, sendPageView = false) {
    if (typeof window.gtag !== "function") return;
    const granted = value === "granted";
    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    if (granted && sendPageView && window.HN_GA_MEASUREMENT_ID) {
      window.gtag("config", window.HN_GA_MEASUREMENT_ID, {
        anonymize_ip: true,
        send_page_view: true,
      });
    }
  }

  function trackEvent(name, params = {}) {
    const payload = { event: name, ...params };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);

    if (typeof window.gtag === "function" && isAnalyticsGranted()) {
      window.gtag("event", name, params);
    }
    if (typeof window.plausible === "function") {
      window.plausible(name, { props: params });
    }
    window.dispatchEvent(new CustomEvent("hn:analytics", { detail: payload }));
  }

  window.HN_trackEvent = trackEvent;

  function getClickLocation(el) {
    if (!el?.closest) return "content";
    if (el.closest("header")) return "header";
    if (el.closest(".mobilebar")) return "mobilebar";
    if (el.closest(".float-wa")) return "floating_cta";
    if (el.closest(".price-reminder")) return "price_reminder";
    if (el.closest(".shipping-page")) return "shipping";
    if (el.closest("#contact")) return "contact";
    if (el.closest(".concept-action-dock")) return "action_dock";
    if (el.closest(".concept-hero")) return "hero";
    if (el.closest(".price-selector-shell") || el.closest(".price-panel") || el.closest(".price-shell")) return "prices";
    return "content";
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function getLanguageMeta(lang) {
    const code = normalizeLang(lang) || defaultLang;
    return LANGUAGES.find((language) => language.code === code) || LANGUAGES[0];
  }

  function resolveI18n(lang, key) {
    const code = normalizeLang(lang) || defaultLang;
    return i18n[code]?.[key]
      ?? (code === "uk" ? i18n.ua?.[key] : undefined)
      ?? GLOBAL_I18N[code]?.[key]
      ?? i18n[defaultLang]?.[key]
      ?? (defaultLang === "uk" ? i18n.ua?.[key] : undefined)
      ?? GLOBAL_I18N[defaultLang]?.[key]
      ?? i18n.de?.[key]
      ?? GLOBAL_I18N.de?.[key]
      ?? "";
  }

  function formatI18n(lang, key, params = {}) {
    return String(resolveI18n(lang, key)).replace(/\{(\w+)\}/g, (_, name) => params[name] ?? "");
  }

  function initCookieConsent() {
    if (!document.body || document.querySelector("[data-cookie-consent]")) return;

    const stored = getCookieConsent();
    if (stored === "granted" || stored === "denied") {
      updateAnalyticsConsent(stored, false);
      return;
    }

    const banner = document.createElement("section");
    banner.className = "cookie-consent";
    banner.setAttribute("data-cookie-consent", "");
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.innerHTML = `
      <div class="cookie-consent__copy">
        <strong data-cookie-title></strong>
        <p data-cookie-text></p>
        <a href="datenschutz.html" data-cookie-privacy></a>
      </div>
      <div class="cookie-consent__actions">
        <button class="cookie-consent__btn cookie-consent__btn--ghost" type="button" data-cookie-decline></button>
        <button class="cookie-consent__btn cookie-consent__btn--accept" type="button" data-cookie-accept></button>
      </div>
    `;

    const render = (lang = getLang() || defaultLang) => {
      banner.setAttribute("aria-label", resolveI18n(lang, "cookie_consent_label"));
      banner.querySelector("[data-cookie-title]")?.replaceChildren(document.createTextNode(resolveI18n(lang, "cookie_consent_title")));
      banner.querySelector("[data-cookie-text]")?.replaceChildren(document.createTextNode(resolveI18n(lang, "cookie_consent_text")));
      banner.querySelector("[data-cookie-privacy]")?.replaceChildren(document.createTextNode(resolveI18n(lang, "cookie_consent_privacy")));
      banner.querySelector("[data-cookie-accept]")?.replaceChildren(document.createTextNode(resolveI18n(lang, "cookie_consent_accept")));
      banner.querySelector("[data-cookie-decline]")?.replaceChildren(document.createTextNode(resolveI18n(lang, "cookie_consent_decline")));
    };

    const close = (value) => {
      setCookieConsent(value);
      updateAnalyticsConsent(value, value === "granted");
      banner.remove();
      trackEvent("cookie_consent_update", { consent: value });
    };

    banner.querySelector("[data-cookie-accept]")?.addEventListener("click", () => close("granted"));
    banner.querySelector("[data-cookie-decline]")?.addEventListener("click", () => close("denied"));
    window.addEventListener("hn:language-change", (event) => render(event.detail?.lang));

    render();
    document.body.appendChild(banner);
  }

  function getStoredLang() {
    let raw = "";
    try {
      raw = localStorage.getItem("hn_lang") || "";
    } catch (error) {}

    if (!raw) return "";
    const normalized = normalizeLang(raw);

    try {
      if (normalized && raw !== normalized) localStorage.setItem("hn_lang", normalized);
      if (!normalized) localStorage.removeItem("hn_lang");
    } catch (error) {}

    return normalized;
  }

  function detectInitialLang() {
    const candidates = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ""];
    const matched = candidates.map(normalizeLang).find(Boolean) || defaultLang;

    try {
      const key = "hn_lang_auto_detected_v1";
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        trackEvent("language_auto_detect", {
          lang: matched,
          browser: candidates.filter(Boolean).slice(0, 4).join(","),
          fallback: matched === defaultLang && !candidates.map(normalizeLang).find(Boolean),
        });
      }
    } catch (error) {}

    return matched;
  }

  function getLang() {
    return currentLang || getStoredLang() || detectInitialLang();
  }

  function getStoredTheme() {
    try {
      return normalizeTheme(localStorage.getItem(THEME_STORAGE_KEY));
    } catch (error) {
      return "";
    }
  }

  function getSystemTheme() {
    return themeMedia.matches ? "light" : "dark";
  }

  function updateThemeMeta(theme) {
    document.documentElement.style.colorScheme = theme;
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", THEME_COLORS[theme] || THEME_COLORS.dark);
  }

  function updateThemeToggles(theme = currentTheme) {
    const lang = currentLang || getStoredLang() || defaultLang;
    const labelKey = theme === "dark" ? "theme_switch_to_light" : "theme_switch_to_dark";
    const label = resolveI18n(lang, labelKey) || (theme === "dark" ? "Switch to light theme" : "Switch to dark theme");

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
      button.dataset.themeState = theme;
      button.classList.toggle("is-light", theme === "light");
      button.classList.toggle("is-dark", theme === "dark");
    });
  }

  function applyTheme(theme, source = "auto") {
    const nextTheme = normalizeTheme(theme) || "dark";
    currentTheme = nextTheme;
    document.documentElement.dataset.theme = nextTheme;
    updateThemeMeta(nextTheme);
    updateThemeToggles(nextTheme);
    window.dispatchEvent(new CustomEvent("hn:theme-change", { detail: { theme: nextTheme, source } }));
  }

  function initThemeSystem() {
    const storedTheme = getStoredTheme();
    const autoTheme = getSystemTheme();
    applyTheme(storedTheme || autoTheme, storedTheme ? "stored" : "auto");

    if (!storedTheme) {
      try {
        const key = "hn_theme_auto_detected_v1";
        if (!sessionStorage.getItem(key)) {
          sessionStorage.setItem(key, "1");
          trackEvent("theme_auto_detect", { theme: autoTheme });
        }
      } catch (error) {}
    }

    const onSystemThemeChange = () => {
      if (!getStoredTheme()) applyTheme(getSystemTheme(), "auto");
    };
    if (typeof themeMedia.addEventListener === "function") {
      themeMedia.addEventListener("change", onSystemThemeChange);
    } else if (typeof themeMedia.addListener === "function") {
      themeMedia.addListener(onSystemThemeChange);
    }

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      if (button.dataset.themeToggleReady === "true") return;
      button.dataset.themeToggleReady = "true";
      button.addEventListener("click", () => {
        const previous = currentTheme;
        const nextTheme = previous === "dark" ? "light" : "dark";
        try {
          localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        } catch (error) {}
        applyTheme(nextTheme, "manual");
        button.classList.remove("is-animating");
        void button.offsetWidth;
        button.classList.add("is-animating");
        window.setTimeout(() => button.classList.remove("is-animating"), 520);
        trackEvent("theme_toggle", { theme: nextTheme, previous });
      });
    });
  }

  function applyTranslations(lang) {
    if (!hasI18n) return;

    const code = normalizeLang(lang) || defaultLang;
    document.documentElement.lang = code;
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
    updateLanguagePickers(code);
    updateThemeToggles(currentTheme);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = resolveI18n(code, key);
      if (!val) return;
      if (htmlKeys.has(key)) el.innerHTML = val;
      else el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      const val = resolveI18n(code, key);
      if (val) el.setAttribute("alt", val);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria-label");
      const val = resolveI18n(code, key);
      if (val) el.setAttribute("aria-label", val);
    });
  }

  function updateQuickWA(lang) {
    const link = document.getElementById("waQuick");
    if (!link || !whatsappNumber) return;

    const model = (document.getElementById("model")?.value || "").trim() || "-";
    const issue = (document.getElementById("issue")?.value || "").trim() || "-";

    const code = normalizeLang(lang) || defaultLang;
    const msg = `${resolveI18n(code, "wa_message_intro")}
${resolveI18n(code, "wa_label_device") || "Modell"}: ${model}
${resolveI18n(code, "wa_label_issue") || "Problem"}: ${issue}
${resolveI18n(code, "wa_label_city") || "Ort"}: ${city}`;

    link.href = buildWhatsAppHref(msg);
  }

  function cleanWhatsAppText(text) {
    return String(text || "")
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\uFE0F]/gu, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function buildWhatsAppHref(message) {
    if (!whatsappNumber) return "#";
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(cleanWhatsAppText(message))}`;
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

    el.textContent = ok ? resolveI18n(lang, "live_badge_open") : resolveI18n(lang, "live_badge_closed");
    el.dataset.state = ok ? "open" : "closed";
  }

  function updateSearchPlaceholders(lang) {
    const code = normalizeLang(lang) || defaultLang;
    document.querySelectorAll(".price-search").forEach((input) => {
      const t = input.getAttribute("data-filter-target");
      if (t === "samsungTable") input.placeholder = resolveI18n(code, "search_samsung_placeholder");
      if (t === "iphoneTable") input.placeholder = resolveI18n(code, "search_iphone_placeholder");
    });
  }

  function repairOption(key, price, quality, note, stock = "") {
    return { key, price, quality, note, stock };
  }

  function iphone17SeriesRepairs(prices, batteryPrice) {
    const repairs = [
      repairOption("repair_display", prices.displayPremium, "quality_premium_aftermarket_xo7", "repair_note_premium_aftermarket"),
      repairOption("repair_display", prices.displayOem, "quality_oem_pull_grade_a", "repair_note_oem_display", "on_request"),
      repairOption("repair_backglass", prices.backglassBudget, "quality_budget_import", "repair_note_budget_import", "leadtime"),
      repairOption("repair_backglass", prices.backglassOem, "quality_oem_pull_grade_a", "repair_note_oem_backglass", "on_request"),
      repairOption("repair_back_housing", prices.housingOem, "quality_oem_pull_grade_a", "repair_note_oem_housing", "on_request"),
      repairOption("repair_back_housing", prices.housingBudget, "quality_budget_import", "repair_note_budget_import", "leadtime"),
    ];

    if (prices.midframeBudget) {
      repairs.push(repairOption("repair_midframe_backglass", prices.midframeBudget, "quality_budget_import", "repair_note_budget_import", "leadtime"));
    }

    repairs.push({ key: "repair_original_battery", price: batteryPrice, stock: "on_request" });
    return repairs;
  }

  const PRICE_DATA = {
    apple: [
      { model: "iPhone Air", series: "iphone", family: "iPhone Air", image: "assets/phones/iphone-air.png", repairs: [{ key: "repair_original_battery", price: "149€", stock: "on_request" }] },
      { model: "iPhone 17 Pro Max", series: "iphone", family: "iPhone 17", image: "assets/phones/iphone-17-pro-max.png", repairs: iphone17SeriesRepairs({ displayPremium: "299€", displayOem: "459€", backglassBudget: "149€", backglassOem: "159€", housingOem: "449€", housingBudget: "249€", midframeBudget: "249€" }, "169€") },
      { model: "iPhone 17 Pro", series: "iphone", family: "iPhone 17", image: "assets/phones/iphone-17-pro.png", repairs: iphone17SeriesRepairs({ displayPremium: "299€", displayOem: "399€", backglassBudget: "149€", backglassOem: "159€", housingOem: "369€", housingBudget: "229€" }, "149€") },
      { model: "iPhone 17", series: "iphone", family: "iPhone 17", image: "assets/phones/iphone-17.png", repairs: iphone17SeriesRepairs({ displayPremium: "239€", displayOem: "389€", backglassBudget: "129€", backglassOem: "159€", housingOem: "249€", housingBudget: "199€" }, "139€") },
      { model: "iPhone 16e / 17e", series: "iphone", family: "iPhone 16e / 17e", image: "assets/phones/iphone-16.png", repairs: [{ key: "repair_original_battery", price: "119€", stock: "on_request" }] },
      { model: "iPhone 16 Pro Max", series: "iphone", repairs: [{ key: "repair_display", price: "399€" }, { key: "repair_battery", price: "139€" }, { key: "repair_original_battery", price: "139€", stock: "on_request" }, { key: "repair_backglass", price: "189€" }] },
      { model: "iPhone 16 Pro", series: "iphone", repairs: [{ key: "repair_display", price: "359€" }, { key: "repair_battery", price: "129€" }, { key: "repair_backglass", price: "179€" }] },
      { model: "iPhone 16 Plus", series: "iphone", repairs: [{ key: "repair_display", price: "269€" }, { key: "repair_battery", price: "109€" }, { key: "repair_original_battery", price: "119€", stock: "on_request" }, { key: "repair_backglass", price: "169€" }] },
      { model: "iPhone 16", series: "iphone", repairs: [{ key: "repair_display", price: "249€" }, { key: "repair_battery", price: "99€" }, { key: "repair_original_battery", price: "109€", stock: "on_request" }, { key: "repair_backglass", price: "149€" }] },
      { model: "iPhone 15 Pro Max", series: "iphone", repairs: [{ key: "repair_display", price: "299€" }, { key: "repair_battery", price: "109€" }, { key: "repair_original_battery", price: "119€", stock: "on_request" }, { key: "repair_backglass", price: "149€" }] },
      { model: "iPhone 15 Pro", series: "iphone", repairs: [{ key: "repair_display", price: "269€" }, { key: "repair_battery", price: "99€" }, { key: "repair_original_battery", price: "109€", stock: "on_request" }, { key: "repair_backglass", price: "139€" }] },
      { model: "iPhone 15 Plus", series: "iphone", repairs: [{ key: "repair_display", price: "239€" }, { key: "repair_battery", price: "89€" }, { key: "repair_original_battery", price: "109€", stock: "on_request" }, { key: "repair_backglass", price: "119€" }] },
      { model: "iPhone 15", series: "iphone", repairs: [{ key: "repair_display", price: "209€" }, { key: "repair_battery", price: "89€" }, { key: "repair_original_battery", price: "99€", stock: "on_request" }, { key: "repair_backglass", price: "99€" }] },
      { model: "iPhone 14 Pro Max", series: "iphone", repairs: [{ key: "repair_display", price: "209€" }, { key: "repair_battery", price: "99€" }, { key: "repair_original_battery", price: "119€", stock: "on_request" }, { key: "repair_backglass", price: "139€" }] },
      { model: "iPhone 14 Pro", series: "iphone", repairs: [{ key: "repair_display", price: "199€" }, { key: "repair_battery", price: "89€" }, { key: "repair_backglass", price: "129€" }] },
      { model: "iPhone 14 Plus", series: "iphone", repairs: [{ key: "repair_display", price: "169€" }, { key: "repair_battery", price: "85€" }, { key: "repair_original_battery", price: "zurzeit nicht lieferbar", stock: "unavailable" }, { key: "repair_backglass", price: "99€" }] },
      { model: "iPhone 14", series: "iphone", repairs: [{ key: "repair_display", price: "149€" }, { key: "repair_battery", price: "85€" }, { key: "repair_original_battery", price: "89€", stock: "on_request" }, { key: "repair_backglass", price: "89€" }] },
      { model: "iPhone 13 Pro Max", series: "iphone", repairs: [{ key: "repair_display", price: "189€" }, { key: "repair_battery", price: "79€" }, { key: "repair_original_battery", price: "109€", stock: "on_request" }, { key: "repair_backglass", price: "109€" }] },
      { model: "iPhone 13 Pro", series: "iphone", repairs: [{ key: "repair_display", price: "179€" }, { key: "repair_battery", price: "79€" }, { key: "repair_backglass", price: "99€" }] },
      { model: "iPhone 13", series: "iphone", repairs: [{ key: "repair_display", price: "149€" }, { key: "repair_battery", price: "79€" }, { key: "repair_backglass", price: "99€" }] },
      { model: "iPhone 13 mini", series: "iphone", repairs: [{ key: "repair_display", price: "139€" }, { key: "repair_battery", price: "79€" }, { key: "repair_backglass", price: "89€" }] },
      { model: "iPhone 12 Pro Max", series: "iphone", image: "assets/phones/iphone-12-pro-max.png", repairs: [{ key: "repair_display", price: "149€" }, { key: "repair_battery", price: "79€" }, { key: "repair_original_battery", price: "99€", stock: "on_request" }, { key: "repair_backglass", price: "99€" }] },
      { model: "iPhone 12 / 12 Pro", series: "iphone", repairs: [{ key: "repair_display", price: "139€" }, { key: "repair_battery", price: "79€" }, { key: "repair_backglass", price: "89€" }] },
      { model: "iPhone 12 mini", series: "iphone", repairs: [{ key: "repair_display", price: "109€" }, { key: "repair_battery", price: "79€" }, { key: "repair_backglass", price: "79€" }] },
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

  const SAMSUNG_ASSETS = {
    device: {
      phone: "assets/samsung/device/phone.png",
      tablet: "assets/samsung/device/tablet.png",
      watch: "assets/samsung/device/watch.png",
      laptop: "assets/samsung/device/laptop.png",
    },
    series: {
      "galaxy-s": "assets/samsung/series/galaxy-s.png",
      "galaxy-a": "assets/samsung/series/galaxy-a.png",
      "galaxy-z-flip": "assets/samsung/series/galaxy-z-flip.png",
      "galaxy-z-fold": "assets/samsung/series/galaxy-z-fold.png",
      "galaxy-note": "assets/samsung/series/galaxy-note.png",
      "galaxy-m": "assets/samsung/series/galaxy-m.png",
      "galaxy-xcover": "assets/samsung/series/galaxy-xcover.png",
    },
    repair: {
      display: "assets/samsung/icons/display.png",
      battery: "assets/samsung/icons/battery.png",
      port: "assets/samsung/icons/port.png",
      backglass: "assets/samsung/icons/backglass.png",
      camera: "assets/samsung/icons/camera.png",
      water: "assets/samsung/icons/water.png",
      unknown: "assets/samsung/icons/unknown.png",
    },
  };

  const SAMSUNG_SERIES = [
    { key: "galaxy-s", label: "Galaxy S", models: ["Galaxy S10e", "Galaxy S10", "Galaxy S10+", "Galaxy S10 5G", "Galaxy S20", "Galaxy S20+", "Galaxy S20 Ultra", "Galaxy S20 FE", "Galaxy S21", "Galaxy S21+", "Galaxy S21 Ultra", "Galaxy S21 FE", "Galaxy S22", "Galaxy S22+", "Galaxy S22 Ultra", "Galaxy S23", "Galaxy S23+", "Galaxy S23 Ultra", "Galaxy S23 FE", "Galaxy S24", "Galaxy S24+", "Galaxy S24 Ultra", "Galaxy S24 FE", "Galaxy S25", "Galaxy S25+", "Galaxy S25 Ultra", "Galaxy S25 Edge", "Galaxy S25 FE"] },
    { key: "galaxy-a", label: "Galaxy A", models: ["Galaxy A01", "Galaxy A02", "Galaxy A03", "Galaxy A04", "Galaxy A05", "Galaxy A06", "Galaxy A10", "Galaxy A11", "Galaxy A12", "Galaxy A13", "Galaxy A14", "Galaxy A15", "Galaxy A16", "Galaxy A20", "Galaxy A20e", "Galaxy A21", "Galaxy A22", "Galaxy A23", "Galaxy A24", "Galaxy A25", "Galaxy A26", "Galaxy A30", "Galaxy A31", "Galaxy A32", "Galaxy A33", "Galaxy A34", "Galaxy A35", "Galaxy A36", "Galaxy A50", "Galaxy A51", "Galaxy A52", "Galaxy A53", "Galaxy A54", "Galaxy A55", "Galaxy A56", "Galaxy A70", "Galaxy A71", "Galaxy A72", "Galaxy A73", "Galaxy A80", "Galaxy A90 5G"] },
    { key: "galaxy-z-flip", label: "Galaxy Z Flip", models: ["Galaxy Z Flip", "Galaxy Z Flip 5G", "Galaxy Z Flip3", "Galaxy Z Flip4", "Galaxy Z Flip5", "Galaxy Z Flip6", "Galaxy Z Flip7", "Galaxy Z Flip7 FE"] },
    { key: "galaxy-z-fold", label: "Galaxy Z Fold", models: ["Galaxy Fold", "Galaxy Z Fold2", "Galaxy Z Fold3", "Galaxy Z Fold4", "Galaxy Z Fold5", "Galaxy Z Fold6", "Galaxy Z Fold7", "Galaxy Z Fold Special Edition"] },
    { key: "galaxy-note", label: "Galaxy Note", models: ["Galaxy Note10", "Galaxy Note10+", "Galaxy Note20", "Galaxy Note20 Ultra"] },
    { key: "galaxy-m", label: "Galaxy M", models: ["Galaxy M10", "Galaxy M10s", "Galaxy M20", "Galaxy M21", "Galaxy M30", "Galaxy M30s", "Galaxy M31", "Galaxy M31s", "Galaxy M32", "Galaxy M33", "Galaxy M34", "Galaxy M35", "Galaxy M40", "Galaxy M51", "Galaxy M52", "Galaxy M53", "Galaxy M54", "Galaxy M55", "Galaxy M56", "Galaxy M05", "Galaxy M15", "Galaxy M16"] },
    { key: "galaxy-xcover", label: "Galaxy XCover", models: ["Galaxy XCover Pro", "Galaxy XCover 5", "Galaxy XCover 6 Pro", "Galaxy XCover 7"] },
  ];

  const SAMSUNG_REPAIRS = [
    { key: "display", i18n: "samsung_repair_display", image: SAMSUNG_ASSETS.repair.display },
    { key: "battery", i18n: "samsung_repair_battery", image: SAMSUNG_ASSETS.repair.battery },
    { key: "port", i18n: "samsung_repair_port", image: SAMSUNG_ASSETS.repair.port },
    { key: "backglass", i18n: "samsung_repair_backglass", image: SAMSUNG_ASSETS.repair.backglass },
    { key: "camera", i18n: "samsung_repair_camera", image: SAMSUNG_ASSETS.repair.camera, askOnly: true },
    { key: "water", i18n: "samsung_repair_water", image: SAMSUNG_ASSETS.repair.water, askOnly: true },
    { key: "unknown", i18n: "samsung_repair_unknown", image: SAMSUNG_ASSETS.repair.unknown, askOnly: true },
  ];

  const SAMSUNG_OTHER_DEVICES = [
    { key: "tablet", i18n: "samsung_device_tablet", image: SAMSUNG_ASSETS.device.tablet, modelImage: "assets/samsung/models/galaxy-tab.png" },
    { key: "watch", i18n: "samsung_device_watch", image: SAMSUNG_ASSETS.device.watch },
    { key: "laptop", i18n: "samsung_device_laptop", image: SAMSUNG_ASSETS.device.laptop, modelImage: "assets/samsung/models/galaxy-laptop.png" },
  ];

  const SAMSUNG_PRICE_MAP = {
    "Galaxy S10e": { display: "199€", battery: "79€", port: "59€", backglass: "79€" },
    "Galaxy S10": { display: "219€", battery: "79€", port: "59€", backglass: "79€" },
    "Galaxy S10+": { display: "229€", battery: "89€", port: "59€", backglass: "79€" },
    "Galaxy S10 5G": { battery: "89€" },
    "Galaxy S20": { display: "220€", battery: "79€", port: "59€", backglass: "79€" },
    "Galaxy S20+": { display: "259€", battery: "89€", port: "59€", backglass: "79€" },
    "Galaxy S20 Ultra": { display: "299€", battery: "99€", port: "69€", backglass: "89€" },
    "Galaxy S20 FE": { display: "229€", battery: "79€", port: "59€", backglass: "79€" },
    "Galaxy S21": { display: "179€", battery: "79€", port: "69€", backglass: "89€" },
    "Galaxy S21+": { display: "199€", battery: "89€", port: "69€", backglass: "89€" },
    "Galaxy S21 Ultra": { display: "299€", battery: "99€", port: "69€", backglass: "89€" },
    "Galaxy S21 FE": { display: "220€", battery: "89€", port: "69€", backglass: "89€" },
    "Galaxy S22": { display: "239€", battery: "89€", port: "69€", backglass: "89€" },
    "Galaxy S22+": { display: "269€", battery: "89€", port: "69€", backglass: "89€" },
    "Galaxy S22 Ultra": { display: "339€", battery: "99€", port: "79€", backglass: "99€" },
    "Galaxy S23": { display: "239€", battery: "99€", port: "79€", backglass: "99€" },
    "Galaxy S23+": { display: "269€", battery: "99€", port: "79€", backglass: "99€" },
    "Galaxy S23 Ultra": { display: "349€", battery: "109€", port: "89€", backglass: "109€" },
    "Galaxy S24": { display: "259€", port: "79€", backglass: "109€" },
    "Galaxy S24+": { display: "289€", battery: "89€", port: "79€", backglass: "109€" },
    "Galaxy S24 Ultra": { display: "339€", battery: "99€", port: "89€", backglass: "120€" },
    "Galaxy S25": { display: "189€", battery: "89€", port: "89€", backglass: "99€" },
    "Galaxy S25+": { display: "249€", battery: "99€", port: "89€", backglass: "109€" },
    "Galaxy S25 Ultra": { display: "289€", port: "99€", backglass: "120€" },
    "Galaxy A12": { battery: "69€" },
    "Galaxy A13": { battery: "69€" },
    "Galaxy A14": { battery: "79€" },
    "Galaxy A15": { battery: "69€" },
    "Galaxy A16": { battery: "79€" },
    "Galaxy A23": { battery: "79€" },
    "Galaxy A24": { battery: "79€" },
    "Galaxy A34": { battery: "79€" },
    "Galaxy A50": { battery: "69€" },
    "Galaxy A51": { battery: "69€" },
    "Galaxy A52": { battery: "79€" },
    "Galaxy A53": { battery: "79€" },
    "Galaxy A54": { battery: "79€" },
    "Galaxy Z Flip3": { battery: "109€" },
    "Galaxy Z Flip4": { battery: "119€" },
    "Galaxy Z Flip5": { battery: "119€" },
    "Galaxy Z Fold2": { battery: "129€" },
    "Galaxy Z Fold3": { battery: "129€" },
    "Galaxy Z Fold4": { battery: "139€" },
    "Galaxy Z Fold5": { battery: "139€" },
    "Galaxy Note10": { battery: "89€" },
    "Galaxy Note10+": { battery: "89€" },
    "Galaxy Note20": { battery: "89€" },
    "Galaxy Note20 Ultra": { battery: "99€" },
  };

  const SAMSUNG_MODEL_IMAGES = {
    "Galaxy S10e": "assets/samsung/models/galaxy-s10-family.jpeg",
    "Galaxy S10": "assets/samsung/models/galaxy-s10-family.jpeg",
    "Galaxy S10+": "assets/samsung/models/galaxy-s10-family.jpeg",
    "Galaxy S20": "assets/samsung/models/galaxy-s20-family.jpeg",
    "Galaxy S20+": "assets/samsung/models/galaxy-s20-family.jpeg",
    "Galaxy S20 Ultra": "assets/samsung/models/galaxy-s20-family.jpeg",
    "Galaxy S20 FE": "assets/samsung/models/galaxy-s20-family.jpeg",
    "Galaxy S21": "assets/samsung/models/galaxy-s21-family.jpeg",
    "Galaxy S21+": "assets/samsung/models/galaxy-s21-family.jpeg",
    "Galaxy S21 Ultra": "assets/samsung/models/galaxy-s21-family.jpeg",
    "Galaxy S21 FE": "assets/samsung/models/galaxy-s21-family.jpeg",
    "Galaxy S22": "assets/samsung/models/galaxy-s22-family.jpeg",
    "Galaxy S22+": "assets/samsung/models/galaxy-s22-family.jpeg",
    "Galaxy S22 Ultra": "assets/samsung/models/galaxy-s22-family.jpeg",
    "Galaxy S23": "assets/samsung/models/galaxy-s23-family.jpeg",
    "Galaxy S23+": "assets/samsung/models/galaxy-s23-family.jpeg",
    "Galaxy S23 Ultra": "assets/samsung/models/galaxy-s23-family.jpeg",
    "Galaxy S24": "assets/samsung/models/galaxy-s24.jpeg",
    "Galaxy S24+": "assets/samsung/models/galaxy-s24-family.jpeg",
    "Galaxy S24 Ultra": "assets/samsung/models/galaxy-s24-ultra.jpeg",
    "Galaxy S25": "assets/samsung/models/galaxy-s25.jpeg",
    "Galaxy S25+": "assets/samsung/models/galaxy-s25-family.jpeg",
    "Galaxy S25 Ultra": "assets/samsung/models/galaxy-s25-family.jpeg",
    "Galaxy S25 Edge": "assets/samsung/models/galaxy-s25-edge.jpeg",
    "Galaxy A16": "assets/samsung/models/galaxy-a16.png",
    "Galaxy A26": "assets/samsung/models/galaxy-a26.png",
    "Galaxy A36": "assets/samsung/models/galaxy-a36.png",
    "Galaxy A56": "assets/samsung/models/galaxy-a56.png",
    "Galaxy Z Flip7": "assets/samsung/models/galaxy-z-flip7.png",
    "Galaxy Z Fold7": "assets/samsung/models/galaxy-z-fold7.png",
  };

  let selectedPriceRepair = null;
  let selectedPriceBrand = "apple";
  let selectedPriceDeliveryMode = "local";
  let selectedSamsungSeries = "";
  let selectedSamsungModel = "";
  let selectedSamsungRepair = "";
  let selectedSamsungOtherDevice = null;
  let selectedSamsungStep = "series";
  let lastSamsungTrigger = null;
  const SAMSUNG_STEPS = ["series", "models", "repairs", "summary"];

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
    if (entry.customImage) return {};
    const slug = slugifyPriceModel(entry.model);
    return {
      webp: `assets/phones/optimized/${slug}-420.webp 420w, assets/phones/optimized/${slug}-800.webp 800w`,
      sizes: "(max-width: 560px) 92vw, (max-width: 820px) 430px, 390px",
    };
  }

  function getRepairQualityLabel(repair, lang) {
    const key = repair?.quality || repair?.variant || "";
    return key ? (resolveI18n(lang, key) || key) : "";
  }

  function getRepairNoteText(repair, lang) {
    const key = repair?.note || "";
    return key ? (resolveI18n(lang, key) || key) : "";
  }

  function getRepairBaseLabel(repair, lang) {
    return resolveI18n(lang, repair.key) || repair.key;
  }

  function getRepairLabel(repair, lang) {
    const baseLabel = getRepairBaseLabel(repair, lang);
    const qualityLabel = getRepairQualityLabel(repair, lang);
    return qualityLabel ? `${baseLabel} · ${qualityLabel}` : baseLabel;
  }

  function getRepairQualityType(repair) {
    const quality = repair?.quality || repair?.variant || "";
    if (quality === "quality_budget_import") return "budget";
    if (quality === "quality_oem_pull_grade_a") return "original";
    if (quality === "quality_premium_aftermarket_xo7") return "premium";
    return "";
  }

  function getRepairQualityOrder(repair) {
    const type = getRepairQualityType(repair);
    const order = { budget: 0, premium: 1, original: 2 };
    return Object.prototype.hasOwnProperty.call(order, type) ? order[type] : 9;
  }

  function sortRepairOptionsForDisplay(repairs) {
    return [...repairs].sort((a, b) => (
      getRepairQualityOrder(a) - getRepairQualityOrder(b)
      || getNumericPrice(a.price) - getNumericPrice(b.price)
      || String(getRepairQualityType(a)).localeCompare(String(getRepairQualityType(b)))
    ));
  }

  function getRepairQualityChipLabel(repair, lang) {
    const type = getRepairQualityType(repair);
    const key = {
      premium: "quality_chip_premium",
      original: "quality_chip_original",
      budget: "quality_chip_budget",
    }[type];
    return key ? (resolveI18n(lang, key) || type) : getRepairQualityLabel(repair, lang);
  }

  function getRepairQualityHint(repair, lang) {
    const type = getRepairQualityType(repair);
    const key = {
      premium: "quality_hint_premium",
      original: "quality_hint_original",
      budget: "quality_hint_budget",
    }[type];
    return key ? (resolveI18n(lang, key) || "") : getRepairNoteText(repair, lang);
  }

  function getRepairDisplayLabel(repair, lang) {
    const baseLabel = getRepairBaseLabel(repair, lang);
    const chipLabel = getRepairQualityChipLabel(repair, lang);
    return chipLabel ? `${baseLabel} · ${chipLabel}` : getRepairLabel(repair, lang);
  }

  function getNumericPrice(price) {
    const match = String(price || "").match(/\d+/);
    return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
  }

  function groupRepairOptions(repairs) {
    return repairs.reduce((result, repair) => {
      if (repair.key === "repair_original_battery") {
        result.standalone.push(repair);
        return result;
      }

      let group = result.groups.find((item) => item.key === repair.key);
      if (!group) {
        group = { key: repair.key, repairs: [] };
        result.groups.push(group);
      }
      group.repairs.push(repair);
      return result;
    }, { groups: [], standalone: [] });
  }

  function getPriceCtaText(lang) {
    if (selectedPriceDeliveryMode === "shipping") {
      return resolveI18n(lang, "price_mode_shipping_cta") || "Versand per WhatsApp anfragen";
    }
    return resolveI18n(lang, "price_selector_cta") || resolveI18n(lang, "wa_message_intro") || "Per WhatsApp anfragen";
  }

  function getStockLabel(stock, lang) {
    const labels = {
      available: resolveI18n(lang, "stock_available") || "Auf Lager",
      unavailable: resolveI18n(lang, "stock_unavailable") || "Nicht auf Lager",
      on_request: resolveI18n(lang, "stock_on_request") || "Verfügbarkeit prüfen",
      leadtime: resolveI18n(lang, "stock_leadtime_10_14") || "10-14 Werktage",
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
        customImage: Boolean(entry.image),
        image: getPriceImage(entry, brand),
      }))
    ));
  }

  function sortPriceModelsForDisplay(models) {
    const iphone17Order = {
      "iPhone 17": 0,
      "iPhone 17 Pro": 1,
      "iPhone 17 Pro Max": 2,
    };
    if (!models.some((entry) => entry.family === "iPhone 17")) return models;
    return [...models].sort((a, b) => {
      const aRank = Object.prototype.hasOwnProperty.call(iphone17Order, a.model) ? iphone17Order[a.model] : 99;
      const bRank = Object.prototype.hasOwnProperty.call(iphone17Order, b.model) ? iphone17Order[b.model] : 99;
      return aRank - bRank || a.model.localeCompare(b.model);
    });
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
    if (selectedPriceDeliveryMode === "shipping") {
      const repairLabel = repair?.waLabel || repair?.label || (resolveI18n(lang, "wa_repair_general") || "allgemeine Anfrage");
      const price = repair?.price || (resolveI18n(lang, "samsung_price_ask") || "Einfach fragen");
      const qualityLine = repair?.quality
        ? `${resolveI18n(lang, "wa_label_quality") || "Teilequalität"}: ${repair.quality}`
        : null;
      const noteLine = repair?.note
        ? `${resolveI18n(lang, "wa_label_note") || "Hinweis"}: ${repair.note}`
        : null;
      const text = [
        "Hallo! Ich möchte eine Reparatur per Versand anfragen.",
        "",
        `Modell: ${entry.model}`,
        `Reparatur: ${repairLabel}`,
        qualityLine,
        `Preis laut Liste: ${price}`,
        noteLine,
        "Ort: Deutschland",
        "",
        "Bitte sende mir die Versandhinweise.",
      ].filter((line) => line !== null).join("\n");
      return buildWhatsAppHref(text);
    }

    const stockLine = repair?.stock
      ? `\n${resolveI18n(lang, "wa_label_stock") || "Lager"}: ${getStockLabel(repair.stock, lang)}`
      : "";
    const qualityLine = repair?.quality
      ? `\n${resolveI18n(lang, "wa_label_quality") || "Teilequalität"}: ${repair.quality}`
      : "";
    const noteLine = repair?.note
      ? `\n${resolveI18n(lang, "wa_label_note") || "Hinweis"}: ${repair.note}`
      : "";
    const repairLabel = repair?.waLabel || repair?.label;
    const repairLine = repair
      ? `${resolveI18n(lang, "wa_label_repair") || "Reparatur"}: ${repairLabel}${qualityLine}\n${resolveI18n(lang, "wa_label_price") || "Preis"}: ${repair.price}${noteLine}${stockLine}`
      : (resolveI18n(lang, "wa_repair_general") || "Reparatur: allgemeine Anfrage");

    const text = `${resolveI18n(lang, "wa_message_intro") || "Hallo!"}
${resolveI18n(lang, "wa_label_device") || "Modell"}: ${entry.model}
${repairLine}
${resolveI18n(lang, "wa_label_city") || "Ort"}: ${city}`;

    return buildWhatsAppHref(text);
  }

  function updatePriceShippingUi() {
    const lang = getLang();
    const isShipping = selectedPriceDeliveryMode === "shipping";
    document.querySelector("[data-price-selector]")?.classList.toggle("is-shipping-mode", isShipping);
    document.querySelectorAll("[data-price-shipping-mode]").forEach((button) => {
      const active = button.dataset.priceShippingMode === selectedPriceDeliveryMode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const note = document.querySelector("[data-price-shipping-note]");
    if (note) {
      const key = isShipping ? "price_mode_shipping_note" : "price_mode_local_note";
      note.textContent = resolveI18n(lang, key) || "";
    }
    const hint = document.querySelector("[data-price-shipping-hint]");
    if (hint) hint.hidden = !isShipping;
  }

  function updatePriceCta(entry) {
    const cta = document.querySelector("[data-price-cta]");
    if (!cta || !entry) return;
    cta.textContent = getPriceCtaText(getLang());
    cta.href = buildPriceWaHref(entry, selectedPriceRepair);
    updatePriceShippingUi();
  }

  function setPriceCtaReady(isReady) {
    document.querySelector("[data-price-selector]")?.classList.toggle("is-repair-selected", isReady);
    document.querySelector("[data-price-cta]")?.classList.toggle("is-ready", isReady);
  }

  function getSamsungSeries(key = selectedSamsungSeries) {
    return SAMSUNG_SERIES.find((series) => series.key === key) || SAMSUNG_SERIES[0];
  }

  function getSamsungRepair(key = selectedSamsungRepair) {
    return SAMSUNG_REPAIRS.find((repair) => repair.key === key) || SAMSUNG_REPAIRS[0];
  }

  function getSamsungModelSeries(model) {
    return SAMSUNG_SERIES.find((series) => series.models.includes(model)) || getSamsungSeries(selectedSamsungSeries);
  }

  function getSamsungSeriesImage(seriesKey = selectedSamsungSeries) {
    return SAMSUNG_ASSETS.series[seriesKey] || SAMSUNG_ASSETS.series["galaxy-s"];
  }

  function getSamsungModelImage(model) {
    if (!model) return getSamsungSeriesImage(selectedSamsungSeries);
    const series = getSamsungModelSeries(model);
    return SAMSUNG_MODEL_IMAGES[model] || getSamsungSeriesImage(series.key);
  }

  function getSamsungDeviceLabel(key, lang = getLang()) {
    const labels = {
      phone: "samsung_device_phone",
      tablet: "samsung_device_tablet",
      watch: "samsung_device_watch",
      laptop: "samsung_device_laptop",
    };
    return resolveI18n(lang, labels[key]) || key;
  }

  function getSamsungRepairLabelByKey(key, lang = getLang()) {
    if (!key) return resolveI18n(lang, "samsung_none") || "-";
    const repair = getSamsungRepair(key);
    return resolveI18n(lang, repair.i18n) || repair.key;
  }

  function getSamsungAskLabel(lang = getLang()) {
    return resolveI18n(lang, "samsung_price_ask") || "Einfach fragen";
  }

  function getSamsungRepairPrice(model, repairKey) {
    if (!model || !repairKey) return "";
    const repair = getSamsungRepair(repairKey);
    if (repair.askOnly) return "";
    const price = SAMSUNG_PRICE_MAP[model]?.[repairKey] || "";
    return /nicht verf/i.test(price) ? "" : price;
  }

  function getSamsungCurrentModel() {
    if (!selectedSamsungSeries) return selectedSamsungModel || "";
    const series = getSamsungSeries();
    return series.models.includes(selectedSamsungModel)
      ? selectedSamsungModel
      : "";
  }

  function getSamsungSummaryState() {
    const lang = getLang();
    const otherDevice = selectedSamsungOtherDevice
      ? SAMSUNG_OTHER_DEVICES.find((device) => device.key === selectedSamsungOtherDevice)
      : null;

    if (otherDevice) {
      const label = getSamsungDeviceLabel(otherDevice.key, lang);
      return {
        device: label,
        series: resolveI18n(lang, "samsung_none") || "-",
        model: label,
        repair: resolveI18n(lang, "samsung_repair_unknown") || "Unbekannt / Diagnose",
        price: getSamsungAskLabel(lang),
        note: resolveI18n(lang, "samsung_other_summary_note") || "",
        image: otherDevice.modelImage || otherDevice.image,
        ask: true,
      };
    }

    const series = selectedSamsungSeries ? getSamsungSeries() : null;
    const model = getSamsungCurrentModel();
    const repairLabel = getSamsungRepairLabelByKey(selectedSamsungRepair, lang);
    const price = getSamsungRepairPrice(model, selectedSamsungRepair);
    return {
      device: getSamsungDeviceLabel("phone", lang),
      series: series?.label || (resolveI18n(lang, "samsung_none") || "-"),
      model: model || (resolveI18n(lang, "samsung_none") || "-"),
      repair: repairLabel,
      price: price || getSamsungAskLabel(lang),
      note: resolveI18n(lang, "samsung_summary_note") || "",
      image: getSamsungModelImage(model),
      ask: !price,
    };
  }

  function buildSamsungWaHref() {
    if (!whatsappNumber) return "#";

    const lang = getLang();
    const state = getSamsungSummaryState();
    if (selectedPriceDeliveryMode === "shipping") {
      const text = `Hallo! Ich möchte eine Reparatur per Versand anfragen.

Modell: ${state.model}
Reparatur: ${state.repair}
Preis laut Liste: ${state.price}
Ort: Deutschland

Bitte sende mir die Versandhinweise.`;
      return buildWhatsAppHref(text);
    }
    const text = `${resolveI18n(lang, "wa_message_intro") || "Hallo!"}
${resolveI18n(lang, "samsung_summary_device") || "Gerät"}: ${state.device}
${resolveI18n(lang, "samsung_summary_series") || "Serie"}: ${state.series}
${resolveI18n(lang, "wa_label_device") || "Modell"}: ${state.model}
${resolveI18n(lang, "wa_label_repair") || "Reparatur"}: ${state.repair}
${resolveI18n(lang, "wa_label_price") || "Preis"}: ${state.price}
${resolveI18n(lang, "wa_label_city") || "Ort"}: ${city}`;

    return buildWhatsAppHref(text);
  }

  function getSamsungModal() {
    return document.querySelector("[data-samsung-modal]");
  }

  function isSamsungModalOpen() {
    const modal = getSamsungModal();
    return Boolean(modal && !modal.hidden);
  }

  function resetSamsungWizard() {
    selectedSamsungSeries = "";
    selectedSamsungModel = "";
    selectedSamsungRepair = "";
    selectedSamsungOtherDevice = null;
    selectedSamsungStep = "series";
    const search = document.querySelector("[data-samsung-model-search]");
    if (search) search.value = "";
  }

  function setBrandButtonState(brand = "apple") {
    document.querySelectorAll("[data-price-brand]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.priceBrand === brand);
    });
  }

  function getSamsungStepIndex(step = selectedSamsungStep) {
    return Math.max(0, SAMSUNG_STEPS.indexOf(step));
  }

  function canAdvanceSamsungStep() {
    if (selectedSamsungStep === "series") return Boolean(selectedSamsungSeries);
    if (selectedSamsungStep === "models") return Boolean(selectedSamsungModel);
    if (selectedSamsungStep === "repairs") return Boolean(selectedSamsungRepair);
    return false;
  }

  function focusSamsungStep() {
    const modal = getSamsungModal();
    if (!modal || modal.hidden) return;
    const selectors = {
      series: "[data-samsung-series] button",
      models: "[data-samsung-model-search]",
      repairs: "[data-samsung-repairs] button",
      summary: "[data-samsung-cta]",
    };
    const target = modal.querySelector(selectors[selectedSamsungStep]) || modal.querySelector("[data-samsung-dialog]");
    if (target && typeof target.focus === "function") {
      window.setTimeout(() => target.focus({ preventScroll: true }), 30);
    }
  }

  function updateSamsungWizardUi() {
    const modal = getSamsungModal();
    if (!modal) return;
    const stepIndex = getSamsungStepIndex();
    modal.dataset.samsungStep = selectedSamsungStep;
    modal.querySelectorAll("[data-samsung-step-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.samsungStepPanel !== selectedSamsungStep;
    });

    const progress = modal.querySelector("[data-samsung-progress]");
    if (progress) {
      progress.innerHTML = SAMSUNG_STEPS.map((step, index) => (
        `<span class="samsung-modal__progress-step${index < stepIndex ? " is-done" : ""}${index === stepIndex ? " is-active" : ""}"></span>`
      )).join("");
    }

    const back = modal.querySelector("[data-samsung-back]");
    const next = modal.querySelector("[data-samsung-next]");
    if (back) back.disabled = stepIndex === 0;
    if (next) {
      next.hidden = selectedSamsungStep === "summary";
      next.disabled = !canAdvanceSamsungStep();
    }
  }

  function setSamsungStep(step, focus = true) {
    if (!SAMSUNG_STEPS.includes(step)) return;
    selectedSamsungStep = step;
    updateSamsungWizardUi();
    if (focus) focusSamsungStep();
  }

  function goToNextSamsungStep() {
    if (!canAdvanceSamsungStep()) return;
    if (selectedSamsungStep === "series") setSamsungStep("models");
    else if (selectedSamsungStep === "models") setSamsungStep("repairs");
    else if (selectedSamsungStep === "repairs") setSamsungStep("summary");
  }

  function goToPreviousSamsungStep() {
    if (selectedSamsungStep === "summary" && selectedSamsungOtherDevice) {
      selectedSamsungOtherDevice = null;
      setSamsungStep("series");
      renderSamsungConfigurator();
      return;
    }
    const index = getSamsungStepIndex();
    if (index > 0) setSamsungStep(SAMSUNG_STEPS[index - 1]);
  }

  function openSamsungModal(trigger = null) {
    const modal = getSamsungModal();
    if (!modal) return;
    if (modal.parentElement !== document.body) document.body.appendChild(modal);
    lastSamsungTrigger = trigger || document.querySelector("[data-price-brand='samsung']");
    resetSamsungWizard();
    selectedPriceBrand = "apple";
    selectedPriceRepair = null;
    setPriceCtaReady(false);
    setBrandButtonState("samsung");
    modal.hidden = false;
    document.body.classList.add("samsung-modal-open");
    renderSamsungConfigurator();
    applyTranslations(getLang());
    focusSamsungStep();
    trackEvent("samsung_modal_open", { source: "price_brand_switch" });
  }

  function closeSamsungModal() {
    const modal = getSamsungModal();
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("samsung-modal-open");
    selectedPriceBrand = "apple";
    setBrandButtonState("apple");
    setPriceSelectorMode("apple");
    trackEvent("samsung_modal_close", { step: selectedSamsungStep });
    if (lastSamsungTrigger && typeof lastSamsungTrigger.focus === "function") {
      window.setTimeout(() => lastSamsungTrigger.focus({ preventScroll: true }), 0);
    }
  }

  function trapSamsungModalFocus(event) {
    const modal = getSamsungModal();
    if (!modal || modal.hidden || event.key !== "Tab") return;
    const focusable = Array.from(modal.querySelectorAll("a[href], button:not([disabled]):not([hidden]), input:not([disabled]), [tabindex]:not([tabindex='-1'])"))
      .filter((el) => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function setPriceSelectorMode(brand) {
    document.querySelector("[data-price-selector]")?.classList.toggle("is-samsung-mode", false);
    document.querySelectorAll("[data-price-apple-panel]").forEach((panel) => {
      panel.hidden = false;
    });
    const samsungRoot = document.querySelector("[data-samsung-configurator]");
    if (samsungRoot && !isSamsungModalOpen()) samsungRoot.hidden = true;

    const title = document.querySelector(".price-selector-card__title");
    if (title) {
      title.textContent = resolveI18n(getLang(), "price_selector_card_title");
    }
  }

  function renderSamsungSeries() {
    const container = document.querySelector("[data-samsung-series]");
    if (!container) return;
    const lang = getLang();
    container.innerHTML = "";

    SAMSUNG_SERIES.forEach((series) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `samsung-choice-card samsung-choice-card--series${series.key === selectedSamsungSeries && !selectedSamsungOtherDevice ? " is-active" : ""}`;
      button.dataset.samsungSeries = series.key;
      button.setAttribute("aria-pressed", String(series.key === selectedSamsungSeries && !selectedSamsungOtherDevice));
      button.style.setProperty("--samsung-series-bg", `url("${getSamsungSeriesImage(series.key)}")`);

      const image = document.createElement("img");
      image.src = getSamsungSeriesImage(series.key);
      image.alt = "";
      image.loading = "lazy";
      image.decoding = "async";

      const name = document.createElement("strong");
      name.textContent = series.label;

      const count = document.createElement("small");
      count.textContent = `${series.models.length} ${resolveI18n(lang, "price_selector_model_label") || "Modelle"}`;

      button.append(image, name, count);
      button.addEventListener("click", () => {
        selectedSamsungOtherDevice = null;
        selectedSamsungSeries = series.key;
        selectedSamsungModel = "";
        selectedSamsungRepair = "";
        const search = document.querySelector("[data-samsung-model-search]");
        if (search) search.value = "";
        renderSamsungConfigurator();
        setSamsungStep("models");
        trackEvent("samsung_series_select", { series: series.label });
      });

      container.appendChild(button);
    });
  }

  function renderSamsungModels() {
    const container = document.querySelector("[data-samsung-models]");
    const search = document.querySelector("[data-samsung-model-search]");
    if (!container) return;

    const lang = getLang();
    if (!selectedSamsungSeries) {
      container.innerHTML = "";
      return;
    }
    const series = getSamsungSeries();
    const query = String(search?.value || "").trim().toLowerCase();
    const models = series.models.filter((model) => model.toLowerCase().includes(query));
    container.innerHTML = "";

    if (!models.length) {
      const empty = document.createElement("p");
      empty.className = "samsung-empty";
      empty.textContent = resolveI18n(lang, "samsung_no_models") || "Kein Modell gefunden.";
      container.appendChild(empty);
      return;
    }

    models.forEach((model) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `samsung-model-card${model === selectedSamsungModel && !selectedSamsungOtherDevice ? " is-active" : ""}`;
      button.dataset.samsungModel = model;
      button.setAttribute("aria-pressed", String(model === selectedSamsungModel && !selectedSamsungOtherDevice));

      const image = document.createElement("img");
      image.src = getSamsungModelImage(model);
      image.alt = `${model} Reparatur bei Handy Notdienst Singen`;
      image.loading = "lazy";
      image.decoding = "async";

      const name = document.createElement("strong");
      name.textContent = model;

      button.append(image, name);
      button.addEventListener("click", () => {
        selectedSamsungOtherDevice = null;
        selectedSamsungModel = model;
        selectedSamsungRepair = "";
        renderSamsungConfigurator();
        setSamsungStep("repairs");
        trackEvent("samsung_model_select", { series: series.label, model });
      });

      container.appendChild(button);
    });
  }

  function renderSamsungRepairs() {
    const container = document.querySelector("[data-samsung-repairs]");
    if (!container) return;

    const lang = getLang();
    const model = getSamsungCurrentModel();
    if (!model) {
      container.innerHTML = "";
      return;
    }
    container.innerHTML = "";

    SAMSUNG_REPAIRS.forEach((repair) => {
      const price = getSamsungRepairPrice(model, repair.key);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `samsung-choice-card samsung-choice-card--repair${repair.key === selectedSamsungRepair && !selectedSamsungOtherDevice ? " is-active" : ""}`;
      button.dataset.samsungRepair = repair.key;
      button.setAttribute("aria-pressed", String(repair.key === selectedSamsungRepair && !selectedSamsungOtherDevice));

      const image = document.createElement("img");
      image.src = repair.image;
      image.alt = "";
      image.loading = "lazy";
      image.decoding = "async";

      const name = document.createElement("strong");
      name.textContent = getSamsungRepairLabelByKey(repair.key, lang);

      const priceHint = document.createElement("small");
      priceHint.textContent = price || getSamsungAskLabel(lang);
      if (!price) priceHint.className = "is-ask";

      button.append(image, name, priceHint);
      button.addEventListener("click", () => {
        selectedSamsungOtherDevice = null;
        selectedSamsungRepair = repair.key;
        renderSamsungConfigurator();
        setSamsungStep("summary");
        trackEvent("samsung_repair_select", {
          model,
          repair: getSamsungRepairLabelByKey(repair.key, lang),
          price: price || getSamsungAskLabel(lang),
        });
      });

      container.appendChild(button);
    });
  }

  function renderSamsungOtherDevices() {
    const container = document.querySelector("[data-samsung-other-devices]");
    if (!container) return;
    const lang = getLang();
    container.innerHTML = "";

    SAMSUNG_OTHER_DEVICES.forEach((device) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `samsung-choice-card samsung-choice-card--device${device.key === selectedSamsungOtherDevice ? " is-active" : ""}`;
      button.dataset.samsungDevice = device.key;
      button.setAttribute("aria-pressed", String(device.key === selectedSamsungOtherDevice));

      const image = document.createElement("img");
      image.src = device.image;
      image.alt = "";
      image.loading = "lazy";
      image.decoding = "async";

      const name = document.createElement("strong");
      name.textContent = getSamsungDeviceLabel(device.key, lang);

      const hint = document.createElement("small");
      hint.textContent = getSamsungAskLabel(lang);

      button.append(image, name, hint);
      button.addEventListener("click", () => {
        selectedSamsungOtherDevice = device.key;
        selectedSamsungSeries = "";
        selectedSamsungModel = "";
        selectedSamsungRepair = "";
        renderSamsungConfigurator();
        setSamsungStep("summary");
        trackEvent("samsung_other_device_select", { device: device.key });
      });

      container.appendChild(button);
    });
  }

  function updateSamsungSummary() {
    const state = getSamsungSummaryState();
    const image = document.querySelector("[data-samsung-summary-image]");
    const device = document.querySelector("[data-samsung-summary-device]");
    const series = document.querySelector("[data-samsung-summary-series]");
    const model = document.querySelector("[data-samsung-summary-model]");
    const repair = document.querySelector("[data-samsung-summary-repair]");
    const price = document.querySelector("[data-samsung-summary-price]");
    const note = document.querySelector("[data-samsung-summary-note]");
    const cta = document.querySelector("[data-samsung-cta]");

    if (image) {
      image.src = state.image;
      image.alt = `${state.model} Reparatur bei Handy Notdienst Singen`;
    }
    if (device) device.textContent = state.device;
    if (series) series.textContent = state.series;
    if (model) model.textContent = state.model;
    if (repair) repair.textContent = state.repair;
    if (price) {
      price.textContent = state.price;
      price.classList.toggle("is-ask", state.ask);
    }
    if (note) note.textContent = state.note;
    if (cta) cta.href = buildSamsungWaHref();
  }

  function renderSamsungConfigurator() {
    const root = document.querySelector("[data-samsung-configurator]");
    if (!root) return;
    const search = document.querySelector("[data-samsung-model-search]");
    if (search) search.placeholder = resolveI18n(getLang(), "samsung_model_search_placeholder") || "Modell suchen";

    if (selectedSamsungSeries && selectedSamsungModel && !getSamsungSeries().models.includes(selectedSamsungModel)) {
      selectedSamsungModel = "";
    }
    renderSamsungSeries();
    renderSamsungModels();
    renderSamsungRepairs();
    renderSamsungOtherDevices();
    updateSamsungSummary();
    updateSamsungWizardUi();
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

  function getSelectedRepairPayload(repair, lang, displayLabel = "") {
    return {
      label: displayLabel || getRepairLabel(repair, lang),
      waLabel: getRepairBaseLabel(repair, lang),
      price: repair.price,
      stock: repair.stock || "on_request",
      quality: getRepairQualityLabel(repair, lang),
      note: getRepairNoteText(repair, lang),
    };
  }

  function renderPriceSeriesNotes(list, entry, lang) {
    if (entry.family !== "iPhone 17") return;

    const noteKeys = [
      "price_iphone17_included_note",
      "price_iphone17_budget_note",
      "price_iphone17_oem_note",
      "price_iphone17_damage_note",
    ];
    const note = document.createElement("aside");
    note.className = "price-series-note";

    const title = document.createElement("strong");
    title.textContent = resolveI18n(lang, "price_iphone17_notes_title") || "Hinweise zur iPhone 17 Serie";
    note.appendChild(title);

    const listEl = document.createElement("ul");
    noteKeys.forEach((key) => {
      const item = document.createElement("li");
      item.textContent = resolveI18n(lang, key) || "";
      listEl.appendChild(item);
    });
    note.appendChild(listEl);
    list.appendChild(note);
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

  function renderPriceModelButtons(models, activeEntry) {
    const buttonGroup = document.querySelector("[data-price-model-buttons]");
    const modelSelect = document.querySelector("[data-price-model]");
    if (!buttonGroup || !modelSelect) return;

    buttonGroup.innerHTML = "";
    models.forEach((modelEntry) => {
      const isActive = modelEntry.model === activeEntry.model;
      const button = document.createElement("button");
      button.className = `price-model-button${isActive ? " is-active" : ""}`;
      button.type = "button";
      button.role = "radio";
      button.setAttribute("aria-checked", String(isActive));
      button.dataset.priceModelButton = modelEntry.model;

      const name = document.createElement("span");
      name.textContent = modelEntry.model;
      button.appendChild(name);

      button.addEventListener("click", () => {
        if (modelSelect.value === modelEntry.model) return;
        modelSelect.value = modelEntry.model;
        selectedPriceRepair = null;
        setPriceCtaReady(false);
        renderPriceSelection();
        trackEvent("model_select", { brand: selectedPriceBrand, model: modelEntry.model, input: "button" });
      });

      buttonGroup.appendChild(button);
    });
  }

  function applyPriceRepairSelection(entry, repair, lang, displayLabel = "", ready = true, shouldTrack = false) {
    selectedPriceRepair = getSelectedRepairPayload(repair, lang, displayLabel);
    setPriceCtaReady(ready);
    updatePriceSummary(entry, selectedPriceRepair);
    updatePriceCta(entry);

    if (shouldTrack) {
      trackEvent("repair_select", {
        brand: entry.brand,
        model: entry.model,
        repair: selectedPriceRepair.waLabel || selectedPriceRepair.label,
        quality: selectedPriceRepair.quality || "",
        price: repair.price,
        stock: repair.stock || "on_request",
      });
    }
  }

  function renderFlatPriceServiceRow(list, entry, repair, index, lang, isSelected = index === 0, extraClass = "") {
    const label = getRepairLabel(repair, lang);
    const note = getRepairNoteText(repair, lang);
    const row = document.createElement("button");
    row.className = ["price-service-row", extraClass, isSelected ? "is-selected" : ""].filter(Boolean).join(" ");
    row.type = "button";
    row.style.setProperty("--row-index", index);

    const labelEl = document.createElement("span");
    labelEl.className = "price-service-row__label";
    const titleEl = document.createElement("span");
    titleEl.className = "price-service-row__title";
    titleEl.textContent = label;
    labelEl.appendChild(titleEl);

    if (repair.key === "repair_original_battery") {
      const infoText = resolveI18n(lang, "repair_original_battery_info")
        || "Replacement battery for iPhone with 99–100% battery health. OEM Pull availability varies.";
      const infoEl = document.createElement("span");
      infoEl.className = "price-service-info";
      infoEl.setAttribute("aria-label", infoText);
      infoEl.setAttribute("title", infoText);
      infoEl.textContent = "i";
      titleEl.append(" ", infoEl);
    }

    if (note) {
      const noteEl = document.createElement("small");
      noteEl.className = "price-service-row__note";
      noteEl.textContent = note;
      labelEl.appendChild(noteEl);
    }

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
    row.setAttribute("aria-label", [label, note, repair.price].filter(Boolean).join(" - "));
    row.addEventListener("click", () => {
      list.querySelectorAll(".price-service-row").forEach((item) => item.classList.remove("is-selected"));
      list.querySelectorAll(".price-repair-group").forEach((item) => item.classList.remove("is-selected"));
      list.querySelectorAll(".price-quality-chip").forEach((item) => {
        item.classList.remove("is-selected");
        item.setAttribute("aria-pressed", "false");
      });
      row.classList.add("is-selected");
      applyPriceRepairSelection(entry, repair, lang, label, true, true);
    });
    list.appendChild(row);
    return row;
  }

  function renderPriceQualityDetails(list, lang) {
    const details = document.createElement("details");
    details.className = "price-quality-details";

    const summary = document.createElement("summary");
    summary.textContent = resolveI18n(lang, "price_quality_details_title") || "Qualitäten kurz erklärt";
    details.appendChild(summary);

    const detailList = document.createElement("ul");
    [
      "price_quality_details_premium",
      "price_quality_details_original",
      "price_quality_details_budget",
    ].forEach((key) => {
      const item = document.createElement("li");
      item.textContent = resolveI18n(lang, key) || "";
      detailList.appendChild(item);
    });
    details.appendChild(detailList);
    list.appendChild(details);
  }

  function selectGroupedRepair(list, entry, groupEl, chipEl, hintTextEl, stockSlotEl, repair, lang, ready = true, shouldTrack = false) {
    const displayLabel = getRepairDisplayLabel(repair, lang);
    list.querySelectorAll(".price-service-row").forEach((item) => item.classList.remove("is-selected"));
    list.querySelectorAll(".price-repair-group").forEach((item) => item.classList.remove("is-selected"));
    list.querySelectorAll(".price-quality-chip").forEach((item) => {
      item.classList.remove("is-selected");
      item.setAttribute("aria-pressed", "false");
    });

    groupEl.classList.add("is-selected");
    chipEl.classList.add("is-selected");
    chipEl.setAttribute("aria-pressed", "true");
    hintTextEl.textContent = getRepairQualityHint(repair, lang);
    stockSlotEl.innerHTML = "";

    if (repair.stock) {
      const stockEl = document.createElement("small");
      stockEl.className = `price-stock price-stock--${repair.stock}`;
      stockEl.textContent = getStockLabel(repair.stock, lang);
      stockSlotEl.appendChild(stockEl);
    }

    applyPriceRepairSelection(entry, repair, lang, displayLabel, ready, shouldTrack);
  }

  function renderGroupedIphone17Services(list, entry, lang) {
    const { groups, standalone } = groupRepairOptions(entry.repairs);
    let defaultSelection = null;

    groups.forEach((group, groupIndex) => {
      const groupLabel = resolveI18n(lang, group.key) || group.key;
      const groupEl = document.createElement("section");
      const titleId = `price-repair-${slugifyPriceModel(entry.model)}-${group.key}`;
      groupEl.className = "price-repair-group";
      groupEl.setAttribute("role", "group");
      groupEl.setAttribute("aria-labelledby", titleId);
      groupEl.style.setProperty("--row-index", groupIndex);

      const head = document.createElement("div");
      head.className = "price-repair-group__head";

      const title = document.createElement("strong");
      title.className = "price-repair-group__title";
      title.id = titleId;
      title.textContent = groupLabel;

      const included = document.createElement("small");
      included.className = "price-repair-group__included";
      included.textContent = resolveI18n(lang, "price_included_short") || "inkl. Einbau";

      head.append(title, included);
      groupEl.appendChild(head);

      const chips = document.createElement("div");
      chips.className = "price-quality-chips";
      chips.setAttribute("role", "group");
      chips.setAttribute("aria-label", groupLabel);

      const hint = document.createElement("div");
      hint.className = "price-quality-hint";
      const hintText = document.createElement("span");
      const stockSlot = document.createElement("span");
      stockSlot.className = "price-quality-stock";
      hint.append(hintText, stockSlot);

      sortRepairOptionsForDisplay(group.repairs).forEach((repair, repairIndex) => {
        const chipLabel = getRepairQualityChipLabel(repair, lang);
        const chip = document.createElement("button");
        chip.className = "price-quality-chip";
        chip.type = "button";
        chip.setAttribute("aria-pressed", "false");
        chip.setAttribute("aria-label", `${groupLabel} ${chipLabel} ${repair.price}`);

        const chipName = document.createElement("span");
        chipName.textContent = chipLabel;
        const chipPrice = document.createElement("strong");
        chipPrice.textContent = repair.price;
        chip.append(chipName, chipPrice);

        chip.addEventListener("click", () => {
          selectGroupedRepair(list, entry, groupEl, chip, hintText, stockSlot, repair, lang, true, true);
        });

        chips.appendChild(chip);
        if (!defaultSelection && groupIndex === 0 && repairIndex === 0) {
          defaultSelection = { groupEl, chip, hintText, stockSlot, repair };
        }
      });

      groupEl.append(chips, hint);
      list.appendChild(groupEl);
    });

    standalone.forEach((repair, index) => {
      renderFlatPriceServiceRow(list, entry, repair, groups.length + index, lang, false, "price-service-row--framed");
    });
    renderPriceQualityDetails(list, lang);

    if (defaultSelection) {
      selectGroupedRepair(
        list,
        entry,
        defaultSelection.groupEl,
        defaultSelection.chip,
        defaultSelection.hintText,
        defaultSelection.stockSlot,
        defaultSelection.repair,
        lang,
        false,
        false,
      );
      return;
    }

    if (standalone[0]) {
      applyPriceRepairSelection(entry, standalone[0], lang, getRepairLabel(standalone[0], lang), false, false);
    }
  }

  function renderPriceServices(entry, lang) {
    const list = document.querySelector("[data-price-services]");
    if (!list || !entry) return;

    list.innerHTML = "";
    selectedPriceRepair = null;
    setPriceCtaReady(false);

    if (entry.family === "iPhone 17") {
      renderGroupedIphone17Services(list, entry, lang);
      return;
    }

    entry.repairs.forEach((repair, index) => {
      renderFlatPriceServiceRow(list, entry, repair, index, lang);
    });
    renderPriceSeriesNotes(list, entry, lang);

    const defaultRepair = entry.repairs[0];
    if (defaultRepair) {
      applyPriceRepairSelection(entry, defaultRepair, lang, getRepairLabel(defaultRepair, lang), false, false);
    }
  }

  function renderPriceSelection() {
    const familySelect = document.querySelector("[data-price-family]");
    const modelSelect = document.querySelector("[data-price-model]");
    if (!familySelect || !modelSelect) return;

    const lang = getLang();
    const entries = getPriceEntries().filter((entry) => entry.brand === selectedPriceBrand);
    const models = sortPriceModelsForDisplay(entries.filter((entry) => entry.family === familySelect.value));
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
    renderPriceModelButtons(models, entry);

    updatePricePreview(entry);

    renderPriceServices(entry, lang);
    updatePriceCta(entry);
  }

  function renderPrices() {
    const familySelect = document.querySelector("[data-price-family]");
    const modelSelect = document.querySelector("[data-price-model]");
    if (!familySelect || !modelSelect) return;

    if (selectedPriceBrand === "samsung") selectedPriceBrand = "apple";
    setPriceSelectorMode(selectedPriceBrand);

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

    const preferredStartFamily = selectedPriceBrand === "apple" ? "iPhone 12" : "Galaxy S24";

    familySelect.value = families.some((item) => item.family === currentFamily)
      ? currentFamily
      : (families.find((item) => item.family === preferredStartFamily) || families[0])?.family;

    renderPriceSelection();
  }

  function initPriceSelector() {
    const familySelect = document.querySelector("[data-price-family]");
    const modelSelect = document.querySelector("[data-price-model]");
    const cta = document.querySelector("[data-price-cta]");
    const samsungSearch = document.querySelector("[data-samsung-model-search]");
    const samsungCta = document.querySelector("[data-samsung-cta]");
    const brandButtons = document.querySelectorAll("[data-price-brand]");
    const shippingButtons = document.querySelectorAll("[data-price-shipping-mode]");
    if (!familySelect || !modelSelect) return;

    brandButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const brand = button.dataset.priceBrand || "apple";
        if (brand === "samsung") {
          trackEvent("brand_select", { brand });
          openSamsungModal(button);
          return;
        }
        selectedPriceBrand = brand;
        setBrandButtonState(selectedPriceBrand);
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
    shippingButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const mode = button.dataset.priceShippingMode === "shipping" ? "shipping" : "local";
        if (selectedPriceDeliveryMode === mode) return;
        selectedPriceDeliveryMode = mode;
        updatePriceShippingUi();
        updatePriceCta(getCurrentPriceEntry());
        updateSamsungSummary();
        trackEvent("shipping_price_mode_select", { mode });
      });
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
      if (selectedPriceDeliveryMode === "shipping") {
        trackEvent("shipping_whatsapp_click", {
          source: "prices",
          brand: entry?.brand,
          model: entry?.model,
          repair: selectedPriceRepair?.label || "general",
        });
      }
    });
    samsungSearch?.addEventListener("input", () => {
      selectedSamsungOtherDevice = null;
      renderSamsungConfigurator();
    });
    document.querySelectorAll("[data-samsung-modal-close]").forEach((button) => {
      button.addEventListener("click", closeSamsungModal);
    });
    document.querySelector("[data-samsung-back]")?.addEventListener("click", goToPreviousSamsungStep);
    document.querySelector("[data-samsung-next]")?.addEventListener("click", goToNextSamsungStep);
    document.addEventListener("keydown", (event) => {
      if (!isSamsungModalOpen()) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeSamsungModal();
        return;
      }
      trapSamsungModalFocus(event);
    });
    samsungCta?.addEventListener("click", () => {
      const state = getSamsungSummaryState();
      samsungCta.href = buildSamsungWaHref();
      trackEvent("samsung_price_whatsapp_click", {
        device: state.device,
        series: state.series,
        model: state.model,
        repair: state.repair,
        price: state.price,
      });
      if (selectedPriceDeliveryMode === "shipping") {
        trackEvent("shipping_whatsapp_click", {
          source: "samsung_modal",
          model: state.model,
          repair: state.repair,
        });
      }
    });

    renderPrices();
    updatePriceShippingUi();
  }

  function initBundles() {
    document.querySelectorAll(".bundle__item").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!whatsappNumber) return;
        const lang = getLang();
        const bundle = btn.textContent.trim();
        const msg = formatI18n(lang, "bundle_message", { bundle, city });
        window.open(buildWhatsAppHref(msg), "_blank");
      });
    });
  }

  function initPickupButton() {
    const btn = document.getElementById("btnPickup");
    if (!btn || !whatsappNumber) return;
    btn.addEventListener("click", () => {
      const lang = getLang();
      const msg = formatI18n(lang, "pickup_message", { city });
      window.open(buildWhatsAppHref(msg), "_blank");
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

      const resultText = {
        battery: resolveI18n(lang, "quiz_result_battery"),
        port: resolveI18n(lang, "quiz_result_port"),
        display: resolveI18n(lang, "quiz_result_display"),
      };
      const result = resultText[resultKey] || resultText.battery;
      const hint = resolveI18n(lang, "quiz_result_hint");

      document.getElementById("quizResultBadge").textContent = result;
      document.getElementById("quizResultText").textContent = hint;

      const msg = `${resolveI18n(lang, "wa_message_intro")} ${resolveI18n(lang, "quiz_label")}: ${result} | ${resolveI18n(lang, "wa_label_city")}: ${city}`;

      document.getElementById("quizResultWA").href = buildWhatsAppHref(msg);

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

  function closeLanguagePickers() {
    document.querySelectorAll("[data-language-picker].is-open").forEach((picker) => {
      picker.classList.remove("is-open");
      picker.querySelector("[data-lang-trigger]")?.setAttribute("aria-expanded", "false");
    });
    document.body.classList.remove("language-sheet-open");
  }

  function updateLanguagePickers(lang) {
    const meta = getLanguageMeta(lang);
    document.querySelectorAll("[data-language-picker]").forEach((picker) => {
      picker.querySelector("[data-lang-current]")?.replaceChildren(document.createTextNode(meta.short));
      picker.querySelector("[data-lang-current-name]")?.replaceChildren(document.createTextNode(meta.nativeName));
      picker.querySelector("[data-lang-search]")?.setAttribute("placeholder", resolveI18n(lang, "language_search_placeholder"));
      picker.querySelector("[data-lang-trigger]")?.setAttribute("aria-label", `${resolveI18n(lang, "language_picker_label")}: ${meta.nativeName}`);
      picker.querySelector("[data-lang-title]")?.replaceChildren(document.createTextNode(resolveI18n(lang, "language_picker_label")));
      picker.querySelector("[data-lang-empty]")?.replaceChildren(document.createTextNode(resolveI18n(lang, "language_no_results")));
      picker.querySelectorAll("[data-lang-option]").forEach((option) => {
        const selected = option.dataset.langOption === meta.code;
        option.classList.toggle("is-active", selected);
        option.setAttribute("aria-selected", selected ? "true" : "false");
      });
    });
  }

  function filterLanguageOptions(picker, query) {
    const normalizedQuery = String(query || "").trim().toLowerCase();
    let visible = 0;
    picker.querySelectorAll("[data-lang-option]").forEach((option) => {
      const haystack = option.getAttribute("data-search") || "";
      const isVisible = !normalizedQuery || haystack.includes(normalizedQuery);
      option.hidden = !isVisible;
      if (isVisible) visible += 1;
    });
    const empty = picker.querySelector("[data-lang-empty]");
    if (empty) empty.hidden = visible > 0;
  }

  function renderLanguagePicker(picker, index) {
    if (picker.dataset.languagePickerReady === "true") return;
    picker.dataset.languagePickerReady = "true";
    picker.setAttribute("data-language-picker", "");

    const panelId = `language-panel-${index + 1}`;
    const current = getLanguageMeta(getLang());
    picker.innerHTML = `
      <button class="lang__trigger" type="button" data-lang-trigger aria-haspopup="listbox" aria-expanded="false" aria-controls="${panelId}">
        <span class="lang__globe" aria-hidden="true"></span>
        <span class="lang__current" data-lang-current>${current.short}</span>
        <span class="lang__current-name" data-lang-current-name>${current.nativeName}</span>
        <span class="lang__chevron" aria-hidden="true"></span>
      </button>
      <div class="lang__panel" id="${panelId}" data-lang-panel>
        <div class="lang__sheet-head">
          <strong data-lang-title>${resolveI18n(getLang(), "language_picker_label")}</strong>
          <button class="lang__close" type="button" data-lang-close aria-label="Close">×</button>
        </div>
        <label class="sr-only" for="${panelId}-search">${resolveI18n(getLang(), "language_search_placeholder")}</label>
        <input class="lang__search" id="${panelId}-search" type="search" autocomplete="off" data-lang-search placeholder="${resolveI18n(getLang(), "language_search_placeholder")}">
        <div class="lang__list" role="listbox" aria-label="${resolveI18n(getLang(), "language_picker_label")}">
          ${LANGUAGES.map((language) => `
            <button class="lang__option" type="button" role="option" data-lang-option="${language.code}" data-search="${`${language.code} ${language.short} ${language.name} ${language.nativeName} ${language.search}`.toLowerCase()}">
              <span class="lang__option-code">${language.short}</span>
              <span class="lang__option-text"><strong>${language.nativeName}</strong><small>${language.name}</small></span>
              <span class="lang__check" aria-hidden="true"></span>
            </button>
          `).join("")}
        </div>
        <p class="lang__empty" data-lang-empty hidden>${resolveI18n(getLang(), "language_no_results")}</p>
      </div>
    `;

    const trigger = picker.querySelector("[data-lang-trigger]");
    const search = picker.querySelector("[data-lang-search]");

    trigger?.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !picker.classList.contains("is-open");
      closeLanguagePickers();
      if (!willOpen) return;
      picker.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      document.body.classList.add("language-sheet-open");
      window.setTimeout(() => search?.focus({ preventScroll: true }), 60);
      trackEvent("language_open", { lang: getLang(), location: getClickLocation(picker) });
    });

    picker.querySelector("[data-lang-close]")?.addEventListener("click", closeLanguagePickers);
    search?.addEventListener("input", () => filterLanguageOptions(picker, search.value));
    picker.querySelectorAll("[data-lang-option]").forEach((option) => {
      option.addEventListener("click", () => {
        setLang(option.dataset.langOption, "manual");
        closeLanguagePickers();
      });
    });

    updateLanguagePickers(getLang());
  }

  function initLangButtons() {
    document.querySelectorAll(".lang").forEach((picker, index) => {
      renderLanguagePicker(picker, index);
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest?.("[data-language-picker]")) closeLanguagePickers();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLanguagePickers();
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
        if ((summary.dataset.i18n || "").startsWith("faq_shipping_")) {
          trackEvent("shipping_faq_toggle", {
            question: summary.textContent.trim(),
            open: willOpen,
          });
        }
      });
    });
  }

  function initAnalyticsTracking() {
    document.addEventListener("click", (event) => {
      const finderLink = event.target.closest?.("[data-model-finder-link]");
      if (finderLink) {
        trackEvent("model_finder_open", {
          location: finderLink.closest(".price-selector-head") ? "prices_header" : "content",
          href: finderLink.href,
        });
      }

      const phoneLink = event.target.closest?.('a[href^="tel:"]');
      if (phoneLink) {
        trackEvent("phone_click", {
          location: getClickLocation(phoneLink),
          label: phoneLink.textContent.trim(),
          phone: phoneLink.getAttribute("href").replace(/^tel:/, ""),
        });
      }

      const waLink = event.target.closest?.('a[href*="wa.me"]');
      if (!waLink) return;
      trackEvent("whatsapp_click", {
        location: getClickLocation(waLink),
        label: waLink.textContent.trim(),
        href: waLink.href,
      });
    });

    document.addEventListener("submit", (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      trackEvent("contact_form_submit", {
        location: getClickLocation(form),
        id: form.id || undefined,
        name: form.getAttribute("name") || undefined,
        method: (form.getAttribute("method") || "get").toLowerCase(),
        action: form.getAttribute("action") || window.location.pathname,
      });
    });
  }

  function initPageTransitionToPrices() {
    const key = "hn_price_transition_v1";
    const transitionMs = 330;
    const arrivalMs = 700;
    const isPricesPath = (url) => url.pathname.endsWith("/prices.html");
    const isCurrentPricesPage = isPricesPath(window.location);

    if (isCurrentPricesPage) {
      let hadTransition = false;
      try {
        hadTransition = sessionStorage.getItem(key) === "1";
        sessionStorage.removeItem(key);
      } catch (error) {}

      if (hadTransition || document.documentElement.classList.contains("price-transition-arriving")) {
        trackEvent("price_transition_arrive", { path: window.location.pathname });
        window.setTimeout(() => {
          document.documentElement.classList.remove("price-transition-arriving");
        }, arrivalMs);
      }
    }

    document.addEventListener("click", (event) => {
      const link = event.target.closest?.("a[href]");
      if (!link || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.hasAttribute("download")) return;
      if (link.target && link.target !== "_self") return;

      const href = link.getAttribute("href") || "";
      if (!href || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:")) return;

      let targetUrl;
      try {
        targetUrl = new URL(link.href, window.location.href);
      } catch (error) {
        return;
      }

      if (targetUrl.origin !== window.location.origin) return;
      if (!isPricesPath(targetUrl)) return;
      if (targetUrl.hash) return;

      if (prefersReducedMotion) return;
      event.preventDefault();

      if (document.body.classList.contains("price-transition-active")) return;
      document.body.classList.add("price-transition-active");

      try {
        sessionStorage.setItem(key, "1");
      } catch (error) {}

      trackEvent("price_transition_start", {
        from: window.location.pathname,
        to: targetUrl.pathname,
        location: getClickLocation(link),
        label: link.textContent.trim(),
      });

      const overlay = document.createElement("div");
      const content = document.createElement("div");
      const mark = document.createElement("span");
      const text = document.createElement("span");

      overlay.className = "page-transition";
      overlay.setAttribute("aria-hidden", "true");
      content.className = "page-transition__content";
      mark.className = "page-transition__price-mark";
      mark.textContent = "€";
      text.className = "page-transition__text";
      text.textContent = resolveI18n(getLang(), "price_transition_text") || "Reparaturpreise werden geöffnet";

      content.append(mark, text);
      overlay.append(content);
      document.body.append(overlay);

      window.setTimeout(() => {
        window.location.href = targetUrl.href;
      }, transitionMs);
    });
  }

  function initPriceReminder() {
    const reminder = document.querySelector("[data-price-reminder]");
    if (!reminder) return;

    const path = window.location.pathname.replace(/\/+$/, "");
    const isHome = path === "" || path.endsWith("/index.html");
    if (!isHome) return;

    const storageKey = "hn_price_reminder_dismissed_v1";
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(storageKey) === "1";
    } catch (error) {}
    if (dismissed) return;

    const link = reminder.querySelector("a[href]");
    const close = reminder.querySelector("[data-price-reminder-close]");
    let timer = null;
    let observer = null;
    let cookieObserver = null;
    const controller = new AbortController();
    let shown = false;

    function cleanup() {
      if (timer) window.clearTimeout(timer);
      timer = null;
      observer?.disconnect();
      observer = null;
      cookieObserver?.disconnect();
      cookieObserver = null;
      controller.abort();
    }

    function cookieBannerVisible() {
      const banner = document.querySelector("[data-cookie-consent]");
      return Boolean(banner && banner.isConnected && !document.body.classList.contains("intro-pending"));
    }

    function showReminder() {
      if (shown) return;
      try {
        if (sessionStorage.getItem(storageKey) === "1") return;
      } catch (error) {}
      if (cookieBannerVisible()) {
        waitForCookieConsent();
        return;
      }
      shown = true;
      reminder.hidden = false;
      requestAnimationFrame(() => reminder.classList.add("is-visible"));
      trackEvent("price_reminder_show", { delay_ms: 10000 });
    }

    function startTimer() {
      if (timer) return;
      timer = window.setTimeout(() => {
        timer = null;
        showReminder();
      }, 10000);
    }

    function waitForCookieConsent() {
      if (!cookieBannerVisible()) {
        startTimer();
        return;
      }
      if (cookieObserver) return;
      cookieObserver = new MutationObserver(() => {
        if (cookieBannerVisible()) return;
        cookieObserver?.disconnect();
        cookieObserver = null;
        startTimer();
      });
      cookieObserver.observe(document.body, { childList: true, subtree: true, attributes: true });
    }

    function waitUntilVisible() {
      if (!document.body.classList.contains("intro-pending")) {
        if (cookieBannerVisible()) waitForCookieConsent();
        else startTimer();
        return;
      }

      observer = new MutationObserver(() => {
        if (document.body.classList.contains("intro-pending")) return;
        observer?.disconnect();
        observer = null;
        if (cookieBannerVisible()) waitForCookieConsent();
        else startTimer();
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    }

    close?.addEventListener("click", () => {
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch (error) {}
      reminder.classList.remove("is-visible");
      window.setTimeout(() => {
        reminder.hidden = true;
      }, prefersReducedMotion ? 0 : 220);
      trackEvent("price_reminder_dismiss", { location: getClickLocation(reminder) });
      cleanup();
    }, { signal: controller.signal });

    link?.addEventListener("click", () => {
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch (error) {}
      trackEvent("price_reminder_click", { location: getClickLocation(reminder) });
      cleanup();
    }, { signal: controller.signal });

    window.addEventListener("pagehide", cleanup, { once: true, signal: controller.signal });

    waitUntilVisible();
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

  function initLogoIntro() {
    const overlay = document.querySelector("[data-logo-intro]");
    if (!overlay) return;

    const key = config.logoIntroSessionKey || "hn_logo_intro_seen_v1";
    const mark = overlay.querySelector("[data-logo-intro-mark]");
    const title = overlay.querySelector("[data-logo-intro-title]");
    const headerLogo = document.querySelector(".brand__logo");
    const skipButton = overlay.querySelector("[data-logo-intro-skip]");
    let gsap = window.gsap;

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(key) === "1";
    } catch (error) {}

    function clearInlineFallback() {
      if (window.HN_logoIntroFallback) {
        window.clearTimeout(window.HN_logoIntroFallback);
        window.HN_logoIntroFallback = null;
      }
    }

    function revealImmediately(reason) {
      clearInlineFallback();
      if (reason === "fallback") {
        rememberSession();
      }
      document.body.classList.remove("intro-pending");
      document.body.classList.add("intro-complete");
      overlay.remove();
      if (reason !== "seen") {
        trackEvent("logo_intro_skip", { reason });
      }
    }

    if (!config.logoIntro || alreadySeen || prefersReducedMotion || !mark || !headerLogo) {
      revealImmediately(!config.logoIntro ? "disabled" : alreadySeen ? "seen" : prefersReducedMotion ? "reduced_motion" : "fallback");
      return;
    }

    if (!gsap) {
      if (window.HN_GSAP_FAILED) {
        revealImmediately("fallback");
        return;
      }

      document.body.classList.add("intro-pending");
      clearInlineFallback();

      let waitDone = false;
      const finishWait = (ready) => {
        if (waitDone || !overlay.isConnected) return;
        waitDone = true;
        gsap = window.gsap;
        if (ready && gsap) {
          initLogoIntro();
        } else {
          revealImmediately("fallback");
        }
      };

      window.addEventListener("hn:gsap-ready", () => finishWait(true), { once: true });
      window.addEventListener("hn:gsap-failed", () => finishWait(false), { once: true });
      window.setTimeout(() => finishWait(Boolean(window.gsap)), 950);
      return;
    }

    document.body.classList.add("intro-pending");
    clearInlineFallback();

    let done = false;
    let timeline;
    const fallbackTimer = window.setTimeout(() => completeIntro("timeout"), 5600);

    function rememberSession() {
      try {
        sessionStorage.setItem(key, "1");
      } catch (error) {}
    }

    function completeIntro(reason) {
      if (done) return;
      done = true;
      window.clearTimeout(fallbackTimer);
      rememberSession();
      timeline?.kill();
      gsap.set(headerLogo, { clearProps: "all" });
      document.body.classList.remove("intro-pending");
      document.body.classList.add("intro-complete");
      overlay.classList.add("is-complete");
      window.setTimeout(() => overlay.remove(), reason === "animated" ? 460 : 120);
      trackEvent(reason === "skip" ? "logo_intro_skip" : "logo_intro_complete", { reason });
    }

    function getFlightTarget() {
      const markRect = mark.getBoundingClientRect();
      const targetRect = headerLogo.getBoundingClientRect();
      const markCenterX = markRect.left + markRect.width / 2;
      const markCenterY = markRect.top + markRect.height / 2;
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;

      return {
        x: targetCenterX - markCenterX,
        y: targetCenterY - markCenterY,
        scale: Math.max(0.12, targetRect.width / markRect.width),
      };
    }

    function prepareTitleChars() {
      if (!title) return [];
      if (!title.dataset.logoIntroSplit) {
        const text = title.textContent.trim();
        title.textContent = "";
        Array.from(text).forEach((char) => {
          const span = document.createElement("span");
          span.className = char === " " ? "logo-intro__title-char logo-intro__title-char--space" : "logo-intro__title-char";
          span.textContent = char === " " ? "\u00a0" : char;
          title.appendChild(span);
        });
        title.dataset.logoIntroSplit = "true";
      }
      return title.querySelectorAll(".logo-intro__title-char");
    }

    function playIntro() {
      if (done) return;

      let flight = { x: 0, y: 0, scale: 0.16 };
      const orb = overlay.querySelector(".logo-intro__orb");
      const shine = overlay.querySelector(".logo-intro__shine");
      const lights = overlay.querySelectorAll(".logo-intro__light");
      const titleChars = prepareTitleChars();

      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set(mark, { autoAlpha: 0.68, scale: 0.84, y: 18, transformOrigin: "50% 50%" });
      gsap.set(orb, { autoAlpha: 0.72, scale: 0.84 });
      gsap.set(lights, { autoAlpha: 0, x: -40 });
      gsap.set(shine, { autoAlpha: 0, x: 0 });
      if (title) {
        gsap.set(title, {
          "--title-sweep-x": "-135%",
          autoAlpha: 0.88,
          y: 8,
          scale: 0.98,
          filter: "blur(0px)",
          transformOrigin: "50% 50%",
        });
        gsap.set(titleChars, {
          autoAlpha: 0.9,
          y: 3,
          scale: 0.98,
          filter: "blur(0px)",
          transformOrigin: "50% 50%",
        });
      }

      timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .to(orb, { autoAlpha: 1, scale: 1, duration: 0.72 }, 0)
        .to(mark, { autoAlpha: 1, scale: 1, y: 0, duration: 0.78, ease: "back.out(1.35)" }, 0.08);

      if (title) {
        timeline
          .to(title, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.54 }, 0.34)
          .to(titleChars, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.46,
            ease: "back.out(1.7)",
            stagger: { each: 0.018, from: "center" },
          }, 0.42)
          .to(title, { "--title-sweep-x": "145%", duration: 0.76, ease: "power2.inOut" }, 0.58)
          .to(title, { scale: 1.045, duration: 0.22, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.82)
          .to(title, { autoAlpha: 0, y: -12, scale: 0.94, filter: "blur(10px)", duration: 0.34, ease: "power2.in" }, 1.32);
      }

      timeline
        .to(lights, { autoAlpha: 0.82, x: 0, duration: 0.64, stagger: 0.12 }, 0.16)
        .to(shine, { autoAlpha: 0.9, x: "310%", duration: 0.82, ease: "power2.inOut" }, 0.62)
        .to(mark, { scale: 1.055, duration: 0.42, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.86)
        .to(lights, { autoAlpha: 0, duration: 0.36 }, 1.3)
        .add(() => {
          flight = getFlightTarget();
          gsap.set(headerLogo, { autoAlpha: 0, scale: 0.72 });
        }, 1.58)
        .to(mark, {
          x: () => flight.x,
          y: () => flight.y,
          scale: () => flight.scale,
          duration: 0.92,
          ease: "power3.inOut",
          filter: "drop-shadow(0 8px 18px rgba(0,0,0,.28)) drop-shadow(0 0 0 rgba(101,199,255,0))",
        }, 1.62)
        .to(orb, { autoAlpha: 0, scale: 1.18, duration: 0.55, ease: "power2.inOut" }, 1.72)
        .add(() => {
          document.body.classList.remove("intro-pending");
          document.body.classList.add("intro-complete");
          gsap.set(headerLogo, { clearProps: "all" });
        }, 2.3)
        .to(overlay, { autoAlpha: 0, duration: 0.42, ease: "power2.out" }, 2.34)
        .add(() => completeIntro("animated"));
    }

    skipButton?.addEventListener("click", () => completeIntro("skip"), { once: true });

    const image = mark.querySelector("img");
    if (image?.decode) {
      image.decode().then(playIntro).catch(playIntro);
    } else {
      playIntro();
    }
  }

  function initShippingService() {
    const page = document.querySelector("[data-shipping-page]");
    if (!page) return;

    trackEvent("shipping_page_view", { path: window.location.pathname });

    document.querySelectorAll("[data-shipping-cta]").forEach((link) => {
      link.addEventListener("click", () => {
        const source = link.dataset.shippingCta || getClickLocation(link);
        trackEvent("shipping_cta_click", { source });
        if (link.href && link.href.includes("wa.me")) {
          trackEvent("shipping_whatsapp_click", { source });
        }
      });
    });

    document.querySelectorAll("[data-shipping-checklist]").forEach((details) => {
      details.addEventListener("toggle", () => {
        if (details.open) {
          trackEvent("shipping_packing_checklist_open", { location: getClickLocation(details) });
        }
      });
    });

    page.querySelectorAll(".shipping-faq details").forEach((details) => {
      details.addEventListener("toggle", () => {
        trackEvent("shipping_faq_toggle", {
          question: details.querySelector("summary")?.textContent?.trim() || "",
          open: details.open,
        });
      });
    });
  }

  function setLang(lang, source = "manual") {
    const code = normalizeLang(lang) || defaultLang;
    currentLang = code;

    if (source === "manual") {
      try {
        localStorage.setItem("hn_lang", code);
      } catch (error) {}
      trackEvent("language_select", { lang: code, source });
    }

    applyTranslations(code);
    updateSearchPlaceholders(code);
    updateQuickWA(code);
    updateLiveBadge();
    if (document.querySelector(".js-prices-section")) renderPrices();
    window.dispatchEvent(new CustomEvent("hn:language-change", { detail: { lang: code, source } }));
  }

  initHeaderShadow();
  initLogoIntro();
  initThemeSystem();
  initLangButtons();
  initCookieConsent();
  initReveal();
  initFaqAccordion();
  initAnalyticsTracking();
  initPageTransitionToPrices();
  initShippingService();
  initPriceReminder();
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

  const storedLang = getStoredLang();
  setLang(storedLang || detectInitialLang(), storedLang ? "stored" : "auto");

  if (document.getElementById("liveBadge")) {
    setInterval(updateLiveBadge, 60000);
  }
})();
