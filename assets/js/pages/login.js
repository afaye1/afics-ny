// assets/js/pages/login.js

/**
 * AFICS/NY Login Page
 * Handles login form submission and validation
 */
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form values
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const remember = document.getElementById('remember').checked;
      
      // Simple validation
      if (!email) {
        showError('email', 'Please enter your email address');
        return;
      }
      
      if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        return;
      }
      
      if (!password) {
        showError('password', 'Please enter your password');
        return;
      }
      
      // For prototype - simulate login success
      // In a real implementation, this would call an API endpoint
      simulateLogin(email, password, remember);
    });
    
    // Clear validation errors when input changes
    document.getElementById('email').addEventListener('input', function() {
      clearError('email');
    });
    
    document.getElementById('password').addEventListener('input', function() {
      clearError('password');
    });
  }
  
  /**
   * Validate email format
   */
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  /**
   * Show validation error for a field
   */
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.createElement('div');
    
    // Remove any existing error
    clearError(fieldId);
    
    // Add error styling
    field.classList.add('error');
    
    // Add error message
    errorElement.className = 'form-error';
    errorElement.id = `${fieldId}-error`;
    errorElement.textContent = message;
    
    // Insert after the field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
    
    // Focus on the field with error
    field.focus();
  }
  
  /**
   * Clear validation error for a field
   */
  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (field) {
      field.classList.remove('error');
    }
    
    if (errorElement) {
      errorElement.parentNode.removeChild(errorElement);
    }
  }
  
  /**
   * Simulate login process
   * For prototype purposes only
   */
  function simulateLogin(email, password, remember) {
    // Show loading state
    const submitButton = loginForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    // Simulate API call delay
    setTimeout(function() {
      // For demo: accept any login with @un.org domain
      if (email.endsWith('@un.org') || email === 'demo@afics.org') {
        // Success - store login state
        AFICS.login(email.split('@')[0], password);
        
        // Redirect to member dashboard
        window.location.href = '/member-dashboard.html';
      } else {
        // Show error message
        showLoginError('Invalid email or password. Please try again.');
        
        // Reset button
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        submitButton.textContent = originalButtonText;
      }
    }, 1000);
  }
  
  /**
   * Show login error message
   */
  function showLoginError(message) {
    let errorContainer = document.querySelector('.login-error');
    
    if (!errorContainer) {
      errorContainer = document.createElement('div');
      errorContainer.className = 'login-error';
      loginForm.insertBefore(errorContainer, loginForm.firstChild);
    }
    
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
  }
});
