import {Item} from './item.js';
const {faker} = require('@faker-js/faker');

/** @property {Map<Item, number>} contents */
class Cart {
    #contents;
    
    /** @param {Array<Array<Item, number>>} [contents] */
    constructor (contents = [[]]) {
        if (!contents instanceof Array) {
            console.error(`Cannot create cart with contents of type ${typeof contents}`);
        }
        if (!contents.every(a => a.length === 2 && a[0]
                            instanceof Item &&
                            typeof a[1] === 'number')) {
            console.error('Cart contents Array must have elements of type Array<Item, number>');
        }

        this.#contents = new Map(contents);
    }
  
    /** @param {Item} item */
    add(item) {
        if (!item instanceof Item) {
            console.error(`Cannot add ${typeof item} to Cart ${this.#id}`);
        }
        if (this.#contents.has(item)) {
            console.error(`Item ${item.id} already in Cart ${this.#id}`);
        }
        this.#contents.set(item, 1);
    }
        
    /** @param {Item} item */
     remove(item) {
        if (!item instanceof Item) {
            console.error(`Cannot add ${typeof item} to Cart ${this.#id}`);
        }
        if (!this.#contents.has(item)) {
            console.error(`Item ${item.id} not in Cart ${this.#id}`);
        }
        this.#contents.delete(item);
    }

     /** @param {Item} item */
    increment(item) {
        if (!item instanceof Item) {
            console.error(`Cannot increment quantity of ${typeof item}`);
        }
        if (!this.#contents.has(item)) {
            console.error(`Item ${item.id} not in Cart ${this.#id}`);
        }
        this.#contents.set(item, ++this.#contents.get(item));
    }

    /** @param {Item} item */
    decrement(item) {
        if (!item instanceof Item) {
            console.error(`Cannot decrement quantity of ${typeof item}`);
        }
        if (!this.#contents.has(item)) {
            console.error(`Item ${item.id} not in Cart ${this.#id}`);
        }
        this.#contents.set(item, --this.#contents.get(item));
    }

    empty() {
      this.#contents.clear()
    }
}

export {Cart};