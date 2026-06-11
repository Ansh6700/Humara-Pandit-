/* ============================================
   HUMARA PANDIT — Premium Effects
   3D tilt, scroll reveal, counters, share,
   zodiac wheel, localStorage persistence
   ============================================ */

const Effects = (() => {

  /* ═══════════════ 3D TILT EFFECT ═══════════════ */
  function initTilt(selector = '.gemstone-card') {
    document.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll(selector);
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
          card.style.transform = '';
          return;
        }

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
        card.style.transition = 'transform 0.1s ease';
      });
    });

    document.addEventListener('mouseleave', () => {
      document.querySelectorAll(selector).forEach(card => {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s ease';
      });
    }, true);
  }

  /* ═══════════════ SCROLL REVEAL ═══════════════ */
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  /* ═══════════════ ANIMATED COUNTER ═══════════════ */
  function animateCounters() {
    const counters = document.querySelectorAll('.hero-stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.textContent);
      const duration = 1500;
      const start = performance.now();

      counter.textContent = '0';

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased);

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    });
  }

  /* ═══════════════ ZODIAC WHEEL SVG ═══════════════ */
  function renderZodiacWheel(containerId, activeSign) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const signs = AstrologyData.ZODIAC_SIGNS;
    const size = 280;
    const center = size / 2;
    const outerR = center - 10;
    const innerR = outerR - 45;
    const textR = (outerR + innerR) / 2;

    let svg = `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="zodiac-wheel-svg">`;

    // Outer ring glow
    svg += `<defs>
      <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>`;

    // Background circle
    svg += `<circle cx="${center}" cy="${center}" r="${outerR}" fill="none" stroke="rgba(212,175,55,0.15)" stroke-width="1"/>`;
    svg += `<circle cx="${center}" cy="${center}" r="${innerR}" fill="none" stroke="rgba(212,175,55,0.1)" stroke-width="1"/>`;

    signs.forEach((sign, i) => {
      const startAngle = (i * 30 - 90) * (Math.PI / 180);
      const endAngle = ((i + 1) * 30 - 90) * (Math.PI / 180);
      const midAngle = ((i * 30 + 15) - 90) * (Math.PI / 180);

      const isActive = sign.name === activeSign;

      // Segment path
      const x1o = center + outerR * Math.cos(startAngle);
      const y1o = center + outerR * Math.sin(startAngle);
      const x2o = center + outerR * Math.cos(endAngle);
      const y2o = center + outerR * Math.sin(endAngle);
      const x1i = center + innerR * Math.cos(endAngle);
      const y1i = center + innerR * Math.sin(endAngle);
      const x2i = center + innerR * Math.cos(startAngle);
      const y2i = center + innerR * Math.sin(startAngle);

      const fillColor = isActive ? 'rgba(212,175,55,0.25)' : 'rgba(255,255,255,0.02)';
      const strokeColor = isActive ? 'rgba(212,175,55,0.6)' : 'rgba(255,255,255,0.08)';

      svg += `<path d="M${x1o},${y1o} A${outerR},${outerR} 0 0,1 ${x2o},${y2o} L${x1i},${y1i} A${innerR},${innerR} 0 0,0 ${x2i},${y2i} Z"
        fill="${fillColor}" stroke="${strokeColor}" stroke-width="${isActive ? 1.5 : 0.5}"
        ${isActive ? 'filter="url(#glow)"' : ''}/>`;

      // Symbol text
      const tx = center + textR * Math.cos(midAngle);
      const ty = center + textR * Math.sin(midAngle);

      svg += `<text x="${tx}" y="${ty}" text-anchor="middle" dominant-baseline="central"
        font-size="${isActive ? '16' : '13'}" fill="${isActive ? '#f0d78c' : 'rgba(240,235,227,0.5)'}"
        font-weight="${isActive ? '700' : '400'}">${sign.symbol}</text>`;

      // Divider lines
      svg += `<line x1="${x1o}" y1="${y1o}" x2="${x2i}" y2="${y2i}" stroke="rgba(212,175,55,0.08)" stroke-width="0.5"/>`;
    });

    // Center circle
    svg += `<circle cx="${center}" cy="${center}" r="28" fill="rgba(12,12,35,0.9)" stroke="rgba(212,175,55,0.3)" stroke-width="1"/>`;

    // Center sign
    if (activeSign) {
      const sign = signs.find(s => s.name === activeSign);
      if (sign) {
        svg += `<text x="${center}" y="${center - 4}" text-anchor="middle" dominant-baseline="central"
          font-size="20" fill="#f0d78c">${sign.symbol}</text>`;
        svg += `<text x="${center}" y="${center + 14}" text-anchor="middle" dominant-baseline="central"
          font-size="6" fill="rgba(240,235,227,0.5)" letter-spacing="1" font-family="Inter, sans-serif">${sign.name.toUpperCase()}</text>`;
      }
    }

    svg += '</svg>';
    container.innerHTML = svg;
  }

  /* ═══════════════ SHARE / DOWNLOAD RESULTS ═══════════════ */
  function initShare() {
    const shareBtn = document.getElementById('btn-share');
    if (!shareBtn) return;

    shareBtn.addEventListener('click', async () => {
      const rec = ResultsController.getRecommendation();
      if (!rec) return;

      const shareData = {
        title: 'My Gemstone Recommendation — Humara Pandit',
        text: `🔮 Based on my zodiac sign ${rec.zodiac.name} (${rec.zodiac.symbol}), my recommended gemstone is ${rec.primaryGemstone.name} (${rec.primaryGemstone.hindi})!\n\n💎 Ruled by ${rec.planet.name} (${rec.planet.sanskrit})\n⭐ Nakshatra: ${rec.nakshatra.name}\n\nDiscover your gemstone at Humara Pandit!`,
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (e) {
          // User cancelled
        }
      } else {
        // Fallback: copy to clipboard
        try {
          await navigator.clipboard.writeText(shareData.text);
          showToast('Copied to clipboard! 📋');
        } catch {
          showToast('Share not supported in this browser');
        }
      }
    });
  }

  /* ═══════════════ TOAST NOTIFICATION ═══════════════ */
  function showToast(message, duration = 3000) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('visible'));

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  /* ═══════════════ LOCAL STORAGE ═══════════════ */
  function saveRecommendation(rec) {
    try {
      const data = {
        name: rec.name,
        birthDate: rec.birthDate.toISOString(),
        gender: rec.gender,
        goalId: rec.goal?.id,
        zodiacName: rec.zodiac.name,
        primaryGem: rec.primaryGemstone.name,
        secondaryGem: rec.secondaryGemstone?.name,
        nakshatraName: rec.nakshatra.name,
        timestamp: Date.now()
      };
      localStorage.setItem('humaraPandit_lastRecommendation', JSON.stringify(data));
    } catch (e) {
      // Storage full or disabled
    }
  }

  function loadLastRecommendation() {
    try {
      const data = localStorage.getItem('humaraPandit_lastRecommendation');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  /* ═══════════════ TYPING EFFECT ═══════════════ */
  function typeText(element, texts, interval = 700, onDone = null) {
    let i = 0;
    element.textContent = texts[0];

    const timer = setInterval(() => {
      i++;
      if (i < texts.length) {
        element.style.opacity = '0';
        setTimeout(() => {
          element.textContent = texts[i];
          element.style.opacity = '1';
        }, 200);
      } else {
        clearInterval(timer);
        if (onDone) onDone();
      }
    }, interval);

    return timer;
  }

  /* ═══════════════ SMOOTH SECTION TRANSITIONS ═══════════════ */
  function transitionSection(fromId, toId, callback) {
    const from = document.getElementById(fromId);
    const to = document.getElementById(toId);

    if (from) {
      from.style.opacity = '0';
      from.style.transform = 'translateY(-20px)';
    }

    setTimeout(() => {
      if (from) {
        from.classList.remove('active');
        from.style.opacity = '';
        from.style.transform = '';
      }
      if (to) {
        to.classList.add('active');
        to.style.opacity = '0';
        to.style.transform = 'translateY(20px)';

        requestAnimationFrame(() => {
          to.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          to.style.opacity = '1';
          to.style.transform = 'translateY(0)';
        });

        setTimeout(() => {
          to.style.transition = '';
          to.style.opacity = '';
          to.style.transform = '';
          if (callback) callback();
        }, 500);
      }
    }, 300);
  }

  /* ═══════════════ GEMSTONE COMPATIBILITY ═══════════════ */
  function getCompatibility(gemstoneName) {
    const compatMap = {
      'Ruby':           { compatible: ['Red Coral', 'Yellow Sapphire', 'Pearl'],    incompatible: ['Blue Sapphire', 'Diamond', 'Hessonite', "Cat's Eye"] },
      'Pearl':          { compatible: ['Ruby', 'Red Coral', 'Yellow Sapphire'],     incompatible: ['Hessonite', "Cat's Eye"] },
      'Red Coral':      { compatible: ['Ruby', 'Pearl', 'Yellow Sapphire'],         incompatible: ['Diamond', 'Blue Sapphire', 'Emerald', 'Hessonite'] },
      'Emerald':        { compatible: ['Diamond', 'Blue Sapphire'],                 incompatible: ['Ruby', 'Pearl', 'Red Coral', 'Yellow Sapphire'] },
      'Yellow Sapphire': { compatible: ['Ruby', 'Pearl', 'Red Coral'],              incompatible: ['Diamond', 'Blue Sapphire', 'Emerald'] },
      'Diamond':        { compatible: ['Emerald', 'Blue Sapphire'],                 incompatible: ['Ruby', 'Pearl', 'Red Coral', 'Yellow Sapphire'] },
      'Blue Sapphire':  { compatible: ['Emerald', 'Diamond'],                       incompatible: ['Ruby', 'Pearl', 'Red Coral', 'Yellow Sapphire'] },
      'Hessonite':      { compatible: ["Cat's Eye"],                                 incompatible: ['Ruby', 'Pearl', 'Red Coral'] },
      "Cat's Eye":      { compatible: ['Hessonite'],                                 incompatible: ['Ruby', 'Pearl'] },
    };
    return compatMap[gemstoneName] || { compatible: [], incompatible: [] };
  }

  function renderCompatibility(containerId, gemstoneName) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const compat = getCompatibility(gemstoneName);

    let html = '<div class="compat-grid">';

    html += '<div class="compat-group compat-good">';
    html += '<h4 class="compat-label">✅ Compatible With</h4>';
    html += '<div class="compat-chips">';
    compat.compatible.forEach(name => {
      const gem = AstrologyData.GEMSTONES[name];
      if (gem) {
        html += `<span class="compat-chip compat-chip--good">
          <span class="compat-chip-dot" style="background:${gem.color}"></span>
          ${gem.name}
        </span>`;
      }
    });
    html += '</div></div>';

    html += '<div class="compat-group compat-bad">';
    html += '<h4 class="compat-label">⚠️ Avoid Combining</h4>';
    html += '<div class="compat-chips">';
    compat.incompatible.forEach(name => {
      const gem = AstrologyData.GEMSTONES[name];
      if (gem) {
        html += `<span class="compat-chip compat-chip--bad">
          <span class="compat-chip-dot" style="background:${gem.color}"></span>
          ${gem.name}
        </span>`;
      }
    });
    html += '</div></div>';

    html += '</div>';

    container.innerHTML = html;
  }

  /* ═══════════════ INIT ALL EFFECTS ═══════════════ */
  function init() {
    initTilt('.gemstone-card');
    initScrollReveal();
    initShare();

    // Animate hero counters when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(animateCounters, 400);
          heroObserver.unobserve(entry.target);
        }
      });
    });
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) heroObserver.observe(heroStats);
  }

  return {
    init,
    initTilt,
    initScrollReveal,
    animateCounters,
    renderZodiacWheel,
    renderCompatibility,
    getCompatibility,
    saveRecommendation,
    loadLastRecommendation,
    typeText,
    transitionSection,
    showToast,
  };

})();
