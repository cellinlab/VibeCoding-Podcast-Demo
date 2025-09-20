import React from 'react';
import type { Episode } from '../../types';
import TimelineIndex from './TimelineIndex';
import TagList from './TagList';

interface EpisodeDetailsProps {
  episode: Episode;
  currentTime?: number;
  onTimeClick?: (timeInSeconds: number) => void;
  onTagClick?: (tag: string) => void;
}

const EpisodeDetails: React.FC<EpisodeDetailsProps> = ({ 
  episode, 
  currentTime = 0, 
  onTimeClick, 
  onTagClick 
}) => {
  return (
    <div className="space-y-8">
      {/* 节目描述 */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-secondary mb-4">节目介绍</h2>
        <div className="prose prose-sm max-w-none">
          <div className="text-secondary-light leading-relaxed whitespace-pre-wrap">
            {episode.description}
          </div>
        </div>
      </div>

      {/* 时间轴索引 */}
      <div className="card p-6">
        <TimelineIndex 
          description={episode.description}
          currentTime={currentTime}
          onTimeClick={onTimeClick}
        />
      </div>

      {/* 关键词标签 */}
      <div className="card p-6">
        <TagList 
          description={episode.description}
          onTagClick={onTagClick}
        />
      </div>

      {/* 节目统计信息 */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-secondary mb-4">节目统计</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{episode.playCount}</div>
            <div className="text-sm text-secondary-light">播放次数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{episode.clapCount}</div>
            <div className="text-sm text-secondary-light">点赞数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{episode.commentCount}</div>
            <div className="text-sm text-secondary-light">评论数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{episode.favoriteCount}</div>
            <div className="text-sm text-secondary-light">收藏数</div>
          </div>
        </div>
      </div>

      {/* 播客信息 */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-secondary mb-4">播客信息</h2>
        <div className="flex items-start gap-4">
          <img
            src={episode.podcast.image.smallPicUrl}
            alt={episode.podcast.title}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-secondary mb-1">
              {episode.podcast.title}
            </h3>
            <p className="text-sm text-secondary-light mb-2">
              作者：{episode.podcast.author}
            </p>
            <p className="text-sm text-secondary-light text-truncate-2">
              {episode.podcast.description}
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-secondary-lighter">
              <span>{episode.podcast.subscriptionCount} 订阅</span>
              <span>•</span>
              <span>{episode.podcast.episodeCount} 期节目</span>
              <span>•</span>
              <span>{episode.podcast.payType === 'FREE' ? '免费' : '付费'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 相关链接 */}
      {episode.podcast.contacts && episode.podcast.contacts.length > 0 && (
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-secondary mb-4">相关链接</h2>
          <div className="flex flex-wrap gap-3">
            {episode.podcast.contacts.map((contact, index) => (
              <a
                key={index}
                href={contact.url || '#'}
                target={contact.url ? '_blank' : undefined}
                rel={contact.url ? 'noopener noreferrer' : undefined}
                className="btn btn-secondary flex items-center gap-2"
              >
                {contact.type === 'wechatOfficialAccounts' && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.5 12.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                )}
                {contact.type === 'wechat' && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.5 12.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                )}
                {contact.type === 'custom' && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                )}
                <span>{contact.name}</span>
                {contact.note && (
                  <span className="text-xs text-secondary-lighter">({contact.note})</span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodeDetails;
