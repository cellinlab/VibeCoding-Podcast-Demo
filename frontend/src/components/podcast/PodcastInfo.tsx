import React from 'react';
import type { Podcast } from '../../types';

interface PodcastInfoProps {
  podcast: Podcast;
}

const PodcastInfo: React.FC<PodcastInfoProps> = ({ podcast }) => {
  return (
    <div className="space-y-6">
      {/* 主持人信息 */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-secondary mb-4">主持人</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {podcast.podcasters.map((podcaster) => (
            <div key={podcaster.uid} className="flex items-start gap-3">
              <img
                src={podcaster.avatar.picture.smallPicUrl}
                alt={podcaster.nickname}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-secondary">{podcaster.nickname}</h3>
                <p className="text-sm text-secondary-light text-truncate-2 mt-1">
                  {podcaster.bio}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-secondary-lighter bg-background-secondary px-2 py-1 rounded">
                    {podcaster.ipLoc}
                  </span>
                  {podcaster.avatarDecoration && (
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                      {podcaster.avatarDecoration}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 联系方式 */}
      {podcast.contacts && podcast.contacts.length > 0 && (
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-secondary mb-4">联系方式</h2>
          <div className="flex flex-wrap gap-3">
            {podcast.contacts.map((contact, index) => (
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

      {/* 播客统计 */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-secondary mb-4">播客统计</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{podcast.episodeCount}</div>
            <div className="text-sm text-secondary-light">节目数量</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{podcast.subscriptionCount}</div>
            <div className="text-sm text-secondary-light">订阅数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{Math.floor(podcast.playTime / 3600)}</div>
            <div className="text-sm text-secondary-light">总时长(小时)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {podcast.payType === 'FREE' ? '免费' : '付费'}
            </div>
            <div className="text-sm text-secondary-light">类型</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastInfo;
