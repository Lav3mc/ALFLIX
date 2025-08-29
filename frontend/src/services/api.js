import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API response from: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Movie API service
export const movieAPI = {
  // Get trending movies and TV shows
  getTrending: async () => {
    try {
      const response = await apiClient.get('/movies/trending');
      return response.data;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },

  // Get popular movies
  getPopular: async () => {
    try {
      const response = await apiClient.get('/movies/popular');
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  // Get top rated movies
  getTopRated: async () => {
    try {
      const response = await apiClient.get('/movies/top-rated');
      return response.data;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  },

  // Get movies by genre
  getByGenre: async (genreId) => {
    try {
      const response = await apiClient.get(`/movies/genre/${genreId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movies for genre ${genreId}:`, error);
      throw error;
    }
  },

  // Search movies
  search: async (query) => {
    try {
      const response = await apiClient.get('/movies/search', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Get free movies
  getFreeMovies: async () => {
    try {
      const response = await apiClient.get('/movies/free');
      return response.data;
    } catch (error) {
      console.error('Error fetching free movies:', error);
      throw error;
    }
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    try {
      const response = await apiClient.get(`/movies/${movieId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie details for ${movieId}:`, error);
      throw error;
    }
  }
};

// Genre IDs for easy reference
export const GENRES = {
  ACTION: 28,
  COMEDY: 35,
  HORROR: 27,
  DRAMA: 18,
  SCI_FI: 878,
  THRILLER: 53,
  ROMANCE: 10749,
  ANIMATION: 16,
  CRIME: 80,
  DOCUMENTARY: 99
};

// Utility function to handle API errors gracefully
export const handleApiError = (error, fallbackData = []) => {
  console.error('API Error occurred:', error);
  
  if (error.response) {
    // Server responded with error status
    console.error('Error status:', error.response.status);
    console.error('Error data:', error.response.data);
  } else if (error.request) {
    // Request made but no response
    console.error('No response received:', error.request);
  } else {
    // Something else happened
    console.error('Error message:', error.message);
  }
  
  // Return fallback data to prevent app crashes
  return fallbackData;
};

export default apiClient;