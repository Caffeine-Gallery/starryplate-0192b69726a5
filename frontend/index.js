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

    // Get unique menu categories
    const menuCats = [...new Set(menuItems.map(item => item.category))];

    // Create menu category buttons
    menuCats.forEach(category => {
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

    // Fetch and display gallery images
    const galleryImages = await backend.getGalleryImages();
    const galleryContainer = document.getElementById('gallery-images');
    const galleryCategories = document.getElementById('gallery-categories');

    // Get unique gallery categories
    const galleryCats = [...new Set(galleryImages.map(img => img.category))];

    // Create gallery category buttons
    galleryCats.forEach(category => {
      const button = document.createElement('button');
      button.textContent = category;
      button.addEventListener('click', () => filterGallery(category));
      galleryCategories.appendChild(button);
    });

    // Function to filter gallery images
    function filterGallery(category) {
      galleryContainer.innerHTML = '';
      const filteredImages = galleryImages.filter(img => img.category === category);
      displayGalleryImages(filteredImages);
    }

    // Function to display gallery images
    function displayGalleryImages(images) {
      images.forEach(img => {
        const imgElement = document.createElement('div');
        imgElement.className = 'gallery-item';
        imgElement.innerHTML = `
          <img src="${img.url}" alt="${img.description}" loading="lazy">
          <p>${img.description}</p>
        `;
        galleryContainer.appendChild(imgElement);
      });
    }

    // Initially display all gallery images
    displayGalleryImages(galleryImages);

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
  const elements = document.querySelectorAll('.menu-item, .gallery-item');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    if (isVisible) {
      el.classList.add('fade-in');
    }
  });
});
