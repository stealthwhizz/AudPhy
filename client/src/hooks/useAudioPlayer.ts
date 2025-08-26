import { useState, useRef, useEffect } from 'react';
import { useQueue } from './useQueue';

interface Track {
  id: string;
  title: string;
  artist: string;
  audioUrl?: string;
  duration?: number;
  thumbnail?: string;
}

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const queue = useQueue();

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      // Auto-play next track
      const nextTrack = queue.nextTrack();
      if (nextTrack) {
        playTrack(nextTrack);
      }
    });

    return () => audio.pause();
  }, []);

  const playTrack = async (track: Track) => {
    if (!audioRef.current) return;
    
    if (currentTrack?.id !== track.id) {
      // Get audio stream URL from backend
      try {
        const { musicApi } = await import('../services/musicApi');
        const { audioUrl } = await musicApi.getStream(track.id);
        audioRef.current.src = audioUrl;
        setCurrentTrack({ ...track, audioUrl });
      } catch (error) {
        console.error('Failed to get audio stream:', error);
        return;
      }
    }
    
    audioRef.current.play();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    const nextTrack = queue.nextTrack();
    if (nextTrack) playTrack(nextTrack);
  };

  const playPrevious = () => {
    const prevTrack = queue.previousTrack();
    if (prevTrack) playTrack(prevTrack);
  };

  const seekTo = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const changeVolume = (newVolume: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    queue,
    playTrack,
    togglePlay,
    playNext,
    playPrevious,
    seekTo,
    changeVolume
  };
};