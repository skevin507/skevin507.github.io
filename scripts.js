document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    let cartClickCount = parseInt(localStorage.getItem('cartClickCount')) || 0;

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <span>${item.name}</span>
                <span>${item.quantity}</span>
                <span>$${item.price.toFixed(2)}</span>
                <button class="remove-from-cart" data-name="${item.name}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
            total += item.price * item.quantity;
        });

        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    }

    function addToCart(name, price) {
        const item = cart.find(i => i.name === name);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
        localStorage.setItem('cart', JSON.stringify(cart));
        cartClickCount++;
        localStorage.setItem('cartClickCount', cartClickCount.toString());
    }

    function removeFromCart(name) {
        const itemIndex = cart.findIndex(i => i.name === name);
        if (itemIndex > -1) {
            cart[itemIndex].quantity--;
            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1);
            }
        }
        updateCart();
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            addToCart(name, price);
        });
    });

    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart')) {
            const name = event.target.getAttribute('data-name');
            removeFromCart(name);
        }
    });

    document.getElementById('checkout').addEventListener('click', () => {
        alert('¡Gracias por tu compra!');
        cart.length = 0;
        updateCart();
        localStorage.removeItem('cart');
        localStorage.removeItem('cartClickCount');
    });

    // Actualizar contador de clicks en el carrito
    document.getElementById('cart-icon-container').addEventListener('click', () => {
        document.querySelector('.carrito-cantidad').textContent = cartClickCount.toString();
    });

    // Mostrar cantidad actual al cargar la página
    document.querySelector('.carrito-cantidad').textContent = cartClickCount.toString();

    // Mostrar carrito al cargar la página
    updateCart();
});

