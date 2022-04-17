import { PRODUCTS } from "../js/productNames.js"

function displayProductGridItem(productName){
    const newItemDiv = document.createElement("div");
    const name = document.createElement("p");
    const quant = document.createElement("input");

    name.textContent = productName
    quant.setAttribute("type", "number");
    quant.setAttribute("value", "0");
    quant.setAttribute("min", 0);
    quant.setAttribute("max", 5);

    name.setAttribute("id", `product-category-name-${productName}`);
    quant.setAttribute("id",`product-listing-quant-${productName}`);
    
    newItemDiv.setAttribute("id", `product-listing-div-${productName}`);

    newItemDiv.classList.add("grid-item");
    newItemDiv.appendChild(name);
    newItemDiv.appendChild(quant);
    document.getElementById("grid-container").appendChild(newItemDiv);
}

function build(){
    PRODUCTS.forEach((p) => displayProductGridItem(p));
}

