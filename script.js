// Function to load images from a JSON file
async function loadImages() {
  const response = await fetch('images.json'); // Fetch the JSON file
  const imagesData = await response.json(); // Parse the JSON data
  
  const gallery = document.getElementById('gallery');
  
  // Loop through the images data and create image elements
  imagesData.forEach(imageData => {
    const imageElement = document.createElement('div');
    imageElement.classList.add('image', imageData.category);
    imageElement.setAttribute('data-tags', imageData.tags);

    const img = document.createElement('img');
    img.src = imageData.src;
    img.alt = imageData.alt;
    img.onclick = () => openModal(imageData.src);

    imageElement.appendChild(img);
    gallery.appendChild(imageElement);
  });
}

// Show images by category
function showCategory(category) {
  const images = Array.from(document.querySelectorAll('.image')); 
  images.forEach(image => {
    if (category === 'All' || image.classList.contains(category)) {
      image.style.display = 'block';
    } else {
      image.style.display = 'none';
    }
  });

  document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

// Search function
function searchImages() {
  let searchInput = document.getElementById('searchBar').value.toLowerCase();
  let images = document.querySelectorAll('.image');
  let matchedImages = [];

  images.forEach(image => {
    let altText = image.querySelector('img').alt.toLowerCase();
    let tags = image.dataset.tags.toLowerCase();

    if (altText.includes(searchInput) || tags.includes(searchInput)) {
      matchedImages.push(image);
    } else {
      image.style.display = 'none';
    }
  });

  matchedImages.forEach(image => {
    image.style.display = 'block';
    document.getElementById('gallery').prepend(image);
  });
}

function clearSearch() {
  document.getElementById('searchBar').value = '';
  searchImages();
}

// Modal functions
function openModal(imageSrc) {
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modal-image');
  modal.style.display = 'flex';
  modalImage.src = imageSrc;
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function downloadImage() {
  let imageSrc = document.getElementById('modal-image').src;
  let link = document.createElement('a');
  link.href = imageSrc;
  link.download = imageSrc.split('/').pop();
  link.click();
}

// Close modal when clicking outside of the image
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === document.getElementById('modal')) {
    closeModal();
  }
});

// Load the images when the page is loaded
window.onload = loadImages;
