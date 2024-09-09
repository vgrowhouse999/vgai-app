const form = document.getElementById('generateForm');
const gallery = document.getElementById('gallery');

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const prompt = document.getElementById('prompt').value;
  const response = await fetch('/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: prompt
    })
  });

  const data = await response.json();
  
  if (data.success) {
    // Display the generated image in the gallery
    const img = document.createElement('img');
    img.src = data.imageUrl;
    gallery.appendChild(img);
  } else {
    alert('Image generation failed: ' + data.error);
  }
});
