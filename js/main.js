/* =========================================
   main.js — Entry Point & Misc
   ========================================= */

(function () {

  // ── Page load fade-in ─────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

  // ── Smooth anchor buttons (hero CTA etc.) ─
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (a) {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  // ── Console easter egg ────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    console.log(
      '%c  Zahidul Hoque Anim  ',
      'background:#00d4ff;color:#030a0f;font-family:monospace;font-size:16px;padding:8px 20px;border-radius:4px;font-weight:bold;'
    );
    console.log('%c  Full Stack Developer | anim3654@gmail.com  ', 'color:#00d4ff;font-family:monospace;font-size:11px;');
    console.log('%c  github.com/anim710  ', 'color:#7ab8cc;font-family:monospace;font-size:11px;');
  });

})();