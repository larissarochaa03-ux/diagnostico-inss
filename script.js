// =============================================
// SCROLL REVEAL ANIMATION
// =============================================
const animatedEls = document.querySelectorAll(
  '.animate-card, .animate-step, .animate-slide-left, .animate-slide-right'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger cards in the same parent
        const siblings = [...entry.target.parentElement.querySelectorAll(
          '.animate-card, .animate-step'
        )];
        const idx = siblings.indexOf(entry.target);
        const delay = idx >= 0 ? idx * 100 : 0;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

animatedEls.forEach(el => observer.observe(el));

// =============================================
// FAQ TOGGLE
// =============================================
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));

  // Open clicked (if wasn't already open)
  if (!isOpen) {
    item.classList.add('open');
  }
}

// =============================================
// COUNTDOWN TIMER (24-hour rolling)
// =============================================
function startCountdown() {
  const hEl = document.getElementById('cnt-h');
  const mEl = document.getElementById('cnt-m');
  const sEl = document.getElementById('cnt-s');

  if (!hEl) return;

  // Use sessionStorage to persist across page opens in the same session
  let endTime = sessionStorage.getItem('lp_countdown_end');
  const now = Date.now();

  if (!endTime || parseInt(endTime) < now) {
    // Set a new 24-hour countdown
    endTime = now + 23 * 3600 * 1000 + 47 * 60 * 1000 + 32 * 1000;
    sessionStorage.setItem('lp_countdown_end', endTime);
  }

  function tick() {
    const remaining = parseInt(endTime) - Date.now();
    if (remaining <= 0) {
      // Reset
      sessionStorage.removeItem('lp_countdown_end');
      startCountdown();
      return;
    }

    const h = Math.floor(remaining / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    const s = Math.floor((remaining % 60000) / 1000);

    hEl.textContent = String(h).padStart(2, '0');
    mEl.textContent = String(m).padStart(2, '0');
    sEl.textContent = String(s).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}

startCountdown();

// =============================================
// HEADER – auto-show on scroll
// =============================================
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.style.background = 'rgba(2,12,27,0.97)';
    header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
  } else {
    header.style.background = 'rgba(2,12,27,0.92)';
    header.style.boxShadow = 'none';
  }
});

// =============================================
// SMOOTH CTA TRACKING (optional analytics hook)
// =============================================
document.querySelectorAll('[id^="cta-"]').forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('[LP] CTA clicked:', btn.id);
    // Add analytics / pixel event here if needed
  });
});
