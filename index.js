const MOBILE_BREAKPOINT = 768;

const text =
  "Learn confidently with realistic driving simulations and AI-powered theory tests.";

const typing = document.getElementById("typing");
let index = 0;

function type() {
  if (!typing) return;
  if (index < text.length) {
    typing.textContent += text.charAt(index);
    index++;
    setTimeout(type, 40);
  }
}
type();

const revealElements = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

const serviceWrapper = document.querySelector(".service-wrapper");
const serviceBoxes = document.querySelectorAll(".service-box");

window.addEventListener("scroll", () => {
  if (!serviceWrapper) return;
  const top = serviceWrapper.getBoundingClientRect().top;
  if (top < window.innerHeight - 120) {
    serviceWrapper.classList.add("active");
  }
});

serviceBoxes.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.classList.add("is-hovered");
  });

  card.addEventListener("mouseleave", () => {
    card.classList.remove("is-hovered");
  });
});

const counters = document.querySelectorAll(".counter");
let started = false;

window.addEventListener("scroll", () => {
  const simSection = document.querySelector(".simx-section");
  if (!simSection || started) return;

  const top = simSection.getBoundingClientRect().top;
  if (top < window.innerHeight - 100) {
    counters.forEach((counter) => {
      const target = +counter.dataset.target;
      let count = 0;
      const speed = target / 80;

      const updateCounter = () => {
        count += speed;
        if (count < target) {
          counter.textContent = Math.floor(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });

    started = true;
  }
});

const pgxFills = document.querySelectorAll(".pgx-fill");
window.addEventListener("scroll", () => {
  const pgxSection = document.querySelector(".pgx-section");
  if (!pgxSection) return;

  const top = pgxSection.getBoundingClientRect().top;
  if (top < window.innerHeight - 100) {
    pgxFills.forEach((fill) => {
      fill.style.width = fill.dataset.width + "%";
    });
  }
});

const circles = document.querySelectorAll(".pgx-circle");
window.addEventListener("scroll", () => {
  const levels = document.querySelector(".pgx-levels");
  if (!levels) return;

  const top = levels.getBoundingClientRect().top;
  if (top < window.innerHeight - 100) {
    circles.forEach((circle) => {
      const percent = circle.dataset.percent;
      const ring = circle.querySelector(".pgx-ring");
      const radius = 60;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percent / 100) * circumference;
      ring.style.strokeDashoffset = offset;
    });
  }
});

const bookingForm = document.getElementById("bookingForm");
const bookingPopup = document.getElementById("bookingPopup");
const bookingMessage = document.getElementById("bookingMessage");
const closeBooking = document.getElementById("closeBooking");

if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const date = document.getElementById("bookingDate").value;
    const time = document.getElementById("bookingTime").value;

    if (!date || !time) return;

    bookingMessage.textContent = `Your simulator session is booked for ${date} at ${time}.`;
    bookingPopup.classList.add("active");
    bookingForm.reset();
  });
}

if (closeBooking) {
  closeBooking.addEventListener("click", () => {
    bookingPopup.classList.remove("active");
  });
}

if (bookingPopup) {
  bookingPopup.addEventListener("click", (e) => {
    if (e.target === bookingPopup) {
      bookingPopup.classList.remove("active");
    }
  });
}

const track = document.querySelector(".ts-track");
const dots = document.querySelectorAll(".ts-dot");
const prevBtn = document.querySelector(".ts-prev");
const nextBtn = document.querySelector(".ts-next");
let currentSlide = 0;

function updateSlider() {
  if (!track) return;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[currentSlide]) dots[currentSlide].classList.add("active");
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % dots.length;
    updateSlider();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + dots.length) % dots.length;
    updateSlider();
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    updateSlider();
  });
});

setInterval(() => {
  if (window.innerWidth > MOBILE_BREAKPOINT && dots.length) {
    currentSlide = (currentSlide + 1) % dots.length;
    updateSlider();
  }
}, 5000);

const heroBookBtn = document.getElementById("heroBookBtn");
const ctBookingBtn = document.getElementById("ctBookingBtn");
const exploreServicesBtn = document.getElementById("exploreServicesBtn");

if (heroBookBtn) {
  heroBookBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  });
}

if (ctBookingBtn) {
  ctBookingBtn.addEventListener("click", () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  });
}

if (exploreServicesBtn) {
  exploreServicesBtn.addEventListener("click", () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  });
}