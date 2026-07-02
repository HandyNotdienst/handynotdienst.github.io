# Germany-Wide Versand Repair Masterplan

This document captures the product, trust, marketing, UX, SEO, privacy, and implementation plan for adding a Germany-wide repair-by-shipping service to Handy Notdienst.

## Core Strategy

The Versand service must not feel like a small side note. It should feel like a clear, controlled repair journey for customers across Germany.

Primary positioning:

```text
Smartphone-Reparatur per Versand aus ganz Deutschland.
Persoenlich, transparent und erst nach deiner Freigabe.
```

Core promise:

```text
Erst pruefen. Dann entscheiden. Dann reparieren.
```

The site should sell calm and control, not just repair speed.

## Current Site Gap

The current site is mainly local-first:

- Home mentions Abholung / Lieferung in Singen.
- FAQ only briefly mentions that devices can be sent in.
- There is no `versand-reparatur.html` in the sitemap.
- Legal pages still need final real content before an active Germany-wide shipping launch.

The Versand service needs its own entry point, trust path, FAQ, legal framing, and WhatsApp flow.

## Customer Fears To Answer

The page must directly answer these fears:

- Will my phone get lost?
- Will repair start without my approval?
- Will the price change unexpectedly?
- What happens to my data?
- How do I know what is happening with my device?
- Who am I sending my device to?
- What if repair is not worth it?
- How do I package the phone correctly?

Every major section should reduce one of these fears.

## Recommended Service Rules

| Topic | Recommended decision | Reason |
|---|---|---|
| Start of process | Sending in starts a check, not automatic repair | Reduces fear and avoids misunderstandings |
| Approval | Repair only after WhatsApp approval | Main trust mechanism |
| Shipping provider | Say "verfolgbarer Paketdienst" at first | Avoids premature DHL/UPS commitment |
| Return shipment | Always with tracking number | Strong trust signal |
| Shipping costs | Discuss transparently before shipping | Avoids margin and expectation problems |
| Payment | After approval/repair, before return shipment | Feels fair to the customer |
| Expensive parts | Deposit may be needed after agreement | Protects against expensive special orders |
| Diagnosis | WhatsApp pre-check free, complex diagnosis by agreement | Honest for water damage/no-power cases |
| Data | Data usually stays for standard repairs, backup recommended | Avoids unsafe absolute claims |
| Device code | Do not request upfront | Better privacy and trust |
| Uneconomic repair | Recommend honestly, offer return/ankauf/disposal options | Turns a problem into a service |
| Warranty | Depends on repair and part type | Avoids "guarantee on everything" overpromise |
| Shipping address | Send after WhatsApp request | More controlled if working from home |
| Repair ID | Manual ID like `HN-YYYY-###` | Gives the process structure |

## Main Page

Create:

```text
versand-reparatur.html
```

Recommended navigation label:

```text
Versand
```

Recommended H1:

```text
Smartphone-Reparatur per Versand aus ganz Deutschland
```

Recommended hero text:

```text
Schick dein Geraet sicher ein. Ich pruefe den Schaden, sende dir den finalen Preis
per WhatsApp und repariere erst nach deiner Freigabe.
```

Primary CTA:

```text
Versand-Reparatur starten
```

Secondary CTA:

```text
Preise vorher pruefen
```

Trust line:

```text
Keine Reparatur ohne Freigabe · Status per WhatsApp · Rueckversand mit Sendungsnummer
```

## Page Structure

1. Hero
2. Trust strip
3. Entry cards
4. Process timeline
5. Approval block
6. Packing checklist
7. WhatsApp status preview
8. Special cases
9. FAQ
10. Final CTA

## Entry Cards

```text
Was passt zu dir?
```

```text
Ich kenne mein Modell
Waehle dein Geraet und pruefe vorab den Preis.

Ich bin unsicher
Beschreibe den Schaden oder sende ein Foto per WhatsApp.

Ich moechte nur fragen
Starte unverbindlich, bevor du etwas einschickst.
```

## Process Timeline

```text
So funktioniert die Versandreparatur
```

1. Anfrage senden
   Schick Modell, Schaden und deinen Wunsch per WhatsApp.

2. Versandhinweise erhalten
   Du bekommst die naechsten Schritte und deine Reparatur-ID.

3. Geraet einschicken
   Gut verpackt, ohne SIM-Karte und mit kurzer Fehlerbeschreibung.

4. Diagnose & Preis
   Ich pruefe dein Geraet und sende dir den finalen Preis.

