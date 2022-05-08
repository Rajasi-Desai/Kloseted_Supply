const logintab = document.getElementById("logintab");
const table = document.querySelector('table');
const checkout = document.getElementById('checkout');
const empty = document.getElementById('empty');
let response = await fetch("/private",
    {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    });

const userCheck = await response.json();
const username = userCheck["username"];
const user = await getUser(username);

function renderCart() {
    table.innerHTML = '';

    if (!user || !user.cart.length) {
        const p = document.createElement('p');
        p.textContent = 'No items';
        table.appendChild(p);
    } else {
        console.log(user);
        for (const item of user.cart) {
            const tr = document.createElement('tr');
            table.appendChild(tr);

            const quantity = document.createElement('td');
            quantity.className = 'quantity';
            tr.appendChild(quantity);

            const increment = document.createElement('input');
            increment.type = 'button';
            increment.className = 'increment';
            increment.value = '+';
            increment.addEventListener('click', async () => {
                await incrementCartItem(item.id, user.name);
                ++item.stock;
                renderCart();
            });
            quantity.appendChild(increment);


            const span = document.createElement('span');
            span.className = 'ammount';
            span.textContent = item.stock;
            quantity.appendChild(span);

            const decrement = document.createElement('input');
            decrement.type = 'button';
            decrement.className = 'decrement';
            decrement.value = '\u2212';
            decrement.addEventListener('click', async () => {
                if (item.stock === 1) {
                    tr.innerHTML = '';
                    await deleteCartItem(item.id, user.name);
                    user.cart.splice(user.cart.findIndex(i => i.id === item.id), 1);
                } else {
                    --item.stock;
                    await decrementCartItem(item.id, user.name);
                }
                renderCart();
            });
            quantity.appendChild(decrement);

            const name = document.createElement('td');
            name.className = 'name';
            name.textContent = item.name;
            tr.appendChild(name);
        }
    }
}

checkout.addEventListener('click', async () => {
    user.cart = [];
    table.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = 'Order submitted!';
    table.appendChild(p);
});

empty.addEventListener('click', async () => {
    user.cart = [];
    emptyCart();
    renderCart();
});

if (username !== null) {
    logintab.innerHTML = "<a href='login.html'>Logout</a>";
    logintab.onclick = async function () {
        await fetch("/logout",
            {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
    };
}
else {
    logintab.innerHTML = "<a href='login.html'>Login</a>";
    logintab.removeAttribute("onlick");
}

async function getUser(username) {
    let response = await fetch(`/getUser?username=${username}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const user = await response.json();
    return user;
}

async function incrementCartItem(itemID, username) {
    let response = await fetch(`/incrementCartItem?itemID=${itemID}&username=${username}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const req = await response.json();
    return req;
}

async function decrementCartItem(itemID, username) {
    let response = await fetch(`/decrementCartItem?itemID=${itemID}&username=${username}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const req = await response.json();
    return req;
}

async function deleteCartItem(itemID, username) {
    let response = await fetch(`/deleteCartItem?itemID=${itemID}&username=${username}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const req = await response.json();
    return req;
}

renderCart();