const express = require('express');
const router = express.Router();

// Demo tracks with real audio URLs
const demoTracks = [
  {
    id: 'demo1',
    title: 'Chill Lo-Fi Beat',
    artist: 'Demo Artist',
    duration: 180,
    thumbnail: 'https://via.placeholder.com/300x300/333/fff?text=🎵',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  {
    id: 'demo2', 
    title: 'Ambient Soundscape',
    artist: 'Chill Vibes',
    duration: 240,
    thumbnail: 'https://via.placeholder.com/300x300/444/fff?text=🎶',
    audioUrl: 'https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav'
  },
  {
    id: 'demo3',
    title: 'Electronic Beat',
    artist: 'Synth Master',
    duration: 200,
    thumbnail: 'https://via.placeholder.com/300x300/555/fff?text=🎧',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  }
];

// Search demo tracks
router.post('/search', (req, res) => {
  const { query } = req.body;
  
  // Filter demo tracks based on query
  const results = demoTracks.filter(track => 
    track.title.toLowerCase().includes(query.toLowerCase()) ||
    track.artist.toLowerCase().includes(query.toLowerCase())
  );
  
  // If no matches, return all demo tracks
  const tracks = results.length > 0 ? results : demoTracks;
  
  res.json({ tracks });
});

// Get demo audio stream
router.get('/stream/:trackId', (req, res) => {
  const { trackId } = req.params;
  const track = demoTracks.find(t => t.id === trackId);
  
  if (!track) {
    return res.status(404).json({ error: 'Track not found' });
  }
  
  res.json({
    audioUrl: track.audioUrl,
    quality: 128,
    format: 'wav'
  });
});

module.exports = router;