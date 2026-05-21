/* =========================================
   sections-loader.js
   Fetches and injects each section HTML file
   ========================================= */

(function () {
  const SECTIONS = [
    { id: 'home-section',      file: 'sections/home.html' },
    { id: 'about-section',     file: 'sections/about.html' },
    { id: 'skills-section',    file: 'sections/skills.html' },
    { id: 'projects-section',  file: 'sections/projects.html' },
    { id: 'education-section', file: 'sections/education.html' },
    { id: 'contact-section',   file: 'sections/contact.html' },
  ];

  async function loadSection({ id, file }) {
    const container = document.getElementById(id);
    if (!container) return;
    try {
      const res  = await fetch(file);
      const html = await res.text();
      container.innerHTML = html;
    } catch (err) {
      console.warn(`Failed to load section: ${file}`, err);
    }
  }

  async function loadAll() {
    // Load sections sequentially to maintain DOM order
    for (const section of SECTIONS) {
      await loadSection(section);
    }
    // Dispatch custom event so other scripts know DOM is ready
    document.dispatchEvent(new CustomEvent('sectionsLoaded'));
  }

  window.addEventListener('DOMContentLoaded', loadAll);
})();