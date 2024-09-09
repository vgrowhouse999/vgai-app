import express from 'express';
import authenticate from '../middleware/authMiddleware.js';
import { generateImage } from '../config/prodia.js';

const router = express.Router();

// Protected route for image generation
router.post('/', authenticate, async (req, res) => {
  const { prompt, model, steps } = req.body;
  try {
    const imageUrl = await generateImage(prompt, model, steps);
    res.json({ success: true, imageUrl });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
