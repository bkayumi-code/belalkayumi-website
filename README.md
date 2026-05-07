# belalkayumi.com

Static website for [belalkayumi.com](https://belalkayumi.com) — personal brand of Belal Kayumi (GEO & AI Visibility, DACH).

## Stack

- **Static HTML** (no build step) — fastest possible delivery
- **Hosting:** Cloudflare Pages (auto-deploy on push to `main`)
- **DNS:** IONOS → Cloudflare
- **Blog:** Separate Ghost instance on `blog.belalkayumi.com`
- **Fonts:** Self-hosted woff2 (DSGVO-konform, no Google Fonts CDN)

## Structure

```
.
├── index.html         Homepage
├── blog.html          Blog landing fallback (production redirects /blog → Ghost)
├── impressum.html     Imprint
├── datenschutz.html   Privacy policy
├── fonts/             Bricolage Grotesque + Inter (self-hosted)
├── robots.txt         AI-crawler-friendly
├── sitemap.xml
└── _redirects         Cloudflare Pages redirect rules
```

## Local Preview

Open `index.html` directly in the browser, or run a quick local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Pushes to `main` trigger an automatic Cloudflare Pages deployment (~30s).

```bash
git add -A
git commit -m "Update homepage hero text"
git push
```

## Open To-Dos

- [ ] Add `favicon.ico` + `apple-touch-icon.png` to repo root
- [ ] Add `og-image.jpg` (referenced in `<meta property="og:image">`)
- [ ] Decide on analytics (Plausible recommended) and add snippet
- [ ] Set Ghost hostname for `/blog` redirect in `_redirects`

## Maintenance

When updating content:
1. Edit the relevant `.html` file
2. `git add -A && git commit -m "..."` and `git push`
3. Cloudflare Pages auto-deploys

When updating fonts:
1. Replace files in `fonts/`
2. Make sure the `@font-face` `src` paths in HTML still match
