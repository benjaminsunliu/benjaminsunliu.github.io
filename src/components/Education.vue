<script setup>
import { ref, onMounted } from 'vue';
import { education, certifications } from '../data/portfolio.js';

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
  <section id="education" ref="sectionRef" class="education">
    <div class="section-title" v-reveal>
      <p class="eyebrow">03 — Background</p>
      <h2>Education</h2>
      <p>Academic foundations and certifications</p>
    </div>

    <div class="education-content">
      <h3 class="subsection-title" v-reveal>Academic History</h3>
      <div class="education-cards">
        <div
          v-for="(item, i) in education"
          :key="item.id"
          class="glass-card education-card"
          v-tilt="{ max: 5 }"
          v-reveal="{ delay: i * 80 }"
        >
          <div class="education-header">
            <h4>{{ item.degree }}</h4>
            <div class="institution">
              <span class="name">{{ item.institution }}</span>
              <span class="separator">·</span>
              <span class="location">{{ item.location }}</span>
            </div>
            <span class="period">{{ item.period }}</span>
          </div>
          <p class="desc">{{ item.description }}</p>
          <ul class="achievements">
            <li v-for="(achievement, i) in item.achievements" :key="i">{{ achievement }}</li>
          </ul>
        </div>
      </div>

      <h3 class="subsection-title" v-reveal>Certifications</h3>
      <div class="certification-grid">
        <div
          v-for="(cert, i) in certifications"
          :key="cert.id"
          class="glass-card certification-card"
          v-tilt="{ max: 8 }"
          v-reveal="{ delay: (i % 2) * 80 }"
        >
          <div class="cert-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
          </div>
          <div class="cert-content">
            <h4>{{ cert.name }}</h4>
            <div class="cert-details">
              <span class="issuer">{{ cert.issuer }}</span>
              <span class="date">{{ cert.date }}</span>
            </div>
            <a v-if="cert.link" :href="cert.link" target="_blank" class="verify-link">
              Verify
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.education-content {
  max-width: 1000px;
  margin: 4rem auto 0;
}

.subsection-title {
  font-size: 1.1rem;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.subsection-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--glass-border), transparent);
}

.education-cards {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  margin-bottom: 3.5rem;
}

.education-card { padding: 1.75rem; }

.education-header { margin-bottom: 1rem; }

.education-header h4 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--text);
}

.institution { margin-bottom: 0.35rem; }

.name {
  font-weight: 600;
  color: var(--accent-2);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.92rem;
}

.separator { margin: 0 0.5rem; color: var(--text-dim); }

.location {
  color: var(--text-muted);
  font-size: 0.88rem;
  font-family: 'JetBrains Mono', monospace;
}

.period {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: var(--accent-3);
}

.desc {
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.65;
  margin-bottom: 1.1rem;
}

.achievements {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.achievements li {
  position: relative;
  padding-left: 1.4rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.55;
}

.achievements li::before {
  content: '✦';
  position: absolute;
  left: 0;
  color: var(--accent-3);
}

.certification-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.2rem;
}

.certification-card {
  padding: 1.4rem;
  display: flex;
  align-items: center;
  gap: 1.1rem;
}

.cert-badge {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: var(--accent-3);
  background: rgba(192, 132, 252, 0.12);
  border: 1px solid rgba(192, 132, 252, 0.25);
}

.cert-content { flex: 1; }

.cert-content h4 {
  font-size: 1rem;
  margin-bottom: 0.4rem;
  color: var(--text);
}

.cert-details {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin-bottom: 0.6rem;
}

.issuer {
  color: var(--accent-2);
  font-size: 0.82rem;
  font-family: 'JetBrains Mono', monospace;
}

.date {
  color: var(--text-dim);
  font-size: 0.75rem;
  font-family: 'JetBrains Mono', monospace;
}

.verify-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--accent);
  font-size: 0.78rem;
  font-family: 'JetBrains Mono', monospace;
  text-decoration: none;
  transition: var(--transition);
}

.verify-link:hover { color: var(--accent-2); gap: 0.6rem; }

@media (max-width: 768px) {
  .education-content { margin-top: 2.5rem; }
  .education-card { padding: 1.3rem; }
  .education-header h4 { font-size: 1.1rem; }
  .certification-grid { grid-template-columns: 1fr; }
}
</style>
