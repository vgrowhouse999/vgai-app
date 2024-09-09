const express = require('express');
const dotenv = require('dotenv');
const path = require('path'); // For working with file paths

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory (your frontend code)
app.use(express.static(path.join(__dirname, 'public')));

// Example API route (protected)
const { generateImage } = require('./config/prodia');
const authenticate = require('./middleware/authMiddleware');

app.use(express.json());

app.post('/generate', authenticate, async (req, res) => {
  const { prompt, model, steps } = req.body;
  try {
    const imageUrl = await generateImage(prompt, model, steps);
    res.json({ success: true, imageUrl });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Fallback route to send "index.html" for unknown routes (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
