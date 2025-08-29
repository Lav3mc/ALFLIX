import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const ContentRow = ({ title, content, onContentClick, onPlayClick }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);

  const scroll = (direction) => {
    const container = document.getElementById(`row-${title.replace(/\s/g, '')}`);
    const scrollAmount = container.clientWidth * 0.8;
    
    if (direction === 'left') {
      const newPosition = Math.max(0, scrollPosition - scrollAmount);
      setScrollPosition(newPosition);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    } else {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const newPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
      setScrollPosition(newPosition);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  if (!content || content.length === 0) return null;

  return (
    <div className="relative group">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 px-4 md:px-0">
        {title}
      </h2>
      
      <div className="relative">
        {/* Left Arrow */}
        {scrollPosition > 0 && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-30 bg-black/50 hover:bg-black/80 text-white w-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        {/* Content Container */}
        <div
          id={`row-${title.replace(/\s/g, '')}`}
          className="flex space-x-2 overflow-x-auto scrollbar-hide px-4 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {content.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 relative group/item"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Movie Poster */}
              <div className="w-40 md:w-48 lg:w-56 transition-transform duration-300 group-hover/item:scale-110 cursor-pointer">
                <img
                  src={item.poster_path}
                  alt={item.title}
                  className="w-full h-60 md:h-72 lg:h-80 object-cover rounded-md"
                  onClick={() => onContentClick(item)}
                />
                
                {/* Hover Overlay */}
                {hoveredItem === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 mb-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlayClick(item);
                          }}
                          className="bg-white hover:bg-gray-200 text-black rounded-full p-2 transition-colors"
                        >
                          <Play className="w-4 h-4 fill-current" />
                        </button>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add to watchlist functionality
                            console.log(`Added ${item.title} to watchlist`);
                            alert(`✅ Added "${item.title}" to your watchlist!`);
                          }}
                          className="bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full p-2 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            // Like functionality
                            console.log(`Liked ${item.title}`);
                            alert(`👍 You liked "${item.title}"!`);
                          }}
                          className="bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full p-2 transition-colors"
                        >
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            // More info functionality
                            console.log(`More info for ${item.title}`);
                            alert(`ℹ️ More Info:\n\n${item.overview}\n\nRating: ${item.vote_average}/10\nRelease: ${item.release_date}`);
                          }}
                          className="bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full p-2 ml-auto transition-colors"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Movie Info */}
                      <div className="flex items-center space-x-2 text-xs text-gray-300">
                        <span className="text-green-400 font-semibold">
                          {Math.round(item.vote_average * 10)}% Match
                        </span>
                        <span className="border border-gray-500 px-1 rounded text-xs">
                          {item.media_type === 'movie' ? 'Movie' : 'TV'}
                        </span>
                        <span>{item.release_date?.split('-')[0]}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-30 bg-black/50 hover:bg-black/80 text-white w-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default ContentRow;