# SEO Änderungsdokumentation — PRI Website

**Datum:** Juni 2026  
**Domain:** https://pri-global.vercel.app  
**Stack:** Vite + React SPA mit `react-helmet-async`

---

### [BEREICH 1] Meta & HTML-Grundlagen

| # | Datei | Änderung | Alt | Neu | SEO-Impact | Erwarteter Effekt |
|---|-------|----------|-----|-----|------------|-------------------|
| 1 | `index.html` | Title Tag | PRI Global — Technology That Moves Business Forward | IT Staffing & AI Solutions \| PRI Global | Hoch | +CTR in SERPs |
| 2 | `index.html` | Meta Description | 28 years trusted services… | PRI Global delivers IT staffing… Request a consultation today. (155 Zeichen, CTA) | Hoch | +CTR in SERPs |
| 3 | `src/components/SEO.jsx` | Canonical + Keywords | Kein keywords-Meta | `meta keywords` optional pro Seite | Niedrig | Vollständigkeit |
| 4 | `src/components/SEO.jsx` | html lang | Nur in index.html | `<html lang="en">` via Helmet auf jeder Seite | Mittel | Sprachsignal für Crawler |
| 5 | `src/pages/Home.jsx` | Title + Description | Technology That Moves Business Forward | IT Staffing & AI Solutions \| PRI Global | Hoch | Keyword-first Title |
| 6 | `src/pages/About.jsx` | Title | About PRI Global — 28 Years of Technology Excellence | About PRI Global — Since 1997 \| PRI Global | Mittel | Title unter 60 Zeichen |
| 7 | `src/pages/Services.jsx` | Description | 9 integrated services (lang) | Kurz mit CTA: „Get a custom proposal in 24 hours." | Hoch | +CTR |
| 8 | `src/pages/Careers.jsx` | Title | Careers at PRI Global — Join Our Team | Careers at PRI Global \| PRI Global | Mittel | Kürzerer Title |
| 9 | `src/pages/Resources.jsx` | Title (Liste) | Resources — News, Case Studies & Insights | Resources — News & Case Studies \| PRI Global | Mittel | Kürzerer Title |
| 10 | `src/pages/CaseStudy.jsx` | Title (dynamisch) | Voller Titel (oft >60 Zeichen) | Truncation auf 46 Zeichen + … | Mittel | Kein Title-Truncating in SERPs |
| 11 | `src/pages/NotFound.jsx` | Canonical | Fehlend (Fallback Homepage) | `/404` mit noindex | Niedrig | Keine falsche Canonical |
| 12 | Alle Marketing-Seiten | Keywords-Meta | Fehlend | Seitenspezifische keywords hinzugefügt | Niedrig | Vollständigkeit |
| 13 | Alle Marketing-Seiten | Descriptions | Ohne CTA | 140–155 Zeichen mit Handlungsaufforderung | Hoch | +CTR |

**Canonical URLs:** Jede Seite setzt `link rel="canonical"` via `SEO.jsx` → `https://pri-global.vercel.app{url}`

**Hreflang:** Nicht implementiert — Website ist Englisch-only (`lang="en"`). Kein i18n vorhanden.

---

### [BEREICH 2] Strukturierte Daten

