# 🚀 Zahidul Hoque Anim — Portfolio

Cyberpunk-themed dark portfolio with neon glow, particle background, and typewriter effects.

---

## 📁 Project Structure

```
portfolio/
├── index.html              ← Entry point (navbar, canvas, footer)
├── css/
│   ├── variables.css       ← 🎨 ALL design tokens (colors, fonts, spacing)
│   ├── reset.css           ← Browser normalize
│   ├── base.css            ← Layout utilities, buttons, shared styles
│   ├── navbar.css          ← Navigation styles
│   ├── animations.css      ← All @keyframes
│   ├── sections.css        ← Per-section styles
│   └── responsive.css      ← Media queries
├── js/
│   ├── particles.js        ← Canvas particle system
│   ├── typewriter.js       ← Typewriter effect (edit phrases here)
│   ├── navbar.js           ← Scroll highlight + mobile menu
│   ├── sections-loader.js  ← Dynamically loads section HTML files
│   ├── animations.js       ← Reveal, skill bars, counters, cursor
│   └── main.js             ← Entry point, misc
├── sections/
│   ├── home.html           ← Hero section
│   ├── about.html          ← About me
│   ├── skills.html         ← Skills with progress bars
│   ├── projects.html       ← Project cards ← UPDATE THESE
│   ├── education.html      ← Timeline ← UPDATE THESE
│   └── contact.html        ← Contact form + socials
└── assets/
    └── img/                ← Put your images here
```

---

## ✏️ How to Customize

### 🎨 Change Colors / Theme
Edit `css/variables.css` — all colors, fonts, spacing are here.

### ✍️ Typewriter Phrases
Edit the `PHRASES` array in `js/typewriter.js`.

### 📝 Projects
Edit `sections/projects.html` — add/remove `.project-card` blocks.
Add `<img>` inside `.project-thumb` for real thumbnails.

### 🎓 Education
Edit `sections/education.html` — update `.timeline-item` blocks.

### 🛠️ Skills
Edit `sections/skills.html` — change `data-width` values and labels.

### 📊 Stats
Edit the `data-count` values in `sections/home.html`.

---

## 🚀 Running Locally

Because sections are loaded via `fetch()`, you need a local server:

```bash
# Option 1: VS Code Live Server extension (recommended)
# Option 2: Python
python -m http.server 3000
# Option 3: Node
npx serve .
```

Then open `http://localhost:3000`

---

## 🌐 Deployment

Works on any static host:
- **GitHub Pages** — push to `gh-pages` branch
- **Netlify** — drag & drop the folder
- **Vercel** — connect the repo

---

## 📬 Contact Form

Currently uses `mailto:` fallback. To add real form submission:
1. Sign up at [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com)
2. Replace the form handler in `js/animations.js` → `initContactForm()`

---

Built with ❤️ by **MD. Zahidul Hoque Anim**