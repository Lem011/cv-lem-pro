/* ==========================================================================
   CV ONLINE - CORPORATE PREMIUM INTERACTIVE APP
   Logic & Interactivity for Chef de Projet MOA / Business Analyst
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initSkillBars();
  initTimelineFilters();
  initContactForm();
  initNavbarScroll();
});

/* 1. KPI Counter Animation */
function initCounters() {
  const kpiNumbers = document.querySelectorAll('.kpi-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        kpiNumbers.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target') || '0', 10);
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1500; // ms
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            counter.innerText = `${prefix}${Math.floor(count)}${suffix}`;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const kpiSection = document.querySelector('.kpi-section');
  if (kpiSection) observer.observe(kpiSection);
}

/* 2. Skill Bars Animation on Scroll */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width') || '0%';
        bar.style.width = width;
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => observer.observe(bar));
}

/* 3. Timeline Filtering */
function initTimelineFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      timelineItems.forEach(item => {
        const categories = item.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* 4. Contact Form Handler */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btnSubmit = contactForm.querySelector('button[type="submit"]');
    const originalText = btnSubmit.innerHTML;

    btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    btnSubmit.disabled = true;

    setTimeout(() => {
      btnSubmit.innerHTML = '<i class="fas fa-check"></i> Message Envoyé !';
      showToast('Merci ! Votre message a bien été envoyé.');
      contactForm.reset();

      setTimeout(() => {
        btnSubmit.innerHTML = originalText;
        btnSubmit.disabled = false;
      }, 3000);
    }, 1200);
  });
}

/* 5. Navbar Sticky Scroll Effect */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(7, 13, 25, 0.95)';
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    } else {
      navbar.style.background = 'rgba(10, 25, 47, 0.85)';
      navbar.style.boxShadow = 'none';
    }
  });
}

/* Global Function for PDF Export */
function downloadPDF() {
  showToast('Préparation du document PDF A4...');
  setTimeout(() => {
    window.print();
  }, 600);
}

/* Toast Helper */
function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  // Clear previous content securely
  toast.replaceChildren();

  const icon = document.createElement('i');
  icon.className = 'fas fa-info-circle gold-text';

  const textSpan = document.createElement('span');
  textSpan.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(textSpan);

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
