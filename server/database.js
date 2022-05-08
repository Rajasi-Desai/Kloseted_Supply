import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class Database {
    constructor(dburl) {
        this.dburl = dburl;
    }

    async connect() {
        this.client = await MongoClient.connect(this.dburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });

        // Get the database.
        this.db = this.client.db('supply');

        // Init the database.
        await this.init();
    }

    async init() {
        this.items = this.db.collection('items');
        this.users = this.db.collection('users');
        this.orders = this.db.collection('orders');
    }

    // Close the pool.
    async close() {
        this.client.close();
    }

    //Registers user
    async registerUser(name, password) {
        const res = await this.users.insertOne({ name: name, password: password, cart: [] });
        return res;
    }
    //Gets all users
    async getAllUsers() {
        const users = await this.users.find({}).toArray();
        return users;
    }

    //Gets user
    async getUser(name) {
        const user = await this.users.findOne({name: name});
        console.log(user);
        return user;
    }

    //Adds item to user's cart
    async addItemCart(itemID, username) {
        const item = this.items.findOne({id: itemID});
        const cart = this.users.findOne({name: username}).cart;
        console.log(cart);
        this.items.updateOne({id: itemID}, {$set: {stock: item.stock - 1}});
        item.stock = 1;
        this.users.updateOne({name: username}, {$set: {cart: cart.concat([item])}});
    }

    //Increments stock of item in users cart
    async incrementItemCart(itemID, username) {
        const cart = this.users.findOne({name: username}).cart;
        
        for (let i = 0; i < cart.length; ++i) {
            if (cart[i].id === itemID) {
                ++cart[i].stock;
            }
        }

        this.users.updateOne({name: username}, {$set: {cart: cart}});
    }

    //Decrements stock of item in users cart
    async incrementItemCart(itemID, username) {
        const cart = this.users.findOne({name: username}).cart;
        
        for (let i = 0; i < cart.length; ++i) {
            if (cart[i].id === itemID) {
                --cart[i].stock;
            }
        }

        this.users.updateOne({name: username}, {$set: {cart: cart}});
    }

    //Deletes item from user's cart
    async deleteItemCart(itemID, username) {
        const cart = this.users.findOne({name: username}).cart;
        cart.filter(item => item.id !== itemID);
        this.users.updateOne({name: username}, {$set: {cart: cart}});
    }
    
    //Empties all items from user's cart
    async emptyCart(username) {
        this.users.updateOne({name: username}, {$set: {cart: []}});
    }

    //Gets user's cart
    async getCart(username) {
        const cart = await this.getUser(username).cart;
        return cart;
    }

    //Gets all items
    async getAllItems() {
        const items = await this.items.find({}).toArray();
        return items;
    }

    //Gets item
    async getItem(itemID) {
        const item = await this.items.findOne({id: itemID});
        return item;
    }

    //Places order
    async placeOrder(username) {
        const cart = await this.getUser(username).cart;
        this.orders.insertOne({username: username, timestamp: new Date().toISOString(), items: cart});
    } 
}