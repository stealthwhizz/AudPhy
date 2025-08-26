const express = require('express');
const YouTube = require('youtube-sr').default;

const router = express.Router();

// Fallback audio sources (royalty-free)
const fallbackAudio = [
  'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  'https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav',
  'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
  'https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav',
  'https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav'
];

// Search YouTube for metadata, use fallback audio
router.post('/search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    console.log('Searching YouTube for:', query);
    const results = await YouTube.search(query, { 
      limit: 20,
      type: 'video'
    });

    const tracks = results.map((video, index) => ({
      id: video.id,
      title: video.title,
      artist: video.channel?.name || 'Unknown Artist',
      duration: video.duration,
      thumbnail: video.thumbnail?.url,
      url: video.url,
      // Use fallback audio for now
      audioUrl: fallbackAudio[index % fallbackAudio.length]
    }));

    console.log(`Found ${tracks.length} tracks`);
    res.json({ tracks });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Return pre-assigned audio URL (no YouTube stream extraction)
router.get('/stream/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    
    // For now, return a fallback audio URL
    // In production, this would try multiple methods:
    // 1. yt-dlp subprocess
    // 2. Alternative YouTube libraries  
    // 3. Proxy servers
    // 4. Fallback audio
    
    const audioUrl = fallbackAudio[Math.floor(Math.random() * fallbackAudio.length)];
    
    res.json({
      audioUrl: audioUrl,
      quality: 128,
      format: 'wav'
    });
  } catch (error) {
    console.error('Stream error:', error);
    res.status(500).json({ error: 'Failed to get audio stream' });
  }
});

module.exports = router;