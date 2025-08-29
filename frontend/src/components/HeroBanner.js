import React from 'react';
import { Button } from './ui/button';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

const HeroBanner = ({ content, onPlayClick }) => {
  const [isMuted, setIsMuted] = useState(true);

  if (!content) return null;

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${content.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="px-4 md:px-12 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            {content.title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 line-clamp-3">
            {content.overview}
          </p>

          {/* Buttons */}
          <div className="flex items-center space-x-4 mb-8">
            <Button
              onClick={() => onPlayClick(content)}
              className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-3 text-lg flex items-center space-x-2"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>Play</span>
            </Button>
            
            <Button
              variant="secondary"
              onClick={() => {
                alert(`ℹ️ More Info about "${content.title}":\n\n${content.overview}\n\nRating: ${content.vote_average}/10\nRelease: ${content.release_date}`);
              }}
              className="bg-gray-600/70 text-white hover:bg-gray-500/70 font-semibold px-8 py-3 text-lg flex items-center space-x-2 backdrop-blur-sm"
            >
              <Info className="w-6 h-6" />
              <span>More Info</span>
            </Button>
          </div>

          {/* Movie Info */}
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
              {content.vote_average}/10
            </span>
            <span>{content.release_date?.split('-')[0]}</span>
            <span className="border border-gray-500 px-2 py-1 text-xs">HD</span>
          </div>
        </div>
      </div>

      {/* Mute Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-20 right-4 md:right-12 z-20 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-white" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
};

export default HeroBanner;