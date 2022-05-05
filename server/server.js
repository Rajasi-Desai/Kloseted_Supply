import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import expressSession from 'express-session';
import auth from './auth.js';
import users from './users.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Database } from '../client/js/database.js';

class Server {
    constructor(dburl) {
      this.dburl = dburl;
      this.app = express();
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: false }));
      this.app.use(logger('dev'));
      this.app.use('/', express.static('client'));
    }
  
    async initRoutes() {
      const self = this;

        //CART ENDPOINTS
    /*
    1. `/user/id/cart/add?item=<item_name>` : To add the item to the user's cart
    2. `/user/id/cart/increment?item=<item_name>` : To increment the item in the user's cart
    3. `/user/id/cart/decrement?item=<item_name>` : To decrement the item in the user's cart
    4. `/user/id/cart/delete?item=<item_name>` : Completely removes an item from the user's cart
    5. `/user/id/cart/empty` : Removes all items from the user's cart
    */

      this.app.post('/user/id/cart/add', async (request, response) => {
        const options = request.body;
        await self.db.addItemCart(options.item, options.cart);
        response.status(200).json({ status: 'success' });
      });

      this.app.put('/user/id/cart/increment', async (request, response) => {
        const options = request.body;
        await self.db.incrementItemCart(options.item, options.cart);
        response.status(200).json({ status: 'success' });
      });

      this.app.put('/user/id/cart/decrement', async (request, response) => {
        const options = request.body;
        await self.db.decrementItemCart(options.item, options.cart);
        response.status(200).json({ status: 'success' });
      });

      this.app.delete('/user/id/cart/delete', async (request, response) => {
        const options = request.body;
        await self.db.deleteItemCart(options.item, options.cart);
        response.status(200).json({ status: 'success' });
      });

      this.app.get('/user/id/cart/empty', async (request, response) => {
        const options = request.body;
        await self.db.emptyCart(options.cart);
        response.status(200).json({ status: 'success' });
      });


      //CHECKOUT ENDPOINTS
      /*
      1. `/user/id/checkout/view`: Allows user to view items and checkout
      2. `/user/id/cart`: Allows user to view their cart
      */

      this.app.get('/user/id/checkout/view', async (request, response) => {
        await self.db.getCart(options.cart);
        response.status(200).json({ status: 'success' });
      });

      this.app.get('/user/id/cart', async (request, response) => {
        await self.db.getCart(options.cart);
        response.status(200).json({ status: 'success' });
      });

    }
  
    async initDb() {
      this.db = new Database(this.dburl);
      await this.db.connect();
    }
  
    async start() {
      await this.initRoutes();
      await this.initDb();
      const port = process.env.PORT || 8080;
      this.app.all('*', async (request, response) => {
        response.status(404).send(`Not found: ${request.path}`);
      });
      this.app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
      });
    }
  }
  
  const server = new Server(process.env.DATABASE_URL)
  server.start();











// //ENDPOINT FUNCTIONS//
// //LOGIN 

// async function registerUser(name, password, id, cart) {
//     response.status(200);
// }

// async function loginUser(name, password) {
//     response.status(200);
// }

// async function updatePassword(user, new_password){
//     response.status(200);
// }


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

// // //running the server
// const app = express();
// const port = process.env.PORT || 3000;

// // Session configuration
// const sessionConfig = {
//     // set this encryption key in Heroku config (never in GitHub)!
//     secret: process.env.SECRET || 'SECRET',
//     resave: false,
//     saveUninitialized: false,
// };

// app.use(expressSession(sessionConfig));
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use('/', express.static('client'));

// auth.configure(app);

// // //LOGIN ENDPOINTS
// // /*
// // 1. `/user/register`: Register new user
// // 2. `/user/login`: Login existing user
// // 3. `/user/id/update?password=<new_password>`: Update user's password
// // */

// app.get('/', function(req, res){
//     res.redirect('/html/');
// });

// app.post('/user/register', async (request, response) => {
//     response.send("Work in progress, will add data to database");
// });

// //ALL GETs work in the browser
// app.get('/user/login', async (request, response) => {
//     response.send("Work in progress");
// });

// app.put('/user/id/update', async (request, response) => {
//     //await reload(JSONfile); Reload old stuff
//     const options = request.body;
//     response.send("Work in progress");
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
//     const options = request.body;
//     addItemCart(response, options.item, options.cart);
// });

// app.put('/user/id/cart/increment', async (request, response) => {
//     const options = request.body;
//     incrementItemCart(response, options.item, options.cart);
// });

// app.put('/user/id/cart/decrement', async (request, response) => {
//     const options = request.body;
//     decrementItemCart(response, options.item, options.cart);
// });

// app.delete('/user/id/cart/delete', async (request, response) => {
//     const options = request.body;
//     deleteItemCart(response, options.item, options.cart);
// });

// app.get('/user/id/cart/empty', async (request, response) => {
//     const options = request.body;
//     emptyCart(response, options.cart);
// });


// //CHECKOUT ENDPOINTS
// /*
// 1. `/user/id/checkout/view`: Allows user to view items and checkout
// 2. `/user/id/cart`: Allows user to view their cart
// */

// app.get('/user/id/checkout/view', async (request, response) => {
//     response.send("Work in progress");
// });

// app.get('/user/id/cart', async (request, response) => {
//     response.send("Work in progress");
// });


// //start the port and listen commands
// //  app.listen(port, () => {
// //     console.log(`Server started on port ${port}`);
// // });