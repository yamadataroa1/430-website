'use strict';

// ============================================================
// HAMBURGER MENU
// ============================================================
(function () {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (!hamburger || !nav) return;

  function openMenu() {
    nav.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close when a nav link is tapped
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();

// ============================================================
// SCROLL FADE-IN (IntersectionObserver)
// ============================================================
(function () {
  const fadeEls = document.querySelectorAll('.fade-in');
  if (!fadeEls.length) return;

  // Stagger delay for product cards within the same grid
  document.querySelectorAll('.product-grid').forEach(grid => {
    grid.querySelectorAll('.product-card').forEach((card, i) => {
      card.style.transitionDelay = `${(i % 4) * 0.08}s`;
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -32px 0px'
  });

  fadeEls.forEach(el => observer.observe(el));
})();

// ============================================================
// SMOOTH ANCHOR SCROLL (offset for sticky header)
// ============================================================
(function () {
  const HEADER_H = 56;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_H;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
