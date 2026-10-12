/* =============================================
   NEXUSZONE GAMING CLUB — app.js
   ============================================= */

// ── PARTICLES ──────────────────────────────────
(function createParticles() {
  const container = document.getElementById('particles');
  const count = 60;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: ${Math.random() * 12}s;
      opacity: ${Math.random() * 0.6};
    `;
    // Alternate colors
    const colors = ['#00d4ff', '#e94560', '#533483', '#00ff88'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(p);
  }
})();

// ── NAVBAR SCROLL ──────────────────────────────
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    scrollTopBtn.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    scrollTopBtn.classList.remove('visible');
  }
  // Active nav link highlight
  highlightNavLink();
});

function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  links.forEach(l => {
    l.style.color = l.getAttribute('href') === '#' + current
      ? 'var(--primary)' : '';
  });
}

// ── HAMBURGER MENU ─────────────────────────────
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// ── SMOOTH SCROLL ──────────────────────────────
function scrollTo(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
}

// ── COUNTER ANIMATION ──────────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  });
}

// Trigger counters when hero is in view
const heroObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); heroObs.disconnect(); } });
}, { threshold: 0.3 });
heroObs.observe(document.querySelector('.hero-stats'));

// ── GAMES DATA ─────────────────────────────────
const games = [
  { name: 'Counter-Strike 2', tag: 'fps', icon: '🎯', genre: 'FPS Shooter', rating: 4.9, players: '1.2M' },
  { name: 'Valorant', tag: 'fps', icon: '⚡', genre: 'Tactical FPS', rating: 4.8, players: '980K' },
  { name: 'Dota 2', tag: 'moba', icon: '🧙', genre: 'MOBA', rating: 4.7, players: '750K' },
  { name: 'League of Legends', tag: 'moba', icon: '⚔️', genre: 'MOBA', rating: 4.6, players: '2.1M' },
  { name: 'PUBG', tag: 'battle', icon: '🪖', genre: 'Battle Royale', rating: 4.5, players: '600K' },
  { name: 'Fortnite', tag: 'battle', icon: '🏗️', genre: 'Battle Royale', rating: 4.4, players: '1.8M' },
  { name: 'FIFA 25', tag: 'sport', icon: '⚽', genre: 'Sport', rating: 4.6, players: '500K' },
  { name: 'Rocket League', tag: 'sport', icon: '🚀', genre: 'Sport', rating: 4.8, players: '450K' },
];

const gameBgs = [
  'linear-gradient(135deg,#1a1a3e,#e94560)',
  'linear-gradient(135deg,#0d1b2a,#ff6b6b)',
  'linear-gradient(135deg,#1a1a2e,#4a00e0)',
  'linear-gradient(135deg,#000428,#004e92)',
  'linear-gradient(135deg,#1e3c72,#2a5298)',
  'linear-gradient(135deg,#360033,#0b8793)',
  'linear-gradient(135deg,#0f2027,#2c5364)',
  'linear-gradient(135deg,#232526,#414345)',
];

function renderGames(filter = 'all') {
  const grid = document.getElementById('gamesGrid');
  const filtered = filter === 'all' ? games : games.filter(g => g.tag === filter);
  grid.innerHTML = filtered.map((g, i) => `
    <div class="game-card" onclick="showToast('${g.name} ishga tushirilmoqda...')">
      <div class="game-thumb" style="background:${gameBgs[i % gameBgs.length]}">
        <span style="position:relative;z-index:1;font-size:3.5rem">${g.icon}</span>
        <div class="game-tag">${g.tag.toUpperCase()}</div>
      </div>
      <div class="game-info">
        <h3>${g.name}</h3>
        <div class="game-meta">
          <span>${g.genre}</span>
          <span class="game-rating">★ ${g.rating}</span>
        </div>
        <div style="font-size:.8rem;color:var(--text-muted);margin-top:6px">
          <i class="fas fa-users" style="color:var(--accent)"></i> ${g.players} online
        </div>
      </div>
    </div>
  `).join('');
}

function filterGames(btn, filter) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const grid = document.getElementById('gamesGrid');
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(10px)';
  setTimeout(() => {
    renderGames(filter);
    grid.style.transition = 'all .4s';
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
  }, 200);
}

renderGames();

// ── TOURNAMENTS DATA ────────────────────────────
const tournaments = [
  {
    icon: '🎯',
    badge: 'open',
    badgeText: 'Ochiq',
    name: 'CS2 Pro League — Season 4',
    prize: '5,000,000 so\'m',
    date: '25 Oktyabr 2026',
    teams: '16/32',
    format: '5v5 bo\'yicha',
    joinable: true,
  },
  {
    icon: '⚡',
    badge: 'soon',
    badgeText: 'Tez kunda',
    name: 'Valorant Championship',
    prize: '3,000,000 so\'m',
    date: '1 Noyabr 2026',
    teams: '8/16',
    format: '5v5 bo\'yicha',
    joinable: true,
  },
  {
    icon: '🧙',
    badge: 'full',
    badgeText: 'To\'lib ketdi',
    name: 'Dota 2 Open Cup',
    prize: '4,500,000 so\'m',
    date: '15 Noyabr 2026',
    teams: '16/16',
    format: '5v5 bo\'yicha',
    joinable: false,
  },
  {
    icon: '⚽',
    badge: 'open',
    badgeText: 'Ochiq',
    name: 'FIFA 25 League',
    prize: '1,500,000 so\'m',
    date: '20 Oktyabr 2026',
    teams: '4/16',
    format: '1v1 bo\'yicha',
    joinable: true,
  },
];

function renderTournaments() {
  const grid = document.getElementById('tournamentsGrid');
  grid.innerHTML = tournaments.map(t => `
    <div class="tournament-card">
      <div class="t-header">
        <div class="t-icon">${t.icon}</div>
        <div class="t-badge ${t.badge}">${t.badgeText}</div>
        <h3>${t.name}</h3>
      </div>
      <div class="t-body">
        <div class="t-info">
          <div class="t-row"><span><i class="fas fa-calendar"></i> Sana</span><span>${t.date}</span></div>
          <div class="t-row"><span><i class="fas fa-users"></i> Jamoalar</span><span>${t.teams}</span></div>
          <div class="t-row"><span><i class="fas fa-gamepad"></i> Format</span><span>${t.format}</span></div>
        </div>
        <div class="t-prize"><i class="fas fa-trophy" style="color:#ffc107;margin-right:8px"></i>${t.prize}</div>
        <button class="t-join" ${t.joinable ? '' : 'disabled'}
          onclick="${t.joinable ? `joinTournament('${t.name}')` : ''}">
          ${t.joinable ? '<i class="fas fa-sign-in-alt"></i> Ro\'yxatdan o\'tish' : '<i class="fas fa-lock"></i> Joy yo\'q'}
        </button>
      </div>
    </div>
  `).join('');
}

renderTournaments();

function joinTournament(name) {
  showToast(`"${name}" turnirga qo'shilish uchun bron qilindi!`);
}

// ── PRICING TOGGLE ──────────────────────────────
function togglePricing() {
  const isMonthly = document.getElementById('pricingToggle').checked;
  document.querySelectorAll('.price-val').forEach(el => {
    el.textContent = isMonthly ? el.dataset.monthly : el.dataset.hourly;
  });
  document.querySelectorAll('.soat-text').forEach(el => {
    el.textContent = isMonthly ? 'so\'m/oy' : 'so\'m/soat';
  });
}

// ── MODAL ──────────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
// Close modal on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ── BOOKING CONFIRM ────────────────────────────
function confirmBooking(e) {
  e.preventDefault();
  closeModal('bookingModal');
  showToast('🎮 Bron muvaffaqiyatli! Siz bilan bog\'lanamiz.');
}

// ── CONTACT FORM ───────────────────────────────
function submitForm(e) {
  e.preventDefault();
  e.target.reset();
  showToast('✅ Xabaringiz yuborildi!');
}

// ── TOAST ──────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── SCROLL REVEAL ──────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Apply reveal animation to cards
function applyReveal() {
  const cards = document.querySelectorAll(
    '.game-card, .price-card, .tournament-card, .gal-item, .info-card'
  );
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity .5s ease ${i * 0.07}s, transform .5s ease ${i * 0.07}s`;
    revealObs.observe(card);
  });
}

// Wait for DOM-generated cards
setTimeout(applyReveal, 100);

// ── LIVE CLOCK IN HERO (optional accent) ───────
(function liveClock() {
  const scoreEl = document.querySelector('.score');
  if (!scoreEl) return;
  setInterval(() => {
    const xp = (12000 + Math.floor(Math.random() * 999)).toLocaleString();
    scoreEl.textContent = xp + ' XP';
  }, 2000);
})();

console.log('%c🎮 NexusZone Gaming Club', 'font-size:24px;color:#e94560;font-weight:bold');
console.log('%cSite muvaffaqiyatli yuklandi!', 'font-size:14px;color:#00d4ff');
