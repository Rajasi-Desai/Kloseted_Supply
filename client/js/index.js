const logintab = document.getElementById("logintab");
if (localStorage.getItem("loggedIn") === "true") {
  logintab.innerHTML = "<a href='login.html'>Logout</a>";
  logintab.onclick = function () {
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("id");
    window.location.reload();
  };
} else {
  logintab.innerHTML = "<a href='login.html'>Login</a>";
  logintab.removeAttribute("onlick");
}
