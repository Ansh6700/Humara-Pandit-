const App = (() => {

  const sections = ['hero', 'form', 'results', 'explorer', 'about'];
  let currentSection = 'hero';

  function init() {

    FormController.init(handleFormSubmit);
    ExplorerController.init();
    ParticleSystem.init();
    Effects.init();


    document.querySelectorAll('[data-navigate]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(el.dataset.navigate);
        closeHamburger();
      });
    });


    document.querySelectorAll('.footer-link[data-navigate]').forEach(link => {
      link.addEventListener('click', () => {
        navigateTo(link.dataset.navigate);
      });
    });


    const hamburger = document.getElementById('hamburger-btn');
    if (hamburger) {
      hamburger.addEventListener('click', toggleHamburger);
    }


    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeHamburger();
    });


    navigateTo('hero');
    updateNav();


    checkLastRecommendation();
  }

  function navigateTo(sectionName) {
    if (!sections.includes(sectionName)) return;


    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));


    const target = document.getElementById(`${sectionName}-section`);
    if (target) {
      target.classList.add('active');
      currentSection = sectionName;
    }


    window.scrollTo({ top: 0, behavior: 'instant' });


    updateNav();


    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.navigate === sectionName);
    });


    const footer = document.getElementById('site-footer');
    if (footer) {
      footer.style.display = (sectionName === 'hero') ? 'none' : 'block';
    }


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


    Effects.saveRecommendation(recommendation);


    ResultsController.showAnalysis(() => {
      ResultsController.render(recommendation);


      Effects.renderZodiacWheel('zodiac-wheel', recommendation.zodiac.name);


      Effects.renderCompatibility('compatibility-container', recommendation.primaryGemstone.name);


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
