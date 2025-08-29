from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class Movie(BaseModel):
    id: int
    title: str
    overview: str
    poster_path: Optional[str] = None
    backdrop_path: Optional[str] = None
    vote_average: float
    release_date: Optional[str] = None
    genre_ids: List[int] = []
    media_type: Optional[str] = "movie"
    youtube_key: Optional[str] = None
    popularity: Optional[float] = 0
    original_language: Optional[str] = "en"
    adult: bool = False

class TMDBResponse(BaseModel):
    page: int
    results: List[Movie]
    total_pages: int
    total_results: int

class SearchResult(BaseModel):
    movies: List[Movie]
    total_results: int
    query: str

class CachedData(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    cache_key: str
    data: dict
    expires_at: datetime
    created_at: datetime = Field(default_factory=datetime.utcnow)