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

// Check if mobile
onMounted(() => {
  updateMobileState();
  window.addEventListener('resize', updateMobileState);
  
  // Handle header hiding on scroll down (mobile only)
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
  
  // Only hide header when scrolling down and past 100px from top
  if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
    isHeaderHidden.value = true;
  } else {
    isHeaderHidden.value = false;
  }
  
  lastScrollY.value = currentScrollY;
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  
  // Prevent body scrolling when menu is open
  if (menuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
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
        <a href="#" @click.prevent="scrollToSection('hero')">Portfolio</a>
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
      
      <!-- Mobile overlay for menu background -->
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
  background-color: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(10px);
  transition: var(--transition);
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--code-border);
}

header.scrolled {
  background-color: rgba(0, 0, 0, 0.95);
  box-shadow: 0 5px 20px rgba(0, 255, 65, 0.2);
  padding: 1rem 0;
  border-bottom: 2px solid var(--terminal-green);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.logo a {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--terminal-green);
  text-decoration: none;
  transition: var(--transition);
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
}

.logo a::before {
  content: '> ';
  color: var(--terminal-blue);
  margin-right: 0.5rem;
}

.logo a:hover {
  color: var(--terminal-blue);
  text-shadow: 0 0 10px var(--terminal-green);
}

nav ul {
  display: flex;
  list-style: none;
  gap: 2rem;
}

nav a {
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  transition: var(--transition);
  position: relative;
  padding: 0.5rem 0;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
}

nav a:hover, nav a.active {
  color: var(--terminal-green);
  text-shadow: 0 0 5px var(--terminal-green);
}

nav a.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--terminal-green), var(--terminal-blue));
  box-shadow: 0 0 10px var(--terminal-green);
}

nav a.clicked {
  animation: nav-click 0.3s ease;
}

@keyframes nav-click {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

.menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  gap: 4px;
  position: relative;
  z-index: 1001;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background: var(--terminal-green);
  transition: var(--transition);
  border-radius: 2px;
  box-shadow: 0 0 5px var(--terminal-green);
}

.menu-toggle.open span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.menu-toggle.open span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.open span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
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
    min-height: unset;
    display: flex;
    align-items: center;
  }
  .header-content {
    padding: 0 0.5rem;
    min-height: unset;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .logo a {
    font-size: 1.25rem;
    font-weight: 700;
    padding: 0.2rem 0;
    display: flex;
    align-items: center;
  }
  .menu-toggle {
    display: flex !important;
    width: 32px;
    height: 32px;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    padding: 0.2rem;
  }
  .menu-toggle span {
    width: 24px;
    height: 3px;
  }
  nav {
    display: none;
    position: fixed;
    top: var(--mobile-header-height);
    left: 0;
    width: 100vw;
    height: calc(100vh - var(--mobile-header-height));
    background: var(--code-bg);
    border-top: 1px solid var(--terminal-green);
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 2rem;
    z-index: 1000;
    transition: left 0.3s;
  }
  nav.open {
    display: flex;
  }
  nav ul {
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    align-items: center;
    padding: 0;
  }
  nav a {
    font-size: 1.2rem;
    font-weight: 600;
    padding: 1rem 0;
    width: 100vw;
    text-align: center;
    border-bottom: 1px solid var(--code-border);
    display: block;
  }
}

/* Terminal-style cursor for active nav items */
nav a.active::before {
  content: '> ';
  color: var(--terminal-blue);
  margin-right: 0.5rem;
  animation: blink 1s infinite;
}

/* Glitch effect on hover */
nav a:hover {
  animation: glitch 0.2s ease-in-out;
}

@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-1px, 1px); }
  40% { transform: translate(-1px, -1px); }
  60% { transform: translate(1px, 1px); }
  80% { transform: translate(1px, -1px); }
  100% { transform: translate(0); }
}
</style> 