import React from 'react';
import type { Episode } from '../../types';
import { formatDuration, formatDate, formatPlayCount } from '../../utils/dataLoader';
import { usePlayer } from '../../hooks/usePodcastData';

interface EpisodeCardProps {
  episode: Episode;
  onClick?: () => void;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, onClick }) => {
  const { playEpisode } = usePlayer();

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playEpisode(episode);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className="card card-hover cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="relative">
        {/* 节目封面 */}
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <img
            src={episode.image.largePicUrl}
            alt={episode.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* 播放按钮覆盖层 */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handlePlayClick}
              className="bg-white/90 hover:bg-white text-primary p-3 rounded-full shadow-lg transition-colors duration-200"
            >
              <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>

          {/* 时长标签 */}
          <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {formatDuration(episode.duration)}
          </div>
        </div>

        {/* 节目信息 */}
        <div className="p-4">
          <h3 className="font-semibold text-secondary text-truncate-2 mb-2 group-hover:text-primary transition-colors duration-200">
            {episode.title}
          </h3>
          
          <p className="text-sm text-secondary-light text-truncate-3 mb-3">
            {episode.description}
          </p>

          {/* 节目元信息 */}
          <div className="flex items-center justify-between text-xs text-secondary-lighter">
            <div className="flex items-center gap-3">
              <span>{formatDate(episode.pubDate)}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>{formatPlayCount(episode.playCount)}</span>
              </div>
            </div>
            
            {/* 互动数据 */}
            <div className="flex items-center gap-2">
              {episode.clapCount > 0 && (
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 4V2C7 1.45 7.45 1 8 1S9 1.45 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM7 6V19H17V6H7Z"/>
                  </svg>
                  <span>{episode.clapCount}</span>
                </div>
              )}
              {episode.commentCount > 0 && (
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H18L22 22V4C22 2.9 21.1 2 20 2ZM20 16H4V4H20V16Z"/>
                  </svg>
                  <span>{episode.commentCount}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
