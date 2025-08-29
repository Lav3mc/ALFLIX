import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ContentRow from '../components/ContentRow';
import VideoPlayer from '../components/VideoPlayer';
import { movieAPI, handleApiError } from '../services/api';
import { mockMovieData } from '../data/mockData';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [trendingContent, setTrendingContent] = useState([]);
  const [popularContent, setPopularContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      // Load trending and popular content when no search query
      loadSuggestions();
    }
  }, [query]);

  const performSearch = async (searchQuery) => {
    setIsSearching(true);
    try {
      const results = await movieAPI.search(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      // Use mock data as fallback
      const allContent = [
        ...mockMovieData.trending,
        ...mockMovieData.popular,
        ...mockMovieData.topRated,
        ...mockMovieData.action,
        ...mockMovieData.comedy,
        ...mockMovieData.horror
      ];
      
      const filtered = allContent.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.overview.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(filtered);
    } finally {
      setIsSearching(false);
    }
  };

  const loadSuggestions = async () => {
    try {
      const [trending, popular] = await Promise.allSettled([
        movieAPI.getTrending(),
        movieAPI.getPopular()
      ]);

      setTrendingContent(
        trending.status === 'fulfilled' ? trending.value : 
        handleApiError(trending.reason, mockMovieData.trending)
      );

      setPopularContent(
        popular.status === 'fulfilled' ? popular.value : 
        handleApiError(popular.reason, mockMovieData.popular)
      );
    } catch (error) {
      console.error('Error loading suggestions:', error);
      setTrendingContent(mockMovieData.trending);
      setPopularContent(mockMovieData.popular);
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

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      {!showPlayer ? (
        <div className="pt-24 px-4 md:px-12 pb-20">
          {query ? (
            <>
              <div className="flex items-center gap-4 mb-8">
                <h1 className="text-2xl md:text-3xl font-semibold">
                  Search results for "{query}"
                </h1>
                {isSearching && (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                )}
              </div>
              
              {searchResults.length > 0 ? (
                <ContentRow
                  title={`Found ${searchResults.length} results`}
                  content={searchResults}
                  onContentClick={handleContentClick}
                  onPlayClick={handlePlayClick}
                />
              ) : !isSearching ? (
                <div className="text-center py-20">
                  <h2 className="text-xl text-gray-400 mb-4">
                    No results found for "{query}"
                  </h2>
                  <p className="text-gray-500">
                    Try different keywords or browse our categories below
                  </p>
                </div>
              ) : null}

              {/* Suggestions */}
              <div className="mt-12 space-y-8">
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
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <h1 className="text-3xl font-semibold mb-4">Search Netflix</h1>
              <p className="text-gray-400 mb-12">
                Find movies, TV shows, and more
              </p>
              
              {/* Show trending content when no search */}
              <div className="space-y-8">
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
              </div>
            </div>
          )}
        </div>
      ) : (
        <VideoPlayer 
          content={selectedContent}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
};

export default SearchPage;