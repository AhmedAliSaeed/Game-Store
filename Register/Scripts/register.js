 // Enhanced validation functions
    function validateUsername(value) {
      const regex = /^[a-zA-Z0-9_]{3,}$/;
      if (!value) return 'Username is required';
      if (!regex.test(value)) return '3+ chars (letters, numbers, _)';
      return '';
    }

    function validateEmail(value) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value) return 'Email is required';
      if (!regex.test(value)) return 'Enter a valid email address';
      return '';
    }

    function validatePassword(value) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!value) return 'Password is required';
      if (!regex.test(value)) return '8+ chars with uppercase, lowercase, number & special';
      return '';
    }

    function validateConfirmPassword(password, confirmPassword) {
      if (!confirmPassword) return 'Please confirm your password';
      if (password !== confirmPassword) return 'Passwords do not match';
      return '';
    }

    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(icon => {
      icon.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
        this.classList.toggle('fa-eye');
      });
    });

    // Real-time validation with error messages
    function validateField(input, errorElement, validator) {
      const value = input.value.trim();
      const error = validator(value);
      
      if (error) {
        input.classList.add('error');
        errorElement.textContent = error;
      } else {
        input.classList.remove('error');
        errorElement.textContent = '';
      }
    }

    // Register function with improved validation
    function register() {
      const inputs = {
        username: document.getElementById('username'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirm-password')
      };
      
      const errorElements = {
        username: document.getElementById('username-error'),
        email: document.getElementById('email-error'),
        password: document.getElementById('password-error'),
        confirmPassword: document.getElementById('confirm-password-error')
      };
      
      let isValid = true;

      // Validate username
      const usernameError = validateUsername(inputs.username.value.trim());
      if (usernameError) {
        inputs.username.classList.add('error');
        errorElements.username.textContent = usernameError;
        isValid = false;
      } else {
        inputs.username.classList.remove('error');
        errorElements.username.textContent = '';
      }

      // Validate email
      const emailError = validateEmail(inputs.email.value.trim());
      if (emailError) {
        inputs.email.classList.add('error');
        errorElements.email.textContent = emailError;
        isValid = false;
      } else {
        inputs.email.classList.remove('error');
        errorElements.email.textContent = '';
      }

      // Validate password
      const password = inputs.password.value.trim();
      const passwordError = validatePassword(password);
      if (passwordError) {
        inputs.password.classList.add('error');
        errorElements.password.textContent = passwordError;
        isValid = false;
      } else {
        inputs.password.classList.remove('error');
        errorElements.password.textContent = '';
      }

      // Validate confirm password
      const confirmPassword = inputs.confirmPassword.value.trim();
      const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
      if (confirmPasswordError) {
        inputs.confirmPassword.classList.add('error');
        errorElements.confirmPassword.textContent = confirmPasswordError;
        isValid = false;
      } else {
        inputs.confirmPassword.classList.remove('error');
        errorElements.confirmPassword.textContent = '';
      }

      if (isValid) {
        alert('Registration successful! Welcome to GameHub!');
        // Here you would typically send data to server
      }
    }

    // Add real-time validation listeners
    document.getElementById('username').addEventListener('input', () => {
      validateField(
        document.getElementById('username'),
        document.getElementById('username-error'),
        validateUsername
      );
    });

    document.getElementById('email').addEventListener('input', () => {
      validateField(
        document.getElementById('email'),
        document.getElementById('email-error'),
        validateEmail
      );
    });

    document.getElementById('password').addEventListener('input', () => {
      const password = document.getElementById('password').value.trim();
      validateField(
        document.getElementById('password'),
        document.getElementById('password-error'),
        validatePassword
      );
      
      // Also validate confirm password when password changes
      const confirmPassword = document.getElementById('confirm-password').value.trim();
      if (confirmPassword) {
        const error = validateConfirmPassword(password, confirmPassword);
        const errorElement = document.getElementById('confirm-password-error');
        if (error) {
          document.getElementById('confirm-password').classList.add('error');
          errorElement.textContent = error;
        } else {
          document.getElementById('confirm-password').classList.remove('error');
          errorElement.textContent = '';
        }
      }
    });

    document.getElementById('confirm-password').addEventListener('input', () => {
      const password = document.getElementById('password').value.trim();
      const confirmPassword = document.getElementById('confirm-password').value.trim();
      const error = validateConfirmPassword(password, confirmPassword);
      const errorElement = document.getElementById('confirm-password-error');
      
      if (error) {
        document.getElementById('confirm-password').classList.add('error');
        errorElement.textContent = error;
      } else {
        document.getElementById('confirm-password').classList.remove('error');
        errorElement.textContent = '';
      }
    });

    // Mouse interaction for game elements
    document.querySelectorAll('.game-element').forEach(element => {
      element.addEventListener('mouseover', () => {
        element.style.transform = 'scale(1.2) rotate(15deg)';
        element.style.transition = 'transform 0.3s ease';
      });
      element.addEventListener('mouseout', () => {
        element.style.transform = '';
        element.style.transition = 'transform 0.3s ease';
      });
    });