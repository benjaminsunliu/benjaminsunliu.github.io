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
  --primary: #3498db;
  --secondary: #2ecc71;
  --dark: #2c3e50;
  --light: #f5f5f5;
  --accent: #e74c3c;
  --text: #333333;
  --text-light: #666666;
  --border-radius: 8px;
  --transition: all 0.3s ease;
  --header-height: 70px;
  --mobile-header-height: 60px;
  --content-padding-mobile: 16px;
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
  font-family: 'Inter', 'Avenir', Helvetica, Arial, sans-serif;
  background-color: var(--light);
  color: var(--text);
  line-height: 1.6;
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
}

h1, h2, h3, h4 {
  margin-bottom: 1rem;
  line-height: 1.2;
}

h1 {
  font-size: 3rem;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--dark);
  position: relative;
}

h2::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.5rem;
  width: 60px;
  height: 4px;
  background-color: var(--primary);
}

p {
  margin-bottom: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: var(--primary);
  color: white;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
  cursor: pointer;
  border: none;
}

.btn:hover {
  background-color: var(--accent);
  transform: translateY(-2px);
}

/* Mobile-specific styles */
.is-mobile .btn {
  /* Larger touch target for mobile */
  padding: 0.9rem 1.6rem;
}

/* Optimize scrolling performance */
.is-scrolling * {
  pointer-events: none;
}

/* Media Queries for Mobile Responsiveness */
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
    padding: 3rem 0;
    min-height: calc(100vh - var(--mobile-header-height));
  }
  
  .portfolio {
    padding: 0 var(--content-padding-mobile);
  }
  
  /* Improve tap targets */
  a, button, input, select, textarea {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Better handling for images on mobile */
  img {
    max-width: 100%;
    height: auto;
  }
  
  /* Improve form fields on mobile */
  input, textarea, select {
    font-size: 16px; /* Prevents zoom on iOS */
    padding: 12px;
    margin-bottom: 16px;
    border-radius: var(--border-radius);
  }
}

/* Optimize for smaller phones */
@media (max-width: 480px) {
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.75rem;
  }
  
  p {
    font-size: 0.95rem;
  }
  
  .btn {
    padding: 0.75rem 1.3rem;
    font-size: 0.95rem;
  }
}
</style>
