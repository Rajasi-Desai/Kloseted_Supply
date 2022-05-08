import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import expressSession from 'express-session';
import auth from './auth.js';
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
    };
    this.app.use(expressSession(sessionConfig));
    auth.configure(this.app);
  }

  async initRoutes() {
    const self = this;
   
    //USER ENDPOINTS

    // Handle post data from the login.html form.
    this.app.post('/login',
      auth.authenticate('local', {
        // use username/password authentication
        successRedirect: '/html/checkout.html', // when we login, go to /checkout
        failureRedirect: '/html/login.html', // otherwise, back to login
      })
    );

    // Handle logging out (takes us back to the login page).
    this.app.get('/logout', (req, res) => {
      req.logout(); // Logs us out!
      res.redirect('/html/login.html'); // back to login
    });

    this.app.post("/register", async (req, res) => {
      const { username, password } = req.body;
      await self.db.registerUser(username, password);
      res.status(200).redirect("/html/checkout.html");
    });

    this.app.get('/private', async (req, res) => {
      if (req.isAuthenticated()) {
        res.status(200).json({ username: req.user });
      }
      else {
        res.status(200).json({ username: null });
      }
    });

    this.app.get('/getUser', async (req, res) => {
      if (req.isAuthenticated()) {
        res.status(200).json(await self.db.getUser(req.query.username));
      }
      else {
        res.status(200).json(null);
      }
    });

    //CART ENDPOINTS

    this.app.get('/', function (req, res) {
      res.redirect('/html/');
    });

    //Add item to the user's cart
    this.app.post('/addItemCart', async (request, response) => {
      await self.db.addItemCart(request.query.itemID, request.query.username);
      response.status(200).json({ status: 'success' });
    });

    //Increments stock of item in user's cart
    this.app.put('/incrementItemCart', async (request, response) => {
      await self.db.incrementItemCart(request.query.itemID, request.query.username);
      response.status(200).json({ status: 'success' });
    });

    //Decrements stock of item in user's cart
    this.app.put('/decrementItemCart', async (request, response) => {
      await self.db.decrementItemCart(request.query.itemID, request.query.username);
      response.status(200).json({ status: 'success' });
    });

    //Deletes item in user's cart
    this.app.delete('/deleteItemCart', async (request, response) => {
      await self.db.deleteItemCart(request.query.itemID, request.query.username);
      response.status(200).json({ status: 'success' });
    });

    //Empties all items from user's cart
    this.app.get('/emptyCart', async (request, response) => {
      await self.db.emptyCart(request.query.username);
      response.status(200).json({ status: 'success' });
    });


    //Gets user's cart
    this.app.get('/getCart', async (request, response) => {
      if (req.isAuthenticated()) {
        res.status(200).json({ cart: await self.db.getCart(req.query.username) });
      }
      else {
        res.status(200).json({ cart: [] });
      }
    });

    //Gets all items from database
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
server.start();