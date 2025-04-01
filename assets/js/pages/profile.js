// assets/js/pages/profile.js

document.addEventListener('DOMContentLoaded', function() {
  const profileNav = document.querySelector('.profile-nav');
  const profileSections = document.querySelectorAll('.profile-section');

  // Navigation tab switching
  if (profileNav) {
    profileNav.addEventListener('click', function(event) {
      const targetLink = event.target.closest('a');
      
      if (targetLink) {
        event.preventDefault();
        
        // Remove active class from all links
        profileNav.querySelectorAll('a').forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to clicked link
        targetLink.classList.add('active');
        
        // Hide all sections
        profileSections.forEach(section => {
          section.style.display = 'none';
        });
        
        // Show targeted section
        const targetSectionId = targetLink.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetSectionId);
        
        if (targetSection) {
          targetSection.style.display = 'block';
        }
      }
    });
  }

  // Profile editing functionality
  const editProfileButtons = document.querySelectorAll('.edit-profile-btn');
  const profileInfoFields = document.querySelectorAll('.profile-info-value');

  editProfileButtons.forEach(button => {
    button.addEventListener('click', function() {
      const sectionId = this.closest('.profile-section').id;
      toggleEditMode(sectionId);
    });
  });

  function toggleEditMode(sectionId) {
    const section = document.getElementById(sectionId);
    const infoItems = section.querySelectorAll('.profile-info-item');
    
    infoItems.forEach(item => {
      const valueElement = item.querySelector('.profile-info-value');
      const labelElement = item.querySelector('.profile-info-label');
      
      // Create input if not already in edit mode
      if (!valueElement.querySelector('input')) {
        const originalValue = valueElement.textContent;
        valueElement.innerHTML = `
          <input type="text" value="${originalValue}" 
                 class="form-control" 
                 data-original-value="${originalValue}">
        `;
      } else {
        // Save mode
        const inputElement = valueElement.querySelector('input');
        const newValue = inputElement.value;
        const originalValue = inputElement.getAttribute('data-original-value');
        
        if (newValue !== originalValue) {
          // Here you would typically send an API call to update the value
          valueElement.textContent = newValue;
          AFICS_UTILS.showNotification('Profile updated successfully', 'success');
        } else {
          valueElement.textContent = originalValue;
        }
      }
    });

    // Toggle edit button text
    const editButton = section.querySelector('.edit-profile-btn');
    editButton.textContent = editButton.textContent === 'Edit' ? 'Save' : 'Edit';
  }
});
