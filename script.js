document.addEventListener("DOMContentLoaded", () => {

history.scrollRestoration = "manual";

window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant"
});
const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {
    menuButton.onclick = function () {
        mobileMenu.classList.toggle("open");
    };
}
const cartCount = document.getElementById("cartCount");
const basketItems = document.getElementById("basketItems");
const basketTotal = document.getElementById("basketTotal");
const checkoutButton = document.getElementById("checkoutButton");

let basket = [];

cartButton.addEventListener("click", () => {
    cartDrawer.classList.add("open");
});

closeCart.addEventListener("click", () => {
    cartDrawer.classList.remove("open");
});

document.querySelectorAll(".addToCart").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existing = basket.find(item => item.name === name);

        if(existing){
            existing.qty++;
        }else{
            basket.push({
                name,
                price,
                qty:1
            });
        }

        updateCart();

        cartDrawer.classList.add("open");

    });

});

function updateCart(){

    basketItems.innerHTML = "";

    if(basket.length === 0){

        basketItems.innerHTML = "<p>Your basket is empty.</p>";

        cartCount.textContent = "0";

        basketTotal.textContent = "0";

        return;

    }

    let total = 0;
    let items = 0;

    basket.forEach((item,index)=>{

        total += item.price * item.qty;
        items += item.qty;

        basketItems.innerHTML += `
        <div class="cartItem">

            <strong>${item.name}</strong>

            <p>£${item.price} × ${item.qty}</p>

            <button class="minus" data-index="${index}">−</button>

            <button class="plus" data-index="${index}">+</button>

            <button class="remove" data-index="${index}">Remove</button>

        </div>
        `;

    });

    cartCount.textContent = items;
    basketTotal.textContent = total;

    document.querySelectorAll(".plus").forEach(button=>{

        button.onclick=()=>{

            basket[button.dataset.index].qty++;

            updateCart();

        };

    });

    document.querySelectorAll(".minus").forEach(button=>{

        button.onclick=()=>{

            basket[button.dataset.index].qty--;

            if(basket[button.dataset.index].qty<=0){

                basket.splice(button.dataset.index,1);

            }

            updateCart();

        };

    });

    document.querySelectorAll(".remove").forEach(button=>{

        button.onclick=()=>{

            basket.splice(button.dataset.index,1);

            updateCart();

        };

    });

}

checkoutButton.addEventListener("click",()=>{

    if(basket.length===0){

        alert("Your basket is empty.");

        return;

    }

    let message="Hello HT Peptides,%0A%0AI'd like to order:%0A%0A";

    basket.forEach(item=>{

        message += `${item.name} x${item.qty} - £${item.price*item.qty}%0A`;

    });

    message += `%0AOrder Total: £${basketTotal.textContent}`;

    window.open(
        "https://wa.me/447456872851?text="+message,
        "_blank"
    );

});

});
