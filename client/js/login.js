// Event listener for log in to have the user logged in
// Also for the log in button, check if "remember me" is clicked and save the username and password in the fields
// Also also, send an alert if the username and password don't match an existing user
// Keep "is logged in" true or false in local storage
// Keep the user's id in local storage if they're logged in as well

const usernameinput = document.getElementById("usernameinput");
const passwordinput = document.getElementById("passwordinput");
const rememberme = document.getElementById("rememberme");
const loginbutton = document.getElementById("loginbutton");
const logintab = document.getElementById("logintab");

const localStorage = window.localStorage;

console.log(localStorage);

let response = await fetch("../js/dummy-users.json");
if(response.ok)
{
  var users = await response.json();
}
else
{
  alert("HTTP-Error: " + response.status);
}

if(localStorage.getItem("username") !== null && localStorage.getItem("password") !== null)
{
  usernameinput.value = localStorage.getItem("username");
  passwordinput.value = localStorage.getItem("password");
  rememberme.value = "on";
}

if(localStorage.getItem("loggedIn") === "true")
{
  logintab.innerHTML = "<a class='active' href='login.html'>Logout</a>";
  logintab.onclick = function() {
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("id");
    window.location.reload();
  };
}
else
{
  logintab.innerHTML = "<a class='active' href='login.html'>Login</a>";
  logintab.removeAttribute("onlick");
}

loginbutton.addEventListener("click", login);

function login()
{
  if(usernameinput.value === "")
  {
    window.alert("Must enter a username!");
  }
  else if(passwordinput.value === "")
  {
    window.alert("Must enter a password!");
  }
  for(let i = 0; i < users.length; i++)
  {
    let user = users[i];
    if(user["id"] === usernameinput.value && user["password"] === passwordinput.value)
    {
      if(rememberme.value === "on")
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
      return;
    }
  }
  window.alert("Not a valid account!");
}