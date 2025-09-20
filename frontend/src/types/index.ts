// 图片信息接口
export interface ImageInfo {
  picUrl: string;
  width: number;
  height: number;
  format: string;
  thumbnailUrl: string;
  smallPicUrl: string;
  middlePicUrl: string;
  largePicUrl: string;
}

// 颜色方案接口
export interface ColorScheme {
  original: string;
  light: string;
  dark: string;
}

// 主持人信息接口
export interface Podcaster {
  type: string;
  uid: string;
  avatar: {
    picture: ImageInfo;
  };
  avatarDecoration?: string;
  nickname: string;
  isNicknameSet: boolean;
  bio: string;
  gender?: string;
  isCancelled: boolean;
  ipLoc: string;
  readTrackInfo: Record<string, any>;
}

// 联系方式接口
export interface Contact {
  type: string;
  name: string;
  note?: string;
  url?: string;
}

// 媒体信息接口
export interface MediaInfo {
  id: string;
  size: number;
  mimeType: string;
  source: {
    mode: string;
    url: string;
  };
}

// 转录信息接口
export interface TranscriptInfo {
  mediaId: string;
}

// 权限接口
export interface Permission {
  name: string;
  status: string;
}

// 播客信息接口
export interface Podcast {
  type: string;
  pid: string;
  title: string;
  author: string;
  description: string;
  subscriptionCount: number;
  image: ImageInfo;
  color: ColorScheme;
  topicLabels: string[];
  syncMode: string;
  latestEpisodePubDate: string;
  subscriptionStatus: string;
  subscriptionPush: boolean;
  subscriptionPushPriority: string;
  subscriptionStar: boolean;
  status: string;
  episodeCount: number;
  permissions: Permission[];
  payType: string;
  payEpisodeCount: number;
  isCustomized: boolean;
  podcasters: Podcaster[];
  hasPopularEpisodes: boolean;
  contacts: Contact[];
  playTime: number;
  showZhuiguangIcon: boolean;
}

// 节目信息接口
export interface Episode {
  type: string;
  eid: string;
  pid: string;
  title: string;
  description: string;
  shownotes: string | null;
  duration: number;
  image: ImageInfo;
  enclosure: {
    url: string;
  };
  isPrivateMedia: boolean;
  mediaKey: string;
  media: MediaInfo;
  playCount: number;
  clapCount: number;
  commentCount: number;
  favoriteCount: number;
  pubDate: string;
  status: string;
  podcast: Podcast;
  isPlayed: boolean;
  isFinished: boolean;
  isFavorited: boolean;
  isPicked: boolean;
  permissions: Permission[];
  payType: string;
  wechatShare: {
    style: string;
  };
  labels: string[];
  sponsors: any[];
  isCustomized: boolean;
  ipLoc: string;
  transcript?: TranscriptInfo;
}

// 播放器状态接口
export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
}

// 应用状态接口
export interface AppState {
  currentPodcast: Podcast | null;
  episodes: Episode[];
  currentEpisode: Episode | null;
  playerState: PlayerState;
  loading: boolean;
  error: string | null;
}

// 播客数据根接口
export interface PodcastData {
  props: {
    pageProps: {
      podcast: Podcast & {
        episodes: Episode[];
      };
    };
    __N_SSG: boolean;
  };
  page: string;
  query: {
    id: string;
  };
  buildId: string;
  assetPrefix: string;
  isFallback: boolean;
  gsp: boolean;
  customServer: boolean;
  scriptLoader: any[];
}
