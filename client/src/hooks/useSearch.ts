import { useState } from 'react';
import { musicApi, Track } from '../services/musicApi';

export const useSearch = () => {
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) return;
    
    console.log('Search hook called with:', query);
    setLoading(true);
    setError(null);
    
    try {
      console.log('Calling API...');
      const response = await musicApi.search(query);
      console.log('API response:', response);
      setResults(response.tracks);
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
};