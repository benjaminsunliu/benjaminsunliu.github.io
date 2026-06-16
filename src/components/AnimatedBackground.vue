<script setup>
// Living gradient-blob backdrop. Pure CSS animation, sits behind everything.
</script>

<template>
  <div class="bg" aria-hidden="true">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
    <div class="blob blob-4"></div>
    <div class="grid-overlay"></div>
    <div class="noise"></div>
  </div>
</template>

<style scoped>
.bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background:
    radial-gradient(120% 120% at 50% 0%, #0d1430 0%, #070a17 55%, #04060f 100%);
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(64px);
  opacity: 0.72;
  will-change: transform;
  mix-blend-mode: screen;
}

.blob-1 {
  width: 46vw;
  height: 46vw;
  background: radial-gradient(circle at 30% 30%, #4f5dff, transparent 70%);
  top: -8vw;
  left: -6vw;
  animation: drift-1 22s ease-in-out infinite;
}

.blob-2 {
  width: 40vw;
  height: 40vw;
  background: radial-gradient(circle at 50% 50%, #19c6d6, transparent 70%);
  top: 30vh;
  right: -10vw;
  animation: drift-2 26s ease-in-out infinite;
}

.blob-3 {
  width: 38vw;
  height: 38vw;
  background: radial-gradient(circle at 50% 50%, #a855f7, transparent 70%);
  bottom: -10vw;
  left: 20vw;
  animation: drift-3 30s ease-in-out infinite;
}

.blob-4 {
  width: 30vw;
  height: 30vw;
  background: radial-gradient(circle at 50% 50%, #f472b6, transparent 70%);
  top: 10vh;
  left: 38vw;
  opacity: 0.4;
  animation: drift-4 24s ease-in-out infinite;
}

@keyframes drift-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(14vw, 10vh) scale(1.12); }
  66% { transform: translate(6vw, 22vh) scale(0.92); }
}

@keyframes drift-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-12vw, 8vh) scale(1.1); }
  66% { transform: translate(-4vw, -10vh) scale(0.9); }
}

@keyframes drift-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(10vw, -12vh) scale(1.15); }
}

@keyframes drift-4 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-14vw, 14vh) scale(0.85); }
}

/* Subtle grid that reads as engineering blueprint */
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 75%);
}

/* Fine film grain so the glass has texture to refract */
.noise {
  position: absolute;
  inset: 0;
  opacity: 0.045;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Hyperspace mode dims the blob field (handled by a global .egg-3d rule
   in App.vue so it isn't affected by scoped-style specificity). */
.bg { transition: opacity 0.9s ease; }

@media (prefers-reduced-motion: reduce) {
  .blob { animation: none; }
}

@media (max-width: 768px) {
  .blob { filter: blur(50px); opacity: 0.45; }
  .grid-overlay { background-size: 44px 44px; }
}
</style>
