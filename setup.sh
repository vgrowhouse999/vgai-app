#!/bin/bash

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Install dependencies
echo "Installing dependencies..."
npm install

# Start the server
echo "Starting the server..."
npm start

# Server should now be running at http://localhost:${PORT}
