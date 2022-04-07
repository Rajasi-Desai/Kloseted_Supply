//to have all user related functions

class User
{
    // Declare variables with # so they aren't publicly accessible
    constructor(username, password, checkout, cart)
    {
        this.username = username;
        this.password = password;
        this.checkout = checkout;
        this.cart = cart;
    }

    get username()
    {
        return this.username;
    }

    set username(newUsername) // Should make this unique
    {
        this.username = newUsername;
    }

}