import React from 'react';
import { useSearchContext } from '../context/SearchContext';
import { useAudio } from '../context/AudioContext';
import { Play, Pause } from 'lucide-react';

const Search: React.FC = () => {
  const { results, loading, error } = useSearchContext();
  const { currentTrack, isPlaying, playTrack, togglePlay, queue } = useAudio();
  
  const hasSearchResults = results.length > 0 || loading;
  const genres = [
    { name: 'Hip-Hop', color: '#ff6b6b', emoji: '🎤' },
    { name: 'Rock', color: '#4ecdc4', emoji: '🎸' },
    { name: 'Jazz', color: '#45b7d1', emoji: '🎷' },
    { name: 'Electronic', color: '#96ceb4', emoji: '🎛️' },
    { name: 'Classical', color: '#ffeaa7', emoji: '🎼' },
    { name: 'Pop', color: '#fd79a8', emoji: '🎵' },
    { name: 'R&B', color: '#fdcb6e', emoji: '🎹' },
    { name: 'Country', color: '#e17055', emoji: '🤠' },
    { name: 'Reggae', color: '#00b894', emoji: '🌴' },
    { name: 'Blues', color: '#6c5ce7', emoji: '🎺' },
    { name: 'Folk', color: '#a29bfe', emoji: '🪕' },
    { name: 'Indie', color: '#fd79a8', emoji: '🎨' }
  ];

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
          Search
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Discover new music, artists, and podcasts
        </p>
      </div>

      {!hasSearchResults && (
        <section style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 'var(--spacing-lg)' }}>
            Browse All
          </h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-lg)' }}>
          {genres.map((genre) => (
            <div
              key={genre.name}
              style={{
                background: genre.color,
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-lg)',
                height: '120px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <h3 style={{ 
                color: 'var(--color-primary)', 
                fontSize: '1.25rem', 
                fontWeight: '700',
                marginBottom: 'var(--spacing-sm)'
              }}>
                {genre.name}
              </h3>
              <div style={{
                position: 'absolute',
                bottom: 'var(--spacing-md)',
                right: 'var(--spacing-md)',
                fontSize: '2rem',
                opacity: 0.8
              }}>
                {genre.emoji}
              </div>
            </div>
          ))}
        </div>
        </section>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>Searching...</div>
      )}
      
      {error && (
        <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--color-error)' }}>
          {error}
        </div>
      )}
      

      
      {results.length > 0 && (
        <section style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 'var(--spacing-lg)' }}>
            Search Results
          </h2>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>Searching...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              {results.map((track) => (
                <div key={track.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)',
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-md)',
                  background: currentTrack?.id === track.id ? 'var(--color-surface-hover)' : 'var(--color-surface-elevated)',
                  cursor: 'pointer',
                  border: currentTrack?.id === track.id ? '1px solid var(--color-accent)' : '1px solid transparent'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'var(--color-surface)',
                    borderRadius: 'var(--radius-md)',
                    backgroundImage: track.thumbnail ? `url(${track.thumbnail})` : 'none',
                    backgroundSize: 'cover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {!track.thumbnail && '🎵'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>{track.title}</div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>{track.artist}</div>
                  </div>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      if (currentTrack?.id === track.id) {
                        togglePlay();
                      } else {
                        queue.playNext(results, results.indexOf(track));
                        playTrack(track as any);
                      }
                    }}
                    style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                  >
                    {currentTrack?.id === track.id && isPlaying ? (
                      <Pause size={16} />
                    ) : (
                      <Play size={16} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Search;