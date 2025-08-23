
// Load config
async function loadConfig() {
  const res = await fetch('site.config.json');
  const cfg = await res.json();

  // Populate social links
  const L = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.href = cfg.links[key];
  };
  L('link-linkedin', 'linkedin');
  L('link-github', 'github');
  L('link-youtube', 'youtube');
  L('btn-linkedin', 'linkedin');
  L('btn-github', 'github');
  L('btn-youtube', 'youtube');

  // Footer
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  const o = document.getElementById('owner'); if (o) o.textContent = cfg.name;

  // Contact mailto
  const mailto = document.getElementById('mailto-btn');
  if (mailto) mailto.href = `mailto:${cfg.email}?subject=Hello ${encodeURIComponent(cfg.name)}`;

  // Skills
  const skillsGrid = document.getElementById('skills-grid');
  if (skillsGrid && Array.isArray(cfg.skills)) {
    cfg.skills.forEach(s => {
      const div = document.createElement('div');
      div.className = 'skill';
      div.textContent = s;
      skillsGrid.appendChild(div);
    });
  }

  // Certificates
  const certGrid = document.getElementById('cert-grid');
  if (certGrid && Array.isArray(cfg.certificates)) {
    cfg.certificates.forEach(c => {
      const card = document.createElement('div');
      card.className = 'cert';
      const img = document.createElement('img');
      img.src = `assets/certificates/${c.file}`;
      img.alt = c.title;
      const cap = document.createElement('div');
      cap.className = 'cap';
      cap.textContent = c.title;
      card.appendChild(img);
      card.appendChild(cap);
      certGrid.appendChild(card);
    });
  }
}
loadConfig();

// Smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-in');
  const anchors = document.querySelectorAll('a[href$=".html"]');
  anchors.forEach(a => {
    a.addEventListener('click', (e) => {
      const url = a.getAttribute('href');
      if (!url) return;
      if (url.startsWith('http')) return;
      e.preventDefault();
      document.body.classList.remove('fade-in');
      document.body.classList.add('fade-out');
      setTimeout(() => { window.location.href = url; }, 180);
    });
  });
});

// Contact form (static demo + alert)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submission is disabled on this static demo. Connect Formspree or Netlify Forms (see README).');
  });
}
