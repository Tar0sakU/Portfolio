/* 
   Handles: FR/EN translation, smooth scroll, mobile nav, reveal
*/

document.addEventListener('DOMContentLoaded', function () {

  /* 
     1. TRANSLATIONS (English only – French is the HTML default)
      */
  const translations = {
    // Nav
    navAbout:       'About',
    navSkills:      'Skills',
    navProjects:    'Projects',
    navContact:     'Contact',

    // Hero
    heroGreeting:    'Hi, I\'m',
    heroSubtitle:    'Student at <strong>Epitech</strong> — looking for an apprenticeship',
    heroDescription: 'Passionate about web and software development, I craft modern, high-performance and elegant solutions.',
    heroCTA:         'View my projects',
    heroContact:     'Contact me',
    heroScroll:      'Scroll down',

    // About
    aboutTitle:      'About me',
    aboutP1:         'I\'m Philippe, a computer science student at <strong>Epitech</strong>. Curious and determined, I train every day in modern web and software development technologies.',
    aboutP2:         'I\'m currently seeking an <strong>apprenticeship</strong> that will let me put my technical skills into practice while continuing to learn within a passionate team.',
    aboutP3:         'My goal: contribute to ambitious projects, write clean code, and create memorable user experiences.',
    aboutYears:      'Years of study',
    aboutProjects:   'Completed projects',
    aboutMotivation: 'Motivation',

    // Skills
    skillsTitle:     'Skills',
    skillFront:      'Front-End',
    skillBack:       'Back-End',
    skillTools:      'Tools &amp; Methods',
    skillAgile:      'Agile Methods',

    // Projects
    projectsTitle:   'Projects',
    project1Name:    'CLI Task Manager',
    project1Desc:    'Command-line tool for managing tasks with SQLite persistence, import/export and unit tests.',
    project2Name:    'Weather Dashboard',
    project2Desc:    'Web application displaying real-time weather forecasts with geolocation and interactive charts.',
    project3Name:    'Mini Unix Shell',
    project3Desc:    'Unix shell replica built in C, handling pipes, redirections and background processes.',
    project4Name:    'Personal Portfolio',
    project4Desc:    'This portfolio you\'re currently viewing, built with vanilla HTML, CSS and JavaScript with bilingual support.',

    // Contact
    contactTitle:    'Contact',
    contactIntro:    'Have an apprenticeship opportunity or just want to chat? Don\'t hesitate to reach out.',

    // Footer
    footerText:      '© 2026 Philippe. All rights reserved.',
  };

  /* 
     2. LANGUAGE TOGGLE LOGIC
      */
  const langToggle = document.getElementById('langToggle');
  const labelFR    = document.getElementById('langFR');
  const labelEN    = document.getElementById('langEN');
  const frenchOriginals = {};
  let currentLang  = 'fr';

  // Cache the original French innerHTML on first load
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    frenchOriginals[el.getAttribute('data-i18n')] = el.innerHTML;
  });

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (lang === 'en' && translations[key]) {
        el.innerHTML = translations[key];
      } else if (lang === 'fr' && frenchOriginals[key]) {
        el.innerHTML = frenchOriginals[key];
      }
    });

    // Update active indicator
    labelFR.classList.toggle('active', lang === 'fr');
    labelEN.classList.toggle('active', lang === 'en');
  }

  langToggle.addEventListener('click', function () {
    setLanguage(currentLang === 'fr' ? 'en' : 'fr');
  });

  /* 
     3. SMOOTH SCROLL FOR ANCHOR LINKS
      */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if open
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  });

  /* 
     4. MOBILE NAV (hamburger)
      */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  /* 
     5. NAVBAR SCROLL EFFECT
      */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* 6. SCROLL-REVEAL ANIMATION*/
  // Add .reveal to all sections and cards
  document.querySelectorAll('.section, .project-card, .detail-card, .skill-category, .contact-card').forEach(function (el) {
    el.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });
});