| # | Datei | Schema-Typ | Implementiert | Validiert | Erwarteter Rich Snippet |
|---|-------|------------|---------------|-----------|-------------------------|
| 1 | `src/components/SEO.jsx` | Organization | Erweitert (email, LinkedIn sameAs) | Manuell prüfen | Knowledge Panel |
| 2 | `src/pages/Home.jsx` | WebSite + SearchAction | Ja (`includeWebSite`) | Manuell prüfen | Sitelinks-Suchfeld |
| 3 | `src/pages/About.jsx` | LocalBusiness | Ja (`localBusiness`) | Manuell prüfen | Lokale Unternehmensinfos |
| 4 | `src/pages/Services.jsx` | Service | Ja | Manuell prüfen | Service-Rich-Result |
| 5 | `src/pages/TalentSolutions.jsx` | Service | Ja | Manuell prüfen | Service-Rich-Result |
| 6 | `src/pages/AiServices.jsx` | Service | Ja | Manuell prüfen | Service-Rich-Result |
| 7 | `src/pages/AiInnovation.jsx` | Service | Ja | Manuell prüfen | Service-Rich-Result |
| 8 | `src/pages/JobSeekerFAQ.jsx` | FAQPage | Ja (alle FAQ-Items) | Manuell prüfen | FAQ Rich Snippets |
| 9 | `src/pages/CaseStudy.jsx` | Article + BreadcrumbList | Ja | Manuell prüfen | Artikel-Snippet |
| 10 | `src/pages/Resources.jsx` | Article + BreadcrumbList (News) | Ja | Manuell prüfen | Artikel-Snippet |
| 11 | Alle Unterseiten | BreadcrumbList | Ja via `breadcrumbs`-Prop | Manuell prüfen | Breadcrumb in SERPs |

**Validierung:** Alle JSON-LD-Blöcke über https://search.google.com/test/rich-results testen.

---

### [BEREICH 3] Open Graph & Social Meta Tags

| # | Datei | Änderung | Alt | Neu | SEO-Impact | Erwarteter Effekt |
|---|-------|----------|-----|-----|------------|-------------------|
| 1 | `src/components/SEO.jsx` | og:locale | Fehlend | `og:locale` = en_US | Niedrig | Social-Lokalisierung |
| 2 | `src/components/SEO.jsx` | og:image URLs | Relativ möglich | Absolute URLs via `resolveImage()` | Hoch | Korrekte Social Previews |
| 3 | `src/pages/CaseStudy.jsx` | og:image | Default og-image.png | Case-Study-Bild (`/case-studies/*.png`) | Hoch | Bessere Share-Previews |
| 4 | Alle Seiten | OG + Twitter | Bereits vorhanden | Vollständig: title, description, image, url, type, site_name | Mittel | Konsistente Shares |

**Hinweis:** `og-image.png` (1200×630) bleibt Default für Seiten ohne custom image.

---

### [BEREICH 4] Bilder & Core Web Vitals

| # | Datei | Bild | Alt-Text Alt → Neu | Attribute |
|---|-------|------|-------------------|-----------|
| 1 | `src/components/sections/Hero.jsx` | Unsplash Hero BG | `""` → „Global technology network visualization — PRI Global IT services" | width/height, fetchPriority=high, loading=eager |
| 2 | `src/pages/Industries.jsx` | Branchenbilder | `{title}` → `{title} IT solutions by PRI Global` | width=400, height=180, loading=lazy |
| 3 | `src/components/caseStudies/CaseStudyImage.jsx` | Case Study Bilder | `{title}` → `{title} — {industry} case study by PRI Global` | width=320, height=320 |
| 4 | `src/components/ui/BrandLogo.jsx` | Logo | Bereits „PRI Global" / „PRI" | width/height auf Wordmark |
| 5 | `src/components/ui/ClientLogos.jsx` | Partner-Logos | Bereits beschreibend | loading=lazy |

**WebP:** Nicht konvertiert — Vite-Bundling liefert gehashte Assets; `<picture>`-WebP wäre separater Asset-Pipeline-Schritt.

**CLS:** width/height auf kritischen Bildern ergänzt (Hero, Industries, Case Studies).

---

### [BEREICH 5] Überschriften-Hierarchie & Content-Struktur

