import { movieAPI } from './api';

// Marvel Cinematic Universe movies in chronological order
export const MCU_MOVIES = [
  {
    title: "Iron Man",
    year: 2008,
    tmdb_id: 1726,
    phase: 1
  },
  {
    title: "The Incredible Hulk", 
    year: 2008,
    tmdb_id: 1724,
    phase: 1
  },
  {
    title: "Iron Man 2",
    year: 2010, 
    tmdb_id: 10138,
    phase: 1
  },
  {
    title: "Thor",
    year: 2011,
    tmdb_id: 10195,
    phase: 1
  },
  {
    title: "Captain America: The First Avenger",
    year: 2011,
    tmdb_id: 1771,
    phase: 1
  },
  {
    title: "The Avengers",
    year: 2012,
    tmdb_id: 24428,
    phase: 1
  },
  {
    title: "Iron Man 3",
    year: 2013,
    tmdb_id: 68721,
    phase: 2
  },
  {
    title: "Thor: The Dark World",
    year: 2013,
    tmdb_id: 76338,
    phase: 2
  },
  {
    title: "Captain America: The Winter Soldier",
    year: 2014,
    tmdb_id: 100402,
    phase: 2
  },
  {
    title: "Guardians of the Galaxy",
    year: 2014,
    tmdb_id: 118340,
    phase: 2
  },
  {
    title: "Avengers: Age of Ultron",
    year: 2015,
    tmdb_id: 99861,
    phase: 2
  },
  {
    title: "Ant-Man",
    year: 2015,
    tmdb_id: 102899,
    phase: 2
  },
  {
    title: "Captain America: Civil War",
    year: 2016,
    tmdb_id: 271110,
    phase: 3
  },
  {
    title: "Doctor Strange",
    year: 2016,
    tmdb_id: 284052,
    phase: 3
  },
  {
    title: "Guardians of the Galaxy Vol. 2",
    year: 2017,
    tmdb_id: 283995,
    phase: 3
  },
  {
    title: "Spider-Man: Homecoming",
    year: 2017,
    tmdb_id: 315635,
    phase: 3
  },
  {
    title: "Thor: Ragnarok",
    year: 2017,
    tmdb_id: 284053,
    phase: 3
  },
  {
    title: "Black Panther",
    year: 2018,
    tmdb_id: 284054,
    phase: 3
  },
  {
    title: "Avengers: Infinity War",
    year: 2018,
    tmdb_id: 299536,
    phase: 3
  },
  {
    title: "Ant-Man and the Wasp",
    year: 2018,
    tmdb_id: 297762,
    phase: 3
  },
  {
    title: "Captain Marvel",
    year: 2019,
    tmdb_id: 299537,
    phase: 3
  },
  {
    title: "Avengers: Endgame",
    year: 2019,
    tmdb_id: 299534,
    phase: 3
  },
  {
    title: "Spider-Man: Far From Home",
    year: 2019,
    tmdb_id: 429617,
    phase: 3
  },
  {
    title: "Spider-Man: No Way Home",
    year: 2021,
    tmdb_id: 634649,
    phase: 4
  },
  {
    title: "Doctor Strange in the Multiverse of Madness",
    year: 2022,
    tmdb_id: 453395,
    phase: 4
  },
  {
    title: "Thor: Love and Thunder",
    year: 2022,
    tmdb_id: 616037,
    phase: 4
  },
  {
    title: "Black Panther: Wakanda Forever",
    year: 2022,
    tmdb_id: 505642,
    phase: 4
  }
];

// Free movies that are legally available to watch in full
export const FREE_FULL_MOVIES = [
  {
    title: "Big Buck Bunny",
    description: "A comedy about a rabbit and three rodents who enjoy harassing him.",
    youtube_full_movie: "YE7VzlLtp-4",
    poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/300px-Big_buck_bunny_poster_big.jpg",
    duration: "10 min",
    genre: "Animation, Comedy"
  },
  {
    title: "Sintel",
    description: "A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales.",
    youtube_full_movie: "eRsGyueVLvQ", 
    poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Sintel_poster.jpg/300px-Sintel_poster.jpg",
    duration: "15 min",
    genre: "Animation, Fantasy"
  },
  {
    title: "Tears of Steel",
    description: "In an apocalyptic future, a group of soldiers and scientists takes refuge in Amsterdam.",
    youtube_full_movie: "R6MlUcmOul8",
    poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Tears_of_Steel_poster.jpg/300px-Tears_of_Steel_poster.jpg", 
    duration: "12 min",
    genre: "Sci-Fi, Action"
  },
  {
    title: "Night of the Living Dead",
    description: "Classic zombie horror film that's now in public domain.",
    youtube_full_movie: "8QAFGz-fNDg",
    poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Night_of_the_Living_Dead_%281968%29.jpg/300px-Night_of_the_Living_Dead_%281968%29.jpg",
    duration: "96 min", 
    genre: "Horror, Thriller"
  },
  {
    title: "Plan 9 from Outer Space",
    description: "Cult classic B-movie about aliens raising the dead.",
    youtube_full_movie: "kdTfbDjd6lk",
    poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Plan_nine_from_outer_space.jpg/300px-Plan_nine_from_outer_space.jpg",
    duration: "79 min",
    genre: "Sci-Fi, Horror"
  }
];

// Service to get Marvel content
export const marvelService = {
  // Get all MCU movies with TMDB data
  async getAllMCUMovies() {
    try {
      const mcuMovies = [];
      
      for (const movie of MCU_MOVIES) {
        try {
          // Search for the movie to get full TMDB data
          const searchResults = await movieAPI.search(movie.title);
          const matchedMovie = searchResults.find(result => 
            result.title.toLowerCase().includes(movie.title.toLowerCase()) ||
            result.release_date?.includes(movie.year.toString())
          );
          
          if (matchedMovie) {
            mcuMovies.push({
              ...matchedMovie,
              phase: movie.phase,
              mcu_order: MCU_MOVIES.indexOf(movie) + 1
            });
          }
        } catch (error) {
          console.error(`Error fetching ${movie.title}:`, error);
        }
      }
      
      return mcuMovies;
    } catch (error) {
      console.error('Error fetching MCU movies:', error);
      return [];
    }
  },

  // Get movies by MCU phase
  async getMoviesByPhase(phase) {
    const allMCU = await this.getAllMCUMovies();
    return allMCU.filter(movie => movie.phase === phase);
  },

  // Get free movies that can be watched in full
  getFreeFullMovies() {
    return FREE_FULL_MOVIES.map((movie, index) => ({
      id: `free_${index}`,
      title: movie.title,
      overview: movie.description,
      poster_path: movie.poster,
      backdrop_path: movie.poster,
      vote_average: 7.5,
      release_date: "2023-01-01",
      genre_ids: [16, 35],
      media_type: "movie",
      youtube_key: movie.youtube_full_movie,
      full_movie_available: true,
      duration: movie.duration,
      genre_text: movie.genre
    }));
  }
};

export default marvelService;