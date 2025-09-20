import React, { useState, useMemo } from 'react';
import type { Episode } from '../../types';
import EpisodeCard from './EpisodeCard';

interface EpisodeListProps {
  episodes: Episode[];
  onEpisodeClick?: (episode: Episode) => void;
}

type SortOption = 'newest' | 'oldest' | 'duration' | 'popularity';

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes, onEpisodeClick }) => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchTerm, setSearchTerm] = useState('');

  // 排序和搜索逻辑
  const filteredAndSortedEpisodes = useMemo(() => {
    let filtered = episodes;

    // 搜索过滤
    if (searchTerm) {
      filtered = episodes.filter(episode =>
        episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 排序
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
        case 'oldest':
          return new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime();
        case 'duration':
          return b.duration - a.duration;
        case 'popularity':
          return b.playCount - a.playCount;
        default:
          return 0;
      }
    });
  }, [episodes, sortBy, searchTerm]);

  const handleEpisodeClick = (episode: Episode) => {
    if (onEpisodeClick) {
      onEpisodeClick(episode);
    }
  };

  if (episodes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-secondary-light mb-4">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-secondary mb-2">暂无节目</h3>
        <p className="text-secondary-light">还没有发布任何节目内容</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 搜索和排序控制 */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* 搜索框 */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-secondary-lighter" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="搜索节目..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>

        {/* 排序选择 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-secondary-light">排序：</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="input text-sm py-2"
          >
            <option value="newest">最新发布</option>
            <option value="oldest">最早发布</option>
            <option value="duration">时长最长</option>
            <option value="popularity">播放最多</option>
          </select>
        </div>
      </div>

      {/* 搜索结果统计 */}
      {searchTerm && (
        <div className="text-sm text-secondary-light">
          找到 {filteredAndSortedEpisodes.length} 个节目
          {filteredAndSortedEpisodes.length !== episodes.length && (
            <span>（共 {episodes.length} 个节目）</span>
          )}
        </div>
      )}

      {/* 节目列表 */}
      {filteredAndSortedEpisodes.length > 0 ? (
        <div className="grid-episodes">
          {filteredAndSortedEpisodes.map((episode) => (
            <EpisodeCard
              key={episode.eid}
              episode={episode}
              onClick={() => handleEpisodeClick(episode)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-secondary-light mb-4">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-secondary mb-2">未找到匹配的节目</h3>
          <p className="text-secondary-light">尝试使用不同的关键词搜索</p>
        </div>
      )}

      {/* 加载更多按钮（如果需要分页） */}
      {filteredAndSortedEpisodes.length > 0 && (
        <div className="text-center pt-6">
          <button className="btn btn-ghost">
            显示更多节目
          </button>
        </div>
      )}
    </div>
  );
};

export default EpisodeList;
