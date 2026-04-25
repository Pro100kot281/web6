let cart = [];
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartCount = document.getElementById('cart-count');

cartBtn.onclick = () => cartModal.style.display = "block";
closeCart.onclick = () => cartModal.style.display = "none";
window.onclick = (event) => {
    if (event.target == cartModal) cartModal.style.display = "none";
}

document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.product-card');
        const name = card.getAttribute('data-name');
        const price = parseFloat(card.getAttribute('data-price'));
        
        addToCart(name, price);
    });
});

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    
    cartCount.innerText = cart.length;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
    } else {
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>$${item.price.toFixed(2)}</span>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">
                    <i class="fa fa-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPriceElement.innerText = total.toFixed(2);
}