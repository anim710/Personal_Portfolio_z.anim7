/* =========================================
   particles.js — Canvas Particle System
   ========================================= */

(function () {
  const canvas  = document.getElementById('particle-canvas');
  const ctx     = canvas.getContext('2d');
  let W, H, particles = [], animFrame;

  const CONFIG = {
    count:       90,
    color:       '0, 212, 255',
    maxRadius:   2.2,
    minRadius:   0.4,
    speed:       0.35,
    lineDistance: 130,
    lineOpacity:  0.12,
    mouseDist:   160
  };

  let mouse = { x: null, y: null };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.reset();
  }

  Particle.prototype.reset = function () {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.r  = CONFIG.minRadius + Math.random() * (CONFIG.maxRadius - CONFIG.minRadius);
    this.vx = (Math.random() - 0.5) * CONFIG.speed;
    this.vy = (Math.random() - 0.5) * CONFIG.speed;
    this.opacity = 0.2 + Math.random() * 0.5;
  };

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;

    // Mouse repel
    if (mouse.x !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONFIG.mouseDist) {
        const force = (CONFIG.mouseDist - dist) / CONFIG.mouseDist;
        this.x += dx * force * 0.04;
        this.y += dy * force * 0.04;
      }
    }

    // Wrap edges
    if (this.x < -10) this.x = W + 10;
    if (this.x > W + 10) this.x = -10;
    if (this.y < -10) this.y = H + 10;
    if (this.y > H + 10) this.y = -10;
  };

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.lineDistance) {
          const alpha = (1 - dist / CONFIG.lineDistance) * CONFIG.lineOpacity;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${CONFIG.color}, ${alpha})`;
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      p.update();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CONFIG.color}, ${p.opacity})`;
      ctx.fill();
    });

    animFrame = requestAnimationFrame(draw);
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < CONFIG.count; i++) {
      particles.push(new Particle());
    }
    cancelAnimationFrame(animFrame);
    draw();
  }

  window.addEventListener('resize', () => {
    resize();
    particles.forEach(p => p.reset());
  });

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Start after DOM loads
  window.addEventListener('DOMContentLoaded', init);
})();