// Single source of truth for portfolio content.
// Both the regular portfolio components and benjaminOS read from here, so
// editing/adding/removing an item below keeps the two modes in sync.

export const projects = [
  {
    id: 0,
    title: 'FraudFrog',
    description: '🏆 Valsoft Challenge Winner at MPC Hacks - FraudFrog combines deterministic fraud scoring, per-card anomaly detection, cross-card fraud signals, AI-assisted case summaries, and a Tinder-inspired swipe review flow for fast transaction triage.',
    image: '/fraudfrog.jpeg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Python'],
    category: 'web',
    winner: 'WINNER',
    demoLink: 'https://devpost.com/software/fraudfrog',
    codeLink: 'https://github.com/benjaminsunliu/FraudFrog'
  },
  {
    id: 2,
    title: 'Autonomous Arduino Firetruck',
    description: '🏆 Collège Jean-de-Brébeuf Best Integration Project - An Arduino-powered autonomous firetruck that detects and navigates towards flames, integrating circuit design, mechanical assembly, and algorithm development.',
    image: '/firetruck.jpg',
    technologies: ['Arduino', 'Algorithms', 'Mechanical Design', 'Circuits', 'Sensors'],
    category: 'robotics',
    winner: 'WINNER',
    demoLink: 'https://www.youtube.com/watch?v=l2Vn9u5bldI&ab_channel=BenjaminLiu',
    codeLink: 'https://github.com/benjaminsunliu/firetruck',
    featured: false
  },
  {
    id: 5,
    title: 'SeaScooper',
    description: '🏆 RoboHacks 2024 Beaver Dam Challenge Runner Up - An Arduino prototype + full business proposal addressing marine pollution, aligned with the UN SDGs. Earned 2nd place at RoboHacks 2024.',
    image: '/seascooper.jpeg',
    technologies: ['Arduino', 'Sensors', 'Mechanical Design', 'UN SDGs'],
    category: 'robotics',
    winner: 'WINNER',
    demoLink: 'https://www.youtube.com/watch?v=kaa7bNEnGvk',
    codeLink: 'https://github.com/benjaminsunliu',
    featured: false
  },
  {
    id: 1,
    title: 'Patrouille Verte Mobile App',
    description: '🌱 Designed, pitched, and developed a React Native mobile app idea for Regroupement des Éco-Quartiers to help Patrouille Verte streamline field data collection and management using Azure and Google Sheets API.',
    image: '/patrouille.png',
    technologies: ['React Native', 'Node.js', 'Azure', 'Google API'],
    category: 'mobile',
    winner: 'CLIENT PROJECT',
    demoLink: 'https://www.youtube.com/watch?v=x52XStoTfi8',
    codeLink: 'https://github.com/benjaminsunliu/PatrouilleVerte',
    featured: false
  },
  {
    id: 4,
    title: 'EchoBrief — Live Meeting Summarizer',
    description: 'A real-time audio transcription and summarization web app that streams transcripts and generates structured summaries with action items. Built at McHacks 12.',
    image: '/echobrief.JPG',
    technologies: ['GCP', 'React', 'Express.js', 'OpenAI API', 'SSE'],
    category: 'ai',
    demoLink: 'https://devpost.com/software/echobrief',
    codeLink: 'https://github.com/benjaminsunliu/EchoBrief',
    featured: false
  },
  {
    id: 8,
    title: 'ConUMaps',
    description: 'A mobile campus navigation app for Concordia University, featuring interactive maps, building info, and indoor/outdoor routing across SGW and Loyola.',
    image: '/conumaps.png',
    technologies: ['React Native', 'TypeScript', 'Expo', 'Jest', 'Google Maps API', 'Maestro'],
    category: 'mobile',
    demoLink: 'https://conumaps.expo.app/',
    codeLink: 'https://github.com/benjaminsunliu/ConUMap',
    featured: false
  },
  {
    id: 9,
    title: 'CommitClub',
    description: 'An HCI-based prototype that helps students stay consistent with daily habits through supportive group accountability instead of pressure-driven streak systems.',
    image: '/commitclub.png',
    technologies: ['Figma', 'HCI', 'React Native', 'Firebase', 'TypeScript',],
    category: 'mobile',
    demoLink: 'https://youtu.be/P-5hIvhmwek',
    codeLink: 'https://github.com/benjaminsunliu/CommitClub',
    featured: false
  },
  {
    id: 3,
    title: 'RateMyChillmates',
    description: 'A peer-evaluation platform for students to give structured feedback on individual and group contributions, fostering accountability and self-reflection.',
    image: '/ratemychillmates.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'CI/CD', 'Agile'],
    category: 'web',
    demoLink: '/SOEN 341 Presentation .pdf',
    codeLink: 'https://github.com/benjaminsunliu/RateMyChillmates',
    featured: false
  },
  {
    id: 6,
    title: 'Art Advisory Institution System',
    description: 'A platform for art advisory consulting — experts manage availability, clients request consultations, and admins oversee auctions, viewings, and service requests.',
    image: '/art.png',
    technologies: ['Java', 'SQL', 'Design Patterns', 'JPA', 'Hibernate', 'Maven'],
    category: 'ood',
    demoLink: 'https://youtu.be/xoJy-J2NHyk?si=KeWBjbWkDpivaven',
    codeLink: 'https://github.com/benjaminsunliu/chillmates-soen-342',
    featured: false
  },
  {
    id: 7,
    title: 'TerraQuest',
    description: 'An interactive learning game challenging players to make strategic environmental decisions, with AI-driven outcomes and immersive 3D animations.',
    image: '/terraquest.png',
    technologies: ['React', 'Three.js', 'Tailwind', 'Express.js', 'OpenAI API'],
    category: 'ai',
    demoLink: 'https://devpost.com/software/terraquest',
    codeLink: 'https://github.com/benjaminsunliu/TerraQuest',
    featured: false
  },
  {
    id: 8,
    title: 'CodePaws',
    description: 'A pet adoption platform where users create accounts, list pets, and browse adoptions, with secure login and session management.',
    image: '/codepaws.png',
    technologies: ['JavaScript', 'Node.js', 'HTML/CSS', 'Cookies'],
    category: 'web',
    demoLink: 'https://codepaws.onrender.com/',
    codeLink: 'https://github.com/benjaminsunliu/CodePaws',
    featured: false
  }
];

