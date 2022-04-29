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