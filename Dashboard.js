const memoryStore = {
  theme: null,
  direction: null,
  bookings: null,
  theoryScore: null
};

const safeStorage = {
  get(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return memoryStore[key] || null;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      memoryStore[key] = value;
    }
  }
};

const body = document.body;
const html = document.documentElement;

const menuItems = document.querySelectorAll(".menu li[data-section]");
const sections = document.querySelectorAll(".content-section");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const mobileOverlay = document.getElementById("mobileOverlay");

const logoutBtn = document.getElementById("logoutBtn");
const dropdownLogoutBtn = document.getElementById("dropdownLogoutBtn");
const logoutModal = document.getElementById("logoutModal");
const cancelLogout = document.getElementById("cancelLogout");
const confirmLogout = document.getElementById("confirmLogout");

const themeToggle = document.getElementById("themeToggle");
const rtlToggle = document.getElementById("rtlToggle");
const siteLogo = document.getElementById("siteLogo");

const profileDropdown = document.getElementById("profileDropdown");
const profileTrigger = document.getElementById("profileTrigger");
const dropdownSectionButtons = document.querySelectorAll(".dropdown-item[data-section-target]");

const bookBtn = document.getElementById("bookBtn");
const bookingTable = document.getElementById("bookingTable");

const saveProfileBtn = document.getElementById("saveProfileBtn");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");
const startLearningBtn = document.getElementById("startLearningBtn");

const questionText = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");
const questionNumber = document.getElementById("questionNumber");
const timer = document.getElementById("timer");
const nextQuestionBtn = document.getElementById("nextQuestion");
const submitTestBtn = document.getElementById("submitTest");
const averageScoreCard = document.getElementById("averageScoreCard");

const simulatorProgressBar = document.getElementById("simulatorProgressBar");
const theoryProgressBar = document.getElementById("theoryProgressBar");
const overallProgressBar = document.getElementById("overallProgressBar");
const simulatorCircle = document.getElementById("simulatorCircle");
const theoryCircle = document.getElementById("theoryCircle");
const overallCircle = document.getElementById("overallCircle");
const dashboardSimulatorProgress = document.getElementById("dashboardSimulatorProgress");
const dashboardTheoryProgress = document.getElementById("dashboardTheoryProgress");

const badge = document.querySelector(".badge");
const totalSessions = document.getElementById("totalSessions");
const upcomingSessions = document.getElementById("upcomingSessions");
const completedSessions = document.getElementById("completedSessions");

const questions = [
  {
    question: "What does a RED traffic signal indicate?",
    options: ["Stop", "Go", "Speed Up", "Turn Left"],
    answer: "Stop"
  },
  {
    question: "What should you do before changing lanes?",
    options: ["Honk", "Check Mirrors", "Accelerate", "Brake Suddenly"],
    answer: "Check Mirrors"
  },
  {
    question: "Maximum speed should always depend on?",
    options: ["Road Conditions", "Music", "Passengers", "Vehicle Color"],
    answer: "Road Conditions"
  },
  {
    question: "Seat belts are?",
    options: ["Optional", "Only for Driver", "Mandatory", "Only Highway"],
    answer: "Mandatory"
  },
  {
    question: "Yellow traffic light means?",
    options: ["Go Fast", "Slow Down & Prepare to Stop", "Stop Immediately", "Turn Right"],
    answer: "Slow Down & Prepare to Stop"
  },
  {
    question: "Who has priority at a pedestrian crossing?",
    options: ["Cars", "Pedestrians", "Bikes", "Buses"],
    answer: "Pedestrians"
  },
  {
    question: "What should you do at a STOP sign?",
    options: ["Slow Down", "Stop Completely", "Ignore", "Honk"],
    answer: "Stop Completely"
  },
  {
    question: "Using a mobile phone while driving is?",
    options: ["Safe", "Recommended", "Dangerous", "Allowed Anytime"],
    answer: "Dangerous"
  },
  {
    question: "Safe driving requires maintaining?",
    options: ["Safe Distance", "Maximum Speed", "Loud Music", "High RPM"],
    answer: "Safe Distance"
  },
  {
    question: "Driving under alcohol influence is?",
    options: ["Safe", "Illegal", "Recommended", "Normal"],
    answer: "Illegal"
  }
];

let currentQuestion = 0;
let score = 0;
let quizFinished = false;
let minutes = 10;
let seconds = 0;
let countdown = null;
let timerStarted = false;

