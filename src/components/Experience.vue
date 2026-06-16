<script setup>
import { ref, onMounted } from 'vue';
import { experiences } from '../data/portfolio.js';

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

</script>

<template>
  <section id="experience" ref="sectionRef" class="experience">
    <div class="section-title" v-reveal>
      <p class="eyebrow">01 — Career</p>
      <h2>Work Experience</h2>
      <p>The roles that shaped how I build</p>
    </div>

    <div class="timeline">
      <div
        v-for="(job, index) in experiences"
        :key="job.id"
        class="timeline-item"
        v-reveal="{ delay: index * 80 }"
      >
        <div class="timeline-node"></div>
        <div class="glass-card timeline-content" v-tilt="{ max: 5 }">
          <div class="timeline-header">
            <h3>{{ job.title }}</h3>
            <div class="company">
              <span class="company-name">{{ job.company }}</span>
              <span class="separator">·</span>
              <span class="location">{{ job.location }}</span>
            </div>
            <span class="period">{{ job.period }}</span>
          </div>

          <ul>
            <li v-for="(item, i) in job.description" :key="i">{{ item }}</li>
          </ul>

          <div class="skills">
            <span v-for="(skill, i) in job.skills" :key="i" class="tag">{{ skill }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  position: relative;
  max-width: 820px;
  margin: 4rem auto 0;
  padding-left: 2.5rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent), var(--accent-2), transparent);
}

.timeline-item {
  position: relative;
  margin-bottom: 2.5rem;
}

.timeline-node {
  position: absolute;
  left: calc(-2.5rem + 1px);
  top: 1.6rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bg-0);
  border: 3px solid var(--accent);
  box-shadow: 0 0 0 4px rgba(124, 140, 255, 0.12), 0 0 16px rgba(124, 140, 255, 0.5);
  z-index: 2;
}

.timeline-content {
  padding: 1.75rem;
}

.timeline-header { margin-bottom: 1.1rem; }

.timeline-header h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--text);
}

.company { margin-bottom: 0.35rem; }

.company-name {
  font-weight: 600;
  color: var(--accent-2);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.95rem;
}

.separator { margin: 0 0.5rem; color: var(--text-dim); }

.location {
  color: var(--text-muted);
  font-size: 0.88rem;
  font-family: 'JetBrains Mono', monospace;
}

.period {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: var(--accent-3);
  letter-spacing: 0.04em;
}

.timeline-content ul {
  margin-bottom: 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.timeline-content li {
  position: relative;
  padding-left: 1.4rem;
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 0.92rem;
}

.timeline-content li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--accent-2);
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .timeline {
    padding-left: 1.8rem;
    margin-top: 2.5rem;
  }
  .timeline-node { left: calc(-1.8rem + 2px); width: 13px; height: 13px; }
  .timeline-content { padding: 1.25rem; }
  .timeline-header h3 { font-size: 1.1rem; }
}
</style>
