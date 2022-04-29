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

export{Item};