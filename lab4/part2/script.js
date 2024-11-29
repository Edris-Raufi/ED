// Get all gallery items and lightbox modal elements
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close');
const darkenLightenBtn = document.getElementById('darken-lighten-btn');

// Event listener for gallery images to open the lightbox
galleryItems.forEach(item => {
  const img = item.querySelector('img');

  // Open the lightbox when an image is clicked
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex'; // Show the lightbox
    lightboxImg.src = img.src; // Set the lightbox image to the clicked image
    lightboxImg.style.filter = 'brightness(100%)'; // Reset brightness
    darkenLightenBtn.textContent = "Darken"; // Set initial button text
  });
});

// Close the lightbox when the close button is clicked
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none'; // Hide the lightbox
});

// Toggle between darken and lighten effect on the lightbox image
darkenLightenBtn.addEventListener('click', () => {
  if (darkenLightenBtn.textContent === 'Darken') {
    lightboxImg.style.filter = 'brightness(50%)'; // Darken the image
    darkenLightenBtn.textContent = 'Lighten'; // Change button text to "Lighten"
  } else {
    lightboxImg.style.filter = 'brightness(100%)'; // Reset to normal brightness
    darkenLightenBtn.textContent = 'Darken'; // Change button text back to "Darken"
  }
});
