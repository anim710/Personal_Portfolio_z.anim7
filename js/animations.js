/* =========================================
   animations.js — Scroll Reveals, Skill Bars,
                   Count-up, Custom Cursor
   ========================================= */

(function () {

  // ── Custom cursor ──────────────────────────
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let ringX = 0, ringY = 0;
  let curX  = 0, curY  = 0;

  document.addEventListener('mousemove', e => {
    curX = e.clientX;
    curY = e.clientY;
    dot.style.left = curX + 'px';
    dot.style.top  = curY + 'px';
  });

  (function animateCursor() {
    ringX += (curX - ringX) * 0.12;
    ringY += (curY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateCursor);
  })();

  // Hover expansion for clickables
  function bindCursorHover() {
    document.querySelectorAll('a, button, .project-card, .skill-category').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width   = '56px';
        ring.style.height  = '56px';
        ring.style.opacity = '0.4';
        dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width   = '36px';
        ring.style.height  = '36px';
        ring.style.opacity = '0.6';
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }

  // ── Intersection Observer — reveal ────────
  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // ── Skill bars ────────────────────────────
  function initSkillBars() {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const pct = bar.getAttribute('data-width');
          bar.style.setProperty('--fill-width', pct + '%');
          bar.style.width = pct + '%';
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-bar-fill').forEach(bar => barObserver.observe(bar));
  }

  // ── Count-up numbers ──────────────────────
  function animateCount(el, target, duration = 1800) {
    const start = Date.now();
    const tick  = () => {
      const elapsed  = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + (target === 100 ? '%' : '+');
    };
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          animateCount(el, target);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));
  }

  // ── Contact form ──────────────────────────
  function initContactForm() {
    const form   = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (!form) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const name    = form.querySelector('#cf-name').value.trim();
      const email   = form.querySelector('#cf-email').value.trim();
      const subject = form.querySelector('#cf-subject').value.trim();
      const message = form.querySelector('#cf-message').value.trim();

      if (!name || !email || !subject || !message) {
        status.textContent = '// All fields required.';
        status.style.color = '#ff4466';
        return;
      }

      status.textContent  = '// Sending...';
      status.style.color  = 'var(--accent-primary)';

      // Build mailto fallback (replace with your API/backend later)
      const mailtoLink = `mailto:anim3654@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)}`;
      window.location.href = mailtoLink;

      setTimeout(() => {
        status.textContent = '// Message sent! Talk soon.';
        form.reset();
      }, 1000);
    });
  }

  // ── Init after sections load ──────────────
  document.addEventListener('sectionsLoaded', () => {
    initReveal();
    initSkillBars();
    initCounters();
    initContactForm();
    bindCursorHover();
  });

})();