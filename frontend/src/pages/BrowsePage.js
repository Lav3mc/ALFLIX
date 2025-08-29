import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import ContentRow from '../components/ContentRow';
import VideoPlayer from '../components/VideoPlayer';
import { movieAPI, GENRES, handleApiError } from '../services/api';
import { marvelService } from '../services/marvel_api';
import { mockMovieData } from '../data/mockData'; // Fallback data

const BrowsePage = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for different content categories
  const [trendingContent, setTrendingContent] = useState([]);
  const [popularContent, setPopularContent] = useState([]);
  const [topRatedContent, setTopRatedContent] = useState([]);
  const [actionContent, setActionContent] = useState([]);
  const [comedyContent, setComedyContent] = useState([]);
  const [horrorContent, setHorrorContent] = useState([]);
  const [freeContent, setFreeContent] = useState([]);
  const [marvelContent, setMarvelContent] = useState([]);
  const [freeFullMovies, setFreeFullMovies] = useState([]);

  // Load all content on component mount
  useEffect(() => {
    loadAllContent();
  }, []);

  const loadAllContent = async () => {
    setIsLoading(true);
    
    try {
      // Load free full movies first (no API needed)
      const freeMovies = marvelService.getFreeFullMovies();
      setFreeFullMovies(freeMovies);
      
      // Load all categories in parallel for better performance
      const [
        trending,
        popular, 
        topRated,
        action,
        comedy,
        horror,
        free,
        marvel
      ] = await Promise.allSettled([
        movieAPI.getTrending(),
        movieAPI.getPopular(),
        movieAPI.getTopRated(),
        movieAPI.getByGenre(GENRES.ACTION),
        movieAPI.getByGenre(GENRES.COMEDY),
        movieAPI.getByGenre(GENRES.HORROR),
        movieAPI.getFreeMovies(),
        marvelService.getAllMCUMovies()
      ]);

      // Handle each API response with fallbacks
      setTrendingContent(
        trending.status === 'fulfilled' ? trending.value : 
        handleApiError(trending.reason, mockMovieData.trending)
      );
      
      setPopularContent(
        popular.status === 'fulfilled' ? popular.value : 
        handleApiError(popular.reason, mockMovieData.popular)
      );
      
      setTopRatedContent(
        topRated.status === 'fulfilled' ? topRated.value : 
        handleApiError(topRated.reason, mockMovieData.topRated)
      );
      
      setActionContent(
        action.status === 'fulfilled' ? action.value : 
        handleApiError(action.reason, mockMovieData.action)
      );
      
      setComedyContent(
        comedy.status === 'fulfilled' ? comedy.value : 
        handleApiError(comedy.reason, mockMovieData.comedy)
      );
      
      setHorrorContent(
        horror.status === 'fulfilled' ? horror.value : 
        handleApiError(horror.reason, mockMovieData.horror)
      );

      setFreeContent(
        free.status === 'fulfilled' ? free.value : []
      );

      setMarvelContent(
        marvel.status === 'fulfilled' ? marvel.value : []
      );

    } catch (error) {
      console.error('Error loading content:', error);
      // Use mock data as complete fallback
      setTrendingContent(mockMovieData.trending);
      setPopularContent(mockMovieData.popular);
      setTopRatedContent(mockMovieData.topRated);
      setActionContent(mockMovieData.action);
      setComedyContent(mockMovieData.comedy);
      setHorrorContent(mockMovieData.horror);
      setFreeFullMovies(marvelService.getFreeFullMovies());
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };

  const handlePlayClick = (content) => {
    setSelectedContent(content);
    setShowPlayer(true);
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setSelectedContent(null);
  };

  // Get featured content for hero banner
  const featuredContent = trendingContent.length > 0 ? trendingContent[0] : mockMovieData.trending[0];

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-xl">Loading amazing content...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      {!showPlayer ? (
        <>
          <HeroBanner 
            content={featuredContent}
            onPlayClick={handlePlayClick}
          />
          
          <div className="px-4 md:px-12 pb-20 space-y-8 -mt-32 relative z-20">
            {freeFullMovies.length > 0 && (
              <ContentRow
                title="🎬 FREE FULL MOVIES - Watch Now!"
                content={freeFullMovies}
                onContentClick={handleContentClick}
                onPlayClick={handlePlayClick}
              />
            )}

            {marvelContent.length > 0 && (
              <ContentRow
                title="🦸 Marvel Cinematic Universe"
                content={marvelContent}
                onContentClick={handleContentClick}
                onPlayClick={handlePlayClick}
              />
            )}

            {trendingContent.length > 0 && (
              <ContentRow
                title="Trending Now"
                content={trendingContent}
                onContentClick={handleContentClick}
                onPlayClick={handlePlayClick}
              />
            )}
            
            {popularContent.length > 0 && (
              <ContentRow
                title="Popular Movies"
                content={popularContent}
                onContentClick={handleContentClick}
                onPlayClick={handlePlayClick}
              />
            )}
            
            {topRatedContent.length > 0 && (
              <ContentRow
                title="Top Rated"
                content={topRatedContent}
                onContentClick={handleContentClick}
                onPlayClick={handlePlayClick}
              />
            )}

            {freeContent.length > 0 && (
              <ContentRow
                title="🎭 More Free Content"
                content={freeContent}
                onContentClick={handleContentClick}
                onPlayClick={handlePlayClick}
              />
            )}
            
            {actionContent.length > 0 && (
              <ContentRow
                title="Action Movies"
                content={actionContent}
                onContentClick={handleContentClick}
                onPlayClick={handlePlayClick}
              />
            )}
            
            {comedyContent.length > 0 && (
              <ContentRow
                title="Comedy Movies"
                content={comedyContent}
                onContentClick={handleContentClick}
                onPlayClick={handlePlayClick}
              />
            )}
            
            {horrorContent.length > 0 && (
              <ContentRow
                title="Horror Movies"
                content={horrorContent}
                onContentClick={handleContentClick}
                onPlayClick={handlePlayClick}
              />
            )}
          </div>
        </>
      ) : (
        <VideoPlayer 
          content={selectedContent}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
};

export default BrowsePage;