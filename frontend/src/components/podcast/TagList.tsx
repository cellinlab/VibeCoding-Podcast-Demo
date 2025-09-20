import React from 'react';
import { extractTags } from '../../utils/dataLoader';

interface TagListProps {
  description: string;
  onTagClick?: (tag: string) => void;
  maxTags?: number;
}

const TagList: React.FC<TagListProps> = ({ 
  description, 
  onTagClick, 
  maxTags = 10 
}) => {
  const tags = extractTags(description).slice(0, maxTags);

  if (tags.length === 0) {
    return null;
  }

  const handleTagClick = (tag: string) => {
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"/>
        </svg>
        关键词标签
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleTagClick(tag)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-background-secondary hover:bg-primary/10 text-secondary-light hover:text-primary border border-border hover:border-primary/20 rounded-full transition-colors duration-200"
          >
            <span>#</span>
            <span>{tag}</span>
          </button>
        ))}
      </div>

      {tags.length >= maxTags && (
        <div className="text-xs text-secondary-lighter">
          显示前 {maxTags} 个标签
        </div>
      )}
    </div>
  );
};

export default TagList;
