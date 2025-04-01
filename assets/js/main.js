// assets/js/main.js
// Global utility functions and site-wide JavaScript

const AFICS_UTILS = {
  /**
   * Debounce function to limit the rate of function calls
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  debounce: function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Smooth scroll to a specific element
   * @param {string} selector - CSS selector of the target element
   * @param {number} offset - Optional offset from the top
   */
  smoothScroll: function(selector, offset = 0) {
    const element = document.querySelector(selector);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  },

  /**
   * Format date consistently across the site
   * @param {Date|string} date - Date to format
   * @param {string} format - Format type (short, long, etc.)
   * @returns {string} Formatted date
   */
  formatDate: function(date, format = 'short') {
    const dateObj = new Date(date);
    
    switch(format) {
      case 'short':
        return dateObj.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      case 'long':
        return dateObj.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
      default:
        return dateObj.toLocaleDateString();
    }
  },

  /**
   * Show a toast/notification message
   * @param {string} message - Message to display
   * @param {string} type - Type of message (success, error, info)
   */
  showNotification: function(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('notification-exit');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 3000);
  }
};

// Initialize global event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Add any global event listeners here
  
  // Example: Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      AFICS_UTILS.smoothScroll(this.getAttribute('href'));
    });
  });
});
