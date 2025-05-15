<script setup>
import { ref, getCurrentInstance } from 'vue';

const app = getCurrentInstance();
const props = defineProps({
  activeSection: {
    type: String,
    required: true
  }
});

const menuOpen = ref(false);
const navItemClicked = ref(null);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
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
  <header :class="{ 'scrolled': props.activeSection !== 'hero' }">
    <div class="header-content">
      <div class="logo">
        <a href="#" @click.prevent="scrollToSection('hero')">Portfolio</a>
      </div>
      
      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
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
  background-color: transparent;
  transition: var(--transition);
  padding: 1.5rem 0;
}

header.scrolled {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
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
  color: var(--dark);
  text-decoration: none;
  transition: var(--transition);
}

.logo a:hover {
  color: var(--primary);
}

nav ul {
  display: flex;
  list-style: none;
  gap: 2rem;
}

nav a {
  text-decoration: none;
  color: var(--dark);
  font-weight: 500;
  transition: var(--transition);
  position: relative;
  padding: 0.5rem 0;
}

nav a:hover, nav a.active {
  color: var(--primary);
}

nav a.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
}

.menu-toggle span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: var(--dark);
  transition: var(--transition);
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 75%;
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: var(--transition);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  }

  nav.open {
    right: 0;
  }

  nav ul {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  nav a {
    font-size: 1.25rem;
  }

  .menu-toggle.open span:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }

  .menu-toggle.open span:nth-child(2) {
    opacity: 0;
  }

  .menu-toggle.open span:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }
}

nav a.clicked {
  animation: pulse 0.5s ease;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
</style> 