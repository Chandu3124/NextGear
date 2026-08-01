const contactStatus = document.getElementById("contactStatus");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const statusMessages = [
  "Our team is available now",
  "Experts are ready to guide you",
  "Start your driving journey today"
];

let statusIndex = 0;

if (contactStatus && !prefersReducedMotion) {
  setInterval(() => {
    statusIndex++;
    if (statusIndex >= statusMessages.length) {
      statusIndex = 0;
    }
    contactStatus.textContent = statusMessages[statusIndex];
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  const bookBtn = document.querySelector(".primary-contact");
  const serviceBtn = document.querySelector(".secondary-contact");
  const form = document.querySelector(".form-right form");
  const inputs = document.querySelectorAll(".input-box input, .input-box textarea");
  const button = document.querySelector(".contact-btn");
  const contactItems = document.querySelectorAll(".contact-item");
  const faqItems = document.querySelectorAll(".faq-item");
  const bookingContent = document.querySelector(".booking-content");
  const revealElements = document.querySelectorAll(
    ".location-content, .map-frame, .faq-left, .faq-right"
  );

  function goToServices() {
    window.location.href = "Services.html";
  }

  if (bookBtn) {
    bookBtn.addEventListener("click", goToServices);
  }

  if (serviceBtn) {
    serviceBtn.addEventListener("click", goToServices);
  }

  contactItems.forEach((item) => {
    const openItemAction = () => {
      const type = item.dataset.type;
      const link = item.dataset.link;

      if (type === "external" && link) {
        window.open(link, "_blank");
      } else if ((type === "phone" || type === "email") && link) {
        window.location.href = link;
      } else if (type === "hours") {
        showMessage("We are available Monday - Saturday, 8:00 AM - 8:00 PM", "#ff7900");
      }
    };

    item.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      openItemAction();
    });

    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openItemAction();
      }
    });
  });

  if (form && button) {
    inputs.forEach((input) => {
      if (input.value.trim() !== "") {
        input.parentElement.classList.add("active");
      }

      input.addEventListener("focus", () => {
        input.parentElement.classList.add("active");
      });

      input.addEventListener("input", () => {
        if (input.value.trim() !== "") {
          input.parentElement.classList.add("active");
        } else {
          input.parentElement.classList.remove("active");
        }
      });

      input.addEventListener("blur", () => {
        if (input.value.trim() === "") {
          input.parentElement.classList.remove("active");
        }
      });
    });

    button.addEventListener("click", function (e) {
      if (prefersReducedMotion) return;

      const ripple = document.createElement("span");
      ripple.classList.add("ripple");

      const rect = this.getBoundingClientRect();
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      ripple.style.position = "absolute";
      ripple.style.width = "18px";
      ripple.style.height = "18px";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255,255,255,.45)";
      ripple.style.transform = "translate(-50%, -50%) scale(0)";
      ripple.style.animation = "rippleEffect .7s ease-out forwards";
      ripple.style.pointerEvents = "none";

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 700);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.querySelector('input[type="text"]');
      const email = form.querySelector('input[type="email"]');
      const message = form.querySelector("textarea");

      if (
        name.value.trim() === "" ||
        email.value.trim() === "" ||
        message.value.trim() === ""
      ) {
        showMessage("Please fill all the fields.", "#ff4d4d");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email.value)) {
        showMessage("Please enter a valid email address.", "#ff4d4d");
        return;
      }

      button.disabled = true;
      button.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

      setTimeout(() => {
        showMessage(
          "Message sent successfully! We'll contact you soon.",
          "#22c55e"
        );

        form.reset();

        inputs.forEach((input) => {
          input.parentElement.classList.remove("active");
        });

        button.disabled = false;
        button.innerHTML = `
          <span>Send Message</span>
          <i class="fa-solid fa-paper-plane"></i>
        `;
      }, 1800);
    });
  }

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach((faq) => {
        faq.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }
    });

    question.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        question.click();
      }
    });
  });

  if (bookingContent && !prefersReducedMotion) {
    const bookingSection = document.querySelector(".booking-cta");

    const bookingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            bookingContent.classList.add("show");
          }
        });
      },
      { threshold: 0.25 }
    );

    bookingObserver.observe(bookingSection);
  } else if (bookingContent) {
    bookingContent.classList.add("show");
  }

  if (revealElements.length && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("show");
    });
  }

  function showMessage(text, color) {
    const oldToast = document.querySelector(".contact-toast");
    if (oldToast) oldToast.remove();

    const toast = document.createElement("div");
    toast.className = "contact-toast";
    toast.textContent = text;
    toast.style.background = color;
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");

    document.body.appendChild(toast);

    if (prefersReducedMotion) {
      toast.style.transform = "translateX(0)";
    } else {
      setTimeout(() => {
        toast.style.transform = "translateX(0)";
      }, 50);
    }

    setTimeout(() => {
      if (prefersReducedMotion) {
        toast.remove();
      } else {
        toast.style.transform = "translateX(350px)";
        setTimeout(() => {
          toast.remove();
        }, 400);
      }
    }, 3000);
  }
});

const rippleStyle = document.createElement("style");
rippleStyle.innerHTML = `
  @keyframes rippleEffect {
    to {
      transform: translate(-50%, -50%) scale(18);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);