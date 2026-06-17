<div align="center">

# Benjamin Liu — Portfolio

A glassmorphism portfolio with a hidden operating system inside it.

[**bensliu.ca**](https://bensliu.ca) · [Digital Garden](https://bensliu.ca/ObsiQuartz)

[![Vue 3](https://img.shields.io/badge/Vue-3-42b883?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Deploy](https://img.shields.io/badge/GitHub_Pages-live-181717?logo=github&logoColor=white)](https://bensliu.ca)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## What this is

My personal site, built from scratch as a single-page Vue app. The visible layer is a polished dark, frosted-glass portfolio — experience, projects, education, hobbies. The hidden layer is **benjaminOS**, a desktop-and-terminal interface for the *same* content, unlocked with the Konami code.

Both layers read from one file (`src/data/portfolio.js`), so the portfolio and the OS never drift out of sync.

## Highlights

- **Glassmorphism UI** — frosted cards on a layered dark palette with soft neon glows and an ambient animated background.
- **`benjaminOS`** — a hidden desktop shell with a working terminal, unlocked via the Konami code (`↑ ↑ ↓ ↓ ← → ← → B A`).
- **Custom directives** — `v-tilt` for pointer-driven 3D parallax cards with a moving glare, and `v-reveal` for scroll-triggered entrances via `IntersectionObserver`.
- **Hand-rolled interactions** — custom cursor effects and a top-of-page scroll-progress bar, no UI framework.
- **Single source of truth** — all content lives in `portfolio.js` and feeds every view.
- **Easter eggs** — Konami rainbow mode, an `egg:fish` school-of-fish animation, and a console hint for the curious.
- **Built for everyone** — responsive across mobile/tablet/desktop, respects `prefers-reduced-motion`, and disables tilt on touch devices.
- **Private analytics** — cookieless Cloudflare Web Analytics.

## Tech stack

| | |
|---|---|
| **Framework** | Vue 3 (`<script setup>` Composition API) |
| **Build** | Vite 6 |
| **Styling** | Hand-written CSS with design tokens (glass + surface palette) |
| **Fonts** | Space Grotesk · Inter · JetBrains Mono |
| **Analytics** | Cloudflare Web Analytics (cookieless) |
| **Hosting** | GitHub Pages via GitHub Actions |

No component libraries, no CSS frameworks — the glass, tilt, cursor, and OS are all custom.

## Project structure

```
src/
├── components/
│   ├── Header.vue              # Nav bar with active-section tracking
│   ├── Hero.vue                # Landing section
│   ├── Experience.vue          # Work timeline
│   ├── Projects.vue            # Filterable project showcase
│   ├── Education.vue           # Education & certifications
│   ├── Hobbies.vue             # Personal interests gallery
│   ├── Footer.vue              # Contact / social links
│   ├── AnimatedBackground.vue  # Ambient animated background layer
│   ├── Desktop.vue             # benjaminOS desktop shell (Konami mode)
│   └── Terminal.vue            # benjaminOS terminal window
├── composables/
│   ├── useCursor.js            # Custom cursor effects
│   └── useEasterEggs.js        # Konami code, fish, console hint
├── data/
│   └── portfolio.js            # Single source of truth for all content
├── directives.js               # v-tilt (3D parallax) & v-reveal (scroll reveal)
├── style.css                   # Global styles & design tokens
├── App.vue                     # Root component
└── main.js                     # Entry point + directive registration
```

> Editing content means editing **one** file: `src/data/portfolio.js`. Both the
> portfolio components and benjaminOS read from it, so a single change updates both.

## Run it locally

**Prerequisites:** Node.js 18+ and npm.

```bash
git clone https://github.com/benjaminsunliu/benjaminsunliu.github.io.git
cd benjaminsunliu.github.io
npm install
npm run dev        # start the dev server
```

Other scripts:

```bash
npm run build      # production build → dist/
npm run preview    # preview the production build
```

Pushes to `master` are built and deployed to GitHub Pages automatically by the
workflow in `.github/workflows/`.

## Easter eggs

> Spoilers below — half the fun is finding them yourself.

- **Konami code** (`↑ ↑ ↓ ↓ ← → ← → B A`) — boots **benjaminOS** and a rainbow background.
- **`egg:fish`** — type it anywhere to send a school of fish swimming across the screen.
- **Console hint** — open the dev console for a little message.

## Connect

[LinkedIn](https://www.linkedin.com/in/benjamin-sliu/) ·
[GitHub](https://github.com/benjaminsunliu) ·
[YouTube](https://www.youtube.com/@benjaminsliu/featured) ·
[Strava](https://www.strava.com/athletes/44787997)

## License

[MIT](LICENSE) — feel free to learn from it. The content and branding are mine.
