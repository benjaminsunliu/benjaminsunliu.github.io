<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['visible']);
const sectionRef = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        emit('visible');
      }
    },
    { threshold: 0.2 }
  );
  
  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});


const hobbies = [
  {
    id: 1,
    name: 'Cycling',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 4 8 6-3-2 10H4L2 8l6 3 4-8z"/><path d="M12 3v9"/></svg>`,
    description: 'I love the thrill of cycling, whether it\'s navigating city streets, exploring scenic trails, or pushing my limits on challenging routes. My longest ride was a 152 km route along the lakeshore, taking in the fresh air and beautiful views.',
    image: '/hobby1.jpg' 
  },
  {
    id: 2,
    name: 'Home Barista',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="3"></circle><path d="M5 7h2a2 2 0 0 0 2-2 1 1 0 0 1 1-1h4a1 1 0 0 1 1 1 2 2 0 0 0 2 2h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2"></path></svg>`,
    description: "I'm passionate about coffee and the craft of espresso. I enjoy dialing in shots, experimenting with different beans and grind settings, and practicing latte art. Tuning flavor and texture has become a daily ritual, combining precision with creativity.",
    image: '/hobby2.jpg' 
  },
  {
    id: 3,
    name: 'Aquarium Keeping',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v14"></path><path d="M18 8c0-2.2-1.8-4-4-4H8"></path><path d="M18 16c0 2.2-1.8 4-4 4H8"></path><path d="M2 8h6"></path><path d="M2 16h6"></path><path d="M18 8h4"></path><path d="M18 16h4"></path></svg>`,
    description: "I'm fascinated by aquascaping and freshwater aquarium care. I enjoy maintaining a planted tank, experimenting with CO₂ injection, and optimizing water parameters to support healthy fish and plant life.",
    image: '/hobby3.jpg' 
  },
  {
    id: 4,
    name: 'Music',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="3"></circle><path d="M5 7h2a2 2 0 0 0 2-2 1 1 0 0 1 1-1h4a1 1 0 0 1 1 1 2 2 0 0 0 2 2h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2"></path></svg>`,
    description: "Music is both a creative outlet and a way for me to recharge. I have played piano and violin since childhood, exploring styles ranging from classical to jazz through repertoire study, improvisation, and ensemble performance. I have performed in numerous concerts and recitals, including with the Mount Royal Youth Orchestra, under the guidance of instructors from the McGill Conservatory and the Royal Conservatory of Music. I have completed Level 8 Theory and the Level 8 Violin examination from the Royal Conservatory of Music.",
    image: '/music.png'
  }
];


function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 80%)`;
}
</script>

<template>
  <section id="hobbies" ref="sectionRef" class="hobbies">
    <div class="section-header">
      <h2>Hobbies & Interests</h2>
      <p>When I'm not coding, you'll find me...</p>
    </div>
    
    <div class="hobbies-grid">
      <div v-for="hobby in hobbies" :key="hobby.id" class="hobby-card">
        <div class="hobby-image">
          <div class="image-placeholder" :style="{ backgroundColor: getRandomColor() }">
            <!--<span v-html="hobby.icon"></span>-->
            <img :src="hobby.image" alt="hobby" width="350">
          </div>
        </div>
        <div class="hobby-content">
          <h3>{{ hobby.name }}</h3>
          <p>{{ hobby.description }}</p>
        </div>
      </div>
    </div>
    
    <div class="quote-section">
      <blockquote>
        <p>"A well-balanced life includes both professional growth and personal passions. My hobbies keep me creative, energized, and bring new perspectives to my work."</p>
      </blockquote>
    </div>
  </section>
</template>

<style scoped>
.hobbies {
  padding: 6rem 0;
  background: transparent;
  position: relative;
  box-shadow: none;
}

.hobbies::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 70% 20%, rgba(255, 0, 128, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 30% 80%, rgba(0, 255, 65, 0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

.section-header p {
  color: var(--text-light);
  font-size: 1.2rem;
  font-family: 'JetBrains Mono', monospace;
}

.hobbies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}

.hobby-card {
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.hobby-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--terminal-pink), var(--terminal-yellow), var(--terminal-green));
  z-index: 2;
}

.hobby-card:hover {
  transform: translateY(-5px);
  border-color: var(--terminal-pink);
  box-shadow: 0 10px 30px rgba(255, 0, 128, 0.2);
}

.hobby-image {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, var(--terminal-pink), var(--terminal-blue));
  position: relative;
}

.image-placeholder::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.image-placeholder svg {
  width: 48px;
  height: 48px;
  color: var(--darker);
  z-index: 2;
  position: relative;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
}

.hobby-content {
  padding: 1.5rem;
  flex-grow: 1;
}

.hobby-content h3 {
  margin-bottom: 1rem;
  color: var(--text-dark);
  position: relative;
  padding-bottom: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hobby-content h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, var(--terminal-pink), var(--terminal-blue));
  box-shadow: 0 0 5px var(--terminal-pink);
}

.hobby-content p {
  color: var(--text);
  line-height: 1.6;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
}

.quote-section {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

blockquote {
  font-size: 1.3rem;
  font-style: italic;
  color: var(--text-dark);
  position: relative;
  padding: 2rem;
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: var(--border-radius);
  font-family: 'JetBrains Mono', monospace;
  line-height: 1.6;
}

blockquote::before {
  content: '> ';
  color: var(--terminal-green);
  font-weight: bold;
  margin-right: 0.5rem;
  font-style: normal;
}

blockquote::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--terminal-green), var(--terminal-blue));
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}

/* Terminal-style loading animation */
@keyframes slide-in-up {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}

.hobby-card {
  animation: slide-in-up 0.6s ease-out;
}

.hobby-card:nth-child(1) { animation-delay: 0.1s; }
.hobby-card:nth-child(2) { animation-delay: 0.2s; }
.hobby-card:nth-child(3) { animation-delay: 0.3s; }

.quote-section {
  animation: slide-in-up 0.6s ease-out;
  animation-delay: 0.4s;
}

/* Responsive design */
@media (max-width: 768px) {
  .hobbies {
    padding: 2rem 0;
    box-shadow: none;
  }
  
  .hobbies-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
  
  .hobby-content {
    padding: 1rem;
  }
  
  .hobby-content h3 {
    font-size: 1.1rem;
  }
  
  blockquote {
    font-size: 1.1rem;
    padding: 1.5rem;
  }
  .hobby-card {
    box-shadow: none;
    border-width: 1px;
  }
}

.hobbies {
  background: transparent !important;
}
</style> 