| # | Datei | Änderung | Alt | Neu | SEO-Impact | Erwarteter Effekt |
|---|-------|----------|-----|-----|------------|-------------------|
| 1 | `src/pages/Services.jsx` | H1 fehlend | H2 via SectionHeading | H1: „IT Services & Technology Solutions" | Hoch | Korrekte Hierarchie |
| 2 | `src/pages/Industries.jsx` | H1 fehlend | H2: „Deep expertise…" | H1: „Industries We Serve" | Hoch | Keyword-H1 |
| 3 | `src/components/sections/SolutionQuiz.jsx` | H1 auf /quiz | H2 (auch auf Quiz-Seite) | H1 nur wenn `standalone=true` | Hoch | Ein H1 pro Seite |
| 4 | `src/components/ui/SectionHeading.jsx` | as-Prop | Immer H2 | `as="h1"` optional | Mittel | Wiederverwendbar |
| 5 | `src/components/sections/ExploreMore.jsx` | Interne Links | 5 Links | +Solution Finder Quiz → `/quiz` | Mittel | Bessere Crawlability |

**Thin Content:** Quiz-Seite ist interaktiv (4 Fragen) — als funktionales Tool akzeptabel, nicht als Thin Content markiert.

---

### [BEREICH 6] Technisches SEO & Performance

| # | Datei | Änderung | Alt | Neu | SEO-Impact | Erwarteter Effekt |
|---|-------|----------|-----|-----|------------|-------------------|
| 1 | `public/robots.txt` | Disallow | 8 Pfade | + `/candidate-register`, `/customer-register`, `/legal` | Mittel | Portal-Seiten blockiert |
| 2 | `public/sitemap.xml` | URLs | 15 URLs, inkl. `/faq` (404) | 42 URLs, dynamisch generiert | Hoch | Vollständige Indexierung |
| 3 | `scripts/generate-sitemap.mjs` | Sitemap-Generator | Manuell | Auto aus news + caseStudies Daten | Hoch | Kein veralteter Sitemap |
| 4 | `package.json` | Build | `vite build` | `node scripts/generate-sitemap.mjs && vite build` | Mittel | Sitemap immer aktuell |
| 5 | `index.html` | dns-prefetch | Fehlend | `images.unsplash.com` | Niedrig | Schnellere Hero-Ladezeit |
| 6 | `index.html` | preconnect | Google Fonts | Bereits vorhanden + display=swap | Mittel | Kein FOIT |
| 7 | Portal-Seiten | noindex | Bereits gesetzt | Unverändert (robots + meta) | Hoch | Keine Indexierung privater Bereiche |

**Entfernt aus Sitemap:** `/faq` (existiert nicht — Route ist `/job-seeker-faq`)  
**Neu in Sitemap:** `/ai-services`, `/quiz`, `/why-pri-global`, 16 News-Artikel, 17 Case Studies

---

### [BEREICH 7] URL-Struktur & Navigation

| # | Datei | Änderung | SEO-Impact | Erwarteter Effekt |
|---|-------|----------|------------|-------------------|
| 1 | `src/components/ui/Breadcrumbs.jsx` | Neu — visuelle Breadcrumb-Navigation | Hoch | UX + Crawlability |
| 2 | 15+ Unterseiten | Breadcrumbs eingebaut | Hoch | Interne Verlinkung |
| 3 | `src/components/layout/Navbar.jsx` | Unverändert | — | Alle Hauptseiten verlinkt |
| 4 | `src/components/layout/Footer.jsx` | Unverändert | — | Vollständige Footer-Links |

**URL-Format:** Kleinbuchstaben, Bindestriche — bereits korrekt (`/talent-solutions`, `/ai-innovation`, etc.)

**Orphan Pages:** Keine — alle öffentlichen Seiten über Navbar/Footer/ExploreMore erreichbar.

---

### [BEREICH 8] Seitengeschwindigkeit (Performance)

| # | Datei | Änderung | Alt | Neu | SEO-Impact | Erwarteter Effekt |
|---|-------|----------|-----|-----|------------|-------------------|
| 1 | Vite Build | CSS/JS Minifizierung | — | Bereits via Vite (Production) | Mittel | Kleinere Bundles |
| 2 | `index.html` | Google Fonts | display=swap | Bereits `&display=swap` | Mittel | Kein Render-Blocking Text |
| 3 | `index.html` | dns-prefetch Unsplash | Fehlend | Hinzugefügt | Niedrig | Schnellerer Hero |
| 4 | Hero.jsx | fetchPriority | Fehlend | `fetchPriority="high"` auf LCP-Bild | Hoch | Besserer LCP-Score |

