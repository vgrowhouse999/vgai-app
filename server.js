const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { createProdia } = require('prodia'); // Make sure you have the prodia package installed
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const prodia = createProdia({ apiKey: process.env.PRODIA_API_KEY });

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve the static frontend files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle image generation requests
app.post('/generate', async (req, res) => {
  const { prompt, model, steps } = req.body;
  
  try {
    const job = await prodia.generate({
      prompt,
      model: model || 'Realistic_Vision_V5.1.safetensors',
      steps: steps || 50,
      width: 512,
      height: 512,
    });

    // Poll the job until the image is generated
    const { imageUrl, status } = await prodia.wait(job);

    if (status === 'succeeded') {
      return res.json({ success: true, imageUrl });
    } else {
      return res.status(500).json({ success: false, error: 'Generation failed' });
    }
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
