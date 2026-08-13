const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let prefersReducedMotion = motionQuery.matches;

motionQuery.addEventListener("change", (event) => {
  prefersReducedMotion = event.matches;
});

document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal, .hero-reveal-left, .hero-reveal-right");

  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add("active"));
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("active"));
  }

  const confirmButton = document.getElementById("confirmBookingBtn");
  const bookingForm = document.getElementById("bookingForm");
  const bookingPopup = document.getElementById("bookingPopup");
  const closePopupBtn = document.getElementById("closePopupBtn");

  const bookingName = document.getElementById("bookingName");
  const bookingPhone = document.getElementById("bookingPhone");
  const bookingService = document.getElementById("bookingService");
  const bookingDate = document.getElementById("bookingDate");
  const bookingTime = document.getElementById("bookingTime");

  const resetButtonState = () => {
    if (!confirmButton) return;
    confirmButton.classList.remove("is-error");
    confirmButton.textContent = "Confirm Booking";
  };

  const showButtonError = (message) => {
    if (!confirmButton) return;
    confirmButton.classList.add("is-error");
    confirmButton.textContent = message;

    setTimeout(() => {
      resetButtonState();
    }, 2000);
  };

  const isValidPhone = (value) => /^[0-9]{10}$/.test(value);

  const openPopup = () => {
    if (!bookingPopup) return;

    if (typeof bookingPopup.showModal === "function") {
      if (!bookingPopup.open) bookingPopup.showModal();
    } else {
      bookingPopup.setAttribute("open", "");
    }
  };

  const closePopup = () => {
    if (!bookingPopup) return;

    if (typeof bookingPopup.close === "function") {
      bookingPopup.close();
    } else {
      bookingPopup.removeAttribute("open");
    }
  };

  if (confirmButton && bookingForm && bookingPopup) {
    confirmButton.addEventListener("click", () => {
      const name = bookingName?.value.trim() || "";
      const phone = bookingPhone?.value.trim() || "";
      const service = bookingService?.value || "";
      const date = bookingDate?.value || "";
      const time = bookingTime?.value || "";

      if (!name || !phone || service === "Select Service" || !date || !time) {
        showButtonError("Please fill all fields");
        return;
      }

      if (!isValidPhone(phone)) {
        showButtonError("Enter valid 10-digit mobile");
        return;
      }

      openPopup();
      bookingForm.reset();
      resetButtonState();
    });
  }

  if (closePopupBtn && bookingPopup) {
    closePopupBtn.addEventListener("click", closePopup);

    bookingPopup.addEventListener("click", (event) => {
      const rect = bookingPopup.getBoundingClientRect();
      const clickedInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!clickedInDialog) {
        closePopup();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && bookingPopup?.open) {
      closePopup();
    }
  });

  const heroBookingBtn = document.getElementById("heroBookingBtn");
  const bookSimulatorBtn = document.getElementById("bookSimulatorBtn");
  const bookingSection = document.getElementById("booking");

  const scrollToBooking = (event) => {
    if (event) event.preventDefault();
    if (!bookingSection) return;

    bookingSection.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });
  };

  if (heroBookingBtn && bookingSection) {
    heroBookingBtn.addEventListener("click", scrollToBooking);
  }

  if (bookSimulatorBtn && bookingSection) {
    bookSimulatorBtn.addEventListener("click", scrollToBooking);
  }

  const simulatorImage = document.querySelector(".sim-showcase img");
  if (simulatorImage && !prefersReducedMotion) {
    const resetTransform = () => {
      simulatorImage.style.transform = "scale(1)";
    };

    simulatorImage.addEventListener("mousemove", (event) => {
      const x = (event.offsetX / simulatorImage.offsetWidth - 0.5) * 8;
      const y = (event.offsetY / simulatorImage.offsetHeight - 0.5) * 8;
      simulatorImage.style.transform = `scale(1.04) translate(${x}px, ${y}px)`;
    });

    simulatorImage.addEventListener("mouseleave", resetTransform);
  }

  const progressBar = document.querySelector(".theory-section .progress-line div");
  const theorySection = document.querySelector(".theory-section");

  if (progressBar && theorySection) {
    if (prefersReducedMotion) {
      progressBar.style.width = "75%";
    } else if ("IntersectionObserver" in window) {
      const theoryObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            progressBar.style.width = "75%";
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      theoryObserver.observe(theorySection);
    } else {
      progressBar.style.width = "75%";
    }
  }

  const growthCircles = document.querySelectorAll(".growth-section .circle2 span");

  const animateCounter = (element, target) => {
    if (prefersReducedMotion) {
      element.textContent = `${target}%`;
      return;
    }

    const duration = 1200;
    const start = performance.now();

    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.round(target * progress);
      element.textContent = `${current}%`;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  if (growthCircles.length) {
    if (prefersReducedMotion) {
      growthCircles.forEach((circle) => {
        const target = parseInt(circle.textContent, 10) || 0;
        circle.textContent = `${target}%`;
      });
    } else if ("IntersectionObserver" in window) {
      const growthObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stat = entry.target;
            const target = parseInt(stat.textContent, 10) || 0;
            stat.textContent = "0%";
            animateCounter(stat, target);
            observer.unobserve(stat);
          }
        });
      }, { threshold: 0.4 });

      growthCircles.forEach((circle) => growthObserver.observe(circle));
    }
  }

  if (window.lucide) {
    lucide.createIcons();
  }
});