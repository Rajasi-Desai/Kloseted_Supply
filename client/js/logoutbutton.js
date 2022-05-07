const logintab = document.getElementById("logintab");
let response = await fetch("/private", 
    {
        method: "GET",
        headers: {'Content-Type': 'application/json'} 
    });

const user = await response.json();
console.log(user);

if(user !== null)
{
  logintab.innerHTML = "<a href='login.html'>Logout</a>";
  logintab.onclick = function() {
    await fetch("/logout", 
    {
        method: "GET",
        headers: {'Content-Type': 'application/json'} 
    });
  };
}
else
{
  logintab.innerHTML = "<a href='login.html'>Login</a>";
  logintab.removeAttribute("onlick");
}