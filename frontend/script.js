<!-- Input for prompt -->
<input type="text" id="promptInput" placeholder="Enter your prompt here">

<!-- Dropdown for model selection -->
<select id="modelSelect">
  <option value="Realistic_Vision_V5.1.safetensors">Realistic Vision V5.1</option>
  <option value="Stable_Diffusion_V1.4.safetensors">Stable Diffusion V1.4</option>
  <option value="Dreamlike_PhotoReal_V2.0.safetensors">Dreamlike Photoreal V2.0</option>
  <!-- Add more model options as needed -->
</select>

<!-- Steps input (optional) -->
<input type="number" id="stepsInput" placeholder="Number of steps" value="50">

<!-- Generate Button -->
<button id="generateButton">Generate Image</button>

<!-- Image display -->
<img id="imageResult" alt="Generated Image" />

<!-- Include your JavaScript code -->
<script>
  document.getElementById('generateButton').addEventListener('click', () => {
    const prompt = document.getElementById('promptInput').value;
    const model = document.getElementById('modelSelect').value;
    const steps = document.getElementById('stepsInput').value || 50; // Default steps to 50 if not provided

    fetch('https://your-backend.up.railway.app/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_JWT_TOKEN_HERE'
      },
      body: JSON.stringify({
        prompt: prompt,
        model: model,
        steps: parseInt(steps)
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.imageUrl) {
        console.log('Image URL:', data.imageUrl);
        document.getElementById('imageResult').src = data.imageUrl; // Display image in an img tag
      } else {
        console.error('No image URL found in response');
      }
    })
    .catch(error => console.error('Error:', error));
  });
</script>
