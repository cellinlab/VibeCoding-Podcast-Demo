import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Episode } from '../../types';
import { formatDuration, formatDate, formatPlayCount } from '../../utils/dataLoader';

interface EpisodeHeaderProps {
  episode: Episode;
}

const EpisodeHeader: React.FC<EpisodeHeaderProps> = ({ episode }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
      
      <div className="relative p-6 md:p-8">
        {/* 返回按钮 */}
        <button
          onClick={handleBackClick}
          className="mb-6 flex items-center gap-2 text-secondary-light hover:text-secondary transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>返回播客列表</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center">
          {/* 节目封面 */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={episode.image.largePicUrl}
                alt={episode.title}
                className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-xl shadow-lg object-cover"
              />
              {/* 播放按钮覆盖层 */}
              <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <button className="bg-white/90 hover:bg-white text-primary p-4 rounded-full shadow-lg transition-colors duration-200">
                  <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* 节目信息 */}
          <div className="flex-1 min-w-0">
            <div className="space-y-4">
              {/* 标题 */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight">
                {episode.title}
              </h1>

              {/* 播客信息 */}
              <div className="flex items-center gap-2 text-secondary-light">
                <span>来自</span>
                <span className="font-medium text-primary">{episode.podcast.title}</span>
                <span>•</span>
                <span>{episode.podcast.author}</span>
              </div>

              {/* 描述 */}
              <div className="max-w-4xl">
                <p className="text-secondary-light leading-relaxed">
                  {episode.description}
                </p>
              </div>

              {/* 节目元信息 */}
              <div className="flex flex-wrap gap-6 text-sm text-secondary-light">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>{formatDate(episode.pubDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>{formatDuration(episode.duration)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>{formatPlayCount(episode.playCount)} 次播放</span>
                </div>
                {episode.clapCount > 0 && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 4V2C7 1.45 7.45 1 8 1S9 1.45 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM7 6V19H17V6H7Z"/>
                    </svg>
                    <span>{episode.clapCount} 点赞</span>
                  </div>
                )}
                {episode.commentCount > 0 && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H18L22 22V4C22 2.9 21.1 2 20 2ZM20 16H4V4H20V16Z"/>
                    </svg>
                    <span>{episode.commentCount} 评论</span>
                  </div>
                )}
              </div>

              {/* 文件信息 */}
              <div className="text-xs text-secondary-lighter bg-background-secondary px-3 py-2 rounded-lg inline-block">
                <div className="flex items-center gap-4">
                  <span>文件大小: {(episode.media.size / 1024 / 1024).toFixed(1)} MB</span>
                  <span>格式: {episode.media.mimeType}</span>
                  <span>时长: {formatDuration(episode.duration)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeHeader;
