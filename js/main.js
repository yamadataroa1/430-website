'use strict';

/* ============================================================
   HERO SLIDER
============================================================ */
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.dot');
  let current  = 0;

  if (!slides.length) return;

  setInterval(() => {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }, 4000);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = i;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    });
  });
})();

/* ============================================================
   MOBILE MENU
============================================================ */
(function () {
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMenu);
  }

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ============================================================
   VISUAL — DRAG SCROLL
============================================================ */
(function () {
  const track = document.getElementById('visualTrack');
  if (!track) return;

  let isDown    = false;
  let startX    = 0;
  let scrollLeft = 0;

  track.addEventListener('mousedown', e => {
    isDown = true;
    track.classList.add('grabbing');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    e.preventDefault();
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('grabbing');
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('grabbing');
  });

  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
})();

/* ============================================================
   SCROLL FADE-IN (IntersectionObserver)
============================================================ */
(function () {
  const fadeEls = document.querySelectorAll('.fade-in');
  if (!fadeEls.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => observer.observe(el));
})();
