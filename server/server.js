import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import expressSession from 'express-session';
import auth from './auth.js';
import {users} from '../client/js/users.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Database } from './database.js';

class Server {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(logger('dev'));
    this.app.use('/', express.static('client'));
    const sessionConfig = {
      // set this encryption key in Heroku config (never in GitHub)!
      secret: process.env.SECRET || 'SECRET',
      resave: false,
      saveUninitialized: false,
    }
    app.use(expressSession(sessionConfig));
    auth.configure(app);
  }

  // Our own middleware to check if the user is authenticated
  checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // If we are authenticated, run the next route.
    next();
  } else {
    // Otherwise, redirect to the login page.
    res.redirect('/client/html/login.html');
  }
  }

  
  async initRoutes() {
    const self = this;

    //USER ENDPOINTS

    this.app.post("/register", async (req, res) =>
    {
      await self.db.registerUser(req.body.name, req.body.password);
      res.status(200).redirect("/client/html/checkout.html");
    })

    app.get( '/private', checkLoggedIn, // If we are logged in (notice the comma!)...
      (req, res) => {
        // Go to the user's page.
        res.status(200).json({username: req.user});
      }
    );

    //CART ENDPOINTS
    /*
    1. `/user/id/cart/add?item=<item_name>` : To add the item to the user's cart
    2. `/user/id/cart/increment?item=<item_name>` : To increment the item in the user's cart
    3. `/user/id/cart/decrement?item=<item_name>` : To decrement the item in the user's cart
    4. `/user/id/cart/delete?item=<item_name>` : Completely removes an item from the user's cart
    5. `/user/id/cart/empty` : Removes all items from the user's cart
  */
    
    this.app.get('/', function(req, res){
      res.redirect('/html/');
    });
    

    this.app.post('/user/id/cart/add', async (request, response) => {
      const options = request.body;
      await self.db.addItemCart(options.item, options.user);
      response.status(200).json({ status: 'success' });
    });

    this.app.put('/user/id/cart/increment', async (request, response) => {
      const options = request.body;
      await self.db.incrementItemCart(options.item, options.user);
      response.status(200).json({ status: 'success' });
    });

    this.app.put('/user/id/cart/decrement', async (request, response) => {
      const options = request.body;
      await self.db.decrementItemCart(options.item, options.user);
      response.status(200).json({ status: 'success' });
    });

    this.app.delete('/user/id/cart/delete', async (request, response) => {
      const options = request.body;
      await self.db.deleteItemCart(options.item, options.user);
      response.status(200).json({ status: 'success' });
    });

    this.app.get('/user/id/cart/empty', async (request, response) => {
      const options = request.body;
      await self.db.emptyCart(options.user);
      response.status(200).json({ status: 'success' });
    });


    //CHECKOUT ENDPOINTS
    /*
    1. `/user/id/cart`: Allows user to view their cart
    */

    this.app.get('/user/id/cart', async (request, response) => {
      const options = request.body;
      await self.db.getCart(options.user);
      response.status(200).json({ status: 'success' });
    });

    //Items
    this.app.get('/getAllItems', async (request, response) => {
      let items = await self.db.getAllItems();
      response.status(200).json(items);
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

const server = new Server(process.env.DB_URL);
console.log('line 95')
server.start();
console.log('line 97')