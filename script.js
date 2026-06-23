document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.project-media img').forEach((img) => {
  img.addEventListener(
    'error',
    () => {
      const media = img.closest('.project-media');
      const span = document.createElement('span');
      span.className = 'project-monogram';
      span.textContent = img.dataset.fallback || '';
      img.replaceWith(span);
      media.classList.add('project-media-mono');
    },
    { once: true }
  );
});

const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => revealObserver.observe(el));

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(img) {
  lightboxImg.src = img.currentSrc || img.src;
  lightboxImg.alt = img.alt;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-media img').forEach((img) => {
  img.tabIndex = 0;
  img.setAttribute('role', 'button');
  img.setAttribute('aria-label', `Expand image: ${img.alt}`);
  img.addEventListener('click', () => openLightbox(img));
  img.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(img);
    }
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
});
