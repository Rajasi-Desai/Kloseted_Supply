// to have all item related functions (used by admin staff)

//what am i doing 

class Item {
    constructor(name, tag, quantity, description){
        this.id
        this.name = name
        this.tag = tag
        this.quantity = quantity
        this.description = description
    }

    updateTag(t){
        this.tag = t;
    }

    updateQuantity(q){
        this.quantity = q;
    }

    updateDescription(d){
        this.description = d;
    }
}