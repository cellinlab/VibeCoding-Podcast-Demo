import React, { useState } from 'react';
import { usePlayer } from '../../hooks/usePodcastData';
import { formatDuration } from '../../utils/dataLoader';

const GlobalPlayer: React.FC = () => {
  const { currentEpisode, playerState, pauseEpisode, resumeEpisode } = usePlayer();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!currentEpisode) {
    return null;
  }

  const handlePlayPause = () => {
    if (playerState.isPlaying) {
      pauseEpisode();
    } else {
      resumeEpisode();
    }
  };

  const progressPercentage = playerState.duration 
    ? (playerState.currentTime / playerState.duration) * 100 
    : 0;

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg transition-all duration-300 ${
      isExpanded ? 'h-32' : 'h-16'
    }`}>
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center h-full gap-4">
          {/* 节目封面 */}
          <img
            src={currentEpisode.image.smallPicUrl}
            alt={currentEpisode.title}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          />

          {/* 节目信息 */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-secondary text-truncate">
              {currentEpisode.title}
            </h3>
            <p className="text-sm text-secondary-light text-truncate">
              {currentEpisode.podcast.title}
            </p>
          </div>

          {/* 播放控制 */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePlayPause}
              className="player-control bg-primary text-white hover:bg-primary-dark"
            >
              {playerState.isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            {/* 展开/收起按钮 */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="player-control"
            >
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* 进度条 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-border">
          <div
            className="h-full bg-primary transition-all duration-200"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* 展开的详细信息 */}
        {isExpanded && (
          <div className="absolute bottom-16 left-0 right-0 bg-white border-t border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <span className="text-sm text-secondary-light">
                  {formatDuration(playerState.currentTime)}
                </span>
                <div className="flex-1 mx-4">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm text-secondary-light">
                  {formatDuration(playerState.duration)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-secondary-lighter">
              <span>音量: {Math.round(playerState.volume * 100)}%</span>
              <span>播放速度: {playerState.playbackRate}x</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalPlayer;
