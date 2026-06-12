
const ExplorerController = (() => {

  let currentFilter = 'all';

  function init() {
    renderGrid(AstrologyEngine.getAllGemstones());
    setupFilters();
    setupModal();
  }

  /* ─── Grid Rendering ─── */
  function renderGrid(gemstones) {
    const grid = document.getElementById('gemstone-grid');
    grid.innerHTML = gemstones.map(gem =>
      `<div class="gemstone-card glass-card" data-gemstone="${gem.name}" tabindex="0" role="button" aria-label="View ${gem.name} details">
        <div class="gemstone-card-orb gemstone-orb ${gem.cssClass}"></div>
        <h3 class="gemstone-card-name">${gem.name}</h3>
        <p class="gemstone-card-hindi">${gem.hindi}</p>
        <div class="gemstone-card-planet">
          <span class="planet-icon">${gem.planetSymbol}</span>
          <span>${gem.planet}</span>
        </div>
      </div>`
    ).join('');

    grid.querySelectorAll('.gemstone-card').forEach(card => {
      card.addEventListener('click', () => openModal(card.dataset.gemstone));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(card.dataset.gemstone);
        }
      });
    });

    grid.querySelectorAll('.gemstone-card').forEach(card => {
      const gemName = card.dataset.gemstone;
      const gem = AstrologyData.GEMSTONES[gemName];
      if (gem) {
        card.style.setProperty('--card-glow', `${gem.color}15`);
      }
    });
  }

  /* ─── Filters ─── */
  function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentFilter = btn.dataset.filter;
        applyFilter(currentFilter);
      });
    });
  }

  function applyFilter(filter) {
    let gemstones;

    if (filter === 'all') {
      gemstones = AstrologyEngine.getAllGemstones();
    } else if (AstrologyData.PLANETS[filter]) {
      gemstones = AstrologyEngine.getGemstonesByPlanet(filter);
    } else {
      gemstones = AstrologyEngine.getAllGemstones().filter(g => g.element === filter);
    }

    renderGrid(gemstones);
  }

  /* ─── Modal ─── */
  function setupModal() {
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close');

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function openModal(gemstoneName) {
    const gem = AstrologyData.GEMSTONES[gemstoneName];
    if (!gem) return;

    const overlay = document.getElementById('modal-overlay');

    const orbEl = document.getElementById('modal-gem-orb');
    orbEl.className = `gemstone-orb large modal-orb ${gem.cssClass}`;

    document.getElementById('modal-gem-name').textContent = gem.name;
    document.getElementById('modal-gem-hindi').textContent = gem.hindi;
    document.getElementById('modal-gem-planet').innerHTML =
      `<span>${gem.planetSymbol}</span> Planet: ${gem.planet} (${AstrologyData.PLANETS[gem.planet].sanskrit})`;

    document.getElementById('modal-description').textContent = gem.description;

    const infoGrid = document.getElementById('modal-info-grid');
    const infos = [
      { label: 'Element', value: gem.element },
      { label: 'Chakra', value: gem.chakra },
      { label: 'Hardness', value: gem.hardness },
    ];
    infoGrid.innerHTML = infos.map(info =>
      `<div class="modal-info-item">
        <div class="label">${info.label}</div>
        <div class="value">${info.value}</div>
      </div>`
    ).join('');

    const benefitsList = document.getElementById('modal-benefits-list');
    benefitsList.innerHTML = gem.benefits.map(b =>
      `<div class="modal-benefit">
        <span class="check">✦</span>
        <span class="text">${b}</span>
      </div>`
    ).join('');

    const wearingGrid = document.getElementById('modal-wearing-grid');
    const w = gem.wearing;
    const wearingItems = [
      { label: 'Finger', value: w.finger },
      { label: 'Hand', value: w.hand },
      { label: 'Metal', value: w.metal },
      { label: 'Day', value: w.day },
      { label: 'Weight', value: w.weight },
      { label: 'Shape', value: w.shape },
    ];
    wearingGrid.innerHTML = wearingItems.map(item =>
      `<div class="modal-wearing-item">
        <div class="label">${item.label}</div>
        <div class="value">${item.value}</div>
      </div>`
    ).join('');

    const mantraText = w.mantra;
    const parts = mantraText.split('(');
    document.getElementById('modal-mantra-text').textContent = parts[0].trim();

    const zodiacEl = document.getElementById('modal-zodiac-signs');
    if (gem.zodiacSigns.length > 0) {
      const signs = gem.zodiacSigns.map(name => {
        const sign = AstrologyData.ZODIAC_SIGNS.find(z => z.name === name);
        return sign ? `${sign.symbol} ${sign.name}` : name;
      });
      zodiacEl.textContent = `Best for: ${signs.join(', ')}`;
    } else {
      zodiacEl.textContent = 'Recommended based on planetary alignment (consult an astrologer)';
    }
    zodiacEl.style.display = 'block';

    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  return { init, openModal };

})();
