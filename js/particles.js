
const ParticleSystem = (() => {

  let canvas, ctx;
  let particles = [];
  let mouse = { x: -1000, y: -1000 };
  let animationId;
  let isRunning = false;

  const CONFIG = {
    particleCount: 90,
    connectionDistance: 130,
    mouseRadius: 160,
    baseSpeed: 0.25,
    colors: [
      'rgba(212, 175, 55, alpha)',   // gold
      'rgba(240, 215, 140, alpha)',  // light gold
      'rgba(168, 85, 247, alpha)',   // purple
      'rgba(255, 255, 255, alpha)',  // white
      'rgba(6, 182, 212, alpha)',    // cyan
      'rgba(224, 17, 95, alpha)',    // ruby red
      'rgba(80, 200, 120, alpha)',   // emerald
    ],
    sizeRange: [1, 3.5],
  };

  function init() {
    canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    resize();

    window.addEventListener('resize', debounce(resize, 200));
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    createParticles();
    start();
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const count = window.innerWidth < 768 ? Math.floor(CONFIG.particleCount * 0.5) : CONFIG.particleCount;

    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }
  }

  function createParticle() {
    const colorTemplate = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
    const size = CONFIG.sizeRange[0] + Math.random() * (CONFIG.sizeRange[1] - CONFIG.sizeRange[0]);
    const speed = CONFIG.baseSpeed * (0.3 + Math.random() * 0.7);

    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size,
      baseSize: size,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      colorTemplate,
      alpha: 0.2 + Math.random() * 0.5,
      baseAlpha: 0.2 + Math.random() * 0.5,
      pulseSpeed: 0.005 + Math.random() * 0.015,
      pulseOffset: Math.random() * Math.PI * 2,
    };
  }

  function onMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  function start() {
    if (isRunning) return;
    isRunning = true;
    animate();
  }

  function stop() {
    isRunning = false;
    if (animationId) cancelAnimationFrame(animationId);
  }

  function animate() {
    if (!isRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const time = Date.now() * 0.001;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.alpha = p.baseAlpha + Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset) * 0.15;
      p.size = p.baseSize + Math.sin(time * p.pulseSpeed * 40 + p.pulseOffset) * 0.4;

      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONFIG.mouseRadius) {
        const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius;
        const angle = Math.atan2(dy, dx);
        p.x += Math.cos(angle) * force * 2;
        p.y += Math.sin(angle) * force * 2;
        p.alpha = Math.min(1, p.alpha + force * 0.3);
        p.size = p.baseSize + force * 2;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;

      const color = p.colorTemplate.replace('alpha', p.alpha.toFixed(2));
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      if (p.baseSize > 2) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        const glowColor = p.colorTemplate.replace('alpha', (p.alpha * 0.1).toFixed(2));
        ctx.fillStyle = glowColor;
        ctx.fill();
      }
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.connectionDistance) {
          const opacity = (1 - dist / CONFIG.connectionDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  function debounce(fn, ms) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  }

  return { init, start, stop };

})();
