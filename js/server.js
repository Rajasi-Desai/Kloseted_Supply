//MAKE SEPARATE FOLDERS FOR SERVER AND CLIENT??
import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
const { faker } = require('@faker-js/faker');

//ENDPOINT FUNCTIONS

//LOGIN 

//CART

async function addItem(response, item){
    response.status(200).json({ message: `${item} added to cart`});
}

async function incrementItem(response, item){
    response.status(200).json({ message: `${item} incremented`});
}

async function decrementItem(response, item){
    response.status(200).json({ message: `${item} decremented`});
}

async function deleteItem(response, item){
    response.status(200).json({ message: `${item} deleted`});
}

async function emptyCart(response){
    response.status(200).json({ message: `Cart emptied`});
}

//CHECKOUT

//ITEM


//running the server
const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//make a clint folder?
app.use('/client', express.static('client'));

//LOGIN ENDPOINTS
/*
1. `/user/register`: Register new user
2. `/user/login`: Login existing user
3. `/user/id/update?password=<new_password>`: Update user's password
*/

app.post('/user/register', async (request, response) => {
    //await reload(JSONfile); Reload old stuff
    //const options = request.body;
    //addItem(response, options.item);
    //await saveRecords(); //save stuff
});

app.get('/user/login', async (request, response) => {
    //await reload(JSONfile); Reload old stuff
    //const options = request.body;
    //addItem(response, options.item);
    //await saveRecords(); //save stuff
});

app.put('/user/id/update?password=<new_password>', async (request, response) => {
    //await reload(JSONfile); Reload old stuff
    const options = request.body;
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

app.post('/user/id/cart/add', async (request, response) => {
    //await reload(JSONfile); Reload old stuff
    const options = request.body;
    addItem(response, options.item);
    //await saveRecords(); //save stuff
});

app.put('/user/id/cart/increment', async (request, response) => {
    //await reload(JSONfile); Reload old stuff
    const options = request.query;
    incrementItem(response, options.item);
    //await saveRecords(); //save stuff
});

app.put('/user/id/cart/decrement', async (request, response) => {
    //await reload(JSONfile); Reload old stuff
    const options = request.query;
    decrementItem(response, options.item);
    //await saveRecords(); //save stuff
});

app.delete('/user/id/cart/delete', async (request, response) => {
    //await reload(JSONfile); Reload old stuff
    const options = request.query;
    deleteItem(response, options.item);
    //await saveRecords(); //save stuff
});
  
app.get('/user/id/cart/empty', async (request, response) => {
    //await reload(JSONfile); Reload old stuff
    //const options = request.query;
    emptyCart(response);
    //await saveRecords(); //save stuff
});


//CHECKOUT ENDPOINTS
/*
1. `/user/id/checkout/view`: Allows user to view items and checkout
2. `/user/id/cart`: Allows user to view their cart
*/

app.get('/user/id/checkout/view', async (request, response) => {
    //await reload(JSONfile); Reload old stuff
    //const options = request.query;
    //emptyCart(response);
    //await saveRecords(); //save stuff
});

app.get('/user/id/cart', async (request, response) => {
    //await reload(JSONfile); Reload old stuff
    //const options = request.query;
    //emptyCart(response);
    //await saveRecords(); //save stuff
});


//ITEM ENDPOINTS
/*
1. `/item/id/view`: Allows for viewing a item which will self contain it's tag information, quantity, and description
2. `/item/id/update?quantity=<value>`: Allows to update an item's quantity
3. `/item/id/update?tag=<value>` : Allows to update the item's tags.
4. `/item/id/update?description=<value>`: Allows to update an item's description
5. `/item/create?name=<item_name>&quantity=<quantity>&tag=<tag_values>&description=<desc_value>`: Allows for creating an item for the database.
6. `/item/id/delete` : Deletes the item from the database
*/

app.get('/item/id/view', async (request, response) => {
    //await reload(JSONfile); Reload old stuff
    //const options = request.query;
    //emptyCart(response);
    //await saveRecords(); //save stuff
});

app.put('/item/id/update', async (request, response) => {
    //await reload(JSONfile); Reload old stuff
    const options = request.query;
    //emptyCart(response);
    //await saveRecords(); //save stuff
});

app.post('/item/create', async (request, response) => {
    //await reload(JSONfile); Reload old stuff
    const options = request.query;
    //emptyCart(response);
    //await saveRecords(); //save stuff
});

app.delete('/item/id/delete', async (request, response) => {
    //await reload(JSONfile); Reload old stuff
    //const options = request.query;
    //emptyCart(response);
    //await saveRecords(); //save stuff
});


//start the port and listen commands
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });