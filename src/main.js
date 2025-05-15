import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

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
    
    // Smooth scroll to the section
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

app.mount('#app')
