//add npm modules and a .gitignore file
//MAKE SEPARATE FOLDERS FOR SERVER AND CLIENT??
import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';

//ADD ENDPOINT FUNCTIONS HERE

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

const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//make a clint folder?
app.use('/client', express.static('client'));


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
    const options = request.query;
    emptyCart(response);
    //await saveRecords(); //save stuff
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });