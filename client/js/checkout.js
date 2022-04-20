// Event listeners to increment and decrement from the cart
// Event listener on checkout button to decrement the stock of items. Should also alert uesr if there isn't enough stock
//const { format } = require("morgan");

const logintab = document.getElementById("logintab");
const table = document.querySelector('table');
const checkout = document.getElementById('checkout');
const empty = document.getElementById('empty');
const user = await(await(await fetch('../js/dummy-users.json')).json()).find(u => u.id = localStorage.getItem('id'));

function renderCart() {
    table.innerHTML = '';

    if (!user || !user.cart.length) {
        const p = document.createElement('p');
        p.textContent = 'No items';
        table.appendChild(p);
    } else {
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
            increment.addEventListener('click', e => {
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
            decrement.addEventListener('click', e => {
                if (item.stock === 1) {
                    tr.innerHTML = '';
                    user.cart.splice(user.cart.findIndex(i => i.id === item.id), 1);
                } else {
                    --item.stock;
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

checkout.addEventListener('click', e => {
    user.cart = [];
    table.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = 'Order submitted!';
    table.appendChild(p);
});

empty.addEventListener('click', e =>  {
    user.cart = [];
    renderCart();
});

if (localStorage.getItem("loggedIn") === "true")
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

renderCart(table);