# Netflix Clone - API Contracts & Integration Plan

## Current Frontend Implementation Status

✅ **Completed Frontend Features:**
- Homepage with Netflix-style landing page
- Browse page with hero banner and content rows  
- Video player with YouTube integration
- Search functionality
- Navigation and routing
- Responsive design matching Netflix UI

✅ **Mock Data Currently Used:**
- `/app/frontend/src/data/mockData.js` contains hardcoded movie/TV data
- YouTube trailer keys for video playback
- Movie posters and backdrop images from TMDB URLs
- Fake ratings, release dates, and descriptions

## API Contracts for Backend Integration

### 1. TMDB API Integration Endpoints

#### GET `/api/movies/trending`
- **Purpose:** Get trending movies/TV shows
- **External API:** `https://api.themoviedb.org/3/trending/all/day`
- **Response:** Array of content objects with TMDB data + YouTube keys

#### GET `/api/movies/popular` 
- **Purpose:** Get popular movies
- **External API:** `https://api.themoviedb.org/3/movie/popular`

#### GET `/api/movies/top-rated`
- **Purpose:** Get top rated movies  
- **External API:** `https://api.themoviedb.org/3/movie/top_rated`

#### GET `/api/movies/genre/{genre_id}`
- **Purpose:** Get movies by genre (Action=28, Comedy=35, Horror=27)
- **External API:** `https://api.themoviedb.org/3/discover/movie?with_genres={genre_id}`

#### GET `/api/search?query={query}`
- **Purpose:** Search movies and TV shows
- **External API:** `https://api.themoviedb.org/3/search/multi?query={query}`

#### GET `/api/movies/{id}/videos`
- **Purpose:** Get YouTube trailer key for a specific movie
- **External API:** `https://api.themoviedb.org/3/movie/{id}/videos`

### 2. User Management (Future Enhancement)

#### POST `/api/auth/register`
- **Purpose:** User registration
- **Body:** `{email, password, name}`
- **Response:** `{user, token}`

#### POST `/api/auth/login` 
- **Purpose:** User login
- **Body:** `{email, password}`
- **Response:** `{user, token}`

#### GET `/api/user/profile`
- **Purpose:** Get user profile
- **Headers:** `Authorization: Bearer {token}`

#### POST `/api/user/watchlist`
- **Purpose:** Add/remove from user's watchlist
- **Body:** `{movieId, action: 'add'|'remove'}`

## Frontend Integration Changes Required

### 1. Replace Mock Data Service
**Current:** `mockData.js` with hardcoded arrays
**New:** API service calls to backend endpoints

**Files to Update:**
- `/app/frontend/src/pages/BrowsePage.js` - Replace mockMovieData imports with API calls
- `/app/frontend/src/pages/SearchPage.js` - Replace mock search with real API
- `/app/frontend/src/components/HeroBanner.js` - Get featured content from API

### 2. Create API Service Layer
**New File:** `/app/frontend/src/services/api.js`
```javascript
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const movieAPI = {
  getTrending: () => fetch(`${API_BASE}/movies/trending`).then(r => r.json()),
  getPopular: () => fetch(`${API_BASE}/movies/popular`).then(r => r.json()),
  // ... other methods
};
```

### 3. Environment Variables
**Required:** TMDB API key in backend environment
```
TMDB_API_KEY=c8dea14dc917687ac631a52620e4f7ad
```

## Backend Implementation Plan

### 1. TMDB Service Integration
- Create TMDB client service
- Handle API rate limiting  
- Cache popular responses
- Transform TMDB data to match frontend expectations
- Add YouTube video key fetching for each movie

### 2. Database Schema (MongoDB)
```javascript
// Users Collection
{
  _id: ObjectId,
  email: String,
  password: String (hashed),  
  name: String,
  watchlist: [ObjectId], // Movie IDs
  createdAt: Date
}

// Cache Collection (for TMDB responses)
{
  _id: ObjectId,
  cacheKey: String, // e.g., "trending_movies_2025-01-29"
  data: Object, // TMDB response
  expiresAt: Date
}
```

### 3. Error Handling
- TMDB API failures → fallback to cached data
- Invalid movie IDs → 404 responses
- Rate limiting → exponential backoff retry

## Testing Strategy

1. **API Testing:** Test all TMDB endpoints work correctly
2. **Frontend Integration:** Verify data flows properly from API to UI
3. **Video Playback:** Ensure YouTube integration still works with real data
4. **Search Functionality:** Test search with various queries
5. **Error Scenarios:** Test network failures and invalid responses

## Success Criteria

✅ **Backend provides real TMDB data**
✅ **All movie categories populate with actual films**  
✅ **Search returns relevant results**
✅ **Video playback works with real YouTube trailers**
✅ **Performance remains smooth with API calls**
✅ **Error handling gracefully manages API failures**

---

**Note:** This Netflix clone currently uses mock data but is designed to integrate seamlessly with real TMDB API data. All YouTube video integration is already functional.