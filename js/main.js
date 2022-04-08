//The main file that runs everything

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