import React from 'react';
import type { Podcast } from '../../types';
import { formatPlayCount } from '../../utils/dataLoader';

interface PodcastHeaderProps {
  podcast: Podcast;
}

const PodcastHeader: React.FC<PodcastHeaderProps> = ({ podcast }) => {
  return (
    <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
      
      <div className="relative p-6 md:p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center">
          {/* 播客封面 */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={podcast.image.largePicUrl}
                alt={podcast.title}
                className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-xl shadow-lg object-cover"
              />
              {/* 播放按钮覆盖层 */}
              <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <button className="bg-white/90 hover:bg-white text-primary p-3 rounded-full shadow-lg transition-colors duration-200">
                  <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* 播客信息 */}
          <div className="flex-1 min-w-0">
            <div className="space-y-4">
              {/* 标题和作者 */}
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary mb-2">
                  {podcast.title}
                </h1>
                <p className="text-lg text-secondary-light">
                  作者：{podcast.author}
                </p>
              </div>

              {/* 描述 */}
              <div className="max-w-3xl">
                <p className="text-secondary-light leading-relaxed text-truncate-3">
                  {podcast.description}
                </p>
              </div>

              {/* 统计信息 */}
              <div className="flex flex-wrap gap-4 text-sm text-secondary-light">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>{formatPlayCount(podcast.subscriptionCount)} 订阅</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>{podcast.episodeCount} 期节目</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  <span>总时长 {Math.floor(podcast.playTime / 3600)} 小时</span>
                </div>
              </div>

              {/* 最新更新时间 */}
              <div className="text-sm text-secondary-lighter">
                最新更新：{new Date(podcast.latestEpisodePubDate).toLocaleDateString('zh-CN')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastHeader;
