import React from 'react';
import { useParams } from 'react-router-dom';
import { usePodcastData, useEpisode } from '../hooks/usePodcastData';
import { usePlayer } from '../hooks/usePodcastData';
import EpisodeHeader from '../components/podcast/EpisodeHeader';
import AudioPlayer from '../components/player/AudioPlayer';
import EpisodeDetails from '../components/podcast/EpisodeDetails';

const EpisodeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error } = usePodcastData();
  const episode = useEpisode(id || '');
  const { playerState } = usePlayer();

  const handleTimeClick = (timeInSeconds: number) => {
    // 这里可以添加跳转到指定时间的功能
    console.log('Jump to time:', timeInSeconds);
  };

  const handleTagClick = (tag: string) => {
    // 这里可以添加标签搜索功能
    console.log('Search for tag:', tag);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-secondary">
        <div className="container mx-auto px-4 py-8">
          {/* 加载骨架屏 */}
          <div className="space-y-8">
            {/* 头部骨架 */}
            <div className="bg-white rounded-xl p-8">
              <div className="skeleton h-6 w-32 rounded mb-6"></div>
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                <div className="skeleton w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-xl"></div>
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

            {/* 播放器骨架 */}
            <div className="card p-6">
              <div className="skeleton h-20 w-full rounded"></div>
            </div>

            {/* 详情骨架 */}
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="card p-6">
                  <div className="skeleton h-6 w-32 rounded mb-4"></div>
                  <div className="skeleton h-4 w-full rounded mb-2"></div>
                  <div className="skeleton h-4 w-3/4 rounded"></div>
                </div>
              ))}
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

  if (!episode) {
    return (
      <div className="min-h-screen bg-background-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="text-secondary-light mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-secondary mb-2">节目未找到</h2>
          <p className="text-secondary-light">请检查节目ID是否正确</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* 节目头部 */}
          <EpisodeHeader episode={episode} />

          {/* 音频播放器 */}
          <AudioPlayer 
            episode={episode}
          />

          {/* 节目详情 */}
          <EpisodeDetails 
            episode={episode}
            currentTime={playerState.currentTime}
            onTimeClick={handleTimeClick}
            onTagClick={handleTagClick}
          />
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetailPage;
