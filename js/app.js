const screen = document.getElementById('entryScreen');
    const enter = document.getElementById('enterPortfolio');
    const revealSite = () => {
      screen.classList.add('is-leaving');
      document.body.classList.add('entered');
      window.setTimeout(() => {
        screen.setAttribute('aria-hidden','true');
        document.getElementById('main-content').focus?.();
      }, 760);
    };
    enter.addEventListener('click', revealSite);
    document.addEventListener('keydown', (event) => {
      if ((event.key === 'Enter' || event.key === ' ') && !document.body.classList.contains('entered')) {
        event.preventDefault(); revealSite();
      }
    });
const methodTabs = Array.from(document.querySelectorAll('.method-chevron'));
    const methodPanels = Array.from(document.querySelectorAll('.method-stage'));
    const methodProgressFill = document.getElementById('methodProgressFill');
    const methodProgressDot = document.getElementById('methodProgressDot');
    const activateMethodStage = (tab) => {
      const activeIndex = methodTabs.indexOf(tab);
      methodTabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
      methodPanels.forEach((panel) => {
        const active = panel.id === tab.getAttribute('aria-controls');
        panel.hidden = !active;
        panel.classList.toggle('is-active', active);
      });
      if (methodProgressFill && methodProgressDot && methodTabs.length > 1) {
        const percent = (activeIndex / (methodTabs.length - 1)) * 100;
        methodProgressFill.style.width = percent + '%';
        methodProgressDot.style.left = percent + '%';
      }
    };
    if (methodTabs[0]) activateMethodStage(methodTabs[0]);
    methodTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateMethodStage(tab));
      tab.addEventListener('keydown', (event) => {
        if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % methodTabs.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + methodTabs.length) % methodTabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = methodTabs.length - 1;
        methodTabs[next].focus();
        activateMethodStage(methodTabs[next]);
      });
    });


    const caseStudyImages = Array.from(document.querySelectorAll('.case-study-image'));
    const caseStudyLightbox = document.getElementById('caseStudyLightbox');
    const caseStudyLightboxImage = document.getElementById('caseStudyLightboxImage');
    const caseStudyLightboxClose = document.getElementById('caseStudyLightboxClose');
    let lastCaseStudyTrigger = null;

    const openCaseStudyLightbox = (image) => {
      lastCaseStudyTrigger = image;
      caseStudyLightboxImage.src = image.currentSrc || image.src;
      caseStudyLightboxImage.alt = image.alt;
      caseStudyLightbox.classList.add('is-open');
      caseStudyLightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      caseStudyLightboxClose.focus();
    };

    const closeCaseStudyLightbox = () => {
      caseStudyLightbox.classList.remove('is-open');
      caseStudyLightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');
      caseStudyLightboxImage.removeAttribute('src');
      if (lastCaseStudyTrigger) lastCaseStudyTrigger.focus();
    };

    caseStudyImages.forEach((image) => {
      image.addEventListener('click', () => openCaseStudyLightbox(image));
      image.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openCaseStudyLightbox(image);
        }
      });
    });
    caseStudyLightboxClose.addEventListener('click', closeCaseStudyLightbox);
    caseStudyLightbox.addEventListener('click', (event) => {
      if (event.target === caseStudyLightbox) closeCaseStudyLightbox();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && caseStudyLightbox.classList.contains('is-open')) closeCaseStudyLightbox();
    });


    /* Precise internal-link alignment beneath the sticky navigation */
    const internalAnchorLinks = Array.from(
      document.querySelectorAll('a[href^="#"]:not([href="#"])')
    );

    const scrollToInternalTarget = (target, hash, behavior = 'smooth') => {
      const stickyHeader = document.querySelector('header');
      const headerHeight = stickyHeader
        ? stickyHeader.getBoundingClientRect().height
        : 0;

      const targetTop =
        window.scrollY +
        target.getBoundingClientRect().top -
        headerHeight;

      window.scrollTo({
        top: Math.max(0, Math.round(targetTop)),
        behavior
      });

      if (hash && window.location.hash !== hash) {
        history.pushState(null, '', hash);
      }
    };

    internalAnchorLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        const hash = link.getAttribute('href');
        const target = hash ? document.querySelector(hash) : null;
        if (!target) return;

        event.preventDefault();

        const reducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

        scrollToInternalTarget(
          target,
          hash,
          reducedMotion ? 'auto' : 'smooth'
        );
      });
    });

    /* Keep direct hash visits aligned correctly after layout and images settle. */
    window.addEventListener('load', () => {
      if (!window.location.hash) return;
      const target = document.querySelector(window.location.hash);
      if (!target) return;

      window.requestAnimationFrame(() => {
        scrollToInternalTarget(target, null, 'auto');
      });
    });
