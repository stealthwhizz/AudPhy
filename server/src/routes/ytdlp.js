const express = require('express');
const { exec } = require('child_process');
const YouTube = require('youtube-sr').default;

const router = express.Router();

// Search YouTube for metadata
router.post('/search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const results = await YouTube.search(query, { 
      limit: 20,
      type: 'video'
    });

    const tracks = results.map(video => ({
      id: video.id,
      title: video.title,
      artist: video.channel?.name || 'Unknown Artist',
      duration: video.duration,
      thumbnail: video.thumbnail?.url,
      url: video.url
    }));

    res.json({ tracks });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Get audio stream using yt-dlp
router.get('/stream/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    console.log('Getting stream with yt-dlp for:', videoId);
    
    const ytUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    // Try different yt-dlp paths
    const possiblePaths = [
      'yt-dlp',
      'python -m yt_dlp',
      'C:\\Users\\%USERNAME%\\AppData\\Local\\Programs\\Python\\Python*\\Scripts\\yt-dlp.exe',
      '%USERPROFILE%\\AppData\\Local\\Programs\\Python\\Python*\\Scripts\\yt-dlp.exe'
    ];
    
    let commandWorked = false;
    
    for (const ytdlpPath of possiblePaths) {
      if (commandWorked) break;
      
      const command = `${ytdlpPath} -f "bestaudio" --get-url "${ytUrl}"`;
      console.log('Trying command:', command);
      
      await new Promise((resolve) => {
        exec(command, { timeout: 30000 }, (error, stdout, stderr) => {
          if (error) {
            console.log(`Failed with ${ytdlpPath}:`, error.message);
            resolve();
            return;
          }
          
          const audioUrl = stdout.trim();
          if (audioUrl && audioUrl.startsWith('http')) {
            console.log('Success! Got audio URL');
            commandWorked = true;
            res.json({
              audioUrl: audioUrl,
              quality: 'best',
              format: 'audio'
            });
          }
          resolve();
        });
      });
    }
    
    if (!commandWorked) {
      console.log('All yt-dlp methods failed, using fallback');
      // Fallback to demo audio
      const fallbackAudio = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      res.json({
        audioUrl: fallbackAudio,
        quality: 'demo',
        format: 'wav'
      });
    }
    
  } catch (error) {
    console.error('Stream error:', error);
    res.status(500).json({ error: 'Failed to get audio stream' });
  }
});

module.exports = router;