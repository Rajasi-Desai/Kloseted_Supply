import {Item} from './item.js';

/**
 * @property {number} id
 * @property {Object<Item, number>} items
 */

class Cart {
    #id;
    #items;
    
    /** @param {number} id */
    constructor (id) {
        if (!typeof id === 'number') {
            console.error(`Cannot create cart with identifier of type ${typeof id}`);
        }

        this.#id = id;
        this.#items = {};
    }

    get id() {
        return this.#id;
    }

    get items() {
        return this.#items;
    }
  
    /** @param {Item} item */
    add(item) {
        if (!item instanceof Item) {
            console.error(`Cannot add ${typeof item} to Cart ${this.#id}`);
        }
        if (item in items) {
            console.error(`Item ${item.id} already in Cart ${this.#id}`);
        }
        this.#items[item] = 1;
    }
        
    /** @param {Item} item */
     remove(item) {
        if (!item instanceof Item) {
            console.error(`Cannot add ${typeof item} to Cart ${this.#id}`);
        }
        if (!item in items) {
            console.error(`Item ${item.id} not in Cart ${this.#id}`);
        }
        delete this.#items[item];
    }

     /** @param {Item} item */
    increment(item) {
        if (!item instanceof Item) {
            console.error(`Cannot increment quantity of ${typeof item}`);
        }
        if (!item in items) {
            console.error(`Item ${item.id} not in Cart ${this.#id}`);
        }
        this.#items[item]++;
    }

    /** @param {Item} item */
    decrement(item) {
        if (!item instanceof Item) {
            console.error(`Cannot decrement quantity of ${typeof item}`);
        }
        if (!item in items) {
            console.error(`Item ${item.id} not in Cart ${this.#id}`);
        }
        this.#items[item]--;
    }
}

export {Cart};