export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'robotics', label: 'Robotics' },
  { id: 'ood', label: 'OOD' }
];

export const experiences = [
  {
    id: 1,
    title: 'Software Developer Intern',
    company: 'CAE Inc.',
    period: 'May 2026 - Present',
    location: 'Montreal, QC',
    description: [
      'Contributing to the development of CAE\'s next-generation flight simulation software, enhancing realism and performance for pilot training programs worldwide ✈️',
    ],
    skills: ['C#', 'SQL', 'Blazor', 'Angular', 'TypeScript', 'Azure', 'DevExpress', 'Code Reviews']
  },
  {
    id: 2,
    title: 'Software Developer R&D Intern',
    company: 'Genetec Inc.',
    period: 'Sep 2025 - Dec 2025',
    location: 'Montreal, QC',
    description: [
      'Worked on AutoVu Sharp — automatic license plate recognition systems 🚗',
    ],
    skills: ['C#', 'ASP.NET', 'React', 'TypeScript', 'Azure', 'Agile', 'Code Reviews']
  },
  {
    id: 3,
    title: 'Outreach Officer / Developer',
    company: 'Regroupement des éco-quartiers',
    period: 'Jun 2023 - Oct 2025',
    location: 'Montreal, QC',
    description: [
      'Developed and pitched a mobile application for Patrouille Verte using React Native and Azure to enhance data entry and management processes',
      'Improved data entry efficiency by more than 80%',
      'Handled every aspect of development including ideation, design, frontend and backend development',
      'Presented the app to more than 40 users, ensuring successful adoption',
      'Promoted environmental awareness through events, presentations, and community engagement',
    ],
    skills: ['Project Management', 'SDLC', 'Full-Stack', 'Mobile', 'React Native', 'Node.js', 'Google API']
  },
  {
    id: 4,
    title: 'Kitchen Staff',
    company: 'Warehouse Group',
    period: 'Jun 2022 - Aug 2022',
    location: 'Montreal, QC',
    description: [
      'Collaborated with kitchen staff and servers to ensure efficient communication and delivery of orders',
      'Handled the demands of a high-volume restaurant, efficiently serving customers during peak hours'
    ],
    skills: ['Teamwork', 'Communication', 'Problem Solving']
  },
];

export const education = [
  {
    id: 1,
    degree: 'B.Eng. in Software Engineering',
    institution: 'Concordia University',
    location: 'Montreal, QC',
    period: '2023 - 2027',
    description: 'Specialized in software architecture, design, and project-based learning — full-stack development, mobile applications, and robust software solutions.',
    achievements: [
      'GPA: 3.78',
      "Dean's List: 2024, 2025, 2026",
      '1st Place Winner — MPC Hacks 2026 Valsoft Challenge',
      '2nd Place Winner — McGill RoboHacks 2024 Beaver Dam Challenge',
      'Active in ECA Concordia (Director of Social Affairs), HackConcordia (Director of Sponsorships), and Space Concordia (SCRB Software)'
    ]
  },
  {
    id: 2,
    degree: 'DEC in Pure and Applied Sciences',
    institution: 'Collège Jean-de-Brébeuf',
    location: 'Montreal, QC',
    period: '2021 - 2023',
    description: 'Built strong analytical and problem-solving skills through hands-on projects, including an award-winning autonomous Arduino firetruck.',
    achievements: [
      '1st place — Prize for Best Integration Project: Autonomous Arduino Firetruck'
    ]
  }
];

export const certifications = [
  {
    id: 1,
    name: 'AI Foundations: Machine Learning',
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
    issuer: 'Royal Conservatory of Music',
    date: 'Mar 2019',
  },
  {
    id: 4,
    name: 'Level 8 Theory',
    issuer: 'Royal Conservatory of Music',
    date: 'Sep 2018',
  },
];

export const contact = {
  email: 'liubenjamin8@gmail.com',
  phone: '+1 (514) 209-7168',
  location: 'Montreal, QC',
};

// Canonical social/profile links. `key` is a stable handle used in code;
// `name` is the display label.
export const socials = [
  { key: 'GitHub', name: 'GitHub', url: 'https://github.com/benjaminsunliu', handle: 'benjaminsunliu' },
  { key: 'LinkedIn', name: 'LinkedIn', url: 'https://www.linkedin.com/in/benjamin-sliu/', handle: 'in/benjamin-sliu' },
  { key: 'YouTube', name: 'YouTube', url: 'https://www.youtube.com/@benjaminsliu/featured', handle: '@benjaminsliu' },
  { key: 'Strava', name: 'Strava', url: 'https://www.strava.com/athletes/44787997', handle: '44787997' },
  { key: 'Digital Garden', name: 'Digital Garden', url: 'https://bensliu.ca/ObsiQuartz/', handle: 'ObsiQuartz' },
];

// Lookup helper: socialUrl('LinkedIn') -> url
export const socialUrl = (key) => (socials.find((s) => s.key === key) || {}).url || '';
