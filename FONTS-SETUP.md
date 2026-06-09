# Lokale Fonts einrichten — Schritt-für-Schritt

> Was schon erledigt ist: Ich habe in deinen HTML-Dateien die Google-Fonts-CDN-Links rausgenommen und stattdessen `@font-face`-Regeln eingebaut, die auf lokale Dateien zeigen. Jetzt musst du nur noch **die Schriftdateien herunterladen und in den richtigen Ordner legen**.

---

## Was du am Ende haben wirst

```
pages/
├── fonts/                              ← neu, musst du anlegen
│   ├── bricolage-grotesque-400.woff2
│   ├── bricolage-grotesque-500.woff2
│   ├── bricolage-grotesque-600.woff2
│   ├── bricolage-grotesque-700.woff2
│   ├── bricolage-grotesque-800.woff2
│   ├── inter-300.woff2
│   ├── inter-400.woff2
│   ├── inter-500.woff2
│   ├── inter-600.woff2
│   └── inter-700.woff2
├── index.html
├── blog.html
└── ghost-theme-preview.html
```

10 Dateien insgesamt.

---

## Schritt 1: Bricolage Grotesque herunterladen

1. Öffne: **https://gwfh.mranftl.com/fonts**
2. Suche im Suchfeld oben: **Bricolage Grotesque** → klicke auf den Treffer
3. Du siehst jetzt eine Konfigurationsseite. Stelle ein:

   **a) "1. Select styles"** (Schriftschnitte / Weights)
   Wähle nur diese fünf an:
   - ☑ regular 400
   - ☑ 500
   - ☑ 600
   - ☑ 700
   - ☑ 800

   Alle anderen abwählen.

   **b) "2. Select charsets"** (Zeichensätze)
   Stelle ein:
   - ☑ latin

   (`latin` reicht für Deutsch komplett. `latin-ext` brauchst du nur für osteuropäische Sprachen.)

   **c) "3. Choose the browser support type"**
   Wähle: **Modern Browsers** (gibt dir nur `.woff2`-Dateien — kleinste Dateigröße)

4. Scrolle nach unten zum Button **"Download files"** → ZIP-Datei wird heruntergeladen
5. ZIP entpacken (Doppelklick im Finder)

Du bekommst Dateien mit Namen wie:
```
bricolage-grotesque-v7-latin-regular.woff2
bricolage-grotesque-v7-latin-500.woff2
bricolage-grotesque-v7-latin-600.woff2
bricolage-grotesque-v7-latin-700.woff2
bricolage-grotesque-v7-latin-800.woff2
```

(Die `v7` kann bei dir eine andere Versionsnummer sein — ist egal.)

---

## Schritt 2: Inter herunterladen

Genau dasselbe Vorgehen wie oben, nur mit:
- Suche: **Inter**
- Schriftschnitte: **300, 400 (regular), 500, 600, 700**
- Charsets: **latin**
- Browser: **Modern Browsers**
- Download → entpacken

Du bekommst:
```
inter-v18-latin-300.woff2
inter-v18-latin-regular.woff2
inter-v18-latin-500.woff2
inter-v18-latin-600.woff2
inter-v18-latin-700.woff2
```

---

## Schritt 3: Fonts-Ordner anlegen

In deinem Projekt-Verzeichnis (dort wo `index.html` liegt) einen neuen Ordner anlegen:

```
fonts/
```

---

## Schritt 4: Dateien hineinkopieren UND umbenennen

Das ist der wichtigste Schritt. Mein Code erwartet exakt diese Dateinamen — wenn sie nicht passen, lädt die Schrift nicht.

**Kopiere die 10 WOFF2-Dateien in den `fonts/`-Ordner und benenne sie wie folgt um:**

| Originalname (aus ZIP, etwa) | Neuer Name |
|---|---|
| `bricolage-grotesque-v7-latin-regular.woff2` | `bricolage-grotesque-400.woff2` |
| `bricolage-grotesque-v7-latin-500.woff2` | `bricolage-grotesque-500.woff2` |
| `bricolage-grotesque-v7-latin-600.woff2` | `bricolage-grotesque-600.woff2` |
| `bricolage-grotesque-v7-latin-700.woff2` | `bricolage-grotesque-700.woff2` |
| `bricolage-grotesque-v7-latin-800.woff2` | `bricolage-grotesque-800.woff2` |
| `inter-v18-latin-300.woff2` | `inter-300.woff2` |
| `inter-v18-latin-regular.woff2` | `inter-400.woff2` |
| `inter-v18-latin-500.woff2` | `inter-500.woff2` |
| `inter-v18-latin-600.woff2` | `inter-600.woff2` |
| `inter-v18-latin-700.woff2` | `inter-700.woff2` |

**Wichtig zur Übersetzung:** „regular" = „400". Das ist die Standard-Schriftstärke.

**Tipp im Finder:** Datei anklicken → Enter → neuen Namen tippen → Enter. Oder Rechtsklick → „Umbenennen".

---

## Schritt 5: Lokal testen

Bevor du auf Netlify deployst:

1. Öffne `index.html` im Browser (Doppelklick)
2. Rechtsklick → **"Untersuchen"** → Tab **"Network"** → Seite neu laden (Cmd+R)
3. Filter: **Font**
4. Du solltest sehen:
   - `inter-400.woff2` und `bricolage-grotesque-700.woff2` laden mit Status **200**
   - **Keine** Requests mehr an `fonts.googleapis.com` oder `fonts.gstatic.com`

Falls eine Datei mit **404** angezeigt wird → Dateiname stimmt nicht. Vergleiche mit der Tabelle oben.

---

## Schritt 6: Deploy auf Netlify

Wenn du Netlify per Git nutzt:
```bash
git add fonts/ pages/index.html pages/blog.html pages/ghost-theme-preview.html pages/ghost-theme/partials/theme-settings.hbs
git commit -m "Lokale Fonts statt Google Fonts CDN (DSGVO)"
git push
```

Wenn du per Drag-and-Drop deployst: Den kompletten `pages/`-Ordner inkl. neuem `fonts/`-Unterordner ziehen.

---

## Sonderfall: Ghost Theme (`ghost-theme/`)

Falls du das Ghost-Theme aktiv nutzt (separates Ghost-CMS, nicht über Netlify):

1. Lege im Ghost-Theme einen Ordner an: `pages/ghost-theme/assets/fonts/`
2. **Dieselben 10 WOFF2-Dateien** dort hineinkopieren (gleiche Namen wie oben)
3. Theme als ZIP packen und in Ghost Admin neu hochladen

Falls du das Ghost-Theme nicht nutzt: ignorieren, Schritt nicht nötig.

---

## Was du danach erledigen solltest

- ✅ **Datenschutzerklärung**: Den Abschnitt „Google Fonts" rausnehmen (falls vorhanden)
- ✅ **Sanity-Check** der Live-Seite mit DevTools → Network (siehe Schritt 5)
- ✅ **Optional**: PageSpeed-Test bei https://pagespeed.web.dev → LCP sollte sich um 100–300 ms verbessern

---

## Bei Problemen

Wenn die Schrift nach dem Deploy nicht angezeigt wird:

1. Browser-Cache leeren (Cmd+Shift+R)
2. DevTools → Network → Font: Welche Datei zeigt 404?
3. Dateinamen 1:1 mit der Tabelle oben vergleichen — Groß-/Kleinschreibung zählt
4. Pfad prüfen: Liegt `fonts/` wirklich auf der gleichen Ebene wie `index.html`?

Wenn du steckenbleibst: sag Bescheid, was DevTools zeigt — dann fixen wir's.
