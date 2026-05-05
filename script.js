// Lightweight interactivity for the clean, solid theme

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Subtle fade-in using Intersection Observer
const observerOptions = { threshold: 0.08, rootMargin: '0px 0px -80px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const selectors = ['.project-card', '.achievement-item', '.skill-tag', '.stat-card', '.education-item', '.contact-btn'];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('fade-in');
      el.style.animationDelay = `${i * 0.06}s`;
      observer.observe(el);
    });
  });
});

// Active nav link highlighting
window.addEventListener('scroll', () => {
  let current = '';
  document.querySelectorAll('section').forEach(section => {
    const top = section.offsetTop;
    if (pageYOffset >= top - 180) current = section.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    const isActive = link.getAttribute('href').slice(1) === current;
    link.classList.toggle('active', isActive);
    link.style.color = isActive ? 'var(--accent)' : 'var(--text-secondary)';
  });
});

// Gentle page load fade
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => { document.body.style.transition = 'opacity 0.35s ease-in'; }, 50);
  setTimeout(() => { document.body.style.opacity = '1'; }, 120);
});

// Preload images (simple)
function preloadImages() { document.querySelectorAll('img').forEach(i => new Image().src = i.src); }
preloadImages();

console.log('Gayathiri\'s portfolio — light and solid theme');
