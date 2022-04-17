//The main file that runs everything
import { products } from "./productNames.js";
// import {Cart} from "./cart.js";

let cartIdCounter = 0;
let itemIdCounter = 0;

function displayCartItem(itemId){
    const newItemDiv = document.createElement("div");
    const plusButton = document.createElement("button");
    const minusButton = document.createElement("button");

    plusButton.setAttribute("id", `plus${itemId}`);
    minusButton.setAttribute("id", `minus${itemId}`);
    newItemDiv.setAttribute("id", `itemDivId${itemId}`);

    plusButton.appendChild(document.createTextNode("+"));
    minusButton.appendChild(document.createTextNode("-"));

    plusButton.classList.add("cartButton");
    minusButton.classList.add("cartButton");

    newItemDiv.classList.add("cartItem");
    newItemDiv.appendChild(plusButton);
    newItemDiv.appendChild(minusButton);

    document.getElementById("currentCart").appendChild(newItemDiv);   
}

function displayProductGridItem(productName){
    const newItemDiv = document.createElement("div");
    const name = document.createElement("p");
    const quant = document.createElement("input");

    console.log(productName)
    name.textContent = productName
    quant.setAttribute("type", "number");
    quant.setAttribute("value", "0");

    name.setAttribute("id", `product-listing-name-${productName}`);
    quant.setAttribute("id",`product-listing-quant-${productName}`);
    newItemDiv.setAttribute("id", `product-listing-div-${productName}`);

    newItemDiv.classList.add("grid-item");
    newItemDiv.appendChild(name);
    newItemDiv.appendChild(quant);
    document.getElementById("grid-container").appendChild(newItemDiv);
}

function build(){
    products.forEach((p) => displayProductGridItem(p));
}

build()