import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePodcastData } from '../hooks/usePodcastData';
import type { Episode } from '../types';
import PodcastHeader from '../components/podcast/PodcastHeader';
import PodcastInfo from '../components/podcast/PodcastInfo';
import EpisodeList from '../components/podcast/EpisodeList';

const PodcastListPage: React.FC = () => {
  const { podcast, episodes, loading, error } = usePodcastData();
  const navigate = useNavigate();

  const handleEpisodeClick = (episode: Episode) => {
    navigate(`/episode/${episode.eid}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-secondary">
        <div className="container mx-auto px-4 py-8">
          {/* 加载骨架屏 */}
          <div className="space-y-8">
            {/* 头部骨架 */}
            <div className="bg-white rounded-xl p-8">
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                <div className="skeleton w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-xl"></div>
                <div className="flex-1 space-y-4">
                  <div className="skeleton h-8 w-3/4 rounded"></div>
                  <div className="skeleton h-6 w-1/2 rounded"></div>
                  <div className="skeleton h-4 w-full rounded"></div>
                  <div className="skeleton h-4 w-2/3 rounded"></div>
                  <div className="flex gap-4">
                    <div className="skeleton h-4 w-20 rounded"></div>
                    <div className="skeleton h-4 w-20 rounded"></div>
                    <div className="skeleton h-4 w-20 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 信息卡片骨架 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="card p-6">
                  <div className="skeleton h-6 w-24 rounded mb-4"></div>
                  <div className="space-y-4">
                    <div className="skeleton h-16 w-full rounded"></div>
                    <div className="skeleton h-16 w-full rounded"></div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="card p-6">
                  <div className="skeleton h-6 w-24 rounded mb-4"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="skeleton h-48 w-full rounded-lg"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-secondary mb-2">加载失败</h2>
          <p className="text-secondary-light mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  if (!podcast) {
    return (
      <div className="min-h-screen bg-background-secondary flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-secondary mb-2">未找到播客数据</h2>
          <p className="text-secondary-light">请检查数据文件是否正确</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* 播客头部 */}
          <PodcastHeader podcast={podcast} />

          {/* 主要内容区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧：播客信息 */}
            <div className="lg:col-span-1">
              <PodcastInfo podcast={podcast} />
            </div>

            {/* 右侧：节目列表 */}
            <div className="lg:col-span-2">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-secondary">节目列表</h2>
                  <div className="text-sm text-secondary-light">
                    共 {episodes.length} 期节目
                  </div>
                </div>
                
                <EpisodeList 
                  episodes={episodes} 
                  onEpisodeClick={handleEpisodeClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastListPage;
