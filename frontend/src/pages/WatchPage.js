import React from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { mockMovieData } from '../data/mockData';

const WatchPage = () => {
  const { id } = useParams();
  
  // Find content by ID from mock data
  const allContent = [
    ...mockMovieData.trending,
    ...mockMovieData.popular,
    ...mockMovieData.topRated,
    ...mockMovieData.action,
    ...mockMovieData.comedy,
    ...mockMovieData.horror
  ];
  
  const content = allContent.find(item => item.id === parseInt(id));

  if (!content) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Content Not Found</h1>
          <p className="text-gray-400">The requested content could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <VideoPlayer 
      content={content}
      onClose={() => window.history.back()}
    />
  );
};

export default WatchPage;