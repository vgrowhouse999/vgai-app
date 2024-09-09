// config/prodia.js
const { createProdia } = require('prodia');

const prodia = createProdia({
  apiKey: process.env.PRODIA_API_KEY, // Use the API key from .env
});

const generateImage = async (prompt, model, steps) => {
  const job = await prodia.generate({
    prompt,
    model: model || process.env.INITIAL_MODEL, // Use defaults from .env if not provided
    steps: parseInt(steps) || parseInt(process.env.INITIAL_STEPS),
    cfg_scale: parseFloat(process.env.CFG_SCALE),
    sampler: process.env.INITIAL_SAMPLER,
    width: parseInt(process.env.INITIAL_WIDTH),
    height: parseInt(process.env.INITIAL_HEIGHT),
    denoising_strength: parseFloat(process.env.INITIAL_DENOISING_STRENGTH),
  });

  const { imageUrl, status } = await prodia.wait(job);
  if (status === 'succeeded') {
    return imageUrl; // Return the URL of the generated image
  } else {
    throw new Error('Image generation failed');
  }
};

module.exports = { generateImage };
