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
        offsetLeft = event.x - 240;
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



document.querySelectorAll("[id^='product-listing-name']").forEach(tags => {
    tags.addEventListener("mouseover", event => {
        mouseOverLink = true;
        storeOffsetTop = getYCoordinateOfLink(event.target).top;
        storeOffsetTop += 18;
        storeOffsetLeft = offsetLeft;

        let cardContainer = document.querySelector('[class*="card-container"]');

        let newTag = event.target.innerHTML.trim()

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
    tags.addEventListener("mouseout", () => {
        mouseOverLink = false;
        let cardContainer = document.querySelector('[class*="card-container"]');
        setTimeout(() => {
            if (!mouseOverCardContainer && cardContainer !== null) {
                //play close animation then delete
                cardContainer.style.animation = "cardContainerOut 0.3s forwards"
                setTimeout(() => {
                    cardContainer.remove()
                    mouseOverCardContainer = false
                }, 300)
            }
        }, 50)
    })
})

function mouseOutOfContainer(cardContainer){
    setTimeout(() => {
        mouseOverCardContainer = false;
        if (!mouseOverLink) {
            //play close animation then delete
            cardContainer.style.animation = "cardContainerOut 0.3s forwards"
            setTimeout(() => {
                cardContainer.remove()
            }, 300)
        }
    }, 50)
}

function mouseInContainer(cardContainer){
    mouseOverCardContainer = true;
}

//get Data for corresponding link being hovered over
async function getData(tagText) {
    let allItems = await fetch("../js/dummy-items.json");
    let items = allItems.json();

    //tag text should be the name of the product
    let theItem = items.filter(item => item.name !== tagText)
    console.log(theItem)
    if (theItem) {
        renderData(theItem[0])
    }
}

function renderData(item) {
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