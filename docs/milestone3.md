# Database description:

Database: supply

There are two collections within this database.

## Items

Items collection is used store the current inventory of the Supply Closet. 

Each Item in the database has:
- id - ID for the given item
- name - Name of the Item
- stock - Contains the current stock of the item
- description - Contains the description of the item
- tags - Contains the tags of the items. Used for filtering the products page
- image - Contiains the name of the image file that is used to display the item

```json
item document     
{    
    id: Integer,       
    name: String,  
    stock: Integer,  
    description: String,  
    tags: Array of Strings,  
    image: String  
}
```


## Users 

Users collection is used to store all the users of the website.

Each User in the database has:

- username - Contains the username of the user
- password - Contains the password for the user
- cart - Has the cart of the user
    -  Each cart consists of:
        - id - ID of the cart 
        - items - An array of all items in the cart of type Item along with the quantities of those items in the cart

```json
users document  
{
    username: String,
    password: String,
    cart: {
        id: Integer,
        items: [{
            item: Item, 
            quantity: Integer
            }]
    }
}
```

# Contribution

### Rajasi: 
I worked on the markdown file and connected the database to heroku.


### Grace: 


### Isi:


### Aryan: