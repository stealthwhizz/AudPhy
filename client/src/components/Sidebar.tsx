import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, Heart, Plus } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/library', icon: Library, label: 'Your Library' }
  ];

  const playlists = [
    'Liked Songs',
    'My Playlist #1',
    'Chill Vibes',
    'Workout Mix',
    'Jazz Collection'
  ];

  return (
    <div className="sidebar">
      <div>
        <h1 style={{ color: 'var(--color-accent)', fontSize: '1.5rem', fontWeight: '700', marginBottom: 'var(--spacing-xl)' }}>
          AudPhy
        </h1>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                color: location.pathname === path ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                background: location.pathname === path ? 'var(--color-surface-hover)' : 'transparent',
                textDecoration: 'none',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icon size={20} />
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div style={{ marginTop: 'var(--spacing-xl)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
          <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>PLAYLISTS</span>
          <button className="btn">
            <Plus size={16} />
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          {playlists.map((playlist, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                padding: 'var(--spacing-sm)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              {index === 0 && <Heart size={16} fill="var(--color-accent)" color="var(--color-accent)" />}
              {playlist}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;