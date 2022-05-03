const logintab = document.getElementById("logintab");
const usernameinput = document.getElementById("usernameinput");
const passwordinput = document.getElementById("passwordinput");
const verifypasswordinput = document.getElementById("verifypasswordinput");
const rememberme = document.getElementById("rememberme");
const signupbutton = document.getElementById("signupbutton");
const localStorage = window.localStorage;

if(localStorage.getItem("loggedIn") === "true")
{
  logintab.innerHTML = "<a href='login.html'>Logout</a>";
  logintab.onclick = function() {
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("id");
    window.location.reload();
  };
}
else
{
  logintab.innerHTML = "<a href='login.html'>Login</a>";
  logintab.removeAttribute("onlick");
}

let response = await fetch("../js/users.json");
if(response.ok)
{
  var users = await response.json();
}
else
{
  alert("HTTP-Error: " + response.status);
}

signupbutton.addEventListener("click", signup);

async function signup()
{
  if(localStorage.getItem("loggedIn") === "true")
  {
    window.alert("You are already logged in, please log out first!");
  }
  else if(usernameinput.value === "")
  {
    window.alert("Must enter a username!");
  }
  else if(passwordinput.value === "")
  {
    window.alert("Must enter a password!");
  }
  else if(verifypasswordinput.value === "")
  {
    window.alert("Must enter a password to verify!");
  }
  else if(passwordinput.value !== verifypasswordinput.value)
  {
    window.alert("Passwords must match!");
  }
  else
  {
    window.alert("Account successfully registered!");
    if(rememberme.checked)
    {
      localStorage.setItem("username", usernameinput.value);
      localStorage.setItem("password", passwordinput.value);
    }
    else
    {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
    window.localStorage.setItem("loggedIn", "true");
    window.localStorage.setItem("id", usernameinput.value);
    window.location.reload();
  }
  return;
}