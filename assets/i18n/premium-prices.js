(() => {
  const translations = {
    de: {
      part_option_standard: "Geprüfte Standard-Option",
      part_option_standard_description: "Die genaue Teileausführung und Verfügbarkeit werden vor dem Auftrag bestätigt.",
      part_option_oem_pull: "Original / OEM Pull",
      part_option_oem_pull_description: "Originalteil aus einem anderen Gerät; Zustand und Verfügbarkeit werden vor dem Auftrag bestätigt.",
      part_option_premium: "Premium Aftermarket",
      part_option_budget: "Budget",
      service_handover: "Übergabe in Singen",
      service_mobile: "Mobile Reparatur",
      service_shipping: "Reparatur per Versand"
    },
    uk: {
      part_option_standard: "Перевірений стандартний варіант",
      part_option_standard_description: "Точний тип і наявність деталі підтверджуються до замовлення.",
      part_option_oem_pull: "Original / OEM Pull",
      part_option_oem_pull_description: "Оригінальна деталь з іншого пристрою; стан і наявність підтверджуються до замовлення.",
      part_option_premium: "Premium Aftermarket",
      part_option_budget: "Бюджетний варіант",
      service_handover: "Передача у Singen",
      service_mobile: "Мобільний ремонт",
      service_shipping: "Ремонт поштою"
    },
    en: {
      part_option_standard: "Tested standard option",
      part_option_standard_description: "The exact part specification and availability are confirmed before the order.",
      part_option_oem_pull: "Original / OEM Pull",
      part_option_oem_pull_description: "An original part from another device; condition and availability are confirmed before the order.",
      part_option_premium: "Premium aftermarket",
      part_option_budget: "Budget",
      service_handover: "Handover in Singen",
      service_mobile: "Mobile repair",
      service_shipping: "Mail-in repair"
    },
    ru: {
      part_option_standard: "Проверенный стандартный вариант",
      part_option_standard_description: "Точный тип и наличие детали подтверждаются до заказа.",
      part_option_oem_pull: "Original / OEM Pull",
      part_option_oem_pull_description: "Оригинальная деталь с другого устройства; состояние и наличие подтверждаются до заказа.",
      part_option_premium: "Premium Aftermarket",
      part_option_budget: "Бюджетный вариант",
      service_handover: "Передача в Singen",
      service_mobile: "Мобильный ремонт",
      service_shipping: "Ремонт по почте"
    },
    pl: {
      part_option_standard: "Sprawdzona opcja standardowa",
      part_option_standard_description: "Dokładny wariant części i dostępność potwierdzamy przed zleceniem.",
      part_option_oem_pull: "Original / OEM Pull",
      part_option_oem_pull_description: "Oryginalna część z innego urządzenia; stan i dostępność potwierdzamy przed zleceniem.",
      part_option_premium: "Premium aftermarket",
      part_option_budget: "Budżet",
      service_handover: "Przekazanie w Singen",
      service_mobile: "Naprawa mobilna",
      service_shipping: "Naprawa wysyłkowa"
    },
    it: {
      part_option_standard: "Opzione standard verificata",
      part_option_standard_description: "La variante esatta del ricambio e la disponibilità vengono confermate prima dell'ordine.",
      part_option_oem_pull: "Original / OEM Pull",
      part_option_oem_pull_description: "Ricambio originale proveniente da un altro dispositivo; condizioni e disponibilità vengono confermate prima dell'ordine.",
      part_option_premium: "Premium aftermarket",
      part_option_budget: "Economica",
      service_handover: "Consegna a Singen",
      service_mobile: "Riparazione mobile",
      service_shipping: "Riparazione tramite spedizione"
    },
    ar: {
      part_option_standard: "خيار قياسي مفحوص",
      part_option_standard_description: "يتم تأكيد مواصفات القطعة وتوفرها قبل الطلب.",
      part_option_oem_pull: "Original / OEM Pull",
      part_option_oem_pull_description: "قطعة أصلية من جهاز آخر؛ يتم تأكيد حالتها وتوفرها قبل الطلب.",
      part_option_premium: "قطعة بديلة ممتازة",
      part_option_budget: "اقتصادي",
      service_handover: "التسليم في Singen",
      service_mobile: "إصلاح متنقل",
      service_shipping: "إصلاح عبر الشحن"
    },
    ku: {
      part_option_standard: "Vebijarka standard a kontrolkirî",
      part_option_standard_description: "Cureya rast a parçeyê û berdestbûna wê berî siparişê tê pejirandin.",
      part_option_oem_pull: "Original / OEM Pull",
      part_option_oem_pull_description: "Parçeyek orîjînal ji amûreke din; rewş û berdestbûna wê berî siparişê tê pejirandin.",
      part_option_premium: "Premium aftermarket",
      part_option_budget: "Aborî",
      service_handover: "Radestkirin li Singen",
      service_mobile: "Tamîra mobîl",
      service_shipping: "Tamîra bi şandinê"
    },
    fr: {
      part_option_standard: "Option standard vérifiée",
      part_option_standard_description: "La variante exacte de la pièce et sa disponibilité sont confirmées avant la commande.",
      part_option_oem_pull: "Original / OEM Pull",
      part_option_oem_pull_description: "Pièce d'origine provenant d'un autre appareil ; son état et sa disponibilité sont confirmés avant la commande.",
      part_option_premium: "Premium adaptable",
      part_option_budget: "Économique",
      service_handover: "Remise à Singen",
      service_mobile: "Réparation mobile",
      service_shipping: "Réparation par envoi"
    },
    sl: {
      part_option_standard: "Preverjena standardna možnost",
      part_option_standard_description: "Natančno izvedbo dela in dobavljivost potrdimo pred naročilom.",
      part_option_oem_pull: "Original / OEM Pull",
      part_option_oem_pull_description: "Originalni del iz druge naprave; stanje in dobavljivost potrdimo pred naročilom.",
      part_option_premium: "Premium nadomestni del",
      part_option_budget: "Ugodna možnost",
      service_handover: "Predaja v Singen",
      service_mobile: "Mobilno popravilo",
      service_shipping: "Popravilo po pošti"
    }
  };

  const current = window.HN_I18N || {};
  Object.entries(translations).forEach(([lang, values]) => {
    current[lang] = { ...(current[lang] || {}), ...values };
  });
  window.HN_I18N = current;
})();
