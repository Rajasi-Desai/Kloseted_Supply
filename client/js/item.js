import {faker} from '@faker-js/faker';

/**
 * @property {number} id
 * @property {string} name
 * @property {number} stock
 * @property {string} description
 * @property {Set<string>} tags
 */
class Item {
    #id;
    #name;
    #description;
    #tags;
    #stock;

    /**
     * @param {number} id
     * @param {string} [name]
     * @param {number} [stock]
     * @param {string} [description]
     * @param {Array<string>} [tags]
     * @returns {Item}
     **/
    constructor(id, name = '', stock = 0, description = '', tags = []) {
        if (typeof id !== 'number') {
            console.error(`Cannot create item with identifier of type ${typeof id}`);
        }
        if (typeof name !== 'string') {
            console.error(`Cannot create item with name of type ${typeof name}`);
        }
        if (typeof stock !== 'number') {
            console.error(`Cannot create item with stock of type ${typeof stock}`);
        }
        if (typeof description !== 'string') {
            console.error(`Cannot create item with description of type ${typeof description}`);
        }
        if (!tags instanceof Array) {
            console.error(`Cannot create item with tags of type ${typeof tags}`);
        }
        if (!tags.length && !tags.every(t => typeof t === 'string')) {
            console.error(`Cannot create item with tag of type ${typeof tags.find(t => typeof t !== 'string')}`);
        }

        this.#id = id;
        this.#name = name;
        this.#stock = stock;
        this.#description = description;
        this.#tags = new Set(tags);
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    /** @param {string} name */
    set name(name) {
        if (typeof name !== 'string') {
            console.error(`Cannot set name of Item ${this.#id} to ${typeof name}`);
        }
        this.#name = name;
    }

    get stock() {
        return this.#stock;
    }

    /** @param {number} stock */
    set stock(stock) {
        if (typeof stock !== 'number') {
            console.error(`Cannot set stock of Item ${this.#id} to ${typeof stock}`);
        }
        this.#stock = stock;
    }

    get tags() {
        return this.#tags;
    }

    /** @param tags */
    set tags(tags) {
      if (!tags instanceof Array) {
        console.error(`Cannot set tags of Item ${this.#id} with type ${typeof tags}`);
      }
      if (!tags.length && !tags.every(t => typeof t === 'string')) {
        console.error(`Cannot set tags of Item ${this.#id} with type ${typeof tags.find(t => typeof t !== 'string')}`);
      }
    }

    /** @param {string} tag */
    tag(tag) {
        if (typeof tag !== 'string') {
            console.error(`Cannot tag Item ${this.#id} with type of ${typeof stock}`);
        }
        if (this.#tags.has(tag)) {
            console.error(`Item ${this.id} already has tag "${tag}"`);
        }
        this.#tags.add(tag);
    }

    /** @param {string} tag */
    untag(tag) {
        if (typeof tag !== 'string') {
            cconsole.error(`Cannot untag Item ${this.#id} with type of ${typeof stock}`);
        }
        if (!this.#tags.has(tag)) {
            console.error(`Cannot detag "${tag}" from Item ${this.#id}`);
        }
        this.#tags.delete(tag);
    }

    get description() {
        return this.#description;
    }

    /** @param {string} description */
    set description(description) {
        if (typeof description !== 'string') {
            console.error(`Cannot set description of Item ${this.#id} to ${typeof description}`);
        }
        this.#description = description;
    }
}

export{Item};