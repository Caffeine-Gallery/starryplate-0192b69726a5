import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch and display about information
    const about = await backend.getAbout();
    document.getElementById('about-content').textContent = about;

    // Fetch and display menu items
    const menuItems = await backend.getMenu();
    const menuContainer = document.getElementById('menu-items');
    const menuCategories = document.getElementById('menu-categories');

    // Get unique categories
    const categories = [...new Set(menuItems.map(item => item.category))];

    // Create category buttons
    categories.forEach(category => {
      const button = document.createElement('button');
      button.textContent = category;
      button.addEventListener('click', () => filterMenu(category));
      menuCategories.appendChild(button);
    });

    // Function to filter menu items
    function filterMenu(category) {
      menuContainer.innerHTML = '';
      const filteredItems = menuItems.filter(item => item.category === category);
      displayMenuItems(filteredItems);
    }

    // Function to display menu items
    function displayMenuItems(items) {
      items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        itemElement.innerHTML = `
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p class="price">$${item.price}</p>
        `;
        menuContainer.appendChild(itemElement);
      });
    }

    // Initially display all menu items
    displayMenuItems(menuItems);

    // Fetch and display pictures
    const pictures = await backend.getPictures();
    const galleryContainer = document.getElementById('picture-gallery');
    pictures.forEach(pic => {
      const imgElement = document.createElement('img');
      imgElement.src = pic;
      imgElement.alt = 'Steakhouse Image';
      imgElement.loading = 'lazy';
      galleryContainer.appendChild(imgElement);
    });

    // Handle reservation form submission
    const reservationForm = document.getElementById('reservation-form');
    reservationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const guests = parseInt(document.getElementById('guests').value, 10);

      try {
        await backend.makeReservation(name, email, date, time, guests);
        showNotification('Reservation made successfully!', 'success');
        reservationForm.reset();
      } catch (error) {
        console.error('Error making reservation:', error);
        showNotification('Failed to make reservation. Please try again.', 'error');
      }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    showNotification('Failed to load content. Please refresh the page.', 'error');
  }
});

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.className = `notification ${type}`;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add some animations
window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.menu-item, #picture-gallery img');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    if (isVisible) {
      el.classList.add('fade-in');
    }
  });
});