function updateLogoByTheme(isDark) {
  if (!siteLogo) return;

  const dsrkLogo = siteLogo.dataset.darkLogoLogo;
  const darkLogo = siteLogo.dataset.darkLogo;

  if (!darkLogo || !darkLogo) return;
  siteLogo.src = isDark ? darkLogo : darkLogo;
}

function updateThemeButton() {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector("i");
  const text = themeToggle.querySelector("span");
  const isDark = body.classList.contains("dark-mode");

  if (icon) {
    icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }

  if (text) {
    text.textContent = isDark ? "Light" : "Dark";
  }

  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

function applyTheme(isDark) {
  body.classList.toggle("dark-mode", isDark);
  body.classList.toggle("dark", isDark);
  html.setAttribute("data-theme", isDark ? "dark" : "light");
  updateLogoByTheme(isDark);
  updateThemeButton();
  safeStorage.set("theme", isDark ? "dark" : "light");
}

function updateRTLButton() {
  if (!rtlToggle) return;
  const icon = rtlToggle.querySelector("i");
  const text = rtlToggle.querySelector("span");
  const isRTL = body.classList.contains("rtl-mode");

  html.setAttribute("dir", isRTL ? "rtl" : "ltr");

  if (icon) {
    icon.className = isRTL ? "fa-solid fa-left-right" : "fa-solid fa-right-left";
  }

  if (text) {
    text.textContent = isRTL ? "LTR" : "RTL";
  }

  rtlToggle.setAttribute(
    "aria-label",
    isRTL ? "Switch to left to right layout" : "Switch to right to left layout"
  );
  rtlToggle.setAttribute("aria-pressed", String(isRTL));
}

function applyRTL(enabled) {
  body.classList.toggle("rtl-mode", enabled);
  html.setAttribute("dir", enabled ? "rtl" : "ltr");
  updateRTLButton();
  safeStorage.set("direction", enabled ? "rtl" : "ltr");
}

function showSection(sectionId) {
  menuItems.forEach(item => item.classList.remove("active"));
  sections.forEach(section => section.classList.remove("active-section"));

  const activeMenu = document.querySelector(`.menu li[data-section="${sectionId}"]`);
  const activeSection = document.getElementById(sectionId);

  if (activeMenu) activeMenu.classList.add("active");
  if (activeSection) activeSection.classList.add("active-section");

  closeProfileDropdown();

  if (sectionId === "theory" && !timerStarted && !quizFinished) {
    startTimer();
    timerStarted = true;
  }

  if (window.innerWidth <= 992) {
    closeSidebar();
  }
}

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    const target = item.getAttribute("data-section");
    showSection(target);
  });
});

document.querySelectorAll(".section-jump-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    showSection(btn.dataset.target);
  });
});

dropdownSectionButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-section-target");
    showSection(target);
  });
});

if (startLearningBtn) {
  startLearningBtn.addEventListener("click", () => {
    showSection("theory");
  });
}

function openSidebar() {
  if (!sidebar || !mobileOverlay) return;
  sidebar.classList.add("open");
  mobileOverlay.classList.add("show");
  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
  }
}

function closeSidebar() {
  if (!sidebar || !mobileOverlay) return;
  sidebar.classList.remove("open");
  mobileOverlay.classList.remove("show");
  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }
}

function toggleSidebar() {
  if (!sidebar) return;
  sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
}

if (menuToggle) {
  menuToggle.addEventListener("click", toggleSidebar);
}

if (mobileOverlay) {
  mobileOverlay.addEventListener("click", closeSidebar);
}

function openLogoutModal() {
  if (logoutModal) logoutModal.style.display = "flex";
  closeProfileDropdown();
}

function closeLogoutModal() {
  if (logoutModal) logoutModal.style.display = "none";
}

if (logoutBtn) logoutBtn.addEventListener("click", openLogoutModal);
if (dropdownLogoutBtn) dropdownLogoutBtn.addEventListener("click", openLogoutModal);
if (cancelLogout) cancelLogout.addEventListener("click", closeLogoutModal);

if (confirmLogout) {
  confirmLogout.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}

function openProfileDropdown() {
  if (!profileDropdown || !profileTrigger) return;
  profileDropdown.classList.add("active");
  profileTrigger.setAttribute("aria-expanded", "true");
}

function closeProfileDropdown() {
  if (!profileDropdown || !profileTrigger) return;
  profileDropdown.classList.remove("active");
  profileTrigger.setAttribute("aria-expanded", "false");
}

if (profileTrigger) {
  profileTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = profileDropdown.classList.contains("active");
    isOpen ? closeProfileDropdown() : openProfileDropdown();
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    applyTheme(!body.classList.contains("dark-mode"));
  });
}

