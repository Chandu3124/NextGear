const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const googleLoginBtn = document.getElementById("googleLogin");
const appleLoginBtn = document.getElementById("appleLogin");
const googleSignupBtn = document.getElementById("googleSignup");
const appleSignupBtn = document.getElementById("appleSignup");

const themeToggle = document.getElementById("themeToggle");
const rtlToggle = document.getElementById("rtlToggle");
const siteLogo = document.getElementById("siteLogo");

function updateLogoByTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const lightLogo = siteLogo.getAttribute("data-light-logo");
  const darkLogo = siteLogo.getAttribute("data-dark-logo");
  siteLogo.src = currentTheme === "dark" ? darkLogo : lightLogo;
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.innerHTML = theme === "dark"
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
  updateLogoByTheme();
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

function setDirection(direction) {
  document.documentElement.setAttribute("dir", direction);
  rtlToggle.textContent = direction === "rtl" ? "LTR" : "RTL";
}

function toggleDirection() {
  const currentDir = document.documentElement.getAttribute("dir") || "ltr";
  const newDir = currentDir === "rtl" ? "ltr" : "rtl";
  setDirection(newDir);
}

function showSignup() {
  loginForm.classList.add("hide");
  signupForm.classList.remove("hide");
}

function showLogin() {
  signupForm.classList.add("hide");
  loginForm.classList.remove("hide");
}

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (email && password) {
    alert("Welcome to NextGear Dashboard");
    window.location.href = "Dashboard.html";
  }
});

signupForm.addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Registration Successful");
  showLogin();
});

googleLoginBtn.addEventListener("click", function() {
  alert("Google login for Student Login will be added soon");
});

appleLoginBtn.addEventListener("click", function() {
  alert("Apple login for Student Login will be added soon");
});

googleSignupBtn.addEventListener("click", function() {
  alert("Google signup will be added soon");
});

appleSignupBtn.addEventListener("click", function() {
  alert("Apple signup will be added soon");
});

themeToggle.addEventListener("click", toggleTheme);
rtlToggle.addEventListener("click", toggleDirection);

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(prefersDark ? "dark" : "light");
setDirection("ltr");