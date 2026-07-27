const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");
const progressBars = document.querySelectorAll(".progress-fill");
const impactSection = document.querySelector(".impact-section");
const body = document.body;

let countersStarted = false;

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

revealItems.forEach((item) => revealObserver.observe(item));

function startCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 80));

    function updateCounter() {
      current += increment;

      if (current < target) {
        counter.textContent = current;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    }

    updateCounter();
  });

  progressBars.forEach((bar) => {
    bar.style.width = bar.dataset.width || "0%";
  });
}

if (impactSection) {
  const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !countersStarted) {
        startCounters();
        countersStarted = true;
      }
    });
  }, { threshold: 0.3 });

  impactObserver.observe(impactSection);
}

const storySection = document.querySelector(".story-section");
const mainCard = document.querySelector(".main-card");
const storyCircle = document.querySelector(".story-circle");

if (storySection && mainCard && storyCircle && window.innerWidth > 992) {
  storySection.addEventListener("mousemove", (e) => {
    const rect = storySection.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 45;
    const y = (e.clientY - rect.top - rect.height / 2) / 45;

    mainCard.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    storyCircle.style.transform = `translate(-50%, -50%) translate(${-x}px, ${-y}px)`;
  });

  storySection.addEventListener("mouseleave", () => {
    mainCard.style.transform = "translate(-50%, -50%)";
    storyCircle.style.transform = "translate(-50%, -50%)";
  });
}

document.querySelectorAll(".floating-box").forEach((box, index) => {
  box.animate(
    [
      { transform: "translateY(0px)" },
      { transform: "translateY(-8px)" },
      { transform: "translateY(0px)" }
    ],
    {
      duration: 2600 + index * 250,
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
});

/* ===== DARK MODE SUPPORT USING body.dark ===== */

function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
}

function detectThemeFromPage() {
  if (body.classList.contains("dark")) return "dark";
  return "light";
}

function setupThemeToggle() {
  const toggleBtn =
    document.querySelector(".theme-toggle") ||
    document.querySelector("#theme-toggle") ||
    document.querySelector(".dark-mode-toggle") ||
    document.querySelector("#darkModeToggle");

  const toggleInput =
    document.querySelector("#darkToggle") ||
    document.querySelector(".dark-toggle-input");

  let currentTheme = detectThemeFromPage();
  applyTheme(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark");
    });
  }

  if (toggleInput) {
    toggleInput.checked = body.classList.contains("dark");

    toggleInput.addEventListener("change", () => {
      if (toggleInput.checked) {
        body.classList.add("dark");
      } else {
        body.classList.remove("dark");
      }
    });
  }
}

setupThemeToggle();

if (window.lucide) {
  lucide.createIcons();
}