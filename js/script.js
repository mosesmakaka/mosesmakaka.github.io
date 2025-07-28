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

  /* -------------------------------------------------------------------------
   * Theme toggle
   *
   * Allow visitors to switch between light and dark themes. We store the
   * preference in localStorage so it persists across page loads. The
   * initial theme is determined by the saved preference or the user’s
   * operating system preference. The toggle button’s icon reflects the
   * current mode: a moon for light mode (click to go dark) and a sun
   * for dark mode (click to return to light). */
  // Handle theme toggling between light and dark modes. We look for a
  // button with id "theme-toggle". When present, we initialise the
  // current theme based on either a saved preference in localStorage or
  // the user’s OS preference. Clicking the button toggles the
  // ``dark`` class on the body and swaps the icon between a moon
  // (🌙) for light mode and a sun (☀️) for dark mode. See
  // ``css/style.css`` for dark mode overrides.
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let savedTheme = localStorage.getItem('theme');

    /**
     * Apply the given theme to the document.
     *
     * @param {('light'|'dark')} mode The theme to apply.
     */
    const applyTheme = (mode) => {
      if (mode === 'dark') {
        document.body.classList.add('dark');
        // Set a sun icon to indicate clicking will return to light mode
        themeToggle.innerText = '☀️';
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark');
        // Set a moon icon to indicate clicking will enable dark mode
        themeToggle.innerText = '🌙';
        localStorage.setItem('theme', 'light');
      }
    };

    // If no saved theme, default to the OS preference (dark or light)
    if (!savedTheme) {
      savedTheme = prefersDark ? 'dark' : 'light';
    }
    applyTheme(savedTheme);

    // Toggle between modes on button click
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  }
});