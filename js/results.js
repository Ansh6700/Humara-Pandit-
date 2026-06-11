/* ============================================
   HUMARA PANDIT — Results Renderer
   ============================================ */

const ResultsController = (() => {

  let currentRecommendation = null;

  function showAnalysis(onComplete) {
    const analysisEl = document.getElementById('analysis-screen');
    const resultsEl = document.getElementById('results-content');

    analysisEl.style.display = 'flex';
    resultsEl.classList.remove('visible');

    // Simulate analysis time with progress updates
    const texts = [
      'Reading the stars...',
      'Mapping your zodiac constellation...',
      'Consulting the Navagraha...',
      'Aligning planetary energies...',
      'Selecting your cosmic gemstone...'
    ];

    const textEl = analysisEl.querySelector('.analysis-text');
    let i = 0;

    const interval = setInterval(() => {
      i++;
      if (i < texts.length) {
        textEl.textContent = texts[i];
        textEl.style.animation = 'none';
        textEl.offsetHeight; // trigger reflow
        textEl.style.animation = 'fadeIn 0.4s ease';
      }
    }, 700);

    setTimeout(() => {
      clearInterval(interval);
      analysisEl.style.display = 'none';
      resultsEl.classList.add('visible');
      if (onComplete) onComplete();
    }, 3500);
  }

  function render(recommendation) {
    currentRecommendation = recommendation;
    const gem = recommendation.primaryGemstone;
    const altGem = recommendation.secondaryGemstone;
    const zodiac = recommendation.zodiac;
    const planet = recommendation.planet;
    const nakshatra = recommendation.nakshatra;

    // Greeting
    const greetingEl = document.getElementById('results-greeting');
    greetingEl.textContent = `Namaste ${recommendation.name}, here is your cosmic alignment`;

    // Primary Gemstone Hero
    renderGemstoneHero(gem);

    // Info Grid
    renderInfoGrid(zodiac, nakshatra, gem);

    // Benefits
    renderBenefits(gem);

    // Wearing Instructions
    renderWearing(gem);

    // Mantra
    renderMantra(gem);

    // Secondary Gemstone
    if (altGem && altGem.name !== gem.name) {
      renderSecondary(altGem);
    } else {
      const secSection = document.getElementById('secondary-section');
      if (secSection) secSection.style.display = 'none';
    }
  }

  function renderGemstoneHero(gem) {
    // Orb
    const orbEl = document.getElementById('hero-gem-orb');
    orbEl.className = `gemstone-orb xl gemstone-hero-orb ${gem.cssClass}`;

    // Set glow color for background radial
    const heroCard = document.querySelector('.gemstone-hero');
    heroCard.style.setProperty('--gem-glow-color', `${gem.color}22`);

    // Name & Hindi
    document.getElementById('hero-gem-name').textContent = gem.name;
    document.getElementById('hero-gem-hindi').textContent = gem.hindi;

    // Planet
    document.getElementById('hero-gem-planet-symbol').textContent = gem.planetSymbol;
    document.getElementById('hero-gem-planet-name').textContent =
      `Planet: ${gem.planet} (${AstrologyData.PLANETS[gem.planet].sanskrit})`;

    // Description
    document.getElementById('hero-gem-description').textContent = gem.description;
  }

  function renderInfoGrid(zodiac, nakshatra, gem) {
    // Zodiac
    document.getElementById('info-zodiac-icon').textContent = zodiac.symbol;
    document.getElementById('info-zodiac-value').textContent = `${zodiac.name} (${zodiac.hindi})`;

    // Nakshatra
    document.getElementById('info-nakshatra-icon').textContent = '⭐';
    document.getElementById('info-nakshatra-value').textContent = `${nakshatra.name} (${nakshatra.hindi})`;

    // Element
    const element = AstrologyData.ELEMENTS[gem.element] || AstrologyData.ELEMENTS[zodiac.element];
    document.getElementById('info-element-icon').textContent = element ? element.icon : '✨';
    document.getElementById('info-element-value').textContent = gem.element || zodiac.element;
  }

  function renderBenefits(gem) {
    const listEl = document.getElementById('benefits-list');
    listEl.innerHTML = gem.benefits.map(b =>
      `<div class="benefit-item">
        <span class="benefit-icon">✦</span>
        <span class="benefit-text">${b}</span>
      </div>`
    ).join('');
  }

  function renderWearing(gem) {
    const w = gem.wearing;
    const zodiac = currentRecommendation ? currentRecommendation.zodiac : null;
    const shapeValue = (zodiac && zodiac.recommendedShape) ? zodiac.recommendedShape : w.shape;

    const items = [
      { icon: '🖐️', label: 'Finger', value: w.finger },
      { icon: '✋', label: 'Hand', value: w.hand },
      { icon: '🪙', label: 'Metal', value: w.metal },
      { icon: '📅', label: 'Day', value: w.day },
      { icon: '⚖️', label: 'Weight', value: w.weight },
      { icon: '🔷', label: 'Shape', value: shapeValue },
    ];

    const gridEl = document.getElementById('wearing-grid');
    gridEl.innerHTML = items.map(item =>
      `<div class="wearing-item glass">
        <span class="wearing-item-icon">${item.icon}</span>
        <span class="wearing-item-label">${item.label}</span>
        <span class="wearing-item-value">${item.value}</span>
      </div>`
    ).join('');
  }

  function renderMantra(gem) {
    const mantraText = gem.wearing.mantra;
    // Split into hindi and transliteration parts
    const parts = mantraText.split('(');
    const hindiPart = parts[0].trim();
    const translitPart = parts.length > 1 ? parts[1].replace(')', '').trim() : '';

    document.getElementById('mantra-hindi').textContent = hindiPart;
    document.getElementById('mantra-translit').textContent = translitPart
      ? `"${translitPart}"` : '';
  }

  function renderSecondary(gem) {
    const secSection = document.getElementById('secondary-section');
    secSection.style.display = 'block';

    const orbEl = document.getElementById('secondary-gem-orb');
    orbEl.className = `gemstone-orb ${gem.cssClass}`;

    document.getElementById('secondary-gem-name').textContent = gem.name;
    document.getElementById('secondary-gem-desc').textContent =
      `As an alternative, ${gem.name} (${gem.hindi}) — the gemstone of ${gem.planet} — can complement your cosmic alignment.`;
    document.getElementById('secondary-gem-planet').textContent =
      `${gem.planetSymbol} ${gem.planet} • ${gem.element}`;
  }

  function getRecommendation() {
    return currentRecommendation;
  }

  return { showAnalysis, render, getRecommendation };

})();
