import { createProdia } from 'prodia';

const prodia = createProdia({
  apiKey: process.env.PRODIA_API_KEY,
});

export const generateImage = async (prompt, model, steps) => {
  const job = await prodia.generate({
    prompt,
    model,
    steps: parseInt(steps),
    cfg_scale: process.env.CFG_SCALE,
    sampler: process.env.INITIAL_SAMPLER,
    width: process.env.INITIAL_WIDTH,
    height: process.env.INITIAL_HEIGHT,
    denoising_strength: process.env.INITIAL_DENOISING_STRENGTH,
  });

  const { imageUrl, status } = await prodia.wait(job);
  if (status === 'succeeded') {
    return imageUrl;
  } else {
    throw new Error('Image generation failed');
  }
};
