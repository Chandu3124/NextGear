document.querySelectorAll(".start-test").forEach(btn => {
  btn.addEventListener("click", () => {
    console.log("Start Test Clicked");
  });
});

document.querySelector(".simulator-btn").addEventListener("click", () => {
  console.log("Simulator Booking Clicked");
});
document.querySelector(".theory-btn").addEventListener("click", () => {
  console.log("Theory Test Started");
});

const progress = 75;

const circle = document.querySelector(".progress-circle");
const text = document.getElementById("progressValue");

circle.style.background = `conic-gradient(
  var(--primary) 0% ${progress}%,
  #eee ${progress}% 100%
)`;

text.textContent = progress + "%";

