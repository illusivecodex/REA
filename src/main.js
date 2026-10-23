import './style.css';
import * as THREE from 'three';

const chapters = [
  { id: 'arrival', number: '01', label: 'Illusive Studio', title: 'Ian Lester Eclevia — Digital Art Director & Frontend Developer.', body: 'A multidisciplinary creative operator based in Masinloc, Zambales, Philippines. Premium aesthetics, technical execution, and algorithmic strategy in one end-to-end production pipeline.', tags: ['ian lester', 'portfolio', 'masinloc', 'zambales', 'philippines', 'creative operator'], accent: 'amber' },
  { id: 'services', number: '02', label: 'Services', title: 'One studio for the whole creative pipeline.', body: 'Frontend engineering, UI / UX design, brand identity, digital art direction, high-retention video editing, editorial photography, and virtual assistance.', tags: ['services', 'ui ux', 'brand identity', 'video editing', 'photography', 'virtual assistance'], accent: 'blue' },
  { id: 'engineering', number: '03', label: 'Frontend Engineering', title: 'Production-grade interfaces built to move.', body: 'React, Vite, TypeScript, and Tailwind CSS for mobile-first, performance-tuned, Progressive Web App-ready experiences. Interface systems, design tokens, prototypes, and component libraries follow the same conversion-oriented logic.', tags: ['react', 'vite', 'typescript', 'tailwind css', 'pwa', 'conversion'], accent: 'rose' },
  { id: 'art-direction', number: '04', label: 'Art Direction', title: 'Timeless visual language with modern signal.', body: 'Logo systems, typography pairings, color systems, brand guidelines, advanced Photoshop compositing, digital painting, and AI-augmented Midjourney workflows.', tags: ['photoshop', 'midjourney', 'digital painting', 'typography', 'logo systems', 'brand'], accent: 'mint' },
  { id: 'production', number: '05', label: 'Production', title: 'Make the frame hold attention.', body: 'High-retention TikTok, Reels, and YouTube Shorts edits, live-event Same-Day Edits, commercial compositing, plus portrait, product, and editorial photography with full post-production.', tags: ['tiktok', 'reels', 'youtube shorts', 'sde', 'motion', 'vfx', 'lightroom'], accent: 'amber' },
  { id: 'stack', number: '06', label: 'Stack & Skills', title: 'A toolset measured in outcomes.', body: 'The stack spans React, TypeScript, Vite, Tailwind CSS, Framer Motion, GSAP, Three.js, Supabase, Vercel, Photoshop, Premiere Pro, Lightroom, Midjourney, and Canva Pro. Frontend development 90%, compositing 95%, motion 85%, photography 92%, UI/UX prototyping 88%.', tags: ['framer motion', 'gsap', 'three.js', 'supabase', 'vercel', 'premiere pro', 'canva pro', 'skills'], accent: 'blue' },
  { id: 'works', number: '07', label: 'Selected Works', title: 'Modular Creative Testing — a growth case study.', body: 'A growth marketing system using visual hooks as targeting filters, mapping colorways to audience segments, post-click landing pages, and campaign performance metrics across Graphic Design, UI/UX, Motion, and Photography.', tags: ['modular creative testing', 'growth marketing', 'meta ads', 'case study', 'graphic design', 'motion'], accent: 'rose' },
  { id: 'contact', number: '08', label: 'Contact', title: 'Let’s make the next thing useful and unforgettable.', body: 'Work fully remote with clients worldwide. Email yhanlhester@gmail.com or explore the code and experiments at github.com/BogartPagalpok.', tags: ['contact', 'hire', 'remote', 'worldwide', 'email', 'github', 'faq'], accent: 'mint' },
];

const themes = ['GUNDAM', 'EUCALYPTUS', 'AKIRA', 'TACTICAL', 'ALONE'];
const state = { query: '', selected: 0, paletteOpen: false, theme: localStorage.getItem('portfolio-theme') || 'AKIRA' };
const app = document.querySelector('#app');
let sceneRuntime;

