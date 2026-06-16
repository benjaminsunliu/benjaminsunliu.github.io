<script setup>
// benjaminOS — a fake Windows-style desktop unlocked by the Konami code.
// Draggable windows, a Start menu, a taskbar with a live clock, and openable
// apps (About, Projects, Experience, Education, Contact, Terminal, Bin).
import { ref, reactive, computed, watch, onBeforeUnmount, nextTick } from 'vue';
import Terminal from './Terminal.vue';
import {
  projects as portfolioProjects,
  projectCategories,
  experiences as portfolioExperiences,
  education as portfolioEducation,
  socials as portfolioSocials,
} from '../data/portfolio.js';

const props = defineProps({ active: { type: Boolean, default: false } });
const emit = defineEmits(['close']);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = () => window.innerWidth < 768;

const booting = ref(false);
const startOpen = ref(false);
const windows = reactive([]);
const selectedIcon = ref(null);
let zTop = 10;
let winSeq = 0;

// ---- Live clock ----
const now = ref(new Date());
let clockTimer = null;
const time = computed(() => now.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
const date = computed(() => now.value.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' }));

// ---- Data ----
// Derived from the shared portfolio source so benjaminOS stays in sync with
// the regular portfolio. Edit content in src/data/portfolio.js.
const catLabel = (id) => (projectCategories.find((c) => c.id === id) || {}).label || id;
const projects = portfolioProjects.map((p) => ({
  id: p.id,
  name: p.title,
  cat: catLabel(p.category),
  category: p.category,
  desc: p.description,
  techs: p.technologies,
  image: p.image,
  demoLink: p.demoLink,
  codeLink: p.codeLink,
}));
const experience = portfolioExperiences.map((j) => ({
  role: j.title,
  org: j.company,
  when: j.period,
  note: j.skills.join(' · '),
}));
const education = portfolioEducation.map((e) => ({
  deg: e.degree,
  org: e.institution,
  when: e.period,
  note: e.achievements.join(' · '),
}));

// { GitHub: url, LinkedIn: url, ... } keyed view for the contact/browser apps.
const socials = Object.fromEntries(portfolioSocials.map((s) => [s.key, s.url]));

const APPS = {
  about: { name: 'About Me', icon: '👤', w: 460, h: 420 },
  projects: { name: 'Projects', icon: '📁', w: 560, h: 440 },
  experience: { name: 'Experience', icon: '💼', w: 520, h: 420 },
  education: { name: 'Education', icon: '🎓', w: 520, h: 360 },
  contact: { name: 'Contact', icon: '✉️', w: 420, h: 320 },
  terminal: { name: 'Terminal', icon: '🖥️', w: 640, h: 420 },
  bin: { name: 'Recycle Bin', icon: '🗑️', w: 400, h: 260 },
};
const desktopIcons = ['about', 'projects', 'experience', 'education', 'contact', 'terminal', 'bin'];
const startApps = ['about', 'projects', 'experience', 'education', 'contact', 'terminal'];

// ---- External links: ask before leaving benjaminOS ----
const confirmUrl = ref(null);
function askOpen(url) { if (url) confirmUrl.value = url; }
function confirmYes() { window.open(confirmUrl.value, '_blank', 'noopener'); confirmUrl.value = null; }
function confirmNo() { confirmUrl.value = null; }

// ---- Project detail windows ----
function openProject(p) {
  startOpen.value = false;
  const existing = windows.find((w) => w.app === 'project' && w.project && w.project.id === p.id);
  if (existing) { existing.min = false; focus(existing); return; }
  const mobile = isMobile();
  const w = 460, h = 580;
  const off = (windows.length % 5) * 26;
  const cx = Math.round((window.innerWidth - w) / 2) + off;
  const cy = Math.round((window.innerHeight - 52 - h) / 2) + off;
  windows.push({
    id: ++winSeq,
    app: 'project',
    project: p,
    title: p.name,
    icon: '📄',
    x: mobile ? 0 : Math.max(8, cx),
    y: mobile ? 0 : Math.max(8, cy),
    w, h,
    z: ++zTop,
    min: false,
    max: mobile,
  });
}

function openApp(id) {
  startOpen.value = false;
  const existing = windows.find((w) => w.app === id);
  if (existing) { existing.min = false; focus(existing); return; }
  const a = APPS[id];
  const mobile = isMobile();
  // Open dead-center on screen (taskbar is 52px tall).
  const cx = Math.round((window.innerWidth - a.w) / 2);
  const cy = Math.round((window.innerHeight - 52 - a.h) / 2);
  const win = {
    id: ++winSeq,
    app: id,
    title: a.name,
    icon: a.icon,
    x: mobile ? 0 : Math.max(8, cx),
    y: mobile ? 0 : Math.max(8, cy),
    w: a.w,
    h: a.h,
    z: ++zTop,
    min: false,
    max: mobile,
  };
  windows.push(win);
}

function focus(win) {
  win.z = ++zTop;
}
function closeWin(win) {
  const i = windows.findIndex((w) => w.id === win.id);
  if (i >= 0) windows.splice(i, 1);
}
function toggleMax(win) {
  if (isMobile()) return;
  win.max = !win.max;
}
function taskbarClick(win) {
  if (win.min) { win.min = false; focus(win); return; }
  // if it's the top window, minimize; else focus
  const top = Math.max(...windows.filter((w) => !w.min).map((w) => w.z), 0);
  if (win.z === top) win.min = true;
  else focus(win);
}

// ---- Dragging ----
let drag = null;
function startDrag(e, win) {
  if (win.max || isMobile()) return;
  focus(win);
  drag = { win, dx: e.clientX - win.x, dy: e.clientY - win.y };
  window.addEventListener('pointermove', onDrag);
  window.addEventListener('pointerup', endDrag);
}
function onDrag(e) {
  if (!drag) return;
  drag.win.x = Math.min(Math.max(e.clientX - drag.dx, -drag.win.w + 120), window.innerWidth - 60);
  drag.win.y = Math.min(Math.max(e.clientY - drag.dy, 0), window.innerHeight - 90);
}
function endDrag() {
  drag = null;
  window.removeEventListener('pointermove', onDrag);
  window.removeEventListener('pointerup', endDrag);
}

function winStyle(win) {
  if (win.max) return { left: '0px', top: '0px', width: '100%', height: 'calc(100% - 52px)', zIndex: win.z };
  return { left: win.x + 'px', top: win.y + 'px', width: win.w + 'px', height: win.h + 'px', zIndex: win.z };
}

function onIconClick(id) {
  selectedIcon.value = id;
  openApp(id);
}

function shutDown() {
  startOpen.value = false;
  emit('close');
}

async function boot() {
  windows.splice(0);
  startOpen.value = false;
  selectedIcon.value = null;
  if (reduce) { booting.value = false; return; }
  booting.value = true;
  await nextTick();
  setTimeout(() => { booting.value = false; }, 1400);
}

watch(() => props.active, (on) => {
  if (on) {
    document.body.style.overflow = 'hidden';
    clockTimer = setInterval(() => { now.value = new Date(); }, 1000);
    boot();
  } else {
    document.body.style.overflow = '';
    if (clockTimer) { clearInterval(clockTimer); clockTimer = null; }
  }
});

onBeforeUnmount(() => {
  if (clockTimer) clearInterval(clockTimer);
  endDrag();
  document.body.style.overflow = '';
});
</script>

<template>
  <div class="os" :class="{ active }" aria-hidden="true">
    <!-- Boot splash -->
    <div v-if="booting" class="os-boot">
      <div class="os-logo">⊞</div>
      <div class="os-logo-name">benjaminOS</div>
      <div class="os-spinner"></div>
    </div>

    <template v-if="!booting">
      <!-- Desktop icons -->
      <div class="os-icons">
        <button
          v-for="id in desktopIcons"
          :key="id"
          class="os-icon"
          :class="{ selected: selectedIcon === id }"
          @click="onIconClick(id)"
        >
          <span class="os-icon-glyph">{{ APPS[id].icon }}</span>
          <span class="os-icon-label">{{ APPS[id].name }}</span>
        </button>
      </div>

      <!-- Windows -->
      <div
        v-for="win in windows"
        :key="win.id"
        v-show="!win.min"
        class="os-window"
        :class="{ max: win.max }"
        :style="winStyle(win)"
        @pointerdown="focus(win)"
      >
        <div class="os-titlebar" @pointerdown="startDrag($event, win)" @dblclick="toggleMax(win)">
          <span class="os-titlebar-icon">{{ win.icon }}</span>
          <span class="os-titlebar-name">{{ win.title }}</span>
          <div class="os-controls">
            <button class="ctrl min" @click.stop="win.min = true" aria-label="Minimize">─</button>
            <button class="ctrl max" @click.stop="toggleMax(win)" aria-label="Maximize">▢</button>
            <button class="ctrl close" @click.stop="closeWin(win)" aria-label="Close">✕</button>
          </div>
        </div>

        <div class="os-window-body">
          <!-- About -->
          <div v-if="win.app === 'about'" class="app-about">
            <img src="../assets/linkedin.jpeg" alt="Benjamin Liu" class="about-avatar" />
            <h2>Benjamin Liu</h2>
            <p class="about-role">Software Engineer · Montreal, QC</p>
            <p>Software Engineering @ Concordia (B.Eng, 2027). I build full-stack and mobile apps — and the occasional fire-seeking robot. Recently an R&amp;D intern at Genetec.</p>
            <p class="about-facts">🚴 152km rides · ☕ home barista · 🐠 aquascaping · 🎻 Level-8 violin</p>
          </div>

          <!-- Projects (file explorer) -->
          <div v-else-if="win.app === 'projects'" class="app-explorer">
            <div class="explorer-path">📁 This PC › Projects</div>
            <div class="explorer-grid">
              <button v-for="p in projects" :key="p.id" class="file" @click="openProject(p)" @dblclick="openProject(p)">
                <span class="file-glyph">📄</span>
                <span class="file-name">{{ p.name }}</span>
                <span class="file-meta">{{ p.cat }}</span>
              </button>
            </div>
            <div class="explorer-hint">open a project to see details</div>
          </div>

          <!-- Project detail -->
          <div v-else-if="win.app === 'project'" class="app-project">
            <div class="proj-image" :style="{ backgroundImage: `url('${win.project.image}')` }"></div>
            <div class="proj-body">
              <span class="proj-cat">{{ win.project.cat }}</span>
              <h2 class="proj-title">{{ win.project.name }}</h2>
              <p class="proj-desc">{{ win.project.desc }}</p>
              <div class="proj-tags">
                <span v-for="t in win.project.techs" :key="t" class="proj-tag">{{ t }}</span>
              </div>
              <div class="proj-actions">
                <button v-if="win.project.demoLink" class="proj-btn primary" @click="askOpen(win.project.demoLink)">▶ View Demo</button>
                <button v-if="win.project.codeLink" class="proj-btn" @click="askOpen(win.project.codeLink)">⌥ Source Code</button>
              </div>
            </div>
          </div>

          <!-- Experience -->
          <div v-else-if="win.app === 'experience'" class="app-list">
            <div v-for="job in experience" :key="job.role" class="list-row">
              <h3>{{ job.role }}</h3>
              <p class="row-org">{{ job.org }} · <span class="row-when">{{ job.when }}</span></p>
              <p class="row-note">{{ job.note }}</p>
            </div>
          </div>

          <!-- Education -->
          <div v-else-if="win.app === 'education'" class="app-list">
            <div v-for="e in education" :key="e.deg" class="list-row">
              <h3>{{ e.deg }}</h3>
              <p class="row-org">{{ e.org }} · <span class="row-when">{{ e.when }}</span></p>
              <p class="row-note">{{ e.note }}</p>
            </div>
          </div>

          <!-- Contact -->
          <div v-else-if="win.app === 'contact'" class="app-contact">
            <a href="mailto:liubenjamin8@gmail.com" class="contact-row">✉️ liubenjamin8@gmail.com</a>
            <button class="contact-row" @click="askOpen(socials.LinkedIn)">in LinkedIn — in/benjamin-sliu</button>
            <button class="contact-row" @click="askOpen(socials.GitHub)">⌥ GitHub — benjaminsunliu</button>
            <button class="contact-row" @click="askOpen(socials.Strava)">🚴 Strava</button>
            <p class="contact-loc">📍 Montreal, QC</p>
          </div>

          <!-- Terminal app -->
          <div v-else-if="win.app === 'terminal'" class="app-terminal">
            <Terminal embedded @close="closeWin(win)" @navigate="askOpen" />
          </div>

          <!-- Recycle Bin -->
          <div v-else-if="win.app === 'bin'" class="app-bin">
            <div class="bin-glyph">🗑️</div>
            <p>Empty.</p>
            <p class="bin-note">I don't throw away good ideas.</p>
          </div>
        </div>
      </div>

      <!-- Start menu -->
      <div v-if="startOpen" class="start-menu" @pointerdown.stop>
        <div class="start-head">benjaminOS</div>
        <div class="start-grid">
          <button v-for="id in startApps" :key="id" class="start-app" @click="openApp(id)">
            <span class="start-app-glyph">{{ APPS[id].icon }}</span>
            <span>{{ APPS[id].name }}</span>
          </button>
        </div>
        <div class="start-footer">
          <div class="start-user"><span class="start-user-av">BL</span> Benjamin Liu</div>
          <button class="start-power" @click="shutDown" title="Shut down — back to site">⏻ Shut down</button>
        </div>
      </div>

      <!-- Taskbar -->
      <div class="taskbar" @pointerdown.stop>
        <button class="start-btn" :class="{ on: startOpen }" @click="startOpen = !startOpen" aria-label="Start">
          <span class="start-logo">⊞</span>
        </button>
        <div class="taskbar-apps">
          <button
            v-for="win in windows"
            :key="win.id"
            class="task-item"
            :class="{ min: win.min }"
            @click="taskbarClick(win)"
          >
            <span>{{ win.icon }}</span>
            <span class="task-label">{{ win.title }}</span>
          </button>
        </div>
        <div class="tray">
          <span class="tray-icons">🔆 🔊 📶</span>
          <span class="tray-clock">
            <span>{{ time }}</span>
            <span class="tray-date">{{ date }}</span>
          </span>
        </div>
      </div>

      <!-- Confirm: open external link in a new tab -->
      <div v-if="confirmUrl" class="os-modal" @pointerdown.self="confirmNo">
        <div class="os-dialog">
          <div class="dialog-icon">🔗</div>
          <h3>Leave benjaminOS?</h3>
          <p>This will open an external link in a new browser tab:</p>
          <div class="dialog-url">{{ confirmUrl }}</div>
          <div class="dialog-actions">
            <button class="dialog-cancel" @click="confirmNo">Cancel</button>
            <button class="dialog-ok" @click="confirmYes">Open in new tab ↗</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.os {
  position: fixed;
  inset: 0;
  z-index: 60;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;
  overflow: hidden;
  background:
    radial-gradient(120% 90% at 75% 15%, rgba(124, 140, 255, 0.35), transparent 55%),
    radial-gradient(110% 90% at 20% 85%, rgba(79, 209, 224, 0.28), transparent 55%),
    linear-gradient(135deg, #0a0f24 0%, #0c1330 50%, #0a0e22 100%);
  font-family: 'Inter', sans-serif;
  user-select: none;
}
.os.active { opacity: 1; visibility: visible; }

/* Boot splash */
.os-boot {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
}
.os-logo { font-size: 4rem; color: #fff; filter: drop-shadow(0 0 24px rgba(124, 140, 255, 0.7)); }
.os-logo-name { font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; color: #fff; letter-spacing: 0.04em; }
.os-spinner {
  width: 34px; height: 34px; border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: var(--accent-2);
  animation: spin 0.9s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Desktop icons */
.os-icons {
  position: absolute;
  top: 18px; left: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.os-icon {
  width: 92px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 6px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;
  text-align: center;
}
.os-icon.selected { background: rgba(124, 140, 255, 0.22); border-color: rgba(124, 140, 255, 0.4); }
.os-icon:hover { background: rgba(255, 255, 255, 0.08); }
.os-icon-glyph { font-size: 1.9rem; filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4)); }
.os-icon-label { font-size: 0.72rem; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8); line-height: 1.2; }

/* Windows */
.os-window {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 280px;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(14, 19, 38, 0.78);
  backdrop-filter: blur(22px) saturate(150%);
  -webkit-backdrop-filter: blur(22px) saturate(150%);
  border: 1px solid var(--glass-border-strong);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.6);
  animation: win-open 0.18s cubic-bezier(0.22, 1, 0.36, 1);
  transform-origin: center center;
}
.os-window.max { border-radius: 0; }
@keyframes win-open { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }

.os-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 6px 0 12px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid var(--glass-border);
  cursor: grab;
  flex-shrink: 0;
}
.os-titlebar-icon { font-size: 0.9rem; }
.os-titlebar-name { flex: 1; font-size: 0.82rem; color: var(--text); font-weight: 500; }
.os-controls { display: flex; gap: 2px; }
.ctrl {
  width: 34px; height: 30px;
  border: none; background: transparent;
  color: var(--text-muted);
  font-size: 0.8rem; cursor: pointer; border-radius: 6px;
  display: grid; place-items: center;
}
.ctrl:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }
.ctrl.close:hover { background: #e81123; color: #fff; }

.os-window-body {
  flex: 1;
  overflow: auto;
  position: relative;
  color: var(--text);
}

/* App: About */
.app-about { padding: 1.6rem; text-align: center; }
.about-avatar { width: 92px; height: 92px; border-radius: 50%; object-fit: cover; border: 2px solid var(--accent); margin-bottom: 0.8rem; }
.app-about h2 { font-family: 'Space Grotesk', sans-serif; margin: 0; }
.about-role { color: var(--accent-2); font-family: 'JetBrains Mono', monospace; font-size: 0.82rem; margin: 0.2rem 0 1rem; }
.app-about p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin: 0 0 0.8rem; }
.about-facts { color: var(--text); font-size: 0.84rem; }

/* App: Explorer */
.app-explorer { display: flex; flex-direction: column; height: 100%; }
.explorer-path { padding: 0.6rem 1rem; font-size: 0.78rem; color: var(--text-muted); border-bottom: 1px solid var(--glass-border); font-family: 'JetBrains Mono', monospace; }
.explorer-grid { flex: 1; overflow: auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 6px; padding: 1rem; align-content: start; }
.file { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 12px 6px; background: transparent; border: 1px solid transparent; border-radius: 8px; cursor: pointer; color: var(--text); }
.file:hover { background: rgba(124, 140, 255, 0.16); border-color: rgba(124, 140, 255, 0.35); }
.file-glyph { font-size: 1.8rem; }
.file-name { font-size: 0.76rem; text-align: center; line-height: 1.2; }
.file-meta { font-size: 0.64rem; color: var(--text-dim); font-family: 'JetBrains Mono', monospace; }
.explorer-hint { padding: 0.5rem 1rem; font-size: 0.72rem; color: var(--text-dim); border-top: 1px solid var(--glass-border); }

/* App: lists */
.app-list { padding: 1.2rem 1.4rem; }
.list-row { padding: 0.8rem 0; border-bottom: 1px solid var(--glass-border); }
.list-row:last-child { border-bottom: none; }
.list-row h3 { font-size: 1rem; margin: 0 0 0.2rem; font-family: 'Space Grotesk', sans-serif; }
.row-org { color: var(--accent-2); font-size: 0.84rem; margin: 0 0 0.3rem; font-family: 'JetBrains Mono', monospace; }
.row-when { color: var(--text-dim); }
.row-note { color: var(--text-muted); font-size: 0.86rem; margin: 0; line-height: 1.5; }

/* App: contact */
.app-contact { padding: 1.4rem; display: flex; flex-direction: column; gap: 0.6rem; }
.contact-row { color: var(--text); text-decoration: none; padding: 0.7rem 0.9rem; border-radius: 9px; background: rgba(255, 255, 255, 0.04); border: 1px solid var(--glass-border); font-size: 0.88rem; transition: var(--transition); }
.contact-row:hover { border-color: var(--accent); color: #fff; }
.contact-loc { color: var(--text-muted); font-size: 0.84rem; margin: 0.3rem 0 0; }

/* App: project detail */
.app-project { display: flex; flex-direction: column; height: 100%; }
.proj-image { height: 190px; background-size: cover; background-position: center; flex-shrink: 0; border-bottom: 1px solid var(--glass-border); }
.proj-body { padding: 1.3rem 1.5rem 1.5rem; overflow: auto; }
.proj-cat { font-family: 'JetBrains Mono', monospace; font-size: 0.66rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent-2); }
.proj-title { font-family: 'Space Grotesk', sans-serif; font-size: 1.45rem; margin: 0.35rem 0 0.7rem; color: #fff; }
.proj-desc { color: var(--text-muted); font-size: 0.92rem; line-height: 1.65; margin: 0 0 1.1rem; }
.proj-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.4rem; }
.proj-tag { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; padding: 3px 9px; border-radius: 999px; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--glass-border); color: var(--text-muted); }
.proj-actions { display: flex; gap: 0.7rem; flex-wrap: wrap; }
.proj-btn { padding: 0.6rem 1.2rem; border-radius: 999px; border: 1px solid var(--glass-border-strong); background: transparent; color: var(--text); cursor: pointer; font-size: 0.85rem; font-weight: 500; transition: var(--transition); }
.proj-btn:hover { border-color: var(--accent-2); color: #fff; }
.proj-btn.primary { border: none; background: var(--grad-primary); color: #07101f; font-weight: 600; }
.proj-btn.primary:hover { box-shadow: 0 8px 24px rgba(124, 140, 255, 0.4); }

/* Confirm dialog */
.os-modal {
  position: absolute; inset: 0; z-index: 9500;
  display: flex; align-items: center; justify-content: center;
  background: rgba(4, 6, 15, 0.55);
  backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px);
  animation: fade-in 0.2s ease;
}
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
.os-dialog {
  width: min(440px, 90vw);
  padding: 1.6rem;
  border-radius: 16px;
  text-align: center;
  background: rgba(14, 19, 38, 0.96);
  border: 1px solid var(--glass-border-strong);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.6);
  animation: win-open 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}
