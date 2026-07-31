const searchInput = document.getElementById("blogSearch");
const searchBtn = document.getElementById("searchBtn");
const searchMessage = document.getElementById("searchMessage");

if (searchBtn && searchInput && searchMessage) {
  const runSearch = () => {
    const value = searchInput.value.trim();

    if (value !== "") {
      searchMessage.textContent = `Showing resources for: ${value}`;
    } else {
      searchMessage.textContent = "Please enter a driving topic to search";
    }
  };

  searchBtn.addEventListener("click", runSearch);

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runSearch();
    }
  });
}

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

const redirectButtons = document.querySelectorAll(".redirect-detail");

redirectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "Blog-detail.html";
  });
});

const subscribeBtn = document.getElementById("subscribeBtn");
const emailInput = document.getElementById("emailInput");
const message = document.getElementById("message");

if (subscribeBtn && emailInput && message) {
  const subscribeUser = () => {
    const email = emailInput.value.trim();

    if (email === "") {
      message.textContent = "Please enter your email address";
      return;
    }

    if (!emailInput.checkValidity()) {
      message.textContent = "Please enter a valid email";
      return;
    }

    message.textContent = "Thank you! You are subscribed for driving tips";
    emailInput.value = "";
  };

  subscribeBtn.addEventListener("click", subscribeUser);

  emailInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      subscribeUser();
    }
  });
}