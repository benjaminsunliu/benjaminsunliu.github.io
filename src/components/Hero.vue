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
          <a href="#" @click.prevent="handleScrollIndicatorClick('projects')" class="btn btn-secondary">View My Work</a>
          <a target="_blank" href="https://bensliu.ca/ObsiQuartz/" class="btn btn-secondary btn-digital">Digital Garden</a>
        </div>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/benjamin-sliu/" aria-label="LinkedIn" title="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="https://github.com/benjaminsunliu" aria-label="GitHub" title="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://www.youtube.com/@benjaminsliu/featured" aria-label="YouTube" title="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="https://www.strava.com/athletes/44787997" aria-label="Strava" title="Strava">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/></svg>
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
  color: var(--terminal-blue);
  margin-bottom: 0.5rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
}

h1 {
  font-size: 4rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(45deg, var(--terminal-green), var(--terminal-blue));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0 20px var(--terminal-green);
  position: relative;
}

h1::after {
  content: '_';
  color: var(--terminal-green);
  animation: blink 1s infinite;
  margin-left: 0.2rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0.5rem 0 1rem;
  color: var(--text-dark);
  text-shadow: 0 0 10px var(--terminal-blue);
}

.bio {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  color: var(--text-light);
  font-family: 'JetBrains Mono', monospace;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn-secondary {
  background: transparent;
  color: var(--terminal-green);
  border: 2px solid var(--terminal-green);
  position: relative;
  overflow: hidden;
}

.btn-secondary::before {
  background: linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.3), transparent);
}

.btn-secondary:hover {
  background: var(--terminal-green);
  color: var(--darker);
  box-shadow: 0 5px 15px rgba(0, 255, 65, 0.6);
}

.social-links {
  display: flex;
  gap: 1.5rem;
}

.social-links a {
  color: var(--text-light);
  transition: var(--transition);
  padding: 0.5rem;
  border-radius: var(--border-radius);
  border: 1px solid transparent;
}

.social-links a:hover {
  color: var(--terminal-green);
  transform: translateY(-3px);
  border-color: var(--terminal-green);
  box-shadow: 0 0 15px rgba(0, 255, 65, 0.5);
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
  background: var(--code-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  border: 3px solid var(--terminal-green);
  box-shadow: 
    0 0 20px rgba(0, 255, 65, 0.5),
    inset 0 0 20px rgba(0, 255, 65, 0.1);
}

.image-placeholder::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    transparent,
    var(--terminal-green),
    transparent,
    var(--terminal-blue),
    transparent
  );
  animation: rotate 4s linear infinite;
  opacity: 0.3;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.image-placeholder img {
  border-radius: 50%;
  z-index: 2;
  position: relative;
  border: 2px solid var(--code-border);
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.scroll-indicator a {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--terminal-green);
  text-decoration: none;
  transition: var(--transition);
}

.scroll-indicator a:hover {
  color: var(--terminal-blue);
  transform: translateY(-5px);
}

.scroll-indicator span {
  width: 3px;
  height: 20px;
  background: var(--terminal-green);
  margin: 2px 0;
  animation: scroll-bounce 2s infinite;
  box-shadow: 0 0 10px var(--terminal-green);
}

.scroll-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.scroll-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes scroll-bounce {
  0%, 100% { transform: scaleY(1); opacity: 1; }
  50% { transform: scaleY(1.5); opacity: 0.7; }
}

.scroll-indicator.clicked span {
  animation: none;
  transform: scaleY(0.5);
  opacity: 0.5;
}

/* Terminal-style typing effect */
.typing-effect {
  overflow: hidden;
  border-right: 2px solid var(--terminal-green);
  white-space: nowrap;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-caret {
  from, to { border-color: transparent; }
  50% { border-color: var(--terminal-green); }
}

/* Responsive design */
@media (max-width: 768px) {
  .hero-content {
    flex-direction: column-reverse;
    text-align: center;
    align-items: center;
    gap: 1.5rem;
  }
  .hero-image {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }
  .image-placeholder {
    width: 160px;
    height: 160px;
    min-width: 120px;
    min-height: 120px;
    max-width: 200px;
    max-height: 200px;
  }
  .hero-text {
    width: 100%;
    margin: 0 auto;
  }
}
.btn-digital {
  border-color: var(--terminal-blue);
  color: var(--terminal-blue);
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
  background: rgba(0, 174, 255, 0.05);
  box-shadow: 0 0 10px rgba(0, 174, 255, 0.3);
}

.btn-digital:hover {
  background: var(--terminal-blue);
  color: #000;
  box-shadow: 0 0 15px rgba(0, 174, 255, 0.6);
  transform: scale(1.05);
  transition: all 0.3s ease;
}
</style>