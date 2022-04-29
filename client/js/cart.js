import {Item} from './item.js';

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

export {Cart};