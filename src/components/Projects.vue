<script setup>
import { ref, onMounted, computed } from 'vue';
import { projects, projectCategories as categories } from '../data/portfolio.js';

const emit = defineEmits(['visible']);
const sectionRef = ref(null);
const activeFilter = ref('all');

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

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects;
  return projects.filter(project => project.category === activeFilter.value);
});

function setFilter(category) {
  activeFilter.value = category;
}
</script>

<template>
  <section id="projects" ref="sectionRef" class="projects">
    <div class="section-title" v-reveal>
      <p class="eyebrow">02 — Selected Work</p>
      <h2>Projects</h2>
      <p>Things I've designed, built, and shipped</p>
    </div>

    <div class="project-filters" v-reveal>
      <button
        v-for="category in categories"
        :key="category.id"
        @click="setFilter(category.id)"
        :class="['filter-btn', { active: activeFilter === category.id }]"
      >
        {{ category.label }}
      </button>
    </div>

    <div class="project-grid">
      <div
        v-for="(project, i) in filteredProjects"
        :key="project.id"
        class="glass-card project-card"
        :class="{ featured: project.featured }"
        v-tilt="{ max: 6 }"
        v-reveal="{ delay: (i % 3) * 80 }"
      >
        <span v-if="project.featured" class="featured-badge">★ Featured</span>
        <div v-if="project.winner" class="winner-ribbon"><span>{{ project.winner }}</span></div>
        <div class="project-image">
          <img :src="project.image" :alt="project.title" loading="lazy" />
          <div class="project-overlay"></div>
          <div class="project-links">
            <a :href="project.demoLink" target="_blank" class="project-link" title="Live Demo" aria-label="Live demo">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
            <a :href="project.codeLink" target="_blank" class="project-link" title="Source Code" aria-label="Source code">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          </div>
        </div>
        <div class="project-content">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="project-tech">
            <span v-for="(tech, index) in project.technologies" :key="index" class="tag">{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-filters {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin: 2.5rem 0 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: var(--text-muted);
  transition: var(--transition);
}

.filter-btn:hover {
  color: var(--text);
  border-color: var(--accent);
}

.filter-btn.active {
  color: #07101f;
  background: var(--grad-primary);
  border-color: transparent;
  box-shadow: 0 6px 18px rgba(79, 209, 224, 0.3);
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 1.6rem;
}

.project-card {
  display: flex;
  flex-direction: column;
}

.project-card.featured {
  border-color: rgba(192, 132, 252, 0.35);
}

.featured-badge {
  position: absolute;
  top: 0.9rem;
  left: 0.9rem;
  z-index: 4;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  color: var(--text);
  background: rgba(192, 132, 252, 0.2);
  border: 1px solid rgba(192, 132, 252, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.winner-ribbon {
  position: absolute;
  top: 0;
  left: 0;
  width: 110px;
  height: 110px;
  overflow: hidden;
  z-index: 5;
  pointer-events: none;
}

.winner-ribbon span {
  position: absolute;
  top: 26px;
  left: -34px;
  width: 150px;
  transform: rotate(-45deg);
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #2b1d00;
  padding: 0.32rem 0;
  background: linear-gradient(135deg, #ffd76a, #e0a32e);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.35);
}

.winner-ribbon span::before,
.winner-ribbon span::after {
  content: '';
  position: absolute;
  bottom: -5px;
  border-top: 5px solid #a6741b;
}

.winner-ribbon span::before {
  left: 8px;
  border-left: 5px solid transparent;
}

.winner-ribbon span::after {
  right: 8px;
  border-right: 5px solid transparent;
}

.project-image {
  position: relative;
  overflow: hidden;
  height: 190px;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(7, 10, 23, 0.85), transparent 60%);
}

.project-card:hover .project-image img { transform: scale(1.07); }

.project-links {
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transform: translateY(-6px);
  transition: var(--transition);
  z-index: 3;
}

.project-card:hover .project-links {
  opacity: 1;
  transform: translateY(0);
}

.project-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: rgba(7, 10, 23, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  color: var(--text);
  transition: var(--transition);
}

.project-link:hover {
  background: var(--grad-primary);
  color: #07101f;
  transform: scale(1.08);
}

.project-content {
  padding: 1.4rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-content h3 {
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
}

.project-content p {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.2rem;
  flex: 1;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

@media (max-width: 768px) {
  .project-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
  .project-content { padding: 1.2rem; }
}
</style>
