/* ============================================
   HUMARA PANDIT — Astrology Data
   Complete Vedic astrology dataset for
   gemstone recommendations
   ============================================ */

const AstrologyData = (() => {

  /* ─────────── Zodiac Signs ─────────── */
  const ZODIAC_SIGNS = [
    {
      name: "Aries", hindi: "मेष", symbol: "♈", element: "Fire",
      rulingPlanet: "Mars",
      startMonth: 3, startDay: 21, endMonth: 4, endDay: 19,
      primaryGemstone: "Red Coral", secondaryGemstone: "Ruby",
      color: "#e74c3c",
      traits: ["Courageous", "Energetic", "Pioneering", "Confident"],
      recommendedShape: "Triangular — channelling Mars' fiery, warrior energy"
    },
    {
      name: "Taurus", hindi: "वृषभ", symbol: "♉", element: "Earth",
      rulingPlanet: "Venus",
      startMonth: 4, startDay: 20, endMonth: 5, endDay: 20,
      primaryGemstone: "Diamond", secondaryGemstone: "Opal",
      color: "#27ae60",
      traits: ["Reliable", "Patient", "Devoted", "Stable"],
      recommendedShape: "Cushion cut — grounding Venus' elegance with Earth stability"
    },
    {
      name: "Gemini", hindi: "मिथुन", symbol: "♊", element: "Air",
      rulingPlanet: "Mercury",
      startMonth: 5, startDay: 21, endMonth: 6, endDay: 20,
      primaryGemstone: "Emerald", secondaryGemstone: "Peridot",
      color: "#f1c40f",
      traits: ["Adaptable", "Communicative", "Witty", "Intellectual"],
      recommendedShape: "Pear-shaped — reflecting Gemini's dual, flowing Air nature"
    },
    {
      name: "Cancer", hindi: "कर्क", symbol: "♋", element: "Water",
      rulingPlanet: "Moon",
      startMonth: 6, startDay: 21, endMonth: 7, endDay: 22,
      primaryGemstone: "Pearl", secondaryGemstone: "Moonstone",
      color: "#bdc3c7",
      traits: ["Intuitive", "Nurturing", "Protective", "Emotional"],
      recommendedShape: "Round — mirroring the Moon's circular, nurturing form"
    },
    {
      name: "Leo", hindi: "सिंह", symbol: "♌", element: "Fire",
      rulingPlanet: "Sun",
      startMonth: 7, startDay: 23, endMonth: 8, endDay: 22,
      primaryGemstone: "Ruby", secondaryGemstone: "Garnet",
      color: "#e67e22",
      traits: ["Creative", "Generous", "Charismatic", "Dignified"],
      recommendedShape: "Oval — radiating the Sun's commanding, royal brilliance"
    },
    {
      name: "Virgo", hindi: "कन्या", symbol: "♍", element: "Earth",
      rulingPlanet: "Mercury",
      startMonth: 8, startDay: 23, endMonth: 9, endDay: 22,
      primaryGemstone: "Emerald", secondaryGemstone: "Peridot",
      color: "#2ecc71",
      traits: ["Analytical", "Practical", "Diligent", "Modest"],
      recommendedShape: "Rectangular (Emerald cut) — matching Virgo's precise, structured Earth energy"
    },
    {
      name: "Libra", hindi: "तुला", symbol: "♎", element: "Air",
      rulingPlanet: "Venus",
      startMonth: 9, startDay: 23, endMonth: 10, endDay: 22,
      primaryGemstone: "Diamond", secondaryGemstone: "Opal",
      color: "#e91e8c",
      traits: ["Diplomatic", "Gracious", "Fair", "Harmonious"],
      recommendedShape: "Heart-shaped — symbolising Libra's balanced love and harmony"
    },
    {
      name: "Scorpio", hindi: "वृश्चिक", symbol: "♏", element: "Water",
      rulingPlanet: "Mars",
      startMonth: 10, startDay: 23, endMonth: 11, endDay: 21,
      primaryGemstone: "Red Coral", secondaryGemstone: "Garnet",
      color: "#c0392b",
      traits: ["Passionate", "Resourceful", "Brave", "Determined"],
      recommendedShape: "Oval — containing Scorpio's deep, intense Water power"
    },
    {
      name: "Sagittarius", hindi: "धनु", symbol: "♐", element: "Fire",
      rulingPlanet: "Jupiter",
      startMonth: 11, startDay: 22, endMonth: 12, endDay: 21,
      primaryGemstone: "Yellow Sapphire", secondaryGemstone: "Citrine",
      color: "#8e44ad",
      traits: ["Optimistic", "Adventurous", "Philosophical", "Generous"],
      recommendedShape: "Cushion cut — amplifying Jupiter's expansive, fiery wisdom"
    },
    {
      name: "Capricorn", hindi: "मकर", symbol: "♑", element: "Earth",
      rulingPlanet: "Saturn",
      startMonth: 12, startDay: 22, endMonth: 1, endDay: 19,
      primaryGemstone: "Blue Sapphire", secondaryGemstone: "Amethyst",
      color: "#2c3e50",
      traits: ["Disciplined", "Ambitious", "Responsible", "Practical"],
      recommendedShape: "Square (Princess cut) — anchoring Saturn's disciplined Earth force"
    },
    {
      name: "Aquarius", hindi: "कुम्भ", symbol: "♒", element: "Air",
      rulingPlanet: "Saturn",
      startMonth: 1, startDay: 20, endMonth: 2, endDay: 18,
      primaryGemstone: "Blue Sapphire", secondaryGemstone: "Amethyst",
      color: "#3498db",
      traits: ["Progressive", "Independent", "Humanitarian", "Original"],
      recommendedShape: "Marquise — echoing Aquarius' unconventional, free-flowing Air spirit"
    },
    {
      name: "Pisces", hindi: "मीन", symbol: "♓", element: "Water",
      rulingPlanet: "Jupiter",
      startMonth: 2, startDay: 19, endMonth: 3, endDay: 20,
      primaryGemstone: "Yellow Sapphire", secondaryGemstone: "Citrine",
      color: "#1abc9c",
      traits: ["Compassionate", "Intuitive", "Artistic", "Gentle"],
      recommendedShape: "Round Cabochon — flowing with Pisces' gentle, intuitive Water energy"
    }
  ];

  /* ─────────── Navagraha Planets ─────────── */
  const PLANETS = {
    Sun:     { name: "Sun",     sanskrit: "सूर्य (Surya)",    symbol: "☉", gemstone: "Ruby",            color: "#f39c12", day: "Sunday" },
    Moon:    { name: "Moon",    sanskrit: "चन्द्र (Chandra)", symbol: "☽", gemstone: "Pearl",           color: "#bdc3c7", day: "Monday" },
    Mars:    { name: "Mars",    sanskrit: "मंगल (Mangal)",    symbol: "♂", gemstone: "Red Coral",       color: "#e74c3c", day: "Tuesday" },
    Mercury: { name: "Mercury", sanskrit: "बुध (Budh)",      symbol: "☿", gemstone: "Emerald",         color: "#2ecc71", day: "Wednesday" },
    Jupiter: { name: "Jupiter", sanskrit: "बृहस्पति (Guru)",  symbol: "♃", gemstone: "Yellow Sapphire", color: "#f1c40f", day: "Thursday" },
    Venus:   { name: "Venus",   sanskrit: "शुक्र (Shukra)",   symbol: "♀", gemstone: "Diamond",         color: "#e91e8c", day: "Friday" },
    Saturn:  { name: "Saturn",  sanskrit: "शनि (Shani)",     symbol: "♄", gemstone: "Blue Sapphire",   color: "#3498db", day: "Saturday" },
    Rahu:    { name: "Rahu",    sanskrit: "राहु (Rahu)",      symbol: "☊", gemstone: "Hessonite",       color: "#d4710a", day: "Saturday" },
    Ketu:    { name: "Ketu",    sanskrit: "केतु (Ketu)",      symbol: "☋", gemstone: "Cat's Eye",       color: "#8b8b2a", day: "Tuesday" }
  };

  /* ─────────── Gemstones (Navaratna) ─────────── */
  const GEMSTONES = {
    "Ruby": {
      name: "Ruby",
      hindi: "माणिक्य (Manik)",
      planet: "Sun",
      planetSymbol: "☉",
      cssClass: "gem-ruby",
      color: "#e0115f",
      element: "Fire",
      chakra: "Heart Chakra",
      hardness: "9 (Mohs)",
      benefits: [
        "Boosts confidence and leadership qualities",
        "Enhances vitality and life force energy",
        "Brings fame, success, and authority",
        "Strengthens the heart and circulatory system",
        "Promotes courage and passion"
      ],
      wearing: {
        finger: "Ring finger (Anamika)",
        hand: "Right hand",
        metal: "Gold or Copper",
        day: "Sunday morning during Shukla Paksha",
        mantra: "ॐ सूर्याय नमः (Om Suryaya Namaha)",
        weight: "3–6 carats (minimum 1.5 carats)",
        shape: "Oval or Cushion cut"
      },
      zodiacSigns: ["Leo"],
      description: "The king of gemstones, Ruby represents the Sun and carries the power of leadership, authority, and vitality. Known as Manik in Hindi, it ignites the inner fire and attracts prosperity."
    },
    "Pearl": {
      name: "Pearl",
      hindi: "मोती (Moti)",
      planet: "Moon",
      planetSymbol: "☽",
      cssClass: "gem-pearl",
      color: "#f5f0e1",
      element: "Water",
      chakra: "Sacral Chakra",
      hardness: "2.5–4.5 (Mohs)",
      benefits: [
        "Calms the mind and stabilizes emotions",
        "Enhances mental peace and clarity",
        "Improves relationships and nurturing abilities",
        "Strengthens the immune system",
        "Promotes intuition and emotional intelligence"
      ],
      wearing: {
        finger: "Little finger (Kanishthika)",
        hand: "Right hand",
        metal: "Silver",
        day: "Monday morning during Shukla Paksha",
        mantra: "ॐ चन्द्राय नमः (Om Chandraya Namaha)",
        weight: "4–6 carats (minimum 2 carats)",
        shape: "Round or Oval (natural pearl preferred)"
      },
      zodiacSigns: ["Cancer"],
      description: "Pearl embodies the cooling, nurturing energy of the Moon. It brings peace of mind, emotional stability, and enhances the creative and intuitive faculties of its wearer."
    },
    "Red Coral": {
      name: "Red Coral",
      hindi: "मूंगा (Moonga)",
      planet: "Mars",
      planetSymbol: "♂",
      cssClass: "gem-coral",
      color: "#ff4500",
      element: "Fire",
      chakra: "Root Chakra",
      hardness: "3–4 (Mohs)",
      benefits: [
        "Boosts courage, strength, and determination",
        "Overcomes obstacles and enemies",
        "Improves physical energy and blood circulation",
        "Protects from evil eye and negative energies",
        "Enhances property and land-related matters"
      ],
      wearing: {
        finger: "Ring finger (Anamika)",
        hand: "Right hand",
        metal: "Gold or Copper",
        day: "Tuesday morning during Shukla Paksha",
        mantra: "ॐ अं अंगारकाय नमः (Om Ang Angarakaya Namaha)",
        weight: "6–9 carats (minimum 3 carats)",
        shape: "Triangular or Capsule (cylindrical)"
      },
      zodiacSigns: ["Aries", "Scorpio"],
      description: "Red Coral channels the warrior energy of Mars, bestowing courage, physical strength, and the ability to overcome adversities. It is especially potent for those in competitive fields."
    },
    "Emerald": {
      name: "Emerald",
      hindi: "पन्ना (Panna)",
      planet: "Mercury",
      planetSymbol: "☿",
      cssClass: "gem-emerald",
      color: "#50c878",
      element: "Earth",
      chakra: "Heart Chakra",
      hardness: "7.5–8 (Mohs)",
      benefits: [
        "Sharpens intellect and communication skills",
        "Enhances business acumen and financial gains",
        "Improves memory and analytical abilities",
        "Supports nervous system health",
        "Promotes harmony in relationships"
      ],
      wearing: {
        finger: "Little finger (Kanishthika)",
        hand: "Right hand",
        metal: "Gold or Silver",
        day: "Wednesday morning during Shukla Paksha",
        mantra: "ॐ बुं बुधाय नमः (Om Bum Budhaya Namaha)",
        weight: "3–6 carats (minimum 1.5 carats)",
        shape: "Rectangular (Emerald cut) or Oval"
      },
      zodiacSigns: ["Gemini", "Virgo"],
      description: "Emerald, the gemstone of Mercury, is the stone of intellect and communication. It enhances mental clarity, supports business success, and brings eloquence to its wearer."
    },
    "Yellow Sapphire": {
      name: "Yellow Sapphire",
      hindi: "पुखराज (Pukhraj)",
      planet: "Jupiter",
      planetSymbol: "♃",
      cssClass: "gem-yellow-sapphire",
      color: "#f0c75e",
      element: "Ether",
      chakra: "Solar Plexus Chakra",
      hardness: "9 (Mohs)",
      benefits: [
        "Attracts wealth, wisdom, and good fortune",
        "Enhances spiritual growth and knowledge",
        "Strengthens marriage and family bonds",
        "Improves health, especially liver and digestion",
        "Brings recognition and social status"
      ],
      wearing: {
        finger: "Index finger (Tarjani)",
        hand: "Right hand",
        metal: "Gold",
        day: "Thursday morning during Shukla Paksha",
        mantra: "ॐ बृं बृहस्पतये नमः (Om Brim Brihaspataye Namaha)",
        weight: "3–5 carats (minimum 2 carats)",
        shape: "Oval or Cushion cut"
      },
      zodiacSigns: ["Sagittarius", "Pisces"],
      description: "Yellow Sapphire embodies the benevolent wisdom of Jupiter, the Guru of the gods. It attracts prosperity, spiritual growth, and marital bliss, making it one of the most auspicious gemstones."
    },
    "Diamond": {
      name: "Diamond",
      hindi: "हीरा (Heera)",
      planet: "Venus",
      planetSymbol: "♀",
      cssClass: "gem-diamond",
      color: "#b9f2ff",
      element: "Water",
      chakra: "Crown Chakra",
      hardness: "10 (Mohs)",
      benefits: [
        "Enhances luxury, beauty, and artistic talents",
        "Attracts love, romance, and marital harmony",
        "Boosts creativity and refinement",
        "Improves reproductive health",
        "Brings fame and material prosperity"
      ],
      wearing: {
        finger: "Middle finger (Madhyama)",
        hand: "Right hand",
        metal: "Platinum or White Gold",
        day: "Friday morning during Shukla Paksha",
        mantra: "ॐ शुं शुक्राय नमः (Om Shum Shukraya Namaha)",
        weight: "0.5–1.5 carats (minimum 0.25 carats)",
        shape: "Round Brilliant or Princess cut"
      },
      zodiacSigns: ["Taurus", "Libra"],
      description: "Diamond, the king of brilliance, represents Venus—the planet of love, beauty, and luxury. It attracts opulence, enhances relationships, and brings a magnetic charm to its wearer."
    },
    "Blue Sapphire": {
      name: "Blue Sapphire",
      hindi: "नीलम (Neelam)",
      planet: "Saturn",
      planetSymbol: "♄",
      cssClass: "gem-blue-sapphire",
      color: "#2856d4",
      element: "Air",
      chakra: "Third Eye Chakra",
      hardness: "9 (Mohs)",
      benefits: [
        "Rapidly improves fortune and removes obstacles",
        "Provides discipline and focus",
        "Protects against misfortune and accidents",
        "Enhances career growth and stability",
        "Brings mental clarity during tough times"
      ],
      wearing: {
        finger: "Middle finger (Madhyama)",
        hand: "Right hand",
        metal: "Silver, Gold, or Panchdhatu",
        day: "Saturday evening during Shukla Paksha",
        mantra: "ॐ शं शनैश्चराय नमः (Om Sham Shanaischaraya Namaha)",
        weight: "4–7 carats (minimum 2 carats)",
        shape: "Oval or Cushion cut"
      },
      zodiacSigns: ["Capricorn", "Aquarius"],
      description: "Blue Sapphire is the most powerful and fast-acting gemstone, channeling Saturn's transformative energy. It can bring dramatic positive changes but should be worn only after careful astrological consultation."
    },
    "Hessonite": {
      name: "Hessonite",
      hindi: "गोमेद (Gomed)",
      planet: "Rahu",
      planetSymbol: "☊",
      cssClass: "gem-hessonite",
      color: "#d4710a",
      element: "Ether",
      chakra: "Root Chakra",
      hardness: "6.5–7.5 (Mohs)",
      benefits: [
        "Neutralizes the malefic effects of Rahu",
        "Clears confusion and enhances mental clarity",
        "Protects from psychic attacks and hidden enemies",
        "Aids in career growth, especially in politics and media",
        "Reduces fear, anxiety, and phobias"
      ],
      wearing: {
        finger: "Middle finger (Madhyama)",
        hand: "Right hand",
        metal: "Silver or Panchdhatu",
        day: "Saturday evening during Shukla Paksha",
        mantra: "ॐ रां राहवे नमः (Om Raam Rahave Namaha)",
        weight: "6–10 carats (minimum 4 carats)",
        shape: "Oval or Cushion cut"
      },
      zodiacSigns: [],
      description: "Hessonite, the gemstone of the shadow planet Rahu, brings clarity amidst confusion and protects against unseen negative forces. It is particularly effective for those going through Rahu Mahadasha."
    },
    "Cat's Eye": {
      name: "Cat's Eye",
      hindi: "लहसुनिया (Lehsunia)",
      planet: "Ketu",
      planetSymbol: "☋",
      cssClass: "gem-cats-eye",
      color: "#8b8b2a",
      element: "Fire",
      chakra: "Solar Plexus Chakra",
      hardness: "8.5 (Mohs)",
      benefits: [
        "Neutralizes the malefic effects of Ketu",
        "Enhances spiritual awareness and detachment",
        "Protects from accidents and sudden misfortunes",
        "Improves intuition and psychic abilities",
        "Aids in recovery from chronic diseases"
      ],
      wearing: {
        finger: "Middle finger (Madhyama) or Little finger",
        hand: "Right hand",
        metal: "Silver or Gold",
        day: "Tuesday or Saturday during Shukla Paksha",
        mantra: "ॐ कें केतवे नमः (Om Kem Ketave Namaha)",
        weight: "3–6 carats (minimum 1.5 carats)",
        shape: "Oval Cabochon (to show chatoyancy)"
      },
      zodiacSigns: [],
      description: "Cat's Eye, the gemstone of Ketu—the mystical shadow planet—enhances spiritual insight and provides powerful protection against hidden dangers. Its distinctive chatoyancy band symbolizes the divine eye."
    }
  };

  /* ─────────── 27 Nakshatras (Lunar Mansions) ─────────── */
  const NAKSHATRAS = [
    { name: "Ashwini",            hindi: "अश्विनी",          rulingPlanet: "Ketu",    zodiacSign: "Aries",       degreesStart: 0,      degreesEnd: 13.33 },
    { name: "Bharani",            hindi: "भरणी",             rulingPlanet: "Venus",   zodiacSign: "Aries",       degreesStart: 13.33,  degreesEnd: 26.67 },
    { name: "Krittika",           hindi: "कृत्तिका",          rulingPlanet: "Sun",     zodiacSign: "Aries/Taurus",degreesStart: 26.67,  degreesEnd: 40 },
    { name: "Rohini",             hindi: "रोहिणी",            rulingPlanet: "Moon",    zodiacSign: "Taurus",      degreesStart: 40,     degreesEnd: 53.33 },
    { name: "Mrigashira",         hindi: "मृगशिरा",          rulingPlanet: "Mars",    zodiacSign: "Taurus/Gemini",degreesStart: 53.33, degreesEnd: 66.67 },
    { name: "Ardra",              hindi: "आर्द्रा",            rulingPlanet: "Rahu",    zodiacSign: "Gemini",      degreesStart: 66.67,  degreesEnd: 80 },
    { name: "Punarvasu",          hindi: "पुनर्वसु",          rulingPlanet: "Jupiter", zodiacSign: "Gemini/Cancer",degreesStart: 80,    degreesEnd: 93.33 },
    { name: "Pushya",             hindi: "पुष्य",             rulingPlanet: "Saturn",  zodiacSign: "Cancer",      degreesStart: 93.33,  degreesEnd: 106.67 },
    { name: "Ashlesha",           hindi: "आश्लेषा",          rulingPlanet: "Mercury", zodiacSign: "Cancer",      degreesStart: 106.67, degreesEnd: 120 },
    { name: "Magha",              hindi: "मघा",              rulingPlanet: "Ketu",    zodiacSign: "Leo",         degreesStart: 120,    degreesEnd: 133.33 },
    { name: "Purva Phalguni",     hindi: "पूर्व फाल्गुनी",    rulingPlanet: "Venus",   zodiacSign: "Leo",         degreesStart: 133.33, degreesEnd: 146.67 },
    { name: "Uttara Phalguni",    hindi: "उत्तर फाल्गुनी",   rulingPlanet: "Sun",     zodiacSign: "Leo/Virgo",   degreesStart: 146.67, degreesEnd: 160 },
    { name: "Hasta",              hindi: "हस्त",              rulingPlanet: "Moon",    zodiacSign: "Virgo",       degreesStart: 160,    degreesEnd: 173.33 },
    { name: "Chitra",             hindi: "चित्रा",            rulingPlanet: "Mars",    zodiacSign: "Virgo/Libra", degreesStart: 173.33, degreesEnd: 186.67 },
    { name: "Swati",              hindi: "स्वाति",            rulingPlanet: "Rahu",    zodiacSign: "Libra",       degreesStart: 186.67, degreesEnd: 200 },
    { name: "Vishakha",           hindi: "विशाखा",           rulingPlanet: "Jupiter", zodiacSign: "Libra/Scorpio",degreesStart: 200,   degreesEnd: 213.33 },
    { name: "Anuradha",           hindi: "अनुराधा",          rulingPlanet: "Saturn",  zodiacSign: "Scorpio",     degreesStart: 213.33, degreesEnd: 226.67 },
    { name: "Jyeshtha",           hindi: "ज्येष्ठा",          rulingPlanet: "Mercury", zodiacSign: "Scorpio",     degreesStart: 226.67, degreesEnd: 240 },
    { name: "Moola",              hindi: "मूल",               rulingPlanet: "Ketu",    zodiacSign: "Sagittarius", degreesStart: 240,    degreesEnd: 253.33 },
    { name: "Purva Ashadha",      hindi: "पूर्वाषाढ़ा",       rulingPlanet: "Venus",   zodiacSign: "Sagittarius", degreesStart: 253.33, degreesEnd: 266.67 },
    { name: "Uttara Ashadha",     hindi: "उत्तराषाढ़ा",      rulingPlanet: "Sun",     zodiacSign: "Sagittarius/Capricorn", degreesStart: 266.67, degreesEnd: 280 },
    { name: "Shravana",           hindi: "श्रवण",            rulingPlanet: "Moon",    zodiacSign: "Capricorn",   degreesStart: 280,    degreesEnd: 293.33 },
    { name: "Dhanishta",          hindi: "धनिष्ठा",          rulingPlanet: "Mars",    zodiacSign: "Capricorn/Aquarius", degreesStart: 293.33, degreesEnd: 306.67 },
    { name: "Shatabhisha",        hindi: "शतभिषा",          rulingPlanet: "Rahu",    zodiacSign: "Aquarius",    degreesStart: 306.67, degreesEnd: 320 },
    { name: "Purva Bhadrapada",   hindi: "पूर्वभाद्रपद",     rulingPlanet: "Jupiter", zodiacSign: "Aquarius/Pisces", degreesStart: 320, degreesEnd: 333.33 },
    { name: "Uttara Bhadrapada",  hindi: "उत्तरभाद्रपद",    rulingPlanet: "Saturn",  zodiacSign: "Pisces",      degreesStart: 333.33, degreesEnd: 346.67 },
    { name: "Revati",             hindi: "रेवती",             rulingPlanet: "Mercury", zodiacSign: "Pisces",      degreesStart: 346.67, degreesEnd: 360 }
  ];

  /* ─────────── Life Goals / Concerns ─────────── */
  const GOALS = [
    {
      id: "wealth",
      label: "Wealth & Prosperity",
      icon: "💰",
      description: "Financial growth, business success, material abundance",
      boostPlanets: ["Jupiter", "Mercury", "Venus"],
      keywords: ["prosperity", "money", "success", "business"]
    },
    {
      id: "health",
      label: "Health & Vitality",
      icon: "🌿",
      description: "Physical strength, immunity, energy, healing",
      boostPlanets: ["Sun", "Mars", "Moon"],
      keywords: ["health", "energy", "healing", "strength"]
    },
    {
      id: "love",
      label: "Love & Relationships",
      icon: "💗",
      description: "Romance, marriage, partnerships, emotional bonds",
      boostPlanets: ["Venus", "Moon", "Jupiter"],
      keywords: ["love", "romance", "marriage", "harmony"]
    },
    {
      id: "career",
      label: "Career & Authority",
      icon: "⚡",
      description: "Professional growth, leadership, recognition",
      boostPlanets: ["Sun", "Saturn", "Mars"],
      keywords: ["career", "job", "leadership", "authority"]
    },
    {
      id: "spiritual",
      label: "Spirituality & Wisdom",
      icon: "🔮",
      description: "Inner peace, meditation, divine knowledge, moksha",
      boostPlanets: ["Ketu", "Jupiter", "Moon"],
      keywords: ["spiritual", "meditation", "wisdom", "peace"]
    }
  ];

  /* ─────────── Element Properties ─────────── */
  const ELEMENTS = {
    Fire:  { color: "#e74c3c", icon: "🔥", description: "Passion, energy, transformation" },
    Earth: { color: "#27ae60", icon: "🌍", description: "Stability, growth, practicality" },
    Air:   { color: "#3498db", icon: "💨", description: "Intellect, communication, freedom" },
    Water: { color: "#1abc9c", icon: "🌊", description: "Emotion, intuition, healing" },
    Ether: { color: "#9b59b6", icon: "✨", description: "Spirit, connection, transcendence" }
  };

  /* ─────────── Public API ─────────── */
  return {
    ZODIAC_SIGNS,
    PLANETS,
    GEMSTONES,
    NAKSHATRAS,
    GOALS,
    ELEMENTS
  };

})();
