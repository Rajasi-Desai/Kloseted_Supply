# Database

We implemented our database `supply` with MongoDB. It has three collections: `items`, `users`, and `orders`.

## `items`

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

## `orders` 
The `orders` collection is used to store all the orders placed on the website.

Each `Order` document has the following format:
```json
{
    username: String, //Name of user who placed the order
    timestamp: Date, //Time and date user placed the order
    items: Array<Item> //The items the user ordered
}
```

# Contribution

### Rajasi: 
I worked on the markdown file and connected the database to Heroku by adding the config variables.


### Grace: 
I worked on the Database class and connected some server endpoints. I also worked on changing on how to get the data from a JSON to getting from a database

### Isi:
I implemented the `Database` class and its methods, connecting to the server endpoints.

### Aryan: