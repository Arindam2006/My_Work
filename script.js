document.documentElement.classList.remove('no-js');

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = [...document.querySelectorAll('.nav-link')];
const backToTop = document.querySelector('.back-to-top');
const loader = document.querySelector('.loader');
const toast = document.querySelector('.toast');
let toastTimer;

const projects = {
  bella: {
    name: 'Bella Vista', category: 'RESTAURANT WEBSITE',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1100&q=85',
    alt: 'Bella Vista restaurant website concept',
    description: 'An inviting digital home for a neighbourhood Italian restaurant, balancing editorial food photography with an easy-to-find menu and reservation path.',
    features: 'Story-led homepage · Menu · Photo gallery · Reservation CTA · Location'
  },
  ironcore: {
    name: 'IronCore Fitness', category: 'GYM WEBSITE',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1100&q=85',
    alt: 'IronCore Fitness gym website concept',
    description: 'A confident fitness concept built to introduce the space, make training options easy to compare and encourage a first visit.',
    features: 'Membership plans · Trainer profiles · Class schedule · Contact · Location'
  },
  royalstay: {
    name: 'Royal Stay', category: 'HOTEL WEBSITE',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1100&q=85',
    alt: 'Royal Stay hotel website concept',
    description: 'A considered hotel experience that lets guests explore the stay, discover amenities and find a clear path to make an enquiry.',
    features: 'Room highlights · Amenities · Gallery · Booking CTA · Location'
  },
  novatech: {
    name: 'NovaTech Solutions', category: 'BUSINESS WEBSITE',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=85',
    alt: 'NovaTech Solutions business website concept',
    description: 'A clean company website concept that explains what the business does, builds confidence and brings the right information within reach.',
    features: 'Company story · Services · Approach · Contact form · Responsive layout'
  },
  urbancafe: {
    name: 'Urban Café', category: 'CAFÉ WEBSITE',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1100&q=85',
    alt: 'Urban Café website concept',
    description: 'A warm, approachable café concept for showcasing signature drinks, the space and all the useful details guests look for.',
    features: 'Menu highlights · Interior gallery · Opening hours · Directions · Social links'
  },
  fitzone: {
    name: 'FitZone', category: 'FITNESS WEBSITE',
    image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1100&q=85',
    alt: 'FitZone fitness website concept',
    description: 'A bright, energetic fitness website concept designed to help visitors see their options and take the first step toward training.',
    features: 'Training options · Timetable · Membership enquiry · Facilities · Contact'
  }
};

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.querySelector('.toast-message').textContent = message;
  toast.classList.add('is-visible');
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 4800);
}

function closeMenu() {
  navLinks.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  menuToggle.innerHTML = '<svg class="icon"><use href="#i-menu"></use></svg>';
  document.body.classList.remove('menu-open');
}

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  menuToggle.innerHTML = `<svg class="icon"><use href="#i-${open ? 'close' : 'menu'}"></use></svg>`;
  navLinks.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
});

navLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

function updateScrollUI() {
  const scrollPosition = window.scrollY + 130;
  header.classList.toggle('is-scrolled', window.scrollY > 18);
  backToTop.classList.toggle('is-visible', window.scrollY > 650);

  let currentSection = 'home';
  document.querySelectorAll('main section[id]').forEach((section) => {
    if (section.offsetTop <= scrollPosition) currentSection = section.id;
  });
  navItems.forEach((link) => {
    const active = link.getAttribute('href') === `#${currentSection}`;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 760) closeMenu();
});
updateScrollUI();

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
toast.querySelector('button').addEventListener('click', () => {
  window.clearTimeout(toastTimer);
  toast.classList.remove('is-visible');
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

window.addEventListener('load', () => {
  window.setTimeout(() => loader.classList.add('is-done'), 280);
});
window.setTimeout(() => loader.classList.add('is-done'), 2200);

const filterButtons = [...document.querySelectorAll('.filter-button')];
const projectCards = [...document.querySelectorAll('.project-card')];
const filterEmpty = document.querySelector('.filter-empty');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let visibleCount = 0;
    projectCards.forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    filterEmpty.hidden = visibleCount > 0;
  });
});

const modal = document.querySelector('.modal');
const modalPanel = modal.querySelector('.modal-panel');
const modalImage = document.querySelector('#modal-image');
let previousFocus;

function openProject(projectId) {
  const project = projects[projectId];
  if (!project) return;
  previousFocus = document.activeElement;
  document.querySelector('#modal-category').textContent = project.category;
  document.querySelector('#modal-title').textContent = project.name;
  document.querySelector('#modal-description').textContent = project.description;
  document.querySelector('#modal-features').textContent = project.features;
  modalImage.src = project.image;
  modalImage.alt = project.alt;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
}

function closeProject() {
  if (!modal.classList.contains('is-open')) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (previousFocus instanceof HTMLElement) previousFocus.focus();
}

projectCards.forEach((card) => card.addEventListener('click', () => openProject(card.dataset.project)));
modal.querySelectorAll('[data-modal-close]').forEach((element) => element.addEventListener('click', closeProject));
document.querySelector('#modal-demo-button').addEventListener('click', () => {
  showToast('This is a concept preview. Live demo links can be added as projects launch.');
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeProject();
    closeMenu();
  }
  if (event.key !== 'Tab' || !modal.classList.contains('is-open')) return;
  const focusable = [...modalPanel.querySelectorAll('button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')];
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

document.querySelectorAll('[data-package]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('[name="package"]').value = button.dataset.package;
  });
});
document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('[name="business"]').value = 'Other';
    document.querySelector('[name="details"]').value = `I'm interested in a ${link.dataset.service.toLowerCase()}.`;
  });
});
document.querySelectorAll('[data-contact-placeholder]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('#contact-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast(`${link.dataset.contactPlaceholder} contact details can be added here.`);
  });
});

const form = document.querySelector('#contact-form');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
form.querySelectorAll('input, select, textarea').forEach((field) => {
  field.addEventListener('input', () => field.closest('.field').classList.remove('has-error'));
  field.addEventListener('change', () => field.closest('.field').classList.remove('has-error'));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll('input[required], select[required], textarea[required]')];
  let firstInvalid = null;
  fields.forEach((field) => {
    const empty = !field.value.trim();
    const invalidEmail = field.type === 'email' && !emailPattern.test(field.value.trim());
    const invalidPhone = field.type === 'tel' && field.value.replace(/\D/g, '').length < 7;
    const invalid = empty || invalidEmail || invalidPhone;
    field.closest('.field').classList.toggle('has-error', invalid);
    field.setAttribute('aria-invalid', String(invalid));
    if (invalid && !firstInvalid) firstInvalid = field;
  });

  if (firstInvalid) {
    firstInvalid.focus();
    showToast('Please check the highlighted fields and try again.');
    return;
  }

  const name = form.elements.name.value.trim();
  form.reset();
  showToast(`Thanks, ${name}. Your request is ready. Connect this form to a backend to receive submissions.`);
});

document.querySelector('#current-year').textContent = new Date().getFullYear();