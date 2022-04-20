// Event listeners to increment and decrement from the cart
// Event listener on checkout button to decrement the stock of items. Should also alert uesr if there isn't enough stock
//const { format } = require("morgan");

const logintab = document.getElementById("logintab");
const table = document.querySelector('table');
const users = await getAllUsers();

async function getAllUsers() {
    let users = await fetch('../js/dummy-users.json');
    return users.json();
}


if (localStorage.getItem("loggedIn") === "true")
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

console.log(await users[localStorage.getItem('id')]);

console.log(await users()[localStorage.getItem('id')]);

if (!JSON.parse(localStorage.getItem('id')) ||
    !await users()[localStorage.getItem('id').cart]) {
    const p = document.createElement('p');
    p.textContent = 'Your shopping Kart is empty';
    table.appendChild(p);
}