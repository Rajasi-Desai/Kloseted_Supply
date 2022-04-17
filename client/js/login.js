// Event listener for log in to have the user logged in
// Also for the log in button, check if "remember me" is clicked and save the username and password in the fields
// Also also, send an alert if the username and password don't match an existing user
// Keep "is logged in" true or false in local storage
// Keep the user's id in local storage if they're logged in as well

const usernameinput = document.getElementById("usernameinput");
const passwordinput = document.getElementById("passwordinput");
const rememberme = document.getElementById("rememberme");
const loginbutton = document.getElementById("loginbutton");