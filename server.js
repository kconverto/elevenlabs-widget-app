require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS and static file serving
app.use(cors());
app.use(express.static('public'));

// API endpoint for widget initialization
app.get('/api/widget-config', (req, res) => {
  // Get dynamic variables from query parameters
  const userName = req.query.userName || 'User';
  const initialContext = req.query.context || '';
  const characterId = req.query.character || 'default';
  
  // Return configuration with API key from environment variables
  res.json({
    apiKey: process.env.ELEVENLABS_API_KEY,
    character: characterId,
    initialContext: initialContext,
    welcomeMessage: `Hello ${userName}! How can I help you today?`,
    backgroundColor: '#ffffff',
    textColor: '#000000',
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});