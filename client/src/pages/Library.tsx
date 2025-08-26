import React from 'react';
import { Grid, List, Clock, Heart, Download } from 'lucide-react';

const Library: React.FC = () => {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const libraryItems = [
    { type: 'playlist', name: 'Liked Songs', count: '234 songs', icon: '💖' },
    { type: 'playlist', name: 'My Playlist #1', count: '45 songs', icon: '🎵' },
    { type: 'album', name: 'Favorite Album', count: '12 tracks', icon: '💿' },
    { type: 'artist', name: 'Favorite Artist', count: '89 songs', icon: '🎤' },
    { type: 'playlist', name: 'Chill Vibes', count: '67 songs', icon: '🌊' },
    { type: 'playlist', name: 'Workout Mix', count: '32 songs', icon: '💪' }
  ];

  const recentlyPlayed = [
    { name: 'Amazing Track', artist: 'Great Artist', time: '3:45', liked: true },
    { name: 'Another Song', artist: 'Cool Band', time: '4:12', liked: false },
    { name: 'Best Hit', artist: 'Top Singer', time: '3:28', liked: true },
    { name: 'New Release', artist: 'Rising Star', time: '3:55', liked: false }
  ];

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: 'var(--spacing-xl)' 
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
            Your Library
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Your music collection and playlists
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
          <button 
            className={`btn ${viewMode === 'grid' ? 'btn-primary' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid size={16} />
          </button>
          <button 
            className={`btn ${viewMode === 'list' ? 'btn-primary' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <section style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-lg)' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>🎵</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--color-accent)' }}>1,234</div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Total Songs</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>📁</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--color-accent)' }}>23</div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Playlists</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>💿</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--color-accent)' }}>89</div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Albums</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>⏱️</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--color-accent)' }}>72h</div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Total Time</div>
          </div>
        </div>
      </section>

      {/* Library Items */}
      <section style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 'var(--spacing-lg)' }}>
          Your Collection
        </h2>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-6">
            {libraryItems.map((item, index) => (
              <div key={index} className="card">
                <div style={{
                  width: '100%',
                  aspectRatio: '1',
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  marginBottom: 'var(--spacing-md)'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: 'var(--spacing-sm)' }}>
                  {item.name}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>
                  {item.count}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
            {libraryItems.map((item, index) => (
              <div key={index} className="card" style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                padding: 'var(--spacing-md)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>{item.name}</div>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>{item.count}</div>
                </div>
                <button className="btn">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recently Played */}
      <section>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 'var(--spacing-lg)' }}>
          Recently Played
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          {recentlyPlayed.map((track, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
              padding: 'var(--spacing-md)',
              borderRadius: 'var(--radius-md)',
              transition: 'background var(--transition-fast)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: '40px',
                height: '40px',
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                🎵
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>{track.name}</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>{track.artist}</div>
              </div>
              <button className="btn">
                {track.liked ? <Heart size={16} fill="var(--color-accent)" color="var(--color-accent)" /> : <Heart size={16} />}
              </button>
              <div style={{ 
                color: 'var(--color-text-secondary)', 
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
              }}>
                <Clock size={12} />
                {track.time}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Library;