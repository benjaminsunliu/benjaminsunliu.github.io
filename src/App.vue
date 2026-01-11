<script setup>
import { ref, onMounted, computed, getCurrentInstance } from 'vue';
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import Experience from './components/Experience.vue';
import Projects from './components/Projects.vue';
import Education from './components/Education.vue';
import Hobbies from './components/Hobbies.vue';
import Footer from './components/Footer.vue';

const app = getCurrentInstance();
const activeSection = ref('hero');
const isMobile = computed(() => app?.appContext.config.globalProperties.$isMobile || false);

// Mobile-specific optimizations
onMounted(() => {
  // Listen for scroll events (throttled for performance)
  let lastScrollTime = 0;
  window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScrollTime > 100) { // throttle to 100ms
      lastScrollTime = now;
      
      // Add a class to the body when scrolling for mobile-specific animations
      document.body.classList.add('is-scrolling');
      
      // Remove the class after scrolling stops
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 300);
    }
  }, { passive: true });
});
</script>

<template>
  <div class="portfolio" :class="{ 'is-mobile': isMobile }">
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
  /* Tech/Code Theme Colors */
  --primary: #00ff41; /* Matrix green */
  --secondary: #00d4ff; /* Cyan */
  --accent: #ff0080; /* Neon pink */
  --dark: #0a0a0a; /* Deep black */
  --darker: #000000; /* Pure black */
  --light: #1a1a1a; /* Dark gray */
  --lighter: #2a2a2a; /* Medium gray */
  --text: #e0e0e0; /* Light gray text */
  --text-light: #888888; /* Muted text */
  --text-dark: #ffffff; /* White text */
  --border-radius: 4px; /* Sharp corners like code */
  --transition: all 0.3s ease;
  --header-height: 70px;
  --mobile-header-height: 60px;
  --content-padding-mobile: 16px;
  
  /* Code editor inspired colors */
  --code-bg: #1e1e1e;
  --code-border: #333333;
  --code-highlight: #2d2d2d;
  --terminal-green: #00ff41;
  --terminal-blue: #00d4ff;
  --terminal-pink: #ff0080;
  --terminal-yellow: #ffff00;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--header-height);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
  background-color: var(--dark);
  color: var(--text);
  line-height: 1.6;
  background-image: linear-gradient(135deg, #181c1f 0%, #232b33 100%);
  background-size: cover;
}

.portfolio {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

section {
  padding: 5rem 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  /* Removed grid pattern overlay for smoother look */
  background: transparent;
  box-shadow: none;
}

h1, h2, h3, h4 {
  margin-bottom: 1rem;
  line-height: 1.2;
  font-weight: 600;
}

h1 {
  font-size: 3rem;
  text-shadow: 0 0 10px var(--primary);
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--text-dark);
  position: relative;
}

h2::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.5rem;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  box-shadow: 0 0 10px var(--primary);
}

p {
  margin-bottom: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(45deg, var(--primary), var(--secondary));
  color: var(--darker);
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
  cursor: pointer;
  border: none;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 255, 65, 0.4);
}

.card {
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: none;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
}

ul, ol {
  list-style: none;
}

ul li::before {
  content: '> ';
  color: var(--primary);
  font-weight: bold;
  margin-right: 0.5rem;
}

.is-mobile .btn {
  padding: 0.9rem 1.6rem;
}

.is-scrolling * {
  pointer-events: none;
}

@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

h1:hover {
  animation: glitch 0.3s ease-in-out;
}

@media (max-width: 768px) {
  html {
    scroll-padding-top: var(--mobile-header-height);
  }

  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  h2::after {
    width: 40px;
    height: 3px;
  }
  
  section {
    padding: 1.5rem 0;
    min-height: calc(100vh - var(--mobile-header-height));
    background: transparent;
    box-shadow: none;
  }
  
  .portfolio {
    padding: 0 var(--content-padding-mobile);
  }
  
  a, button, input, select, textarea {
    min-height: 44px;
    min-width: 44px;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  input, textarea, select {
    font-size: 16px;
  }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.cursor {
  animation: blink 1s infinite;
}

.neon-glow {
  text-shadow: 
    0 0 5px currentColor,
    0 0 10px currentColor,
    0 0 15px currentColor,
    0 0 20px currentColor;
}

.code-block {
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: var(--border-radius);
  padding: 1rem;
  font-family: 'JetBrains Mono', monospace;
  position: relative;
  overflow-x: auto;
}

.code-block::before {
  content: '// Code';
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 0.8rem;
  color: var(--text-light);
  opacity: 0.7;
}
</style>
