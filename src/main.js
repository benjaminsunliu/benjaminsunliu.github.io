import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Mobile device detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const app = createApp(App)

// Pass mobile detection to the app
app.config.globalProperties.$isMobile = isMobile;

// Add touch events handling for mobile
if (isMobile) {
  let touchStartY = 0;
  let touchEndY = 0;
  
  document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeDistance = touchEndY - touchStartY;
    // If swiped down at the top of the page, refresh
    if (swipeDistance > 100 && window.scrollY <= 0) {
      // Handle pull-to-refresh gesture
      // You could add custom functionality here
    }
  }
}

app.config.globalProperties.$scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    // Get header height to offset scroll position
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    // Get the element's position
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    
    // Calculate position with header offset
    const offsetPosition = elementPosition - headerHeight;
    
    // Add more padding for mobile devices
    const mobilePadding = isMobile ? 20 : 0;
    
    // Smooth scroll to the section
    window.scrollTo({
      top: offsetPosition - mobilePadding,
      behavior: 'smooth'
    });
  }
}

// Handle orientation changes
window.addEventListener('orientationchange', () => {
  // Wait for orientation change to complete before adjusting layout
  setTimeout(() => {
    // Update the viewport height to handle mobile browser UI
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, 300);
});

// Set initial viewport height
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

app.mount('#app')
