const basket = [];

const buttons = document.querySelectorAll(".card button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const card = button.parentElement;
        const name = card.querySelector("h3").innerText;

        basket.push(name);

        alert(`${name} added to basket!`);
        console.log(basket);
    });
});
