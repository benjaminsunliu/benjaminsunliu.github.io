<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import Experience from './components/Experience.vue';
import Projects from './components/Projects.vue';
import Education from './components/Education.vue';
import Hobbies from './components/Hobbies.vue';
import Footer from './components/Footer.vue';

const activeSection = ref('hero');
</script>

<template>
  <div class="portfolio">
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

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  section {
    padding: 3rem 0;
  }
}
</style>
