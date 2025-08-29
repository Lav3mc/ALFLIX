import os
import httpx
import logging
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
from models.movie import Movie, TMDBResponse
import asyncio

logger = logging.getLogger(__name__)

class TMDBService:
    def __init__(self):
        # Rotate between API keys if one gets rate limited
        self.api_keys = [
            "c8dea14dc917687ac631a52620e4f7ad",
            "3cb41ecea3bf606c56552db3d17adefd"
        ]
        self.current_key_index = 0
        self.base_url = "https://api.themoviedb.org/3"
        self.image_base_url = "https://image.tmdb.org/t/p"
        
    def _get_api_key(self) -> str:
        return self.api_keys[self.current_key_index]
    
    def _rotate_api_key(self):
        self.current_key_index = (self.current_key_index + 1) % len(self.api_keys)
        logger.info(f"Rotated to API key index: {self.current_key_index}")
    
    async def _make_request(self, endpoint: str, params: Dict[str, Any] = None) -> Dict[str, Any]:
        if params is None:
            params = {}
        
        params['api_key'] = self._get_api_key()
        
        async with httpx.AsyncClient(timeout=10.0) as client:
            try:
                response = await client.get(f"{self.base_url}{endpoint}", params=params)
                
                if response.status_code == 429:  # Rate limited
                    logger.warning("Rate limited, rotating API key")
                    self._rotate_api_key()
                    params['api_key'] = self._get_api_key()
                    response = await client.get(f"{self.base_url}{endpoint}", params=params)
                
                response.raise_for_status()
                return response.json()
                
            except httpx.HTTPError as e:
                logger.error(f"TMDB API error: {str(e)}")
                raise Exception(f"Failed to fetch data from TMDB: {str(e)}")
    
    def _process_movie_data(self, movie_data: Dict[str, Any]) -> Movie:
        """Process raw TMDB data into our Movie model"""
        # Add full image URLs
        poster_path = None
        if movie_data.get('poster_path'):
            poster_path = f"{self.image_base_url}/w500{movie_data['poster_path']}"
            
        backdrop_path = None
        if movie_data.get('backdrop_path'):
            backdrop_path = f"{self.image_base_url}/original{movie_data['backdrop_path']}"
        
        return Movie(
            id=movie_data.get('id', 0),
            title=movie_data.get('title') or movie_data.get('name', ''),
            overview=movie_data.get('overview', ''),
            poster_path=poster_path,
            backdrop_path=backdrop_path,
            vote_average=movie_data.get('vote_average', 0),
            release_date=movie_data.get('release_date') or movie_data.get('first_air_date'),
            genre_ids=movie_data.get('genre_ids', []),
            media_type=movie_data.get('media_type', 'movie'),
            popularity=movie_data.get('popularity', 0),
            original_language=movie_data.get('original_language', 'en'),
            adult=movie_data.get('adult', False)
        )
    
    async def get_trending(self) -> List[Movie]:
        """Get trending movies and TV shows"""
        try:
            data = await self._make_request("/trending/all/day")
            movies = []
            
            for movie_data in data.get('results', []):
                movie = self._process_movie_data(movie_data)
                # Get YouTube trailer for each movie
                movie.youtube_key = await self._get_youtube_key(movie.id, movie.media_type)
                movies.append(movie)
                
            return movies[:20]  # Limit to 20 items
            
        except Exception as e:
            logger.error(f"Error fetching trending movies: {str(e)}")
            return []
    
    async def get_popular_movies(self) -> List[Movie]:
        """Get popular movies"""
        try:
            data = await self._make_request("/movie/popular")
            movies = []
            
            for movie_data in data.get('results', []):
                movie = self._process_movie_data(movie_data)
                movie.youtube_key = await self._get_youtube_key(movie.id, 'movie')
                movies.append(movie)
                
            return movies[:20]
            
        except Exception as e:
            logger.error(f"Error fetching popular movies: {str(e)}")
            return []
    
    async def get_top_rated_movies(self) -> List[Movie]:
        """Get top rated movies"""
        try:
            data = await self._make_request("/movie/top_rated")
            movies = []
            
            for movie_data in data.get('results', []):
                movie = self._process_movie_data(movie_data)
                movie.youtube_key = await self._get_youtube_key(movie.id, 'movie')
                movies.append(movie)
                
            return movies[:20]
            
        except Exception as e:
            logger.error(f"Error fetching top rated movies: {str(e)}")
            return []
    
    async def get_movies_by_genre(self, genre_id: int) -> List[Movie]:
        """Get movies by genre"""
        try:
            params = {'with_genres': genre_id, 'sort_by': 'popularity.desc'}
            data = await self._make_request("/discover/movie", params)
            movies = []
            
            for movie_data in data.get('results', []):
                movie = self._process_movie_data(movie_data)
                movie.youtube_key = await self._get_youtube_key(movie.id, 'movie')
                movies.append(movie)
                
            return movies[:20]
            
        except Exception as e:
            logger.error(f"Error fetching movies by genre {genre_id}: {str(e)}")
            return []
    
    async def search_movies(self, query: str) -> List[Movie]:
        """Search for movies and TV shows"""
        try:
            params = {'query': query}
            data = await self._make_request("/search/multi", params)
            movies = []
            
            for movie_data in data.get('results', []):
                # Skip person results
                if movie_data.get('media_type') == 'person':
                    continue
                    
                movie = self._process_movie_data(movie_data)
                movie.youtube_key = await self._get_youtube_key(movie.id, movie.media_type)
                movies.append(movie)
                
            return movies[:20]
            
        except Exception as e:
            logger.error(f"Error searching movies: {str(e)}")
            return []
    
    async def _get_youtube_key(self, movie_id: int, media_type: str = 'movie') -> Optional[str]:
        """Get YouTube trailer key for a movie"""
        try:
            endpoint = f"/{media_type}/{movie_id}/videos"
            data = await self._make_request(endpoint)
            
            for video in data.get('results', []):
                if (video.get('type') == 'Trailer' and 
                    video.get('site') == 'YouTube' and 
                    video.get('key')):
                    return video['key']
                    
        except Exception as e:
            logger.error(f"Error fetching video key for {media_type} {movie_id}: {str(e)}")
            
        return None
    
    async def get_free_movies(self) -> List[Movie]:
        """Get free movies available on YouTube"""
        # These are known free movie IDs from YouTube's free movies channel
        free_movie_queries = [
            "free movies 2024",
            "public domain movies", 
            "creative commons movies",
            "archive.org movies"
        ]
        
        try:
            # Search for movies that might be free
            params = {
                'query': 'free movies',
                'include_adult': False,
                'page': 1
            }
            data = await self._make_request("/search/movie", params)
            movies = []
            
            for movie_data in data.get('results', [])[:10]:
                movie = self._process_movie_data(movie_data)
                # Try to find a free version or trailer
                movie.youtube_key = await self._get_youtube_key(movie.id, 'movie')
                movies.append(movie)
                
            return movies
            
        except Exception as e:
            logger.error(f"Error fetching free movies: {str(e)}")
            return []

# Create a singleton instance
tmdb_service = TMDBService()