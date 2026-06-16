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

const hobbies = [
  {
    id: 1,
    name: 'Cycling',
    description: "I love the thrill of cycling — navigating city streets, exploring scenic trails, and pushing my limits. My longest ride was a 152 km route along the lakeshore.",
    image: '/hobby1.jpg'
  },
  {
    id: 2,
    name: 'Home Barista',
    description: "I'm passionate about the craft of espresso — dialing in shots, experimenting with beans and grind settings, and practicing latte art. A daily ritual of precision and creativity.",
    image: '/hobby2.jpg'
  },
  {
    id: 3,
    name: 'Aquarium Keeping',
    description: "I'm fascinated by aquascaping and freshwater care — maintaining a planted tank, experimenting with CO₂ injection, and optimizing water parameters for healthy fish and plant life.",
    image: '/hobby3.jpg',
    egg: true
  },
  {
    id: 4,
    name: 'Music',
    description: "Piano and violin since childhood, from classical to jazz. I've performed with the Mount Royal Youth Orchestra and completed Level 8 Violin & Theory with the Royal Conservatory of Music.",
    image: '/music.png'
  }
];

function handleHobbyClick(hobby) {
  if (hobby.egg) {
    window.dispatchEvent(new CustomEvent('easteregg', { detail: 'fish' }));
  }
}
</script>

<template>
  <section id="hobbies" ref="sectionRef" class="hobbies">
    <div class="section-title" v-reveal>
      <p class="eyebrow">04 — Off the Clock</p>
      <h2>Hobbies &amp; Interests</h2>
      <p>When I'm not coding, you'll find me...</p>
    </div>

    <div class="hobbies-grid">
      <div
        v-for="(hobby, i) in hobbies"
        :key="hobby.id"
        class="glass-card hobby-card"
        :class="{ 'is-egg': hobby.egg }"
        :data-cursor="hobby.egg ? 'egg' : null"
        v-tilt="{ max: 7 }"
        v-reveal="{ delay: (i % 2) * 80 }"
        @click="handleHobbyClick(hobby)"
      >
        <div class="hobby-image">
          <img :src="hobby.image" :alt="hobby.name" loading="lazy" />
        </div>
        <div class="hobby-content">
          <h3>{{ hobby.name }}<span v-if="hobby.egg" class="hobby-hint">tap me 🐠</span></h3>
          <p>{{ hobby.description }}</p>
        </div>
      </div>
    </div>

    <div class="quote-section" v-reveal>
      <blockquote class="glass">
        <p>"A well-balanced life includes both professional growth and personal passions. My hobbies keep me creative, energized, and bring new perspectives to my work."</p>
      </blockquote>
    </div>
  </section>
</template>

<style scoped>
.hobbies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.6rem;
  max-width: 1100px;
  margin: 4rem auto 3.5rem;
}

.hobby-card {
  display: flex;
  flex-direction: column;
}

/* Clickable easter-egg card: hand cursor + hint that only shows on hover. */
.hobby-card.is-egg,
.hobby-card.is-egg * { cursor: pointer; }

.hobby-hint {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-left: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.66rem;
  color: var(--accent-2);
  vertical-align: middle;
  opacity: 0;
  transform: translateY(-1px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.hobby-card.is-egg:hover .hobby-hint {
  opacity: 0.85;
  transform: translateY(0);
}

.hobby-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.hobby-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.hobby-card:hover .hobby-image img { transform: scale(1.07); }

.hobby-content {
  padding: 1.4rem;
  flex: 1;
}

.hobby-content h3 {
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
}

.hobby-content p {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.65;
}

.quote-section {
  max-width: 780px;
  margin: 0 auto;
}

blockquote {
  position: relative;
  padding: 2.25rem 2.5rem;
  font-size: 1.2rem;
  font-style: italic;
  line-height: 1.7;
  color: var(--text);
  text-align: center;
}

blockquote::before {
  content: '“';
  position: absolute;
  top: 0.2rem;
  left: 1.2rem;
  font-size: 4rem;
  font-family: 'Space Grotesk', serif;
  color: var(--accent);
  opacity: 0.5;
}

@media (max-width: 768px) {
  .hobbies-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    margin-top: 2.5rem;
  }
  .hobby-content { padding: 1.2rem; }
  blockquote { padding: 1.75rem; font-size: 1.05rem; }
}
</style>
