// Event listener for signup button to create a new user
// Check that the passwords match
// Use remember me
// The sign up button, when successful, should also log in the new user

const logintab = document.getElementById("logintab");
if(localStorage.getItem("loggedIn") === "true")
{
  logintab.innerHTML = "<a href='login.html'>Logout</a>";
  logintab.onclick = function() {
    localStorage.setItem("loggedIn", "false");
    window.location.reload();
  };
}
else
{
  logintab.innerHTML = "<a href='login.html'>Login</a>";
  logintab.removeAttribute("onlick");
}