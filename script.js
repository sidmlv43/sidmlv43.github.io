// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const body = document.documentElement;

// Default to dark theme; only use light if explicitly saved
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.setAttribute('data-theme', 'light');
  sunIcon.style.display = 'none';
  moonIcon.style.display = 'block';
} else {
  // Ensure dark is the explicit default
  body.removeAttribute('data-theme');
  localStorage.setItem('theme', 'dark');
  sunIcon.style.display = 'block';
  moonIcon.style.display = 'none';
}

themeToggle.addEventListener('click', () => {
  let theme = body.getAttribute('data-theme');
  if (theme === 'light') {
    body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
  renderGrid(); // Re-render grid colors
});

// Generate GitHub-style contribution grid
const grid = document.getElementById('contrib-grid');
const levels = [0,0,0,1,1,1,2,2,3,4];

function renderGrid() {
  grid.innerHTML = '';
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const colors = isLight ? {
    0: '#ebedf0',
    1: '#9be9a8',
    2: '#40c463',
    3: '#30a14e',
    4: '#216e39'
  } : {
    0: '#161b22',
    1: '#0e4429',
    2: '#006d32',
    3: '#26a641',
    4: '#39d353'
  };
  
  // 52 weeks × 7 days = 364 cells
  const total = 52 * 7;
  for (let i = 0; i < total; i++) {
    const cell = document.createElement('div');
    cell.className = 'contrib-cell';
    const lvl = levels[Math.floor(Math.random() * levels.length)];
    // More activity in recent weeks
    const recency = i / total;
    const boosted = recency > 0.7 ? Math.min(4, lvl + (Math.random() > 0.5 ? 1 : 0)) : lvl;
    cell.style.background = colors[boosted];
    cell.title = boosted > 0 ? boosted + ' contribution' + (boosted > 1 ? 's' : '') : 'No contributions';
    grid.appendChild(cell);
  }
}
renderGrid();

// Scroll-triggered fade-in for sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      e.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-block, .contact-card, .timeline-item, .strength-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  observer.observe(el);
});
