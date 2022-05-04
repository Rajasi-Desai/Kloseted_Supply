import 'dotenv/config';
import {MongoClient, ServerApiVersion} from 'mongodb';

/** Object consisting of a URL, MongoClient, and Sets of Users and Items; Database class
 * @property {URL} url
 * @property {MongoClient} client
 * @property {Set<User>} users
 * @property {Set<Item>} items
 */
class Database {
    #url;
    #client;
    #users;
    #items;
    
    /** Returns new Database
     * @param {string} url
     * @returns {Database}
     */
    constructor(url) {
        this.#url = new URL(url);
    }

    /** 
     * Connects Database to MongoDB
     */
    async connect() {
        const client = await MongoClient.connect(this.#url, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});
        this.#client = client;
        const users = client.db('supplies').collection('users').find().map(user => new User(user.name, user.password, ))
        //this.#users = users.
    }

    /**
     * Disconnects Database from MongoDB
     */
    async disconnect() {
        this.#client.close();
    }

    /** 
     * Registers new user inDatabase
     * @param {string} name
     * @param {string} password
     */
    registerUser(name, password) {
        this.#users.add(new User(name, password));
        
    }

    /** Returns given item
     * @param {string} id
     * @returns {{id: number,
     *           name: string,
     *           image: string,
     *           stock: number,
     *           description: string,
     *           tags: Array<string>}}
     */
    async getItem(id) {
        return await this.#items.findOne({id: id});
    }

    /** Increments given item's stock in given user's cart
     * @param {number} itemID
     * @param {string} userID
     */
    async incrementItem(itemID, userID) {
        this.#users.findOneAndUpdate({id: userID}, {$set: {cart: this.getCart(userID).map(item => item.id === itemID)}});
    }
    
    /** Removes given item from Database and returns it
     * @param {string} id
     * @returns {{id: number,
     *           name: string,
     *           image: string,
     *           stock: number,
     *           description: string,
     *           tags: Array<string>}}
     */
    async removeItem(id) {
        return item;
    }

    /** Returns given item from Database
     * @param {string} id
     * @returns {{id: number,
     *           name: string,
     *           image: string,
     *           stock: number,
     *           description: string,
     *           tags: Array<string>}}
     */
    async getCart(id) {
        return await this.#users.findOne({id: id}).cart;
    }

    /** Removes given item from Database, adds it to given user's cart, and returns it
     * @param {string} itemID
     * @param {number} userID
     * @returns {{id: number,
     *           name: string,
     *           image: string,
     *           stock: number,
     *           description: string,
     *           tags: Array<string>}}
     */
    async cartItem(itemID, userID) {
        const item = this.removeItem(itemID);
        await this.#users.updateOne({id: userID}, {$set: {cart: this.getCart(userID).concat([item])}});
        return item;
    }
    
    async getUsers() {
        return await this.#users.find({}).toArray();
    }

    async getUser(id) {
        return await this.#users.find({id: id}).toArray();
    }

    async getItems() {
        return await this.items.find({}).toArray();
    }

    async updateItemstock(stockToRemove, itemId) {
        const item = await this.items.find({id:itemId}).toArray();
        const res = await this.items.updateOne({id:itemId}, { $set: {stock: item.stock - stockToRemove}});
        return res;
    }
    
}

/** Object consisting of an identifier, name, stock, image, description, and Array of tags; Item class
 * @property {number} id
 * @property {string} name
 * @property {number} stock
 * @property {URL} image
 * @property {string} description
 * @property {Set<string>} tags
 */
class Item {
    #id;
    #name;
    #stock;
    #image;
    #description;
    #tags;
    
    /**
     * Returns new Item given an identifier, name, image, stock, description, and Array of tags
     * @param {number} id
     * @param {string} name
     * @param {number} stock 
     * @param {string} image
     * @param {string} description
     * @param {Array<string>} tags 
     */
    constructor(id, name, stock, image, description, tags) {
        this.#id = id;
        this.#name = name;
        this.#stock = stock;
        this.#image = new URL(image);
        this.#description = description;
        this.#tags = new Set(tags);
    }
    
    /** 
     * Returns Item's identifier
     * @returns {number}
     */
    get id() {
        return this.#id;
    }
    
    /** 
     * Returns Item's name
     * @returns {string}
     */
    get name() {
        return this.#name;
    }
    
    /**
     * Replaces Item's name givennew one
     * @param {string} string
     */
    set name(name) {
        this.#name = name;
    }
    
