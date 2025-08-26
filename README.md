# AudPhy - Premium Audiophile Music Streaming

A premium music streaming application designed for audiophiles who demand high-quality audio and ad-free experience.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd audphy

# Install everything (dependencies + yt-dlp)
npm run install-all

# Start development servers (client + server)
npm run dev
```

**That's it!** The `install-all` command automatically installs:
- ✅ Client dependencies (React, TypeScript, etc.)
- ✅ Server dependencies (Express, YouTube APIs, etc.)
- ✅ yt-dlp (for YouTube audio extraction)

The app will open at `http://localhost:3000` with the backend running on `http://localhost:5000`

## ✨ Features

- **Real YouTube Integration** - Search and stream any song from YouTube
- **Premium Black Theme** - Elegant dark interface with gold accents
- **Full Player Controls** - Play/pause, next/previous, seek, volume control
- **Queue Management** - Automatic playlist creation from search results
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **High-Quality Audio** - yt-dlp integration for best audio quality

## 🎵 Pages

- **Home** - Featured albums and personalized content
- **Search** - Real-time YouTube search with instant playback
- **Library** - Your collection with grid/list views

## 🛠 Tech Stack

**Frontend:**
- React 18.2.0
- TypeScript 4.9.5
- React Router 6.20.1
- Lucide React Icons
- CSS Custom Properties

**Backend:**
- Node.js + Express 4.18.2
- YouTube Search (youtube-sr)
- yt-dlp integration for audio streaming
- CORS enabled for cross-origin requests

## 📋 Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- yt-dlp (for YouTube audio extraction)

### Manual yt-dlp Installation (if auto-install fails)

```bash
# Try these if automatic installation doesn't work:
pip install yt-dlp
# OR
python -m pip install yt-dlp
# OR run our installer script
npm run install-ytdlp
```

## 🔧 Development

```bash
# Install dependencies
npm run install-all

# Start development (both client and server)
npm run dev

# Start only server
npm run server

# Start only client
npm run client

# Build for production
npm run build
```

## 📱 Responsive Design

The app follows strict grid rules ensuring proper layout on all devices:
- Desktop: 6-column grid
- Tablet: 3-column grid  
- Mobile: Single column

## 🎯 Current Features

- ✅ YouTube search integration
- ✅ Real-time audio streaming
- ✅ Queue management
- ✅ Player controls (play/pause/next/previous)
- ✅ Volume and seek controls
- ✅ Responsive design
- ✅ Premium UI/UX

## 🚧 Upcoming Features

- [ ] Playlist creation and management
- [ ] Favorites system
- [ ] Recently played history
- [ ] Keyboard shortcuts
- [ ] Mini player mode
- [ ] User preferences persistence

Built following established design and coding standards for consistency and maintainability.