/* =========================================
   navbar.js — Navigation Logic
   ========================================= */

(function () {
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-links');

  // ── Scroll: add .scrolled class ──────────
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  });

  // ── Active link on scroll ─────────────────
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY  = window.scrollY + 120;

    sections.forEach(section => {
      const sTop  = section.offsetTop;
      const sH    = section.offsetHeight;
      const sId   = section.getAttribute('id');

      if (scrollY >= sTop && scrollY < sTop + sH) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === sId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ── Smooth scroll on click ────────────────
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = target.offsetTop - 70;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }
      // Close mobile menu
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // ── Hamburger toggle ─────────────────────
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close menu on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
})();