const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const neighborhoodInput = document.getElementById("neighborhood");
const streetInput = document.getElementById("street");
const numberInput = document.getElementById("number");
const complementInput = document.getElementById("complement");
const confirmationModal = document.getElementById("confirmation-modal");
const closeConfirmationModalBtn = document.getElementById("close-confirmation-modal-btn");

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

// Função para resetar os estilos dos campos
function resetFieldStyles() {
    neighborhoodInput.classList.remove("border-red-500", "placeholder-red-500");
    streetInput.classList.remove("border-red-500", "placeholder-red-500");
    numberInput.classList.remove("border-red-500", "placeholder-red-500");
    complementInput.classList.remove("border-red-500", "placeholder-red-500");
}

// Função para validar os campos
function validateFields() {
    let isValid = true;

    if (!neighborhoodInput.value.trim()) {
        neighborhoodInput.classList.add("border-red-500", "placeholder-red-500");
        isValid = false;
    }

    if (!streetInput.value.trim()) {
        streetInput.classList.add("border-red-500", "placeholder-red-500");
        isValid = false;
    }

    if (!numberInput.value.trim()) {
        numberInput.classList.add("border-red-500", "placeholder-red-500");
        isValid = false;
    }

    // Validação do complemento (opcional, mas destacado se vazio)
    if (!complementInput.value.trim()) {
        complementInput.classList.add("border-red-500", "placeholder-red-500");
        // isValid = false; // Remova o comentário se quiser que o complemento seja obrigatório
    }

    return isValid;
}

// Evento de clique no botão "Finalizar Pedido"
checkoutBtn.addEventListener("click", function () {
    // Validar os campos
    const isValid = validateFields();

    // Se algum campo estiver inválido, não prosseguir com a finalização
    if (!isValid) {
        return;
    }

    // Fechar o modal do carrinho
    cartModal.style.display = "none";

    // Abrir o modal de confirmação
    confirmationModal.style.display = "flex";
});

// Evento para remover destaques ao preencher os campos
neighborhoodInput.addEventListener("input", function () {
    if (neighborhoodInput.value.trim()) {
        neighborhoodInput.classList.remove("border-red-500", "placeholder-red-500");
    }
});

streetInput.addEventListener("input", function () {
    if (streetInput.value.trim()) {
        streetInput.classList.remove("border-red-500", "placeholder-red-500");
    }
});

numberInput.addEventListener("input", function () {
    if (numberInput.value.trim()) {
        numberInput.classList.remove("border-red-500", "placeholder-red-500");
    }
});

complementInput.addEventListener("input", function () {
    if (complementInput.value.trim()) {
        complementInput.classList.remove("border-red-500", "placeholder-red-500");
    }
});

// Fechar o modal de confirmação
closeConfirmationModalBtn.addEventListener("click", function () {
    confirmationModal.style.display = "none";
});

// Resetar os estilos dos campos quando o modal do carrinho for reaberto
cartBtn.addEventListener("click", function () {
    resetFieldStyles();
});







