const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

function showSignup(){
  loginForm.classList.add("hide");
  signupForm.classList.remove("hide");
}

function showLogin(){
  signupForm.classList.add("hide");
  loginForm.classList.remove("hide");
}

loginForm.addEventListener("submit", function(e){
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if(email && password){
    alert("Welcome to NextGear Dashboard 🚗");
    // window.location.href = "dashboard.html";
  }
});

signupForm.addEventListener("submit", function(e){
  e.preventDefault();
  alert("Registration Successful 🚘");
  showLogin();
});