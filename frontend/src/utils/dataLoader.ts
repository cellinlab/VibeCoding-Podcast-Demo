import type { PodcastData, Podcast, Episode } from '../types';
import podcastData from '../data/podcast.json';

// 加载播客数据
export const loadPodcastData = async (): Promise<PodcastData> => {
  // 模拟异步加载
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(podcastData as PodcastData);
    }, 500);
  });
};

// 获取播客信息
export const getPodcast = (data: PodcastData): Podcast => {
  return data.props.pageProps.podcast;
};

// 获取节目列表
export const getEpisodes = (data: PodcastData): Episode[] => {
  return data.props.pageProps.podcast.episodes;
};

// 根据ID获取单个节目
export const getEpisodeById = (data: PodcastData, episodeId: string): Episode | null => {
  const episodes = getEpisodes(data);
  return episodes.find(episode => episode.eid === episodeId) || null;
};

// 格式化时长（秒转换为 mm:ss 或 hh:mm:ss）
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// 格式化播放次数
export const formatPlayCount = (count: number): string => {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}万`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

// 格式化日期
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return '今天';
  } else if (diffInDays === 1) {
    return '昨天';
  } else if (diffInDays < 7) {
    return `${diffInDays}天前`;
  } else if (diffInDays < 30) {
    return `${Math.floor(diffInDays / 7)}周前`;
  } else {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
};

// 解析时间轴索引
export const parseTimelineIndex = (description: string): Array<{time: string, title: string}> => {
  const timelineRegex = /\*\s*(\d{2}:\d{2}(?::\d{2})?)\s*[｜|]\s*(.+)/g;
  const timeline: Array<{time: string, title: string}> = [];
  let match;

  while ((match = timelineRegex.exec(description)) !== null) {
    timeline.push({
      time: match[1],
      title: match[2].trim()
    });
  }

  return timeline;
};

// 提取关键词标签
export const extractTags = (description: string): string[] => {
  const tagRegex = /#([^#\s]+)/g;
  const tags: string[] = [];
  let match;

  while ((match = tagRegex.exec(description)) !== null) {
    tags.push(match[1]);
  }

  return tags;
};

// 时间字符串转换为秒数
export const timeToSeconds = (timeString: string): number => {
  const parts = timeString.split(':').map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return 0;
};
