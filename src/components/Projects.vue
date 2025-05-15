<script setup>
import { ref, onMounted, computed } from 'vue';

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

const projects = [
  {
    id: 1,
    title: 'Patrouille Verte Mobile App',
    description: 'A React Native mobile app developed for Patrouille Verte to streamline data entry and management using Azure and Google Sheets API',
    image: '/patrouille.png', 
    technologies: ['React Native', 'Node.js', 'Azure', 'Google API'],
    category: 'mobile',
    demoLink: 'https://www.youtube.com/watch?v=x52XStoTfi8',
    codeLink: 'https://github.com/benjaminsunliu/PatrouilleVerte',
    featured: false
  },
  {
    id: 2,
    title: 'Autonomous Arduino Firetruck',
    description: 'An Arduino-powered autonomous firetruck that detects and navigates towards flames, integrating circuit design, mechanical assembly, and algorithm development.',
    image: '/firetruck.jpg',
    technologies: ['Arduino', 'Algorithm', 'Mechanical Design', 'Assembly and Fabrication', 'Circuits', 'Sensors'],
    category: 'robotics',
    demoLink: 'https://www.youtube.com/watch?v=l2Vn9u5bldI&ab_channel=BenjaminLiu',
    codeLink: 'https://github.com/benjaminsunliu/firetruck',
    featured: false
  },
  {
    id: 3,
    title: 'Peer Assessment Platform',
    description: 'A platform for students to provide structured feedback on individual and group contributions in collaborative projects, fostering accountability and self-reflection.',
    image: '/ratemychillmates.png',
    technologies: ['Agile Methodologies', 'Unit Testing', 'CI/CD', 'Code Review', 'React', 'Node.JS', 'MongoDB'],
    category: 'web',
    demoLink: '/SOEN 341 Presentation .pdf',
    codeLink: 'https://github.com/benjaminsunliu/Group6-SOEN341_Project_F24',
    featured: false
  },
  {
    id: 4,
    title: 'Art Advisory Institution System',
    description: 'A platform designed to facilitate consulting services for art advisory institutions, enabling experts to manage availability, clients to request consultations, and administrators to oversee auctions, viewings, and service requests efficiently.',
    image: '/art.png',
    technologies: ['Java', 'SQL', 'Design Patterns', 'Software Architecture', 'H2 Relational Database', 'Software Requirements', 'JPA', 'Hibernate ORM', 'Maven'],
    category: 'ood',
    demoLink: 'https://youtu.be/xoJy-J2NHyk?si=KeWBjbWkDpivaven',
    codeLink: 'https://github.com/benjaminsunliu/chillmates-soen-342',
    featured: false
  },
  {
    id: 5,
    title: 'TerraQuest',
    description: 'An interactive learning game that challenges players to make strategic environmental decisions in scenarios like sustainable mining, ocean conservation, and space resource management, with AI-driven outcomes and immersive 3D animations.',
    image: '/terraquest.png',
    technologies: ['React', 'Three.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'OpenAI API'],
    category: 'ai',
    demoLink: 'https://devpost.com/software/terraquest',
    codeLink: 'https://github.com/benjaminsunliu/TerraQuest',
    featured: false
  },
  {
    id: 5,
    title: 'CodePaws',
    description: ' A pet adoption platform where users can create accounts, list pets for adoption, and browse available pets, with secure login, user session management, and pet listing functionality.',
    image: '/codepaws.png',
    technologies: ['HTML/CSS', 'Javascript', 'Cookies', 'Node.js'],
    category: 'web',
    demoLink: 'https://codepaws.onrender.com/',
    codeLink: 'https://github.com/benjaminsunliu/CodePaws',
    featured: false
  }
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Development' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'robotics', label: 'Robotics'},
  { id: 'ood', label: 'OOD'}
];

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects;
  }
  return projects.filter(project => project.category === activeFilter.value);
});

function setFilter(category) {
  activeFilter.value = category;
}
</script>

<template>
  <section id="projects" ref="sectionRef" class="projects">
    <div class="section-header">
      <h2>My Projects</h2>
      <p>Showcasing my technical expertise and problem-solving skills</p>
    </div>
    
    <div class="project-filters">
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
      <div v-for="project in filteredProjects" :key="project.id" class="project-card" :class="{ featured: project.featured }">
        <div class="project-image">
          <img :src="project.image" :alt="project.title"/>
          <div class="project-links">
            <a :href="project.demoLink" target="_blank" class="project-link" title="Live Demo">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
            <a :href="project.codeLink" target="_blank" class="project-link" title="Source Code">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          </div>
        </div>
        <div class="project-content">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="project-tech">
            <span v-for="(tech, index) in project.technologies" :key="index" class="tech-tag">{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding: 6rem 0;
  background-color: var(--light);
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.project-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.6rem 1.2rem;
  border: none;
  background-color: white;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 500;
  color: var(--text);
  transition: var(--transition);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.filter-btn:hover {
  background-color: var(--primary);
  color: white;
}

.filter-btn.active {
  background-color: var(--primary);
  color: white;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.project-card.featured {
  grid-column: span 2;
}

.project-image {
  height: 240px;
  position: relative;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-links {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  opacity: 0;
  transition: var(--transition);
}

.project-card:hover .project-links {
  opacity: 1;
}

.project-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background-color: white;
  border-radius: 50%;
  color: var(--dark);
  transition: var(--transition);
}

.project-link:hover {
  background-color: var(--primary);
  color: white;
  transform: translateY(-3px);
}

.project-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.project-content h3 {
  margin-bottom: 0.75rem;
  color: var(--dark);
}

.project-content p {
  color: var(--text-light);
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.3rem 0.8rem;
  background-color: var(--light);
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .project-card.featured {
    grid-column: span 1;
  }
  
  .project-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}
</style> 