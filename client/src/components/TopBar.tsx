import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Settings } from 'lucide-react';
import { useSearchContext } from '../context/SearchContext';

const TopBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { search } = useSearchContext();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      search(searchQuery);
    }
  };
  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
        <button className="btn">
          <ChevronLeft size={20} />
        </button>
        <button className="btn">
          <ChevronRight size={20} />
        </button>
        
        <form onSubmit={handleSearch} style={{ marginLeft: 'var(--spacing-lg)' }}>
          <input
            type="text"
            placeholder="Search for songs, artists, albums..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
        <button className="btn">
          <Settings size={20} />
        </button>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-sm)',
          background: 'var(--color-surface)',
          padding: 'var(--spacing-sm)',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'var(--color-accent)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={16} color="var(--color-primary)" />
          </div>
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Audiophile</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;