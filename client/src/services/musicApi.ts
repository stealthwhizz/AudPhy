const API_BASE = 'http://localhost:5000/api/music';

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  thumbnail?: string;
  url?: string;
}

export interface SearchResponse {
  tracks: Track[];
}

export interface StreamResponse {
  audioUrl: string;
  quality: number;
  format: string;
}

export const musicApi = {
  search: async (query: string): Promise<SearchResponse> => {
    const response = await fetch(`${API_BASE}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    
    if (!response.ok) {
      throw new Error('Search failed');
    }
    
    return response.json();
  },

  getStream: async (videoId: string): Promise<StreamResponse> => {
    const response = await fetch(`${API_BASE}/stream/${videoId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get audio stream');
    }
    
    return response.json();
  },

  getTrackInfo: async (videoId: string): Promise<Track> => {
    const response = await fetch(`${API_BASE}/info/${videoId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get track info');
    }
    
    return response.json();
  }
};