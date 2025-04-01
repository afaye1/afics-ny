# AFICS/NY Website Modular Architecture

## Project Structure
```
afics-ny/
├── assets/
│   ├── css/
│   │   ├── styles.css                # Main CSS file that imports all modules
│   │   ├── components/               # Component-specific styles
│   │   │   ├── header.css            # Header styles
│   │   │   ├── footer.css            # Footer styles
│   │   │   ├── navigation.css        # Navigation menu styles
│   │   │   ├── forms.css             # Form styles
│   │   │   ├── buttons.css           # Button styles
│   │   │   ├── cards.css             # Card component styles
│   │   │   └── ...
│   │   ├── layouts/                  # Layout styles
│   │   │   ├── grid.css              # Grid system
│   │   │   ├── main-layout.css       # Main content layout
│   │   │   └── sidebar.css           # Sidebar layouts
│   │   └── utils/                    # Utility styles
│   │       ├── variables.css         # CSS variables (colors, fonts, etc.)
│   │       ├── helpers.css           # Helper classes
│   │       └── animations.css        # Animation styles
│   ├── js/
│   │   ├── main.js                   # Main JavaScript file
│   │   ├── components.js             # Component loader
│   │   └── ...
│   └── img/                          # Image assets
├── components/                       # HTML components
│   ├── header.html                   # Site header
│   ├── footer.html                   # Site footer
│   ├── navigation.html               # Main navigation
│   ├── sidebar.html                  # Sidebar components
│   └── ...
├── templates/                        # Page templates
│   ├── base.html                     # Base template (for Django/WordPress/Drupal)
│   ├── home.html                     # Homepage template
│   ├── login.html                    # Login page template
│   ├── register.html                 # Registration template
│   ├── member-directory.html         # Member directory template
│   ├── member-profile.html           # Member profile template
│   └── ...
├── pages/                            # Compiled static HTML pages for prototype
│   ├── index.html                    # Homepage
│   ├── login.html                    # Login page
│   ├── register.html                 # Registration page
│   ├── member-directory.html         # Member directory page
│   ├── member-profile.html           # Member profile page
│   └── ...
└── README.md                         # Project documentation
```

## Component Structure

Each component will follow a similar pattern to make them easy to integrate with different templating systems:

### Example: Header Component

```html
<!-- components/header.html -->
<header class="header">
  <div class="logo-container">
    <img src="/assets/img/un-logo.svg" alt="UN Logo" />
    <div class="logo-text">
      <h1>Association of Former International Civil Servants</h1>
      <p>New York (AFICS/NY)</p>
    </div>
  </div>
  <div class="search-container">
    <input type="text" placeholder="Search...">
    <button>Search</button>
  </div>
  <!-- Conditionally show login or user menu -->
  <div class="user-menu-placeholder">
    <!-- This will be replaced depending on whether user is logged in -->
  </div>
</header>
```

## Adapting to Different Platforms

### Django Template Example

```html
<!-- Django template version -->
{% extends "base.html" %}

{% block content %}
  {% include "components/header.html" %}
  
  <main class="main-content">
    <h1>{{ page_title }}</h1>
    <!-- Page content -->
  </main>
  
  {% include "components/footer.html" %}
{% endblock %}
```

### WordPress Theme Example

```php
<?php get_header(); ?>

<main class="main-content">
  <h1><?php the_title(); ?></h1>
  <?php the_content(); ?>
</main>

<?php get_footer(); ?>
```

### Drupal Theme Example

```php
<?php
// Template file: page.html.twig

/**
 * @file
 * Theme implementation to display a single page.
 */
?>
<div class="layout-container">
  {{ page.header }}
  
  <main class="main-content">
    {{ page.content }}
  </main>
  
  {{ page.footer }}
</div>
```

## Prototype Implementation

For the prototype phase, we'll use a simple JavaScript approach to include components. This allows you to build and test the HTML structure before implementing a server-side solution.

```javascript
// Simple component loader
document.addEventListener('DOMContentLoaded', function() {
  // Load all components with data-component attribute
  document.querySelectorAll('[data-component]').forEach(function(element) {
    const componentName = element.getAttribute('data-component');
    fetch(`/components/${componentName}.html`)
      .then(response => response.text())
      .then(html => {
        element.innerHTML = html;
      })
      .catch(error => console.error(`Error loading component ${componentName}:`, error));
  });
});
```

Example usage in a page:

```html
<div data-component="header"></div>
<main class="main-content">
  <!-- Page content -->
</main>
<div data-component="footer"></div>
```

This structure will make your code modular and maintainable, while also being easy to adapt to different CMS platforms.
