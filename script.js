const basket = [];

const basketItems = document.getElementById("basket-items");
const basketCount = document.getElementById("basket-count");
const checkout = document.getElementById("checkout");

console.log("Script loaded");

document.querySelectorAll(".card button").forEach(button => {
    button.addEventListener("click", () => {

        const card = button.closest(".card");
        const product = card.querySelector("h3").innerText;

        basket.push(product);

        basketItems.innerHTML = basket.join("<br>");
        basketCount.innerText = basket.length;

        const message =
`Hello HT Peptides,

I'd like to order:

${basket.join("\n")}`;

        checkout.href =
"https://wa.me/447456872851?text=" + encodeURIComponent(message);

    });
});
