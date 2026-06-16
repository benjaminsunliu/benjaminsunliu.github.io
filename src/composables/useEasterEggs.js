// Easter eggs for the portfolio.
//  - Konami code  -> background goes rainbow + toast
//  - "egg:fish"   -> a school of fish swims across the screen
//  - console hint  for the curious

import { onMounted, onBeforeUnmount } from 'vue';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const FISH = ['🐠', '🐟', '🐡', '🐙', '🦐', '🐠', '🪼'];

function toast(message) {
  const el = document.createElement('div');
  el.className = 'egg-toast';
  el.textContent = message;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 400);
  }, 2600);
}

function spawnFish(count = 14) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const layer = document.createElement('div');
  layer.className = 'fish-layer';
  document.body.appendChild(layer);

  for (let i = 0; i < count; i++) {
    const fish = document.createElement('span');
    fish.className = 'fish';
    fish.textContent = FISH[Math.floor(Math.random() * FISH.length)];
    const top = Math.random() * 90;
    const size = 1.4 + Math.random() * 2.6;
    const duration = 6 + Math.random() * 6;
    const delay = Math.random() * 3;
    fish.style.top = top + 'vh';
    fish.style.fontSize = size + 'rem';
    fish.style.animationDuration = duration + 's';
    fish.style.animationDelay = delay + 's';
    layer.appendChild(fish);
  }

  setTimeout(() => layer.remove(), 16000);
}

export function useEasterEggs() {
  let buffer = [];

  const onKey = (e) => {
    buffer.push(e.key);
    buffer = buffer.slice(-KONAMI.length);
    if (KONAMI.every((k, i) => (buffer[i] || '').toLowerCase() === k.toLowerCase())) {
      // App.vue owns the open/closed state and toggles it on each entry.
      window.dispatchEvent(new CustomEvent('konami-toggle'));
      buffer = [];
    }
  };

  const onEgg = (e) => {
    if (e.detail === 'fish') {
      spawnFish();
      toast('🐠 The tank overflowed!');
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', onKey);
    window.addEventListener('easteregg', onEgg);
    setTimeout(() => {
      console.log(
        '%c👋 Hey, curious one.',
        'font-size:16px;font-weight:700;color:#7c8cff'
      );
      console.log(
        '%cTry the Konami code (↑↑↓↓←→←→ B A) — and poke around the Aquarium.',
        'color:#4fd1e0'
      );
    }, 1200);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('easteregg', onEgg);
  });
}
