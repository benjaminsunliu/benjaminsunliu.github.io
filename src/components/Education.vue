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
      'Dean\'s List: 2024, 2025',
      'Activities and societies: ECA Concordia, Space Concordia, PolyHX 2024, McGill RoboHacks 2024, CodeJam14, PolyHX 2025, McHacks 2025'
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
    name: 'Artificial Intelligence Foundations: Machine Learning',
    issuer: 'LinkedIn Learning',
    date: 'May 2025',
    link: 'https://www.linkedin.com/learning/certificates/27ed15713a67a025c2357f2421c52dbe73d7bd78784df5e891dc748af08fd1f4?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BE2qMBokdQhS0eJ%2F5Q18NOQ%3D%3D',
  },
  {
    id: 2,
    name: 'DevOps Foundations',
    issuer: 'LinkedIn Learning',
    date: 'May 2025',
    link: 'https://www.linkedin.com/learning/certificates/73a15c569713727d00f2dd3ed435e1ad5373d5564b3dd94d7154bbb1eb8628ae?trk=share_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BE2qMBokdQhS0eJ%2F5Q18NOQ%3D%3D'
  },
  {
    id: 3,
    name: 'Level 8 Violin',
    issuer: 'The Royal Conservatory of Music',
    date: 'Mar 2019',
  },
  {
    id: 4,
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
  background: transparent;
  position: relative;
  box-shadow: none;
}

.education::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 60% 40%, rgba(0, 255, 65, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(0, 212, 255, 0.05) 0%, transparent 50%);
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

.education-content {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.subsection-title {
  margin-bottom: 2rem;
  position: relative;
  font-size: 1.8rem;
  color: var(--text-dark);
  padding-bottom: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.subsection-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--terminal-green), var(--terminal-blue));
  box-shadow: 0 0 10px var(--terminal-green);
}

.education-cards {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;
}

.education-card {
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition);
  position: relative;
}

.education-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--terminal-green), var(--terminal-blue), var(--terminal-pink));
  z-index: 2;
}

.education-card:hover {
  transform: translateY(-5px);
  border-color: var(--terminal-green);
  box-shadow: 0 10px 30px rgba(0, 255, 65, 0.2);
}

.education-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--code-border);
}

.education-header h4 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--terminal-green);
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.institution {
  margin-bottom: 0.25rem;
}

.name {
  font-weight: 600;
  color: var(--text-dark);
}

.separator {
  margin: 0 0.5rem;
  color: var(--terminal-blue);
}

.location, .period {
  color: var(--text-light);
  font-size: 0.9rem;
  font-family: 'JetBrains Mono', monospace;
}

.period {
  font-style: italic;
  color: var(--terminal-pink);
}

.education-body {
  padding: 1.5rem;
}

.education-body p {
  color: var(--text);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
}

.achievements h5 {
  color: var(--terminal-blue);
  margin-bottom: 1rem;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
}

.achievements ul {
  padding-left: 1.5rem;
}

.achievements li {
  color: var(--text);
  margin-bottom: 0.5rem;
  line-height: 1.6;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
}

.achievements li::before {
  content: '> ';
  color: var(--terminal-green);
  font-weight: bold;
  margin-right: 0.5rem;
}

.certification-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.certification-card {
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.certification-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--terminal-pink), var(--terminal-yellow));
  z-index: 2;
}

.certification-card:hover {
  transform: translateY(-3px);
  border-color: var(--terminal-pink);
  box-shadow: 0 8px 25px rgba(255, 0, 128, 0.2);
}

.cert-content {
  flex: 1;
}

.cert-content h4 {
  color: var(--text-dark);
  margin-bottom: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
}

.cert-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.issuer {
  color: var(--terminal-blue);
  font-size: 0.9rem;
  font-family: 'JetBrains Mono', monospace;
}

.date {
  color: var(--text-light);
  font-size: 0.8rem;
  font-family: 'JetBrains Mono', monospace;
}

.verify-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--terminal-green);
  text-decoration: none;
  font-size: 0.8rem;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: var(--transition);
}

.verify-link:hover {
  color: var(--terminal-blue);
  text-shadow: 0 0 5px var(--terminal-blue);
}

.cert-badge {
  color: var(--terminal-pink);
  padding: 1rem;
  background: rgba(255, 0, 128, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.certification-card:hover .cert-badge {
  background: rgba(255, 0, 128, 0.2);
  box-shadow: 0 0 15px rgba(255, 0, 128, 0.3);
}

/* Terminal-style loading animation */
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.education-card {
  animation: fade-in-up 0.6s ease-out;
}

.education-card:nth-child(1) { animation-delay: 0.1s; }
.education-card:nth-child(2) { animation-delay: 0.2s; }

.certification-card {
  animation: fade-in-up 0.6s ease-out;
}

.certification-card:nth-child(1) { animation-delay: 0.3s; }
.certification-card:nth-child(2) { animation-delay: 0.4s; }

/* Responsive design */
@media (max-width: 768px) {
  .education {
    padding: 2rem 0;
    box-shadow: none;
  }
  .education-cards {
    gap: 1.2rem;
  }
  .education-card, .certification-card {
    box-shadow: none;
    border-width: 1px;
  }
  .certification-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .subsection-title {
    font-size: 1.5rem;
  }
  
  .education-header,
  .education-body {
    padding: 1rem;
  }
  
  .education-header h4 {
    font-size: 1.1rem;
  }
  
  .certification-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .certification-card {
    padding: 1rem;
  }
  
  .cert-content h4 {
    font-size: 1rem;
  }
}

.education {
  background: transparent !important;
}
</style> 