const express = require('express');
const ytdl = require('@distube/ytdl-core');
const YouTube = require('youtube-sr').default;

const router = express.Router();

// Search for tracks
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

// Get audio stream URL
router.get('/stream/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    console.log('Getting stream for video ID:', videoId);
    
    if (!ytdl.validateID(videoId)) {
      console.log('Invalid video ID:', videoId);
      return res.status(400).json({ error: 'Invalid video ID' });
    }

    console.log('Fetching video info...');
    const info = await ytdl.getInfo(videoId);
    console.log('Video info fetched, filtering audio formats...');
    
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    console.log('Audio formats found:', audioFormats.length);
    
    if (audioFormats.length === 0) {
      console.log('No audio formats available');
      return res.status(404).json({ error: 'No audio stream found' });
    }

    // Get highest quality audio
    const bestAudio = audioFormats.reduce((best, current) => {
      return (current.audioBitrate || 0) > (best.audioBitrate || 0) ? current : best;
    });

    console.log('Best audio format:', {
      quality: bestAudio.audioBitrate,
      format: bestAudio.container,
      hasUrl: !!bestAudio.url
    });

    res.json({
      audioUrl: bestAudio.url,
      quality: bestAudio.audioBitrate,
      format: bestAudio.container
    });
  } catch (error) {
    console.error('Stream error details:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ error: 'Failed to get audio stream', details: error.message });
  }
});

// Get track info
router.get('/info/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    
    if (!ytdl.validateID(videoId)) {
      return res.status(400).json({ error: 'Invalid video ID' });
    }

    const info = await ytdl.getBasicInfo(videoId);
    const details = info.videoDetails;

    res.json({
      id: details.videoId,
      title: details.title,
      artist: details.author.name,
      duration: parseInt(details.lengthSeconds),
      thumbnail: details.thumbnails[details.thumbnails.length - 1]?.url,
      description: details.description
    });
  } catch (error) {
    console.error('Info error:', error);
    res.status(500).json({ error: 'Failed to get track info' });
  }
});

module.exports = router;