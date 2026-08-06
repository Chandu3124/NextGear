document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  const showSignupBtn =
    document.getElementById("showSignupBtn");

  const showLoginBtn =
    document.getElementById("showLoginBtn");

  const googleLoginBtn =
    document.getElementById("googleLogin");

  const appleLoginBtn =
    document.getElementById("appleLogin");

  const googleSignupBtn =
    document.getElementById("googleSignup");

  const appleSignupBtn =
    document.getElementById("appleSignup");

  const forgotPasswordLink =
    document.getElementById("forgotPasswordLink");

  const themeToggle =
    document.getElementById("themeToggle");

  const rtlToggle =
    document.getElementById("rtlToggle");

  const siteLogo =
    document.getElementById("siteLogo");

  /*
  =========================
  LOGIN AND SIGNUP SWITCH
  =========================
  */

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

  /*
  =========================
  LOGIN FORM SUBMIT
  =========================
  */

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email =
      document.getElementById("loginEmail").value.trim();

    const password =
      document.getElementById("loginPassword").value.trim();

    if (email === "" || password === "") {
      alert("Please enter your email and password.");
      return;
    }

    alert("Welcome to NextGear Dashboard");

    window.location.href = "Dashboard.html";
  });

  /*
  =========================
  SIGNUP FORM SUBMIT
  =========================
  */

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName =
      document.getElementById("signupName").value.trim();

    const email =
      document.getElementById("signupEmail").value.trim();

    const phone =
      document.getElementById("signupPhone").value.trim();

    const license =
      document.getElementById("signupLicense").value.trim();

    const password =
      document.getElementById("signupPassword").value.trim();

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

    // Signup complete అయిన తర్వాత login form చూపిస్తుంది
    showLogin();

    // Signup emailను login email fieldలో set చేస్తుంది
    document.getElementById("loginEmail").value = email;
  });

  /*
  =========================
  SOCIAL LOGIN BUTTONS
  =========================
  */

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

  /*
  =========================
  FORGOT PASSWORD
  =========================
  */

  forgotPasswordLink.addEventListener("click", (event) => {
    event.preventDefault();

    alert("Forgot password feature will be added soon.");
  });

  /*
  =========================
  THEME MANAGEMENT
  =========================
  */

  function updateLogoByTheme() {
    if (!siteLogo) {
      return;
    }

    const currentTheme =
      document.documentElement.getAttribute("data-theme") ||
      "light";

    const lightLogo =
      siteLogo.getAttribute("data-light-logo");

    const darkLogo =
      siteLogo.getAttribute("data-dark-logo");

    if (!lightLogo || !darkLogo) {
      return;
    }

    siteLogo.src =
      currentTheme === "dark"
        ? darkLogo
        : lightLogo;
  }

  function setTheme(theme) {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    themeToggle.innerHTML =
      theme === "dark"
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

    localStorage.setItem("theme", theme);

    updateLogoByTheme();
  }

  function toggleTheme() {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") ||
      "light";

    const newTheme =
      currentTheme === "dark"
        ? "light"
        : "dark";

    setTheme(newTheme);
  }

  themeToggle.addEventListener("click", toggleTheme);

  /*
  =========================
  RTL MANAGEMENT
  =========================
  */

  function setDirection(direction) {
    document.documentElement.setAttribute(
      "dir",
      direction
    );

    rtlToggle.textContent =
      direction === "rtl"
        ? "LTR"
        : "RTL";

    localStorage.setItem("direction", direction);
  }

  function toggleDirection() {
    const currentDirection =
      document.documentElement.getAttribute("dir") ||
      "ltr";

    const newDirection =
      currentDirection === "rtl"
        ? "ltr"
        : "rtl";

    setDirection(newDirection);
  }

  rtlToggle.addEventListener("click", toggleDirection);

  /*
  =========================
  LOAD SAVED SETTINGS
  =========================
  */

  const savedTheme =
    localStorage.getItem("theme") ||
    (
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
        ? "dark"
        : "light"
    );

  const savedDirection =
    localStorage.getItem("direction") ||
    "ltr";

  setTheme(savedTheme);
  setDirection(savedDirection);

  /*
  =========================
  INITIAL FORM
  =========================
  */

  showLogin();
});