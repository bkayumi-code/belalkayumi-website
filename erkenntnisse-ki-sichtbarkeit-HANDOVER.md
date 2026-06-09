# Übergabe — Seite „Erkenntnisse zur KI-Sichtbarkeit“

Stand: 20. Mai 2026 · URL: `belalkayumi.com/erkenntnisse-ki-sichtbarkeit`

## Was geliefert wurde

| Datei | Inhalt |
|-------|--------|
| `pages/erkenntnisse-ki-sichtbarkeit.html` | Komplette, self-contained Seite. CI v4.0, 14 Einträge, Schema.org, Filter, Copy-Link. |
| `pages/index.html` | Ergänzt: „Erkenntnisse“ in Hauptnav + „Erkenntnisse KI-Sichtbarkeit“ im Footer. |
| `pages/sitemap.xml` | Sitemap inkl. neuer Seite (`priority 0.9`, `changefreq weekly`). |
| `pages/llms.txt` | llms.txt inkl. Block zur neuen Seite. |

## Erfüllte Anforderungen aus dem Briefing
- **Semantik:** `<article>` pro Eintrag, `<time datetime="YYYY-MM-DD">`, `<h2>`, eindeutige IDs (z. B. `#2026-05-19-publikationsort`).
- **Permalinks:** Jeder Eintrag hat einen Sprung-Anker + „Link kopieren“-Button (kopiert die volle Produktions-URL inkl. Anker, mit Toast-Feedback). `:target`-Highlight beim Aufruf.
- **Schema.org:** Ein JSON-LD-Graph im `<head>` — `Blog` + 14 × `BlogPosting` (mit `headline`, `datePublished`, `dateModified`, `author`, `publisher`, `articleBody`, `inLanguage`). Validiert.
- **GEO:** Alle Inhalte im HTML-Quelltext, kein JS-Rendering. Filter blendet nur per CSS aus — Crawler sehen immer alle 14 Einträge. Reading-Mode-tauglich.
- **Meta:** Title, Description, Robots, Keywords, Canonical, Open Graph, Twitter Card — 1:1 nach Briefing.
- **Design:** Bricolage Grotesque (Headlines) / Inter (Body), Teal `#28D0B3`, Datum als kleine Caps links über dem Titel, Label-Trennung (Teal = „Eigene Beobachtung“, Grau = „Recherche“), Counter „14 Erkenntnisse seit Februar 2026“ (zählt per JS automatisch hoch), Mobile-first.

## Noch zu erledigen (außerhalb dieses Workspace)

1. **OG-Bild** — ✅ erstellt: `pages/og-erkenntnisse-ki-sichtbarkeit.jpg` (1200×630, CI-dunkel, Teal-Akzent).
   Nur noch beim Deploy in den **Site-Root** legen, sodass es unter
   `belalkayumi.com/og-erkenntnisse-ki-sichtbarkeit.jpg` erreichbar ist (so verweist der Meta-Tag).
   Neu rendern (z. B. anderer Text): `python3 tools/og-image/render-og.py --out pages/og-erkenntnisse-ki-sichtbarkeit.jpg`.
2. **Twitter-Handle prüfen** — Im `<head>` steht `<meta name="twitter:creator" content="@belalkayumi">`.
   Falls kein X-/Twitter-Account existiert, diese eine Zeile entfernen.
3. **Clean URL** — Seite muss unter `/erkenntnisse-ki-sichtbarkeit` (ohne `.html`) ausgeliefert werden,
   sonst stimmen Canonical/OG/Permalinks nicht. Bei statischem Hosting: Datei als
   `/erkenntnisse-ki-sichtbarkeit/index.html` ablegen oder Rewrite-Regel setzen.
4. **sitemap.xml / llms.txt** — Falls auf belalkayumi.com bereits Live-Versionen existieren (bei Ghost
   wird `sitemap.xml` automatisch generiert!), **nicht** die Live-Datei ersetzen, sondern nur den neuen
   `<url>`-Block bzw. den llms.txt-Abschnitt übernehmen. Die hier gelieferten Dateien sind vollständige
   Referenzen für statisches Hosting.
5. **`Last-Modified`-Header** — Ist ein Server-Header, kein HTML. Beim Aktualisieren eines Eintrags den
   Server entsprechend antworten lassen (bzw. via Ghost automatisch). Im Schema steht pro Eintrag
   `dateModified` — bei Updates dort + im sichtbaren „Zuletzt aktualisiert“ + in `sitemap.xml/lastmod` mitziehen.

## Neue Einträge hinzufügen

**Statische Pflege (aktueller Stand):** Neuen Block oben in `#feed-list` einfügen — Vorlage:

```html
<article class="entry" id="JJJJ-MM-TT-slug" data-type="beobachtung"><!-- oder data-type="recherche" -->
  <div class="entry__head">
    <time class="entry__date" datetime="JJJJ-MM-TT">TT. Monat JJJJ</time>
    <span class="entry__label entry__label--beobachtung">Eigene Beobachtung</span>
    <!-- für Recherche: class="entry__label entry__label--recherche">Recherche -->
  </div>
  <h2><a href="#JJJJ-MM-TT-slug">Titel der Erkenntnis</a></h2>
  <p class="entry__body">3–6 Sätze …</p>
  <div class="entry__foot">
    <button class="entry__permalink" data-anchor="JJJJ-MM-TT-slug">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      <span class="entry__permalink-text">Link kopieren</span>
    </button>
  </div>
</article>
```

Dann: (a) passenden `BlogPosting`-Block ins JSON-LD `@graph` ergänzen + Referenz in `blogPost`-Array,
(b) `dateModified` der Seite + `sitemap.xml lastmod` auf das neue Datum setzen. Counter zählt automatisch.

**Alternativ Ghost (empfohlen für laufende Pflege):** Jeden Eintrag als Post mit Tag
`erkenntnisse-ki-sichtbarkeit` anlegen; ein Custom-Theme-Template (`tag-erkenntnisse-ki-sichtbarkeit.hbs`)
zieht alle Posts mit dem Tag reverse-chronologisch und rendert sie mit obiger Card-Struktur. Das
Schema lässt sich per Handlebars pro Post generieren. So entfällt die manuelle JSON-LD-Pflege.
Sag Bescheid, wenn ich das Ghost-Template bauen soll — der Theme-Ordner liegt unter `pages/ghost-theme/`.
