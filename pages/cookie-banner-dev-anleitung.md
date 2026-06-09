# Cookie Banner — Einbindungsanleitung für den Developer

**Projekt:** belalkayumi.com  
**Erstellt:** 2026-06-02  
**Zugehörige Datei:** `pages/cookie-banner.html`

---

## Was zu tun ist

Der fertige Cookie Banner muss auf jeder Seite der Website eingebunden werden. Zusätzlich soll Google Analytics 4 (GA4) so eingerichtet werden, dass es erst nach Nutzer-Zustimmung lädt — konform mit Google Consent Mode v2 und DSGVO.

Die GA4-Measurement-ID wird von mir separat bereitgestellt und muss an der markierten Stelle eingetragen werden.

---

## Schritt 1 — CSS in den `<head>` kopieren

Öffne `pages/cookie-banner.html` und kopiere den gesamten `<style>`-Block (alles zwischen `<style>` und `</style>`) in den `<head>` jeder HTML-Seite der Website — oder lagere ihn in eine bestehende CSS-Datei aus (z.B. `main.css` oder `cookie-consent.css`).

```html
<head>
  ...
  <style>
    /* Hier den Style-Block aus cookie-banner.html einfügen */
    /* ODER: <link rel="stylesheet" href="/css/cookie-consent.css"> */
  </style>
</head>
```

---

## Schritt 2 — Google Analytics Tag in den `<head>` einfügen

Füge diesen Block **als erstes Script** im `<head>` ein — **vor** allen anderen Scripts. Die Measurement-ID (`G-LX775TTC7E`) wird von mir bereitgestellt.

```html
<head>
  <!-- Google tag (gtag.js) — muss als ERSTES Script stehen -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-LX775TTC7E"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-LX775TTC7E');
  </script>
  <!-- Ende Google tag -->
  ...
</head>
```

**Wichtig:** `G-LX775TTC7E` an beiden Stellen durch die echte Measurement-ID ersetzen.

---

## Schritt 3 — Banner-Markup in den `<body>` einfügen

Kopiere die folgenden zwei HTML-Elemente aus `pages/cookie-banner.html` direkt **vor** das schließende `</body>`-Tag jeder Seite:

1. `<div id="ck-overlay" ...>` — der Banner selbst
2. `<button id="ck-revoke-btn" ...>` — der „Cookie-Einstellungen"-Button (erscheint nach Zustimmung unten links)

```html
  ...
  <!-- Cookie Banner -->
  <div id="ck-overlay" ...> ... </div>
  <button id="ck-revoke-btn" ...>Cookie-Einstellungen</button>
  <!-- Ende Cookie Banner -->
</body>
```

---

## Schritt 4 — JavaScript auslagern und einbinden

Erstelle eine neue Datei `/js/cookie-consent.js` und kopiere den gesamten Inhalt des `<script>`-Blocks aus `pages/cookie-banner.html` hinein (die IIFE-Funktion, die mit `(function () {` beginnt).

Dann die GA4-Measurement-ID in der Datei eintragen:

```js
const GA_ID = 'G-LX775TTC7E'; // ← hier die echte ID eintragen
```

Anschließend das Script auf jeder Seite **nach** dem Banner-Markup, aber **vor** `</body>` einbinden:

```html
  <script src="/js/cookie-consent.js"></script>
</body>
```

---

## Schritt 5 — Datenschutz-Link anpassen

Im Banner-Markup gibt es einen Link zur Datenschutzerklärung. Bitte durch die korrekte URL ersetzen:

```html
<a href="/datenschutz">Datenschutzerklärung</a>
```

---

## Reihenfolge im `<head>` — Zusammenfassung

Die Reihenfolge ist wichtig, damit Consent Mode korrekt funktioniert:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- 1. Google Analytics Tag (zuerst) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-LX775TTC7E"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-LX775TTC7E');
  </script>

  <!-- 2. CSS (Banner-Styles) -->
  <link rel="stylesheet" href="/css/cookie-consent.css">

  <!-- 3. restliche Styles / Meta-Tags -->
</head>
```

```html
<body>
  <!-- Seiteninhalt -->

  <!-- 4. Banner-Markup -->
  <div id="ck-overlay">...</div>
  <button id="ck-revoke-btn">Cookie-Einstellungen</button>

  <!-- 5. Cookie Consent Script (zuletzt) -->
  <script src="/js/cookie-consent.js"></script>
</body>
```

---

## Was der Banner bereits erledigt

Zur Info — das muss nicht mehr gebaut werden:

- Kein Cookie wird gesetzt, bevor der Nutzer zustimmt (Google Consent Mode v2, Default = `denied`)
- GA4 lädt erst nach Klick auf „Alle akzeptieren" oder „Auswahl speichern" mit aktiviertem Analytics-Toggle
- Ablehnen ist genauso prominent wie Akzeptieren (DSGVO-Anforderung)
- Consent wird 365 Tage im Cookie gespeichert
- „Cookie-Einstellungen"-Button erscheint nach Entscheidung unten links und erlaubt jederzeitigen Widerruf
- IP-Anonymisierung ist aktiv, keine Daten an Werbenetzwerke

---

## Fragen?

Bei Unklarheiten bitte direkt melden, bevor etwas eingebaut wird.
