(() => {
  const config = window.HN_CONFIG || {};
  const i18n = window.HN_I18N || {};
  const htmlKeys = new Set(config.htmlKeys || []);
  const requestedDefaultLang = config.defaultLang || "de";
  const whatsappNumber = config.whatsappNumber || "";
  const city = config.city || "";
  const serviceWorkerPath = config.serviceWorkerPath || "";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  const defaultLang = normalizeLang(requestedDefaultLang) || "de";

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
      map_title: "So läuft die Übergabe",
      map_text: "Bis ein eigener Laden geöffnet ist, läuft alles flexibel nach kurzer Absprache.",
      map_placeholder: "Singen & Umgebung",
      service_area_text: "Ich repariere vorbereitet zu Hause und kann innerhalb Singen persönlich vorbeikommen oder eine Übergabe vereinbaren.",
      map_hint: "Bitte zuerst per WhatsApp Modell, Schaden und gewünschte Übergabe schreiben.",
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
      price_selector_subtitle: "Wähle dein Gerät und sieh dir die voraussichtlichen Preise für gängige Reparaturen an.",
      price_selector_card_eyebrow: "Preise sofort prüfen",
      price_selector_trust_note: "Daten bleiben erhalten",
      price_selector_card_title: "Gerät auswählen",
      price_selector_family_label: "Gerätetyp",
      price_selector_model_label: "Modell",
      price_selector_selected_label: "Ausgewähltes Gerät",
      price_selector_services_title: "Verfügbare Reparaturen",
      price_selector_estimate_label: "voraussichtlich",
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
      map_title: "Як проходить передача",
      map_text: "Поки власний магазин ще не відкритий, усе гнучко за короткою домовленістю.",
      map_placeholder: "Singen та околиці",
      service_area_text: "Я ремонтую підготовлено вдома і можу особисто приїхати в межах Singen або домовитись про передачу.",
      map_hint: "Спочатку напишіть у WhatsApp модель, проблему та бажаний спосіб передачі.",
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
      price_selector_subtitle: "Оберіть пристрій і перегляньте орієнтовні ціни на популярні ремонти.",
      price_selector_card_eyebrow: "Швидка перевірка цін",
      price_selector_trust_note: "Дані зберігаються",
      price_selector_card_title: "Оберіть пристрій",
      price_selector_family_label: "Тип пристрою",
      price_selector_model_label: "Модель",
      price_selector_selected_label: "Обраний пристрій",
      price_selector_services_title: "Доступні ремонти",
      price_selector_estimate_label: "орієнтовно",
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
      map_title: "How handover works",
      map_text: "Until my own shop opens, everything is flexible after a short agreement.",
      map_placeholder: "Singen & nearby",
      service_area_text: "I repair prepared at home and can come personally within Singen or arrange a handover.",
      map_hint: "Please first send model, damage and preferred handover by WhatsApp.",
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
      price_selector_subtitle: "Choose your device and see estimated prices for common repairs.",
      price_selector_card_eyebrow: "Check prices instantly",
      price_selector_trust_note: "Your data stays safe",
      price_selector_card_title: "Choose your device",
      price_selector_family_label: "Device type",
      price_selector_model_label: "Model",
      price_selector_selected_label: "Selected device",
      price_selector_services_title: "Available repairs",
      price_selector_estimate_label: "estimated",
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
      price_selector_subtitle: "Выберите устройство и посмотрите ориентировочные цены на частые ремонты.",
      price_model_finder_btn: "Найти модель iPhone",
      price_selector_card_eyebrow: "Быстрая проверка цен",
      price_selector_trust_note: "Данные сохраняются",
      price_selector_card_title: "Выберите устройство",
      price_selector_family_label: "Тип устройства",
      price_selector_model_label: "Модель",
      price_selector_selected_label: "Выбранное устройство",
      price_selector_services_title: "Доступные ремонты",
      price_selector_estimate_label: "примерно",
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
      price_selector_subtitle: "Wybierz urządzenie i zobacz orientacyjne ceny popularnych napraw.",
      price_model_finder_btn: "Znajdź model iPhone",
      price_selector_card_title: "Wybierz urządzenie",
      price_selector_family_label: "Typ urządzenia",
      price_selector_model_label: "Model",
      price_selector_selected_label: "Wybrane urządzenie",
      price_selector_services_title: "Dostępne naprawy",
      price_selector_estimate_label: "orientacyjnie",
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
      price_selector_subtitle: "Scegli il dispositivo e vedi i prezzi stimati delle riparazioni più comuni.",
      price_model_finder_btn: "Trova modello iPhone",
      price_selector_card_title: "Scegli dispositivo",
      price_selector_family_label: "Tipo dispositivo",
      price_selector_model_label: "Modello",
      price_selector_selected_label: "Dispositivo scelto",
      price_selector_services_title: "Riparazioni disponibili",
      price_selector_estimate_label: "stimato",
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
      price_selector_subtitle: "اختر جهازك وشاهد الأسعار التقريبية للإصلاحات الشائعة.",
      price_model_finder_btn: "اعرف موديل iPhone",
      price_selector_card_title: "اختر الجهاز",
      price_selector_family_label: "نوع الجهاز",
      price_selector_model_label: "الموديل",
      price_selector_selected_label: "الجهاز المختار",
      price_selector_services_title: "الإصلاحات المتاحة",
      price_selector_estimate_label: "تقريبي",
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
      price_selector_subtitle: "Amûra xwe hilbijêre û buhaya nêzîk a tamîrên gelemperî bibîne.",
      price_model_finder_btn: "Modela iPhone bibîne",
      price_selector_card_title: "Amûr hilbijêre",
      price_selector_family_label: "Cureyê amûrê",
      price_selector_model_label: "Model",
      price_selector_selected_label: "Amûra hilbijartî",
      price_selector_services_title: "Tamîrên berdest",
      price_selector_estimate_label: "nêzîk",
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
      price_selector_subtitle: "Choisissez votre appareil et voyez les prix estimés des réparations courantes.",
      price_model_finder_btn: "Trouver le modèle iPhone",
      price_selector_card_title: "Choisir l'appareil",
      price_selector_family_label: "Type d'appareil",
      price_selector_model_label: "Modèle",
      price_selector_selected_label: "Appareil choisi",
      price_selector_services_title: "Réparations disponibles",
      price_selector_estimate_label: "estimé",
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
      price_selector_subtitle: "Izberi napravo in poglej okvirne cene pogostih popravil.",
      price_model_finder_btn: "Najdi model iPhone",
      price_selector_card_title: "Izberi napravo",
      price_selector_family_label: "Tip naprave",
      price_selector_model_label: "Model",
      price_selector_selected_label: "Izbrana naprava",
      price_selector_services_title: "Razpoložljiva popravila",
      price_selector_estimate_label: "okvirno",
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
      map_title: "Как проходит передача",
      map_text: "Пока собственный магазин еще не открыт, все гибко после короткой договоренности.",
      map_placeholder: "Singen и окрестности",
      service_area_text: "Я ремонтирую подготовленно дома и могу лично приехать в пределах Singen или договориться о передаче.",
      map_hint: "Сначала напишите в WhatsApp модель, повреждение и желаемый способ передачи.",
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
      map_title: "Jak działa przekazanie",
      map_text: "Dopóki własny lokal nie zostanie otwarty, wszystko odbywa się elastycznie po krótkim uzgodnieniu.",
      map_placeholder: "Singen i okolice",
      service_area_text: "Naprawiam przygotowane urządzenia w domu i mogę osobiście podjechać w obrębie Singen albo umówić przekazanie.",
      map_hint: "Najpierw napisz na WhatsApp model, uszkodzenie i preferowany sposób przekazania.",
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
      map_title: "Come funziona la consegna",
      map_text: "Finché non sarà aperto un negozio, tutto resta flessibile dopo un breve accordo.",
      map_placeholder: "Singen e dintorni",
      service_area_text: "Riparo a casa con preparazione e posso venire personalmente entro Singen o concordare una consegna.",
      map_hint: "Prima invia su WhatsApp modello, danno e modalità di consegna desiderata.",
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
      map_title: "كيف يتم التسليم",
      map_text: "إلى أن يفتح المتجر الخاص، يتم كل شيء بمرونة بعد اتفاق قصير.",
      map_placeholder: "Singen والمنطقة المحيطة",
      service_area_text: "أصلح الأجهزة في المنزل بعد التحضير ويمكنني الحضور شخصيا داخل Singen أو الاتفاق على التسليم.",
      map_hint: "يرجى إرسال الموديل والعطل وطريقة التسليم المطلوبة عبر WhatsApp أولا.",
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
      map_title: "Radestkirin çawa ye",
      map_text: "Heta dikanek vekirî hebe, her tişt piştî lihevkirinek kurt bi fleksîbelî dimeşe.",
      map_placeholder: "Singen û derdor",
      service_area_text: "Ez li malê bi amadebûnê tamîr dikim û dikarim li hundirê Singen bi xwe werim an radestkirinê lihev bikin.",
      map_hint: "Ji kerema xwe pêşî model, zirar û awayê radestkirinê yê dixwazî bi WhatsApp binivîse.",
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
      map_title: "Comment fonctionne la remise",
      map_text: "Jusqu'à l'ouverture d'un magasin, tout reste flexible après un court accord.",
      map_placeholder: "Singen et environs",
      service_area_text: "Je répare à domicile avec préparation et peux venir personnellement dans Singen ou convenir d'une remise.",
      map_hint: "Veuillez d'abord envoyer le modèle, le dommage et le mode de remise souhaité par WhatsApp.",
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
      map_title: "Kako poteka predaja",
      map_text: "Dokler lastna trgovina še ni odprta, vse poteka prilagodljivo po kratkem dogovoru.",
      map_placeholder: "Singen in okolica",
      service_area_text: "Popravila pripravim doma in lahko osebno pridem znotraj Singen ali se dogovorimo za predajo.",
      map_hint: "Najprej pošlji model, poškodbo in želeni način predaje prek WhatsApp.",
    },
  };

  Object.entries(EXTRA_I18N).forEach(([lang, values]) => {
    GLOBAL_I18N[lang] = { ...GLOBAL_I18N.de, ...values };
  });
  Object.entries(SIMPLE_LANGUAGE_OVERRIDES).forEach(([lang, values]) => {
    GLOBAL_I18N[lang] = { ...GLOBAL_I18N.de, ...values, ...(HOME_SECTION_I18N[lang] || {}) };
  });

  const hasI18n = Object.keys(i18n).length > 0 || Object.keys(GLOBAL_I18N).length > 0;
  let currentLang = null;

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

  function getClickLocation(el) {
    if (!el?.closest) return "content";
    if (el.closest("header")) return "header";
    if (el.closest(".mobilebar")) return "mobilebar";
    if (el.closest(".float-wa")) return "floating_cta";
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

  function applyTranslations(lang) {
    if (!hasI18n) return;

    const code = normalizeLang(lang) || defaultLang;
    document.documentElement.lang = code;
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
    updateLanguagePickers(code);

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

  const PRICE_DATA = {
    apple: [
      { model: "iPhone Air", series: "iphone", family: "iPhone Air", image: "assets/phones/iphone-16.png", repairs: [{ key: "repair_original_battery", price: "149€", stock: "on_request" }] },
      { model: "iPhone 17 Pro Max", series: "iphone", family: "iPhone 17", image: "assets/phones/iphone-16-pro-max.png", repairs: [{ key: "repair_original_battery", price: "169€", stock: "on_request" }] },
      { model: "iPhone 17 Pro", series: "iphone", family: "iPhone 17", image: "assets/phones/iphone-16-pro.png", repairs: [{ key: "repair_original_battery", price: "149€", stock: "on_request" }] },
      { model: "iPhone 17", series: "iphone", family: "iPhone 17", image: "assets/phones/iphone-16.png", repairs: [{ key: "repair_original_battery", price: "139€", stock: "on_request" }] },
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
      { model: "iPhone 12 Pro Max", series: "iphone", repairs: [{ key: "repair_display", price: "149€" }, { key: "repair_battery", price: "79€" }, { key: "repair_original_battery", price: "99€", stock: "on_request" }, { key: "repair_backglass", price: "99€" }] },
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
    if (entry.customImage) return {};
    const slug = slugifyPriceModel(entry.model);
    return {
      webp: `assets/phones/optimized/${slug}-420.webp 420w, assets/phones/optimized/${slug}-800.webp 800w`,
      sizes: "(max-width: 560px) 92vw, (max-width: 820px) 430px, 390px",
    };
  }

  function getRepairLabel(repair, lang) {
    if (repair.key === "repair_display" && repair.variant) {
      return `${resolveI18n(lang, "repair_display") || "Display"} (${resolveI18n(lang, repair.variant) || repair.variant})`;
    }
    return resolveI18n(lang, repair.key) || repair.key;
  }

  function getPriceCtaText(lang) {
    return resolveI18n(lang, "price_selector_cta") || resolveI18n(lang, "wa_message_intro") || "Per WhatsApp anfragen";
  }

  function getStockLabel(stock, lang) {
    const labels = {
      available: resolveI18n(lang, "stock_available") || "Auf Lager",
      unavailable: resolveI18n(lang, "stock_unavailable") || "Nicht auf Lager",
      on_request: resolveI18n(lang, "stock_on_request") || "Verfügbarkeit prüfen",
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
    const stockLine = repair?.stock
      ? `\n${resolveI18n(lang, "wa_label_stock") || "Lager"}: ${getStockLabel(repair.stock, lang)}`
      : "";
    const repairLine = repair
      ? `${resolveI18n(lang, "wa_label_repair") || "Reparatur"}: ${repair.label}\n${resolveI18n(lang, "wa_label_price") || "Preis"}: ${repair.price}${stockLine}`
      : (resolveI18n(lang, "wa_repair_general") || "Reparatur: allgemeine Anfrage");

    const text = `${resolveI18n(lang, "wa_message_intro") || "Hallo!"}
${resolveI18n(lang, "wa_label_device") || "Modell"}: ${entry.model}
${repairLine}
${resolveI18n(lang, "wa_label_city") || "Ort"}: ${city}`;

    return buildWhatsAppHref(text);
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

      if (repair.key === "repair_original_battery") {
        const infoText = resolveI18n(lang, "repair_original_battery_info")
          || "Replacement battery for iPhone with 99–100% battery health. OEM Pull availability varies.";
        const infoEl = document.createElement("span");
        infoEl.className = "price-service-info";
        infoEl.setAttribute("aria-label", infoText);
        infoEl.setAttribute("title", infoText);
        infoEl.textContent = "i";
        labelEl.append(" ", infoEl);
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
  initLangButtons();
  initReveal();
  initFaqAccordion();
  initAnalyticsTracking();
  initPageTransitionToPrices();
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