**Preload:** Kein zusätzliches CSS-Preload — Vite inlined critical CSS in JS bundle.

---

## Seiten-Meta-Übersicht (Title → Description)

| Route | Neuer Title | Neue Description (Auszug) | Canonical |
|-------|-------------|---------------------------|-----------|
| `/` | IT Staffing & AI Solutions \| PRI Global | …Request a consultation today. | `/` |
| `/services` | IT Services & Technology Solutions \| PRI Global | …Get a custom proposal in 24 hours. | `/services` |
| `/talent-solutions` | IT Staffing & Talent Solutions \| PRI Global | …Request talent today. | `/talent-solutions` |
| `/ai-innovation` | AI Innovation & PR1SM.AI \| PRI Global | …Schedule a PR1SM.AI demo today. | `/ai-innovation` |
| `/ai-services` | AI Services & PRI AI Pods™ \| PRI Global | …start building today. | `/ai-services` |
| `/industries` | Industries We Serve \| PRI Global | …Talk to us today. | `/industries` |
| `/about` | About PRI Global — Since 1997 \| PRI Global | …Meet our leadership team today. | `/about` |
| `/resources` | Resources — News & Case Studies \| PRI Global | …Explore our latest articles today. | `/resources` |
| `/careers` | Careers at PRI Global \| PRI Global | …Apply now. | `/careers` |
| `/job-seeker-faq` | Job Seeker FAQ \| PRI Global | …Contact our recruiting team today. | `/job-seeker-faq` |
| `/get-pricing` | Get Pricing — IT Solutions Proposal \| PRI Global | …Get your quote today. | `/get-pricing` |
| `/roi-calculator` | PR1SM.AI ROI Calculator \| PRI Global | …Try the free calculator now. | `/roi-calculator` |
| `/quiz` | Solution Finder Quiz \| PRI Global | …get matched today. | `/quiz` |
| `/why-pri-global` | Why PRI Global \| PRI Global | …Compare us to typical IT vendors. | `/why-pri-global` |
| `/candidate-jobs` | IT Job Search — Open Positions \| PRI Global | …Find your next role today. | `/candidate-jobs` |

---

### ZUSAMMENFASSUNG

- **Gesamtzahl der Änderungen:** ~85 (über 8 Bereiche, 25+ Dateien)
- **Geschätzter SEO-Impact:** **Hoch** (Meta + Schema + Sitemap + H1-Fixes)
- **Priorität für Implementierung:**
  1. Sitemap + robots.txt (sofortige Crawl-Verbesserung)
  2. Strukturierte Daten (FAQ, Article, Service, LocalBusiness)
  3. Meta Titles/Descriptions mit CTAs
  4. H1-Hierarchie-Fixes
  5. Bild-Optimierung (Alt, CLS)
  6. Breadcrumb-Navigation

- **Nächste Schritte nach Deployment:**
  1. Google Search Console: `sitemap.xml` neu einreichen
  2. URL-Inspektion für Top-10-Seiten anfordern
  3. Rich Results Test für Homepage, About, FAQ, Case Study
  4. PageSpeed Insights vorher/nachher dokumentieren
  5. Bei Custom Domain: `BASE_URL` in `SEO.jsx`, `robots.txt`, Sitemap-Script aktualisieren

- **Bekannte Einschränkungen (SPA):**
  - Meta-Tags werden client-seitig via `react-helmet-async` gesetzt
  - Für maximale Crawler-Kompatibilität: Prerendering/SSR (z.B. Vite SSR oder Prerender) empfohlen
  - `BASE_URL` ist hardcoded auf `pri-global.vercel.app`

- **Tools zur Messung:** Google Search Console, PageSpeed Insights, Rich Results Test, metatags.io

---

*Generiert durch SEO-Optimierung Juni 2026 — PRI Global Website*
