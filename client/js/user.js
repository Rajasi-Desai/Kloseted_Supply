import {Cart} from './cart.js';

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