# 📋 Project Notes — Humara Pandit

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Structure** | HTML5 (Semantic) | Accessibility, SEO, no build step required |
| **Styling** | Vanilla CSS | Full control over animations, glassmorphism, CSS-only gemstone visuals; no utility-class bloat |
| **Logic** | Vanilla JavaScript (ES6+) | Clean IIFE module pattern; zero dependencies keeps bundle at ~125KB |
| **Fonts** | Google Fonts (Cinzel, Inter, Noto Sans Devanagari) | Premium serif headings + readable body text + Hindi script support |
| **Icons** | Unicode Emoji + CSS | No icon library needed; emoji for astrological symbols, CSS for gemstone orbs |
| **Hosting** | GitHub Pages / any static host | No server, no database, no build — just open `index.html` |

---

## Architecture

### Design Pattern: Section-Based SPA with IIFE Modules

```
index.html (Single Page App Shell)
    ├── 5 Sections: Hero → Form → Results → Explorer → About
    ├── 1 Modal: Gemstone Detail
    └── 1 Footer

js/
    ├── data.js          → AstrologyData     (Pure Data Layer)
    ├── astrology.js     → AstrologyEngine   (Business Logic)
    ├── particles.js     → ParticleSystem    (Canvas Rendering)
    ├── effects.js       → Effects           (UI Enhancements)
    ├── form.js          → FormController    (Form State Machine)
    ├── results.js       → ResultsController (Results Rendering)
    ├── explorer.js      → ExplorerController(Gallery + Modal)
    └── app.js           → App              (Router + Coordinator)
```

### Key Architectural Decisions

1. **IIFE Module Pattern** — Each file exposes a single namespace via Immediately Invoked Function Expression (e.g., `const AstrologyEngine = (() => { ... })();`). This avoids global pollution without needing ES modules or a bundler, keeping the project simple to run anywhere.

2. **Section-Based Routing** — Instead of a router library, navigation works by toggling `.active` class on `<section>` elements. `App.navigateTo('results')` hides all sections and shows the target. This is lightweight and sufficient for a 5-section app.

3. **Data-Driven Design** — All astrology data (zodiac signs, planets, gemstones, nakshatras) lives in `data.js` as structured constants. The engine and renderers purely consume this data, making it easy to update or extend without touching UI code.

4. **CSS-Only Gemstone Visuals** — Instead of image assets, each gemstone is rendered as a CSS `radial-gradient` orb with `box-shadow` glow. This eliminates asset loading, enables smooth animations, and demonstrates CSS mastery.

5. **Separation of Concerns** — Clear layers: Data → Engine → Controllers → UI. The astrology engine has no DOM dependency; controllers handle rendering; the app coordinates navigation.

---

## Data Flow

```
User Input (name, DOB, gender, goal)
    ↓
FormController validates → submits to App
    ↓
App calls AstrologyEngine.generateRecommendation()
    ↓
Engine computes:
    → getZodiacSign(birthDate)      → Zodiac Sign object
    → getRulingPlanet(zodiac)       → Planet object
    → getNakshatra(birthDate)       → Nakshatra object
    → getPrimaryGemstone(zodiac)    → Main gemstone
    → getSecondaryGemstone(zodiac)  → Alternative gem
    → getGoalGemstone(goal, zodiac) → Goal-boosted gem
    ↓
Returns complete recommendation object
    ↓
ResultsController.render() populates all DOM elements
Effects.renderZodiacWheel() generates SVG
Effects.renderCompatibility() shows gem harmony
```

---

## Assumptions

1. **Zodiac System**: Western/Tropical zodiac date ranges are used (most widely recognized globally). Traditional Vedic astrology uses the Sidereal system with ~23° offset — noted but not implemented as the tropical system is more familiar to general users.

2. **Nakshatra Approximation**: True Nakshatra calculation requires the Moon's exact ecliptic longitude (which needs an astronomical ephemeris library). We approximate using the Sun's position, which gives a reasonable estimate for a recommendation app.

3. **Gemstone-Planet Mapping**: Follows the universally accepted Vedic Jyotish mapping (Ruby→Sun, Pearl→Moon, etc.). These are standard across all schools of Vedic astrology.

4. **Shape Recommendations**: Zodiac-specific gemstone shapes follow the element-shape association (Fire→Triangular/Oval, Earth→Square/Rectangular, Air→Marquise/Pear, Water→Round/Cabochon) from traditional Ratna Shastra.

5. **Compatibility Matrix**: Gemstone compatibility follows the planetary friendship model (Sun-Jupiter-Mars-Moon group vs Saturn-Mercury-Venus group; Rahu-Ketu as shadow planets).

6. **Target Audience**: English-speaking users with interest in Vedic astrology. Hindi (Devanagari) names are provided alongside English for authenticity.

---

## Future Improvements

### Short-Term (Phase 2)
- [ ] **Birth Time Input** — Add time of birth for accurate Lagna (Ascendant) calculation, which would refine recommendations significantly
- [ ] **Moon Sign Calculation** — Use an ephemeris library (e.g., Swiss Ephemeris via WASM) for precise Moon position → accurate Nakshatra
- [ ] **PDF Report Generation** — Allow users to download a beautifully formatted PDF of their recommendation using html2canvas + jsPDF
- [ ] **Multi-language Support** — Add Hindi, Tamil, Telugu UI translations for broader reach
- [ ] **Dark/Light Mode Toggle** — Currently dark-only; add a light cosmic theme option

### Medium-Term (Phase 3)
- [ ] **Backend Integration** — Node.js/Express API for storing consultations, user accounts, and astrologer verification
- [ ] **Gemstone E-Commerce Links** — Partner API integration to show verified gemstone sellers with pricing
- [ ] **Astrologer Chat** — Real-time consultation with certified Jyotish astrologers
- [ ] **Push Notifications** — Remind users about auspicious wearing dates (Shukla Paksha Mondays, etc.)
- [ ] **Birth Chart Visualization** — Full Kundli (D1 chart) with house placements

### Long-Term (Phase 4)
- [ ] **Progressive Web App (PWA)** — Offline support, installable on mobile
- [ ] **AI-Powered Analysis** — LLM-based personalized interpretation of birth chart
- [ ] **Community Features** — User testimonials, gemstone reviews, before/after stories
- [ ] **Analytics Dashboard** — Track popular zodiac signs, most recommended gems, user engagement

---

## Performance Metrics

| Metric | Value |
|--------|-------|
| Total Files | 17 |
| Total Size | ~125 KB |
| Dependencies | 0 |
| Build Step | None |
| Load Time | < 1s (local) |
| Lighthouse Performance | 95+ (estimated) |

---

*Last updated: June 2026*
