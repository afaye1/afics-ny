// assets/js/pages/member-directory.js

document.addEventListener('DOMContentLoaded', function() {
  const memberGrid = document.querySelector('.member-grid');
  const searchInput = document.querySelector('.member-search input');
  const searchButton = document.querySelector('.member-search button');

  // Sample member data (in a real app, this would come from an API)
  const membersData = [
    {
      name: 'Jane Doe',
      title: 'Former UN Program Coordinator',
      period: '2005-2020',
      avatar: '/assets/img/placeholder-avatar.jpg'
    },
    {
      name: 'John Smith',
      title: 'Senior Development Specialist',
      period: '1998-2015',
      avatar: '/assets/img/placeholder-avatar.jpg'
    },
    // More members...
  ];

  /**
   * Render member cards to the grid
   * @param {Array} members - Array of member objects
   */
  function renderMemberCards(members) {
    // Clear existing cards
    memberGrid.innerHTML = '';

    members.forEach(member => {
      const cardElement = document.createElement('div');
      cardElement.className = 'member-card';
      cardElement.innerHTML = `
        <img src="${member.avatar}" alt="${member.name}" class="member-card-photo">
        <h3 class="member-card-name">${member.name}</h3>
        <p class="member-card-title">${member.title}</p>
        <p class="member-card-details">Served: ${member.period}</p>
      `;
      memberGrid.appendChild(cardElement);
    });
  }

  /**
   * Filter members based on search input
   * @param {string} searchTerm - Search term to filter members
   */
  function filterMembers(searchTerm) {
    const filteredMembers = membersData.filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    renderMemberCards(filteredMembers);
  }

  // Initial render
  renderMemberCards(membersData);

  // Search functionality
  searchButton.addEventListener('click', () => {
    filterMembers(searchInput.value);
  });

  // Allow search on Enter key
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      filterMembers(searchInput.value);
    }
  });
});
