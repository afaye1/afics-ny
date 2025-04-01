# AFICS/NY Website Redesign

This project is a modular prototype for the Association of Former International Civil Servants (New York) website redesign, based on the functional requirements document provided.

## Project Overview

The prototype demonstrates a component-based architecture that can be easily adapted for implementation in WordPress, Drupal, or Django. The structure is designed to minimize code duplication and maintain consistent styling and functionality across all pages.

### Key Features

- Modular component architecture
- Responsive design that works on mobile, tablet, and desktop
- Clean, organized CSS with variables for easy customization
- Organized directory structure
- Cross-platform compatibility

## Project Structure

```
afics-ny/
├── assets/
│   ├── css/
│   │   ├── utils/
│   │   │   └── variables.css      # CSS variables (colors, spacing, etc.)
│   │   ├── components/            # Component-specific styles
│   │   ├── layouts/               # Layout styles
│   │   └── pages/                 # Page-specific styles
│   ├── js/
│   │   ├── components.js          # Component loader script
│   │   └── pages/                 # Page-specific scripts
│   └── img/                       # Image assets
├── components/                    # Reusable HTML components
├── pages/                         # HTML pages for the prototype
└── templates/                     # Base templates
```

## Component Architecture

The prototype uses a simple component inclusion system to demonstrate how the modular structure works. In a production environment, this would be implemented using the templating system of the chosen platform (WordPress, Drupal, or Django).

### How Components Work

1. HTML files include component placeholders using `data-component` attributes
2. The JavaScript loader (`components.js`) fetches and inserts the component HTML
3. Component-specific CSS is included in the main stylesheet
4. Component-specific JavaScript initializes after the component is loaded

### Available Components

- `header`: Site header with logo, search, and user menu
- `navigation`: Main navigation menu with dropdown support
- `footer`: Site footer with links and copyright information
- `sidebar`: Various sidebar components for different page types

## Adapting to Different Platforms

### WordPress Implementation

Components can be implemented in WordPress using:
- Theme template parts for components
- Advanced Custom Fields for editable content areas
- WordPress hooks and filters for functional components

Example:
```php
<?php get_header(); ?>

<main class="page-content">
  <h1><?php the_title(); ?></h1>
  
  <div class="content-container">
    <?php the_content(); ?>
  </div>
</main>

<?php get_footer(); ?>
```

### Drupal Implementation

Components can be implemented in Drupal using:
- Twig templates for components
- Drupal blocks for sidebars and reusable components
- Views for dynamic content like news and events

Example:
```twig
{# page.html.twig #}
{{ attach_library('afics/global') }}

{% include '@afics/components/header.html.twig' %}

<main class="page-content">
  <h1>{{ page['#title'] }}</h1>
  
  <div class="content-container">
    {{ page.content }}
  </div>
</main>

{% include '@afics/components/footer.html.twig' %}
```

### Django Implementation

Components can be implemented in Django using:
- Template includes for components
- Template inheritance for page layouts
- Context processors for shared data

Example:
```html
{% extends "base.html" %}

{% block content %}
  <h1>{{ page_title }}</h1>
  
  <div class="content-container">
    {{ page_content|safe }}
  </div>
{% endblock %}
```

## Development Guidelines

### Adding New Components

1. Create the HTML file in the `components/` directory
2. Add component-specific CSS in `assets/css/components/`
3. Include the component using `<div data-component="component-name"></div>`
4. Add initialization code to `components.js` if needed

### Creating New Pages

1. Start with the `templates/base.html` template
2. Replace placeholders (%PAGE_TITLE%, %MAIN_CONTENT%, etc.)
3. Add page-specific CSS and JavaScript if needed

### CSS Naming Conventions

- Component classes are named after the component (e.g., `.header`, `.footer`)
- Subcomponents use the parent component name as a prefix (e.g., `.header-logo`)
- Utility classes use descriptive names (e.g., `.text-center`, `.btn-primary`)

## Responsive Design

The prototype is designed to be responsive across all device sizes:

- Mobile-first approach
- Flexible grid layouts
- Media queries for different breakpoints
- Typography that scales well on all devices

## Browser Support

The prototype is designed to work on modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Considerations

- Accessibility implementation (WCAG 2.1 compliance)
- Performance optimization
- Internationalization support
- Integration with member management system
- Enhanced search functionality