5. Freigabe geben
   Erst nach deiner Zustimmung beginnt die Reparatur.

6. Repariert zurueckbekommen
   Nach Test und Zahlung geht dein Geraet mit Sendungsnummer zurueck.

## Approval Block

```text
Du entscheidest vor der Reparatur

Das Einsenden bedeutet noch keine automatische Reparatur.
Du bekommst zuerst eine klare Einschaetzung, die passende Reparaturoption
und den finalen Preis. Erst wenn du zustimmst, repariere ich.
```

Support text:

```text
Wenn sich eine Reparatur nicht lohnt, sage ich dir das ehrlich.
```

## WhatsApp Status Preview

```text
Dein Reparaturstatus per WhatsApp
```

Status examples:

```text
Reparatur-ID erstellt
Geraet angekommen
Diagnose laeuft
Preis gesendet
Reparatur freigegeben
Rueckversand vorbereitet
```

Support text:

```text
Du bekommst Updates zu den wichtigsten Schritten, damit du weisst,
wo dein Geraet gerade im Prozess ist.
```

## Packing Checklist

```text
Vor dem Einschicken
```

Checklist:

- Backup erstellen, wenn moeglich
- SIM-Karte entfernen
- Geraet ausschalten
- Huelle und Zubehoer entfernen
- Geraet gut polstern
- Name, WhatsApp-Nummer und Reparatur-ID beilegen
- Fehler kurz beschreiben

Do not send:

```text
Bitte sende kein Zubehoer mit, das fuer die Reparatur nicht noetig ist:
Ladekabel, Huelle, Originalverpackung, SIM-Karte oder Speicherkarte.
```

## Special Cases

```text
Wenn es nicht ganz eindeutig ist
```

```text
Wasserschaden
Eine erfolgreiche Reparatur kann nicht garantiert werden. Ich pruefe zuerst, was moeglich ist.

Ersatzteil nicht verfuegbar
Du bekommst eine Alternative oder einen spaeteren Reparaturtermin vorgeschlagen.

Reparatur lohnt sich nicht
Ich sage dir ehrlich, wenn die Reparatur wirtschaftlich keinen Sinn ergibt.

Geraet startet nicht
Dann ist zuerst eine Diagnose noetig, bevor ein verbindlicher Preis moeglich ist.
```

## FAQ

Recommended questions:

- Beginnt die Reparatur automatisch?
- Wann bezahle ich?
- Kann ich aus jeder Stadt in Deutschland einschicken?
- Bekomme ich eine Sendungsnummer?
- Bleiben meine Daten erhalten?
- Was passiert, wenn sich die Reparatur nicht lohnt?
- Wie verpacke ich mein Geraet?
- Wer traegt Versandkosten?
- Wie lange dauert die Reparatur per Versand?
- Was passiert bei Wasserschaden?

Short answers:

```text
Beginnt die Reparatur automatisch?
Nein. Repariert wird erst nach deiner Freigabe.

Wann bezahle ich?
Nach Freigabe und abgeschlossener Reparatur, bevor das Geraet zurueckgesendet wird.

Kann ich aus jeder Stadt in Deutschland einschicken?
Ja. Die Versandreparatur ist deutschlandweit moeglich.

Bekomme ich eine Sendungsnummer?
Ja. Beim Rueckversand erhaeltst du eine Sendungsnummer.

Bleiben meine Daten erhalten?
Bei Standard-Reparaturen normalerweise ja. Ein Backup wird trotzdem empfohlen.

Was passiert, wenn sich die Reparatur nicht lohnt?
Dann besprechen wir, ob das Geraet unrepariert zurueckgesendet, entsorgt oder eventuell angekauft werden soll.
```

## WhatsApp Templates

Shipping page CTA:

```text
Hallo! Ich moechte eine Reparatur per Versand anfragen.

Geraet:
Schaden:
Ort:
Ich moechte die Versandhinweise erhalten.

Bitte sende mir die naechsten Schritte.
```

Future price selector CTA:

```text
Hallo! Ich moechte eine Reparatur per Versand anfragen.

Modell: {model}
Reparatur: {repair}
Preis laut Liste: {price}
Ort: Deutschland

Bitte sende mir die Versandhinweise.
```

Unknown damage CTA:

```text
Hallo! Ich bin mir nicht sicher, was defekt ist.

Modell:
Problem:
Seit wann besteht der Fehler?
Ich moechte das Geraet per Versand pruefen lassen.
```

## SEO

Recommended URL:

```text
/versand-reparatur.html
```

Title:

