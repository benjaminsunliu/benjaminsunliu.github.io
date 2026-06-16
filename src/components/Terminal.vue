<script setup>
// Interactive terminal — a real working shell unlocked by the Konami code.
// Visitors type commands (help, whoami, ls, cat, open, skills, …) to explore
// the portfolio. Command history, tab-completion, typed boot banner, eggs.
import { ref, nextTick, watch, onMounted } from 'vue';

const props = defineProps({
  active: { type: Boolean, default: false },
  embedded: { type: Boolean, default: false },
});
const emit = defineEmits(['close', 'navigate']);

// Open a URL: route through the OS browser when embedded, else a new tab.
function go(url) {
  if (props.embedded) emit('navigate', url);
  else window.open(url, '_blank', 'noopener');
}

const lines = ref([]);
const input = ref('');
const history = ref([]);
const histIdx = ref(-1);
const booting = ref(false);
const inputEl = ref(null);
const bodyEl = ref(null);
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const PROMPT =
  '<span class="p-user">benjamin</span><span class="p-d">@</span><span class="p-host">portfolio</span>' +
  '<span class="p-d">:</span><span class="p-path">~</span><span class="p-d">$</span>';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- Data ----
const projects = {
  echobrief: { name: 'EchoBrief', cat: 'AI · McHacks 12', desc: 'Live meeting transcription + AI summaries (action items, key points).', tech: 'React · OpenAI · SSE · GCP', link: 'https://devpost.com/software/echobrief' },
  firetruck: { name: 'Autonomous Firetruck', cat: 'Robotics', desc: 'Arduino firetruck that detects and drives toward flames. Award-winning integration project.', tech: 'Arduino · Sensors · Algorithms', link: 'https://www.youtube.com/watch?v=l2Vn9u5bldI' },
  terraquest: { name: 'TerraQuest', cat: 'AI · 3D', desc: 'Interactive learning game with AI-driven outcomes and 3D scenes.', tech: 'Three.js · React · OpenAI', link: 'https://devpost.com/software/terraquest' },
  seascooper: { name: 'SeaScooper', cat: 'Robotics · 2nd place', desc: 'Marine-pollution prototype + business proposal aligned with UN SDGs.', tech: 'Arduino · Sensors', link: 'https://www.youtube.com/watch?v=kaa7bNEnGvk' },
  patrouille: { name: 'Patrouille Verte', cat: 'Mobile', desc: 'React Native app that cut data-entry time 30%+ for an eco-org.', tech: 'React Native · Azure · Google API', link: 'https://www.youtube.com/watch?v=x52XStoTfi8' },
  ratemychillmates: { name: 'RateMyChillmates', cat: 'Web', desc: 'Peer-evaluation platform for student group work.', tech: 'React · Node · MongoDB · CI/CD', link: 'https://github.com/benjaminsunliu/RateMyChillmates' },
  art: { name: 'Art Advisory System', cat: 'OOD', desc: 'Consulting platform for art-advisory institutions.', tech: 'Java · JPA · Hibernate · Design Patterns', link: 'https://youtu.be/xoJy-J2NHyk' },
  codepaws: { name: 'CodePaws', cat: 'Web', desc: 'Pet-adoption platform with auth and sessions.', tech: 'JavaScript · Node · Cookies', link: 'https://codepaws.onrender.com/' },
};

const skills = [
  ['JavaScript', 9], ['React', 9], ['TypeScript', 8], ['Node.js', 8],
  ['C# / .NET', 7], ['Java', 7], ['React Native', 7], ['Python', 6],
  ['Azure', 6], ['SQL', 6], ['Three.js', 5], ['Git', 8],
];

const socials = {
  github: 'https://github.com/benjaminsunliu',
  linkedin: 'https://www.linkedin.com/in/benjamin-sliu/',
  youtube: 'https://www.youtube.com/@benjaminsliu/featured',
  strava: 'https://www.strava.com/athletes/44787997',
  garden: 'https://bensliu.ca/ObsiQuartz/',
};

const a = (href, text) => `<a href="${href}" target="_blank" rel="noopener">${text || href} ↗</a>`;

