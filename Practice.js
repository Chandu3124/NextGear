// section 1
// START PRACTICE BUTTON

const startBtn = document.querySelector(".start-practice");


startBtn.addEventListener("click",()=>{

 document.getElementById("questions").scrollIntoView({

  behavior:"smooth"

 });

});



// BUTTON HOVER EFFECT

const buttons=document.querySelectorAll(".btn");


buttons.forEach(btn=>{

 btn.addEventListener("mouseenter",()=>{

  btn.style.transform="translateY(-3px)";

 });


 btn.addEventListener("mouseleave",()=>{

  btn.style.transform="translateY(0)";

 });

});

// section 2

// Reveal animation on scroll
const cards = document.querySelectorAll(".feature-card");

window.addEventListener("scroll", () => {
  let triggerBottom = window.innerHeight * 0.85;

  cards.forEach(card => {
    let cardTop = card.getBoundingClientRect().top;

    if(cardTop < triggerBottom){
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});

// Initial hidden state
cards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "0.6s ease";
});

// section 3

const steps = document.querySelectorAll(".step");

window.addEventListener("scroll", () => {
  let triggerBottom = window.innerHeight * 0.85;

  steps.forEach(step => {
    let top = step.getBoundingClientRect().top;

    if(top < triggerBottom){
      step.style.opacity = "1";
      step.style.transform = "translateY(0)";
    }
  });
});

// Initial state
steps.forEach(step => {
  step.style.opacity = "0";
  step.style.transform = "translateY(40px)";
  step.style.transition = "0.6s ease";
});
// section 4

const questions = [
  {
    q:"What does a red traffic light indicate?",
    options:["Stop","Go","Slow down","Turn left"],
    answer:0
  },
  {
    q:"What should you do before changing lanes?",
    options:["Speed up","Check mirrors","Honk","Brake suddenly"],
    answer:1
  },
  {
    q:"What is the speed limit in city areas usually?",
    options:["20 km/h","40-60 km/h","100 km/h","120 km/h"],
    answer:1
  },
  {
    q:"What does a yellow traffic light mean?",
    options:["Stop immediately","Go fast","Prepare to stop","Ignore"],
    answer:2
  },
  {
    q:"When should you use seat belts?",
    options:["Only long drives","Only highways","Always","Never"],
    answer:2
  },
  {
    q:"What does a 'No Entry' sign mean?",
    options:["Parking allowed","Entry allowed","No entry","Speed up"],
    answer:2
  },
  {
    q:"What is safe driving distance?",
    options:["Very close","Maintain gap","Touch vehicle","No rule"],
    answer:1
  },
  {
    q:"What should you do at zebra crossing?",
    options:["Speed up","Stop for pedestrians","Ignore","Honk"],
    answer:1
  },
  {
    q:"What is the use of rear-view mirrors?",
    options:["See front","See back traffic","Decoration","Nothing"],
    answer:1
  },
  {
    q:"When should you use indicators?",
    options:["After turn","Before turning","Never","Anytime"],
    answer:1
  }
];

let current = 0;
let answers = new Array(questions.length).fill(null);

const qText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const qCount = document.getElementById("qCount");

// LOAD QUESTION
function loadQuestion(){
  let data = questions[current];

  qText.textContent = data.q;
  qCount.textContent = `Question ${current+1} / ${questions.length}`;

  optionsDiv.innerHTML = "";

  data.options.forEach((opt,index)=>{
    let div = document.createElement("div");
    div.classList.add("option");
    div.textContent = opt;

    if(answers[current] === index){
      div.classList.add("active");
    }

    div.onclick = () => {
      answers[current] = index;
      loadQuestion();
    };

    optionsDiv.appendChild(div);
  });
}

// NEXT BUTTON
document.getElementById("nextBtn").onclick = () => {
  if(current < questions.length - 1){
    current++;
    loadQuestion();
  }
};

// PREVIOUS BUTTON
document.getElementById("prevBtn").onclick = () => {
  if(current > 0){
    current--;
    loadQuestion();
  }
};

// SUBMIT BUTTON (NO ACTION NOW)
document.getElementById("submitBtn").onclick = () => {
  alert("Test submitted successfully!");
};

// INITIAL LOAD
loadQuestion();

// section 5

document.getElementById("submitBtn").onclick = () => {

  alert("Practice Test Completed");

  let correct = 0;
  let wrong = 0;
  let skipped = 0;

  questions.forEach((q, index)=>{
    if(answers[index] === null){
      skipped++;
    } else if(answers[index] === q.answer){
      correct++;
    } else {
      wrong++;
    }
  });

  let percentage = Math.round((correct / questions.length) * 100);

  // UPDATE SUMMARY
  document.getElementById("score").textContent = percentage + "%";
  document.getElementById("correct").textContent = correct;
  document.getElementById("wrong").textContent = wrong;
  document.getElementById("skipped").textContent = skipped;

  // REPORT BUILD
  let reportList = document.getElementById("reportList");
  reportList.innerHTML = "";

  questions.forEach((q, index)=>{

    let userAns = answers[index];
    let statusClass = "";
    let statusText = "";

    if(userAns === null){
      statusClass = "skipped-badge";
      statusText = "Skipped";
    } 
    else if(userAns === q.answer){
      statusClass = "correct-badge";
      statusText = "Correct";
    } 
    else{
      statusClass = "wrong-badge";
      statusText = "Wrong";
    }

    let div = document.createElement("div");
    div.classList.add("report-card");

    div.innerHTML = `
      <span class="status ${statusClass}">${statusText}</span>
      <p><strong>Q${index+1}:</strong> ${q.q}</p>

      <p class="answer ${userAns === q.answer ? "correct" : "wrong"}">
        Your Answer: ${userAns !== null ? q.options[userAns] : "Not Answered"}
      </p>

      <p class="answer correct">
        Correct Answer: ${q.options[q.answer]}
      </p>
    `;

    reportList.appendChild(div);
  });

  // SCROLL
  document.getElementById("analysisSection").scrollIntoView({
    behavior:"smooth"
  });

};