```text
Smartphone Reparatur per Versand in Deutschland | Handy Notdienst
```

Meta description:

```text
Smartphone oder iPhone per Versand reparieren lassen. Geraet einschicken, Diagnose erhalten, Preis bestaetigen und repariert zurueckbekommen. Keine Reparatur ohne Freigabe.
```

Avoid creating thin city-clone pages like:

- iPhone Reparatur Berlin
- iPhone Reparatur Hamburg
- iPhone Reparatur Muenchen

Use one strong Germany-wide page first.

## Structured Data

Add:

- `FAQPage` matching visible FAQ content
- `RepairService`
- `areaServed: Germany`
- Existing `LocalBusiness` should not include invented or inconsistent address data

## I18N Keys

Initial keys:

- `nav_shipping`
- `shipping_meta_title`
- `shipping_meta_description`
- `shipping_hero_title`
- `shipping_hero_text`
- `shipping_cta_start`
- `shipping_cta_prices`
- `shipping_trust_approval`
- `shipping_trust_status`
- `shipping_trust_tracking`
- `shipping_entry_title`
- `shipping_steps_title`
- `shipping_approval_title`
- `shipping_approval_text`
- `shipping_status_title`
- `shipping_pack_title`
- `shipping_cases_title`
- `shipping_faq_title`
- `shipping_final_title`
- `shipping_whatsapp_message`

## Design Direction

- Keep dark premium header.
- Use lighter product zones for Versand content.
- Use WhatsApp green only for primary actions.
- Use warm amber for Freigabe/trust.
- Use clean cards and high contrast.
- Do not put important text inside images.
- Avoid heavy parallax or long intro animation.

## Responsive Behavior

Desktop:

- Two-column hero.
- Sticky side CTA is allowed.
- Timeline can be horizontal.

Mobile:

- Single-column hero.
- CTA visible early.
- Timeline becomes vertical cards.
- Sticky CTA can show `Preis pruefen | WhatsApp | Ablauf`.
- No horizontal overflow.

## Accessibility Requirements

- All buttons and links need accessible names.
- Focus styles must be visible.
- Touch targets should be large enough.
- Timeline should use semantic list markup.
- FAQ should use accessible accordion or `details`.
- Decorative icons should be `aria-hidden="true"`.
- Respect `prefers-reduced-motion`.

## Image Requirements

For new visuals:

- WebP and preferably AVIF.
- Responsive `srcset` and accurate `sizes`.
- Explicit `width` and `height`.
- Meaningful `alt` text.
- Lazy-load below the fold.
- Preload only the first-viewport hero image if needed.

## Analytics Events

No personal data in analytics.

Recommended events:

- `shipping_page_view`
- `shipping_cta_click`
- `shipping_whatsapp_click`
- `shipping_packing_checklist_open`
- `shipping_faq_toggle`
- `shipping_final_cta_click`
- `shipping_price_mode_select` (future)

## Legal And Trust Follow-Up

Before active Germany-wide shipping promotion, update:

- `impressum.html`
- `datenschutz.html`
- `versandbedingungen.html`

Versandbedingungen should cover:

- Ablauf
- Einsendung and packaging
- Diagnosis
- Freigabe
- Prices and payment
- Shipping costs
- Return shipment
- Unrepairable devices
- Data and backup
- Warranty conditions
- Contact

## PR Roadmap

PR 1:

```text
Add Germany-wide Versand repair landing page
```

Scope:

- `versand-reparatur.html`
- header/footer link
- sitemap entry
- WhatsApp template
- basic styles
- FAQ block
- basic schema

PR 2:

```text
Add Versand service cards to homepage
```

PR 3:

```text
Add Versand mode to price selector
```

PR 4:

```text
Expand Versand FAQ and schema
```

PR 5:

```text
Add Versandbedingungen and update Datenschutz/Impressum
```

PR 6:

```text
Add premium status preview, packing visuals and animations
```

## PR 1 Non-Goals

- Do not change iPhone price selector logic.
- Do not change Samsung modal logic.
- Do not add backend.
- Do not build status tracker yet.
- Do not add a complex form.
- Do not rewrite all legal pages in the same PR.
- Do not create city SEO pages.

## Definition Of Done

The Versand direction is ready when a customer understands within 30 seconds:

- Repair by shipping is available across Germany.
- Sending in does not start automatic repair.
- Repair starts only after approval.
- Price is confirmed after checking the device.
- WhatsApp is the main contact path.
- Packaging instructions are clear.
- Return shipment includes tracking.
- FAQ and legal conditions are easy to find.
