import 'dotenv/config';
import {MongoClient} from 'mongodb';

/** Database consisting of MongoClient, and Sets of Users and Items
 * @property {MongoClient} client
 * @property {Set<User>} users
 * @property {Set<Item>} items
 */
class Database {
    #client;
    #users;
    #items;
    
    /** Returns new Database
     * @param {string} url
     * @returns {Database}
     */
    constructor(url) {
        this.#client = new MongoClient(url);
        this.#users = new Set();
        this.#items = new Set();
    }

    /** 
     * Connects Database to MongoDB
     */
    async connect() {
        await this.#client.connect();
        this.#users = new Set(this.#client.db('supplies').collection('users').find({}).toArray().map(user => new User(user.name, user.password, user.cart)));
        this.#items = new Set(this.#client.db('supplies').collection('items').find({}).toArray().map(item => new Item(item.id, item.name, item.stock, item.image, item.description, item.tags)));
    }

    /**
     * Disconnects Database from MongoDB
     */
    async disconnect() {
        this.#client.close();
    }

    /** 
     * Registers new user in Database
     * @param {string} name
     * @param {string} password
     */
    async registerUser(name, password) {
        const user = new User(name, password);
        this.#users.add(user);
        this.#client.db('supplies').collection('users').insertOne(user.toJSON())
    }

    /**
     * Returns Database's Users
     */
    get users() {
        return this.#users;
    }

    /** 
     * Returns User with given name
     * @param {string} name
     * @returns {Item}
     */
     async getUser(name) {
        return await [...this.#users].find(user => user.name === name);
    }

    /** Adds Item with given identifier to Cart of User with given identifier, and decrements Item's stock in Database
     * @param {string} itemID
     * @param {number} userID
     */
     async cartItem(itemID, username) {
        const item = this.#users.get(this.getItem(itemID));
        this.#users.get(this.getUser(username)).cart.add(item);
        this.decrementItemStock(id);
    }

    /**
     * Returns Database's Items
     */
    get items() {
        return this.#items;
    }
    
    /** 
     * Returns Item with given identifier in Database
     * @param {string} id
     * @returns {Item}
     */
    getItem(id) {
        return [...this.#items].find(item => item.id === id);
    }

    async updateItemstock(stockToRemove, itemId) {
        const item = await this.items.find({id:itemId}).toArray();
        const res = await this.items.updateOne({id:itemId}, { $set: {stock: item.stock - stockToRemove}});
        return res;
    }

    /**
     * Decrements stock of Item with identifier in Database
     * @param {number} id
     */
    decrementItemStock(id) {
        const item = this.getItem(id);
        --this.#items.get(this.getItem(id)).stock;
        this.#client.db('supplies').collection('items').updateOne({id: id}, {$set: {stock: --item.stock}});
    }
}

/** 
 * User consisting of name, password, and Cart
 * @property {string} name
 * @property {string} password
 * @property {Cart} cart
 */
 class User {
    #name;
    #password;
    #cart;
    
    /**
     * Returns new User given name, password, and Cart in JSON format
     * @param {string} name
     * @param {string} password
     * @param {[{id: number, name: string, imageURL: string, stock: number, description: string, tags: Array<string>}, number]} cart
     */
    constructor(name, password, cart = []) {
        this.#name = name;
        this.#password = password;
        this.#cart = new Cart(cart);
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
     * Replaces User's password given new one
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

/** Cart consisting of Map of Items to their quantities
 * @property {Map<Item, number>} contents */
 class Cart {
    #contents;
    
    /**
     * Returns new Cart given its contents in JSON format
     * @param {[{id: number, name: string, imageURL: string, stock: number, description: string, tags: Array<string>}, number]} contents
     */
    constructor (contents) {
        this.#contents = new Map(contents);
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
     * Returns quantity of Item in Cart with given identifier
     * @param {number} id 
     * @return {number}
     */
    getItemQuantity(id) {
        return this.#contents.get(this.getItem(id));
    }
    
    /** 
     * Increments quantity of Item in Cart with given identifier
     * @param {number} id
     */
    incrementItemQuantity(id) {
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
    decrementItemQuantity(id) {
        const item = this.getItem(id);
        this.#contents.set(item, ++this.#contents.get(item));
    }

    /**
     * Removes Item with given identifier from Cart
     * @param {number} id
     */
    removeItem(id) {
        this.#contents.delete(this.getItem(id));
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

/** Item consisting of an identifier, name, stock, image, description, and Array of tags
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
     * Returns new Item given identifier, name, image, stock, description, and Array of tags
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
     * Replaces Item's name given new one
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
     * Replaces Item's image given new one
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
     * Replaces Item's stock given new one
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
     * Replaces Item's tags with given new ones
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
     * Replaces Item's description with given one
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

export {Database, User, Cart, Item};