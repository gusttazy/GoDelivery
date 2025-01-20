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
cartBtn.addEventListener("click", function () {
    updateCartModal();
    cartModal.style.display = "flex";
})

// Fechar Modal do carrinho quando clicar fora
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
})

// Fechar Modal do carrinho
closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none";
})

// Adicionar item ao carrinho
menu.addEventListener("click", function (event) {

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
        });
    }

    updateCartModal();
    updateFooterButtonVisibility(); // Atualiza a visibilidade e contador
}

// Função para atualizar o carrinho 
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElelement = document.createElement("div");
        cartItemElelement.classList.add("flex", "justify-between", "mb-4", "flex-col");

        cartItemElelement.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="text-sm">
                    <p>${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p>R$ ${item.price}</p>
                </div>

                <button 
                class="bg-red-600 text-sm text-white px-2 py-1 rounded hover:bg-red-700 duration-300 remove-item-btn"
                data-name="${item.name}"
                >
                Remover
                </button>
            </div>
        `

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElelement);
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}

// Função para atualizar a visibilidade do footer
function updateFooterButtonVisibility() {
    const footerBtn = document.getElementById("footer-btn");

    // Verifica se o carrinho está vazio
    if (cart.length > 0) {
        footerBtn.classList.remove("hidden");
        setTimeout(() => {
            footerBtn.classList.remove("opacity-0", "translate-y-4"); o
        }, 10);
    } else {
        footerBtn.classList.add("opacity-0", "translate-y-4");
        setTimeout(() => {
            footerBtn.classList.add("hidden");
        }, 300);
    }

    // Atualiza o contador de itens
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    document.getElementById("cart-count").textContent = cartCount;
}


// Função para remover item do carrinho
cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item-btn")) {
        const name = event.target.getAttribute("data-name")

        removeItemCart(name)
    }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart.splice(index, 1);
        }

        // Atualiza o modal e a visibilidade do footer
        updateCartModal();
        updateFooterButtonVisibility();
    }
}






