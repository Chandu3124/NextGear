// section 1
//==================================
//       BLOG HERO JAVASCRIPT
//==================================

const searchInput = document.getElementById("blogSearch");
const searchBtn = document.getElementById("searchBtn");

if (searchBtn && searchInput) {
  searchBtn.addEventListener("click", () => {
    const value = searchInput.value.trim();

    if (value !== "") {
      alert("Searching resources for: " + value);
    } else {
      alert("Please enter a driving topic to search");
    }
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchBtn.click();
    }
  });
}

// section 2
//==================================
//   BLOG CATEGORY FILTER SCRIPT
//==================================

const filterButtons = document.querySelectorAll(".filter-btn");
const resultCards = document.querySelectorAll(".result-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    resultCards.forEach((card) => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || filter === category) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

// section 3 & 4
//==================================
//   BLOG DETAIL REDIRECT SCRIPT
//==================================

const redirectButtons = document.querySelectorAll(".redirect-detail");

redirectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "Blog-detail.html";
  });
});

// section 5
//==================================
//   NEWSLETTER SUBSCRIBE SCRIPT
//==================================

const subscribeBtn = document.getElementById("subscribeBtn");
const emailInput = document.getElementById("emailInput");
const message = document.getElementById("message");

if (subscribeBtn && emailInput && message) {
  subscribeBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (email === "") {
      message.textContent = "Please enter your email address";
      message.style.color = "#ff7900";
      return;
    }

    if (!emailInput.checkValidity()) {
      message.textContent = "Please enter a valid email";
      message.style.color = "#ff7900";
      return;
    }

    message.textContent = "Thank you! You are subscribed for driving tips";
    message.style.color = "#ff7900";
    emailInput.value = "";
  });

  emailInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      subscribeBtn.click();
    }
  });
}