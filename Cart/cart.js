const totalCartAmountElement = document.getElementById('total_cart_amt');
const cartItemCountElement = document.getElementById('cart-item-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const alertMessage = document.getElementById('alert-message');

let users;
let loggedUser;
let cartItems;
let cartGames;

function getCartItems() {
  users = JSON.parse(localStorage.getItem('users'));
  loggedUser = document.cookie.split('=')[1];
  let userDetails = users.find((x) => x.username === loggedUser);
  cartItems = userDetails.cartItems;
}

function GetData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `../games.json`, false);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var games = xhr.response;
      let parsed = JSON.parse(games);
      cartGames = parsed.filter((x) => cartItems.includes(x.Id));

      if (cartGames.length == 0) {
        cartItemsContainer.innerHTML = '<p> Your cart is empty.</p>';
        return;
      }

      cartItemCountElement.textContent = cartGames.length;

      cartGames.forEach((item) => {
        const itemHtml = `
            <div class="game-item" data-item-id="${item.Id}" data-item-price="${
          item.Price
        }">
                <div class="product_img">
                    <img src="${
                      item.ImageUrl || 'images/default_game_capsule.jpg'
                    }" alt="${item.Title}" />
                </div>
                <div class="product_details">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h3 class="product_name">${item.Title}</h3>
                        </div>
                        <div class="price_money">
                            <h3>$<span class="item-price-display">${parseFloat(
                              item.Price
                            ).toFixed(2)}</span></h3>
                        </div>
                    </div>
                    <div class="remove_wish">
                        <p class="action-link remove-item" data-item-id="${
                          item.Id
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
    }
  };
  xhr.send();
}

function saveCartItems(cartItems) {
  localStorage.setItem('users', JSON.stringify(cartItems));
  renderCartItems();
  calculateTotals();
}

function renderCartItems() {
  cartItemsContainer.innerHTML = '';
  const cartItems = getCartItems();
  GetData();
  addRemoveEventListeners();
}

function calculateTotals() {
  let totalPrice = 0;
  let priceIndiv = document.getElementById('price-one');
  priceIndiv.innerHTML = '';

  cartGames.forEach((item) => {
    const price = item.Price;
    totalPrice += price;

    priceIndiv.innerHTML += `
      <div class="price_indiv">
        <p> ${item.Title} </p>
        <p>$<span id="product_total_amt">${item.Price}</span></p>
      </div>
    `;
  });

  totalCartAmountElement.textContent = totalPrice.toFixed(2);
}

function addRemoveEventListeners() {
  document.querySelectorAll('.game-item .remove-item').forEach((button) => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const itemIdToRemove = this.getAttribute('data-item-id');
      console.log(itemIdToRemove);
      let user = users.find((x) => x.username === loggedUser);
      user.cartItems = user.cartItems.filter((item) => item != itemIdToRemove);
      saveCartItems(users);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCartItems();
  calculateTotals();
});

function gotoCheckout() {
  if (cartItems.length == 0) {
    alertMessage.textContent = 'Please Add Items to Cart';
    customAlert.classList.add('show');
  } else {
    window.location.href = '../Checkout/checkout.html';
  }
  function closeCustomAlert() {
    customAlert.classList.remove('show');
  }

  closeAlert.replaceWith(closeAlert.cloneNode(true));
  alertOk.replaceWith(alertOk.cloneNode(true));

  document
    .getElementById('closeAlert')
    .addEventListener('click', closeCustomAlert);
  document
    .getElementById('alertOk')
    .addEventListener('click', closeCustomAlert);

  customAlert.addEventListener('click', function (e) {
    if (e.target === customAlert) {
      closeCustomAlert();
    }
  });
}
