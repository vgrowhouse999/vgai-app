import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import generateRoutes from './routes/generate.js';
import path from 'path';

// Initialize environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Use authentication and generation routes
app.use('/auth', authRoutes);
app.use('/generate', generateRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
