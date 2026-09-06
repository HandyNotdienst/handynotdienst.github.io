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

  const premium = {
    de: {
      price_catalog_error_title: "Preise konnten nicht geladen werden", price_catalog_error_text: "Schreib uns dein Modell und den Schaden direkt per WhatsApp.", price_catalog_error_cta: "Per WhatsApp anfragen",
      price_preview_facts_label: "Wichtige Reparaturhinweise", price_fact_data: "Daten normalerweise erhalten", price_fact_duration: "Dauer wird vorab bestätigt", price_fact_warranty: "Garantie vor Auftrag geklärt",
      price_detail_eyebrow: "Reparatur konfigurieren", price_detail_title: "Qualität und Serviceweg wählen", price_detail_text: "Du siehst nur bestätigte Optionen. Endpreis und Verfügbarkeit werden vor dem Auftrag nochmals geprüft.",
      price_priority_legend: "Was ist dir wichtig?", price_priority_quality: "Beste verfügbare Qualität", price_priority_quality_hint: "Bevorzugt Original/OEM Pull, wenn bestätigt.", price_priority_value: "Preis und Qualität", price_priority_value_hint: "Empfohlene Balance aus Preis und Teileoption.", price_priority_budget: "Niedrigster Preis", price_priority_budget_hint: "Wählt die günstigste bestätigte Option.",
      price_quality_title: "Teilequalität wählen", price_quality_single_title: "Bestätigte Teileoption", price_recommended: "Empfohlen", price_status_button: "Status und Hinweise",
      price_compare_title: "Teileoptionen vergleichen", price_compare_feature: "Merkmal", price_compare_technology: "Technologie", price_compare_stock: "Verfügbarkeit", price_compare_price: "Preis inkl. Einbau", price_technology_unspecified: "Nicht pauschal bestätigt", price_technology_soft_oled: "Soft OLED", price_not_confirmed: "Nicht bestätigt", price_option_count: "{count} bestätigte Optionen", price_from: "ab",
      price_service_title: "Wie kommt das Gerät zur Reparatur?", service_handover_text: "Nach kurzer WhatsApp-Abstimmung, ohne Anfahrtskosten.", service_mobile_text: "Standort prüfen; je nach Fahrstrecke 0, 10 oder 20 Euro.", service_shipping_text: "Du zahlst den Hinversand; wir den verfolgten Rückversand.", price_included: "Inklusive", service_mobile_check: "Prüfen", service_mobile_pending: "Standort noch nicht geprüft; mögliche Anfahrt wird vor dem Auftrag bestätigt.", service_mobile_selected: "{distance} km Fahrstrecke, Anfahrt {fee}.",
      price_breakdown_title: "Dein Preisüberblick", price_breakdown_repair: "Reparatur und Teil", price_breakdown_total: "Gesamt", price_shipping_cost_note: "Deine Kosten für den Hinversand sind nicht im Gesamtpreis enthalten.",
      manufacturer_price_label: "{manufacturer} Vergleichspreis", manufacturer_price_date: "Stand: {date}", manufacturer_price_note: "Offizielle Herstellerschätzung; der Endpreis hängt von Prüfung und Serviceberechtigung ab.", price_savings: "Differenz: {amount} ({percent} %) unter der Herstellerschätzung", price_difference_equal: "Entspricht der Herstellerschätzung", price_difference_higher: "{amount} über der Herstellerschätzung",
      price_final_note: "Keine Reparatur ohne deine Freigabe. Dauer, Endpreis und Garantiebedingungen bestätigen wir vorher.", price_live_summary: "{model}, {repair}, {option}. Gesamt {total}.",
      price_status_dialog_close: "Schließen", price_status_dialog_eyebrow: "Teile- und Systemstatus", price_status_dialog_intro: "Für {repair} gilt kein pauschaler Apple-Status. Modell, Teil und Kalibrierung werden einzeln geprüft.", price_status_dialog_message: "Eine Apple-Systemmeldung hängt von Modell, Bauteil und abgeschlossener Kalibrierung ab.", price_status_dialog_features: "True Tone und Face ID werden nicht pauschal versprochen; die genaue Funktion wird für den Auftrag geklärt.", price_status_dialog_calibration: "Falls der Reparaturassistent erforderlich ist, muss die Kalibrierung vollständig abgeschlossen werden.", price_status_dialog_history_link: "Apple: Teile- und Serviceprotokoll", price_status_dialog_assistant_link: "Apple: Reparaturassistent",
      wa_label_service: "Serviceweg", wa_label_addons: "Zusatzkosten", wa_label_total: "Gesamt", mobile_repair_apply: "Für den Preis übernehmen"
    },
    uk: {
      price_catalog_error_title: "Не вдалося завантажити ціни", price_catalog_error_text: "Напишіть модель і пошкодження безпосередньо у WhatsApp.", price_catalog_error_cta: "Запитати у WhatsApp",
      price_preview_facts_label: "Важливі умови ремонту", price_fact_data: "Дані зазвичай зберігаються", price_fact_duration: "Термін підтвердимо заздалегідь", price_fact_warranty: "Гарантію узгодимо до замовлення",
      price_detail_eyebrow: "Налаштування ремонту", price_detail_title: "Оберіть якість і спосіб передачі", price_detail_text: "Показано лише підтверджені варіанти. Фінальну ціну й наявність ще раз перевіримо до замовлення.",
      price_priority_legend: "Що для вас важливо?", price_priority_quality: "Найкраща доступна якість", price_priority_quality_hint: "Пріоритет Original/OEM Pull, якщо підтверджено.", price_priority_value: "Ціна та якість", price_priority_value_hint: "Рекомендований баланс ціни й варіанта деталі.", price_priority_budget: "Найнижча ціна", price_priority_budget_hint: "Обирає найдешевший підтверджений варіант.",
      price_quality_title: "Оберіть якість деталі", price_quality_single_title: "Підтверджений варіант деталі", price_recommended: "Рекомендовано", price_status_button: "Статус і пояснення",
      price_compare_title: "Порівняти варіанти деталей", price_compare_feature: "Параметр", price_compare_technology: "Технологія", price_compare_stock: "Наявність", price_compare_price: "Ціна з установкою", price_technology_unspecified: "Не підтверджено для всіх випадків", price_technology_soft_oled: "Soft OLED", price_not_confirmed: "Не підтверджено", price_option_count: "Підтверджених варіантів: {count}", price_from: "від",
      price_service_title: "Як пристрій потрапить у ремонт?", service_handover_text: "Після короткого узгодження у WhatsApp, без виїзної доплати.", service_mobile_text: "Перевірте місце; залежно від маршруту 0, 10 або 20 євро.", service_shipping_text: "Ви оплачуєте відправлення до нас, ми — відстежуване повернення.", price_included: "Включено", service_mobile_check: "Перевірити", service_mobile_pending: "Місце ще не перевірено; виїзну доплату підтвердимо до замовлення.", service_mobile_selected: "Маршрут {distance} км, виїзд {fee}.",
      price_breakdown_title: "Підсумок ціни", price_breakdown_repair: "Ремонт і деталь", price_breakdown_total: "Разом", price_shipping_cost_note: "Ваші витрати на відправлення до сервісу не включені в суму.",
      manufacturer_price_label: "Орієнтовна ціна {manufacturer}", manufacturer_price_date: "Станом на {date}", manufacturer_price_note: "Офіційна оцінка виробника; фінальна сума залежить від перевірки та умов сервісу.", price_savings: "Різниця: на {amount} ({percent} %) нижче оцінки виробника", price_difference_equal: "Відповідає оцінці виробника", price_difference_higher: "На {amount} вище оцінки виробника",
      price_final_note: "Без вашої згоди ремонт не починається. Термін, фінальну ціну й гарантійні умови підтвердимо заздалегідь.", price_live_summary: "{model}, {repair}, {option}. Разом {total}.",
      price_status_dialog_close: "Закрити", price_status_dialog_eyebrow: "Статус деталі та системи", price_status_dialog_intro: "Для {repair} немає одного універсального статусу Apple. Модель, деталь і калібрування перевіряються окремо.", price_status_dialog_message: "Системне повідомлення Apple залежить від моделі, компонента й завершення калібрування.", price_status_dialog_features: "True Tone і Face ID не обіцяються автоматично; точну роботу узгодимо для замовлення.", price_status_dialog_calibration: "Якщо потрібен Repair Assistant, калібрування треба завершити повністю.", price_status_dialog_history_link: "Apple: історія деталей і сервісу", price_status_dialog_assistant_link: "Apple: Repair Assistant",
      wa_label_service: "Спосіб передачі", wa_label_addons: "Доплати", wa_label_total: "Разом", mobile_repair_apply: "Додати до розрахунку"
    },
    en: {
      price_catalog_error_title: "Prices could not be loaded", price_catalog_error_text: "Send us your model and damage directly on WhatsApp.", price_catalog_error_cta: "Ask on WhatsApp",
      price_preview_facts_label: "Important repair information", price_fact_data: "Data normally stays intact", price_fact_duration: "Timing confirmed in advance", price_fact_warranty: "Warranty terms agreed first",
      price_detail_eyebrow: "Configure repair", price_detail_title: "Choose quality and service route", price_detail_text: "Only confirmed options are shown. Final price and availability are checked again before the order.",
      price_priority_legend: "What matters to you?", price_priority_quality: "Best available quality", price_priority_quality_hint: "Prefers Original/OEM Pull when confirmed.", price_priority_value: "Price and quality", price_priority_value_hint: "Recommended balance of price and part option.", price_priority_budget: "Lowest price", price_priority_budget_hint: "Chooses the lowest confirmed option.",
      price_quality_title: "Choose part quality", price_quality_single_title: "Confirmed part option", price_recommended: "Recommended", price_status_button: "Status and details",
      price_compare_title: "Compare part options", price_compare_feature: "Feature", price_compare_technology: "Technology", price_compare_stock: "Availability", price_compare_price: "Price incl. fitting", price_technology_unspecified: "Not universally confirmed", price_technology_soft_oled: "Soft OLED", price_not_confirmed: "Not confirmed", price_option_count: "{count} confirmed options", price_from: "from",
      price_service_title: "How will the device reach us?", service_handover_text: "After a short WhatsApp check, with no travel fee.", service_mobile_text: "Check your location; 0, 10 or 20 euros by route distance.", service_shipping_text: "You pay inbound shipping; we pay tracked return shipping.", price_included: "Included", service_mobile_check: "Check", service_mobile_pending: "Location not checked yet; any travel fee is confirmed before the order.", service_mobile_selected: "{distance} km route, travel fee {fee}.",
      price_breakdown_title: "Your price summary", price_breakdown_repair: "Repair and part", price_breakdown_total: "Total", price_shipping_cost_note: "Your inbound shipping cost is not included in the total.",
      manufacturer_price_label: "{manufacturer} comparison estimate", manufacturer_price_date: "As of {date}", manufacturer_price_note: "Official manufacturer estimate; final cost depends on inspection and service eligibility.", price_savings: "Difference: {amount} ({percent}%) below the manufacturer estimate", price_difference_equal: "Matches the manufacturer estimate", price_difference_higher: "{amount} above the manufacturer estimate",
      price_final_note: "No repair without your approval. Timing, final price and warranty terms are confirmed first.", price_live_summary: "{model}, {repair}, {option}. Total {total}.",
      price_status_dialog_close: "Close", price_status_dialog_eyebrow: "Part and system status", price_status_dialog_intro: "There is no universal Apple status for {repair}. Model, part and calibration are checked individually.", price_status_dialog_message: "An Apple system message depends on model, component and completed calibration.", price_status_dialog_features: "True Tone and Face ID are not promised universally; exact operation is clarified for the order.", price_status_dialog_calibration: "When Repair Assistant is required, calibration must be completed fully.", price_status_dialog_history_link: "Apple: Parts and Service History", price_status_dialog_assistant_link: "Apple: Repair Assistant",
      wa_label_service: "Service route", wa_label_addons: "Add-ons", wa_label_total: "Total", mobile_repair_apply: "Apply to price"
    },
    ru: {
      price_catalog_error_title: "Не удалось загрузить цены", price_catalog_error_text: "Напишите модель и повреждение напрямую в WhatsApp.", price_catalog_error_cta: "Спросить в WhatsApp",
      price_preview_facts_label: "Важные условия ремонта", price_fact_data: "Данные обычно сохраняются", price_fact_duration: "Срок подтвердим заранее", price_fact_warranty: "Гарантию согласуем до заказа",
      price_detail_eyebrow: "Настройка ремонта", price_detail_title: "Выберите качество и способ передачи", price_detail_text: "Показаны только подтверждённые варианты. Итоговую цену и наличие повторно проверим до заказа.",
      price_priority_legend: "Что для вас важнее?", price_priority_quality: "Лучшее доступное качество", price_priority_quality_hint: "Приоритет Original/OEM Pull, если подтверждено.", price_priority_value: "Цена и качество", price_priority_value_hint: "Рекомендуемый баланс цены и варианта детали.", price_priority_budget: "Минимальная цена", price_priority_budget_hint: "Выбирает самый дешёвый подтверждённый вариант.",
      price_quality_title: "Выберите качество детали", price_quality_single_title: "Подтверждённый вариант детали", price_recommended: "Рекомендуем", price_status_button: "Статус и пояснения",
      price_compare_title: "Сравнить варианты деталей", price_compare_feature: "Параметр", price_compare_technology: "Технология", price_compare_stock: "Наличие", price_compare_price: "Цена с установкой", price_technology_unspecified: "Не подтверждено для всех случаев", price_technology_soft_oled: "Soft OLED", price_not_confirmed: "Не подтверждено", price_option_count: "Подтверждённых вариантов: {count}", price_from: "от",
      price_service_title: "Как устройство попадёт в ремонт?", service_handover_text: "После короткого согласования в WhatsApp, без платы за выезд.", service_mobile_text: "Проверьте место; 0, 10 или 20 евро по расстоянию маршрута.", service_shipping_text: "Вы оплачиваете отправку к нам, мы — отслеживаемый возврат.", price_included: "Включено", service_mobile_check: "Проверить", service_mobile_pending: "Место ещё не проверено; доплату за выезд подтвердим до заказа.", service_mobile_selected: "Маршрут {distance} км, выезд {fee}.",
      price_breakdown_title: "Итог цены", price_breakdown_repair: "Ремонт и деталь", price_breakdown_total: "Итого", price_shipping_cost_note: "Ваши расходы на отправку в сервис не включены в сумму.",
      manufacturer_price_label: "Ориентировочная цена {manufacturer}", manufacturer_price_date: "По состоянию на {date}", manufacturer_price_note: "Официальная оценка производителя; итог зависит от проверки и условий сервиса.", price_savings: "Разница: на {amount} ({percent} %) ниже оценки производителя", price_difference_equal: "Соответствует оценке производителя", price_difference_higher: "На {amount} выше оценки производителя",
      price_final_note: "Без вашего согласия ремонт не начинается. Срок, итоговую цену и гарантийные условия подтвердим заранее.", price_live_summary: "{model}, {repair}, {option}. Итого {total}.",
      price_status_dialog_close: "Закрыть", price_status_dialog_eyebrow: "Статус детали и системы", price_status_dialog_intro: "Для {repair} нет единого статуса Apple. Модель, деталь и калибровка проверяются отдельно.", price_status_dialog_message: "Системное сообщение Apple зависит от модели, компонента и завершённой калибровки.", price_status_dialog_features: "True Tone и Face ID не обещаются автоматически; точная работа уточняется для заказа.", price_status_dialog_calibration: "Если требуется Repair Assistant, калибровку нужно завершить полностью.", price_status_dialog_history_link: "Apple: история деталей и сервиса", price_status_dialog_assistant_link: "Apple: Repair Assistant",
      wa_label_service: "Способ передачи", wa_label_addons: "Доплаты", wa_label_total: "Итого", mobile_repair_apply: "Добавить к расчёту"
    },
    pl: {
      price_catalog_error_title: "Nie udało się wczytać cen", price_catalog_error_text: "Napisz model i uszkodzenie bezpośrednio na WhatsAppie.", price_catalog_error_cta: "Zapytaj na WhatsAppie",
      price_preview_facts_label: "Ważne informacje o naprawie", price_fact_data: "Dane zwykle pozostają", price_fact_duration: "Termin potwierdzamy wcześniej", price_fact_warranty: "Warunki gwarancji ustalamy przed zleceniem",
      price_detail_eyebrow: "Konfiguracja naprawy", price_detail_title: "Wybierz jakość i sposób przekazania", price_detail_text: "Pokazujemy tylko potwierdzone opcje. Cenę końcową i dostępność sprawdzamy ponownie przed zleceniem.",
      price_priority_legend: "Co jest dla Ciebie ważne?", price_priority_quality: "Najlepsza dostępna jakość", price_priority_quality_hint: "Preferuje Original/OEM Pull, jeśli potwierdzone.", price_priority_value: "Cena i jakość", price_priority_value_hint: "Polecany balans ceny i wariantu części.", price_priority_budget: "Najniższa cena", price_priority_budget_hint: "Wybiera najtańszą potwierdzoną opcję.",
      price_quality_title: "Wybierz jakość części", price_quality_single_title: "Potwierdzona opcja części", price_recommended: "Polecane", price_status_button: "Status i informacje",
      price_compare_title: "Porównaj opcje części", price_compare_feature: "Cecha", price_compare_technology: "Technologia", price_compare_stock: "Dostępność", price_compare_price: "Cena z montażem", price_technology_unspecified: "Niepotwierdzone ogólnie", price_technology_soft_oled: "Soft OLED", price_not_confirmed: "Niepotwierdzone", price_option_count: "Potwierdzone opcje: {count}", price_from: "od",
      price_service_title: "Jak urządzenie trafi do naprawy?", service_handover_text: "Po krótkim ustaleniu przez WhatsApp, bez kosztu dojazdu.", service_mobile_text: "Sprawdź miejsce; 0, 10 lub 20 euro zależnie od trasy.", service_shipping_text: "Ty płacisz wysyłkę do nas, my śledzony zwrot.", price_included: "W cenie", service_mobile_check: "Sprawdź", service_mobile_pending: "Miejsce nie zostało sprawdzone; koszt dojazdu potwierdzimy przed zleceniem.", service_mobile_selected: "Trasa {distance} km, dojazd {fee}.",
      price_breakdown_title: "Podsumowanie ceny", price_breakdown_repair: "Naprawa i część", price_breakdown_total: "Razem", price_shipping_cost_note: "Koszt wysyłki urządzenia do serwisu nie jest wliczony.",
      manufacturer_price_label: "Cena porównawcza {manufacturer}", manufacturer_price_date: "Stan na {date}", manufacturer_price_note: "Oficjalna wycena producenta; kwota końcowa zależy od oględzin i kwalifikacji serwisowej.", price_savings: "Różnica: {amount} ({percent}%) poniżej wyceny producenta", price_difference_equal: "Zgodne z wyceną producenta", price_difference_higher: "{amount} powyżej wyceny producenta",
      price_final_note: "Bez Twojej zgody nie zaczynamy naprawy. Termin, cenę końcową i gwarancję potwierdzamy wcześniej.", price_live_summary: "{model}, {repair}, {option}. Razem {total}.",
      price_status_dialog_close: "Zamknij", price_status_dialog_eyebrow: "Status części i systemu", price_status_dialog_intro: "Dla {repair} nie ma jednego statusu Apple. Model, część i kalibrację sprawdzamy osobno.", price_status_dialog_message: "Komunikat systemowy Apple zależy od modelu, części i zakończonej kalibracji.", price_status_dialog_features: "True Tone i Face ID nie są gwarantowane ogólnie; działanie ustalamy dla konkretnego zlecenia.", price_status_dialog_calibration: "Jeśli wymagany jest Repair Assistant, kalibrację trzeba ukończyć.", price_status_dialog_history_link: "Apple: historia części i serwisu", price_status_dialog_assistant_link: "Apple: Repair Assistant",
      wa_label_service: "Sposób przekazania", wa_label_addons: "Dopłaty", wa_label_total: "Razem", mobile_repair_apply: "Dodaj do wyceny"
    },
    it: {
      price_catalog_error_title: "Impossibile caricare i prezzi", price_catalog_error_text: "Scrivi modello e danno direttamente su WhatsApp.", price_catalog_error_cta: "Chiedi su WhatsApp",
      price_preview_facts_label: "Informazioni importanti", price_fact_data: "I dati normalmente restano", price_fact_duration: "Tempi confermati prima", price_fact_warranty: "Garanzia chiarita prima dell'ordine",
      price_detail_eyebrow: "Configura riparazione", price_detail_title: "Scegli qualità e modalità di servizio", price_detail_text: "Mostriamo solo opzioni confermate. Prezzo finale e disponibilità vengono ricontrollati prima dell'ordine.",
      price_priority_legend: "Cosa conta per te?", price_priority_quality: "Migliore qualità disponibile", price_priority_quality_hint: "Preferisce Original/OEM Pull se confermato.", price_priority_value: "Prezzo e qualità", price_priority_value_hint: "Equilibrio consigliato tra prezzo e ricambio.", price_priority_budget: "Prezzo più basso", price_priority_budget_hint: "Sceglie l'opzione confermata più economica.",
      price_quality_title: "Scegli la qualità del ricambio", price_quality_single_title: "Opzione ricambio confermata", price_recommended: "Consigliato", price_status_button: "Stato e dettagli",
      price_compare_title: "Confronta i ricambi", price_compare_feature: "Caratteristica", price_compare_technology: "Tecnologia", price_compare_stock: "Disponibilità", price_compare_price: "Prezzo con montaggio", price_technology_unspecified: "Non confermato in generale", price_technology_soft_oled: "Soft OLED", price_not_confirmed: "Non confermato", price_option_count: "{count} opzioni confermate", price_from: "da",
      price_service_title: "Come arriva il dispositivo?", service_handover_text: "Dopo un breve accordo WhatsApp, senza costo di uscita.", service_mobile_text: "Verifica la località; 0, 10 o 20 euro secondo il percorso.", service_shipping_text: "Tu paghi l'andata; noi il ritorno tracciato.", price_included: "Incluso", service_mobile_check: "Verifica", service_mobile_pending: "Località non ancora verificata; il costo di uscita viene confermato prima dell'ordine.", service_mobile_selected: "Percorso {distance} km, uscita {fee}.",
      price_breakdown_title: "Riepilogo prezzo", price_breakdown_repair: "Riparazione e ricambio", price_breakdown_total: "Totale", price_shipping_cost_note: "Il costo della spedizione al centro assistenza non è incluso.",
      manufacturer_price_label: "Stima comparativa {manufacturer}", manufacturer_price_date: "Aggiornato al {date}", manufacturer_price_note: "Stima ufficiale del produttore; il costo finale dipende da verifica e idoneità al servizio.", price_savings: "Differenza: {amount} ({percent}%) sotto la stima del produttore", price_difference_equal: "Uguale alla stima del produttore", price_difference_higher: "{amount} sopra la stima del produttore",
      price_final_note: "Nessuna riparazione senza approvazione. Tempi, prezzo finale e garanzia vengono confermati prima.", price_live_summary: "{model}, {repair}, {option}. Totale {total}.",
      price_status_dialog_close: "Chiudi", price_status_dialog_eyebrow: "Stato ricambio e sistema", price_status_dialog_intro: "Non esiste uno stato Apple universale per {repair}. Modello, ricambio e calibrazione vengono verificati singolarmente.", price_status_dialog_message: "Il messaggio di sistema Apple dipende da modello, componente e calibrazione completata.", price_status_dialog_features: "True Tone e Face ID non sono promessi in generale; il funzionamento viene chiarito per l'ordine.", price_status_dialog_calibration: "Se Repair Assistant è necessario, la calibrazione deve essere completata.", price_status_dialog_history_link: "Apple: cronologia parti e assistenza", price_status_dialog_assistant_link: "Apple: Repair Assistant",
      wa_label_service: "Modalità di servizio", wa_label_addons: "Supplementi", wa_label_total: "Totale", mobile_repair_apply: "Aggiungi al prezzo"
    },
    ar: {
      price_catalog_error_title: "تعذر تحميل الأسعار", price_catalog_error_text: "أرسل الموديل والعطل مباشرة عبر واتساب.", price_catalog_error_cta: "اسأل عبر واتساب",
      price_preview_facts_label: "معلومات إصلاح مهمة", price_fact_data: "تبقى البيانات عادةً", price_fact_duration: "نؤكد المدة مسبقاً", price_fact_warranty: "نوضح الضمان قبل الطلب",
      price_detail_eyebrow: "إعداد الإصلاح", price_detail_title: "اختر الجودة وطريقة الخدمة", price_detail_text: "نعرض الخيارات المؤكدة فقط. نراجع السعر النهائي والتوفر قبل الطلب.",
      price_priority_legend: "ما الأهم لك؟", price_priority_quality: "أفضل جودة متاحة", price_priority_quality_hint: "يفضل Original/OEM Pull عند تأكيده.", price_priority_value: "السعر والجودة", price_priority_value_hint: "توازن موصى به بين السعر وخيار القطعة.", price_priority_budget: "أقل سعر", price_priority_budget_hint: "يختار أرخص خيار مؤكد.",
      price_quality_title: "اختر جودة القطعة", price_quality_single_title: "خيار قطعة مؤكد", price_recommended: "موصى به", price_status_button: "الحالة والتفاصيل",
      price_compare_title: "مقارنة خيارات القطع", price_compare_feature: "الخاصية", price_compare_technology: "التقنية", price_compare_stock: "التوفر", price_compare_price: "السعر مع التركيب", price_technology_unspecified: "غير مؤكد بشكل عام", price_technology_soft_oled: "Soft OLED", price_not_confirmed: "غير مؤكد", price_option_count: "{count} خيارات مؤكدة", price_from: "من",
      price_service_title: "كيف يصل الجهاز للإصلاح؟", service_handover_text: "بعد تنسيق قصير عبر واتساب، من دون رسوم انتقال.", service_mobile_text: "تحقق من الموقع؛ 0 أو 10 أو 20 يورو حسب المسار.", service_shipping_text: "أنت تدفع الإرسال إلينا، ونحن ندفع الإرجاع المتتبع.", price_included: "مشمول", service_mobile_check: "تحقق", service_mobile_pending: "لم يُفحص الموقع بعد؛ نؤكد رسوم الانتقال قبل الطلب.", service_mobile_selected: "المسار {distance} كم، رسوم الانتقال {fee}.",
      price_breakdown_title: "ملخص السعر", price_breakdown_repair: "الإصلاح والقطعة", price_breakdown_total: "الإجمالي", price_shipping_cost_note: "تكلفة إرسال الجهاز إلينا غير مشمولة في الإجمالي.",
      manufacturer_price_label: "تقدير {manufacturer} للمقارنة", manufacturer_price_date: "بتاريخ {date}", manufacturer_price_note: "تقدير رسمي من الشركة؛ التكلفة النهائية تعتمد على الفحص وأهلية الخدمة.", price_savings: "الفرق: أقل بـ {amount} ({percent}٪) من تقدير الشركة", price_difference_equal: "مطابق لتقدير الشركة", price_difference_higher: "أعلى بـ {amount} من تقدير الشركة",
      price_final_note: "لا إصلاح دون موافقتك. نؤكد المدة والسعر النهائي وشروط الضمان مسبقاً.", price_live_summary: "{model}، {repair}، {option}. الإجمالي {total}.",
      price_status_dialog_close: "إغلاق", price_status_dialog_eyebrow: "حالة القطعة والنظام", price_status_dialog_intro: "لا توجد حالة Apple واحدة لـ {repair}. نفحص الموديل والقطعة والمعايرة كلّاً على حدة.", price_status_dialog_message: "تعتمد رسالة نظام Apple على الموديل والمكوّن واكتمال المعايرة.", price_status_dialog_features: "لا نضمن True Tone وFace ID بشكل عام؛ نوضح عملهما للطلب المحدد.", price_status_dialog_calibration: "إذا لزم Repair Assistant فيجب إكمال المعايرة.", price_status_dialog_history_link: "Apple: سجل القطع والخدمة", price_status_dialog_assistant_link: "Apple: Repair Assistant",
      wa_label_service: "طريقة الخدمة", wa_label_addons: "إضافات", wa_label_total: "الإجمالي", mobile_repair_apply: "إضافة إلى السعر"
    },
    ku: {
      price_catalog_error_title: "Biha nehatin barkirin", price_catalog_error_text: "Model û zirarê rasterast li WhatsAppê binivîse.", price_catalog_error_cta: "Li WhatsAppê bipirse",
      price_preview_facts_label: "Agahiyên girîng ên tamîrê", price_fact_data: "Dane bi gelemperî dimînin", price_fact_duration: "Dem berê tê pejirandin", price_fact_warranty: "Garanti berî siparişê tê zelalkirin",
      price_detail_eyebrow: "Tamîrê saz bike", price_detail_title: "Kalîte û awayê servîsê hilbijêre", price_detail_text: "Tenê vebijarkên pejirandî têne nîşandan. Biha û berdestbûn berî siparişê dîsa tê kontrolkirin.",
      price_priority_legend: "Çi ji te re girîng e?", price_priority_quality: "Kalîteya herî baş", price_priority_quality_hint: "Heke were pejirandin Original/OEM Pull dide pêş.", price_priority_value: "Biha û kalîte", price_priority_value_hint: "Hevsengiya pêşniyarkirî ya biha û parçeyê.", price_priority_budget: "Bihayê herî kêm", price_priority_budget_hint: "Vebijarka pejirandî ya herî erzan hilbijêre.",
      price_quality_title: "Kalîteya parçeyê hilbijêre", price_quality_single_title: "Vebijarka parçeyê ya pejirandî", price_recommended: "Pêşniyarkirî", price_status_button: "Rewş û agahî",
      price_compare_title: "Vebijarkên parçeyan berawird bike", price_compare_feature: "Taybetmendî", price_compare_technology: "Teknolojî", price_compare_stock: "Berdestbûn", price_compare_price: "Biha bi danînê re", price_technology_unspecified: "Bi giştî nehatiye pejirandin", price_technology_soft_oled: "Soft OLED", price_not_confirmed: "Nehatiye pejirandin", price_option_count: "{count} vebijarkên pejirandî", price_from: "ji",
      price_service_title: "Amûr çawa digihîje tamîrê?", service_handover_text: "Piştî lihevkirina WhatsAppê, bê pereya rêwîtiyê.", service_mobile_text: "Cih kontrol bike; li gorî rê 0, 10 an 20 euro.", service_shipping_text: "Tu şandina hatinê didî, em vegerandina bi şopandinê didin.", price_included: "Di nav de", service_mobile_check: "Kontrol bike", service_mobile_pending: "Cih hîn nehatiye kontrolkirin; pereya rêwîtiyê berî siparişê tê pejirandin.", service_mobile_selected: "Rê {distance} km, hatin {fee}.",
      price_breakdown_title: "Kurteya bihayê", price_breakdown_repair: "Tamîr û parçe", price_breakdown_total: "Tevahî", price_shipping_cost_note: "Pereya şandina amûrê bo servîsê di tevahiyê de tune ye.",
      manufacturer_price_label: "Bihayê berawirdî yê {manufacturer}", manufacturer_price_date: "Rewş: {date}", manufacturer_price_note: "Texmîna fermî ya çêker; bihayê dawî bi kontrol û şertên servîsê ve girêdayî ye.", price_savings: "Cudahî: {amount} ({percent}٪) ji texmîna çêker kêmtir", price_difference_equal: "Bi texmîna çêker re wekhev e", price_difference_higher: "{amount} ji texmîna çêker zêdetir",
      price_final_note: "Bê pejirandina te tamîr nayê destpêkirin. Dem, biha û garanti berê têne pejirandin.", price_live_summary: "{model}, {repair}, {option}. Tevahî {total}.",
      price_status_dialog_close: "Bigire", price_status_dialog_eyebrow: "Rewşa parçe û pergalê", price_status_dialog_intro: "Ji bo {repair} rewşeke Apple ya giştî tune ye. Model, parçe û kalîbrasyon cuda têne kontrolkirin.", price_status_dialog_message: "Peyama Apple bi model, parçe û kalîbrasyona temam ve girêdayî ye.", price_status_dialog_features: "True Tone û Face ID bi giştî nayên sozdan; karkirina wan ji bo siparişê tê zelalkirin.", price_status_dialog_calibration: "Heke Repair Assistant pêwîst be, kalîbrasyon divê temam bibe.", price_status_dialog_history_link: "Apple: dîroka parçe û servîsê", price_status_dialog_assistant_link: "Apple: Repair Assistant",
      wa_label_service: "Awayê servîsê", wa_label_addons: "Zêdekirin", wa_label_total: "Tevahî", mobile_repair_apply: "Li bihayê zêde bike"
    },
    fr: {
      price_catalog_error_title: "Impossible de charger les prix", price_catalog_error_text: "Envoyez le modèle et le dommage directement sur WhatsApp.", price_catalog_error_cta: "Demander sur WhatsApp",
      price_preview_facts_label: "Informations importantes", price_fact_data: "Les données restent normalement", price_fact_duration: "Délai confirmé à l'avance", price_fact_warranty: "Garantie clarifiée avant commande",
      price_detail_eyebrow: "Configurer la réparation", price_detail_title: "Choisir la qualité et le mode de service", price_detail_text: "Seules les options confirmées sont affichées. Prix final et disponibilité sont revérifiés avant commande.",
      price_priority_legend: "Qu'est-ce qui compte pour vous ?", price_priority_quality: "Meilleure qualité disponible", price_priority_quality_hint: "Privilégie Original/OEM Pull si confirmé.", price_priority_value: "Prix et qualité", price_priority_value_hint: "Équilibre recommandé entre prix et pièce.", price_priority_budget: "Prix le plus bas", price_priority_budget_hint: "Choisit l'option confirmée la moins chère.",
      price_quality_title: "Choisir la qualité de la pièce", price_quality_single_title: "Option de pièce confirmée", price_recommended: "Recommandé", price_status_button: "Statut et détails",
      price_compare_title: "Comparer les pièces", price_compare_feature: "Critère", price_compare_technology: "Technologie", price_compare_stock: "Disponibilité", price_compare_price: "Prix pose incluse", price_technology_unspecified: "Non confirmé de manière générale", price_technology_soft_oled: "Soft OLED", price_not_confirmed: "Non confirmé", price_option_count: "{count} options confirmées", price_from: "à partir de",
      price_service_title: "Comment l'appareil arrive-t-il ?", service_handover_text: "Après un bref accord WhatsApp, sans frais de déplacement.", service_mobile_text: "Vérifiez le lieu ; 0, 10 ou 20 euros selon le trajet.", service_shipping_text: "Vous payez l'envoi aller ; nous payons le retour suivi.", price_included: "Inclus", service_mobile_check: "Vérifier", service_mobile_pending: "Lieu non vérifié ; les frais de déplacement sont confirmés avant commande.", service_mobile_selected: "Trajet {distance} km, déplacement {fee}.",
      price_breakdown_title: "Récapitulatif du prix", price_breakdown_repair: "Réparation et pièce", price_breakdown_total: "Total", price_shipping_cost_note: "Vos frais d'envoi vers l'atelier ne sont pas inclus.",
      manufacturer_price_label: "Estimation comparative {manufacturer}", manufacturer_price_date: "Au {date}", manufacturer_price_note: "Estimation officielle du fabricant ; le coût final dépend du contrôle et de l'éligibilité au service.", price_savings: "Écart : {amount} ({percent} %) sous l'estimation fabricant", price_difference_equal: "Identique à l'estimation fabricant", price_difference_higher: "{amount} au-dessus de l'estimation fabricant",
      price_final_note: "Aucune réparation sans votre accord. Délai, prix final et garantie sont confirmés avant.", price_live_summary: "{model}, {repair}, {option}. Total {total}.",
      price_status_dialog_close: "Fermer", price_status_dialog_eyebrow: "Statut pièce et système", price_status_dialog_intro: "Il n'existe pas de statut Apple universel pour {repair}. Modèle, pièce et calibration sont vérifiés séparément.", price_status_dialog_message: "Le message système Apple dépend du modèle, du composant et de la calibration terminée.", price_status_dialog_features: "True Tone et Face ID ne sont pas promis globalement ; leur fonctionnement est précisé pour la commande.", price_status_dialog_calibration: "Si Repair Assistant est requis, la calibration doit être terminée.", price_status_dialog_history_link: "Apple : historique des pièces et réparations", price_status_dialog_assistant_link: "Apple : Repair Assistant",
      wa_label_service: "Mode de service", wa_label_addons: "Suppléments", wa_label_total: "Total", mobile_repair_apply: "Ajouter au prix"
    },
    sl: {
      price_catalog_error_title: "Cen ni bilo mogoče naložiti", price_catalog_error_text: "Model in okvaro pošlji neposredno prek WhatsAppa.", price_catalog_error_cta: "Vprašaj prek WhatsAppa",
      price_preview_facts_label: "Pomembne informacije", price_fact_data: "Podatki običajno ostanejo", price_fact_duration: "Čas potrdimo vnaprej", price_fact_warranty: "Garancijo uskladimo pred naročilom",
      price_detail_eyebrow: "Nastavi popravilo", price_detail_title: "Izberi kakovost in način storitve", price_detail_text: "Prikazane so le potrjene možnosti. Končno ceno in dobavljivost znova preverimo pred naročilom.",
      price_priority_legend: "Kaj ti je pomembno?", price_priority_quality: "Najboljša razpoložljiva kakovost", price_priority_quality_hint: "Prednost ima Original/OEM Pull, če je potrjen.", price_priority_value: "Cena in kakovost", price_priority_value_hint: "Priporočeno razmerje med ceno in delom.", price_priority_budget: "Najnižja cena", price_priority_budget_hint: "Izbere najcenejšo potrjeno možnost.",
      price_quality_title: "Izberi kakovost dela", price_quality_single_title: "Potrjena možnost dela", price_recommended: "Priporočeno", price_status_button: "Stanje in podrobnosti",
      price_compare_title: "Primerjaj možnosti delov", price_compare_feature: "Lastnost", price_compare_technology: "Tehnologija", price_compare_stock: "Dobavljivost", price_compare_price: "Cena z vgradnjo", price_technology_unspecified: "Ni splošno potrjeno", price_technology_soft_oled: "Soft OLED", price_not_confirmed: "Ni potrjeno", price_option_count: "{count} potrjenih možnosti", price_from: "od",
      price_service_title: "Kako naprava pride na popravilo?", service_handover_text: "Po kratkem dogovoru prek WhatsAppa, brez stroška prihoda.", service_mobile_text: "Preveri kraj; 0, 10 ali 20 evrov glede na pot.", service_shipping_text: "Ti plačaš pošiljanje k nam, mi sledljivo vračilo.", price_included: "Vključeno", service_mobile_check: "Preveri", service_mobile_pending: "Kraj še ni preverjen; strošek prihoda potrdimo pred naročilom.", service_mobile_selected: "Pot {distance} km, prihod {fee}.",
      price_breakdown_title: "Povzetek cene", price_breakdown_repair: "Popravilo in del", price_breakdown_total: "Skupaj", price_shipping_cost_note: "Strošek pošiljanja naprave v servis ni vključen.",
      manufacturer_price_label: "Primerjalna ocena {manufacturer}", manufacturer_price_date: "Stanje {date}", manufacturer_price_note: "Uradna ocena proizvajalca; končni strošek je odvisen od pregleda in upravičenosti do servisa.", price_savings: "Razlika: {amount} ({percent} %) pod oceno proizvajalca", price_difference_equal: "Enako oceni proizvajalca", price_difference_higher: "{amount} nad oceno proizvajalca",
      price_final_note: "Brez tvoje odobritve ne začnemo. Čas, končno ceno in garancijo potrdimo vnaprej.", price_live_summary: "{model}, {repair}, {option}. Skupaj {total}.",
      price_status_dialog_close: "Zapri", price_status_dialog_eyebrow: "Stanje dela in sistema", price_status_dialog_intro: "Za {repair} ni enega splošnega Apple statusa. Model, del in kalibracijo preverimo posebej.", price_status_dialog_message: "Sistemsko sporočilo Apple je odvisno od modela, komponente in zaključene kalibracije.", price_status_dialog_features: "True Tone in Face ID nista splošno zagotovljena; delovanje pojasnimo za naročilo.", price_status_dialog_calibration: "Če je potreben Repair Assistant, mora biti kalibracija končana.", price_status_dialog_history_link: "Apple: zgodovina delov in servisa", price_status_dialog_assistant_link: "Apple: Repair Assistant",
      wa_label_service: "Način storitve", wa_label_addons: "Doplačila", wa_label_total: "Skupaj", mobile_repair_apply: "Dodaj k ceni"
    }
  };

  const pricePage = {
    de: {
      price_selector_card_eyebrow: "Preise sofort prüfen", price_selector_trust_note: "Daten normalerweise erhalten",
      price_stock_note: "OEM Pull Akkus sind nicht immer verfügbar. Die Verfügbarkeit wird vor dem Auftrag per WhatsApp bestätigt.", price_selector_note: "Listenpreise inkl. Einbau. Zusätzliche Schäden und die gewählte Teilequalität können den Endpreis verändern; bestätigt wird vor dem Auftrag.",
      price_aria_brand: "Marke auswählen", price_aria_selector: "Reparaturpreis auswählen", price_aria_other_apple: "Weitere Apple-Geräte",
      price_mode_local_note: "Lokale Übergabe, Abholung oder mobiler Termin nach WhatsApp-Check.", price_mode_shipping_note: "Bei Versand bekommst du zuerst Versandhinweise. Keine Reparatur ohne Freigabe.",
      stock_available: "Auf Lager", stock_unavailable: "Nicht verfügbar", stock_on_request: "Verfügbarkeit prüfen", wa_label_quality: "Teilequalität"
    },
    uk: {
      price_selector_card_eyebrow: "Швидка перевірка цін", price_selector_trust_note: "Дані зазвичай зберігаються",
      price_stock_note: "Акумулятори OEM Pull доступні не завжди. Наявність підтвердимо у WhatsApp до замовлення.", price_selector_note: "Ціни вказані з установкою. Додаткові пошкодження та обрана якість деталі можуть змінити фінальну суму; її підтвердимо до замовлення.",
      price_aria_brand: "Оберіть бренд", price_aria_selector: "Оберіть ремонт і ціну", price_aria_other_apple: "Інші пристрої Apple",
      price_mode_local_note: "Передача, забір або мобільний термін у Singen після WhatsApp-перевірки.", price_mode_shipping_note: "Для ремонту поштою спочатку надішлю інструкції. Без вашої згоди ремонт не починається.",
      stock_available: "Є в наявності", stock_unavailable: "Недоступно", stock_on_request: "Перевірити наявність", wa_label_quality: "Якість деталі"
    },
    en: {
      price_selector_card_eyebrow: "Check prices instantly", price_selector_trust_note: "Data normally stays intact",
      price_stock_note: "OEM Pull batteries are not always available. Availability is confirmed on WhatsApp before the order.", price_selector_note: "List prices include installation. Additional damage and the selected part quality can change the final price; it is confirmed before the order.",
      price_aria_brand: "Choose a brand", price_aria_selector: "Choose repair and price", price_aria_other_apple: "Other Apple devices",
      price_mode_local_note: "Local handover, pickup or mobile appointment after a WhatsApp check.", price_mode_shipping_note: "For mail-in repair, you receive shipping instructions first. No repair without approval.",
      stock_available: "In stock", stock_unavailable: "Unavailable", stock_on_request: "Check availability", wa_label_quality: "Part quality"
    },
    ru: {
      price_selector_card_eyebrow: "Быстрая проверка цен", price_selector_trust_note: "Данные обычно сохраняются",
      price_stock_note: "Аккумуляторы OEM Pull доступны не всегда. Наличие подтвердим в WhatsApp до заказа.", price_selector_note: "Цены указаны с установкой. Дополнительные повреждения и выбранное качество детали могут изменить итоговую сумму; её подтвердим до заказа.",
      price_aria_brand: "Выберите бренд", price_aria_selector: "Выберите ремонт и цену", price_aria_other_apple: "Другие устройства Apple",
      price_mode_local_note: "Передача, забор или мобильный ремонт в Singen после проверки в WhatsApp.", price_mode_shipping_note: "Для ремонта с отправкой сначала вы получите инструкции. Без вашего согласия ремонт не начинается.",
      stock_available: "В наличии", stock_unavailable: "Недоступно", stock_on_request: "Проверить наличие", wa_label_quality: "Качество детали"
    },
    pl: {
      price_selector_card_eyebrow: "Szybko sprawdź ceny", price_selector_trust_note: "Dane zwykle pozostają na urządzeniu",
      price_stock_note: "Baterie OEM Pull nie zawsze są dostępne. Dostępność potwierdzimy w WhatsApp przed zleceniem.", price_selector_note: "Ceny katalogowe obejmują montaż. Dodatkowe uszkodzenia i wybrana jakość części mogą zmienić cenę końcową; potwierdzimy ją przed zleceniem.",
      price_aria_brand: "Wybierz markę", price_aria_selector: "Wybierz naprawę i cenę", price_aria_other_apple: "Inne urządzenia Apple",
      price_mode_local_note: "Przekazanie, odbiór lub naprawa mobilna w Singen po sprawdzeniu przez WhatsApp.", price_mode_shipping_note: "Przy naprawie wysyłkowej najpierw otrzymasz instrukcje. Bez zgody nie rozpoczynamy naprawy.",
      stock_available: "Dostępne", stock_unavailable: "Niedostępne", stock_on_request: "Sprawdź dostępność", wa_label_quality: "Jakość części"
    },
    it: {
      price_selector_card_eyebrow: "Controlla subito i prezzi", price_selector_trust_note: "I dati normalmente restano intatti",
      price_stock_note: "Le batterie OEM Pull non sono sempre disponibili. Confermiamo la disponibilità su WhatsApp prima dell'ordine.", price_selector_note: "I prezzi di listino includono il montaggio. Danni aggiuntivi e qualità del ricambio possono cambiare il totale; lo confermiamo prima dell'ordine.",
      price_aria_brand: "Scegli la marca", price_aria_selector: "Scegli riparazione e prezzo", price_aria_other_apple: "Altri dispositivi Apple",
      price_mode_local_note: "Consegna, ritiro o intervento mobile a Singen dopo il controllo WhatsApp.", price_mode_shipping_note: "Per la riparazione tramite spedizione ricevi prima le istruzioni. Nessuna riparazione senza approvazione.",
      stock_available: "Disponibile", stock_unavailable: "Non disponibile", stock_on_request: "Verifica disponibilità", wa_label_quality: "Qualità del ricambio"
    },
    ar: {
      price_selector_card_eyebrow: "تحقق من الأسعار فورًا", price_selector_trust_note: "تبقى البيانات عادةً على الجهاز",
      price_stock_note: "بطاريات OEM Pull ليست متوفرة دائمًا. نؤكد التوفر عبر WhatsApp قبل الطلب.", price_selector_note: "الأسعار تشمل التركيب. قد تغير الأضرار الإضافية وجودة القطعة المختارة السعر النهائي؛ ويتم تأكيده قبل الطلب.",
      price_aria_brand: "اختر العلامة التجارية", price_aria_selector: "اختر الإصلاح والسعر", price_aria_other_apple: "أجهزة Apple أخرى",
      price_mode_local_note: "تسليم أو استلام أو إصلاح متنقل في Singen بعد التحقق عبر WhatsApp.", price_mode_shipping_note: "للإصلاح عبر الشحن تستلم التعليمات أولًا. لا يبدأ الإصلاح دون موافقتك.",
      stock_available: "متوفر", stock_unavailable: "غير متوفر", stock_on_request: "تحقق من التوفر", wa_label_quality: "جودة القطعة"
    },
    ku: {
      price_selector_card_eyebrow: "Biha niha kontrol bike", price_selector_trust_note: "Dane bi gelemperî li ser amûrê dimînin",
      price_stock_note: "Bataryayên OEM Pull her dem ne berdest in. Em berdestbûnê berî siparişê li WhatsAppê pejirandî dikin.", price_selector_note: "Bihayên lîsteyê danînê dihewînin. Zirarên zêde û kalîteya parçeyê dikarin bihaya dawî biguherînin; berî siparişê tê pejirandin.",
      price_aria_brand: "Markeyê hilbijêre", price_aria_selector: "Tamîr û bihayê hilbijêre", price_aria_other_apple: "Amûrên din ên Apple",
      price_mode_local_note: "Radestkirin, rakirin an tamîra mobîl li Singen piştî kontrola WhatsAppê.", price_mode_shipping_note: "Ji bo tamîra bi şandinê pêşî rêbername tê şandin. Bê erêkirina te tamîr dest pê nake.",
      stock_available: "Berdest e", stock_unavailable: "Ne berdest e", stock_on_request: "Berdestbûnê kontrol bike", wa_label_quality: "Kalîteya parçeyê"
    },
    fr: {
      price_selector_card_eyebrow: "Vérifier les prix immédiatement", price_selector_trust_note: "Les données restent normalement intactes",
      price_stock_note: "Les batteries OEM Pull ne sont pas toujours disponibles. Nous confirmons la disponibilité sur WhatsApp avant la commande.", price_selector_note: "Les prix affichés incluent la pose. Des dommages supplémentaires et la qualité choisie peuvent modifier le total, confirmé avant la commande.",
      price_aria_brand: "Choisir la marque", price_aria_selector: "Choisir la réparation et le prix", price_aria_other_apple: "Autres appareils Apple",
      price_mode_local_note: "Remise, collecte ou réparation mobile à Singen après vérification WhatsApp.", price_mode_shipping_note: "Pour une réparation par envoi, vous recevez d'abord les instructions. Aucune réparation sans accord.",
      stock_available: "Disponible", stock_unavailable: "Indisponible", stock_on_request: "Vérifier la disponibilité", wa_label_quality: "Qualité de la pièce"
    },
    sl: {
      price_selector_card_eyebrow: "Takoj preveri cene", price_selector_trust_note: "Podatki običajno ostanejo na napravi",
      price_stock_note: "Baterije OEM Pull niso vedno na voljo. Dobavljivost potrdimo prek WhatsAppa pred naročilom.", price_selector_note: "Cene vključujejo vgradnjo. Dodatne poškodbe in izbrana kakovost dela lahko spremenijo končni znesek; potrdimo ga pred naročilom.",
      price_aria_brand: "Izberi znamko", price_aria_selector: "Izberi popravilo in ceno", price_aria_other_apple: "Druge naprave Apple",
      price_mode_local_note: "Predaja, prevzem ali mobilno popravilo v Singen po preverjanju prek WhatsAppa.", price_mode_shipping_note: "Za popravilo po pošti najprej prejmeš navodila. Brez tvoje odobritve ne začnemo.",
      stock_available: "Na voljo", stock_unavailable: "Ni na voljo", stock_on_request: "Preveri dobavljivost", wa_label_quality: "Kakovost dela"
    }
  };

  Object.entries(pricePage).forEach(([lang, values]) => {
    translations[lang] = { ...(translations[lang] || {}), ...values };
  });

  Object.entries(premium).forEach(([lang, values]) => {
    translations[lang] = { ...(translations[lang] || {}), ...values };
  });

  const current = window.HN_I18N || {};
  Object.entries(translations).forEach(([lang, values]) => {
    current[lang] = { ...(current[lang] || {}), ...values };
  });
  window.HN_I18N = current;
})();
