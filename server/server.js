import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
import { faker } from '@faker-js/faker';

//ENDPOINT FUNCTIONS//
//LOGIN 
class Server {
    constructor() {
        // this.dburl = dburl; -- take in as param later
        this.app = express();
        this.app.use('/', express.static('client'));
    }
    async initRoutes() {
        const self = this;
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        //LOGIN ENDPOINTS
        /*
        1. `/user/register`: Register new user
        2. `/user/login`: Login existing user
        3. `/user/id/update?password=<new_password>`: Update user's password
        */

        this.app.post('/user/register', async (request, response) => {
            //await reload(JSONfile); Reload old stuff
            //const options = request.body;
            //addItem(response, options.item);
            //await saveRecords(); //save stuff
        });

        this.app.get('/user/login', async (request, response) => {
            //await reload(JSONfile); Reload old stuff
            //const options = request.body;
            //addItem(response, options.item);
            //await saveRecords(); //save stuff
        });

        this.app.put('/user/id/update', async (request, response) => {
            //await reload(JSONfile); Reload old stuff
            const options = request.body;
            //options.password
            //addItem(response, options.item);
            //await saveRecords(); //save stuff
        });


        //CART ENDPOINTS
        /*
        1. `/user/id/cart/add?item=<item_name>` : To add the item to the user's cart
        2. `/user/id/cart/increment?item=<item_name>` : To increment the item in the user's cart
        3. `/user/id/cart/decrement?item=<item_name>` : To decrement the item in the user's cart
        4. `/user/id/cart/delete?item=<item_name>` : Completely removes an item from the user's cart
        5. `/user/id/cart/empty` : Removes all items from the user's cart
        */

        this.app.post('/user/id/cart/add', async (request, response) => {
            //await reload(JSONfile); Reload old stuff
            const options = request.body;
            addItemCart(response, options.item, options.cart);
            //await saveRecords(); //save stuff
        });

        this.app.put('/user/id/cart/increment', async (request, response) => {
            //await reload(JSONfile); Reload old stuff
            const options = request.body;
            incrementItemCart(response, options.item, options.cart);
            //await saveRecords(); //save stuff
        });

        this.app.put('/user/id/cart/decrement', async (request, response) => {
            //await reload(JSONfile); Reload old stuff
            const options = request.body;
            decrementItemCart(response, options.item, options.cart);
            //await saveRecords(); //save stuff
        });

        this.app.delete('/user/id/cart/delete', async (request, response) => {
            //await reload(JSONfile); Reload old stuff
            const options = request.body;
            deleteItemCart(response, options.item, options.cart);
            //await saveRecords(); //save stuff
        });

        this.app.get('/user/id/cart/empty', async (request, response) => {
            //await reload(JSONfile); Reload old stuff
            const options = request.body;
            emptyCart(response, options.cart);
            //await saveRecords(); //save stuff
        });


        //CHECKOUT ENDPOINTS
        /*
        1. `/user/id/checkout/view`: Allows user to view items and checkout
        2. `/user/id/cart`: Allows user to view their cart
        */

        this.app.get('/user/id/checkout/view', async (request, response) => {
            //await reload(JSONfile); Reload old stuff
            //const options = request.query;
            //emptyCart(response);
            //await saveRecords(); //save stuff
        });

        this.app.get('/user/id/cart', async (request, response) => {
            //await reload(JSONfile); Reload old stuff
            //const options = request.query;
            //emptyCart(response);
            //await saveRecords(); //save stuff
        });

    }
    async start() {
        await this.initRoutes();
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => {
          console.log(`PeopleServer listening on port ${port}!`);
        });
    }
}

async function registerUser(name, password, id, cart) {
    response.status(200);
}

//async???
async function loginUser(name, password) {
    response.status(200);
}

const server = new Server();
server.start();


/*
async function updatePassword(user, new_password){
    response.status(200);
}
*/



// //CART

// async function addItemCart(response, item, cart) {
//     cart.add(item);
//     response.status(200).json({ message: `${item} added to cart` });
// }

// async function incrementItemCart(response, item, cart) {
//     cart.increment(item);
//     response.status(200).json({ message: `${item} incremented` });
// }

// async function decrementItemCart(response, item, cart) {
//     cart.decrement(item);
//     response.status(200).json({ message: `${item} decremented` });
// }

// async function deleteItemCart(response, item, cart) {
//     cart.remove(item);
//     response.status(200).json({ message: `${item} deleted` });
// }

// async function emptyCart(response, cart) {
//     cart.empty();
//     response.status(200).json({ message: `Cart emptied` });
// }

// //CHECKOUT

// async function displayItems(response) {
//     response.status(200);
// }

// /*
// //ITEM

// async function getItem(item) {
//     response.status(200).json({ id: item.id(), name:item.name(), stock: item.stock(), tags: item.tags(), description: item.description()});
// }

// async function createItem(id, name, tags, description, stock){
//     //use item.js
//     response.status(200);
// }

// async function updateItem(){
//     response.status(200);
// }

