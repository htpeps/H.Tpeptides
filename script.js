document.addEventListener("DOMContentLoaded", () => {

    const prices = {
        "MT2 10mg": 25,
        "Retatrutide 30mg": 60,
        "Retatrutide 60mg": 80,
        "Glow 10mg": 40,
        "Bacteriostatic Water": 5
    };

    const basket = [];

    const basketItems = document.getElementById("basket-items");
    const basketCount = document.getElementById("basket-count");
    const checkout = document.getElementById("checkout");

    document.querySelectorAll(".card button").forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".card");
            const product = card.querySelector("h3").textContent;

            basket.push(product);

            updateBasket();

        });

    });

    function updateBasket(){

        basketItems.innerHTML = "";

        let total = 0;

        basket.forEach(item => {

            basketItems.innerHTML += `
                ${item} - £${prices[item]}<br>
            `;

            total += prices[item];

        });

        basketItems.innerHTML += `
            <hr>
            <strong>Total: £${total}</strong>
        `;

        basketCount.textContent = basket.length;

        const message = `Hello HT Peptides,

I'd like to order:

${basket.map(item => `${item} - £${prices[item]}`).join("\n")}

Total: £${total}`;

        checkout.href =
        "https://wa.me/447456872851?text=" +
        encodeURIComponent(message);

    }

});
