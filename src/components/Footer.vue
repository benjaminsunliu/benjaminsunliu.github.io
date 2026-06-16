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
    <div class="footer-glow"></div>
    <div class="footer-content">
      <div class="footer-header" v-reveal>
        <p class="eyebrow">05 — Say Hello</p>
        <h3>Let's build something together</h3>
        <p class="subtitle">Open to internships, collaborations, and a good conversation over coffee.</p>
        <a :href="`mailto:${contactInfo.email}`" class="btn btn-primary email-cta">
          {{ contactInfo.email }}
        </a>
      </div>

      <div class="contact-info" v-reveal>
        <div class="contact-item glass-card" v-tilt="{ max: 8 }">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </div>
          <div class="info">
            <span class="label">Email</span>
            <a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a>
          </div>
        </div>

        <div class="contact-item glass-card" v-tilt="{ max: 8 }">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </div>
          <div class="info">
            <span class="label">Phone</span>
            <a :href="`tel:${contactInfo.phone.replace(/\s+/g, '')}`">{{ contactInfo.phone }}</a>
          </div>
        </div>

        <div class="contact-item glass-card" v-tilt="{ max: 8 }">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <div class="info">
            <span class="label">Location</span>
            <span>{{ contactInfo.location }}</span>
          </div>
        </div>
      </div>

      <div class="social-links" v-reveal>
        <a v-for="social in contactInfo.social" :key="social.name" :href="social.url" target="_blank" :aria-label="social.name" :title="social.name" class="social-link">
          <span v-html="social.icon"></span>
        </a>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Benjamin Liu</p>
        <p class="credit">Built with Vue · <span class="hint">try ↑↑↓↓←→←→ B A</span></p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding: 6rem 0 2.5rem;
  margin-top: 4rem;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--glass-border), transparent);
}

.footer-glow {
  position: absolute;
  top: -40%;
  left: 50%;
  transform: translateX(-50%);
  width: 60vw;
  height: 60vw;
  max-width: 700px;
  max-height: 700px;
  background: radial-gradient(circle, rgba(124, 140, 255, 0.12), transparent 60%);
  pointer-events: none;
}

.footer-content {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-header {
  text-align: center;
  margin-bottom: 3rem;
}

.footer-header h3 {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  margin: 0.75rem 0;
  background: linear-gradient(120deg, #ffffff, #b9c2ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  color: var(--text-muted);
  font-size: 1.05rem;
  margin-bottom: 1.75rem;
}

.email-cta { font-family: 'JetBrains Mono', monospace; }

.contact-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  margin-bottom: 2.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
}

.icon {
  width: 44px;
  height: 44px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  color: var(--accent-2);
  background: rgba(79, 209, 224, 0.1);
  border: 1px solid rgba(79, 209, 224, 0.22);
  flex-shrink: 0;
}

.info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--text-dim);
  margin-bottom: 0.15rem;
}

.info a, .info span:not(.label) {
  color: var(--text);
  text-decoration: none;
  font-size: 0.88rem;
  transition: var(--transition);
  overflow: hidden;
  text-overflow: ellipsis;
}

.info a:hover { color: var(--accent-2); }

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.social-link {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: var(--text-muted);
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  transition: var(--transition);
}

.social-link:hover {
  color: var(--text);
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 10px 24px rgba(124, 140, 255, 0.3);
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--glass-border);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  color: var(--text-dim);
}

.credit { margin-top: 0.4rem; }

.hint {
  color: var(--accent-3);
  opacity: 0.7;
}

@media (max-width: 768px) {
  .footer { padding: 4rem 0 2rem; }
  .contact-info {
    grid-template-columns: 1fr;
    gap: 0.9rem;
  }
}
</style>
