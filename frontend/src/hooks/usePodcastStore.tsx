import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { AppState, Podcast, Episode, PlayerState } from '../types';

// 初始状态
const initialState: AppState = {
  currentPodcast: null,
  episodes: [],
  currentEpisode: null,
  playerState: {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    playbackRate: 1,
  },
  loading: false,
  error: null,
};

// Action 类型
type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PODCAST'; payload: Podcast }
  | { type: 'SET_EPISODES'; payload: Episode[] }
  | { type: 'SET_CURRENT_EPISODE'; payload: Episode | null }
  | { type: 'SET_PLAYER_STATE'; payload: Partial<PlayerState> }
  | { type: 'PLAY_EPISODE'; payload: Episode }
  | { type: 'PAUSE_EPISODE' }
  | { type: 'RESUME_EPISODE' }
  | { type: 'STOP_EPISODE' }
  | { type: 'UPDATE_PROGRESS'; payload: { currentTime: number; duration: number } }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_PLAYBACK_RATE'; payload: number };

// Reducer
const podcastReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_PODCAST':
      return { ...state, currentPodcast: action.payload, error: null };
    
    case 'SET_EPISODES':
      return { ...state, episodes: action.payload, error: null };
    
    case 'SET_CURRENT_EPISODE':
      return { ...state, currentEpisode: action.payload };
    
    case 'SET_PLAYER_STATE':
      return {
        ...state,
        playerState: { ...state.playerState, ...action.payload }
      };
    
    case 'PLAY_EPISODE':
      return {
        ...state,
        currentEpisode: action.payload,
        playerState: {
          ...state.playerState,
          isPlaying: true,
          currentTime: 0,
          duration: action.payload.duration,
        }
      };
    
    case 'PAUSE_EPISODE':
      return {
        ...state,
        playerState: { ...state.playerState, isPlaying: false }
      };
    
    case 'RESUME_EPISODE':
      return {
        ...state,
        playerState: { ...state.playerState, isPlaying: true }
      };
    
    case 'STOP_EPISODE':
      return {
        ...state,
        playerState: {
          ...state.playerState,
          isPlaying: false,
          currentTime: 0,
        }
      };
    
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        playerState: {
          ...state.playerState,
          currentTime: action.payload.currentTime,
          duration: action.payload.duration,
        }
      };
    
    case 'SET_VOLUME':
      return {
        ...state,
        playerState: { ...state.playerState, volume: action.payload }
      };
    
    case 'SET_PLAYBACK_RATE':
      return {
        ...state,
        playerState: { ...state.playerState, playbackRate: action.payload }
      };
    
    default:
      return state;
  }
};

// Context
const PodcastContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

// Provider 组件
export const PodcastProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(podcastReducer, initialState);

  return (
    <PodcastContext.Provider value={{ state, dispatch }}>
      {children}
    </PodcastContext.Provider>
  );
};

// Hook
export const usePodcastStore = () => {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error('usePodcastStore must be used within a PodcastProvider');
  }
  return context;
};

// 便捷的 action creators
export const podcastActions = {
  setLoading: (loading: boolean) => ({ type: 'SET_LOADING' as const, payload: loading }),
  setError: (error: string | null) => ({ type: 'SET_ERROR' as const, payload: error }),
  setPodcast: (podcast: Podcast) => ({ type: 'SET_PODCAST' as const, payload: podcast }),
  setEpisodes: (episodes: Episode[]) => ({ type: 'SET_EPISODES' as const, payload: episodes }),
  setCurrentEpisode: (episode: Episode | null) => ({ type: 'SET_CURRENT_EPISODE' as const, payload: episode }),
  setPlayerState: (playerState: Partial<PlayerState>) => ({ type: 'SET_PLAYER_STATE' as const, payload: playerState }),
  playEpisode: (episode: Episode) => ({ type: 'PLAY_EPISODE' as const, payload: episode }),
  pauseEpisode: () => ({ type: 'PAUSE_EPISODE' as const }),
  resumeEpisode: () => ({ type: 'RESUME_EPISODE' as const }),
  stopEpisode: () => ({ type: 'STOP_EPISODE' as const }),
  updateProgress: (currentTime: number, duration: number) => ({ 
    type: 'UPDATE_PROGRESS' as const, 
    payload: { currentTime, duration } 
  }),
  setVolume: (volume: number) => ({ type: 'SET_VOLUME' as const, payload: volume }),
  setPlaybackRate: (playbackRate: number) => ({ type: 'SET_PLAYBACK_RATE' as const, payload: playbackRate }),
};
