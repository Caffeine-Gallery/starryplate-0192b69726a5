import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch and display about information
    const about = await backend.getAbout();
    document.getElementById('about-content').textContent = about;

    // Fetch and display menu items
    const menuItems = await backend.getMenu();
    const menuContainer = document.getElementById('menu-items');
    menuItems.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'menu-item';
      itemElement.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p class="price">$${item.price}</p>
      `;
      menuContainer.appendChild(itemElement);
    });

    // Fetch and display pictures
    const pictures = await backend.getPictures();
    const galleryContainer = document.getElementById('picture-gallery');
    pictures.forEach(pic => {
      const imgElement = document.createElement('img');
      imgElement.src = pic;
      imgElement.alt = 'Restaurant Image';
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
        alert('Reservation made successfully!');
        reservationForm.reset();
      } catch (error) {
        console.error('Error making reservation:', error);
        alert('Failed to make reservation. Please try again.');
      }
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
