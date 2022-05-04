import 'dotenv/config';
import {MongoClient, ServerApiVersion} from 'mongodb';

/** Database
 * @property {string} url
 * @property {MongoClient} client
 * @property {Collection<{id: string,
 *                        password: string,
 *                        cart: Array<{id: number,
 *                                     name: string,
 *                                     image: string,
 *                                     stock: number,
 *                                     description: string,
 *                                     tags: Array<string>},
 *                              number>}>} users
 * @property {Collection<{id: number,
 *                            name: string,
 *                            image: string,
 *                            stock: number,
 *                            description: string,
 *                            tags: Array<string>}>} items
 */
class Database {
    #url;
    #client;
    #users;
    #items;
    
    /** Constructs new Database
     * @param {string} url 
     * @returns {Database}
     */
    constructor(url) {
        this.#url = url;
    }

    /** Connects Database to MongoDB */
    async connect() {
        this.#client = await MongoClient.connect(this.#url, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});
        this.#items = this.#client.db('supplies').collection('items');
        this.#users = this.#client.db('supplies').collection('users');
    }

    /** Disconnects Database from MongoDB */
    async disconnect() {
        this.#client.close();
    }

    /** Registers new user
     * @param {string} id
     * @param {string} password
     */
    async registerUser(id, password) {
        return await this.#users.insertOne({id: id, password: password, cart: []});
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

    /** Increments given item's quantity in given user's cart
     * @param {number} itemID
     * @param {string} userID
     */
    async incrementItem(itemID, userID) {
        const item = this.#users.findOne({id: userID}.cart.find(item => item.id === itemID));

        if (!item) {
            this.cartItem(itemID, userID);
        }
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

    async updateItemStock(stockToRemove, itemId) {
        const item = await this.items.find({id:itemId}).toArray();
        const res = await this.items.updateOne({id:itemId}, { $set: {stock: item.stock - stockToRemove}});
        return res;
    }
    
}

/** Item
 * @property {number} id
 * @property {string} name
 * @property {URL} image
 * @property {number} stock
 * @property {string} description
 * @property {Set<string>} tags
 */
class Item {
    #id;
    #name;
    #image;
    #description;
    #tags;
    #stock;
    
    /**
     * @param {{id: number, name: string, imageURL: string, stock: number, description: string, tags: Array<string>}} item
     * @returns {Item}
     **/
    constructor(item) {
        this.#id = item.id;
        this.#name = item.name;
        this.#image = new URL(item.imageURL);
        this.#stock = item.stock;
        this.#description = item.description;
        this.#tags = new Set(item.tags);
    }
    
    /** @returns {number} */
    get id() {
        return this.#id;
    }
    
    /** @returns {string} */
    get name() {
        return this.#name;
    }
    
    /** @param {string} string */
    set name(name) {
        this.#name = name;
    }
    
    /** @returns {string} */
    get image() {
        return this.#image;
    }
    
    /** @param {string} url */
    set image(url) {
        this.#image = new URL(url);
    }
    
    /** @returns {number} */
    get stock() {
        return this.stock;
    }
    
    /** @param {number} stock */
    set stock(stock) {
        this.stock = stock;
    }
    
    /** @returns {Array<string>} */
    get tags() {
        return this.#tags;
    }
    
    /** @param {Array<string>} tags */
    set tags(tags) {
        this.#tags = new Set(tags);
    }
    
    /** @param {string} tag */
    tag(tag) {
        this.#tags.add(tag);
    }
    
    /** @param {string} tag */
    untag(tag) {
        this.#tags.delete(tag);
    }
    
    /** @returns {string} */
    get description() {
        return this.#description;
    }
    
    /** @param {string} description */
    set description(description) {
        this.#description = description;
    }
    
    /** @returns {{id: number, name: string, imageURL: string, stock: number, description: string, tags: Array<string>}} */
    toJSON() {
        return {id: this.#id, name: this.#name, imageURL: this.#image.toJSON(), stock: this.stock, description: this.#description, tags: [...this.#tags]};
    }
}

/** Cart
 * @property {Map<Item, number>} contents */
class Cart {
    #contents;
    
    /** @param {[{id: number, name: string, imageURL: string, stock: number, description: string, tags: Array<string>}, number]} contents */
    constructor (contents) {
        this.#contents = new Map(contents.map(content => [new Item(content[0]), content[1]]));
    }

    /** 
     * @param {number} id
     * @returns {Item}
     */
    getItem(id) {
        return [...this.#contents.keys].find(item => item.id === id);
    }
    
    /** @param {id: number, name: string, imageURL: string, stock: number, description: string, tags: Array<string>} item */
    addItem(item) {
        this.#contents.set(new Item(item), 1);
    }
    
    /** @param {number} id */
    incrementItem(id) {
        const item = this.getItem(id);

        if (this.#contents.get(item) === 0) {
            this.#contents.delete(item);
        } else {
            this.#contents.set(item, ++this.#contents.get(item));
        }
    }

    /** @param {number} id */
    decrementItem(id) {
        const item = this.getItem(id);
        this.#contents.set(item, ++this.#contents.get(item));
    }
    
    empty() {
        this.#contents.clear()
    }
    
    /** @returns {[{id: number, name: string, imageURL: string, stock: number, description: string, tags: Array<string>}, number]} */
    toJSON() {
        return [...this.#contents].map(content => [content[0].toJSON(), content[1]]);
    }
}

/** User
 * @property {string} id
 * @property {string} password
 * @property {Cart} cart
 */
class User {
    #id;
    #password;
    #cart;
    
    /**
     * @param {{id: string, password: string, cart: Array<{id:
     *                                                     number,
     *                                                     name: string,
     *                                                     image: string,
     *                                                     stock: number,
     *                                                     description: string,
     *                                                     tags: Array<string>},
     *                                              number>}} user
     */
    constructor(user) {
        this.#id = user.id;
        this.#password = user.password;
        this.#cart = new Cart(user.cart);
    }
    
    get id() {
        return this.#id;
    }
    
    get password() {
        return this.#password;
    }
    
    /** @param {string} password */
    set password(password) {
        this.#password = password;
    }
    
    /** @returns {Cart} */
    get cart() {
        return this.#cart;
    }

    /**
     * @returns {{id: string, password: string, cart: Array<{id:
     *                                                     number,
     *                                                     name: string,
     *                                                     image: string,
     *                                                     stock: number,
     *                                                     description: string,
     *                                                     tags: Array<string>},
     *                                              number>}}
     */
    toJSON() {
        return {id: this.#id, password: this.#password, cart: this.#cart.toJSON()}
    }
}

export {Database, User, Cart, Item};