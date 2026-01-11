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
  background: transparent !important;
  color: var(--text);
  padding: 4rem 0 2rem;
  position: relative;
  border-top: 1px solid var(--code-border);
  box-shadow: none;
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
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
  color: var(--terminal-green);
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.footer-header h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 25%;
  width: 50%;
  height: 3px;
  background: linear-gradient(90deg, var(--terminal-green), var(--terminal-blue));
  box-shadow: 0 0 10px var(--terminal-green);
}

.footer-header p {
  color: var(--text-light);
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
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
  padding: 1rem;
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.contact-item:hover {
  border-color: var(--terminal-green);
  box-shadow: 0 5px 15px rgba(0, 255, 65, 0.2);
  transform: translateY(-2px);
}

.icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--terminal-green), var(--terminal-blue));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--darker);
  flex-shrink: 0;
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
}

.info {
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--terminal-blue);
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
}

.info a {
  color: var(--text);
  text-decoration: none;
  transition: var(--transition);
  font-family: 'JetBrains Mono', monospace;
}

.info a:hover {
  color: var(--terminal-green);
  text-shadow: 0 0 5px var(--terminal-green);
}

.info span:not(.label) {
  color: var(--text);
  font-family: 'JetBrains Mono', monospace;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.social-link {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--code-bg);
  border: 2px solid var(--code-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--terminal-green);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.2), transparent);
  transition: left 0.5s;
}

.social-link:hover::before {
  left: 100%;
}

.social-link:hover {
  border-color: var(--terminal-green);
  color: var(--terminal-green);
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.4);
}

.footer-bottom {
  text-align: center;
  border-top: 1px solid var(--code-border);
  padding-top: 2rem;
  font-size: 0.9rem;
  color: var(--text-light);
  font-family: 'JetBrains Mono', monospace;
}

.credit {
  margin-top: 0.5rem;
  color: var(--terminal-pink);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Terminal-style loading animation */
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.footer-header {
  animation: fade-in-up 0.6s ease-out;
}

.contact-info {
  animation: fade-in-up 0.6s ease-out;
  animation-delay: 0.1s;
}

.social-links {
  animation: fade-in-up 0.6s ease-out;
  animation-delay: 0.2s;
}

.footer-bottom {
  animation: fade-in-up 0.6s ease-out;
  animation-delay: 0.3s;
}

/* Responsive design */
@media (max-width: 768px) {
  .footer {
    padding: 2rem 0 1rem;
    box-shadow: none;
  }
  .footer-content {
    padding: 0 0.5rem;
  }
  .footer-header h3 {
    font-size: 1.5rem;
  }
  .contact-info {
    flex-direction: column;
    gap: 1rem;
  }
  .contact-item {
    width: 100%;
    margin-bottom: 1rem;
  }
  .social-links {
    gap: 1rem;
  }
  .social-link {
    width: 40px;
    height: 40px;
  }
}
</style> 