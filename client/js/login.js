// Event listener for log in to have the user logged in
// Also for the log in button, check if "remember me" is clicked and save the username and password in the fields
// Also also, send an alert if the username and password don't match an existing user
// Keep "is logged in" true or false in local storage
// Keep the user's id in local storage if they're logged in as well

const usernameinput = document.getElementById("usernameinput");
const passwordinput = document.getElementById("passwordinput");
const rememberme = document.getElementById("rememberme");
const loginbutton = document.getElementById("loginbutton");

let response = await fetch("https://github.com/Rajasi-Desai/326-final-clockwork/blob/a4cd0b6484227f891ed011bde80001f779c86ff8/client/js/dummy-users.json");
if(response.ok)
{
  var users = await response.json();
}
else
{
  alert("HTTP-Error: " + response.status);
}