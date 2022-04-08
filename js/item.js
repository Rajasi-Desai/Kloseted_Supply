/**
 * @property {number} id
 * @property {string} name
 * @property {number} stock
 * @property {string} description
 * @property {Array<string>} tags
 */
class Item {
    #id;
    #name;
    #description;
    #tags;
    #stock;

    /**
     * @param {number} id
     * @param {string} name
     * @param {number} stock
     * @param {string} description
     * @param {Array<string>} tags
     **/
    constructor(id, name, stock, description, tags){
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
        if (tags.some(t => typeof t !== 'string')) {
            console.error(`Cannot create item with tag of type ${typeof tags.find(t => typeof t !== 'string')}`);
        }

        this.id = id;
        this.name = name;
        this.tags = tags;
        this.stock = stock;
        this.description = description;
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

    /** @param {string} tag */
    addTag(tag) {
        if (typeof tag !== 'string') {
            console.error(`Cannot add tag of type ${typeof stock} to Item ${this.#id}`);
        }
        this.#tags.push(tag);
    }

    /** @param {string} tag */
    removeTag(tag) {
        if (typeof tag !== 'string') {
            console.error(`Cannot remove tag of type ${typeof stock} from Item ${this.#id}`);
        }
        this.#tags.filter(t => t === tag);
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