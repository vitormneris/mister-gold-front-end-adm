document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.querySelector(".items-container");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cart.forEach(item => {
        const itemHTML = `
            <div class="item-container">
                <div class="left">
                    <div class="item-img"><img src="${item.imageUrl}" alt="${item.name}" class="item-img" style="width:100px; height:100px"></div>
                    <div class="item-name"><h3>${item.name}</h3></div>
                </div>
                <div class="item-quantity">
                    <label for="item-quantity">Quantidade:</label>
                    <input id="quantity" class="item-quantity" type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.id}', this.value)">
                </div>
                <div class="item-price">
                    <label for="item-price">Valor unitário:</label>
                    <h3>R$ ${item.price.toFixed(2)}</h3>
                </div>
                <div class="item-delete">
                    <button class="item-delete-btn" onclick="removeFromCart('${item.id}')"><i class="fa-solid fa-trash"></i> Remover</button>
                </div>
            </div>`;
        
        cartItemsContainer.innerHTML += itemHTML;
        total += item.price * item.quantity;
    });

    document.getElementById("cart-total").textContent = `R$ ${total.toFixed(2)}`;
});

// Funções para atualizar quantidade e remover itens
function updateQuantity(id, newQuantity) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const item = cart.find(product => product.id === id);
    item.quantity = parseInt(newQuantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter(product => product.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}


// Helper function to format price
function formatPrice(price) {
    return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Calculate the total price of all items in the cart
function updateCartTotal() {
    let total = 0;
    let itemContainers = document.querySelectorAll('.item-container');

    itemContainers.forEach(item => {
        let quantityInput = item.querySelector('.item-quantity input');
        let priceElement = item.querySelector('.item-price h3');
        
        let quantity = parseInt(quantityInput.value); // Get quantity
        let priceText = priceElement.textContent; // Get price text (e.g. R$ 11.691,00)
        
        // Parse the price by removing 'R$' and commas, then convert to number
        let price = parseFloat(priceText.replace('R$', '').replace(',', '').trim());
        
        // Calculate the total for this item
        let itemTotal = price * quantity;
        
        // Add this item's total to the cart total
        total += itemTotal;
    });

    // Format the total price and update the cart total in the UI
    document.getElementById("cart-total").textContent = formatPrice(total);
}


// Event listeners for each quantity input to update total on change
let quantityInputs = document.querySelectorAll('.item-quantity input');
quantityInputs.forEach(input => {
    input.addEventListener('input', updateCartTotal);
});

// Initial cart total calculation
updateCartTotal();

