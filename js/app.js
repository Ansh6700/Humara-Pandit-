/* ============================================
   HUMARA PANDIT — App Controller
   Main orchestrator for section navigation,
   hamburger menu, effects, localStorage
   ============================================ */

const App = (() => {

  const sections = ['hero', 'form', 'results', 'explorer', 'about'];
  let currentSection = 'hero';

  function init() {
    // Initialize all controllers
    FormController.init(handleFormSubmit);
    ExplorerController.init();
    ParticleSystem.init();
    Effects.init();

    // Navigation links (all data-navigate elements)
    document.querySelectorAll('[data-navigate]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(el.dataset.navigate);
        closeHamburger();
      });
    });

    // Footer links
    document.querySelectorAll('.footer-link[data-navigate]').forEach(link => {
      link.addEventListener('click', () => {
        navigateTo(link.dataset.navigate);
      });
    });

    // Hamburger menu
    const hamburger = document.getElementById('hamburger-btn');
    if (hamburger) {
      hamburger.addEventListener('click', toggleHamburger);
    }

    // Close mobile nav on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeHamburger();
    });

    // Show hero on load
    navigateTo('hero');
    updateNav();

    // Check for last recommendation
    checkLastRecommendation();
  }

  function navigateTo(sectionName) {
    if (!sections.includes(sectionName)) return;

    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

    // Show target section
    const target = document.getElementById(`${sectionName}-section`);
    if (target) {
      target.classList.add('active');
      currentSection = sectionName;
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Update nav
    updateNav();

    // Update nav link active states
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.navigate === sectionName);
    });

    // Show/hide footer (hide on hero)
    const footer = document.getElementById('site-footer');
    if (footer) {
      footer.style.display = (sectionName === 'hero') ? 'none' : 'block';
    }

    // Re-trigger scroll reveal for newly visible elements
    Effects.initScrollReveal();
  }

  function updateNav() {
    const nav = document.querySelector('.main-nav');
    if (currentSection === 'hero') {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }
  }

  /* ─── Hamburger Menu ─── */
  function toggleHamburger() {
    const btn = document.getElementById('hamburger-btn');
    const links = document.getElementById('nav-links');
    const isOpen = btn.classList.toggle('open');
    links.classList.toggle('mobile-open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
  }

  function closeHamburger() {
    const btn = document.getElementById('hamburger-btn');
    const links = document.getElementById('nav-links');
    if (btn && links) {
      btn.classList.remove('open');
      links.classList.remove('mobile-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  }

  /* ─── Form Submit Handler ─── */
  function handleFormSubmit(formData) {
    navigateTo('results');

    const recommendation = AstrologyEngine.generateRecommendation(formData);

    // Save to localStorage
    Effects.saveRecommendation(recommendation);

    // Show analysis animation, then render results
    ResultsController.showAnalysis(() => {
      ResultsController.render(recommendation);

      // Render zodiac wheel
      Effects.renderZodiacWheel('zodiac-wheel', recommendation.zodiac.name);

      // Render compatibility
      Effects.renderCompatibility('compatibility-container', recommendation.primaryGemstone.name);

      // Re-init scroll reveals for new content
      Effects.initScrollReveal();
    });
  }

  /* ─── Last Recommendation Check ─── */
  function checkLastRecommendation() {
    const last = Effects.loadLastRecommendation();
    if (!last) return;

    const banner = document.getElementById('last-rec-banner');
    const nameEl = document.getElementById('last-rec-name');
    const gemEl = document.getElementById('last-rec-gem');
    const viewBtn = document.getElementById('btn-view-last');

    if (banner && nameEl && gemEl) {
      nameEl.textContent = last.name;
      gemEl.textContent = last.primaryGem;
      banner.style.display = 'flex';

      viewBtn.addEventListener('click', () => {
        // Re-generate the recommendation
        const formData = {
          name: last.name,
          birthDate: new Date(last.birthDate),
          gender: last.gender,
          goalId: last.goalId
        };
        handleFormSubmit(formData);
      });
    }
  }

  function getCurrentSection() {
    return currentSection;
  }

  return { init, navigateTo, getCurrentSection };

})();

// ─── Boot ───
document.addEventListener('DOMContentLoaded', App.init);
