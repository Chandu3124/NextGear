const aboutRoot = document.querySelector('.about-main');

if (aboutRoot) {
  const revealItems = aboutRoot.querySelectorAll('.reveal');
  const counters = aboutRoot.querySelectorAll('.counter');
  const progressBars = aboutRoot.querySelectorAll('.progress-fill');
  const impactSection = aboutRoot.querySelector('.impact-section');
  const body = document.body;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motionReduced = motionQuery.matches;
  let countersStarted = false;
  let floatingAnimations = [];

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => {
    if (!item.classList.contains('active')) revealObserver.observe(item);
  });

  function animateCounter(counter, target) {
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(tick);
  }

  function startCounters() {
    counters.forEach((counter) => {
      const target = Number(counter.dataset.target || 0);
      counter.textContent = motionReduced ? target : 0;
      if (!motionReduced) animateCounter(counter, target);
      if (motionReduced) counter.textContent = target;
    });

    progressBars.forEach((bar) => {
      bar.style.width = bar.dataset.width || '0%';
    });
  }

  if (impactSection) {
    const impactObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersStarted) {
          startCounters();
          countersStarted = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    impactObserver.observe(impactSection);
  }

  function applyTheme(theme) {
    body.classList.toggle('dark', theme === 'dark');
  }

  function detectThemeFromPage() {
    return body.classList.contains('dark') ? 'dark' : 'light';
  }

  function syncToggle(toggleInput, toggleBtn) {
    const isDark = body.classList.contains('dark');
    if (toggleInput) toggleInput.checked = isDark;
    if (toggleBtn) toggleBtn.setAttribute('aria-pressed', String(isDark));
  }

  function setupThemeToggle() {
    const toggleBtn =
      document.querySelector('.theme-toggle') ||
      document.querySelector('#theme-toggle') ||
      document.querySelector('.dark-mode-toggle') ||
      document.querySelector('#darkModeToggle');

    const toggleInput =
      document.querySelector('#darkToggle') ||
      document.querySelector('.dark-toggle-input');

    const currentTheme = detectThemeFromPage();
    applyTheme(currentTheme);
    syncToggle(toggleInput, toggleBtn);

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark');
        syncToggle(toggleInput, toggleBtn);
      });
    }

    if (toggleInput) {
      toggleInput.checked = body.classList.contains('dark');
      toggleInput.addEventListener('change', () => {
        applyTheme(toggleInput.checked ? 'dark' : 'light');
        syncToggle(toggleInput, toggleBtn);
      });
    }
  }

  setupThemeToggle();

  function startFloatingAnimation() {
    floatingAnimations = [];
    aboutRoot.querySelectorAll('.floating-box').forEach((box, index) => {
      const animation = box.animate(
        [
          { transform: 'translateY(0px)' },
          { transform: 'translateY(-6px)' },
          { transform: 'translateY(0px)' }
        ],
        {
          duration: 2400 + index * 220,
          iterations: Infinity,
          easing: 'ease-in-out'
        }
      );
      floatingAnimations.push(animation);
    });
  }

  function stopFloatingAnimation() {
    floatingAnimations.forEach((animation) => animation.cancel());
    floatingAnimations = [];
  }

  if (!motionReduced) {
    startFloatingAnimation();
  }

  const motionHandler = (event) => {
    motionReduced = event.matches;
    if (motionReduced) {
      stopFloatingAnimation();
    } else if (!floatingAnimations.length) {
      startFloatingAnimation();
    }
  };

  if (motionQuery.addEventListener) {
    motionQuery.addEventListener('change', motionHandler);
  } else if (motionQuery.addListener) {
    motionQuery.addListener(motionHandler);
  }

  if (window.lucide) {
    window.lucide.createIcons({ root: aboutRoot });
  }
}