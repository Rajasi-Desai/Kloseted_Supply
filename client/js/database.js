import 'dotenv/config';
import {MongoClient, ServerApiVersion} from 'mongodb';

/** Database
 * @property {string} url
 */
class Database {
    #url;
    #client;
    
    /**@param {string} url */
    constructor(url) {
        this.#url = url;
        
    }
}

export {Database};


// import 'dotenv/config';
// import { MongoClient, ServerApiVersion } from 'mongodb';

// export class PeopleDatabase {
//   constructor(dburl) {
//     this.dburl = dburl;
//   }

//   async connect() {
//     this.client = await MongoClient.connect(this.dburl, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverApi: ServerApiVersion.v1,
//     });

//     // Get the database.
//     this.db = this.client.db('peopleDB');

//     // Init the database.
//     await this.init();
//   }

//   async init() {
//     this.collection = this.db.collection('people');
      //  this.collection2 = this.db.collection("scores")

//     const count = await this.collection.countDocuments();

//     if (count === 0) {
//       await this.collection.insertMany([
//         { _id: '1', name: 'Artemis', age: 19 },
//         { _id: '2', name: 'Parzival', age: 17 },
//         { _id: '3', name: 'John', age: 30 },
//         { _id: '4', name: 'Mia', age: 22 },
//       ]);
//     }
//   }

//   // Close the pool.
//   async close() {
//     this.client.close();
//   }

  // CREATE a user in the database.
 // async createPerson(id, name, age) {
//    const res = await this.collection.insertOne({ _id: id, name, age });
    // Note: the result received back from MongoDB does not contain the
    // entire document that was inserted into the database. Instead, it
    // only contains the _id of the document (and an acknowledged field).
    //return res;
  //}

//   // READ a user from the database.
//   async readPerson(id) {
//     const res = await this.collection.findOne({ _id: id });
//     return res;
//   }

//   // UPDATE a user in the database.
//   async updatePerson(id, name, age) {
//     const res = await this.collection.updateOne(
//       { _id: id },
//       { $set: { name, age } }
//     );
//     return res;
//   }

//   // DELETE a user from the database.
//   async deletePerson(id) {
//     // Note: the result received back from MongoDB does not contain the
//     // entire document that was deleted from the database. Instead, it
//     // only contains the 'deletedCount' (and an acknowledged field).
//     const res = await this.collection.deleteOne({ _id: id });
//     return res;
//   }

//   // READ all people from the database.
//   async readAllPeople() {
//     const res = await this.collection.find({}).toArray();
//     return res;
//   }
// }


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
     *                                              number>}} user
     */
    toJSON() {
        return {id: this.#id, password: this.#password, cart: this.#cart.toJSON()}
    }
}