import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; // Update to import
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const generateImage = async (prompt, model, steps) => {
  try {
    const response = await fetch('https://api.prodia.com/v1/sd/transform', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Prodia-Key': process.env.PRODIA_API_KEY,
      },
      body: JSON.stringify({
        prompt,
        model: model || 'Realistic_Vision_V5.1.safetensors',
        steps: steps || 50,
        cfg_scale: 7,
        width: 512,
        height: 512,
        sampler: 'LMS Karras',
      }),
    });

    if (!response.ok) {
      throw new Error(`Bad Prodia Response: ${response.status}`);
    }

    const result = await response.json();
    return result.imageUrl;
  } catch (error) {
    throw new Error(`Image generation failed: ${error.message}`);
  }
};

app.post('/generate', async (req, res) => {
  const { prompt, model, steps } = req.body;

  try {
    const imageUrl = await generateImage(prompt, model, steps);
    res.json({ success: true, imageUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
