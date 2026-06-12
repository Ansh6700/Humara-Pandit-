# 📋 Project Notes — Humara Pandit

## Tech Stack

| Layer | Technology | Why I Chose It |
|-------|-----------|----------------|
| **Structure** | HTML5 (Semantic) | Clean, accessible, SEO-friendly — no build tools needed |
| **Styling** | Vanilla CSS | Full creative control over the cosmic theme, animations, and CSS-only gemstone visuals |
| **Logic** | Vanilla JavaScript (ES6+) | IIFE module pattern for clean architecture; zero dependencies keeps it lightweight at ~125KB |
| **Fonts** | Google Fonts (Cinzel, Inter, Noto Sans Devanagari) | Cinzel for premium headings, Inter for readability, Noto Sans Devanagari for Hindi script |
| **Visuals** | CSS Gradients + Canvas API | Gemstone orbs are pure CSS radial-gradients; background uses Canvas 2D for interactive particles |
| **Hosting** | GitHub Pages | Free, fast, works with static files — just push and deploy |

I deliberately chose vanilla technologies (no React/Vue/Tailwind) to demonstrate core web fundamentals and keep the project dependency-free.

---

## Architecture

### My Approach: Section-Based SPA with IIFE Modules

I structured the app as a single-page application with show/hide sections instead of using a router library — it's simpler and sufficient for this scope.

```
index.html (Single Page App Shell)
    ├── 5 Sections: Hero → Form → Results → Explorer → About
    ├── 1 Modal: Gemstone Detail
    └── 1 Footer

js/
    ├── data.js          → AstrologyData     (Pure Data — all astrology info)
    ├── astrology.js     → AstrologyEngine   (Calculation Logic)
    ├── particles.js     → ParticleSystem    (Canvas Background)
    ├── effects.js       → Effects           (3D Tilt, Zodiac Wheel, etc.)
    ├── form.js          → FormController    (Multi-step Form)
    ├── results.js       → ResultsController (Results Page)
    ├── explorer.js      → ExplorerController(Gallery + Modal)
    └── app.js           → App              (Main Router)
```

### Key Design Decisions I Made

1. **IIFE Module Pattern** — I chose this over ES modules because it works without a bundler or server. Each file exposes one namespace (e.g., `AstrologyEngine`), keeping things clean and organized.

2. **CSS-Only Gemstone Orbs** — Instead of using gemstone images, I hand-crafted each gem using CSS `radial-gradient` with highlight reflections and glow effects. This eliminates asset loading and looks premium.

3. **Data-Driven Architecture** — I put all astrology data (zodiac signs, planets, gemstones, nakshatras) in a single `data.js` file. The engine and UI layers just consume this data, making it easy to update without touching logic or UI.

4. **Canvas Particle System** — I built an interactive particle background that responds to mouse movement, with connecting lines between nearby particles. This gives the cosmic feel I wanted.

5. **SVG Zodiac Wheel** — I programmatically generate an SVG wheel that highlights the user's zodiac sign. No image assets — it's all calculated and drawn in JavaScript.

---

## Data Flow

```
User enters: Name, DOB, Gender, Goal
    ↓
FormController validates input
    ↓
AstrologyEngine calculates:
    → Zodiac sign from birth date
    → Ruling planet from zodiac
    → Nakshatra from Sun's ecliptic longitude
    → Primary gemstone from zodiac-planet mapping
    → Secondary gemstone (Nakshatra → Goal → fallback)
    → Zodiac-specific shape recommendation
    ↓
ResultsController renders everything to DOM
Effects module adds zodiac wheel + compatibility
```

---

## My Research & Assumptions

I spent time researching Vedic astrology (Jyotish Shastra) to ensure accuracy:

1. **Zodiac System**: I used Western/Tropical zodiac date ranges since they're most widely recognized. Vedic astrology technically uses Sidereal (with ~23° Ayanamsa offset) — I noted this as a future improvement.

2. **Nakshatra Calculation**: True Nakshatra needs the Moon's exact position (requires an ephemeris library). I approximated using the Sun's ecliptic longitude — reasonable for a recommendation app without astronomical libraries.

3. **Gemstone-Planet Mappings**: I followed the standard Vedic Jyotish mappings that are consistent across all schools — Ruby→Sun, Pearl→Moon, Red Coral→Mars, etc.

4. **Shape Recommendations**: I researched the element-shape associations from Ratna Shastra traditions — Fire signs get angular shapes (Triangular), Earth gets grounded shapes (Square/Rectangular), Air gets flowing shapes (Marquise/Pear), Water gets rounded shapes (Round/Cabochon).

5. **Compatibility Rules**: I implemented the traditional planetary friendship model — Sun, Jupiter, Mars, Moon are friendly; Saturn, Mercury, Venus are friendly with each other but not with the first group.

---

## Challenges I Faced

1. **Zodiac Date Edge Cases** — The Capricorn sign wraps from December to January. My initial date-matching logic missed this. I debugged and rewrote the function to handle all three cases: wrap-around months, two-month spans, and same-month ranges.

2. **Browser Caching** — During development, the browser kept serving old JavaScript files. I solved this by adding cache-busting query strings (`?v=2`) to all script and CSS imports.

3. **Responsive Zodiac Wheel** — The SVG wheel needed to scale properly on mobile without breaking the segment layout. I used `viewBox` for responsive scaling.

4. **Performance** — The canvas particle system needed optimization to avoid frame drops. I used `requestAnimationFrame`, reduced particle count on mobile, and debounced the resize handler.

---

## Future Improvements

### Phase 2 — What I'd Build Next
- [ ] Birth time input for accurate Ascendant (Lagna) calculation
- [ ] Moon-based Nakshatra using an ephemeris library (Swiss Ephemeris via WASM)
- [ ] PDF report download (html2canvas + jsPDF)
- [ ] Hindi/Tamil/Telugu language support
- [ ] Dark/Light theme toggle

### Phase 3 — With a Backend
- [ ] User accounts and consultation history (Node.js + MongoDB)
- [ ] Integration with gemstone e-commerce APIs
- [ ] Real-time astrologer chat feature
- [ ] Push notifications for auspicious wearing dates
- [ ] Full Kundli (birth chart) visualization

### Phase 4 — Scale
- [ ] Progressive Web App (offline support)
- [ ] AI-powered personalized birth chart interpretation
- [ ] Community features (reviews, testimonials)
- [ ] Analytics dashboard

---

## Project Stats

| Metric | Value |
|--------|-------|
| Total Files | 17 source files |
| Total Size | ~125 KB |
| External Dependencies | 0 |
| Build Step Required | None |
| Lines of Code | ~5,800 |

---

*Written by: Ansh*  
*Last updated: June 2026*
