<script setup>
const currentYear = new Date().getFullYear();


const contactInfo = {
  email: 'liubenjamin8@gmail.com',
  phone: '+1 (514) 209-7168',
  location: 'Montreal, QC',
  social: [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/benjamin-sliu/',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`
    },
    {
      name: 'GitHub',
      url: 'https://github.com/benjaminsunliu',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`
    },
  ]
};
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-header">
        <h3>Get In Touch</h3>
        <p>Feel free to contact me for job opportunities or collaborations</p>
      </div>
      
      <div class="contact-info">
        <div class="contact-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </div>
          <div class="info">
            <span class="label">Email</span>
            <a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a>
          </div>
        </div>
        
        <div class="contact-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </div>
          <div class="info">
            <span class="label">Phone</span>
            <a :href="`tel:${contactInfo.phone.replace(/\s+/g, '')}`">{{ contactInfo.phone }}</a>
          </div>
        </div>
        
        <div class="contact-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <div class="info">
            <span class="label">Location</span>
            <span>{{ contactInfo.location }}</span>
          </div>
        </div>
      </div>
      
      <div class="social-links">
        <a v-for="social in contactInfo.social" :key="social.name" :href="social.url" target="_blank" :aria-label="social.name" :title="social.name" class="social-link">
          <span v-html="social.icon"></span>
        </a>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Benjamin Liu. All rights reserved.</p>
        <p class="credit">Built with Vue.js</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--dark);
  color: white;
  padding: 4rem 0 2rem;
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-header {
  text-align: center;
  margin-bottom: 3rem;
}

.footer-header h3 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
}

.footer-header h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 25%;
  width: 50%;
  height: 3px;
  background-color: var(--primary);
}

.footer-header p {
  color: rgba(255, 255, 255, 0.7);
}

.contact-info {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  width: calc(33.333% - 1rem);
  margin-bottom: 1.5rem;
}

.icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
}

.info {
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.info a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: var(--transition);
}

.info a:hover {
  color: var(--primary);
}

.info span:not(.label) {
  color: rgba(255, 255, 255, 0.7);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: var(--transition);
}

.social-link:hover {
  background-color: var(--primary);
  transform: translateY(-3px);
}

.footer-bottom {
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.credit {
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .contact-info {
    flex-direction: column;
  }
  
  .contact-item {
    width: 100%;
  }
  
  .footer-header h3 {
    font-size: 1.75 rem;
  }
}
</style> 