if (rtlToggle) {
  rtlToggle.addEventListener("click", () => {
    applyRTL(!body.classList.contains("rtl-mode"));
  });
}

function formatDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function saveBookings() {
  if (!bookingTable) return;

  const rows = bookingTable.querySelectorAll("tr");
  const bookings = [];

  rows.forEach(row => {
    const cols = row.querySelectorAll("td");
    if (cols.length > 0) {
      bookings.push({
        vehicle: cols[0].innerText.trim(),
        date: cols[1].innerText.trim(),
        time: cols[2].innerText.trim(),
        instructor: cols[3].innerText.trim(),
        status: cols[4].innerText.trim()
      });
    }
  });

  safeStorage.set("bookings", JSON.stringify(bookings));
}

function renderBookingRow(item, insertAtTop = false) {
  if (!bookingTable) return;

  const row = document.createElement("tr");
  const statusClass = item.status.toLowerCase() === "completed" ? "completed" : "upcoming";
  const actionButton =
    item.status.toLowerCase() === "completed"
      ? `<button class="view-btn" type="button">View</button>`
      : `<button class="cancel-btn" type="button">Cancel</button>`;

  row.innerHTML = `
    <td>${item.vehicle}</td>
    <td>${item.date}</td>
    <td>${item.time}</td>
    <td>${item.instructor}</td>
    <td><span class="status ${statusClass}">${item.status}</span></td>
    <td>${actionButton}</td>
  `;

  if (insertAtTop && bookingTable.firstChild) {
    bookingTable.insertBefore(row, bookingTable.firstChild);
  } else {
    bookingTable.appendChild(row);
  }
}

function loadBookings() {
  if (!bookingTable) return;

  const data = safeStorage.get("bookings");
  if (!data) return;

  try {
    const bookings = JSON.parse(data);
    if (!Array.isArray(bookings)) return;
    bookingTable.innerHTML = "";
    bookings.forEach(item => renderBookingRow(item));
  } catch (e) {
    console.error("Invalid booking data");
  }
}

function updateBookingSummary() {
  if (!bookingTable || !totalSessions || !upcomingSessions || !completedSessions) return;

  const rows = bookingTable.querySelectorAll("tr");
  let total = 0;
  let upcoming = 0;
  let completed = 0;

  rows.forEach(row => {
    const statusText = row.querySelector(".status")?.innerText.trim().toLowerCase() || "";
    total++;
    if (statusText === "upcoming") upcoming++;
    if (statusText === "completed") completed++;
  });

  totalSessions.textContent = total;
  upcomingSessions.textContent = upcoming;
  completedSessions.textContent = completed;
  if (badge) badge.textContent = total;
}

if (bookBtn) {
  bookBtn.addEventListener("click", () => {
    const vehicle = document.getElementById("vehicle")?.value;
    const date = document.getElementById("bookingDate")?.value;
    const time = document.getElementById("bookingTime")?.value;
    const instructor = document.getElementById("instructor")?.value;

    if (!date) {
      alert("Please select booking date.");
      return;
    }

    const newBooking = {
      vehicle,
      date: formatDate(date),
      time,
      instructor,
      status: "Upcoming"
    };

    renderBookingRow(newBooking, true);
    saveBookings();
    updateBookingSummary();
    updateProgress();

    const bookingDate = document.getElementById("bookingDate");
    if (bookingDate) bookingDate.value = "";

    alert("Simulator Session Booked Successfully!");
    showSection("mybookings");
  });
}

document.addEventListener("click", (e) => {
  const target = e.target;

  if (target === logoutModal) {
    closeLogoutModal();
  }

  if (profileDropdown && !profileDropdown.contains(target)) {
    closeProfileDropdown();
  }

  if (target.classList?.contains("cancel-btn")) {
    if (confirm("Cancel this booking?")) {
      target.closest("tr")?.remove();
      saveBookings();
      updateBookingSummary();
      updateProgress();
    }
  }

  if (target.classList?.contains("view-btn")) {
    alert("Booking details viewed successfully.");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProfileDropdown();
    closeLogoutModal();
    closeSidebar();
  }
});

if (saveProfileBtn) {
  saveProfileBtn.addEventListener("click", () => {
    alert("Profile Updated Successfully.");
  });
}

if (saveSettingsBtn) {
  saveSettingsBtn.addEventListener("click", () => {
    alert("Settings Saved Successfully.");
  });
}

