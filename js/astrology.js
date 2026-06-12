const AstrologyEngine = (() => {

  const { ZODIAC_SIGNS, PLANETS, GEMSTONES, NAKSHATRAS, GOALS } = AstrologyData;


  function getZodiacSign(birthDate) {
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();

    for (const sign of ZODIAC_SIGNS) {
      const { startMonth, startDay, endMonth, endDay } = sign;


      if (startMonth > endMonth) {
        if ((month === startMonth && day >= startDay) ||
            (month === endMonth && day <= endDay)) {
          return sign;
        }
      }

      else if (startMonth !== endMonth) {
        if ((month === startMonth && day >= startDay) ||
            (month === endMonth && day <= endDay)) {
          return sign;
        }
      }

      else {
        if (month === startMonth && day >= startDay && day <= endDay) {
          return sign;
        }
      }
    }

    return ZODIAC_SIGNS[0];
  }


  function getRulingPlanet(zodiacSign) {
    return PLANETS[zodiacSign.rulingPlanet] || null;
  }


  function getSunLongitude(date) {
    const march21 = new Date(date.getFullYear(), 2, 21);
    let diffDays = (date - march21) / (1000 * 60 * 60 * 24);
    if (diffDays < 0) diffDays += 365.25;
    return (diffDays * (360 / 365.25)) % 360;
  }


  function getNakshatra(birthDate) {
    const longitude = getSunLongitude(birthDate);
    const index = Math.floor(longitude / 13.333) % 27;
    return NAKSHATRAS[index] || NAKSHATRAS[0];
  }


  function getPrimaryGemstone(zodiacSign) {
    return GEMSTONES[zodiacSign.primaryGemstone] || null;
  }


  function getSecondaryGemstone(zodiacSign) {
    return GEMSTONES[zodiacSign.secondaryGemstone] || null;
  }


  function getNakshatraGemstone(nakshatra) {
    const planet = PLANETS[nakshatra.rulingPlanet];
    if (planet) {
      return GEMSTONES[planet.gemstone] || null;
    }
    return null;
  }


  function getGoalGemstone(goalId, zodiacSign) {
    const goal = GOALS.find(g => g.id === goalId);
    if (!goal) return null;


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


  function generateRecommendation({ birthDate, name, gender, goalId }) {
    const zodiac = getZodiacSign(birthDate);
    const planet = getRulingPlanet(zodiac);
    const nakshatra = getNakshatra(birthDate);
    const primaryGem = getPrimaryGemstone(zodiac);
    const secondaryGem = getSecondaryGemstone(zodiac);
    const nakshatraGem = getNakshatraGemstone(nakshatra);
    const goalGem = getGoalGemstone(goalId, zodiac);

    // Prefer nakshatra gem if different from primary, else goal-based, else zodiac secondary
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


  function buildSummary(name, zodiac, planet, nakshatra, gemstone) {
    return `Based on your zodiac sign ${zodiac.name} (${zodiac.symbol}), ruled by ${planet.name} (${planet.sanskrit}), and your Nakshatra ${nakshatra.name} (${nakshatra.hindi}), we recommend the powerful ${gemstone.name} (${gemstone.hindi}) to enhance your cosmic alignment.`;
  }


  function getAllGemstones() {
    return Object.values(GEMSTONES);
  }


  function getGemstonesByPlanet(planetName) {
    return Object.values(GEMSTONES).filter(g => g.planet === planetName);
  }


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
