# 💎 Humara Pandit — Vedic Gemstone Recommendation App

A premium, fully interactive Vedic astrology-based gemstone recommendation web application built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no dependencies, zero build step.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Features

### 🔮 Core Astrology Engine
- **12 Zodiac Signs** with accurate date-range detection
- **27 Nakshatras** (lunar mansions) mapped via Sun's ecliptic longitude
- **9 Navagraha Planets** with gemstone associations
- **Goal-based refinement** — recommendations tuned by life goals (Wealth, Health, Love, Career, Spirituality)
- **Smart secondary gemstone** selection (Nakshatra → Goal → Zodiac fallback)

### 💎 Gemstone Recommendations
- **Personalized primary & alternative gemstone** based on birth chart
- **Zodiac-specific shape/cut** recommendation (e.g., Triangular for Aries, Heart-shaped for Libra)
- **Wearing instructions**: finger, hand, metal, day, weight, shape
- **Energization mantras** with Hindi (Devanagari) and transliteration
- **Gemstone compatibility** — shows which gems harmonize and which to avoid

### 🎨 Premium Design
- **Canvas particle system** — interactive mouse-reactive cosmic background
- **CSS-only gemstone orbs** — 9 unique radial-gradient rendered gems with glow effects
- **Glassmorphism cards** with gradient overlays
- **SVG Zodiac Wheel** — interactive wheel highlighting user's sign
- **3D tilt effect** on gemstone cards (perspective + mouse tracking)
- **Scroll reveal animations** via IntersectionObserver
- **Animated hero counters** with cubic ease-out
- **Orbital planet animation** during analysis loading
- **Shooting star animations** in cosmic background

### 📱 Production Features
- **Responsive design** — mobile-first with hamburger menu
- **LocalStorage persistence** — remembers last recommendation
- **Web Share API** integration with clipboard fallback
- **SEO optimized** — meta tags, semantic HTML, proper heading hierarchy
- **Accessible** — ARIA labels, keyboard navigation, focus management
- **Zero dependencies** — ~125KB total, no npm, no build step

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/Humara_pandit.git

# Open directly in browser (no server needed)
open index.html

# OR serve locally
npx serve -l 3000
```

---

## 📁 Project Structure

```
Humara_pandit/
├── index.html              # SPA shell — all 5 sections + modal
├── css/
│   ├── index.css           # Design system, tokens, 950+ lines
│   ├── animations.css      # Keyframe animations (twinkle, orbit, glow)
│   ├── hero.css            # Hero landing with floating gems
│   ├── form.css            # Multi-step form wizard
│   ├── results.css         # Results with gemstone hero card
│   └── explorer.css        # Gemstone gallery grid + modal
├── js/
│   ├── data.js             # Complete Vedic astrology dataset
│   ├── astrology.js        # Zodiac/Nakshatra calculation engine
│   ├── particles.js        # Canvas particle system
│   ├── effects.js          # 3D tilt, scroll reveal, zodiac wheel
│   ├── form.js             # Form wizard controller
│   ├── results.js          # Results renderer
│   ├── explorer.js         # Gemstone explorer + modal
│   └── app.js              # Main SPA router + coordinator
├── .gitignore
└── README.md
```

---

## 🌟 User Flow

```
🏠 Hero Landing
   ↓ "Begin Your Journey"
📝 Step 1: Name & Date of Birth (auto-detects zodiac ✨)
   ↓ Continue
🎯 Step 2: Gender & Life Goal
   ↓ "Discover My Gemstone"
🔮 Analysis Animation (3.5s orbital planets)
   ↓
💎 Results: Primary Gemstone + Zodiac Wheel
   ├── Benefits, Wearing Instructions, Mantra
   ├── Gemstone Compatibility (✅ Compatible / ⚠️ Avoid)
   └── Alternative Gemstone
   ↓
🗂️ Explore All 9 Navaratna Gemstones
   └── Filter by Element → Detail Modal
```

---

## 🛠️ Technical Highlights

| Area | Approach |
|------|----------|
| **Architecture** | IIFE module pattern — clean namespaces without bundler |
| **Styling** | CSS Custom Properties design system with 100+ tokens |
| **Gemstone Visuals** | CSS radial-gradient orbs — zero image assets |
| **Background** | Canvas 2D particle system with mouse interaction |
| **Zodiac Wheel** | Programmatic SVG generation with dynamic highlighting |
| **Navigation** | Section-based SPA with show/hide routing |
| **Persistence** | localStorage for recommendation history |
| **Sharing** | Web Share API with navigator.clipboard fallback |
| **Performance** | requestAnimationFrame, debounced resize, IntersectionObserver |
| **Accessibility** | ARIA roles, keyboard nav, semantic HTML5 |

---

## 📊 Astrology Data

- **Zodiac Signs**: 12 signs with date ranges, ruling planets, elements, traits, recommended shapes
- **Navagraha Planets**: 9 planets with Sanskrit names, symbols, gemstone mappings
- **Navaratna Gemstones**: 9 gems with benefits, wearing instructions, mantras, compatibility
- **Nakshatras**: 27 lunar mansions with ruling planets and degree ranges
- **Life Goals**: 5 categories with boost-planet mappings

---

## 🎯 Built For

This project was built as an assignment for **Humara Pandit** to demonstrate:
- Clean, scalable code architecture
- Premium UI/UX design with attention to detail
- Deep domain knowledge (Vedic astrology & Ratna Shastra)
- Engineering depth (canvas animations, SVG generation, accessibility)
- Production-ready code quality

---

## 📜 License

MIT License — feel free to use and modify.

---

<p align="center">
  Built with ❤️ and Vedic wisdom<br>
  <strong>💎 Humara Pandit</strong> — Aligning your life with the cosmos
</p>
