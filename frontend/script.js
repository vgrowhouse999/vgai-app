// Frontend code to call the backend
fetch('https://your-backend.up.railway.app/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer <your-jwt-token>'
    },
    body: JSON.stringify({
      prompt: 'A beautiful sunset',
      model: 'Realistic_Vision_V5.1.safetensors',
      steps: 50
    })
  })
    .then(response => response.json())
    .then(data => console.log('Image URL:', data.imageUrl))
    .catch(error => console.error('Error:', error));
  