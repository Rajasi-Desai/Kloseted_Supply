# Database

We implemented our database `supply` with MongoDB. It has two collections: `items` and `users`.

![](img%5Cfinal%5CLogin-page.png)## `items`

The `items` collection is used store the current inventory of Kloseted Supply.

Each `Item` document has the following format:
```json
{    
    id: Integer, //Item's identification number
    name: String, //Item's name
    stock: Integer, //Item's stock in inventory
    description: String, //Item's description
    tags: Array<String>,  //Item's tags
    image: String  //Filename of Item's image
}
```

## `users` 
The `users` collection is used to store all the users of the website.

Each `User` document has the following format:
```json
{
    name: String, //User's name
    password: String, //User's password
    cart: Array<Item> //User's cart
}
```

# Contribution

### Rajasi: 
I worked on the markdown file and connected the database to Heroku by adding the config variables. I also helped rerouting a few routes. 

### Grace:
I worked on the `Database` class and connected some server endpoints. I also worked on changing on how to get the data from a JSON to getting from a database. 

### Isi:
I implemented the `Database` class and its methods, connecting to the server endpoints. Implemented CRUD operations for the checkout page.

### Aryan:
For the third and final milestone, I implemented all of the authorization and connected CRUD operations for users logging in and registering to the database. As part of this, I allowed the user to access their information while logged in from all pages. I also implemented and fixed server endpoints.