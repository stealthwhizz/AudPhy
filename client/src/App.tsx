import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import { SearchProvider } from './context/SearchContext';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Player from './components/Player';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <AudioProvider>
      <SearchProvider>
        <Router>
        <div className="app">
          <Sidebar />
          <main className="main-content">
            <TopBar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
              </Routes>
            </div>
          </main>
          <Player />
        </div>
        </Router>
      </SearchProvider>
    </AudioProvider>
  );
};

export default App;