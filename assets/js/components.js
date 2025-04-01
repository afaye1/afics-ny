// assets/js/components.js

/**
 * AFICS/NY Component Manager
 * Loads reusable HTML components and handles component functionality
 */
const AFICS = {
  // Component paths
  componentPaths: {
    header: '/components/header.html',
    footer: '/components/footer.html',
    navigation: '/components/navigation.html',
    sidebar: '/components/sidebar.html'
  },

  /**
   * Initialize the component system
   */
  init: function() {
    this.loadComponents();
    this.setupEventListeners();
    this.checkLoginState();
  },

  /**
   * Load all components with data-component attribute
   */
  loadComponents: function() {
    document.querySelectorAll('[data-component]').forEach(element => {
      const componentName = element.getAttribute('data-component');
      if (this.componentPaths[componentName]) {
        this.fetchComponent(componentName, element);
      } else {
        console.warn(`Component "${componentName}" not found in component paths.`);
      }
    });
  },

  /**
   * Fetch a component and insert it into the DOM
   */
  fetchComponent: function(componentName, targetElement) {
    fetch(this.componentPaths[componentName])
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load component: ${componentName}`);
        }
        return response.text();
      })
      .then(html => {
        targetElement.innerHTML = html;
        
        // Initialize component-specific functionality after loading
        if (this[`init${componentName.charAt(0).toUpperCase() + componentName.slice(1)}`]) {
          this[`init${componentName.charAt(0).toUpperCase() + componentName.slice(1)}`](targetElement);
        }
      })
      .catch(error => {
        console.error(error);
        targetElement.innerHTML = `<div class="component-error">Error loading component: ${componentName}</div>`;
      });
  },

  /**
   * Initialize header component
   */
  initHeader: function(headerElement) {
    // Header-specific initialization code
  },

  /**
   * Initialize navigation component
   */
  initNavigation: function(navElement) {
    // Mobile menu toggle functionality
    const mobileMenuBtn = navElement.querySelector('.mobile-menu-btn');
    const navList = navElement.querySelector('.nav-list');
    
    if (mobileMenuBtn && navList) {
      mobileMenuBtn.addEventListener('click', function() {
        navList.classList.toggle('active');
      });
    }
  },

  /**
   * Setup global event listeners
   */
  setupEventListeners: function() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      const navList = document.querySelector('.nav-list');
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      
      if (navList && navList.classList.contains('active') && 
          mobileMenuBtn && !mobileMenuBtn.contains(event.target) && 
          !navList.contains(event.target)) {
        navList.classList.remove('active');
      }
    });

    // Add scroll behavior for smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  },

  /**
   * Check login state and update UI accordingly
   */
  checkLoginState: function() {
    // For the prototype, we'll use localStorage to simulate login state
    // In a real implementation, this would check with the server
    const isLoggedIn = localStorage.getItem('aficsLoggedIn') === 'true';
    
    if (isLoggedIn) {
      document.body.classList.add('is-logged-in');
      
      // Set user info if available
      const userInfo = JSON.parse(localStorage.getItem('aficsUserInfo') || '{}');
      const userNameElements = document.querySelectorAll('.user-name');
      const userAvatarElements = document.querySelectorAll('#user-avatar, .user-avatar');
      
      userNameElements.forEach(el => {
        if (userInfo.name) {
          el.textContent = userInfo.name;
        }
      });
      
      userAvatarElements.forEach(el => {
        if (userInfo.avatar) {
          el.src = userInfo.avatar;
        }
      });
    } else {
      document.body.classList.remove('is-logged-in');
    }
    
    // Show appropriate login/user menu
    document.querySelectorAll('.logged-in-only').forEach(el => {
      el.style.display = isLoggedIn ? 'flex' : 'none';
    });
    
    document.querySelectorAll('.logged-out-only').forEach(el => {
      el.style.display = isLoggedIn ? 'none' : 'flex';
    });
  },

  /**
   * Simulate login (for prototype)
   */
  login: function(username, password) {
    // For prototype - in real app this would validate with the server
    localStorage.setItem('aficsLoggedIn', 'true');
    localStorage.setItem('aficsUserInfo', JSON.stringify({
      name: username,
      avatar: '/assets/img/placeholder-avatar.jpg'
    }));
    
    this.checkLoginState();
    return true;
  },

  /**
   * Simulate logout (for prototype)
   */
  logout: function() {
    localStorage.removeItem('aficsLoggedIn');
    localStorage.removeItem('aficsUserInfo');
    
    this.checkLoginState();
    return true;
  }
};

// Initialize components when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  AFICS.init();
});
