import React, { useRef, useEffect, useState } from 'react';
import type { Episode } from '../../types';
import { usePlayer } from '../../hooks/usePodcastData';
import { formatDuration } from '../../utils/dataLoader';

interface AudioPlayerProps {
  episode: Episode;
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ episode, className = '' }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentEpisode, playerState, playEpisode, pauseEpisode, resumeEpisode, updateProgress, setVolume, setPlaybackRate } = usePlayer();
  const [isDragging, setIsDragging] = useState(false);
  const [localCurrentTime] = useState(0);

  // 当前播放的节目
  const isCurrentEpisode = currentEpisode?.eid === episode.eid;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (!isDragging) {
        updateProgress(audio.currentTime, audio.duration);
      }
    };

    const handleLoadedMetadata = () => {
      updateProgress(0, audio.duration);
    };

    const handleEnded = () => {
      updateProgress(0, audio.duration);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isDragging, updateProgress]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isCurrentEpisode) {
      audio.src = episode.media.source.url;
      audio.load();
    }
  }, [episode, isCurrentEpisode]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isCurrentEpisode) {
      if (playerState.isPlaying) {
        audio.play().catch(console.error);
      } else {
        audio.pause();
      }
    }
  }, [isCurrentEpisode, playerState.isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = playerState.volume;
    audio.playbackRate = playerState.playbackRate;
  }, [playerState.volume, playerState.playbackRate]);

  const handlePlayPause = () => {
    if (isCurrentEpisode) {
      if (playerState.isPlaying) {
        pauseEpisode();
      } else {
        resumeEpisode();
      }
    } else {
      playEpisode(episode);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * audio.duration;

    audio.currentTime = newTime;
    updateProgress(newTime, audio.duration);
  };

  const handleProgressMouseDown = () => {
    setIsDragging(true);
  };

  const handleProgressMouseUp = () => {
    setIsDragging(false);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = localCurrentTime;
      updateProgress(localCurrentTime, audio.duration);
    }
  };


  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handlePlaybackRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRate = parseFloat(e.target.value);
    setPlaybackRate(newRate);
  };

  const currentTime = isDragging ? localCurrentTime : (isCurrentEpisode ? playerState.currentTime : 0);
  const duration = isCurrentEpisode ? playerState.duration : episode.duration;

  return (
    <div className={`card p-6 ${className}`}>
      <audio ref={audioRef} preload="metadata" />
      
      <div className="space-y-4">
        {/* 播放控制 */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlayPause}
            className="player-control bg-primary text-white hover:bg-primary-dark"
          >
            {isCurrentEpisode && playerState.isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          <div className="flex-1">
            <div className="flex items-center justify-between text-sm text-secondary-light mb-2">
              <span>{formatDuration(currentTime)}</span>
              <span>{formatDuration(duration)}</span>
            </div>
            
            {/* 进度条 */}
            <div
              className="progress-bar cursor-pointer"
              onClick={handleProgressClick}
              onMouseDown={handleProgressMouseDown}
              onMouseUp={handleProgressMouseUp}
            >
              <div
                className="progress-fill"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* 音量控制 */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-secondary-light" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={playerState.volume}
              onChange={handleVolumeChange}
              className="w-20"
            />
          </div>

          {/* 播放速度 */}
          <select
            value={playerState.playbackRate}
            onChange={handlePlaybackRateChange}
            className="text-sm border border-border rounded px-2 py-1"
          >
            <option value={0.5}>0.5x</option>
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>

        {/* 节目信息 */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <img
            src={episode.image.smallPicUrl}
            alt={episode.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-secondary text-truncate">
              {episode.title}
            </h3>
            <p className="text-sm text-secondary-light text-truncate">
              {episode.podcast.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
