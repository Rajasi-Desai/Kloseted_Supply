//The main file that runs everything
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

    const quantityDefault = document.createElement("span");
    quantityDefault.appendChild(document.createTextNode("1"));
    quantityDefault.setAttribute("id", "number-of-items");

    /*
    const rightDiv = document.createElement("div");
    rightDiv.appendChild(plusButton);
    rightDiv.appendChild(quantityDefault);
    rightDiv.appendChild(minusButton);
    rightDiv.classList.add("right-div");

    */


    newItemDiv.classList.add("cartItem");
    newItemDiv.appendChild(document.createTextNode(products[itemId]));
    //newItemDiv.appendChild(rightDiv);
    newItemDiv.appendChild(plusButton);
    newItemDiv.appendChild(quantityDefault);
    newItemDiv.appendChild(minusButton);

    //console.log("in");
    document.getElementById("currentCart").appendChild(newItemDiv);
}

async function getAllItems() {
    let allItems = await fetch("../js/dummy-items.json");
    return allItems.json();
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

async function buildProductGrid() {
    let products = await getAllItems();
    if (categoryFilteredIds.length > 0){
        products = products.filter((p) => p.tags.some((tag) => categoryFilteredIds.some((id) => id === tag)))
    }
    products.forEach((p) => displayProductGridItem(p.name));
}

let categoryFilter = [
    { labelName: 'Hygiene', checkBoxTag: 'hygiene' },
    { labelName: 'Hair Care', checkBoxTag: 'hair-care' },
    { labelName: 'Body Care', checkBoxTag: 'body-care' },
    { labelName: 'Dental Care', checkBoxTag: 'dental-care' },
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
    check.setAttribute("value", categoryLabel);

    newItemDiv.setAttribute("id", `product-filter-div-${categoryTag}`);

    newItemDiv.appendChild(check);
    newItemDiv.appendChild(label);
    document.getElementById("column-filter").appendChild(newItemDiv);
}

function buildFilterMenu() {
    categoryFilter.forEach((item) => displayFilterMenuItem(item.labelName, item.checkBoxTag))
}

buildFilterMenu();
buildProductGrid();

let categoryIds = ['filter-check-hygiene',
    'filter-check-hair-care',
    'filter-check-body-care',
    'filter-check-dental-care',
    'filter-check-natural-hair',
    'filter-check-cleaning',
    'filter-check-skincare-firstaid',
    'filter-check-menstrual',
    'filter-check-babyitems',
    'filter-check-paperproducts'];

let categoryFilteredIds = []
categoryIds.forEach((id) => {
    document.getElementById(id).addEventListener("change", function(){
        if (this.checked === true){
            categoryFilteredIds.push(this.value)
        } else {
            categoryFilteredIds = categoryFilteredIds.filter(id => id !== this.value)
        }
        document.getElementById("grid-container").innerHTML = "";
        buildProductGrid();
    })
})

//test
//displayCartItem(4);