//The main file that runs everything

// const { response } = require("express");

const logintab = document.getElementById("logintab");
if(localStorage.getItem("loggedIn") === "true")
{
  logintab.innerHTML = "<a href='login.html'>Logout</a>";
  logintab.onclick = function() {
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("id");
    window.location.reload();
  };
}
else
{
  logintab.innerHTML = "<a href='login.html'>Login</a>";
  logintab.removeAttribute("onlick");
}

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

let offsetLeft = 0
let tagText = '';

let storeOffsetLeft = 0;
let storeOffsetTop = 0;


let cursorPastHalfWay = false;

let mouseOverCardContainer = false;
let mouseOverLink = false;

window.addEventListener("mousemove", event => {
    let halfWindowWith = window.innerWidth / 2;
    if (event.x > halfWindowWith) {
        cursorPastHalfWay = true;
        offsetLeft = event.x - 45;
    } else {
        cursorPastHalfWay = false;
        offsetLeft = event.x - 45;
    }
})

function getYCoordinateOfLink(l) {
    const rect = l.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY
    };
}

function getAllItems() {
    let allItems = fetch("../js/dummy-items.json").then(res => res.json());
    return allItems
}

function displayProductGridItem(productName, id) {
    const newItemDiv = document.createElement("div");
    const name = document.createElement("p");
    const quant = document.createElement("input");
    const addToCart = document.createElement("button")
    
    name.textContent = productName
    quant.setAttribute("type", "number");
    quant.setAttribute("value", 0);
    quant.setAttribute("min", "0");
    addToCart.textContent = "Add to Cart"


    name.setAttribute("id", `product-listing-name-${id}`);
    quant.setAttribute("id", `product-listing-quant-${id}`);
    newItemDiv.setAttribute("id", `product-listing-div-${id}`);

    addToCart.addEventListener("click", e => {
        
    })

    name.addEventListener("mouseover", event => {
        mouseOverLink = true;
        storeOffsetTop = getYCoordinateOfLink(event.target).top;
        storeOffsetTop += 18;
        storeOffsetLeft = offsetLeft;

        let cardContainer = document.querySelector('[class*="card-container"]');

        let newTag = event.target.innerHTML.trim();
        // console.log(newTag)

        //make sure there are no boolean bugs
        if (cardContainer == null) {
            mouseOverCardContainer = false;
        }

        //if they want view a card and none are currently rendered 
        if (!mouseOverCardContainer) {
            getData(newTag);
        } else if (newTag !== tagText && cardContainer !== null) {
            //if they have quickly switched to view another card
            cardContainer.remove();
            getData(newTag);
        }
        tagText = newTag;
    })
    name.addEventListener("mouseout", () => {
        mouseOverLink = false;
        let cardContainer = document.querySelector('[class*="card-container"]');
        setTimeout(() => {
            if (!mouseOverCardContainer && cardContainer !== null) {
                //play close animation then delete
                cardContainer.style.animation = "cardContainerOut 0.3s forwards"
                setTimeout(() => {
                    cardContainer.remove()
                    mouseOverCardContainer = false
                }, 500)
            }
        }, 100)
    })

    newItemDiv.classList.add("grid-item");
    newItemDiv.appendChild(name);
    newItemDiv.appendChild(quant);
    newItemDiv.appendChild(addToCart);
    document.getElementById("grid-container").appendChild(newItemDiv);
}

function mouseOutOfContainer(cardContainer){
    setTimeout(() => {
        mouseOverCardContainer = false;
        if (!mouseOverLink) {
            //play close animation then delete
            cardContainer.style.animation = "cardContainerOut 0.3s forwards"
            setTimeout(() => {
                cardContainer.remove()
            }, 500)
        }
    }, 100)
}

function mouseInContainer(cardContainer){
    mouseOverCardContainer = true;
}

//get Data for corresponding link being hovered over
async function getData(tagText) {
    let allItems =  getAllItems()//.then(res => res.json())
    let items = allItems;

    //tag text should be the name of the product
    let theItem = items.then(a => {
        renderData(a.filter(item => item.name === tagText)[0])
    })
}

function renderData(item) {
    // console.log(item)
    let cardContainer = document.createElement("div")
    // let renderContent = generateContent(item.tags, item.image, item.description);
    cardContainer.setAttribute("class", "card-container");
    cardContainer.innerHTML = `
          <div class="card-picture-container">
            <img src="../img/${item.image}" alt="${item.name}"/> 
          </div>
          <div class="card-picture-tags">
            <p>${item.tags[0]}</p>
            <p>${item.tags[1]}</p>
            <p>${item.tags[2]}</p>
            <p>${item.description}</p>
          </div>
    `;
    if(cursorPastHalfWay){
        cardContainer.style.clipPath = 'polygoon(-10% 3%, 70% 3%, 75% 0%, 80% 3%, 110% 3%, 110% 110%, -10% 110%)';
    }
    //move element to correct position
    cardContainer.style.top = storeOffsetTop + "px";
    cardContainer.style.left = storeOffsetLeft + "px";

    //add event listener (hovering)
    cardContainer.setAttribute("onmouseleave", "mouseOutOfContainer(this)")
    cardContainer.setAttribute("onmouseover", "mouseInContainer(this)")
    document.querySelector("body").prepend(cardContainer);
}

function buildProductGrid() {
    let products = getAllItems().then(pd => {
        if (categoryFilteredIds.length > 0){
            pd = pd.filter((p) => p.tags.some((tag) => categoryFilteredIds.some((id) => id === tag)))
        }
        pd.forEach((p) => displayProductGridItem(p.name, p.id));
    });
    
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

buildProductGrid();
buildFilterMenu();


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

