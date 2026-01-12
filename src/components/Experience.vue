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

const experiences = [
  {
    id: 1,
    title: 'Software Developer R&D Intern',
    company: 'Genetec Inc.',
    period: 'September 2025 - December 2025',
    location: 'Montreal, QC',
    description: [
      'AutoVu Sharp 🚗',
    ],
    skills: ['C#', 'ASP.NET',  'React', 'TypeScript', 'Azure', 'Agile Methodologies', 'Code Reviews']
  },
  {
    id: 2,
    title: 'Outreach Officer / Developer',
    company: 'Regroupement des éco-quartiers',
    period: 'Jun 2023 - Present',
    location: 'Montreal, QC',
    description: [
      'Developed and pitched a mobile application for Patrouille Verte using React Native and Azure to enhance data entry and management processes',
      'Improved data entry efficiency by more than 30%',
      'Handled Every Aspect of Development including ideation, design, frontend and backend development',
      'Presented the app to more than 40 users, ensuring successful adoption',
      'Promoted environmental awareness through the organization of events, delivering presentations, and engaging with the local community',
      'Utilized Google Suite for data entry, creating presentations, and authoring written content for social media'

    ],
    skills: ['Project Management', 'SDLC', 'Full-Stack Development', 'Mobile Development', 'JavaScript', 'React Native', 'Node.js', 'Google API']
  },
  {
    id: 2,
    title: 'Kitchen Staff',
    company: 'Warehouse Group',
    period: 'Jun 2022 - Aug 2022',
    location: 'Montreal, QC',
    description: [
      'Collaborate effectively with kitchen staff and servers to ensure efficient communication and delivery of orders',
      'Successfully handled the demands of a high-volume restaurant, efficientl serving customers during peak hours'
    ],
    skills: ['Teamwork', 'Communication', 'Problem Solving']
  },
];
</script>

<template>
  <section id="experience" ref="sectionRef" class="experience">
    <div class="section-header">
      <h2>Work Experience</h2>
      <p>My professional journey</p>
    </div>
    
    <div class="timeline">
      <div v-for="(job, index) in experiences" :key="job.id" :class="['timeline-item', index % 2 === 0 ? 'left' : 'right']">
        <div class="timeline-content">
          <div class="timeline-header">
            <h3>{{ job.title }}</h3>
            <div class="company">
              <span class="company-name">{{ job.company }}</span>
              <span class="separator">•</span>
              <span class="location">{{ job.location }}</span>
            </div>
            <span class="period">{{ job.period }}</span>
          </div>
          
          <div class="timeline-body">
            <ul>
              <li v-for="(item, i) in job.description" :key="i">{{ item }}</li>
            </ul>
            
            <div class="skills">
              <span v-for="(skill, i) in job.skills" :key="i" class="skill-tag">{{ skill }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience {
  padding: 6rem 0;
  background: transparent;
  position: relative;
  box-shadow: none;
}

.experience::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 0, 128, 0.05) 0%, transparent 50%);
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

.timeline {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  z-index: 1;
}

.timeline::after {
  content: '';
  position: absolute;
  width: 4px;
  background: linear-gradient(to bottom, var(--terminal-green), var(--terminal-blue), var(--terminal-pink));
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
  box-shadow: 0 0 10px var(--terminal-green);
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 0 40px;
  margin-bottom: 60px;
}

.timeline-item::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  right: -10px;
  background: var(--terminal-green);
  border: 4px solid var(--code-bg);
  border-radius: 50%;
  top: 15px;
  z-index: 1;
  box-shadow: 0 0 15px var(--terminal-green);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 15px var(--terminal-green); }
  50% { box-shadow: 0 0 25px var(--terminal-green), 0 0 35px var(--terminal-green); }
  100% { box-shadow: 0 0 15px var(--terminal-green); }
}

.timeline-item.left {
  left: 0;
}

.timeline-item.right {
  left: 50%;
}

.timeline-item.right::after {
  left: -10px;
}

.timeline-content {
  padding: 25px;
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: var(--border-radius);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.timeline-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--terminal-green), var(--terminal-blue));
  z-index: 2;
}

.timeline-content:hover {
  transform: translateY(-5px);
  border-color: var(--terminal-green);
  box-shadow: 0 10px 30px rgba(0, 255, 65, 0.2);
}

.timeline-header {
  margin-bottom: 1rem;
}

.timeline-header h3 {
  margin-bottom: 0.5rem;
  color: var(--terminal-green);
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.company {
  margin-bottom: 0.25rem;
}

.company-name {
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

.timeline-body ul {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.timeline-body li {
  margin-bottom: 0.5rem;
  color: var(--text);
  line-height: 1.6;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
}

.timeline-body li::before {
  content: '> ';
  color: var(--terminal-green);
  font-weight: bold;
  margin-right: 0.5rem;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  padding: 0.3rem 0.8rem;
  background: var(--lighter);
  border: 1px solid var(--code-border);
  border-radius: var(--border-radius);
  font-size: 0.8rem;
  color: var(--terminal-blue);
  font-family: 'JetBrains Mono', monospace;
  transition: var(--transition);
}

.skill-tag:hover {
  background: var(--terminal-blue);
  color: var(--darker);
  border-color: var(--terminal-blue);
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}

/* Terminal-style loading animation */
@keyframes slide-in-left {
  0% { opacity: 0; transform: translateX(-50px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes slide-in-right {
  0% { opacity: 0; transform: translateX(50px); }
  100% { opacity: 1; transform: translateX(0); }
}

.timeline-item.left .timeline-content {
  animation: slide-in-left 0.6s ease-out;
}

.timeline-item.right .timeline-content {
  animation: slide-in-right 0.6s ease-out;
}

.timeline-item:nth-child(1) .timeline-content { animation-delay: 0.1s; }
.timeline-item:nth-child(2) .timeline-content { animation-delay: 0.2s; }

/* Responsive design */
@media (max-width: 768px) {
  .experience {
    padding: 2rem 0;
    box-shadow: none;
    background: transparent !important;
  }
  
  .timeline::after {
    left: 20px;
  }
  
  .timeline-item {
    width: 100%;
    padding-left: 30px;
    padding-right: 10px;
    margin-bottom: 2rem;
  }
  
  .timeline-item.left,
  .timeline-item.right {
    left: 0;
  }
  
  .timeline-item::after {
    left: -30px;
    right: auto;
  }
  
  .timeline-content {
    box-shadow: none;
    border-width: 1px;
  }
  
  .timeline-header h3 {
    font-size: 1.1rem;
  }
  
  .skills {
    gap: 0.3rem;
  }
  
  .skill-tag {
    padding: 0.25rem 0.6rem;
    font-size: 0.75rem;
  }
}
</style> 