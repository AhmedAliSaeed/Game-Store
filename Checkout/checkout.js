const totalCartAmountElement = document.getElementById('total_cart_amt');
const customAlert = document.getElementById('customAlert');
const alertMessage = document.getElementById('alert-message');
let cartGames;
let cartItems;
let users;
let loggedUser;
let purchaseSuccessful;
getCartItems();
GetData();

document.addEventListener('DOMContentLoaded', () => {
  const paymentForm = document.getElementById('payment-form');
  const countrySelect = document.getElementById('countrySelect');
  const otherCountryInput = document.getElementById('otherCountryInput');

  if (countrySelect) {
    countrySelect.addEventListener('change', function () {
      if (this.value === 'other') {
        otherCountryInput.style.display = 'block';
        otherCountryInput.setAttribute('required', 'true');
      } else {
        otherCountryInput.style.display = 'none';
        otherCountryInput.removeAttribute('required');
        otherCountryInput.value = '';
      }
    });
  }

  if (paymentForm) {
    paymentForm.addEventListener('submit', function (event) {
      event.preventDefault();

      let selectedCountry = countrySelect.value;
      if (selectedCountry === 'other') {
        selectedCountry = otherCountryInput.value.trim();
      }

      const cardNumber = document.getElementById('cardNumber').value.trim();
      const expiryDate = document.getElementById('expiryDate').value.trim();
      const cvv = document.getElementById('cvv').value.trim();
      const cardName = document.getElementById('cardName').value.trim();
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const nameRegex = /^[A-Za-z ]+$/;
      purchaseSuccessful = true;

      if (isNaN(cardNumber)) {
        alertMessage.textContent =
          'Card Number must contain only numeric characters.';
        purchaseSuccessful = false;
      }
      if (cardNumber.length !== 16 && purchaseSuccessful) {
        alertMessage.textContent = 'Card Number must be exactly 16 digits.';
        purchaseSuccessful = false;
      }
      if (!expiryRegex.test(expiryDate) && purchaseSuccessful) {
        alertMessage.textContent = 'Expiry Date must be in MM/YY format.';
        purchaseSuccessful = false;
      }
      if (expiryRegex.test(expiryDate) && purchaseSuccessful) {
        const [month, year] = expiryDate
          .split('/')
          .map((str) => parseInt(str, 10));
        const currentDate = new Date();

        const expiry = new Date(2000 + year, month, 0, 23, 59, 59);

        if (expiry < currentDate) {
          alertMessage.textContent = 'Expiry Date must be in the future.';
          purchaseSuccessful = false;
        }
      }
      if (isNaN(cvv) && purchaseSuccessful) {
        alertMessage.textContent = 'CVV must contain only numeric characters.';
        purchaseSuccessful = false;
      }
      if (cvv.length !== 3 && purchaseSuccessful) {
        alertMessage.textContent = 'CVV must be exactly 3 digits.';
        purchaseSuccessful = false;
      }
      if (!nameRegex.test(cardName) && purchaseSuccessful) {
        alertMessage.textContent =
          'Card Name must contain only letters and spaces.';
        purchaseSuccessful = false;
      }
      if (purchaseSuccessful)
        alertMessage.textContent =
          'Purchase Complete! Thank you for your order from ' +
          selectedCountry +
          '.';

      customAlert.classList.add('show');

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
    });
  }

  function closeCustomAlert() {
    customAlert.classList.remove('show');
    if (purchaseSuccessful) {
      let user = users.find((x) => x.username === loggedUser);
      user.cartItems = [];
      user.gamesOwned += cartItems;
      localStorage.setItem('users', JSON.stringify(users));
      window.location.href = '../GameLibrary/GameLibrary.html';
    }
  }
});

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

      calculateTotals();
    }
  };

  xhr.send();
}
