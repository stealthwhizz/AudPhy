import React from 'react';
import { Play } from 'lucide-react';

const Home: React.FC = () => {
  const featuredAlbums = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Album ${i + 1}`,
    artist: `Artist ${i + 1}`,
    cover: `🎵`
  }));

  const recentlyPlayed = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Recent Track ${i + 1}`,
    artist: `Artist ${i + 1}`,
    cover: `🎶`
  }));

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
          Good evening
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Welcome back to your premium audio experience
        </p>
      </div>

      {/* Quick Access */}
      <section style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-md)' }}>
          {recentlyPlayed.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                padding: 'var(--spacing-sm)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                {item.cover}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>{item.title}</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>{item.artist}</div>
              </div>
              <button
                className="btn btn-primary"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  opacity: 0,
                  transition: 'opacity var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              >
                <Play size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Albums */}
      <section style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 'var(--spacing-lg)' }}>
          Featured Albums
        </h2>
        <div className="grid grid-cols-6">
          {featuredAlbums.map((album) => (
            <div key={album.id} className="card">
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
                {album.cover}
              </div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: 'var(--spacing-sm)' }}>
                {album.title}
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>
                {album.artist}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Made For You */}
      <section>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 'var(--spacing-lg)' }}>
          Made For You
        </h2>
        <div className="grid grid-cols-6">
          {featuredAlbums.map((album) => (
            <div key={`made-${album.id}`} className="card">
              <div style={{
                width: '100%',
                aspectRatio: '1',
                background: 'linear-gradient(135deg, var(--color-accent), var(--color-surface))',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                marginBottom: 'var(--spacing-md)'
              }}>
                🎧
              </div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: 'var(--spacing-sm)' }}>
                Daily Mix {album.id}
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>
                Your personalized playlist
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;