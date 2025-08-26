const express = require('express');
const cors = require('cors');
const musicRoutes = require('./routes/music');
const demoRoutes = require('./routes/demo');
const hybridRoutes = require('./routes/hybrid');
const ytdlpRoutes = require('./routes/ytdlp');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use yt-dlp for real YouTube audio streaming
app.use('/api/music', ytdlpRoutes);
// app.use('/api/music', hybridRoutes); // Fallback audio
// app.use('/api/music', demoRoutes); // Pure demo mode

app.get('/health', (req, res) => {
  res.json({ status: 'Server running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🎵 AudPhy Server running on port ${PORT}`);
});