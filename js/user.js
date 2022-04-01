//to have all user related functions

class User
{
    
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

    set username(newUsername) // S
    {
        this.username = newUsername;
    }

}