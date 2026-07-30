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

const hero = document.querySelector(".hero");
if (hero) {
  hero.addEventListener("mousemove", (e) => {
    if (document.body.classList.contains("dark") || window.innerWidth <= MOBILE_BREAKPOINT) return;
    const x = (window.innerWidth / 2 - e.pageX) / 35;
    const y = (window.innerHeight / 2 - e.pageY) / 35;
    hero.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
  });
}

const reveals = document.querySelectorAll(".reveal");
function revealSection() {
  reveals.forEach((item) => {
    const windowHeight = window.innerHeight;
    const elementTop = item.getBoundingClientRect().top;
    if (elementTop < windowHeight - 120) {
      item.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealSection);
revealSection();

const cards = document.querySelectorAll(".feature-card");
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    if (document.body.classList.contains("dark") || window.innerWidth <= MOBILE_BREAKPOINT) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,193,7,.22), #ffffff 65%)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = document.body.classList.contains("dark") ? "#121212" : "#ffffff";
  });
});

const image = document.querySelector(".about-image img");
let direction = 1;
let imageFloatInterval;

if (image && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  imageFloatInterval = setInterval(() => {
    image.style.transform = `translateY(${direction * 8}px)`;
    direction *= -1;
  }, 1800);
}

const serviceSection = document.querySelector(".service-wrapper");
function serviceAnimation() {
  if (!serviceSection) return;
  const top = serviceSection.getBoundingClientRect().top;
  if (top < window.innerHeight - 120) {
    serviceSection.classList.add("active");
  }
}
window.addEventListener("scroll", serviceAnimation);
serviceAnimation();

const simxCounters = document.querySelectorAll(".counter");
let simxStarted = false;

