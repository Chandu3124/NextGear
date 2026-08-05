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
let countdown;

function showSection(sectionId) {
    menuItems.forEach(item => item.classList.remove("active"));
    sections.forEach(section => section.classList.remove("active-section"));

    const activeMenu = document.querySelector(`.menu li[data-section="${sectionId}"]`);
    const activeSection = document.getElementById(sectionId);

    if (activeMenu) activeMenu.classList.add("active");
    if (activeSection) activeSection.classList.add("active-section");

    closeProfileDropdown();

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
    sidebar.classList.add("open");
    mobileOverlay.classList.add("show");
}

function closeSidebar() {
    sidebar.classList.remove("open");
    mobileOverlay.classList.remove("show");
}

if (menuToggle) menuToggle.addEventListener("click", openSidebar);
if (mobileOverlay) mobileOverlay.addEventListener("click", closeSidebar);

function openLogoutModal() {
    logoutModal.style.display = "flex";
    closeProfileDropdown();
}

function closeLogoutModal() {
    logoutModal.style.display = "none";
}

if (logoutBtn) logoutBtn.addEventListener("click", openLogoutModal);
if (dropdownLogoutBtn) dropdownLogoutBtn.addEventListener("click", openLogoutModal);
if (cancelLogout) cancelLogout.addEventListener("click", closeLogoutModal);

window.addEventListener("click", (e) => {
    if (e.target === logoutModal) {
        closeLogoutModal();
    }

    if (profileDropdown && !profileDropdown.contains(e.target)) {
        closeProfileDropdown();
    }
});

if (confirmLogout) {
    confirmLogout.addEventListener("click", () => {
        alert("Logged Out Successfully!");
        location.reload();
    });
}

function openProfileDropdown() {
    profileDropdown.classList.add("active");
    profileTrigger.setAttribute("aria-expanded", "true");
}

function closeProfileDropdown() {
    profileDropdown.classList.remove("active");
    profileTrigger.setAttribute("aria-expanded", "false");
}

if (profileTrigger) {
    profileTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = profileDropdown.classList.contains("active");
        if (isOpen) {
            closeProfileDropdown();
        } else {
            openProfileDropdown();
        }
    });
}

function updateThemeButton() {
    const icon = themeToggle.querySelector("i");
    const text = themeToggle.querySelector("span");

    if (body.classList.contains("dark-mode")) {
        icon.className = "fa-solid fa-sun";
        text.textContent = "Light";
    } else {
        icon.className = "fa-solid fa-moon";
        text.textContent = "Dark";
    }
}

function applyTheme(isDark) {
    body.classList.toggle("dark-mode", isDark);
    updateThemeButton();
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        applyTheme(!body.classList.contains("dark-mode"));
    });
}

function updateRTLButton() {
    const icon = rtlToggle.querySelector("i");
    const text = rtlToggle.querySelector("span");

    if (body.classList.contains("rtl-mode")) {
        html.setAttribute("dir", "rtl");
        icon.className = "fa-solid fa-left-right";
        text.textContent = "LTR";
    } else {
        html.setAttribute("dir", "ltr");
        icon.className = "fa-solid fa-right-left";
        text.textContent = "RTL";
    }
}

function applyRTL(enabled) {
    body.classList.toggle("rtl-mode", enabled);
    updateRTLButton();
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

    localStorage.setItem("bookings", JSON.stringify(bookings));
}

function renderBookingRow(item, insertAtTop = false) {
    const row = document.createElement("tr");
    const statusClass = item.status.toLowerCase() === "completed" ? "completed" : "upcoming";
    const actionButton = item.status.toLowerCase() === "completed"
        ? `<button class="view-btn">View</button>`
        : `<button class="cancel-btn">Cancel</button>`;

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
    const data = JSON.parse(localStorage.getItem("bookings"));
    if (!data) return;

    bookingTable.innerHTML = "";
    data.forEach(item => renderBookingRow(item));
}

function updateBookingSummary() {
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
    badge.textContent = total;
}

if (bookBtn) {
    bookBtn.addEventListener("click", () => {
        const vehicle = document.getElementById("vehicle").value;
        const date = document.getElementById("bookingDate").value;
        const time = document.getElementById("bookingTime").value;
        const instructor = document.getElementById("instructor").value;

        if (date === "") {
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

        document.getElementById("bookingDate").value = "";
        alert("Simulator Session Booked Successfully!");
        showSection("mybookings");
    });
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cancel-btn")) {
        if (confirm("Cancel this booking?")) {
            e.target.closest("tr").remove();
            saveBookings();
            updateBookingSummary();
            updateProgress();
        }
    }

    if (e.target.classList.contains("view-btn")) {
        alert("Booking details viewed successfully.");
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
    localStorage.setItem("theoryScore", percentage);
}

function loadScore() {
    const savedScore = localStorage.getItem("theoryScore");
    if (savedScore) {
        averageScoreCard.textContent = `${savedScore}%`;
    }
}

function updateProgress() {
    const savedScore = Number(localStorage.getItem("theoryScore")) || 90;
    let simulator = bookingTable.querySelectorAll("tr").length * 10;
    if (simulator > 100) simulator = 100;

    const overall = Math.round((simulator + savedScore) / 2);

    simulatorProgressBar.style.width = `${simulator}%`;
    simulatorProgressBar.textContent = `${simulator}%`;

    theoryProgressBar.style.width = `${savedScore}%`;
    theoryProgressBar.textContent = `${savedScore}%`;

    overallProgressBar.style.width = `${overall}%`;
    overallProgressBar.textContent = `${overall}%`;

    simulatorCircle.textContent = `${simulator}%`;
    theoryCircle.textContent = `${savedScore}%`;
    overallCircle.textContent = `${overall}%`;

    dashboardSimulatorProgress.style.width = `${simulator}%`;
    dashboardSimulatorProgress.textContent = `${simulator}%`;

    dashboardTheoryProgress.style.width = `${savedScore}%`;
    dashboardTheoryProgress.textContent = `${savedScore}%`;
}

function completeQuiz(scoreValue) {
    const percentage = Math.round((scoreValue / questions.length) * 100);
    quizFinished = true;
    clearInterval(countdown);

    saveScore(percentage);
    loadScore();
    updateProgress();

    submitTestBtn.disabled = true;
    nextQuestionBtn.disabled = true;

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
    submitTestBtn.addEventListener("click", () => {
        finishTest();
    });
}

function startTimer() {
    countdown = setInterval(() => {
        if (quizFinished) {
            clearInterval(countdown);
            return;
        }

        if (minutes === 0 && seconds === 0) {
            clearInterval(countdown);
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

        timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }, 1000);
}
document.getElementById("confirmLogout")?.addEventListener("click", () => {
  window.location.href = "Login.html";
});

document.getElementById("cancelLogout")?.addEventListener("click", () => {
  const modal = document.getElementById("logoutModal");
  if (modal) modal.style.display = "none";
});
window.addEventListener("load", () => {
    document.querySelector(".top-left h2").textContent = "Hello Chandra shekar";
    document.querySelector(".top-left p").textContent = "Welcome back. Ready for today's practice?";

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark);

    loadBookings();
    loadScore();
    updateBookingSummary();
    updateProgress();
    loadQuestion();
    updateThemeButton();
    updateRTLButton();
    startTimer();
});

console.log("NextGear Dashboard Loaded Successfully");