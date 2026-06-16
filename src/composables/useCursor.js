// Custom cursor that follows the pointer with easing and morphs
// (grows + inverts) when hovering interactive elements. Disabled on
// touch devices and when the user prefers reduced motion.

import { onMounted, onBeforeUnmount } from 'vue';

export function useCursor() {
  let dot, ring, raf;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let enabled = false;

  let shown = false;
  const onMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    if (!shown) {
      shown = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  };

  const onOver = (e) => {
    const interactive = e.target.closest(
      'a, button, .tiltable, input, textarea, [data-cursor]'
    );
    document.documentElement.classList.toggle('cursor-active', !!interactive);
    // Distinct cursor for the easter-egg element.
    const egg = e.target.closest('[data-cursor="egg"]');
    document.documentElement.classList.toggle('cursor-egg', !!egg);
  };

  const loop = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    raf = requestAnimationFrame(loop);
  };

  onMounted(() => {
    const touch = window.matchMedia('(hover: none)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touch || reduce) return;

    enabled = true;
    document.documentElement.classList.add('has-custom-cursor');

    dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.style.opacity = '0';
    ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.style.opacity = '0';
    document.body.appendChild(ring);
    document.body.appendChild(dot);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    loop();
  });

  onBeforeUnmount(() => {
    if (!enabled) return;
    cancelAnimationFrame(raf);
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseover', onOver);
    dot && dot.remove();
    ring && ring.remove();
    document.documentElement.classList.remove('has-custom-cursor', 'cursor-active', 'cursor-egg');
  });
}
