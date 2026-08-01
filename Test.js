document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector(".start-practice");
  const revealItems = document.querySelectorAll(".reveal-item");

  const qText = document.getElementById("questionText");
  const optionsDiv = document.getElementById("options");
  const qCount = document.getElementById("qCount");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");

  const scoreEl = document.getElementById("score");
  const correctEl = document.getElementById("correct");
  const wrongEl = document.getElementById("wrong");
  const skippedEl = document.getElementById("skipped");
  const reportList = document.getElementById("reportList");
  const analysisSection = document.getElementById("analysisSection");
  const questionsSection = document.getElementById("questions");

  const questions = [
    {
      q: "What does a red traffic light indicate?",
      options: ["Stop", "Go", "Slow down", "Turn left"],
      answer: 0
    },
    {
      q: "What should you do before changing lanes?",
      options: ["Speed up", "Check mirrors", "Honk", "Brake suddenly"],
      answer: 1
    },
    {
      q: "What is the speed limit in city areas usually?",
      options: ["20 km/h", "40-60 km/h", "100 km/h", "120 km/h"],
      answer: 1
    },
    {
      q: "What does a yellow traffic light mean?",
      options: ["Stop immediately", "Go fast", "Prepare to stop", "Ignore"],
      answer: 2
    },
    {
      q: "When should you use seat belts?",
      options: ["Only long drives", "Only highways", "Always", "Never"],
      answer: 2
    },
    {
      q: "What does a 'No Entry' sign mean?",
      options: ["Parking allowed", "Entry allowed", "No entry", "Speed up"],
      answer: 2
    },
    {
      q: "What is safe driving distance?",
      options: ["Very close", "Maintain gap", "Touch vehicle", "No rule"],
      answer: 1
    },
    {
      q: "What should you do at zebra crossing?",
      options: ["Speed up", "Stop for pedestrians", "Ignore", "Honk"],
      answer: 1
    },
    {
      q: "What is the use of rear-view mirrors?",
      options: ["See front", "See back traffic", "Decoration", "Nothing"],
      answer: 1
    },
    {
      q: "When should you use indicators?",
      options: ["After turn", "Before turning", "Never", "Anytime"],
      answer: 1
    }
  ];

  let current = 0;
  let answers = new Array(questions.length).fill(null);

  if (startBtn && questionsSection) {
    startBtn.addEventListener("click", () => {
      questionsSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("show"));
  }

  function loadQuestion() {
    const data = questions[current];
    qText.textContent = data.q;
    qCount.textContent = `Question ${current + 1} / ${questions.length}`;
    optionsDiv.innerHTML = "";

    data.options.forEach((opt, index) => {
      const div = document.createElement("div");
      div.classList.add("option");
      div.textContent = opt;

      if (answers[current] === index) {
        div.classList.add("active");
      }

      div.addEventListener("click", () => {
        answers[current] = index;
        loadQuestion();
      });

      optionsDiv.appendChild(div);
    });

    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === questions.length - 1;

    prevBtn.style.opacity = current === 0 ? "0.6" : "1";
    nextBtn.style.opacity = current === questions.length - 1 ? "0.6" : "1";
  }

  function submitTest() {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    questions.forEach((q, index) => {
      if (answers[index] === null) {
        skipped++;
      } else if (answers[index] === q.answer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const percentage = Math.round((correct / questions.length) * 100);

    scoreEl.textContent = `${percentage}%`;
    correctEl.textContent = correct;
    wrongEl.textContent = wrong;
    skippedEl.textContent = skipped;

    reportList.innerHTML = "";

    questions.forEach((q, index) => {
      const userAns = answers[index];
      let statusClass = "";
      let statusText = "";
      let answerClass = "wrong";

      if (userAns === null) {
        statusClass = "skipped-badge";
        statusText = "Skipped";
        answerClass = "wrong";
      } else if (userAns === q.answer) {
        statusClass = "correct-badge";
        statusText = "Correct";
        answerClass = "correct";
      } else {
        statusClass = "wrong-badge";
        statusText = "Wrong";
        answerClass = "wrong";
      }

      const div = document.createElement("div");
      div.classList.add("report-card");

      div.innerHTML = `
        <span class="status ${statusClass}">${statusText}</span>
        <p><strong>Q${index + 1}:</strong> ${q.q}</p>
        <p class="answer ${answerClass}">
          Your Answer: ${userAns !== null ? q.options[userAns] : "Not Answered"}
        </p>
        <p class="answer correct">
          Correct Answer: ${q.options[q.answer]}
        </p>
      `;

      reportList.appendChild(div);
    });

    alert("Practice Test Completed");

    analysisSection.scrollIntoView({
      behavior: "smooth"
    });
  }

  nextBtn.addEventListener("click", () => {
    if (current < questions.length - 1) {
      current++;
      loadQuestion();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (current > 0) {
      current--;
      loadQuestion();
    }
  });

  submitBtn.addEventListener("click", submitTest);

  loadQuestion();
});