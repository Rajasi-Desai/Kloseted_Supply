const logintab = document.getElementById("logintab");

let response = await fetch("/private", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
});

const user = await response.json();
console.log(user);
const username = user["username"];
console.log(username);

if (username !== null) {
  logintab.innerHTML = "<a href='login.html'>Logout</a>";
  logintab.onclick = async function () {
    await fetch("/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  };
} else {
  logintab.innerHTML = "<a href='login.html'>Login</a>";
  logintab.removeAttribute("onlick");
}
