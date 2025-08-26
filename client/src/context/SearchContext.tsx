import React, { createContext, useContext } from 'react';
import { useSearch } from '../hooks/useSearch';
import { Track } from '../services/musicApi';

interface SearchContextType {
  results: Track[];
  loading: boolean;
  error: string | null;
  search: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const searchState = useSearch();

  return (
    <SearchContext.Provider value={searchState}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within SearchProvider');
  }
  return context;
};