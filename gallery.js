document.addEventListener("DOMContentLoaded", () => {
  const viewer = document.getElementById('image-viewer');
  const viewerImg = document.getElementById('viewer-img');
  const closeBtn = document.querySelector('.close-viewer');

  // Open image on click
  document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.addEventListener('click', (e) => {
      viewerImg.src = img.src;
      viewer.style.display = 'flex';
    });
  });

  // Close on X (PC)
  closeBtn.addEventListener('click', () => {
    viewer.style.display = 'none';
    viewerImg.src = '';
  });

  // Close on click anywhere (mobile)
  viewer.addEventListener('click', (e) => {
    if (e.target === viewer || e.target === viewerImg) {
      viewer.style.display = 'none';
      viewerImg.src = '';
    }
  });
});