// async function deleteItem(){
//     response.status(200);
// }

// */

// //running the server
// const app = express();
// const port = 3000;
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// //make a clint folder?
// app.use('/client', express.static('client'));

// //LOGIN ENDPOINTS
// /*
// 1. `/user/register`: Register new user
// 2. `/user/login`: Login existing user
// 3. `/user/id/update?password=<new_password>`: Update user's password
// */

// app.post('/user/register', async (request, response) => {
//     //await reload(JSONfile); Reload old stuff
//     //const options = request.body;
//     //addItem(response, options.item);
//     //await saveRecords(); //save stuff
// });

// app.get('/user/login', async (request, response) => {
//     //await reload(JSONfile); Reload old stuff
//     //const options = request.body;
//     //addItem(response, options.item);
//     //await saveRecords(); //save stuff
// });

// app.put('/user/id/update', async (request, response) => {
//     //await reload(JSONfile); Reload old stuff
//     const options = request.body;
//     //options.password
//     //addItem(response, options.item);
//     //await saveRecords(); //save stuff
// });


// //CART ENDPOINTS
// /*
// 1. `/user/id/cart/add?item=<item_name>` : To add the item to the user's cart
// 2. `/user/id/cart/increment?item=<item_name>` : To increment the item in the user's cart
// 3. `/user/id/cart/decrement?item=<item_name>` : To decrement the item in the user's cart
// 4. `/user/id/cart/delete?item=<item_name>` : Completely removes an item from the user's cart
// 5. `/user/id/cart/empty` : Removes all items from the user's cart
// */

// app.post('/user/id/cart/add', async (request, response) => {
//     //await reload(JSONfile); Reload old stuff
//     const options = request.body;
//     addItemCart(response, options.item, options.cart);
//     //await saveRecords(); //save stuff
// });

// app.put('/user/id/cart/increment', async (request, response) => {
//     //await reload(JSONfile); Reload old stuff
//     const options = request.body;
//     incrementItemCart(response, options.item, options.cart);
//     //await saveRecords(); //save stuff
// });

// app.put('/user/id/cart/decrement', async (request, response) => {
//     //await reload(JSONfile); Reload old stuff
//     const options = request.body;
//     decrementItemCart(response, options.item, options.cart);
//     //await saveRecords(); //save stuff
// });

// app.delete('/user/id/cart/delete', async (request, response) => {
//     //await reload(JSONfile); Reload old stuff
//     const options = request.body;
//     deleteItemCart(response, options.item, options.cart);
//     //await saveRecords(); //save stuff
// });

// app.get('/user/id/cart/empty', async (request, response) => {
//     //await reload(JSONfile); Reload old stuff
//     const options = request.body;
//     emptyCart(response, options.cart);
//     //await saveRecords(); //save stuff
// });


// //CHECKOUT ENDPOINTS
// /*
// 1. `/user/id/checkout/view`: Allows user to view items and checkout
// 2. `/user/id/cart`: Allows user to view their cart
// */

// app.get('/user/id/checkout/view', async (request, response) => {
//     //await reload(JSONfile); Reload old stuff
//     //const options = request.query;
//     //emptyCart(response);
//     //await saveRecords(); //save stuff
// });

// app.get('/user/id/cart', async (request, response) => {
//     //await reload(JSONfile); Reload old stuff
//     //const options = request.query;
//     //emptyCart(response);
//     //await saveRecords(); //save stuff
// });

// /*
// //ITEM ENDPOINTS

// 1. `/item/id/view`: Allows for viewing a item which will self contain it's tag information, quantity, and description
// 2. `/item/id/update?quantity=<value>`: Allows to update an item's quantity
// 3. `/item/id/update?tag=<value>` : Allows to update the item's tags.
// 4. `/item/id/update?description=<value>`: Allows to update an item's description
// 5. `/item/create?name=<item_name>&quantity=<quantity>&tag=<tag_values>&description=<desc_value>`: Allows for creating an item for the database.
// 6. `/item/id/delete` : Deletes the item from the database

// app.get('/item/id/view', async (request, response) => {
//     //await reload(JSONfile); Reload old stuff
//     //const options = request.query;
//     //emptyCart(response);
//     //await saveRecords(); //save stuff
// });

// app.put('/item/id/update', async (request, response) => {
//     //await reload(JSONfile); Reload old stuff
//     const options = request.body;
//     //options.quantity; options.tag; options.description
//     //emptyCart(response);
//     //await saveRecords(); //save stuff
// });

// app.post('/item/create', async (request, response) => {
//     //await reload(JSONfile); Reload old stuff
//     const options = request.query;
//     //emptyCart(response);
//     //await saveRecords(); //save stuff
// });

// app.delete('/item/id/delete', async (request, response) => {
//     //await reload(JSONfile); Reload old stuff
//     //const options = request.query;
//     //emptyCart(response);
//     //await saveRecords(); //save stuff
// });

// */


//start the port and listen commands
 //app.listen(port, () => {
   //  console.log(`Server started on port ${port}`);
//});