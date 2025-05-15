<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';

const emit = defineEmits(['visible']);
const app = getCurrentInstance();

const isVisible = ref(false);
const heroRef = ref(null);
const scrollIndicatorClicked = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting;
      if (isVisible.value) {
        emit('visible');
      }
    },
    { threshold: 0.5 }
  );
  
  if (heroRef.value) {
    observer.observe(heroRef.value);
  }
});

const scrollToSection = (sectionId) => {
  app.appContext.config.globalProperties.$scrollToSection(sectionId);
};

const handleScrollIndicatorClick = (sectionId) => {
  scrollIndicatorClicked.value = true;
  
  setTimeout(() => {
    scrollIndicatorClicked.value = false;
  }, 500);
  
  scrollToSection(sectionId);
};

const name = 'Benjamin Liu';
const title = 'Software Engineering Student';
const shortBio = 'Passionate about creating elegant solutions to complex problems';
const resumeLink = '/LIUB_CV_DevOps.pdf'; 
</script>

<template>
  <section id="hero" ref="heroRef" class="hero">
    <div class="hero-content">
      <div class="hero-text">
        <p class="greeting">Hello, I'm</p>
        <h1>{{ name }}</h1>
        <h2 class="title">{{ title }}</h2>
        <p class="bio">{{ shortBio }}</p>
        <div class="hero-actions">
          <a :href="resumeLink" target="_blank" class="btn">View Resume</a>
          <a href="#" @click.prevent="handleScrollIndicatorClick('projects')" class="btn btn-secondary">View My Work</a>
        </div>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/benjamin-sliu/" aria-label="LinkedIn" title="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="https://github.com/benjaminsunliu" aria-label="GitHub" title="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
        </div>
      </div>
      <div class="hero-image">
        
        <div class="image-placeholder">
          <img src="../assets/linkedin.jpeg" alt="headshot" width="300">
        </div>
      </div>
    </div>
    <div class="scroll-indicator" :class="{ 'clicked': scrollIndicatorClicked }">
      <a href="#" @click.prevent="handleScrollIndicatorClick('experience')">
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-top: 5rem;
}

.hero-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.hero-text {
  flex: 1;
}

.greeting {
  font-size: 1.5rem;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

h1 {
  font-size: 4rem;
  font-weight: 800;
  margin: 0;
  background-image: linear-gradient(to right, var(--primary), var(--secondary));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.title {
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0.5rem 0 1rem;
  color: var(--dark);
}

.bio {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  color: var(--text-light);
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn-secondary {
  background-color: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.btn-secondary:hover {
  background-color: var(--primary);
  color: white;
}

.social-links {
  display: flex;
  gap: 1.5rem;
}

.social-links a {
  color: var(--dark);
  transition: var(--transition);
}

.social-links a:hover {
  color: var(--primary);
  transform: translateY(-3px);
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-placeholder {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.image-placeholder svg {
  width: 50%;
  height: 50%;
  color: white;
  z-index: 1;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
}

.scroll-indicator a {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.scroll-indicator span {
  display: block;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid var(--primary);
  border-right: 2px solid var(--primary);
  transform: rotate(45deg);
  animation: scrollIndicator 2s infinite;
}

.scroll-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.scroll-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes scrollIndicator {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-5px, -5px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(5px, 5px);
  }
}

.scroll-indicator.clicked span {
  animation-play-state: paused;
  opacity: 1;
  transform: rotate(45deg) translate(0, 0);
}

.scroll-indicator.clicked {
  animation: bounce 0.5s ease;
}

@keyframes bounce {
  0% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
  100% { transform: translateX(-50%) translateY(0); }
}

@media (max-width: 768px) {
  .hero-content {
    flex-direction: column-reverse;
    text-align: center;
  }

  h1 {
    font-size: 3rem;
  }

  .title {
    font-size: 2rem;
  }

  .hero-actions {
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }

  h2::after {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style> 