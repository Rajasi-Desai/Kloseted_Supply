**Title: Clockwork**
---
**Subtitle: Kloseted supply**
---
**Semester: Spring 2022**
---  

# Overview:

We want to create an inventory tracker for the Student Care Supply Closets that is managed by the Dean of Students Office. The Student Care Supply Closets provides free toiletries and household items for students struggling economically. There is currently no way for students to know if they have the items they need in stock. So we want to create an inventory tracker that will let students know what is currently available. Additionally, we want to create a form for someone to ask how much they need for each item. 

Currently, the Supply Closet uses a Microsoft form to handle any requests. So, we wanted to automate this process for them to a certain degree and also make a user-friendly interface for people who are using this resource. The result is our website, Klosested Supply.

# Team Members:

|No.          | Name      | Github Username |
| ----------- | ----------- | ----------- |
|1.           | Rajasi Desai      | Rajasi-Desai       |
|2.           | Grace Chang   | gracec4227        |
|3.           | Isi Bernoff   | isi-bernoff        |
|4.           | Aryan Mangalik   | amangalik       |


# User Interface: 

The following are the UI views of our application and a brief decription of them:

### Page to login
Used to log into our website.

![Login](../docs/img/mockup/login.png "Page to login")

### Sign up page
Used to register a new user/account if it does not exist. 

![Sign up](../docs/img/mockup/signup.png "Sign up page")

### Homepage with all information
Gives information about the UMass Supply Closet and an overview of the website

![Homepage](../docs/img/mockup/index.png "Homepage")

### Product page
It is the main page where a user can shop for the items in the Supply Closet.

![Product page](../docs/img/mockup/product.png "Product page")

### Product page with the drop down cart
The drop down cart shows the current items in the cart added by the user.

![Product page](../docs/img/ "Product page with the drop down cart")

### Checkout page
Checkout page is used to "checkout" and submit a request for all the items a user has selected

![Checkout](../docs/img/mockup/checkout.png "Checkout page")

### Map page to find locations
This page links Google Maps and points out to all the locations that provide free Menstural products.

![Map](../docs/img/final/Map.png "Map page to find locations")


# APIs: 
> A final up-to-date list/table describing your application’s API



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

# URL Routes/Mappings: 

## User endpoints
- `/register`: Registers a new user
- `/private`: TBD
## Cart endpoints
For all cart endpoints, authentication of the user is required
- `/getCart`: Gets the user's cart
- `/addItemCart`: Adds the given item to the user's cart
- `/incrementItemCart`: Increments the quantity of the given item in the user's cart
- `/decrementItemCart`: Decrements the quantity of the given item in the user's cart
- `/deleteItem`: Deletes the given item from the user's cart
- `/emptyCart`: Deletes all items from the user's cart
## Item endpoints
## Order endpoints


# Authentication/Authorization: 
> A final up-to-date description of how users are authenticated and any permissions for specific users (if any) that you used in your application. You should mention how they relate to which UI views are accessible.

# Division of Labor:

### Rajasi: 


### Grace: 


### Isi:


### Aryan:

# Conclusion: 
> A conclusion describing your team’s experience in working on this project. This should include what you learned through the design and implementation process, the difficulties you encountered, what your team would have liked to know before starting the project that would have helped you later, and any other technical hurdles that your team encountered.

This project was definitely a fun one to do but required a lot of effort. One of the major things we learned through this was team work and collaboration. All four of us were pair programming most of the time for this project using LiveShare in VScode. 

We would have loved to know about authentication and database stuff beforehand beucause later it came to a point where we were rewriting a lot of the code to have it compatible with these things. 

# Link to the hosted application:

https://final-clockwork-326.herokuapp.com/

# Link to the Video:

