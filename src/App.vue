<script setup>
import { ref, onMounted, onBeforeUnmount, computed, getCurrentInstance } from 'vue';
import AnimatedBackground from './components/AnimatedBackground.vue';
import Desktop from './components/Desktop.vue';
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import Experience from './components/Experience.vue';
import Projects from './components/Projects.vue';
import Education from './components/Education.vue';
import Hobbies from './components/Hobbies.vue';
import Footer from './components/Footer.vue';
import { useEasterEggs } from './composables/useEasterEggs.js';
import { useCursor } from './composables/useCursor.js';

const app = getCurrentInstance();
const activeSection = ref('hero');
const isMobile = computed(() => app?.appContext.config.globalProperties.$isMobile || false);

useEasterEggs();
useCursor();

// benjaminOS desktop (Konami) — a separate way to explore the portfolio
const osOpen = ref(false);
const toggleOs = () => { osOpen.value = !osOpen.value; };
const closeOs = () => { osOpen.value = false; };
const onEsc = (e) => { if (e.key === 'Escape' && osOpen.value) closeOs(); };

// Scroll progress bar
const scrollProgress = ref(0);

onMounted(() => {
  window.addEventListener('konami-toggle', toggleOs);
  window.addEventListener('keydown', onEsc);

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        scrollProgress.value = max > 0 ? (h.scrollTop / max) * 100 : 0;
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('konami-toggle', toggleOs);
  window.removeEventListener('keydown', onEsc);
});
</script>

<template>
  <div class="portfolio" :class="{ 'is-mobile': isMobile, 'os-open': osOpen }">
    <AnimatedBackground />
    <Desktop :active="osOpen" @close="closeOs" />
    <div class="scroll-progress" :style="{ transform: `scaleX(${scrollProgress / 100})` }"></div>
    <Header :activeSection="activeSection" />
    <main>
      <Hero id="hero" @visible="activeSection = 'hero'" />
      <Experience id="experience" @visible="activeSection = 'experience'" />
      <Projects id="projects" @visible="activeSection = 'projects'" />
      <Education id="education" @visible="activeSection = 'education'" />
      <Hobbies id="hobbies" @visible="activeSection = 'hobbies'" />
    </main>
    <Footer />
  </div>
</template>

<style>
:root {
  /* Surface palette */
  --bg-0: #04060f;
  --bg-1: #070a17;
  --bg-2: #0c1226;

  /* Glass tokens */
  --glass-bg: rgba(255, 255, 255, 0.045);
  --glass-bg-strong: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-border-strong: rgba(255, 255, 255, 0.22);
  --glass-blur: 18px;
  --glass-shadow: 0 14px 40px rgba(0, 0, 0, 0.4);

  /* Text */
  --text: #e9ecf8;
  --text-muted: #a3abc7;
  --text-dim: #6c7596;

  /* Accents */
  --accent: #7c8cff;
  --accent-2: #4fd1e0;
  --accent-3: #c084fc;
  --accent-pink: #f472b6;
  --grad-primary: linear-gradient(120deg, #7c8cff 0%, #4fd1e0 100%);
  --grad-iris: linear-gradient(120deg, #7c8cff 0%, #c084fc 50%, #f472b6 100%);
  --grad-warm: linear-gradient(120deg, #c084fc 0%, #f472b6 100%);

  --radius: 20px;
  --radius-sm: 12px;
  --transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  --header-height: 72px;
  --mobile-header-height: 60px;
  --content-padding-mobile: 18px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: var(--bg-0);
  color: var(--text);
  line-height: 1.65;
}

.portfolio {
  position: relative;
  width: 100%;
  overflow-x: clip;
}

/* Content sits in its own layer above the fixed background canvases.
   Explicit z-index (not negative z on the backgrounds) avoids the GPU
   promoting the WebGL layer on top of the content. */
main, .portfolio > footer {
  position: relative;
  z-index: 1;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

section {
  padding: 7rem 0;
  position: relative;
}

/* ---------- Typography ---------- */
h1, h2, h3, h4, h5 {
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text);
}

h1 { font-size: clamp(2.6rem, 6vw, 4.4rem); font-weight: 700; }
h2 { font-size: clamp(2rem, 4vw, 3rem); }

.section-title {
  text-align: center;
}

.section-title h2 {
  display: inline-block;
  background: var(--grad-iris);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.75rem;
}

.section-title p {
  color: var(--text-muted);
  font-size: 1.05rem;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.02em;
}

.eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.32em;
  color: var(--accent-2);
}

/* ---------- Glass primitives ---------- */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(150%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(150%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--glass-shadow);
}

.glass-card {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(150%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(150%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--glass-shadow);
  overflow: hidden;
  transition: var(--transition);
  /* Keep a stable backing layer so card content isn't dropped during scroll
     repaints (a backdrop-filter compositing glitch in Safari/Chromium). */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

/* Top inner highlight — the "lit edge" of glass */
.glass-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    140deg,
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0.12)
  );
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0.7;
  transition: opacity 0.35s ease;
}

.glass-card:hover {
  border-color: var(--glass-border-strong);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(124, 140, 255, 0.15);
}

.glass-card:hover::before { opacity: 1; }

/* ---------- Tilt + glare ---------- */
.tiltable {
  transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.4s, border-color 0.4s;
}

.tiltable::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    340px circle at var(--mx, 50%) var(--my, 0%),
    rgba(255, 255, 255, 0.14),
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 3;
}

.tiltable:hover::after { opacity: 1; }

/* ---------- Reveal on scroll ---------- */
.reveal {
  opacity: 0;
  transform: translateY(34px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal-in {
  opacity: 1;
  /* Settle to no transform (not translateY(0)) so revealed cards don't leave a
     lingering transform context around their backdrop-filter. */
  transform: none;
}

/* ---------- Buttons ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: var(--grad-primary);
  color: #07101f;
  box-shadow: 0 8px 24px rgba(79, 209, 224, 0.25);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 34px rgba(124, 140, 255, 0.4);
}

.btn-ghost {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border-strong);
  color: var(--text);
}

.btn-ghost:hover {
  transform: translateY(-3px);
  border-color: var(--accent);
  box-shadow: 0 12px 30px rgba(124, 140, 255, 0.25);
}

/* ---------- Pills / tags ---------- */
.tag {
  padding: 0.32rem 0.85rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-family: 'JetBrains Mono', monospace;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--glass-border);
  transition: var(--transition);
}

.tag:hover {
  color: var(--text);
  border-color: var(--accent);
  background: rgba(124, 140, 255, 0.12);
}

/* ---------- Scroll progress bar ---------- */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--grad-iris);
  transform-origin: left;
  transform: scaleX(0);
  z-index: 1200;
  box-shadow: 0 0 12px rgba(124, 140, 255, 0.6);
}

/* ---------- Custom cursor ---------- */
/* When the custom cursor is active, no element should show an OS cursor.
   !important overrides scoped per-element `cursor` rules (e.g. buttons). */
.has-custom-cursor,
.has-custom-cursor * {
  cursor: none !important;
}

.cursor-dot,
.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  pointer-events: none;
  z-index: 2000;
  margin-left: -4px;
  margin-top: -4px;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background: #fff;
  transition: transform 0.08s linear, opacity 0.2s;
  mix-blend-mode: difference;
}

.cursor-ring {
  width: 38px;
  height: 38px;
  margin-left: -19px;
  margin-top: -19px;
  border: 1.5px solid rgba(124, 140, 255, 0.7);
  transition: width 0.25s ease, height 0.25s ease, margin 0.25s ease,
    background 0.25s ease, border-color 0.25s ease;
}

.cursor-active .cursor-ring {
  width: 58px;
  height: 58px;
  margin-left: -29px;
  margin-top: -29px;
  background: rgba(124, 140, 255, 0.12);
  border-color: rgba(79, 209, 224, 0.8);
}

/* Easter-egg cursor: cyan ring with a fish, clearly inviting a click. */
.cursor-egg .cursor-ring {
  width: 64px;
  height: 64px;
  margin-left: -32px;
  margin-top: -32px;
  background: rgba(79, 209, 224, 0.16);
  border-color: rgba(79, 209, 224, 0.95);
}

.cursor-egg .cursor-ring::after {
  content: '🐠';
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 22px;
}

.cursor-egg .cursor-dot { opacity: 0 !important; }

/* ---------- Easter egg toast ---------- */
.egg-toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translate(-50%, 24px);
  padding: 0.85rem 1.5rem;
  border-radius: 999px;
  background: var(--glass-bg-strong);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border-strong);
  color: var(--text);
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  z-index: 3000;
  opacity: 0;
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.5);
}

.egg-toast.show {
  opacity: 1;
  transform: translate(-50%, 0);
}

/* ---------- Fish school ---------- */
.fish-layer {
  position: fixed;
  inset: 0;
  z-index: 2500;
  pointer-events: none;
  overflow: hidden;
}

.fish {
  position: absolute;
  left: -20vw;
  animation-name: swim;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: both;
  will-change: transform, opacity;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
}

@keyframes swim {
  0%   { transform: translateX(0) translateY(0); opacity: 0; }
  6%   { opacity: 1; }
  25%  { transform: translateX(35vw) translateY(-3vh); }
  50%  { transform: translateX(70vw) translateY(2vh); }
  75%  { transform: translateX(105vw) translateY(-2vh); }
  94%  { opacity: 1; }
  100% { transform: translateX(145vw) translateY(0); opacity: 0; }
}

/* ---------- benjaminOS desktop (Konami) ---------- */
/* When the desktop is open, hide the normal portfolio beneath it. */
.os-open > main,
.os-open > header,
.os-open > footer,
.os-open > .scroll-progress,
.os-open > .bg {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
}

/* ---------- Misc ---------- */
ul, ol { list-style: none; }

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.001ms !important; }
  .reveal { opacity: 1; transform: none; }
}

@media (max-width: 768px) {
  main { padding: 0 var(--content-padding-mobile); }
  section { padding: 4rem 0; }
  .has-custom-cursor,
  .has-custom-cursor * { cursor: auto !important; }
}
</style>
