// index.js
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
console.log("API Key from .env:", process.env.LASTFM_API_KEY);

const express = require('express');
const app = express();
const PORT = 3001;

// express
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req, res) => {
    res.send('TopStereo backend is running...');
});

app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    try {
      const result = await axios.get('http://ws.audioscrobbler.com/2.0/', {
        params: {
          method: 'album.search', // action
          album: query,
          api_key: process.env.LASTFM_API_KEY, // gets api key from .env
          format: 'json', // return format
        }
      });
      const albums = result.data.results.albummatches.album;
      res.json(albums);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch albums' });
    }
});

// start
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});