function loadQuestion() {
  if (!questionText || !questionNumber || !optionButtons.length) return;

  const current = questions[currentQuestion];
  questionText.textContent = current.question;
  questionNumber.textContent = currentQuestion + 1;

  optionButtons.forEach((btn, index) => {
    btn.textContent = current.options[index];
    btn.classList.remove("active");
    btn.disabled = false;
  });
}

optionButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (quizFinished) return;
    optionButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

function saveScore(percentage) {
  safeStorage.set("theoryScore", String(percentage));
}

function loadScore() {
  const savedScore = safeStorage.get("theoryScore");
  if (savedScore && averageScoreCard) {
    averageScoreCard.textContent = `${savedScore}%`;
  }
}

function updateProgress() {
  const savedScore = Number(safeStorage.get("theoryScore")) || 90;
  let simulator = bookingTable ? bookingTable.querySelectorAll("tr").length * 10 : 0;
  if (simulator > 100) simulator = 100;

  const overall = Math.round((simulator + savedScore) / 2);

  if (simulatorProgressBar) {
    simulatorProgressBar.style.width = `${simulator}%`;
    simulatorProgressBar.textContent = `${simulator}%`;
  }

  if (theoryProgressBar) {
    theoryProgressBar.style.width = `${savedScore}%`;
    theoryProgressBar.textContent = `${savedScore}%`;
  }

  if (overallProgressBar) {
    overallProgressBar.style.width = `${overall}%`;
    overallProgressBar.textContent = `${overall}%`;
  }

  if (simulatorCircle) simulatorCircle.textContent = `${simulator}%`;
  if (theoryCircle) theoryCircle.textContent = `${savedScore}%`;
  if (overallCircle) overallCircle.textContent = `${overall}%`;

  if (dashboardSimulatorProgress) {
    dashboardSimulatorProgress.style.width = `${simulator}%`;
    dashboardSimulatorProgress.textContent = `${simulator}%`;
  }

  if (dashboardTheoryProgress) {
    dashboardTheoryProgress.style.width = `${savedScore}%`;
    dashboardTheoryProgress.textContent = `${savedScore}%`;
  }
}

function completeQuiz(scoreValue) {
  const percentage = Math.round((scoreValue / questions.length) * 100);
  quizFinished = true;
  clearInterval(countdown);
  countdown = null;

  saveScore(percentage);
  loadScore();
  updateProgress();

  if (submitTestBtn) submitTestBtn.disabled = true;
  if (nextQuestionBtn) nextQuestionBtn.disabled = true;

  alert(`Test Completed!\n\nYour Score : ${scoreValue}/${questions.length}\nPercentage : ${percentage}%`);
  showSection("scores");
}

function finishTest() {
  if (quizFinished) return;

  const selected = document.querySelector(".option.active");
  if (selected && selected.textContent === questions[currentQuestion].answer) {
    score++;
  }

  completeQuiz(score);
}

if (nextQuestionBtn) {
  nextQuestionBtn.addEventListener("click", () => {
    if (quizFinished) return;

    const selected = document.querySelector(".option.active");
    if (!selected) {
      alert("Please select an answer.");
      return;
    }

    if (selected.textContent === questions[currentQuestion].answer) {
      score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      completeQuiz(score);
    }
  });
}

if (submitTestBtn) {
  submitTestBtn.addEventListener("click", finishTest);
}

function startTimer() {
  if (countdown) return;

  countdown = setInterval(() => {
    if (quizFinished) {
      clearInterval(countdown);
      countdown = null;
      return;
    }

    if (minutes === 0 && seconds === 0) {
      clearInterval(countdown);
      countdown = null;
      alert("Time Over!");
      finishTest();
      return;
    }

    if (seconds === 0) {
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }

    if (timer) {
      timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
  }, 1000);
}

window.addEventListener("load", () => {
  const savedTheme = safeStorage.get("theme");
  const savedDirection = safeStorage.get("direction");

  const isDark =
    savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;

  const isRTL = savedDirection ? savedDirection === "rtl" : false;

  applyTheme(isDark);
  applyRTL(isRTL);

  loadBookings();
  loadScore();
  updateBookingSummary();
  updateProgress();
  loadQuestion();

  const heading = document.querySelector(".top-left h2");
  const subHeading = document.querySelector(".top-left p");

  if (heading) heading.textContent = "Hello Chandra Shekar";
  if (subHeading) subHeading.textContent = "Welcome back. Ready for today's practice?";
});

console.log("NextGear Dashboard Loaded Successfully");