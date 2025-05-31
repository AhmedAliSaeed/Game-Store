const totalCartAmountElement = document.getElementById('total_cart_amt');
let cartGames;
let cartItems;
let users;
let loggedUser;
getCartItems();
GetData();

document.addEventListener('DOMContentLoaded', () => {
  const paymentForm = document.getElementById('payment-form'); 
  const countrySelect = document.getElementById('countrySelect'); 
  const otherCountryInput = document.getElementById('otherCountryInput'); 

  if (countrySelect) {
    countrySelect.addEventListener('change', function() { 
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
    paymentForm.addEventListener('submit', function(event) { 
      event.preventDefault(); 

     
      let selectedCountry = countrySelect.value; 
      if (selectedCountry === 'other') { 
        selectedCountry = otherCountryInput.value.trim(); 
      }

      const cardNumber = document.getElementById('cardNumber').value.trim(); 
      const expiryDate = document.getElementById('expiryDate').value.trim(); 
      const cvv = document.getElementById('cvv').value.trim(); 
      const cardName = document.getElementById('cardName').value.trim(); 
      if (!selectedCountry || !cardNumber || !expiryDate || !cvv || !cardName) { 
        alert('Please fill in all required payment details including your country and the name on your card.'); //
        return; 
      }

      alert('Purchase Complete! Thank you for your order from ' + selectedCountry + '.');

      let user = users.find(x => x.username === loggedUser);
      user.cartItems = [];
      user.gamesOwned += cartItems;
      localStorage.setItem('users', JSON.stringify(users)); 
      window.location.href = '../GameLibrary/GameLibrary.html'; 
    });
  }




});


function calculateTotals() {
  let totalPrice = 0;
  let priceIndiv = document.getElementById('price-one');
  priceIndiv.innerHTML = '';

  cartGames.forEach((item) => {
    const price = item.Price;
    totalPrice += price ;
    
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
  let userDetails = users.find(x => x.username === loggedUser);
  cartItems = userDetails.cartItems;
}

function GetData() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `../games.json`, false);
  
  xhr.onreadystatechange = function () {

    if (xhr.readyState == 4 && xhr.status == 200) {
      var games = xhr.response;
      let parsed = JSON.parse(games);
      cartGames = parsed.filter(x => cartItems.includes(x.Id));

      calculateTotals();
    }
  }

  xhr.send();
}