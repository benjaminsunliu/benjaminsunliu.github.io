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
    company: 'Le Warehouse',
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
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header p {
  color: var(--text-light);
  font-size: 1.2rem;
}

.timeline {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}

.timeline::after {
  content: '';
  position: absolute;
  width: 4px;
  background-color: var(--primary);
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
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
  background-color: var(--light);
  border: 4px solid var(--primary);
  border-radius: 50%;
  top: 15px;
  z-index: 1;
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
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.timeline-header {
  margin-bottom: 1rem;
}

.timeline-header h3 {
  margin-bottom: 0.5rem;
  color: var(--primary);
}

.company {
  margin-bottom: 0.25rem;
}

.company-name {
  font-weight: 600;
}

.separator {
  margin: 0 0.5rem;
  color: var(--text-light);
}

.location, .period {
  color: var(--text-light);
  font-size: 0.9rem;
}

.period {
  font-style: italic;
}

.timeline-body ul {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.timeline-body li {
  margin-bottom: 0.75rem;
}

.timeline-body li:last-child {
  margin-bottom: 0;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  padding: 0.3rem 0.8rem;
  background-color: var(--light);
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text);
}

@media (max-width: 768px) {
  .timeline::after {
    left: 31px;
  }
  
  .timeline-item {
    width: 100%;
    padding-left: 70px;
    padding-right: 15px;
  }
  
  .timeline-item.right {
    left: 0;
  }
  
  .timeline-item::after {
    left: 21px;
    right: auto;
  }
}
</style> 