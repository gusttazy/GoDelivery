const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

// Abrir Modal do carrinho
cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex";
})

// Fechar Modal do carrinho quando clicar fora
cartModal.addEventListener("click", function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
})

// Fechar Modal do carrinho
closeModalBtn.addEventListener("click", function() {
    cartModal.style.display = "none";
})

// Adicionar item ao carrinho
menu.addEventListener("click", function(event) {
    
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        addItemToCart(name, price);

    }
})

//Função para adicionar item ao carrinho
function addItemToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }

    updateCartModal();
}

// Função para atualizar o carrinho 
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElelement = document.createElement("div");

        cartItemElelement.innerHTML = `
            <div>
                <div>
                    <p>${item.name}</p>
                    <p>${item.quantity}</p>
                    <p>R$ ${item.price}</p>
                </div>

                <div>
                    <button>Remover</button>
                </div>
            </div>
        `

        cartItemsContainer.appendChild(cartItemElelement);
    })
}
        