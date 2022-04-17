//The main file that runs everything
import { products } from "./productNames.js";
// import {Cart} from "./cart.js";
let cartIdCounter = 0;
let itemIdCounter = 0;

function displayCartItem(itemId) {
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

function displayProductGridItem(productName) {
    const newItemDiv = document.createElement("div");
    const name = document.createElement("p");
    const quant = document.createElement("input");

    name.textContent = productName
    quant.setAttribute("type", "number");
    quant.setAttribute("value", "0");
    quant.setAttribute("min", "0");

    name.setAttribute("id", `product-listing-name-${productName}`);
    quant.setAttribute("id", `product-listing-quant-${productName}`);
    newItemDiv.setAttribute("id", `product-listing-div-${productName}`);

    newItemDiv.classList.add("grid-item");
    newItemDiv.appendChild(name);
    newItemDiv.appendChild(quant);
    document.getElementById("grid-container").appendChild(newItemDiv);
}

function buildProductGrid() {
    products.forEach((p) => displayProductGridItem(p));
}

let categoryFilter = [
    { labelName: 'Hygiene', checkBoxTag: 'hygiene' },
    {
        labelName: 'Products for Natural Hair',
        checkBoxTag: 'natural-hair'
    },
    { labelName: 'Cleaning Products', checkBoxTag: 'cleaning' },
    {
        labelName: 'Skin Care / First Aid',
        checkBoxTag: 'skincare-firstaid'
    },
    { labelName: 'Menstrual Products', checkBoxTag: 'menstrual' },
    { labelName: 'Baby Items', checkBoxTag: 'babyitems' },
    { labelName: 'Paper Products', checkBoxTag: 'paperproducts' }
]

function displayFilterMenuItem(categoryLabel, categoryTag) {
    const newItemDiv = document.createElement("div");
    const check = document.createElement("input");
    const label = document.createElement("label");

    label.textContent = categoryLabel;
    label.setAttribute("for", categoryTag)
    check.setAttribute("type", "checkbox");

    label.setAttribute("id", `filter-label-name-${categoryLabel}`);
    check.setAttribute("id", `filter-check-${categoryTag}`);
    check.setAttribute("value", categoryTag)
    newItemDiv.setAttribute("id", `product-filter-div-${categoryTag}`);

    newItemDiv.appendChild(check);
    newItemDiv.appendChild(label);
    document.getElementById("column-filter").appendChild(newItemDiv);


}

function buildFilterMenu(){
    categoryFilter.forEach((item) => displayFilterMenuItem(item.labelName, item.checkBoxTag))
}

buildFilterMenu();

buildProductGrid();