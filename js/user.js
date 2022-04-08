import {Cart} from './cart.js';

/**
 * @property {string} id
 * @property {string} password
 * @property {Cart} cart
 */
class User {
    #id;
    #password;
    #cart;

    constructor(id, password) {
        if (typeof id !== 'number') {
            console.error(`Cannot create user with identifier of type ${typeof id}`);
        }
        if (typeof password !== 'string') {
            console.error(`Cannot create user with password of type ${typeof password}`);
        }

        this.#id = id;
        this.#password = password;
        this.#cart = new Cart(id);
    }

    get id() {
        return this.#id;
    }

    /** @param {string} password */
    set password(password) {
        if (typeof password !== 'string') {
            console.error(`Cannot set password to ${typeof password}`);
        }
        this.#password = password;
    }
}

export {User};