function simxCounterAnimation() {
  const section = document.querySelector(".simx-section");
  if (!section) return;

  const trigger = section.getBoundingClientRect().top;
  if (trigger < window.innerHeight - 120 && !simxStarted) {
    simxStarted = true;

    simxCounters.forEach((counter) => {
      const target = +counter.dataset.target;
      let current = 0;
      const speed = target / 80;

      const update = () => {
        current += speed;
        if (current < target) {
          counter.innerText = Math.floor(current);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };

      update();
    });
  }
}
window.addEventListener("scroll", simxCounterAnimation);
simxCounterAnimation();

const simxBtn = document.getElementById("exploreServicesBtn");
if (simxBtn) {
  simxBtn.addEventListener("click", () => {
    const target = document.getElementById("services");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
}

const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");

let time = 0;
let interval;

function startPreviewCounter() {
  clearInterval(interval);
  time = 0;

  interval = setInterval(() => {
    time++;
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");

    if (timerDisplay) timerDisplay.textContent = `${minutes}:${seconds}`;
    if (scoreDisplay) scoreDisplay.textContent = `${Math.min(time, 100)}%`;
  }, 1000);
}

const theorySectionBtn = document.querySelector(".theory-section #startTestBtn");
if (theorySectionBtn) {
  theorySectionBtn.addEventListener("click", () => {
    startPreviewCounter();
  });
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

const pgxSection = document.querySelector(".pgx-section");
let pgxAnimated = false;

function pgxAnimation() {
  if (!pgxSection) return;
  const top = pgxSection.getBoundingClientRect().top;

  if (top < window.innerHeight - 120 && !pgxAnimated) {
    pgxAnimated = true;

    document.querySelectorAll(".pgx-fill").forEach((bar) => {
      bar.style.width = `${bar.dataset.width}%`;
    });

    document.querySelectorAll(".pgx-circle").forEach((circle) => {
      const percent = circle.dataset.percent;
      const ring = circle.querySelector(".pgx-ring");
      const radius = 60;
      const circumference = 2 * Math.PI * radius;

      if (!ring) return;
      ring.style.strokeDasharray = circumference;
      ring.style.strokeDashoffset =
        circumference - (percent / 100) * circumference;
      ring.style.transition = "2s ease";
    });
  }
}
window.addEventListener("scroll", pgxAnimation);
pgxAnimation();

const bookingForm = document.getElementById("bookingForm");
const bookingPopup = document.getElementById("bookingPopup");
const bookingMessage = document.getElementById("bookingMessage");
const closeBooking = document.getElementById("closeBooking");
const bookingDate = document.getElementById("bookingDate");
const bookingTime = document.getElementById("bookingTime");

if (bookingDate) {
  const today = new Date().toISOString().split("T")[0];
  bookingDate.min = today;

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const date = bookingDate.value;
      const timeValue = bookingTime.value;

      if (date === "" || timeValue === "") {
        alert("Please select both Date and Time.");
        return;
      }

      const formattedDate = new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      if (bookingMessage) {
        bookingMessage.innerHTML = `Your simulator session is booked for <br><strong>${formattedDate}</strong><br>at <strong>${timeValue}</strong>.`;
      }

      if (bookingPopup) {
        bookingPopup.classList.add("active");
      }
    });
  }

  if (closeBooking) {
    closeBooking.addEventListener("click", function () {
      if (bookingPopup) bookingPopup.classList.remove("active");
      if (bookingForm) bookingForm.reset();
      bookingDate.min = today;
    });
  }

  if (bookingPopup) {
    bookingPopup.addEventListener("click", function (e) {
      if (e.target === bookingPopup) {
        bookingPopup.classList.remove("active");
        if (bookingForm) bookingForm.reset();
        bookingDate.min = today;
      }
    });
  }
}

const tsTrack = document.querySelector(".ts-track");
const tsCards = document.querySelectorAll(".ts-card");
const tsDots = document.querySelectorAll(".ts-dot");
const tsPrev = document.querySelector(".ts-prev");
const tsNext = document.querySelector(".ts-next");

let tsIndex = 0;
let testimonialsAutoSlide;

function updateTestimonials() {
  if (!tsTrack) return;
  tsTrack.style.transform = `translateX(-${tsIndex * 100}%)`;
  tsDots.forEach((dot) => dot.classList.remove("active"));
  if (tsDots[tsIndex]) tsDots[tsIndex].classList.add("active");
}

if (tsNext) {
  tsNext.addEventListener("click", () => {
    tsIndex++;
    if (tsIndex >= tsCards.length) tsIndex = 0;
    updateTestimonials();
  });
}

if (tsPrev) {
  tsPrev.addEventListener("click", () => {
    tsIndex--;
    if (tsIndex < 0) tsIndex = tsCards.length - 1;
    updateTestimonials();
  });
}

tsDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    tsIndex = index;
    updateTestimonials();
  });
});

if (tsCards.length > 0) {
  testimonialsAutoSlide = setInterval(() => {
    tsIndex++;
    if (tsIndex >= tsCards.length) tsIndex = 0;
    updateTestimonials();
  }, 4000);
}

const tsSection = document.querySelector(".ts-section");
if (tsSection) {
  const tsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tsSection.classList.add("ts-show");
        }
      });
    },
    { threshold: 0.3 }
  );

  tsObserver.observe(tsSection);
}

const ctButton = document.getElementById("ctBookingBtn");
if (ctButton) {
  ctButton.addEventListener("click", () => {
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

const heroBookBtn = document.getElementById("heroBookBtn");
if (heroBookBtn) {
  heroBookBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

const ctCards = document.querySelectorAll(".ct-card");
const ctObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateX(0)";
      }
    });
  },
  { threshold: 0.2 }
);

ctCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateX(-50px)";
  ctObserver.observe(card);
});

window.addEventListener("resize", () => {
  if (window.innerWidth <= MOBILE_BREAKPOINT && hero) {
    hero.style.backgroundPosition = "center";
  }

  if (window.innerWidth <= MOBILE_BREAKPOINT) {
    cards.forEach((card) => {
      card.style.background = document.body.classList.contains("dark") ? "#121212" : "#ffffff";
    });
  }
});