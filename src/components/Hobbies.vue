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
    name: 'Photography',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="3"></circle><path d="M5 7h2a2 2 0 0 0 2-2 1 1 0 0 1 1-1h4a1 1 0 0 1 1 1 2 2 0 0 0 2 2h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2"></path></svg>`,
    description: "I'm passionate about landscape and street photography. I've been developing my skills with both digital and film cameras, focusing on composition and lighting techniques.",
    image: '/hobby2.jpg' 
  },
  {
    id: 3,
    name: 'Cooking',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v14"></path><path d="M18 8c0-2.2-1.8-4-4-4H8"></path><path d="M18 16c0 2.2-1.8 4-4 4H8"></path><path d="M2 8h6"></path><path d="M2 16h6"></path><path d="M18 8h4"></path><path d="M18 16h4"></path></svg>`,
    description: "I love experimenting with international cuisines. Recently, I've been perfecting my homemade pasta and learning the art of French pastry making.",
    image: '/hobby3.jpg' 
  },
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
            <span v-html="hobby.icon"></span>
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
  background-color: var(--light);
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header p {
  color: var(--text-light);
  font-size: 1.2rem;
}

.hobbies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 0 1rem;
}

.hobby-card {
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.hobby-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.hobby-image {
  height: 200px;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-placeholder svg {
  width: 48px;
  height: 48px;
  color: white;
}

.hobby-content {
  padding: 1.5rem;
  flex-grow: 1;
}

.hobby-content h3 {
  margin-bottom: 1rem;
  color: var(--dark);
  position: relative;
  padding-bottom: 0.5rem;
}

.hobby-content h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: var(--primary);
}

.hobby-content p {
  color: var(--text-light);
  line-height: 1.6;
}

.quote-section {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem;
}

blockquote {
  font-size: 1.3rem;
  font-style: italic;
  color: var(--dark);
  position: relative;
  padding: 2rem;
}

blockquote::before,
blockquote::after {
  content: '"';
  font-size: 4rem;
  color: var(--primary);
  opacity: 0.2;
  position: absolute;
  line-height: 1;
}

blockquote::before {
  top: 0;
  left: 0;
}

blockquote::after {
  content: '"';
  bottom: -0.5rem;
  right: 0;
}

@media (max-width: 768px) {
  .hobby-card {
    max-width: 100%;
  }
  
  blockquote {
    font-size: 1.1rem;
    padding: 1.5rem;
  }
}
</style> 