document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  const googleLoginBtn = document.getElementById("googleLogin");
  const appleLoginBtn = document.getElementById("appleLogin");
  const googleSignupBtn = document.getElementById("googleSignup");
  const appleSignupBtn = document.getElementById("appleSignup");
  const forgotPasswordLink = document.getElementById("forgotPasswordLink");

  const themeToggle = document.getElementById("themeToggle");
  const rtlToggle = document.getElementById("rtlToggle");
  const siteLogo = document.getElementById("siteLogo");

  function updateLogoByTheme() {
    if (!siteLogo) return;

    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const lightLogo = siteLogo.getAttribute("data-light-logo");
    const darkLogo = siteLogo.getAttribute("data-dark-logo");

    if (!lightLogo || !darkLogo) return;

    siteLogo.src = currentTheme === "dark" ? darkLogo : lightLogo;
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    if (themeToggle) {
      themeToggle.innerHTML =
        theme === "dark"
          ? '<i class="fa-solid fa-sun"></i>'
          : '<i class="fa-solid fa-moon"></i>';
    }

    localStorage.setItem("theme", theme);
    updateLogoByTheme();
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  function setDirection(direction) {
    document.documentElement.setAttribute("dir", direction);

    if (rtlToggle) {
      rtlToggle.textContent = direction === "rtl" ? "LTR" : "RTL";
    }

    localStorage.setItem("direction", direction);
  }

  function toggleDirection() {
    const currentDir = document.documentElement.getAttribute("dir") || "ltr";
    const newDir = currentDir === "rtl" ? "ltr" : "rtl";
    setDirection(newDir);
  }

  function showSignup() {
    if (loginForm) loginForm.classList.add("hide");
    if (signupForm) signupForm.classList.remove("hide");
  }

  function showLogin() {
    if (signupForm) signupForm.classList.add("hide");
    if (loginForm) loginForm.classList.remove("hide");
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      if (email && password) {
        alert("Welcome to NextGear Dashboard");
        window.location.href = "Dashboard.html";
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Registration Successful");
      showLogin();
    });
  }

  googleLoginBtn?.addEventListener("click", function () {
    alert("Google login for Student Login will be added soon");
  });

  appleLoginBtn?.addEventListener("click", function () {
    alert("Apple login for Student Login will be added soon");
  });

  googleSignupBtn?.addEventListener("click", function () {
    alert("Google signup will be added soon");
  });

  appleSignupBtn?.addEventListener("click", function () {
    alert("Apple signup will be added soon");
  });

  forgotPasswordLink?.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Forgot password feature will be added soon");
  });

  themeToggle?.addEventListener("click", toggleTheme);
  rtlToggle?.addEventListener("click", toggleDirection);

  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  const savedDirection = localStorage.getItem("direction") || "ltr";

  setTheme(savedTheme);
  setDirection(savedDirection);
});