.dialog-icon { font-size: 2.2rem; }
.os-dialog h3 { font-family: 'Space Grotesk', sans-serif; margin: 0.4rem 0 0.4rem; color: #fff; }
.os-dialog p { color: var(--text-muted); font-size: 0.88rem; margin: 0 0 0.8rem; }
.dialog-url {
  font-family: 'JetBrains Mono', monospace; font-size: 0.76rem; color: var(--accent-2);
  background: rgba(0, 0, 0, 0.3); border: 1px solid var(--glass-border);
  border-radius: 9px; padding: 0.6rem 0.8rem; margin-bottom: 1.2rem;
  word-break: break-all; max-height: 80px; overflow: auto;
}
.dialog-actions { display: flex; gap: 0.7rem; justify-content: center; }
.dialog-cancel { padding: 0.6rem 1.3rem; border-radius: 999px; border: 1px solid var(--glass-border-strong); background: transparent; color: var(--text); cursor: pointer; font-size: 0.86rem; }
.dialog-cancel:hover { border-color: var(--text-muted); }
.dialog-ok { padding: 0.6rem 1.3rem; border-radius: 999px; border: none; background: var(--grad-primary); color: #07101f; font-weight: 600; cursor: pointer; font-size: 0.86rem; }
.dialog-ok:hover { box-shadow: 0 8px 24px rgba(124, 140, 255, 0.4); }

/* App: terminal */
.app-terminal { position: absolute; inset: 0; }

/* App: bin */
.app-bin { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.3rem; }
.bin-glyph { font-size: 3rem; }
.app-bin p { margin: 0; color: var(--text-muted); }
.bin-note { font-size: 0.8rem; color: var(--text-dim); font-style: italic; }

/* Start menu */
.start-menu {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: min(440px, 92vw);
  border-radius: 14px;
  padding: 1.1rem;
  background: rgba(14, 19, 38, 0.9);
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  border: 1px solid var(--glass-border-strong);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.6);
  z-index: 9000;
  animation: start-open 0.2s ease;
}
@keyframes start-open {
  from { opacity: 0; transform: translateX(-50%) scale(0.94); }
  to { opacity: 1; transform: translateX(-50%) scale(1); }
}
.start-head { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.9rem; }
.start-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 1rem; }
.start-app { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 14px 6px; border-radius: 10px; background: transparent; border: 1px solid transparent; cursor: pointer; color: var(--text); font-size: 0.76rem; }
.start-app:hover { background: rgba(124, 140, 255, 0.16); border-color: rgba(124, 140, 255, 0.3); }
.start-app-glyph { font-size: 1.7rem; }
.start-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 0.9rem; border-top: 1px solid var(--glass-border); }
.start-user { display: flex; align-items: center; gap: 0.6rem; font-size: 0.86rem; color: var(--text); }
.start-user-av { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; font-size: 0.7rem; font-weight: 700; color: #07101f; background: var(--grad-primary); font-family: 'Space Grotesk', sans-serif; }
.start-power { background: transparent; border: 1px solid var(--glass-border); color: var(--text-muted); padding: 0.5rem 0.9rem; border-radius: 9px; cursor: pointer; font-size: 0.82rem; transition: var(--transition); }
.start-power:hover { border-color: var(--accent-pink); color: #fff; }

/* Taskbar */
.taskbar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 52px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  background: rgba(8, 12, 26, 0.72);
  backdrop-filter: blur(22px) saturate(150%);
  -webkit-backdrop-filter: blur(22px) saturate(150%);
  border-top: 1px solid var(--glass-border);
  z-index: 8000;
}
.start-btn { width: 42px; height: 38px; border-radius: 9px; border: none; background: transparent; cursor: pointer; display: grid; place-items: center; }
.start-btn:hover, .start-btn.on { background: rgba(124, 140, 255, 0.22); }
.start-logo { font-size: 1.3rem; color: var(--accent); }
.taskbar-apps { display: flex; gap: 4px; flex: 1; overflow: hidden; }
.task-item { display: flex; align-items: center; gap: 6px; max-width: 190px; padding: 0.4rem 0.7rem; border-radius: 8px; border: none; background: rgba(255, 255, 255, 0.05); color: var(--text); cursor: pointer; font-size: 0.78rem; border-bottom: 2px solid var(--accent); }
.task-item.min { border-bottom-color: transparent; opacity: 0.7; }
.task-item:hover { background: rgba(255, 255, 255, 0.12); }
.task-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tray { display: flex; align-items: center; gap: 0.8rem; padding-right: 0.4rem; }
.tray-icons { font-size: 0.8rem; }
.tray-clock { display: flex; flex-direction: column; align-items: flex-end; font-size: 0.74rem; color: var(--text); line-height: 1.25; font-variant-numeric: tabular-nums; }
.tray-date { color: var(--text-muted); font-size: 0.68rem; }

@media (max-width: 768px) {
  .os-window { min-width: 0; }
  .task-label { display: none; }
  .tray-icons { display: none; }
  .os-icons { gap: 2px; }
  .os-icon { width: 80px; }
}
</style>
