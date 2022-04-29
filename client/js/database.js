import {User} from "./user.js";

/**
 * @property {Set<User>} users
 * @property {Set<Item>} items
 */
class Database {
  #users;
  #items;

  /**
   * @param {string} users
   * @param {string} items
   */
  constructor(users, items) {
    const usersResponse = await fetch(users, {method: 'GET'});
    const itemsResponse = await fetch(items, {method: 'GET'});
    console.log(usersResponse);

    this.#users = new Set(await usersResponse.json());
    this.#items = new Set(await itemsResponse.json());
  }

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
  register(user) {
    this.#users.add(new User(user));
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
   const res = await this.collection.insertOne({ _id: id, name, age });
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

//ITEM CLASS

/**
 * @property {number} id
 * @property {string} name
 * @property {string} image
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
   * @param {{id: number, name: string, image: string, stock: number, description: string, tags: Array<string>}} item
   * @returns {Item}
   **/
  constructor(item) {
      this.#id = item.id;
      this.#name = item.name;
      this.#image = item.image;
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

  /** @param {string} name */
  set name(name) {
      this.#name = name;
  }
  
  /** @returns {string} */
  get image() {
    return this.#image;
  }

  /** @param {string} image */
  set image(image) {
    this.#image = image;
  }

  /** @returns {number} */
  get stock() {
      return this.#stock;
  }

  /** @param {number} stock */
  set stock(stock) {
      this.#stock = stock;
  }

  /** @returns {Set<string>} */
  get tags() {
      return this.#tags;
  }

  /** @param tags */
  set tags(tags) {
    this.#tags = tags;
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
}

//CART CLASS

/** @property {Map<Item, number>} contents */
class Cart {
  #contents;
  
  /** @param {[{id: number, name: string, image: string, stock: number, description: string, tags: Array<string>}, number]} contents */
  constructor (contents) {
      this.#contents = new Map(contents.map(content => [new Item(content[0]), content[1]]));
  }

  /** @param {Item} item */
  add(item) {
      this.#contents.set(item, 1);
  }
      
  /** @param {Item} item */
  remove(item) {
      this.#contents.delete(item);
  }

   /** @param {Item} item */
  increment(item) {
      this.#contents.set(item, ++this.#contents.get(item));
  }

  /** @param {Item} item */
  decrement(item) {
      this.#contents.set(item, --this.#contents.get(item));
  }

  empty() {
    this.#contents.clear()
  }
}

/**
 * @property {string} id
 * @property {string} password
 * @property {Cart} cart
 */
 export class User {
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

  get cart() {
      return this.#cart;
  }

  /** @param {string} password */
  set password(password) {
      this.#password = password;
  }
}