function resultSet(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return chapters;
  return chapters
    .map((chapter) => {
      const haystack = [chapter.label, chapter.title, chapter.body, ...chapter.tags].join(' ').toLowerCase();
      const words = normalized.split(/\s+/).filter(Boolean);
      const score = words.reduce((total, word) => {
        if (chapter.label.toLowerCase().startsWith(word)) return total + 5;
        if (chapter.title.toLowerCase().includes(word)) return total + 4;
        if (chapter.tags.some((tag) => tag.includes(word))) return total + 3;
        if (haystack.includes(word)) return total + 1;
        return total;
      }, 0);
      return { chapter, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.chapter);
}

function render() {
  const results = resultSet(state.query);
  const activeId = results[state.selected]?.id;
  app.innerHTML = `
    <div class="shell theme-${state.theme.toLowerCase()} ${state.paletteOpen ? 'palette-is-open' : ''}">
      <div class="grain" aria-hidden="true"></div>
      <div class="orb orb-one" aria-hidden="true"></div>
      <div class="orb orb-two" aria-hidden="true"></div>
      <header class="topbar">
        <a class="brand" href="#arrival" aria-label="Illusive Studio home">ILLUSIVE<span>/</span>STUDIO</a>
        <nav class="topbar-nav" aria-label="Primary navigation"><a href="#services">Services</a><a href="#works">Works</a><a href="#arrival">About</a><a href="#contact">Contact</a></nav>
        <div class="topbar-status"><i></i> ${state.theme} / ready</div>
        <button class="theme-trigger" data-cycle-theme aria-label="Change visual theme">THEME <strong>${state.theme}</strong></button>
        <button class="palette-trigger" data-open-palette aria-label="Open search palette">
          <span>Search the signal</span><kbd>⌘ K</kbd>
        </button>
      </header>

      <main>
        <section class="hero chapter" id="arrival" data-accent="amber">
          <div class="hero-copy">
            <p class="eyebrow"><span class="cross">+</span> curated navigation study</p>
            <h1>Make the<br /><em>signal.</em></h1>
            <p class="lede">Illusive Studio bridges premium aesthetic design, technical execution, and algorithmic strategy without the hand-off friction.</p>
            <button class="hero-command" data-open-palette><span class="command-mark">/</span> Open the index <kbd>⌘ K</kbd></button>
          </div>
          <div class="hero-readout" aria-label="Index status">
            <div class="readout-line"><span>INDEXED</span><strong>08</strong></div>
            <div class="readout-line"><span>BASE</span><strong>PH / REMOTE</strong></div>
            <div class="readout-rule"></div>
            <p>Masinloc, Zambales<br />clients worldwide</p>
          </div>
          <div class="scroll-cue"><span></span> scroll / explore</div>
        </section>

        <section class="signal-map" aria-label="Chapter map">
          <div class="map-heading"><span>FIELD MAP</span><span>08 CHAPTERS</span></div>
          <div class="map-track">${chapters.map((chapter, index) => `<a href="#${chapter.id}" class="map-node ${index === 0 ? 'is-active' : ''}" data-map-node="${chapter.id}"><span>${chapter.number}</span><b>${chapter.label}</b></a>`).join('')}</div>
        </section>

        ${chapters.slice(1).map((chapter) => `
          <section class="chapter detail-chapter" id="${chapter.id === 'stack' ? 'about' : chapter.id}" data-accent="${chapter.accent}">
            <div class="chapter-index"><span>${chapter.number}</span><i></i><span>0${chapters.length}</span></div>
            <div class="chapter-body"><p class="eyebrow"><span class="cross">+</span> ${chapter.label.toLowerCase()}</p><h2>${chapter.title}</h2><p>${chapter.body}</p><div class="tag-row">${chapter.tags.map((tag) => `<span>#${tag}</span>`).join('')}</div></div>
            <div class="chapter-visual" aria-hidden="true"><span class="visual-ring ring-a"></span><span class="visual-ring ring-b"></span><span class="visual-core"></span><span class="visual-label">${chapter.number} / ${chapter.label.toUpperCase()}</span></div>
          </section>
        `).join('')}

        <section class="closing chapter" id="close">
          <div><p class="eyebrow"><span class="cross">+</span> end of transmission</p><h2>Keep the signal<br /><em>moving.</em></h2></div>
          <button class="outline-button" data-open-palette>Search again <span>↗</span></button>
        </section>
      </main>

      <footer class="footer"><span>ILLUSIVE / STUDIO — THE ILLUSIVE LAB</span><span>IAN LESTER ECLEVIA / 2026</span></footer>

      <div class="palette-backdrop" data-close-palette></div>
      <section class="palette" role="dialog" aria-modal="true" aria-labelledby="palette-title">
        <div class="palette-head"><div><p class="eyebrow"><span class="cross">+</span> illusive index</p><h2 id="palette-title">Search Illusive Studio</h2></div><button class="close-button" data-close-palette aria-label="Close search">Esc</button></div>
        <label class="search-box"><span>⌕</span><input id="search-input" type="search" value="${state.query}" placeholder="Try React, photography, or remote" autocomplete="off" /><kbd>ESC</kbd></label>
        <div class="result-meta"><span>${results.length} ${results.length === 1 ? 'match' : 'matches'}</span><span>↑ ↓ navigate · ↵ open</span></div>
        <div class="results" role="listbox" aria-label="Search results">
          ${results.length ? results.map((chapter, index) => `<button class="result ${chapter.id === activeId ? 'is-selected' : ''}" data-result="${chapter.id}" role="option" aria-selected="${chapter.id === activeId}"><span class="result-number">${chapter.number}</span><span class="result-copy"><strong>${chapter.label}</strong><small>${chapter.title}</small></span><span class="result-arrow">↗</span></button>`).join('') : '<p class="empty-state">No studio signal found. Try <b>React</b>, <b>motion</b>, or <b>remote</b>.</p>'}
        </div>
      </section>
    </div>
  `;
  bindEvents();
  requestAnimationFrame(observeChapters);
}

function openPalette() {
  state.paletteOpen = true;
  render();
  const input = document.querySelector('#search-input');
  input?.focus();
  input?.setSelectionRange(input.value.length, input.value.length);
}

function closePalette() {
  state.paletteOpen = false;
  render();
}

function jumpTo(id) {
  closePalette();
  requestAnimationFrame(() => document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}

function bindEvents() {
  document.querySelectorAll('[data-open-palette]').forEach((button) => button.addEventListener('click', openPalette));
  document.querySelectorAll('[data-close-palette]').forEach((button) => button.addEventListener('click', closePalette));
  document.querySelectorAll('[data-result]').forEach((button) => button.addEventListener('click', () => jumpTo(button.dataset.result)));
  document.querySelector('[data-cycle-theme]')?.addEventListener('click', () => {
    state.theme = themes[(themes.indexOf(state.theme) + 1) % themes.length];
    localStorage.setItem('portfolio-theme', state.theme);
    render();
    sceneRuntime?.updateTheme();
  });
  document.querySelectorAll('[data-map-node]').forEach((button) => button.addEventListener('click', (event) => {
    event.preventDefault();
    jumpTo(button.dataset.mapNode);
  }));
  document.querySelector('#search-input')?.addEventListener('input', (event) => {
    state.query = event.target.value;
    state.selected = 0;
    render();
    document.querySelector('#search-input')?.focus();
    document.querySelector('#search-input')?.setSelectionRange(state.query.length, state.query.length);
  });
}

function initScene() {
  const canvas = document.querySelector('#stage');
  if (!canvas || sceneRuntime) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.2, 8);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const world = new THREE.Group();
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(900 * 3);
  for (let index = 0; index < starPositions.length; index += 3) {
    const radius = 2.2 + Math.random() * 5.6;
    const theta = Math.random() * Math.PI * 2;
    const height = (Math.random() - 0.5) * 3.8;
    starPositions[index] = Math.cos(theta) * radius;
    starPositions[index + 1] = height;
    starPositions[index + 2] = Math.sin(theta) * radius - 1.5;
  }
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0x738092, size: 0.018, transparent: true, opacity: 0.72 }));
  world.add(stars);

  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.86, 2), new THREE.MeshBasicMaterial({ color: 0xf3af61, wireframe: true, transparent: true, opacity: 0.52 }));
  const innerCore = new THREE.Mesh(new THREE.SphereGeometry(0.28, 32, 32), new THREE.MeshBasicMaterial({ color: 0xf3af61, transparent: true, opacity: 0.8 }));
  world.add(core, innerCore);

  const rings = [1.25, 1.7, 2.2].map((radius, index) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, index === 1 ? 0.008 : 0.014, 8, 128), new THREE.MeshBasicMaterial({ color: index === 1 ? 0x7288b8 : 0xf3af61, transparent: true, opacity: index === 1 ? 0.35 : 0.48 }));
    ring.rotation.set(index * 0.5, index * 0.7, index * 0.35);
    world.add(ring);
    return ring;
  });
  scene.add(world);

  const pointer = { x: 0, y: 0, progress: 0, targetProgress: 0 };
  const updateTheme = () => {
    const shell = document.querySelector('.shell');
    if (!shell) return;
    const styles = getComputedStyle(shell);
    const accent = new THREE.Color(styles.getPropertyValue('--amber').trim() || '#f3af61');
    const paper = new THREE.Color(styles.getPropertyValue('--paper').trim() || '#e9ecef');
    core.material.color.copy(paper);
    innerCore.material.color.copy(accent);
    rings.forEach((ring, index) => ring.material.color.copy(index === 1 ? paper : accent));
  };
  const onScroll = () => { pointer.targetProgress = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight); };
  const onPointer = (event) => { pointer.x = (event.clientX / window.innerWidth - 0.5) * 2; pointer.y = (event.clientY / window.innerHeight - 0.5) * 2; };
  const onResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('resize', onResize);
  updateTheme();

  const clock = new THREE.Clock();
  const tick = () => {
    const elapsed = clock.getElapsedTime();
    pointer.progress += (pointer.targetProgress - pointer.progress) * 0.06;
    world.rotation.y = elapsed * 0.045 + pointer.x * 0.08;
    world.rotation.x = pointer.y * 0.035;
    core.rotation.x = elapsed * 0.18 + pointer.progress * 1.4;
    core.rotation.y = elapsed * 0.23;
    innerCore.scale.setScalar(1 + Math.sin(elapsed * 2.2) * 0.12 + pointer.progress * 0.08);
    rings.forEach((ring, index) => { ring.rotation.z += 0.0015 * (index + 1); ring.rotation.x += 0.0007 * (index + 1); });
    stars.rotation.y = elapsed * 0.008 + pointer.progress * 0.7;
    camera.position.x += ((pointer.x * 0.38) - camera.position.x) * 0.025;
    camera.position.y += ((-pointer.y * 0.24 + Math.sin(pointer.progress * Math.PI * 2) * 0.25) - camera.position.y) * 0.025;
    camera.position.z = 8 - pointer.progress * 1.8;
    camera.lookAt(0, 0, -1.2);
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };
  sceneRuntime = { updateTheme };
  tick();
}

document.addEventListener('keydown', (event) => {
  const commandKey = event.metaKey || event.ctrlKey;
  if (commandKey && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    state.paletteOpen ? closePalette() : openPalette();
    return;
  }
  if (event.key === 'Escape' && state.paletteOpen) closePalette();
  if (!state.paletteOpen) return;
  const results = resultSet(state.query);
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    state.selected = Math.min(state.selected + 1, Math.max(0, results.length - 1));
    render();
    document.querySelector('#search-input')?.focus();
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    state.selected = Math.max(state.selected - 1, 0);
    render();
    document.querySelector('#search-input')?.focus();
  }
  if (event.key === 'Enter' && results[state.selected]) jumpTo(results[state.selected].id);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.chapter').forEach((chapter) => chapter.classList.toggle('is-active', chapter === entry.target));
    document.querySelectorAll('[data-map-node]').forEach((node) => node.classList.toggle('is-active', node.dataset.mapNode === entry.target.id));
  });
}, { rootMargin: '-35% 0px -55% 0px' });

function observeChapters() {
  document.querySelectorAll('.chapter').forEach((chapter) => observer.observe(chapter));
}

render();
initScene();
observeChapters();