// ---- Commands ----
const COMMANDS = {
  help: () => [
    'Available commands:',
    '  <c>about</c>       who I am',
    '  <c>whoami</c>      the one-liner',
    '  <c>projects</c>    list everything I\'ve built   (alias: ls)',
    '  <c>open</c> &lt;name&gt;  launch a project demo         e.g. open echobrief',
    '  <c>cat</c> &lt;name&gt;   read a section   (experience, education, contact)',
    '  <c>skills</c>      skill levels                  (try: skills --top)',
    '  <c>experience</c>  work history',
    '  <c>education</c>   school &amp; certs',
    '  <c>hobbies</c>     life outside code',
    '  <c>contact</c>     how to reach me',
    '  <c>socials</c>     all my links',
    '  <c>clear</c>       clear the screen',
    '  <c>exit</c>        back to the normal site',
    '',
    "tip: <c>Tab</c> completes · <c>↑/↓</c> history · there may be a few secrets 🤫",
  ],
  about: () => [
    "<h>Benjamin Liu</h> — Software Engineer",
    'Software Engineering @ Concordia University (B.Eng, 2027).',
    'I build full-stack apps, mobile apps, and the occasional fire-seeking robot.',
    'Recently: R&D intern at Genetec on AutoVu (ALPR) systems.',
    'Off-screen I chase the same precision: 152km bike rides, espresso, planted',
    'aquariums, and Level-8 RCM violin.',
    '',
    `type <c>projects</c> to see my work, or <c>contact</c> to reach me.`,
  ],
  whoami: () => ['Benjamin Liu — Software Engineer @ Concordia · Montreal, QC 🇨🇦'],
  projects: () => {
    const out = ['<h>Projects</h>  (run <c>open &lt;name&gt;</c> to launch)'];
    for (const [k, p] of Object.entries(projects)) {
      out.push(`  <c>${k.padEnd(16)}</c> ${p.name} — <dim>${p.cat}</dim>`);
    }
    return out;
  },
  ls: (args) => COMMANDS.projects(args),
  open: (args) => {
    const key = (args[0] || '').toLowerCase().replace(/\/$/, '');
    if (!key) return ['<e>usage:</e> open &lt;name&gt;   (try: open echobrief)'];
    if (projects[key]) { go(projects[key].link); return [`→ launching <c>${projects[key].name}</c> … ${a(projects[key].link, 'link')}`]; }
    if (socials[key]) { go(socials[key]); return [`→ opening <c>${key}</c> … ${a(socials[key], 'link')}`]; }
    return [`<e>not found:</e> ${esc(key)} — type <c>projects</c> for the list`];
  },
  cat: (args) => {
    const f = (args[0] || '').toLowerCase().replace(/\.txt$/, '');
    if (['experience', 'work'].includes(f)) return COMMANDS.experience();
    if (['education', 'edu', 'school'].includes(f)) return COMMANDS.education();
    if (['contact', 'contact.txt'].includes(f)) return COMMANDS.contact();
    if (['about', 'about.txt', 'readme'].includes(f)) return COMMANDS.about();
    if (['skills'].includes(f)) return COMMANDS.skills([]);
    if (projects[f]) { const p = projects[f]; return [`<h>${p.name}</h> — <dim>${p.cat}</dim>`, p.desc, `<dim>stack:</dim> ${p.tech}`, a(p.link, 'open demo')]; }
    if (!f) return ['<e>usage:</e> cat &lt;name&gt;   (experience, education, contact, about)'];
    return [`<e>cat:</e> ${esc(f)}: no such file`];
  },
  skills: (args) => {
    const top = args.includes('--top');
    const list = top ? skills.slice(0, 6) : skills;
    const out = [top ? '<h>Top skills</h>' : '<h>Skills</h>'];
    for (const [name, lvl] of list) {
      const bar = '█'.repeat(lvl) + '░'.repeat(10 - lvl);
      out.push(`  ${name.padEnd(14)} <c>${bar}</c>`);
    }
    return out;
  },
  experience: () => [
    '<h>Work Experience</h>',
    '<c>Genetec Inc.</c> — Software Developer R&D Intern  <dim>(Sep–Dec 2025)</dim>',
    '  AutoVu Sharp / ALPR · C# · ASP.NET · React · Azure',
    '<c>Regroupement des éco-quartiers</c> — Developer  <dim>(2023–present)</dim>',
    '  Built & pitched a React Native app; +30% data-entry efficiency',
    '<c>Warehouse Group</c> — Kitchen Staff  <dim>(Summer 2022)</dim>',
    '  High-volume teamwork under pressure',
  ],
  education: () => [
    '<h>Education</h>',
    '<c>Concordia University</c> — B.Eng, Software Engineering <dim>(2023–2027)</dim>',
    "  GPA 3.77 · Dean's List 2024, 2025 · hackathons galore",
    '<c>Collège Jean-de-Brébeuf</c> — DEC, Pure & Applied Sciences <dim>(2021–2023)</dim>',
    '  1st place — Best Integration Project (the firetruck 🚒)',
    '<dim>certs:</dim> AI/ML & DevOps Foundations · RCM Level 8 Violin & Theory',
  ],
  hobbies: () => [
    '<h>Off the clock</h>',
    '  🚴 Cycling — longest ride 152km along the lakeshore',
    '  ☕ Home barista — espresso, grind-dialing, latte art',
    '  🐠 Aquascaping — planted tanks, CO₂, water chemistry',
    '  🎻 Violin & piano — Level 8 RCM, orchestra & recitals',
    '',
    `psst — type <c>coffee</c> ☕`,
  ],
  contact: () => [
    '<h>Get in touch</h>',
    `  email     ${a('mailto:liubenjamin8@gmail.com', 'liubenjamin8@gmail.com')}`,
    '  location  Montreal, QC',
    `  linkedin  ${a(socials.linkedin, 'in/benjamin-sliu')}`,
    `  github    ${a(socials.github, 'benjaminsunliu')}`,
  ],
  socials: () => [
    '<h>Links</h>',
    `  github    ${a(socials.github)}`,
    `  linkedin  ${a(socials.linkedin)}`,
    `  youtube   ${a(socials.youtube)}`,
    `  strava    ${a(socials.strava)}`,
    `  garden    ${a(socials.garden)}`,
  ],
  links: () => COMMANDS.socials(),
  strava: () => ['🚴 152km longest ride · always chasing the next one.', a(socials.strava, 'follow on Strava')],
  echo: (args) => [esc(args.join(' '))],
  date: () => [new Date().toString()],
  pwd: () => ['/home/benjamin/portfolio'],
  banner: () => BANNER,
  // ---- eggs ----
  sudo: () => ['<e>[sudo]</e> password for visitor: ', 'Permission denied. Nice try though 😏'],
  coffee: () => ['  ( (', '   ) )', ' ........', ' |      |]', ' \\      /', "  `----'", '☕ brewing a double shot… ask me about my setup in <c>hobbies</c>'],
  vim: () => ["You opened vim. You live here now. (jk — type anything to continue)"],
  hack: () => ['<c>initiating breach…</c>', 'ACCESS GRANTED ✓ … just kidding. But the Konami code did work, didn\'t it?'],
  ls_secret: () => [],
};

