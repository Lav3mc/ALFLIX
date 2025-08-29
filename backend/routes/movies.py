from fastapi import APIRouter, HTTPException, Query
from typing import List
from models.movie import Movie, SearchResult
from services.tmdb_service import tmdb_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/movies", tags=["movies"])

@router.get("/trending", response_model=List[Movie])
async def get_trending():
    """Get trending movies and TV shows"""
    try:
        movies = await tmdb_service.get_trending()
        logger.info(f"Retrieved {len(movies)} trending movies")
        return movies
    except Exception as e:
        logger.error(f"Error in get_trending: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch trending movies")

@router.get("/popular", response_model=List[Movie])
async def get_popular():
    """Get popular movies"""
    try:
        movies = await tmdb_service.get_popular_movies()
        logger.info(f"Retrieved {len(movies)} popular movies")
        return movies
    except Exception as e:
        logger.error(f"Error in get_popular: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch popular movies")

@router.get("/top-rated", response_model=List[Movie])
async def get_top_rated():
    """Get top rated movies"""
    try:
        movies = await tmdb_service.get_top_rated_movies()
        logger.info(f"Retrieved {len(movies)} top rated movies")
        return movies
    except Exception as e:
        logger.error(f"Error in get_top_rated: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch top rated movies")

@router.get("/genre/{genre_id}", response_model=List[Movie])
async def get_movies_by_genre(genre_id: int):
    """Get movies by genre
    
    Common genre IDs:
    - 28: Action
    - 35: Comedy  
    - 27: Horror
    - 18: Drama
    - 878: Science Fiction
    - 53: Thriller
    - 10749: Romance
    """
    try:
        movies = await tmdb_service.get_movies_by_genre(genre_id)
        logger.info(f"Retrieved {len(movies)} movies for genre {genre_id}")
        return movies
    except Exception as e:
        logger.error(f"Error in get_movies_by_genre: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch movies for genre {genre_id}")

@router.get("/search", response_model=List[Movie])
async def search_movies(q: str = Query(..., min_length=1)):
    """Search movies and TV shows"""
    try:
        movies = await tmdb_service.search_movies(q)
        logger.info(f"Found {len(movies)} results for query: {q}")
        return movies
    except Exception as e:
        logger.error(f"Error in search_movies: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to search movies")

@router.get("/free", response_model=List[Movie])
async def get_free_movies():
    """Get free movies available for streaming"""
    try:
        movies = await tmdb_service.get_free_movies()
        logger.info(f"Retrieved {len(movies)} free movies")
        return movies
    except Exception as e:
        logger.error(f"Error in get_free_movies: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch free movies")

@router.get("/{movie_id}", response_model=Movie)
async def get_movie_details(movie_id: int):
    """Get detailed information about a specific movie"""
    try:
        # This would typically fetch from TMDB movie details endpoint
        # For now, we'll search through our existing data
        movies = await tmdb_service.get_trending()
        for movie in movies:
            if movie.id == movie_id:
                return movie
                
        raise HTTPException(status_code=404, detail="Movie not found")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in get_movie_details: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch movie details")