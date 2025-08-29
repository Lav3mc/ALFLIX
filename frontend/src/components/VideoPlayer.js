import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, ArrowLeft } from 'lucide-react';

const VideoPlayer = ({ content, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Auto-hide controls after 3 seconds
    if (showControls && isPlaying) {
      timeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [showControls, isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // YouTube embed URL
  const youtubeUrl = content.youtube_key ? 
    `https://www.youtube.com/embed/${content.youtube_key}?autoplay=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1` : 
    null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div 
        className="relative w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Video Container */}
        <div className="w-full h-full relative">
          {youtubeUrl ? (
            // YouTube Player
            <iframe
              src={youtubeUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={content.title}
            />
          ) : (
            // Fallback - Show poster with play button
            <div 
              className="w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `url(${content.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative z-10 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {content.title}
                </h1>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl">
                  {content.overview}
                </p>
                <button
                  onClick={togglePlay}
                  className="bg-white text-black hover:bg-gray-200 rounded-full p-6 transition-colors"
                >
                  <Play className="w-12 h-12 fill-current" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Controls Overlay */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <ArrowLeft className="w-8 h-8" />
              </button>
              
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* Center Play Button */}
          {!youtubeUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="bg-black/50 hover:bg-black/70 rounded-full p-6 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-12 h-12 text-white" />
                ) : (
                  <Play className="w-12 h-12 text-white fill-current" />
                )}
              </button>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-white text-xl font-semibold">
                  {content.title}
                </h2>
                {content.full_movie_available && (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    FULL MOVIE
                  </span>
                )}
                {content.duration && (
                  <span className="text-gray-400 text-sm">
                    {content.duration}
                  </span>
                )}
                <span className="text-gray-400">
                  {content.release_date?.split('-')[0]}
                </span>
                <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">
                  {content.vote_average}/10
                </span>
              </div>

              <div className="flex items-center space-x-4">
                {!youtubeUrl && (
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-6 h-6" />
                    ) : (
                      <Volume2 className="w-6 h-6" />
                    )}
                  </button>
                )}
                
                <button className="text-white hover:text-gray-300 transition-colors">
                  <Maximize className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;