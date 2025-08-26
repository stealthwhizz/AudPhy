# AudPhy Setup Guide

## 🔧 Development Setup

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd audphy
npm run install-all
```

### 2. Install yt-dlp
```bash
# Method 1: pip
pip install yt-dlp

# Method 2: Python module  
python -m pip install yt-dlp

# Verify
yt-dlp --version
```

### 3. Start Development
```bash
npm run dev
```

## 📁 Project Structure
```
audphy/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Route pages
│   │   ├── hooks/         # Custom hooks
│   │   ├── context/       # React contexts
│   │   ├── services/      # API services
│   │   └── styles/        # CSS files
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   └── index.js       # Server entry
│   └── package.json
├── package.json           # Root package.json
├── README.md
└── .gitignore
```

## 🚀 Deployment Commands

```bash
# Install everything
npm run install-all

# Development mode
npm run dev

# Production build
npm run build

# Start production server
npm start
```

## 🔍 Troubleshooting

### yt-dlp not found
- Ensure yt-dlp is in system PATH
- Try: `python -m yt_dlp --version`
- Reinstall: `pip install --upgrade yt-dlp`

### Port conflicts
- Client: http://localhost:3000
- Server: http://localhost:5000
- Change ports in package.json if needed

### Dependencies issues
- Delete node_modules: `rm -rf node_modules client/node_modules server/node_modules`
- Reinstall: `npm run install-all`