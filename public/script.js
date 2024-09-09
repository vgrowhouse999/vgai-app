const loginForm = document.getElementById('loginForm');
const generateForm = document.getElementById('generateForm');
const statusText = document.getElementById('status');
const imageElement = document.getElementById('generatedImage');
let token = null;

// Handle login
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const result = await response.json();
  if (result.token) {
    token = result.token;
    alert('Login successful!');
  } else {
    alert('Login failed!');
  }
});

// Handle image generation
generateForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!token) {
    alert('Please login first');
    return;
  }

  const prompt = document.getElementById('prompt').value;
  const model = document.getElementById('model').value;
  const steps = document.getElementById('steps').value;

  statusText.textContent = 'Generating... Please wait';

  const response = await fetch('/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ prompt, model, steps })
  });

  const result = await response.json();

  if (result.success) {
    statusText.textContent = 'Image generated successfully!';
    imageElement.src = result.imageUrl;
    imageElement.style.display = 'block';
  } else {
    statusText.textContent = 'Image generation failed. Please try again.';
  }
});
