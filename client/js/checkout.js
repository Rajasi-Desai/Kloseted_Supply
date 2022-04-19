// Event listeners to increment and decrement from the cart
// Event listener on checkout button to decrement the stock of items. Should also alert uesr if there isn't enough stock

const logintab = document.getElementById("logintab");
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