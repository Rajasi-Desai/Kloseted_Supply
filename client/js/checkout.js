const logintab = document.getElementById("logintab");
const table = document.querySelector('table');
const checkout = document.getElementById('checkout');
const empty = document.getElementById('empty');
let response = await fetch("/private", 
    {
        method: "GET",
        headers: {'Content-Type': 'application/json'} 
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
                incrementCartItem(item.id);
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

if(username !== null)
{
  logintab.innerHTML = "<a href='login.html'>Logout</a>";
  logintab.onclick = async function() {
    await fetch("/logout", 
    {
        method: "GET",
        headers: {'Content-Type': 'application/json'} 
    });
  };
}
else
{
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

renderCart();