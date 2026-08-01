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
    const footerYear = document.getElementById("footerYear");

    if (footerYear) {
      footerYear.textContent = new Date().getFullYear();
    }

    function updateLogoByTheme(isDark) {
      [headerLogo, footerLogo].forEach((logo) => {
        if (!logo) return;
        const lightLogo = logo.dataset.lightLogo;
        const darkLogo = logo.dataset.darkLogo;
        if (!lightLogo || !darkLogo) return;
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
        themeBtn.setAttribute("aria-pressed", String(isDark));
      }
    }

    function setDirection(direction) {
      const isRTL = direction === "rtl";
      document.documentElement.setAttribute("dir", direction);

      if (rtlBtn) {
        rtlBtn.textContent = isRTL ? "LTR" : "RTL";
        rtlBtn.setAttribute(
          "aria-label",
          isRTL ? "Switch to left to right layout" : "Switch to right to left layout"
        );
        rtlBtn.setAttribute("aria-pressed", String(isRTL));
      }
    }

    function setActiveMenu() {
      const currentPath =
        (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

      const navLinks = document.querySelectorAll(".menu a[data-page], .menu a[href]");

      let mappedPage = currentPath;

      if (currentPath === "service-detail.html") {
        mappedPage = "services.html";
      } else if (currentPath === "blog-detail.html") {
        mappedPage = "blog.html";
      }

      navLinks.forEach((link) => {
        link.removeAttribute("aria-current");

        const dataPage = (link.dataset.page || "").toLowerCase();
        const hrefPage = (link.getAttribute("href") || "")
          .split("/")
          .pop()
          .toLowerCase();

        if (dataPage === mappedPage || hrefPage === mappedPage) {
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

    function closeAllDropdowns() {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const trigger = dropdown.querySelector(":scope > a");
        if (trigger) {
          trigger.setAttribute("aria-expanded", "false");
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

      document.body.classList.remove("menu-open");
      closeAllDropdowns();
    }

    if (menuToggle && primaryMenu) {
      menuToggle.addEventListener("click", () => {
        const isOpen = primaryMenu.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.innerHTML = isOpen
          ? '<i class="fa-solid fa-xmark"></i>'
          : '<i class="fa-solid fa-bars"></i>';
        menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
        document.body.classList.toggle("menu-open", isOpen);

        if (!isOpen) {
          closeAllDropdowns();
        }
      });
    }

    dropdowns.forEach((dropdown, index) => {
      const trigger = dropdown.querySelector(":scope > a");
      const submenu = dropdown.querySelector(".dropdown-menu");

      if (trigger && submenu) {
        if (!submenu.id) {
          submenu.id = `dropdown-menu-${index + 1}`;
        }

        trigger.setAttribute("aria-haspopup", "true");
        trigger.setAttribute("aria-expanded", "false");
        trigger.setAttribute("aria-controls", submenu.id);

        trigger.addEventListener("click", (e) => {
          if (window.innerWidth <= 1024) {
            e.preventDefault();

            const isOpen = dropdown.classList.contains("open");
            closeAllDropdowns();

            if (!isOpen) {
              dropdown.classList.add("open");
              trigger.setAttribute("aria-expanded", "true");
            }
          }
        });
      }
    });

    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 1024) {
          const insideDropdownMenu = link.closest(".dropdown-menu");
          const parentDropdown = link.closest(".dropdown");
          const isTopLevelDropdownTrigger =
            parentDropdown &&
            parentDropdown.querySelector(":scope > a") === link;

          if (insideDropdownMenu || !isTopLevelDropdownTrigger) {
            closeMobileMenu();
          }
        }
      });
    });

    document.addEventListener("click", (e) => {
      const clickedInsideNav = e.target.closest(".nav");

      if (!clickedInsideNav) {
        closeAllDropdowns();

        if (window.innerWidth <= 1024) {
          closeMobileMenu();
        }
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
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
      if (window.innerWidth > 1024) {
        document.body.classList.remove("menu-open");
        closeMobileMenu();
      }
    });
  })
  .catch((err) => console.error("Error loading components:", err));