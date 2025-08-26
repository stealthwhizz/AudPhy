import { useState } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  audioUrl?: string;
  duration?: number;
  thumbnail?: string;
}

export const useQueue = () => {
  const [queue, setQueue] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState<'off' | 'track' | 'queue'>('off');

  const playNext = (tracks: Track[], startIndex = 0) => {
    setQueue(tracks);
    setCurrentIndex(startIndex);
  };

  const nextTrack = () => {
    if (repeatMode === 'track') return queue[currentIndex];
    
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(prev => prev + 1);
      return queue[currentIndex + 1];
    } else if (repeatMode === 'queue') {
      setCurrentIndex(0);
      return queue[0];
    }
    return null;
  };

  const previousTrack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      return queue[currentIndex - 1];
    }
    return null;
  };

  const toggleRepeat = () => {
    const modes: Array<'off' | 'track' | 'queue'> = ['off', 'track', 'queue'];
    const currentModeIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentModeIndex + 1) % modes.length]);
  };

  return {
    queue,
    currentIndex,
    currentTrack: queue[currentIndex] || null,
    repeatMode,
    playNext,
    nextTrack,
    previousTrack,
    toggleRepeat
  };
};