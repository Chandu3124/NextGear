const memoryStore = {
  theme: null,
  direction: null
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

Promise.all([
  fetch("../components/navbar.html").then((res) => res.text()),
  fetch("../components/footer.html").then((res) => res.text())
])
  .then(([navbarData, footerData]) => {
    const navbarMount = document.getElementById("navbar");
    const footerMount = document.getElementById("footer");

    if (navbarMount) navbarMount.innerHTML = navbarData;
    if (footerMount) footerMount.innerHTML = footerData;

    const rtlBtn = document.getElementById("rtlToggle");
    const themeBtn = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const primaryMenu = document.getElementById("primaryMenu");
    const dropdowns = document.querySelectorAll(".dropdown");
    const headerLogo = document.getElementById("siteLogo");
    const footerLogo = document.getElementById("footerLogo");

    function updateLogoByTheme(isDark) {
      [headerLogo, footerLogo].forEach((logo) => {
        if (!logo) return;

        const lightLogo = logo.dataset.lightLogo;
        const darkLogo = logo.dataset.darkLogo;

        logo.src = isDark ? darkLogo : lightLogo;
      });
    }

    function setTheme(theme) {
      const isDark = theme === "dark";
      document.body.classList.toggle("dark", isDark);
      updateLogoByTheme(isDark);

      if (themeBtn) {
        themeBtn.innerHTML = isDark
          ? '<i class="fa-solid fa-sun"></i>'
          : '<i class="fa-regular fa-moon"></i>';
        themeBtn.setAttribute(
          "aria-label",
          isDark ? "Switch to light mode" : "Switch to dark mode"
        );
      }
    }

    function setDirection(direction) {
      const isRTL = direction === "rtl";
      document.documentElement.setAttribute("dir", direction);
      document.body.classList.toggle("rtl", isRTL);

      if (rtlBtn) {
        rtlBtn.setAttribute(
          "aria-label",
          isRTL ? "Switch to left to right layout" : "Switch to right to left layout"
        );
      }
    }

    function setActiveMenu() {
      const currentPath = window.location.pathname.split("/").pop().toLowerCase() || "index.html";
      const navLinks = document.querySelectorAll(".menu a[data-page]");

      navLinks.forEach((link) => {
        const linkPage = (link.dataset.page || "").toLowerCase();
        link.removeAttribute("aria-current");

        if (linkPage === currentPath) {
          link.setAttribute("aria-current", "page");

          const parentDropdown = link.closest(".dropdown");
          if (parentDropdown) {
            const mainLink = parentDropdown.querySelector(":scope > a");
            if (mainLink && !mainLink.hasAttribute("aria-current")) {
              mainLink.setAttribute("aria-current", "page");
            }
          }
        }
      });
    }

    function closeMobileMenu() {
      if (primaryMenu && menuToggle) {
        primaryMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        menuToggle.setAttribute("aria-label", "Open menu");
      }
    }

    if (menuToggle && primaryMenu) {
      menuToggle.addEventListener("click", () => {
        const isOpen = primaryMenu.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.innerHTML = isOpen
          ? '<i class="fa-solid fa-xmark"></i>'
          : '<i class="fa-solid fa-bars"></i>';
        menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      });
    }

    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector(":scope > a");
      const submenu = dropdown.querySelector(".dropdown-menu");

      if (trigger && submenu) {
        trigger.addEventListener("click", (e) => {
          if (window.innerWidth <= 860) {
            e.preventDefault();
            dropdown.classList.toggle("open");
          }
        });
      }
    });

    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 860 && !link.closest(".dropdown-menu")) {
          closeMobileMenu();
        }
      });
    });

    const savedDirection = safeStorage.get("direction") || "ltr";
    setDirection(savedDirection);

    if (rtlBtn) {
      rtlBtn.addEventListener("click", () => {
        const newDirection =
          document.documentElement.getAttribute("dir") === "rtl" ? "ltr" : "rtl";
        setDirection(newDirection);
        safeStorage.set("direction", newDirection);
      });
    }

    const savedTheme =
      safeStorage.get("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    setTheme(savedTheme);

    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
        setTheme(newTheme);
        safeStorage.set("theme", newTheme);
      });
    }

    setActiveMenu();

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) {
        closeMobileMenu();
        dropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
      }
    });
  })
  .catch((err) => console.error("Error loading components:", err));