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

const education = [
  {
    id: 1,
    degree: 'Bachelor of Engineering in Software Engineering',
    institution: 'Concordia University',
    location: 'Montreal, QC',
    period: '2023 - 2027',
    description: 'Specialized in software architecture, design, and project-based learning. Experienced in full-stack development, mobile applications, and implementing robust software solutions',
    achievements: [
      'GPA: 3.77',
      'Activities and societies: PolyHX 2024, McGill RoboHacks 2024, CodeJam14, PolyHX 2025, McHacks 2025'
    ]
  },
  {
    id: 2,
    degree: 'DEC in Pure and Applied Sciences',
    institution: 'Collège Jean-de-Brébeuf',
    location: 'Montreal, QC',
    period: '2021 - 2023',
    description: 'Graduated from Collège Jean-de-Brébeuf in Pure and Applied Sciences, where I developed strong analytical and problem-solving skills through hands-on projects, including an award-winning autonomous Arduino firetruck.',
    achievements: [
      '1st place awarded the Prize for the Best Integration Project: Autonomous Arduino Firetruck'
    ]
  }
];

const certifications = [
  {
    id: 1,
    name: 'Level 8 Violin',
    issuer: 'The Royal Conservatory of Music',
    date: 'Mar 2019',
  },
  {
    id: 2,
    name: 'Level 8 Theory',
    issuer: 'The Royal Conservatory of Music',
    date: 'Sep 2018',

  },
];
</script>

<template>
  <section id="education" ref="sectionRef" class="education">
    <div class="section-header">
      <h2>Education</h2>
      <p>My academic background and certifications</p>
    </div>
    
    <div class="education-content">
      <div class="degrees">
        <h3 class="subsection-title">Academic History</h3>
        <div class="education-cards">
          <div v-for="item in education" :key="item.id" class="education-card">
            <div class="education-header">
              <div class="degree-info">
                <h4>{{ item.degree }}</h4>
                <div class="institution">
                  <span class="name">{{ item.institution }}</span>
                  <span class="separator">•</span>
                  <span class="location">{{ item.location }}</span>
                </div>
                <span class="period">{{ item.period }}</span>
              </div>
            </div>
            <div class="education-body">
              <p>{{ item.description }}</p>
              <div class="achievements">
                <h5>Achievements:</h5>
                <ul>
                  <li v-for="(achievement, i) in item.achievements" :key="i">{{ achievement }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="certifications">
        <h3 class="subsection-title">Certifications</h3>
        <div class="certification-grid">
          <div v-for="cert in certifications" :key="cert.id" class="certification-card">
            <div class="cert-content">
              <h4>{{ cert.name }}</h4>
              <div class="cert-details">
                <span class="issuer">{{ cert.issuer }}</span>
                <span class="date">{{ cert.date }}</span>
              </div>
              <a :href="cert.link" target="_blank" class="verify-link">
                Verify
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
            <div class="cert-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15c3 0 6-2 6-5s-3-5-6-5-6 2-6 5 3 5 6 5Z"></path><path d="M12 15v6"></path><path d="M15 18h-6"></path><path d="m3 7 1.5-2.9A2 2 0 0 1 6.26 3h11.48a2 2 0 0 1 1.76 1.1L21 7"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.education {
  padding: 6rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header p {
  color: var(--text-light);
  font-size: 1.2rem;
}

.education-content {
  max-width: 1000px;
  margin: 0 auto;
}

.subsection-title {
  margin-bottom: 2rem;
  position: relative;
  font-size: 1.8rem;
  color: var(--dark);
  padding-bottom: 0.5rem;
}

.subsection-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background-color: var(--primary);
}

.education-cards {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;
}

.education-card {
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
}

.education-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.education-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.education-header h4 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--primary);
}

.institution {
  margin-bottom: 0.25rem;
}

.name {
  font-weight: 600;
}

.separator {
  margin: 0 0.5rem;
  color: var(--text-light);
}

.location, .period {
  color: var(--text-light);
}

.period {
  font-style: italic;
  font-size: 0.9rem;
}

.education-body {
  padding: 1.5rem;
}

.education-body p {
  margin-bottom: 1.5rem;
}

.achievements h5 {
  margin-bottom: 0.75rem;
  color: var(--dark);
}

.achievements ul {
  padding-left: 1.5rem;
}

.achievements li {
  margin-bottom: 0.5rem;
}

.certification-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.certification-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.certification-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.cert-content {
  flex: 1;
}

.cert-content h4 {
  margin-bottom: 0.5rem;
  color: var(--dark);
}

.cert-details {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.issuer {
  font-weight: 500;
}

.date {
  color: var(--text-light);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.verify-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
}

.verify-link:hover {
  color: var(--accent);
}

.cert-badge {
  width: 50px;
  height: 50px;
  background-color: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .certification-card {
    flex-direction: row-reverse;
  }
  
  .education-card, .certification-card {
    width: 100%;
  }
}
</style> 