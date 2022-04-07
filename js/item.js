// to have all item related functions (used by admin staff)

//what am i doing 

class Item {
    constructor(name, tag, stock, description){
        this.id
        this.name = name
        this.tag = tag
        this.stock = stock
        this.description = description
    }

    updateTag(t){
        this.tag = t;
    }

    updateQuantity(s){
        this.stock = s;
    }

    updateDescription(d){
        this.description = d;
    }
}