const BANNER = [
  '<g> ____  _    </g>',
  '<g>| __ )| |   </g>  <h>benjaminOS</h> <dim>v2.0</dim>',
  '<g>|  _ \\| |   </g>  Software Engineer · Montreal',
  '<g>| |_) | |___</g>',
  '<g>|____/|_____|</g>  <dim>boot complete.</dim>',
];

function render(html) {
  // map simple tags to spans
  return html
    .replace(/<c>/g, '<span class="t-cmd">').replace(/<\/c>/g, '</span>')
    .replace(/<h>/g, '<span class="t-head">').replace(/<\/h>/g, '</span>')
    .replace(/<g>/g, '<span class="t-logo">').replace(/<\/g>/g, '</span>')
    .replace(/<dim>/g, '<span class="t-dim">').replace(/<\/dim>/g, '</span>')
    .replace(/<e>/g, '<span class="t-err">').replace(/<\/e>/g, '</span>');
}

async function scrollBottom() {
  await nextTick();
  if (bodyEl.value) bodyEl.value.scrollTop = bodyEl.value.scrollHeight;
}

function pushLines(arr) {
  for (const l of arr) lines.value.push(render(l));
  if (lines.value.length > 600) lines.value = lines.value.slice(-600);
}

function runCommand(raw) {
  const trimmed = raw.trim();
  lines.value.push(`${render(PROMPT)} ${esc(raw)}`);
  if (!trimmed) { scrollBottom(); return; }
  history.value.push(trimmed);
  histIdx.value = history.value.length;

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (cmd === 'clear' || cmd === 'cls') { lines.value = []; scrollBottom(); return; }
  if (['exit', 'quit', 'logout', 'gui'].includes(cmd)) { emit('close'); return; }

  const fn = COMMANDS[cmd];
  if (fn) pushLines(fn(args));
  else if (trimmed.startsWith('rm -rf')) pushLines(['Whoa — I worked hard on this. Request politely denied 🙃']);
  else pushLines([`<e>command not found:</e> ${esc(cmd)} — type <c>help</c>`]);
  scrollBottom();
}

