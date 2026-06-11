# 🎬 Demo Video Script — Humara Pandit
# Duration: 5-10 minutes
# Use OBS Studio or Windows Game Bar (Win+G) to record

---

## INTRO (0:00 – 0:30)
"Hi, I'm Ansh and this is Humara Pandit — a Vedic astrology-based 
gemstone recommendation app built with vanilla HTML, CSS, and JavaScript.
No frameworks, no dependencies, zero build step.
Let me walk you through it."

---

## HERO PAGE (0:30 – 1:30)
- Show the cosmic landing page with particle background
- Hover mouse to demonstrate particle interaction
- Point out: floating gems, animated counters (9, 12, 27), testimonials
- Scroll down briefly to show scroll-reveal animations
- Click "Begin Your Journey"

**Talk about:**
"The hero features an interactive canvas particle system that responds to 
mouse movement. The stats animate in with easing. Everything is pure CSS 
and vanilla JavaScript."

---

## FORM — Step 1 (1:30 – 2:30)
- Enter your name
- Select a date of birth (e.g., August 5, 1999)
- Show the zodiac auto-detection appearing (Leo ♌)
- Change the date to show it updates live (try Jan 25 → Aquarius ♒)
- Click Continue

**Talk about:**
"The form auto-detects your zodiac sign as soon as you enter your date. 
The zodiac engine handles all 12 signs including Capricorn's Dec-Jan wrap."

---

## FORM — Step 2 (2:30 – 3:30)
- Select gender
- Select a goal (e.g., Career & Authority)
- Click "Discover My Gemstone"

**Talk about:**
"Your life goal refines the recommendation. The engine maps goals to 
boost planets — for example, Career maps to Sun, Saturn, and Mars."

---

## ANALYSIS ANIMATION (3:30 – 4:00)
- Let the orbital animation play
- Point out the text cycling: "Reading the stars...", "Consulting the Navagraha..."

**Talk about:**
"This 3.5-second analysis screen uses CSS orbital animations and 
sequential text updates to create anticipation."

---

## RESULTS PAGE (4:00 – 6:00)
- Show the zodiac wheel (your sign highlighted)
- Show the primary gemstone card with CSS orb
- Scroll to info grid (Zodiac, Nakshatra, Element)
- Show benefits list
- Show wearing instructions — point out the SHAPE field
- Change to a different date → show shape changes per zodiac
- Show the mantra section
- Show gemstone compatibility (green = compatible, red = avoid)
- Show alternative gemstone
- Show the certified badge at bottom
- Click "Share Results" → show toast notification

**Talk about:**
"The SVG zodiac wheel is generated programmatically. The shape recommendation 
is personalized per zodiac sign — Aries gets Triangular, Libra gets Heart-shaped.
The compatibility section follows traditional planetary friendship rules."

---

## EXPLORER (6:00 – 7:30)
- Show the 9-gem grid
- Hover on cards to show 3D tilt effect
- Click element filters (Fire, Water, etc.)
- Click on a gem to open the detail modal
- Show modal: description, info, benefits, wearing, mantra
- Press Escape to close

**Talk about:**
"The explorer shows all 9 Navaratna gemstones with CSS-only orb visuals. 
Cards have a 3D perspective tilt on hover. The modal shows complete 
wearing instructions including the recommended shape."

---

## ABOUT PAGE (7:30 – 8:00)
- Show the 4 methodology cards
- Show the Navagraha grid (9 planets)
- Hover on planets to show the hover effect

**Talk about:**
"The about section explains our methodology — Ratna Shastra, Navaratna 
system, and planetary compatibility."

---

## MOBILE RESPONSIVE (8:00 – 8:30)
- Open DevTools (F12) → toggle device toolbar
- Show iPhone view: hamburger menu, stacked layout
- Open hamburger menu
- Show results page on mobile

**Talk about:**
"Fully responsive with a hamburger menu on mobile. CSS Grid and Flexbox 
handle all layout breakpoints."

---

## CODE WALKTHROUGH (8:30 – 9:30)
- Show VS Code with the project
- Open js/data.js → "All astrology data in one file"
- Open js/astrology.js → "Pure calculation engine, no DOM dependency"
- Open js/particles.js → "Canvas particle system"
- Open css/index.css → "950+ line design system with CSS custom properties"
- Show the file sizes: "125KB total, zero dependencies"

**Talk about:**
"The architecture follows IIFE modules with clean separation: data, 
engine, controllers, and UI. No npm, no build step."

---

## WRAP UP (9:30 – 10:00)
"To summarize — Humara Pandit is a zero-dependency, fully responsive 
Vedic gemstone recommendation app with an interactive particle system, 
SVG zodiac wheel, gemstone compatibility engine, and personalized 
shape recommendations. Built with pure HTML, CSS, and JavaScript.

Thank you for watching!"

---

## RECORDING TIPS
1. Use OBS Studio (free) or Win+G (Game Bar) to record
2. Set resolution to 1920x1080
3. Use a clear microphone
4. Keep browser zoom at 100%
5. Clear localStorage before recording: DevTools → Application → Clear
6. Close other tabs for a clean look
7. Practice the flow once before recording
