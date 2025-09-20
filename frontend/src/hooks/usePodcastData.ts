import { useEffect } from 'react';
import { usePodcastStore, podcastActions } from './usePodcastStore';
import { loadPodcastData, getPodcast, getEpisodes } from '../utils/dataLoader';

// 加载播客数据的 Hook
export const usePodcastData = () => {
  const { state, dispatch } = usePodcastStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch(podcastActions.setLoading(true));
        dispatch(podcastActions.setError(null));

        const data = await loadPodcastData();
        const podcast = getPodcast(data);
        const episodes = getEpisodes(data);

        dispatch(podcastActions.setPodcast(podcast));
        dispatch(podcastActions.setEpisodes(episodes));
      } catch (error) {
        dispatch(podcastActions.setError(error instanceof Error ? error.message : '加载数据失败'));
      } finally {
        dispatch(podcastActions.setLoading(false));
      }
    };

    // 只有在没有数据时才加载
    if (!state.currentPodcast && !state.loading) {
      loadData();
    }
  }, [state.currentPodcast, state.loading, dispatch]);

  return {
    podcast: state.currentPodcast,
    episodes: state.episodes,
    loading: state.loading,
    error: state.error,
  };
};

// 获取单个节目的 Hook
export const useEpisode = (episodeId: string) => {
  const { state } = usePodcastStore();
  
  return state.episodes.find(episode => episode.eid === episodeId) || null;
};

// 播放器相关的 Hook
export const usePlayer = () => {
  const { state, dispatch } = usePodcastStore();

  const playEpisode = (episode: any) => {
    dispatch(podcastActions.playEpisode(episode));
  };

  const pauseEpisode = () => {
    dispatch(podcastActions.pauseEpisode());
  };

  const resumeEpisode = () => {
    dispatch(podcastActions.resumeEpisode());
  };

  const stopEpisode = () => {
    dispatch(podcastActions.stopEpisode());
  };

  const updateProgress = (currentTime: number, duration: number) => {
    dispatch(podcastActions.updateProgress(currentTime, duration));
  };

  const setVolume = (volume: number) => {
    dispatch(podcastActions.setVolume(volume));
  };

  const setPlaybackRate = (playbackRate: number) => {
    dispatch(podcastActions.setPlaybackRate(playbackRate));
  };

  return {
    currentEpisode: state.currentEpisode,
    playerState: state.playerState,
    playEpisode,
    pauseEpisode,
    resumeEpisode,
    stopEpisode,
    updateProgress,
    setVolume,
    setPlaybackRate,
  };
};
