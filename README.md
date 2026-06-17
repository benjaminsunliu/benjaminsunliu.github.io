# Benjamin Liu — Personal Portfolio

A modern, glassmorphism portfolio website showcasing my journey as a Software Engineering student — my projects, work experience, education, and interests — wrapped in a polished dark UI with custom animations and a few hidden easter eggs.

## Live Demo

Visit my portfolio: [bensliu.ca](https://bensliu.ca)
Explore my Digital Garden: [bensliu.ca/ObsiQuartz](https://bensliu.ca/ObsiQuartz)

## Features

- **Glassmorphism Design**: Frosted-glass cards over a deep, layered dark palette with soft neon glows
- **Animated Background**: Ambient animated gradient/particle layer behind the whole page
- **Interactive Sections**:
  - Hero with animated greeting and social links
  - Work Experience timeline with detailed role descriptions
  - Filterable project showcase with tech-stack tags
  - Education and certifications
  - Hobbies and interests gallery
- **3D Tilt Cards** (`v-tilt`): Pointer-driven parallax tilt with a moving light glare
- **Scroll Reveal** (`v-reveal`): Cards fade/slide into view as you scroll, via IntersectionObserver
- **Custom Cursor & Scroll Progress Bar**: Subtle pointer effects and a top-of-page reading-progress indicator
- **benjaminOS Desktop Mode**: A hidden desktop/terminal interface to explore the same content — unlocked with the Konami code (↑ ↑ ↓ ↓ ← → ← → B A)
- **Easter Eggs**: Konami rainbow mode, a `egg:fish` school-of-fish animation, and a console hint for the curious
- **Accessibility-Aware**: Respects `prefers-reduced-motion` and disables tilt on touch devices
- **Responsive Design**: Optimized for mobile, tablet, and desktop, with mobile-specific touch handling
- **Privacy-First Analytics**: Cloudflare Web Analytics (cookieless) for private visitor stats
- **Social Integration**: Links to LinkedIn, GitHub, YouTube, and Strava

## Tech Stack

- **Framework**: [Vue.js 3](https://vuejs.org/) (`<script setup>` Composition API)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Custom CSS with CSS variables for theming (glass tokens, surface palette)
- **Fonts**: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Inter](https://fonts.google.com/specimen/Inter), and [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- **Icons**: Custom SVG icons
- **APIs**: IntersectionObserver for scroll detection and reveal animations
- **Analytics**: [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/)
- **Hosting**: GitHub Pages

## Project Structure

```
src/
├── components/
│   ├── Header.vue              # Navigation bar with active-section tracking
│   ├── Hero.vue               # Landing section
│   ├── Experience.vue         # Work timeline
│   ├── Projects.vue           # Filterable project showcase
│   ├── Education.vue          # Education & certifications
│   ├── Hobbies.vue            # Personal interests gallery
│   ├── Footer.vue             # Footer + contact / social links
│   ├── AnimatedBackground.vue # Ambient animated background layer
│   ├── Desktop.vue            # benjaminOS desktop shell (Konami mode)
│   └── Terminal.vue           # benjaminOS terminal window
├── composables/
│   ├── useCursor.js           # Custom cursor effects
│   └── useEasterEggs.js       # Konami code, fish, console hint
├── data/
│   └── portfolio.js           # Single source of truth for all content
├── directives.js              # v-tilt (3D parallax) & v-reveal (scroll reveal)
├── assets/                    # Images and static files
├── style.css                  # Global styles & design tokens
├── App.vue                    # Root component
└── main.js                    # App entry point, directive registration
```

> All portfolio content (projects, experience, education, certifications) lives in
> `src/data/portfolio.js`. It's the single source of truth read by **both** the regular
> portfolio components and benjaminOS, so editing it once keeps the two modes in sync.

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/benjaminsunliu/benjaminsunliu.github.io.git
cd benjaminsunliu.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Easter Eggs

- **Konami Code** (↑ ↑ ↓ ↓ ← → ← → B A): toggles the **benjaminOS** desktop mode and a rainbow background
- **`egg:fish`**: type it anywhere to send a school of fish swimming across the screen
- **Console hint**: open the dev console for a little message

## Connect With Me

- [LinkedIn](https://www.linkedin.com/in/benjamin-sliu/)
- [GitHub](https://github.com/benjaminsunliu)
- [YouTube](https://www.youtube.com/@benjaminsliu/featured)
- [Strava](https://www.strava.com/athletes/44787997)

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Icons from various open-source SVG collections

---

*"Passionate about creating elegant solutions to complex problems"*
