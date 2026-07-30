const words = ["AI Simulator", "Smart Tests", "Safe Driving", "Real Practice"];

let i = 0;
let j = 0;
let del = false;
let count = 0;
let currentLevel = "Medium";

function type() {
  const typingEl = document.getElementById("typing");
  if (!typingEl) return;

  const text = words[i];
  typingEl.textContent = text.substring(0, j);

  if (!del) {
    j++;
    if (j > text.length) {
      del = true;
      setTimeout(type, 1200);
      return;
    }
  } else {
    j--;
    if (j < 0) {
      del = false;
      i = (i + 1) % words.length;
      j = 0;
    }
  }

  setTimeout(type, del ? 50 : 100);
}

function startCounter() {
  const countEl = document.getElementById("count");
  if (!countEl) return;

  const interval = setInterval(() => {
    count += 20;
    countEl.textContent = count + "+";
    if (count >= 1200) clearInterval(interval);
  }, 25);
}

function animateBars() {
  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar, index) => {
    setInterval(() => {
      const h = 70 + Math.random() * 90;
      bar.style.height = h + "px";
    }, 1200 + index * 150);
  });
}

function smartCheck() {
  const experienceEl = document.getElementById("experience");
  const practiceEl = document.getElementById("practice");
  const resultBox = document.getElementById("smartResult");
  if (!experienceEl || !practiceEl || !resultBox) return;

  const exp = Number(experienceEl.value);
  const practice = Number(practiceEl.value);

  let icon = "fa-solid fa-gauge-high";
  let text = "";
  const score = exp + practice;

  if (score <= 3) {
    icon = "fa-solid fa-user-graduate";
    text = "Beginner - Need more simulator practice.";
  } else if (score <= 5) {
    icon = "fa-solid fa-road";
    text = "Intermediate - Improving, keep practicing.";
  } else {
    icon = "fa-solid fa-award";
    text = "Ready - You are prepared for your driving test.";
  }

  resultBox.innerHTML = `
    <i class="${icon} result-icon"></i>
    <span>${text}</span>
  `;
}

function setLevel(level) {
  currentLevel = level;
  const levelText = document.getElementById("levelText");
  if (levelText) levelText.textContent = level;

  const levelButtons = document.querySelectorAll(".levels button");
  levelButtons.forEach((btn) => {
    btn.classList.remove("active-level-btn");
    if (btn.dataset.level === level) {
      btn.classList.add("active-level-btn");
    }
  });
}

function showFeedback() {
  const feedback = document.getElementById("feedback");
  const theoryAnswer = document.getElementById("theoryAnswer");
  if (!feedback || !theoryAnswer) return;

  const answer = theoryAnswer.value.trim();

  if (!answer) {
    feedback.innerHTML = `
      <i class="fa-solid fa-pen result-icon"></i>
      <span>Please type your answer first.</span>
    `;
    return;
  }

  let icon = "fa-solid fa-comments";
  let text = "";

  if (currentLevel === "Easy") {
    icon = "fa-solid fa-book-open-reader";
    text = "Good start. Your answer shows basic understanding, keep learning traffic rules and signs.";
  } else if (currentLevel === "Medium") {
    icon = "fa-solid fa-chart-line";
    text = "Nice work. Your answer is structured well and your driving knowledge is improving.";
  } else {
    icon = "fa-solid fa-circle-check";
    text = "Excellent response. Your answer looks confident and close to real test readiness.";
  }

  feedback.innerHTML = `
    <i class="${icon} result-icon"></i>
    <span>${text}</span>
  `;
}

function startTimer() {
  let time = 30;
  const timerEl = document.getElementById("timer");
  if (!timerEl) return;

  setInterval(() => {
    time--;
    if (time < 0) time = 30;
    timerEl.textContent = time;
  }, 1000);
}

function setupSlots() {
  const slots = document.querySelectorAll(".available");
  slots.forEach((slot) => {
    slot.addEventListener("click", () => {
      slots.forEach((s) => s.classList.remove("selected"));
      slot.classList.add("selected");
    });
  });
}

function setupAnalyticsPoints() {
  const analyticsPoints = document.querySelectorAll(".chart-point");
  analyticsPoints.forEach((point) => {
    point.addEventListener("mouseenter", () => {
      point.style.background = "var(--secondary)";
    });

    point.addEventListener("mouseleave", () => {
      point.style.background = "var(--primary)";
    });
  });
}

function setupBadges() {
  const badges = document.querySelectorAll(".badge");
  badges.forEach((badge) => {
    badge.addEventListener("click", () => {
      badge.style.animation = "badgeFloat .5s";
      setTimeout(() => {
        badge.style.animation = "badgeFloat 4s infinite";
      }, 500);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  type();
  startCounter();
  animateBars();
  startTimer();
  setupSlots();
  setupAnalyticsPoints();
  setupBadges();
  setLevel("Medium");

  const readinessBtn = document.getElementById("readinessBtn");
  if (readinessBtn) readinessBtn.addEventListener("click", smartCheck);

  const playBtn = document.querySelector(".play-btn");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      window.open(
        "https://www.youtube.com/watch?v=tIo8Cv33gJ8",
        "_blank",
        "noopener,noreferrer"
      );
    });
  }

  const levelButtons = document.querySelectorAll(".levels button");
  levelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setLevel(button.dataset.level);
    });
  });

  const submitTheory = document.getElementById("submitTheory");
  if (submitTheory) submitTheory.addEventListener("click", showFeedback);

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});