document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  const showSignupBtn = document.getElementById("showSignupBtn");
  const showLoginBtn = document.getElementById("showLoginBtn");

  const googleLoginBtn = document.getElementById("googleLogin");
  const appleLoginBtn = document.getElementById("appleLogin");

  const googleSignupBtn = document.getElementById("googleSignup");
  const appleSignupBtn = document.getElementById("appleSignup");

  const forgotPasswordLink = document.getElementById("forgotPasswordLink");

  const themeToggle = document.getElementById("themeToggle");
  const rtlToggle = document.getElementById("rtlToggle");
  const siteLogo = document.getElementById("siteLogo");

  const passwordToggles = document.querySelectorAll(".password-toggle");

  const memoryStore = {
    theme: null,
    direction: null
  };

  function safeSet(key, value) {
    memoryStore[key] = value;
    try {
      localStorage.setItem(key, value);
    } catch (error) {}
  }

  function safeGet(key) {
    try {
      const value = localStorage.getItem(key);
      return value ?? memoryStore[key];
    } catch (error) {
      return memoryStore[key];
    }
  }

  function showSignup() {
    loginForm.classList.add("hide");
    signupForm.classList.remove("hide");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function showLogin() {
    signupForm.classList.add("hide");
    loginForm.classList.remove("hide");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  showSignupBtn.addEventListener("click", showSignup);
  showLoginBtn.addEventListener("click", showLogin);

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (email === "" || password === "") {
      alert("Please enter your email and password.");
      return;
    }

    alert("Welcome to NextGear Dashboard");
    window.location.href = "Dashboard.html";
  });

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const phone = document.getElementById("signupPhone").value.trim();
    const license = document.getElementById("signupLicense").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (
      fullName === "" ||
      email === "" ||
      phone === "" ||
      license === "" ||
      password === ""
    ) {
      alert("Please fill in all registration fields.");
      return;
    }

    alert("Registration Successful");
    showLogin();
    document.getElementById("loginEmail").value = email;
  });

  googleLoginBtn.addEventListener("click", () => {
    alert("Google login for Student Login will be added soon.");
  });

  appleLoginBtn.addEventListener("click", () => {
    alert("Apple login for Student Login will be added soon.");
  });

  googleSignupBtn.addEventListener("click", () => {
    alert("Google signup will be added soon.");
  });

  appleSignupBtn.addEventListener("click", () => {
    alert("Apple signup will be added soon.");
  });

  forgotPasswordLink.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Forgot password feature will be added soon.");
  });

  function updateLogoByTheme() {
    if (!siteLogo) return;

    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";

    const lightLogo = siteLogo.getAttribute("data-light-logo");
    const darkLogo = siteLogo.getAttribute("data-dark-logo");

    if (!lightLogo || !darkLogo) return;

    siteLogo.src = currentTheme === "dark" ? darkLogo : lightLogo;
  }

  function updateThemeToggleIcon(theme) {
    themeToggle.innerHTML =
      theme === "dark"
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
    themeToggle.setAttribute(
      "aria-pressed",
      theme === "dark" ? "true" : "false"
    );
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    updateThemeToggleIcon(theme);
    safeSet("theme", theme);
    updateLogoByTheme();
  }

  function toggleTheme() {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";

    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  themeToggle.addEventListener("click", toggleTheme);

  function setDirection(direction) {
    document.documentElement.setAttribute("dir", direction);

    rtlToggle.textContent = direction === "rtl" ? "LTR" : "RTL";

    rtlToggle.setAttribute(
      "aria-label",
      direction === "rtl"
        ? "Switch to left to right mode"
        : "Switch to right to left mode"
    );

    rtlToggle.setAttribute(
      "aria-pressed",
      direction === "rtl" ? "true" : "false"
    );

    safeSet("direction", direction);
  }

  function toggleDirection() {
    const currentDirection =
      document.documentElement.getAttribute("dir") || "ltr";

    const newDirection =
      currentDirection === "rtl" ? "ltr" : "rtl";

    setDirection(newDirection);
  }

  rtlToggle.addEventListener("click", toggleDirection);

  function updatePasswordToggle(button, input) {
    const isVisible = input.type === "text";

    button.innerHTML = isVisible
      ? '<i class="fa-regular fa-eye-slash"></i>'
      : '<i class="fa-regular fa-eye"></i>';

    button.setAttribute(
      "aria-label",
      isVisible ? "Hide password" : "Show password"
    );

    button.setAttribute(
      "aria-pressed",
      isVisible ? "true" : "false"
    );
  }

  passwordToggles.forEach((button) => {
    const targetId = button.getAttribute("data-target");
    const input = document.getElementById(targetId);

    if (!input) return;

    updatePasswordToggle(button, input);

    button.addEventListener("click", () => {
      input.type = input.type === "password" ? "text" : "password";
      updatePasswordToggle(button, input);
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    });
  });

  const savedTheme =
    safeGet("theme") ||
    (
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );

  const savedDirection =
    safeGet("direction") || "ltr";

  setTheme(savedTheme);
  setDirection(savedDirection);
  showLogin();
});