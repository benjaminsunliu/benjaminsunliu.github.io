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
const title = 'Software Engineer';
const roles = ['Cyclist', 'Home Barista', 'Aquascaper', 'Violinist'];
const shortBio = 'Software engineering student crafting elegant solutions to complex problems — and chasing the same precision off the screen.';
</script>

<template>
  <section id="hero" ref="heroRef" class="hero">
    <div class="hero-content">
      <div class="hero-text">
        <p class="eyebrow greeting">Hello, I'm</p>
        <h1 class="name">{{ name }}</h1>
        <h2 class="title">{{ title }}</h2>
        <div class="roles">
          <span v-for="(role, i) in roles" :key="i" class="role-chip">{{ role }}</span>
        </div>
        <p class="bio">{{ shortBio }}</p>
        <div class="hero-actions">
          <a href="#" @click.prevent="handleScrollIndicatorClick('projects')" class="btn btn-primary">
            View My Work
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
          <a target="_blank" href="https://bensliu.ca/ObsiQuartz/" class="btn btn-ghost">Digital Garden</a>
        </div>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/benjamin-sliu/" aria-label="LinkedIn" title="LinkedIn" class="social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="https://github.com/benjaminsunliu" aria-label="GitHub" title="GitHub" class="social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://www.youtube.com/@benjaminsliu/featured" aria-label="YouTube" title="YouTube" class="social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="https://www.strava.com/athletes/44787997" aria-label="Strava" title="Strava" class="social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/></svg>
          </a>
        </div>
      </div>
      <div class="hero-image">
        <div class="avatar-frame" v-tilt="{ max: 12 }">
          <div class="avatar-glow"></div>
          <img src="../assets/linkedin.jpeg" alt="Benjamin Liu headshot" />
          <span class="avatar-badge">Montreal · QC</span>
        </div>
      </div>
    </div>
    <div class="scroll-indicator" :class="{ 'clicked': scrollIndicatorClicked }">
      <a href="#" @click.prevent="handleScrollIndicatorClick('experience')" aria-label="Scroll down">
        <span class="mouse"><span class="wheel"></span></span>
        <span class="scroll-label">scroll</span>
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
  gap: 3rem;
}

.hero-text { flex: 1; }

.greeting { margin-bottom: 1rem; }

.name {
  margin: 0;
  background: linear-gradient(120deg, #ffffff 0%, #b9c2ff 45%, #4fd1e0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.name::after {
  content: '_';
  -webkit-text-fill-color: var(--accent-2);
  color: var(--accent-2);
  animation: blink 1.1s steps(1) infinite;
  margin-left: 0.1rem;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.title {
  font-size: clamp(1.3rem, 2.5vw, 1.9rem);
  font-weight: 500;
  margin: 0.6rem 0 1.1rem;
  color: var(--text-muted);
}

.roles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.6rem;
}

.role-chip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  color: var(--accent-2);
  background: rgba(79, 209, 224, 0.08);
  border: 1px solid rgba(79, 209, 224, 0.25);
}

.bio {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 540px;
  color: var(--text-muted);
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.social-links {
  display: flex;
  gap: 0.85rem;
}

.social-link {
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  border-radius: 14px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  transition: var(--transition);
}

.social-link:hover {
  color: var(--text);
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 10px 24px rgba(124, 140, 255, 0.3);
}

/* Avatar */
.hero-image {
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-frame {
  position: relative;
  width: 320px;
  height: 380px;
  border-radius: 28px;
  overflow: hidden;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border-strong);
  box-shadow: var(--glass-shadow);
  transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s;
}

.avatar-glow {
  position: absolute;
  inset: -40%;
  background: conic-gradient(from 0deg, transparent, var(--accent), transparent, var(--accent-2), transparent);
  animation: spin 6s linear infinite;
  opacity: 0.5;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.avatar-frame img {
  position: absolute;
  inset: 6px;
  width: calc(100% - 12px);
  height: calc(100% - 12px);
  object-fit: cover;
  border-radius: 22px;
  z-index: 2;
}

.avatar-badge {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  color: var(--text);
  background: rgba(7, 10, 23, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  white-space: nowrap;
}

/* Scroll indicator */
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
  gap: 0.6rem;
  text-decoration: none;
  color: var(--text-dim);
  transition: var(--transition);
}

.scroll-indicator a:hover { color: var(--accent-2); }

.mouse {
  width: 24px;
  height: 38px;
  border: 2px solid currentColor;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.wheel {
  width: 3px;
  height: 7px;
  border-radius: 2px;
  background: currentColor;
  animation: wheel 1.6s ease-in-out infinite;
}

@keyframes wheel {
  0% { opacity: 0; transform: translateY(-4px); }
  40% { opacity: 1; }
  100% { opacity: 0; transform: translateY(8px); }
}

.scroll-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
}

.scroll-indicator.clicked .wheel { animation: none; }

@media (max-width: 900px) {
  .scroll-indicator { display: none; }
  .hero-content {
    flex-direction: column-reverse;
    text-align: center;
    gap: 2rem;
  }
  .roles, .hero-actions, .social-links { justify-content: center; }
  .bio { margin-left: auto; margin-right: auto; }
  .avatar-frame {
    width: 240px;
    height: 290px;
  }
}

@media (max-width: 768px) {
  .avatar-frame { width: 210px; height: 250px; }
  .bio { font-size: 1rem; }
}
</style>
