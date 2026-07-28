const caseStudyModal = document.getElementById('caseStudyModal');
    const caseStudyModalImage = document.getElementById('caseStudyModalImage');
    const caseStudyModalClose = document.getElementById('caseStudyModalClose');
    let lastCaseStudyTrigger = null;

    function openCaseStudyModal(trigger) {
      const image = trigger.querySelector('.proof-image');
      if (!image) return;

      lastCaseStudyTrigger = trigger;
      caseStudyModalImage.src = image.src;
      caseStudyModalImage.alt = image.alt || trigger.getAttribute('aria-label') || 'Expanded portfolio image';
      caseStudyModal.classList.add('open');
      caseStudyModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      caseStudyModalClose.focus();
    }

    function closeCaseStudyModal() {
      if (!caseStudyModal.classList.contains('open')) return;

      caseStudyModal.classList.remove('open');
      caseStudyModal.setAttribute('aria-hidden', 'true');
      caseStudyModalImage.src = '';
      document.body.classList.remove('modal-open');

      if (lastCaseStudyTrigger) {
        lastCaseStudyTrigger.focus();
      }
    }

    document.querySelectorAll('[data-case-study-modal]').forEach(trigger => {
      trigger.addEventListener('click', event => {
        event.preventDefault();
        openCaseStudyModal(trigger);
      });
      trigger.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openCaseStudyModal(trigger);
        }
      });
    });

    caseStudyModalClose.addEventListener('click', closeCaseStudyModal);

    caseStudyModal.addEventListener('click', event => {
      if (event.target === caseStudyModal) {
        closeCaseStudyModal();
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeCaseStudyModal();
      }
    });


    const header = document.getElementById('siteHeader');
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 12));
    menuBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }));

    const homeLink = document.getElementById('homeLink');
    homeLink.addEventListener('click', event => {
      event.preventDefault();
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      window.location.assign(window.location.pathname + '#top');
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  

// Close the mobile menu when focus or a click moves outside it.
document.addEventListener('click', event => {
  if (!navLinks.contains(event.target) && !menuBtn.contains(event.target)) {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});
