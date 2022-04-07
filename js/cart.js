// for all cart related functions

import * as http from 'http';
import * as url from 'url';
import { readFile, writeFile } from 'fs/promises';

//cart: [{item, quantity}]

class Cart {
  #items;
  #id;
  
    constructor () {
        this.cart = {};
        this.id
    }

    add (item) {
        //add to cart
        this.cart[item] = 1;
    }

    updateIncrement (item) {
        //update item count
        this.cart[item] += 1;
    }

    updateDecrement (item) {
        //update item count
        this.cart[item] -= 1;
    }

    delete (item) {
        //delete item
        delete this.cart[item];
    }

    read (){
        //returns the entire cart
        return this.cart;
    }
    
}

export {Cart};