function onKey(e) {
  if (booting.value) { e.preventDefault(); return; }
  if (e.key === 'Enter') {
    runCommand(input.value);
    input.value = '';
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (history.value.length && histIdx.value > 0) { histIdx.value--; input.value = history.value[histIdx.value]; }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (histIdx.value < history.value.length - 1) { histIdx.value++; input.value = history.value[histIdx.value]; }
    else { histIdx.value = history.value.length; input.value = ''; }
  } else if (e.key === 'Tab') {
    e.preventDefault();
    autocomplete();
  } else if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
    e.preventDefault();
    lines.value = [];
  } else if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
    lines.value.push(`${render(PROMPT)} ${esc(input.value)}^C`);
    input.value = '';
    scrollBottom();
  }
}

function autocomplete() {
  const parts = input.value.split(/\s+/);
  if (parts.length <= 1) {
    const names = Object.keys(COMMANDS).filter((c) => !c.includes('_')).concat(['clear', 'exit']);
    const m = names.filter((c) => c.startsWith(parts[0]));
    if (m.length === 1) input.value = m[0] + ' ';
    else if (m.length > 1) { pushLines([m.join('   ')]); scrollBottom(); }
  } else {
    const base = parts[0].toLowerCase();
    const pool = base === 'open' ? Object.keys({ ...projects, ...socials })
      : base === 'cat' ? [...Object.keys(projects), 'experience', 'education', 'contact', 'about', 'skills'] : [];
    const frag = parts[parts.length - 1].toLowerCase();
    const m = pool.filter((c) => c.startsWith(frag));
    if (m.length === 1) { parts[parts.length - 1] = m[0]; input.value = parts.join(' '); }
    else if (m.length > 1) { pushLines([m.join('   ')]); scrollBottom(); }
  }
}

