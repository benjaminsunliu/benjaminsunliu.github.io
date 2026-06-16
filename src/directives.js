// Global directives for the glassmorphism portfolio.
// v-tilt  : 3D pointer parallax + moving light glare on cards
// v-reveal: fade/slide a card into view on scroll

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isTouch = () => window.matchMedia('(hover: none)').matches;

export const tilt = {
  mounted(el, binding) {
    if (isTouch() || prefersReducedMotion()) return;

    const max = (binding.value && binding.value.max) || 7;
    let raf = null;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * max * 2;
      const ry = (px - 0.5) * max * 2;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--rx', rx.toFixed(2) + 'deg');
        el.style.setProperty('--ry', ry.toFixed(2) + 'deg');
        el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      });
    };

    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };

    el.__tilt = { onMove, onLeave };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    el.classList.add('tiltable');
  },
  unmounted(el) {
    if (el.__tilt) {
      el.removeEventListener('mousemove', el.__tilt.onMove);
      el.removeEventListener('mouseleave', el.__tilt.onLeave);
    }
  },
};

export const reveal = {
  mounted(el, binding) {
    el.classList.add('reveal');
    if (binding.value && binding.value.delay) {
      el.style.transitionDelay = binding.value.delay + 'ms';
    }

    if (prefersReducedMotion()) {
      el.classList.add('reveal-in');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('reveal-in');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    el.__reveal = observer;
  },
  unmounted(el) {
    if (el.__reveal) el.__reveal.disconnect();
  },
};
