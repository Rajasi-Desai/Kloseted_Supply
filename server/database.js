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
        this.db = this.client.db('supplies');

        // Init the database.
        await this.init();
    }

    async init() {
        this.items = this.db.collection('items');
        this.users = this.db.collection('users');
    }

    // Close the pool.
    async close() {
        this.client.close();
    }

    // CREATE a user in the database.
    async createPerson(id, name, age) {
        const res = await this.collection.insertOne({ _id: id, name, age });
        // Note: the result received back from MongoDB does not contain the
        // entire document that was inserted into the database. Instead, it
        // only contains the _id of the document (and an acknowledged field).
        return res;
    }
    async registerUser(name, password) {
        const res = await this.users.insertOne({ name: name, password: password, cart: [] });
        return res;
    }
    async getAllUsers() {
        const res = await this.users.find({}).toArray();
        return res;
    }
    async getUser(name) {
        const res = await this.users.findOne({name: name});
        return res;
    }

    //Adds an item to the users cart
    async addItemCart(itemID, username) {
        const item = this.items.findOne({id: itemID});
        this.items.updateOne({id: itemID}, {$set: {stock: --item.stock}});
        const cart = this.users.findOne({name: username}).cart;
        this.users.updateOne({name: username}, {$set: {cart: cart.concat([item])}});
    }

    //Dont need this since we are just adding to the array rather than increm that stock
    async incrementItemCart(itemID, username) {
        const item = this.items.findOne({id: itemID});
        const cart = this.users.findOne({name: username}).cart;
        this.users.updateOne({name: username}, {$set: {cart: cart.concat([item])}});
    }

    async getAllItems() {
        const res = await this.items.find({}).toArray();
        return res;
    }
    async getItem(itemId) {
        const res = await this.items.findOne({id: itemId});
        return res;
    }
}