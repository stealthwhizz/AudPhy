import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Heart } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const Player: React.FC = () => {
  const { currentTrack, isPlaying, currentTime, duration, volume, togglePlay, playNext, playPrevious, seekTo, changeVolume } = useAudio();

  return (
    <div className="player">
      {/* Current Track Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', minWidth: '200px' }}>
        <div style={{
          width: '56px',
          height: '56px',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ fontSize: '1.5rem' }}>🎵</span>
        </div>
        <div>
          <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>
            {currentTrack?.title || 'No track selected'}
          </div>
          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>
            {currentTrack?.artist || 'Unknown artist'}
          </div>
        </div>
        <button className="btn">
          <Heart size={16} />
        </button>
      </div>

      {/* Player Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-sm)', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          <button className="btn">
            <Shuffle size={16} />
          </button>
          <button className="btn" onClick={playPrevious}>
            <SkipBack size={20} />
          </button>
          <button 
            className="btn btn-primary"
            onClick={togglePlay}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button className="btn" onClick={playNext}>
            <SkipForward size={20} />
          </button>
          <button className="btn">
            <Repeat size={16} />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', width: '100%', maxWidth: '500px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
            {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}
          </span>
          <div style={{
            flex: 1,
            height: '4px',
            background: 'var(--color-surface)',
            borderRadius: '2px',
            position: 'relative'
          }}>
            <div style={{
              width: `${duration ? (currentTime / duration) * 100 : 0}%`,
              height: '100%',
              background: 'var(--color-accent)',
              borderRadius: '2px'
            }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
            {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Volume Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', minWidth: '200px', justifyContent: 'flex-end' }}>
        <button className="btn">
          <Volume2 size={16} />
        </button>
        <div style={{
          width: '100px',
          height: '4px',
          background: 'var(--color-surface)',
          borderRadius: '2px',
          position: 'relative'
        }}>
          <div style={{
            width: '70%',
            height: '100%',
            background: 'var(--color-accent)',
            borderRadius: '2px'
          }} />
        </div>
      </div>
    </div>
  );
};

export default Player;