const subtotalElement = document.getElementById('product_total_amt');
const taxElement = document.getElementById('tax_amt');
const totalCartAmountElement = document.getElementById('total_cart_amt');
const cartItemCountElement = document.getElementById('cart-item-count');
const cartItemsContainer = document.getElementById('cart-items-container');

const TAX_RATE = 0.0;

function getCartItems() {
  return JSON.parse(localStorage.getItem('cartItems')) || [];
}

function saveCartItems(cartItems) {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  renderCartItems();
  calculateTotals();
  updateCartIconCount();
}

function renderCartItems() {
  cartItemsContainer.innerHTML = '';
  const cartItems = getCartItems();

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="text-light p-3">Your cart is empty.</p>';
    return;
  }

  cartItems.forEach((item) => {
    const itemHtml = `
            <div class="game-item" data-item-id="${item.id}" data-item-price="${
      item.price
    }">
                <div class="product_img">
                    <img src="${
                      item.image || 'images/default_game_capsule.jpg'
                    }" alt="${item.name}" />
                </div>
                <div class="product_details">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h3 class="product_name">${item.name}</h3>
                        </div>
                        <div class="price_money">
                            <h3>$<span class="item-price-display">${parseFloat(
                              item.price
                            ).toFixed(2)}</span></h3>
                        </div>
                    </div>
                    <div class="remove_wish">
                        <p class="action-link remove-item" data-item-id="${
                          item.id
                        }">
                            <i class="fas fa-trash-alt"></i> REMOVE
                        </p>
                    </div>
                </div>
            </div>
            <hr class="cart-item-divider" />
        `;
    cartItemsContainer.innerHTML += itemHtml;
  });

  addRemoveEventListeners();
}

function calculateTotals() {
  let currentSubtotal = 0;
  const cartItems = getCartItems();

  cartItems.forEach((item) => {
    const price = parseFloat(item.price);
    const quantity = 1;
    if (!isNaN(price)) {
      currentSubtotal += price * quantity;
    }
  });

  subtotalElement.textContent = currentSubtotal.toFixed(2);
  const currentTax = currentSubtotal * TAX_RATE;
  taxElement.textContent = currentTax.toFixed(2);
  let finalTotal = currentSubtotal + currentTax;
  totalCartAmountElement.textContent = finalTotal.toFixed(2);
  cartItemCountElement.textContent = cartItems.length;
}

function addRemoveEventListeners() {
  document.querySelectorAll('.game-item .remove-item').forEach((button) => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const itemIdToRemove = this.getAttribute('data-item-id');
      let cartItems = getCartItems();
      cartItems = cartItems.filter((item) => item.id !== itemIdToRemove);
      saveCartItems(cartItems);
    });
  });
}

function updateCartIconCount() {
  const cartItems = getCartItems();
  const cartIconCountElement = document.querySelector('nav a[href="#"] + p'); 

  if (cartIconCountElement) {
    console.log('Cart count for nav:', cartItems.length);
  }
  if (cartItemCountElement) cartItemCountElement.textContent = cartItems.length;
}

document.addEventListener('DOMContentLoaded', () => {
  renderCartItems();
  calculateTotals();
  updateCartIconCount();
});