    /** 
     * Returns Item's image
     * @returns {string}
     */
    get image() {
        return this.#image;
    }
    
    /**
     * Replaces Item's image givennew one
     * @param {string} image
     */
    set image(image) {
        this.#image = new URL(image);
    }
    
    /**
     * Returns Item's stock
     * @returns {number}
     */
    get stock() {
        return this.#stock;
    }
    
    /**
     * Replaces Item's stock givennew one
     * @param {number} stock
     */
    set stock(stock) {
        this.#stock = stock;
    }
    
    /**
     * Returns Item's tags
     * @returns {Array<string>}
     */
    get tags() {
        return this.#tags;
    }

    /**
     * Replaces Item's tags withgiven ones
     * @param {Array<string>} tags
     */
    set tags(tags) {
        this.#tags = new Set(tags);
    }
    
    /**
     * Adds given tag to Item
     * @param {string} tag
     */
    tag(tag) {
        this.#tags.add(tag);
    }
    
    /**
     * Removes given tag from Item
     * @param {string} tag
     */
    untag(tag) {
        this.#tags.delete(tag);
    }
    
    /** 
     * Returns Item's description
     * @returns {string}
     */
    get description() {
        return this.#description;
    }
    
    /** 
     * Replaces Item's description withgiven one
     * @param {string} description
     */
    set description(description) {
        this.#description = description;
    }
    
    /** @returns {{id: number, name: string, imageURL: string, stock: number, description: string, tags: Array<string>}} */
    toJSON() {
        return {id: this.#id, name: this.#name, imageURL: this.#image.toJSON(), stock: this.#stock, description: this.#description, tags: [...this.#tags]};
    }
}

/** Object consisting of a Map of Items to their quantities; Cart Class
 * @property {Map<Item, number>} contents */
class Cart {
    #contents;
    
    /**
     * Returns new Cart
     */
    constructor () {
        this.#contents = new Map();
    }

    /** 
     * Returns Item in Cart with given identifier
     * @param {number} id
     * @returns {Item}
     */
    getItem(id) {
        return [...this.#contents.keys].find(item => item.id === id);
    }
    
    /**
     * Adds Item in JSON format to cart
     * @param {id: number, name: string, image: string, stock: number, description: string, tags: Array<string>} item
     */
    addItem(item) {
        this.#contents.set(new Item(item), 1);
    }
    
    /** 
     * Increments quantity of Item in Cart with given identifier
     * @param {number} id
     */
    incrementItem(id) {
        const item = this.getItem(id);

        if (this.#contents.get(item) === 0) {
            this.#contents.delete(item);
        } else {
            this.#contents.set(item, ++this.#contents.get(item));
        }
    }
    
    /**
     * Decrements quantity of Item in Cart with given identifier
     * @param {number} id
     */
    decrementItem(id) {
        const item = this.getItem(id);
        this.#contents.set(item, ++this.#contents.get(item));
    }
    
    /**
     * Removes all Items from Cart
     */
    empty() {
        this.#contents.clear()
    }
    
    /** 
     * Returns Cart in JSON format
     * @returns {[{id: number, name: string, imageURL: string, stock: number, description: string, tags: Array<string>}, number]}
     */
    toJSON() {
        return [...this.#contents].map(content => [content[0].toJSON(), content[1]]);
    }
}

/** 
 * Object consisting of a name, password, and Cart; User Class
 * @property {string} name
 * @property {string} password
 * @property {Cart} cart
 */
class User {
    #name;
    #password;
    #cart;
    
    /**
     * Returns new User given a name and password
     * @param {string} name
     * @param {string} password
     */
    constructor(name, password, cart = new Cart()) {
        this.#name = name;
        this.#password = password;
        this.#cart = cart;
    }

    /**
     * Returns User's name
     */
    get name() {
        return this.#name;
    }
    
    /**
     * Returns User's password
     */
    get password() {
        return this.#password;
    }
    
    /**
     * Replaces User's password givennew one
     * @param {string} password
     */
    set password(password) {
        this.#password = password;
    }
    

    /**
     * Returns User's Cart
     * @returns {Cart}
     */
    get cart() {
        return this.#cart;
    }

    /**
     * Returns User in JSON format
     * @returns {{name: string, password: string, cart: Array<{id: number, name: string, image: string, stock: number, description: string, tags: Array<string>}, number>}}
     */
    toJSON() {
        return {name: this.#name, password: this.#password, cart: this.#cart.toJSON()}
    }
}

export {Database, User, Cart, Item};