function focusInput() { if (inputEl.value) inputEl.value.focus(); }
function onBodyClick(e) {
  const link = e.target.closest('a');
  if (link) {
    const href = link.getAttribute('href') || '';
    // When embedded in the OS, http(s) links open in the in-OS browser.
    if (props.embedded && /^https?:\/\//i.test(href)) { e.preventDefault(); emit('navigate', href); }
    return;
  }
  focusInput();
}

async function boot() {
  booting.value = true;
  lines.value = [];
  input.value = '';
  history.value = [];
  pushLines(BANNER);
  pushLines(['']);
  const tag = "Welcome. Type 'help' to explore · 'exit' to return to the site.";
  if (reduce) {
    pushLines([`<span class="t-dim">${esc(tag)}</span>`]);
  } else {
    const idx = lines.value.length;
    lines.value.push('');
    let acc = '';
    for (const ch of tag) { acc += ch; lines.value[idx] = `<span class="t-dim">${esc(acc)}</span>`; await scrollBottom(); await sleep(16); }
  }
  booting.value = false;
  await nextTick();
  focusInput();
}

watch(() => props.active, (on) => { if (on) boot(); });
onMounted(() => { if (props.embedded) boot(); });
</script>

<template>
  <div class="terminal" :class="{ active: active || embedded, embedded }" aria-hidden="true">
    <div class="term-window" @click="onBodyClick">
      <div class="term-bar" v-if="!embedded">
        <span class="dot red" @click.stop="emit('close')" title="close"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="term-title">benjamin@portfolio — zsh</span>
        <button class="term-x" @click.stop="emit('close')" aria-label="Close terminal">esc ✕</button>
      </div>
      <div class="term-body" ref="bodyEl">
        <div v-for="(l, i) in lines" :key="i" class="term-line" v-html="l"></div>
        <div class="prompt-line" v-show="!booting">
          <span class="prompt" v-html="render(PROMPT)"></span>
          <span class="cmd">{{ input }}<span class="cursor">▋</span></span>
          <input
            ref="inputEl"
            v-model="input"
            class="real-input"
            type="text"
            autocomplete="off"
            autocapitalize="off"
            autocorrect="off"
            spellcheck="false"
            @keydown="onKey"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.terminal {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(0px, 3vw, 2.5rem);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.45s ease, visibility 0.45s ease;
}

.terminal.active { opacity: 1; visibility: visible; }

/* Embedded mode: fills its parent (an OS window), no overlay / title bar */
.terminal.embedded {
  position: absolute;
  inset: 0;
  z-index: auto;
  padding: 0;
  opacity: 1;
  visibility: visible;
}
.terminal.embedded .term-window {
  width: 100%;
  height: 100%;
  border-radius: 0;
  border: none;
  box-shadow: none;
  background: rgba(8, 12, 26, 0.55);
  transform: none;
}

.term-window {
  width: min(960px, 100%);
  height: min(640px, 100%);
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(8, 12, 26, 0.82);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid var(--glass-border-strong);
  box-shadow: 0 40px 120px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(124, 140, 255, 0.1);
  transform: translateY(18px) scale(0.99);
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.terminal.active .term-window { transform: none; }

.term-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 0.9rem;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid var(--glass-border);
  flex-shrink: 0;
}

.dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
.dot.red { background: #ff5f57; cursor: pointer; }
.dot.yellow { background: #febc2e; }
.dot.green { background: #28c840; }

.term-title {
  flex: 1;
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: var(--text-dim);
}

.term-x {
  background: none;
  border: 1px solid var(--glass-border);
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  padding: 0.25rem 0.6rem;
  border-radius: 7px;
  cursor: pointer;
  transition: var(--transition);
}
.term-x:hover { border-color: var(--accent-pink); color: #fff; }

.term-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.1rem 1.25rem 1.4rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.86rem;
  line-height: 1.65;
  color: var(--text);
}

.term-line { white-space: pre-wrap; word-break: break-word; }

.prompt-line {
  position: relative;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
}

.prompt { white-space: pre; }

.cmd { white-space: pre-wrap; word-break: break-word; }

.cursor {
  display: inline-block;
  color: var(--accent-2);
  animation: blink 1.05s steps(1) infinite;
  margin-left: 1px;
}
@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }

.real-input {
  position: absolute;
  inset: 0;
  width: 100%;
  opacity: 0;
  border: none;
  background: transparent;
  font: inherit;
  color: transparent;
  caret-color: transparent;
  outline: none;
}

/* token colors (deep selectors since content is injected via v-html) */
.term-body :deep(.p-user) { color: var(--accent-2); }
.term-body :deep(.p-host) { color: var(--accent); }
.term-body :deep(.p-path) { color: #6ee7ff; }
.term-body :deep(.p-d) { color: var(--text-dim); }
.term-body :deep(.t-cmd) { color: var(--accent-2); }
.term-body :deep(.t-head) { color: #fff; font-weight: 600; }
.term-body :deep(.t-logo) { color: var(--accent); }
.term-body :deep(.t-dim) { color: var(--text-dim); }
.term-body :deep(.t-err) { color: var(--accent-pink); }
.term-body :deep(a) { color: var(--accent-2); text-decoration: underline; text-underline-offset: 2px; }
.term-body :deep(a:hover) { color: #fff; }

@media (max-width: 768px) {
  .terminal { padding: 0; }
  .term-window { width: 100%; height: 100%; border-radius: 0; }
  .term-body { font-size: 0.8rem; }
}
</style>
