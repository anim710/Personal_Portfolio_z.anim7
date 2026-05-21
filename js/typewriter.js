/* =========================================
   typewriter.js — Typewriter Effect
   Edit `phrases` to change what gets typed
   ========================================= */

(function () {
  const PHRASES = [
    'Turning ideas into digital reality.',
    'Full Stack Developer.',
    'MERN Stack Enthusiast.',
    'Building scalable web apps.',
    'Open to new opportunities.',
  ];

  const SPEED_TYPE   = 55;  // ms per character
  const SPEED_DELETE = 30;  // ms per delete
  const PAUSE_AFTER  = 2200; // ms before deleting
  const PAUSE_BEFORE = 400;  // ms before typing next

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let el          = null;

  function type() {
    el = el || document.getElementById('typewriter-text');
    if (!el) return;

    const current = PHRASES[phraseIndex];

    if (!isDeleting) {
      // Typing
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, PAUSE_AFTER);
        return;
      }
    } else {
      // Deleting
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting  = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        setTimeout(type, PAUSE_BEFORE);
        return;
      }
    }

    setTimeout(type, isDeleting ? SPEED_DELETE : SPEED_TYPE);
  }

  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1200);
  });
})();