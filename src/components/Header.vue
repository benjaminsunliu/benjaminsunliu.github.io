<script setup>
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue';

const app = getCurrentInstance();
const props = defineProps({
  activeSection: {
    type: String,
    required: true
  }
});

const menuOpen = ref(false);
const navItemClicked = ref(null);
const isMobile = ref(false);
const lastScrollY = ref(0);
const isHeaderHidden = ref(false);

onMounted(() => {
  updateMobileState();
  window.addEventListener('resize', updateMobileState);
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateMobileState);
  window.removeEventListener('scroll', handleScroll);
});

const updateMobileState = () => {
  isMobile.value = window.innerWidth <= 768;
};

const handleScroll = () => {
  if (!isMobile.value) return;
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
    isHeaderHidden.value = true;
  } else {
    isHeaderHidden.value = false;
  }
  lastScrollY.value = currentScrollY;
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  document.body.style.overflow = menuOpen.value ? 'hidden' : '';
};

const closeMenu = () => {
  menuOpen.value = false;
  document.body.style.overflow = '';
};

const scrollToSection = (sectionId) => {
  navItemClicked.value = sectionId;
  setTimeout(() => {
    navItemClicked.value = null;
  }, 500);
  app.appContext.config.globalProperties.$scrollToSection(sectionId);
  closeMenu();
};

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'hobbies', label: 'Hobbies' },
];
</script>

<template>
  <header
    :class="{
      'scrolled': props.activeSection !== 'hero',
      'menu-open': menuOpen,
      'header-hidden': isHeaderHidden && !menuOpen
    }"
  >
    <div class="header-content">
      <div class="logo">
        <a href="#" @click.prevent="scrollToSection('hero')">
          <span class="logo-mark">BL</span>
          <span class="logo-wordmark">
            <span class="logo-text">Benjamin Liu</span>
            <span class="logo-domain">bensliu.ca</span>
          </span>
        </a>
      </div>

      <button
        class="menu-toggle"
        :class="{ 'open': menuOpen }"
        @click="toggleMenu"
        aria-label="Toggle menu"
        aria-expanded="menuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav :class="{ 'open': menuOpen }">
        <ul>
          <li v-for="item in navItems" :key="item.id">
            <a
              href="#"
              @click.prevent="scrollToSection(item.id)"
              :class="{
                'active': props.activeSection === item.id,
                'clicked': navItemClicked === item.id
              }"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

      <div
        class="mobile-menu-overlay"
        v-if="isMobile"
        :class="{ 'visible': menuOpen }"
        @click="closeMenu"
      ></div>
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), padding 0.3s ease;
  padding: calc(1.2rem + env(safe-area-inset-top)) 0 1.2rem;
}

header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(7, 10, 23, 0);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  border-bottom: 1px solid transparent;
  transition: var(--transition);
}

header.scrolled::before {
  background: rgba(7, 10, 23, 0.55);
  backdrop-filter: blur(16px) saturate(150%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);
  border-bottom: 1px solid var(--glass-border);
}

header.scrolled { padding: calc(0.7rem + env(safe-area-inset-top)) 0 0.7rem; }

header.header-hidden { transform: translateY(-110%); }

.header-content {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.logo a {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  text-decoration: none;
}

.logo-mark {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #07101f;
  background: var(--grad-primary);
  box-shadow: 0 6px 18px rgba(79, 209, 224, 0.3);
  transition: var(--transition);
}

.logo a:hover .logo-mark { transform: rotate(-8deg) scale(1.05); }

.logo-wordmark {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.logo-text {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text);
  letter-spacing: -0.01em;
}

.logo-domain {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.06em;
  color: var(--text-dim);
}

nav ul {
  display: flex;
  list-style: none;
  gap: 0.4rem;
}

nav a {
  position: relative;
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 500;
  font-size: 0.92rem;
  padding: 0.5rem 0.95rem;
  border-radius: 999px;
  transition: var(--transition);
}

nav a:hover { color: var(--text); }

nav a.active {
  color: var(--text);
  background: var(--glass-bg-strong);
  border: 1px solid var(--glass-border);
}

nav a.active::before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 2px;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent-2);
  box-shadow: 0 0 8px var(--accent-2);
}

nav a.clicked { animation: nav-click 0.3s ease; }

@keyframes nav-click {
  0% { transform: scale(1); }
  50% { transform: scale(0.94); }
  100% { transform: scale(1); }
}

.menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  gap: 5px;
  position: relative;
  z-index: 1001;
}

.menu-toggle span {
  width: 25px;
  height: 2px;
  background: var(--text);
  transition: var(--transition);
  border-radius: 2px;
}

.menu-toggle.open span:nth-child(1) { transform: rotate(45deg) translate(6px, 6px); }
.menu-toggle.open span:nth-child(2) { opacity: 0; }
.menu-toggle.open span:nth-child(3) { transform: rotate(-45deg) translate(7px, -7px); }

.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  height: 100vh;
  background: rgba(4, 6, 15, 0.6);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition);
}

.mobile-menu-overlay.visible {
  opacity: 1;
  visibility: visible;
}

@media (max-width: 768px) {
  header {
    padding: 0.5rem 0;
    height: var(--mobile-header-height);
    display: flex;
    align-items: center;
  }
  .header-content {
    padding: 0 1rem;
    width: 100%;
  }
  .logo-mark { width: 32px; height: 32px; font-size: 0.85rem; }
  .logo-text { font-size: 0.95rem; }
  .logo-domain { font-size: 0.58rem; }
  .menu-toggle {
    display: flex !important;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
  }
  nav {
    display: none;
    position: fixed;
    top: var(--mobile-header-height);
    left: 0;
    width: 100vw;
    height: calc(100vh - var(--mobile-header-height));
    background: rgba(7, 10, 23, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    flex-direction: column;
    align-items: center;
    padding-top: 2.5rem;
    z-index: 1000;
  }
  nav.open { display: flex; }
  nav ul {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    align-items: center;
  }
  nav a {
    font-size: 1.25rem;
    padding: 1rem 2rem;
  }
}
</style>
