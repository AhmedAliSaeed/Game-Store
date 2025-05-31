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

      alert('Purchase Complete! Thank you for your order from ' + selectedCountry + '.'); //

      localStorage.removeItem('cartItems'); 

      window.location.href = '../HomePage/index.html'; 
    });
  }
});