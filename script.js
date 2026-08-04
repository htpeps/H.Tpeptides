document.addEventListener("DOMContentLoaded", () => {

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");

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

document.querySelectorAll(".addToCart").forEach(button=>{

    button.addEventListener("click",()=>{

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existing = basket.find(item=>item.name===name);

        if(existing){
            existing.qty++;
        }else{
            basket.push({
                name:name,
                price:price,
                qty:1
            });
        }

        updateCart();

    });

});

function updateCart(){

    basketItems.innerHTML="";

    if(basket.length===0){

        basketItems.innerHTML="Your basket is empty.";

        cartCount.textContent="0";

        basketTotal.textContent="0";

        return;

    }

    let total=0;
    let items=0;

    basket.forEach((item,index)=>{

        total+=item.price*item.qty;

        items+=item.qty;

        basketItems.innerHTML+=`
<div class="cartItem">

<strong>${item.name}</strong><br>

£${item.price} × ${item.qty}

<div style="margin-top:10px">

<button class="minus" data-index="${index}">−</button>

<button class="plus" data-index="${index}">+</button>

<button class="remove" data-index="${index}">Remove</button>

</div>

<hr>

</div>
`;

    });

    cartCount.textContent=items;

    basketTotal.textContent=total;
        basketItems.querySelectorAll(".plus").forEach(button=>{

        button.addEventListener("click",()=>{

            basket[button.dataset.index].qty++;

            updateCart();

        });

    });

    basketItems.querySelectorAll(".minus").forEach(button=>{

        button.addEventListener("click",()=>{

            const item=basket[button.dataset.index];

            item.qty--;

            if(item.qty<=0){

                basket.splice(button.dataset.index,1);

            }

            updateCart();

        });

    });

    basketItems.querySelectorAll(".remove").forEach(button=>{

        button.addEventListener("click",()=>{

            basket.splice(button.dataset.index,1);

            updateCart();

        });

    });

    checkoutButton.onclick=()=>{

        if(basket.length===0){

            alert("Your basket is empty.");

            return;

        }

        let message="Hello HT Peptides,%0A%0AI'd like to order:%0A%0A";

        basket.forEach(item=>{

            message+=`${item.name} x${item.qty} - £${item.price*item.qty}%0A`;

        });

        message+=`%0AOrder Total: £${basketTotal.textContent}`;

        window.open(
            "https://wa.me/447456872851?text="+message,
            "_blank"
        );

    };

}

});
