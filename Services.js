const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal, .hero-reveal-left, .hero-reveal-right");

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

  const confirmButton = document.getElementById("confirmBookingBtn");
  const bookingForm = document.getElementById("bookingForm");
  const bookingPopup = document.getElementById("bookingPopup");
  const closePopupBtn = document.getElementById("closePopupBtn");

  if (confirmButton && bookingForm && bookingPopup) {
    confirmButton.addEventListener("click", () => {
      const name = document.getElementById("bookingName").value.trim();
      const phone = document.getElementById("bookingPhone").value.trim();
      const service = document.getElementById("bookingService").value;
      const date = document.getElementById("bookingDate").value;
      const time = document.getElementById("bookingTime").value;

      if (!name || !phone || service === "Select Service" || !date || !time) {
        confirmButton.textContent = "Please fill all fields";
        confirmButton.style.background = "#c0392b";

        setTimeout(() => {
          confirmButton.textContent = "Confirm Booking";
          confirmButton.style.background = "#f57c00";
        }, 2000);
        return;
      }

      bookingPopup.showModal();
      bookingForm.reset();
    });
  }

  if (closePopupBtn && bookingPopup) {
    closePopupBtn.addEventListener("click", () => {
      bookingPopup.close();
    });

    bookingPopup.addEventListener("click", (event) => {
      const rect = bookingPopup.getBoundingClientRect();
      const clickedInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!clickedInDialog) {
        bookingPopup.close();
      }
    });
  }

  const heroBookingBtn = document.getElementById("heroBookingBtn");
  const bookSimulatorBtn = document.getElementById("bookSimulatorBtn");
  const bookingSection = document.getElementById("booking");

  const scrollToBooking = (event) => {
    if (!bookingSection) return;
    event.preventDefault();
    bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (heroBookingBtn && bookingSection) {
    heroBookingBtn.addEventListener("click", scrollToBooking);
  }

  if (bookSimulatorBtn && bookingSection) {
    bookSimulatorBtn.addEventListener("click", scrollToBooking);
  }

  const simulatorImage = document.querySelector(".sim-showcase img");
  if (simulatorImage && !prefersReducedMotion) {
    simulatorImage.addEventListener("mousemove", (event) => {
      const x = (event.offsetX / simulatorImage.offsetWidth - 0.5) * 10;
      const y = (event.offsetY / simulatorImage.offsetHeight - 0.5) * 10;
      simulatorImage.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
    });

    simulatorImage.addEventListener("mouseleave", () => {
      simulatorImage.style.transform = "scale(1)";
    });
  }

  const progressBar = document.querySelector(".theory-section .progress-line div");
  const theorySection = document.querySelector(".theory-section");
  if (progressBar && theorySection) {
    const theoryObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          progressBar.style.width = "75%";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    theoryObserver.observe(theorySection);
  }

  const growthCircles = document.querySelectorAll(".growth-section .circle2 span");
  if (!prefersReducedMotion && growthCircles.length) {
    const growthObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stat = entry.target;
          const target = parseInt(stat.textContent, 10);
          let current = 0;
          stat.textContent = "0%";

          const timer = setInterval(() => {
            current += 1;
            stat.textContent = `${current}%`;

            if (current >= target) {
              clearInterval(timer);
            }
          }, 18);

          observer.unobserve(stat);
        }
      });
    }, { threshold: 0.4 });

    growthCircles.forEach((circle) => growthObserver.observe(circle));
  }

  if (window.lucide) {
    lucide.createIcons();
  }
});