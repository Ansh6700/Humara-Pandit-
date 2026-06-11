/* ============================================
   HUMARA PANDIT — Astrology Engine
   Calculation functions for zodiac, nakshatra,
   and gemstone recommendations
   ============================================ */

const AstrologyEngine = (() => {

  const { ZODIAC_SIGNS, PLANETS, GEMSTONES, NAKSHATRAS, GOALS } = AstrologyData;

  /**
   * Get zodiac sign from a Date object
   * @param {Date} birthDate
   * @returns {Object} zodiac sign object
   */
  function getZodiacSign(birthDate) {
    const month = birthDate.getMonth() + 1; // 1-12
    const day = birthDate.getDate();

    for (const sign of ZODIAC_SIGNS) {
      const { startMonth, startDay, endMonth, endDay } = sign;

      // Case 1: Sign wraps across year boundary (Capricorn: Dec 22 – Jan 19)
      if (startMonth > endMonth) {
        if ((month === startMonth && day >= startDay) ||
            (month === endMonth && day <= endDay)) {
          return sign;
        }
      }
      // Case 2: Sign spans exactly two consecutive months (e.g. Mar 21 – Apr 19)
      else if (startMonth !== endMonth) {
        if ((month === startMonth && day >= startDay) ||
            (month === endMonth && day <= endDay)) {
          return sign;
        }
      }
      // Case 3: Sign within a single month (unlikely but safe)
      else {
        if (month === startMonth && day >= startDay && day <= endDay) {
          return sign;
        }
      }
    }
    // Fallback (should not happen)
    return ZODIAC_SIGNS[0];
  }

  /**
   * Get ruling planet object for a zodiac sign
   * @param {Object} zodiacSign
   * @returns {Object} planet object
   */
  function getRulingPlanet(zodiacSign) {
    return PLANETS[zodiacSign.rulingPlanet] || null;
  }

  /**
   * Approximate the Sun's ecliptic longitude from a date.
   * 0° = Vernal Equinox (~Mar 21).
   * @param {Date} date
   * @returns {number} degrees 0–360
   */
  function getSunLongitude(date) {
    const march21 = new Date(date.getFullYear(), 2, 21); // March 21
    let diffDays = (date - march21) / (1000 * 60 * 60 * 24);
    if (diffDays < 0) diffDays += 365.25;
    return (diffDays * (360 / 365.25)) % 360;
  }

  /**
   * Get approximate Nakshatra from birth date.
   * Uses Sun's position as a proxy (true Nakshatra requires Moon longitude).
   * @param {Date} birthDate
   * @returns {Object} nakshatra object
   */
  function getNakshatra(birthDate) {
    const longitude = getSunLongitude(birthDate);
    const index = Math.floor(longitude / 13.333) % 27;
    return NAKSHATRAS[index] || NAKSHATRAS[0];
  }

  /**
   * Get the primary gemstone recommendation
   * @param {Object} zodiacSign
   * @returns {Object} gemstone object
   */
  function getPrimaryGemstone(zodiacSign) {
    return GEMSTONES[zodiacSign.primaryGemstone] || null;
  }

  /**
   * Get the secondary/alternative gemstone
   * @param {Object} zodiacSign
   * @returns {Object|null} gemstone object
   */
  function getSecondaryGemstone(zodiacSign) {
    // The secondary gemstone is from the zodiac sign data
    // It's usually a more affordable/accessible alternative
    return GEMSTONES[zodiacSign.secondaryGemstone] || null;
  }

  /**
   * Get a nakshatra-based gemstone recommendation.
   * Each nakshatra has a ruling planet, whose gemstone is recommended.
   * @param {Object} nakshatra
   * @returns {Object|null} gemstone object
   */
  function getNakshatraGemstone(nakshatra) {
    const planet = PLANETS[nakshatra.rulingPlanet];
    if (planet) {
      return GEMSTONES[planet.gemstone] || null;
    }
    return null;
  }

  /**
   * Generate a goal-boosted secondary recommendation.
   * If the user's goal aligns with a planet that differs from their
   * ruling planet, suggest that planet's gemstone as a booster.
   * @param {string} goalId
   * @param {Object} zodiacSign
   * @returns {Object|null} gemstone object
   */
  function getGoalGemstone(goalId, zodiacSign) {
    const goal = GOALS.find(g => g.id === goalId);
    if (!goal) return null;

    // Find a boost planet that is NOT the ruling planet
    for (const planetName of goal.boostPlanets) {
      if (planetName !== zodiacSign.rulingPlanet) {
        const planet = PLANETS[planetName];
        if (planet) {
          return GEMSTONES[planet.gemstone] || null;
        }
      }
    }
    return null;
  }

  /**
   * Generate the complete recommendation report
   * @param {Object} params - { birthDate: Date, name: string, gender: string, goalId: string }
   * @returns {Object} full recommendation
   */
  function generateRecommendation({ birthDate, name, gender, goalId }) {
    const zodiac = getZodiacSign(birthDate);
    const planet = getRulingPlanet(zodiac);
    const nakshatra = getNakshatra(birthDate);
    const primaryGem = getPrimaryGemstone(zodiac);
    const secondaryGem = getSecondaryGemstone(zodiac);
    const nakshatraGem = getNakshatraGemstone(nakshatra);
    const goalGem = getGoalGemstone(goalId, zodiac);

    // Determine the best secondary recommendation:
    // Prefer nakshatra gemstone if different from primary, else goal-based, else zodiac secondary
    let altGem = secondaryGem;
    if (nakshatraGem && nakshatraGem.name !== primaryGem.name) {
      altGem = nakshatraGem;
    } else if (goalGem && goalGem.name !== primaryGem.name) {
      altGem = goalGem;
    }

    const goal = GOALS.find(g => g.id === goalId);

    return {
      name,
      gender,
      birthDate,
      zodiac,
      planet,
      nakshatra,
      primaryGemstone: primaryGem,
      secondaryGemstone: altGem,
      goal,
      nakshatraGemstone: nakshatraGem,
      summary: buildSummary(name, zodiac, planet, nakshatra, primaryGem)
    };
  }

  /**
   * Build a human-readable summary
   */
  function buildSummary(name, zodiac, planet, nakshatra, gemstone) {
    return `Based on your zodiac sign ${zodiac.name} (${zodiac.symbol}), ruled by ${planet.name} (${planet.sanskrit}), and your Nakshatra ${nakshatra.name} (${nakshatra.hindi}), we recommend the powerful ${gemstone.name} (${gemstone.hindi}) to enhance your cosmic alignment.`;
  }

  /**
   * Get all gemstones as an array
   * @returns {Array} all gemstone objects
   */
  function getAllGemstones() {
    return Object.values(GEMSTONES);
  }

  /**
   * Get gemstones filtered by planet
   * @param {string} planetName
   * @returns {Array}
   */
  function getGemstonesByPlanet(planetName) {
    return Object.values(GEMSTONES).filter(g => g.planet === planetName);
  }

  /**
   * Get gemstones associated with a zodiac sign
   * @param {string} signName
   * @returns {Array}
   */
  function getGemstonesByZodiac(signName) {
    return Object.values(GEMSTONES).filter(g =>
      g.zodiacSigns.includes(signName)
    );
  }

  /* ─── Public API ─── */
  return {
    getZodiacSign,
    getRulingPlanet,
    getNakshatra,
    getPrimaryGemstone,
    getSecondaryGemstone,
    getNakshatraGemstone,
    getGoalGemstone,
    generateRecommendation,
    getAllGemstones,
    getGemstonesByPlanet,
    getGemstonesByZodiac
  };

})();
