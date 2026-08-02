const MOBILE_BREAKPOINT = 768;

const text =
  "Learn confidently with realistic driving simulations and AI-powered theory tests.";

const typing = document.getElementById("typing");
let i = 0;

function typeEffect() {
  if (!typing) return;

  if (i < text.length) {
    typing.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, 45);
  }
}

typeEffect();

const revealElements = document.querySelectorAll(".reveal");
const serviceWrapper = document.querySelector(".service-wrapper");
const pgxFills = document.querySelectorAll(".pgx-fill");
const pgxCircles = document.querySelectorAll(".pgx-circle");

function animateOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach((element) => {
    const top = element.getBoundingClientRect().top;

    if (top < triggerBottom) {
      element.classList.add("active");
    }
  });

  if (serviceWrapper) {
    const wrapperTop = serviceWrapper.getBoundingClientRect().top;

    if (wrapperTop < triggerBottom) {
      serviceWrapper.classList.add("active");
    }
  }

  pgxFills.forEach((fill) => {
    const top = fill.getBoundingClientRect().top;

    if (top < triggerBottom && !fill.dataset.animated) {
      fill.style.width = `${fill.dataset.width}%`;
      fill.dataset.animated = "true";
    }
  });

  pgxCircles.forEach((circle) => {
    const top = circle.getBoundingClientRect().top;

    if (top < triggerBottom && !circle.dataset.animated) {
      const percent = Number(circle.dataset.percent);
      const ring = circle.querySelector(".pgx-ring");
      const radius = window.innerWidth <= 740 ? 39 : 60;
      const circumference = 2 * Math.PI * radius;

      if (ring) {
        ring.style.strokeDasharray = circumference;

        if (percent >= 100) {
          ring.style.strokeDashoffset = 0;
          ring.style.strokeLinecap = "butt";
          ring.classList.add("full-ring");
          circle.classList.add("is-full");
        } else {
          const offset = circumference - (percent / 100) * circumference;
          ring.style.strokeDashoffset = offset;
          ring.style.strokeLinecap = "round";
        }
      }

      circle.dataset.animated = "true";
    }
  });
}

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function runCounters() {
  if (counterStarted) return;

  const simSection = document.querySelector(".simx-stats");
  if (!simSection) return;

  const top = simSection.getBoundingClientRect().top;

  if (top < window.innerHeight * 0.9) {
    counters.forEach((counter) => {
      const target = Number(counter.dataset.target);
      let current = 0;
      const increment = Math.ceil(target / 60);

      const updateCounter = () => {
        current += increment;

        if (current >= target) {
          counter.textContent = target;
        } else {
          counter.textContent = current;
          requestAnimationFrame(updateCounter);
        }
      };

      updateCounter();
    });

    counterStarted = true;
  }
}

window.addEventListener("scroll", runCounters);
window.addEventListener("load", runCounters);

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

const heroBookBtn = document.getElementById("heroBookBtn");
const ctBookingBtn = document.getElementById("ctBookingBtn");
const exploreServicesBtn = document.getElementById("exploreServicesBtn");

function scrollToBooking() {
  const bookingSection = document.getElementById("booking");

  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: "smooth" });
  }
}

if (heroBookBtn) {
  heroBookBtn.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToBooking();
  });
}

if (ctBookingBtn) {
  ctBookingBtn.addEventListener("click", scrollToBooking);
}

if (exploreServicesBtn) {
  exploreServicesBtn.addEventListener("click", () => {
    const simulator = document.getElementById("simulator");

    if (simulator) {
      simulator.scrollIntoView({ behavior: "smooth" });
    }
  });
}

const score = document.getElementById("score");
const timer = document.getElementById("timer");

let seconds = 0;

function updateTheoryPreview() {
  if (timer) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    timer.textContent = `${mins}:${secs}`;
  }

  if (score) {
    const previewScore = Math.min(100, Math.floor(seconds / 2));
    score.textContent = `${previewScore}%`;
  }

  seconds++;
}

setInterval(updateTheoryPreview, 1000);

const track = document.querySelector(".ts-track");
const dots = document.querySelectorAll(".ts-dot");
const prevBtn = document.querySelector(".ts-prev");
const nextBtn = document.querySelector(".ts-next");
const cards = document.querySelectorAll(".ts-card");

let currentSlide = 0;

function updateSlider(index) {
  if (!track || !dots.length || !cards.length) return;

  currentSlide = index;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot) => dot.classList.remove("active"));

  if (dots[currentSlide]) {
    dots[currentSlide].classList.add("active");
  }
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % cards.length;
    updateSlider(currentSlide);
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + cards.length) % cards.length;
    updateSlider(currentSlide);
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => updateSlider(index));
});

setInterval(() => {
  if (window.innerWidth > MOBILE_BREAKPOINT && cards.length) {
    currentSlide = (currentSlide + 1) % cards.length;
    updateSlider(currentSlide);
  }
}, 4500);