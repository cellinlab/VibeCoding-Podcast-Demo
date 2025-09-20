import React from 'react';
import { parseTimelineIndex, timeToSeconds } from '../../utils/dataLoader';


interface TimelineIndexProps {
  description: string;
  currentTime?: number;
  onTimeClick?: (timeInSeconds: number) => void;
}

const TimelineIndex: React.FC<TimelineIndexProps> = ({ 
  description, 
  currentTime = 0, 
  onTimeClick 
}) => {
  const timelineItems = parseTimelineIndex(description);

  if (timelineItems.length === 0) {
    return null;
  }

  const handleTimeClick = (timeString: string) => {
    const timeInSeconds = timeToSeconds(timeString);
    if (onTimeClick) {
      onTimeClick(timeInSeconds);
    }
  };

  const formatTime = (timeString: string) => {
    // 确保时间格式为 mm:ss 或 hh:mm:ss
    const parts = timeString.split(':');
    if (parts.length === 2) {
      return timeString; // mm:ss
    } else if (parts.length === 3) {
      return timeString; // hh:mm:ss
    }
    return timeString;
  };

  const isCurrentTime = (timeString: string) => {
    const timeInSeconds = timeToSeconds(timeString);
    // 允许 30 秒的误差范围
    return Math.abs(currentTime - timeInSeconds) <= 30;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        时间轴索引
      </h3>
      
      <div className="space-y-2">
        {timelineItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-3 rounded-lg transition-colors duration-200 cursor-pointer ${
              isCurrentTime(item.time)
                ? 'bg-primary/10 border border-primary/20'
                : 'hover:bg-background-secondary'
            }`}
            onClick={() => handleTimeClick(item.time)}
          >
            {/* 时间标签 */}
            <div className={`flex-shrink-0 px-2 py-1 rounded text-sm font-mono ${
              isCurrentTime(item.time)
                ? 'bg-primary text-white'
                : 'bg-background-secondary text-secondary-light'
            }`}>
              {formatTime(item.time)}
            </div>
            
            {/* 标题 */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${
                isCurrentTime(item.time)
                  ? 'text-secondary font-medium'
                  : 'text-secondary-light'
              }`}>
                {item.title}
              </p>
            </div>

            {/* 当前播放指示器 */}
            {isCurrentTime(item.time) && (
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              </div>
            )}
          </div>
        ))}
      </div>

      {timelineItems.length > 0 && (
        <div className="text-xs text-secondary-lighter pt-2 border-t border-border">
          共 {timelineItems.length} 个时间点 • 点击时间可跳转到对应位置
        </div>
      )}
    </div>
  );
};

export default TimelineIndex;
