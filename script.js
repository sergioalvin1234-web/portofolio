const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', siteNav.classList.contains('open'));
  });

  document.addEventListener('click', (event) => {
    if (
      siteNav.classList.contains('open') &&
      !siteNav.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

const pageHeader = document.querySelector('.site-header');
const revealElements = document.querySelectorAll('.section, .hero-card');

if (revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => {
    element.classList.add('reveal-hidden');
    revealObserver.observe(element);
  });
}

window.addEventListener('scroll', () => {
  if (!pageHeader) return;
  pageHeader.classList.toggle('scrolled', window.scrollY > 10);
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const messageInput = contactForm.querySelector('textarea');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      alert('Silakan lengkapi semua kolom sebelum mengirim pesan.');
      return;
    }

    alert('Terima kasih, ' + name + '! Pesan Anda telah diterima.');
    contactForm.reset();
  });
}
