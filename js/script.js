/*
 * Client‑side interactivity for the portfolio.
 *
 * Handles navigation styling on scroll, mobile menu toggling,
 * and dynamic active link highlighting based on the current
 * viewport section. Keeping the script lean improves
 * performance and maintainability.
 */

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.querySelector('.menu');

  // Toggle navbar background on scroll
  const onScroll = () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Mobile menu toggle
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (menu.classList.contains('active')) {
        menu.classList.remove('active');
      }
    });
  });

  // Highlight navigation links as sections enter the viewport
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav .menu a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`nav .menu a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, {
    root: null,
    threshold: 0.5
  });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Fade‑up animation observer for glass cards
  const fadeElements = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.2
  });

  fadeElements.forEach(el => {
    fadeObserver.observe(el);
  });
});